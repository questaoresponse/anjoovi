import { useEffect, useState } from 'react';
import Link from '../Link';
import GlobalContextInterface from '../Global';

function Conteudo({infos,auth,globals}:{infos:{nome:string,usuario:string,logo:string | null,visualizacoes:number,inscrito:boolean | null},auth:any,globals:GlobalContextInterface}){
    const [inscrito,setInscrito]=useState<boolean | null>(null);
    const { navigate }=globals;
    useEffect(()=>{
        setInscrito(infos.inscrito);
        // if (infos.usuario!=""){
        //     // auth.post(server+"/@"+infos.usuario,{type:"info"}).then(result=>{
        //     //     if (result.data.result=="true"){
        //     //         setInscrito(JSON.parse(result.data.inscrito));
        //     //     }
        //     })
        // };
    },[infos]);
    const inscrever=()=>{
        if (globals.login.isLoged=="true"){
            auth.post(globals.server+"/canal?name="+infos.usuario,{type:"option"}).then((result:any)=>{
                if (result.data.result=="true"){
                    setInscrito(inscrito=>!inscrito);
                }
            });
        } else {
            navigate!("/admin");
        }
    }
    return <>
        <div className="usuario">
            <div className='usuario-div'>
                <Link className='usuario-logo' to={"/@"+encodeURIComponent(infos.usuario)}>
                    {infos.logo ? <img src={infos.logo}></img> : <p>{infos.usuario[0]}</p>}
                </Link>
                <div className='usuario-infos'>
                    <Link className={(infos.usuario!="" ? "" : "wait ")+"usuario-p usuario-name txt-1"} to={"/@"+encodeURIComponent(infos.usuario)}>{infos.nome}</Link>
                    <Link className={(infos.usuario!="" ? "" : "wait ")+"usuario-p usuario-t txt-1"} to={"/@"+encodeURIComponent(infos.usuario)}>@{infos.usuario}</Link>
                </div>
            </div>
            {inscrito!==null ? <div className="inscrever" onClick={inscrever}>{inscrito ? "Seguindo" : "Seguir"}</div> : <></>}
        </div>
    </>
};
export default Conteudo;