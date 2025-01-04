import { useState, useEffect, useRef } from 'react';
import { useGlobal } from '../Global.tsx';
import { useAuth } from '../Auth.jsx';
import './Home.scss';
// import Ads from '../Ads.jsx';
import Post from './Post.jsx';
import Storie from './Storie.jsx';
import Link from '../Link.tsx';
import loading_src from "../static/loading.png";
interface postsInterface{
    isLoaded:boolean,
    canal:any[],
    posts:any[],
    st:any[],
}
function Home() {
    const isLoaded=useRef(false);
    const globals = useGlobal();
    const { server }=globals;
    const auth = useAuth();
    const [posts,setPosts]=useState<postsInterface>({isLoaded:false,canal:[],posts:[],st:[]});
    const [altas,setAltas]=useState<{palavra:string,frequencia:number}[]>([]);
    const [isLoading,setIsLoading]=useState(false);
    const get=async (initial=false)=>{
        if (initial && isLoaded.current) return;
        if (initial && !isLoaded.current) isLoaded.current=true;
        auth.post(server,{type:"info"}).then((result)=>{
            if (result.error){
                // globals.setRedirectError(result.error);
            } else {
                setPosts({isLoaded:false,canal:[],posts:[],st:[]});
                var l:any=result.data;
                l.isLoaded=true;
                setPosts(l);
                setAltas(result.data.alta);
                localStorage.setItem("p",JSON.stringify(l));
            }
        });
    }; 
    get(true);
    const pt=useRef(0);
    const awaitingLoad=useRef(false);
    const verifyScroll=()=>{
        if (window.scrollY+800>document.documentElement.scrollHeight && !awaitingLoad.current){
            pt.current+=1;
            setIsLoading(true);
            awaitingLoad.current=true;
            auth.post(server,{type:"posts",pt:pt.current.toString()}).then(result=>{
                if (result.data.result=="true"){
                    setPosts(posts=>{return {...posts,posts:[...posts.posts,...result.data.posts]}});
                    setIsLoading(false);
                    awaitingLoad.current=false;
                }
            });
        }
    };
    useEffect(()=>{
        document.title="Anjoovi";
        globals.get.current=get;
        window.addEventListener("scroll",verifyScroll);
        return ()=>{
            window.removeEventListener("scroll",verifyScroll);
            globals.get.current=undefined;
        }
    },[]);
  return (
    <div className='tabela-pai pa'>
        <div id="posts-div">
            <Storie globals={globals} stories={posts}/>
            {/* <Ads slot="7577017868"/>     */}
            <Post isLoaded={posts.isLoaded} globals={globals} posts={posts.posts}/>
        </div>
        <div id="altas-div">
            <p>Em alta</p>
            <div id="altas-list">
                {altas.map((alta,index)=>{
                    return <Link className='altas-p txt-1' to={"/busca?q="+encodeURIComponent(alta.palavra)} key={index}>{alta.palavra}</Link>
                })}
            </div>
        </div>
        <div id="loading" style={{opacity:isLoading ? 1 : 0}}>
            <img src={loading_src} alt="" />
        </div>
    </div>
  );
}
export default Home;