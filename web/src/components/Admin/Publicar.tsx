import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Link from "../Link.tsx";
import './Menu.scss';
import './cadastro/NoticiasCadastro.tsx';
import './cadastro/24Cadastro.tsx';
import './cadastro/ImagemCadastro.tsx';
import './cadastro/TextosCadastro.tsx';
import './cadastro/VideosCadastro.tsx';
import './cadastro/PlaylistsCadastro.tsx';
import './cadastro/ProductsCadastro.tsx';

function Publicar(){
    const refs={
        selected:useRef<HTMLInputElement | null>(null),
    }
    const location=useLocation();
    var options:{[key:string]:string}={
        "/admin/noticias_cadastro":"1",
        "/admin/24_cadastro":"2",
        "/admin/imagens_cadastro":"3",
        "/admin/musicas_cadastro":"4",
        "/admin/textos_cadastro":"5",
        "/admin/videos_cadastro":"6",
        "/admin/playlists_cadastro":"7",
        "/admin/products_cadastro":"8",
    }
    useEffect(()=>{
        refs.selected.current!.className="menu-s selected"+options[location.pathname];
    },[location.pathname]);
    return (
    <div className="menu">
        <div ref={refs.selected} className="menu-s"></div>
        <div className="menu-b">
            <Link to='/admin/noticias_cadastro' className="i-menu2 t1" id="noticias_cadastro">Matéria</Link>
            <Link to='/admin/24_cadastro' className="i-menu2 t2" id="cadastro_24" >24 hora</Link>
            <Link to='/admin/imagens_cadastro' className="i-menu2 t3" id="imagens_cadastro" >Imagem</Link>
            <Link to='/admin/musicas_cadastro' className="i-menu2 t4" id="musicas_cadastro" >Música</Link>
            <Link to='/admin/textos_cadastro' className="i-menu2 t5" id="textos_cadastro" >Texto</Link>
            <Link to='/admin/videos_cadastro' className="i-menu2 t6" id="videos_cadastro" >Vídeo</Link>
            <Link to='/admin/playlists_cadastro' className="i-menu2 t7" id="playlists_cadastro" >Playlist</Link>
            <Link to='/admin/products_cadastro' className="i-menu2 t8" id="products_cadastro" >Produtos</Link>
        </div>
    </div>
    )
}
export default Publicar;