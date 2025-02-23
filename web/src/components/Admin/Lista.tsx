import { useCallback, useState, useRef, useEffect, memo } from "react";
import { useAuth } from "../Auth.jsx";
import { useGlobal } from "../Global.tsx";
import { useLocation } from "react-router-dom";
import Link, { eventInterface } from "../Link.tsx";
import './Lista.scss';
function Lista(propsl:any){
    const NewTable=propsl.NewTable || false;
    const NewHeader=propsl.NewHeader || false;
    const openExclusion=propsl.openExclusion || false;
    const Opcoes=propsl.opcoes || null;
    const globals=useGlobal();
    const { server,navigate }=globals;
    const auth=useAuth();
    const location=useLocation();
    const refs={
        pesquisa:useRef<HTMLInputElement>(null)
    }

    const verify=()=>{
        if (propsl.infos){
            return [propsl.infos,propsl.setInfos];
        } else {
            return useState({
                posts:[],
                numRegistros:0,
                isReady:null,
                bvLink:false,
                biLink:false,
                nd:0,
                pa:null,
                pesquisa:null
            });
        }
    }
    const [infos,setInfos]=verify();
    const zero=(number:string | number)=>{
        return Number(number) < 10 ? "0"+number : String(number);
    }
    const Recriar=useCallback((data:any,pesquisa=null)=>{
        var n=Number(data.n_registros);
        var nb=n<=10 ? 0 : n/10!=Math.floor(n/10) ? Math.floor(n/10+1) : n/10;
        var params=new URLSearchParams(location.search);
        var pas=0;
        data.posts=data.posts.map((post:any)=>{ 
            if (post.d){
                post.d=JSON.parse(post.d)["o"];
                const [datePart, timePart] = new Date((post.d - 10800) * 1000).toLocaleString().split(', ');
                const [day, month, year] = datePart.split('/');
                const date:any = new Date(`${year}-${month}-${day}T${timePart}`);
                const dia = zero(date.getDate());
                const mes = zero(date.getMonth() + 1); // Os meses em JavaScript são base 0 (janeiro é 0, fevereiro é 1, etc.)
                const ano = date.getFullYear();
                const hora = zero(date.getHours());
                const minuto=zero(date.getMinutes());
                post.d=`${ano}-${mes}-${dia} ${hora}:${minuto}`;
            } else {
                post.d="";
            }
            return post;
        });
        
        if (params.has("pg")){
            pas=Number(params.get("pg"))-1 >= 0 ? Number(Number(params.get("pg")) - 1) : 0;
        }
        setInfos({
            posts:data.posts,
            numRegistros:data.n_registros,
            isReady:true,
            bvLink:pas>=1,
            biLink:pas+2<=nb,
            pa:pas,
            nd: n-pas*10,
            pesquisa:pesquisa
        });
    },[location.search]);
    const TableItem=({post,index}:{post:any,index:number})=>{
        const n=infos.nd-index;
        return (
            <div className="linha" key={index}>
                <div className="id">{n}</div>
                <Link className="titulo txt-1" onClick={(e:eventInterface)=>{e.preventDefault(); window.open(propsl.tituloHref(post))}} to={propsl.tituloHref(post)}>
                    {post.titulo}
                </Link>
                <div className="data">{post.d}</div>
                <div className="acessos">{post.acessos}</div>
                <div className="opcoes">
                    <Opcoes auth={auth} post={post} globals={globals} recriar={Recriar} location={location}/>
                </div>
            </div>
        )
    };
    const Table=memo(({infos}:{infos:{posts:any[],[chave:string]:any}})=>{
        return (
        <>
            { infos.posts.map((post,index)=>{
                return NewTable ? (
                    <NewTable 
                        openExclusion={openExclusion}
                        auth={auth} 
                        globals={globals} 
                        recriar={Recriar} 
                        location={location} 
                        post={post} 
                        n={infos.pesquisa ? infos.numRegistros - index : infos.nd - index} key={index} />
                    ) : (
                        TableItem({post,index})
                    )
            })}
        </>
        );
    });
    // l.querySelector(".edit").remove();
    // l.querySelector(".excluir").remove();
    // var d=document.createElement("div");
    // d.className="coluna titulo";
    // d.textContent="TÍTULO";
    // l.querySelector(".titulo").parentNode.replaceChild(d,l.querySelector(".titulo"));
    // var o=document.createElement("div");
    // o.textContent="AÇÕES";
    // o.classList.add("coluna");
    // o.classList.add("opcoes");
    // l.appendChild(o);
    const get=useCallback(()=>{
        auth.post(server+location.pathname+location.search,{type:"info"}).then((result)=>{
            if (result.error){
                globals.redirectError.current(result.error);
            } else {
                result.data.posts=(Array.isArray(result.data.posts) ? result.data.posts : []).map((post:any)=>{ 
                    return {...post,privado:post.privado ? Number(post.privado) : undefined}
                });
                Recriar(result.data);
            }
        })
    },[location.search]);
    useEffect(()=>{
        get();
    },[location.search]);
    const pesquisar=(e:any)=>{
        e.preventDefault();
        navigate!(location.pathname+"?search="+encodeURIComponent(refs.pesquisa.current!.value));
        // auth.post(server+location.pathname+"?search="+encodeURIComponent(refs.pesquisa.current.value),{type:"option",tipo:"pesquisa",search:refs.pesquisa.current.value}).then((result)=>{
        //     if (result.data.result=="true"){   
        //         Recriar(result.data,true);
        //     }
        // });
    }
    return (
        <>
            <div id="top-table">
                <form id="pesquisad" onSubmit={pesquisar}>
                    <input className="pesquisabd" ref={refs.pesquisa} id="input-pesquisa" placeholder="Insira sua pesquisa"></input>
                    <button className="pesquisabd" type="submit">Pesquisar</button>
                </form>
                <div className="registros">
                    <p className="p1">
                        {infos.numRegistros>1 ? "Foram encontrados" : "Foi encotrado"}&nbsp;
                    </p>
                    <p className="n">
                        {infos.numRegistros}
                    </p>
                    <p className="p2">
                        &nbsp;{infos.numRegistros>1 ? "registros." : "registro."}
                    </p>
                </div>
            </div>
            <div id="tb">
                <div id="tabelad">
                    <div id="tabela">
                        <div id="tabelas">
                            <div id="header">
                                { NewHeader ? <NewHeader/> : 
                                    <>
                                        <div className="id">N°</div>
                                        <div className="titulo">TÍTULO</div>
                                        <div className="data">DATA</div>
                                        <div className="acessos">ACESSOS</div>
                                        <div className="opcoes">OPÇÕES</div>
                                    </>
                                }
                            </div>
                            <Table infos={infos}/>
                        </div>
                    </div>
                    <div id="btndiv">
                        {infos.bvLink ? 
                            <Link to={location.pathname+"?pg="+infos.pa} style={{background:"white"}} className="btnb">{ infos.pa==1 ? "1" : infos.pa }</Link> : 
                            <div style={{background:"gray"}} className="btnb">{ infos.pa==1 ? "1" : infos.pa }</div>
                        }
                    {infos.biLink ? 
                            <Link to={location.pathname+"?pg="+(infos.pa+2)} style={{background:"white"}} className="btnb">{ infos.pa+2 }</Link> : 
                            <div style={{background:"gray"}} className="btnb">{ infos.pa+2 }</div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default memo(Lista);