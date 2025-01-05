import { useRef } from "react";
import { useSettings } from "./SettingsContext";
import GlobalContextInterface from "../../Global";
import sem_imagem from '../../static/sem-imagem.jpg';
import { resultInterface } from "../../Auth";

function Banner({option,globals,auth}:{option:string,globals:GlobalContextInterface,auth:any}){
    const {config,setConfig}=useSettings();
    const server=globals.server;
    const inputRef=useRef<HTMLInputElement>(null);
    const AlterarPermanente=()=>{
        var fd=new FormData();
        fd.append("type","option");
        fd.append("banner",inputRef.current!.files![0]);
        auth.post(server+"/admin/settings?type=banner",fd,{arquivo:true}).then((result:resultInterface)=>{
            if (result.error){
                globals.redirectError.current(result.error);
            } else {
                setConfig((conf:any)=>({...conf,banner:result.data.banner}));
            }
        })
    }
    const Alterar=()=>{
        inputRef.current!.click();
    }
    const Excluir=()=>{
        auth.post(server+"/admin/settings?type=banner&operation=d",{type:"option"}).then((result:resultInterface)=>{
            if (result.error){
                globals.redirectError.current(result.error);
            } else {
                setConfig((conf:any)=>({...conf,banner:null}));
            }
        });
    }
    return option=="banner" ? 
        <div className='banner-div'>
            <img className='banner-img' src={config && config.banner ? server+"/images/"+encodeURIComponent(config.banner) : sem_imagem}/>
            <div id="alterar" onClick={Alterar}>Alterar</div>
            <div id="excluir" onClick={Excluir}>Excluir</div>
            <input style={{display:"none"}} ref={inputRef} onChange={AlterarPermanente} type="file" accept="image/jpeg, image/jpg"/>
        </div>
    : <></>;
};
export default Banner;