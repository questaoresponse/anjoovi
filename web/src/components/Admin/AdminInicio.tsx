import { useEffect } from "react";
import './AdminInicio.scss';
import { useGlobal } from "../Global.tsx";
function AdminInicio(){
    const globals=useGlobal();
    useEffect(()=>{
        globals.setSelected("inicio");
    },[]);
    return (
        <div id="pg" className="adi"></div>
    )
}
export default AdminInicio;