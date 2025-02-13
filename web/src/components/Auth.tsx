import { createContext, useCallback, useContext, useEffect } from 'react';
import { useGlobal } from './Global.tsx';
import axios from 'axios';
// import axios from 'axios';
interface resultInterface{
  data:{
    result:string,
    [chave:string]:any,
  },
  error:any,
}
interface authInterface{
  get:(pathname:string)=>Promise<resultInterface>,
  post:(pathname:string,json:{[chave:string]:string} | FormData,...options:any[])=>Promise<resultInterface>
}
export default authInterface;
export type { resultInterface };
axios.defaults.withCredentials = true;
const AuthContext = createContext<authInterface | null>(null);
const AuthProvider = ({ children }:{children:any}) => {
  const globals=useGlobal();
  // const myStorage=useRef(false);
  var token = localStorage.getItem('lg');
  token && (token=JSON.parse(token).token);
  // const errorJson=(err:any,res:any)=>{
  //   throw new Error("Error to convert the response in json: Err:"+err+" Response:"+res);
  // };
  const errorRequest=(err:any)=>{
    throw new Error("Error in the request:"+err);
  };
  if (localStorage.getItem("token")){
    globals.myStorage.current=true;
    localStorage.setItem("lg",JSON.stringify({usuario:localStorage.getItem("us"),token:localStorage.getItem("token"),us:localStorage.getItem("us"),lsrc:localStorage.getItem("lsrc")}))
    globals.myStorage.current=true;
    localStorage.removeItem('token');
    globals.myStorage.current=true;
    localStorage.removeItem('us');
    globals.myStorage.current=true;
    localStorage.removeItem('lsrc');
  }
  const a=(res:any,resolve:any)=>{
    if (res.data.cargo){
      globals.cargo.current.cargo!=res.data.cargo && globals.cargo.current.setCargo(res.data.cargo);
    }
    if (res.data.header_location){
      if (res.data.header_location=="/admin"){
        // globals.setUser(false);
        globals.setLogin(_=>{return {logo:null,usuario:null,isLoged:"false"}});
        localStorage.getItem("lg") && localStorage.removeItem("lg");
        globals.myStorage.current=true;
        globals.redirect("/admin");
      } else {
        globals.redirect(res.data.header_location);
      }
    } else if (res.data.header_erro || (res.data.result=="false" && res.data.type=="not_logged")){
        globals.redirectError.current("/erro");
    } else {
      if (globals.currentLogin.current.isLoged!="false" || res.data.usuario){
        const lgs=localStorage.getItem("lg");
        var lg:{usuario:string,lsrc:string,token:string} | null=null;
        lgs && (lg=JSON.parse(lgs));
        var u=res.data.hasOwnProperty("usuario") ? res.data.usuario : lg ? lg.usuario : null;
        var t=res.data.hasOwnProperty("token") ? res.data.token : lg ? lg.token : null;
        var l=res.data.hasOwnProperty("lsrc") ? globals.cript(res.data.lsrc) : lg ? lg.lsrc : null;
        if (!lg || (lg && (lg.usuario!=u || lg.token!=t || lg.lsrc!=l))){
          globals.setLogin((login)=>{
            return {
              usuario:res.data.hasOwnProperty("usuario") ? res.data.usuario : login.usuario,
              isLoged:res.data.hasOwnProperty("usuario") ? res.data.usuario ? "true" : "false" : login.isLoged,
              logo:res.data.hasOwnProperty("lsrc") ? res.data.lsrc : login.logo,
            }
          });
          globals.myStorage.current=true;
          localStorage.setItem("lg",JSON.stringify({
            usuario:u,
            token:t,
            lsrc:l,
          }));
        }
      }
      resolve(res);
    }
  };
    const variable:authInterface={
      post:async (url,data,...p)=>{
        if (!import.meta.env.DEV){
          window.location.protocol=="http:" && (url=url.replace(":9000",""));
        }
        if (window.location.host=="www.dev.anjoovi.com" && url.includes("www.anjoovi.com")){
          url=url.replace("www.anjoovi.com","www.dev.anjoovi.com");
        }
        return new Promise(async (r,j)=>{
          if (p.length>0 && p[0].arquivo){
            delete p[0].arquivo;
            if (data instanceof FormData){
              data.append("token",token!);
            }
            if (!p[0].porcentagem){
              axios.post(url,data,{
                headers: {
                  'Content-Type': 'multipart/form-data',
                }
              })
              .then((result)=>{
                var res=result;
                // try {
                //   res=JSON.parse(result.data);
                // } catch (err){
                //   errorJson(err,res);
                //   j(err);
                // }
                a(res,r);
              })
              .catch((err)=>{
                errorRequest(err);
                j(err);
              });
            } else {
              axios.post(url,data,{
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: p[0].porcentagem        
              })
              .then(res=>a(res,r))
              .catch (error=>errorRequest(error));

            }
          } else {
            data={token:token!,...data};
            axios.post(url,data,{
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            })
            .then((result)=>{
              var res=result;
              // try {
              //   res=JSON.parse(result.data);
              // } catch (err){
              //   errorJson(err,res);
              //   j(err);
              // }
              a(res,r);
            })
            .catch((err)=>{
              errorRequest(err);
              j(err);
            });
          }
        })
      },
      get:async (url,..._)=>{
        if (!import.meta.env.DEV){
          window.location.protocol=="http:" && (url=url.replace(":9000",""));
        }
        if (window.location.host=="www.dev.anjoovi.com" && url.includes("www.anjoovi.com")){
          url=url.replace("www.anjoovi.com","www.dev.anjoovi.com");
        }
        return new Promise(async (r,j)=>{
          axios.put(url)
          .then((result:any)=>{
            a(result,r);
          })
          .catch ((err)=>{
            errorRequest(err);
            j(err);
          });
        })
      }
    }
  const verifyStorage=useCallback(()=>{
    if (globals.myStorage.current){
      globals.myStorage.current=false;
      return;
    }
    const lgs=localStorage.getItem("lg");
    if (lgs){
      const lg:{usuario:string,lsrc:string,token:string}=JSON.parse(lgs);
      globals.setLogin((login)=>{
        const newLogin={
          usuario:lg.hasOwnProperty("usuario") ? lg.usuario : login.usuario,
          isLoged:lg.hasOwnProperty("token") ? lg.token ? "true" : "false" : login.isLoged,
          logo:lg.hasOwnProperty("lsrc") && lg.lsrc ? globals.descript(lg.lsrc) : null,
        };
        if (newLogin.usuario != login.usuario || newLogin.isLoged != login.isLoged || newLogin.logo != login.logo){
          return newLogin;
        }
        return login;
      });
    } else {
      globals.setLogin({usuario:null,isLoged:"false",logo:null});
    }
  },[]);
  useEffect(()=>{
    window.addEventListener("storage",verifyStorage);
    return ()=>{
      window.removeEventListener("storage",verifyStorage);
    }
  },[]);
  return (
    <AuthContext.Provider value={variable}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error('useMeuContexto deve ser usado dentro de um MeuContextoProvider');
  }
  return contexto;
};
export { AuthProvider, useAuth };

