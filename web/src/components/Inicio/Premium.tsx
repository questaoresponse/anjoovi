import{ useEffect, useRef, useState } from "react";
import "./Premium.scss";
declare global{
    interface Window{
        edz:any,
        edzScript:any,
        EdzLs:any[],
    }
}
interface valuesInterface{
    step:number,
    plan:number,
}
const Prices=({buy}:{buy:(e:any,type:number)=>void})=>{
    return <div id="margin">
            <div id="msg">Faça upgrade para Premium</div>
            <div id="blocks">
                <div className="block">
                    <div className="title">PREMIUM START</div>
                    <div className="price">R$ 7,00</div>
                    <div className="description">
                        <p>Preço/Único</p>
                        <p>Acesso a conteúdo sem publicidade.</p>
                        <p>Duração de 30 dias após a compra da licença.</p>
                    </div>
                    <div className="buyBtn" onClick={(e)=>buy(e,1)}>Assinar</div>
                </div>
                <div className="block">
                    <div className="title">PREMIUM PRO</div>
                    <div className="price">R$ 12,00</div>
                    <div className="description">
                        <p>Preço/Único</p>
                        <p>Acesso a conteúdo sem publicidade.</p>
                        <p>Duração de 60 dias após a compra da licença.</p>
                    </div>
                    <div className="buyBtn" onClick={(e)=>buy(e,2)}>Assinar</div>
                </div>
                <div className="block">
                    <div className="title">PREMIUM PLUS</div>
                    <div className="price">R$ 17,00</div>
                    <div className="description">
                        <p>Preço/Único</p>
                        <p>Acesso a conteúdo sem publicidade.</p>
                        <p>Duração de 90 dias após a compra da licença.</p>
                    </div>
                    <div className="buyBtn" onClick={(e)=>buy(e,3)}>Assinar</div>
                </div>
                <div className="block">
                    <div className="title">PREMIUM ULTRA</div>
                    <div className="price">R$ 26,00</div>
                    <div className="description">
                        <p>Preço/Único</p>
                        <p>Acesso a conteúdo sem publicidade.</p>
                        <p>Duração de 360 dias após a compra da licença.</p>
                    </div>
                    <div className="buyBtn" onClick={(e)=>buy(e,4)}>Assinar</div>
                </div>
            </div>
            <div id="note">
                    A conta premium entrega ao usuário o conteúdo de terceiros com base nos <a href="https://policies.anjoovi.com/servico" style={{color:"black"}}>Termos de Serviço</a> e <a href="https://policies.anjoovi.com/privacidade" style={{color:"black"}}>Política de Privacidade</a>  do Anjoovi.
            </div>
            <div id="footer">
                <p>Você tem alguma dúvida? <a href="https://www.support.anjoovi.com/premium" style={{color:"black"}}>Central de Ajuda</a></p>
                <p>©2024 Anjoovi - <a href="https://policies.anjoovi.com/privacidade" style={{color:"black"}}>Política de Privacidade</a> - <a href="https://policies.anjoovi.com/servico" style={{color:"black"}}>Termos de Serviço</a></p>
            </div>
        </div>
}
// const Infos=({values,auth,server}:{values:valuesInterface,auth:authInterface,server:string})=>{
//     const typeNames=[
//         {
//             name:"Fan",
//             license:"30",
//             price:"6,00"
//         },
//         {
//             name:"Padrão",
//             license:"60",
//             price:"11,00"
//         },
//         {
//             name:"Pro",
//             license:"90",
//             price:"16,00"
//         },
//         {
//             name:"Ultra",
//             license:"360",
//             price:"25,00"
//         }
//     ]
//     const typeName=typeNames[values.plan-1].name;
//     const licenseNumber=typeNames[values.plan-1].license;
//     const priceNumber=typeNames[values.plan-1].price;

