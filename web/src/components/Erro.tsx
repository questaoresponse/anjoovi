import React, {useEffect, useState, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Canal from './Inicio/Canal.tsx';
import { useGlobal } from './Global.tsx';
import './Erro.scss';
const ErroConteudo = () => (
    <div id="err">
      <h1>OOPS ESSA PÁGINA NÃO EXISTE!</h1>
    </div>
  );
  
  // Componente Erro
  const Erro = () => {
    const { navigate }=useGlobal();
    const location = useLocation();
    const [content, setContent] = useState<React.JSX.Element | null>(null);
    const memoizedErroConteudo = useMemo(() => <ErroConteudo />, []);
    const fetchData = useCallback(() => {
      if (location.pathname=="/erro"){
        setContent(memoizedErroConteudo);
      } else {
        if (location.pathname.startsWith("/@") && location.pathname.split("/").length <= 3) {
          var tipo = location.pathname.length === 3 ? location.pathname.split("/")[2] : null;
          if (!tipo || (tipo=="inicio" || tipo === "textos" || tipo === "musicas")) {
            setContent(<Canal />);
          } else {
            navigate!("/erro?origin=" + encodeURIComponent(location.pathname));
          }
        } else {
          navigate!("/erro?origin=" + encodeURIComponent(location.pathname));
        }
      }
    }, [location.pathname, navigate]);
  
    useEffect(() => {
      fetchData();
    }, [fetchData]);;
    return (
      <>
        {content || <div></div>}
      </>
    );
  };
  
  export default React.memo(Erro);