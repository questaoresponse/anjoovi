import{r as i,u as H,a as J,c as V,b as W,s as L,j as e}from"./index-Cn1i8Q6v.js";import{F as G,t as _,P as z,f as K}from"./Publicar-C7sj-oSs.js";/* empty css             */function Z(){const m=i.useRef(!1),p=i.useRef(),f=H(),{server:j,cargo:w}=f,R=J(),y=V(),a={permission:i.useRef(null),titulo:i.useRef(null),subtitulo:i.useRef(null),textarea:i.useRef(null),imagem:i.useRef(null),original_format:i.useRef(null),imagem_view:i.useRef(null),image_element:i.useRef(null)},g=W(),[A,I]=i.useState("Upload"),[E,S]=i.useState(!1),[P,F]=i.useState(!1),[b,k]=i.useState(((w.current.cargo||0)&4)==4),h=i.useRef(new G),B=()=>{F(!0);const r=setTimeout(()=>{F(!1),clearTimeout(r)},2e3)},[T,U]=i.useState({src:L,width:"100%",height:"100%"}),v=r=>{if(typeof r=="string"){const t=new Image;t.onload=()=>{const o=a.imagem_view.current.offsetWidth,c=a.imagem_view.current.offsetHeight;var l=t.width,s=t.height;o/l*s>c?(l=c/s*l,s=c):(s=o/l*s,l=o),U({src:r,width:l,height:s})},t.src=r}else U({src:L,width:window.innerWidth,height:window.innerHeight/1280*720})},D=r=>{const t=r.target.files[0];if(t){const o=new FileReader;o.onloadend=()=>{const c=o.result instanceof ArrayBuffer?o.result:new ArrayBuffer(0),l=new Uint8Array(c),s={jpeg:[255,216,255],png:[137,80,78,71,13,10,26,10],gif:[71,73,70]};let n=null;for(const[u,d]of Object.entries(s))if(d.every((M,$)=>M===l[$])){n=u;break}if(n&&n=="jpeg"){I(t.name);const u=new FileReader;u.onloadend=()=>{v(u.result)},u.readAsDataURL(t)}else v(null),r.target.value="",B()},o.readAsArrayBuffer(t)}};m.current=g.pathname=="/admin/noticias_edit";const C=r=>{k((r&4)==4)},N=()=>{b&&(a.permission.current.value=p.current.privado?"1":"0")};i.useEffect(()=>(f.setSelected("publicar"),m.current&&R.post(j+"/admin/noticias_edit"+g.search,{type:"info"}).then(r=>{if("post_edit"in r.data){a.imagem.current.required=!1;const t=r.data.post_edit[0];a.titulo.current.value=t.titulo,a.subtitulo.current.value=t.subtitulo,a.textarea.current.value=t.texto,t.privado=t.privado!=0,p.current=t,N(),v(j+"/images/"+encodeURIComponent(t.imagem))}}),(async()=>{const r="https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";await h.current.load({coreURL:await _(`${r}/ffmpeg-core.js`,"text/javascript"),wasmURL:await _(`${r}/ffmpeg-core.wasm`,"application/wasm"),workerURL:await _(`${r}/ffmpeg-core.worker.js`,"text/javascript")})})(),w.current.addListener(C),()=>{w.current.removeListener(C)}),[]),i.useEffect(()=>{p.current&&N()},[b]);const O=async r=>{r.preventDefault();var t=new FormData,o=a.titulo.current.value,c=a.subtitulo.current.value,l=JSON.parse(a.original_format.current.value),s=a.imagem.current.files.length>0?a.imagem.current.files[0]:null;if(t.append("type","option"),m.current&&t.append("id",p.current.id.toString()),s&&t.append("imagem",s),s&&t.append("imagens_edit","true"),a.permission.current&&t.append("permission",a.permission.current.value),t.append("usuario",f.login.usuario),t.append("titulo",o),c!=""&&t.append("subtitulo",c),l&&t.append("original_format",l.toString()),s){const n=s.name.split(".").slice(-1)[0];await h.current.writeFile("input."+n,await K(s)),await h.current.exec(["-i","input."+n,"-vf","boxblur=30","output."+n]);const u=new Uint8Array(await h.current.readFile("output."+n)),d=new Blob([u],{type:"image/"+n}),x=new File([d],"image."+n,{type:"image/"+n});t.append("dImagem",x)}R.post(j+"/admin/noticias_cadastro?type="+(m.current?"edit":"cadastro"),t,{arquivo:!0}).then(n=>{if(n.error)f.setRedirectError(n.error);else if(n.data.result=="true"){if(m.current){const d=new URLSearchParams(g.search);if(d.has("origin"))y(decodeURIComponent(d.get("origin")));else{const x=g.pathname.split("_");y(x[0]+"_lista")}m.current=!1,p.current=void 0}S(!0);var u=setTimeout(()=>{S(!1),clearInterval(u)},2e3);a.titulo.current.value="",a.subtitulo.current.value="",a.textarea.current.value="",a.imagem.current.value="",a.original_format.current.value="true",I("Upload"),v(null)}})},q=()=>{const r=["rd","of"],t=JSON.parse(a.original_format.current.value);a.image_element.current.classList.replace(r[+!t],r[+t])};return e.jsxs("div",{id:"pg",className:"nc",children:[e.jsxs("div",{id:"dt",className:"fechado",children:[e.jsx(z,{}),e.jsx("div",{id:"msg1",children:"Cadastrar matéria"}),e.jsxs("form",{onSubmit:O,children:[b?e.jsxs(e.Fragment,{children:[e.jsx("label",{children:"Disponível:"}),e.jsxs("select",{ref:a.permission,id:"permission",defaultValue:"0",children:[e.jsx("option",{value:"0",children:"Público"}),e.jsx("option",{value:"1",children:"Premium"})]})]}):e.jsx(e.Fragment,{}),e.jsx("label",{children:"Título"}),e.jsx("input",{ref:a.titulo,className:"input",id:"titulo",placeholder:"Insira um título",required:!0}),e.jsx("label",{children:"Subtítulo"}),e.jsx("input",{ref:a.subtitulo,className:"input",id:"subtitulo",placeholder:"Insira um subtítulo"}),e.jsx("label",{children:"Texto"}),e.jsx("textarea",{ref:a.textarea}),e.jsx("label",{children:"Capa"}),e.jsxs("div",{id:"imagem-div",children:[e.jsx("div",{ref:a.imagem_view,id:"imagem-view",className:"col-12 col-md-6",children:e.jsx("img",{ref:a.image_element,className:"of",src:T.src})}),e.jsx("input",{className:"file",ref:a.imagem,onChange:D,type:"file",accept:"image/jpg, image/jpeg",required:!0}),e.jsxs("div",{id:"imagem-pt",children:[e.jsx("div",{id:"imagem",onClick:()=>{a.imagem.current.click()},children:e.jsx("div",{className:"txt-1",children:A})}),e.jsxs("select",{defaultValue:"true",onChange:q,ref:a.original_format,id:"original_format",children:[e.jsx("option",{value:"true",children:"Formato original"}),e.jsx("option",{value:"false",children:"Redimensionar"})]})]})]}),e.jsx("button",{type:"submit",id:"button",children:"Enviar"})]})]}),e.jsx("div",{id:"m",style:{display:E?"flex":"none"},children:m.current?"Matéria alterada com sucesso.":"Matéria cadastrada com sucesso."}),e.jsx("div",{id:"errorImage",style:{display:P?"flex":"none"},children:"O tipo da imagem não corresponde a jpg/jpeg. Selecione uma imagem válida."})]})}export{Z as default};