import Chats from "./Chats";
import Chat from "./Chat";
import { useGlobal } from "../Global";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ChatsComponent.scss";
interface valuesChatsInterface{
    type:string | null,
    id:number
}
function ChatsComponent(){
    const { mobile }=useGlobal();
    const location=useLocation();
    const [values,setInfos]=useState<{type:string | null,id:number}>({type:null,id:-1});
    const [menuExcluir,setMenuExcluir]=useState(false);
    const excluir=useRef(null);
    useEffect(()=>{
        if (location.pathname.split("/")[1]=="chats"){
            setInfos({type:"chats",id:-1});
        } else {
            setInfos({type:"chat",id:Number(location.pathname.split("/")[2])});
        }
    },[location.pathname]);
    return <div id="chats-c">
        {values.type=="chats" ? mobile ? <div id="chats-p" className="m e"><Chats setMenuExcluir={setMenuExcluir} excluir={excluir}></Chats></div> : <div id="chats-p" className="e"><Chats setMenuExcluir={setMenuExcluir} excluir={excluir}></Chats></div> : mobile ? null : <div id="chats-p"className="e"><Chats setMenuExcluir={setMenuExcluir} excluir={excluir}></Chats></div>}
        {values.type=="chat" ? mobile ? <div id="chat-p" className="m e"><Chat values={values}></Chat></div> : <div id="chat-p" className="e"><Chat values={values}></Chat></div> : mobile ? null : <div id="chat-p"><div id="messages-values">Suas mensagens.</div></div>}
        <div id="menu-a" onClick={()=>setMenuExcluir(false)} style={{display:menuExcluir ? "flex" : "none"}}></div>
        <div id="menu" style={{display:menuExcluir ? "flex" : "none"}}>
            <div id="menu-infos">
                <p>Deseja realmente excluir esse chat?</p>
                <button id="menu-btn" onClick={excluir.current!}>Excluir</button>
            </div>
        </div>
    </div>

}
export type { valuesChatsInterface };
export default ChatsComponent;