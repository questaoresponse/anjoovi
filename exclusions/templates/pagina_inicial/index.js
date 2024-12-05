var mobile=document.body.offsetWidth<769 ? true : false;
var redmc=new window.redm();
redmc.set(()=>{
    $(".linha").each((i,e)=>{
        var t=$(e.querySelector(".titulo"));
        t.text(window.pages.pi.posts.filter(post=>post.id==$(this).data("anId"))[0].titulo);
        redmc.ve(t[0]);
    })
});
// var ps=window.posts;
// var ws=window.st;
var t=$("#tabela");
var w=document.body.offsetWidth;
//console.log(ps);
async function criar_tabela(ps){
// n=0;
t.text("");
for (var i=0;i<ps.length;i++){
    function ads(){
//         <ins class="adsbygoogle"
// style="display:block"
// data-ad-client="ca-pub-4004929109745703"
// data-ad-slot="3046364070"
// data-ad-format="auto"
// data-full-width-responsive="true"></ins>
        $(t).append(`
        <div class="anunciodiv">
            <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-4004929109745703" data-ad-slot="3046364070" data-ad-format="auto" data-full-width-responsive="true"></ins> 
        </div>
        `);
    }
    var p=ps[i];
    i==24 && ads();
    var tipo=p.imagem ? "posts" : "musicas";
    // var n2=mobile ? 1 : 4;
    // if (n==n2){
    //     n=0;
    //     dt=document.createElement("div");
    //     dt.className="line";
    //     t.appendChild(dt);
    // }
    // n++;
// var d=document.createElement("div");
// d.className="";
var d=$("<div>",{class:"coluna col-12 col-md-3 mb-4"});
var l=$("<a>",{class:"linha a"});
// l.className="linha a";
var di=$("<div>",{class:"imagemd"});
var img=$("<img>",{class:"imagem"});
img.attr("src",tipo=="posts" ? p.imagem!="n" && p.imagem!="" ? "/images/"+p.imagem : "/static/sem-imagem.jpg" : "/images/" + p.capa);
var ti=$("<p>",{class:"titulo card-text",text:p.titulo});
var nome=$("<div>",{class:"nome",text:p.usuario});
nome.data("anUser",p.usuario);
nome.on("click",function(){
    window.location.trocar("/@"+$(this).data("anUser"));
})
di.append(img);
di.on("click",function(){window.location.trocar(($(this).parent().data("anTipo")=="posts" ? "/noticia" : "/musica") + "?id="+$(this).parent().data("anId")); });
l.append(di);
l.append(nome);
l.append(ti);
l.data("anId",p.id);
l.data("anTipo",tipo);
ti.on("click",function(){window.location.trocar(($(this).parent().data("anTipo")=="posts" ? "/noticia" : "/musica") + "?id="+$(this).parent().data("anId")); });
d.append(l);
// dt.appendChild(d);
t.append(d);
// mobile ? t.appendChild(dt) : null;
redmc.ve(ti[0]);
}
$("#script").append(`<script src="/templates/pagina_inicial/script.js?v=1"></script>`);
$("#script").append(`<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4004929109745703" crossorigin="anonymous"></script>
`);
}
function criar_circle(csc,ws){
    var ts=$("#tabela_circle");
    for (var c of csc){
        var cs=$("<div>",{class:"cs"});
        var img=$("<div>",{class:"cs2"});
        c.logo ? adf("/images/"+c.logo) : adt(c.usuario[0],img);
        cs.append(img);
        ts.append(cs);
        cs.data("anUser",c.usuario);
        cs.on("click",function(){
            if (!window.isLogado){window.location.trocar("/admin");return};
            var ps=ws.filter(post=>post.usuario==$(this).data("anUser"));
            window.location.trocar('/stories/'+ps[ps.length-1].id+"?origin=/");
        });
        function adf(l){
            img.append($("<img>",{src:l}));
            // mobile ? p.style.left="2.75%" : p.style.left="2.5%";
        }
        function adt(t,p){
            // !mobile ? p.style.left="2.5%" : null;
            p.text(t);
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

// window.addEventListener("load",()=>{
//     var s=document.createElement("script");
//     s.src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4004929109745703";
//     s.async=true;
//     s.crossOrigin="anonymous";
//     document.head.appendChild(s);
// })
async function init_pa(){
    // await window.main.piv();
    function m(){
        criar_circle(window.pages.pi.canal,window.pages.pi.st);
        criar_tabela(window.pages.pi.posts);
    }
    if (!window.location.init_loaded){
        window.location.addEventListener("init_load",m);
    } else {
        m();
    }
};
init_pa();