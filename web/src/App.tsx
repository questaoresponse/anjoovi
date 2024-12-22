// Em App.js
// index.js ou index.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { lazy, Suspense, useEffect,useState } from 'react';
import { AuthProvider } from './components/Auth.jsx';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { GlobalProvider, useGlobal } from './components/Global.tsx';
// import Noticia from './components/Noticia';
// import Home from './components/Home';
// import Admin from './components/Admin';
import Header from './components/Inicio/Header.tsx';
import Home from './components/Inicio/Home.tsx';
import Types from './components/Inicio/Types.tsx';

import Erro from './components/Erro.tsx';
import GlobalFunction from './components/GlobalFunction.tsx';
import Admin from './components/Admin/Admin.jsx';
import Busca from './components/Inicio/Busca.tsx';
import Denuncias from './components/Admin/Denuncias.tsx';
import DenunciasInfos from './components/Admin/DenunciasInfos.tsx';
import Premium from './components/Inicio/Premium.tsx';

import Player from './components/Inicio/Player.tsx';
import ChatsComponent from './components/Inicio/ChatsComponent.tsx';

import HeaderAdmin from './components/Admin/HeaderAdmin.tsx';
// import ffmpeg from './components/Admin/cadastro/ffmpeg.tsx';
// import ffmpeg from './components/Admin/cadastro/MusicasCadastro.tsx';

const AdminSair = lazy(() => import('./components/Admin/AdminSair.tsx'));
const Stories = lazy(()=> import('./components/Inicio/Stories.jsx'));
const NoticiasCadastro = lazy(() => import('./components/Admin/cadastro/NoticiasCadastro.tsx' as string));
const NoticiasLista = lazy(()=> import('./components/Admin/lista/NoticiasLista.tsx'));
const Cadastro24 = lazy(() => import('./components/Admin/cadastro/24Cadastro.tsx'));
const Lista24 = lazy(() => import('./components/Admin/lista/24Lista.js'));
const ImagemLista = lazy(() => import('./components/Admin/lista/ImagemLista.js'));
const ImagemCadastro = lazy(() => import('./components/Admin/cadastro/ImagemCadastro.tsx'));
const MusicasLista = lazy(() => import('./components/Admin/lista/MusicasLista.tsx'));
const MusicasCadastro = lazy(() => import('./components/Admin/cadastro/MusicasCadastro.tsx'));
const TextosCadastro = lazy(() => import('./components/Admin/cadastro/TextosCadastro.tsx'));
const TextosLista = lazy(() => import('./components/Admin/lista/TextosLista.tsx'));
const VideosCadastro = lazy(() => import('./components/Admin/cadastro/VideosCadastro.tsx'));
const VideosLista = lazy(() => import('./components/Admin/lista/VideosLista.tsx'));
const PlaylistsCadastro = lazy(() => import('./components/Admin/cadastro/PlaylistsCadastro.tsx' as string));
const PlaylistsLista = lazy(() => import('./components/Admin/lista/PlaylistsLista.tsx' as string));
const ProductsCadastro = lazy(() => import('./components/Admin/cadastro/ProductsCadastro.tsx'));
const ProductsLista = lazy(() => import('./components/Admin/lista/ProductsLista.tsx' as string));
const Settings = lazy(()=> import('./components/Admin/settings/Settings.tsx'));
const Metricas = lazy(()=> import('./components/Admin/Metricas.jsx'));
const Inscricoes = lazy(()=> import('./components/Inicio/Inscricoes.tsx'));
const Account = lazy(()=> import('./components/Admin/Account.tsx'));
const AdminPremium = lazy(()=> import('./components/Admin/AdminPremium.tsx'));
const Users = lazy(()=> import('./components/Admin/Users.tsx'));

// import { initializeApp } from 'firebase/app';
// import { getMessaging } from 'firebase/messaging';

// const firebaseConfig = {
//     apiKey: "AIzaSyDYAbBBZeg4BR4h8GuaJTbNpxNvljgv0uY",
//     authDomain: "anjoovi-6626.firebaseapp.com",
//     projectId: "anjoovi-6626",
//     storageBucket: "anjoovi-6626.appspot.com",
//     messagingSenderId: "1077283999057",
//     appId: "1:1077283999057:web:113d9ab7aa270fd6b25770"
// };
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

