import './Alta.scss';
import Link from '../Link';
function Alta(props:any){
    const {server,posts}=props;
    return (
        <div id="alta">
            {posts.map((post:any,index:number)=>{
                const p=post.tipo && post.tipo=="n";
                const i=post.tipo && post.tipo=="i";
                const m=post.tipo && post.tipo=="m";
                const c=p || i || m ? (p ? "/noticia" : i ? "/imagem": "/musica")+"/"+post.id : "";
                return (
                    <div className='post' key={index}>
                        <Link className='imagemd' to={c}>
                            {post.imagem ? <img src={server+"/images/"+encodeURIComponent(post.imagem)}/> : <div></div>}
                        </Link>
                        <div className='infos'>
                            <Link className='titulo txt' to={c}>{post.titulo}</Link>
                            <Link className='usuario txt' to={post.usuario ? "/@"+post.usuario : ""}>{post.usuario}</Link>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default Alta;