import React, { memo, useState, useRef, createContext, useContext, useCallback, useReducer, useEffect } from "react";
import Link from "../Link.tsx";
import Lista from "./Lista.jsx";
import './Users.scss';
import excluirSrc from '../static/remove-icone.png';
import { useAuth } from "../Auth.jsx";
import GlobalContextInterface, { useGlobal } from "../Global.tsx";
import X from "../X.tsx";
interface UsersContextInterface{
    namePrivate:React.MutableRefObject<string | undefined>,
    stateReducer:any,
    setStateReducer:any,
}
interface infosInterface{
    posts:any,
    numRegistros:number,
    isReady:boolean | null,
    bvLink:boolean,
    biLink:boolean,
    nd:number,
    pa:number | null,
    pesquisa:string | null
}
const MyContext = createContext<UsersContextInterface | undefined>(undefined);
const myReducer=(state:any,action:any)=>{
    switch (action.type){
        case 'menu':
            return {...state,menu:action.value};
        case 'all':
            return {menu:action.menu,checked:action.checked,element:action.element};
        case 'reset':
            return {menu:false,checked:false,element:false};
    }
}
const MyProvider = ({ children }:{children:any}) => {
  const [stateReducer,setStateReducer]=useReducer(myReducer,{menu:false,checked:false,element:false,usuarioCallback:false});
  const namePrivate=useRef();

  return (
    <MyContext.Provider value={{ namePrivate, stateReducer,setStateReducer }}>
      {children}
    </MyContext.Provider>
  );
};

