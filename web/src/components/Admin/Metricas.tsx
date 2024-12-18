import { useEffect, useReducer, useRef, useState, memo } from "react";
import { useGlobal } from "../Global.tsx";
import { useAuth } from "../Auth.jsx";
import ReactECharts from 'echarts-for-react';
import './Metricas.scss';
// interface dataInterface{
//     init:(data:string,year:number,month:number,date:number)=>void,
//     update:(data:string)=>void,
//     get_soma:()=>number[],
//     get_geral:()=>any,
//     get_post:()=>any,
//     get_post_24:()=>any,
//     get_post_imagem:()=>any,
//     get_post_musica:()=>any,
//     get_post_texto:()=>any,
//     get_post_video:()=>any,
//     get_day_soma:()=>number[][],
//     get_day_geral:()=>any,
//     get_day_post:()=>any,
//     get_day_post_24:()=>any,
//     get_day_post_imagem:()=>any,
//     get_day_post_musica:()=>any,
//     get_day_post_texto:()=>any,
//     get_day_post_video:()=>any,
//     update_year:(year:number)=>void,
//     get_full_years:()=>number[],
//     [key:string]:any
// }
interface canvasInterface{
    resize:(width:number,height:number,ratio:number)=>void,
    init:(width:number,height:number,ratio:number,data:{labels:any,posts:any})=>void,
    update:(data:{posts:any,labels:any})=>void,
    mouseout:()=>void,
    mouseover:(x:number,y:number)=>void
}
declare global{
    interface Window{
        cv:canvasInterface,
        cv2:canvasInterface,
    }
}
// Chart.register(CategoryScale, LinearScale);
// const Grafico1=memo((props:{dados:any})=>{
//     var dados = {
//         labels: ["celular","computador"],
//         datasets: [{
//             label: 'Usuários ativos',
//             data: props.dados,
//             backgroundColor:['rgba(255,0,0,0.2)','rgba(0,255,0,0.2)'],
//         }]
//     };

