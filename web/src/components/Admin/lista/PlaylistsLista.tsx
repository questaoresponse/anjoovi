import { useEffect, useState } from "react";
import Link from "../../Link.tsx";
import { useGlobal } from "../../Global.tsx";
import { resultInterface, useAuth } from "../../Auth.jsx";
import './PlaylistsLista.scss';
import excluirSrc from '../../static/remove-icone.png';
import Listar from "../Listar.jsx";
import Lista from "../Lista.jsx";

function PlaylistsLista(){
    const [_,setDados]=useState<{titulo:string,id:number}[]>([]);
    const auth=useAuth();
    const globals=useGlobal();
    const get=()=>{
        auth.post(globals.server+"/admin/playlists_lista",{type:"info"}).then(result=>{
            if (result.data.result=="true"){
                setDados(result.data.posts);
            }
        })
    };
    const Opcoes=(props:any)=>{
        const auth=props.auth;
        const server=props.globals.server;
        const location=props.location;

        const Excluir=()=>{
            var r=window.confirm("Deseja remover este registro? O item será excluido permanentemente.");
            if (r){
                auth.post(server+"/admin/playlists_lista"+location.search,{type:"option",id:props.post.id}).then((result:resultInterface)=>{
                    if (result.error){
                        props.globals.setRedirectError(result.error);

                    } else {
                        result.data.posts=result.data.posts.map((post:any)=>{ return {...post,d:post.d ? JSON.parse(post.d).o.split(":").splice(0,2).join(":") : "",privado:post.privado ? Number(post.privado) : undefined}});
                        props.recriar(result.data);
                    }
                })
            }
        };
        return (
            <div className="editard">
                <img onClick={Excluir} src={excluirSrc} className="excluir"/>
                <div className='excluir-avs'>excluir</div>
            </div>
        )
    }
    const NewHeader=()=>{
        return (
            <>
                <div className="id">N°</div>
                <div className="titulo">TÍTULO</div>
                <div className="data">DATA</div>
                <div className="opcoes">OPÇÕES</div>
            </>
        )
    }
    const NewTable=({post,n,Recriar}:{post:any,n:number,Recriar:any})=>{
        return (
            <div className="linha">
                <div className="id">{n}</div>
                <Link className="titulo txt-1" onClick={(e:any)=>{e.preventDefault(); window.open("/playlist/"+post.id)}} to={"/playlist/"+post.id}>
                    {post.titulo}
                </Link>
                <div className="data">{post.d}</div>
                <div className="opcoes">
                    <Opcoes auth={auth} post={post} globals={globals} recriar={Recriar} location={location}/>
                </div>
            </div>
        )
    }
    useEffect(()=>{
        get();
    },[]);

    return (
        <div id="pl" className="cld">
            <div id="pg">
                <div id="dt" className="fechado">
                    <Listar/>
                    <div id="msg1">Listar playlists</div>
                    <div id="top">
                        <Lista NewHeader={NewHeader} opcoes={Opcoes} NewTable={NewTable} tituloHref={(post:any)=>"/playlist/"+post.id}/>
                    </div> 
                </div>
            </div>
        </div>
    )
}
export default PlaylistsLista;