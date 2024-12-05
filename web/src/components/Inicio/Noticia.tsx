// Exemplo do componente Contact
import { useState, useEffect, useRef, memo } from 'react';
import Link, { eventInterface } from '../Link.tsx';
import { useGlobal } from '../Global.tsx';
import { useAuth } from '../Auth.jsx';
import './Noticia.scss'
import Ads from '../Ads.jsx';
import Comentarios from './Comentarios.jsx';
import Conteudo from './Conteudo.tsx';
import Denuncia from './Denuncia.tsx';
import './Conteudo.scss';

interface postInterface{
    isLoaded:boolean,
    srcImagem:string,
    titulo:string[],
    subtitulo:string[],
    logo:string | null,
    nome:string,
    usuario:string,
    dataText:string,
    dataUpdateText:string,
    visualizacoes:number,
    inscrito:null,
    text:string[][],
    id:number,
    tipo:string,
    n_comment:number,
    get?:()=>void,
//   get?:MutableRefObject<(initial?:boolean)=>void>,
}
function Noticia({isPlaylist,id,func,isMain,Elements,post,onLinkClick}:{isPlaylist?:any,id?:number,func?:any,isMain?:any,Elements?:any,post:any,onLinkClick:any}) {
    const globals = useGlobal();
    const { server, navigate, navigateClass }=globals;
    const auth = useAuth();
    // axios.post("http://www.teste.com",{type:"info"}).then((result)=>{
    //     posts=JSON.parse(result);
    // })

    const [postAtual,setPostAtual]=useState<postInterface>({
        isLoaded:false,
        srcImagem:"",
        titulo:[],
        subtitulo:[],
        logo:null,
        nome:"",
        usuario:"",
        dataText:"",
        dataUpdateText:"",
        visualizacoes:-1,
        inscrito:null,
        text:[],
        id:-1,
        tipo:"",
        n_comment:0,
    });
    // const updatePosts:(pathname:string,i:number)=>void=(pathname:string,i:number)=>{
    //     if (isMain){
    //         func(pathname,i);
    //         // console.log(isMain,posts.current.posts,posts.current.posts[i]);
    //     } else {
    //         console.log(pathname,i,isMain,posts.current.posts,posts.current.posts[i]);
    //         navigate!(pathname);
    //         // posts.current.posts[i].get.current && posts.current.posts[i].get.current!();
    //     }
    // };
    function zero(number:string | number){
        return Number(number) < 10 ? "0"+number : String(number);
    }
    function get_date_s(d:any){
        const data:Date = new Date(d); // Data e hora atuais
        data.setHours(data.getHours()-3);
        const dia = zero(data.getDate());
        const mes = zero(data.getMonth() + 1); // Os meses em JavaScript são base 0 (janeiro é 0, fevereiro é 1, etc.)
        const ano = data.getFullYear();
        const hora = zero(data.getHours());
        const minuto=zero(data.getMinutes());

        return `${dia}/${mes}/${ano} às ${hora}h${minuto}`;
    }
    const isLoaded=useRef<boolean>();
    // const escapeHtml=(unsafe:any)=>{
    //     return unsafe
    //         .replace(/&/g, "&amp;")
    //         .replace(/</g, "&lt;")
    //         .replace(/>/g, "&gt;")
    //         .replace(/"/g, "&quot;")
    //         .replace(/'/g, "&#039;");
    // }
    const ajeitar=async (post:any)=>{
        var dj=JSON.parse(post.d);
        var d=dj.o;
        const texto=(post.texto || "").split(/\n/g).map((line:string)=>line ? line.split(" ") : []);
        setPostAtual({
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
        });
    }
    const get=(initial=false)=>{
        if (initial && isLoaded.current) return;
        if (initial && !isLoaded.current) isLoaded.current=true;
        if (post){
            ajeitar(post);
        }
    }
    const [isReal,setIsReal]=useState(false);
    const p=useRef(window.location.pathname);
    const c=useRef(0);
    const waiting=useRef(false);
    useEffect(()=>{
        get();
        if (c.current>0) {
            if (isMain){
                waiting.current=true;
                setIsReal(false);
            }
        }
        c.current++;
    },[post]);
    useEffect(()=>{
        if (isMain && !isReal){
            setIsReal(true);
            navigate("",{changeURL:false,lookTop:true});
        }
    },[isReal]);
    const update=(pathname:string)=>{
        if (waiting.current){
            if (p.current!=pathname){
                waiting.current=false;
                p.current=pathname;
            }
        }
    }
    useEffect(()=>{
        if (isMain){
            navigateClass.current.addListener(update);
            return ()=>{
                navigateClass.current.addListener(update);
            }
        }
    },[]);
    const previousRequest=useRef(["",false]);
    // useEffect(()=>{
    //     if (isMain){
    //         console.log("mudanca",globals.mobile);
    //     }
    // });
    // faz com que o get seja chamado apenas após uma real modificação
    // verifica se a modificação no pathname ocorreu devido a mudança no id

    // const c=useRef<number[]>([0,0,0]);
    // useEffect(()=>{
    //   // veriifca se a chamada não é pela montagem do componente
    //   // verifica se a modificação no pathname ocorreu devido a mudança no id
    //   if (c.current[0]>0){
    //     // if (location.pathname!=pathname.current){
    //       get();

    //       // verifica se foi a primeira mudança, pois o anuncio só precisa ser carregado uma vez por tipo de página
    //       if (c.current[0]==1){
    //       globals.isRender();
    //       }
    //     // }
    //   }
    //   if (c.current[2]==1) c.current[2]=0;

    //   c.current[0]++;
    // },[location.pathname]);

    // useEffect(()=>{
    //   // veriifca se a chamada não é pela montagem do componente
    //   if (c.current[1]>0){
    //       get();
    //   }
    //   c.current[1]++;
    //   c.current[2]=1;
    // },[props.id]);
    const isValidURL=(str:any)=>{
        try {
          const url=new URL(str);
            return url.protocol=="https:";
        } catch (e) {
          return false;
        }
    }
    const Nt=({post}:{post:postInterface})=>{
        return <div>
            {!isMain ? <Link onClick={(e:eventInterface)=>{e.preventDefault();func("/noticia/"+post.id,post.id)}} to={"/noticia/"+post.id} className="noticia disabled">
                <Conteudo infos={post} auth={auth} globals={globals}></Conteudo>
                <div className="titulo-noticia">{post.titulo.map((titulo,index)=>{
                    return titulo.length>1 && titulo[0]=="@" ? <Link className='tag' key={index} to={"/@"+encodeURIComponent(titulo.slice(1))}>{titulo + ( post.titulo.length-1>index ? " " : "" )}</Link> : titulo + ( post.titulo.length-1>index ? " " : "" )
                })}</div>
                <div className="subtitulo-noticia">{post.subtitulo.map((subtitulo,index)=>{
                    return subtitulo.length>1 && (subtitulo[0]=="#" || subtitulo[0]=="@") ? <Link className='tag' key={String(index)} to={subtitulo[0]=="#" ? "/busca?q="+encodeURIComponent(subtitulo) : "/@"+encodeURIComponent(subtitulo.slice(1))}>{subtitulo + ( post.subtitulo.length-1>index ? " " : " " )}</Link> : subtitulo + ( post.subtitulo.length-1>index ? " " : "" )
                })}</div>
                <div className="campo-img-noticia">
                    {post.srcImagem ? <img src={post.srcImagem}/> : <></>}
                </div>
                <div className={"texto-noticia txt " + (!isMain ? " resumo" : "")}>{post.text.map((line:string[],i:number)=>{
                    return <>
                        {line.map((texto:string,index:number)=>{
                            return texto.length>1 && (texto[0]=="#" || texto[0]=="@") ? <Link className='tag' key={String(i)+String(index)} to={texto[0]=="#" ? "/busca?q="+encodeURIComponent(texto) : "/@"+encodeURIComponent(texto.slice(1))}>{texto + ( line.length-1>index ? " " : "" )}</Link> : isValidURL(texto) ? <div key={index} className='tag' onClick={()=>onLinkClick(texto)}>{texto}</div> : texto + ( line.length-1>index ? " " : "" )
                        })}
                        <br></br>
                    </>
                })}</div>
                <div className="data_d">
                    <p className="data data_data">{post.dataText}</p>
                    {post.dataUpdateText!="" ? <p className="data data_a">{post.dataUpdateText}</p> : <></>}
                    { post.visualizacoes!=-1 ? <div className="visualizacoes"><p>{post.visualizacoes}</p><i className="bi-eye"></i></div> : null }
                    {!isMain && <div className='n_comment'>
                        <p>{post.n_comment}</p>
                        <i className='bi-chat-dots'></i>
                    </div>}
                    <Denuncia tipo="noticia"></Denuncia>
                </div>
            </Link> : <div className={"noticia"+(!postAtual.isLoaded ? " loading" : "")}>
                <Conteudo infos={post} auth={auth} globals={globals}></Conteudo>
                <div className="titulo-noticia">{post.titulo.map((titulo,index)=>{
                    return titulo.length>0 && titulo[0]=="@" ? <Link className='tag' key={index} to={"/@"+encodeURIComponent(titulo.slice(1))}>{titulo + ( post.titulo.length-1>index ? " " : "" )}</Link> : titulo + ( post.titulo.length-1>index ? " " : "" )
                })}</div>
                <p className="subtitulo-noticia">{post.subtitulo.map((subtitulo,index)=>{
                    return subtitulo.length>0 && (subtitulo[0]=="#" || subtitulo[0]=="@") ? <Link className='tag' key={String(index)} to={subtitulo[0]=="#" ? "/busca?q="+encodeURIComponent(subtitulo) : "/@"+encodeURIComponent(subtitulo.slice(1))}>{subtitulo + ( post.subtitulo.length-1>index ? " " : "" )}</Link> : subtitulo + ( post.subtitulo.length-1>index ? " " : "" )
                })}</p>
                <div className={(post.usuario!="" ? "" : "wait ")+"campo-img-noticia"}>
                    {post.srcImagem ? <img src={post.srcImagem}/> : <></>}
                </div>
                <div className={"texto-noticia txt " + (!isMain ? " resumo" : "")}>{post.text.map((line:string[],i:number)=>{
                    return <>
                        {line.map((texto:string,index:number)=>{
                            return texto.length>0 && (texto[0]=="#" || texto[0]=="@") ? <Link className='tag' key={String(i)+String(index)} to={texto[0]=="#" ? "/busca?q="+encodeURIComponent(texto) : "/@"+encodeURIComponent(texto.slice(1))}>{texto + ( line.length-1>index ? " " : "" )}</Link> : isValidURL(texto) ? <div key={index} className='tag' onClick={()=>onLinkClick(texto)}>{texto + ( line.length-1>index ? " " : "" )}</div> : texto + ( line.length-1>index ? " " : "" )
                        })}
                        <br></br>
                    </>
                })}</div>
                <div className="data_d">
                    <p className="data data_data">{post.dataText}</p>
                    {post.dataUpdateText!="" ? <p className="data data_a">{post.dataUpdateText}</p> : <></>}
                    { post.visualizacoes!=-1 || !post.isLoaded ? <div className="visualizacoes"><p>{post.isLoaded ? post.visualizacoes : ""}</p><i className="bi-eye"></i></div> : null }
                    <Denuncia tipo="noticia"></Denuncia>
                </div>
            </div>}
            {globals.mobile ? !isMain || isPlaylist ? <></> : <Comentarios previousRequest={previousRequest}/> : <></>}
            {/* <Ads slot="7693763089"/> */}
            {/* {!props.id && globals.mobile && <Post globals={globals} posts={infos.alta}/>} */}
        </div>
    };
    return !isMain ? <Nt post={postAtual}/> : (
        <div>
        <div id="pg" className={'no cont' + (id ? " playlist" : "")}> 
            <div id="bottom">
                <div id="s1">
                    {post.id ? <Ads slot="7693763089"/> : <></>}
                    <Nt post={postAtual}></Nt>
                    {isReal ? <Elements></Elements> : <></>}
                </div>
                {!globals.mobile && <Ads slot="7577017868"/>}
                {!globals.mobile && !isPlaylist ? <Comentarios previousRequest={previousRequest}/> : <></> }

                {/* {!props.id && !globals.mobile && <Alta server={server} posts={infos.alta}/>} */}
            </div>
        </div>
        </div>
    );
}
export default memo(Noticia);
