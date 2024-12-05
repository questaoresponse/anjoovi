import Peer, { DataConnection } from "peerjs";
import { resultInterface } from "./Auth";
class MyPeer{
    private isOpenned:boolean=false;
    public id:string="";
    private peer:Peer | undefined;
    private funcs:{[event:string]:((data:{id:string,data:string})=>void)[]}={};
    public conns:{[id:string]:DataConnection}={};
    public usuarios:{[key:string]:string[]}={};
    public post:((pathname:string,data:{[key:string]:any})=>Promise<resultInterface>) | undefined;
    public server:string | undefined;
    public awaits:{type:string,data:{[key:string]:any}}[]=[];
    init(user:string){
        this.peer=new Peer(this.encodePeerId(user));
        this.peer.on("open",()=>{
            this.isOpenned=true;
            this.id=this.peer!.id;
            for (const wait of this.awaits){
                if (wait.type=="connect"){
                    this.connect(wait.data.id,wait.data.name);
                } else if (wait.type=="on"){
                    if (wait.data.event=="open"){
                        wait.data.func({id:this.peer!.id,data:""});
                    } else {
                        this.on(wait.data.event,wait.data.func);
                    }
                } else if (wait.type=="remove"){
                    this.on(wait.data.event,wait.data.func);
                } else if (wait.type=="emit"){
                    this.on(wait.data.event,wait.data.func);
                }
            }
            // this.dispatch("open",({id:this.peer!.id,data:""}));
        });
        this.peer.on("connection",(conn:DataConnection)=>{
            this.post!(this.server!+"/verifyPeerId",{name:this.decodePeerId(conn.peer)[0],id:conn.peer})!.then((result:resultInterface)=>{
                if (result.data.result=="true" && result.data.verify=="true"){
                    this.onConnection(conn,result.data.name);
                }
            });
        });
        this.peer.on("error",(e)=>{
            console.log(e);
        })
    }
    connect(id:string,name:string){
        if (this.isOpenned){
            const conn=this.peer!.connect(id);
            conn.on("open",()=>{
                this.onConnection(conn,name);
            });
            conn.on("error",(error:any)=>{
                console.log(error);
            });
        } else {
            this.awaits.push({type:"connect",data:{id,name}});
        }
    }
    onConnection(conn:DataConnection,name:string){
        if (!this.conns[conn.peer]){
            this.conns[conn.peer]=conn;
            if (!this.usuarios[name]){
                this.usuarios[name]=[];
            }
            this.usuarios[name].push(conn.peer);
            this.dispatch("connection",({id:conn.peer,data:""}));
            conn.on("data",(data:any)=>{
                data=JSON.parse(data);
                this.dispatch(data.event,({id:conn.peer,data:data.data}));
            });
            conn.on("close",()=>{
                delete this.conns[conn.peer];
                this.dispatch("close",{id:conn.peer,data:""});
            });
        }
    }
    on(event:string,func:(data:{id:string,data:string})=>void){
        if (event=="open" && this.isOpenned && this.peer){
            func({id:this.peer.id,data:""});
        }
        if (this.isOpenned){
            if (event in this.funcs){
                this.funcs[event].push(func);
            } else {
                this.funcs[event]=[func];
            }
        } else {
            this.awaits.push({type:"on",data:{event,func}});
        }
    }
    remove(event:string,func:(data:{id:string,data:string})=>void){
        if (this.isOpenned){
            for (let i=0;i<this.funcs[event].length;i++){
                if (this.funcs[event][i]==func){
                    this.funcs[event].splice(i,1);
                }
            }
        } else {
            this.awaits.push({type:"remove",data:{event,func}});
        }
    }
    dispatch(event:string,data:{id:string,data:string}){
        if (event in this.funcs){
            for (const func of this.funcs[event]){
                func(data);
            }
        }
    }
    emit(event:string,data:any,ids?:string[]){
        if (this.isOpenned){
            if (ids){
                for (const id of ids){
                    this.conns[id].send(JSON.stringify({event,data}));
                }
            } else {
                for (const id in this.conns){
                    this.conns[id].send(JSON.stringify({event,data}));
                }
            }
        } else {
            this.awaits.push({type:"emit",data:{event,data,ids}});
        }
    }
    encodeExpressions(pt:string,isDecode=false){
        return isDecode ? pt.toString().match(/.{1,3}/g)!.map(val => String.fromCharCode(parseInt(val, 10))).join('') : pt.split('').map(char => char.charCodeAt(0).toString().padStart(3, '0')).join('')
    }
    encodePeerId(user:string){
        // -50--20-10-5399%tTt20--20-20-20
        let pt1=user;
        let pt2=new Date().toISOString();
        pt1=this.encodeExpressions(pt1);
        pt2=this.encodeExpressions(pt2);
        return pt1+"id"+pt2;
    }
    decodePeerId(id:string){
        let [pt1,pt2]=id.split("id");
        pt1=this.encodeExpressions(pt1,true);
        pt2=this.encodeExpressions(pt2,true);
        return [pt1,pt2];
    }
}
export default MyPeer;