import{r as s,j as e,u as L,f as _,s as E,X as F,L as J,a as M,b as B}from"./index-CTt7U_mL.js";function G({option:o,globals:x,auth:u}){const r={input:s.useRef(null)},i=a=>{a.preventDefault(),u.post(x.server+"/admin/views",{type:"option",value:r.input.current?r.input.current.checked?"true":"false":!1}).then(t=>{t.data.result=="true"&&(r.input.current.checked=!r.input.current.checked)})};return s.useEffect(()=>{u.post(x.server+"/admin/views",{type:"info"}).then(a=>{a.data.result=="true"&&a.data.response=="true"&&r.input.current&&(r.input.current.checked=!0)})},[]),o=="views"?e.jsx("div",{className:"views-div",children:e.jsx("div",{id:"musica-d",children:e.jsxs("div",{className:"btn-d",children:[e.jsx("input",{ref:r.input,className:"i",type:"checkbox",onChange:i}),e.jsx("div",{className:"select"})]})})}):null}const P=s.createContext(void 0),z=({children:o,auth:x,server:u})=>{const[r,i]=s.useState(),a=L(),t=s.useCallback(()=>{x.post(u+"/admin/settings",{type:"info"}).then(j=>{j.error?a.setRedirectError(j.error):i(j.data.config)})},[r]);return s.useEffect(()=>{t()},[]),e.jsx(P.Provider,{value:{config:r,setConfig:i},children:o})},U=()=>{const o=s.useContext(P);if(!o)throw new Error("settingsContext deve ser usado dentro de setingsContext.Provider");return o};function H({option:o,globals:x,auth:u}){const{config:r,setConfig:i}=U(),a=s.useRef(null),t=x.server,j=()=>{const l=new FormData;l.append("type","option"),l.append("logo",a.current.files[0]),u.post(t+"/admin/settings?type=logo",l,{arquivo:!0}).then(m=>{m.error?x.setRedirectError(m.error):i(y=>({...y,logo:m.data.lsrc}))})},R=()=>{a.current.click()};return o=="logo"?e.jsxs("div",{className:"logo-div",children:[r?e.jsx(_,{logo:r.logo||null,usuario:x.login.usuario,width:"20vh"}):null,e.jsx("div",{id:"alterar",onClick:R,children:"Alterar"}),e.jsx("input",{style:{display:"none"},ref:a,onChange:j,type:"file",accept:"image/jpeg, image/jpg"})]}):e.jsx(e.Fragment,{})}function T({option:o,globals:x,auth:u}){const{config:r,setConfig:i}=U(),a=x.server,t=s.useRef(null),j=()=>{var l=new FormData;l.append("type","option"),l.append("banner",t.current.files[0]),u.post(a+"/admin/settings?type=banner",l,{arquivo:!0}).then(m=>{m.error?x.setRedirectError(m.error):i(y=>({...y,banner:m.data.banner}))})},R=()=>{t.current.click()};return o=="banner"?e.jsxs("div",{className:"banner-div",children:[e.jsx("img",{className:"banner-img",src:r&&r.banner?a+"/images/"+encodeURIComponent(r.banner):E}),e.jsx("div",{id:"alterar",onClick:R,children:"Alterar"}),e.jsx("input",{style:{display:"none"},ref:t,onChange:j,type:"file",accept:"image/jpeg, image/jpg"})]}):e.jsx(e.Fragment,{})}function X({option:o,globals:x,auth:u,location:r}){const{server:i,navigate:a}=x,[t,j]=s.useState(!1),[R,l]=s.useState([]),[m,y]=s.useState({geral:{src:null},materia:{src:null},imagem:{src:null},musica:{src:null},texto:{src:null},video:{src:null},playlist:{src:null}}),[C,N]=s.useState(!1),p=s.useRef(null),c={input:s.useRef(null),geral:s.useRef(null),materia:s.useRef(null),imagem:s.useRef(null),musica:s.useRef(null),texto:s.useRef(null),video:s.useRef(null),playlist:s.useRef(null)},d=n=>{var g=n.target.parentNode.parentNode.children[2];if(!n.target.checked){var k=n.target.name;u.post(i+"/admin/destaque",{type:"disable",tipo:k}).then(S=>{y(w=>({...w,[k]:{src:null}}))})}g.classList.toggle("show")},f=n=>{const g=new URLSearchParams(r.search);g.set("search",c.input.current?c.input.current.value:""),g.set("tipo",p.current),a(r.pathname+"?"+g.toString()),n.preventDefault(),v()},h=n=>{const g=p.current;u.post(i+"/admin/destaque",{type:"option",tipo:g,id:n}).then(k=>{k.data.result=="true"&&y(S=>({...S,[g]:k.data.destaque}))}),b()},v=()=>{var n=c.input.current?c.input.current.value:"";u.post(x.server+"/admin/destaque?search="+n,{type:"search",tipo:p.current}).then(g=>{g.data.result=="true"&&l(g.data.noticias)})},I=()=>{u.post(i+"/admin/destaque",{type:"info"}).then(n=>{if(n.data.result=="true"){const D=n.data.destaques;var g=["geral","materia","imagem","musica","texto","video","playlist"];for(var k of g)if(D[k]&&D[k].src){var S=c[k].current;S.checked=!0;var w=S.parentNode.parentNode.children[2];w.classList.contains("show")?w.classList.remove("show"):w.classList.add("show")}n.data.response=="true"&&y(n.data.destaques)}})},A=n=>{const g=new URLSearchParams(r.search);g.set("tipo",n),a(r.pathname+"?"+g.toString()),p.current=n,j(!0),c.input.current.value="",v(),N(n)},b=()=>{const n=new URLSearchParams(r.search);n.delete("search"),n.delete("tipo"),j(!1),p.current=null,a(r.pathname+"?"+n.toString()),c.input.current.value="",N(!1)};s.useEffect(()=>{const n=new URLSearchParams(r.search);n.has("tipo")&&n.has("search")&&(p.current=n.get("tipo"),c.input.current&&(c.input.current.value=n.get("search")||""),j(!0),v()),I()},[]),s.useEffect(()=>{o!="destaque"&&j(!1)},[o]);const O=[{title:"Geral:",name:"geral"},{title:"Matéria:",name:"materia"},{title:"Imagem:",name:"imagem"},{title:"Música:",name:"musica"},{title:"Texto:",name:"texto"},{title:"Vídeo:",name:"video"},{title:"Playlist:",name:"playlist"}],q={p:"noticia",i:"imagem",t:"texto",v:"video",pl:"playlist"},V=n=>{try{return JSON.parse(n)}catch{return!1}};return e.jsxs("div",{style:{display:o=="destaque"?"block":"none"},className:"destaques-div",children:[e.jsx("div",{id:"avs",children:"Obs: caso uma divisão não tenha um destaque selecionado, aparecerá o destaque geral."}),e.jsx("div",{id:"list",children:O.map((n,g)=>{const k=m[n.name].src?V(m[n.name].src):!1;return e.jsxs("div",{className:"list-item",children:[e.jsx("label",{children:n.title}),e.jsxs("div",{className:"btn-d",children:[e.jsx("input",{ref:c[n.name],className:"i",name:n.name,type:"checkbox",onChange:d}),e.jsx("div",{className:"select"})]}),e.jsxs("div",{className:"content",children:[e.jsx("div",{id:"geral-d",children:e.jsx("div",{className:"imagem-view",children:!k||k[1]=="i"?e.jsx("img",{className:"imagem-content",src:m[n.name].src?i+"/images/"+encodeURIComponent(m[n.name].src):E}):k&&k[1]=="v"?e.jsx("video",{className:"imagem-content",src:i+"/videos/"+encodeURIComponent(k[0])}):e.jsx("div",{children:k[0]})})}),e.jsx("div",{className:"select"+(C==n.name?" open":""),onClick:()=>{A(n.name)},children:"selecionar"})]})]},g)})}),e.jsxs("div",{style:{display:t?"block":"none"},id:"pesquisa",children:[e.jsxs("form",{onSubmit:f,id:"div-pesqusia",children:[e.jsx("div",{children:"titulo:"}),e.jsx("input",{ref:c.input,onInput:f})]}),e.jsx(F,{onClick:b,className:"x"}),e.jsx("div",{id:"conteudo",children:R.map((n,g)=>e.jsxs("div",{onClick:()=>{h(n.id)},className:"result",children:[e.jsx("p",{className:"title-post txt",children:n.titulo}),e.jsx(J,{onClick:k=>{k.preventDefault(),window.open("/"+q[n.tipo]+"/"+n.id_post,"__blank")},to:"/"+q[n.tipo]+"/"+n.id_post,children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",className:"external",viewBox:"0 0 16 16",children:[e.jsx("path",{"fill-rule":"evenodd",d:"M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"}),e.jsx("path",{"fill-rule":"evenodd",d:"M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"})]})})]},g))})]})]})}function K({option:o,globals:x,auth:u}){const{server:r}=x,[i,a]=s.useState({previousDescription:"",currentDescription:""}),t={description:s.useRef(null)},j=m=>{a(y=>({...y,currentDescription:m.target.value}))},R=()=>{u.post(r+"/admin/description",{type:"info"}).then(m=>{a({previousDescription:"",currentDescription:""}),t.description.current.value=m.data.description})};s.useEffect(()=>{R()},[]);const l=()=>{const m=t.description.current.value;i.previousDescription!=i.currentDescription&&i.currentDescription!=""&&(a({previousDescription:m,currentDescription:m}),u.post(r+"/admin/description",{type:"update",description:m}))};return e.jsxs("div",{style:{display:o=="descricao"?"block":"none"},className:"description-div",children:[e.jsx("textarea",{id:"text",ref:t.description,onChange:j}),i.previousDescription!=i.currentDescription&&i.currentDescription!=""?e.jsx("div",{id:"save",onClick:l,children:"Salvar"}):e.jsx("div",{id:"save",className:"loading",onClick:l,children:"Salvar"})]})}function Q({option:o,globals:x,auth:u}){const{server:r}=x,[i,a]=s.useState([{linkRef:s.createRef(),titleRef:s.createRef()}]),t=s.useRef([{title:"",link:""}]),[j,R]=s.useState(!1),l=s.useRef(""),m=()=>{u.post(r+"/admin/card",{type:"info"}).then(p=>{const c=JSON.parse(p.data.card);a(()=>(t.current=[],Array.from({length:c.links.length+1},(d,f)=>(t.current.push(f<c.links.length?{title:c.titles[c.links[f]],link:c.links[f]}:{title:"",link:""}),{linkRef:s.createRef(),titleRef:s.createRef()})))),l.current=c.links.map(d=>c.titles[d]+d).join("")})};s.useEffect(()=>{m()},[]);const y=()=>{const p=t.current.map(({title:f,link:h})=>f+h).join(""),c={},d=t.current.map(f=>{const{title:h,link:v}=f;return h!=""&&N(v)&&(c[v]=h),v}).filter(f=>f!="");l.current!=p&&(l.current!=""||p!="")&&(R(!1),l.current=p,u.post(r+"/admin/card",{type:"update",titles:JSON.stringify(c),links:JSON.stringify(d)}))},C=()=>{var p=!0;const c={};for(var d=0;d<t.current.length;d++){const{title:f,link:h}=t.current[d];if(h in c){p=!1;break}else if(c[h]=!0,d<t.current.length-1&&(f==""||!N(h))){p=!1;break}}return p},N=p=>{try{const c=new URL(p);return c.protocol="https:"}catch{return!1}};return s.useEffect(()=>{var p=!0;const c={};for(var d=0;d<t.current.length;d++){const{title:f,link:h}=t.current[d];if(h in c){p=!1;break}else if(c[h]=!0,d<t.current.length-1&&(f==""||!N(h))||d==t.current.length-1&&(f==""&&N(h)||f!=""&&!N(h))){p=!1;break}}if(p){const f=t.current.map(({title:h,link:v})=>h+v).join("");R(l.current!=f)}else R(!1)},[i]),e.jsxs("div",{style:{display:o=="card"?"block":"none"},className:"card-div",children:[i.map(({linkRef:p,titleRef:c},d)=>e.jsxs("div",{children:[e.jsxs("label",{className:"card-input-label",children:["Link ",d+1]}),e.jsx("input",{value:t.current[d].title,ref:c,className:"card-input",onInput:f=>{const h=f.target.value;if(t.current[d].title=h,d>0&&!C()&&t.current[t.current.length-1].title+t.current[t.current.length-1].link==""){const v=[...i];t.current.pop(),v.pop(),a(v)}else i.length<15&&C()&&t.current[t.current.length-1].title!=""&&N(t.current[t.current.length-1].link)?(t.current.push({title:"",link:""}),a(v=>[...v.concat([{linkRef:s.createRef(),titleRef:s.createRef()}])])):a(v=>[...v])}}),e.jsx("input",{value:t.current[d].link,ref:p,className:"card-input",onInput:f=>{const h=f.target.value;if(t.current[d].link=h,d>0&&!C()&&t.current[t.current.length-1].title+t.current[t.current.length-1].link==""){const v=[...i];t.current.pop(),v.pop(),a(v)}else i.length<15&&C()&&t.current[t.current.length-1].title!=""&&N(t.current[t.current.length-1].link)?(t.current.push({title:"",link:""}),a(v=>[...v.concat([{linkRef:s.createRef(),titleRef:s.createRef()}])])):a(v=>[...v])}})]})),j?e.jsx("div",{id:"save",onClick:y,children:"Salvar"}):e.jsx("div",{id:"save",className:"loading",children:"Salvar"})]})}function Y(){const o=L(),{navigate:x}=o,u=M(),[r,i]=s.useState(null),a=B(),[t,j]=s.useState(!1);s.useEffect(()=>{const l=new URLSearchParams(a.search);l.has("option")?i(l.get("option")):(l.set("option","logo"),i("logo")),o.setSelected("settings")},[]),s.useEffect(()=>{if(r){const l=new URLSearchParams(a.search);(l.has("option")?l.get("option"):"logo")!=r&&(j("true"),l.set("option",r),x(a.pathname+(r=="logo"?"":"?"+l.toString())))}},[r]),s.useEffect(()=>{if(t&&t=="false"){const l=new URLSearchParams(a.search);i(l.get("option")||"logo")}else t&&t=="true"&&j("false")},[a.search]);const R=s.useRef({logo:"selected1",banner:"selected2",destaque:"selected3",views:"selected4",descricao:"selected5",card:"selected6"});return e.jsx("div",{className:"config",children:e.jsx("div",{id:"pg",children:e.jsxs("div",{className:"margin",children:[e.jsxs("div",{id:"tipod",children:[e.jsx("div",{id:"tipobd",style:{display:r?"block":"none"},className:R.current[r]||""}),e.jsxs("div",{id:"tipot",children:[e.jsx("div",{onClick:()=>i("logo"),className:"tipo t1",children:"Logo"}),e.jsx("div",{onClick:()=>{i("banner")},className:"tipo t2",children:"Banner"}),e.jsx("div",{onClick:()=>i("destaque"),className:"tipo t3",children:"Destaque"}),e.jsx("div",{onClick:()=>i("views"),className:"tipo t4",children:"Views"}),e.jsx("div",{onClick:()=>i("descricao"),className:"tipo t5",children:"Descrição"}),e.jsx("div",{onClick:()=>i("card"),className:"tipo t6",children:"Card"})]})]}),e.jsx("div",{children:e.jsxs(z,{auth:u,server:o.server,children:[e.jsx(H,{option:r,globals:o,auth:u}),e.jsx(T,{option:r,globals:o,auth:u}),e.jsx(X,{option:r,globals:o,auth:u,location:a}),e.jsx(G,{option:r,globals:o,auth:u}),e.jsx(K,{option:r,globals:o,auth:u}),e.jsx(Q,{option:r,globals:o,auth:u})]})})]})})})}export{Y as default};