// Exemplo do componente Contact
import { Dispatch, memo, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import Link, { eventInterface } from '../Link.tsx';
import GlobalContextInterface, { useGlobal } from '../Global.tsx';
import authInterface, { useAuth } from '../Auth.jsx';
import './Noticia.scss'
// import Ads from '../Ads.jsx';
import Comentarios from './Comentarios.jsx';
import Conteudo from './Conteudo.tsx';
import Denuncia from './Denuncia.tsx';
import './Conteudo.scss';

interface postInterface{
    isLoaded:boolean,
    srcImagem:{
        isWidthBigger:boolean,
        containerAspect:number,
        imageAspect:number,
        originalFormat:boolean,
        src:string
    },
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
const Nt=memo(({post,size,onLinkClick,isValidURL,onLoaded,func,summarized,setSummarized,isMain,isPlaylist,auth,globals}:{post:postInterface,size:sizeInterface,onLinkClick:(text:string)=>void,isValidURL:(url:string)=>boolean,onLoaded:()=>void,func:(path:string,id:number)=>void,summarized:boolean,setSummarized:Dispatch<SetStateAction<boolean>>,isMain:boolean,isPlaylist:boolean,auth:authInterface,globals:GlobalContextInterface})=>{
    const [showComment,setShowComment]=useState(false);
    useEffect(()=>{
        isMain && onLoaded!();
    },[post]);
    return <div className='posts-div'>
        {!isMain ? <Link onClick={(e:eventInterface)=>{e.preventDefault();func("/noticia/"+post.id,post.id)}} to={"/noticia/"+post.id} className="p-noticia disabled">
            <Conteudo infos={post} auth={auth} globals={globals}></Conteudo>
            <div className="titulo-noticia">{post.titulo.map((titulo,index)=>{
                return titulo.length>1 && titulo[0]=="@" ? <Link className='tag' key={index} to={"/@"+encodeURIComponent(titulo.slice(1))}>{titulo + ( post.titulo.length-1>index ? " " : "" )}</Link> : titulo + ( post.titulo.length-1>index ? " " : "" )
            })}</div>
            <div className="subtitulo-noticia">{post.subtitulo.map((subtitulo,index)=>{
                return subtitulo.length>1 && (subtitulo[0]=="#" || subtitulo[0]=="@") ? <Link className='tag' key={String(index)} to={subtitulo[0]=="#" ? "/busca?q="+encodeURIComponent(subtitulo) : "/@"+encodeURIComponent(subtitulo.slice(1))}>{subtitulo + ( post.subtitulo.length-1>index ? " " : " " )}</Link> : subtitulo + ( post.subtitulo.length-1>index ? " " : "" )
            })}</div>
            <div style={{aspectRatio:globals.mobile ? "initial" : "16/9"}} className='campo-img-noticia'>
                <div style={{aspectRatio:size.containerAspectRatio,width:size.containerWidth,height:size.containerHeight,display:"flex",justifyContent:"center",alignItems:"center",overflow: "hidden"}}>
                    {post.srcImagem ? <img style={{maxWidth:size.elementMaxWidth,maxHeight:size.elementMaxHeight,objectFit:size.elementObjectFit,width:size.elementWidth,height:size.elementHeight}} src={post.srcImagem.src}/> : <></>}
                </div>
            </div>
            <div className="texto-noticia txt resumo">{post.text.map((line:string[],i:number)=>{
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
        </Link> : <div className={"p-noticia pm "+(false ? " loading" : "")}>
            <Conteudo infos={post} auth={auth} globals={globals}></Conteudo>
            <div className="titulo-noticia">{post.titulo.map((titulo,index)=>{
                return titulo.length>0 && titulo[0]=="@" ? <Link className='tag' key={index} to={"/@"+encodeURIComponent(titulo.slice(1))}>{titulo + ( post.titulo.length-1>index ? " " : "" )}</Link> : titulo + ( post.titulo.length-1>index ? " " : "" )
            })}</div>
            <p className="subtitulo-noticia">{post.subtitulo.map((subtitulo,index)=>{
                return subtitulo.length>0 && (subtitulo[0]=="#" || subtitulo[0]=="@") ? <Link className='tag' key={String(index)} to={subtitulo[0]=="#" ? "/busca?q="+encodeURIComponent(subtitulo) : "/@"+encodeURIComponent(subtitulo.slice(1))}>{subtitulo + ( post.subtitulo.length-1>index ? " " : "" )}</Link> : subtitulo + ( post.subtitulo.length-1>index ? " " : "" )
            })}</p>
           <div style={{aspectRatio:globals.mobile ? "initial" : "16/9"}} className='campo-img-noticia'>
                <div style={{aspectRatio:size.containerAspectRatio,width:size.containerWidth,height:size.containerHeight,display:"flex",justifyContent:"center",alignItems:"center",overflow: "hidden"}}>
                    {post.srcImagem ? <img style={{maxWidth:size.elementMaxWidth,maxHeight:size.elementMaxHeight,objectFit:size.elementObjectFit,width:size.elementWidth,height:size.elementHeight}} src={post.srcImagem.src}/> : <></>}
                </div>
            </div>
            {summarized ? <div className="texto-resumo-noticia">
                <div className="texto-noticia txt overflow">{post.text.map((line:string[],i:number)=>{
                    return <div key={i}>
                        {line.map((texto:string,index:number)=>{
                            return texto.length>0 && (texto[0]=="#" || texto[0]=="@") ? <Link className='tag' key={String(i)+String(index)} to={texto[0]=="#" ? "/busca?q="+encodeURIComponent(texto) : "/@"+encodeURIComponent(texto.slice(1))}>{texto + ( line.length-1>index ? " " : "" )}</Link> : isValidURL(texto) ? <div key={index} className='tag' onClick={()=>onLinkClick(texto)}>{texto + ( line.length-1>index ? " " : "" )}</div> : texto + ( line.length-1>index ? " " : "" )
                        })}
                        <br></br>
                    </div>
                })}</div>
                <div className='resumo-btn' onClick={()=>setSummarized(false)}>Ler mais...</div>
            </div> :
            <div className="texto-noticia txt">{post.text.map((line:string[],i:number)=>{
                return <div key={i}>
                    {line.map((texto:string,index:number)=>{
                        return texto.length>0 && (texto[0]=="#" || texto[0]=="@") ? <Link className='tag' key={String(i)+String(index)} to={texto[0]=="#" ? "/busca?q="+encodeURIComponent(texto) : "/@"+encodeURIComponent(texto.slice(1))}>{texto + ( line.length-1>index ? " " : "" )}</Link> : isValidURL(texto) ? <div key={index} className='tag' onClick={()=>onLinkClick(texto)}>{texto + ( line.length-1>index ? " " : "" )}</div> : texto + ( line.length-1>index ? " " : "" )
                    })}
                    <br></br>
                </div>
            })}</div>}
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
});
function Noticia({isPlaylist,id,func,isMain,Elements,post,onLinkClick,onLoaded}:{isPlaylist?:any,id?:number,func?:any,isMain?:any,Elements?:any,post:any,onLinkClick:any,onLoaded?:()=>void}) {
    const globals = useGlobal();
    const auth = useAuth();
    const [summarized,setSummarized]=useState(post.text.length>2);
    const [size,setSize]=useState<sizeInterface>({containerAspectRatio:"initial",containerWidth:"100%",containerHeight:"auto",elementMaxWidth:"100%",elementMaxHeight:"100%",elementObjectFit:"contain",elementAspectRatio:"initial",elementWidth:"initial",elementHeight:"initial"});
    const countLoaded=useRef(0);
    useEffect(()=>{
        setSummarized(post.text.length>2);
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
        const isElementWidthBigger=(post.srcImagem.format==3 || (post.srcImagem.format!=1 && post.srcImagem.imageAspect > 1))  ? true : false;
        const originalFormat=(post.srcImagem.format==0 && post.srcImagem.imageAspect==0);
        setSize({
            containerAspectRatio:originalFormat || post.srcImagem.format!=0 ? String(post.srcImagem.containerAspect) : "initial",
            containerWidth:globals.mobile ? "100%" : "initial",
            containerHeight:originalFormat || !globals.mobile ? "100%" : "initial",
            elementMaxWidth:originalFormat ? "100%" : "initial",
            elementMaxHeight:originalFormat ? "100%" : "initial",
            elementObjectFit:originalFormat ? "contain" : "initial",
            elementAspectRatio: String(originalFormat  ? "initial" : post.srcImagem.imageAspect),
            elementWidth:originalFormat || isElementWidthBigger ? "100%" : "fit-content",
            elementHeight:!originalFormat && isElementWidthBigger ? "fit-content" : "100%",
        });
    },[post,globals.mobile]);
    calcDimensions(false,true);
    useEffect(()=>{
        countLoaded.current > 1 && calcDimensions(false);
        countLoaded.current++;
        window.addEventListener("resize",calcDimensions);
        return ()=>{
            window.removeEventListener("resize",calcDimensions);
        }
    },[calcDimensions]);

    return !isMain ? <Nt post={post} size={size} onLinkClick={onLinkClick} isValidURL={isValidURL} onLoaded={onLoaded!} func={func} summarized={summarized} setSummarized={setSummarized} isMain={isMain} isPlaylist={isPlaylist} auth={auth} globals={globals}/> : (
        <div>
        <div id="pg" className={'no cont' + (id ? " playlist" : "")}> 
            <div id="bottom">
                <div id="s1">
                    {/* {post.id ? <Ads slot="7693763089"/> : <></>} */}
                    <Nt post={post} size={size} onLinkClick={onLinkClick} isValidURL={isValidURL} onLoaded={onLoaded!} func={func} summarized={summarized} setSummarized={setSummarized} isMain={isMain} isPlaylist={isPlaylist} auth={auth} globals={globals}></Nt>
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
export default memo(Noticia);
