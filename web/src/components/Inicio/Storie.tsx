import { memo, useEffect, useState, useRef } from 'react';
import './Storie.scss';
import GlobalContextInterface from '../Global';
function Storie({globals,stories:storiesV,inscricoes}:{globals:GlobalContextInterface,stories:any,inscricoes?:boolean}){
    const server=globals.server;
    const stories:{usuario:string,logo:string,id:number,visualized:number,max_id:number}[]=storiesV.st;
    const [windowWidth,setWindowWidth]=useState(window.innerWidth);
    const [infos,setInfos]=useState<{canals:{usuario:string,logo:string,id:number,visualized:boolean}[],margin:string}>({
        canals:[],
        margin:"0"
    });
    const refs={
        pai:useRef<HTMLDivElement | null>(null)
    }
    useEffect(()=>{
        if (stories.length>0){
            if (globals.mobile){
                setInfos({canals:stories.sort((a,b)=>b.max_id-a.max_id).map(st=>{return {...st,visualized:st.visualized==1}}),margin:"2vw"});
            } else {
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
                setInfos({canals:stories.sort((a,b)=>b.max_id-a.max_id).map(st=>{return {...st,visualized:st.visualized==1}}),margin:"1vw"});
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
    return infos.canals.length>0 ? <div ref={refs.pai} id="tabela_circle" className='str'>
            {infos.canals.map((canal,index)=>{
                var content=canal.logo ? <img src={server+"/images/"+encodeURIComponent(canal.logo)}/> : canal.usuario[0];
                const lk="/stories/"+canal.id+"?origin="+(inscricoes ? "/inscricoes" : "/");
                const verify=()=>{
                    globals.verifyStories.current!(lk);
                }
                return (
                    <div style={{marginRight:infos.margin}} className="csd" onDragStart={(e)=>{e.preventDefault()}} onClick={verify} key={index}>
                        <div className={'cs' + (canal.visualized ? ' vis' : '')}>
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