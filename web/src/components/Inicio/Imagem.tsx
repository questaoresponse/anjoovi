// Exemplo do componente Contact
import {useState, useEffect, useRef, memo } from 'react';
import Link, { eventInterface } from '../Link.tsx';
import { useGlobal } from '../Global.tsx';
import { useAuth } from '../Auth.jsx';
import './Imagem.scss'
import Ads from '../Ads.jsx';
import Comentarios from './Comentarios.jsx';
import Conteudo from './Conteudo.tsx';
import Denuncia from './Denuncia.tsx';
import './Conteudo.scss';
interface postInterface{
  alta:any,
  srcImagem:string | null,
  logo:string | null,
  nome:string,
  usuario:string,
  dataText:string,
  dataUpdateText:string,
  visualizacoes:number,
  inscrito:boolean | null,
  text:string[][],
  id:number,
  tipo:string,
  n_comment:number,
}
function Imagem({isPlaylist,id,func,isMain,Elements,post,onLinkClick,onLoaded}:{isPlaylist?:any,id?:number,func?:any,isMain?:any,Elements?:any,post:any,onLinkClick:any,onLoaded?:()=>void}) {
    onLinkClick !="";
  const globals = useGlobal();
  const auth = useAuth();
    const refs={
      descricao:useRef<HTMLDivElement>(null),
    }
    const [summarized,setSummarized]=useState(post.text.length>2);
    useEffect(()=>{
        setSummarized(post.text.length>2);
    },[post]);
    const isValidURL=(str:any)=>{
        try {
          const url=new URL(str);
        return url.protocol=="https:";
        } catch (e) {
          return false;
        }
    }
    const Nt=({post}:{post:postInterface})=>{
        useEffect(()=>{
            isMain && onLoaded!();
        },[]);
        return <div className='posts-div'>
            {!isMain ? <Link onClick={(e:eventInterface)=>{e.preventDefault();func("/imagem/"+post.id,post.id)}} to={"/imagem/"+post.id} className="imagem disabled">
                <Conteudo infos={post} auth={auth} globals={globals}></Conteudo> 
                <div className={(post.usuario!="" ? "" : " wait ") + "descricao-imagem txt " + (!isMain ? "resumo" : "")} ref={refs.descricao}>{post.text.map((line:string[],i:number)=>{
                    return <div key={i}>
                        {line.map((texto:string,index:number)=>{
                            return texto.length>1 && (texto[0]=="#" || texto[0]=="@") ? <Link className='tag' key={String(i)+String(index)} to={texto[0]=="#" ? "/busca?q="+encodeURIComponent(texto) : "/@"+encodeURIComponent(texto.slice(1,-1))}>{texto + ( line.length-1>index ? " " : "" )}</Link> : isValidURL(texto) ? <div key={index} className='tag' onClick={()=>onLinkClick(texto)}>{texto}</div> : texto + ( line.length-1>index ? " " : "" )
                        })}
                        <br></br>
                    </div>
                })}</div>
                <div className="campo-img-imagem">
                    {post.srcImagem ? <img src={post.srcImagem}/> : <></>}
                </div>
                <div className="data_d">
                    <p className="data data_data">{post.dataText}</p>
                    {post.dataUpdateText!="" ? <p className="data data_a">{post.dataUpdateText}</p> : <></>}
                    { post.visualizacoes!=-1 ? <div className="visualizacoes"><p>{post.visualizacoes}</p><i className="bi-eye"></i></div> : null }
                    <div className='n_comment'>
                        <p>{post.n_comment}</p>
                        <i className='bi-chat-dots'></i>
                    </div>
                    <Denuncia tipo="noticia"></Denuncia>
                </div>
            </Link> : <div className="imagem">
                <Conteudo infos={post} auth={auth} globals={globals}></Conteudo> 
                {summarized ? <div className='descricao-resumo-imagem'><div className="descricao-imagem txt overflow" ref={refs.descricao}>{post.text.map((line:string[],i:number)=>{
                    return <>
                        {line.map((texto:string,index:number)=>{
                            return texto.length>1 && (texto[0]=="#" || texto[0]=="@") ? <Link className='tag' key={String(i)+String(index)} to={texto[0]=="#" ? "/busca?q="+encodeURIComponent(texto) : "/@"+encodeURIComponent(texto.slice(1,-1))}>{texto + ( line.length-1>index ? " " : "" )}</Link> : isValidURL(texto) ? <div key={index} className='tag' onClick={()=>onLinkClick(texto)}>{texto}</div> : texto + ( line.length-1>index ? " " : "" )
                        })}
                        <br></br>
                    </>
                })}</div><div className='resumo-btn' onClick={()=>setSummarized(false)}>Ler mais...</div></div> : 
                <div className={"descricao-imagem txt " + (!isMain ? " resumo" : "")} ref={refs.descricao}>{post.text.map((line:string[],i:number)=>{
                    return <>
                        {line.map((texto:string,index:number)=>{
                            return texto.length>1 && (texto[0]=="#" || texto[0]=="@") ? <Link className='tag' key={String(i)+String(index)} to={texto[0]=="#" ? "/busca?q="+encodeURIComponent(texto) : "/@"+encodeURIComponent(texto.slice(1,-1))}>{texto + ( line.length-1>index ? " " : "" )}</Link> : isValidURL(texto) ? <div key={index} className='tag' onClick={()=>onLinkClick(texto)}>{texto}</div> : texto + ( line.length-1>index ? " " : "" )
                        })}
                        <br></br>
                    </>
                })}</div> }
                <div className="campo-img-imagem">
                    {post.srcImagem ? <img src={post.srcImagem}/> : <></>}
                </div>
                <div className="data_d">
                    <p className="data data_data">{post.dataText}</p>
                    {post.dataUpdateText!="" ? <p className="data data_a">{post.dataUpdateText}</p> : <></>}
                    { post.visualizacoes!=-1 ? <div className="visualizacoes"><p>{post.visualizacoes}</p><i className="bi-eye"></i></div> : null }
                    <div className='n_comment'>
                        <p>{post.n_comment}</p>
                        <i className='bi-chat-dots'></i>
                    </div>
                    <Denuncia tipo="noticia"></Denuncia>
                </div>
            </div>}
            {/* {comentarios && <Comentarios id_comment={post.id}/>} */}

            {globals.mobile ? !isMain || isPlaylist ? <></> : <Comentarios postAtual={post}/> : <></>}

            {/* <Ads slot="7693763089"/> */}
            {/* {!props.id && globals.mobile && <Post globals={globals} posts={infos.alta}/>} */}
        </div>
    }
    return !isMain ? <Nt post={post}/> : (
        <div id="pg" className={'im cont' + (id ? " playlist" : "")}> 
            <div id="bottom">
                <div id="s1">
                    {post.id ? <Ads solt="7693763089"/> : <></>}
                    <Nt post={post}/>
                    <Elements></Elements>
                    {!globals.mobile && !isPlaylist ? <Comentarios postAtual={post}/> : <></> }
                    {/* {!props.id && !globals.mobile && <Alta server={server} posts={infos.alta}/>} */}
                </div>
            </div>
        </div>
    );
}
export default memo(Imagem);
