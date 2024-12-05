import { useState, useRef, useEffect, MutableRefObject } from "react";
import GlobalContextInterface from "../../Global";
import sem_imagem from '../../static/sem-imagem.jpg';
import { resultInterface } from "../../Auth";
import X from "../../X";
import Link from "../../Link";

interface destaquesInterface{
    geral:{
        src:string | null
    },
    imagem:{
        src:string | null
    },
    materia:{
        src:string | null
    },
    musica:{
        src:string |null
    },
    texto:{
        src:string |null
    },
    video:{
        src:string |null
    },
    playlist:{
        src:string | null
    },
    [key:string]:{
        src:string | null
    }
}
function Destaques({option,globals,auth,location}:{option:any,globals:GlobalContextInterface,location:{pathname:string,search:string},auth:any}){
    const { server, navigate }=globals;
    const [isPesquisa,setIsPesquisa]=useState(false);
    const [dados,setDados]=useState<{id:number,id_post:number,tipo:string,titulo:string}[]>([]);
    const [destaques,setDestaques]=useState<destaquesInterface>({
        geral:{
            src:null
        },
        materia:{
            src:null
        },
        imagem:{
            src:null
        },
        musica:{
            src:null
        },
        texto:{
            src:null
        },
        video:{
            src:null
        },
        playlist:{
            src:null
        }
    })
    const [open,setOpen]=useState<string | boolean>(false);
    const tipo=useRef<string | null>(null);
    const refs:{[key:string]:MutableRefObject<HTMLInputElement | null>}={
        input:useRef<HTMLInputElement>(null),
        geral:useRef<HTMLInputElement>(null),
        materia:useRef<HTMLInputElement>(null),
        imagem:useRef<HTMLInputElement>(null),
        musica:useRef<HTMLInputElement>(null),
        texto:useRef<HTMLInputElement>(null),
        video:useRef<HTMLInputElement>(null),
        playlist:useRef<HTMLInputElement>(null),
    }
    const mostrar=(e:any)=>{
        var el=e.target.parentNode.parentNode.children[2];
        if (!e.target.checked){
            var tipo=e.target.name;
            auth.post(server+"/admin/destaque",{type:"disable",tipo:tipo}).then((_:any)=>{
                setDestaques(destaques=>{return {...destaques,[tipo]:{src:null}}});
            });
        }
        el.classList.toggle("show");
    }
    const pesquisar=(e:any)=>{
        const params=new URLSearchParams(location.search);
        params.set("search",refs.input.current ? refs.input.current.value : '');
        params.set("tipo",tipo.current!);
        navigate!(location.pathname+"?"+params.toString());
        e.preventDefault();
        get_value();
        // auth.post(globals.server+"/admin/noticias_lista?search="+refs.input.current.value,{type:"info"}).then(result=>{
        //     // const daa=result.data;
        //     if (result.data.result=="true"){
        //         setDados(result.data.noticias);
        //     }
        // });
    }
    const select=(id:number)=>{
        const tipo_value=tipo.current!;
        auth.post(server+"/admin/destaque",{type:"option",tipo:tipo_value,id:id}).then((result:resultInterface)=>{
            if (result.data.result=="true"){
                setDestaques(destaques=>{return {...destaques,[tipo_value]:result.data.destaque}});
            }
        });
        quitMenu();
    }
    const get_value=()=>{
        var value=refs.input.current ? refs.input.current.value : "";
        auth.post(globals.server+"/admin/destaque?search="+value,{type:"search",tipo:tipo.current}).then((result:resultInterface)=>{
            // const daa=result.data;
            if (result.data.result=="true"){
                setDados(result.data.noticias);
            }
        });
    }
    const get=()=>{
        auth.post(server+"/admin/destaque",{type:"info"}).then((result:resultInterface)=>{
            if (result.data.result=="true"){
                const info=result.data.destaques;
                var options=["geral","materia","imagem","musica","texto","video","playlist"];
                for (var el of options){
                    if (info[el] && info[el].src){
                        var ref=refs[el].current!;
                        ref.checked=true;
                        var e=ref.parentNode!.parentNode!.children[2];
                        e.classList.contains("show") ? e.classList.remove("show") : e.classList.add("show");
                    }
                }
                result.data.response=="true" && setDestaques(result.data.destaques);
            }
        })
    }
    const openPesquisa=(tipo_value:any)=>{
        const params=new URLSearchParams(location.search);
        params.set("tipo",tipo_value);
        navigate!(location.pathname+"?"+params.toString());
        tipo.current=tipo_value;
        setIsPesquisa(true);
        refs.input.current!.value="";
        get_value();
        setOpen(tipo_value);
    }
    const quitMenu=()=>{
        const params=new URLSearchParams(location.search);
        params.delete("search");
        params.delete("tipo");
        setIsPesquisa(false);
        tipo.current=null;
        navigate!(location.pathname+"?"+params.toString());
        refs.input.current!.value="";
        setOpen(false);
    }
    useEffect(()=>{
        const params=new URLSearchParams(location.search);
        if (params.has("tipo") && params.has("search")){
            tipo.current=params.get("tipo");
            if (refs.input.current) refs.input.current.value=params.get("search") || '';
            setIsPesquisa(true);
            get_value();
        }
        get();
    },[]);
    useEffect(()=>{
        option!="destaque" && setIsPesquisa(false);
    },[option]);
    const options=[
        {title:"Geral:",name:"geral"},
        {title:"Matéria:",name:"materia"},
        {title:"Imagem:",name:"imagem"},
        {title:"Música:",name:"musica"},
        {title:"Texto:",name:"texto"},
        {title:"Vídeo:",name:"video"},
        {title:"Playlist:",name:"playlist"},
    ];
    const types:{[key:string]:string}={
        p:"noticia",
        i:"imagem",
        t:"texto",
        v:"video",
        pl:"playlist",
    }
    const verifyJson=(json:string)=>{
        try{
            return JSON.parse(json);
        } catch (e){
            return false;
        }
    }
    return (
        <div style={{"display":option=="destaque" ? "block" : "none"}} className='destaques-div'>
            <div id="avs">Obs: caso uma divisão não tenha um destaque selecionado, aparecerá o destaque geral.</div>
            <div id="list">{options.map((option:{title:string,name:string},index:number)=>{
                const json=destaques[option.name].src ? verifyJson(destaques[option.name].src!) : false;
                return <div key={index} className='list-item'>
                    <label>{option.title}</label>
                    <div className='btn-d'>
                        <input ref={refs[option.name]} className='i' name={option.name} type='checkbox' onChange={mostrar}></input>
                        <div className='select'></div>
                    </div>
                    <div className='content'>
                        <div id="geral-d">
                            <div className="imagem-view">
                                {!json || json[1]=="i" ? <img className="imagem-content" src={destaques[option.name].src ? server+"/images/"+encodeURIComponent(destaques[option.name].src!) : sem_imagem}/> : json && json[1]=="v" ? <video className="imagem-content" src={server+"/videos/"+encodeURIComponent(json[0])}/> : <div>{json[0]}</div>}
                            </div>
                        </div>
                        <div className={"select"+(open==option.name ? " open" : "")} onClick={()=>{openPesquisa(option.name)}}>selecionar</div> 
                    </div>
                </div>})}
            </div>
            {/* <div className='geral-st'>
                <label>Geral:</label>
                <div className='btn-d'>
                    <input ref={refs.geral} className='i' name='geral' type='checkbox' onChange={mostrar}></input>
                    <div className='select'></div>
                </div>
                <div className='content'>
                    <div id="geral-d">
                        <div className="imagem-view">
                            <img src={destaques.geral.src ? server+"/images/"+encodeURIComponent(destaques.geral.src) : sem_imagem}/>
                        </div>
                    </div>
                    <div className="select" onClick={()=>{openPesquisa("geral")}}>selecionar</div> 
                </div>
            </div>
            <div className='materia-st'>
                <label>Matéria:</label>
                <div className='btn-d'>
                    <input ref={refs.materia} className='i' name='materia' type='checkbox' onChange={mostrar}></input>
                    <div className='select'></div>
                </div>
                <div className='content'>
                    <div id="materia-d">
                        <div className="imagem-view">
                            <img src={destaques.materia.src ? server+"/images/"+encodeURIComponent(destaques.materia.src) : sem_imagem}/>
                        </div>
                    </div>
                    <div className="select" onClick={()=>{openPesquisa("materia")}}>selecionar</div> 
                </div>
            </div>
            <div className='imagem-st'>
                <label>Imagem:</label>
                <div className='btn-d'>
                    <input ref={refs.imagem} className='i' name='imagem' type='checkbox' onChange={mostrar}></input>
                    <div className='select'></div>
                </div>
                <div className='content'>
                    <div id="imagem-d">
                        <div className="imagem-view">
                            <img src={destaques.imagem.src ? server+"/images/"+encodeURIComponent(destaques.imagem.src) : sem_imagem}/>
                        </div>
                    </div>
                    <div className="select" onClick={()=>{openPesquisa("imagem")}}>selecionar</div> 
                </div>
            </div>
            <div className='musica-st'>
                <label>Música:</label>
                <div className='btn-d'>
                    <input ref={refs.musica} className='i' name='musica' type='checkbox' onChange={mostrar}></input>
                    <div className='select'></div>
                </div>
                <div className='content'>
                    <div id="musica-d">
                    <div className="imagem-view">
                            <img src={destaques.musica.src ? server+"/images/"+encodeURIComponent(destaques.musica.src) : sem_imagem}/>
                        </div>
                    </div>
                    <div className="select" onClick={()=>{openPesquisa("musica")}}>selecionar</div> 
                </div>
            </div>
            <div className='playlist-st'>
                <label>Playlist:</label>
                <div className='btn-d'>
                    <input ref={refs.playlist} className='i' name='playlist' type='checkbox' onChange={mostrar}></input>
                    <div className='select'></div>
                </div>
                <div className='content'>
                    <div id="musica-d">
                    <div className="imagem-view">
                            <img src={destaques.playlist.src ? server+"/images/"+encodeURIComponent(destaques.playlist.src) : sem_imagem}/>
                        </div>
                    </div>
                    <div className="select" onClick={()=>{openPesquisa("playlist")}}>selecionar</div> 
                </div>
            </div> */}
            <div style={{display:isPesquisa ? "block" : "none"}} id="pesquisa">
                <form onSubmit={pesquisar} id="div-pesqusia">
                    <div>titulo:</div>
                    <input ref={refs.input} onInput={pesquisar}></input>
                </form>
                <X onClick={quitMenu} className='x'></X>
                <div id="conteudo">
                    {dados.map((data,index)=>{
                        return (
                        <div onClick={()=>{select(data.id)}} className='result' key={index}>
                            <p className="title-post txt">{data.titulo}</p>
                            <Link onClick={(e:any)=>{e.preventDefault();window.open("/"+types[data.tipo]+"/"+data.id_post,"__blank")}} to={"/"+types[data.tipo]+"/"+data.id_post}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="external" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
                                    <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
                                </svg>
                            </Link>
                        </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};
export default Destaques;