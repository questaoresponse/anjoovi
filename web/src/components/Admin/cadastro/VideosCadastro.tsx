import React, { useEffect, useRef, useState} from 'react';
import { useGlobal } from '../../Global.tsx';
import { resultInterface, useAuth } from '../../Auth.tsx';
import './VideosCadastro.scss';
import sem_imagem from '../../static/sem-imagem.jpg';
import Publicar from "../Publicar.tsx";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";

interface postInterface{
    id:number,
    titulo:string,
    subtitulo:string,
    texto:string,
    imagem:string
}
function VideosCadastro(){
    const globals=useGlobal();
    const { server, navigate }=globals;
    const auth=useAuth();
    const edit=useRef(false);
    const post_edit=useRef<postInterface>();
    const refs={
        titulo:useRef<HTMLTextAreaElement>(null),
        original_format:useRef<HTMLSelectElement>(null),
        video_input:useRef<HTMLInputElement>(null),
        video_view:useRef<HTMLDivElement>(null),
        file:useRef<HTMLInputElement>(null),
        imagem_view:useRef<HTMLDivElement>(null),
        image_element:useRef<HTMLImageElement>(null),
    }
    const [message,setMessage]=useState(false);
    const [errorImage,setErrorImage]=useState(false);
    const [videoInfos,setVideoInfos]=useState<{isFile:boolean,file?:File | Blob,name:string,src:string,width:string | number,height:string | number}>({
        isFile:false,
        name:"",
        src:sem_imagem,
        width:"100%",
        height:"100%",
    });
    const frameImage=useRef<{file:Blob,name:string,src:string,width:string | number,height:string | number} | null>();
    const [imageInfos,setImageInfos]=useState<{isFile:boolean,isVideoFrame:boolean,file?:File | Blob,name:string,src:string,width:string | number,height:string | number}>({
        isFile:false,
        isVideoFrame:false,
        name:"",
        src:sem_imagem,
        width:"100%",
        height:"100%",
    });
    const [isUploading,setIsUploading]=useState(false);
    const [porcentagem,setPorcentagem]=useState(0);
    const ffmpeg = useRef(new FFmpeg());

    const setDimensions=(videoOptions?:{file?:Blob,name:string,url:string},frameOptions?:{file:Blob,name:string,url:string},imageOptions?:{file?:File | Blob,name:string,url:string})=>{
        if (videoOptions){
            const video = document.createElement("video");
            video.onloadedmetadata = () => {
                const width=refs.video_view.current!.offsetWidth;
                const height=refs.video_view.current!.offsetHeight;
                var widthImage = video.videoWidth;
                var heightImage = video.videoHeight;
                if (width / widthImage * heightImage>height){
                    widthImage=height / heightImage * widthImage;
                    heightImage=height;
                } else {
                    heightImage=height;
                    widthImage=width;
                }
                setVideoInfos({ isFile:true, file:videoOptions.file, name:videoOptions.name, src:videoOptions.url, width: widthImage, height: heightImage});
            }
                // console.log(`Width: ${width}, Height: ${height}`);
            video.src = videoOptions.url;
        }
        if (frameOptions){
            const img = new Image();
            img.onload = () => {
                const width=refs.imagem_view.current!.offsetWidth;
                const height=refs.imagem_view.current!.offsetHeight;
                var widthImage = img.width;
                var heightImage = img.height;
                if (width / widthImage * heightImage>height){
                    widthImage=height / heightImage * widthImage;
                    heightImage=height;
                } else {
                    heightImage=width / widthImage * heightImage;
                    widthImage=width;
                }
                frameImage.current={ file:frameOptions.file, name: frameOptions.name, src:frameOptions.url, width:widthImage, height: heightImage };
                setImageInfos((imageInfos)=>{
                    if (imageInfos.isFile && !imageInfos.isVideoFrame){
                        return imageInfos;
                    };
                    return { isFile:true, isVideoFrame:true, file:frameOptions.file, name:frameOptions.name, src:frameOptions.url, width: widthImage, height: heightImage }
                });
                // console.log(`Width: ${width}, Height: ${height}`);
            }
            img.src = frameOptions.url;
        }
        if (imageOptions && !frameOptions){
            const img = new Image();
            img.onload = () => {
                const width=refs.imagem_view.current!.offsetWidth;
                const height=refs.imagem_view.current!.offsetHeight;
                var widthImage = img.width;
                var heightImage = img.height;
                if (width / widthImage * heightImage>height){
                    widthImage=height / heightImage * widthImage;
                    heightImage=height;
                } else {
                    heightImage=width / widthImage * heightImage;
                    widthImage=width;
                }
                setImageInfos({ isFile:true, isVideoFrame:false, file:imageOptions.file, name:imageOptions.name, src:imageOptions.url, width: widthImage, height: heightImage });
                // console.log(`Width: ${width}, Height: ${height}`);
            }
            img.src = imageOptions.url;
        }
    }
    const resetDimensions=()=>{
        setVideoInfos({ isFile:false, name:"", src:sem_imagem, width:"100%", height:"100%" });
        frameImage.current=null;
        setImageInfos({ isFile:false ,isVideoFrame:false, name:"", src:sem_imagem, width:"100%", height:"100%" });
    }
    const onImagemChange=(e:any)=>{
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onloadend = () => {
                const arrayBuffer = reader.result instanceof ArrayBuffer ? reader.result : new ArrayBuffer(0);
                const uint8Array = new Uint8Array(arrayBuffer);
                let fileType:string | null = null;
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
                if (fileType=="jpeg"){
                    const reader2=new FileReader();
                    reader2.onloadend=()=>{
                        setDimensions(undefined,undefined,{ file, name:file.name, url:reader2.result as string });
                    }
                    reader2.readAsDataURL(file);
                } else {
                    setImageInfos(()=>{
                        if (frameImage.current){
                            return { isFile: true, isVideoFrame:true, file:frameImage.current.file, name:frameImage.current.name, src: frameImage.current.src, width: frameImage.current.width, height:frameImage.current.height };
                        }
                        return { isFile: false, isVideoFrame:false, name:"", src:sem_imagem, width:"100%", height:"100%" };
                    });
                    e.target.value="";
                    showError();
                }
            }
            reader.readAsArrayBuffer(file);
        } else {
            setImageInfos(()=>{
                if (frameImage.current){
                    return { isFile: true, isVideoFrame:true, file:frameImage.current.file, name:frameImage.current.name, src: frameImage.current.src, width: frameImage.current.width, height:frameImage.current.height };
                }
                return { isFile: false, isVideoFrame:false, name:"", src:sem_imagem, width:"100%", height:"100%" };
            });
        }
    }
    const onChangeVideo=(e:any)=>{
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
                

                if (type === 'ftyp' && validMp4Signatures.includes(String.fromCharCode(...uint8Array.slice(8, 12)))) {
                    ffmpeg.current.writeFile(file.name,await fetchFile(file));
                    const output="output."+file.name.split(".").slice(-1);
                    ffmpeg.current.exec(["-i",file.name,"-t","00:01:00","-c","copy",output]);
                    ffmpeg.current.exec(['-i', file.name,'-vf', 'select=eq(n\\,0)','-q:v', '3','-frames:v', '1','output.jpg']);
                 
                    const data=new Uint8Array(await ffmpeg.current.readFile(output) as ArrayBuffer);
                    const fileData=new Uint8Array(await ffmpeg.current.readFile("output.jpg") as ArrayBuffer);
                    await ffmpeg.current.deleteFile(file.name);
                    await ffmpeg.current.deleteFile(output);
                    await ffmpeg.current.deleteFile("output.jpg");
                    const videoBlob=new Blob([data.buffer],{ type:"video/"+file.name.split(".").slice(-1) });
                    const videoUrl=URL.createObjectURL(videoBlob);
                    const imageBlob=new Blob([fileData.buffer],{ type:"image/jpg" });
                    const imageUrl=URL.createObjectURL(imageBlob);
                    setDimensions({
                        file:videoBlob,
                        name:file.name,
                        url:videoUrl,
                    },
                    {
                        file:imageBlob,
                        name:file.name,
                        url:imageUrl
                    });
                } else {
                    setVideoInfos({ isFile:false, name:"", src:sem_imagem, width:"100%", height:"100%" });
                    frameImage.current=null;
                    setImageInfos((imageInfos)=>{ 
                        if (imageInfos.isVideoFrame){
                            return {isFile:false, isVideoFrame:false, name:"", src:sem_imagem, width:"100%", height:"100%" };
                        };
                        return imageInfos;
                    });
                    e.target.value="";
                    showError();
                }
            }
            reader.readAsArrayBuffer(file);
        } else {
            setVideoInfos({ isFile:false, name:"", src:sem_imagem, width:"100%", height:"100%" });
            frameImage.current=null;
            setImageInfos((imageInfos)=>{ 
                if (imageInfos.isVideoFrame){
                    return {isFile:false, isVideoFrame:false, name:"", src:sem_imagem, width:"100%", height:"100%" };
                };
                return imageInfos;
            });
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
        const titulo=refs.titulo.current!.value;
        const video_file=videoInfos.file!;
        const imagem_file=imageInfos.file;
        const original_format:boolean=JSON.parse(refs.original_format.current!.value);
        fd.append("type","option");
        edit.current && fd.append("id",post_edit.current!.id.toString());
        imagem_file && fd.append("imagem",imagem_file,imageInfos.name);
        imagem_file && fd.append("imagens_edit",(true).toString());
        fd.append("titulo",titulo);
        if (!edit.current){
            fd.append("video",video_file,videoInfos.name);
            setIsUploading(true);
        }
        original_format && fd.append("original_format",original_format.toString());
        var result:resultInterface=await auth.post(server+"/admin/videos_cadastro?type="+(edit.current ? "edit" : "cadastro"),fd,edit.current ? {arquivo:true} : {arquivo:true,porcentagem:VerifyUpload});
        if (result.error){
            globals.setRedirectError(result.error);
        } else {
            if (result.data.result=="true"){
                if (edit.current){
                    const params=new URLSearchParams(location.search);
                    if (params.has("origin")){
                            navigate(decodeURIComponent(params.get("origin")!));
                    } else {
                        const pathname=location.pathname.split("_");
                        navigate(pathname[0]+"_lista");
                    };
                    edit.current=false;
                    post_edit.current=undefined;
                }
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
                resetDimensions();
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
    // const onResize=()=>{
        // const tituloWidth=refs.titulo.current!.getBoundingClientRect().width;
        // refs.video_view.current!.style.height=(tituloWidth / 1280 * 720)+"px";
        // if (globals.mobile){
        //     refs.imagem_view.current!.style.height=(tituloWidth/ 720 * 1280)+"px";
        // } else {
        //     refs.imagem_view.current!.style.height=(window.innerHeight * 0.3)+"px";
        // }
    // };
    edit.current=location.pathname=="/admin/videos_edit";
    useEffect(()=>{
        globals.setSelected("publicar");
        if (edit.current){
            auth.post(server+"/admin/videos_edit"+location.search,{type:"info"}).then((result:resultInterface)=>{
                if (result.data.result=="true"){
                    refs.file.current!.required=false;
                    const post=result.data.post_edit[0];
                    post_edit.current=post;
                    refs.titulo.current!.value=post.titulo;
                    setDimensions({
                        name:post.video.split("_").slice(3).join("_"),
                        url:server+"/videos/"+encodeURIComponent(post.video)
                    },
                    undefined,
                    post.imagem ? {
                        name:post.imagem.split("_").slice(3).join("_"),
                        url:server+"/images/"+encodeURIComponent(post.imagem)
                    } : undefined);
                    !post.imagem && setTimeout(async ()=>{
                        const img=await (await fetch(server+"/videos/"+encodeURIComponent(post.video))).arrayBuffer();
                        const name=post.video.split("_").slice(3).join("_");
                        ffmpeg.current.writeFile(name, new Uint8Array(img));
                        ffmpeg.current.exec(['-i', name,'-vf', 'select=eq(n\\,0)','-q:v', '3','-frames:v', '1','output.jpg']);
                     
                        const fileData=new Uint8Array(await ffmpeg.current.readFile("output.jpg") as ArrayBuffer);
                        await ffmpeg.current.deleteFile(name);
                        await ffmpeg.current.deleteFile("output.jpg");
                        const imageBlob=new Blob([fileData.buffer],{ type:"image/jpg" });
                        const imageUrl=URL.createObjectURL(imageBlob);
                        setDimensions(undefined,
                        {
                            file:imageBlob,
                            name:name.split(".").slice(0,-1).join(".")+".jpg",
                            url:imageUrl
                        });
                    },2000);
                }
            });
        }
        // ffmpeg.current.on("log", ({ message }) => {
        //     console.log(message);
        // })
        (async ()=>{
            const baseURL = window.location.href.split("/")[0];
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
            console.log("carregado");
        })();
    },[]);
    const ChangeOriginalFormat=()=>{
        const values=["rd","of"];
        const value=JSON.parse(refs.original_format.current!.value);
        refs.image_element.current!.classList.replace(values[+!value],values[+value]);
    }
    return (
        <div id="pg" className='vc'>
            <div id="dt" className="fechado">
                <Publicar/>
                <div id="msg1">Cadastrar vídeo</div>
                <form onSubmit={Cadastrar}>
                    <label>Título</label>
                    <textarea ref={refs.titulo} className="input" id="titulo"/>
                    <div id="video-div">
                        <label>Video</label>
                        <div ref={refs.video_view} id="video-view">
                            {videoInfos.isFile ? <video style={{width:"100%",height:"100%"}} src={videoInfos.src} controls={true}/> : <img style={{width:"100%",height:"100%"}} src={sem_imagem}/>}
                        </div>
                        <input className="file" ref={refs.video_input} type='file' accept='video/mp4' onChange={onChangeVideo}></input>
                        <div id="video-filename" className={edit.current ? "disabled" : ""} onClick={()=>!edit.current && refs.video_input.current!.click()}>{videoInfos.name=="" ? "Upload" : videoInfos.name}</div>
                    </div>
                    <div id="imagem-div">
                        <label>Capa</label>
                        <div ref={refs.imagem_view} id="imagem-view" className="col-12 col-md-6">
                            <img className='of' ref={refs.image_element} style={{width:imageInfos.width,height:imageInfos.height}} src={imageInfos.src}/>
                        </div>
                        <input className="file" ref={refs.file} onChange={onImagemChange} type="file" accept="image/jpg, image/jpeg"/>
                        <div id="imagem-pt">
                            <div id="imagem" onClick={()=>{refs.file.current!.click()}}>
                                <div className="txt-1">{imageInfos.name=="" ? "Upload" : imageInfos.name}</div>
                            </div>
                            <select defaultValue="true" onChange={ChangeOriginalFormat} ref={refs.original_format} id="original_format">
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
                <div id="m" style={{display:message ?"flex" : "none"}}>{ edit.current ? "Video alterado com sucesso." : "Video cadastrado com sucesso."}</div>
                <div id="errorImage" style={{display:errorImage ? "flex" : "none"}}>O tipo do arquivo não corresponde a jpg/jpeg ou mp4. Selecione um arquivo válido.</div>
            </div>
        </div>
    )
}
export default React.memo(VideosCadastro);