import { createContext, useContext, useState, useRef, MutableRefObject, Dispatch, SetStateAction } from 'react';
import MyPeer from './MyPeer.js';
import PlayerClass from './PlayerClass.ts';
interface loadedInfosInterface{
  loaded:boolean
}
interface loginInterface{
  usuario:string | null,
  isLoged:string | null,
  logo:string | null
}
interface OptionsNavigate{
  changeURL?:boolean,
  lookTop?:boolean,
  callHandle?:boolean,
}
interface GlobalContextInterface {
  server:string,
  header:string | boolean,
  setHeader:Dispatch<SetStateAction<string | boolean>>
  mobile:boolean,
  renderAds:(remove?:boolean)=>void,
  login:loginInterface,
  setLogin:Dispatch<SetStateAction<loginInterface>>,
  currentLogin:MutableRefObject<loginInterface>,
  selected:string | undefined,
  setSelected:Dispatch<SetStateAction<string | undefined>>,
  inicioSelected:string | undefined,
  setInicioSelected:Dispatch<SetStateAction<string | undefined>>,
  modules:any,
  player:MutableRefObject<PlayerClass>,
  get:MutableRefObject<((initial?:boolean)=>void) | undefined>,
  setMobile:Dispatch<SetStateAction<boolean>>,
  verifyStories:MutableRefObject<((route:string)=>void) | null>,
  redirectError:string | null,
  setRedirectError:Dispatch<SetStateAction<string | null>>,
  navigate:(pathname:string,options?:OptionsNavigate)=>void,
  navigateClass:MutableRefObject<NavigateClass>,
  redirectTo:string | null,
  redirect:Dispatch<SetStateAction<string | null>>,
  isLoadedPage:MutableRefObject<boolean>,
  myStorage:any,
  cript:(text:string)=>string,
  descript:(text:string)=>string,
  setIsAds:Dispatch<SetStateAction<boolean | undefined>>,
  peer:MutableRefObject<MyPeer>,
  cargo:MutableRefObject<Cargo>,
  loadedInfos:MutableRefObject<loadedInfosInterface>,
  firstPageInfos:MutableRefObject<{isFirstPage:boolean,onChange:(fn:any)=>void}>
}
export default GlobalContextInterface;
declare global {
  interface Window {
    adsbygoogle:any[],
    dataLayer:any[]
  }
  interface ImportMeta{
    env:{DEV:boolean}
  }
}
class NavigateClass{
  navigateFn:()=>void=()=>{};
  listeners:((pathname:string)=>void)[]=[];
  navigateCurrent:((pathname:string,changeURL:boolean,lookTop:boolean)=>void) | undefined;
  firstEvents;
  firstPageInfos;
  pathname:string;
  constructor(firstEvents:MutableRefObject<any>,firstPageInfos:MutableRefObject<any>){
    this.firstEvents = firstEvents;
    this.firstPageInfos = firstPageInfos;
    this.navigate = this.navigate.bind(this);
    this.pathname=window.location.pathname;
  }
  setNavigateCurrent(fn:any):void{
    this.navigateCurrent=fn;
  }

  navigate(pathname:string,options:OptionsNavigate={changeURL:true,lookTop:true,callHandle:true}):void{
    if (!("changeURL" in options)){
      options.changeURL=true;
    }
    if (!("lookTop" in options)){
      options.lookTop=true;
    }
    if (!("callHandle" in options)){
      options.callHandle=true;
    }
    if (pathname!=this.pathname && options.callHandle){
      this.pathname=pathname;
      this.listeners.forEach(fn=>fn(pathname));
    }
    this.navigateCurrent && this.navigateCurrent!(pathname,options.changeURL!,options.lookTop!);
    this.firstPageInfos.current.isFirstPage=false;
    this.firstEvents.current.forEach((fn:any)=>fn());
    this.firstEvents.current=[];
  }

