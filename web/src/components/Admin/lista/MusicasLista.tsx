import {memo, useEffect} from "react";
import Lista from '../Lista.jsx';
import './MusicasLista.scss';
import excluirSrc from '../../static/remove-icone.png';
import editSrc from '../../static/edit-icone.png';
import GlobalContextInterface, { useGlobal } from "../../Global.tsx";
import Listar from '../Listar.jsx';
import { resultInterface } from "../../Auth.tsx";
function MusicasLista(){
    const globals=useGlobal();
    const { navigate }=globals;
    const Opcoes=memo((props:{auth:any,globals:GlobalContextInterface,location:{pathname:string,search:string},post:{id:number},recriar:(data:any)=>void})=>{
        const auth=props.auth;
        const server=props.globals.server;
        const location=props.location;
        // console.log(props.post);
        const Excluir=()=>{
            var r=window.confirm("Deseja remover este registro? O item será excluido permanentemente.");
            if (r){
                auth.post(server+location.pathname+location.search,{type:"option",id:props.post.id}).then((result:resultInterface)=>{
                    if (result.error){
                        props.globals.redirectError.current(result.error);
                    } else {
                        result.data.posts=(Array.isArray(result.data.posts) ? result.data.posts : []).map((post:any)=>{ return {...post,privado:post.privado ? Number(post.privado) : undefined}});
                        props.recriar(result.data);
                    }
                })
            }
        }
        const Edit=()=>{
            navigate!("/admin/musicas_edit?id="+props.post.id);
        }
        return (
            <div className="editard">
                <img onClick={Edit} src={editSrc} className="edit"/>
                <div className="edit-avs">editar</div>
                <img onClick={Excluir} src={excluirSrc} className="excluir"/>
                <div className="excluir-avs">excluir</div>
            </div>
        )
        
    })
    useEffect(()=>{
        globals.setSelected("listar");
    },[]);
    return (
        <div className="ml cld">
            <div id="pg">
                <div id="dt" className="fechado">
                <Listar/>
                    <div id="msg1">Listar músicas</div>
                        <div id="top">
                            <Lista opcoes={Opcoes} tituloHref={(post:any)=>"/musica/"+post.id}/>
                        </div>
                </div>
            </div>
        </div>
    )
}
export default memo(MusicasLista);