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
    imagem:string
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
    const server=globals.server;
    const auth=useAuth();
    const navigate=useNavigate();
    const refs={
        titulo:useRef<HTMLInputElement>(null),
        subtitulo:useRef<HTMLInputElement>(null),
        textarea:useRef<HTMLTextAreaElement>(null),
        imagem:useRef<HTMLInputElement>(null),
        original_format:useRef<HTMLSelectElement>(null),
        imagem_view:useRef<HTMLDivElement>(null),
        image_element:useRef<HTMLImageElement>(null)
    }
    const location=useLocation();
    const [filename,setFilename]=useState("Upload");
    const [message,setMessage]=useState(false);
    const [errorImage,setErrorImage]=useState(false);
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
    const setDimensions=(src:any)=>{
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
                setImageInfos({src, width: widthImage, height: heightImage});
                // console.log(`Width: ${width}, Height: ${height}`);

                // Aqui você pode atualizar o estado ou fazer algo com as dimensões da imagem
            };
            img.src = src;
        } else {
            setImageInfos({src:sem_imagem, width: window.innerWidth, height: window.innerHeight / 1280 * 720});
        }
    }
    const onImagemChange=(e:any)=>{
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
                    setFilename(file.name);
                    const reader2=new FileReader();
                    reader2.onloadend=()=>{
                        setDimensions(reader2.result);
                    }
                    reader2.readAsDataURL(file);
                } else {
                    setDimensions(null);
                    e.target.value="";
                    showError();
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }
    edit.current=location.pathname=="/admin/noticias_edit";
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
                    post_edit.current=post;
                    setDimensions(server+"/images/"+encodeURIComponent(post.imagem));
                }
            });
        }
    },[]);
    const Cadastrar=async (e:any)=>{
        e.preventDefault();
        var fd=new FormData();
        var titulo=refs.titulo.current!.value;
        var subtitulo=refs.subtitulo.current!.value;
        var original_format:boolean=JSON.parse(refs.original_format.current!.value);
        var imagem_data=refs.imagem.current!.files!.length>0 ? refs.imagem.current!.files![0] : null;
        fd.append("type","option");
        edit.current && fd.append("id",post_edit.current!.id.toString());
        imagem_data && fd.append("imagem",imagem_data);
        imagem_data && fd.append("imagens_edit",(true).toString());
        fd.append("usuario",globals.login.usuario!);
        fd.append("titulo",titulo);
        subtitulo!="" && fd.append("subtitulo", subtitulo);
        original_format && fd.append("original_format",original_format.toString());
        auth.post(server+"/admin/noticias_cadastro?type="+(edit.current ? "edit" : "cadastro"),fd,{arquivo:true}).then((result)=>{
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
                    setDimensions(null);
                }
            }
        })
    }
    const ChangeOriginalFormat=()=>{
        const values=["rd","of"];
        const value=JSON.parse(refs.original_format.current!.value);
        const image_div=refs.image_element.current!;
        image_div.classList.replace(values[+!value],values[+value]);
    }
    return (
        <div id="pg" className="nc">
            <div id="dt" className="fechado">
                <Publicar/>
                <div id="msg1">Cadastrar matéria</div>
                <form onSubmit={Cadastrar}>
                    <label>Título</label>
                    <input ref={refs.titulo} className="input" id="titulo" placeholder="Insira um título" required/>
                    <label>Subtítulo</label>
                    <input ref={refs.subtitulo} className="input" id="subtitulo" placeholder="Insira um subtítulo"/>
                    <label>Texto</label>
                    <textarea ref={refs.textarea}></textarea>
                    <label>Capa</label>
                    <div id="imagem-div">
                        <div ref={refs.imagem_view} id="imagem-view" className="col-12 col-md-6">
                            <img ref={refs.image_element} className="of" src={imageInfos.src}/>
                        </div>
                        <input className="file" ref={refs.imagem} onChange={onImagemChange} type="file" accept="image/jpg, image/jpeg" required/>
                        <div id="imagem-pt">
                            <div id="imagem" onClick={()=>{refs.imagem.current!.click()}}>
                                <div className="txt-1">{filename}</div>
                            </div>
                            <select defaultValue="true" onChange={ChangeOriginalFormat} ref={refs.original_format} id="original_format">
                                <option value="true">Formato original</option>
                                <option value="false">Redimensionar</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" id="button">Enviar</button>
                </form>
            </div>
            <div id="m" style={{display:message ? "flex" :"none"}}>{ edit.current ? "Matéria alterada com sucesso." : "Matéria cadastrada com sucesso."}</div>
            <div id="errorImage" style={{display:errorImage ? "flex" : "none"}}>O tipo da imagem não corresponde a jpg/jpeg. Selecione uma imagem válida.</div>
        </div>
    )
}
export default NoticiasCadastro;