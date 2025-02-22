// Exemplo do componente Contact
import {useState, useEffect, useRef, memo, useCallback, SetStateAction, Dispatch, MutableRefObject } from 'react';
import Link, { eventInterface } from '../Link.tsx';
import GlobalContextInterface, { useGlobal } from '../Global.tsx';
import authInterface, { useAuth } from '../Auth.jsx';
import './Imagem.scss'
// import Ads from '../Ads.jsx';
import Comentarios from './Comentarios.jsx';
import Conteudo from './Conteudo.tsx';
import Denuncia from './Denuncia.tsx';
import './Conteudo.scss';
interface postInterface{
  alta:any,
  srcImagem:{
    isWidthBigger:boolean,
    containerAspect:number,
    imageAspect:number,
    originalFormat:boolean,
    src:string
  }[],
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
interface sizeInterface{
    containerAspectRatio:string,
    containerWidth:string,
    containerHeight:string,
    elementMaxWidth:string,
    elementMaxHeight:string,
    elementObjectFit:any,
    elementAspectRatio:string,
    elementWidth:string,
    elementHeight:string,
}
const Nt=memo(({descricao,post,size,index,onLinkClick,isValidURL,onLoaded,func,summarized,setSummarized,onLeftClick,showArrowLeft,onRightClick,showArrowRight,isMain,isPlaylist,auth,globals}:{descricao:MutableRefObject<HTMLDivElement | null>,post:postInterface,size:sizeInterface,index:number,onLinkClick:(text:string)=>void,isValidURL:(url:string)=>boolean,onLoaded:()=>void,func:(path:string,id:number)=>void,summarized:boolean,setSummarized:Dispatch<SetStateAction<boolean>>,onLeftClick:()=>void,showArrowLeft:boolean,onRightClick:()=>void,showArrowRight:boolean,isMain:boolean,isPlaylist:boolean,auth:authInterface,globals:GlobalContextInterface})=>{
    const [showComment,setShowComment]=useState(false);
    useEffect(()=>{
        isMain && onLoaded!();
    },[post]);

    return <div className='posts-div'>
        {!isMain ? <Link onClick={(e:eventInterface)=>{e.preventDefault();func("/imagem/"+post.id,post.id)}} to={"/imagem/"+post.id} className="p-imagem disabled">
            <Conteudo infos={post} auth={auth} globals={globals}></Conteudo> 
            <div className={(post.usuario!="" ? "" : " wait ") + "descricao-imagem txt " + (!isMain ? "resumo" : "")} ref={descricao}>{post.text.map((line:string[],i:number)=>{
                return <div key={String(i)}>
                    {line.map((texto:string,index:number)=>{
                        return texto.length>1 && (texto[0]=="#" || texto[0]=="@") ? <Link className='tag' key={String(i)+String(index)} to={texto[0]=="#" ? "/busca?q="+encodeURIComponent(texto) : "/@"+encodeURIComponent(texto.slice(1))}>{texto + ( line.length-1>index ? " " : "" )}</Link> : isValidURL(texto) ? <div key={index} className='tag' onClick={()=>onLinkClick(texto)}>{texto}</div> : texto + ( line.length-1>index ? " " : "" )
                    })}
                    <br></br>
                </div>
            })}</div>
            <div style={{aspectRatio:globals.mobile ? "initial" : "16/9"}} className='campo-img-imagem'>
            <div style={{aspectRatio:size.containerAspectRatio,width:size.containerWidth,height:size.containerHeight,display:"flex",justifyContent:"center",alignItems:"center",overflow: "hidden"}}>
                    {post.srcImagem!.length > 0 ? <img style={{maxWidth:size.elementMaxWidth,maxHeight:size.elementMaxHeight,objectFit:size.elementObjectFit,aspectRatio:size.elementAspectRatio,width:size.elementWidth,height:size.elementHeight}} src={post.srcImagem[index].src}/> : <></>}
                </div>
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
            {summarized ? <div className='descricao-resumo-imagem'>
                <div className="descricao-imagem txt overflow" ref={descricao}>{post.text.map((line:string[],i:number)=>{
                    return <div key={String(i)}>
                        {line.map((texto:string,index:number)=>{
                            return texto.length>1 && (texto[0]=="#" || texto[0]=="@") ? <Link className='tag' key={String(i)+String(index)} to={texto[0]=="#" ? "/busca?q="+encodeURIComponent(texto) : "/@"+encodeURIComponent(texto.slice(1))}>{texto + ( line.length-1>index ? " " : "" )}</Link> : isValidURL(texto) ? <div key={index} className='tag' onClick={()=>onLinkClick(texto)}>{texto}</div> : texto + ( line.length-1>index ? " " : "" )
                        })}
                        <br></br>
                    </div>
                })}</div>
                <div className='resumo-btn' onClick={()=>setSummarized(false)}>Ler mais...</div>
            </div> : 
            <div className="descricao-imagem txt" ref={descricao}>{post.text.map((line:string[],i:number)=>{
                return <div key={String(i)}>
                    {line.map((texto:string,index:number)=>{
                        return texto.length>1 && (texto[0]=="#" || texto[0]=="@") ? <Link className='tag' key={String(i)+String(index)} to={texto[0]=="#" ? "/busca?q="+encodeURIComponent(texto) : "/@"+encodeURIComponent(texto.slice(1))}>{texto + ( line.length-1>index ? " " : "" )}</Link> : isValidURL(texto) ? <div key={index} className='tag' onClick={()=>onLinkClick(texto)}>{texto}</div> : texto + ( line.length-1>index ? " " : "" )
                    })}
                    <br></br>
                </div>
            })}</div> }
            <div style={{aspectRatio:globals.mobile ? "initial" : "16/9"}} className='campo-img-imagem'>
                <div style={{aspectRatio:size.containerAspectRatio,width:size.containerWidth,height:size.containerHeight,display:"flex",justifyContent:"center",alignItems:"center",overflow: "hidden"}}>
                    {post.srcImagem!.length > 0 ? <img style={{maxWidth:size.elementMaxWidth,maxHeight:size.elementMaxHeight,objectFit:size.elementObjectFit,aspectRatio:size.elementAspectRatio,width:size.elementWidth,height:size.elementHeight}} src={post.srcImagem[index].src}/> : <></>}
                    {post.srcImagem!.length > 1 ? <>
                        <svg onClick={onLeftClick} className={'arrow-left' + ( showArrowLeft ? "" : " disabled")} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 320 512">
                            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
                        </svg>
                        <svg onClick={onRightClick} className={'arrow-right' + ( showArrowRight ? "" : " disabled")} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 320 512">
                        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
                        </svg>
                        <div className='dot-list'>{Array.from({length:post.srcImagem!.length},(_,i:number)=>{
                            return <svg key={String(i)} className={'dot-item' + (i==index ? " selected" : "")} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                            </svg>
                        })}</div>
                    </> : <></>}
                </div>
            </div>
            <div className="data_d">
                <p className="data data_data">{post.dataText}</p>
                {post.dataUpdateText!="" ? <p className="data data_a">{post.dataUpdateText}</p> : <></>}
                { post.visualizacoes!=-1 ? <div className="visualizacoes"><p>{post.visualizacoes}</p><i className="bi-eye"></i></div> : null }
                <div className='n_comment' onClick={()=>globals.mobile && setShowComment(showComment=>!showComment)}>
                    <p>{post.n_comment}</p>
                    <i className='bi-chat-dots'></i>
                </div>
                <Denuncia tipo="noticia"></Denuncia>
            </div>
        </div>}
        {/* {comentarios && <Comentarios id_comment={post.id}/>} */}

        {globals.mobile ? !isMain || isPlaylist ? <></> : <Comentarios postAtual={post} showComment={showComment}/> : <></>}

        {/* <Ads slot="7693763089"/> */}
        {/* {!props.id && globals.mobile && <Post globals={globals} posts={infos.alta}/>} */}
    </div>
})
function Imagem({isPlaylist,id,func,isMain,Elements,post,onLinkClick,onLoaded}:{isPlaylist?:any,id?:number,func?:any,isMain?:any,Elements?:any,post:any,onLinkClick:any,onLoaded?:()=>void}) {
    onLinkClick !="";
  const globals = useGlobal();
  const auth = useAuth();
    const refs={
      descricao:useRef<HTMLDivElement>(null),
    }
    const [summarized,setSummarized]=useState(post.text.length>2);
    const [index,setIndex]=useState(0);
    const [showArrowLeft,setShowArrowLeft]=useState(false);
    const [showArrowRight,setShowArrowRight]=useState(false);
    const [size,setSize]=useState<sizeInterface>({containerAspectRatio:"initial",containerWidth:"100%",containerHeight:"auto",elementMaxWidth:"100%",elementMaxHeight:"100%",elementObjectFit:"contain",elementAspectRatio:"initial",elementWidth:"initial",elementHeight:"initial"});
    const countLoaded=useRef(0);
    const onLeftClick=useCallback(()=>{
        setIndex((index:number)=>{
            index>0 && index--;
            index>=post.srcImagem.length-2 && setShowArrowRight(index==post.srcImagem.length-2);
            setShowArrowLeft(index>0);
            return index;
        });
    },[index]);
    const onRightClick=useCallback(()=>{
        setIndex((index:number)=>{
            index+1<post.srcImagem.length && index++;
            index<=1 && setShowArrowLeft(index==1);
            setShowArrowRight(index+1<post.srcImagem.length);
            return index;
        });
    },[index]);
    useEffect(()=>{
        setSummarized(post.text.length>2);
        post.srcImagem.length > 1 && setShowArrowRight(true);
    },[post]);
    const isValidURL=useCallback((str:any)=>{
        try {
          const url=new URL(str);
        return url.protocol=="https:";
        } catch (e) {
          return false;
        }
    },[]);
    const calcDimensions=useCallback((_:any,isInitial?:boolean)=>{
        if (isInitial){
            if (countLoaded.current > 0) return;
            countLoaded.current++;
        }
        const isElementWidthBigger=(post.srcImagem[index].format==3 || (post.srcImagem[index].format!=1 && post.srcImagem[index].imageAspect > 1))  ? true : false;
        const originalFormat=(post.srcImagem[index].format==0 && post.srcImagem[index].imageAspect==0);
        setSize({
            containerAspectRatio:originalFormat || post.srcImagem[index].format!=0 ? String(post.srcImagem[index].containerAspect) : "initial",
            containerWidth:globals.mobile ? "100%" : "initial",
            containerHeight:originalFormat || !globals.mobile ? "100%" : "initial",
            elementMaxWidth:originalFormat ? "100%" : "initial",
            elementMaxHeight:originalFormat ? "100%" : "initial",
            elementObjectFit:originalFormat ? "contain" : "initial",
            elementAspectRatio: String(originalFormat  ? "initial" : post.srcImagem[index].imageAspect),
            elementWidth:originalFormat || isElementWidthBigger ? "100%" : "fit-content",
            elementHeight:!originalFormat && isElementWidthBigger ? "fit-content" : "100%",
        });
    },[index,post,globals.mobile]);
    calcDimensions(false,true);
    useEffect(()=>{
        countLoaded.current > 1 && calcDimensions(false);
        countLoaded.current++;
        window.addEventListener("resize",calcDimensions);
        return ()=>{
            window.removeEventListener("resize",calcDimensions);
        }
    },[index,calcDimensions]);
    
    return !isMain ? <Nt descricao={refs.descricao} post={post} size={size} index={index} onLinkClick={onLinkClick} isValidURL={isValidURL} onLoaded={onLoaded!} func={func} summarized={summarized} setSummarized={setSummarized} onLeftClick={onLeftClick} showArrowLeft={showArrowLeft} onRightClick={onRightClick} showArrowRight={showArrowRight} isMain={isMain} isPlaylist={isPlaylist} auth={auth} globals={globals}/> : (
        <div id="pg" className={'im cont' + (id ? " playlist" : "")}> 
            <div id="bottom">
                <div id="s1">
                    {/* {post.id ? <Ads solt="7693763089"/> : <></>} */}
                    <Nt descricao={refs.descricao} post={post} size={size} index={index} onLinkClick={onLinkClick} isValidURL={isValidURL} onLoaded={onLoaded!} func={func} summarized={summarized} setSummarized={setSummarized} onLeftClick={onLeftClick} showArrowLeft={showArrowLeft} onRightClick={onRightClick} showArrowRight={showArrowRight} isMain={isMain} isPlaylist={isPlaylist} auth={auth} globals={globals}/>
                    <Elements></Elements>
                    {!globals.mobile && !isPlaylist ? <Comentarios postAtual={post}/> : <></> }
                    {/* {!props.id && !globals.mobile && <Alta server={server} posts={infos.alta}/>} */}
                </div>
            </div>
        </div>
    );
}
export default memo(Imagem);
