import { useState, useEffect, useRef, memo } from 'react';
import Link, { eventInterface } from '../Link.tsx';
import { useGlobal } from '../Global.tsx';
import { useAuth } from '../Auth.jsx';
import './Musica.scss';
// import Ads from '../Ads.jsx';
import Comentarios from './Comentarios.jsx';
import Denuncia from './Denuncia.tsx';
import Conteudo from './Conteudo.tsx';
import { musicInterface } from '../PlayerClass.ts';
// interface musicaslInterface{
//     musica:string,
//     ref:React.RefObject<HTMLAudioElement>,
//     setPlay:React.RefObject<(e:any,play:boolean)=>void>,
//     reset:React.RefObject<()=>void>,
// }
interface postInterface{
    audio:string,
    imagem:string | null,
    titulo:string[],
    logo:string | null,
    nome:string,
    usuario:string,
    zip:string | null,
    downloads:number,
    visualizacoes:number,
    inscrito:boolean | null,
    id:number,
    tipo:string,
    n_comment:number,
}
// interface postInterface2{
//     audio:string,
//     imagem:string | null,
//     titulo:string,
//     logo:string | null,
//     nome:string,
//     usuario:string,
//     zip:string | null,
//     downloads:number,
//     visualizacoes:number,
//     inscrito:string,
//     id:number,
//     tipo:string,
//     usuario_musica:string,
//     arquivo:string,
//     duration:string,
//     n_comment:number,
// }
const MusicaList=({music,onClickMusic,getTime,getData,index}:{music:musicInterface,onClickMusic:(index:number,{page_id,musics}:{user:string,page_id:number,musics:musicInterface[]})=>void,getTime:(value:number)=>string,getData:()=>{user:string,page_id:number,musics:musicInterface[]},index:number})=>{
    const refs={
        currentTime:useRef<HTMLDivElement>(null),
        totalTime:useRef<HTMLDivElement>(null),
    }
    const [play,setPlay]=useState(false);
    const setCurrentTime=(time:string)=>{
        refs.currentTime.current!.textContent=time;
    }
    useEffect(()=>{
        refs.currentTime.current!.textContent=getTime(music.currentTime);
        refs.totalTime.current!.textContent=getTime(music.duration);
        music.setCurrentTime=setCurrentTime;
        music.setPlay=setPlay;
        return ()=>{
            music.setCurrentTime=null;
            music.setPlay=null;
        }
    },[]);
    return (
        <div className="audiop">
            <div className="audiopd">
                <div className="audioc">
                    <div onClick={()=>{onClickMusic(index,getData())}} className="change">
                        <i className={`i1 ${!play ? "d-flex" : "d-none"} bi-play-fill`}></i>
                        <i className={`i2 ${!play ? "d-none" : "d-flex"} bi-pause-fill`}></i>
                    </div>
                    <div ref={refs.currentTime} className="atual_t">00:00</div>
                    <div className="progress txt-1">{music.name}</div>
                    <div ref={refs.totalTime} className="total_t">00:00</div>
                </div>
            </div>
        </div>
    )
}
function Musica({isPlaylist,id,func,isMain,Elements,post,onLinkClick,onLoaded}:{isPlaylist?:any,id?:number,func?:any,isMain?:any,Elements?:any,post:any,onLinkClick:any,onLoaded?:()=>void}){
    onLinkClick !="";
    const globals=useGlobal();
    const { server, player }=globals;
    const auth=useAuth();
    // const { arquivos, musicasl, id }=useMusica();
    const arquivos=useRef([]);
    // const [musicasl,setMusicaslState]=useState<musicaslInterface[]>([]);
    const musicsRef=useRef<musicInterface[]>(post.musics);
    const [musics,setMusics]=useState<musicInterface[]>(post.musics);
    useEffect(()=>{
        arquivos.current=post.arquivos;
        musicsRef.current=post.musics;
        setMusics(post.musics);
    },[post]);
    const updateMusic=(musics:musicInterface[])=>{
        if (player.current.page_id==post.id){
            musicsRef.current=musics;
            setMusics(musics);
        }
    }
    useEffect(()=>{
        if (isMain){
            player.current.addMusicListener(updateMusic);
        }
        return ()=>{
            if (isMain){
                player.current.removeMusicListenner(updateMusic);
            }
        }
    },[]);
    const getData=()=>{
        if (player.current.page_id!=1 && player.current.page_id!=post.id){
            player.current.reset();
        }
        return {user:post.usuario,page_id:post.id,musics:musicsRef.current};
    }
    const Download=()=>{
        auth.post(server+"/musica/"+post.id,{type:"download",id:post.id.toString()});
    }
    const Nt=({post}:{post:postInterface,musics:musicInterface[]})=>{
        const [showComment,setShowComment]=useState(false);
        useEffect(()=>{
            isMain && onLoaded!();
        },[]);
        // const [comentarios,setComentarios]=useState<boolean>(false);
        return <div className='posts-div'>
            {!isMain ? <Link onClick={(e:eventInterface)=>{e.preventDefault();func("/musica/"+post.id,post.id)}} to={"/musica/"+post.id} className="p-musica disabled">
                <Conteudo auth={auth} globals={globals} infos={post as { nome: string; usuario: string; logo: string | null; visualizacoes: number; inscrito: boolean | null; }}></Conteudo>
                <div className="top">
                    <div className="titulo-musica txt">{post.titulo.map((texto:string,index:number)=>{
                        return texto.length>1 && texto[0]=="@" ? <Link className='tag' key={index} to={"/@"+encodeURIComponent(texto.slice(1))}>{texto + ( post.titulo.length-1>index ? " " : "" )}</Link> : texto + ( post.titulo.length-1>index ? " " : "" )
                    })}</div>
                    <div className='top2'>
                        <div className="imagemd">{post.imagem ? <img className="imagem-musica" src={post.imagem}/> : <></>}</div>
                        <div className="btns">
                            <a className="download" onClick={Download} href={server+"/zips/"+encodeURIComponent(post.zip!)} download={post.titulo.join(" ")+".zip"}>Download</a>
                            <div className="infos">
                                <div className="downloads">Downloads:{post.downloads}</div>
                                { post.visualizacoes!=-1 ? <div className="visualizacoes"><p>{post.visualizacoes}</p><i className="bi-eye"></i></div> : null }
                                <div className='n_comment'>
                                    <p>{post.n_comment}</p>
                                    <i className='bi-chat-dots'></i>
                                </div>
                                <Denuncia tipo="musica"></Denuncia>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='music-list'>
                    {musics.map((music,index)=>{
                        return <MusicaList music={music} onClickMusic={player.current.onClickMusic} getTime={player.current.getTime} getData={getData} index={index} key={index}/>
                    })}
                </div>
            </Link> : <div className="p-musica pm">
                <Conteudo auth={auth} globals={globals} infos={post as { nome: string; usuario: string; logo: string | null; visualizacoes: number; inscrito: boolean | null; }}></Conteudo>
                <div className="top">
                    <div className="titulo-musica txt">{post.titulo.map((texto:string,index:number)=>{
                            return texto.length>1 && texto[0]=="@" ? <Link className='tag' key={index} to={"/@"+encodeURIComponent(texto.slice(1))}>{texto + ( post.titulo.length-1>index ? " " : "" )}</Link> : texto + ( post.titulo.length-1>index ? " " : "" )
                    })}</div>
                    <div className='top2'>
                        <div className="imagemd">{post.imagem ? <img className="imagem-musica" src={post.imagem}/> : <></>}</div>
                        <div className="btns">
                            <a className="download" onClick={Download} href={server+"/zips/"+encodeURIComponent(post.zip!)} download={post.titulo.join(" ")+".zip"}>Download</a>
                            <div className="infos">
                                <div className="downloads">Downloads:{post.downloads}</div>
                                { post.visualizacoes!=-1 ? <div className="visualizacoes"><p>{post.visualizacoes}</p><i className="bi-eye"></i></div> : null }
                                <div className='n_comment' onClick={()=>globals.mobile && setShowComment(showComment=>!showComment)}>
                                    <p>{post.n_comment}</p>
                                    <i className='bi-chat-dots'></i>
                                </div>
                                <Denuncia tipo="musica"></Denuncia>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='music-list'>
                    {musics.map((music,index)=>{
                        return <MusicaList music={music} onClickMusic={player.current.onClickMusic} getTime={player.current.getTime} getData={getData} index={index} key={index}/>
                    })}
                </div>
            </div>}
            {/* {!comentarios ? <div className='comment' onClick={()=>{setComentarios(true)}}>Comentários</div> : <></>} */}
            {/* {comentarios && <Comentarios id_comment={post.id}/>} */}
            {globals.mobile && !isPlaylist ? <Comentarios postAtual={post} showComment={showComment}/> : <></> }
            {/* <Ads slot="7693763089"/> */}
            {/* {!props.id && globals.mobile && <Post globals={globals}  posts={infos}/>} */}
        </div>
    }
    return !isMain ? <Nt post={post} musics={musics}/> : (
        <div id="pg" className={'mu cont' + (id ? " playlist" : "")} style={{width: "100%",minHeight:"100%"}}>
            <div id="bottom">
                <div id="s1">
                    {/* {post.id ? <Ads solt="7693763089"/> : <></>} */}
                    {/* <audio onCanPlayThrough={onLoadedData} ref={audioRef} src={src.audio} onPlay={setChange} onPause={setChange} onTimeUpdate={onTimeUpdate} onLoadedMetadata={onLoadedMetadata} id="audiod" style={{display:"none"}}></audio> */}
                    <Nt post={post} musics={musics}/>
                    <Elements></Elements>
                </div>
                {!globals.mobile && !isPlaylist ? <Comentarios postAtual={post}/> : <></> }
                {/* {!props.id && !globals.mobile && <Alta server={server} posts={infos} /> } */}
            </div>
        </div>
    )
}
export default memo(Musica);