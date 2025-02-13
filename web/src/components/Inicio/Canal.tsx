import { memo,useState,useEffect, useCallback, useRef, MutableRefObject } from 'react';
import { useLocation } from 'react-router-dom';
import Link from '../Link.tsx';
import { useAuth } from '../Auth.jsx';
import GlobalContextInterface, { useGlobal } from '../Global.tsx';
import './Canal.scss';
import '../../d.ts';
import sem_imagem from "../static/sem-imagem.jpg";
import Logop from '../Logop.jsx';
import Post from './Post.jsx';
import X from '../X.tsx';
//mobile
const Content1=memo(({showAbout,initChat,showCard,option,globals,values,navigate,inscrever,onStart, onMove, onEnd,btnsRef}:{showAbout:()=>void,initChat:()=>void,option:string | null,showCard:()=>void,globals:GlobalContextInterface,values:any,navigate:(url:string)=>void,inscrever:(event:any)=>void,onStart:(e:any)=>void,onMove:(e:any)=>void,onEnd:(e:any)=>void,btnsRef:MutableRefObject<HTMLDivElement | null>})=>{
    const server=globals.server;
    const post=option ? values.destaques[option] : null;
    var option_correct;
    var type;
    var src;
    if (post){
        option_correct=post.tipo=="p" ? "noticia" : post.tipo=="i" ? "imagem" : post.tipo=="m" ? "musica" : post.tipo=="t" ? "texto" : post.tipo=="v" ? "video" : "playlist";
        if (["p","i","m","v","pl"].includes(post.tipo)){
            type="img";
            src=post.imagem;
        } else if (post.tipo=="t"){
            type="text";
        }
    }
    return (
        <div id="top">
                <div id="pg-t">
                    <div id="banner" className="d-inline-block col-12 col-md-9 p-0"><img src={values.banner}/></div>
                    <div id="dl2">
                        <LogoComponent navigate={navigate} globals={globals} pathname={location.pathname} logo={values.logo} usuario={values.usuario} stories={values.post_24}/>
                        <div className="di">
                            <div className="nomed">
                                <div className="c_nome txt-1">{values.name}</div>
                                <div className="c_usuario txt-1">{values.usuario!="" ? "@"+values.usuario : null}</div>
                            </div>
                            <div className='infosd'>
                                <div className="n_inscritos">{values.inscrito+(values.inscrito>1 ? " inscritos" : " inscrito")}</div>
                                <div className="num">{values.num+(values.num>1 ? " postagens" : " postagem")}</div>
                            </div>
                        </div>
                    </div>
                    <div id="group-mobile">
                        <div ref={btnsRef} id="group-btns" onMouseDown={onStart} onTouchStart={onStart} onMouseMove={onMove} onTouchMove={onMove} onMouseUp={onEnd} onMouseLeave={onEnd} onTouchEnd={onEnd}>
                            <div onClick={inscrever} className="inscrever group-btn-item">{values.isInscrito ? "Seguindo" : "Seguir"}</div>
                            <div className="mensagem group-btn-item" onClick={initChat}>Mensagem</div>
                            <div className="card group-btn-item" onClick={showCard}>Card</div>
                            <div className="about group-btn-item" onClick={showAbout}>Sobre</div>
                        </div>
                    </div>
                </div>  
            { option ? <Link to={"/"+option_correct+"/"+values.destaques[option].id} id="destaque" style={{background:post.tipo!="t" ? "gray" : "rgba(0,0,0,0)"}}>
                {option && values.destaques[option] ? type=="img" ? <img className="imagem-canal" src={server+"/images/"+encodeURIComponent(src)}></img> : type=="text" ? <div className='texto-canal txt'>{post.titulo}</div> : <img className='imagem-canal' src={sem_imagem}></img> : <img className='imagem-canal' src={sem_imagem}></img>}
            </Link> : <div id="destaque"><img className='imagem-canal' src={sem_imagem}></img></div> }
            </div>
        );
});
//pc
const Content2=memo(({showAbout,initChat,showCard,option,globals,values,navigate,inscrever,onStart, onMove, onEnd,btnsRef}:{showAbout:()=>void,initChat:()=>void,option:string | null,showCard:()=>void,globals:GlobalContextInterface,values:any,navigate:(url:string)=>void,inscrever:(event:any)=>void,onStart:(e:any)=>void,onMove:(e:any)=>void,onEnd:(e:any)=>void,btnsRef:MutableRefObject<HTMLDivElement | null>})=>{
    const server=globals.server;
    const post=option ? values.destaques[option] : null;
    var option_correct;
    var type;
    var src;
    if (post){
        option_correct=post.tipo=="p" ? "noticia" : post.tipo=="i" ? "imagem" : post.tipo=="m" ? "musica" : post.tipo=="t" ? "texto" : post.tipo=="v" ? "video" : "playlist";
        if (["p","i","m","v","pl"].includes(post.tipo)){
            type="img";
            src=post.imagem;
        } else if (post.tipo=="t"){
            type="text";
        }
    }
    return (
    // <div id="top">
        // <div id="topd">
            <div id="topb">
                { option ? <Link to={"/"+option_correct+"/"+values.destaques[option].id} id="destaque" style={{background:post.tipo!="t" ? "gray" : "rgba(0,0,0,0)"}}>
                    {option && values.destaques[option] ? type=="img" ? <img className="imagem-canal" src={server+"/images/"+encodeURIComponent(src)}></img> : type=="text" ? <div className='texto-canal txt'>{post.titulo}</div> : <img className='imagem-canal' src={sem_imagem}></img> : <img className='imagem-canal' src={sem_imagem}></img>}
                </Link> : <div id="destaque"><img className='imagem-canal' src={sem_imagem}></img></div> }
                <div id="pg-t">
                <div id="banner" className="d-inline-block col-12 col-md-9 p-0"><img src={values.banner}/></div>
                <div id="dl2">
                    <LogoComponent navigate={navigate} globals={globals} pathname={location.pathname} logo={values.logo} usuario={values.usuario} stories={values.post_24}/>
                    <div className="di">
                        <div className="nomed">
                            <div className="c_nome txt-1">{values.name}</div>
                            <div className="c_usuario txt-1">{values.usuario!="" ? "@"+values.usuario : null}</div>
                        </div>
                        <div className='infosd'>
                            <div className="n_inscritos">{values.inscrito+(values.inscrito>1 ? " inscritos" : " inscrito")}</div>
                            <div className="num">{values.num+(values.num>1 ? " postagens" : " postagem")}</div>
                        </div>
                        <div id='group-mobile'>
                            <div ref={btnsRef} id='group-btns' onMouseDown={onStart} onTouchStart={onStart} onMouseMove={onMove} onTouchMove={onMove} onMouseUp={onEnd} onMouseLeave={onEnd} onTouchEnd={onEnd}>
                                <div onClick={inscrever} className="inscrever group-btn-item">{values.isInscrito ? "Seguindo" : "Seguir"}</div>
                                <div className="mensagem group-btn-item" onClick={initChat}>Mensagem</div>
                                <div className="card group-btn-item" onClick={showCard}>Card</div>
                                <div className="about group-btn-item" onClick={showAbout}>Sobre</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});
const LogoComponent=memo(({navigate,globals,logo,usuario,stories,pathname}:{navigate:(url:string)=>void,globals:GlobalContextInterface,logo:string,usuario:string,stories:any,pathname:string})=>{

    const onClick=(e:any)=>{
        if (globals.login.isLoged && globals.login.isLoged!="true"){
            e.preventDefault();
            navigate("/admin");
        }
    }
    return (
        <>
            { stories ? 
            <Link onClick={onClick} to={"/stories/"+stories+"?origin="+encodeURIComponent(pathname)} id="logodiv" className={stories ? "stories" : "no-stories"}>
                <Logop logo={logo} usuario={usuario}/>
            </Link>
           :
           <div id="logodiv" className={stories ? "stories" : "no-stories"}>
                <Logop logo={logo} usuario={usuario}/>
            </div>
            }
        </>
    )
});
function Canal(){
    const statep=useRef({
        options:{},
    });
    const [state,setState]=useState({
        isLoaded:false,
        posts:[],
        classe:-1,
        option:null,
    })
    const options:{[chave:string]:any}=statep.current.options;
    const globals=useGlobal();
    const { server,navigate }=globals;
    const auth=useAuth();
    const location=useLocation();
    const [cardInfos,setCardInfos]=useState<{card:boolean,links:string[],titles:{[key:string]:string},descriptions:{[key:string]:string}}>({card:false,links:[],titles:{},descriptions:{}});
    const [about,setAbout]=useState(false);
    const [link,setLink]=useState<(string | boolean)[]>([false,""]);
    const [values,setValues]=useState({
        name:"",
        usuario:"",
        description:"",
        card:{links:[],titles:{},descriptions:{}},
        num:0,
        inscrito:0,
        banner:sem_imagem,
        logo:"",
        post_24:false,
        isInscrito:false,
        visualized:false,
        destaques:{
            inicio:null,
            materias:null,
            imagens:null,
            musicas:null,
            playlists:null
        }
    });
    const refs={
        tipot:useRef<HTMLDivElement>(null),
        pai:useRef<HTMLDivElement>(null),
    };
    const correct:string[]=["materias","imagens","musicas","textos","videos","playlists"];
    const correctTips:string[]=["inicio","materias","imagens","musicas","textos","videos","playlists"];

    const exists=useRef<string[]>([]);
    const [privado,setPrivado]=useState(false);
    const isLoaded=useRef<boolean>();
    const isDataLoaded=useRef(false);
    const get=useCallback(async (initial=false)=>{
        if (initial && isLoaded.current) return;
        if (initial && !isLoaded.current) isLoaded.current=true;
        var result=await auth.post(server+location.pathname,{type:"info"});
        if (result.error){
            globals.redirectError.current(result.error);
        } else  if (result.data.result=="privado"){
            setPrivado(true);
        } else {
            var data=result.data;
            var info=data.info;
            var c=0;
            for (var o of correct){
                if (Array.isArray(data[o]) && data[o].length>0){
                    options[o]=data[o];
                    !exists.current.includes(o) && exists.current.push(o);
                    if (c<2){
                       c++;
                    }
                } 
            }
            if (data.playlists.length>0){
                data.playlists=data.playlists.map((playlist:any)=>{
                    const findId=JSON.parse(playlist.posts)[0];
                    return {
                    playlist:true,
                    tipo:playlist.tipo=="post" ? "p" : playlist.tipo=="post_imagem" ? "i" : "m",
                    usuario:playlist.usuario,
                    titulo:playlist.titulo,
                    //filtra o json [id]:imagem e verifica se a chave é o id a ser procurado, caso seja, ele pega o unico json retornado pelo filter e acessa ele pelo id filtrado
                    imagem:JSON.parse(playlist.imagem).filter((json:any)=>findId in json)[0][findId],
                    id:playlist.id,
                    views_id:playlist.views_id
                }});
            }
            if (c>1){
                var all = correct.map(key => data[key]).reduce((acc, arr) => acc.concat(arr), []);
                if (all.length>0){
                    const comparar=(a:any,b:any)=>{
                        return b.views_id - a.views_id;
                    }
                    all.sort(comparar);
                    all.slice(0,48);
                }
                options["inicio"]=all;
                !exists.current.includes("inicio") && exists.current.unshift("inicio");
            }
            if (data.playlists.length>0){  
                options["playlists"]=data.playlists;  
            }
            updateSearch();
            const v=(t:any)=>{
                const destaque=JSON.parse(destaques[t]);
                return {titulo:destaque[0],imagem:destaque[1],id:destaque[2],tipo:destaque[3]};
            }
            const transform=(option:string)=>{
                const post=options[option][0];
                return {titulo:post.titulo,imagem:post.imagem,id:post.id,tipo:post.tipo};
            }
            document.title=info.nome+" - Anjoovi";
            const dd:{[chave:string]:any}={};
            if (c>0){
                var destaques=data.destaques;
                var is_geral=destaques.geral;
                var geral=options["inicio"] ? 
                    destaques.geral ? v("geral") : transform("inicio")
                : transform(Object.keys(options)[0]) ? transform(Object.keys(options)[0]) : null;
                const gerals:{[key:string]:any}={};
                const names:{[key:string]:string}={
                    materias:"materia",
                    imagens:"imagem",
                    musicas:"musica",
                    textos:"texto",
                    videos:"video",
                    playlists:"playlist"
                };
                for (const name in names){
                    gerals[names[name]]=geral;
                }
                if (!is_geral){
                    for (const name in names){
                        gerals[names[name]]=options[name] ? options[name][0] : null;
                    }
                }   
                dd["inicio"]=geral;
                for (const name in names){
                    dd[name]=destaques[names[name]] ? v(names[name]) : gerals[names[name]];
                }
            }
            // if (data.playlists.length>0){
            //     const playlist=data.playlists[0];
            //     dd["playlists"]={usuario:playlist.usuario,titulo:"",imagem:playlist.imagem,id:playlist.id,tipo:"playlist"};
            // }
            interface infoaInterface{
                    name:string,
                    usuario:string,
                    description:string,
                    card:{links:string[],titles:{[key:string]:string},descriptions:{[key:string]:string}},
                    num:number,
                    inscrito:number,
                    logo:string,
                    post_24:any,
                    isInscrito:boolean,
                    visualized:boolean,
                    destaques:any,
                    banner:string,
            }
            const infoa:infoaInterface={
                name:info.nome,
                usuario:info.usuario,
                description:info.description,
                card:JSON.parse(info.card),
                num:info.n_posts,
                inscrito:info.n_inscritos,
                logo:info.logo,
                post_24:info.post_24,
                isInscrito:data.inscrito,
                visualized:data.visualized,
                destaques:dd,
                banner:sem_imagem,
            }

            setCardInfos(card=>{return {...card,links:infoa.card.links,titles:infoa.card.titles,descriptions:infoa.card.descriptions}});
            if (infoa.visualized){
                !refs.pai.current!.classList.contains("vis") && refs.pai.current!.classList.add("vis");
            }
            if (info.banner){
                infoa.banner=server+"/images/"+encodeURIComponent(info.banner);
            }
            setValues((prevValues:any)=>({...prevValues,...infoa}));
            data.inscrito=globals.login.usuario==info.usuario ? false : (data.inscrito ? "true" : "false");
            isDataLoaded.current=true;
            update(location.pathname);
        };
    },[server,location.pathname]);
    get(true);
    const inscrever=useCallback(async ()=>{
        if (globals.login.isLoged){
            if (globals.login.isLoged=="false"){
                globals.redirectError.current("/admin");
            } else {
                var result=await auth.post(server+"/@"+values.usuario,{type:"option"});
                if (result.error){
                    globals.redirectError.current(result.error);
                } else if (result.data.result=="privado"){
                    setPrivado(true);
                } else if (result.data.result=="my"){
                    setValues((prevValues)=>({...prevValues,inscrito:result.data.n_inscritos}));
                } else if (result.data.result=="true"){
                    setValues((prevValues)=>({...prevValues,inscrito:result.data.n_inscritos,isInscrito:!prevValues.isInscrito}));
                };
            }
        }
    },[globals.login,values.isInscrito,values.usuario]);
    const update=(pathname:any)=>{
        isDataLoaded.current=false;
            const isNull=Object.keys(options).filter((option:string)=>options[option]).length==0;
            if (isNull){
                setState({posts:[],classe:-1,option:null,isLoaded:true});
            } else {
                const opt=pathname.split("/");
                const firstOption=exists.current.find((existsType)=>existsType in options);
                const o=opt[2] ? correctTips.findIndex(option=>option==opt[2]) : correctTips.findIndex(option=>option==firstOption);
                setState({posts:options[correctTips[o]],classe:o,option:opt.length>2 ? opt[2] : firstOption,isLoaded:true});
            }
    };
    const updateSearch=()=>{
        if (location.pathname && location.pathname.split("/").length > 2 && !correct.includes(location.pathname.split("/")[2])){
            navigate!("/erro?origin="+encodeURIComponent(location.pathname+location.search));
        } else if (exists.current.length>0 || isDataLoaded.current){
            update(location.pathname);
        }
    }
    const m:any=useCallback((e:any)=>{
        const o=[...e.target.parentNode.children].findIndex(el=>el==e.target);
        navigate!("/"+location.pathname.split("/")[1]+(o==0 ? "" : "/"+exists.current[o]));
        update("/"+location.pathname.split("/")[1]+(o==0 ? "" : "/"+exists.current[o]));
    },[]);
    const showAbout=()=>{
        setAbout(true);
        setCardInfos(card=>{return {...card,card:false}});
    }
    const initChat=()=>{
        if (globals.login.isLoged=="true"){
            if (globals.login.usuario==values.usuario){
                navigate!("/chats");
            } else {
                auth.post(server+"/chat_init",{canal:values.usuario}).then(result=>{
                    if (result.data.result=="true"){
                        if (result.data.chat_id==0){
                            navigate!("/chat/"+"0?user="+encodeURIComponent(btoa(values.usuario)));
                        } else {
                            navigate!("/chat/"+result.data.chat_id);
                        }
                    }
                });
            }
        } else {
            navigate!("/admin");
        }
    }
    const showCard=()=>{
        setCardInfos(card=>{return {...card,card:true}});
        setAbout(false);
    }
    const navigateToCard=(link:string)=>{
        try {
            const url=new URL(link);
            if (url.protocol=="https:"){
                setLink([true,link]);
            }
        } catch (e) {
            return false;
        }
    };
    const isValidUrl=(str:string)=>{
        try {
            const url=new URL(str);
            return url.protocol=="https:";
        } catch (e) {
            return false;
        }
    }
    const goToLink=()=>{
        setLink([false,""]);
        window.open((link[1]!).toString(),"_blank");
    };
    useEffect(()=>{
        updateSearch();
    },[location.pathname]);
    const btnsRef=useRef<HTMLDivElement | null>(null);
    const x=useRef<number | null>(null);
    const onStart=(e:any)=>{
        x.current=e.clientX || e.touches[0].x;
    }
    const onMove=(e:any)=>{
        if (!x.current) return;
        const pointY=e.clientX || e.touches[0].x;
        btnsRef.current!.scrollLeft-=pointY - x.current;
        x.current=pointY;
    }
    const onEnd=(_:any)=>{
        x.current=null;
    }
    return (
        <>
        { privado ? <div id="private">Esse usuário foi suspenso.</div> :
            <div ref={refs.pai} className="row top-25 p-0 m-0 can d-block" style={{width:"100%"}}>
                {globals.mobile ? <Content1 showAbout={showAbout} initChat={initChat} showCard={showCard} option={state.option} inscrever={inscrever} globals={globals} values={values} navigate={navigate!} onStart={onStart} onMove={onMove} onEnd={onEnd} btnsRef={btnsRef}/>
                : <Content2 showAbout={showAbout} initChat={initChat} showCard={showCard} option={state.option} inscrever={inscrever} globals={globals} values={values} navigate={navigate!} onStart={onStart} onMove={onMove} onEnd={onEnd} btnsRef={btnsRef}/>}
                <div id="meio">
                    {/* <div id="meiomargin"></div> */}
                    <div id="meiob">
                        <div id="tipod">
                            <div id="tipobd" style={{display:Object.keys(options).length>0 ? "block" : "none"}} className={state.classe>-1 ? "selected"+(state.classe+1) : "no-selected" }></div>
                            <div ref={refs.tipot} id="tipot">
                                { options["inicio"] ? <div onClick={m} className="tipo t1">Inicio</div> : null}
                                { options["materias"] ? <div onClick={m} className="tipo t2">Matérias</div> : null }
                                { options["imagens"] ? <div onClick={m} className="tipo t3">Imagens</div> : null }
                                { options["musicas"] ? <div onClick={m} className="tipo t4">Músicas</div> : null }
                                { options["textos"] ? <div onClick={m} className="tipo t5">Textos</div> : null }
                                { options["videos"] ? <div onClick={m} className="tipo t6">Vídeos</div> : null }
                                { options["playlists"] ? <div onClick={m} className="tipo t7">Playlists</div> : null }
                            </div>
                        </div>
                        <Post isLoaded={state.isLoaded} globals={globals} posts={state.posts}/>
                    </div>
                </div>
                <div id="aboutMenu" style={{display:about ? "block" :" none"}}>
                    <div id="description-label">Sobre</div>
                    <div id="description">{values.description.split(/\n/g).map((description:string,index:number)=>{
                        return <div key={index}>{description}</div>
                    })}</div>
                    <X id="description-x" onClick={()=>setAbout(false)}></X>
                </div>
                <div id="cardMenu" style={{display:cardInfos.card ? "block" : "none"}}>
                    <div id="card-label">Card</div>
                    <div id="card">{values.card.links.map((link:string,index:number)=>{
                        return isValidUrl(link) ? <div className='card-item'>
                            <div className='card-item-title'>{cardInfos.titles[link]}</div>
                            <div key={index} className="card-item-link" onClick={()=>navigateToCard(link)}>{link}</div>
                            <div key={index} className="card-item-description">{cardInfos.descriptions[link]}</div>
                        </div> : <></>
                    })}</div>
                    <X id="card-x" onClick={()=>setCardInfos(card=>{return {...card,card:false}})}></X>

                </div>
                <div id="tp-link-d" style={{display:link[0] ? "flex" : "none"}}>
                    <div id="tp-link-content">
                        <div id="tp-link-t">Deseja seguir para esse site?</div>
                        <div id="tp-link-btn">
                            <div id="tp-link-confirm" onClick={goToLink}>Confirmar</div>
                            <div id="tp-link-cancel" onClick={()=>setLink([false,""])}>Cancelar</div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    );
}
export default Canal;