import { useEffect, useCallback, useState, memo } from 'react';
import Link from '../../Link.tsx';
import Lista from '../Lista.tsx';
import './ImagemLista.scss';
import editarSrc from '../../static/edit-icone.png';
import excluirSrc from '../../static/remove-icone.png';
import { useGlobal } from '../../Global.tsx';
import Listar from '../Listar.tsx';
import { resultInterface } from '../../Auth.tsx';

function ImagemLista(){
    const globals=useGlobal();
    const Opcoes=(props:any)=>{
        const [isChecked,setIsChecked]=useState((props.post.privado & 1)==0 && (props.post.privado & 4)==0);
        const auth=props.auth;
        const server=props.globals.server;
        const location=props.location;
        const onPublicChange=useCallback((e:any)=>{
            auth.post(server+"/admin/imagens_lista"+location.search,{type:"option",id:props.post.id,operation:e.target.checked ? "privado":"publico"}).then((result:resultInterface)=>{
                if (result.data.result=="true"){
                    setIsChecked(isChecked ? false : true);
                }
            });
        },[isChecked]);
        const Excluir=useCallback(()=>{
            var r=window.confirm("Deseja remover este registro? O item será excluido permanentemente.");
            if (r){
                auth.post(server+"/admin/imagens_lista"+location.search,{type:"option",id:props.post.id}).then((result:resultInterface)=>{
                    if (result.error){
                        props.globals.redirectError.current(result.error);

                    } else {
                        result.data.posts=result.data.posts.map((post:any)=>{ return {...post,d:post.d ? JSON.parse(post.d).o.split(":").splice(0,2).join(":") : "",privado:post.privado ? Number(post.privado) : undefined}});
                        props.recriar(result.data);
                    }
                })
            }
        },[]);
        return (
            <div className="editard">
                <div className="editarbd">
                    <Link className='edit-div' to={"/admin/imagens_edit?id="+props.post.id+"&origin="+encodeURIComponent(window.location.pathname)}><img src={editarSrc} className="edit"/></Link>
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
        <div className="il cld">
            <div id="pg">
                <div id="dt" className="fechado">
                    <Listar/>
                    <div id="msg1">Listar imagens</div>
                    <div id="top">
                        <Lista opcoes={Opcoes} tituloHref={(post:any)=>"/imagem/"+post.id}/>
                    </div> 
                </div>
            </div>
        </div>
    )
}
export default memo(ImagemLista);