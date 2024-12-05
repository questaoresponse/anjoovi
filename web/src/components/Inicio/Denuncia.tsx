import { useState } from 'react';
import { useGlobal } from '../Global';
import './Denuncia.scss';
import { useAuth } from '../Auth';
import { useLocation } from 'react-router-dom';
import X from '../X';
function Denuncia({tipo:post_tipo}:{tipo:string}){
    const { server }=useGlobal();
    const location=useLocation();

    const auth=useAuth();
    const [menu,setMenu]=useState<boolean>(false);
    const changeMenu=()=>{
        setMenu((menu:boolean)=>!menu);
    }
    const Enviar=(e:any)=>{
        const tipo=Number(e.target.classList[0]);
        const s=location.pathname.split("/");
        const post_id=Number(s[2]);
        auth.post(server+"/denuncia",{tipo:tipo.toString(),post_tipo,post_id:post_id.toString()}).then(result=>{
            if (result.data.result=="true"){
                setMenu(false);
            }
        });
    }
    return (
        <div id="den">
            <div id="report" onClick={changeMenu}>Denunciar</div>
            <div id="menu" style={{display:menu ? "block" : "none"}}>
                <p id="avs">Denunciar por:</p>
                <div id="options">
                    <div className='1' onClick={Enviar}>Conteúdo pornográfico</div>
                    <div className='2' onClick={Enviar}>Conteúdo falso ou mentiroso</div>
                    <div className='3' onClick={Enviar}>Conteúdo possui criança</div>
                    <div className='4' onClick={Enviar}>Conteúdo mostra casas de apostas</div>
                    <div className='5' onClick={Enviar}>Conteúdo contém violência explicita</div>
                    <div className='6' onClick={Enviar}>Conteúdo suicídio ou automutilação</div>
                    <div className='7' onClick={Enviar}>Conteúdo glorifica violência ou terrorismo</div>
                </div>
                <X id="x" onClick={changeMenu}></X>
            </div>
        </div>
    );
}
export default Denuncia;