import { useEffect, useState, useRef, MutableRefObject } from 'react';
import { useGlobal } from '../Global.tsx';
import { useAuth } from '../Auth.tsx';
import './Account.scss';
const TrocarNome=({openMenu,nome}:{openMenu:any,nome:any})=>{
    return (
        <>
            <div className='name'>Nome atual:</div>
            <div className='value txt-1'>{nome}</div>
            <div className='openMenu' onClick={openMenu}>Alterar nome</div>
        </>
    )
}
const TrocarUsuario=({openMenu,usuario}:{openMenu:any,usuario:any})=>{
    return (
        <>
            <div className='name'>Nome de usuário atual:</div>
            <div className='value txt-1'>{usuario}</div>
            <div className='openMenu' onClick={openMenu}>Alterar nome de usuário</div>
        </>
    )
}
const TrocarSenha=({openMenu,senha}:{openMenu:any,senha:any})=>{
    const [senhaStr,setSenhaStr]=useState("");
    useEffect(()=>{
        var str="";
        for (var i=0;i<senha;i++){
            str+=".";
        }
        setSenhaStr(str);
    },[senha]);
    return (
        <>
            <div className='name'>Senha atual:</div>
            <input id="password" className='value txt-1' value={senhaStr} type="password" readOnly></input>
            <div className='openMenu' onClick={openMenu}>Alterar senha</div>
        </>
    )
}
const ExcluirConta=({openMenu}:{openMenu:any})=>{
    return (
        <>
            <div className='openMenu' onClick={openMenu}>Excluir conta</div>
        </>
    )
}
function Account(){
    const globals=useGlobal();
    const server=globals.server;
    const auth=useAuth();
    const [error,setError]=useState<string | boolean>(false);
    const [isLoading,setIsLoading]=useState(false);
    const refs:{
        nome:MutableRefObject<HTMLInputElement | null>,
        usuario:MutableRefObject<HTMLInputElement | null>,
        senha:MutableRefObject<HTMLInputElement | null>,
        conta:MutableRefObject<HTMLInputElement | null>,
        [key:string]:MutableRefObject<HTMLInputElement | null>,
    }={
        nome:useRef<HTMLInputElement | null>(null),
        usuario:useRef<HTMLInputElement | null>(null),
        senha:useRef<HTMLInputElement | null>(null),
        conta:useRef<HTMLInputElement | null>(null),
    }
    const passwords:{[key:string]:MutableRefObject<HTMLInputElement| null>}={
        nome:useRef<HTMLInputElement | null>(null),
        usuario:useRef<HTMLInputElement | null>(null),
        senha:useRef<HTMLInputElement | null>(null),
        conta:useRef<HTMLInputElement | null>(null),
    }
    const expressions:{[key:string]:RegExp}={
        nome:/.+/,
        usuario:/^[a-z0-9._]+$/,
        senha:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
        conta:/.+/,
    }
    const [infos,setInfos]=useState({
        nome:"",
        usuario:"",
        senha:0
    })
    const [isMenu,setIsMenu]=useState<string | boolean>(false);
    useEffect(()=>{
        globals.setSelected("account");
        function get(){
            auth.post(server+"/admin/account",{type:"info"}).then((result)=>{
                if (result.data.error){
                    globals.redirectError.current(result.data.error);
                } else {
                    setInfos({nome:result.data.nome,usuario:result.data.usuario,senha:result.data.senha});
                }
            });
        }
        get();
    },[]);
    const tipos={
        "nome":<TrocarNome openMenu={()=>{setIsMenu("nome")}} nome={infos.nome}/>,
        "usuario":<TrocarUsuario  openMenu={()=>{setIsMenu("usuario")}} usuario={infos.usuario}/>,
        "senha":<TrocarSenha  openMenu={()=>{setIsMenu("senha")}} senha={infos.senha}/>,
        "conta":<ExcluirConta openMenu={()=>{setIsMenu("conta")}}/>
    }   
    const quitMenu=()=>{
        setIsMenu(false);
    }
    const trocar=(tipo:any)=>{
        const tipoValue=refs[tipo].current!.value;
        if (expressions[tipo].test(tipoValue)){
            const tipoForm=tipo=="conta" ? ("excluir_"+tipo) : ("trocar_"+tipo);
            refs[tipo].current!.value="";
            const senha=passwords[tipo].current!.value;
            passwords[tipo].current!.value="";
            setIsLoading(true);
            auth.post(server+"/admin/account",{type:"option",[tipo]:tipoValue,tipo:tipoForm,senha_inserida:senha}).then((result)=>{
                setIsLoading(false);
                if (result.data.error){
                    globals.redirect(result.error);
                } else {
                    if (result.data.result=="true"){
                        setError(false);
                        setInfos((infos)=>({...infos,[tipo]:result.data[tipo]}));
                    } else if (result.data.result=="false"){
                        setError(tipo);
                    }
                }
            })
        }
    }
    const trocarNome=(e:any)=>{
        e.preventDefault();
        trocar("nome");
    }
    const trocarUsuario=(e:any)=>{
        e.preventDefault();
        trocar("usuario");
    }
    const trocarSenha=(e:any)=>{
        e.preventDefault();
        trocar("senha");
    }
    const excluirConta=(e:any)=>{
        e.preventDefault();
        trocar("conta");
    }
    return (
        <div id="acc">
            {tipos["nome"]}
            {tipos["usuario"]}
            {tipos["senha"]}
            {tipos["conta"]}
            <div id="menu-a" style={{display: isMenu ? "block" : "none"}}>
            </div>
            <form onSubmit={trocarNome}>
                <div id="menu_nome" className='menu' style={{display:isMenu=="nome" ? "block" : "none"}}>
                    <div className='error' style={{display:error=="nome" ? "block" : "none"}}>Senha incorreta.</div>
                    <div id="a_nome">Novo nome:</div>
                    <input ref={refs.nome} id="i_nome" placeholder='Novo nome'></input>
                    <input ref={passwords.nome} type="password" id="at_nome_senha" placeholder='Senha atual'></input>
                    <button type="submit">Alterar</button>
                    <div className="x" onClick={quitMenu}>X</div>
                </div>
            </form>
            <form onSubmit={trocarUsuario}>
                <div id="menu_usuario" className='menu' style={{display:isMenu=="usuario" ? "block" : "none"}}>
                    <div className='error' style={{display:error=="usuario" ? "block" : "none"}}>Nome de usuário já existe ou senha incorreta.</div>
                    <div id="a_usuario">Novo usuário:</div>
                    <input ref={refs.usuario} id="i_usuario"placeholder='Novo nome de usuário'></input>
                    <input ref={passwords.usuario} type="password" id="at_usuario_senha" placeholder='Senha atual'></input>    
                    <button type="submit">Alterar</button>
                    <div className="x" onClick={quitMenu}>X</div>
                </div>
            </form>
            <form onSubmit={trocarSenha}>
                <div id="menu_senha" className='menu' style={{display:isMenu=="senha" ? "block" : "none"}}>
                    <div className='error' style={{display:error=="senha" ? "block" : "none"}}>Senha incorreta.</div>
                    <div id="a_senha">Nova senha:</div>
                    <input ref={refs.senha} type="password" id="i_senha" placeholder='Nova senha'></input>
                    <input ref={passwords.senha} type="password" id="at_senha_senha" placeholder='Senha atual'></input>
                    <button type="submit">Alterar</button>
                    <div className="x" onClick={quitMenu}>X</div>
                </div>
            </form>
            <form onSubmit={excluirConta}>
                <div id="menu_conta" className='menu' style={{display:isMenu=="conta" ? "block" : "none"}}>
                    <div id="a_conta">Excluir conta:</div>
                    <div className='error' style={{display:error=="conta" ? "block" : "none"}}>Senha incorreta.</div>
                    <input ref={passwords.conta} type="password" id="at_conta_senha" placeholder='Senha atual'></input>
                    <button type="submit">Alterar</button>
                    <div className="x" onClick={quitMenu}>X</div>
                </div>
            </form>
            <div id="loading-div" style={{display:isLoading ? "block" : "none"}}>
                <i className={(isLoading ? 'ball' : 'no-animation')+' bi-arrow-clockwise'} style={{fontSize:"70px"}}></i>
            </div>
        </div>
    )
}
export default Account;