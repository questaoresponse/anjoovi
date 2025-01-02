import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGlobal } from "../../Global.tsx";
import { resultInterface, useAuth } from "../../Auth.jsx";
import './ProductsCadastro.scss';
import sem_imagem from '../../static/sem-imagem.jpg';
import Publicar from "../Publicar.jsx";
interface postInterface{
    id:number,
    titulo:string,
    descricao:string,
    imagem:string
}
declare module './ProductsCadastro.tsx' {
    interface resultInterface{
        data:{post_edit:postInterface},
    }
}
function ProductsCadastro(){
    const edit=useRef(false);
    const post_edit=useRef<postInterface>();
    const globals=useGlobal();
    const { server,navigate }=globals;
    const auth=useAuth();
    const refs={
        descricao:useRef<HTMLTextAreaElement>(null),
        imagem:useRef<HTMLInputElement>(null),
        imagem_view:useRef<HTMLDivElement>(null),
        image_element:useRef<HTMLImageElement>(null),
        original_format:useRef<HTMLSelectElement>(null)
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
    const [imageSrc,setImageSrc]=useState(sem_imagem);
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
                        if (typeof reader2.result=="string"){
                            setImageSrc(reader2.result);
                        } else {
                            setImageSrc(sem_imagem);
                        }
                    }
                    reader2.readAsDataURL(file);
                } else {
                    setImageSrc(sem_imagem);
                    e.target.value="";
                    showError();
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }
    useEffect(()=>{
        edit.current=location.pathname=="/admin/imagens_edit";
        globals.setSelected("publicar");
        if (edit.current){
            auth.post(server+"/admin/imagens_edit"+location.search,{type:"info"}).then((result:resultInterface)=>{
                refs.imagem.current!.required=false;
                const post=result.data.post_edit;
                refs.descricao.current!.value=post.descricao;
                post_edit.current=post;
                setImageSrc(server+"/images/"+encodeURIComponent(post.imagem));
            });
        }
    },[]);
    const Cadastrar=async (e:any)=>{
        e.preventDefault();
        var fd=new FormData();
        var descricao=refs.descricao.current!.value;
        var imagem_data=refs.imagem.current!.files!.length>0 ? refs.imagem.current!.files![0] : null;
        var original_format=JSON.parse(refs.original_format.current!.value);
        fd.append("type","option");
        edit.current && fd.append("id",post_edit.current!.id.toString());
        imagem_data && fd.append("imagem",imagem_data);
        imagem_data && fd.append("imagens_edit",(true).toString());
        descricao!="" && fd.append("descricao",descricao);
        original_format && fd.append("original_format",original_format.toString());
        auth.post(server+"/admin/products_cadastro?type="+(edit.current ? "edit" : "cadastro"),fd,{arquivo:true}).then((result)=>{
            if (result.error){
                globals.setRedirectError(result.error);
            } else {
                if (result.data.result=="true"){
                    if (edit.current){
                        const params=new URLSearchParams(location.search);
                        if (params.has("origin")){
                            navigate!(decodeURIComponent(params.get("origin")!));
                        } else {
                            const pathname=location.pathname.split("_");
                            navigate!(pathname[0]+"_lista");
                        }
                        edit.current=false;
                        post_edit.current=undefined;
                    }
                    setMessage(true);
                    var st=setTimeout(()=>{
                        setMessage(false);
                        clearInterval(st);
                    },2000);
                    refs.descricao.current!.value="";
                    refs.imagem.current!.value="";
                    refs.original_format.current!.value="true";
                    setImageSrc(sem_imagem);
                    ChangeOriginalFormat();
                    setFilename("Upload");
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
        <div id="pg" className="pdc">
            <div id="dt" className="fechado">
            <Publicar/>
            <div id="msg1">Cadastrar produto</div>
            <form onSubmit={Cadastrar}>
                <label>Descrição</label>
                <textarea ref={refs.descricao}></textarea>
                <label>Capa</label>
                <div className="imagem-div">
                    <div ref={refs.imagem_view} className="imagem-view col-12 col-md-6">
                        <img ref={refs.image_element} className="of" src={imageSrc}/>
                    </div>
                    <input className="file" ref={refs.imagem} onChange={onImagemChange} type="file" accept="image/jpg, image/jpeg" required/>
                    <div className="imagem-pt">
                        <div className="imagem" onClick={()=>{refs.imagem.current!.click()}}>
                            <div className="txt-1">{filename}</div>
                        </div>
                        <select defaultValue="true" onChange={ChangeOriginalFormat} ref={refs.original_format} className="original_format">
                            <option value="true">Formato original</option>
                            <option value="false">Redimensionar</option>
                        </select>
                    </div>
                </div>
                <button type="submit" id="button">Enviar</button>
            </form>
            </div>
            <div id="m" style={{display:message ? "flex" :"none"}}>{ edit.current ? "Produto alterado com sucesso." : "Produto cadastrado com sucesso."}</div>
            <div id="errorImage" style={{display:errorImage ? "flex" : "none"}}>O tipo da imagem não corresponde a jpg/jpeg. Selecione uma imagem válida.</div>
        </div>
    )
}
export default ProductsCadastro;