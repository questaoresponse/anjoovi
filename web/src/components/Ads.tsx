// import { useEffect, useRef, useState } from "react";
// import { useGlobal } from "./Global.tsx";
// function Ads(props:any){
//     const { renderAds, setIsAds, cargo }=useGlobal();
//     const cargoRef=useRef<number | null>(null);
//     const [cargoValue,setCargoValue]=useState<number | null>(null);
//     const loaded=useRef(false);
//     useEffect(()=>{
//         if (loaded.current==false && cargoValue!=null && (cargoValue & 1)==0){
//             loaded.current=true;
//             setIsAds(true);
//             renderAds();
//         }
//         return ()=>{
//             setIsAds(false);
//         }
//     },[cargoValue]);
//     const updateCargo=(cargo:number)=>{
//         cargoRef.current=cargo;
//         setCargoValue(cargo);
//         resize();
//     }
//     const anuncioRef=useRef<HTMLDivElement>(null);
//     const [size,setSize]=useState({width:100,height:100});
//     const resize=()=>{
//         if (cargoRef.current!==null && (cargoRef.current & 1)==0){
//             const rect=anuncioRef.current!.getBoundingClientRect();
//             setSize({width:rect.width,height:rect.height});
//         }
//     };
//     useEffect(()=>{
//         const rect=anuncioRef.current!.getBoundingClientRect();
//         setSize({width:rect.width,height:rect.height});
//         cargo.current.cargo!==null && updateCargo(cargo.current.cargo);
//         cargo.current.addListener(updateCargo);
//         window.addEventListener("resize",resize);
//         return ()=>{
//             cargo.current.removeListener(updateCargo);
//             window.removeEventListener("resize",resize);
//         }
//     },[]);
//     return <div ref={anuncioRef} className="anunciodiv" style={{display: cargoValue!==null && (cargoValue & 1)==0 ? "block" : "none"}}>
//             <ins className="adsbygoogle" style={{position:"relative",display:"block"}} data-ad-client="ca-pub-4004929109745703" data-ad-slot={props.slot}></ins>
//         </div>
// }
// export default Ads;