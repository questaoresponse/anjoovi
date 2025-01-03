import { createRef, memo, useCallback, useEffect, useRef, useState } from "react";
import { useGlobal } from "../../Global.tsx";
import { resultInterface, useAuth } from "../../Auth.js";
import sem_imagem from '../../static/sem-imagem.jpg';
import './MusicasCadastro.scss';
import Publicar from "../Publicar.js";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";

interface postInterface{
    id:number,
    titulo:string,
    imagem:string,
    arquivo:string[],
    privado:boolean
}
function MusicasCadastro(){
    const globals=useGlobal();
    const { server, navigate, cargo }=globals;
    const auth=useAuth();
    const [editState,setEditState]=useState(false);
    const edit=useRef(false);
    const post_edit=useRef<postInterface>();
    const [filename,setFilename]=useState("Upload");
    const [message,setMessage]=useState(false);
    const [isUploading,setIsUploading]=useState(false);
    const [porcentagem,setPorcentagem]=useState(0);
    const [musicas,setMusicas]=useState([{titulo:"",input:createRef<HTMLInputElement>()}]);
    const [isAdd,setIsAdd]=useState(false);
    const [errorImage,setErrorImage]=useState(false);
    const [errorCadastro,setErrorCadastro]=useState(false);
    const [filenamePremium,setFilenamePremium]=useState("Upload");
    const [isPremium,setIsPremium]=useState(((cargo.current.cargo || 0) & 4)==4);
    const [permission,setPermission]=useState(false);
    const ffmpeg = useRef(new FFmpeg());
    const refs={
        permission:useRef<HTMLSelectElement | null>(null),
        titulo:useRef<HTMLInputElement>(null),
        imagem:useRef<HTMLInputElement>(null),
        imagem_view:useRef<HTMLDivElement>(null),
        imagem_premium:useRef<HTMLInputElement>(null),
        imagem_view_premium:useRef<HTMLDivElement>(null),
        image_element_premium:useRef<HTMLImageElement>(null),
    }
    const showErrorCadastro=()=>{
        setErrorCadastro(true);
        const st=setTimeout(()=>{
            setErrorCadastro(false);
            clearTimeout(st);
        },2000);
    }
    const showError=()=>{
        setErrorImage(true);
        const st=setTimeout(()=>{
            setErrorImage(false);
            clearTimeout(st);
        },2000);
    }
    const [imageInfos,setImageInfos]=useState<{src:string,width:string | number,height:string |  number}>({
        src:sem_imagem,
        width:"100%",
        height:"100%",
    });
    const [imageInfosPremium,setImageInfosPremium]=useState<{src:string,width:string | number,height:string |  number}>({
        src:sem_imagem,
        width:"100%",
        height:"100%",
    });
    const setDimensions=(src:any,isPremium:boolean)=>{
        if (typeof src=="string"){
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
                isPremium ? setImageInfosPremium({src, width: widthImage, height: heightImage}) : setImageInfos({src, width: widthImage, height: heightImage});
                // console.log(`Width: ${width}, Height: ${height}`);

                // Aqui você pode atualizar o estado ou fazer algo com as dimensões da imagem
            };
            img.src = src;
        } else {
            isPremium ? setImageInfosPremium({src:sem_imagem, width: window.innerWidth, height: window.innerHeight / 1280 * 720}) : setImageInfos({src:sem_imagem, width: window.innerWidth, height: window.innerHeight / 1280 * 720});
        }
    }
    const onImagemChange=(e:any,isPremium:boolean)=>{
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onloadend = () => {
                const arrayBuffer = reader.result instanceof ArrayBuffer ? reader.result : new ArrayBuffer(0);
                const uint8Array = new Uint8Array(arrayBuffer);
        
                const signatures = {
                jpeg: [0xFF, 0xD8, 0xFF],
                png: [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A],
                gif: [0x47, 0x49, 0x46],
                };
        
                let fileType:string | null = null;
        
                // Verificar assinaturas de tipo MIME
                for (const [type, signature] of Object.entries(signatures)) {
                    const matchesSignature = signature.every((byte, index) => byte === uint8Array[index]);
                    if (matchesSignature) {
                        fileType = type;
                        break;
                    }
                }
                if (fileType && fileType=="jpeg"){
                    isPremium ? setFilenamePremium(file.name) : setFilename(file.name);
                    const reader2=new FileReader();
                    reader2.onloadend=()=>{
                        setDimensions(reader2.result,isPremium);
                    }
                    reader2.readAsDataURL(file);
                } else {
                    setDimensions(null,isPremium);
                    e.target.value="";
                    showError();
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }
    const VerifyUpload=(p:any)=>{
        var pct;
        if (edit.current){
            pct = Math.round((p.loaded * 100) / p.total)==100 ? 99 : Math.round((p.loaded * 100) / p.total);
        } else {
            if (progress.current.executed){
                pct = 50 + (Math.round((p.loaded * 100) / p.total)>=100 ? 49 : Math.round((p.loaded * 100) / p.total / 2));
            } else {
                pct = Math.round(p);
            }
        }
        setIsUploading(true);
        setPorcentagem(pct);
    }
    const finalizeCadastro=(files?:string[])=>{
        var fd=new FormData();
        const imagem_data=refs.imagem.current!.files![0];
        fd.append("type","option");
        edit.current && fd.append("id",post_edit.current!.id.toString());
        imagem_data && fd.append("imagem",imagem_data);
        imagem_data && fd.append("imagens_edit",(true).toString());
        fd.append("titulo",refs.titulo.current!.value);
        files && fd.append("files",JSON.stringify(files));
        auth.post(server+"/admin/musicas_cadastro?type="+(edit.current ? "edit" : "cadastro"),fd,edit.current ? {arquivo:true} : {arquivo:true,porcentagem:VerifyUpload}).then((result)=>{
            if (result.error){
                globals.setRedirectError(result.error);
            } else if (result.data.result=="true"){
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
                progress.current.executed=false;
                setMessage(true);
                var st=setTimeout(()=>{
                    setMessage(false);
                    clearTimeout(st);
                },2000);
                refs.titulo.current!.value="";
                refs.imagem.current!.value="";
                setFilenamePremium("Upload");
                setFilename("Upload");
                setMusicas([{titulo:"",input:createRef()}]);
                setDimensions(null,true);
                setDimensions(null,false);
            }
        });
    }
    const Cadastrar=useCallback(async (e:any)=>{
        e.preventDefault();
        if (!isAdd) showErrorCadastro();
        if (!isAdd) return;
        const musicFiles:{ file:File | Blob, name:string }[]=[];
        var currentMusic=0;
        var currentPercentage:{[key:string]:any}={};
        async function uploadMusic(music:{ file:File | Blob, name:string }){
            const file=music.file;
            const chunkSize = 1024 * 1024; // 1 MB por chunk
            const totalChunks = Math.ceil(file.size / chunkSize);
            // Função para enviar cada chunk
            for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
                const fd = new FormData();
                const start = chunkIndex * chunkSize;
                const end = Math.min((chunkIndex + 1) * chunkSize, file.size);
                const chunk = file.slice(start, end);
                fd.append("totalChunks",totalChunks.toString());
                fd.append("currentChunk",(chunkIndex).toString());
                fd.append("type","chunk");
                fd.append("filename", music.name);
                fd.append('file', chunk, music.name);
                await auth.post(server+"/admin/musicas_cadastro?type=chunk",fd,{arquivo:true});
                currentPercentage[music.name]=(chunkIndex+1)/totalChunks;
                VerifyUpload({loaded:musicFiles.map(v=>currentPercentage[v.name]).reduce((a,b)=>a+b,0) * 100 / musicFiles.length,total:100});
            }
            currentMusic+=1;
            if (currentMusic==musicFiles.length){
                finalizeCadastro(musicFiles.map(music=>music.name));
            }
        }
         setIsUploading(true);
        if (!edit.current){
            for (const musica of musicas){
                const file=musica.input.current!.files![0];
                if (file.type=="audio/x-m4a"){
                    onProgress({ progress:1 });
                    musicFiles.push({file,name:file.name.split(".").slice(0,-1).join(".")+".m4a"});
                } else {
                    const input="input"+file.name.split(".").slice(-1).join(".");
                    await ffmpeg.current.writeFile(input, await fetchFile(file));
                    // Executa o corte para os primeiros 15 segundos
                    await ffmpeg.current.exec(["-i", input,"-vn","-c:a","aac","output.m4a"]);
                    // Lê o arquivo de saída
                    const data = new Uint8Array(await ffmpeg.current.readFile("output.m4a") as ArrayBuffer);
                    await ffmpeg.current.deleteFile(input);
                    await ffmpeg.current.deleteFile("output.m4a");
                    // Cria um URL para o vídeo cortado
                    const videoBlob = new Blob([data.buffer], { type: "audio/m4a" });
                    // const videoUrl = URL.createObjectURL(videoBlob);
                    // window.open(videoUrl,"_blank");
                    musicFiles.push({file:videoBlob,name:file.name.split(".").slice(0,-1).join(".")+".m4a"});
                }
            }
            progress.current.executed=true;
            for (const music of musicFiles){
                currentPercentage[music.name]=0;
                uploadMusic(music);
                  // Enviando chunk via Fetch API
                //   await fetch('/upload', {
                //     method: 'POST',
                //     body: formData,
                //   })
                //     .then((response) => response.json())
                //     .then((data) => {
                //       console.log('Chunk enviado com sucesso!', data);
                //     })
                //     .catch((error) => {
                //       console.error('Erro ao enviar o chunk:', error);
                //     });
            
                  // Limpar FormData após cada chunk
            }
        } else {
            finalizeCadastro();
        }
        // setUploading(true);

        
    },[musicas,isAdd]);
    const onProgress=useCallback(({ progress:progressValue }:{ progress:number }) => {
        if (progress.current.finished==-1){
            progress.current.finished=0;
        }
        const t=50 / progress.current.length;
        VerifyUpload(t * progress.current.finished + progressValue / 1 * t);

        if (progressValue==1 && progress.current.length>progress.current.finished){
            progress.current.finished++;
        }
        if (progress.current.length==progress.current.finished){
            progress.current.finished=-1;
        }
    },[musicas]);
    edit.current=location.pathname=="/admin/musicas_edit";
    const progress=useRef<{length:number,finished:number,executed:boolean}>({length:0,finished:0,executed:false});
    const updateCargo=(cargo:number)=>{
        setIsPremium((cargo & 4)==4);
    }
    const updatePermission=()=>{
        if (isPremium){
            refs.permission.current!.value=post_edit.current!.privado ? "1" : "0";
        }
    }
    useEffect(()=>{
        globals.setSelected("publicar");
        setEditState(edit.current);
        if (edit.current){
            setIsAdd(true);
            auth.post(server+"/admin/musicas_edit"+location.search,{type:"info"}).then((result:resultInterface)=>{
                if ("post_edit" in result.data){
                    refs.imagem.current!.required=false;
                    const post=result.data.post_edit[0];
                    refs.titulo.current!.value=post.titulo;
                    post.arquivo=JSON.parse(post.arquivo);
                    setMusicas(Array.from({length:post.arquivo.length},(_,i)=>{return {titulo:post.arquivo[i].replace(/\.[^/.]+$/, ""),input:createRef<HTMLInputElement>()}}))
                    post.privado=(post.privado & 2)==2;
                    post_edit.current=post;
                    updatePermission();
                    setDimensions(server+"/images/"+encodeURIComponent(post.imagem.slice(2)),true);
                    setDimensions(server+"/images/"+encodeURIComponent(post.imagem),false);
                }
            });
        } else {
            (async ()=>{
                const baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";
                // const baseURL = window.location.href.split("/")[0];
                // ffmpeg.current.on("log", ({ message }) => {
                //     console.log(message);
                // })
                ffmpeg.current.on("progress",onProgress);
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
        }
        cargo.current.addListener(updateCargo);
        return ()=>{
            cargo.current.removeListener(updateCargo);
        }
    },[]);
    useEffect(()=>{
        if (post_edit.current){
            updatePermission();
        }
    },[isPremium]);
    const addListMusic=()=>{
        setIsAdd(false);
        setMusicas((musicas)=>([...musicas,{titulo:"",input:createRef<HTMLInputElement>()}]));
    }
    const filesToAdd=useRef<(number | File)[][]>([]);
    useEffect(()=>{
        if (musicas.length>1){
            for (const file of filesToAdd.current){
                const dataTransfer=new DataTransfer();
                dataTransfer.items.add(file[1] as File);
                musicas[file[0] as number].input.current!.files=dataTransfer.files;
            }
            filesToAdd.current=[];
        }
    },[musicas]);
    const addFile=useCallback((index:any)=>{
        if (!edit.current){
            var musicaAdd=0;
            setMusicas((musicas)=>{
                const length=musicas[index].input.current!.files!.length;
                musicas=musicas.map((musica,i)=>{
                    if (index==i && musica.input.current!.files!.length>0){
                        const length=musica.input.current!.files!.length;
                        musicaAdd+=length;
                        i==musicas.length-1 && musicaAdd==musicas.length+length-1 && setIsAdd(true);
                        return {...musica,titulo:musica.input.current!.files![0].name.replace(/\.[^/.]+$/, "")};
                    } else if (musica.titulo!="" && musica.input.current!.files!.length>0){
                        musicaAdd++;
                        i==musicas.length-1 && musicaAdd==musicas.length && setIsAdd(true);
                    } else if (musica.titulo!="" && musica.input.current!.files!.length==0){
                        setIsAdd(false);
                        return {...musica,titulo:""};
                    }
                    return musica;
                });
                if (length>0){
                    const newMusics=[];
                    filesToAdd.current=[];
                    for (var i=1; i<length;i++){
                        const musica={titulo:musicas[index].input.current!.files![i].name.replace(/\.[^/.]+$/, ""),input:createRef<HTMLInputElement>()};
                        filesToAdd.current.push([index+i,musicas[index].input.current!.files![i]]);
                        newMusics.push(musica);
                    }
                    musicas.splice(index+1,0,...newMusics);
                }
                progress.current.length=musicas.length;
                return musicas;
            });
        }
    },[musicas]);
    const addimagem=useCallback((index:any)=>{
        if (!edit.current){
            musicas[index].input.current!.click();
        }
    },[musicas]);
    const removeimagem=(index:number)=>{
        if (index>0 && !edit.current){
            setMusicas((musicas)=>{
                if (musicas.length>1){
                    musicas.splice(index,1);
                    setIsAdd(true);
                }
                progress.current.length=musicas.length;
                return [...musicas];
            })
        }
    };
    const ChangePermission=(e:any)=>{
        setPermission(e.target.value=="1");
    }
    return (
        // <div id="pg" className="mc">
        <div id="pg" className="mc">
            <div id="dt" className="fechado">
            <Publicar/>
            <div id="msg1">Cadastrar música</div>
                <form onSubmit={Cadastrar}>
                    {isPremium ? <>
                            <label>Disponível:</label>
                            <select onChange={ChangePermission} ref={refs.permission} id="permission" defaultValue="0">
                                <option value="0">Público</option>
                                <option value="1">Premium</option>
                            </select>
                        </> : <></>}
                    <label>Título</label>
                    <input ref={refs.titulo} className="input" id="titulo" placeholder="Insira um título" required/>
                    <label>Música</label>
                    <div className={"list-music"+(editState ? " edit" : "")}>
                        {musicas.map((musica,index)=>{
                            // const input_music=useRef();
                            return (
                                <div className={"item-music"+(index==0 ? " first" : "")} key={index}>
                                    <div className="count-music">{index+1}</div>
                                    <div className="title-music">{musica.titulo}</div>
                                    <input onChange={()=>{addFile(index)}} ref={musica.input} className="input-music" type="file" accept="audio/*" multiple={true}></input>
                                    <div onClick={()=>{addimagem(index)}} className="add-music">+</div>
                                    <div onClick={()=>{removeimagem(index)}} className="remove-music">-</div>
                                </div>
                            )
                        })}
                    </div>
                    <div style={{display:isAdd ? "block" : "none"}} id="add-list-music" onClick={addListMusic}>Adicionar</div>
                    <label>Capa</label>
                    <div className="imagem-div">
                        <div ref={refs.imagem_view} className="imagem-view">
                            <img  className="col-12 col-md-6" style={{width:imageInfos.width,height:imageInfos.height}} src={imageInfos.src}/>
                        </div>
                        <input className="file" ref={refs.imagem} onChange={(e)=>onImagemChange(e,false)} type="file" accept="image/jpg, image/jpeg" required/>
                        <div className="imagem-pt">
                            <div className="imagem" onClick={()=>{refs.imagem.current!.click()}}>
                                <div className="txt-1">{filename}</div>
                            </div>
                        </div>
                    </div>
                    {permission ? <>
                        <label>Capa</label>
                        <div className="imagem-div">
                            <div ref={refs.imagem_view_premium} className="imagem-view">
                                <img  className="col-12 col-md-6" style={{width:imageInfosPremium.width,height:imageInfosPremium.height}} src={imageInfosPremium.src}/>
                            </div>
                            <input className="file" ref={refs.imagem_premium} onChange={(e)=>onImagemChange(e,true)} type="file" accept="image/jpg, image/jpeg" required/>
                            <div className="imagem-pt">
                                <div className="imagem" onClick={()=>{refs.imagem_premium.current!.click()}}>
                                    <div className="txt-1">{filenamePremium}</div>
                                </div>
                            </div>
                        </div>
                        </> : <></>}
                    <button type="submit" id="button">Enviar</button>
                </form>
                <div id="uploadd" style={{display:isUploading ? "flex" : "none"}}>
                    <div id="uploadbd">
                        <div id="porcentagem">Enviando:{porcentagem}%</div>
                    </div>
                </div>
                <div id="m" style={{display:message ? "flex" :"none"}}>{ edit.current ? "Música alterada com sucesso." : "Música cadastrada com sucesso."}</div>
                <div id="errorImage" style={{display:errorImage ? "flex" : "none"}}>O tipo da imagem não corresponde a jpg/jpeg. Selecione uma imagem válida.</div>
                <div id="errorCadastro" style={{display:errorCadastro ? "flex" : "none"}}>Adicione um arquivo de audio em todos os campos de música.</div>
            </div>
        </div>
            // </div>
    )
}
export default memo(MusicasCadastro);
