import { createRef, MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGlobal } from "../../Global.tsx";
import { resultInterface, useAuth } from "../../Auth.jsx";
import './ImagemCadastro.scss';
import sem_imagem from '../../static/sem-imagem.jpg';
import Publicar from "../Publicar.jsx";

const initialAspect=(10000n << 18n) | 10000n;

interface postInterface{
    id:number,
    titulo:string,
    descricao:string,
    imagem:string,
    privado:boolean
}
interface imageInterface{
    aspect:bigint,
    imageWidth:number,
    imageHeight:number,
    elementWidth:string,
    elementHeight:string,
    width:string,
    height:string,
    filename:string,
    src:string,
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
    const [images,setImages]=useState<imageInterface[]>([{aspect:initialAspect,imageWidth:0,imageHeight:0,elementWidth:"100%",elementHeight:"100%",width:"100%",height:"100%",filename:"Upload",src:sem_imagem,refs:{image_view:createRef(),image:createRef(),input:createRef(),resize:createRef()}}]);
    const [imagePremium,setImagePremium]=useState<imageInterface>({aspect:initialAspect,imageWidth:0,imageHeight:0,elementWidth:"100%",elementHeight:"100%",width:"100%",height:"100%",filename:"Upload",src:sem_imagem,refs:{image_view:createRef(),image:createRef(),input:createRef(),resize:createRef()}});
    const [imageFormat,setImageFormat]=useState({normal:0,premium:0});
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
    const calcDimensions:(format:number,imageWidth:number,imageHeight:number,image:imageInterface,boundingRect?:{width:number,height:number})=>(bigint | string)[]=(format:number,imageWidth:number,imageHeight:number,image:imageInterface,boundingRect?:{width:number,height:number})=>{
        const { width, height } = (boundingRect || image.refs.image_view.current!.getBoundingClientRect());
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
        const aspect=aspectImage | formatAsBit;
        return [aspect, elementWidth+"px", elementHeight+"px", newWidth+"px", newHeight+"px" ];
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
                            const format=Number(isPremium ? imagePremium.refs.resize.current!.value : images[0].refs.resize.current!.value)-1;
                            const { width: imageWidth, height: imageHeight }=img;
                            const [aspect,elementWidth,elementHeight,width,height]=calcDimensions(format,imageWidth,imageHeight,isPremium ? imagePremium : images[index]);
                            isPremium ? setImagePremium(image=>{
                                return {...image,aspect: aspect as bigint,elementWidth: elementWidth as string, elementHeight: elementHeight as string,imageWidth,imageHeight,width: width as string,height: height as string,filename:file.name,src}
                            }) : setImages(images=>{
                                const v=verifyShowAddButton(images) && images[index].src == sem_imagem; images[index]={...images[index],aspect: aspect as bigint,imageWidth,imageHeight,elementWidth:elementWidth as string,elementHeight: elementHeight as string,width: width as string,height: height as string,filename:file.name,src};
                                return v ? [...images, {aspect:initialAspect,imageWidth:0,imageHeight:0,elementWidth:"100%",elementHeight:"100%",width:"100%",height:"100%",filename: "Upload", src: sem_imagem, refs: { image_view: createRef(), image: createRef(), input: createRef(), resize: createRef() }}] : [...images]
                            });
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
    const updateCargo=useCallback((cargo:number)=>{
        setIsPremium((cargo & 4)==4);
    },[]);
    const updatePermission=()=>{
        if (isPremium){
            refs.permission.current!.value=post_edit.current!.privado ? "1" : "0";
            setPermission(post_edit.current!.privado);
        }
    }
    const onResize=useCallback(()=>{
        if (permission){
            setImagePremium(image=>{
                if (image.src==sem_imagem) return image;
                const format=Number(imagePremium.refs.resize.current!.value)-1;
                const [aspect,elementWidth,elementHeight,width,height]=calcDimensions(format,image.imageWidth,image.imageHeight,image);
                image.aspect=aspect as bigint;
                image.elementWidth=elementWidth as string;
                image.elementHeight=elementHeight as string;
                image.width=width as string;
                image.height=height as string;

                return {...image};
            });
        }
        setImages(images=>{
            images=images.map(image=>{
            if (image.src==sem_imagem) return image;
                const format=Number(images[0].refs.resize.current!.value)-1;
                const [aspect,elementWidth,elementHeight,width,height]=calcDimensions(format,image.imageWidth,image.imageHeight,image);
                image.aspect=aspect as bigint;
                image.elementWidth=elementWidth as string;
                image.elementHeight=elementHeight as string;
                image.width=width as string;
                image.height=height as string;

                return image;
        }); return [...images]});
    },[]);
    useEffect(()=>{
        edit.current=location.pathname=="/admin/imagens_edit";
        globals.setSelected("publicar");
        if (edit.current){
            auth.post(server+"/admin/imagens_edit"+location.search,{type:"info"}).then((result:resultInterface)=>{
                const post=result.data.post_edit;
                refs.descricao.current!.value=post.descricao;
                // return if post is private;
                post.privado=(post.privado & 2)==2;
                isPremium && (refs.permission.current!.value=post.privado ? "1" : "0");
                setPermission(post.privado);
                post_edit.current=post;
                const postImages=JSON.parse(post.imagem);
                var n=0;
                const assignImages:{[key:string]:{imageWidth:number,imageHeight:number}}={};
                for (const image of postImages){
                    const img=new Image();
                    img.src=server+"/images/"+encodeURIComponent(image);
                    img.onload=()=>{
                        const { width: imageWidth, height: imageHeight }=img;
                        assignImages[image]={imageWidth,imageHeight};
                        n++;
                        if (n==postImages.length){
                            const { width, height } = images[0].refs.image_view.current!.getBoundingClientRect();
                            const  boundingRect:{width:number,height:number}={width,height};
                            var format={ normal:0, premium:0 };
                            const newImages=postImages.map((image:string)=>{
                                const matches = image.match(/^(.*)(_\d+_i).*\.webp/);
                                const r_parsed=BigInt(`0x${BigInt(parseInt(matches![1], 36)).toString(16)}`);
                                // const r_parsed = BigInt(parseInt(matches![1],36));
                                const r = r_parsed >> 8n;
                                if (isPremium && (r_parsed & 1n)==1n){
                                    const r_premium=((r >> 21n) << 8n) | 2n;
                                    const imagePremium=(r_premium).toString(36) + matches![2] + "_premium.webp";
                                    const img2=new Image();
                                    img2.src=server+"/images/"+encodeURIComponent(imagePremium);
                                    img2.onload=()=>{
                                        const { width: imageWidth, height: imageHeight }=img2;
                                        format.premium=Number((r_premium >> 26n) & ((1n << 2n) - 1n));
                                        const [aspect,elementWidth,elementHeight,width,height]=calcDimensions(format.premium,imageWidth,imageHeight,images[0],boundingRect);
                                        setImagePremium({aspect:aspect as bigint,imageWidth:imageWidth,imageHeight:imageHeight,elementWidth:elementWidth as string,elementHeight:elementHeight as string,width:width as string,height:height as string,filename: "Image.webp", src: server+"/images/"+encodeURIComponent(imagePremium), refs: { image_view: createRef(), image: createRef(), input: createRef(), resize: createRef() }});
                                    }
                                }
                                format.normal=Number((r >> 18n) & ((1n << 2n) - 1n));
                                const [aspect,elementWidth,elementHeight,width,height]=calcDimensions(format.normal,assignImages[image].imageWidth,assignImages[image].imageHeight,images[0],boundingRect);
                                return {aspect:aspect,imageWidth:assignImages[image].imageWidth,imageHeight:assignImages[image].imageHeight,elementWidth:elementWidth,elementHeight:elementHeight,width:width,height:height,filename: "Image.webp", src: server+"/images/"+encodeURIComponent(image), refs: { image_view: createRef(), image: createRef(), input: createRef(), resize: createRef() }};
                            });
                            newImages.push({aspect:initialAspect,imageWidth:0,imageHeight:0,elementWidth:"100%",elementHeight:"100%",width:"100%",height:"100%",filename: "Upload", src: sem_imagem, refs: { image_view: createRef(), image: createRef(), input: createRef(), resize: createRef() }});
                            setImages(newImages);
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
        
        const mightPost=verifyShowAddButton();
        if (!mightPost) return;

        var fd=new FormData();
        var descricao=refs.descricao.current!.value;

        if (edit.current){
            fd.append("id",post_edit.current!.id.toString());
        } else {
            const images_data=[];
            for (const image of images){
                image.src != sem_imagem && images_data.push(image.refs.input.current!.files!.length > 0 ? image.refs.input.current!.files![0] : null);
            }
            images_data.forEach(image=>fd.append("imageFile[]",image!));
            
        }
        if (permission && (!edit.current || (!post_edit.current!.privado))){
            const image_data_premium=imagePremium.refs.input.current!.files!.length > 0 ? imagePremium.refs.input.current!.files![0] : null;
            fd.append("imageFilePremium",image_data_premium!);
        }
        const newImages=[];
        for (const image of images){
            image.src != sem_imagem && newImages.push(Number(image.aspect));
        }

        fd.append("type","option");
        descricao!="" && fd.append("descricao",descricao);
        fd.append("original_formats",JSON.stringify(newImages));
        if (permission){
            fd.append("permission",(true).toString());
            const newImagePremium=Number(imagePremium.aspect);
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
                    setImages([{aspect:initialAspect,imageWidth:0,imageHeight:0,elementWidth:"100%",elementHeight:"100%",width:"100%",height:"100%",filename:"Upload",src:sem_imagem,refs:{image_view:createRef(),image:createRef(),input:createRef(),resize:createRef()}}]);
                    setImageFormat({normal:1,premium:1});
                    if (permission){
                        setImagePremium({aspect:initialAspect,imageWidth:0,imageHeight:0,elementWidth:"100%",elementHeight:"100%",width:"100%",height:"100%",filename:"Upload",src:sem_imagem,refs:{image_view:createRef(),image:createRef(),input:createRef(),resize:createRef()}});
                        setPermission(false);
                    }
                }
            }
        })
    }
    const ChangePermission=(e:any)=>{
        setPermission(e.target.value=="1");
    }
    const ChangeOriginalFormat=(isPremium:boolean)=>{
        const format=Number(isPremium ? imagePremium.refs.resize.current!.value : images[0].refs.resize.current!.value)-1;
        isPremium ? setImagePremium(image=>{
            if (image.src!=sem_imagem){
                const [aspect,elementWidth,elementHeight,width,height]=calcDimensions(format,image.imageWidth,image.imageHeight,image);
                return {...image,aspect:aspect as bigint,elementWidth:elementWidth as string,elementHeight:elementHeight as string,width:width as string,height:height as string}
            }
            return image;
        }) : setImages(images=>{
            images.map(image=>{
                if (image.src!=sem_imagem){
                    const [aspect,elementWidth,elementHeight,width,height]=calcDimensions(format,image.imageWidth,image.imageHeight,image);
                    image.aspect=aspect as bigint;
                    image.elementWidth=elementWidth as string;
                    image.elementHeight=elementHeight as string;
                    image.width=width as string;
                    image.height=height as string;
                }
                return image;   
            });
            return[...images];
        });
        const image=isPremium ? imagePremium : images[0];
        setImageFormat(imageFormat=>{ return {...imageFormat,[isPremium ? "premium" : "normal"]:Number(image.refs.resize.current!.value)-1}});
        // imagePremium.refs.image.current!.classList.replace(imagePremium.refs.image.current!.classList[imagePremium.refs.image.current!.classList.length - 1],values[Number(value)-1]);
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
    useEffect(()=>{
        if (message){
            images[0].refs.input.current!.value="";
        }
    },[message]);
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
                                <div className="image-container" style={{width: image.width, height: image.height}}>
                                    <img className="image-img" style={{width: image.elementWidth, height: image.elementHeight}} ref={image.refs.image} src={image.src}/>
                                </div>
                            </div>
                            <input className="file" ref={image.refs.input} onChange={(e)=>onImagemChange(e,false,index)} type="file" accept="image/jpg, image/jpeg" required={index==0 || index+1<images.length}/>
                            <div className="imagem-pt">
                                <div className="imagem" onClick={()=>{image.refs.input.current!.click()}}>
                                    <div className="txt-1">{image.filename}</div>
                                </div>
                                <div className="options-image">
                                    <select value={String(imageFormat.normal+1)} onChange={()=>index==0 ? ChangeOriginalFormat(false) : ()=>{}} ref={image.refs.resize} className={"original_format" + (index > 0 ? " disabled" : "")}>
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
                        <div className="image-container" style={{width: imagePremium.width, height: imagePremium.height}}>
                            <img className="image-img" style={{width: imagePremium.elementWidth, height: imagePremium.elementHeight}} ref={imagePremium.refs.image} src={imagePremium.src}/>
                        </div>
                    </div>
                    <input className="file" ref={imagePremium.refs.input} onChange={(e)=>onImagemChange(e,true,0)} type="file" accept="image/jpg, image/jpeg" required={post_edit.current ? !post_edit.current.privado : true}/>
                    <div className="imagem-pt">
                        <div className="imagem" onClick={()=>{imagePremium.refs.input.current!.click()}}>
                            <div className="txt-1">{imagePremium.filename}</div>
                        </div>
                        <select value={String(imageFormat.premium+1)} onChange={()=>ChangeOriginalFormat(true)} ref={imagePremium.refs.resize} className="original_format">
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