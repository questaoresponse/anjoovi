import { createRef, MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
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
interface imageInterface{
    imageWidth:number,
    imageHeight:number,
    width:string,
    height:string,
    filename:string,
    src:string,
    resize:boolean,
    refs:{
        image_view:MutableRefObject<HTMLDivElement | null>,
        image:MutableRefObject<HTMLImageElement | null>,
        input:MutableRefObject<HTMLInputElement | null>,
        resize:MutableRefObject<HTMLSelectElement | null>
    }
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
    }
    const location=useLocation();
    const [images,setImages]=useState<imageInterface[]>([{imageWidth:0,imageHeight:0,width:"100%",height:"100%",filename:"Upload",src:sem_imagem,resize:false,refs:{image_view:createRef(),image:createRef(),input:createRef(),resize:createRef()}}]);
    const [imagePremium,setImagePremium]=useState<imageInterface>({imageWidth:0,imageHeight:0,width:"100%",height:"100%",filename:"Upload",src:sem_imagem,resize:false,refs:{image_view:createRef(),image:createRef(),input:createRef(),resize:createRef()}});
    const [message,setMessage]=useState(false);
    const [errorImage,setErrorImage]=useState(false);
    const [isPremium,setIsPremium]=useState(((cargo.current.cargo || 0) & 4)==4);
    const [permission,setPermission]=useState(false);
    const verifyShowAddButton=(list?:imageInterface[])=>{
        return (list || images).filter(images=>images.src==sem_imagem).length==1;
    }
    const showError=()=>{
        setErrorImage(true);
        const st=setTimeout(()=>{
            setErrorImage(false);
            clearTimeout(st);
        },2000);
    }
    const [aspect,setAspect]=useState(1);
    const calcDimensions:(imageWidth:number,imageHeight:number,image:imageInterface)=>string[]=(imageWidth:number,imageHeight:number,image:imageInterface)=>{
        const { width, height } = image.refs.image_view.current!.getBoundingClientRect();
        var newWidth=0;
        var newHeight=0;

        const n=Number(image.refs.resize.current!.value)-1;

        if (imageWidth < imageHeight){
            if (n==1 || n==3){
                newWidth=width;
                newHeight=imageHeight / imageWidth * height;
            } else if (n==0){
                newWidth=imageWidth / imageHeight * width;
                newHeight=height;
            } else {
                newWidth=height * 4/5;
                newHeight=height;
            }
        } else {
            if (n==1 || n==2){
                newWidth=imageWidth / imageHeight * width;
                newHeight=height;
            } else {
                newWidth=width;
                newHeight=imageHeight / imageWidth * height;
            }
        }
        setAspect(newWidth/newHeight);
        return [ newWidth+"px", newHeight+"px" ];
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
                        const img=new Image();
                        img.src=src;
                        img.onload=()=>{
                            const { width: imageWidth, height: imageHeight }=img;
                            const [width,height]=calcDimensions(imageWidth,imageHeight,isPremium ? imagePremium : images[index]);
                            isPremium ? setImagePremium(image=>{ return {...image,imageWidth,imageHeight,width,height,filename:file.name,src}}) : setImages(images=>{const v=verifyShowAddButton(images) && images[index].src == sem_imagem; images[index]={...images[index],imageWidth,imageHeight,width,height,filename:file.name,src}; return v ? [...images, {imageWidth:0,imageHeight:0,width:"100%",height:"100%",filename: "Upload", src: sem_imagem, resize: false, refs: { image_view: createRef(), image: createRef(), input: createRef(), resize: createRef() }}] : [...images]});
                        }
                    }
                    reader2.readAsDataURL(file);
                } else {
                    isPremium ? setImagePremium(image=>{ return {...image,filename:"Upload",src:sem_imagem}}) : setImages(images=>{images[index]={...images[index],imageWidth:0,imageHeight:0,width:"100%",height:"100%",filename:"Upload",src:sem_imagem}; return [...images]});
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
            setPermission(post_edit.current!.privado);
        }
    }
    useEffect(()=>{
        edit.current=location.pathname=="/admin/imagens_edit";
        globals.setSelected("publicar");
        if (edit.current){
            auth.post(server+"/admin/imagens_edit"+location.search,{type:"info"}).then((result:resultInterface)=>{
                const post=result.data.post_edit;
                refs.descricao.current!.value=post.descricao;
                post.privado=(post.privado & 2)==2;
                post_edit.current=post;
                const images=JSON.parse(post.imagem);
                setImages(images.map((image:string)=>{ return {filename:"Image.webp",src:server+"/images/"+encodeURIComponent(image),resize:post.imagem.slice(0,2) =="r_" || post.imagem.slice(2,4)=="r_",refs:{image_view:createRef(),image:createRef(),input:createRef(),resize:createRef()}}}));
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
        
        const mightPost=verifyShowAddButton();
        if (!mightPost) return;

        var fd=new FormData();
        var descricao=refs.descricao.current!.value;
        const newImages=[];
        for (const image of images){
            image.src != sem_imagem && newImages.push(!!JSON.parse(image.refs.resize.current!.value));
        }

        if (edit.current){
            fd.append("id",post_edit.current!.id.toString());
        } else {
            const images_data=[];
            for (const image of images){
                image.src != sem_imagem && images_data.push(image.refs.input.current!.files!.length > 0 ? image.refs.input.current!.files![0] : null);
            }
            images_data.forEach(image=>fd.append("imageFile[]",image!));
            if (permission){
                const image_data_premium=imagePremium.refs.input.current!.files!.length > 0 ? imagePremium.refs.input.current!.files![0] : null;
                fd.append("imageFilePremium",image_data_premium!);
            }
        }
        fd.append("type","option");
        descricao!="" && fd.append("descricao",descricao);
        fd.append("original_formats",JSON.stringify(newImages));
        if (permission){
            fd.append("permission",(true).toString());
            const newImagePremium=!!JSON.parse(imagePremium.refs.resize.current!.value);
            newImagePremium && fd.append("original_format_premium",newImagePremium.toString());
        }
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
                    setImages([{imageWidth:0,imageHeight:0,width:"100%",height:"100%",filename:"Upload",src:sem_imagem,resize:false,refs:{image_view:createRef(),image:createRef(),input:createRef(),resize:createRef()}}]);
                    setImagePremium({imageWidth:0,imageHeight:0,width:"100%",height:"100%",filename:"Upload",src:sem_imagem,resize:false,refs:{image_view:createRef(),image:createRef(),input:createRef(),resize:createRef()}});
                }
            }
        })
    }
    const ChangePermission=(e:any)=>{
        setPermission(e.target.value=="1");
    }
    const ChangeOriginalFormat=(isPremium:boolean,index:number)=>{
        const image=isPremium ? imagePremium : images[index];
        //     imagePremium.refs.image.current!.classList.replace(imagePremium.refs.image.current!.classList[imagePremium.refs.image.current!.classList.length - 1],values[Number(value)-1]);
        const [width,height]=calcDimensions(image.imageWidth,image.imageHeight,image);
        isPremium ? setImagePremium(image=>{ return {...image,width,height}}) : setImages(images=>{images[index].width=width; images[index].height=height; return[...images]});
            // const value=images[index].refs.resize.current!.value;
            // images[index].refs.image.current!.classList.replace(images[index].refs.image.current!.classList[images[index].refs.image.current!.classList.length - 1],values[Number(value)-1]);
    }
    const removeImage=(index:number)=>{
        setImages(images=>images.filter((image,i)=>i!=index || image.src==sem_imagem));
    }
    useEffect(()=>{
        if (post_edit.current){
            for (const image of images){
                image.refs.input.current && (image.refs.input.current.required=false);
            }
        }
    },[images]);
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
                        
                        return <div className="image-item" key={index}>
                            <div ref={image.refs.image_view} className="imagem-view col-12 col-md-6">
                                <img style={{width:image.width,height:image.height}} ref={image.refs.image} src={image.src}/>
                            </div>
                            <input className="file" ref={image.refs.input} onChange={(e)=>onImagemChange(e,false,index)} type="file" accept="image/jpg, image/jpeg" required={index==0 || index+1<images.length}/>
                            <div className="imagem-pt">
                                <div className="imagem" onClick={()=>{image.refs.input.current!.click()}}>
                                    <div className="txt-1">{image.filename}</div>
                                </div>
                                <div className="options-image">
                                    <select defaultValue="2" onChange={()=>ChangeOriginalFormat(false,index)} ref={image.refs.resize} className="original_format">
                                        <option value="1">Original</option>
                                        <option value="2">1:1</option>
                                        <option value="3">4:5</option>
                                        <option value="4">16:9</option>
                                    </select>
                                    <div onClick={()=>removeImage(index)} className={"remove-image" + (index+1<images.length || image.src!=sem_imagem ? "" : " disabled")}>-</div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
                {permission ? <div className="image-item">
                    <label>Capa borrada</label>
                    <div ref={imagePremium.refs.image_view} className="imagem-view col-12 col-md-6">
                        <img style={{aspectRatio:aspect,width:aspect > 1 ? "auto" : "100%",height:aspect > 1 ? "100%" : "auto"}} ref={imagePremium.refs.image} src={imagePremium.src}/>
                    </div>
                    <input className="file" ref={imagePremium.refs.input} onChange={(e)=>onImagemChange(e,true,0)} type="file" accept="image/jpg, image/jpeg" required/>
                    <div className="imagem-pt">
                        <div className="imagem" onClick={()=>{imagePremium.refs.input.current!.click()}}>
                            <div className="txt-1">{imagePremium.filename}</div>
                        </div>
                        <select defaultValue="2" onChange={()=>ChangeOriginalFormat(true,0)} ref={imagePremium.refs.resize} className="original_format">
                            <option value="1">Original</option>
                            <option value="2">1:1</option>
                            <option value="3">4:5</option>
                            <option value="4">16:9</option>
                        </select>
                    </div>
                </div> : <></>}
                <button type="submit" id="button">Enviar</button>
            </form>
            </div>
            <div id="m" style={{display:message ? "flex" :"none"}}>{ edit.current ? "Imagem alterada com sucesso." : "Imagem cadastrada com sucesso."}</div>
            <div id="errorImage" style={{display:errorImage ? "flex" : "none"}}>O tipo da imagem não corresponde a jpg/jpeg. Selecione uma imagem válida.</div>
        </div>
    )
}
export default ImagemCadastro;