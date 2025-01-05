import React, { MutableRefObject, useEffect, useRef, useState} from 'react';
import { useGlobal } from '../../Global.tsx';
import { resultInterface, useAuth } from '../../Auth.tsx';
import './24Cadastro.scss';
import sem_imagem from '../../static/sem-imagem.jpg';
import Publicar from "../Publicar.tsx";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";

function Cadastro24(){
    const globals=useGlobal();
    const server=globals.server;
    const auth=useAuth();
    const refs={
        titulo:useRef<HTMLInputElement>(null),
        file:useRef<HTMLInputElement>(null),
        original_format:useRef<HTMLSelectElement>(null),
        imagem_view:useRef<HTMLDivElement>(null),
        image_element:useRef<HTMLVideoElement | HTMLImageElement>(null),
    }
    const [fileInfos,setFileInfos]=useState<{type:string,name:string,file?:File | Blob,src:any}>({type:"jpeg",name:"Upload",src:sem_imagem});
    const [message,setMessage]=useState(false);
    const [errorImage,setErrorImage]=useState(false);
    const [isUploading,setIsUploading]=useState(false);
    const [porcentagem,setPorcentagem]=useState(0);
    const ffmpeg = useRef(new FFmpeg());
    // const setDimensions=(src:any,type:any)=>{
    //     if (typeof src=="string"){
    //         if (type=="mp4"){
    //             const video = document.createElement("video");
    //             video.onloadedmetadata = () => {
    //                 const width=refs.imagem_view.current!.offsetWidth;
    //                 const height=refs.imagem_view.current!.offsetHeight;
    //                 var widthImage = video.videoWidth;
    //                 var heightImage = video.videoHeight;
    //                 if (width / widthImage * heightImage>height){
    //                     widthImage=height / heightImage * widthImage;
    //                     heightImage=height;
    //                 } else {
    //                     heightImage=width / widthImage * heightImage;
    //                     widthImage=width;
    //                 }
    //                 setImageInfos({src, width: widthImage, height: heightImage});
    //             }
    //                 // console.log(`Width: ${width}, Height: ${height}`);
    //             video.src = src;

    //             // Aqui você pode atualizar o estado ou fazer algo com as dimensões da imagem
    //         } else {
    //             const img = new Image();
    //             img.onload = () => {
    //                 const width=refs.imagem_view.current!.offsetWidth;
    //                 const height=refs.imagem_view.current!.offsetHeight;
    //                 var widthImage = img.width;
    //                 var heightImage = img.height;
    //                 if (width / widthImage * heightImage>height){
    //                     widthImage=height / heightImage * widthImage;
    //                     heightImage=height;
    //                 } else {
    //                     heightImage=width / widthImage * heightImage;
    //                     widthImage=width;
    //                 }
    //                 setImageInfos({src, width: widthImage, height: heightImage});
    //                 // console.log(`Width: ${width}, Height: ${height}`);
    //             }
    //             img.src = src;
    //         }
    //     } else {
    //         setImageInfos({src:sem_imagem, width: window.innerWidth, height: window.innerHeight / 1280 * 720});
    //     }
    // }
    const onImagemChange=(e:any)=>{
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onloadend = async () => {
                const arrayBuffer = reader.result instanceof ArrayBuffer ? reader.result : new ArrayBuffer(0);
                const uint8Array = new Uint8Array(arrayBuffer);

                const type = String.fromCharCode(...uint8Array.slice(4, 8));

                // Assinaturas conhecidas para arquivos MP4 (após o 'ftyp')
                const validMp4Signatures = [
                    'isom', 'iso2', 'mp41', 'mp42', 'avc1', 'iso5'
                ];
                
                let fileType:string | null = null;

                if (type === 'ftyp' && validMp4Signatures.includes(String.fromCharCode(...uint8Array.slice(8, 12)))) {
                    fileType = "mp4";
                } else {
                    const signatures = {
                        jpeg: [0xFF, 0xD8, 0xFF],
                        png: [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A],
                        gif: [0x47, 0x49, 0x46],
                    };
            
                    // Verificar assinaturas de tipo MIME
                    for (const [type, signature] of Object.entries(signatures)) {
                        const matchesSignature = signature.every((byte, index) => byte === uint8Array[index]);
                        if (matchesSignature) {
                            fileType = type;
                            break;
                        }
                    }
                }
                if (fileType && ["mp4","jpeg"].includes(fileType)){
                    if (fileType=="mp4"){
                        ffmpeg.current.writeFile(file.name,await fetchFile(file));
                        const output="output."+file.name.split(".").slice(-1);
                        ffmpeg.current.writeFile(output,await fetchFile(file));
                        ffmpeg.current.exec(["-i",file.name,"-t","00:00:15","-c","copy",output]);
                        const data=new Uint8Array(await ffmpeg.current.readFile(output) as ArrayBuffer);
                        await ffmpeg.current.deleteFile(file.name);
                        await ffmpeg.current.deleteFile(output);
                        const videoBlob=new Blob([data.buffer],{ type:"video/"+file.name.split(".").slice(-1) });
                        const videoUrl=URL.createObjectURL(videoBlob);
                        setFileInfos({type:fileType,name:file.name,file:videoBlob,src:videoUrl});
                    } else {
                        const reader2=new FileReader();
                        reader2.onloadend=()=>{
                            if (typeof reader2.result=="string"){
                                setFileInfos({type:fileType,name:file.name,file:file,src:reader2.result});
                            } else {
                                setFileInfos({type:"jpeg",name:"Upload",src:sem_imagem});
                            }
                        }
                        reader2.readAsDataURL(file);
                    }
                } else {
                    setFileInfos({type:"jpeg",name:"Upload",src:sem_imagem});
                    // setDimensions(null,"");
                    e.target.value="";
                    showError();
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }
    const VerifyUpload=(p:any)=>{
        const pct = Math.round((p.loaded * 100) / p.total)==100 ? 99 : Math.round((p.loaded * 100) / p.total);
        setIsUploading(true);
        setPorcentagem(pct);
    }
    const Cadastrar=async (e:any)=>{
        e.preventDefault();
        var fd=new FormData();
        var titulo=refs.titulo.current!.value;
        var file_data=fileInfos.file!;
        var original_format:boolean=JSON.parse(refs.original_format.current!.value);
        titulo!="" && fd.append("titulo",titulo);
        file_data && fd.append("file",file_data);
        original_format && fd.append("original_format",original_format.toString());
        fd.append("type","option");
        fd.append("typeMime",fileInfos.type);
        var result:resultInterface=await auth.post(server+"/admin/24_cadastro",fd,{arquivo:true,porcentagem:VerifyUpload});
        if (result.error){
            globals.redirectError.current(result.error);
        } else {
            if (result.data.result=="true"){
                setIsUploading(false);
                setPorcentagem(0);
                setMessage(true);
                var st=setTimeout(()=>{
                    setMessage(false);
                    clearTimeout(st);
                },2000);
                refs.titulo.current!.value="";
                refs.file.current!.value="";
                refs.original_format.current!.value="true";
                setFileInfos({type:"jpeg",name:"Upload",src:sem_imagem});
                ChangeOriginalFormat();
            }
        }
    };
    const showError=()=>{
        setErrorImage(true);
        const st=setTimeout(()=>{
            setErrorImage(false);
            clearTimeout(st);
        },2000);
    }
    useEffect(()=>{
        globals.setSelected("publicar");
        (async ()=>{
            const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";
            await ffmpeg.current.load({
                coreURL: await toBlobURL(
                    `${baseURL}/ffmpeg-core.js`,
                    "text/javascript"
                ),
                wasmURL: await toBlobURL(
                    `${baseURL}/ffmpeg-core.wasm`,
                    "application/wasm"
                ),
                workerURL: await toBlobURL(
                    `${baseURL}/ffmpeg-core.worker.js`,
                    "text/javascript"
                ),
            });
        })();
    },[]);
    const ChangeOriginalFormat=()=>{
        const values=["rd","of"];
        const value=JSON.parse(refs.original_format.current!.value);
        const image_div=refs.image_element.current!;
        image_div.classList.replace(values[+!value],values[+value]);
    }
    return (
        <div id="pg" className='c24'>
            <div id="dt" className="fechado">
                <Publicar/>
                <div id="msg1">Cadastrar 24 horas</div>
                <form onSubmit={Cadastrar}>
                    <label>Título</label>
                    <input ref={refs.titulo} className="input" id="titulo" placeholder="Insira um título"/>
                    <label>Capa</label>
                    <div className="imagem-div">
                        <div ref={refs.imagem_view} className="imagem-view col-12 col-md-6">
                            {fileInfos.type=="mp4" ? <video ref={refs.image_element as MutableRefObject<HTMLVideoElement>} controls className="of" src={fileInfos.src}></video> : <img ref={refs.image_element as MutableRefObject<HTMLImageElement>} className='of' src={fileInfos.src}/>};
                        </div>
                        <input className="file" ref={refs.file} onChange={onImagemChange} type="file" accept="image/jpg, image/jpeg, video/mp4" required/>
                        <div className="imagem-pt">
                            <div className="imagem" onClick={()=>{refs.file.current!.click()}}>
                                <div className="txt-1">{fileInfos.name}</div>
                            </div>
                            <select defaultValue="true" onChange={ChangeOriginalFormat} ref={refs.original_format} className="original_format">
                                <option value="true">Formato original</option>
                                <option value="false">Redimensionar</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" id="button">Enviar</button>
                </form>
                <div id="uploadd" style={{display:isUploading ? "flex" : "none"}}>
                    <div id="uploadbd">
                        <div id="porcentagem">Enviando:{porcentagem}%</div>
                    </div>
                </div>
                <div id="m" style={{display:message ?"flex" : "none"}}>24 horas cadastrado com sucesso.</div>
                <div id="errorImage" style={{display:errorImage ? "flex" : "none"}}>O tipo do arquivo não corresponde a jpg/jpeg ou mp4. Selecione um arquivo válido.</div>
            </div>
        </div>
    )
}
export default React.memo(Cadastro24);