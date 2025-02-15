// Exemplo do componente Contact
import {useState, useEffect, useRef, memo } from 'react';
import Link, { eventInterface } from '../Link.tsx';
import { useGlobal } from '../Global.tsx';
import { useAuth } from '../Auth.jsx';
import './Product.scss'
// import Ads from '../Ads.jsx';
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
function Product({isPlaylist,id,func,isMain,Elements,post,onLinkClick,onLoaded}:{isPlaylist?:any,id?:number,func?:any,isMain?:any,Elements?:any,post:any,onLinkClick:any,onLoaded?:()=>void}) {
    onLinkClick !="";
  const globals = useGlobal();
  const auth = useAuth();
    // axios.post("http://www.teste.com",{type:"info"}).then((result)=>{
    //     posts=JSON.parse(result);
    // })
    const refs={
      descricao:useRef<HTMLDivElement>(null),
    }
    const [summarized,setSummarized]=useState(post.text.length>2);
    useEffect(()=>{
        setSummarized(post.text.length>2);
    },[post]);
    // const update=(pathname:string)=>{
    //     console.log("ai");
    //     if (waiting.current){
    //         if (p.current!=pathname){
    //             waiting.current=false;
    //             p.current=pathname;
    //         }
    //     }
    // }
    // useEffect(()=>{
    //     if (isMain){
    //         navigateClass.current.addListener(update);
    //         return ()=>{
    //             navigateClass.current.addListener(update);
    //         }
    //     }
    // },[]);
    // const c=useRef<number[]>([0,0,0]);
    // useEffect(()=>{
    //   // veriifca se a chamada não é pela montagem do componente
    //   // verifica se a modificação no pathname ocorreu devido a mudança no id
    //   if (c.current[0]>0){
    //     // if (location.pathname!=pathname.current){
    //       get();

    //       // verifica se foi a primeira mudança, pois o anuncio só precisa ser carregado uma vez por tipo de página
    //       if (c.current[0]==1){
    //       globals.isRender();
    //       }
    //     // }
    //   }
    //   if (c.current[2]==1) c.current[2]=0;
    //   c.current[0]++;
    // },[location.pathname]);

    // useEffect(()=>{

    //   // veriifca se a chamada não é pela montagem do componente
    //   if (c.current[1]>0){
    //       get();
    //   }
    //   c.current[1]++;
    //   c.current[2]=1;
    // },[props.id]);
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
            {!isMain ? <Link onClick={(e:eventInterface)=>{e.preventDefault();func("/product/"+post.id,post.id)}} to={"/product/"+post.id} className="p-imagem disabled">
                <Conteudo infos={post} auth={auth} globals={globals}></Conteudo> 
                <div className={(post.usuario!="" ? "" : " wait ") + "descricao-imagem txt " + (!isMain ? "resumo" : "")} ref={refs.descricao}>{post.text.map((line:string[],i:number)=>{
                    return <>
                        {line.map((texto:string,index:number)=>{
                            return texto.length>1 && (texto[0]=="#" || texto[0]=="@") ? <Link className='tag' key={String(i)+String(index)} to={texto[0]=="#" ? "/busca?q="+encodeURIComponent(texto) : "/@"+encodeURIComponent(texto.slice(1))}>{texto + ( line.length-1>index ? " " : "" )}</Link> : isValidURL(texto) ? <div key={index} className='tag' onClick={()=>onLinkClick(texto)}>{texto}</div> : texto + ( line.length-1>index ? " " : "" )
                        })}
                        <br></br>
                    </>
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
            </Link> : <div className="p-imagem pm">
                <Conteudo infos={post} auth={auth} globals={globals}></Conteudo> 
                {summarized ? <div className='descricao-resumo-imagem'><div className="descricao-imagem txt overflow" ref={refs.descricao}>{post.text.map((line:string[],i:number)=>{
                    return <>
                        {line.map((texto:string,index:number)=>{
                            return texto.length>1 && (texto[0]=="#" || texto[0]=="@") ? <Link className='tag' key={String(i)+String(index)} to={texto[0]=="#" ? "/busca?q="+encodeURIComponent(texto) : "/@"+encodeURIComponent(texto.slice(1))}>{texto + ( line.length-1>index ? " " : "" )}</Link> : isValidURL(texto) ? <div key={index} className='tag' onClick={()=>onLinkClick(texto)}>{texto}</div> : texto + ( line.length-1>index ? " " : "" )
                        })}
                        <br></br>
                    </>
                })}</div><div className='resumo-btn' onClick={()=>setSummarized(false)}>Ler mais...</div></div> : 
                <div className={"descricao-imagem txt " + (!isMain ? " resumo" : "")} ref={refs.descricao}>{post.text.map((line:string[],i:number)=>{
                    return <>
                        {line.map((texto:string,index:number)=>{
                            return texto.length>1 && (texto[0]=="#" || texto[0]=="@") ? <Link className='tag' key={String(i)+String(index)} to={texto[0]=="#" ? "/busca?q="+encodeURIComponent(texto) : "/@"+encodeURIComponent(texto.slice(1))}>{texto + ( line.length-1>index ? " " : "" )}</Link> : isValidURL(texto) ? <div key={index} className='tag' onClick={()=>onLinkClick(texto)}>{texto}</div> : texto + ( line.length-1>index ? " " : "" )
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
        <div id="pg" className={'pd cont' + (id ? " playlist" : "")}> 
            <div id="bottom">
                <div id="s1">
                    {/* {post.id ? <Ads solt="7693763089"/> : <></>} */}
                    <Nt post={post}/>
                    <Elements></Elements>
                    {!globals.mobile && !isPlaylist ? <Comentarios postAtual={post}/> : <></> }
                    {/* {!props.id && !globals.mobile && <Alta server={server} posts={infos.alta}/>} */}
                </div>
            </div>
        </div>
    );
}
export default memo(Product);