  addListener(fn:(pathname:string)=>void){
    this.listeners.push(fn);
  }
  removeListener(fn:(pathname:string)=>void){
    this.listeners=this.listeners.filter(func=>func!=fn);
  }
}
class Cargo{
  cargo:number | null=null;
  listeners:((cargo:number)=>void)[]=[];
  setCargo(cargo:number){
    if (this.cargo!=cargo){
      navigator.serviceWorker.controller && navigator.serviceWorker.controller.postMessage({type:"cargo",cargo:cargo,origin:"client"});
    }
    this.cargo=cargo;
    this.listeners.forEach(fn=>fn(cargo));
  }
  addListener(fn:(cargo:number)=>void){
    this.listeners.push(fn);
  }
  removeListener(fn:(cargo:number)=>void){
    this.listeners=this.listeners.filter(func=>func!=fn);
  }
}
const GlobalContext = createContext<GlobalContextInterface | undefined>(undefined);
const GlobalProvider = ({ children }:{children:any}) => {
    const server:string=import.meta.env.DEV ? window.location.protocol+"//"+window.location.host : "https://www.anjoovi.com";
    if (!import.meta.env.DEV && window.location.protocol=="https:"){
      const href = window.location.href;
      if (!href.includes('www')) {
        window.location.href=`${window.location.origin.replace('//', '//www.')}${window.location.pathname}${window.location.search}`;
      }
    }
    // https://www.anjoovi.com
    // const server="https://www.anjoovi.com";
    // var chave = 'ajsnckal';
  //  generate().then((r)=>{
  //   chave=r;
  //  });
  // chave=new TextEncoder().encode(JSON.stringify({alg: 'A256CBC', ext: true, k: 'XaH8hMNCjCMixoQ4-XMnEd8NTQjvProXg2iv3RmZ23k', key_ops: Array(2), kty: 'oct'}));
    // const chaveBuffer = new TextEncoder().encode(JSON.stringify(chave));
    //  chave = chaveBuffer.buffer;
    const arrayBufferToBase64=(buffer:any)=>{
      let binary = '';
      const bytes = new Uint8Array(buffer);
    
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    }
    const base64ToString=(base64String:any)=>{
      const binaryString = atob(base64String);
      const bytes = new Uint8Array(binaryString.length);
    
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
    
      return new TextDecoder().decode(bytes);
    }
    const cript=(dados:any)=>{
      const buffer = new TextEncoder().encode(dados);
      return arrayBufferToBase64(buffer);
    }

    // Função para descriptografar dados
    const descript=(dados:any)=>{
      return base64ToString(dados);
    }
    interface lgInterface{
      usuario:string | null,
      isLoged:string | null,
      lsrc:string | null
    }
    var lg2:string =localStorage.getItem("lg") || "";
    var lg:lgInterface=lg2!="" ? JSON.parse(lg2) : null;
    // const navigateCurrent=useRef<((pathname:string,changeURL:boolean,lookTop:boolean)=>void) | null>(null);

    const [header,setHeader]=useState<string | boolean>(false);
    // const [redirectTo,setRedirectTo]=useState(null);
    const [redirectError,setRedirectError]=useState<string | null>(null);
    const [login,setLoginState]=useState({
      usuario:lg && lg.usuario ? lg.usuario : null,
      isLoged:lg && lg.usuario ? "true" : "false",
      logo:lg && lg.lsrc ? descript(lg.lsrc) : null
    });
    const currentLogin=useRef<loginInterface>({
      usuario:lg && lg.usuario ? lg.usuario : null,
      isLoged:lg && lg.usuario ? "true" : "false",
      logo:lg && lg.lsrc ? descript(lg.lsrc) : null
    });
    const [mobile,setMobile]=useState(window.innerWidth < 769 ? true : false);
    const [homeInfo,setHomeInfo]=useState();
    const [isAds,setIsAds]=useState<boolean>();
    const logoClick=useRef(false);
    const verifyStories=useRef<((route:string)=>void) | null>(null);
    const [selected,setSelected]=useState<string>();
    const [inicioSelected,setInicioSelected]=useState<string>();
    const [redirectTo,redirect]=useState<string | null>(null);
    const cargo=useRef<Cargo>(new Cargo());
    const peer=useRef<MyPeer>(new MyPeer());
    const modules=useRef(null);
    const myStorage=useRef(false);
    const player=useRef(new PlayerClass);
    const get=useRef<((initial?:boolean)=>void) | undefined>(undefined);
    const isLoadedPage=useRef(true);
    const loadedInfos=useRef<loadedInfosInterface>({loaded:false});
    const firstEvents=useRef<any[]>([]);
    const firstPageInfos=useRef({isFirstPage:true,onChange:(fn:any)=>{
      firstEvents.current.push(fn);
    }});
    const navigateClass=useRef(new NavigateClass(firstEvents,firstPageInfos));
    const encode=(t:any)=>{
      return t.replace(" ","-").toLowerCase();
    }
    const setLogin=(f:any)=>{
      var value;
      if (typeof f=="function"){
        value=f(login);
      } else {
        value=f;
      }
      if (!currentLogin.current || (currentLogin.current.usuario!=value.usuario || currentLogin.current.logo!=value.lsrc)){
        setLoginState(value);
        currentLogin.current=value;
      };
    };
    const isLoaded2=useRef(false);
    const script=useRef<HTMLScriptElement | null>();
    // atauliza os anúncios conforme o necessário
    const renderAds=()=>{
      if (script.current){
        script.current.remove();
      }
      window.adsbygoogle=Array.from({length:document.querySelectorAll("ins").length-(isLoaded2.current ? 1 : 0)},()=>{return {}});
      const e=document.createElement("script");
      e.async=true;
      e.crossOrigin="anonymous";
      e.src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4004929109745703";
      document.body.appendChild(e);
      script.current=e;
      isLoaded2.current=true;
    }
    const variables=
    {
      server:server,
      header,setHeader,
      navigate:navigateClass.current.navigate,
      navigateClass:navigateClass,
      redirectError:redirectError,
      setRedirectError:setRedirectError,
      mobile:mobile,
      setMobile:setMobile,
      cript:cript,
      descript:descript,
      homeInfo:homeInfo,
      setHomeInfo:setHomeInfo,
      isAds:isAds,
      setIsAds,
      script:script,
      logoClick:logoClick,
      verifyStories:verifyStories,
      selected,
      setSelected,
      inicioSelected,
      setInicioSelected,
      renderAds,
      redirectTo,
      redirect,
      get,
      modules,
      myStorage,
      login,
      setLogin,
      currentLogin,
      isLoadedPage,
      encode,
      player,
      peer,
      cargo,
      loadedInfos,
      firstPageInfos
    }
  return (
    <GlobalContext.Provider value={variables}>
      {children}
    </GlobalContext.Provider>
  );
};
const useGlobal = () => {
  const contexto = useContext(GlobalContext);
  if (!contexto) {
    throw new Error('useMeuContexto deve ser usado dentro de um MeuContextoProvider');
  }
  return contexto;
};
export { GlobalProvider, useGlobal };

