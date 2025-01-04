import { useRef } from 'react';
import GlobalContextInterface from "../../Global";
import { useSettings } from './SettingsContext';
import Logo from '../../Logo';
import { resultInterface } from '../../Auth';
function LogoComponent({option,globals,auth}:{option:string,globals:GlobalContextInterface,auth:any}){
    const {config,setConfig}=useSettings();
    const inputRef=useRef<HTMLInputElement>(null);
    const server=globals.server;
    const AlterarPermanente=()=>{
        const fd=new FormData();
        fd.append("type","option");
        fd.append("logo",inputRef.current!.files![0]);
        auth.post(server+"/admin/settings?type=logo",fd,{arquivo:true}).then((result:resultInterface)=>{
            if (result.error){
                globals.setRedirectError(result.error);
            } else {
                setConfig((conf:any)=>({...conf,logo:result.data.lsrc}));
            }
        });
    }
    const Alterar=()=>{
        inputRef.current!.click();
    }
    const Excluir=()=>{
        auth.post(server+"/admin/settings?type=logo&operation=d",{type:"option"}).then((result:resultInterface)=>{
            if (result.error){
                globals.setRedirectError(result.error);
            } else {
                setConfig((conf:any)=>({...conf,logo:null}));
            }
        });
    }
    // useEffect(()=>{
    //     get();
    // },[]);
    return option=="logo" ? 
        <div className='logo-div'>
            {config ? <Logo logo={ config.logo || null} usuario={globals.login.usuario} width="20vh"/> : null}
            <div id="alterar" onClick={Alterar}>Alterar</div>
            <div id="excluir" onClick={Excluir}>Excluir</div>
            <input style={{display:"none"}} ref={inputRef} onChange={AlterarPermanente} type="file" accept='image/jpeg, image/jpg'/>
        </div>
    : <></>;
};
export default LogoComponent;