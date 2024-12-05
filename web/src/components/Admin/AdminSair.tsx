import {useEffect} from 'react';
import { useGlobal } from '../Global.tsx';
import { useAuth } from '../Auth.jsx';
function AdminSair(){
    const globals=useGlobal();
    const auth=useAuth();
    const { server,navigate }=globals;
    useEffect(()=>{
        async function logout(){
            await auth.post(server+"/admin/sair",{type:"info"});
            if (localStorage.getItem("token")){
                globals.myStorage.current=true;
                localStorage.removeItem("token");
                globals.myStorage.current=true;
                localStorage.removeItem("us");
                globals.myStorage.current=true;
                localStorage.removeItem("lsrc");
            }
            globals.myStorage.current=true;
            localStorage.removeItem("lg");
            globals.setLogin({usuario:null,isLoged:"false",logo:null});
            navigate!("/");
        }
        logout();
    },[]);
    return (
        <div></div>
    )
}
export default AdminSair;