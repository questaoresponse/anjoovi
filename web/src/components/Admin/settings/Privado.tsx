import { useRef, useEffect } from "react";
import GlobalContextInterface from "../../Global.tsx";
import { resultInterface } from "../../Auth.tsx";
function Views({option,globals,auth}: {option:string,globals:GlobalContextInterface,auth:any}){
    const refs={
        input:useRef<HTMLInputElement>(null)
    }
    const alterar=(e:any)=>{
        e.preventDefault();
        auth.post(globals.server+"/admin/",{type:"option",value:refs.input.current ? refs.input.current.checked ? "true" : "false" : false}).then((result:resultInterface)=>{
            if (result.data.result=="true"){
                refs.input.current!.checked=!refs.input.current!.checked;
            }
        });
    }
    useEffect(()=>{
        auth.post(globals.server+"/admin/views",{type:"info"}).then((result:resultInterface)=>{
            if (result.data.result=="true"){
                if (result.data.response=="true"){
                    refs.input.current && (refs.input.current.checked=true);
                }
            }
        });
    },[]);
    return option=="views" ? (
        <div className='views-div'>
        <div id="musica-d">
            <div className='btn-d'>
                <input ref={refs.input} className='i' type='checkbox' onChange={alterar}></input>
                <div className='select'></div>
            </div>
        </div>
    </div>
    ) : null
}
export default Views;