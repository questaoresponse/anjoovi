import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGlobal } from "../Global";
import { useAuth } from "../Auth";
import './DenunciasInfos.scss';

function DenunciasInfos(){
    const [posts,setPosts]=useState<{tipo:string,d:string}[]>([]);
    const auth=useAuth();
    const location=useLocation();
    const { server, setSelected }=useGlobal();
    const get=()=>{
        auth.post(server+location.pathname,{}).then(result=>{
            if (result.data.result=="true"){
                const tipos:string[]=JSON.parse(result.data.tipos);
                const datas:string[]=JSON.parse(result.data.datas);
                const posts:{tipo:string,d:string}[]=[];
                const options_tipos=[
                    "Conteúdo pornográfico",
                    "Conteúdo falso ou mentiroso",
                    "Conteúdo possui criança",
                    "Conteúdo mostra casas de apostas",
                    "Conteúdo contém violência explicita",
                    "Conteúdo suicídio ou automutilação",
                    "Conteúdo glorifica violência ou terrorismo",
                ];
                for (var i=0;i<tipos.length;i++){
                    posts.push({tipo:options_tipos[Number(tipos[i])-1],d:datas[i]});
                }
                setPosts(posts);
            }
        });
    }
    const NewHeader=()=>{
        return (
            <>
                <div className="tipo">TÍTULO</div>
                <div className="data">DENÚNCIAS</div>
            </>
        )
    }
    const NewTable=({post,index}:{post:{tipo:string,d:string},index:number})=>{
        return (
            <div className="linha" key={index}>
                <div className="tipo txt-1">{post.tipo}</div>
                <div className="data">{post.d}</div>
            </div>
        )
    }
    useEffect(()=>{
        get();
        setSelected("denuncias_lista");
    },[]);
    return (
        <div id="densinfos">
            <div id="pg">
                <div id="dt" className="fechado">
                    {/* <Listar/> */}
                    <div id="msg1">Listar denúncias</div>
                    <div id="top">
                        <div id="div_info">Informações</div>
                        <div id="tb">
                            <div id="tabelad">
                                <div id="tabela">
                                    <div id="tabelas">
                                        <div id="header">
                                            <NewHeader/>
                                        </div>
                                        {posts.map((post,index)=>{
                                            return <NewTable post={post} index={index}></NewTable>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    )
}
export default DenunciasInfos;