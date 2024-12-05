import { memo, useEffect, useState, useRef } from 'react';
import './Storie.scss';
import GlobalContextInterface from '../Global';
function Storie({globals,stories:storiesV,inscricoes}:{globals:GlobalContextInterface,stories:any,inscricoes?:boolean}){
    const server=globals.server;
    const stories:{canal:{usuario:string}[],st:{usuario:string,id:number,visualized:number,max_id:number}[]}=storiesV;
    const [windowWidth,setWindowWidth]=useState(window.innerWidth);
    const [infos,setInfos]=useState<{canals:{canal:{usuario:string,logo:string | null},id:number,visualized:boolean}[],margin:string}>({
        canals:[],
        margin:"0"
    });
    const refs={
        pai:useRef<HTMLDivElement | null>(null)
    }
    useEffect(()=>{
        if (stories.canal.length>0){
            const canalsi2:{[chave:string]:any}={};
            const canalsi:{canal:{usuario:string,logo:string | null},id:number,visualized:boolean}[]=[];
            const canals:string[]=[];
            for (var cn of stories.canal){
                var u=cn.usuario;
                // delete cn.nome;
                canalsi2[u]=cn;
            }
            for (var st of stories.st.sort((a,b)=>b.max_id-a.max_id)){
                var usuario=st.usuario;
                if (!canals.includes(st.usuario)){
                    canalsi.push({canal:canalsi2[usuario],id:st.id,visualized:st.visualized==1});
                    canals.push(st.usuario);
                }
            }
            if (globals.mobile){
                setInfos({canals:canalsi,margin:"2vw"});
            } else {
                // if (isInscricoes){
                    var c=0;
                    var isd=false;
                    refs.pai.current!.addEventListener("mousedown",(e)=>{
                        c=e.clientX;
                        isd=true;
                    },{ passive:true });
                    refs.pai.current!.addEventListener("mousemove",(e)=>{
                        if (!isd) return;
                        refs.pai.current!.scrollLeft+=(c-e.clientX) * window.innerWidth/1914;
                        c=e.clientX;
                    },{ passive:true });
                    refs.pai.current!.addEventListener("mouseup",()=>{
                        isd=false;
                    },{ passive:true });
                    refs.pai.current!.addEventListener("mouseleave",()=>{
                        isd=false;
                    },{ passive:true });
                    setInfos({canals:canalsi,margin:"1vw"});
                // } else {
                    // const storiesWidth=(window.innerHeight * 0.125)+13;
                    // const tabela_circleWidth=window.innerWidth * 0.95;
                    // if (storiesWidth*(canalsi.length+1) > tabela_circleWidth){
                    //     const total=Math.floor(tabela_circleWidth/storiesWidth);
                    //     const diff=tabela_circleWidth - (total * storiesWidth);
                    //     const c=(7*total);
                    //     setInfos({
                    //         canals:canalsi.filter((_,i)=>i<total),
                    //         margin:(diff+c)/(total)+"px"
                    //     });
                    // } else {
                    //     setInfos({
                    //         canals:canalsi,
                    //         margin:"1vw"
                    //     })
                    // }  
                // }
            }
        }
    },[stories,windowWidth]);
    useEffect(()=>{
        const setar=()=>{
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize",setar);
        return ()=>{
            window.removeEventListener("resize",setar);
        }
    },[]);
    return stories.canal.length>0 ? <div ref={refs.pai} id="tabela_circle" className='str'>
            {infos.canals.map((info,index)=>{
                const canal=info.canal;
                const id=info.id;
                var content=canal.logo ? <img src={server+"/images/"+encodeURIComponent(canal.logo)}/> : canal.usuario[0];
                const lk="/stories/"+id+"?origin="+(inscricoes ? "/inscricoes" : "/");
                const verify=()=>{
                    globals.verifyStories.current!(lk);
                }
                return (
                    <div style={{marginRight:infos.margin}} className="csd" onDragStart={(e)=>{e.preventDefault()}} onClick={verify} key={index}>
                        <div className={'cs' + (info.visualized ? ' vis' : '')}>
                           {content}
                        </div>
                        <div className='cs_named'><div className='cs_name txt'>{canal.usuario}</div></div>
                    </div>
                )
                })
            }
        </div> : <></>
}
export default memo(Storie);