import { Dispatch, SetStateAction } from "react";
import { useGlobal } from "../Global";
import Link from "../Link";
import "./UserOptions.scss";

function UserOptions({show,setShow}:{show:boolean,setShow:Dispatch<SetStateAction<boolean>>}){
    const { login }=useGlobal();
    return <div style={{display:show ? "block" : "none"}} id="uo">
        <Link onClick={()=>setShow(false)} className="uo-item" to={"/@"+login.usuario}>Meu canal</Link>
        <Link onClick={()=>setShow(false)} className="uo-item" to="/admin">Gerenciar</Link>
        <Link onClick={()=>setShow(false)} className="uo-item" to="/admin/sair">Sair</Link>
    </div>
}
export default UserOptions;