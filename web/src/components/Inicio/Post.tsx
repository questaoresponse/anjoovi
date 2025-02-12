import { memo } from 'react';
import Link from '../Link';
import './Post.scss';
// import Ads from '../Ads';
function Post({isLoaded,globals,posts,verifyScroll}:{isLoaded:any,globals:any,posts:any[],verifyScroll?:any}){
    const server=globals.server;
    if (!isLoaded){
        posts=Array.from({length:48},()=>{return {imagem:false,titulo:"",usuario:""}});
    }
    return (
        <div onScroll={verifyScroll || (()=>{})} id="tabela" className={'d-flex row p-0 postc'+(!isLoaded ? " loading" : "")}>
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
                    const values=["r1","r2","r3","r4"];
                    var isRd=false;
                    var isPremiumView=false;
                    const matches = cm ? cm.match(/^(\d+)(?=_\d+_i)/) : null;
                    if (matches) {
                        const r = Number(matches[1]);
                        isRd=(r & ~1) >> 1;
                        isPremiumView=(r & 1)==1;
                    }
                    l=(post.playlist || playlist ? '/playlist' : n ? '/noticia' : i ? '/imagem' : m ? '/musica' : t ? '/texto' : v ? "/video" : "/product")+'/'+post.id;
                    content=t ? null : <img className={'image' + (isRd ? " rd" : "")} src={server+"/images/"+encodeURIComponent(cm) + (isPremiumView || cm.endsWith("premium.webp") ? "?q="+Math.floor(Math.random() * 4294967296) : "")}/>
                }
                const parts=(post.descricao || post.titulo || post.texto || "").split(/(?:\r\n| )/);
                return <div className='coluna col-12 col-md-3 mb-4' key={index}>
                            <div className='linha a' >
                                {post.tipo!="t" && <Link to={ l! } className="a">
                                    <div className='imagemd'>
                                    {content}
                                    </div>
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
        </div>
    )
}
export default memo(Post);