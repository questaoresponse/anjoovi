import { createRef, Dispatch, SetStateAction } from "react";

interface musicInterface{
    name:string,
    src:string,
    currentTime:number,
    duration:number,
    isView:boolean,
    setCurrentTime:((time:string)=>void) | null,
    setPlay:((value:boolean)=>void) | null
}
class PlayerClass{
    musicsListenner:((musics:musicInterface[])=>void)[]=[];
    refs={
        audio:createRef<HTMLAudioElement>(),
        range:createRef<HTMLInputElement>(),
        currentTime:createRef<HTMLInputElement>(),
        timeTotal:createRef<HTMLDivElement>(),
        progress:createRef<HTMLDivElement>(),
    }
    setInfos:Dispatch<SetStateAction<{user:string,name:string}>> | null=null;
    setExists:Dispatch<SetStateAction<boolean>> | null=null;
    setPlay:Dispatch<SetStateAction<boolean>> | null=null;
    viewRequest:(()=>void) | null=null;
    getInfos:(()=>void) | null=null;
    updatePosts:((pathname:string,i:number)=>void) | null=null;
    timeListeners:((time:string)=>void)[]=[];
    paused=true;
    duration=-1;
    page_id=-1;
    music_index=-1;
    musics:musicInterface[]=[];
    progress:(number | boolean)[]=([0,0,false]);
    user="";
    constructor(){
        this.onClickMusic=this.onClickMusic.bind(this);
        this.onLoadedMetadata=this.onLoadedMetadata.bind(this);
        this.onTimeUpdate=this.onTimeUpdate.bind(this);
        this.animate=this.animate.bind(this);
        this.changeState=this.changeState.bind(this);
        this.End=this.End.bind(this);
        this.reset=this.reset.bind(this);
        this.syncMusics=this.syncMusics.bind(this);
    }
    reset(){
        if (!this.paused){
            this.changeState();
        }
        this.page_id=-1;
        this.music_index=-1;
        this.musics=[];
        this.progress[0]=0;
        this.setExists!(false);

    }
    animate(_:any, init2:boolean | null=null, reset?: boolean){
        if (init2!=null){
            this.progress[2]=init2;
        }
        if (this.progress[2]){
            const atualTime=performance.now();
            if (this.progress[1]==0){
                this.progress[1]=atualTime;
            }
            const diff=atualTime-(this.progress[1] as number);
            this.progress[1]=atualTime;
            (this.progress[0] as number)!+=diff;
            const w=(this.progress[0] as number)/(Number(this.refs.range.current!.max));
            this.refs.progress.current!.style.left=-(98.75 - (w*97.50))+"%";
            requestAnimationFrame(this.animate);
        } else {
            this.progress[1]=0;
            if (reset){
                const w=(this.progress[0] as number)/(Number(this.refs.range.current!.max));
                this.refs.progress.current!.style.left=-(98.75 - (w*97.50))+"%";
            }
        }
    }
    updateMusics(musics:musicInterface[]){
        this.musics=musics;
        this.musicsListenner.forEach(fn=>fn(musics));
    }
    addMusicListener(fn:(musics:musicInterface[])=>void){
        this.musicsListenner.push(fn);
    }
    removeMusicListenner(fn:(musics:musicInterface[])=>void){
        this.musicsListenner=this.musicsListenner.filter(el=>el!=fn);
    }
    changeState(){
        if (this.paused){
            this.paused=false;
            this.refs.audio.current!.play();
            this.musics[this.music_index].setPlay && this.musics[this.music_index].setPlay!(true);
            this.setPlay!(true);
            this.animate(0,true);
        } else {
            this.paused=true;
            this.refs.audio.current!.pause();
            this.musics[this.music_index].setPlay && this.musics[this.music_index].setPlay!(false);
            this.setPlay!(false);
            this.progress[1]=0;
            this.animate(0,false);
        }
    }
    onLoadedMetadata(){
      this.paused=true;
      this.changeState();
    }
    onTimeUpdate(){
        if (this.page_id==-1) return;
        const atual_time = this.refs.audio.current!.currentTime;
        var v=false;
        if (this.musics[this.music_index].currentTime<atual_time){
            this.musics[this.music_index].currentTime=atual_time;
            // music.current!.currentTime=atual_time;
            // this.refs.currentTime.current!.textContent=atual_t
            v=true;
        }
        if (atual_time/this.musics[this.music_index].duration>=0.1 && !this.musics[this.music_index].isView){
            this.musics[this.music_index].isView=true;
            this.viewRequest && this.viewRequest();
        }
        const atual=Math.floor(this.refs.audio.current!.currentTime);
        var m:number | string=Math.floor(atual/60);
        var s:number | string=atual-(m*60);
        m= m<10 ? "0"+m : m;
        s= s<10 ? "0"+s : s;
        var time=m+":"+s;
        if (v){
            this.refs.range.current!.value=String(atual_time);
            // changeProgress(atual_time);
            this.musics[this.music_index].currentTime=atual_time;
            this.refs.currentTime.current!.textContent=time;
            this.musics[this.music_index].setCurrentTime && this.musics[this.music_index].setCurrentTime!(time);
        }
    }
    End(){
        this.musics[this.music_index].currentTime=this.musics[this.music_index].duration;
        if (this.music_index<this.musics.length-1){
            this.animate(0,false);
            this.onClickMusic(this.music_index+1,{user:this.user,page_id:this.page_id,musics:this.musics});
        } else {
            this.reset();
        }
    }
    onClickMusic(index:number,{user,page_id,musics}:{user:string,page_id:number,musics:musicInterface[]}){
        if (this.music_index==index){
            this.user=user;
            this.setInfos!({user,name:this.musics[this.music_index].name});
            this.changeState();
            return;
        }
        this.paused=false;

        if (this.music_index==-1){
            this.music_index=index;
            this.musics=musics;
            this.musics[this.music_index].setPlay && this.musics[this.music_index].setPlay!(true);
            this.setPlay!(true);
            this.page_id=page_id;
            this.setExists!(true);
            this.refs.audio.current!.src=this.musics[index].src;
            this.updateMusics(this.musics);
            this.musics[this.music_index].currentTime=0;
        } else {
            if (this.musics[index].currentTime==this.musics[index].duration){
                this.musics[index].currentTime=0;
            }
            this.musics[this.music_index].setPlay && this.musics[this.music_index].setPlay!(false);
            this.musics[index].setPlay && this.musics[index].setPlay!(true);
            this.setPlay!(true);
            this.refs.audio.current!.src=this.musics[index].src;
            this.music_index=index;
        }

        this.user=user;
        this.setInfos!({user,name:this.musics[this.music_index].name});

        this.duration=this.musics[index].duration;
        var m:number | string=this.duration/60;
        m=Math.floor(m);
        var s:number | string=Math.floor(this.duration)-(m*60);
        m= m<10 ? "0"+m : m;
        s= s<10 ? "0"+s : s;
        const time=m+":"+s;
        this.musics[this.music_index].duration=this.duration;
        this.refs.timeTotal.current!.textContent=time;
        this.refs.range.current!.min=String(0);
        this.refs.range.current!.max=String(this.duration * 1000);
        const currentTime=this.getTime(this.musics[this.music_index].currentTime);
        this.refs.currentTime.current!.textContent=currentTime;
        this.musics[this.music_index].setCurrentTime && this.musics[this.music_index].setCurrentTime!(currentTime);
        this.refs.audio.current!.currentTime=this.musics[this.music_index].currentTime;
        this.progress[0]=this.musics[this.music_index].currentTime * 1000;
        this.progress[1]=0;
        this.animate(0,false,true);
        this.paused=false;
        this.changeState();
    }
    getTime(value:number){
        const m=Math.floor(value/60);
        const s=Math.floor(value%60);
        return (m<10 ? "0"+m : m)+":"+(s<10 ? "0"+s : s);
    }
    syncMusics(index:number,page_id:number){
        if (this.page_id==page_id && this.music_index!=-1){
            const currentTime=this.getTime(this.musics[index].currentTime);
            this.musics[index].setPlay && this.musics[index].setPlay!(this.music_index==index && !this.paused);
            this.musics[index].setCurrentTime && this.musics[index].setCurrentTime!(currentTime);
        }
    }
}
export default PlayerClass;
export type { musicInterface };