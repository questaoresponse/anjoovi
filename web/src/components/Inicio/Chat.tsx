import { memo, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useGlobal } from '../Global';
import { resultInterface, useAuth } from '../Auth';
import Link from '../Link';
import './Chat.scss';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import excluir_imagem from '../static/remove-icone.png';
import { valuesChatsInterface } from './ChatsComponent';
interface infosInterface{
    usuario:string | null,
    logo:string | null,
    [chave:string]:any,
}
interface messageInterface{
    usuario:string,
    texto:string[],
    d:string,
    date:string,
    id:number,
    type:string,
}
interface dataInterface{
    date:string,
    type:string,
}
function Chat({values}:{values:valuesChatsInterface}){
    const { server, login, peer }=useGlobal();
    const [height,setHeight]=useState(window.innerHeight * 0.8);
    const auth=useAuth();
    const infos=useRef<infosInterface>(observable({
        usuario:null,
        logo:null,
    }));
    const messages=useRef<{messages:(messageInterface | dataInterface)[]}>(observable({messages:[]}));
    const refs={
        input:useRef<HTMLDivElement>(null),
        after:useRef<HTMLDivElement>(null),
        messages:useRef<HTMLDivElement>(null),
        options:useRef<HTMLDivElement>(null)
    }
    const isBottom=useRef(false);
    const s=useRef(true);
    const [options,setOptions]=useState<{isSelected:boolean,end:number,id:number,x:number,y:number}>({isSelected:false,end:0,id:0,x:0,y:0});
    const updateView=()=>{
        if (refs.messages.current!.lastElementChild instanceof HTMLElement){
            const el=refs.messages.current!;
            isBottom.current=el.scrollTop + el.clientHeight + refs.messages.current!.lastElementChild!.offsetHeight >= el.scrollHeight;
        }
    };
    const zero=(value:number)=>{
        return value>9 ? value : "0"+value;
    }
    const messagesIds=useRef<{[chave:number]:number}>({});
    const getRamdomId:()=>number=()=>{
        const mId = Math.floor(Math.random() * 1e12) + 1;
        return messagesIds.current[mId] ? getRamdomId() : mId;
    }
    const ultimDate=useRef<string |  null>(null);
    const updateMessagesInfos=useRef<{loaded:boolean,pt:number,loading:boolean}>({loaded:false,pt:0,loading:false});
    const get=()=>{
        auth.post(server+"/chat/"+values.id+(values.id==0 ? "?user="+new URLSearchParams(window.location.search).get("user") : ""),{type:"info"}).then(result=>{
            if (result.data.result=="true"){
                action(()=>{
                    for (var chave in result.data.infos){
                        infos.current[chave]=result.data.infos[chave];
                    }
                })();
                if (result.data.online!=0){
                    peer.current.on("open",()=>{
                        const tokens=JSON.parse(result.data.peer_tokens);
                        for (const token of tokens[0]){
                            const peer_id=JSON.parse(token).peer_id;
                            if (peer_id!=peer.current.id && !Object.keys(peer.current.conns).find((key:string)=>key==peer_id)){
                                peer.current.connect(peer_id,login.usuario!);
                            }
                        }
                        for (const token of tokens[1]){
                            const peer_id=JSON.parse(token).peer_id;
                            if (peer_id!=peer.current.id && !Object.keys(peer.current.conns).find((key:string)=>key==peer_id)){
                                peer.current.connect(peer_id,infos.current.usuario!);
                            }
                        }
                    });
                }
                const last:messageInterface=messages.current.messages[messages.current.messages.length-1] as messageInterface;
                if (messages.current.messages.length==0 || last.id!=Number(result.data.messages[result.data.messages.length-1].id) || result.data.messages.length!=messages.current.messages.filter(message=>message.type!="date")){
                    ultimDate.current=result.data.messages.length==0 ? null : result.data.messages[result.data.messages.length-1].d;
                    const ms:messageInterface[]=result.data.messages.map((message:any)=>{return {...message,texto:message.texto.split(" ")}});
                    const newm:(messageInterface | dataInterface)[]=[];
                    var data1:Date | null=null;
                    for (var m of ms){
                        const data2=new Date(m.d);
                        if (!data1 || (data1.getFullYear() !== data2.getFullYear() ||
                            data1.getMonth() !== data2.getMonth() || data1.getDate() !== data2.getDate())){
                            newm.push({type:"date",date:zero(data2.getFullYear())+"/"+zero((data2.getMonth()+1))+"/"+zero(data2.getDate())});
                        }
                        m.type="message";
                        m.date=zero(data2.getHours())+":"+zero(data2.getMinutes());
                        const mId=getRamdomId();
                        messagesIds.current[mId]=m.id;
                        m.id=mId;
                        newm.push(m);
                        data1=data2;
                    }
                    ultimDate.current=data1!.toString();
                    updateView();
                    action(()=>{
                        messages.current.messages=newm;
                    })();
                }
            }
        })
    }
    const updateMessages=()=>{
        if (!updateMessagesInfos.current.loaded && !updateMessagesInfos.current.loading && refs.messages.current!.scrollTop<100){
            updateMessagesInfos.current.loading=true;
            updateMessagesInfos.current.loaded=true;
            updateMessagesInfos.current.pt+=1;
            auth.post(server+"/chat/"+values.id,{type:"pt",pt:String(updateMessagesInfos.current.pt)}).then((result:resultInterface)=>{
                updateMessagesInfos.current.loading=false;
                const last:messageInterface=messages.current.messages[messages.current.messages.length-1] as messageInterface;
                if (messages.current.messages.length==0 || last.id!=Number(result.data.messages[result.data.messages.length-1].id) || result.data.messages.length!=messages.current.messages.filter(message=>message.type!="date").length){
                    ultimDate.current=result.data.messages.length==0 ? null : result.data.messages[result.data.messages.length-1].d;
                    const ms:messageInterface[]=result.data.messages.map((message:any)=>{return {...message,texto:message.texto.split(" ")}});
                    const newm:(messageInterface | dataInterface)[]=[];
                    var data1:Date | null=null;
                    for (var m of ms){
                        const data2=new Date(m.d);
                        if (!data1 || (data1.getFullYear() !== data2.getFullYear() ||
                            data1.getMonth() !== data2.getMonth() || data1.getDate() !== data2.getDate())){
                            newm.push({type:"date",date:zero(data2.getFullYear())+"/"+zero((data2.getMonth()+1))+"/"+zero(data2.getDate())});
                        }
                        m.type="message";
                        m.date=zero(data2.getHours())+":"+zero(data2.getMinutes());
                        const mId=getRamdomId();
                        messagesIds.current[mId]=m.id;
                        m.id=mId;
                        newm.push(m);
                        data1=data2;
                    }
                    ultimDate.current=data1!.toString();
                    updateView();
                    action(()=>{
                        messages.current.messages=[...newm,...messages.current.messages];
                    })();
                }
            });
        }
        if (updateMessagesInfos.current.loaded && refs.messages.current!.scrollTop>100){
            updateMessagesInfos.current.loaded=false;
        }   
    }
    const Enviar=(e:any)=>{
        e.preventDefault();
        const texto=refs.input.current!.textContent!;
        refs.input.current!.textContent="";
        // const data=new Date();
        // var ano = data.getFullYear();
        // var mes = ('0' + (data.getMonth() + 1)).slice(-2); // Adicione '0' para o mês e extraia os últimos 2 caracteres
        // var dia = ('0' + data.getDate()).slice(-2); // Adicione '0' para o dia e extraia os últimos 2 caracteres
        // var hora = ('0' + data.getHours()).slice(-2); // Adicione '0' para a hora e extraia os últimos 2 caracteres
        // var minuto = ('0' + data.getMinutes()).slice(-2); // Adicione '0' para o minuto e extraia os últimos 2 caracteres
        // var segundo = ('0' + data.getSeconds()).slice(-2); // Adicione '0' para o segundo e extraia os últimos 2 caracteres

        // // Construa a string no formato desejado
        // const d = ano + '-' + mes + '-' + dia + ' ' + hora + ':' + minuto + ':' + segundo;
        // const id = Math.floor(Math.random() * 10000000000);
        var id=-1;
        var mId=-1;
        updateView();
        action(()=>{
            var data1:Date | null=ultimDate.current ? new Date(ultimDate.current) : null;
            const data2=new Date();
            id=data2.getTime();
            if (!data1 || (data1.getFullYear() !== data2.getFullYear() ||
                data1.getMonth() !== data2.getMonth() || data1.getDate() !== data2.getDate())){
                messages.current.messages.push({type:"date",date:zero(data2.getFullYear())+"/"+zero((data2.getMonth()+1))+"/"+zero(data2.getDate())});
            }
            const message:{[key:string]:any}={usuario:login.usuario!,texto:texto.split(" "),d:data2.toString(),date:zero(data2.getHours())+":"+zero(data2.getMinutes()),id:id,type:"message"};
            peer.current.emit("message",message,[...(peer.current.usuarios[login.usuario!] || []),...(peer.current.usuarios[infos.current.usuario!] || [])]);
            mId=getRamdomId();
            message.id=mId;
            messages.current.messages.push(message as messageInterface);
            ultimDate.current=data2.toString();
         })();
        auth.post(server+"/chat/"+values.id+(values.id==0 ? "?user="+new URLSearchParams(window.location.search).get("user") : ""),{type:"message",texto:texto}).then(result=>{
            if (result.data.result=="true"){
                action(()=>{
                    const c=messages.current.messages;
                    messages.current.messages.filter(_=>false).concat(c.map((message)=>"id" in message && message.id==id ? {...message,id:result.data.id} : {...message}));
                    messagesIds.current[mId]=result.data.id;
                })();
                // for (var i=messages.current.messages.length-1;i>=0;i--){
                //     if (messages.current.messages[i].id==id){
                //         messages.current.messages[i].id=result.data.id;
                //         break;
                //     }
                // }
                // setMessages((messages)=>[])
            }
        });
    }
    // const inicio=useRef<boolean>(false);
    const ChangeText=()=>{
        const lineHeight = parseInt(window.getComputedStyle(refs.input.current!).lineHeight);
        let totalLines = Math.ceil(refs.input.current!.scrollHeight / lineHeight);
        totalLines = totalLines > 3 ? 3 : totalLines;
        setHeight(window.innerHeight - lineHeight * totalLines - 60);
        updateView();
        // if (inicio.current){
        //     inicio.current=false;
        //     // refs.input.current!.textContent=refs.input.current!.textContent!.slice(14);
        // } else {
            if (refs.input.current!.innerText=="" || refs.input.current!.innerText=="\n"){
                refs.after.current!.classList.remove("hidden");
                // refs.input.current!.style.color="rgba(0,0,0,0.35)";
                // refs.input.current!.textContent="Digite algo...";
            } else {
                refs.after.current!.classList.add("hidden");
            }
            
        // }
    }
    // const FocusText=()=>{
    //     if (inicio.current){
    //         refs.input.current!.style.color="black";
    //         refs.input.current!.textContent="";
    //     }
    // }
    // const BlurText=()=>{
    //     if (inicio.current){
    //         refs.input.current!.style.color="rgba(0,0,0,0.35)";
    //         refs.input.current!.textContent="Digite algo...";
    //     }
    // }
    const deleteMessage=(mId:number)=>{
        const id=messagesIds.current[mId];
        action(()=>{
            const idRemove=messages.current.messages.findIndex(message=>"id" in message && message.id==mId);
            const c=messages.current.messages[messages.current.messages.length-1];
            if (idRemove>0 && (idRemove==messages.current.messages.length-1 || messages.current.messages[idRemove+1].type=="date") && messages.current.messages[idRemove-1].type=="date"){
                messages.current.messages.splice(idRemove-1,2);
            } else {
                messages.current.messages.splice(idRemove,1);
            }
            console.log(c,messages.current.messages);
            "d" in c && (ultimDate.current=c.d);
        })();
        peer.current.emit("remove_message",{id:id},[...((peer.current.usuarios[login.usuario!] || []).filter(peer_id=>peer_id!=peer.current.id)),...(peer.current.usuarios[infos.current.usuario!] || [])]);
        auth.post(server+"/chat/"+values.id,{type:"delete_message",id:id.toString()}).then(result=>{
            if (result.data.result=="true"){
            }
        })
    }
    const onMessage=({data:m}:{data:any})=>{
        const newm:(messageInterface | dataInterface)[]=[...messages.current.messages];
        var data1:Date | null=ultimDate.current ? new Date(ultimDate.current) : null;
        const data2=new Date(m.d);
        if (!data1 || (data1.getFullYear() !== data2.getFullYear() ||
            data1.getMonth() !== data2.getMonth() || data1.getDate() !== data2.getDate())){
            newm.push({type:"date",date:zero(data2.getFullYear())+"/"+zero((data2.getMonth()+1))+"/"+zero(data2.getDate())});
        }
        m.date=zero(data2.getHours())+":"+zero(data2.getMinutes());
        const mId=getRamdomId();
        messagesIds.current[mId]=m.id;
        m.id=mId;
        newm.push(m);
        updateView();
        action(()=>{
            messages.current.messages=newm;
        })();
        ultimDate.current=data2.toString();
    };
    const onRemoveMessage=({data:m}:{data:any})=>{
        const mId=m.id;
        action(()=>{
            const idRemove=messages.current.messages.findIndex(message=>"id" in message && message.id==mId);
            if (idRemove>0 && (idRemove==messages.current.messages.length-1 || messages.current.messages[idRemove+1].type=="date") && messages.current.messages[idRemove-1].type=="date"){
                messages.current.messages.splice(idRemove-1,2);
            } else {
                messages.current.messages.splice(idRemove,1);
            }
            const c=messages.current.messages[messages.current.messages.length-1];
            "d" in c && (ultimDate.current=c.d);
        })();
    };
    const onMessageClick=(index:any,id:number)=>{
        const rect=refs.messages.current!.children[index].getBoundingClientRect();
        setOptions({isSelected:true,id,end:rect.height,x:rect.x,y:rect.y});
        return true;
    }
    useEffect(()=>{
        get();
        ChangeText();
        peer.current.on("message",onMessage);
        peer.current.on("remove_message",onRemoveMessage);
        setOptions({isSelected:false,end:0,id:0,x:0,y:0});
        return ()=>{
            peer.current.remove("message",onMessage);
            peer.current.remove("remove_message",onRemoveMessage);
            // clearInterval(st);
        }
    },[values]);
    const Comp=observer(()=>{
        const update=()=>{
            if (isBottom.current || (messages.current.messages.length>0 && s.current)){
                refs.messages.current!.scrollTop=refs.messages.current!.scrollHeight;
                s.current=false;
            }
        }
        useEffect(()=>{
            update();
        });
        const showDiv:MouseEventHandler<HTMLDivElement>=()=>{
            // current
        };
        return messages.current.messages.map((message,index)=>{
            return message.type=="message" ? <div onContextMenu={(e:any)=>"id" in message ? onMessageClick(index,message.id) && e.preventDefault() : null} onMouseEnter={showDiv} className={"message "+("usuario" in message && message.usuario==login.usuario ? "my" : "you")} key={index}>
                <p>{"texto" in message && message.texto.length>0 && message.texto.map((texto:string,index:number)=>{
                    return texto.length>0 && (texto[0]=="#" || texto[0]=="@") ? <Link className='tag' key={index} to={texto[0]=="#" ? "/busca?q="+encodeURIComponent(texto) : "/@"+encodeURIComponent(texto.slice(1))}>{texto + ( message.texto.length-1>index ? " " : "" )}</Link> : texto + ( message.texto.length-1>index ? " " : "" )
                })}</p>
                <div className='data'>{message.date}</div>
            </div> : <div className='data-div' key={index}>{message.date}</div>
        });
    });
    const CompInfo=observer(()=>{
        return (
            <>
                <div id="logo-chat">{infos.current.usuario ? infos.current.logo ? <img id="logo-chat-img" src={server+"/images/"+encodeURIComponent(infos.current.logo)}></img> : <div>{infos.current.usuario![0]}</div> : null}</div>
                <div id="group-infos">
                    <div id="name" className='txt-1'>{infos.current.name}</div>
                    <div id="usuario" className='txt-1'>@{infos.current.usuario}</div>
                </div>
            </>
        )
    });
    return <>
        <div id="header">
            <CompInfo></CompInfo>
        </div>
        <div id="content">
            <div id="messages" style={{height:height}} ref={refs.messages} onScroll={updateMessages}>
                <Comp></Comp>
            </div>
            <form id="campo" onSubmit={Enviar}>
                <div id="send-div">
                    <div contentEditable={true} onInput={ChangeText} id="send-input" ref={refs.input} />
                    <div id="send-after" ref={refs.after}>Digite algo...</div>
                </div>
                <div id="send-btn-div">
                    <button id="send-btn" type="submit">Enviar</button>
                </div>
            </form>
            <div id='options-m' style={{display:options.isSelected ? "flex" : "none"}} onClick={()=>setOptions({isSelected:false,end:0,id:0,x:0,y:0})}></div>
            <div id="options" style={{display:options.isSelected ? "flex" : "none",left:(options.x-155)+"px",top:(options.y>window.innerHeight/2 ? options.y - 200 + options.end : options.y)+"px"}}>
                <div className='option-m delete-o' onClick={()=>{setOptions({isSelected:false,end:0,id:0,x:0,y:0});deleteMessage(options.id)}}><img src={excluir_imagem}></img><div>Excluir</div></div>
            </div>
        </div>
    </>
}
export default memo(Chat);