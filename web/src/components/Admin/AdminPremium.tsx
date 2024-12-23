import { useState, useRef, useEffect } from 'react';
import './AdminPremium.scss';
import loading_src from "../static/loading.png";
import { useGlobal } from '../Global';
import { useAuth } from '../Auth';
import Link from '../Link';
const AdminPremium=()=>{
    const { server, setSelected, cargo }=useGlobal();
    const [cargoValue,setCargoValue]=useState(((cargo.current.cargo || 0)+8) >> 3);
    const updateCargo=(cargo:number)=>{
        setCargoValue(((cargo || 0)+8) >> 3);
    }
    useEffect(()=>{
        cargo.current.addListener(updateCargo);
        auth.post(server+"/admin/cargo",{type:"info"}).then((result)=>{
            cargo.current.setCargo(result.data.cargo);
        });
        return ()=>{
            cargo.current.removeListener(updateCargo);
        }
    },[]);
    const auth=useAuth();
    const [isLoading,setIsLoading]=useState(true);
    const [isPremium,setIsPremium]=useState<boolean | null>(null);
    const [isInvalidLicense,setIsInvalidLicense]=useState(false);
    const [licenseInfos,setLicenseInfos]=useState<{isFile:boolean,filename:string}>({isFile:false,filename:""});
    const refs={
        input:useRef<HTMLInputElement>(null)
    }
    const Verify=()=>{
        const file=refs.input.current!.files![0];
        if (file){
            setIsLoading(true);
            const reader = new FileReader();
            reader.onload = function(e) {
                const content = e.target!.result;
                if (typeof content==="string" && content.length<300){
                    auth.post(server+"/admin/premium",{type:"active_license",license:content as string}).then(result=>{
                        if (result.data.result=="true"){
                            setIsLoading(false);
                            if (result.data.active_license=="true"){
                                setIsPremium(true);
                                cargo.current.setCargo(result.data.cargo);
                                setLicenseInfos({isFile:false,filename:""});
                                setIsInvalidLicense(false);
                                refs.input.current!.files=new FileList();
                            } else {
                                setIsInvalidLicense(true);
                            }
                        }
                    });
                } else {
                    setIsLoading(false);
                    setIsInvalidLicense(true);
                }
              // Aqui você pode fazer algo com o conteúdo do arquivo
            };
            reader.readAsText(file);
        }
    };
    const onDropFile=(e:React.DragEvent<HTMLDivElement>)=>{
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length>0){
            refs.input.current!.files=e.dataTransfer.files;
            setLicenseInfos({isFile:true,filename:e.dataTransfer.files[0].name});
        } else {
            setLicenseInfos({isFile:false,filename:""});
        }
    }
    const onChangeFile=(e:any)=>{
        setLicenseInfos({isFile:e.target.files.length>0,filename:e.target.files.length>0 ? e.target.files[0].name : ""});
    }
    const Cancel=()=>{
        setLicenseInfos({isFile:false,filename:""});
        refs.input.current!.files=new FileList();
    }
    useEffect(()=>{
        if (cargoValue!==null){
            setIsLoading(false);
            setIsPremium(cargoValue > 1);
        }
    },[cargoValue]);
    useEffect(()=>{
        setSelected("premium");
    },[]);
    const types:{[key:string]:{name:string,price:string,expiry:string}}={
        "1":{
            name:"START",
            price:"7,00",
            expiry:"30",
        },
        "2":{
            name:"PRO",
            price:"12,00",
            expiry:"60",
        },
        "3":{
            name:"PLUS",
            price:"17,00",
            expiry:"90",
        },
        "4":{
            name:"ULTRA",
            price:"26,00",
            expiry:"360",
        }
    };
    const type=String(cargoValue) in types ? types[String(cargoValue)] : {name:"",price:"",expiry:""};
    return (
        <div id="admin-premium">
            {/* <div id="loading" style={{display:isLoading ? "block" : "none"}}>
                <i className={(isLoading ? 'ball' : 'no-animation')+' bi-arrow-clockwise'} style={{fontSize:"70px"}}></i>
            </div> */}
            <div id="blocks">
                <div className="block">
                    <div className='msg'>Plano atual:</div>
                    {isPremium==true ? <div id="block-plan">
                        <div className="title">PREMIUM {type.name}</div>
                        <div className="price">R$ {type.price}</div>
                        <div className="description">
                            <p>Preço/Único</p>
                            <p>Acesso a conteúdo sem publicidade.</p>
                            <p>Duração de {type.expiry} dias após a compra da licença.</p>
                        </div>
                        <div className="buyBtn">Assinado</div>
                    </div> : isPremium==false ? <div>
                        <div id="msg-not-plan">Você não possui nenhum plano. <Link to="/premium">Fazer upgrade.</Link></div>
                    </div> : <></>}
                </div>
                <div className="block">
                    <input style={{display:"none"}} ref={refs.input} type='file' onChange={onChangeFile}></input>
                    <div id="input" onClick={()=>refs.input.current!.click()} onDragOver={(e)=>e.preventDefault()} onDrop={onDropFile}>{licenseInfos.isFile ? licenseInfos.filename : "Arraste sua licença aqui ou selecione sua licença"}</div>
                    <div id="verify"></div>
                    <div id="div-btn">
                        <div id="invalid-license" style={{display:isInvalidLicense ? "block" : "none"}}>Licença inválida.</div>
                        <div id="cancelBtn" onClick={Cancel}>Cancelar</div>
                        <div id="verifyBtn" onClick={Verify} style={{opacity:licenseInfos.isFile ? "1" : "0.5"}}>Verificar licença</div>
                    </div>
                </div>
            </div>
            <div id="loading" style={{display:isLoading ? "block" : "none"}}>
                <img src={loading_src}></img>
            </div>
        </div>
    )
}
export default AdminPremium;