import { createRef, MutableRefObject, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGlobal } from "../../Global.tsx";
import { resultInterface, useAuth } from "../../Auth.jsx";
import './ImagemCadastro.scss';
import sem_imagem from '../../static/sem-imagem.jpg';
import Publicar from "../Publicar.jsx";
interface postInterface{
    id:number,
    titulo:string,
    descricao:string,
    imagem:string,
    privado:boolean
}
declare module './ImagemCadastro.tsx' {
    interface resultInterface{
        data:{post_edit:postInterface},
    }
}
function ImagemCadastro(){
    const edit=useRef(false);
    const post_edit=useRef<postInterface>();
    const globals=useGlobal();
    const { server,navigate, cargo }=globals;
    const auth=useAuth();
    const refs={
        permission:useRef<HTMLSelectElement | null>(null),
        descricao:useRef<HTMLTextAreaElement>(null),
        imagem:useRef<HTMLInputElement>(null),
        imagem_view:useRef<HTMLDivElement>(null),
        imagem_premium:useRef<HTMLInputElement>(null),
        imagem_view_premium:useRef<HTMLDivElement>(null),
    }
    const location=useLocation();
    const [images,setImages]=useState<{filename:string,src:string,resize:boolean,refs:{image:MutableRefObject<HTMLImageElement | null>,resize:MutableRefObject<HTMLSelectElement | null>}}[]>([{filename:"Upload",src:sem_imagem,resize:false,refs:{image:createRef(),resize:createRef()}}]);
    const [imagesPremium,setImagesPremium]=useState<{filename:string,src:string,resize:boolean,refs:{image:MutableRefObject<HTMLImageElement | null>,resize:MutableRefObject<HTMLSelectElement | null>}}[]>([{filename:"Upload",src:sem_imagem,resize:false,refs:{image:createRef(),resize:createRef()}}]);
    const [message,setMessage]=useState(false);
    const [errorImage,setErrorImage]=useState(false);
    const [isPremium,setIsPremium]=useState(((cargo.current.cargo || 0) & 4)==4);
    const [permission,setPermission]=useState(false);
    const showError=()=>{
        setErrorImage(true);
        const st=setTimeout(()=>{
            setErrorImage(false);
            clearTimeout(st);
        },2000);
    }
    const onImagemChange=(e:any,isPremium:boolean,index:number)=>{
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
                    const reader2=new FileReader();
                    reader2.onloadend=()=>{
                        var src="";
                        if (typeof reader2.result=="string"){
                            src=reader2.result;
                        } else {
                            src=sem_imagem;

                        }
                        isPremium ? setImagesPremium(images=>{images[index]={...images[index],filename:file.name,src}; return images}) : setImages(images=>{images[index]={...images[index],filename:file.name,src}; return images});
                    }
                    reader2.readAsDataURL(file);
                } else {
                    isPremium ? setImagesPremium(images=>{images[index]={...images[index],filename:"Upload",src:sem_imagem}; return images}) : setImages(images=>{images[index]={...images[index],filename:"Upload",src:sem_imagem}; return images});
                    e.target.value="";
                    showError();
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }
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
        edit.current=location.pathname=="/admin/imagens_edit";
        globals.setSelected("publicar");
        if (edit.current){
            auth.post(server+"/admin/imagens_edit"+location.search,{type:"info"}).then((result:resultInterface)=>{
                refs.imagem.current!.required=false;
                const post=result.data.post_edit;
                refs.descricao.current!.value=post.descricao;
                post.privado=(post.privado & 2)==2;
                post_edit.current=post;
                updatePermission();
                setImages([{filename:"Image.webp",src:server+"/images/"+encodeURIComponent(post.imagem),resize:post.imagem.slice(0,2) =="r_" || post.imagem.slice(2,4)=="r_",refs:{image:createRef(),resize:createRef()}}]);
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
        var descricao=refs.descricao.current!.value;
        const newImages=[];
        const newImagesPremium=[];
        for (const image of images){
            newImages.push({original_format:!JSON.parse(image.refs.resize.current!.value)});
        }
        for (const imagePremium of imagesPremium){
            newImagesPremium.push({original_format:!JSON.parse(imagePremium.refs.resize.current!.value)});
        }
        var imagem_data=refs.imagem.current!.files!.length>0 ? refs.imagem.current!.files![0] : null;
        var imagem_data_d=refs.imagem_premium.current && refs.imagem_premium.current!.files!.length>0 ? refs.imagem_premium.current!.files![0] : null;
        fd.append("type","option");
        edit.current && fd.append("id",post_edit.current!.id.toString());
        imagem_data && fd.append("imagem",imagem_data);
        imagem_data_d && fd.append("dImagem",imagem_data_d);
        (imagem_data || imagem_data_d) && fd.append("imagens_edit",(true).toString());
        descricao!="" && fd.append("descricao",descricao);
        fd.append("images",newImages.toString());
        fd.append("imagesPremium",newImagesPremium.toString());
        auth.post(server+"/admin/imagens_cadastro?type="+(edit.current ? "edit" : "cadastro"),fd,{arquivo:true}).then((result)=>{
            if (result.error){
                globals.redirectError.current(result.error);
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
                    setImages([{filename:"Upload",src:sem_imagem,resize:false,refs:{image:createRef(),resize:createRef()}}]);
                    setImagesPremium([{filename:"Upload",src:sem_imagem,resize:false,refs:{image:createRef(),resize:createRef()}}]);
                }
            }
        })
    }
    const ChangePermission=(e:any)=>{
        setPermission(e.target.value=="1");
    }
    const ChangeOriginalFormat=(isPremium:boolean,index:number)=>{
        const values=["rd","of"];
        if (isPremium){
            const value=JSON.parse(imagesPremium[index].refs.resize.current!.value);
            imagesPremium[index].refs.image.current!.classList.replace(values[+value],values[+!value]);
        } else {
            const value=JSON.parse(images[index].refs.resize.current!.value);
            images[index].refs.image.current!.classList.replace(values[+value],values[+!value]);
        }
    }
    return (
        <div id="pg" className="ic">
            <div id="dt" className="fechado">
            <Publicar/>
            <div id="msg1">Cadastrar imagem</div>
            <form onSubmit={Cadastrar}>
                {isPremium ? <>
                        <label>Disponível:</label>
                        <select onChange={ChangePermission} ref={refs.permission} id="permission" defaultValue="0">
                            <option value="0">Público</option>
                            <option value="1">Premium</option>
                        </select>
                    </> : <></>}
                <label>Descrição</label>
                <textarea ref={refs.descricao}></textarea>
                <label>Capa</label>
                <div className="image-list">
                    {images.map((image,index:number)=>{
                        console.log(image.src);
                        return <div className="image-item" key={index}>
                            <div ref={refs.imagem_view} className="imagem-view col-12 col-md-6">
                                <img ref={image.refs.image} className="of" src={image.src}/>
                            </div>
                            <input className="file" ref={refs.imagem} onChange={(e)=>onImagemChange(e,false,index)} type="file" accept="image/jpg, image/jpeg" required/>
                            <div className="imagem-pt">
                                <div className="imagem" onClick={()=>{refs.imagem.current!.click()}}>
                                    <div className="txt-1">{image.filename}</div>
                                </div>
                                <select defaultValue="true" onChange={()=>ChangeOriginalFormat(false,index)} ref={image.refs.resize} className="original_format">
                                    <option value="true">Formato original</option>
                                    <option value="false">Redimensionar</option>
                                </select>
                            </div>
                        </div>
                    })}
                </div>
                {permission ? <>
                    <label>Capa</label>
                    <div className="image-list">
                        {imagesPremium.map((imagePremium,index:number)=>{
                            return <div className="image-item" key={index}>
                                <div ref={refs.imagem_view_premium} className="imagem-view col-12 col-md-6">
                                    <img ref={imagePremium.refs.image} className="of" src={imagePremium.src}/>
                                </div>
                                <input className="file" ref={refs.imagem_premium} onChange={(e)=>onImagemChange(e,true,index)} type="file" accept="image/jpg, image/jpeg" required/>
                                <div className="imagem-pt">
                                    <div className="imagem" onClick={()=>{refs.imagem_premium.current!.click()}}>
                                        <div className="txt-1">{imagePremium.filename}</div>
                                    </div>
                                    <select defaultValue="true" onChange={()=>ChangeOriginalFormat(true,index)} ref={imagePremium.refs.resize} className="original_format">
                                        <option value="true">Formato original</option>
                                        <option value="false">Redimensionar</option>
                                    </select>
                                </div>
                            </div>
                        })}
                    </div>
                    
                </> : <></>}
                <button type="submit" id="button">Enviar</button>
            </form>
            </div>
            <div id="m" style={{display:message ? "flex" :"none"}}>{ edit.current ? "Imagem alterada com sucesso." : "Imagem cadastrada com sucesso."}</div>
            <div id="errorImage" style={{display:errorImage ? "flex" : "none"}}>O tipo da imagem não corresponde a jpg/jpeg. Selecione uma imagem válida.</div>
        </div>
    )
}
export default ImagemCadastro;