//     // Configuração do gráfico
//     const options={
//         responsive:false,
//     }
//     return (
//         <Doughnut data={dados} options={options}/>
//     )
// });
const Grafico1=memo((props:{dados:any})=>{
    const option = {
        tooltip: {
            trigger: 'item',
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                type: 'pie',
                radius: ['40%','60%'],
                label:{
                    show: false,
                    position: "center",
                },
                data: [
                    { value:props.dados[0], name:"celular" },
                    { value:props.dados[1], name:"computador" }
                ],
                itemStyle:{
                    borderColor: "#fff",
                    borderWidth: 2,
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 5,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    return <ReactECharts option={option} style={{ width: 250, height: 200 }} />;
    });
const Grafico2=((props:any)=>{
    const option = {
        tooltip: {
            trigger: 'item',
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                type: 'pie',
                radius: ['40%','60%'],
                label:{
                    show: false,
                    position: "center",
                },
                data: [
                    { value:props.dados[0], name:"logados" },
                    { value:props.dados[1], name:"não logados" }
                ],
                itemStyle:{
                    borderColor: "#fff",
                    borderWidth: 2,
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 5,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    return <ReactECharts option={option} style={{ width: 250, height: 200 }} />;
});
const reducer=(state:any,action:any)=>{
    switch (action.type){
        case 'setValues':
            return {...state,...action.values};
    }
}
function Metricas(){
    const globals=useGlobal();
    const server=globals.server;
    const auth=useAuth();
    const [isTotal,setIsTotal]=useState(false);
    const [dados,dispatch]=useReducer(reducer,{
        grafico1:[],
        grafico2:[],
        grafico3:[],
        grafico4:{data:[],label:[]},
        grafico5:{data:[],label:[]}
        // grafico
    })
    // const previousData=useRef({grafico3:{label:[],data:[]},grafico4:{label:[],data:[]}});
    // const graficos={
    //     grafico3:useRef<HTMLCanvasElement>(null),
    //     grafico4:useRef<HTMLCanvasElement>(null),
    //     // grafico31:useRef(),
    //     // grafico41:useRef(),
    // }
    // const [fullViews,setFullViews]=useState(false);
    const [intervals,setIntervals]=useState([0,11]);
    const currentIntervals=useRef([0,11]);
    const setIntervalValues=(v:number[])=>{
        setIntervals(v);
        currentIntervals.current=v;
    }
    const [yearContent,setYearContent]=useState<number[]>([]);
    const [selected,setSelected]=useState<string | null>();
    const currentSelected=useRef<string | null>(null);
    const [year,setYearState]=useState();
    const currentYear=useRef();
    const setYear=(v:any)=>{
        globals.modules.current && c2.current && c2.current.update_year && c2.current.update_year(Number(v));
        setYearState(v);
        currentYear.current=v;
    }
    const c2=useRef<Teste>();
    const st=useRef<any>(null);
    const refs={
        month:useRef(),
        numMes:useRef<HTMLDivElement>(null),
    }
    
    const gerar=(datab:any)=>{
        var counts0=[0,0];
        var counts1=[0,0];
        if (datab.total_u){        
            for (var user of datab.total_u){
                if (user.tipo=="mobile"){
                    counts0[0]++;
                } else {
                    counts0[1]++;
                }
            }
            for (var user of datab.total_u){
                if (user.usuario!=null){
                    counts1[0]++;
                } else {
                    counts1[1]++;
                }
            }
            setIsTotal(true);
        }
        // var labels2=[];
        // var counts2=[];
        // var primeiroDiaDoMes = new Date();
        // primeiroDiaDoMes.setDate(1);
        // var ultimoDiaDoMes = new Date(primeiroDiaDoMes);
        // ultimoDiaDoMes.setMonth(primeiroDiaDoMes.getMonth() + 1);
        // ultimoDiaDoMes.setDate(0);
        // var numeroDeDias = ultimoDiaDoMes.getDate();
        // for(var i=0;i<numeroDeDias;i++){
        //     counts2.push(0);
        //     labels2.push(i+1);
        // }
        // for (var post of datab.posts) {
        //     var datas=JSON.parse(post.acessos_d);
        //         if (datas instanceof Array){
        //         for (var datad of datas){
        //         // Extrair a hora da data;
        //         for (var data in datad){
        //             var nd=new Date(data);
        //             nd.setHours(nd.getHours()); 
        //             nd.setDate(nd.getDate()-1);
        //             var hora=nd.getHours();  
        //             var dia=nd.getDate();
        //             counts2[dia]++;
        //             counts[hora]++;
        //         };
        //         };
        //     };
        // };
        // calcMes(datab);
        // calc
        // setFullViews(true);
        dispatch({type:'setValues',values:{grafico1:counts0,grafico2:counts1}});
    }
    class Teste{
        data:{
            [key:string]:any,
            pub_geral:any,
            pub_post:any,
            pub_post_24:any,
            pub_post_imagem:any,
            pub_post_musica:any,
            pub_post_texto:any,
            pub_post_video:any,
            day_geral:any,
            day_post:any,
            day_post_24:any,
            day_post_imagem:any,
            day_post_musica:any,
            day_post_texto:any,
            day_post_video:any,
            geral:any,
            post:any,
            post_24:any,
            post_imagem:any,
            post_musica:any,
            post_texto:any,
            post_video:any,
            soma:any,
        }={
            pub_geral:{},
            pub_post:{},
            pub_post_24:{},
            pub_post_imagem:{},
            pub_post_musica:{},
            pub_post_texto:{},
            pub_post_video:{},
            day_geral:{},
            day_post:{},
            day_post_24:{},
            day_post_imagem:{},
            day_post_musica:{},
            day_post_texto:{},
            day_post_video:{},
            geral:{},
            post:{},
            post_24:{},
            post_imagem:{},
            post_musica:{},
            post_texto:{},
            post_video:{},
            soma:{},
        };
        posts:any[]=[];
        year="2024";
        constructor(dados:any){
            this.posts=dados.posts;
            this.update();
        }
        get_year_array(year:number){
            var limit:number[];
            if ((year % 4 === 0 && year % 100 !==0) || (year % 400 === 0)){
                limit=[0,31,60,91,121,152,182,213,244,274,305,335,366];
            } else {
                limit=[0,31,59,90,120,151,181,212,243,273,304,334,365];
            }
            return Array.from({length:12},(_,i)=>Array.from({length:limit[i+1]-limit[i]},()=>0));
        }
        get_pub_geral(){
            return this.data.pub_geral[this.year];
        }
        get_pub_post(){
            return this.data.pub_post[this.year];
        }
        get_pub_post_24(){
            return this.data.pub_post_24[this.year];
        }
        get_pub_post_imagem(){
            return this.data.pub_post_imagem[this.year];
        }
        get_pub_post_musica(){
            return this.data.pub_post_musica[this.year];
        }
        get_pub_post_texto(){
            return this.data.pub_post_texto[this.year];
        }
        get_pub_post_video(){
            return this.data.pub_post_video[this.year];
        }
        get_day_geral(){
            return this.data.day_geral;
        }
        get_day_post(){
            return this.data.day_post;
        }
        get_day_post_24(){
            return this.data.day_post_24;
        }
        get_day_post_imagem(){
            return this.data.day_post_imagem;
        }
        get_day_post_musica(){
            return this.data.day_post_musica;
        }
        get_day_post_texto(){
            return this.data.day_post_texto;
        }
        get_day_post_video(){
            return this.data.day_post_video;
        }
        get_geral(){
            return this.data.geral[this.year];
        }
        get_post(){
            return this.data.post[this.year];
        }
        get_post_24(){
            return this.data.post_24[this.year];
        }
        get_post_imagem(){
            return this.data.post_imagem[this.year];
        }
        get_post_musica(){
            return this.data.post_musica[this.year];
        }
        get_post_texto(){
            return this.data.post_texto[this.year];
        }
        get_post_video(){
            return this.data.post_video[this.year];
        }
        update_year(year:number){
            this.year=String(year);
        }
        get_soma():number[]{
            return this.data.soma[this.year];
        }
        get_full_years():number[]{
            return Object.keys(this.data.geral).map(e=>Number(e));
        }
        update(data:any=null){
            this.data={
                pub_geral:{},
                pub_post:{},
                pub_post_24:{},
                pub_post_imagem:{},
                pub_post_musica:{},
                pub_post_texto:{},
                pub_post_video:{},
                day_geral:Array.from({length:24},()=>[0]),
                day_post:Array.from({length:24},()=>[0]),
                day_post_24:Array.from({length:24},()=>[0]),
                day_post_imagem:Array.from({length:24},()=>[0]),
                day_post_musica:Array.from({length:24},()=>[0]),
                day_post_texto:Array.from({length:24},()=>[0]),
                day_post_video:Array.from({length:24},()=>[0]),
                geral:{},
                post:{},
                post_24:{},
                post_imagem:{},
                post_musica:{},
                post_texto:{},
                post_video:{},
                soma:{},
            };
            if (data){
                this.posts=data.posts;
            }
            console.time("aian");
            const monthLimits = {
                leap: [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366],
                normal: [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365],
            };
            const year_arrays:{[key:string]:any}={};
            const dt=new Date();
            const y=dt.getFullYear();
            const limit=(y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0) ? monthLimits.leap : monthLimits.normal;
            const d=limit[dt.getMonth()]+dt.getDate();
            // const yea
            for (const post of this.posts){
                try{
                    const dates=JSON.parse(post.d2);
                    const pub_date=new Date(JSON.parse(post.d).o);
                    const pub_y=String(pub_date.getFullYear());
                    const pub_m=pub_date.getMonth();
                    const dp=pub_date.getDate();
                    pub_date.setDate(dp-1)
                    const pub_d=pub_date.getDate();
                    if (!(pub_y in year_arrays)){
                        year_arrays[pub_y]=this.get_year_array(Number(pub_y));
                    }
                    if (!(pub_y in this.data.pub_geral)){
                        this.data.pub_geral[pub_y]=JSON.parse(JSON.stringify(year_arrays[pub_y]));
                        this.data.pub_post[pub_y]=JSON.parse(JSON.stringify(year_arrays[pub_y]));
                        this.data.pub_post_24[pub_y]=JSON.parse(JSON.stringify(year_arrays[pub_y]));
                        this.data.pub_post_imagem[pub_y]=JSON.parse(JSON.stringify(year_arrays[pub_y]));
                        this.data.pub_post_musica[pub_y]=JSON.parse(JSON.stringify(year_arrays[pub_y]));
                        this.data.pub_post_texto[pub_y]=JSON.parse(JSON.stringify(year_arrays[pub_y]));
                        this.data.pub_post_video[pub_y]=JSON.parse(JSON.stringify(year_arrays[pub_y]));
                    }
                    this.data.pub_geral[pub_y][pub_m][pub_d]++;
                    if (post.tipo=="post"){
                        this.data.pub_post[pub_y][pub_m][pub_d]++;
                    } else if (post.tipo=="post_24"){
                        this.data.pub_post_24[pub_y][pub_m][pub_d]++;
                    } else if (post.tipo=="post_imagem"){
                        this.data.pub_post_imagem[pub_y][pub_m][pub_d]++;
                    } else if (post.tipo=="post_musica"){
                        this.data.pub_post_musica[pub_y][pub_m][pub_d]++;
                    } else if (post.tipo=="post_texto"){
                        this.data.pub_post_texto[pub_y][pub_m][pub_d]++;
                    } else if (post.tipo=="post_video"){
                        this.data.pub_post_video[pub_y][pub_m][pub_d]++;
                    };
                    // const pub_
                    const years=Object.keys(dates);
                    for (const year of years){
                        const intYear=Number(year);
                        const limit=(intYear % 4 === 0 && intYear % 100 !== 0) || (intYear % 400 === 0) ? monthLimits.leap : monthLimits.normal;
                        if (!(year in year_arrays)){
                            year_arrays[year]=this.get_year_array(intYear);

                        }
                        if (!(year in this.data.geral)){
                            this.data.geral[year]=JSON.parse(JSON.stringify(year_arrays[year]));
                            this.data.post[year]=JSON.parse(JSON.stringify(year_arrays[year]));
                            this.data.post_24[year]=JSON.parse(JSON.stringify(year_arrays[year]));
                            this.data.post_imagem[year]=JSON.parse(JSON.stringify(year_arrays[year]));
                            this.data.post_musica[year]=JSON.parse(JSON.stringify(year_arrays[year]));
                            this.data.post_texto[year]=JSON.parse(JSON.stringify(year_arrays[year]));
                            this.data.post_video[year]=JSON.parse(JSON.stringify(year_arrays[year]));
                            this.data.soma[year]=Array.from({length:12},()=>0);
                        }
                        for (const day in dates[year]){
                            const i=Number(day);
                            const m=limit.findIndex((_,m)=>i>=limit[m] && i<limit[m+1]);
                            if (post.tipo=="post_musica"){
                                var value=dates[year][i].length > 0 && Array.isArray(dates[year][i][0]) ? dates[year][day].reduce((sum:number,el:any)=>sum + el.length,0) : dates[year][day].length;
                                this.data.geral[year][m][i-limit[m]]+=value;
                                this.data.soma[year][m]+=value;
                                this.data.post_musica[year][m][i-limit[m]]+=value;
                            } else {
                                this.data.geral[year][m][i-limit[m]]+=dates[year][day].length;
                                this.data.soma[year][m]+=dates[year][day].length;
                                switch (post.tipo){
                                    case "post":
                                        this.data.post[year][m][i-limit[m]]+=dates[year][day].length;
                                        break;
                                    case "post_24":
                                        this.data.post_24[year][m][i-limit[m]]+=dates[year][day].length;
                                        break;
                                    case "post_imagem":
                                        this.data.post_imagem[year][m][i-limit[m]]+=dates[year][day].length;
                                        break;
                                    case "post_texto":
                                        this.data.post_texto[year][m][i-limit[m]]+=dates[year][day].length;
                                        break;
                                    case "post_video":
                                        this.data.post_video[year][m][i-limit[m]]+=dates[year][day].length;
                                }
                            }
                            if (intYear===y && d===i && dates[year][day].length>0){
                                for (var date of dates[year][day]){
                                    if (post.tipo=="post_musica"){
                                        if (Array.isArray(date)){
                                            for (const date2 of date){
                                                const h=Number(Object.keys(date2)[0].split(":")[0]);
                                                this.data.day_geral[h][0]++;
                                                this.data.day_post_musica[h][0]++;
                                            }
                                        } else {
                                            const h=Number(Object.keys(date)[0].split(":")[0]);
                                            this.data.day_geral[h][0]++;
                                            this.data.day_post_musica[h][0]++;
                                        }
                                    } else {
                                        const h=Number(Object.keys(date)[0].split(":")[0]);
                                        this.data.day_geral[h][0]++;
                                        if (post.tipo=="post"){
                                            this.data.day_post[h][0]++;
                                        } else if (post.tipo=="post_24"){
                                            this.data.day_post_24[h][0]++;
                                        } else if (post.tipo=="post_imagem"){
                                            this.data.day_post_imagem[h][0]++;
                                        } else if (post.tipo=="post_texto"){
                                            this.data.day_post_texto[h][0]++;
                                        } else if (post.tipo=="post_video"){
                                            this.data.day_post_video[h][0]++;
                                        }
                                    }
                                }
                            }
                        }
                    }
                } catch (e){
                    console.log("erro",post,e);
                }
            }
            for (const year in year_arrays){
                if (!(year in this.data.geral)){
                    this.data.geral[year]=JSON.parse(JSON.stringify(year_arrays[year]));
                    this.data.post[year]=JSON.parse(JSON.stringify(year_arrays[year]));
                    this.data.post_24[year]=JSON.parse(JSON.stringify(year_arrays[year]));
                    this.data.post_imagem[year]=JSON.parse(JSON.stringify(year_arrays[year]));
                    this.data.post_musica[year]=JSON.parse(JSON.stringify(year_arrays[year]));
                    this.data.post_texto[year]=JSON.parse(JSON.stringify(year_arrays[year]));
                    this.data.post_video[year]=JSON.parse(JSON.stringify(year_arrays[year]));
                    this.data.soma[year]=Array.from({length:12},()=>0);
                };
                if (!(year in this.data.pub_geral)){
                    this.data.pub_geral[year]=JSON.parse(JSON.stringify(year_arrays[year]));
                    this.data.pub_post[year]=JSON.parse(JSON.stringify(year_arrays[year]));
                    this.data.pub_post_24[year]=JSON.parse(JSON.stringify(year_arrays[year]));
                    this.data.pub_post_imagem[year]=JSON.parse(JSON.stringify(year_arrays[year]));
                    this.data.pub_post_musica[year]=JSON.parse(JSON.stringify(year_arrays[year]));
                    this.data.pub_post_texto[year]=JSON.parse(JSON.stringify(year_arrays[year]));
                    this.data.pub_post_video[year]=JSON.parse(JSON.stringify(year_arrays[year]));
                }
            }
            console.timeEnd("aian");
        }
        // call(name:string,args=[]):any{
        //     return this.method;
        // }
        get(type:string):any[]{
            switch (type){
                case "post":
                    return this.get_post();
                case "post_24":
                    return this.get_post_24();
                case "post_imagem":
                    return this.get_post_imagem();
                case "post_musica":
                    return this.get_post_musica();
                case "post_texto":
                    return this.get_post_texto();
                case "post_video":
                    return this.get_post_video();
                default:
                    return [];
            }
        }
        get_day(type:string):number[][]{
            switch (type){
                case "post":
                    return this.get_day_post();
                case "post_24":
                    return this.get_day_post_24();
                case "post_imagem":
                    return this.get_day_post_imagem();
                case "post_musica":
                    return this.get_day_post_musica();
                case "post_texto":
                    return this.get_day_post_texto();
                case "post_video":
                    return this.get_day_post_video();
                default:
                    return [];
            }
        }
        get_pub(type:string):number[]{
            switch (type){
                case "post":
                    return this.get_pub_post();
                case "post_24":
                    return this.get_pub_post_24();
                case "post_imagem":
                    return this.get_pub_post_imagem();
                case "post_musica":
                    return this.get_pub_post_musica();
                case "post_texto":
                    return this.get_pub_post_texto();
                case "post_video":
                    return this.get_pub_post_video();
                default:
                    return [];
            }
        }
    }
    const agendado=useRef<any>(false);
    const datas=useRef<{grafico3:number[][],grafico4:number[],grafico5:number[],soma:number[]} | null>(null);
    const get=()=>{
        auth.post(server+"/admin/metricas",{type:"info"}).then((result)=>{
            if (result.error){
                globals.setRedirectError(result.error);
            } else {
                // if (globals.modules.current){
                if (c2.current){
                    c2.current.update(result.data);
                    // console.log(dados.grafico3.current);
                    // setGraficos2([{label:dados.grafico3.current as string[],data:dados.grafico3.current as number[]},{label:[],data:[]}]);
                } else {
                    // const data=globals.modules.current.Data;
                    // let date=new Date();
                    // setYear(date.getFullYear());
                    c2.current=new Teste(result.data);
                    // c2.current!.init(JSON.stringify(result.data),date.getFullYear(),date.getMonth(),date.getDate());
                }
                if (currentSelected.current){
                    modify();
                } else {
                    setSelected(" selected1");
                }
                    //datas.current={grafico3:c2.current.get_day_geral(),grafico4:c2.current.get_geral(),soma:c2.current.get_soma()};
                // } else {
                //     agendado.current=result.data;
                // }
                gerar(result.data);
            }
        })
    };
    const modify=()=>{
        if (currentSelected.current && c2.current){
            const yearAtual=new Date().getFullYear();
            const years=c2.current.get_full_years();
            !currentYear.current && setYear(years.includes(yearAtual) ? yearAtual : years[0]);
            setYearContent(years);
            const options:{[key:string]:string}={
                " selected2":"post_24",
                " selected3":"post",
                " selected4":"post_imagem",
                " selected5":"post_musica",
                " selected6":"post_texto",
                " selected7":"post_video"
            };
            if (currentSelected.current==" selected1"){
                // console.log(c2.current.call("get_geral"));
                datas.current={grafico3:c2.current.get_day_geral(),grafico4:c2.current.get_geral(),grafico5:c2.current.get_pub_geral(),soma:c2.current.get_soma()};
            } else if (currentSelected.current in options){
                datas.current={grafico3:c2.current.get_day(options[currentSelected.current]),grafico4:c2.current.get(options[currentSelected.current]),grafico5:c2.current.get_pub(options[currentSelected.current]),soma:c2.current.get_soma()};
            }
            update();
        }
    }
    const update=()=>{
        if (datas.current){
            const interval1=currentIntervals.current[0];
            const interval2=currentIntervals.current[1];
            const o=interval2>=interval1 ? [interval1,interval2] : [interval2,interval1];
            var n=o[1]-o[0]+1;
            // if (interval2<interval1){
            //     n=interval1-interval2+1;
            // } else if (interval2>=interval1){
            //     n=interval2-interval1+1;
            // }
            var labels3=Array.from({length:n},(_,index)=>String(interval1+index+1));
            // const limit:number[]=[0,31,59,90,120,151,181,212,243,273,304,334,366];

            // var dds:number[][]=[];
            // for (var i=0;i<12;i++){
            //     dds.push([]);
            //     for (var j=0;j<limit[i+1] - limit[i];j++){
            //         dds[i].push(datas.current.grafico4[limit[i]+j]);
            //     }
            // }
            var limited_data_grafico4=datas.current.grafico4.filter((_,i)=>{
                return i>=o[0] && i<=o[1];
            });
            var limited_data_grafico5=datas.current.grafico5.filter((_,i)=>{
                return i>=o[0] && i<=o[1];
            });
            refs.numMes.current!.textContent=String(datas.current.soma.filter((_,i)=>{
                return i>=o[0] && i<=o[1];
            }).reduce((c,d)=>c+d));
            const grafico3_data={label:Array.from({length:24},(_,index)=>index+""),data:datas.current.grafico3};
            dispatch({type:'setValues',values:{...dados,grafico3:grafico3_data,grafico4:{data:limited_data_grafico4,label:labels3},grafico5:{data:limited_data_grafico5,label:labels3}}});
        }
    }
    // const resize=()=>{
    //     const width=document.body.clientWidth;
    //     const height=document.body.clientWidth/1280*720;
    //     const ratio=window.devicePixelRatio;
    //     window.cv.resize(width,height,ratio);
    //     window.cv2.resize(width,height,ratio);
    // }
    useEffect(()=>{
        get();
        st.current=setInterval(()=>{
            get();
        },10000);
        globals.setSelected("metricas");
        // window.addEventListener("resize",resize);
        return ()=>{
            clearInterval(st.current);
            // window.removeEventListener("resize",resize);
        }
    },[]);
    useEffect(()=>{
        if (agendado.current){
            // const data=globals.modules.current.Data;
            // let date=new Date();
            // setYear(date.getFullYear());
            c2.current=new Teste(agendado.current);
            // c2.current!.init(JSON.stringify(agendado.current),date.getFullYear(),date.getMonth(),date.getDate());
            datas.current={grafico3:c2.current!.get_day_geral(),grafico4:c2.current!.get_geral(),grafico5:c2.current!.get_pub_geral(),soma:c2.current!.get_soma()};
            if (currentSelected.current){
                modify();
            } else {
                setSelected(" selected1");
            }
            agendado.current=false;
        }
    },[globals.modules.current]);
    const [graficos2, setGraficos2]=useState<{label:string[],data:number[] | number[]}[]>([{label:[],data:[]},{label:[],data:[]},{label:[],data:[]}]);
    // const init_grafico=(grafico:any,grafico2:any,data:{data:any,label:any} | null=null)=>{
    //     var lb,dt:number[][] | null=null;
    //     if (data){
    //         lb=data!.label;
    //         dt=data!.data;
    //     } else {
    //         lb=["0","0"];
    //         dt=[[20],[30]];
    //     }
    //     // if (grafico.id=="grafico4" && data==null) return;
    //     grafico.getContext("2d",{willReadFrequently:true});
    //     grafico2.getContext("2d",{willReadFrequently:true});
    //     // console.time("time");
    //     var canvas:canvasInterface=new globals.modules.current.Canvas(grafico,grafico2);
    //     canvas.init(document.body.clientWidth,document.body.clientWidth/1280*720,window.devicePixelRatio,{labels:lb,posts:dt});
    //     function gt(e:any){
    //         var p=grafico.getBoundingClientRect();
    //         // console.time("e");
    //         canvas.mouseover(e.clientX - p.left,e.clientY - p.top);
    //         // console.timeEnd("e");
    //     }
    //     grafico.addEventListener("mouseover",gt)
    //     grafico.addEventListener("mousemove",gt)
    //     grafico.addEventListener("mouseout",()=>{
    //         canvas.mouseout();
    //     })
    //     grafico.addEventListener("click",gt)
    //     // console.timeEnd("time");
    //     return canvas;
    // }
    // useEffect(()=>{
    //     if (globals.modules.current){
    //         window.cv=init_grafico(graficos.grafico3.current,document.createElement("canvas"));
    //         window.cv2=init_grafico(graficos.grafico4.current,document.createElement("canvas"));
    //     }
    // },[globals.modules.current]);
    useEffect(()=>{
        if (year && datas.current){
            modify();
        }
    },[intervals,year]);
    const onChangeInterval1=(e:any)=>{
        setIntervalValues([Number(e.target.value),intervals[1]].sort())
    }
    const onChangeInterval2=(e:any)=>{
        setIntervalValues([intervals[0],Number(e.target.value)].sort());
    }
    const onChangeYear=(e:any)=>{
        setYear(Number(e.target.value));
    }
    useEffect(()=>{
        // if (window.cv && dados.grafico4.data.length>0){
        if (dados.grafico4.data.length>0){
            updateGraphics(dados);

            // window.cv.update({labels:dados.grafico3.label,posts:dados.grafico3.data});
            // window.cv2.update({labels:dados.grafico4.label,posts:dados.grafico4.data});
        }
    },[dados,globals.modules.current]);
    const months=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
    const updateGraphics=(dados:{grafico3:{data:any[],label:string[]},grafico4:{data:any[],label:string[]},grafico5:{data:any[],label:string[]}})=>{
        const contents:any[]=[[],[],[]];
        // for (const data of [[dados.grafico3,1],[dados.grafico4,31]] as any){
        //     const l1:any=[];
        //     const d=data[1];
        //     for (var i=0;i<data[0].data.length;i++){
        //         var pv=d/data[0].data[i].length;
        //         var dv=d * (i);
        //         for (var j=0;j<data[0].data[i].length;j++){
        //             contents[0].push({name:i,value:[dv + pv * (j+1),data[0].data[i][j]]});
        //         }
        //     }
        // }
        const d1=1;
        for (var i=0;i<dados.grafico3.data.length;i++){
            var pv=d1/dados.grafico3.data[i].length;
            var dv=d1 * (i) - 1;
            for (var j=0;j<dados.grafico3.data[i].length;j++){
                contents[0].push({name:i,value:[dv + pv * (j+1),dados.grafico3.data[i][j]]});
            }
        }
        const monthLimits = {
            leap: [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366],
            normal: [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365],
        };
        const limit=(year! % 4 === 0 && year! % 100 !==0) || (year! % 400 === 0) ? monthLimits.leap : monthLimits.normal;
        for (var i=0;i<dados.grafico4.data.length;i++){
            for (var j=0;j<dados.grafico4.data[i].length;j++){
                contents[1].push({name:months[i],value:[limit[i]+j+1,dados.grafico4.data[i][j]]});
            }
        }
        for (var i=0;i<dados.grafico5.data.length;i++){
            for (var j=0;j<dados.grafico5.data[i].length;j++){
                contents[2].push({name:months[i],value:[limit[i]+j+1,dados.grafico5.data[i][j]]});
            }
        }
        // const max=Math.max(dados.grafico4.data.map((data:any)=>Math.max(data)));
        setGraficos2([{label:dados.grafico3.label,data:contents[0]},{label:dados.grafico4.label as string[],data:contents[1]},{label:dados.grafico5.label as string[],data:contents[2]}]);
    };
    useEffect(()=>{
        if (selected){
            currentSelected.current=selected;
            modify();
        }
    },[selected]);
    const option1 = {
        tooltip: { trigger: 'item' },
        grid:{
            top: 30,
            left: 30,   // Remove a margem esquerda
            right: 30,  // Remove a margem direita
            bottom: 0, // Remove a margem inferior
            containLabel: true // Faz com que o conteúdo seja ajustado ao grid
        },
        xAxis: { type: 'category', data: Array.from({length:24},(_,b:any)=>b) },
        yAxis: { type: 'value' },
        series: [{ data: graficos2[0].data, type: 'line', symbolSize: 8, color:"#000000" }],
        // dataZoom: [
        //     {
        //         type: 'slider',  // Usando um slider para zoom
        //         show: true,  // Mostrar o controle de zoom
        //         xAxisIndex: [0],  // Ativar zoom no eixo X
        //         start: 0,  // Posição inicial do zoom (0% = começo)
        //         end: 100     // Posição final do zoom (100% = fim)
        //     }
        // ]
    };
    const option2 = {
        tooltip: { trigger: 'item', formatter: function({value}:{_:any,value:any}) {
            const monthLimits = {
                leap: [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366],
                normal: [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365],
            };
            const i=value[0];
            const limit=(year! % 4 === 0 && year! % 100 !==0) || (year! % 400 === 0) ? monthLimits.leap : monthLimits.normal;
            const m=limit.findIndex((_,m)=>i>=limit[m] && i<=limit[m+1]);
            const d=(Math.floor(i)-limit[m]);
            const n=value[1];
            const name=months[currentIntervals.current[0]+m];
            return `<div style="display:flex;flex-direction:row;align-items:center"><div style="background-color:black;width:0.75em;height:0.75em;border-radius:50%;margin-right:5px;"></div>${d}-${name}&nbsp;&nbsp;<div style="margin-left:10px;color:black">${n}</div><div>`;
        } },
        grid:{
            top: 30,
            left: 30,   // Remove a margem esquerda
            right: 30,  // Remove a margem direita
            bottom: 0, // Remove a margem inferior
            containLabel: true // Faz com que o conteúdo seja ajustado ao grid
        },
        xAxis: { type: 'category',axisLabel: { interval: 0,  // Exibe todos os rótulos
            formatter: function(_:any, index:any) {
                // Defina uma lógica para controlar quais rótulos aparecerão
                // Exemplo: Exibir rótulos apenas nos dias múltiplos de 30
                const limit=[0,31,59,90,120,151,181,212,243,273,304,334][intervals[0]];
                const c=[[16 - limit,0],[45 - limit,1],[75 - limit,2],[105 - limit,3],[136 - limit,4],[166 - limit,5],[197 - limit,6],[228 - limit,7],[258 - limit,8],[289 - limit,9],[319 - limit,10],[350 - limit,11]].filter((v:any)=>intervals[0] <= v[1] && v[1] <= intervals[1]).find((v)=>v[0]==index);
                if (c) {
                    return months[c[1]];  // Exibe o rótulo
                } else {
                    return '';  // Não exibe o rótulo
                }
            } } },
        yAxis: { type: 'value' },
        series: [{ data: graficos2[1].data, type: 'line', symbolSize: 8, color:"#000000" }],
        // dataZoom: [
        //     {
        //         type: 'slider',  // Usando um slider para zoom
        //         show: true,  // Mostrar o controle de zoom
        //         xAxisIndex: [0],  // Ativar zoom no eixo X
        //         start: 0,  // Posição inicial do zoom (0% = começo)
        //         end: 100     // Posição final do zoom (100% = fim)
        //     }
        // ]
    };
    const option3 = {
        tooltip: { trigger: 'item', formatter: function({value}:{_:any,value:any}) {
            const monthLimits = {
                leap: [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366],
                normal: [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365],
            };
            const i=value[0];
            const limit=(year! % 4 === 0 && year! % 100 !==0) || (year! % 400 === 0) ? monthLimits.leap : monthLimits.normal;
            const m=limit.findIndex((_,m)=>i>limit[m] && i<limit[m+1]+1);
            const d=(Math.floor(i)-limit[m]);
            const n=value[1];
            const name=months[currentIntervals.current[0]+m];
            return `<div style="display:flex;flex-direction:row;align-items:center"><div style="background-color:black;width:0.75em;height:0.75em;border-radius:50%;margin-right:5px;"></div>${d}-${name}&nbsp;&nbsp;<div style="margin-left:10px;color:black">${n}</div><div>`;
        } },
        grid:{
            top: 30,
            left: 30,   // Remove a margem esquerda
            right: 30,  // Remove a margem direita
            bottom: 0, // Remove a margem inferior
            containLabel: true // Faz com que o conteúdo seja ajustado ao grid
        },
        xAxis: { type: 'category',axisLabel: { interval: 0,  // Exibe todos os rótulos
            formatter: function(_:any, index:any) {
                // Defina uma lógica para controlar quais rótulos aparecerão
                // Exemplo: Exibir rótulos apenas nos dias múltiplos de 30
                const limit=[0,31,59,90,120,151,181,212,243,273,304,334][intervals[0]];
                const c=[[16 - limit,0],[45 - limit,1],[75 - limit,2],[105 - limit,3],[136 - limit,4],[166 - limit,5],[197 - limit,6],[228 - limit,7],[258 - limit,8],[289 - limit,9],[319 - limit,10],[350 - limit,11]].filter((v:any)=>intervals[0] <= v[1] && v[1] <= intervals[1]).find((v)=>v[0]==index);
                if (c) {
                    return months[c[1]];  // Exibe o rótulo
                } else {
                    return '';  // Não exibe o rótulo
                }
            } } },
        yAxis: { type: 'value' },
        series: [{ data: graficos2[2].data, type: 'line', symbolSize: 8, color:"#000000" }],
        // dataZoom: [
        //     {
        //         type: 'slider',  // Usando um slider para zoom
        //         show: true,  // Mostrar o controle de zoom
        //         xAxisIndex: [0],  // Ativar zoom no eixo X
        //         start: 0,  // Posição inicial do zoom (0% = começo)
        //         end: 100     // Posição final do zoom (100% = fim)
        //     }
        // ]
    };
    return (
        <>
            <div id="dt" className="met">
                <div id="pg">
                    { isTotal && <Grafico1 dados={dados.grafico1}/> }
                    { isTotal && <Grafico2 dados={dados.grafico2}/> }
                    {/* <Grafico3 dados={dados.grafico3}/> */}
                    <div id="tipo">
                        <div className={"select"+(selected || " selected1")}></div>
                        <div id="tipod">
                            <div className="tipo t1" onClick={()=>{setSelected(" selected1")}}>Geral</div>
                            <div className="tipo t2" onClick={()=>{setSelected(" selected2")}}>24 horas</div>
                            <div className="tipo t3" onClick={()=>{setSelected(" selected3")}}>Matérias</div>
                            <div className="tipo t4" onClick={()=>{setSelected(" selected4")}}>Imagens</div>
                            <div className="tipo t5" onClick={()=>{setSelected(" selected5")}}>Músicas</div>
                            <div className="tipo t6" onClick={()=>{setSelected(" selected6")}}>Textos</div>
                            <div className="tipo t7" onClick={()=>{setSelected(" selected7")}}>Vídeos</div>
                        </div>
                    </div>
                    <div className="label-name">Visualização diária:</div>
                    <ReactECharts className="grafico3" style={{width:"100%",height:"80vh"}} option={option1} />
                    {/* <canvas id="grafico3" ref={graficos.grafico3}></canvas> */}
                    <div className="label-name">Visualização geral:</div>
                    <ReactECharts className="grafico4" style={{width:"100%",height:"80vh"}} option={option2} />
                    <div className="label-name">Número de postagens:</div>
                    <ReactECharts className="grafico5" style={{width:"100%",height:"80vh"}} option={option3} />
                    {/* <canvas id="grafico4" style={{marginTop:"2"}} ref={graficos.grafico4}></canvas> */}
                    <div id="options">
                        <div id="option1" className="option">
                            <div className="label-name">Ano atual:</div>
                            {year ? 
                            <select defaultValue={year} onChange={onChangeYear}>
                                {yearContent.map((year,index)=>{
                                    return (
                                        <option key={index} value={String(year)}>{year}</option>
                                    )
                                })}
                            </select>
                            : null}
                        </div>
                        <div id="interval-div">
                            <div id="option2" className="option">
                                <div className="label-name">Mês de inicio:</div>
                                <select onChange={onChangeInterval1} id="select-interval1">
                                    <option value="0">Janeiro</option>
                                    <option value="1">Fevereiro</option>
                                    <option value="2">Março</option>
                                    <option value="3">Abril</option>
                                    <option value="4">Maio</option>
                                    <option value="5">Junho</option>
                                    <option value="6">Julho</option>
                                    <option value="7">Agosto</option>
                                    <option value="8">Setembro</option>
                                    <option value="9">Outubro</option>
                                    <option value="10">Novembro</option>
                                    <option value="11">Dezembro</option>
                                </select>
                            </div>
                            <div id="option3" className="option">
                                <div className="label-name">Mês final:</div>
                                <select defaultValue="11" onChange={onChangeInterval2} id="select-interval2">
                                    <option value="0">Janeiro</option>
                                    <option value="1">Fevereiro</option>
                                    <option value="2">Março</option>
                                    <option value="3">Abril</option>
                                    <option value="4">Maio</option>
                                    <option value="5">Junho</option>
                                    <option value="6">Julho</option>
                                    <option value="7">Agosto</option>
                                    <option value="8">Setembro</option>
                                    <option value="9">Outubro</option>
                                    <option value="10">Novembro</option>
                                    <option value="11">Dezembro</option>
                                </select>
                            </div>
                        </div>
                        <div id="option4" className="option">
                            <div className="label-name">Soma total:</div>
                            <div id="soma-total" ref={refs.numMes}>0</div>
                        </div>
                    </div>
                </div>
            </div>
       </>
    )
}
export default Metricas;
