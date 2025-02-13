import { memo, useEffect, useState, useRef, useCallback } from 'react';
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
    const values=useRef({c:0,isd:false});
    const onMouseDown=useCallback((e:any)=>{
        values.current.c=e.clientX;
        values.current.isd=true;
    },[]);
    const onMouseMove=useCallback((e:any)=>{
        if (!values.current.isd) return;
        refs.pai.current!.scrollLeft+=(values.current.c-e.clientX) * window.innerWidth/1914;
        values.current.c=e.clientX;
    },[]);
    const onMouseUp=useCallback(()=>{
        values.current.isd=false;
    },[]);
    const onMouseLeave=useCallback(()=>{
        values.current.isd=false;
    },[]);
    useEffect(()=>{
        if (stories.length>0){
            if (globals.mobile){
                setInfos({canals:stories.sort((a,b)=>b.max_id-a.max_id).map(st=>{return {...st,visualized:st.visualized==1}}),margin:"2vw"});
            } else {
                setInfos({canals:stories.sort((a,b)=>b.max_id-a.max_id).map(st=>{return {...st,visualized:st.visualized==1}}),margin:"1vw"});
            }
        }
    },[stories,windowWidth]);
    useEffect(()=>{
        if (infos.canals.length>0 && refs.pai.current){
            refs.pai.current!.addEventListener("mousedown",onMouseDown,{ passive:true });
            refs.pai.current!.addEventListener("mousemove",onMouseMove,{ passive:true });
            refs.pai.current!.addEventListener("mouseup",onMouseUp,{ passive:true });
            refs.pai.current!.addEventListener("mouseleave",onMouseLeave,{ passive:true });
        }

        return ()=>{
            if (infos.canals.length>0 && refs.pai.current){
                refs.pai.current!.removeEventListener("mousedown",onMouseDown);
                refs.pai.current!.removeEventListener("mousemove",onMouseMove);
                refs.pai.current!.removeEventListener("mouseup",onMouseUp);
                refs.pai.current!.removeEventListener("mouseleave",onMouseLeave);
            }
        }
    },[infos,onMouseDown,onMouseMove,onMouseUp,onMouseLeave]);
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