//     const refs={
//         name:useRef<HTMLInputElement>(null),
//         email:useRef<HTMLInputElement>(null),
//         confirmEmail:useRef<HTMLInputElement>(null),
//         cpf:useRef<HTMLInputElement>(null),
//         cep:useRef<HTMLInputElement>(null),
//         tel:useRef<HTMLInputElement>(null),
//         cardNumber:useRef<HTMLInputElement>(null),
//         validity:useRef<HTMLInputElement>(null),
//         securityCode:useRef<HTMLInputElement>(null),
//         cardName:useRef<HTMLInputElement>(null),
//     }
//     const [invalids,setInvalids]=useState<{
//         email: boolean;
//         nam: boolean;
//         confirmEmail1: boolean;
//         confirmEmail2: boolean;
//         cpf: boolean;
//         cep: boolean;
//         tel: boolean;
//         cardNumber: boolean;
//         validity: boolean;
//         securityCode: boolean;
//         cardName: boolean;
//         [key:string]: boolean;
//     }>({
//         email:false,
//         nam:false,
//         confirmEmail1:false,
//         confirmEmail2:false,
//         cpf:false,
//         cep:false,
//         tel:false,
//         cardNumber:false,
//         validity:false,
//         securityCode:false,
//         cardName:false,
//     });
//     const onPay=useCallback(()=>{
//         // var valid=true;
//         // for (const key in invalids){
//         //     if (!invalids[key]){
//         //         valid=false;
//         //     }
//         // }
//         auth.post(server+"/pay",{
//             name:refs.name.current!.value,
//             email:refs.email.current!.value,
//             cpf:refs.cpf.current!.value.replace(/\D/g, ''),
//             cep:refs.cep.current!.value,
//             tel:refs.tel.current!.value.replace(/\D/g, ''),
//             cardNumber:refs.cardNumber.current!.value.replace(/\D/g, ''),
//             validity:refs.validity.current!.value,
//             securityCode:refs.securityCode.current!.value,
//             cardName:refs.cardName.current!.value,
//         }).then((result:resultInterface)=>{
//             console.log(result.data);
//             if (result.data.result=="true"){
//                 console.log("foie");
//             } else if (result.data.invalid_cpf){
//                 setInvalids(invalids=>{return {...invalids,cpf:true}});
//                 console.log("foi");
//             }
//         });
//     },[invalids]);
//     const addChars=(text:string,chars:(number | string)[][])=>{
//         for (var i=0;i<chars.length;i++){
//             const char_block=chars[i];
//             const char_index=Number(char_block[0]);
//             const char=String(char_block[1]);
//             if (text.length>char_index+i){
//                 text=text.substring(0,char_index+i)+char+text.substring(char_index+i);
//             }
//         }
//         return text;
//     }
//     const controlCpf=(e:any)=>{
//         if (isNaN(Number(e.target.value.slice(-1))) || e.target.value.length>18){
//             e.target.value=e.target.value.slice(0,e.target.value.length-1);
//         }
//         const text=e.target.value;
//         const number=text.replace(/\D/g, '');
//         if (text.length<=14){
//             e.target.value=addChars(number,[[3,"."],[6,"."],[9,"-"]]);
//         } else {
//             e.target.value=addChars(number,[[2,"."],[5,"."],[8,"/"],[12,"-"]]);
//         }
//         verifyCpf(e);
//     }
//     const controlTel=(e:any)=>{
//         if (isNaN(Number(e.target.value.slice(-1))) || e.target.value.length>15){
//             e.target.value=e.target.value.slice(0,e.target.value.length-1);
//         }
//         const text=e.target.value;
//         const number=text.replace(/\D/g, '');
//             e.target.value=addChars(number,[[0,"("],[2,")"],[2," "],[7,"-"]]);
//     }
//     const controlCardNumber=(e:any)=>{
//         if (isNaN(Number(e.target.value.slice(-1))) || e.target.value.length>19){
//             e.target.value=e.target.value.slice(0,e.target.value.length-1);
//         }
//         const text=e.target.value;
//         const number=text.replace(/\D/g, '');
//         e.target.value=addChars(number,[[4," "],[8," "],[12," "]]);
//     }
//     const controlValidity=(e:any)=>{
//         if (isNaN(Number(e.target.value.slice(-1))) || e.target.value.length>5){
//             e.target.value=e.target.value.slice(0,e.target.value.length-1);
//         }
//         const text=e.target.value;
//         const number=text.replace(/\D/g, '');
//         e.target.value=addChars(number,[[2,"/"]]);
//     }
//     const controlSecurityCode=(e:any)=>{
//         if (isNaN(Number(e.target.value.slice(-1))) || e.target.value.length>3){
//             e.target.value=e.target.value.slice(0,e.target.value.length-1);
//         }
//     }
//     const verifyName=(e:any)=>{
//         setInvalids(invalids=>{ return {...invalids,name:e.target.value==0}});
//     }
//     const verifyEmail=(e:any)=>{
//         setInvalids(invalids=>{ return {...invalids,email:!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value))}});
//     }
//     const verifyConfirmEmail=(e:any)=>{
//         if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value))){
//             setInvalids(invalids=>{ return {...invalids,confirmEmail1:true,confirmEmail2:false}});
//         } else {
//             if (e.target.value!=refs.email.current!.value){
//                 setInvalids(invalids=>{ return {...invalids,confirmEmail1:false,confirmEmail2:true}});
//             } else {
//                 setInvalids(invalids=>{ return {...invalids,confirmEmail1:false,confirmEmail2:false}});
//             }
//         }
//     }
//     const checkDigit=(text:string)=>{
//         const cpf=text.replace(/\D/g, '');
//         if (/^(\d)\1+$/.test(cpf)) return false;
//         function calculateCheckDigit(cpf:string,factor:number) {
//             let total = 0;
//             for (let i = 0; i < factor - 1; i++) {
//                 total += Number(cpf[i]) * (factor - i);
//             }
//             let checkDigit = 11 - (total % 11);
//             return checkDigit > 9 ? 0 : checkDigit;
//         }

