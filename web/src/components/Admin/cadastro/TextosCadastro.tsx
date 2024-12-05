import { useEffect, useRef, useState } from "react";
import { useGlobal } from "../../Global.tsx";
import { resultInterface, useAuth } from "../../Auth.jsx";
import './TextosCadastro.scss';
import '../../../d.ts';
import Publicar from "./../Publicar.jsx";

interface postInterface{
    id:number,
    texto:string
}
function TextosCadastro(){
    const edit=useRef(false);
    const post_edit=useRef<postInterface>();
    const globals=useGlobal();
    const { server, navigate }=globals;
    const auth=useAuth();
    const refs={
        texto:useRef<HTMLTextAreaElement>(null),
    }
    const [message,setMessage]=useState(false);
    const Cadastrar=async (e:any)=>{
        e.preventDefault();
        var fd=new FormData();
        var texto=refs.texto.current!.value;
        fd.append("type","option");
        edit.current && fd.append("id",post_edit.current!.id.toString());
        fd.append("texto",texto);
        auth.post(server+"/admin/textos_cadastro?type="+(edit.current ? "edit" : "cadastro"),fd,{arquivo:true}).then((result)=>{
            if (result.error){
                globals.setRedirectError(result.error);
            } else {
                if (result.data.result=="true"){
                    if (edit.current){
                        const params=new URLSearchParams(location.search);
                        if (params.has("origin")){
                                navigate(decodeURIComponent(params.get("origin")!));
                        } else {
                            const pathname=location.pathname.split("_");
                            navigate(pathname[0]+"_lista");
                        };
                        edit.current=false;
                        post_edit.current=undefined;
                    }
                    setMessage(true);
                    var st=setTimeout(()=>{
                        setMessage(false);
                        clearInterval(st);
                    },2000);
                    refs.texto.current!.value="";
                }
            }
        })
    }
    edit.current=location.pathname=="/admin/textos_edit";
    useEffect(()=>{
        if (edit.current){
            auth.post(server+"/admin/textos_edit"+location.search,{type:"info"}).then((result:resultInterface)=>{
                if (result.data.result=="true"){
                    const post=result.data.post_edit[0];
                    refs.texto.current!.value=post.texto;
                    post_edit.current=post;
                }
            })
        }
    },[]);
    return (
        <div id="pg" className="nc">
            <div id="dt" className="fechado">
                <Publicar/>
                <div id="msg1">Cadastrar texto</div>
                <form onSubmit={Cadastrar}>
                    <label>Texto</label>
                    <textarea ref={refs.texto}></textarea>
                    <button type="submit" id="button">Enviar</button>
                </form>
            </div>
            <div id="m" style={{display:message ? "flex" :"none"}}>{ edit.current ? "Texto alterado com sucesso." : "Texto cadastrado com sucesso."}</div>
        </div>
    )
}
export default TextosCadastro;