import { useGlobal } from "../Global.tsx";
import AdminLogin from './AdminLogin.tsx';
import AdminInicio from "./AdminInicio.tsx";
function Admin(){
    const globals=useGlobal();
    return (
        <>
            {globals.login.isLoged ? globals.login.isLoged=="true" ? <AdminInicio/> : <AdminLogin/> : <></>}
        </>
    );
}
export default Admin;