//         // Calcula os dois dígitos verificadores e verifica se são iguais aos fornecidos
//         const firstCheckDigit = calculateCheckDigit(cpf, 10);
//         const secondCheckDigit = calculateCheckDigit(cpf, 11);
//         console.log(cpf[9],cpf[10],firstCheckDigit,secondCheckDigit);
//         return firstCheckDigit == Number(cpf[9]) && secondCheckDigit == Number(cpf[10]);
//     }
//     const verifyCpf=(e:any)=>{
//         setInvalids(invalids=>{ return {...invalids,cpf:(!(/\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(e.target.value)) && !(/\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(e.target.value)))  || !checkDigit(e.target.value)}});
//     }
//     return <div className="infos">
//         <div id="central">
//             <div id="inputs">
//                 <div id="top-infos">
//                     <p>Anjovi Premium {typeName}</p>
//                     <p>Por apenas R$ <span style={{color:"green",fontSize:"150%"}}>{priceNumber}</span> à vista</p>
//                 </div>
//                 <div className="group">
//                     <label>Nome completo</label>
//                     <input ref={refs.name} onInput={verifyName} className="i" id="name"></input>
//                     {invalids.name ? <div className="invalid">nome inválido.</div> : <></>}
//                 </div>
//                 <div className="group">
//                     <label>E-mail</label>
//                     <input ref={refs.email} onInput={verifyEmail} className="i" id="email" type="email"></input>
//                     {invalids.email ? <div className="invalid">E-mail inválido.</div> : <></>}
//                 </div>
//                 <div className="group">
//                     <label>Confirme seu E-mail</label>
//                     <input ref={refs.confirmEmail} onInput={verifyConfirmEmail} className="i" id="email" type="email"></input>
//                     {invalids.confirmEmail1 ? <div className="invalid">E-mail inválido.</div> : <></>}
//                     {invalids.confirmEmail2 ? <div className="invalid">O e-mail digitado precisa ser idêntico ao anterior.</div> : <></>}
//                 </div>
//                 <div className="group">
//                     <label>CPF ou CNPJ</label>
//                     <input ref={refs.cpf} onInput={controlCpf} className="i" id="cpf"></input>
//                     {invalids.cpf ? <div className="invalid">CPF ou CNPJ inválido.</div> : <></>}
//                 </div>
//                 <div className="group">
//                     <label>CEP</label>
//                     <input ref={refs.cep} className="i" id="cpf"></input>
//                     {invalids.cep ? <div className="invalid">CEP inválido.</div> : <></>}
//                 </div>
//                 <div id="number-group" className="group">
//                     <div id="ddi-container">
//                         <label>País</label>
//                         <div id="ddi-d" className="i"><img id="flag-icon" src={flag_src}></img><div>+55</div></div>
//                     </div>
//                     <div id="number-container">
//                         <label>Celular</label>
//                         <input ref={refs.tel} onInput={controlTel} className="i" id="phone"></input>
//                     </div>
//                 </div>
//                 <p id="payTitle">FORMAS DE PAGAMENTO</p>
//                 <div id="payOpt">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
//                         <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
//                         <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
//                     </svg>
//                     <label>Cartão&emsp;de Crédito</label>
//                 </div>
//                 <div className="group">
//                     <label>Número do cartão</label>
//                     <div id="inputCardDiv">
//                         <input ref={refs.cardNumber} onInput={controlCardNumber} className="i" id="i-card"></input>
//                         <svg id="inputCard" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
//                             <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
//                             <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
//                         </svg>
//                     </div>
//                 </div><div id="val-sec-group" className="group">
//                     <div id="val-d">
//                         <label>Validade</label>
//                         <input ref={refs.validity} onInput={controlValidity} className="i"></input>
//                     </div>
//                     <div id="sec-d">
//                     <label>Código de segurança</label>
//                         <input ref={refs.securityCode} onInput={controlSecurityCode} className="i"></input>
//                     </div>
//                 </div>
//                 <div className="group">
//                     <label>Nome impresso no cartão</label>
//                     <input ref={refs.cardName} className="i"></input>
//                 </div>
//                 <div id="nextBtn" onClick={onPay}>Pagar e Receber Agora</div>
//             </div>
//             <div id="notes">
//                 <p>Anjoovi Premium {typeName}</p>
//                 <p>Acesso a conteúdo sem publicidade.</p>
//                 <p>A validade da licença é de {licenseNumber} dias, contagem inicia na finalização da compra.</p>
//                 <p>Faça a compra utilizando um e-mail que você tenha acesso.</p>
//                 <p>A chave para ativação do serviço será enviado no e-mail utilizado para compra.</p>
//             </div>
//         </div>
//     </div>
// };
function Premium(){
    // const server=import.meta.env.DEV ? "http://pay.anjoovi.com" : "https://pay.anjoovi.com";
    const [values,setValues]=useState<valuesInterface>({step:1,plan:-1});
    const [isPaying,setIsPaying]=useState(false);
    const refs={
        premium:useRef<HTMLDivElement>(null),
        iframe:useRef<HTMLIFrameElement>(null)
    }
    const buy=(e:any,type:number)=>{
        const ids=[2415251,2416145,2416726,2431416];
        Eduzz("Widget",ids[type-1],e);
        setValues({step:1,plan:type});
        setIsPaying(true);
    };
    window.EdzLs = [];
    const Eduzz = (t:any, a:any, c:any)=>{
        window.EdzLs.push({type: t, args: a, caller: c});
        if (window.edz) window.edz();
    };
    useEffect(()=>{
        document.title="Anjoovi Premium"
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.defer = true;
        s.src = "https://sun.eduzz.com/widget/main.js";
        window.edzScript = s;
        document.body.appendChild(s);
    },[]);

    return <div className={isPaying ? "paying" : ""} ref={refs.premium} id="premium">
        {/* <div id="header">
            <Link to="/">
                <img id="logo" src={logo_src}></img>
            </Link>
        </div> */}
        {/* <script type="text/javascript">()();
        <button type="button"
        onClick={}>Comprar agora!</button> */}
        <div id="content">
            {values.step==1 ? <Prices buy={buy}></Prices> : <></>}
        </div>
        {/* {values.step==1 ? <Prices buy={buy}></Prices> :  <Infos values={values} auth={auth} server={server}></Infos>} */}
    </div>
};
export default Premium;