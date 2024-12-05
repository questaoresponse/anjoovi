import { useState, useEffect, useRef, MutableRefObject, Dispatch, SetStateAction } from 'react';
import { useAuth } from '../Auth';
import { useGlobal } from '../Global';
import Link, { eventInterface } from '../Link';
import './Chats.scss';
interface chatsInterface{
    usuario:string,
    logo:string | null,
    texto:string
}
function Chats({setMenuExcluir,excluir}:{setMenuExcluir:Dispatch<SetStateAction<boolean>>,excluir:MutableRefObject<any>}){
    const [chats,setChats]=useState<{usuario:string,texto:string,chat_id:number}[]>([]);
    const menuId=useRef(-1);
    const auth=useAuth();
    const { server, peer }=useGlobal();
    excluir.current=()=>{
        setMenuExcluir(false);
        setChats(chats.filter(chat=>chat.chat_id!=menuId.current));
        auth.post(server+"/chats",{type:"excluir",id:menuId.current.toString()}).then(result=>{
            if (result.data.result=="true"){
                setChats(result.data.chats);
            }
        });
    }
    useEffect(()=>{
        auth.post(server+"/chats",{type:"info"}).then(result=>{
            if (result.data.result=="true"){
                result.data.chats=result.data.chats.map((chat:any)=>{ return {...chat,date:new Date(chat.d).getTime()}}).sort((a:any,b:any)=>b.date-a.date);
                peer.current.on("open",()=>{
                    for (const chat_json of result.data.chats){
                        const usuario=JSON.parse(chat_json.usuario);
                        if (usuario.online!=0){
                            peer.current.connect(usuario.peer_id,chat_json.usuario);
                        }
                    }
                });
                setChats(result.data.chats);
            }
        });
    },[]);
    return <>
        <div id="chats-div">
            <div id="label-mensagens">Mensagens</div>
            <div id="chats-list">
                {chats.map((chat,index)=>{
                    const c:chatsInterface=JSON.parse(chat.usuario);
                    const usuario=c.usuario;
                    return <Link to={"/chat/"+String(chat.chat_id)} className='chats-item' onContextMenu={(e:eventInterface)=>{e.preventDefault();menuId.current=chat.chat_id;setMenuExcluir(true)}} key={index}>
                        <div className="logo">{c.logo ? <img src={server+"/images/"+c.logo}></img> : <div>{c.usuario[0]}</div>}</div>
                        <div className='infos'>
                            <div className="txt-1 usuario">{usuario}</div>
                            <div className='txt-1 texto'>{chat.texto}</div>
                        </div>
                    </Link>
                })}
            </div>
        </div>
        
    </>
}
export default Chats;