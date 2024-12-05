import { useState, useEffect, useRef } from 'react';
import GlobalContextInterface from '../../Global';
import authInterface, { resultInterface } from '../../Auth';

function Descricao({option,globals,auth}:{option:string,globals:GlobalContextInterface,auth:authInterface}){
    const { server }=globals;
    const [infos,setInfos]=useState<{previousDescription:string,currentDescription:string}>({previousDescription:"",currentDescription:""});
    const refs={
        description:useRef<HTMLTextAreaElement>(null)
    }
    const onChange=(e:any)=>{
        setInfos(infos=>{return {...infos,currentDescription:e.target.value}});
    };
    const get=()=>{
        auth.post(server+"/admin/description",{type:"info"}).then((result:resultInterface)=>{
            setInfos({previousDescription:"",currentDescription:""});
            refs.description.current!.value=result.data.description;
        });
    }
    useEffect(()=>{
        get();
    },[]);
    const saveDescription=()=>{
        const description=refs.description.current!.value;
        if (infos.previousDescription!=infos.currentDescription && infos.currentDescription!=""){
            setInfos({previousDescription:description,currentDescription:description});
            auth.post(server+"/admin/description",{type:"update",description:description});
        }
    }
    return (
        <div style={{display:option=="descricao" ? "block" : "none"}} className='description-div'>
            <textarea id="text" ref={refs.description} onChange={onChange}></textarea>
            {infos.previousDescription!=infos.currentDescription && infos.currentDescription!="" ? <div id="save" onClick={saveDescription}>Salvar</div> : 
            <div id="save" className="loading" onClick={saveDescription}>Salvar</div>}
        </div>
        )
}
export default Descricao;