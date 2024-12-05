import { memo } from 'react';
import { useGlobal } from './Global.tsx';
import './Logop.scss';
function Logo(props:any){
    const globals=useGlobal();
    const server=globals.server;
    return (
        <>
            { props.logo && props.logo!="null" ? <img id="logo_cpp_img" src={server+"/images/"+encodeURIComponent(props.logo)}/> : <div>{props.usuario && props.usuario!="" ? props.usuario[0] : ""}</div>}
        </>
    )
}
export default memo(Logo);