// Exemplo do componente Contact
import {useState, useEffect, useRef, useMemo, Dispatch, SetStateAction, MutableRefObject, RefObject, forwardRef, ForwardedRef } from 'react';
import GlobalContextInterface, { useGlobal } from '../Global.tsx';
import { resultInterface, useAuth } from '../Auth.tsx';
import "./AdminLogin.scss";
import { action,observable } from 'mobx';
import { observer } from 'mobx-react';
import { useLocation } from 'react-router-dom';
import LogoAnjoovi from '../LogoAnjoovi.tsx';
interface valuesInterface{
    current:{
        month:number | null,
        day:number | null,
        year:number | null,
        name:number | null,
        user:number | null,
        email:string | null,
        password:string | null,
        [key:string]:any,
    }
}
const Months=forwardRef(({setMonth}:{setMonth:Dispatch<SetStateAction<number>>},ref:ForwardedRef<HTMLSelectElement>)=>{
    return <select ref={ref} className='month date' onChange={(e)=>setMonth(Number(e.target.value))} defaultValue="-1">
        <option value="-1">Selecione uma opção</option>
        {Array.from({length:12},(_,i)=><option key={i}>{i+1}</option>)}
    </select>
});
const Days=forwardRef(({month,year,setDay}:{month:number,year:number,setDay:Dispatch<SetStateAction<number>>},ref:ForwardedRef<HTMLSelectElement>)=>{
    return useMemo(()=>{
        return <select ref={ref} className='day date' onChange={(e)=>setDay(Number(e.target.value))} defaultValue="-1">
            <option value="-1">Selecione uma opção</option>
            {Array.from({length:new Date(year,month,0).getDate()},(_,i)=><option key={i}>{i+1}</option>)}
        </select>
    },[year,month]);
});
const Years=forwardRef(({setYear,date}:{ref:RefObject<HTMLSelectElement>,setYear:Dispatch<SetStateAction<number>>,date:MutableRefObject<Date>},ref:ForwardedRef<HTMLSelectElement>)=>{
    return useMemo(()=>{
        const year=date.current.getFullYear();
        // pois de 100 anos atrás até o ano atual - 18 passa 83 anos completos
        return <select ref={ref} className='year date' onChange={(e)=>setYear(Number(e.target.value))} defaultValue="-1">
            <option value="-1">Selecione uma opção</option>
            {Array.from({length:83},(_,i)=><option key={i}>{year-100+i}</option>)}
        </select>
    },[]);
});
const Cadastro1=({mobile,server,auth,setType,values}:{mobile:boolean,server:string,auth:any,setType:(value:string)=>void,values:valuesInterface})=>{
    const [note,setNote]=useState(false);
    const valid=useRef(observable.box(false));
    const checkInputs=useRef(false);
    const valids=useRef<{[key:string]:boolean}>({
        name:false,
        user:false,
    });
    const refs:{[chave:string]:RefObject<HTMLInputElement>}={
        name:useRef<HTMLInputElement>(null),
        user:useRef<HTMLInputElement>(null),
    };
    const expressions:{[key:string]:RegExp}={
        name:/.+/,
        user:/^[a-z0-9._]+$/,
    };
    const validate=(e:any)=>{
        e.preventDefault();
        var validInputs=true;
        for (const key in refs){
            if (!expressions[key].test(refs[key].current!.value)){
                validInputs=false;
                refs[key].current!.classList.replace(checkInputs.current ? "pass-valid" : "pass-unchecked","pass-invalid");
            } else {
                refs[key].current!.classList.replace(checkInputs.current ? "pass-invalid" : "pass-unchecked","pass-valid");
            }
        }
        if (validInputs){
            auth.post(server+"/admin",{type:"verify",part:"1",user:refs.user.current!.value}).then((result:resultInterface)=>{
                if (result.data.result=="true"){
                    for (const key in refs){
                        values.current[key]=refs[key].current!.value;
                    }
                    setType("cadastro2");
                } else {
                    setNote(true);
                }
            });
        }
        checkInputs.current=true;
    };
    const verify=(type:string)=>{
        if (expressions[type].test(refs[type].current!.value)){
            if (!valids.current[type]){
                valids.current[type]=true;
                if (checkInputs.current){
                    refs[type].current!.classList.replace("pass-invalid","pass-valid");
                }
            }
            var validInputs=true;
            for (const key in refs){
                if (!expressions[key].test(refs[key].current!.value)){
                    validInputs=false;
                }
            }
            if (valid.current.get()!=validInputs){
                action(()=>{
                    valid.current.set(validInputs);
                })();
            }
        } else {
            // verifica se o estado passado era valido, pois ao entrar nessa condição, já assume automaticamente que o novo estado não é valido
            //verifica para não setar o mesmo estado anterior
            if (valid.current.get()){
                action(()=>{
                    valid.current.set(false);
                })();
            }
            if (valids.current[type]){
                valids.current[type]=false;
                if (checkInputs.current){
                    refs[type].current!.classList.replace("pass-valid","pass-invalid");

                }
            }
        }
    }
    const Comp=observer(()=>{
        return <button type='submit' className={"btnd"+(valid.current.get() ? " valid" : "")}>Próximo</button>
    });
    return <form onSubmit={validate}>
        <div className="msg">Criar sua conta do Anjoovi</div>
        {note && <div className='note'>Nome de usuário já existe.</div>}
        <input className='i pass-unchecked' ref={refs.name} onChange={()=>verify("name")} placeholder='Nome'/>
        <input className='i pass-unchecked n-margin' ref={refs.user} onChange={()=>verify("user")} placeholder='Nome de usuário'/>
        <div className='link' onClick={()=>setType("login")}>{mobile ? "Fazer login" : "Já possui uma conta? Fazer login"}</div>
        <Comp></Comp>
    </form>
}
const Cadastro2=({mobile,server,auth,setType,values}:{mobile:boolean,server:string,auth:any,setType:(value:string)=>void,values:valuesInterface})=>{
    const [note,setNote]=useState(false);
    const valid=useRef(observable.box(false));
    const checkInputs=useRef(false);
    const [passHidden,setPassHidden]=useState(true);
    const [passHidden2,setPassHidden2]=useState(true);
    const password_confirm=useRef<HTMLInputElement>(null);
    const valids=useRef<{[key:string]:boolean}>({
        email:false,
        password:false,
    });
    const refs:{[chave:string]:RefObject<HTMLInputElement>}={
        email:useRef<HTMLInputElement>(null),
        password:useRef<HTMLInputElement>(null),
    };
    const expressions:{[key:string]:RegExp}={
        email:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
    };
    const validate=(e:any)=>{
        e.preventDefault();
        var validInputs=true;
        for (const key in refs){
            if (!expressions[key].test(refs[key].current!.value)){
                validInputs=false;
                valids.current[key]=false;
                refs[key].current!.classList.replace(checkInputs.current ? "pass-valid" : "pass-unchecked","pass-invalid");
            } else {
                valids.current[key]=true;
                refs[key].current!.classList.replace(checkInputs.current ? "pass-invalid" : "pass-unchecked","pass-valid");
            }
        }
        if (valids.current.password && password_confirm.current!.value==refs["password"].current!.value){
            password_confirm.current!.classList.replace(checkInputs.current ? "pass-invalid" : "pass-unchecked","pass-valid");
        } else {
            password_confirm.current!.classList.replace(checkInputs.current ? "pass-valid" : "pass-unchecked","pass-invalid");
            validInputs=false;
        }
        if (validInputs){
            auth.post(server+"/admin",{type:"verify",part:"2",email:refs.email.current!.value}).then((result:resultInterface)=>{
                if (result.data.result=="true"){
                    for (const key in refs){
                        values.current[key]=refs[key].current!.value;
                    }
                    setType("cadastro3");
                } else {
                    setNote(true);
                }
            });
        }
        checkInputs.current=true;
    };
    const verify=(type:string)=>{
        if (!(type in expressions) || expressions[type].test(refs[type].current!.value)){
            if (type in valids.current && !valids.current[type]){
                valids.current[type]=true;
                if (checkInputs.current){
                    refs[type].current!.classList.replace("pass-invalid","pass-valid");
                }
            }
            var validInputs=true;
            for (const key in refs){
                if (!expressions[key].test(refs[key].current!.value)){
                    validInputs=false;
                }
            }
            if ((type=="password" || type=="password_confirm") && checkInputs.current){
                if (valids.current.password && password_confirm.current!.value==refs["password"].current!.value){
                    password_confirm.current!.classList.replace(checkInputs.current ? "pass-invalid" : "pass-unchecked","pass-valid");
                } else {
                    password_confirm.current!.classList.replace(checkInputs.current ? "pass-valid" : "pass-unchecked","pass-invalid");
                }
            }
            // valida o input apenas aqui, pois no de cima ele funciona apenas para os tipos password e password_confirm, não deixando o inpu invalido quando for email
            if (password_confirm.current!.value!=refs["password"].current!.value){
                validInputs=false;
            }
            if (valid.current.get()!=validInputs){
                action(()=>{
                    valid.current.set(validInputs);
                })();
            }
        } else {
            // verifica se o estado passado era valido, pois ao entrar nessa condição, já assume automaticamente que o novo estado não é valido
            //verifica para não setar o mesmo estado anterior
            if (valid.current.get()){
                action(()=>{
                    valid.current.set(false);
                })();
            }
            if (type in valids.current && valids.current[type]){
                valids.current[type]=false;
                if (checkInputs.current){
                    refs[type].current!.classList.replace("pass-valid","pass-invalid");

                }
            }
            if ((type=="password" || type=="password_confirm") && checkInputs.current){
                if (valids.current.password && password_confirm.current!.value==refs["password"].current!.value){
                    password_confirm.current!.classList.replace("pass-invalid","pass-valid");
                } else {
                    password_confirm.current!.classList.replace("pass-valid","pass-invalid");
                }
            }
        }
    }
    const Comp=observer(()=>{
        return <button type='submit' className={"btnd"+(valid.current.get() ? " valid" : "")}>Próximo</button>
    });
    return <form onSubmit={validate}>
        <div className="msg">Criar sua conta do Anjoovi</div>
        {note && <div className='note'>E-mail já existe.</div>}
        <input className='i pass-unchecked' ref={refs.email} onChange={()=>verify("email")} placeholder='E-mail'/>
        <div className='i-group'>
            <input className='i pass-unchecked pass n-margin' ref={refs.password} onChange={()=>verify("password")} placeholder='Senha' type={passHidden ? 'password' : 'text'}/>
            <i className={'div-i '+(passHidden ? 'bi-eye-slash' : 'bi-eye')} onClick={()=>setPassHidden(passHidden=>!passHidden)}></i>
        </div>
        <div className='i-group n-margin'>
            <input className='i pass-unchecked pass' ref={password_confirm} onChange={()=>verify("password_confirm")} placeholder='Confirme sua senha' type={passHidden2 ? 'password' : 'text'}/>
            <i className={'div-i '+(passHidden2 ? 'bi-eye-slash' : 'bi-eye')} onClick={()=>setPassHidden2(passHidden2=>!passHidden2)}></i>
        </div>
        <div className='pass-note'>Deve conter 8 digitos, caracteres especiais, letras maiúsculas e minúsculas</div>
        <div className='link' onClick={()=>setType("login")}>{mobile ? "Fazer login" : "Já possui uma conta? Fazer login"}</div>
        <Comp></Comp>
    </form>
}
const Cadastro3=({mobile,get_origin,globals,auth,setType,values}:{mobile:boolean,get_origin:()=>string,globals:GlobalContextInterface,auth:any,setType:(value:string)=>void,values:valuesInterface})=>{
    const { server, navigate, setHeader }=globals;
    const date=useRef(new Date());
    const [month,setMonth]=useState(-1);
    const [day,setDay]=useState(-1);
    const [year,setYear]=useState(-1);
    const valid=useRef(observable.box(false));
    // const valids=useRef({
    //     month:false,
    //     day:false,
    //     year:false
    // });
    const refs:{[chave:string]:RefObject<HTMLSelectElement>}={
        month:useRef<HTMLSelectElement>(null),
        day:useRef<HTMLSelectElement>(null),
        year:useRef<HTMLSelectElement>(null)
    }
    const validate=(e:any)=>{
        e.preventDefault();
        var validInputs=true;
        for (const key in refs){
            if (refs[key].current!.value=="-1"){
                validInputs=false;
            }
        }
        if (validInputs){
            for (const key in refs){
                values.current[key]=refs[key].current!.value;
            }
            auth.post(server+"/admin",{type:"cadastro",...values.current}).then((result:resultInterface)=>{
                if (result.data.result=="true"){
                    globals.setLogin({usuario:result.data.usuario,isLoged:"true",logo:null});
                    setHeader("admin");
                    navigate!(get_origin());
                }
            })
        }
    }

    const Comp=observer(()=>{
        return <button type='submit' className={"btnd"+(valid.current.get() ? " valid" : "")}>Cadastrar</button>
    });
    useEffect(()=>{
        if (year!=-1 && day!=-1 && year!=-1){
            if (!valid.current.get()){
                action(()=>{
                    valid.current.set(true);
                })();
            }
        } else {
            if (valid.current.get()){
                action(()=>{
                    valid.current.set(false);
                })();
            }
        }
    },[year,day,month]);
    return <form onSubmit={validate}>
        <div className="msg">Criar sua conta do Anjoovi</div>
        <div className="date-div">
            <Months ref={refs.month} setMonth={setMonth}></Months>
            <Days ref={refs.day} month={month} setDay={setDay} year={year}></Days>
            <Years ref={refs.year} setYear={setYear} date={date}></Years>
        </div>
        <div className='link' onClick={()=>setType("login")}>{mobile ? "Fazer login" : "Já possui uma conta? Fazer login"}</div>
        <Comp></Comp>
    </form>
}
const Login=({get_origin,globals,auth,setType}:{get_origin:()=>string,globals:GlobalContextInterface,auth:any,setType:(value:string)=>void})=>{
    const { server, navigate, setHeader }=globals;
    const [note,setNote]=useState(false);
    const [passHidden,setPassHidden]=useState(true);
    const refs={
        email:useRef<HTMLInputElement>(null),
        password:useRef<HTMLInputElement>(null),
    }
    const login=(e:any)=>{
        e.preventDefault();
        const email=refs.email.current!.value;
        const password=refs.password.current!.value;
        auth.post(server+"/admin",{type:"login",email,password}).then((result:resultInterface)=>{
            if (result.data.result=="true"){
                var st=setTimeout(()=>{
                    setHeader("admin");
                    navigate!(get_origin());
                    clearTimeout(st);
                },20);
            } else {
                setNote(true);
            }
        });
    }
    return <form className='login' onSubmit={login}>
        <div className="msg">Sua conta do Anjoovi</div>
        {note && <div className='note'>E-mail ou senha incorreto.</div>}
        <input className='i' ref={refs.email} placeholder='Nome de usuário ou e-mail'/>
        <div className='i-group n-margin'>
            <input className='i pass-unchecked pass n-margin' ref={refs.password} placeholder='Senha' type={passHidden ? 'password' : 'text'}/>
            <i className={'div-i '+(passHidden ? 'bi-eye-slash' : 'bi-eye')} onClick={()=>setPassHidden(passHidden=>!passHidden)}></i>
        </div>
        <div className='link' onClick={()=>setType("cadastro1")}>{globals.mobile ? "Criar conta" : "Não possui uma conta? Fazer cadastro"}</div>
        <button className="btnd valid">Entrar</button>
    </form>
}
function AdminLogin(){
    const globals=useGlobal();
    const { server }=globals;
    const location=useLocation();
    const auth=useAuth();
    const [type,setType]=useState("login");
    const values:valuesInterface=useRef({
        month:null,
        day:null,
        year:null,
        name:null,
        user:null,
        email:null,
        password:null,
    });
    const get_origin:()=>string=()=>{
        var q=new URLSearchParams(location.search);
        return q.has("origin") ? decodeURIComponent(q.get("origin")!) : "/admin_login";
    }
    return <div className='adl'>
        <div id="form">
            <div id="logo">
                <LogoAnjoovi id={"logo-img"}/>
            </div>
            {type=="login" ? <Login get_origin={get_origin} globals={globals} auth={auth} setType={setType} ></Login> : type=="cadastro1" ? <Cadastro1 mobile={globals.mobile} server={server} auth={auth} setType={setType} values={values}></Cadastro1> : type=="cadastro2" ? <Cadastro2 mobile={globals.mobile} server={server} auth={auth} setType={setType} values={values}></Cadastro2> : <Cadastro3 mobile={globals.mobile} get_origin={get_origin} globals={globals} auth={auth} setType={setType} values={values}></Cadastro3>}
        </div>
    </div>
}
export default AdminLogin;
