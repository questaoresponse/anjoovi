import {memo, useEffect} from "react";
import Lista from '../Lista.tsx';
import './24Lista.scss';
import excluirSrc from '../../static/remove-icone.png';
import GlobalContextInterface, { useGlobal } from "../../Global.tsx";
import Listar from '../Listar.tsx';
import authInterface from "../../Auth.tsx";

function Lista24(){
    const globals=useGlobal();
    const Opcoes=memo((props:{auth:authInterface,globals:GlobalContextInterface,location:any,recriar:any,post:any})=>{
        const auth=props.auth;
        const server=props.globals.server;
        const location=props.location;
        const Excluir=()=>{
            var r=window.confirm("Deseja remover este registro? O item será excluido permanentemente.");
            if (r){
                auth.post(server+location.pathname+location.search,{type:"option",id:props.post.id}).then((result)=>{
                    if (result.error){
                        props.globals.redirectError.current(result.error);
                    } else {
                        result.data.posts=(Array.isArray(result.data.posts) ? result.data.posts : []).map((post:any)=>{ return {...post,privado:post.privado ? Number(post.privado) : undefined}});
                        props.recriar(result.data);
                    }
                })
            };
        }
        return (
            <div className="editard">
                <img onClick={Excluir} src={excluirSrc} className="excluir"/>
                <div className='excluir-avs'>excluir</div>
            </div>
        )
        
    })
    useEffect(()=>{
        globals.setSelected("listar");
    },[]);
    return (
        <div className="l24 cld">
            <div id="pg">
                <div id="dt" className="fechado">
                    <Listar/>
                    <div id="msg1">Listar 24 horas</div>
                    <div id="top">
                        <Lista opcoes={Opcoes} tituloHref={(post:any)=>"/stories/"+post.id+"?origin=/"}/>
                    </div> 
                </div>
            </div>
        </div>
    )
}
export default memo(Lista24);