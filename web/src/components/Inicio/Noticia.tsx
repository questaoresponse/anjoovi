// Exemplo do componente Contact
import { memo, useEffect, useState } from 'react';
import Link, { eventInterface } from '../Link.tsx';
import { useGlobal } from '../Global.tsx';
import { useAuth } from '../Auth.jsx';
import './Noticia.scss'
import Ads from '../Ads.jsx';
import Comentarios from './Comentarios.jsx';
import Conteudo from './Conteudo.tsx';
import Denuncia from './Denuncia.tsx';
import './Conteudo.scss';

interface postInterface{
    isLoaded:boolean,
    srcImagem:string,
    titulo:string[],
    subtitulo:string[],
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
function Noticia({isPlaylist,id,func,isMain,Elements,post,onLinkClick,onLoaded}:{isPlaylist?:any,id?:number,func?:any,isMain?:any,Elements?:any,post:any,onLinkClick:any,onLoaded?:()=>void}) {
    const globals = useGlobal();
    const auth = useAuth();
    const isValidURL=(str:any)=>{
        try {
          const url=new URL(str);
            return url.protocol=="https:";
        } catch (e) {
          return false;
        }
    }
    const Nt=({post}:{post:postInterface})=>{
        const [showComment,setShowComment]=useState(false);
        useEffect(()=>{
            isMain && onLoaded!();
        },[]);
        return <div className='posts-div'>
            {!isMain ? <Link onClick={(e:eventInterface)=>{e.preventDefault();func("/noticia/"+post.id,post.id)}} to={"/noticia/"+post.id} className="noticia disabled">
                <Conteudo infos={post} auth={auth} globals={globals}></Conteudo>
                <div className="titulo-noticia">{post.titulo.map((titulo,index)=>{
                    return titulo.length>1 && titulo[0]=="@" ? <Link className='tag' key={index} to={"/@"+encodeURIComponent(titulo.slice(1))}>{titulo + ( post.titulo.length-1>index ? " " : "" )}</Link> : titulo + ( post.titulo.length-1>index ? " " : "" )
                })}</div>
                <div className="subtitulo-noticia">{post.subtitulo.map((subtitulo,index)=>{
                    return subtitulo.length>1 && (subtitulo[0]=="#" || subtitulo[0]=="@") ? <Link className='tag' key={String(index)} to={subtitulo[0]=="#" ? "/busca?q="+encodeURIComponent(subtitulo) : "/@"+encodeURIComponent(subtitulo.slice(1))}>{subtitulo + ( post.subtitulo.length-1>index ? " " : " " )}</Link> : subtitulo + ( post.subtitulo.length-1>index ? " " : "" )
                })}</div>
                <div className="campo-img-noticia">
                    {post.srcImagem ? <img src={post.srcImagem}/> : <></>}
                </div>
                <div className={"texto-noticia txt " + (!isMain ? " resumo" : "")}>{post.text.map((line:string[],i:number)=>{
                    return <div key={i}>
                        {line.map((texto:string,index:number)=>{
                            return texto.length>1 && (texto[0]=="#" || texto[0]=="@") ? <Link className='tag' key={String(i)+String(index)} to={texto[0]=="#" ? "/busca?q="+encodeURIComponent(texto) : "/@"+encodeURIComponent(texto.slice(1))}>{texto + ( line.length-1>index ? " " : "" )}</Link> : isValidURL(texto) ? <div key={index} className='tag' onClick={()=>onLinkClick(texto)}>{texto}</div> : texto + ( line.length-1>index ? " " : "" )
                        })}
                        <br></br>
                    </div>
                })}</div>
                <div className="data_d">
                    { post.visualizacoes!=-1 ? <div className="visualizacoes"><p>{post.visualizacoes}</p><i className="bi-eye"></i></div> : null }
                    <div className='n_comment'>
                        <p>{post.n_comment}</p>
                        <i className='bi-chat-dots'></i>
                    </div>
                    <p className="data data_data">{post.dataText}</p>
                    {post.dataUpdateText!="" ? <p className="data data_a">{post.dataUpdateText}</p> : <></>}
                    
                    <Denuncia tipo="noticia"></Denuncia>
                </div>
            </Link> : <div className={"noticia "+(false ? " loading" : "")}>
                <Conteudo infos={post} auth={auth} globals={globals}></Conteudo>
                <div className="titulo-noticia">{post.titulo.map((titulo,index)=>{
                    return titulo.length>0 && titulo[0]=="@" ? <Link className='tag' key={index} to={"/@"+encodeURIComponent(titulo.slice(1))}>{titulo + ( post.titulo.length-1>index ? " " : "" )}</Link> : titulo + ( post.titulo.length-1>index ? " " : "" )
                })}</div>
                <p className="subtitulo-noticia">{post.subtitulo.map((subtitulo,index)=>{
                    return subtitulo.length>0 && (subtitulo[0]=="#" || subtitulo[0]=="@") ? <Link className='tag' key={String(index)} to={subtitulo[0]=="#" ? "/busca?q="+encodeURIComponent(subtitulo) : "/@"+encodeURIComponent(subtitulo.slice(1))}>{subtitulo + ( post.subtitulo.length-1>index ? " " : "" )}</Link> : subtitulo + ( post.subtitulo.length-1>index ? " " : "" )
                })}</p>
                <div className={(post.usuario!="" ? "" : "wait ")+"campo-img-noticia"}>
                    {post.srcImagem ? <img src={post.srcImagem}/> : <></>}
                </div>
                <div className={"texto-noticia txt " + (!isMain ? " resumo" : "")}>{post.text.map((line:string[],i:number)=>{
                    return <div key={i}>
                        {line.map((texto:string,index:number)=>{
                            return texto.length>0 && (texto[0]=="#" || texto[0]=="@") ? <Link className='tag' key={String(i)+String(index)} to={texto[0]=="#" ? "/busca?q="+encodeURIComponent(texto) : "/@"+encodeURIComponent(texto.slice(1))}>{texto + ( line.length-1>index ? " " : "" )}</Link> : isValidURL(texto) ? <div key={index} className='tag' onClick={()=>onLinkClick(texto)}>{texto + ( line.length-1>index ? " " : "" )}</div> : texto + ( line.length-1>index ? " " : "" )
                        })}
                        <br></br>
                    </div>
                })}</div>
                <div className="data_d">
                    <p className="data data_data">{post.dataText}</p>
                    {post.dataUpdateText!="" ? <p className="data data_a">{post.dataUpdateText}</p> : <></>}
                    { post.visualizacoes!=-1 || !post.isLoaded ? <div className="visualizacoes"><p>{post.isLoaded ? post.visualizacoes : ""}</p><i className="bi-eye"></i></div> : null }
                    <div className='n_comment' onClick={()=>globals.mobile && setShowComment(showComment=>!showComment)}>
                        <p>{post.n_comment}</p>
                        <i className='bi-chat-dots'></i>
                    </div>
                    <Denuncia tipo="noticia"></Denuncia>
                </div>
            </div>}
            {globals.mobile ? !isPlaylist && <Comentarios postAtual={post} showComment={showComment}/> : <></>}
            {/* <Ads slot="7693763089"/> */}
            {/* {!props.id && globals.mobile && <Post globals={globals} posts={infos.alta}/>} */}
        </div>
    };
    return !isMain ? <Nt post={post}/> : (
        <div>
        <div id="pg" className={'no cont' + (id ? " playlist" : "")}> 
            <div id="bottom">
                <div id="s1">
                    {post.id ? <Ads slot="7693763089"/> : <></>}
                    <Nt post={post}></Nt>
                    <Elements></Elements>
                </div>
                {!globals.mobile && <Ads slot="7577017868"/>}
                {!globals.mobile && !isPlaylist ? <Comentarios postAtual={post}/> : <></> }

                {/* {!props.id && !globals.mobile && <Alta server={server} posts={infos.alta}/>} */}
            </div>
        </div>
        </div>
    );
}
export default memo(Noticia);
