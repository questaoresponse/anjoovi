import { useRef, useState, useLayoutEffect, memo, useCallback } from "react";
import GlobalContextInterface, { useGlobal } from "../Global";
import { useAuth } from "../Auth";
import { useLocation } from "react-router-dom";
import Noticia from "./Noticia";
import Imagem from "./Imagem";
import Musica from "./Musica";
import Texto from "./Texto";
import Playlist from "./Playlist";
import Video from "./Video";
import Product from "./Product";
const Elements=(posts:any,func:any,onLinkClick:any)=>{
    return ()=>{
        return posts.map((post:any,index:number)=>{
            switch (post.tipo){
                case "p":
                    return <Noticia post={post} key={index} func={func} isMain={false} onLinkClick={onLinkClick}/>
                case "i":
                    return <Imagem post={post} key={index} func={func} isMain={false} onLinkClick={onLinkClick}/>
                case "m":
                    return <Musica post={post} key={index} func={func} isMain={false} onLinkClick={onLinkClick}/>
                case "t":
                    return <Texto post={post} key={index} func={func} isMain={false} onLinkClick={onLinkClick}/>
                case "v":
                    return <Video post={post} key={index} func={func} isMain={false}/>
                case "pl":
                    return <Playlist post={post} key={index} func={func} isMain={false} onLinkClick={onLinkClick}/>
                case "pd":
                    return <Product post={post} key={index} func={func} isMain={false} onLinkClick={onLinkClick}/>
            }
        });
    }
}
function Types(){
    const { server, redirectError, navigate, navigateClass, player }:GlobalContextInterface=useGlobal();
    const [link,setLink]=useState<(string | boolean)[]>([false,""]);
    const auth=useAuth();
    const location=useLocation();
    const id=useRef(Number(location.pathname.split("/")[2]));
    const [posts,setPosts]=useState<{posts:any[],postAtual:{tipo:string,[key:string]:any} | null}>({posts:[],postAtual:null});
    const type=useRef<string | null>(null);
    const isLoaded=useRef(false);
    function zero(number:string | number){
        return Number(number) < 10 ? "0"+number : String(number);
    }
    function get_date_s(d:any){
        const [datePart, timePart] = new Date((d - 10800) * 1000).toLocaleString().split(', ');
        const [day, month, year] = datePart.split('/');
        const data:any = new Date(`${year}-${month}-${day}T${timePart}`);
        const dia = zero(data.getDate());
        const mes = zero(data.getMonth() + 1); // Os meses em JavaScript são base 0 (janeiro é 0, fevereiro é 1, etc.)
        const ano = data.getFullYear();
        const hora = zero(data.getHours());
        const minuto=zero(data.getMinutes());

        return `${dia}/${mes}/${ano} às ${hora}h${minuto}`;
    }
    const analyze=(post:any,comments:any=undefined)=>{
        switch (post.tipo){
            case "p":
                var dj=post.d ? JSON.parse(post.d) : { o:"2024-01-01 00:00:00" };
                var d=dj.o;
                var texto=(post.texto || "").split(/\n/g).map((line:string)=>line ? line.split(" ") : []);
                return {
                    isLoaded:true,
                    srcImagem:server+"/images/"+encodeURIComponent(post.imagem),
                    titulo:(post.titulo || "").split(" "),
                    subtitulo:(post.subtitulo || "").split(" "),
                    logo:post.logo ? server+"/images/"+encodeURIComponent(post.logo) : null,
                    nome:post.nome,
                    usuario:post.usuario,
                    dataText:get_date_s(d),
                    dataUpdateText:dj.a ? "Editado" : "",
                    visualizacoes:post.visualizacoes,
                    inscrito:JSON.parse(post.inscrito),
                    text:texto,
                    id:post.id,
                    tipo:post.tipo,
                    n_comment:post.n_comment,
                    comments:comments
                };
            case "i":
                var dj=JSON.parse(post.d);
                var d=dj.o;
                var texto=(post.descricao || "").split(/\n/g).map((line:string)=>line ? line.split(" ") : []);
                const imagem=post.imagem[0]=="[" ? JSON.parse(post.imagem) : [post.imagem];
                return {
                    alta:[],
                    srcImagem:imagem.map((imagem:string)=>{
                        var containerAspect=0;
                        var imageAspect=0;
                        var isWidthBigger=false;
                        const matches = imagem ? imagem.match(/^(.*)(?=_\d+_i)/) : null;
                        if (matches) {
                            const r = BigInt(parseInt(matches[1],36)) >> 8n;
                            isWidthBigger = (r & (1n << 36n))!=0n;
                            containerAspect=Number((r >> 18n) & ((1n << 18n) - 1n)) / 10000;
                            imageAspect=(Number(r & ((1n << 18n) - 1n)) / 10000);
                        }
                        const originalFormat=containerAspect==0 && imageAspect==0;
                        return {isWidthBigger,containerAspect,imageAspect,originalFormat,src:server+"/images/"+encodeURIComponent(imagem)};
                    }),
                    logo:post.logo ? server+"/images/"+encodeURIComponent(post.logo) : null,
                    nome:post.nome,
                    usuario:post.usuario,
                    dataText:get_date_s(d),
                    dataUpdateText:dj.a ? "Editado" : "",
                    visualizacoes:post.visualizacoes,
                    inscrito:JSON.parse(post.inscrito),
                    text:texto,
                    id:post.id,
                    n_comment:post.n_comment,
                    comments:comments,
                    tipo:post.tipo
                };
            case "m":
                const isCurrentMusic=player.current.page_id==post.id;
                const arquivos=JSON.parse(post.arquivo);
                const durations=JSON.parse(post.duration);
                var musics;
                if (isCurrentMusic){
                    musics=player.current.musics;
                } else {
                    musics=arquivos.map((musica:any,index:number)=>{
                        return { 
                            name: musica.split("_").slice(4).join("_").split(".").slice(0,-1),
                            src:server+"/musics/"+encodeURIComponent(musica),
                            currentTime:isCurrentMusic ? player.current.musics[index].currentTime : 0,
                            duration: isCurrentMusic ? player.current.musics[index].duration : durations[index],
                            isView:false,
                            setCurrentTime:null,
                            setPlay:null,
                        }
                    });
                }
                return {
                    audio:server+"/musics/"+encodeURIComponent(post.arquivo),
                    imagem:server+"/images/"+encodeURIComponent(post.imagem!),
                    titulo:(post.titulo || "").split(" "),
                    logo:post.logo ? server+"/images/"+encodeURIComponent(post.logo!) : null,
                    nome:post.nome,
                    usuario:post.usuario,
                    zip:post.zip,
                    downloads:post.downloads,
                    visualizacoes:post.visualizacoes,
                    inscrito:JSON.parse(post.inscrito!),
                    id:post.id,
                    n_comment:post.n_comment,
                    comments:comments,
                    arquivos:arquivos,
                    musics:musics,
                    tipo:post.tipo
                };
            case "t":
                var dj=JSON.parse(post.d);
                var d=dj.o;
                var texto=(post.texto || "").split(/\n/g).map((line:string)=>line ? line.split(" ") : []);
                return {
                    logo:post.logo ? server+"/images/"+encodeURIComponent(post.logo) : null,
                    nome:post.nome,
                    usuario:post.usuario,
                    dataText:get_date_s(d),
                    dataUpdateText:dj.a ? "Editado" : "",
                    visualizacoes:post.visualizacoes,
                    inscrito:JSON.parse(post.inscrito),
                    text:texto,
                    id:post.id,
                    tipo:post.tipo,
                    n_comment:post.n_comment,
                    comments:comments
                };
            case "v":
                var dj=JSON.parse(post.d);
                var d=dj.o;
                var texto=(post.texto || "").split(/\n/g).map((line:string)=>line ? line.split(" ") : []);
                var srcs;
                try {
                    srcs=JSON.parse(post.imagem);
                } catch (e){

                }
                return {
                    coverType:post.imagem ? "jpg" : "jpeg",
                    srcVideo:srcs ? server+"/videos/"+encodeURIComponent(srcs[0]) : null,
                    srcImagem:post.imagem ? server+"/images/"+encodeURIComponent(srcs ? srcs[1] : post.imagem) : null,
                    titulo:(post.titulo || "").split(/\n/g).map((line:string)=>line ? line.split(" ") : []),
                    logo:post.logo ? server+"/images/"+encodeURIComponent(post.logo) : null,
                    nome:post.nome,
                    usuario:post.usuario,
                    dataText:get_date_s(d),
                    dataUpdateText:dj.a ? "Editado" : "",
                    visualizacoes:post.visualizacoes,
                    inscrito:JSON.parse(post.inscrito),
                    text:texto,
                    id:post.id,
                    tipo:post.tipo,
                    n_comment:post.n_comment,
                    comments:comments
                };
            case "pl":
                const playlists:{imagem:string,titulo:string,post:number}[]=[];
                const imagens=JSON.parse(post.imagem);
                const titulos=JSON.parse(post.titulos);
                
                //keep the ids in order
                const posts:number[]=JSON.parse(post.posts);
                const idd=JSON.parse(post.idd);
                const orderIds:number[]=[];
                for (var post_children of posts){
                    orderIds.push(idd.findIndex((id:string)=>Number(id)==post_children));
                }
                for (var i=0;i<posts.length;i++){
                    const index=orderIds[i];
                    playlists.push({
                        imagem:imagens[index],
                        titulo:titulos[index],
                        post:posts[i]
                    })
                }
                return {
                    id:post.id,
                    titulo:(post.titulo || "").split(" "),
                    tipo:post.tipo,
                    post_tipo:post.post_tipo,
                    posts:posts,
                    playlists:playlists
                };
            case "pd":
                var dj=JSON.parse(post.d);
                var d=dj.o;
                var texto=(post.descricao || "").split(/\n/g).map((line:string)=>line ? line.split(" ") : []);
                return {
                    alta:[],
                    srcImagem:server+"/images/"+encodeURIComponent(post.imagem),
                    logo:post.logo ? server+"/images/"+encodeURIComponent(post.logo) : null,
                    nome:post.nome,
                    usuario:post.usuario,
                    dataText:get_date_s(d),
                    dataUpdateText:dj.a ? "Editado" : "",
                    visualizacoes:post.visualizacoes,
                    inscrito:JSON.parse(post.inscrito),
                    text:texto,
                    id:post.id,
                    n_comment:post.n_comment,
                    comments:comments,
                    tipo:post.tipo
                };
        }  
    }
    const initPosts=useRef<any[]>([])
    const get=async (initial:boolean,pathname:string)=>{
        if (initial && isLoaded.current) return;
        if (initial && !isLoaded.current) isLoaded.current=true;
        var params:URLSearchParams=new URLSearchParams(location.search);
        params.set("c","1");
        initial && params.set("i","1");
        var result=await auth.get(server+pathname+"?"+params.toString());
        if (result.error){
            redirectError.current(result.error);
        } else {
            type.current=result.data.post.tipo;
            const t=result.data.post.titulo || result.data.post.descricao || result.data.post.texto || "";
            if (t!=document.title) document.title=t.length > 100 ? t.substring(0, 100) : t;
            result.data.post=analyze(result.data.post,result.data.comments);
            if (initial){
                for (var i=0;i<result.data.posts.length;i++){
                    result.data.posts[i]=analyze(result.data.posts[i]);
                }
                initPosts.current=result.data.posts;
                setPosts({posts:result.data.posts,postAtual:result.data.post});
            } else {
                setPosts((posts)=>{
                    posts.posts=[...initPosts.current];
                    posts.posts[posts.posts.findIndex(p=>p.tipo==result.data.post.tipo && p.id==result.data.post.id)]={...posts.postAtual,comments:null};
                    return {posts:posts.posts,postAtual:result.data.post}
                });
            }
        }
    };
    const postChanged=useRef(false);
    const updatePosts=useCallback((pathname:string,i:number)=>{
        id.current=i;
        postChanged.current=true;
        window && navigate(pathname,{changeURL:false,lookTop:false});
        history.pushState({page:""},"",pathname);
        get(false,pathname);
    },[]);
    const changeId=useCallback((pathname:string)=>{
        if (postChanged.current){
            postChanged.current=false;
        } else {
            const pathnames:{[key:string]:any}={
                "noticia":true,
                "imagem":true,
                "musica":true,
                "texto":true,
                "video":true,
                "playlist":true,
                "product":true,
            };
            if (pathname.split("/").length>=3 && pathname.split("/")[1] in pathnames){
                id.current=Number(pathname.split("/")[2]);
                window && navigate(pathname,{changeURL:false,lookTop:false,callHandle:false});
                get(false,pathname);
            }
        }
    },[]);
    get(true,"/"+window.location.pathname.split("/")[1]+"/"+window.location.pathname.split("/")[2]);
    useLayoutEffect(()=>{
        navigateClass.current.addListener(changeId);
        player.current.updatePosts=updatePosts;
        return ()=>{
            navigateClass.current.removeListener(changeId);
            player.current.updatePosts=null;
        }
    },[changeId,updatePosts]);
    const onLinkClick=useCallback((link:string)=>{
        setLink([true,link]);
    },[]);
    const goToLink=()=>{
        setLink([false,""]);
        window.open((link[1]!).toString(),"_blank");
    };
    const onLoaded=()=>{
        navigate("",{changeURL:false,lookTop:true,callHandle:false});
    }
    return <>
        {posts.postAtual ?
            posts.postAtual.tipo=="p" ? <Noticia post={posts.postAtual} isMain={true} Elements={Elements(posts.posts,updatePosts,onLinkClick)} onLinkClick={onLinkClick} onLoaded={onLoaded}/> :
            posts.postAtual.tipo=="i" ? <Imagem post={posts.postAtual} isMain={true} Elements={Elements(posts.posts,updatePosts,onLinkClick)} onLinkClick={onLinkClick} onLoaded={onLoaded}/> :
            posts.postAtual.tipo=="m" ? <Musica post={posts.postAtual} isMain={true} Elements={Elements(posts.posts,updatePosts,onLinkClick)} onLinkClick={onLinkClick} onLoaded={onLoaded}/> :
            posts.postAtual.tipo=="t" ? <Texto post={posts.postAtual} isMain={true} Elements={Elements(posts.posts,updatePosts,onLinkClick)} onLinkClick={onLinkClick} onLoaded={onLoaded}/> :
            posts.postAtual.tipo=="v" ? <Video post={posts.postAtual} isMain={true} Elements={Elements(posts.posts,updatePosts,onLinkClick)} onLoaded={onLoaded}/> :
            posts.postAtual.tipo=="pl" ? <Playlist post={posts.postAtual} isMain={true} Elements={Elements(posts.posts,updatePosts,onLinkClick)} onLinkClick={onLinkClick} onLoaded={onLoaded}/> :
            posts.postAtual.tipo=="pd" ? <Product post={posts.postAtual} isMain={true} Elements={Elements(posts.posts,updatePosts,onLinkClick)} onLinkClick={onLinkClick} onLoaded={onLoaded}/> :
            null : null}
        <div id="tp-link-d" style={{display:link[0] ? "flex" : "none"}}>
            <div id="tp-link-content">
                <div id="tp-link-t">Deseja seguir para esse site?</div>
                <div id="tp-link-btn">
                    <div id="tp-link-confirm" onClick={goToLink}>Confirmar</div>
                    <div id="tp-link-cancel" onClick={()=>setLink([false,""])}>Cancelar</div>
                </div>
            </div>
        </div>
    </>
}
export default memo(Types);