function App() {
  // const [header,setHeader]=useState(false);
  const HeaderComponent=()=>{
    const globals=useGlobal();
      // const { element:Element} = props;
      // if (!HeaderInicial.current){
      //   HeaderInicial.current=<Header/>
      // }
      const [headerAtual,setHeaderAtual]=useState(<></>);
      useEffect(()=>{
        if (globals.header=="admin"){
          // document.body.style.background="#f0f0f0";
          setHeaderAtual(<HeaderAdmin/>);
          document.title="Admin - Anjoovi";
        } else if (globals.header=="normal"){
          setHeaderAtual(<Header/>);
          document.body.style.background="white";
        } else if (!globals.header){
          setHeaderAtual(<></>);
          document.body.style.background="white";
        }
      },[globals.header])
      return (
        <>
          { headerAtual }
        </>
      );
  }
  const Update=(props:any)=>{
    const {element:Element}=props;
    const location=useLocation();
    // const { playerComponent, setHeader, login }=useGlobal();

    useEffect(()=>{
      
    },[location.pathname]);

    // useEffect(()=>{
    //   if (!globals.location){
    //     globals.setLocation(location);
  
    // }
    // },[]);
    return (
      <>
        <GlobalFunction/>
        <Element/>
        {/* <AdsRender globals={globals}/> */}
      </>
    );
  };
  function Redirect(){
    const { navigate }=useGlobal();
    useEffect(()=>{
      navigate!("/admin");
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
        <Route path="/" element={<Suspense><Update element={Home}></Update></Suspense>}/>
        <Route path="/premium" element={<Suspense><Update element={Premium}></Update></Suspense>}/>
        <Route path="/noticia/:id" element={<Suspense><Update element={Types}></Update></Suspense>}/>
        <Route path="/imagem/:id" element={<Suspense><Update element={Types}></Update></Suspense>}/>
        <Route path="/musica/:id" element={<Suspense><Update element={Types}></Update></Suspense>}/>
        <Route path="/texto/:id" element={<Suspense><Update element={Types}></Update></Suspense>}/>
        <Route path="/video/:id" element={<Suspense><Update element={Types}></Update></Suspense>}/>
        <Route path="/playlist/:id" element={<Suspense><Update element={Types}></Update></Suspense>}/>
        <Route path="/product/:id" element={<Suspense><Update element={Types}></Update></Suspense>}/>
        <Route path="/busca" element={<Suspense><Update element={Busca}></Update></Suspense>} />
        <Route path="/inscricoes" element={<Suspense><Update element={Inscricoes}></Update></Suspense>} />
        <Route path="/stories/:id" element={<Suspense><Update element={Stories}></Update></Suspense>} />
        <Route path="/chat/:id" element={<Suspense><Update element={ChatsComponent}></Update></Suspense>} />
        <Route path="/chats" element={<Suspense><Update element={ChatsComponent}></Update></Suspense>} />
        <Route path='/erro' element={<Suspense><Update element={Erro}></Update></Suspense>}/>
        <Route path="/admin" element={<Suspense><Update element={Admin}></Update></Suspense>} />
        <Route path="/admin_login" element={<Suspense><Redirect/></Suspense>} />
        <Route path="/admin/noticias_cadastro" element={<Suspense><Update element={NoticiasCadastro}></Update></Suspense>}/>
        {/* <Route path="/admin/ffmpeg" element={<Suspense><Update element={ffmpeg}></Update></Suspense>}/> */}
        <Route path="/admin/noticias_edit" element={<Suspense><Update element={NoticiasCadastro}></Update></Suspense>}/>
        <Route path="/admin/noticias_lista" element={<Suspense><Update element={NoticiasLista}></Update></Suspense>}/>
        <Route path="/admin/24_cadastro" element={<Suspense><Update element={Cadastro24}></Update></Suspense>}/>
        <Route path="/admin/24_lista" element={<Suspense><Update element={Lista24}></Update></Suspense>}/>
        <Route path="/admin/imagens_cadastro" element={<Suspense><Update element={ImagemCadastro}></Update></Suspense>}/>
        <Route path="/admin/imagens_edit" element={<Suspense><Update element={ImagemCadastro}></Update></Suspense>}/>
        <Route path="/admin/imagens_lista" element={<Suspense><Update element={ImagemLista}></Update></Suspense>}/>
        <Route path="/admin/musicas_cadastro" element={<Suspense><Update element={MusicasCadastro}></Update></Suspense>}/>
        <Route path="/admin/musicas_edit" element={<Suspense><Update element={MusicasCadastro}></Update></Suspense>}/>
        <Route path="/admin/musicas_lista" element={<Suspense><Update element={MusicasLista}></Update></Suspense>}/>
        <Route path="/admin/textos_cadastro" element={<Suspense><Update element={TextosCadastro}></Update></Suspense>}/>
        <Route path="/admin/textos_edit" element={<Suspense><Update element={TextosCadastro}></Update></Suspense>}/>
        <Route path="/admin/textos_lista" element={<Suspense><Update element={TextosLista}></Update></Suspense>}/>
        <Route path="/admin/videos_cadastro" element={<Suspense><Update element={VideosCadastro}></Update></Suspense>}/>
        <Route path="/admin/videos_edit" element={<Suspense><Update element={VideosCadastro}></Update></Suspense>}/>
        <Route path="/admin/videos_lista" element={<Suspense><Update element={VideosLista}></Update></Suspense>}/>
        <Route path="/admin/playlists_cadastro" element={<Suspense><Update element={PlaylistsCadastro}></Update></Suspense>}/>
        <Route path="/admin/playlists_lista" element={<Suspense><Update element={PlaylistsLista}></Update></Suspense>}/>
        <Route path="/admin/products_cadastro" element={<Suspense><Update element={ProductsCadastro}></Update></Suspense>}/>
        <Route path="/admin/products_edit" element={<Suspense><Update element={ProductsCadastro}></Update></Suspense>}/>
        <Route path="/admin/products_lista" element={<Suspense><Update element={ProductsLista}></Update></Suspense>}/>
        <Route path="/admin/denuncias_lista" element={<Suspense><Update element={Denuncias}></Update></Suspense>}/>
        <Route path="/admin/denuncias_infos/:id" element={<Suspense><Update element={DenunciasInfos}></Update></Suspense>}/>
        <Route path="/admin/metricas" element={<Suspense><Update element={Metricas}></Update></Suspense>}/>            
        <Route path="/admin/settings" element={<Suspense><Update element={Settings}></Update></Suspense>}/>    
        <Route path="/admin/account" element={<Suspense><Update element={Account}></Update></Suspense>}/>
        <Route path="/admin/premium" element={<Suspense><Update element={AdminPremium}></Update></Suspense>} />
        <Route path="/admin/users" element={<Suspense><Update element={Users}></Update></Suspense>}/>
        <Route path="/admin/sair" element={<Suspense><Update element={AdminSair}></Update></Suspense>} />
        <Route path="*" element={<Suspense><Update element={Erro}></Update></Suspense>}></Route>
    </Routes>
    <HeaderComponent/>
    <Player></Player>
    </Router>
    </AuthProvider>
    </GlobalProvider>
  );
}

export default App;
