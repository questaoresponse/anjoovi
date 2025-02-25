// Exemplo do componente Contact
import { Dispatch, memo, SetStateAction, useEffect, useState } from 'react';
import Link, { eventInterface } from '../Link.tsx';
import GlobalContextInterface, { useGlobal } from '../Global.tsx';
import authInterface, { useAuth } from '../Auth.jsx';
import './Texto.scss'
// import Ads from '../Ads.jsx';
import Comentarios from './Comentarios.jsx';
import Conteudo from './Conteudo.tsx';
import Denuncia from './Denuncia.tsx';
import './Conteudo.scss';

interface postInterface{
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
const Nt=memo(({post,onLinkClick,isValidURL,onLoaded,func,summarized,setSummarized,isMain,isPlaylist,auth,globals}:{post:postInterface,onLinkClick:(text:string)=>void,isValidURL:(url:string)=>boolean,onLoaded:()=>void,func:(path:string,id:number)=>void,summarized:boolean,setSummarized:Dispatch<SetStateAction<boolean>>,isMain:boolean,isPlaylist:boolean,auth:authInterface,globals:GlobalContextInterface})=>{
    const [showComment,setShowComment]=useState(false);
    useEffect(()=>{
        isMain && onLoaded!();
    },[post]);
    return <div className='posts-div'>
        {!isMain ? <Link onClick={(e:eventInterface)=>{e.preventDefault();func("/texto/"+post.id,post.id)}} to={"/texto/"+post.id} className="p-texto disabled">
            <Conteudo infos={post} auth={auth} globals={globals}></Conteudo>
            <div className="texto-texto txt resumo">{post.text.map((line:string[],i:number)=>{
                return <>
                    {line.map((texto:string,index:number)=>{
                        return texto.length>1 && (texto[0]=="#" || texto[0]=="@") ? <Link className='tag' key={String(i)+String(index)} to={texto[0]=="#" ? "/busca?q="+encodeURIComponent(texto) : "/@"+encodeURIComponent(texto.slice(1))}>{texto + ( line.length-1>index ? " " : "" )}</Link> : isValidURL(texto) ? <div key={index} className='tag' onClick={()=>onLinkClick(texto)}>{texto}</div> : texto + ( line.length-1>index ? " " : "" )
                    })}
                    <br></br>
                </>
            })}</div>
            <div className="data_d">
                <p className="data data_data">{post.dataText}</p>
                {post.dataUpdateText!="" ? <p className="data data_a">{post.dataUpdateText}</p> : <></>}
                { post.visualizacoes!=-1 ? <div className="visualizacoes"><p>{post.visualizacoes}</p><i className="bi-eye"></i></div> : null }
                <div className='n_comment'>
                    <p>{post.n_comment}</p>
                    <i className='bi-chat-dots'></i>
                </div>
                <Denuncia tipo="texto"></Denuncia>
            </div>
        </Link> : <div className="p-texto pm">
            <Conteudo infos={post} auth={auth} globals={globals}></Conteudo>
            {summarized ? <div className='texto-resumo-texto'>
                <div className="texto-texto txt overflow">{post.text.map((line:string[],i:number)=>{
                    return <>
                        {line.map((texto:string,index:number)=>{
                            return texto.length>0 && (texto[0]=="#" || texto[0]=="@") ? <Link className='tag' key={String(i)+String(index)} to={texto[0]=="#" ? "/busca?q="+encodeURIComponent(texto) : "/@"+encodeURIComponent(texto.slice(1))}>{texto + ( line.length-1>index ? " " : "" )}</Link> : isValidURL(texto) ? <div key={index} className='tag' onClick={()=>onLinkClick(texto)}>{texto + ( line.length-1>index ? " " : "" )}</div> : texto + ( line.length-1>index ? " " : "" )
                        })}
                        <br></br>
                    </>
                })}</div>
                <div className='resumo-btn' onClick={()=>setSummarized(false)}>Ler mais...</div>
            </div> : <div className="texto-texto txt">{post.text.map((line:string[],i:number)=>{
                return <>
                    {line.map((texto:string,index:number)=>{
                        return texto.length>0 && (texto[0]=="#" || texto[0]=="@") ? <Link className='tag' key={String(i)+String(index)} to={texto[0]=="#" ? "/busca?q="+encodeURIComponent(texto) : "/@"+encodeURIComponent(texto.slice(1))}>{texto + ( line.length-1>index ? " " : "" )}</Link> : isValidURL(texto) ? <div key={index} className='tag' onClick={()=>onLinkClick(texto)}>{texto + ( line.length-1>index ? " " : "" )}</div> : texto + ( line.length-1>index ? " " : "" )
                    })}
                    <br></br>
                </>
            })}</div>}
            <div className="data_d">
                <p className="data data_data">{post.dataText}</p>
                {post.dataUpdateText!="" ? <p className="data data_a">{post.dataUpdateText}</p> : <></>}
                { post.visualizacoes!=-1 ? <div className="visualizacoes"><p>{post.visualizacoes}</p><i className="bi-eye"></i></div> : null }
                <div className='n_comment' onClick={()=>globals.mobile && setShowComment(showComment=>!showComment)}>
                    <p>{post.n_comment}</p>
                    <i className='bi-chat-dots'></i>
                </div>
                <Denuncia tipo="texto"></Denuncia>
            </div>
        </div>}
        {globals.mobile ? !isMain || isPlaylist ? <></> : <Comentarios postAtual={post} showComment={showComment}/> : <></>}

        {/* <Ads slot="7693763089"/> */}
        {/* {!props.id && globals.mobile && <Post globals={globals} posts={infos.alta}/>} */}
    </div>
});
function Texto({isPlaylist,id,func,isMain,Elements,post,onLinkClick,onLoaded}:{isPlaylist?:any,id?:number,func?:any,isMain?:any,Elements?:any,post:any,onLinkClick:any,onLoaded?:()=>void}) {
    const globals = useGlobal();
    const auth = useAuth();
    const [summarized,setSummarized]=useState(false);
    const isValidURL=(str:any)=>{
        try {
          const url=new URL(str);
            return url.protocol=="https:";
        } catch (e) {
          return false;
        }
    }
    return !isMain ? <Nt post={post} onLinkClick={onLinkClick} isValidURL={isValidURL} onLoaded={onLoaded!} func={func} summarized={summarized} setSummarized={setSummarized} isMain={isMain} isPlaylist={isPlaylist} auth={auth} globals={globals}/> : (
        <div>
        <div id="pg" className={'tex cont' + (id ? " playlist" : "")}> 
            <div id="bottom">
                <div id="s1">
                    {/* {post.id ? <Ads slot="7693763089"/> : <></>} */}
                    <Nt post={post} onLinkClick={onLinkClick} isValidURL={isValidURL} onLoaded={onLoaded!} func={func} summarized={summarized} setSummarized={setSummarized} isMain={isMain} isPlaylist={isPlaylist} auth={auth} globals={globals}></Nt>
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
export default memo(Texto);
