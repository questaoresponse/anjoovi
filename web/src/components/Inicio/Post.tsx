import { memo } from 'react';
import Link from '../Link';
import './Post.scss';
import loading_src from "../static/loading.png";

function Post({isLoaded,globals,posts,verifyScroll}:{isLoaded:any,globals:any,posts:any[],verifyScroll?:any}){
    const server=globals.server;
    const mobile=globals.mobile;
        // posts=Array.from({length:48},()=>{return {imagem:false,titulo:"",usuario:""}});
    return (
        <div onScroll={verifyScroll || (()=>{})} id="tabela" className={'p-0 postc'+(!isLoaded ? " loading" : "")}>
            {posts.map((post:any,index:number)=>{
                var l,n,cm="";
                var content:any=null;
                if (post.imagem!==false){
                    n=post.tipo=="p";
                    var i=post.tipo=="i";
                    var m=post.tipo=="m";
                    var t=post.tipo=="t";
                    var v=post.tipo=="v";
                    var playlist=post.tipo=="pl";
                    if (playlist){
                        const imgs=JSON.parse(post.imagem);
                        cm=JSON.parse(post.posts).map((post:any)=>imgs.filter((img:any)=>post in img)[0][post])[0];
                    } else {
                        cm=post.imagem;
                    }
                    var isPremiumView=false;
                    var isWidthBigger=false;
                    var containerAspect=0;
                    var imageAspect=0;
                    if (i){
                        cm=JSON.parse(cm)[0];

                    }
                    const matches = cm ? cm.match(/^(.*)(?=_\d+_i)/) : null;
                    if (matches) {
                        const r_parsed = BigInt(parseInt(matches[1],36));
                        isPremiumView=(r_parsed & 1n)==1n;
                        const r = r_parsed >> 8n;
                        isWidthBigger = (r & (1n << 36n))!=0n;
                        containerAspect=Number((r >> 18n) & ((1n << 18n) - 1n)) / 10000;
                        imageAspect=(Number(r & ((1n << 18n) - 1n)) / 10000);
                    }
                    const originalFormat=(containerAspect==0 && imageAspect==0) || !mobile;
                    l=(post.playlist || playlist ? '/playlist' : n ? '/noticia' : i ? '/imagem' : m ? '/musica' : t ? '/texto' : v ? "/video" : "/product")+'/'+post.id;
                    content=t ? null : <div style={{aspectRatio:originalFormat ? "16/9" : "initial",width:"100%",height:originalFormat ? "auto" : (1 / containerAspect * window.innerWidth * 0.97) + "px"}} className='imagemd'>
                        <img style={{maxWidth:originalFormat ? "100%" : "initial",maxHeight:originalFormat ? "100%" : "initial",objectFit:originalFormat ? "contain" : "cover",width:originalFormat ?  "100%" : isWidthBigger ? imageAspect * window.innerWidth * 0.97 + "px" : "100%",height:originalFormat ? "100%" : isWidthBigger ? "100%" : 1 / imageAspect * window.innerWidth * 0.97 + "px"}} className='image' src={server+"/images/"+encodeURIComponent(cm) + (isPremiumView || cm.endsWith("premium.webp") ? "?q="+Math.floor(Math.random() * 4294967296) : "")}/>
                    </div>
                }
                const parts=(post.descricao || post.titulo || post.texto || "").split(/(?:\r\n| )/);
                return <div className='coluna col-12 col-md-3 mb-4' key={index}>
                    <div className='linha a' >
                        {post.tipo!="t" && <Link to={ l! } className="a">
                            { content}
                        </Link>}
                        <div className={"infos-post"+(post.tipo=="t" ? " post-texto" : "")}>
                            <Link to={l!} className='titulo a txt'>{parts.map((part:string,index:number)=>{
                                return part[0]=="#" || part[0]=="@" ? <Link className='tag' to={part[0]=="#" ? "/busca?q="+encodeURIComponent(part) : "/@"+encodeURIComponent(part.slice(1))} key={index}>{part + (parts.length - 1 > index ? " " : "")}</Link> : part + (parts.length - 1 > index ? " " : "")
                            })}</Link>
                            <Link to={"/@"+encodeURIComponent(post.usuario)} className='nome a txt'>{post.usuario}</Link>
                        </div>
                    </div>
                </div>
            })}
            {!isLoaded ? <div id="loading">
                <img src={loading_src} alt="" />
            </div> : <></>}

        </div>

    )
}
export default memo(Post);