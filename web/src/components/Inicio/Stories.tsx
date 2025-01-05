import React, { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { useGlobal } from '../Global.tsx';
import { useAuth } from '../Auth.tsx';
import { useLocation } from 'react-router-dom';
import './Stories.scss';
function Stories(){
    const globals=useGlobal();
    const { navigate, firstPageInfos }=globals;
    const server=globals.server;
    const auth=useAuth();
    const location=useLocation();
    const statusDivRef=useRef<HTMLDivElement | null>(null);
    const [_,mPages]=useState();
    const pagesValue=useRef<any[]>();
    const setPages=(value:any)=>{
        pagesValue.current=value;
        mPages(value);
    }
    const [atual,setAtual]=useState("play");
    const [cgSrc,setCgSrc]=useState<string>();
    const [fileInfos,setFileInfos]=useState<{src:string | null,type:string}>({src:null,type:""});
    const [showStory,setShowStory]=useState(!firstPageInfos.current.isFirstPage);
    const st=useRef<NodeJS.Timeout | null>(null);
    const n=useRef(0);
    const t=useRef(0);
    const el=useRef<{a:RefObject<HTMLImageElement>,i:number,type:string,id:number}[]>([]);
    const npe=useRef(true);
    const isps=useRef(false);
    const isp=useRef(true);
    const ds=useRef<Date>();
    const id=useRef<number>();
    const ids=useRef<number>();
    const [isReady,setIsReady]=useState(false);
    const refs={
        video:useRef<HTMLVideoElement>(null),
    }
    const go=useCallback(()=>{
        var cs=new URLSearchParams(location.search);
        return cs.has("origin") ? cs.get("origin")! : "/";
    },[location.search]);
    const sair=useCallback(()=>{
        clearInterval(st.current!);
        navigate(go());
    },[st.current]);
    const enviar=useCallback((ids:any)=>{
        if (npe.current) return;
        auth.post(server+"/stories/"+ids,{type:"option"}).then((result)=>{
            if (result.error){
                console.log(result.error);
                globals.redirectError.current(result.error);
            }
        });
    },[npe.current]);
    const isLoaded=useRef(false);
    const get=useCallback(async (initial=false)=>{
        if (initial && isLoaded.current) return;
        if (initial && !isLoaded.current) isLoaded.current=true;
        var result=await auth.post(server+location.pathname,{type:"info"});
        if (result.error){
            console.log(result.error);
            globals.redirectError.current(result.error);
        } else {
            id.current=Number(location.pathname.split("/")[2]);
            n.current=result.data.posts.findIndex((elemento:{id:number}) => elemento.id === id.current);
            ids.current=n.current;
            setPages(result.data.posts);
            for (var sts of result.data.posts){
                el.current.push({a:React.createRef<HTMLImageElement>(),i:sts.filename,type:sts.type,id:sts.id});
                setIsReady(true);
            }
        }
    },[]);
    get(true);
    useEffect(()=>{
        if (isReady && showStory){
            trocar();
        }
    },[isReady,showStory]);
    function mclass(e:any,s:any){
        e.className=s;
    }
    function css(e:any,s:any,s2:any){
        e.style[s]=s2;
    }
    const ver=(_:any)=>{
        if (pagesValue.current){
            const c=Number(location.pathname.split("/")[2]);
            const cn=pagesValue.current.findIndex(elemento => elemento.id === c);
            if (ids.current!+1>cn && ids.current==1){
                sair();
            } else if (ids.current!+1>cn){
                voltar(true);
            } else {
                ir(true);
            }   
        }
    };
    const ver2=()=>{
        ver(new Date().toISOString());
    }
    useEffect(()=>{
        window.addEventListener("popstate",ver2);
        
        return ()=>{
            window.removeEventListener("popstate",ver2);
        }
    },[]);
    const agend=useRef<any>(null);
    const aAtual=()=>{
        return el.current[n.current-1].a.current;
    }
    const atualDuration=useRef(10000);
        const trocar=useCallback((notAdd=false)=>{
                if (el.current.length!=n.current){
                    const type=el.current[n.current].type;
                    setFileInfos({src:server+(type=="mp4" ? "/videos/" : "/images/")+el.current[n.current].i,type});
                    if (type!="mp4") atualDuration.current=10000;
                    const a=()=>{
                        if (isp.current){
                            isp.current=false;
                            isps.current=true;
                            setAtual("play");
                        }
                        ds.current=new Date();
                        n.current>0 && mclass(aAtual(),"a2 end_animation");
                        mclass(el.current[n.current].a.current,"a2 animation");
                        !notAdd && ids.current!=0 && window.history.pushState(null,null!,'/stories/'+el.current[n.current].id+location.search);
                        enviar(el.current[n.current].id);
                        npe.current=false;
                        n.current++;
                        ids.current=n.current;
                        el.current.length>n.current && setCgSrc(server+"/images/"+encodeURIComponent(el.current[n.current].i));
                        if (isps.current){
                            isps.current=false;
                        }
                        clearInterval(st.current!);
                        st.current=setInterval(()=>{
                            trocar();
                        },atualDuration.current);
                        t.current=0;
                    }
                    if (type=="mp4"){
                        agend.current=a;
                    } else {
                        a();
                    }
                } else {
                    clearInterval(st.current!);
                    navigate(go());
                }
        },[el.current,n.current,isp.current,isps,st.current,t.current,npe.current]);
        const ir=useCallback((notAdd=false)=>{
            if (n.current>0){
                mclass(aAtual(),"a2 end_animation");
                css(aAtual(),"animationPlayState","running");
                // n++;
            }
            clearInterval(st.current!);
            trocar(notAdd);
        },[el.current,n.current,st.current]);
    const voltar=useCallback((notAdd=false)=>{
        if (n.current>2){
            mclass(aAtual(),"a2 init_animation");
            css(aAtual(),"animationPlayState","running");
            mclass(el.current[n.current-2].a.current,"a2 init_animation");
            css(el.current[n.current-2].a.current,"animationPlayState","running");
            n.current-=2;
            trocar(notAdd);
            clearInterval(st.current!);
            st.current=setInterval(()=>{
                trocar();
            },atualDuration.current);
        } else if (n.current<=2 && n.current>1){
            mclass(el.current[1].a.current,"a2 init_animation");
            css(el.current[1].a.current,"animationPlayState","running");
            mclass(el.current[0].a.current,"a2 init_animation");
            css(el.current[0].a.current,"animationPlayState","running");
            n.current=0;
            trocar();
            clearInterval(st.current!);
            st.current=setInterval(()=>{
                trocar();
            },atualDuration.current);
        }
    },[n.current]);
    const onLdClick=useCallback(()=>{
        ir();
    },[]);
    const onLsClick=useCallback(()=>{
        voltar();
    },[]);
    const pause=useCallback(()=>{
        if (showStory){
        if (isp.current) return;
        setAtual("pause");
        isp.current=true;
        clearInterval(st.current!);
        var de=new Date();
        t.current+=de.getTime()-ds.current!.getTime();
        css(aAtual(),"animationPlayState","paused");
        if (fileInfos.type=="mp4" && refs.video.current){
            refs.video.current.pause();
        }
        }
    },[fileInfos.type,n.current,isp.current,ds.current]);
    const play=()=>{
        if (showStory){
            if (!isp.current) return;
            setAtual("play");
            isp.current=false;
            isps.current=true;
            css(aAtual(),"animationPlayState","running");
            // var data=new Date();
            // ds.setMilliseconds(ds.getMilliseconds() + data.getMilliseconds());
            var t5=atualDuration.current-t.current;
            // var data=new Date();
            st.current=setInterval(()=>{
                trocar();
            },t5);
            ds.current=new Date();
            if (fileInfos.type=="mp4" && refs.video.current){
                refs.video.current.play();
            }
        }
    }
    const [duration,setDuration]=useState(15);
    const onVideoLoad=useCallback((_:any,init=false)=>{
        if (refs.video.current){
            const newDuration=refs.video.current!.duration > 15 ? 15000 : refs.video.current!.duration * 1000;
            if (newDuration!=atualDuration.current){
                atualDuration.current=newDuration;
                setDuration(refs.video.current!.duration > 15 ? 15 : refs.video.current.duration);
            }
        }
        if (showStory || init){
            refs.video.current!.play();
            agend.current();
            agend.current=null;
        }
    },[showStory]);
    return (
        <div id="pg" className="w-100 st" style={{height:"100vh"}}>
            <div id="c" className="d-flex justify-content-center w-100 h-100">
                <div id="filed" onTouchStart={pause} onTouchEnd={play} className="h-100">
                    { fileInfos.src ? fileInfos.type=="mp4" ? <video style={{display:showStory ? "block" : "none"}} onLoadedMetadata={onVideoLoad} ref={refs.video} src={fileInfos.src} id="s_file"></video> : <img src={fileInfos.src} id="s_file"/> : <></>}
                    <div id="a"></div>
                    <div id="ls" onClick={onLsClick}></div>
                    <div id="ld" onClick={onLdClick}></div>
                    {!showStory ? <div id="menuShowStory">
                        <div id="showStory-content">
                            <div id="showStory-label">Deseja ver esse story?</div>
                            <div id="btnShowStory" onClick={()=>{setShowStory(true);onVideoLoad("",true)}}>Ver story</div>
                        </div>
                    </div> : <></>}
                    <div id="xd" className="d-none d-md-block">
                        <div id="x1" onClick={pause} style={{display:atual==="play" ? "flex" : "none"}}><i id="" className="bi-pause-fill ef" style={{fontSize:"40px"}}></i></div>
                        <div id="x2" onClick={play} style={{display:atual==="play" ? "none" : "flex"}}><i id="" className="bi-play-fill ef" style={{fontSize:"40px"}}></i></div>
                    </div>
                </div>
            </div>
            <div ref={statusDivRef} id="status_div">
                {el.current.map((ela,index)=>{
                    var c='';
                    if (id.current!>ela.id){
                        c=" end_animation";
                    }
                    return (
                        <div key={index} className={'status_a'} style={{width:(95/el.current.length)+"%",marginLeft:"0.1%"}}>
                            <div className='a1'></div>
                            <div ref={el.current[index].a} className={'a2'+c} style={{animationDuration:duration+"s"}}></div>
                        </div>
                    )
                })}
            </div>
            <div onClick={sair} id="x"><i className="bi-x"></i></div>
            <img id="cg" src={cgSrc} style={{display:"none"}}></img>
        </div>
    )
}
export default React.memo(Stories);