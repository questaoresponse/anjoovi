import { useEffect, useReducer, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Link from "../Link.tsx";
import { useGlobal } from "../Global.tsx";
import { useAuth } from "../Auth.jsx";
import './Busca.scss';
import Ads from '../Ads.jsx';
import Post from './Post.jsx';
import X from "../X.tsx";
const reducer=(_:any,action:any)=>{
    switch (action.type){
        case 'setValues':
            return action.values
    }
}
function Busca(){
    const globals=useGlobal();
    const { server, navigate, renderAds }=globals;
    const auth=useAuth();
    const location=useLocation();
    const [selected,setSelected]=useState(0);
    const [filter,setFilter]=useState(false);
    const filterInfos=useRef<{[key:string]:boolean,canal:boolean}>({canal:false});
    const [state,dispatch]=useReducer(reducer,{
        isLoaded:false,
        posts:{"0":[],"1":[],"2":[],"3":[],"4":[],"5":[],"6":[],"7":[]},
        canals:[],
        registros:0,
    });
    const get=()=>{
        auth.post(server+"/busca"+location.search,{type:"info",filter:JSON.stringify(filterInfos.current)}).then(result=>{
            var data=result.data;
            const posts=data.posts;
            dispatch({type:'setValues',values:{
                isLoaded:true,
                registros:data.n_registros,
                posts:filterInfos.current.canal ? {
                    "0":[],
                    "1":[],
                    "2":[],
                    "3":[],
                    "4":[],
                    "5":[],
                    "6":[],
                    "7":[]
                } : {
                    "0":posts.slice(0,16),
                    "1":posts.filter((post:any)=>post.tipo=="p"),
                    "2":posts.filter((post:any)=>post.tipo=="i"),
                    "3":posts.filter((post:any)=>post.tipo=="m"),
                    "4":posts.filter((post:any)=>post.tipo=="t"),
                    "5":posts.filter((post:any)=>post.tipo=="v"),
                    "6":posts.filter((post:any)=>post.tipo=="pl"),
                    "7":posts.filter((post:any)=>post.tipo=="pd")
                },
                canals:data.canals
            }});
        });
    }
    const searchForFilterChange=useRef(false);
    useEffect(()=>{
        if (searchForFilterChange.current){
            searchForFilterChange.current=false;
        } else {
            const params=new URLSearchParams(location.search);
            if (params.has("filters") && params.get("filters")){
                try{
                    const filters:string[]=JSON.parse(params.get("filters")!);
                    const filtersMap:{[key:string]:boolean}={};
                    filters.map(filter=>{filtersMap[filter]=true});
                    if (Array.isArray(filters)){
                        for (const filter in filterInfos.current){
                            if (filter in filtersMap){
                                filterInfos.current[filter]=true;
                            }
                        }
                    }
                } catch (e){
                }
            } else {
                for (const filter in filterInfos.current){
                    filterInfos.current[filter]=false;
                }
            }
            dispatch({type:'setValues',values:{isLoaded:false, posts:{"0":[],"1":[],"2":[],"3":[],"4":[],"5":[],"6":[],"7":[]}, canals:[],registros:0}});
            get();
        }
    },[location.search]);
    useEffect(()=>{
        renderAds();
    },[]);
    const updateSelect=(tipo:number)=>{
        setSelected(tipo);
    }
    const filterSearch=(type:number)=>{
        const types=["canal"];
        for (const filter in filterInfos.current){
            filterInfos.current[filter]=filter==types[type];
        }
        const params=new URLSearchParams(location.search);
        const filters=[];
        for (const filter in filterInfos.current){
            if (filterInfos.current[filter]){
                filters.push(filter);
            }
        }
        params.set("filters",JSON.stringify(filters));
        if (location.search!="?"+params.toString()){
            searchForFilterChange.current=true;
            navigate(location.pathname+"?"+params.toString());
        }
        get();
        setFilter(false);
    }
    return <div className="busca">
        <div className="bu">
            <div id="pts-div">
                <div id="pts">
                    <div id="filter-btn" onClick={()=>setFilter(true)} className={filter ? "show" :" hidden"}>
                        <div>Filtros</div>
                        <svg id="filter-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
                        </svg>
                    </div>
                    <div className={"pt"+(selected==0 ? " selected" : "")} onClick={()=>updateSelect(0)}>Tudo</div>
                    <div className={"pt"+(selected==1 ? " selected" : "")} onClick={()=>updateSelect(1)}>Matéria</div>
                    <div className={"pt"+(selected==2 ? " selected" : "")} onClick={()=>updateSelect(2)}>Imagem</div>
                    <div className={"pt"+(selected==3 ? " selected" : "")} onClick={()=>updateSelect(3)}>Música</div>
                    <div className={"pt"+(selected==4 ? " selected" : "")} onClick={()=>updateSelect(4)}>Texto</div>
                    <div className={"pt"+(selected==5 ? " selected" : "")} onClick={()=>updateSelect(5)}>Vídeo</div>
                    <div className={"pt"+(selected==6 ? " selected" : "")} onClick={()=>updateSelect(6)}>Playlist</div>
                    <div className={"pt"+(selected==7 ? " selected" : "")} onClick={()=>updateSelect(7)}>Produto</div>
                </div>
            </div>
            <div id="registros">
                <p id="p1">{state.registros>1 ? "Foram encontrados" : "Foi encontrado"}&nbsp;</p>
                <p id="p2">{state.registros}</p>
                <p id="p3">&nbsp;{state.registros>1 ? "registros" : " registro"}</p>
            </div>
            <Ads slot="7577017868"/>
            <div id="canals">
                {state.canals.map((canal:any,index:any)=>{
                    return <div className="canal" key={index}>
                        <Link to={"/@"+canal.usuario} className="logo">{ canal.logo ? <img src={server+"/images/"+encodeURIComponent(canal.logo)}></img> : <span>{canal.usuario[0]}</span>}</Link>
                        <Link to={"/@"+canal.usuario} className="usuario txt-1">{canal.usuario}</Link>
                    </div>
                })}
            </div>
            {/* <div id="ads-d2" className="ads-b"style={{display:globals.mobile ? "none" : "block"}}>
                {!globals.mobile &&  <Ads slot="7577017868"/>}
            </div> */}
        </div>
        <div className="bup">
            <Post isLoaded={state.isLoaded} globals={globals} posts={state.posts[String(selected)]}/>
        </div>
        <div id="filter-a" onClick={()=>setFilter(false)} style={{display:filter ? "block" : "none"}}></div>
        <div id="filter" style={{display:filter ? "block" : "none"}}>
            <X className="x" onClick={()=>{setFilter(false)}}></X>
            <div id="filter-msg">Filtros de pesquisa</div>
            <div id="filter-opts">
                <div className="filter-opt" onClick={()=>filterSearch(0)}>Canal</div>
            </div>
        </div>
    </div>
}
export default Busca;