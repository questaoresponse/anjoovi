import { useCallback, useEffect, useRef } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { useGlobal } from "./Global.tsx";
import { resultInterface, useAuth } from "./Auth.jsx";
import { initSync,Data,Canvas } from '../../public/pkg/busca.js';
function GlobalFunction(){
    const location=useLocation();
    const auth=useAuth();
    const navigatess=useNavigate();
    const { player, setHeader, loadedInfos,server,navigate,navigateClass,setMobile,verifyStories,currentLogin,modules,redirectTo,redirectError,isLoadedPage,peer, cargo, login }=useGlobal();
    
    function gtag(..._:any){window.dataLayer.push(arguments);}
    const verifyHeader=(pathname:string)=>{
        if (pathname=="/admin"){
            player.current.page_id!=-1 && player.current.reset();
            if (currentLogin.current.isLoged=="true"){
                setHeader("admin");
            } else if (currentLogin.current.isLoged=="false") {
                setHeader(false);
            }

        } else if (pathname.startsWith("/admin")){
            player.current.page_id!=-1 && player.current.reset();
            if (currentLogin.current.isLoged=="true"){
                setHeader("admin");
            } else if (currentLogin.current.isLoged=="false") {
                setHeader(false);
            }
        } else {
            if (pathname.startsWith("/stories")){
                setHeader(false);
            } else {
                setHeader("normal");
            };
        }
    };
    const onPopstate=useCallback(()=>{
        navigate(window.location.href.split(window.location.host)[1],{changeURL:false});
    },[]);
    useEffect(()=>{
        if (redirectTo){
            navigate!(redirectTo);
        }
    },[redirectTo]);
    const currentPage=useRef(location);
    useEffect(()=>{
        if (location.pathname!=currentPage.current.pathname || location.search!=currentPage.current.search){
            isLoadedPage.current=false;
        }
    },[location.search,location.pathname]);
    const peer_id=useRef("");
    const send=(message:any)=>{
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller!.postMessage({...message,origin:"client"});
        }
    }
    const deletar=useCallback(()=>{
        send({type:"deletePeer",peer_id:peer_id.current});
        // enviar(true,true);
    },[]);
    const toExecute=(userChanged:boolean=false)=>{
        if (loadedInfos.current.loaded && !userChanged){
            return;
        }
        loadedInfos.current.loaded=true;
        
        auth.post(server+"/cargo",{type:"info"}).then((result:resultInterface)=>{
            if (result.data.result=="true"){
                cargo.current.setCargo(result.data.cargo);
                
            }
        });
        function ismobile() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }
        var tipo_usuario=ismobile() ? "mobile" : "computer";
        // Recebe a resposta do Service Worker
        send({type:"data",server,tipo:tipo_usuario});
        // Envia uma mensagem para o Service Worker
        if (currentLogin.current.usuario){
            peer.current.init(currentLogin.current.usuario!);
            peer.current.post=auth.post;
            peer.current.server=server;
            peer.current.on('open', ({id}:{id:string}) => {
                peer_id.current=id;
                send({type:"newPeer",peer_id:peer_id.current});
            });
        }
    }
    useEffect(()=>{
        const scriptUrl = document.querySelector("script")!.src;
        const scriptName = scriptUrl.substring(scriptUrl.lastIndexOf("/") + 1);
        fetch("/pkg/busca_bg.wasm?n="+scriptName)
        .then(result=>result.arrayBuffer())
        .then(async result=>{
                initSync(result);
                modules.current={Data,Canvas};
        });
        function navigateFn(pathname:string,changeURL?:boolean,lookTop?:boolean){
            if (changeURL){
                navigatess(pathname);
            }
            if (lookTop && location.pathname!=pathname.split("?")[0] && window.scrollY>0){
                window.scrollTo({top:0,behavior:"instant"});
            }
        };
        const handleSize=()=>{
            setMobile(window.innerWidth < 769 ? true : false);
        };
        const verifyStoriesFn=(route:any)=>{
            navigate!(currentLogin.current.isLoged=="true" ? route : "/admin?origin="+encodeURIComponent(route));
        };
        verifyStories.current=verifyStoriesFn;
        
        document.body.style.cssText+="padding: initial !important"

        navigateClass.current.setNavigateCurrent(navigateFn);
        
        window.dataLayer=[];
        const script=document.createElement("script");
        script.src="https://www.googletagmanager.com/gtag/js?id=G-ZXT801SFX9";
        script.crossOrigin="anonymous";
        document.body.appendChild(script);
        gtag('js', new Date());
        gtag('config', 'G-ZXT801SFX9');
        navigator.serviceWorker.addEventListener("message",event=>{
            if (event.data.type=="send"){
                const { tipo, modify, newPeer, deletePeer }=event.data.data;
                auth.post(event.data.url,{type:"infos",tipo:tipo,modify:modify,new:newPeer,delete:deletePeer});
            }
        });
        window.addEventListener("beforeunload",deletar);
        window.addEventListener("popstate",onPopstate);
        window.addEventListener("resize",handleSize);
        navigateClass.current.addListener(verifyHeader);
        verifyHeader(location.pathname);
        redirectError.current=(pathname:string)=>{
            if (pathname=="/admin"){
                navigate("/admin");
            } else if (pathname=="/erro"){
                navigate("/erro?origin="+encodeURIComponent(window.location.href));
            }
        };
        return ()=>{
            window.removeEventListener("beforeunload",deletar);
            window.removeEventListener("popstate",onPopstate);
            window.removeEventListener("resize",handleSize);
            navigateClass.current.removeListener(verifyHeader);
        }
    },[]);
    useEffect(()=>{
        gtag('config', 'G-ZXT801SFX9', {
            'page_path': window.location.pathname
        });
    },[location.pathname,location.search]);
    const c=useRef(0);
    useEffect(()=>{
        c.current++;
        if (c.current > 1){
            if (currentLogin.current.usuario){
                toExecute(true);
            }
        }
    },[login]);
    const isLoaded=useRef(false);
    const install=()=>{
        if (isLoaded.current) return;
        isLoaded.current=true;
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistration().then((registration)=>{
                if (registration){
                    toExecute();
                } else {
                    navigator.serviceWorker.register(`/service-worker.js`).then(()=>{
                        toExecute();
                    });
                }
            });
        }
    }
    install();
    return (
        <></>
    );
}
export default GlobalFunction;