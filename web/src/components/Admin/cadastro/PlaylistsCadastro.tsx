import React, { useState, useRef, createRef } from 'react';
import './PlaylistsCadastro.scss';
import Publicar from '../Publicar';
import { useGlobal } from '../../Global';
import { useAuth } from '../../Auth';
function PlaylistsCadastro(){
    const tipo=useRef("post");
    const globals=useGlobal();
    const auth=useAuth();
    const [isPesquisa,setIsPesquisa]=useState(false);
    const [dados,setDados]=useState<{id:number,titulo:string}[]>([]);
    const [list,setList]=useState<{post:{titulo:string | null,id:number | null},ref:React.RefObject<HTMLDivElement>}[]>([{post:{titulo:null,id:null},ref:createRef<HTMLDivElement>()}]);
    const open_current=useRef<number>();
    const [showAdd,setShowAdd]=useState(false);
    const refs={
        titulo:useRef<HTMLInputElement>(null),
        input:useRef<HTMLInputElement>(null),
        error:useRef<HTMLDivElement>(null),
        uploaded:useRef<HTMLDivElement>(null),
    }
    const showError=()=>{
        refs.error.current!.classList.replace("f","a");
        var s=setTimeout(()=>{
            refs.error.current!.classList.replace("a","f");
            clearTimeout(s);
        },2000);
    }
    const showUploaded=()=>{
        refs.uploaded.current!.classList.replace("f","a");
        var s=setTimeout(()=>{
            refs.uploaded.current!.classList.replace("a","f");
            clearTimeout(s);
        },2000);
    }
    const onSubmit=(e:any)=>{
        e.preventDefault();

        // verifica se alguma postagem não foi preenchida
        if (list.filter(list=>!list.post.id).length>0){
            showError();
        } else {

            // cria um array contendo apenas o id das postagens
            const posts=list.map(list=>list.post.id);
            const titulo=refs.titulo.current!.value;
            auth.post(globals.server+"/admin/playlists_cadastro",{type:"cadastro",data_type:tipo.current,titulo,posts:JSON.stringify(posts)}).then(result=>{
                if (result.data.result=="true"){
                    showUploaded();

                    // reseta as informacoes existentes
                    setList([{post:{titulo:null,id:null},ref:createRef<HTMLDivElement>()}]);
                    setIsPesquisa(false);
                    setShowAdd(false);
                    refs.titulo.current!.value="";
                }
            });
        };
    }
    const showSearch:(index:number)=>void=(index)=>{
        setIsPesquisa(true);
        pesquisar();
        open_current.current=index;
    }
    const pesquisar=()=>{ 
        auth.post(globals.server+"/admin/playlists_cadastro?search="+refs.input.current!.value,{type:"info",data_type:tipo.current}).then(result=>{
            if (result.data.result=="true"){
                setDados(result.data.posts);
            }
        });
    }
    const quitMenu=()=>{
        setIsPesquisa(false);
        open_current.current=undefined;
    }
    const onChangeSelect=(e:any)=>{
        tipo.current=e.target.value;

        // reseta as informacoes existentes
        setList([{post:{titulo:null,id:null},ref:createRef<HTMLDivElement>()}]);
        setIsPesquisa(false);
        setShowAdd(false);
    }
    const select=(titulo:string,id:number)=>{
        setList(list=>{
            list[open_current.current!].post={titulo,id};
            setShowAdd(list.filter(list=>!list.post.id).length==0);
            quitMenu();
            return list;
        });
    }
    const addItem=()=>{

        // adiciona um novo elemento na lista
        setList(list=>list.concat({post:{titulo:null,id:null},ref:createRef<HTMLDivElement>()}));

        // retira o 'adicionar'
        setShowAdd(false);
    }
    const removeItem=(index:number)=>{
        if (index==0) return;
        setList(list=>list.filter((_,i)=>i!=index));
        setShowAdd(list.filter(list=>!list.post.id).length==0);
    }
    return (
        <div id="pg" className="pc">
            <div id="dt">
                <Publicar/>
                <div id="msg1">Cadastrar playlist</div>
                <form onSubmit={onSubmit}>
                    <label>Título</label>
                    <input className='input' id="titulo" ref={refs.titulo} required/>
                    <label>Tipo</label>
                    <select id="tipo" onChange={onChangeSelect}>
                        <option value="post">texto</option>
                        <option value="post_imagem">imagem</option>
                        <option value="post_musica">musica</option>
                    </select>
                    <div id="list">
                        {list.map((el,index)=>{
                            return (
                                <div className='item-list' key={index}>
                                    <div ref={el.ref} className='title-list txt-1'>{el.post.titulo}</div>
                                    <div className='add-item' onClick={()=>{showSearch(index)}}>+</div>
                                    <div className={'remove-item' + (index==0 ? " disabled" : "")} onClick={()=>{removeItem(index)}}>-</div>
                                </div>

                            )
                        })}
                    </div>
                    <div className='add-btn' style={{display:showAdd ? "block" : "none"}} onClick={addItem}>adicionar</div>
                    <button type="submit" id="button">Enviar</button>
                </form>
                <div style={{display:isPesquisa ? "block" : "none"}} id="pesquisa">
                    <form onSubmit={pesquisar} id="div-pesqusia">
                        <div>titulo:</div>
                        <input ref={refs.input} onInput={pesquisar}></input>
                    </form>
                    <div onClick={quitMenu} className='x'>X</div>
                    <div id="conteudo">
                        {dados.map((data,index)=>{
                            return (
                            <div onClick={()=>{select(data.titulo,data.id)}} className='result' key={index}>
                                <p className="txt">{data.titulo}</p>
                            </div>
                            )
                        })}
                    </div>
                </div>
                <div ref={refs.uploaded} id="m" className='f aviso'>Playlist cadastrada com sucesso!</div>
                <div ref={refs.error} className='f aviso' id="error">Preencha todos os espaços disponiveis</div>
            </div>
        </div>
    )
}
export default PlaylistsCadastro;