import { memo } from 'react';
import Link from '../Link';
import './Post.scss';
import loading_src from "../static/loading.png";
import Logo from '../Logo';

function Post({isLoaded,globals,posts,verifyScroll}:{isLoaded:any,globals:any,posts:any[],verifyScroll?:any}){
    const server=globals.server;
    const mobile=globals.mobile;
    const cargo=globals.cargo;
        // posts=Array.from({length:48},()=>{return {imagem:false,titulo:"",usuario:""}});
    return (
        <div onScroll={verifyScroll || (()=>{})} id="tabela" className='p-0 postc'>
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
                    var format=0;
                    var containerAspect=0;
                    var imageAspect=0;
                    if (i){
                        cm=JSON.parse(cm)[0];

                    }
                    const matches = cm ? cm.match(/^(.*)(?=_\d+_(p|i))/) : null;
                    if (matches) {
                        const r_parsed = BigInt(parseInt(matches[1],36));
                        isPremiumView=(r_parsed & 1n)==1n;
                        if ((r_parsed & 1n)==1n && (cargo.current.cargo! & 4)==0){
                            const r = r_parsed >> 29n;
                            format=Number((r >> 18n) & ((1n << 2n) - 1n));
                            containerAspect=format==2 ? 4/5 : format==3 ? 16/9 : format;
                            imageAspect=(Number(r & ((1n << 18n) - 1n)) / 10000);
                        } else {
                            const r = r_parsed >> 8n;
                            format=Number((r >> 18n) & ((1n << 2n) - 1n));
                            containerAspect=format==2 ? 4/5 : format==3 ? 16/9 : format;
                            imageAspect=(Number(r & ((1n << 18n) - 1n)) / 10000);
                        }
                    }
                    const isElementWidthBigger=(format==3 || (imageAspect < 1 && mobile) || (format!=1 && imageAspect > 1))  ? true : false;
                    const originalFormat=(format==0 && imageAspect==0);
                    l=(post.playlist || playlist ? '/playlist' : n ? '/noticia' : i ? '/imagem' : m ? '/musica' : t ? '/texto' : v ? "/video" : "/product")+'/'+post.id;
                    content=t ? null : <div style={{aspectRatio:mobile ? "initial" : "16/9"}} className='imagemd'>
                        <div style={{
                            aspectRatio:originalFormat || format!=0 ? String(containerAspect) : "initial",
                            width:mobile ? "100%" : "initial",
                            height:originalFormat || !mobile ? "100%" : "initial",
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center",
                            overflow: "hidden",
                        }}>
                            <img style={{
                                maxWidth:originalFormat ? "100%" : "initial",
                                maxHeight:originalFormat ? "100%" : "initial",
                                objectFit:originalFormat ? "contain" : "initial",
                                aspectRatio: String(originalFormat  ? "initial" : imageAspect),
                                width:originalFormat || isElementWidthBigger || imageAspect==1 ? "100%" : "fit-content",
                                height:!originalFormat && isElementWidthBigger ? "fit-content" : "100%",
                            }} className='image' src={server+"/images/"+encodeURIComponent(cm) + (isPremiumView || cm.endsWith("premium.webp") ? "?q="+Math.floor(Math.random() * 4294967296) : "")}/>
                        </div>
                    </div>
                }
                const parts=(post.descricao || post.titulo || post.texto || "").split(/(?:\r\n| )/);
                return <div className='coluna' key={index}>
                    <div className='linha a' >
                        {post.tipo!="t" && <Link to={ l! } className="a">
                            { content}
                        </Link>}
                        <div className={"infos-post"+(post.tipo=="t" ? " post-texto" : "")}>
                            <Logo width={"2.4em"} logo={null} usuario={post.usuario}></Logo>
                            <div className="infos-post-container">
                                <Link to={l!} className='titulo a txt'>{parts.map((part:string,index:number)=>{
                                    return part[0]=="#" || part[0]=="@" ? <Link className='tag' to={part[0]=="#" ? "/busca?q="+encodeURIComponent(part) : "/@"+encodeURIComponent(part.slice(1))} key={index}>{part + (parts.length - 1 > index ? " " : "")}</Link> : part + (parts.length - 1 > index ? " " : "")
                                })}</Link>
                                <Link to={"/@"+encodeURIComponent(post.usuario)} className='nome a txt'>{post.usuario}</Link>
                            </div>
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