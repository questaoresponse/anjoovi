import{r as i,u as xe,a as ye,s as b,j as r}from"./index-D7_EJXQK.js";import{F as Ce,f as Re,t as L,P as Se}from"./Publicar-DEndH5Za.js";/* empty css             */function be(){const N=xe(),{server:x,navigate:T,cargo:_}=N,k=ye(),[Q,X]=i.useState(!1),d=i.useRef(!1),y=i.useRef(),[Y,B]=i.useState("Upload"),[Z,D]=i.useState(!1),[ee,I]=i.useState(!1),[te,re]=i.useState(0),[h,C]=i.useState([{titulo:"",input:i.createRef()}]),[R,v]=i.useState(!1),[ie,$]=i.useState(!1),[ae,z]=i.useState(!1),[ne,O]=i.useState("Upload"),[F,se]=i.useState(((_.current.cargo||0)&4)==4),[le,oe]=i.useState(!1),j=i.useRef(new Ce),o={permission:i.useRef(null),titulo:i.useRef(null),imagem:i.useRef(null),imagem_view:i.useRef(null),imagem_premium:i.useRef(null),imagem_view_premium:i.useRef(null),image_element_premium:i.useRef(null)},ce=()=>{z(!0);const e=setTimeout(()=>{z(!1),clearTimeout(e)},2e3)},ue=()=>{$(!0);const e=setTimeout(()=>{$(!1),clearTimeout(e)},2e3)},[U,H]=i.useState({src:b,width:"100%",height:"100%"}),[M,W]=i.useState({src:b,width:"100%",height:"100%"}),w=(e,t)=>{if(typeof e=="string"){const n=new Image;n.onload=()=>{const l=o.imagem_view.current.offsetWidth,u=o.imagem_view.current.offsetHeight;var a=n.width,s=n.height;l/a*s>u?(a=u/s*a,s=u):(s=l/a*s,a=l),t?W({src:e,width:a,height:s}):H({src:e,width:a,height:s})},n.src=e}else t?W({src:b,width:window.innerWidth,height:window.innerHeight/1280*720}):H({src:b,width:window.innerWidth,height:window.innerHeight/1280*720})},J=(e,t)=>{const n=e.target.files[0];if(n){const l=new FileReader;l.onloadend=()=>{const u=l.result instanceof ArrayBuffer?l.result:new ArrayBuffer(0),a=new Uint8Array(u),s={jpeg:[255,216,255],png:[137,80,78,71,13,10,26,10],gif:[71,73,70]};let m=null;for(const[p,f]of Object.entries(s))if(f.every((E,q)=>E===a[q])){m=p;break}if(m&&m=="jpeg"){t?O(n.name):B(n.name);const p=new FileReader;p.onloadend=()=>{w(p.result,t)},p.readAsDataURL(n)}else w(null,t),e.target.value="",ue()},l.readAsArrayBuffer(n)}},P=e=>{var t;d.current?t=Math.round(e.loaded*100/e.total)==100?99:Math.round(e.loaded*100/e.total):c.current.executed?t=50+(Math.round(e.loaded*100/e.total)>=100?49:Math.round(e.loaded*100/e.total/2)):t=Math.round(e),I(!0),re(t)},G=e=>{var t=new FormData;const n=o.imagem.current.files[0];t.append("type","option"),d.current&&t.append("id",y.current.id.toString()),n&&t.append("imagem",n),n&&t.append("imagens_edit","true"),t.append("titulo",o.titulo.current.value),e&&t.append("files",JSON.stringify(e)),k.post(x+"/admin/musicas_cadastro?type="+(d.current?"edit":"cadastro"),t,d.current?{arquivo:!0}:{arquivo:!0,porcentagem:P}).then(l=>{if(l.error)N.redirectError.current(l.error);else if(l.data.result=="true"){if(d.current){const a=new URLSearchParams(location.search);if(a.has("origin"))T(decodeURIComponent(a.get("origin")));else{const s=location.pathname.split("_");T(s[0]+"_lista")}d.current=!1,y.current=void 0}I(!1),c.current.executed=!1,D(!0);var u=setTimeout(()=>{D(!1),clearTimeout(u)},2e3);o.titulo.current.value="",o.imagem.current.value="",O("Upload"),B("Upload"),C([{titulo:"",input:i.createRef()}]),w(null,!0),w(null,!1)}})},de=i.useCallback(async e=>{if(e.preventDefault(),R||ce(),!R)return;const t=[];var n=0,l={};async function u(a){const s=a.file,m=1024*1024,p=Math.ceil(s.size/m);for(let f=0;f<p;f++){const g=new FormData,E=f*m,q=Math.min((f+1)*m,s.size),je=s.slice(E,q);g.append("totalChunks",p.toString()),g.append("currentChunk",f.toString()),g.append("type","chunk"),g.append("filename",a.name),g.append("file",je,a.name),await k.post(x+"/admin/musicas_cadastro?type=chunk",g,{arquivo:!0}),l[a.name]=(f+1)/p,P({loaded:t.map(A=>l[A.name]).reduce((A,we)=>A+we,0)*100/t.length,total:100})}n+=1,n==t.length&&G(t.map(f=>f.name))}if(I(!0),d.current)G();else{for(const a of h){const s=a.input.current.files[0];if(s.type=="audio/x-m4a")me({progress:1}),t.push({file:s,name:s.name.split(".").slice(0,-1).join(".")+".m4a"});else{const m="input"+s.name.split(".").slice(-1).join(".");await j.current.writeFile(m,await Re(s)),await j.current.exec(["-i",m,"-vn","-c:a","aac","output.m4a"]);const p=new Uint8Array(await j.current.readFile("output.m4a"));await j.current.deleteFile(m),await j.current.deleteFile("output.m4a");const f=new Blob([p.buffer],{type:"audio/m4a"});t.push({file:f,name:s.name.split(".").slice(0,-1).join(".")+".m4a"})}}c.current.executed=!0;for(const a of t)l[a.name]=0,u(a)}},[h,R]),me=i.useCallback(({progress:e})=>{c.current.finished==-1&&(c.current.finished=0);const t=50/c.current.length;P(t*c.current.finished+e/1*t),e==1&&c.current.length>c.current.finished&&c.current.finished++,c.current.length==c.current.finished&&(c.current.finished=-1)},[h]);d.current=location.pathname=="/admin/musicas_edit";const c=i.useRef({length:0,finished:0,executed:!1}),V=e=>{se((e&4)==4)},K=()=>{F&&(o.permission.current.value=y.current.privado?"1":"0")};i.useEffect(()=>(N.setSelected("publicar"),X(d.current),d.current?(v(!0),k.post(x+"/admin/musicas_edit"+location.search,{type:"info"}).then(e=>{if("post_edit"in e.data){o.imagem.current.required=!1;const t=e.data.post_edit[0];o.titulo.current.value=t.titulo,t.arquivo=JSON.parse(t.arquivo),C(Array.from({length:t.arquivo.length},(n,l)=>({titulo:t.arquivo[l].replace(/\.[^/.]+$/,""),input:i.createRef()}))),t.privado=(t.privado&2)==2,y.current=t,K(),w(x+"/images/"+encodeURIComponent(t.imagem.slice(2)),!0),w(x+"/images/"+encodeURIComponent(t.imagem),!1)}})):(async()=>await j.current.load({coreURL:await L("/ffmpeg-core.js","text/javascript"),wasmURL:await L("https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm/ffmpeg-core.wasm","application/wasm"),workerURL:await L("/ffmpeg-core.worker.js","text/javascript")}))(),_.current.addListener(V),()=>{_.current.removeListener(V)}),[]),i.useEffect(()=>{y.current&&K()},[F]);const fe=()=>{v(!1),C(e=>[...e,{titulo:"",input:i.createRef()}])},S=i.useRef([]);i.useEffect(()=>{if(h.length>1){for(const e of S.current){const t=new DataTransfer;t.items.add(e[1]),h[e[0]].input.current.files=t.files}S.current=[]}},[h]);const pe=i.useCallback(e=>{if(!d.current){var t=0;C(n=>{const l=n[e].input.current.files.length;if(n=n.map((a,s)=>{if(e==s&&a.input.current.files.length>0){const m=a.input.current.files.length;return t+=m,s==n.length-1&&t==n.length+m-1&&v(!0),{...a,titulo:a.input.current.files[0].name.replace(/\.[^/.]+$/,"")}}else if(a.titulo!=""&&a.input.current.files.length>0)t++,s==n.length-1&&t==n.length&&v(!0);else if(a.titulo!=""&&a.input.current.files.length==0)return v(!1),{...a,titulo:""};return a}),l>0){const a=[];S.current=[];for(var u=1;u<l;u++){const s={titulo:n[e].input.current.files[u].name.replace(/\.[^/.]+$/,""),input:i.createRef()};S.current.push([e+u,n[e].input.current.files[u]]),a.push(s)}n.splice(e+1,0,...a)}return c.current.length=n.length,n})}},[h]),he=i.useCallback(e=>{d.current||h[e].input.current.click()},[h]),ge=e=>{e>0&&!d.current&&C(t=>(t.length>1&&(t.splice(e,1),v(!0)),c.current.length=t.length,[...t]))},ve=e=>{oe(e.target.value=="1")};return r.jsx("div",{id:"pg",className:"mc",children:r.jsxs("div",{id:"dt",className:"fechado",children:[r.jsx(Se,{}),r.jsx("div",{id:"msg1",children:"Cadastrar música"}),r.jsxs("form",{onSubmit:de,children:[F?r.jsxs(r.Fragment,{children:[r.jsx("label",{children:"Disponível:"}),r.jsxs("select",{onChange:ve,ref:o.permission,id:"permission",defaultValue:"0",children:[r.jsx("option",{value:"0",children:"Público"}),r.jsx("option",{value:"1",children:"Premium"})]})]}):r.jsx(r.Fragment,{}),r.jsx("label",{children:"Título"}),r.jsx("input",{ref:o.titulo,className:"input",id:"titulo",placeholder:"Insira um título",required:!0}),r.jsx("label",{children:"Música"}),r.jsx("div",{className:"list-music"+(Q?" edit":""),children:h.map((e,t)=>r.jsxs("div",{className:"item-music"+(t==0?" first":""),children:[r.jsx("div",{className:"count-music",children:t+1}),r.jsx("div",{className:"title-music",children:e.titulo}),r.jsx("input",{onChange:()=>{pe(t)},ref:e.input,className:"input-music",type:"file",accept:"audio/*",multiple:!0}),r.jsx("div",{onClick:()=>{he(t)},className:"add-music",children:"+"}),r.jsx("div",{onClick:()=>{ge(t)},className:"remove-music",children:"-"})]},t))}),r.jsx("div",{style:{display:R?"block":"none"},id:"add-list-music",onClick:fe,children:"Adicionar"}),r.jsx("label",{children:"Capa"}),r.jsxs("div",{className:"imagem-div",children:[r.jsx("div",{ref:o.imagem_view,className:"imagem-view",children:r.jsx("img",{className:"col-12 col-md-6",style:{width:U.width,height:U.height},src:U.src})}),r.jsx("input",{className:"file",ref:o.imagem,onChange:e=>J(e,!1),type:"file",accept:"image/jpg, image/jpeg",required:!0}),r.jsx("div",{className:"imagem-pt",children:r.jsx("div",{className:"imagem",onClick:()=>{o.imagem.current.click()},children:r.jsx("div",{className:"txt-1",children:Y})})})]}),le?r.jsxs(r.Fragment,{children:[r.jsx("label",{children:"Capa"}),r.jsxs("div",{className:"imagem-div",children:[r.jsx("div",{ref:o.imagem_view_premium,className:"imagem-view",children:r.jsx("img",{className:"col-12 col-md-6",style:{width:M.width,height:M.height},src:M.src})}),r.jsx("input",{className:"file",ref:o.imagem_premium,onChange:e=>J(e,!0),type:"file",accept:"image/jpg, image/jpeg",required:!0}),r.jsx("div",{className:"imagem-pt",children:r.jsx("div",{className:"imagem",onClick:()=>{o.imagem_premium.current.click()},children:r.jsx("div",{className:"txt-1",children:ne})})})]})]}):r.jsx(r.Fragment,{}),r.jsx("button",{type:"submit",id:"button",children:"Enviar"})]}),r.jsx("div",{id:"uploadd",style:{display:ee?"flex":"none"},children:r.jsx("div",{id:"uploadbd",children:r.jsxs("div",{id:"porcentagem",children:["Enviando:",te,"%"]})})}),r.jsx("div",{id:"m",style:{display:Z?"flex":"none"},children:d.current?"Música alterada com sucesso.":"Música cadastrada com sucesso."}),r.jsx("div",{id:"errorImage",style:{display:ie?"flex":"none"},children:"O tipo da imagem não corresponde a jpg/jpeg. Selecione uma imagem válida."}),r.jsx("div",{id:"errorCadastro",style:{display:ae?"flex":"none"},children:"Adicione um arquivo de audio em todos os campos de música."})]})})}const Ie=i.memo(be);export{Ie as default};