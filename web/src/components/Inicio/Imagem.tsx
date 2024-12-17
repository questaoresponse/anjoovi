// Exemplo do componente Contact
import {useState, useEffect, useRef, memo } from 'react';
import Link, { eventInterface } from '../Link.tsx';
import { useGlobal } from '../Global.tsx';
import { useAuth } from '../Auth.jsx';
import './Imagem.scss'
import Ads from '../Ads.jsx';
import Comentarios from './Comentarios.jsx';
import Conteudo from './Conteudo.tsx';
import Denuncia from './Denuncia.tsx';
import './Conteudo.scss';
interface postInterface{
  alta:any,
  srcImagem:string | null,
  logo:string | null,
  nome:string,
  usuario:string,
  dataText:string,
  dataUpdateText:string,
  visualizacoes:number,
  inscrito:boolean | null,
  text:string[][],
  id:number,
  tipo:string,
  n_comment:number,
}
function Imagem({isPlaylist,id,func,isMain,Elements,post,onLinkClick}:{isPlaylist?:any,id?:number,func?:any,isMain?:any,Elements?:any,post:any,onLinkClick:any}) {
    onLinkClick !="";
  const globals = useGlobal();
  const { server, navigate }=globals;
  const auth = useAuth();
    // axios.post("http://www.teste.com",{type:"info"}).then((result)=>{
    //     posts=JSON.parse(result);
    // })
    const refs={
      descricao:useRef<HTMLDivElement>(null),
    }
    const [postAtual,setPostAtual]=useState<postInterface>({
      alta:[],
      srcImagem:null,
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
    function zero(number:string | number){
        return Number(number) < 10 ? "0"+number : String(number);
    }
    function get_date_s(d:any){
      const data = new Date(d + ' -03:00'); // Data e hora atuais
      data.setHours(data.getHours()-3);
      const dia = zero(data.getDate());
      const mes = zero(data.getMonth() + 1); // Os meses em JavaScript são base 0 (janeiro é 0, fevereiro é 1, etc.)
      const ano = data.getFullYear();
      const hora = zero(data.getHours());
      const minuto=zero(data.getMinutes());

      return `${dia}/${mes}/${ano} às ${hora}h${minuto}`;
    }
    const isLoaded=useRef<boolean>();
    const [summarized,setSummarized]=useState(false);
    const ajeitar=(post:any)=>{
        var dj=JSON.parse(post.d);
        var d=dj.o;
        const texto=(post.descricao || "").split(/\n/g).map((line:string)=>line ? line.split(" ") : []);
        texto.length>2 && setSummarized(true);
        setPostAtual({
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
            tipo:"imagem",
            n_comment:post.n_comment,
        })
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
    // const update=(pathname:string)=>{
    //     console.log("ai");
    //     if (waiting.current){
    //         if (p.current!=pathname){
    //             waiting.current=false;
    //             p.current=pathname;
    //         }
    //     }
    // }
    // useEffect(()=>{
    //     if (isMain){
    //         navigateClass.current.addListener(update);
    //         return ()=>{
    //             navigateClass.current.addListener(update);
    //         }
    //     }
    // },[]);
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
            {!isMain ? <Link onClick={(e:eventInterface)=>{e.preventDefault();func("/imagem/"+post.id,post.id)}} to={"/imagem/"+post.id} className="imagem disabled">
                <Conteudo infos={post} auth={auth} globals={globals}></Conteudo> 
                <div className={(post.usuario!="" ? "" : " wait ") + "descricao-imagem txt " + (!isMain ? "resumo" : "")} ref={refs.descricao}>{post.text.map((line:string[],i:number)=>{
                    return <>
                        {line.map((texto:string,index:number)=>{
                            return texto.length>1 && (texto[0]=="#" || texto[0]=="@") ? <Link className='tag' key={String(i)+String(index)} to={texto[0]=="#" ? "/busca?q="+encodeURIComponent(texto) : "/@"+encodeURIComponent(texto.slice(1,-1))}>{texto + ( line.length-1>index ? " " : "" )}</Link> : isValidURL(texto) ? <div key={index} className='tag' onClick={()=>onLinkClick(texto)}>{texto}</div> : texto + ( line.length-1>index ? " " : "" )
                        })}
                        <br></br>
                    </>
                })}</div>
                <div className="campo-img-imagem">
                    {post.srcImagem ? <img src={post.srcImagem}/> : <></>}
                </div>
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
            </Link> : <div className="imagem">
                <Conteudo infos={post} auth={auth} globals={globals}></Conteudo> 
                {summarized ? <div className='descricao-resumo-imagem'><div className="descricao-imagem txt overflow" ref={refs.descricao}>{post.text.map((line:string[],i:number)=>{
                    return <>
                        {line.map((texto:string,index:number)=>{
                            return texto.length>1 && (texto[0]=="#" || texto[0]=="@") ? <Link className='tag' key={String(i)+String(index)} to={texto[0]=="#" ? "/busca?q="+encodeURIComponent(texto) : "/@"+encodeURIComponent(texto.slice(1,-1))}>{texto + ( line.length-1>index ? " " : "" )}</Link> : isValidURL(texto) ? <div key={index} className='tag' onClick={()=>onLinkClick(texto)}>{texto}</div> : texto + ( line.length-1>index ? " " : "" )
                        })}
                        <br></br>
                    </>
                })}</div><div className='resumo-btn' onClick={()=>setSummarized(false)}>Ler mais...</div></div> : 
                <div className={"descricao-imagem txt " + (!isMain ? " resumo" : "")} ref={refs.descricao}>{post.text.map((line:string[],i:number)=>{
                    return <>
                        {line.map((texto:string,index:number)=>{
                            return texto.length>1 && (texto[0]=="#" || texto[0]=="@") ? <Link className='tag' key={String(i)+String(index)} to={texto[0]=="#" ? "/busca?q="+encodeURIComponent(texto) : "/@"+encodeURIComponent(texto.slice(1,-1))}>{texto + ( line.length-1>index ? " " : "" )}</Link> : isValidURL(texto) ? <div key={index} className='tag' onClick={()=>onLinkClick(texto)}>{texto}</div> : texto + ( line.length-1>index ? " " : "" )
                        })}
                        <br></br>
                    </>
                })}</div> }
                <div className="campo-img-imagem">
                    {post.srcImagem ? <img src={post.srcImagem}/> : <></>}
                </div>
                <div className="data_d">
                    <p className="data data_data">{post.dataText}</p>
                    {post.dataUpdateText!="" ? <p className="data data_a">{post.dataUpdateText}</p> : <></>}
                    { post.visualizacoes!=-1 ? <div className="visualizacoes"><p>{post.visualizacoes}</p><i className="bi-eye"></i></div> : null }
                    <Denuncia tipo="noticia"></Denuncia>
                </div>
            </div>}
            {/* {comentarios && <Comentarios id_comment={post.id}/>} */}

            {globals.mobile ? !isMain || isPlaylist ? <></> : <Comentarios previousRequest={previousRequest}/> : <></>}

            {/* <Ads slot="7693763089"/> */}
            {/* {!props.id && globals.mobile && <Post globals={globals} posts={infos.alta}/>} */}
        </div>
    }
    return !isMain ? <Nt post={postAtual}/> : (
        <div id="pg" className={'im cont' + (id ? " playlist" : "")}> 
            <div id="bottom">
                <div id="s1">
                    {post.id ? <Ads solt="7693763089"/> : <></>}
                    <Nt post={postAtual}/>
                    <Elements></Elements>
                    {!globals.mobile && !isPlaylist ? <Comentarios previousRequest={previousRequest}/> : <></> }
                    {/* {!props.id && !globals.mobile && <Alta server={server} posts={infos.alta}/>} */}
                </div>
            </div>
        </div>
    );
}
export default memo(Imagem);
