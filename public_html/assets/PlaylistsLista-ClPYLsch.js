import{r as o,a as p,u as N,j as s,L as f,e as g,d as y}from"./index-D7_EJXQK.js";import{L}from"./NoticiasLista-CyX5nfcC.js";/* empty css             */function D(){const[b,m]=o.useState([]),d=p(),c=N(),x=()=>{d.post(c.server+"/admin/playlists_lista",{type:"info"}).then(e=>{e.data.result=="true"&&m(e.data.posts)})},n=e=>{const r=e.auth,t=e.globals.server,l=e.location,v=()=>{var j=window.confirm("Deseja remover este registro? O item será excluido permanentemente.");j&&r.post(t+"/admin/playlists_lista"+l.search,{type:"option",id:e.post.id}).then(i=>{i.error?e.globals.redirectError.current(i.error):(i.data.posts=i.data.posts.map(a=>({...a,d:a.d?JSON.parse(a.d).o.split(":").splice(0,2).join(":"):"",privado:a.privado?Number(a.privado):void 0})),e.recriar(i.data))})};return s.jsxs("div",{className:"editard",children:[s.jsx("img",{onClick:v,src:g,className:"excluir"}),s.jsx("div",{className:"excluir-avs",children:"excluir"})]})},u=()=>s.jsxs(s.Fragment,{children:[s.jsx("div",{className:"id",children:"N°"}),s.jsx("div",{className:"titulo",children:"TÍTULO"}),s.jsx("div",{className:"data",children:"DATA"}),s.jsx("div",{className:"opcoes",children:"OPÇÕES"})]}),h=({post:e,n:r,Recriar:t})=>s.jsxs("div",{className:"linha",children:[s.jsx("div",{className:"id",children:r}),s.jsx(y,{className:"titulo txt-1",onClick:l=>{l.preventDefault(),window.open("/playlist/"+e.id)},to:"/playlist/"+e.id,children:e.titulo}),s.jsx("div",{className:"data",children:e.d}),s.jsx("div",{className:"opcoes",children:s.jsx(n,{auth:d,post:e,globals:c,recriar:t,location})})]});return o.useEffect(()=>{x()},[]),s.jsx("div",{id:"pl",className:"cld",children:s.jsx("div",{id:"pg",children:s.jsxs("div",{id:"dt",className:"fechado",children:[s.jsx(L,{}),s.jsx("div",{id:"msg1",children:"Listar playlists"}),s.jsx("div",{id:"top",children:s.jsx(f,{NewHeader:u,opcoes:n,NewTable:h,tituloHref:e=>"/playlist/"+e.id})})]})})})}export{D as default};