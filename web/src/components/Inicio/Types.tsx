import { useRef, useState, useLayoutEffect, memo, useEffect } from "react";
import GlobalContextInterface, { useGlobal } from "../Global";
import { useAuth } from "../Auth";
import { useLocation } from "react-router-dom";
import Noticia from "./Noticia";
import Imagem from "./Imagem";
import Musica from "./Musica";
import Texto from "./Texto";
import Playlist from "./Playlist";
import Video from "./Video";
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
            }
        });
    }
}
function Types(){
    const { server, setRedirectError, navigate, navigateClass }:GlobalContextInterface=useGlobal();
    const [link,setLink]=useState<(string | boolean)[]>([false,""]);
    const auth=useAuth();
    const location=useLocation();
    const id=useRef(Number(location.pathname.split("/")[2]));
    const [posts,setPosts]=useState<{posts:any[],postAtual:{tipo:string,[key:string]:any} | null}>({posts:[],postAtual:null});
    const type=useRef<string | null>(null);
    const isLoaded=useRef(false);
    const get=async (initial:boolean,pathname:string)=>{
        if (initial && isLoaded.current) return;
        if (initial && !isLoaded.current) isLoaded.current=true;
        var params:URLSearchParams=new URLSearchParams(location.search);
        params.set("c","1");
        var result=await auth.get(server+pathname+"?"+params.toString());
        if (result.error){
            setRedirectError(result.error);
        } else {
            type.current=result.data.post.tipo;
            const t=result.data.post.titulo || result.data.post.descricao || result.data.post.texto || "";
            if (t!=document.title) document.title=t.length > 100 ? t.substring(0, 100) : t;
            setPosts({posts:result.data.posts,postAtual:result.data.post});
                // if (posts.posts.length>0){
                //     setPosts({posts:result.data.posts.map((post:{[key:string]:any})=>{
                //         post["get"]=createRef<()=>void>();
                //         return post;
                //     }),func:updatePosts});
                // } else {
                //     setPosts({posts:result.data.posts,func:updatePosts});
                // }

                    // posts.current.posts=result.data.posts.map((post:{[key:string]:any})=>{
                    //     post["get"]=createRef<()=>void>();
                    //     return post;
                    // });

                // setPosts((posts:postInterface[])=>{
                    //     console.log(posts);
                    //     for (var post of posts){
                    //         if (typeof post.get!.current=='function'){
                    //             post.get!.current();
                    //             console.log("deu certo");
                    //         }
                    //     }
                    //     return result.data.posts.map(post=>{
                    //         post.get=createRef();
                    //         return post;
                    //     })
                    // });
                    // setInfos({
                    //     alta:result.data.alta
                    // })
            // }
        }
    };
    const waitingUpdate=useRef(false);
    const updatePosts=(pathname:string,i:number)=>{
        id.current=i;
        window && navigate(pathname,{changeURL:false,lookTop:false});
        get(false,pathname);
        waitingUpdate.current=true;
    }
    useEffect(()=>{
        if (waitingUpdate.current){
            waitingUpdate.current=false;
            // window.scrollTo({top:0,behavior:"instant"});
        }
    });
    const changeId=(pathname:string)=>{
        if (pathname.split("/").length>=3){
            id.current=Number(pathname.split("/")[2]);
            window && navigate(pathname,{changeURL:false,lookTop:false,callHandle:false});
            get(false,pathname);
            waitingUpdate.current=true;
        }
    }
    get(true,"/"+window.location.pathname.split("/")[1]+"/"+window.location.pathname.split("/")[2]);
    useLayoutEffect(()=>{
        navigateClass.current.addListener(changeId);
        return ()=>{
            navigateClass.current.removeListener(changeId);
        }
    },[]);
    const onLinkClick=(link:string)=>{
        setLink([true,link]);
    }
    const goToLink=()=>{
        setLink([false,""]);
        window.open((link[1]!).toString(),"_blank");
    };
    return <>
        {posts.postAtual ?
            posts.postAtual.tipo=="p" ? <Noticia post={posts.postAtual} isMain={true} Elements={Elements(posts.posts,updatePosts,onLinkClick)} onLinkClick={onLinkClick}/> :
            posts.postAtual.tipo=="i" ? <Imagem post={posts.postAtual} isMain={true} Elements={Elements(posts.posts,updatePosts,onLinkClick)} onLinkClick={onLinkClick}/> :
            posts.postAtual.tipo=="m" ? <Musica post={posts.postAtual} isMain={true} Elements={Elements(posts.posts,updatePosts,onLinkClick)} onLinkClick={onLinkClick}/> :
            posts.postAtual.tipo=="t" ? <Texto post={posts.postAtual} isMain={true} Elements={Elements(posts.posts,updatePosts,onLinkClick)} onLinkClick={onLinkClick}/> :
            posts.postAtual.tipo=="v" ? <Video post={posts.postAtual} isMain={true} Elements={Elements(posts.posts,updatePosts,onLinkClick)}/> :
            posts.postAtual.tipo=="pl" ? <Playlist post={posts.postAtual} isMain={true} Elements={Elements(posts.posts,updatePosts,onLinkClick)} onLinkClick={onLinkClick}/> :
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