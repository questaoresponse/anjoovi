function criar(){
var mobile=document.body.offsetWidth<769 ? true : false;
var redmc=new window.redm();
redmc.set(()=>{
    document.querySelectorAll(".linha").forEach(e=>{
        var t=e.querySelector(".titulo");
        t.textContent=t.tl;
        redmc.ve(t);
    })
})
// var ps=window.posts;
// var ws=window.st;
var t=document.querySelector("#tabela");
var w=document.body.offsetWidth;
//console.log(ps);
var rd=document.querySelector("#rd");
async function redimensionar(src,img){
    return new Promise((r,rj)=>{
    var imagem = document.getElementById('rd');
    imagem.src=src;
    imagem.onload=()=>{
    var canvas = document.getElementById('cv');
    var ctx = canvas.getContext('2d');
    var novaLargura = 1280; // Defina a largura desejada
    var novaAltura = 720;  // Defina a altura desejada
    canvas.width = novaLargura;
    canvas.height = novaAltura;
    ctx.drawImage(imagem, 0, 0, novaLargura, novaAltura);
    var imagemRedimensionada = canvas.toDataURL('image/jpeg');
    img.src = imagemRedimensionada;
    r();
    }
});
}
async function criar_tabela(ps){
// n=0;
var dt=document.createElement("div");
dt.className="line";
t.appendChild(dt);
for (var i=0;i<ps.length;i++){
    // var n2=mobile ? 1 : 4;
    // if (n==n2){
    //     n=0;
    //     dt=document.createElement("div");
    //     dt.className="line";
    //     t.appendChild(dt);
    // }
    // n++;
var p=ps[i];
var tipo=p.imagem ? "posts" : "musicas";
// var d=document.createElement("div");
// d.className="";
var d=document.createElement("div");
d.className="coluna col-12 col-md-3 mb-4"
var l=document.createElement("a");
// l.className="linha a";
var di=document.createElement("div");
di.className="imagemd";
var img=document.createElement("img");
img.className="imagem";
img.src=tipo=="posts" ? p.imagem!="n" && p.imagem!="" ? "/images/"+p.imagem : "/static/sem-imagem.jpg" : "/images/" + p.capa;
var ti=document.createElement("p");
ti.className="titulo";
ti.textContent=p.titulo;
ti.classList.add("card-text")
ti.tl=p.titulo;
var nome=document.createElement("div");
nome.className="nome";
nome.textContent=p.usuario;
di.appendChild(img);
l.appendChild(di);
l.appendChild(nome);
l.appendChild(ti);
l.addEventListener("click",
((p,tipo)=>{ return function(){ var p2=p;window.location.trocar((tipo=="posts" ? "/noticia" : "/musica") + "?id="+p.id); }})(p,tipo));;
d.appendChild(l);
// dt.appendChild(d);
t.appendChild(d);
l.className=" linha a";
// mobile ? t.appendChild(dt) : null;
redmc.ve(ti);
}
}
function criar_circle(cs,ws){
    var ts=document.querySelector("#tabela_circle");
    for (var c of cs){
        var cs=document.createElement("div");
        var img=document.createElement("div");
        cs.className="cs";
        img.className="cs2";
        c.logo ? adf("/images/"+c.logo) : adt(c.usuario[0],img);
        cs.appendChild(img);
        ts.appendChild(cs);
        cs.addEventListener("click",((c)=>{ return function(){
            if (!window.isLogado){window.location.trocar("/admin");return};
            var ps=ws.filter((post)=>post.usuario==c.usuario);
            window.location.trocar('/stories/'+ps[ps.length-1].id+"?origin=/inscricoes");
        }})(c));
        function adf(l){
            var p=img;
            var a=document.createElement("img");
            a.src=l;
            p.appendChild(a);
            mobile ? p.style.left="2.75%" : p.style.left="2.5%";
        }
        function adt(t,p){
            !mobile ? p.style.left="2.5%" : null;
            p.textContent=t;
        };
    };
}
//window.canal.reverse();
// const scrollableDiv = document.querySelector('#tabela_circle');
//     let isDragging = false;
//     let startY;
//     let startScrollTop;
//     scrollableDiv.addEventListener('mousedown', (e) => {
//         console.log("dow");
//       isDragging = true;
//       startY = e.clientY;
//       startScrollTop = scrollableDiv.scrollHeight;
//     });

//     scrollableDiv.addEventListener('mousemove', (e) => {
//       if (!isDragging) return;
//       const deltaY =   e.clientX - startY;
//       scrollableDiv.scrollLeft = scrollableDiv.scrollHeight*8 - ( deltaY*2);
//       console.log(scrollableDiv.scrollLeft)
//     });

//     scrollableDiv.addEventListener('mouseup', () => {
//         console.log("up");
//       isDragging = false;
//     });
criar_circle(window.canal,window.st);
criar_tabela(window.posts);
}
$.post("",{type:"info"},(result)=>{
    result=JSON.parse(result);
    if (result.header_location){
        window.location.trocar(result.header_location);
    }
    window.canal=result.canal;
    window.posts=result.posts;
    window.st=result.st;
    window.usuario=result.usuario;
    console.log(window.posts);
    criar();
});