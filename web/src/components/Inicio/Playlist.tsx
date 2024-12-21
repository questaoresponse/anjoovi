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
function Playlist({id,func,isMain,Elements,post,onLinkClick,onLoaded}:{id?:number,func?:any,isMain?:any,Elements?:any,post:any,onLinkClick:any,onLoaded?:()=>void}){
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
            get();
            this._search=newSearch;
        }
    });
    useEffect(()=>{
        location.current.pathname=locationTrue.pathname;
        location.current.search=locationTrue.search;
    },[locationTrue.pathname,locationTrue.search]);

    const currentId=useRef<number>(Number(new URLSearchParams(location.current.search).get("v") || 0));
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
    const [postId,setPostId]=useState(0);
    function zero(number:string | number){
        return Number(number) < 10 ? "0"+number : String(number);
    }
    function get_date_s(d:any){
        const [datePart, timePart] = new Date(d + ' -03:00').toLocaleString().split(', ');
        const [day, month, year] = datePart.split('/');
        const data:any = new Date(`${year}-${month}-${day}T${timePart}`);
        const dia = zero(data.getDate());
        const mes = zero(data.getMonth() + 1); // Os meses em JavaScript são base 0 (janeiro é 0, fevereiro é 1, etc.)
        const ano = data.getFullYear();
        const hora = zero(data.getHours());
        const minuto=zero(data.getMinutes());

        return `${dia}/${mes}/${ano} às ${hora}h${minuto}`;
    }
    const analyze=(post:any)=>{
        switch (post.tipo){
            case "p":
                var dj=post.d ? JSON.parse(post.d) : { o:"2024-01-01 00:00:00" };
                var d=dj.o;
                var texto=(post.texto || "").split(/\n/g).map((line:string)=>line ? line.split(" ") : []);
                return {
                    isLoaded:true,
                    srcImagem:server+"/images/"+encodeURIComponent(post.imagem),
                    titulo:(post.titulo || "").split(" "),
                    subtitulo:(post.subtitulo || "").split(" "),
                    logo:post.logo ? server+"/images/"+encodeURIComponent(post.logo) : null,
                    nome:post.nome,
                    usuario:post.usuario,
                    dataText:get_date_s(d),
                    dataUpdateText:dj.a ? "Editado" : "",
                    visualizacoes:post.visualizacoes,
                    inscrito:JSON.parse(post.inscrito),
                    text:texto,
                    id:post.id,
                    tipo:post.tipo,
                    n_comment:post.n_comment,
                };
            case "i":
                var dj=JSON.parse(post.d);
                var d=dj.o;
                var texto=(post.descricao || "").split(/\n/g).map((line:string)=>line ? line.split(" ") : []);
                return {
                    alta:[],
                    srcImagem:server+"/images/"+encodeURIComponent(post.imagem),
                    logo:post.logo ? server+"/images/"+encodeURIComponent(post.logo) : null,
                    nome:post.nome,
                    usuario:post.usuario,
                    dataText:get_date_s(d),
                    dataUpdateText:dj.a ? "Editado" : "",
                    visualizacoes:post.visualizacoes,
                    inscrito:JSON.parse(post.inscrito),
                    text:texto,
                    id:post.id,
                    n_comment:post.n_comment,
                    tipo:post.tipo
                };
        }
    }
    const get=()=>{
        const types:{[chave:string]:string}={
            "post":"noticia",
            "imagem":"imagem",
            "post_musica":"musica"
        }
        auth.get(server+"/"+types[post.post_tipo]+"/"+post.posts[currentId.current]+"?c=1").then(result=>{
            if (result.data.result=="true"){
                
                setValues({
                    infos:{
                        tipo:post.post_tipo,
                        imagem:post.playlists[currentId.current].imagem,
                        titulo:post.playlists[currentId.current].titulo,
                        posts:post.playlists
                    },
                    currentInfos:{
                        post:analyze(result.data.post),
                        posts:result.data.posts
                    }
                });
            }
        }); 
    }
    useEffect(()=>{
        if (isMain){
            get();
        }
    },[post]);

    const go=(id:number,index:number)=>{
        setPostId(id);
        const u=new URLSearchParams(location.current.search);
        u.set("v",index.toString());
        const search="?"+u.toString();
        location.current.search=search;
        navigate!(location.current.pathname+search,{changeURL:false,lookTop:true});
    }
    let value:any;
    if (values.infos && values.currentInfos.post){
        switch (values.infos.tipo){
            case 'post':
                value=<Noticia isPlaylist={true} isMain={false} id={postId} post={values.currentInfos.post} onLinkClick={onLinkClick}/>
                break;
            case 'post_imagem':
                value=<Imagem isPlaylist={true} isMain={false} id={postId} post={values.currentInfos.post} onLinkClick={onLinkClick}/>
                break;
            default:
                value=<Musica isPlaylist={true} isMain={false} id={postId} post={values.currentInfos.post} onLinkClick={onLinkClick}/>
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
        return <div id="right">
            <div id="titulo-playlist" className='txt'>{postAtual ? postAtual.titulo : ""}</div>
            <div id="posts">
                {/* <div id="pts" ref={refs.scroll}> */}
                    {values.infos.posts.map((info:any,index:number)=>{
                        return (
                            <div className={'post'+(info.post==postId ? " selected" : "")} key={index} onClick={()=>{go(info.post,index)}}>
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
        useEffect(()=>{
            isMain && onLoaded!();
        },[]);
        return <div className='posts-div'>
            {!isMain ? <Link onClick={(e:eventInterface)=>{e.preventDefault();func("/playlist/"+post.id+"?v=0",post.id)}} to={"/playlist/"+post.id+"?v=0"} id="plist disabled">
                <div id="bottom">
                    <div id="content">
                        {value}
                    </div>
                </div>
            </Link> : <div className="plist">
                <div id="bottom">
                    <div id="content">
                            {value}
                    </div>
                </div>
            </div>}
        </div>
    }
    return !isMain ? <Nt post={post}/> : (
        <div>
            <div id="pg" className={'no cont playlist'}> 
            {id ? <Ads solt="7693763089"/> : <></>}
                <div id="bottom">
                    <div id="s1">
                        <Nt post={post}></Nt>
                        <Elements></Elements>
                    </div>
                    {!globals.mobile ? <Comentarios values={values} postAtual={post} playlistComponent={playlistComponent} tipo={post.tipo}/> : <></> }
                    {/* {!props.id && !globals.mobile && <Alta server={server} posts={infos.alta}/>} */}
                </div>
            </div>
        </div>
    )
}
export default Playlist;