import { useEffect, useRef, useState } from 'react';
import { useGlobal } from '../../Global.tsx';
import { useAuth } from '../../Auth.jsx';
import './Settings.scss';
import { useLocation } from 'react-router-dom';
import Views from './Views.tsx';
import { SettingsProvider } from './SettingsContext.tsx';
import LogoComponent from './LogoComponent.tsx';
import Banner from './Banner.tsx';
import Destaques from './Destaques.tsx';
import Descricao from './Descricao.tsx';
import Card from './Card.tsx';



function Settings(){
    const globals=useGlobal();
    const { navigate }=globals;
    const auth=useAuth();
    const [option,setOption]=useState<string | null>(null);
    const location=useLocation();
    const [isNavigate,setIsNavigate]=useState<string | boolean>(false);
    // const get=useCallback(()=>{
    //     auth.post(server+"/admin/settings",{type:"info"}).then((result)=>{
    //         if (result.error){
    //             globals.redirectError.current(result.error);
    //         } else {
    //             setConfig(result.data.config);
    //         }
    //     })
    // },[config]);
    useEffect(()=>{
        const q=new URLSearchParams(location.search);
        if (q.has("option")){
            setOption(q.get("option"));
        } else {
            q.set("option","logo");
            setOption("logo");
        }
        // get();
        globals.setSelected("settings");
    },[]);
    useEffect(()=>{
        if (option){
            const q=new URLSearchParams(location.search);
            const opt=q.has("option") ? q.get("option") :  "logo";
            if (opt!=option){
                setIsNavigate("true");
                q.set("option",option);
                navigate!!(location.pathname+(option=="logo" ? "" : "?"+q.toString()));
            }
        }
    },[option]);
    useEffect(()=>{
        if (isNavigate && isNavigate=="false"){
            const q=new URLSearchParams(location.search);
            setOption(q.get("option") || "logo");
        } else if (isNavigate && isNavigate=="true"){
            setIsNavigate("false");
        }
    },[location.search]);
    const options=useRef<{[key:string]:string}>({
        logo:"selected1",
        banner:"selected2",
        destaque:"selected3",
        views:"selected4",
        descricao:"selected5",
        card:"selected6",
    })
    return (
        <div className="config">
            <div id="pg">
                <div className='margin'>
                    <div id="tipod">
                        <div id="tipobd" style={{display:option ? "block" : "none"}} className={ options.current[option!] || ""}></div>
                        <div id="tipot">
                            <div onClick={()=>setOption("logo")} className="tipo t1">Logo</div>
                            <div onClick={()=>{setOption("banner")}} className="tipo t2">Banner</div>
                            <div onClick={()=>setOption("destaque")} className="tipo t3">Destaque</div>
                            <div onClick={()=>setOption("views")} className="tipo t4">Views</div>
                            <div onClick={()=>setOption("descricao")} className="tipo t5">Descrição</div>
                            <div onClick={()=>setOption("card")} className="tipo t6">Card</div>
                        </div>
                    </div>
                    <div>
                        <SettingsProvider auth={auth} server={globals.server}>
                            <LogoComponent option={option!} globals={globals} auth={auth}/>
                            <Banner option={option!} globals={globals} auth={auth}/>
                            <Destaques option={option!} globals={globals} auth={auth} location={location}/>
                            <Views option={option!} globals={globals} auth={auth}/>
                            <Descricao option={option!} globals={globals} auth={auth}/>
                            <Card option={option!} globals={globals} auth={auth}/>
                        </SettingsProvider>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Settings;