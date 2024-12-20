import { useCallback, useEffect, useState, useRef, memo, MutableRefObject } from "react";
import Link from "../Link.tsx";
import { useGlobal } from "../Global.tsx";
import { useAuth } from "../Auth.jsx";
import './Comentarios.scss';
import { useLocation } from "react-router-dom";

interface commentInterface{
    id:number,
    usuario:string,
    texto:string,
    loading:boolean
}
function Comentarios({previousRequest, ...values}:{previousRequest?:MutableRefObject<(string | boolean)[]>,playlistComponent?:any,tipo?:any,postAtual?:any,values?:any}){
    const PlaylistComponent=values.playlistComponent || null;
    const globals=useGlobal();
    const { server, navigate, navigateClass }=globals;
    const auth=useAuth();
    const location=useLocation();
    const [comentarios,setComentarios]=useState<commentInterface[]>([]);
    const [logos,setLogos]=useState([]);
    const [count,setCount]=useState(0);
    const [loading,setLoading]=useState(false);
    const refs={
        input:useRef<HTMLInputElement>(null),
        btn:useRef<HTMLButtonElement>(null),
    }
    const infos={
        tipo:useRef(values.tipo || location.pathname.split("/")[1]),
        id:useRef(Number(location.pathname.split("/")[2]))
    }
    const get=()=>{
        auth.post(server+"/comentarios",{type:"option",operation:"get_comentarios",tipo:infos.tipo.current,post_id:infos.id.current.toString()}).then((result)=>{
            setLogos(result.data.logos);
            setCount(result.data.count);
            setComentarios(result.data.comentarios.map((comentarios:any)=>{return {...comentarios,texto:comentarios.texto.split(" ")}}));
        });
    };
    const update=(pathname:string)=>{
        if (pathname!=""){

            infos.tipo.current=pathname.split("/")[1];
            infos.id.current=Number(pathname.split("/")[2]);
            get();
        }
    }
    useEffect(()=>{
        update(window.location.pathname);
        navigateClass.current.addListener(update);
        return ()=>{
            navigateClass.current.removeListener(update);
        }
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
                if (!Object.keys(logos).includes(globals.login.usuario!)) setLogos((logos)=>{return {...logos,[globals.login.usuario!]:globals.login.logo=='null' ? null : globals.login.logo}});
                setComentarios((comentarios:any)=>{
                    comentarios.unshift({usuario:globals.login.usuario!,texto:text.split(" ")});
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
    }, [comentarios, loading]);
    const verifyInput=(e:any)=>{
        refs.btn.current!.disabled=e.target.value.trim()==""; 
    };
    return (
        <div id="cmdd" className="comm">
            {PlaylistComponent ? <PlaylistComponent postAtual={values.postAtual} values={values.values}></PlaylistComponent> : null}
            <div id="cmn">{count+(count>1 ? " Comentários" : " Comentário")}</div>
            <div id="cmd">
                <form onSubmit={Comentar} id="cmf">
                    <input onInput={verifyInput} ref={refs.input} id="cmi" placeholder="Adicione um comentário"/>
                    <button ref={refs.btn} type="submit" id="cmbtn" disabled>{loading ? "Enviando" : "Enviar"}</button>
                </form>
                <div id="cmb">
                    {comentarios.map((comment:any,index)=>{
                        const content=!logos[comment.usuario] ? comment.usuario[0] : <img src={server+"/images/"+encodeURIComponent(logos[comment.usuario])}/>
                        return (
                            <div className="ndivc" key={index}>
                                <Link to={"/@"+encodeURIComponent(comment.usuario)} className="ndivl">{content}</Link>
                                <div className="ndivtd">
                                    <Link to={"/@"+encodeURIComponent(comment.usuario)} className="ndivn">@{comment.usuario}</Link>
                                    <div className="ndivt txt">{comment.texto.map((texto:string,index:number)=>{
                                        return texto.length >0 && (texto[0]=="#" || texto[0]=="@") ? <Link className='tag' key={index} to={texto[0]=="#" ? "/busca?q="+encodeURIComponent(texto) : "/@"+encodeURIComponent(texto.slice(1))}>{texto + ( comment.texto.length-1>index ? " " : "" )}</Link> : texto + ( comment.texto.length-1>index ? " " : "" )
                                    })}</div>
                                    {globals.login.isLoged=="true" && globals.login.usuario==comment.usuario ? <div onClick={Excluir} className="ndivx" data-id={comment.id}>{comment.loading ? "": "excluir"}</div> : ""}
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