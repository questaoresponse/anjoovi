import { useState, useEffect, useRef, RefObject, createRef } from 'react';
import GlobalContextInterface from '../../Global';
import authInterface, { resultInterface } from '../../Auth';

function Card({option,globals,auth}:{option:string,globals:GlobalContextInterface,auth:authInterface}){
    const { server }=globals;
    const [refs,setRefs]=useState([{linkRef:createRef<HTMLInputElement>(),titleRef:createRef<HTMLInputElement>()}]);
    const values=useRef<{title:string,link:string}[]>([{title:"",link:""}]);
    const [showSave,setShowSave]=useState(false);
    const previousCard=useRef("");
    const get=()=>{
        auth.post(server+"/admin/card",{type:"info"}).then((result:resultInterface)=>{
            const card=JSON.parse(result.data.card);
            setRefs(()=>{
                values.current=[];
                return Array.from({length:card.links.length+1},(_,i:number)=>{
                    values.current.push(i < card.links.length ? {title:card.titles[card.links[i]],link:card.links[i]} : {title:"",link:""});
                    return {linkRef:createRef<HTMLInputElement>(),titleRef:createRef<HTMLInputElement>()}
                });
            });
            previousCard.current=card.links.map((link:string)=>card.titles[link]+link).join("");
        });
    }
    useEffect(()=>{
        get();
    },[]);
    const saveCard=()=>{
        const currentCard=values.current.map(({title,link})=>title+link).join("");
        const titles:{[key:string]:string}={};
        const links:string[]=values.current.map(value=>{
            const { title, link }=value;
            if (title!="" && isValidURL(link)){
                titles[link]=title;
            }
            return link;
        }).filter(link=>link!="");
        if (previousCard.current!=currentCard && (previousCard.current!="" || currentCard!="")){
            setShowSave(false);
            previousCard.current=currentCard;
            auth.post(server+"/admin/card",{type:"update",titles:JSON.stringify(titles),links:JSON.stringify(links)});
        }
    }
    const verifyInputs=()=>{
        var isFilled=true;
        const c:{[key:string]:boolean}={};
        for (var i=0;i<values.current.length;i++){
            const { title, link }=values.current[i];
            if (link in c){
                isFilled=false;
                break;
            } else {
                c[link]=true;
                if (i<values.current.length-1 && (title=="" || !isValidURL(link))){
                    isFilled=false;
                    break;
                }
            }
        }
        return isFilled;
    }
    const isValidURL=(link:string)=>{
        try {
            const url=new URL(link);
            return url.protocol="https:";
        } catch (e){
            return false;
        }
    };
    useEffect(()=>{
        var isFilled=true;
        const c:{[key:string]:boolean}={};
        for (var i=0;i<values.current.length;i++){
            const { title, link }=values.current[i];
            if (link in c){
                isFilled=false;
                break;
            } else {
                c[link]=true;
                if ((i<values.current.length-1 && (title=="" || !isValidURL(link))) || (i==values.current.length-1 && ((title=="" && isValidURL(link)) || (title!="" && !isValidURL(link))))){
                    isFilled=false;
                    break;
                }
            }
        }
        if (isFilled){
            const currentCard=values.current.map(({title,link})=>title+link).join("");
            setShowSave(previousCard.current!=currentCard);
        } else {
            setShowSave(false);
        }

    },[refs]);
    return (
        <div style={{display:option=="card" ? "block" : "none"}} className='card-div'>
            {refs.map(({linkRef,titleRef}:{linkRef:RefObject<HTMLInputElement>,titleRef:RefObject<HTMLInputElement>},index:number)=>{
                return <div>
                    <label className='card-input-label'>Link {index+1}</label>
                    <input value={values.current[index].title} ref={titleRef} className='card-input' onInput={(e:any)=>{
                        const text=e.target.value;
                        values.current[index].title=text;
                        if (index>0 && !verifyInputs() && values.current[values.current.length-1].title+values.current[values.current.length-1].link==""){
                            const c=[...refs];
                            values.current.pop();
                            c.pop();
                            setRefs(c);
                        } else if (refs.length<15 && verifyInputs() && values.current[values.current.length-1].title!="" && isValidURL(values.current[values.current.length-1].link)){
                            values.current.push({title:"",link:""});
                            setRefs(refs=>[...refs.concat([{linkRef:createRef<HTMLInputElement>(),titleRef:createRef<HTMLInputElement>()}])]);
                        } else {
                            setRefs(refs=>[...refs]);
                        }
                    }}></input>
                    <input value={values.current[index].link} ref={linkRef} className='card-input' onInput={(e:any)=>{
                        const text=e.target.value;
                        values.current[index].link=text;
                        if (index>0 && !verifyInputs() && values.current[values.current.length-1].title+values.current[values.current.length-1].link==""){
                            const c=[...refs];
                            values.current.pop();
                            c.pop();
                            setRefs(c);
                        } else if (refs.length<15 && verifyInputs() && values.current[values.current.length-1].title!="" && isValidURL(values.current[values.current.length-1].link)){
                            values.current.push({title:"",link:""});
                            setRefs(refs=>[...refs.concat([{linkRef:createRef<HTMLInputElement>(),titleRef:createRef<HTMLInputElement>()}])]);
                        } else {
                            setRefs(refs=>[...refs]);
                        }
                    }}></input>
                </div>
            })}
            {showSave ? <div id="save" onClick={saveCard}>Salvar</div> : 
            <div id="save" className="loading">Salvar</div>}
        </div>
        )
}
export default Card;