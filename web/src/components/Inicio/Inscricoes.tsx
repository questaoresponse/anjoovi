import { useState, useEffect, useCallback, memo } from 'react';
import { useGlobal } from '../Global.tsx';
import { useAuth } from '../Auth.jsx';
import './Home.scss';
import Post from './Post.jsx';
import Storie from './Storie.jsx';
import './Inscricoes.scss';
function Inscricoes() {
    const globals = useGlobal();
    const server=globals.server;
    const auth = useAuth();
    const [posts,setPosts]=useState({isLoaded:false,canal:[],posts:[],st:[]});
    const get=useCallback(async ()=>{
        document.title="Anjoovi";
        auth.post(server+"/inscricoes",{type:"info"}).then((result)=>{
            if (result.error){
                // globals.setRedirectError(result.error);
            } else {
                setPosts({isLoaded:true,canal:result.data.canal,posts:result.data.posts,st:result.data.st});
            }
        })
    },[]); 
    useEffect(()=>{
        get();
    },[]);
  return (
    <div className='tabela-pai pa ins'>
        <Storie globals={globals} stories={posts} inscricoes={true}/>
        <Post isLoaded={posts.isLoaded} globals={globals} posts={posts.posts}/>
    </div>
  );
}
export default memo(Inscricoes);