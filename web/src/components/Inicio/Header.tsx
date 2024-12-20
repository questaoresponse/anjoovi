import { useEffect, useState, useRef, memo, useLayoutEffect } from 'react';
import { useGlobal } from '../Global.tsx';
import { useLocation } from 'react-router-dom';
import Link from '../Link.tsx';
import './Header.scss'
import lupa from '../static/lupa.png';
import xSrc from '../static/x.png';
import Logo from '../Logo.jsx';
import LogoAnjoovi from '../LogoAnjoovi.tsx';
const Header = () => {
    const globals = useGlobal();
    const { navigate }=globals;
    const [menu,setMenu] = useState(false);
    // const currentIsLoged=useRef<string | null>(null);
    const getLogadoValue=()=>{
      return globals.login.isLoged=="true";
      // if (!currentIsLoged.current || globals.login.isLoged!=currentIsLoged.current){
      //   currentIsLoged.current=globals.login.isLoged;
      //   return globals.login.isLoged=="true";
      // } else {
      //   return globals.login.isLoged=="true";
      // }
    }
    const [isLogado,setIsLogado]=useState(getLogadoValue());
    const [lupaSrc, _] = useState(lupa);
    const refs={
      pai:useRef<HTMLDivElement>(null),
      pesquisa:useRef<HTMLInputElement>(null),
      voltar:useRef<HTMLDivElement>(null),
      lupa:useRef<HTMLDivElement>(null),
      login:useRef<HTMLAnchorElement>(null),
      logo:useRef<HTMLAnchorElement>(null),
    }

    const location=useLocation();
    const add=()=>{
      !refs.pai.current!.classList.contains("m")  && refs.pai.current!.classList.add("m");
    }
    const remove=()=>{
      refs.pai.current!.classList.contains("m") && refs.pai.current!.classList.remove("m");
    }
    useEffect(() => {
      setIsLogado(getLogadoValue());
    }, [globals.login]);

    const onClickMenu = () => {
    	setMenu((menu)=>(!menu));
    };
    // checks if the last change was made by search
    const isChangeSearch=useRef(false);
    useLayoutEffect(()=>{
        setMenu(false);
        if (isChangeSearch.current){
            refs.pesquisa.current!.value="";
            refs.pai.current!.classList.contains("x") && refs.pai.current!.classList.remove("x");
          	isChangeSearch.current=false;
        }
        if (location.pathname=="/busca"){
          var q=new URLSearchParams(location.search);
          if (q.has("q")){
            refs.pesquisa.current!.value=decodeURIComponent(q.get("q") || "");
            !refs.pai.current!.classList.contains("x") && refs.pai.current!.classList.add("x");
            isChangeSearch.current=true;
          }
        }
    },[location.pathname]);
      
    const onChange = (e:any) => {
      e.target.value!="" && !refs.pai.current!.classList.contains("x") ? refs.pai.current!.classList.add("x") : (e.target.value=="" && refs.pai.current!.classList.contains("x") && refs.pai.current!.classList.remove("x"));
      // setLupaSrc(e.target.value ? x : lupa);
    };
  
    const Voltar = () => {
      remove();
    };
  
    const onClickVoltar = Voltar;
    const onClickLupa = () => {
      if (!refs.pai.current!.classList.contains("m")) {
        add();
      } else {
        pesquisar();
      }
    };
  
    const pesquisar = (e:any=null) => {
      e && e.preventDefault();
      if (refs.pesquisa.current!.value.trim()!=""){
        isChangeSearch.current=true;
        navigate!("/busca?q=" + encodeURIComponent(refs.pesquisa.current!.value.replace(/%20/g, "+")));
        Voltar();
      }
    };
    const clearValue=()=>{
      refs.pesquisa.current!.value="";
      // setX(false);
    }
    const onLogoClick=()=>{
      if (location.pathname=="/"){
        globals.get.current && globals.get.current();
      }
    }
    const VerifyInscricoes=(e:any)=>{
      e.preventDefault();
      if (globals.login.isLoged=="true"){
        navigate!("/inscricoes");
      } else if (globals.login.isLoged=="false"){
        navigate!("/admin");
      }
    }
    return (
      <div ref={refs.pai} id="cb" className="d-block cbi">
        <div id="c_menu" className={menu ? "aberto" : "fechado"}>
          <Link className="a-l i-menu" to="/">
              Inicio
          </Link>
          <Link onClick={VerifyInscricoes} className="a-l i-menu" to="/inscricoes">
              Inscrições
          </Link>
          <Link className="a-l i-menu" to="/chats">
            Chats
          </Link>
          <Link className="a-l i-menu" to="/premium">
            Premium
          </Link>
        </div>
        <form onSubmit={pesquisar} id="fp">
          <div onClick={onClickVoltar} ref={refs.voltar} id="voltar">
            <svg
              id="voltar"
              viewBox="0 0 24 24"
              focusable="false"
              style={{ pointerEvents: "none", display: "block" }}
            >
              <rect width="100%" height="100%" />
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
            </svg>
          </div>
          <div id="pesquisa-pai">
            <input ref={refs.pesquisa} onChange={onChange} id="pesquisa" className="fechado" placeholder="Pesquisar" />
            <div ref={refs.lupa} id="pld">
              <img src={xSrc} onClick={clearValue} id="x"></img>
              <img onClick={onClickLupa} id="pl" className="d-inline-block" src={lupaSrc} alt="Ícone de pesquisa" />
            </div>
          </div>
        </form>
        {globals.mobile || isLogado ? <Link to="/admin/noticias_cadastro" id="post">
            {/* <img src={seta} alt="" /> */}
          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 25" fill="none">
            <path d="M7.5 5 L12.5 12.5 L9.5 12.5 L9.5 20 L5.5 20 L5.5 12.5 L2 12.5 Z" stroke-width="0.75" stroke="black"  fill="white"/>
          </svg> */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" viewBox="0 0 20 41" fill="none">
            <path d="M10.71 8.88 L 1.42 24 L 7.14 24 L 7.14 39 L 14.28 39 L 14.28 24 L 20 24 Z" strokeWidth="1" stroke="black"  fill="white"/>
          </svg>
          </Link> : <></>}
        <Link id="logolink" onClick={onLogoClick} ref={refs.logo} to="/">
          <LogoAnjoovi id={"logo"}/>
        </Link>
        <svg id="bt-menu" onClick={onClickMenu}>
          {/* <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path> */}
          <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path>
        </svg>
        <Link  className={"l-l" + (!isLogado ? " login" : "")} ref={!isLogado ? refs.login : null}  to="/admin">
          <div id="btn_login" style={{ display: !globals.mobile && !isLogado ? "flex" : "none" }}>
            Fazer login
          </div>
        </Link>
        <Link className={isLogado ? "login" : ""} ref={isLogado ? refs.login : null} to="/admin">
          <div id="logado" className="nlogado" style={{ display:!globals.mobile && isLogado ? "flex" : "none" }}>
            <Logo logo={globals.login.logo} usuario={globals.login.usuario} width="42.5px"/>
          </div>
        </Link>
        <div onClick={onClickMenu} id="menu-a" className={menu ? "menu-aberto" : "menu-fechado"}></div>
        {/* <img id="load" src={x} style={{ display: "none" }} alt="Ícone de carregamento" /> */}
      </div>
    );
  };
  
  export default memo(Header);