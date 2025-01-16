import {useEffect} from 'react';
import { useGlobal } from '../Global.tsx';
import { useAuth } from '../Auth.jsx';
function AdminSair(){
    const globals=useGlobal();
    const auth=useAuth();
    const { server,navigate }=globals;
    useEffect(()=>{
        var rPromisse:any=false;
        function onMessage(event:any){
            if (event.data.type=="sendDeletePeer"){
                const { tipo, modify, newPeer, deletePeer }=event.data.data;
                auth.post(event.data.url,{type:"infos",tipo:tipo,modify:modify,new:newPeer,delete:deletePeer});
                navigator.serviceWorker.removeEventListener("message",onMessage);
                rPromisse(true);
            }
        };
        function peer_logout(){
            return new Promise((r,_)=>{
                if (navigator.serviceWorker.controller){
                    navigator.serviceWorker.addEventListener("message",onMessage);
                    navigator.serviceWorker.controller.postMessage({type:"deleteAllPeer"});
                    rPromisse=r;
                } else {
                    r(false);
                }
            });
        }
        async function logout(){
            await peer_logout();
            await auth.post(server+"/admin/sair",{type:"info"});
            localStorage.getItem("lg") && localStorage.removeItem("lg");
            globals.myStorage.current=true;
            globals.setLogin({usuario:null,isLoged:"false",logo:null});
            globals.cargo.current.setCargo(128);
            if (globals.navigateClass.current.atualizePage){
                window.location.href="/";
            } else {
                navigate!("/");
            }
        }
        logout();
    },[]);
    return (
        <div></div>
    )
}
export default AdminSair;