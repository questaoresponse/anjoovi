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
    const [videoName,setVideoName]=useState("Upload");
    const [imageName,setImageName]=useState("Upload");
    const [message,setMessage]=useState(false);
    const [errorImage,setErrorImage]=useState(false);
    const [videoInfos,setVideoInfos]=useState<{file?:File | Blob,name:string,type:string,src:string,width:string | number,height:string | number}>({
        name:"",
        type:"jpeg",
        src:sem_imagem,
        width:"100%",
        height:"100%",
    });
    const [imageInfos,setImageInfos]=useState<{src:string,width:string | number,height:string | number}>({
        src:sem_imagem,
        width:"100%",
        height:"100%",
    });
    const [isUploading,setIsUploading]=useState(false);
    const [porcentagem,setPorcentagem]=useState(0);
    const ffmpeg = useRef(new FFmpeg());

    const setDimensions=(file:File | Blob | undefined=undefined,name:string, src:any,isVideo:boolean,type:any)=>{
        if (typeof src=="string"){
            if (type=="mp4"){
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
                    setVideoInfos({type:"mp4", file, name, src, width: widthImage, height: heightImage});
                }
                    // console.log(`Width: ${width}, Height: ${height}`);
                video.src = src;

                // Aqui você pode atualizar o estado ou fazer algo com as dimensões da imagem
            } else {
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
                    isVideo ? setVideoInfos({ type:"mp4", file, name, src, width: widthImage, height: heightImage }) : setImageInfos({ src, width: widthImage, height: heightImage });
                    // console.log(`Width: ${width}, Height: ${height}`);
                }
                img.src = src;
            }
        }
    }
    const resetDimensions=(video:boolean,image:boolean)=>{
        video && setVideoInfos({type:"jpeg",name:"", src:sem_imagem, width:"100%", height:"100%"});
        image && setImageInfos({src:sem_imagem, width:"100%", height:"100%"});
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
                    setImageName(file.name);
                    const reader2=new FileReader();
                    reader2.onloadend=()=>{
                        setDimensions(file, file.name, reader2.result,false,fileType);
                    }
                    reader2.readAsDataURL(file);
                } else {
                    resetDimensions(false,true);
                    e.target.value="";
                    showError();
                }
            }
            reader.readAsArrayBuffer(file);
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
                
                let fileType:string | null = null;

                if (type === 'ftyp' && validMp4Signatures.includes(String.fromCharCode(...uint8Array.slice(8, 12)))) {
                    ffmpeg.current.writeFile(file.name,await fetchFile(file));
                    const output="output."+file.name.split(".").slice(-1);
                    ffmpeg.current.exec(["-i",file.name,"-t","00:01:00","-c","copy",output]);
                    const data=new Uint8Array(await ffmpeg.current.readFile(output) as ArrayBuffer);
                    await ffmpeg.current.deleteFile(file.name);
                    await ffmpeg.current.deleteFile(output);
                    const videoBlob=new Blob([data.buffer],{ type:"audio/"+file.name.split(".").slice(-1) });
                    const videoUrl=URL.createObjectURL(videoBlob);
                    fileType="mp4";
                    setVideoName(file.name);
                    setDimensions(videoBlob,file.name,videoUrl,true,fileType);
                } else {
                    resetDimensions(true,false);
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
        const titulo=refs.titulo.current!.value;
        const video_file=videoInfos.file!;
        const imagem_data=refs.file.current!.files![0];
        const original_format:boolean=JSON.parse(refs.original_format.current!.value);
        fd.append("type","option");
        edit.current && fd.append("id",post_edit.current!.id.toString());
        imagem_data && fd.append("imagem",imagem_data);
        imagem_data && fd.append("imagens_edit",(true).toString());
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
                setImageName("Upload");
                setVideoName("Upload");
                resetDimensions(true,true);
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
    const onResize=()=>{
        const tituloWidth=refs.titulo.current!.getBoundingClientRect().width;
        refs.video_view.current!.style.height=(tituloWidth / 1280 * 720)+"px";
        if (globals.mobile){
            refs.imagem_view.current!.style.height=(tituloWidth/ 720 * 1280)+"px";
        } else {
            refs.imagem_view.current!.style.height=(window.innerHeight * 0.3)+"px";
        }
    };
    edit.current=location.pathname=="/admin/videos_edit";
    useEffect(()=>{
        onResize();
        globals.setSelected("publicar");
        document.addEventListener("resize",onResize);
        if (edit.current){
            auth.post(server+"/admin/videos_edit"+location.search,{type:"info"}).then((result:resultInterface)=>{
                if (result.data.result=="true"){
                    refs.file.current!.required=false;
                    const post=result.data.post_edit[0];
                    post_edit.current=post;
                    refs.titulo.current!.value=post.titulo;
                    setDimensions(undefined,post.video.split("_").slice(4).join("_"),server+"/videos/"+encodeURIComponent(post.video),true,"mp4");
                    post.imagem && setDimensions(undefined,post.imagem.split("_").slice(4).join("_"),server+"/images/"+encodeURIComponent(post.imagem),false,"jpeg");
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
        return ()=>{
            document.removeEventListener("resize",onResize);
        }
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
                    <label>Video</label>
                    <div id="video-div">
                        <div ref={refs.video_view} id="video-view">
                            {videoInfos.type=="mp4" ? <video style={{width:"100%",height:"100%"}} src={videoInfos.src} controls={true}/> : <img style={{width:videoInfos.width,height:videoInfos.height}} src={videoInfos.src}/>}
                        </div>
                        <input className="file" ref={refs.video_input} type='file' accept='video/mp4' onChange={onChangeVideo}></input>
                        <div id="video-filename" onClick={()=>refs.video_input.current!.click()}>{videoName}</div>
                    </div>
                    <label>Capa</label>
                    <div id="imagem-div">
                        <div ref={refs.imagem_view} id="imagem-view" className="col-12 col-md-6">
                            <img ref={refs.image_element} style={{width:imageInfos.width,height:imageInfos.height}} src={imageInfos.src}/>
                        </div>
                        <input className="file" ref={refs.file} onChange={onImagemChange} type="file" accept="image/jpg, image/jpeg"/>
                        <div id="imagem-pt">
                            <div id="imagem" onClick={()=>{refs.file.current!.click()}}>
                                <div className="txt-1">{imageName}</div>
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