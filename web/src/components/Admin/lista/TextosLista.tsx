import React, { useEffect, useCallback, useState } from 'react';
import Lista from '../Lista.jsx';
import './TextosLista.scss';
import editarSrc from '../../static/edit-icone.png';
import excluirSrc from '../../static/remove-icone.png';
import { useGlobal } from '../../Global.tsx';
import Listar from '../Listar.jsx';
import { resultInterface } from '../../Auth.tsx';
import Link from '../../Link.tsx';
function TextosLista(){
    const globals=useGlobal();
    const Opcoes=(props:any)=>{
        const [isChecked,setIsChecked]=useState((globals.cargo.current.cargo! & 2)==0 ? (props.post.privado & 13)==0 : (props.post.privado & 4)==0);
        const auth=props.auth;
        const server=props.globals.server;
        const location=props.location;
        const onPublicChange=useCallback((e:any)=>{
            auth.post(server+"/admin/textos_lista"+location.search,{type:"option",id:props.post.id,operation:e.target.checked ? "publico":"privado"}).then((result:resultInterface)=>{
                if (result.data.result=="true"){
                    setIsChecked(isChecked ? false : true);
                }
            });
        },[isChecked]);
        const Excluir=useCallback(()=>{
            var r=window.confirm("Deseja remover este registro? O item será excluido permanentemente.");
            if (r){
                auth.post(server+"/admin/textos_lista"+location.search,{type:"option",id:props.post.id}).then((result:resultInterface)=>{
                    if (result.error){
                        props.globals.redirectError.current(result.error);

                    } else {
                        result.data.posts=(Array.isArray(result.data.posts) ? result.data.posts : []).map((post:any)=>{ return {...post,privado:post.privado ? Number(post.privado) : undefined}});
                        props.recriar(result.data);
                    }
                })
            }
        },[]);
        return (
            <div className="editard">
                <div className="editarbd">
                    <Link className='edit-div' to={"/admin/textos_edit?id="+props.post.id+"&origin="+encodeURIComponent(window.location.pathname)}><img src={editarSrc} className="edit"/></Link>
                    <div className='edit-avs'>editar</div>
                    <img onClick={Excluir} src={excluirSrc} className="excluir"/>
                    <div className='excluir-avs'>excluir</div>
                    <label className={"switch"}>
                        <input onChange={onPublicChange} type="checkbox" checked={isChecked}/>
                        <span className="slider"></span>
                    </label>
                    <div className="avs">{isChecked ? "público" : "privado"}</div>
                </div>
            </div>
        )
    }
    useEffect(()=>{
        globals.setSelected("listar");
    },[]);
    return (
        <div className="nl cld">
            <div id="pg">
                <div id="dt" className="fechado">
                    <Listar/>
                    <div id="msg1">Listar textos</div>
                    <div id="top">
                        <Lista opcoes={Opcoes} tituloHref={(post:any)=>"/texto/"+post.id}/>
                    </div> 
                </div>
            </div>
        </div>
    )
}
export default React.memo(TextosLista);