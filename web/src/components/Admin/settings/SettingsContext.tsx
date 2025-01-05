import { useContext, createContext, useState, useCallback, useEffect } from 'react';
import { useGlobal } from '../../Global';
import { resultInterface } from '../../Auth';
interface SettingsContextInterface{
    config:any,
    setConfig:(value:any)=>void,
}
export default SettingsContextInterface;
const settingsContext=createContext<SettingsContextInterface | undefined>(undefined);
const SettingsProvider=({children,auth,server}:{children:any,auth:any,server:any})=>{
    const [config,setConfig]=useState();
    const globals=useGlobal();
    const get=useCallback(()=>{
        auth.post(server+"/admin/settings",{type:"info"}).then((result:resultInterface)=>{
            if (result.error){
                globals.redirectError.current(result.error);
            } else {
                setConfig(result.data.config);
            }
        })
    },[config]);
    useEffect(()=>{
        get();
    },[]);
    return (
        <settingsContext.Provider value={{config,setConfig}}>{children}</settingsContext.Provider>
    )
}
const useSettings=()=>{
    const context=useContext(settingsContext);
    if (!context){
        throw new Error("settingsContext deve ser usado dentro de setingsContext.Provider");
    }
    return context;
}
export { useSettings, SettingsProvider};