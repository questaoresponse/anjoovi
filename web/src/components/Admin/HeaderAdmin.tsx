import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Link from "../Link.tsx";
import './HeaderAdmin.scss';
import { useGlobal } from "../Global.tsx";
import Logo from "../Logo.tsx";
import "../Logo.scss";
import { useAuth } from "../Auth.tsx";
import LogoAnjoovi from "../LogoAnjoovi.tsx";
import UserOptions from "../Shared/UserOptions.tsx";
function HeaderAdmin(){
    const globals=useGlobal();
    const { server, cargo }=useGlobal();
    const auth=useAuth();
    const [cMenu,setCMenu]=useState(false);
    const [userOptions,setUserOptions]=useState(false);
    const location=useLocation();
    const onMenuClick=()=>{
        setCMenu((cMenu)=>(!cMenu));
    }
    useEffect(()=>{
        setCMenu(false);
    },[location.pathname]);
    const [cargoValue,setCargoValue]=useState(cargo.current.cargo);
    const updateCargo=(cargo:number)=>{
        setCargoValue(cargo);
    }
    useEffect(()=>{
        cargo.current.addListener(updateCargo);
        auth.post(server+"/admin/cargo",{type:"info"}).then((result)=>{
            cargo.current.setCargo(result.data.cargo);
        });
        return ()=>{
            cargo.current.removeListener(updateCargo);
        }
    },[]);
    return (
        <div>
            <div id="cb" className="d-block cbn">
            <Link className="nome_usuario txt-1" to='/admin/settings'>{globals.login.usuario}</Link>
            { (cargoValue! & 2)==0 ? 
            <div id="c_menu" className={cMenu ? "aberto" : "fechado"}>
                <Link to='/admin'><div className={"i-menu-1 i-menu"+(globals.selected=="inicio" ? " selected" : "")} id="inicio" >Inicio</div></Link>
                <Link to="/admin/noticias_cadastro"  className={"i-menu-1 i-menu"+(globals.selected=="publicar" ? " selected" : "")} id="publicar">Publicar</Link>
                <Link to="/admin/noticias_lista" className={"i-menu-1 i-menu"+(globals.selected=="listar" ? " selected" : "")} id="listar">Listar</Link>
                <Link to='/admin/metricas'><div className={"i-menu"+(globals.selected=="metricas" ? " selected" : "")} id="metricas">Métricas</div></Link>
                <Link to='/admin/settings'><div className={"i-menu"+(globals.selected=="settings" ? " selected" : "")} id="settings">Configurações</div></Link>
                <Link to='/admin/account'><div className={"i-menu"+(globals.selected=="account" ? " selected" : "")} id="settings">Conta</div></Link>
                <Link to='/admin/premium'><div className={"i-menu"+(globals.selected=="premium" ? " selected" : "")} id="settings">Premium</div></Link>
                <Link to='/admin/sair'><div className="i-menu" id="sair">Sair</div></Link>
            </div>
            : 
            <div id="c_menu" className={cMenu ? "aberto" : "fechado"}>
                <Link to='/admin'><div className={"i-menu-1 i-menu"+(globals.selected=="inicio" ? " selected" : "")} id="inicio" >Inicio</div></Link>
                <Link to="/admin/noticias_lista" className={"i-menu-1 i-menu"+(globals.selected=="listar" ? " selected" : "")} id="listar">Listar</Link>
                <Link to='/admin/metricas'><div className={"i-menu"+(globals.selected=="metricas" ? " selected" : "")} id="metricas">Métricas</div></Link>
                <Link to='/admin/account'><div className={"i-menu"+(globals.selected=="account" ? " selected" : "")} id="settings">Conta</div></Link>
                <Link to='/admin/users'><div className={"i-menu"+(globals.selected=="users" ? " selected" : "")} id="users">Usuários</div></Link>
                <Link to='/admin/denuncias_lista'><div className={"i-menu"+(globals.selected=="denuncias_lista" ? " selected" : "")} id="denuncias_lista">Denúncias</div></Link>
                <Link to='/admin/sair'><div className="i-menu" id="sair">Sair</div></Link>
            </div>
            }
            <div onClick={onMenuClick} id="menu-a" className={cMenu ? "aberto" : "fechado"}></div>
            <svg id="bt-menu" onClick={onMenuClick}>
                <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path>
            </svg>
            <Logo onClick={()=>setUserOptions(value=>!value)} logo={globals.login.logo} usuario={globals.login.usuario} width="42.5px"/>
            <Link data-color="inicio" to='/'><LogoAnjoovi id="logo"/></Link>
            <UserOptions show={userOptions} setShow={setUserOptions}></UserOptions>
        </div>
        </div>
    )
}
export default HeaderAdmin;