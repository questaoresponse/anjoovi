import { MutableRefObject, useEffect, useRef, useState } from "react";
import './VideoController.scss';
function VideoController({ref,srcVideo,props}:{ref:MutableRefObject<HTMLDivElement | null>,srcVideo:string,props:any}){
    const videoTime=2000;
    const [controls,setControls]=useState(false);
    const refs={
        video:useRef<HTMLVideoElement>(null)
    }
    const st=useRef<any>(null);
    const onTouchStart=()=>{
        if (st.current){
            clearTimeout(st.current);
            st.current=null;
        }
        if (document.fullscreenElement){
            st.current=setTimeout(()=>{
                setControls(false);
                st.current=null;
            },videoTime);
        } else {
            setControls(true);
        }
    }
    const onTouchEnd=()=>{
        if (st.current) clearTimeout(st.current);
        st.current=setTimeout(()=>{
            setControls(false);
            st.current=null;
        },videoTime);
    };
    const onFullScreenChange=()=>{
        if (document.fullscreenElement && controls){
            st.current=setTimeout(()=>{
                setControls(false);
                st.current=null;
            },videoTime);
        }
    }
    useEffect(()=>{
        if (props.ref){
            props.ref.current=refs.video.current;
        }
        document.addEventListener("fullscreenchange",onFullScreenChange);
        return ()=>{
            document.removeEventListener("fullscreenchange",onFullScreenChange);
        }
    },[controls]);
    return  <div ref={ref} className="campo-video">
        <video {...props} onTouchStart={onTouchStart} onTouchMove={onTouchStart} onTouchEnd={onTouchEnd} onMouseEnter={onTouchStart} onMouseMove={onTouchStart} onMouseLeave={onTouchEnd} autoPlay={true} controls={controls} className="campo-video-content" ref={refs.video} src={srcVideo} ></video>
        {/* <div className="video-controller"></div> */}
    </div>
}
export default VideoController;