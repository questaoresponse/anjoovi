import { useEffect } from "react";
import Link, { eventInterface } from "../Link.js";
import { useGlobal } from "../Global";
import { resultInterface, useAuth } from "../Auth";
import './Denuncias.scss';
import excluirSrc from '../static/remove-icone.png';
import Lista from "./Lista.jsx";

function Denuncias(){
    const auth=useAuth();
    const globals=useGlobal();
    const Opcoes=(props:any)=>{
        const auth=props.auth;
        const server=props.globals.server;
        const location=props.location;

        const Excluir=()=>{
            var r=window.confirm("Deseja remover este registro? O item será excluido permanentemente.");
            if (r){
                auth.post(server+"/admin/denuncias_lista"+location.search,{type:"option",id:props.post.id}).then((result:resultInterface)=>{
                    if (result.error){
                        props.globals.setRedirectError(result.error);
                    } else {
                        props.recriar(result.data);
                    }
                })
            }
        };
        return (
            <div className="editard">
                <Link className="infos" to={"/admin/denuncias_infos/"+props.post.id}>+</Link>
                <img onClick={Excluir} src={excluirSrc} className="excluir"/>
            </div>
        )
    }
    const NewHeader=()=>{
        return (
            <>
                <div className="id">N°</div>
                <div className="titulo">TÍTULO</div>
                <div className="num">DENÚNCIAS</div>
                <div className="opcoes">OPÇÕES</div>
            </>
        )
    }
    const NewTable=({post,n,recriar}:{post:{titulo:string,post_tipo:string,post_id:number,num:string},n:number,recriar:()=>void})=>{
        const url="/"+post.post_tipo+"/"+post.post_id;
        return (
            <div className="linha">
                <div className="id">{n}</div>
                <Link className="titulo txt-1" onClick={(e:eventInterface)=>{e.preventDefault(); window.open(url)}} to={url}>
                    {post.titulo}
                </Link>
                <div className="num">{post.num}</div>
                <div className="opcoes">
                    <Opcoes auth={auth} post={post} globals={globals} recriar={recriar} location={location}/>
                </div>
            </div>
        )
    }
    useEffect(()=>{
        globals.setSelected("denuncias_lista");
    },[]);

    return (
        <div id="dens" className="cld">
            <div id="pg">
                <div id="dt" className="fechado">
                    {/* <Listar/> */}
                    <div id="msg1">Listar denúncias</div>
                    <div id="top">
                        <div id="div_info">Informações</div>
                        <Lista NewHeader={NewHeader} opcoes={Opcoes} NewTable={NewTable} tituloHref={(post:any)=>"/"+post.post_tipo+"/"+post.post_id}/>
                    </div> 
                </div>
            </div>
        </div>
    )
}
export default Denuncias;