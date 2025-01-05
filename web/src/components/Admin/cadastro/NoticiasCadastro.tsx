import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGlobal } from "../../Global.tsx";
import { resultInterface, useAuth } from "../../Auth.jsx";
import './NoticiasCadastro.scss';
import '../../../d.ts';
import sem_imagem from "../../static/sem-imagem.jpg";
import Publicar from "./../Publicar.jsx";

interface postInterface{
    id:number,
    titulo:string,
    subtitulo:string,
    texto:string,
    imagem:string,
    privado:boolean
}
declare module './NoticiasCadastro.tsx' {
    interface resultInterface{
        data:{post_edit:postInterface},
    }
}
function NoticiasCadastro(){
    const edit=useRef(false);
    const post_edit=useRef<postInterface>();
    const globals=useGlobal();
    const { server, cargo }=globals;
    const auth=useAuth();
    const navigate=useNavigate();
    const refs={
        permission:useRef<HTMLSelectElement | null>(null),
        titulo:useRef<HTMLInputElement>(null),
        subtitulo:useRef<HTMLInputElement>(null),
        textarea:useRef<HTMLTextAreaElement>(null),
        imagem:useRef<HTMLInputElement>(null),
        original_format:useRef<HTMLSelectElement>(null),
        imagem_view:useRef<HTMLDivElement>(null),
        image_element:useRef<HTMLImageElement>(null),
        imagem_premium:useRef<HTMLInputElement>(null),
        original_format_premium:useRef<HTMLSelectElement>(null),
        imagem_view_premium:useRef<HTMLDivElement>(null),
        image_element_premium:useRef<HTMLImageElement>(null),
    }
    const location=useLocation();
    const [filename,setFilename]=useState("Upload");
    const [message,setMessage]=useState(false);
    const [errorImage,setErrorImage]=useState(false);
    const [filenamePremium,setFilenamePremium]=useState("Upload");
    const [isPremium,setIsPremium]=useState(((cargo.current.cargo || 0) & 4)==4);
    const [permission,setPermission]=useState(false);
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
    edit.current=location.pathname=="/admin/noticias_edit";
    const updateCargo=(cargo:number)=>{
        setIsPremium((cargo & 4)==4);
    }
    const updatePermission=()=>{
        if (isPremium){
            refs.permission.current!.value=post_edit.current!.privado ? "1" : "0";
            setPermission(true);
        }
    }
    useEffect(()=>{
        globals.setSelected("publicar");
        if (edit.current){
            auth.post(server+"/admin/noticias_edit"+location.search,{type:"info"}).then((result:resultInterface)=>{
                if ("post_edit" in result.data){
                    refs.imagem.current!.required=false;
                    const post=result.data.post_edit[0];
                    refs.titulo.current!.value=post.titulo;
                    refs.subtitulo.current!.value=post.subtitulo;
                    refs.textarea.current!.value=post.texto;
                    post.privado=(post.privado & 2)==2;
                    post_edit.current=post;
                    updatePermission();
                    post.privado && setDimensions(server+"/images/"+encodeURIComponent(post.imagem),true);
                    setDimensions(server+"/images/"+encodeURIComponent(post.imagem),false);
                }
            });
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
    const Cadastrar=async (e:any)=>{
        e.preventDefault();
        var fd=new FormData();
        var titulo=refs.titulo.current!.value;
        var subtitulo=refs.subtitulo.current!.value;
        var original_format:boolean=JSON.parse(refs.original_format.current!.value);
        var original_format_d:boolean=refs.original_format_premium.current ? JSON.parse(refs.original_format_premium.current!.value) : null;
        var imagem_data=refs.imagem.current!.files!.length>0 ? refs.imagem.current!.files![0] : null;
        var imagem_data_d=refs.imagem_premium && refs.imagem_premium.current!.files!.length>0 ? refs.imagem_premium.current!.files![0] : null;
        fd.append("type","option");
        edit.current && fd.append("id",post_edit.current!.id.toString());
        imagem_data && fd.append("imagem",imagem_data);
        imagem_data_d && fd.append("dImagem",imagem_data_d);
        (imagem_data || imagem_data_d) && fd.append("imagens_edit",(true).toString());
        refs.permission.current && fd.append("permission",refs.permission.current.value);
        fd.append("usuario",globals.login.usuario!);
        fd.append("titulo",titulo);
        subtitulo!="" && fd.append("subtitulo", subtitulo);
        original_format && fd.append("original_format",original_format.toString());
        original_format_d && fd.append("original_format",original_format_d.toString());
        auth.post(server+"/admin/noticias_cadastro?type="+(edit.current ? "edit" : "cadastro"),fd,{arquivo:true}).then((result)=>{
            if (result.error){
                globals.redirectError.current(result.error);
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
                    setMessage(true);
                    var st=setTimeout(()=>{
                        setMessage(false);
                        clearInterval(st);
                    },2000);
                    refs.titulo.current!.value="";
                    refs.subtitulo.current!.value="";
                    refs.textarea.current!.value="";
                    refs.imagem.current!.value="";
                    refs.original_format.current!.value="true";
                    setFilename("Upload");
                    setDimensions(null,true);
                    setDimensions(null,false);
                }
            }
        })
    }
    const ChangePermission=(e:any)=>{
        setPermission(e.target.value=="1");
    }
    const ChangeOriginalFormat=(isPremium:boolean)=>{
        const values=["rd","of"];
        if (isPremium){
            const value=JSON.parse(refs.original_format_premium.current!.value);
            refs.image_element_premium.current!.classList.replace(values[+!value],values[+value]);
        } else {
            const value=JSON.parse(refs.original_format.current!.value);
            refs.image_element.current!.classList.replace(values[+!value],values[+value]);
        }
    }
    return (
        <div id="pg" className="nc">
            <div id="dt" className="fechado">
                <Publicar/>
                <div id="msg1">Cadastrar matéria</div>
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
                    <label>Subtítulo</label>
                    <input ref={refs.subtitulo} className="input" id="subtitulo" placeholder="Insira um subtítulo"/>
                    <label>Texto</label>
                    <textarea ref={refs.textarea}></textarea>
                    <label>Capa</label>
                    <div className="imagem-div">
                        <div ref={refs.imagem_view} className="imagem-view col-12 col-md-6">
                            <img ref={refs.image_element} className="of" src={imageInfos.src}/>
                        </div>
                        <input className="file" ref={refs.imagem} onChange={(e)=>onImagemChange(e,false)} type="file" accept="image/jpg, image/jpeg" required/>
                        <div className="imagem-pt">
                            <div className="imagem" onClick={()=>{refs.imagem.current!.click()}}>
                                <div className="txt-1">{filename}</div>
                            </div>
                            <select defaultValue="true" onChange={()=>ChangeOriginalFormat(false)} ref={refs.original_format} className="original_format">
                                <option value="true">Formato original</option>
                                <option value="false">Redimensionar</option>
                            </select>
                        </div>
                    </div>
                    {permission ? <>
                        <label>Capa</label>
                        <div className="imagem-div">
                            <div ref={refs.imagem_view_premium} id="" className="imagem-view col-12 col-md-6">
                                <img ref={refs.image_element_premium} className="of" src={imageInfosPremium.src}/>
                            </div>
                            <input className="file" ref={refs.imagem_premium} onChange={(e)=>onImagemChange(e,true)} type="file" accept="image/jpg, image/jpeg" required/>
                            <div className="imagem-pt">
                                <div className="imagem" onClick={()=>{refs.imagem_premium.current!.click()}}>
                                    <div className="txt-1">{filenamePremium}</div>
                                </div>
                                <select defaultValue="true" onChange={()=>ChangeOriginalFormat(true)} ref={refs.original_format_premium} className="original_format">
                                    <option value="true">Formato original</option>
                                    <option value="false">Redimensionar</option>
                                </select>
                            </div>
                        </div>
                    </> : <></>}
                    <button type="submit" id="button">Enviar</button>
                </form>
            </div>
            <div id="m" style={{display:message ? "flex" :"none"}}>{ edit.current ? "Matéria alterada com sucesso." : "Matéria cadastrada com sucesso."}</div>
            <div id="errorImage" style={{display:errorImage ? "flex" : "none"}}>O tipo da imagem não corresponde a jpg/jpeg. Selecione uma imagem válida.</div>
        </div>
    )
}
export default NoticiasCadastro;