import { memo } from 'react';
import { useGlobal } from './Global.tsx';
import './Logo.scss';
function Logo(props:any){
    const globals=useGlobal();
    const server=globals.server;
    return (
        <div className='logo_c' onClick={props.onClick} style={{
            width:props.width,
            height:props.width,
            fontSize:`calc(${props.width} / 2)`,
            borderRadius:`calc(${props.width} / 6)`
        }}>
        { props.logo && props.logo!="null" ? <img src={server+"/images/"+encodeURIComponent(props.logo)}/> : props.usuario && props.usuario!="" ? props.usuario[0] : "" }
        </div>
    )
}
export default memo(Logo);