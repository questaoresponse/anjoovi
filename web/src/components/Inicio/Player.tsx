import React, { useEffect, useState } from 'react';
import { useGlobal } from '../Global';
import Link from '../Link';
import './Player.scss';
import { useAuth } from '../Auth';
import X from '../X';
interface mInterface{
    currentTime:number,
    duration:number,
    src:string,
    name:string,
    isView:boolean,
}
export type { mInterface };
function Player(){
    const { player, server }=useGlobal();
    const auth=useAuth();
    const [exists,setExists]=useState(false);
    const [infos,setInfos]=useState({user:"",name:""});
    const [play,setPlay]=useState(false);
    const viewRequest=()=>{
        auth.post(server+"/musica/"+player.current.page_id,{type:"view",id:player.current.page_id.toString(),index:player.current.music_index.toString()});
    }
    useEffect(()=>{
        player.current.setInfos=setInfos;
        player.current.viewRequest=viewRequest;
        player.current.setExists=setExists;
        player.current.setPlay=setPlay;
        return ()=>{
            player.current.setInfos=null;
            player.current.viewRequest=null;
            player.current.setExists=null;
            player.current.setPlay=null;
            player.current.reset();
        }
    },[]);

    const changeValue=()=>{
        const value=Number(player.current.refs.range.current!.value);
        const number=value/1000;
        player.current.musics[player.current.music_index].currentTime=number;
        player.current.musics[player.current.music_index].setCurrentTime && player.current.musics[player.current.music_index].setCurrentTime!(player.current.getTime(number));
        player.current.refs.audio.current!.currentTime=number;  
        player.current.progress[0]=value;
        player.current.progress[1]=0;
        player.current.animate(0,true);
        // changeProgress(number);
    }
    const navigateToMusic=(e:any)=>{
        e.preventDefault();
        player.current.updatePosts && player.current.updatePosts("/musica/"+player.current.page_id,player.current.page_id);
    }
    return (
        <div draggable={false} id="player" style={{display:exists ? "block" : "none"}}>
            <Link to={"/musica/"+player.current.page_id} onClick={navigateToMusic} id='player-name' className='txt-1'>{infos.name}</Link>
            <div id='player-user'><Link to={"@"+infos.user} className='txt-1'>Por: {infos.user}</Link></div>
            <div id="player-infos">
                <div id='player-controller'>
                    <i onClick={player.current.changeState} className={`i1 ${!play ? "d-flex" : "d-none"} bi-play-fill`}></i>
                    <i onClick={player.current.changeState} className={`i2 ${!play ? "d-none" : "d-flex"} bi-pause-fill`}></i>
                </div>
                <div ref={player.current.refs.currentTime} id='player-time-atual'></div>
                <div id="player-range-div">
                    <input min={0} max={0} ref={player.current.refs.range} onChange={changeValue} type="range" id='player-range' />
                    <div ref={player.current.refs.progress} id="player-progress"></div>
                </div>
                <div ref={player.current.refs.timeTotal} id='player-time-total'>00:00</div>
            </div>
            <audio onEnded={player.current.End} ref={player.current.refs.audio} onLoadedMetadata={player.current.onLoadedMetadata} onTimeUpdate={player.current.onTimeUpdate}></audio>
            <X onClick={player.current.reset} id="x"></X>
        </div>
    )
}
export default React.memo(Player);