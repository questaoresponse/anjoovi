import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGlobal } from "../../Global.tsx";
import { resultInterface, useAuth } from "../../Auth.jsx";
import './NoticiasCadastro.scss';
import '../../../d.ts';
import sem_imagem from "../../static/sem-imagem.jpg";
import Publicar from "./../Publicar.jsx";

const initialAspect=(10000n << 18n) | 10000n;

interface postInterface{
    id:number,
    titulo:string,
    subtitulo:string,
    texto:string,
    imagem:string,
    privado:boolean
}
interface noticiaInterface{
    aspect:bigint,
    imageWidth:number,
    imageHeight:number,
    elementWidth:string,
    elementHeight:string,
    width:string,
    height:string,
    filename:string,
    src:string
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
        input:useRef<HTMLInputElement>(null),
        resize:useRef<HTMLSelectElement>(null),
        image_view:useRef<HTMLDivElement>(null),
        image_element:useRef<HTMLImageElement>(null),
        image_premium:useRef<HTMLInputElement>(null),
        resize_premium:useRef<HTMLSelectElement>(null),
        image_view_premium:useRef<HTMLDivElement>(null),
        image_element_premium:useRef<HTMLImageElement>(null),
    }
    const location=useLocation();
    const [image,setImage]=useState<noticiaInterface>({aspect:initialAspect,imageWidth:0,imageHeight:0,elementWidth:"100%",elementHeight:"100%",width:"100%",height:"100%",filename:"Upload",src:sem_imagem});
    const [imagePremium,setImagePremium]=useState<noticiaInterface>({aspect:initialAspect,imageWidth:0,imageHeight:0,elementWidth:"100%",elementHeight:"100%",width:"100%",height:"100%",filename:"Upload",src:sem_imagem});
    const [imageFormat,setImageFormat]=useState({normal:0,premium:0});
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
    const calcDimensions=(format:number,imageWidth:number,imageHeight:number):(bigint | string)[]=>{
        const { width, height } = refs.image_view.current!.getBoundingClientRect();
        var newWidth=0;
        var newHeight=0;
        var elementWidth=0;
        var elementHeight=0;
        if (imageWidth < imageHeight){
            switch (format){
                case 0:
                    newWidth=imageWidth / imageHeight * width;
                    newHeight=height;
                    elementWidth=newWidth;
                    elementHeight=newHeight;
                    break;
                case 1:
                    newWidth=width;
                    newHeight=height;
                    elementWidth=newWidth;
                    elementHeight=imageHeight / imageWidth * height;
                    break;
                case 2:
                    newWidth=height * 4/5;
                    newHeight=height;
                    elementWidth=newWidth;
                    elementHeight=newHeight;
                    break;
                case 3:
                    newWidth=width;
                    newHeight=width * 9/16;
                    elementWidth=newWidth;
                    elementHeight=imageHeight / imageWidth * height;
            }
        } else {
            switch (format){
                case 0:
                    newWidth=width;
                    newHeight=imageHeight / imageWidth * height;
                    elementWidth=newWidth;
                    elementHeight=newHeight;
                    break;
                case 1:
                    newWidth=width;
                    newHeight=height;
                    elementWidth=imageWidth / imageHeight * width;
                    elementHeight=height;
                    break;
                case 2:
                    newWidth=height * 4/5;
                    newHeight=height;
                    elementWidth=imageWidth / imageHeight * width;
                    elementHeight=height;
                    break;
                case 3:
                    newWidth=width;
                    newHeight=width * 9/16;
                    elementWidth=newWidth;
                    elementHeight=newHeight;
            }
        }
        // shift left the aspectContainer for 18 positions and reserving the 37° bit for original orientation of image and reserving the firsts 18 positions for aspectImage;
        const aspectImage=BigInt(Math.floor(elementWidth / elementHeight * 10000)) & ((1n << 18n) - 1n);
        const formatAsBit=BigInt(format) << 18n;
        const isWidthBigger=(elementWidth > width ? (1n << 20n) : 0n);
        const aspect=aspectImage | formatAsBit | isWidthBigger;
        return [aspect, elementWidth+"px", elementHeight+"px", newWidth+"px", newHeight+"px" ];
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
                const format=isPremium ? imageFormat.premium : imageFormat.normal;
                const setImageFn = isPremium ? setImagePremium : setImage;
                if (fileType && fileType=="jpeg"){
                    const reader2=new FileReader();
                    reader2.onloadend=()=>{
                        var src="";
                        if (typeof reader2.result=="string"){
                            src=reader2.result;
                        } else {
                            src=sem_imagem;

                        }
                        const img=new Image();
                        img.src=src;
                        img.onload=()=>{
                            const { width: imageWidth, height: imageHeight }=img;
                            const [aspect,elementWidth,elementHeight,width,height]=calcDimensions(format as number, imageWidth, imageHeight);
                            setImageFn({aspect: aspect as bigint, elementWidth: elementWidth as string, elementHeight: elementHeight as string, imageWidth, imageHeight, width: width as string, height: height as string, filename: file.name, src});
                        }
                    }
                    reader2.readAsDataURL(file);
                } else {
                    setImageFn(image=>{ return {...image,filename:"Upload",src:sem_imagem}});
                    e.target.value="";
                    showError();
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }
    edit.current=location.pathname=="/admin/noticias_edit";
    const updateCargo=useCallback((cargo:number)=>{
        setIsPremium((cargo & 4)==4);
    },[]);
    const updatePermission=()=>{
        if (isPremium){
            refs.permission.current!.value=post_edit.current!.privado ? "1" : "0";
            setPermission(true);
        }
    }
    const onResize=useCallback(()=>{
        if (permission){
            setImagePremium(image=>{
                if (image.src==sem_imagem) return image;
                const format=Number(refs.resize_premium.current!.value)-1;
                const [aspect,elementWidth,elementHeight,width,height]=calcDimensions(format,image.imageWidth,image.imageHeight);
                image.aspect=aspect as bigint;
                image.elementWidth=elementWidth as string;
                image.elementHeight=elementHeight as string;
                image.width=width as string;
                image.height=height as string;

                return {...image};
            });
        }
        setImage(image=>{
            if (image.src==sem_imagem) return image;
            const format=Number(refs.resize.current!.value)-1;
            const [aspect,elementWidth,elementHeight,width,height]=calcDimensions(format,image.imageWidth,image.imageHeight);
            image.aspect=aspect as bigint;
            image.elementWidth=elementWidth as string;
            image.elementHeight=elementHeight as string;
            image.width=width as string;
            image.height=height as string;

            return image;
        });
    },[]);
    useEffect(()=>{
        globals.setSelected("publicar");
        if (edit.current){
            auth.post(server+"/admin/noticias_edit"+location.search,{type:"info"}).then((result:resultInterface)=>{
                if ("post_edit" in result.data){
                    refs.input.current!.required=false;
                    const post=result.data.post_edit[0];
                    refs.titulo.current!.value=post.titulo;
                    refs.subtitulo.current!.value=post.subtitulo;
                    refs.textarea.current!.value=post.texto;
                    post.privado=(post.privado & 2)==2;
                    isPremium && (refs.permission.current!.value=post.privado ? "1" : "0");
                    setPermission(post.privado);
                    post_edit.current=post;
                    const postImages=JSON.parse(post.imagem);
                    for (const image of postImages){
                        const img=new Image();
                        img.src=server+"/images/"+encodeURIComponent(image);
                        img.onload=()=>{
                            const { width: imageWidth, height: imageHeight } = img;
                            var format={ normal:0, premium:0 };
        
                                const matches = image.match(/^(.*)(_\d+_i).*\.webp/);
                                const r_parsed=BigInt(`0x${BigInt(parseInt(matches![1], 36)).toString(16)}`);
                                // const r_parsed = BigInt(parseInt(matches![1],36));
                                const r = r_parsed >> 8n;
                                if (isPremium && (r_parsed & 1n) == 1n){
                                    const r_premium = ((r >> 21n) << 8n) | 2n;
                                    const imagePremium=  (r_premium).toString(36) + matches![2] + "_premium.webp";
                                    const img2 = new Image();
                                    img2.src = server+"/images/"+encodeURIComponent(imagePremium);
                                    img2.onload=()=>{
                                        const { width: imageWidth, height: imageHeight }=img2;
                                        format.premium=Number((r_premium >> 26n) & ((1n << 2n) - 1n));
                                        const [aspect,elementWidth,elementHeight,width,height]=calcDimensions(format.premium,imageWidth,imageHeight);
                                        setImagePremium({aspect:aspect as bigint,imageWidth:imageWidth,imageHeight:imageHeight,elementWidth:elementWidth as string,elementHeight:elementHeight as string,width:width as string,height:height as string,filename: "Image.webp", src: server+"/images/"+encodeURIComponent(imagePremium)});
                                    }
                                }
                                format.normal=Number((r >> 18n) & ((1n << 2n) - 1n));
                                const [aspect,elementWidth,elementHeight,width,height]=calcDimensions(format.normal,imageWidth,imageHeight);
                            setImage({aspect:aspect as bigint,imageWidth:imageWidth,imageHeight:imageHeight,elementWidth:elementWidth as string,elementHeight:elementHeight as string,width:width as string,height:height as string,filename: "Image.webp", src: server+"/images/"+encodeURIComponent(image)});
                            setImageFormat(format);
                        }
                    }
                }
            });
        }
    },[]);
    useEffect(()=>{
        cargo.current.addListener(updateCargo);
        window.addEventListener("resize",onResize);
        return ()=>{
            cargo.current.removeListener(updateCargo);
            window.removeEventListener("resize",onResize);
        }
    },[updateCargo,onResize]);
    useEffect(()=>{
        if (post_edit.current){
            updatePermission();
        }
    },[isPremium]);
    const Cadastrar=async (e:any)=>{
        e.preventDefault();
        var fd=new FormData();
        const  titulo=refs.titulo.current!.value;
        const  subtitulo=refs.subtitulo.current!.value;
        const texto=refs.textarea.current!.value;
        var imageFile=refs.input.current!.files!.length>0 ? refs.input.current!.files![0] : null;
        var imageFilePremium=refs.image_premium.current && refs.image_premium.current!.files!.length>0 ? refs.image_premium.current!.files![0] : null;
        fd.append("type","option");
        edit.current && fd.append("id",post_edit.current!.id.toString());
        edit.current && (imageFile || imageFilePremium) && fd.append("imagens_edit",(true).toString());
        refs.permission.current && fd.append("permission",refs.permission.current.value);
        fd.append("usuario",globals.login.usuario!);
        fd.append("titulo",titulo);
        fd.append("texto",texto);
        subtitulo!="" && fd.append("subtitulo", subtitulo);
        fd.append("original_format",Number(image.aspect).toString());
        imageFile && fd.append("imageFile",imageFile);
        if (permission){
            fd.append("original_format_premium",Number(imagePremium.aspect).toString());
            fd.append("imageFilePremium",imageFilePremium!);
        }
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
                    refs.input.current!.value="";
                    setImage({aspect:initialAspect,imageWidth:0,imageHeight:0,elementWidth:"100%",elementHeight:"100%",width:"100%",height:"100%",filename:"Upload",src:sem_imagem});
                    setImagePremium({aspect:initialAspect,imageWidth:0,imageHeight:0,elementWidth:"100%",elementHeight:"100%",width:"100%",height:"100%",filename:"Upload",src:sem_imagem});
                }
            }
        })
    }
    const ChangePermission=(e:any)=>{
        setPermission(e.target.value=="1");
    }
    const ChangeOriginalFormat=(isPremium:boolean)=>{
        const [format, imageWidth, imageHeight]:number[] = isPremium ? [Number(refs.resize_premium.current!.value), imagePremium.imageWidth, imagePremium.imageHeight] : [Number(refs.resize.current!.value), image.imageWidth, image.imageHeight];
        const [ aspect, elementWidth, elementHeght, width, height ] = calcDimensions(format-1, imageWidth, imageHeight);
        (isPremium ? setImagePremium : setImage)(image=>{ return {...image, aspect: aspect as bigint, elementWidth: elementWidth as string, elementHeight: elementHeght as string, width: width as string, height: height as string}});
        setImageFormat(imageFormat=>{ return {...imageFormat, [isPremium ? "premium" : "normal"]: format}});
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
                        <div ref={refs.image_view} className="imagem-view col-12 col-md-6">
                            <div className="image-container" style={{width: image.width, height: image.height}}>
                                <img className="image-img" style={{width: image.elementWidth, height: image.elementHeight}} ref={refs.image_element} src={image.src}/>
                            </div>
                        </div>
                        <input className="file" ref={refs.input} onChange={(e)=>onImagemChange(e,false)} type="file" accept="image/jpg, image/jpeg" required/>
                        <div className="imagem-pt">
                            <div className="imagem" onClick={()=>{refs.input.current!.click()}}>
                                <div className="txt-1">{image.filename}</div>
                            </div>
                            <select value={String(imageFormat.normal+1)} onChange={()=>ChangeOriginalFormat(false)} ref={refs.resize} className="original_format">
                                <option value="1">Original</option>
                                <option value="2">1:1</option>
                                <option value="3">4:5</option>
                                <option value="4">16:9</option>
                            </select>
                        </div>
                    </div>
                    {permission ? <>
                        <label>Capa</label>
                        <div className="imagem-div">
                            <div ref={refs.image_view_premium} className="imagem-view col-12 col-md-6">
                                <div className="image-container" style={{width: imagePremium.width, height: imagePremium.height}}>
                                    <img className="image-img" style={{width: imagePremium.elementWidth, height: imagePremium.elementHeight}} ref={refs.image_element} src={imagePremium.src}/>
                                </div>
                            </div>
                            <input className="file" ref={refs.image_premium} onChange={(e)=>onImagemChange(e,true)} type="file" accept="image/jpg, image/jpeg" required/>
                            <div className="imagem-pt">
                                <div className="imagem" onClick={()=>{refs.image_premium.current!.click()}}>
                                    <div className="txt-1">{imagePremium.filename}</div>
                                </div>
                                <select value={String(imageFormat.premium+1)} onChange={()=>ChangeOriginalFormat(true)} ref={refs.resize_premium} className="original_format">
                                    <option value="1">Original</option>
                                    <option value="2">1:1</option>
                                    <option value="3">4:5</option>
                                    <option value="4">16:9</option>
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