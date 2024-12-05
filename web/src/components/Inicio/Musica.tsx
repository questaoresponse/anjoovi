import { useState, useEffect, useRef, memo } from 'react';
import { useLocation } from 'react-router-dom';
import Link, { eventInterface } from '../Link.tsx';
import { useGlobal } from '../Global.tsx';
import { useAuth } from '../Auth.jsx';
import './Musica.scss';
import Ads from '../Ads.jsx';
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
interface postInterface2{
    audio:string,
    imagem:string | null,
    titulo:string,
    logo:string | null,
    nome:string,
    usuario:string,
    zip:string | null,
    downloads:number,
    visualizacoes:number,
    inscrito:string,
    id:number,
    tipo:string,
    usuario_musica:string,
    arquivo:string,
    duration:string,
    n_comment:number,
}
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
function Musica({isPlaylist,id,func,isMain,Elements,post,onLinkClick}:{isPlaylist?:any,id?:number,func?:any,isMain?:any,Elements?:any,post:any,onLinkClick:any}){
    onLinkClick !="";
    const globals=useGlobal();
    const { server, player, navigate }=globals;
    const auth=useAuth();
    const location=useLocation();
    // const { arquivos, musicasl, id }=useMusica();
    const arquivos=useRef([]);
    // const [musicasl,setMusicaslState]=useState<musicaslInterface[]>([]);
    const musicsRef=useRef<musicInterface[]>([]);
    const [musics,setMusics]=useState<musicInterface[]>([]);
    const [postAtual,setPostAtual]=useState<postInterface>({
        audio:"",
        imagem:null,
        titulo:[],
        logo:null,
        nome:"",
        usuario:"",
        zip:null,
        downloads:0,
        visualizacoes:-1,
        inscrito:null,
        id:-1,
        tipo:"",
        n_comment:0,
    })
    const getMusicName=(name:any)=>{
        const ts=name.split("_").slice(4).join("_");
        return ts.split(".").slice(0,-1);
    }
    const ajeitar=(post:postInterface2)=>{
        const isCurrentMusic=player.current.page_id==post.id;
        arquivos.current=JSON.parse(post.arquivo);
        const durations=JSON.parse(post.duration);
        var musics;
        if (isCurrentMusic){
            musics=player.current.musics;
        } else {
            musics=arquivos.current.map((musica:any,index:number)=>{
                return { 
                    name:getMusicName(musica),
                    src:server+"/musics/"+encodeURIComponent(musica),
                    currentTime:isCurrentMusic ? player.current.musics[index].currentTime : 0,
                    duration: isCurrentMusic ? player.current.musics[index].duration : durations[index],
                    isView:false,
                    setCurrentTime:null,
                    setPlay:null,
                }
            });
        }
        musicsRef.current=musics;
        setMusics(musics);
        setPostAtual({
            audio:server+"/musics/"+encodeURIComponent(post.arquivo),
            imagem:server+"/images/"+encodeURIComponent(post.imagem!),
            titulo:(post.titulo || "").split(" "),
            logo:server+"/images/"+encodeURIComponent(post.logo!),
            nome:post.nome,
            usuario:post.usuario,
            zip:post.zip,
            downloads:post.downloads,
            visualizacoes:post.visualizacoes,
            inscrito:JSON.parse(post.inscrito!),
            id:post.id,
            tipo:"musica",
            n_comment:post.n_comment,
        });
    };
    const isLoaded=useRef(false);
    const get=(initial=false)=>{
        if (initial && isLoaded.current) return;
        if (initial && !isLoaded.current) isLoaded.current=true;
        if (post){
            ajeitar(post);
        }
    }
    const [isReal,setIsReal]=useState(false);
    const c=useRef(0);
    useEffect(()=>{
        get();
        if (c.current>0) {
            if (isMain){
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
    // const get=async (initial=false)=>{

    //     if (initial && isLoaded.current) return;
    //     if (initial && !isLoaded.current) isLoaded.current=true;
    //     // update();
    //     id.current=Number(props.id || location.pathname.split("/")[2]);
    //     if (isMain){
    //         ajeitar(props.postAtual);
    //     } else {
    //         var params:URLSearchParams=new URLSearchParams(location.search);
    //         params.set("c","1");
    //         params.set("isMain",isMain ? "true" : "false");
    //         var result=await auth.get(server+"/musica/"+id.current+"?"+params.toString());
    //         if (result.error){
    //             setRedirectError(result.error);
    //         } else {
    //             document.title=result.data.post.titulo;
    //             // setPosts(result.data.posts);
    //             if (posts.length>0){
    //                 setPosts([]);
    //                 setTimeout(()=>{
    //                     setPosts(result.data.posts);
    //                 },100);
    //             } else {
    //                 setPosts(result.data.posts);
    //             }
    //             ajeitar(result.data.post);
    //             // descompactarArquivoZIP(result.data.zip);
    //         }
    //     }
    // }
    // get(true);
    // const c=useRef<number[]>([0,0,0]);
    // useEffect(()=>{
    //   // veriifca se a chamada não é pela montagem do componente
    //   // verifica se a modificação no pathname ocorreu devido a mudança no id
    //   if (c.current[0]>0){
    //     // if (location.pathname!=pathname.current){
    //         get();
    //             music.current && get();
    //         // }
    //         // verifica se foi a primeira mudança, pois o anuncio só precisa ser carregado uma vez por tipo de página
    //         if (c.current[0]==1){
    //             isRender();
    //         }
    //     // }
    //   }
    //   if (c.current[2]==1) c.current[2]=0;
    //   c.current[0]++;
    //   return ()=>{
    //     player.current.alterar_player=null;
    //     player.current.setTime=null;
    //   }
    // },[location.pathname]);

    // useEffect(()=>{

    //     // veriifca se a chamada não é pela montagem do componente
    //     if (c.current[1]>0){
    //         get();
    //         music.current && get();
    //     }
    //     c.current[1]++;
    //     c.current[2]=1;
    // },[props.id]);
    const Download=()=>{
        var params=new URLSearchParams();
        params.set("type","download");
        params.set("id",location.pathname.split("/")[2]);
        auth.get(server+"/musica/"+id+"?"+params.toString());
    }
    const Nt=({post}:{post:postInterface,musics:musicInterface[]})=>{
        // const [comentarios,setComentarios]=useState<boolean>(false);
        return <div>
            {!isMain ? <Link onClick={(e:eventInterface)=>{e.preventDefault();func("/musica/"+post.id,post.id)}} to={"/musica/"+post.id} className="musica disabled">
                <Conteudo auth={auth} globals={globals} infos={post as { nome: string; usuario: string; logo: string | null; visualizacoes: number; inscrito: boolean | null; }}></Conteudo>
                <div className="top">
                        <div className="imagemd">{post.imagem ? <img className="imagem" src={post.imagem}/> : <></>}</div>
                        <div className="top2">
                            <div className="titulo-musica txt">{post.titulo.map((texto:string,index:number)=>{
                                return texto.length>1 && texto[0]=="@" ? <Link className='tag' key={index} to={"/@"+encodeURIComponent(texto.slice(1,-1))}>{texto + ( post.titulo.length-1>index ? " " : "" )}</Link> : texto + ( post.titulo.length-1>index ? " " : "" )
                            })}</div>
                            <a className="download" onClick={Download} href={server+"/zips/"+encodeURIComponent(post.zip!)} download={post.titulo+".zip"}>Download</a>
                            <div className="infos">
                                <div className="downloads">Downloads:{post.downloads}</div>
                                { post.visualizacoes!=-1 ? <div className="visualizacoes"><p>{post.visualizacoes}</p><i className="bi-eye"></i></div> : null }
                                {!isMain && <div className='n_comment'>
                                    <p>{post.n_comment}</p>
                                    <i className='bi-chat-dots'></i>
                                </div>} 
                                <Denuncia tipo="musica"></Denuncia>
                            </div>
                        </div>
                    </div>
                    <div>
                        {musics.map((music,index)=>{
                            return <MusicaList music={music} onClickMusic={player.current.onClickMusic} getTime={player.current.getTime} getData={getData} index={index} key={index}/>
                        })}
                </div>
            </Link> : <div className="musica">
                <Conteudo auth={auth} globals={globals} infos={post as { nome: string; usuario: string; logo: string | null; visualizacoes: number; inscrito: boolean | null; }}></Conteudo>
                <div className="top">
                    <div className="imagemd">{post.imagem ? <img className="imagem-musica" src={post.imagem}/> : <></>}</div>
                    <div className="top2">
                        <div className="titulo-musica txt">{post.titulo.map((texto:string,index:number)=>{
                                return texto.length>1 && texto[0]=="@" ? <Link className='tag' key={index} to={"/@"+encodeURIComponent(texto.slice(1,-1))}>{texto + ( post.titulo.length-1>index ? " " : "" )}</Link> : texto + ( post.titulo.length-1>index ? " " : "" )
                        })}</div>
                        <div id="divs">
                            <a className="download" onClick={Download} href={server+"/zips/"+encodeURIComponent(post.zip!)} download={post.titulo+".zip"}>Download</a>
                            <div className="infos">
                                <div className="downloads">Downloads:{post.downloads}</div>
                                { post.visualizacoes!=-1 ? <div className="visualizacoes"><p>{post.visualizacoes}</p><i className="bi-eye"></i></div> : null }
                                <Denuncia tipo="musica"></Denuncia>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {musics.map((music,index)=>{
                        return <MusicaList music={music} onClickMusic={player.current.onClickMusic} getTime={player.current.getTime} getData={getData} index={index} key={index}/>
                    })}
                </div>
            </div>}
            {/* {!comentarios ? <div className='comment' onClick={()=>{setComentarios(true)}}>Comentários</div> : <></>} */}
            {/* {comentarios && <Comentarios id_comment={post.id}/>} */}
            {globals.mobile && !isPlaylist ? <Comentarios previousRequest={previousRequest}/> : <></> }
            {/* <Ads slot="7693763089"/> */}
            {/* {!props.id && globals.mobile && <Post globals={globals}  posts={infos}/>} */}
        </div>
    }
    return !isMain ? <Nt post={postAtual} musics={musics}/> : (
        <div id="pg" className={'mu cont' + (id ? " playlist" : "")} style={{width: "100%",minHeight:"100%"}}>
            <div id="bottom">
                <div id="s1">
                    {post.id ? <Ads solt="7693763089"/> : <></>}
                    {/* <audio onCanPlayThrough={onLoadedData} ref={audioRef} src={src.audio} onPlay={setChange} onPause={setChange} onTimeUpdate={onTimeUpdate} onLoadedMetadata={onLoadedMetadata} id="audiod" style={{display:"none"}}></audio> */}
                    <Nt post={postAtual} musics={musics}/>
                    <Elements></Elements>
                </div>
                {!globals.mobile && !isPlaylist ? <Comentarios previousRequest={previousRequest}/> : <></> }
                {/* {!props.id && !globals.mobile && <Alta server={server} posts={infos} /> } */}
            </div>
        </div>
    )
}
export default memo(Musica);