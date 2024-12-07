import { useEffect, useRef } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { useGlobal } from "./Global.tsx";
import { resultInterface, useAuth } from "./Auth.jsx";
import { initSync,Data,Canvas } from '../../public/pkg/busca.js';
function GlobalFunction(){
    const location=useLocation();
    const auth=useAuth();
    const navigatess=useNavigate();
    const { player, setHeader, loadedInfos,serviceChannel,server,navigate,navigateClass,setMobile,verifyStories,currentLogin,modules,redirectTo,redirectError,isLoadedPage,peer, cargo }=useGlobal();
    
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
          // const c2=document.querySelectorAll("*");
          // for (var c of c2){
          //   if (c.scrollTop>0){
          //     console.log(c,c!.scrollTop);
          //     c!.scrollTop=0;
          //   }
          // }
          // document.querySelector("html")!.style.overflow="hidden";
          // setTimeout(()=>{
          // document.querySelector("html")!.scrollIntoView
            
          // },1000);
          window.scrollTo({top:0,behavior:"instant"});
    };
    useEffect(()=>{
        function navigateFn(pathname:string,changeURL?:boolean,lookTop?:boolean){
            if (changeURL){
                navigatess(pathname);
            } else {
                window.history.pushState({},"",pathname);
            }
            if (lookTop && location.pathname!=pathname.split("?")[0] && window.scrollY>0){
                window.scrollTo({top:0,behavior:"instant"});
            }
        };
        const handleSize=()=>{
            setMobile(window.innerWidth < 769 ? true : false);
        }
        window.addEventListener("resize",handleSize);
        const verifyStoriesFn=(route:any)=>{
            navigate!(currentLogin.current.isLoged=="true" ? route : "/admin?origin="+encodeURIComponent(route));
        }
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
        navigateClass.current.addListener(verifyHeader);
        verifyHeader(location.pathname);
        return ()=>{
            window.removeEventListener("resize",handleSize);
            navigateClass.current.removeListener(verifyHeader);
        } 
    },[]);
    useEffect(()=>{
        var mutation=redirectError;
        if (mutation){
            if (mutation=="/admin"){
               navigate!("/admin");
            } else if (mutation=="/erro"){
                navigate!("/erro?origin="+encodeURIComponent(window.location.href));
            }
        };
    },[redirectError]);
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
    useEffect(()=>{
        gtag('config', 'G-ZXT801SFX9', {
            'page_path': window.location.pathname
        });
    },[location.pathname,location.search]);
    // useEffect(()=>{
    //     var mutation=globals.user;
    //     if (mutation!==undefined){
    //         if (globals.user!==null){
    //             globals.setIsLoged("true");
    //         } else {
    //             globals.setIsLoged("false");
    //         }
    //     }
    // },[globals.user]);
    // useEffect(()=>{
    //     const mobile=windowWidth<769 ? true : false;
    //     const pesquisa=pesquisaRef.current;
    //     pesquisa.style.display=mobile ? "none" : "block"; 
    // },[globals.mobile]);
    useEffect(()=>{
        const toExecute=()=>{
            // if (navigator.serviceWorker.controller){
            //     const messageChannel = new MessageChannel();
            //     // Recebe a resposta do Service Worker
            //     messageChannel.port1.onmessage = event => {
            //         console.log('Received message from Service Worker:', event.data);
            //     };
            //     // Envia uma mensagem para o Service Worker
            //     navigator.serviceWorker.controller.postMessage({ type:"client", message: 'Hello from main thread' },[messageChannel.port2]);
            // }
            if (!loadedInfos.current.loaded){
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
                var peer_id="";
                // Recebe a resposta do Service Worker
                serviceChannel.current.port1.onmessage = event => {
                    if (event.data.type=="send"){
                        const { tipo, modify, newPeer, deletePeer }=event.data.data;
                        auth.post(event.data.url,{type:"infos",tipo:tipo,modify:modify,new:newPeer,delete:deletePeer});
                    }
                    // console.log('Received message from Service Worker:', event.data);
                };
                const send=(message:any)=>{
                    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                        serviceChannel.current.port1.postMessage({...message,origin:"client"});
                    }
                }
                navigator.serviceWorker.controller!.postMessage({origin:"new"},[serviceChannel.current.port2]);
                send({type:"data",server,tipo:tipo_usuario});
                // Envia uma mensagem para o Service Worker
                if (currentLogin.current.usuario){
                    peer.current.init(currentLogin.current.usuario!);
                    peer.current.post=auth.post;
                    peer.current.server=server;
                    peer.current.on('open', ({id}:{id:string}) => {
                        peer_id=id;
                        // enviar();
                        send({type:"newPeer",peer_id:peer_id});
                    });
                }
                // function enviar(hidden=false,out=false){
                //     if (hidden && !out) return;
                //     auth.post(server+"/view",{type:"info",tipo:tipo_usuario,operator:out ? "delete" : hidden ? "modify" : "new",peer_id:peer_id});
                // }
                // function newSend(type:number){
                //     if (currentLogin.current.usuario){
                //         auth.post(server+"/view",{type:"info",tipo:tipo_usuario,operator:type==0 ? "delete" : type==1 ? "modify" : "new",peer_id:peer_id});
                //     }       
                // }
                // function trocar(){
                //     // enviar(document.hidden);
                //     newSend(1);
                //     // if (document.hidden){
                //     //     clearInterval(st);
                //     //     st=undefined;
                //     // } else {
                //     //     if (!st){
                //     //         st=setInterval(()=>{
                //     //             // enviar();
                //     //             newSend(1);
                //     //         },10000);
                //     //     }
                //     // }
                // }
                function deletar(){
                    send({type:"deletePeer",peer_id:peer_id});
                    // enviar(true,true);
                }
                // document.addEventListener("visibilitychange",trocar);
                window.addEventListener("beforeunload",deletar);
                return ()=>{
                    // document.removeEventListener("visibilitychange",trocar);
                    window.removeEventListener("beforeunload",deletar);
                }
            }
        }
        if ('serviceWorker' in navigator) {
            window.addEventListener("load",()=>{
                navigator.serviceWorker.getRegistration().then((registration)=>{
                    if (registration){
                        toExecute();
                    } else {
                        navigator.serviceWorker.register(`/service-worker.js`).then(()=>{
                            toExecute();
                        });
                    }
                })
                
            });
        }
        const scriptUrl = document.querySelector("script")!.src;
        const scriptName = scriptUrl.substring(scriptUrl.lastIndexOf("/") + 1);
        fetch("/pkg/busca_bg.wasm?n="+scriptName)
        .then(result=>result.arrayBuffer())
        .then(async result=>{
            // const myWorker = new Worker('/pkg/t.js');
            // myWorker.postMessage(result);
            // myWorker.onmessage=async (e)=>{
                initSync(result);
                modules.current={Data,Canvas};
            // }
            // globals.modules.current={Data,Canvas};
            // let c2=new Data();
            // auth.post(globals.server+"/admin/metricas",{type:"info"}).then(async result=>{
            //     console.log(result.data);
            //     console.time("t");
            //     let date=new Date();
            //     c2.teste(JSON.stringify(result.data),date.getFullYear(),date.getMonth,date.getDate());
            //     console.timeEnd("t");
            //     console.log(c2.get());
            // });
        });
    },[]);
    return (
        <></>
    );
}
export default GlobalFunction;