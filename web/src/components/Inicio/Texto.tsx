// Exemplo do componente Contact
import { useState, useEffect, useRef, memo } from 'react';
import Link, { eventInterface } from '../Link.tsx';
import { useGlobal } from '../Global.tsx';
import { useAuth } from '../Auth.jsx';
import './Texto.scss'
import Ads from '../Ads.jsx';
import Comentarios from './Comentarios.jsx';
import Conteudo from './Conteudo.tsx';
import Denuncia from './Denuncia.tsx';
import './Conteudo.scss';

interface postInterface{
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
function Texto({isPlaylist,id,func,isMain,Elements,post,onLinkClick}:{isPlaylist?:any,id?:number,func?:any,isMain?:any,Elements?:any,post:any,onLinkClick:any}) {
    const globals = useGlobal();
    const { server, navigate }=globals;
    const auth = useAuth();
    // axios.post("http://www.teste.com",{type:"info"}).then((result)=>{
    //     posts=JSON.parse(result);
    // })

    const [postAtual,setPostAtual]=useState<postInterface>({
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
        const [datePart, timePart] = new Date(d + ' -03:00').toLocaleString().split(', ');
        const [day, month, year] = datePart.split('/');
        const data:any = new Date(`${year}-${month}-${day}T${timePart}`);
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
    const c=useRef(0);
    useEffect(()=>{
        get();
        if (c.current>0) {
            if (isMain){
                // console.log("ai2");
                setIsReal(false);
            }
        }
        c.current++;
    },[post]);
    useEffect(()=>{
        if (isMain && !isReal){
            navigate("",{changeURL:false,lookTop:true});
            setIsReal(true);
        }
    },[isReal]);
    const previousRequest=useRef(["",false]);
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
        return <div className='posts-div'>
            {!isMain ? <Link onClick={(e:eventInterface)=>{e.preventDefault();func("/texto/"+post.id,post.id)}} to={"/texto/"+post.id} className="texto disabled">
                <Conteudo infos={post} auth={auth} globals={globals}></Conteudo>
                <div className={"texto-texto txt " + (!isMain ? " resumo" : "")}>{post.text.map((line:string[],i:number)=>{
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
                    <Denuncia tipo="texto"></Denuncia>
                </div>
            </Link> : <div className="posts-div texto">
                <Conteudo infos={post} auth={auth} globals={globals}></Conteudo>
                <div className={"texto-texto txt " + (!isMain ? " resumo" : "")}>{post.text.map((line:string[],i:number)=>{
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
                    { post.visualizacoes!=-1 ? <div className="visualizacoes"><p>{post.visualizacoes}</p><i className="bi-eye"></i></div> : null }
                    <Denuncia tipo="texto"></Denuncia>
                </div>
            </div>}
            {globals.mobile ? !isMain || isPlaylist ? <></> : <Comentarios previousRequest={previousRequest}/> : <></>}


            {/* <Ads slot="7693763089"/> */}
            {/* {!props.id && globals.mobile && <Post globals={globals} posts={infos.alta}/>} */}
        </div>
    }
    return !isMain ? <Nt post={postAtual}/> : (
        <div>
        <div id="pg" className={'tex cont' + (id ? " playlist" : "")}> 
            <div id="bottom">
                <div id="s1">
                    {post.id ? <Ads slot="7693763089"/> : <></>}
                    <Nt post={postAtual}></Nt>
                    <Elements></Elements>
                </div>
                {!globals.mobile && <Ads slot="7577017868"/>}
                {!globals.mobile && !isPlaylist ? <Comentarios previousRequest={previousRequest}/> : <></> }

                {/* {!props.id && !globals.mobile && <Alta server={server} posts={infos.alta}/>} */}
            </div>
        </div>
        </div>
    );
}
export default memo(Texto);
