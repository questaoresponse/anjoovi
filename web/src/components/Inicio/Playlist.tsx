import { useState, useRef, useEffect } from 'react';
import { useGlobal } from '../Global';
import { useAuth } from '../Auth';
import { useLocation } from 'react-router-dom';
import Link, { eventInterface } from '../Link';
import './Playlist.scss';
import Noticia from './Noticia';
import Imagem from './Imagem';
import Musica from './Musica';
import Ads from '../Ads';
import Comentarios from './Comentarios';
interface infosInterface{
    imagem:string,
    titulo:string,
    tipo:string,
    posts:any[],
}
interface postInterface{
    id:number,
    titulo:string[],
    tipo:string
}
function Playlist({id,func,isMain,Elements,post,onLinkClick}:{id?:number,func?:any,isMain?:any,Elements?:any,post:any,onLinkClick:any}){
    const globals=useGlobal();
    const { navigate, server }=globals;
    const auth=useAuth();
    const locationTrue=useLocation();
    const location=useRef<{pathname:string,_pathname:string,search:string,_search:string}>({
        _pathname:locationTrue.pathname,
        _search:locationTrue.search,
        get pathname(){
            return this._pathname;
        },
        set pathname(newPathname){
            this._pathname=newPathname;
        },
        get search(){
            return this._search;
        },
        set search(newSearch){
            currentId.current=Number(new URLSearchParams(newSearch).get("v") || 0);
            get(true);
            this._search=newSearch;
        }
    });
    useEffect(()=>{
        location.current.pathname=locationTrue.pathname;
        location.current.search=locationTrue.search;
    },[locationTrue.pathname,locationTrue.search]);

    const currentId=useRef<number>(Number(new URLSearchParams(location.current.search).get("v") || 0));
    const isLoaded=useRef(false);
    const [values,setValues]=useState<{infos:infosInterface,currentInfos:{post:any,posts:any}}>({
        infos:{    
            tipo:"",
            imagem:"",
            titulo:"",
            posts:[], 
        },
        currentInfos:{
            post:null,
            posts:[]
        }
    });
    const [postAtual,setPostAtual]=useState<postInterface>({
        id:-1,
        titulo:[],
        tipo:"",
    });
    const ajeitar=(post:any)=>{
        setPostAtual({
            id:post.id,
            titulo:(post.titulo || "").split(" "),
            tipo:post.tipo
        });
        const playlists:{imagem:string,titulo:string,post:number}[]=[];
        const imagens=JSON.parse(post.imagem);
        const titulos=JSON.parse(post.titulos);
        
        //keep the ids in order
        const posts:number[]=JSON.parse(post.posts);
        const idd=JSON.parse(post.idd);
        const orderIds:number[]=[];
        for (var post_children of posts){
            orderIds.push(idd.findIndex((id:string)=>Number(id)==post_children));
        }
        posts.forEach((post,i) => {
            const index=orderIds[i];
            playlists.push({
                imagem:imagens[index],
                titulo:titulos[index],
                post:post
            })
        });
        if (!isMain){

        } else {
            const types:{[chave:string]:string}={
                "post":"noticia",
                "imagem":"imagem",
                "post_musica":"musica"
            }
            auth.get(server+"/"+types[post.post_tipo]+"/"+posts[currentId.current]+"?c=1").then(result=>{
                if (result.data.result=="true"){
                    setValues({
                        infos:{
                            tipo:post.post_tipo,
                            imagem:playlists[currentId.current].imagem,
                            titulo:playlists[currentId.current].titulo,
                            posts:playlists
                        },
                        currentInfos:{
                            post:result.data.post,
                            posts:result.data.posts
                        }
                    })
                } else {

                }
            }); 
        }
    }
    const get=(value:boolean=false)=>{
        if (!value && isLoaded.current) return;
        if (!value && !isLoaded.current) isLoaded.current=true;
        ajeitar(post);
        // auth.post(globals.server+location.pathname,{type:"info"}).then(result=>{
        //     if (result.data.result=="true"){
        //         const playlist_value:infosInterface[]=[];
        //         const imagens=JSON.parse(playlist.imagem);
        //         const titulos=JSON.parse(playlist.titulos);
        //         const posts:number[]=JSON.parse(playlist.posts);
        //         const idd=JSON.parse(playlist.idd);
        //         const order:number[]=[];
        //         for (var post of posts){
        //             order.push(idd.findIndex((id:string)=>Number(id)==post));
        //         }
        //         posts.forEach((post,i) => {
        //             const index=order[i];
        //             playlist_value.push({
        //                 imagem:imagens[index],
        //                 titulo:titulos[index],
        //                 post:post
        //             })
        //         });
        //         setInfos(playlist_value);
        //         setDados({tipo:playlist.tipo,id:Number(posts[postId.current as number]),titulo:playlist.titulo});
        //     }
        // });
    }
    const [isReal,setIsReal]=useState(false);
    const c=useRef(0);
    useEffect(()=>{
        get();
        if (c.current>0) {
            if (isMain){
                // console.log("ai2");
                setIsReal(false);
            }
        }
        c.current++;
    },[post]);
    useEffect(()=>{
        if (isMain && !isReal){
            navigate("",{changeURL:false,lookTop:true});
            setIsReal(true);
        }
    },[isReal]);
    const previousRequest=useRef(["",false]);
    // useEffect(()=>{
    //     if (c.current>0){
    //         get(true);
    //     }
    //     c.current++;
    //     const u=new URLSearchParams(location.search);
    //     u.set("v","0");
    //     isNavigate.current=true;
    //     navigate!(location.pathname+"?"+u.toString());
    //     update the scroll
    //     refs.scroll.current!.style.transform="translateX("+(currentScroll.current * -21)+"vw)";
    // },[location.pathname]);

    const go=(id:number,index:number)=>{
        setPostAtual(postAtual=>{
            postAtual!.id=Number(id);
            return postAtual;
        });
        const u=new URLSearchParams(location.current.search);
        u.set("v",index.toString());
        const search="?"+u.toString();
        location.current.search=search;
        navigate!(location.current.pathname+search,{changeURL:false,lookTop:true});
        // update the scroll

        // currentScroll.current=index;

        // if (currentScroll.current > 0){
        //     refs.previous.current!.classList.replace("h","v");
        // } else {
        //     refs.previous.current!.classList.replace("v","h");
        // }
        // if (currentScroll.current < values.infos.posts.length-1){
        //     refs.next.current!.classList.replace("h","v");
        // } else {
        //     refs.next.current!.classList.replace("v","h");
        // }
        
    }
    let value:any;
    if (values.infos && values.currentInfos.post){
        switch (values.infos.tipo){
            case 'post':
                value=<Noticia isPlaylist={true} isMain={false} id={postAtual!.id} post={values.currentInfos.post} onLinkClick={onLinkClick}/>
                break;
            case 'post_imagem':
                value=<Imagem isPlaylist={true} isMain={false} id={postAtual!.id} post={values.currentInfos.post} onLinkClick={onLinkClick}/>
                break;
            default:
                value=<Musica isPlaylist={true} isMain={false} id={postAtual!.id} post={values.currentInfos.post} onLinkClick={onLinkClick}/>
                break;
        }
    }
    // const toPrevious=()=>{
    //     currentScroll.current > 0 && (currentScroll.current-=1);
    //     if (currentScroll.current > 0){ 
    //         refs.previous.current!.classList.replace("h","v");
    //     } else {
    //         refs.previous.current!.classList.replace("v","h");
    //     }
    //     refs.next.current!.classList.replace("h","v");
    //     refs.scroll.current!.style.transform="translateX("+(currentScroll.current * -21)+"vw)";
    // }
    // const toNext=()=>{
    //     currentScroll.current < values.infos.posts.length-1 && (currentScroll.current+=1);
    //     if (currentScroll.current < values.infos.posts.length-1){
    //         refs.next.current!.classList.replace("h","v");
    //     } else {
    //         refs.next.current!.classList.replace("v","h");
    //     }
    //     refs.previous.current!.classList.replace("h","v");
    //     refs.scroll.current!.style.transform="translateX("+(currentScroll.current * -21)+"vw)";

    //     // refs.scroll.current!.scrollTo({left:refs.scroll.current!.scrollLeft + 100});
    // }
    // useEffect(()=>{
    //     currentScroll.current=currentId.current;
    //     if (currentScroll.current > 0){
    //         refs.previous.current!.classList.replace("h","v");
    //     }
    //     if (currentScroll.current < values.infos.posts.length-1){
    //         refs.next.current!.classList.replace("h","v");
    //     }
    // },[values.infos]);
    // useEffect(()=>{
        // if (currentScroll.current > 0){
        //     refs.previous.current!.classList.replace("h","v");
        // }
        // if (currentScroll.current < values.infos.posts.length-1){
        //     refs.next.current!.classList.replace("h","v");
        // }
        // // refs.scroll.current!.style.transform="translateX("+(currentScroll.current * -21)+"vw)";
    // });
    const playlistComponent=({postAtual,values}:{postAtual:any,values:any})=>{
        console.log(postAtual);
        return <div id="right">
            <div id="titulo-playlist" className='txt'>{postAtual ? postAtual.titulo : ""}</div>
            <div id="posts">
                {/* <div id="pts" ref={refs.scroll}> */}
                    {values.infos.posts.map((info:any,index:number)=>{
                        return (
                            <div className={'post'+(postAtual && info.post==postAtual.id ? " selected" : "")} key={index} onClick={()=>{go(info.post,index)}}>
                                <div className='div_imagem'>
                                    <img src={globals.server+"/images/"+encodeURIComponent(info.imagem)} alt="" />
                                </div>
                                <div className="titulo-post txt">{info.titulo}</div>
                            </div>
                        )
                    })}
                {/* </div> */}
            </div>
            {/* <div ref={refs.previous} id="previous" className='h' onClick={toPrevious}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                </svg>
            </div>
            <div ref={refs.next} id="next" className='h' onClick={toNext}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </div> */}
        </div>
    };
    const Nt=({post}:{post:postInterface})=>{
        return <div className='posts-div'>
            {!isMain ? <Link onClick={(e:eventInterface)=>{e.preventDefault();func("/playlist/"+post.id+"?v=0",post.id)}} to={"/playlist/"+post.id+"?v=0"} id="plist disabled">
                <div id="bottom">
                    <div id="content">
                        {value}
                    </div>
                </div>
            </Link> : <div id="plist" className='posts-div'>
                <div id="bottom">
                    <div id="content">
                            {value}
                    </div>
                </div>
            </div>}
        </div>
    }
    return !isMain ? <Nt post={postAtual}/> : (
        <div>
            <div id="pg" className={'no cont playlist'}> 
            {id ? <Ads solt="7693763089"/> : <></>}
                <div id="bottom">
                    <div id="s1">
                        <Nt post={postAtual}></Nt>
                        <Elements></Elements>
                    </div>
                    {!globals.mobile ? <Comentarios values={values} postAtual={postAtual} playlistComponent={playlistComponent} tipo={postAtual.tipo} previousRequest={previousRequest}/> : <></> }
                    {/* {!props.id && !globals.mobile && <Alta server={server} posts={infos.alta}/>} */}
                </div>
            </div>
        </div>
    )
}
export default Playlist;