const useMyContext = () => {
  return useContext(MyContext);
};
const NewHeader=memo(()=>{
    return (
        <>
            <div className="num">N°</div>
            <div className="usuario">USUÁRIO</div>
            <div className="opcoes">OPÇÕES</div>
        </>
    )
});
const Table=memo((props:{globals:GlobalContextInterface,auth:any,post:any,openExclusion:(data:any)=>void,recriar:(data:any)=>void,n:number})=>{
    const {stateReducer,setStateReducer,namePrivate}=useMyContext()!;
    const globals=props.globals;
    const server=globals.server;
    const auth=props.auth;
    const post=props.post;
    const n=props.n;
    const openExclusion=props.openExclusion;
    const recriar=props.recriar;
    const onCheckChange=(e:any)=>{
        if (!stateReducer.usuarioCallback){
            e.preventDefault();
            namePrivate.current=e.target.dataset.anjooviUser;
        }
        setStateReducer({type:"all",menu:true,checked:e.target.checked,element:e.target});
    };
    const Excluir=()=>{
        openExclusion({usuario:post.usuario,server:server,auth:auth,recriar:recriar});
    }
    return (
        <div className="linha">
            <div className="num">{n}</div>
            <Link className="usuario txt-1" onClick={(e:any)=>{e.preventDefault(); window.open("/@"+post.usuario)}} to={"/@"+post.usuario}>{post.usuario}</Link>
            <div className="opcoes">
                <div className="opcoesb">
                    <img onClick={Excluir} src={excluirSrc} className="excluir"/>
                    <div className="btt">
                        <input checked={post.privado==1} data-anjoovi-user={post.usuario} onChange={onCheckChange} type="checkbox" tabIndex={3}></input>
                        <div className="espaco" tabIndex={0}></div>
                        <div className="content">
                            <div className="bttb" tabIndex={1}></div>
                            <div className="aviso" tabIndex={2}></div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
    )
});
function Users(){
    const [isExclusion,setIsExclusion]=useState(false);
    const [error,setError]=useState(false);
    const [errorPrivate,setErrorPrivate]=useState(false);
    const { stateReducer,setStateReducer,namePrivate }=useMyContext()!;
    const [infos,setInfos]=useState<infosInterface>({
        posts:[],
        numRegistros:0,
        isReady:null,
        bvLink:false,
        biLink:false,
        nd:0,
        pa:null,
        pesquisa:null
    });
    const {server,setSelected}=useGlobal();
    const auth=useAuth();
    const serverRef=useRef<string | undefined>();
    const authRef=useRef<any>();
    const recriarRef=useRef<(data:any)=>void>();
    const refs={
        exclusion:useRef<HTMLInputElement>(null),
        usuarioExclusion:useRef<string | null>(null),
        inputPrivate:useRef<HTMLInputElement>(null),
        pai:useRef<HTMLDivElement>(null),
    }
    const setIsLoading=(v:any)=>{
        // isLoading=v;
        v ? !refs.pai.current!.classList.contains("loading") &&  refs.pai.current!.classList.add("loading") : refs.pai.current!.classList.contains("loading") && refs.pai.current!.classList.remove("loading");
    }
    const openExclusion=({usuario,server,auth,recriar}:{usuario:string,server:string,auth:{post:(url:string,data:any)=>void,get:(url:string)=>void},recriar:(data:any)=>void})=>{
        setIsExclusion(true);
        refs.usuarioExclusion.current=usuario;
        serverRef.current=server;
        authRef.current=auth;
        recriarRef.current=recriar;
    }
    const onSubmitExclusion=(e:any)=>{
        e.preventDefault();
        const server=serverRef.current;
        const auth=authRef.current;
        const senha=refs.exclusion.current!.value;
        const usuario=refs.usuarioExclusion.current;
        const recriar=recriarRef.current;
        setIsLoading(true);
        auth.post(server+"/admin/users",{type:"option",tipo:"delete",name:usuario,senha:senha}).then((result:any)=>{
            setIsLoading(false);
            if (result.data.result=="true"){
                setIsExclusion(false);
                recriar!(result.data);
                setError(false);
            } else if (result.data.result=="false"){
                setError(true);
            }
        });
    }
    const onPrivateSubmit=useCallback((e:any)=>{
        e.preventDefault();
        const name=namePrivate.current;
        const senha=refs.inputPrivate.current!.value;
        setIsLoading(true);
        auth.post(server+"/admin/users",{type:"option",tipo:"private",name:name!,senha:senha}).then(result=>{
            setIsLoading(false);
            if (result.data.result=="true"){
                refs.inputPrivate.current!.value="";
                stateReducer.element.click();
                errorPrivate && setErrorPrivate(false);
                namePrivate.current=undefined;
                setInfos((infos)=>({...infos,posts:infos.posts.map((info:any)=>{
                    if (info.usuario==name){
                        return {...info,privado:stateReducer.checked ? 1 : 0};
                    }
                    return info;
                })}));
                setStateReducer({type:"reset"});
            } else if (result.data.result=="false"){
                setErrorPrivate(true);
            } 
            setStateReducer({type:"reset"});
        });
    },[errorPrivate,stateReducer]);
    const quitMenu=()=>{
        setStateReducer({type:"menu"},false);
    }
    const quitMenuExclusion=()=>{
        setIsExclusion(false);
    }
    useEffect(()=>{
        setSelected("users");
    },[]);
    return (
        <div className="us cld" ref={refs.pai}>
            <div id="pg">
                <div id="dt" className="fechado">
                    <div id="msg1">Listar usuários</div>
                    <div id="top">
                        <div id="div_info">Informações</div>
                        <Lista infos={infos} setInfos={setInfos} openExclusion={openExclusion} NewTable={Table} NewHeader={NewHeader}/>
                    </div> 
                </div>
                <div className="menu-a" style={{display:(isExclusion || stateReducer.menu) ? "block" : "none"}}></div>
                <div style={{display:isExclusion ? "block" : "none"}} id="exclusiond">
                    <div className="x" onClick={quitMenuExclusion}>X</div>
                    <form onSubmit={onSubmitExclusion}>
                        <div className="error" style={{display:error ? "block" : "none"}}>Senha de exclusão incorreta.</div>
                        <input ref={refs.exclusion} type="password" placeholder="Digite a senha de exclusão"></input>
                        <button type="submit">Excluir</button>
                    </form>
                </div>
                <div className="menu-a l-l"></div>
                <div id="menu-private" style={{display:stateReducer.menu ? "flex" : "none"}}>
                    <X className="x" onClick={quitMenu}></X>
                    <form onSubmit={onPrivateSubmit} id="center-menu-private">
                        <div className="error" style={{display:errorPrivate ? "block" : "none"}}>Senha de exclusão incorreta.</div>
                        <div id="group-menu-private">
                            <input ref={refs.inputPrivate} placeholder="Insira a senha de exclusão"></input>
                            <button type="submit">{stateReducer.checked ? "privar" : "desprivar"}</button>
                        </div>
                    </form>
                </div>
                <div id="loading-div">
                    <i id="loading" className='ball loading-ball bi-arrow-clockwise' style={{fontSize:"70px"}}></i>
                </div>
            </div>
        </div>
    )
}
function UsersComponent(){
    return (
        <MyProvider>
            <Users/>
        </MyProvider>
    )
}
export default memo(UsersComponent);