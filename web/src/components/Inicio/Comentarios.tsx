import { useCallback, useEffect, useState, useRef, memo, MutableRefObject } from "react";
import Link from "../Link.tsx";
import { useGlobal } from "../Global.tsx";
import { useAuth } from "../Auth.jsx";
import excluirSrc from '../static/remove-icone.png';
import './Comentarios.scss';
import { useLocation } from "react-router-dom";

interface commentInterface{
    id:number,
    usuario:string,
    texto:string,
    loading:boolean
}
function Comentarios({previousRequest, postAtual, ...values}:{postAtual:any,previousRequest?:MutableRefObject<(string | boolean)[]>,playlistComponent?:any,tipo?:any,values?:any}){
    const PlaylistComponent=values.playlistComponent || null;
    const globals=useGlobal();
    const { server, navigate }=globals;
    const auth=useAuth();
    const location=useLocation();
    const [comentarios,setComentarios]=useState<commentInterface[]>([]);
    const [count,setCount]=useState(0);
    const [loading,setLoading]=useState(false);
    const [optionsShow,setOptionsShow]=useState(-1);
    const refs={
        input:useRef<HTMLInputElement>(null),
        btn:useRef<HTMLButtonElement>(null),
    }
    const infos={
        tipo:useRef(values.tipo || location.pathname.split("/")[1]),
        id:useRef(Number(location.pathname.split("/")[2]))
    }
    const get=()=>{
        if (postAtual){
            setCount(postAtual.n_comment);
            setComentarios(postAtual.comments.map((comentarios:any)=>{return {...comentarios,texto:comentarios.texto.split(" ")}}));
        }
    };
    const update=(pathname:string)=>{
        const pathnames:{[key:string]:any}={
            "noticia":true,
            "imagem":true,
            "musica":true,
            "texto":true,
            "video":true,
            "playlist":true,
            "product":true,
        };
        if (pathname!="" && pathname.split("/")[1] in pathnames){
            infos.tipo.current=pathname.split("/")[1];
            infos.id.current=Number(pathname.split("/")[2]);
            get();
        }
    }
    useEffect(()=>{
        update(window.location.pathname);
    },[]);
    const Comentar=useCallback((e:any)=>{
        e.preventDefault();
        if (globals.login.isLoged=="false"){
            navigate!("/admin");
        } else {
            var text=refs.input.current!.value;
            if (text.trim()!="" && !loading){
                setCount(count=>count+1);
                setLoading(true);
                refs.btn.current!.disabled=true;
                setComentarios((comentarios:any)=>{
                    comentarios.unshift({usuario:globals.login.usuario!,logo:globals.login.logo=='null' ? null : globals.login.logo,texto:text.split(" ")});
                    return comentarios;
                });
                auth.post(server+"/comentarios",{type:"option",operation:"comentar",tipo:infos.tipo.current,post_id:infos.id.current.toString(),texto:text}).then((result)=>{
                    if (result.error){
                        globals.setRedirectError(result.error);
                    } else if (result.data.result=="true"){
                        setLoading(false);
                        if (refs.input.current!.value.trim()!=""){
                            refs.btn.current!.disabled=false;
                        };
                        setComentarios((comentarios)=>comentarios.map(comment=>{
                            !comment.id && (comment.id=result.data.id);
                            return comment;
                        }))
                    }
                });
                refs.input.current!.value="";
            }
        }
    },[infos,refs,loading]);
    const Excluir=useCallback((e:any)=>{
        if (loading) return;
        setCount(count => count - 1);
        var commentRemove:(commentInterface | number)[]=[];
        setComentarios(comentarios =>comentarios.filter((comment,i) =>{
            const v=comment.id !=e.target.dataset.id;
            if (!v){
                commentRemove=[comment,i];
            }
            return v;
        }));
        auth.post(server + "/comentarios", {
            type:"option",
            operation:"excluir",
            tipo:infos.tipo.current,
            post_id:infos.id.current.toString(),
            id:e.target.dataset.id
        }).then(result => {
        if (result.data.result != "true") {
            setComentarios(comentarios=>comentarios.splice(commentRemove[1] as number,0,commentRemove[0] as commentInterface))
            setCount(count => count + 1);
        }
        });
        setOptionsShow(-1);
    }, [comentarios, loading]);
    const verifyInput=(e:any)=>{
        refs.btn.current!.disabled=e.target.value.trim()==""; 
    };
    return (
        <div id="cmdd" className="comm">
            {PlaylistComponent ? <PlaylistComponent postAtual={postAtual} values={values.values}></PlaylistComponent> : null}
            <div id="cmn">{count+(count>1 ? " Comentários" : " Comentário")}</div>
            <div id="cmd">
                <form onSubmit={Comentar} id="cmf">
                    <input onInput={verifyInput} ref={refs.input} id="cmi" placeholder="Adicione um comentário"/>
                    <button ref={refs.btn} type="submit" id="cmbtn" disabled>{loading ? "Enviando" : "Enviar"}</button>
                </form>
                <div id="cmb">
                    {comentarios.map((comment:any,index)=>{
                        const content=comment.logo ? <img src={server+"/images/"+encodeURIComponent(comment.logo)}/> : comment.usuario[0];
                        return (
                            <div className="ndivc" key={index}>
                                <Link to={"/@"+encodeURIComponent(comment.usuario)} className="ndivl">{content}</Link>
                                <div className="ndivtd">
                                    <Link to={"/@"+encodeURIComponent(comment.usuario)} className="ndivn">@{comment.usuario}</Link>
                                    <div className="ndivt txt">{comment.texto.map((texto:string,index:number)=>{
                                        return texto.length >0 && (texto[0]=="#" || texto[0]=="@") ? <Link className='tag' key={index} to={texto[0]=="#" ? "/busca?q="+encodeURIComponent(texto) : "/@"+encodeURIComponent(texto.slice(1))}>{texto + ( comment.texto.length-1>index ? " " : "" )}</Link> : texto + ( comment.texto.length-1>index ? " " : "" )
                                    })}</div>
                                </div>
                                <svg onClick={()=>setOptionsShow(index)} className="ndivopts-btn" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                                </svg>
                                <div className="ndivopts" style={{display:optionsShow==index ? "block" : "none"}}>
                                    {globals.login.isLoged=="true" && globals.login.usuario==comment.usuario ? <div onClick={Excluir} className={"ndivopt"+(comment.loading ? " disabled" : "")} data-id={comment.id}><img className="delete-img" src={excluirSrc}></img><div className="delete-div">Excluir</div></div> : <></>}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default memo(Comentarios);