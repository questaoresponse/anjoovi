import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Link from "../Link.tsx";
import './Menu.scss';
import './lista/NoticiasLista.tsx';
import './lista/24Lista.js';
import './lista/ImagemLista.js';
import './lista/MusicasLista.tsx';
import './lista/TextosLista.tsx';
import './lista/VideosLista.tsx';
import './lista/PlaylistsLista.tsx';
import './lista/ProductsLista.tsx';

function Listar(){
    const refs={
        selected:useRef<HTMLInputElement | null>(null),
    }
    const location=useLocation();
    var options:{[key:string]:string}={
        "/admin/noticias_lista":"1",
        "/admin/24_lista":"2",
        "/admin/imagens_lista":"3",
        "/admin/musicas_lista":"4",
        "/admin/textos_lista":"5",
        "/admin/videos_lista":"6",
        "/admin/playlists_lista":"7",
        "/admin/products_lista":"8",
    }
    useEffect(()=>{
        refs.selected.current!.className="menu-s selected"+options[location.pathname];
    },[location.pathname]);
    return (
    <div className="menu" >
        <div ref={refs.selected} className="menu-s"></div>
        <div className="menu-b">
            <Link to='/admin/noticias_lista' className="i-menu2 t1" id="noticias_lista" >Matérias</Link>
            <Link to='/admin/24_lista' className="i-menu2 t2" id="lista_24" >24 horas</Link>
            <Link to='/admin/imagens_lista' className="i-menu2 t3" id="imagens_lista" >Imagens</Link>
            <Link to='/admin/musicas_lista' className="i-menu2 t4" id="musicas_lista" >Músicas</Link>
            <Link to='/admin/textos_lista' className="i-menu2 t5" id="textos_lista" >Textos</Link>
            <Link to='/admin/videos_lista' className="i-menu2 t6" id="videos_lista" >Vídeos</Link>
            <Link to='/admin/playlists_lista' className="i-menu2 t7" id="playlists_lista" >Playlists</Link>
            <Link to='/admin/products_lista' className="i-menu2 t8" id="products_lista" >Produtos</Link>
        </div>
    </div>
    )
}
export default Listar;