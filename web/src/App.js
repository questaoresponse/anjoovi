// Em App.js
import React, { lazy, Suspense, useEffect,useState, useRef, useCallback, startTransition } from 'react';
import { AuthProvider, useAuth } from './components/Auth';
import { BrowserRouter as Router, Route,Link,Routes, useLocation, useNavigate } from 'react-router-dom';
import { GlobalProvider, useGlobal } from './components/Global';
// import Noticia from './components/Noticia';
// import Home from './components/Home';
// import Admin from './components/Admin';
const Header = lazy(()=> import('./components/Inicio/Header'));
const Home = lazy(() => import('./components/Inicio/Home'));
const Noticia = lazy(() => import('./components/Inicio/Noticia'));
const Musica = lazy(() => import('./components/Inicio/Musica'));
const Erro = lazy(()=> import('./components/Erro'));
const GlobalFunction = lazy(() => import('./components/GlobalFunction'));
const Admin = lazy(() => import('./components/Admin/Admin'));
const Busca = lazy(() => import('./components/Inicio/Busca'));
const NoticiasCadastro = lazy(() => import('./components/Admin/NoticiasCadastro'));
const AdminSair = lazy(() => import('./components/Admin/AdminSair'));
const HeaderAdmin = lazy(() => import('./components/Admin/HeaderAdmin'));
const Cadastro24 = lazy(() => import('./components/Admin/24Cadastro'));
const Stories = lazy(()=> import('./components/Inicio/Stories'));
const NoticiasLista = lazy(()=> import('./components/Admin/NoticiasLista'));
const Lista24 = lazy(() => import('./components/Admin/24Lista'));
const MusicasLista = lazy(() => import('./components/Admin/MusicasLista'));
const MusicasCadastro = lazy(() => import('./components/Admin/MusicasCadastro'));
const Settings = lazy(()=> import('./components/Admin/Settings'));
const Metricas = lazy(()=> import('./components/Admin/Metricas'));
function App() {
  // const [header,setHeader]=useState(false);
  const HeaderComponent=()=>{
    const globals=useGlobal();
      // const { element:Element} = props;
      // if (!HeaderInicial.current){
      //   HeaderInicial.current=<Header/>
      // }
      const [headerAtual,setHeaderAtual]=useState(<div></div>);
      useEffect(()=>{
        if (globals.header=="admin"){
          document.body.style.background="#f0f0f0";
          setHeaderAtual(<HeaderAdmin/>)
        } else if (globals.header=="normal"){
          setHeaderAtual(<Header/>);
          document.body.style.background="white";
        } else if (!globals.header){
          setHeaderAtual(null);
          document.body.style.background="white";
        }
      },[globals.header])
      return (
        <>
          { headerAtual }
        </>
      );
  }
  const Update=(props)=>{
    const {element:Element}=props;
    const location=useLocation();
    const navigate=useNavigate();
    const globals=useGlobal();
    const server=globals.server;
    const script=useRef(false);
    const script2=useRef(false);
    const auth=useAuth();
    const get=useCallback(()=>{
      auth.post(server+"?type=info",{type:"info"}).then((result)=>{
        if (result.error){
            globals.setRedirectError(result.error);
        } else {
            startTransition(()=>{
              globals.setHomeInfo(result.data);
            });
        }
      });
    },[location.pathname]);
    useEffect(()=>{
      if (location.pathname=="/admin"){
        // globals.setHeader(false);
        if (globals.isLoged=="true"){
          globals.setHeader("admin");
        } else if (globals.isLoged=="false") {
          globals.setHeader(false);
        }
      } else if (location.pathname.startsWith("/admin")){
        globals.setHeader("admin");
      } else {
        if (location.pathname.startsWith("/stories")){
          globals.setHeader(false);
        } else {
          globals.setHeader("normal");
        };
      }
      if (location.pathname=="/"){
        get();
      }
    },[location.pathname]);
    // useEffect(()=>{
    //   if (!globals.location){
    //     globals.setLocation(location);
  
    // }
    // },[]);
    useEffect(()=>{
    },[]);
    return (
      <div id="page">
        <GlobalFunction/>
        <Element/>
      </div>
    );
  };
  function Redirect(){
    const navigate=useNavigate();
    useEffect(()=>{
      navigate("/admin");
    },[navigate]);
    return (
      <div></div>
    )
  }
  return (
    <GlobalProvider>
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" exact element={<Suspense><Update element={Home}></Update></Suspense>}/>
        <Route path="/noticia" element={<Suspense><Update element={Noticia}></Update></Suspense>}/>
        <Route path="/musica" element={<Suspense><Update element={Musica}></Update></Suspense>}/>
        <Route path="/busca" element={<Suspense><Update element={Busca}></Update></Suspense>} />
        <Route path="/stories/:id" element={<Suspense><Update element={Stories}></Update></Suspense>} />
        <Route path='/erro' element={<Suspense><Update element={Erro}></Update></Suspense>}/>
        <Route path="/admin" element={<Suspense><Update element={Admin}></Update></Suspense>} />
        <Route path="/admin_login" element={<Suspense><Redirect/></Suspense>} />
        <Route path="/admin/noticias_cadastro" element={<Suspense><Update element={NoticiasCadastro}></Update></Suspense>}/>
        <Route path="/admin/noticias_lista" element={<Suspense><Update element={NoticiasLista}></Update></Suspense>}/>
        <Route path="/admin/24_cadastro" element={<Suspense><Update element={Cadastro24}></Update></Suspense>}/>
        <Route path="/admin/24_lista" element={<Suspense><Update element={Lista24}></Update></Suspense>}/>
        <Route path="/admin/musicas_cadastro" element={<Suspense><Update element={MusicasCadastro}></Update></Suspense>}/>
        <Route path="/admin/musicas_lista" element={<Suspense><Update element={MusicasLista}></Update></Suspense>}/>
        <Route path="/admin/metricas" element={<Suspense><Update element={Metricas}></Update></Suspense>}/>            
        <Route path="/admin/settings" element={<Suspense><Update element={Settings}></Update></Suspense>}/>    
        <Route path="/admin/sair" element={<Suspense><AdminSair/></Suspense>} />
        <Route path="*" element={<Suspense><Update element={Erro}></Update></Suspense>}></Route>
    </Routes>
    <HeaderComponent/>
    </Router>
    </AuthProvider>
    </GlobalProvider>
  );
}

export default App;
