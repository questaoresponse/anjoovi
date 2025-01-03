import { useEffect, useRef, useState } from "react";
import { useGlobal } from "./Global.tsx";
function Ads(props:any){
    const { renderAds, setIsAds, cargo }=useGlobal();
    const cargoRef=useRef<number | null>(null);
    const [cargoValue,setCargoValue]=useState<number | null>(null);
    const loaded=useRef(false);
    useEffect(()=>{
        if (loaded.current==false && cargoValue!=null && (cargoValue & 1)==0 ){
            loaded.current=true;
            setIsAds(true);
            renderAds();
        }
        return ()=>{
            setIsAds(false);
        }
    },[cargoValue]);
    const updateCargo=(cargo:number)=>{
        resize();
        cargoRef.current=cargo;
        setCargoValue(cargo);
    }
    const anuncioRef=useRef<HTMLDivElement>(null);
    const [size,setSize]=useState({width:0,height:0});
    const resize=()=>{
        if (cargoRef.current!==null && (cargoRef.current & 1)==0){
            const rect=anuncioRef.current!.getBoundingClientRect();
            setSize({width:rect.width,height:rect.height});
        }
    };
    useEffect(()=>{
        cargo.current.cargo!==null && updateCargo(cargo.current.cargo);
        cargo.current.addListener(updateCargo);
        window.addEventListener("resize",resize);
        return ()=>{
            console.log("retirado");
            cargo.current.removeListener(updateCargo);
            window.removeEventListener("resize",resize);
        }
    },[]);
    return <div ref={anuncioRef} className="anunciodiv" style={{display: cargoValue!==null && (cargoValue & 1)==0 ? "block" : "none"}}>
            <ins className="adsbygoogle" style={{position:"absolute",display:"block",width:size.width, height:size.height}} data-ad-client="ca-pub-4004929109745703" data-ad-slot={props.slot}></ins>
        </div>
}
export default Ads;