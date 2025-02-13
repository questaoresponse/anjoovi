// Exemplo do componente Contact
import { useRef, memo, useEffect, useState, useCallback } from 'react';
import Link from '../Link.tsx';
import { useGlobal } from '../Global.tsx';
import { useAuth } from '../Auth.jsx';
import './Video.scss'
// import Ads from '../Ads.jsx';
import Comentarios from './Comentarios.jsx';
import Conteudo from './Conteudo.tsx';
import Denuncia from './Denuncia.tsx';
import './Conteudo.scss';
import VideoController from './VideoController.tsx';

interface postInterface{
    coverType:string
    srcVideo:string,
    srcImagem:string,
    titulo:string[][],
    logo:string | null,
    nome:string,
    usuario:string,
    dataText:string,
    dataUpdateText:string,
    visualizacoes:number,
    inscrito:null,
    text:string[][],
    id:number,
    tipo:string,
    n_comment:number,
    get?:()=>void,
//   get?:MutableRefObject<(initial?:boolean)=>void>,
}
function Video({isPlaylist,id,func,isMain,Elements,post,onLoaded}:{isPlaylist?:any,id?:number,func?:any,isMain?:any,Elements?:any,post:any,onLoaded?:()=>void}) {
    const globals = useGlobal();
    const { server }=globals;
    const auth = useAuth();
    const isSend=useRef(false);
    const refs={
        video:useRef<HTMLVideoElement>(null),
        videoController:useRef<HTMLDivElement>(null),
    }
    const onTimeUpdate=useCallback(()=>{
        if (refs.video.current!.currentTime / refs.video.current!.duration > 0.1 && !isSend.current){
            isSend.current=true;
            auth.post(server+"/video/"+post.id,{type:"view"});
        }
    },[]);
    const Nt=({post}:{post:postInterface})=>{
        const [showComment,setShowComment]=useState(false);
        useEffect(()=>{
            isMain && onLoaded!();
        },[]);
        return <div className='posts-div'>
            {!isMain ? <Link onClick={(e:any)=>{e.preventDefault();func("/video/"+post.id,post.id)}} to={"/video/"+post.id} className="p-video disabled">
                <Conteudo infos={post} auth={auth} globals={globals}></Conteudo>
                <div className="titulo-video">{post.titulo.map((line,i)=>{
                    return <>
                        {line.map((titulo,index)=>{
                            return titulo.length>0 && (titulo[0]=="#" || titulo[0]=="@") ? <Link className='tag' key={String(i)+String(index)} to={titulo[0]=="#" ? "/busca?q="+encodeURIComponent(titulo) : "/@"+encodeURIComponent(titulo.slice(1))}>{titulo + (line.length-1>index ? " " : "")}</Link> : titulo + (line.length-1>index ? " " : "")
                        })}
                        <br></br>
                    </>
                })}</div>
                <div className="campo-video">
                    <img className='campo-video-content' src={post.srcImagem}></img>
                </div>
                {/* <div className={"texto-video txt " + (!isMain ? " resumo" : "")}>{post.text.map((line:string[],i:number)=>{
                    return <>
                        {line.map((texto:string,index:number)=>{
                            return texto.length>1 && (texto[0]=="#" || texto[0]=="@") ? <Link className='tag' key={String(i)+String(index)} to={texto[0]=="#" ? "/busca?q="+encodeURIComponent(texto) : "/@"+encodeURIComponent(texto.slice(1))}>{texto + ( line.length-1>index ? " " : "" )}</Link> : isValidURL(texto) ? <div key={index} className='tag' onClick={()=>onLinkClick(texto)}>{texto}</div> : texto + ( line.length-1>index ? " " : "" )
                        })}
                        <br></br>
                    </>
                })}</div> */}
                <div className="data_d">
                    <p className="data data_data">{post.dataText}</p>
                    {post.dataUpdateText!="" ? <p className="data data_a">{post.dataUpdateText}</p> : <></>}
                    { post.visualizacoes!=-1 ? <div className="visualizacoes"><p>{post.visualizacoes}</p><i className="bi-eye"></i></div> : null }
                    <div className='n_comment'>
                        <p>{post.n_comment}</p>
                        <i className='bi-chat-dots'></i>
                    </div>
                    <Denuncia tipo="video"></Denuncia>
                </div>
            </Link> : <div className='p-video pm'>
                <Conteudo infos={post} auth={auth} globals={globals}></Conteudo>
                <div className="titulo-video">{post.titulo.map((line,i)=>{
                    return <>
                        {line.map((titulo,index)=>{
                            return titulo.length>0 && (titulo[0]=="#" || titulo[0]=="@") ? <Link className='tag' key={String(i)+String(index)} to={titulo[0]=="#" ? "/busca?q="+encodeURIComponent(titulo) : "/@"+encodeURIComponent(titulo.slice(1))}>{titulo + (line.length-1>index ? " " : "")}</Link> : titulo + (line.length-1>index ? " " : "")
                        })}
                        <br></br>
                    </>
                })}</div>
                <VideoController ref={refs.videoController} props={{ref:refs.video,onTimeUpdate:onTimeUpdate}} srcVideo={post.srcVideo}/>
                {/* <div className={"texto-video txt " + (!isMain ? " resumo" : "")}>{post.text.map((line:string[],i:number)=>{
                    return <>
                        {line.map((texto:string,index:number)=>{
                            return texto.length>0 && (texto[0]=="#" || texto[0]=="@") ? <Link className='tag' key={String(i)+String(index)} to={texto[0]=="#" ? "/busca?q="+encodeURIComponent(texto) : "/@"+encodeURIComponent(texto.slice(1))}>{texto + ( line.length-1>index ? " " : "" )}</Link> : isValidURL(texto) ? <div key={index} className='tag' onClick={()=>onLinkClick(texto)}>{texto + ( line.length-1>index ? " " : "" )}</div> : texto + ( line.length-1>index ? " " : "" )
                        })}
                        <br></br>
                    </>
                })}</div> */}
                <div className="data_d">
                    <p className="data data_data">{post.dataText}</p>
                    {post.dataUpdateText!="" ? <p className="data data_a">{post.dataUpdateText}</p> : <></>}
                    { post.visualizacoes!=-1 ? <div className="visualizacoes"><p>{post.visualizacoes}</p><i className="bi-eye"></i></div> : null }
                    <div className='n_comment' onClick={()=>globals.mobile && setShowComment(showComment=>!showComment)}>
                        <p>{post.n_comment}</p>
                        <i className='bi-chat-dots'></i>
                    </div>
                    <Denuncia tipo="video"></Denuncia>
                </div>
            </div>}
            {globals.mobile ? !isMain || isPlaylist ? <></> : <Comentarios postAtual={post} showComment={showComment}/> : <></>}
        </div>
    }
    return !isMain ? <Nt post={post}/> : (
        <div>
            <div id="pg" className={'vi cont' + (id ? " playlist" : "")}> 
                <div id="bottom">
                    <div id="s1">
                        {/* {post.id ? <Ads slot="7693763089"/> : <></>} */}
                        <Nt post={post}></Nt>
                        <Elements></Elements>
                    </div>
                    {/* {!globals.mobile && <Ads slot="7577017868"/>} */}
                    {!globals.mobile && !isPlaylist ? <Comentarios postAtual={post}/> : <></> }

                    {/* {!props.id && !globals.mobile && <Alta server={server} posts={infos.alta}/>} */}
                </div>
            </div>
        </div>
    );
}
export default memo(Video);
