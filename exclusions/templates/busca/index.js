var mobile=document.body.offsetWidth<769 ? true : false;
function criar(){
var tabela=document.querySelector("#tabela");
tabela.textContent="";
var ps=window.posts;
var cs=window.canal; 
var redmc=new window.redm();
redmc.set(()=>{
    var es=document.querySelectorAll(".linha");
    es.forEach(e=>{
        var t=e.querySelector(".titulo");
        t.textContent=t.tl;
        redmc.ve(t);
    })
})
// var n=ps.length+cs.length;
var n=window.n_registros;
var rs=document.querySelector("#registros");
var q=n>=0 && n<=1 ? true : false;
var p1=rs.querySelector("#p1");
var p2=rs.querySelector("#p2");
var p3=rs.querySelector("#p3");
p1.textContent=q ? "Foi encontrado " : "Foram encontrados";
p2.textContent=n;
p3.textContent=q ? "registro." : "registros.";
function criar_canal(){
    for (var i2=0;i2<cs.length;i2++){
        if(i2==5) break;
        var c=cs[i2];
        var d=document.createElement("a");
        d.className="ca";
        var ca=document.createElement("div");
        ca.className="canal";
        var l=document.createElement("div");
        l.className="logo";
        c.logo ? adf("/images/"+c.logo,l) : adt(c.usuario[0],l);
        var nm=document.createElement("div");
        nm.className="nome";
        nm.textContent=c.nome;
        var p=document.createElement("div");
        p.className="count";
        p.textContent=c.n_posts+(c.n_posts> 1 ? " postagens." : " postagem.");
        d.addEventListener("click",((c)=>{return function(){window.location.trocar("/@"+c.usuario)}})(c));
        ca.appendChild(l);
        ca.appendChild(nm);
        ca.appendChild(p);
        d.appendChild(ca);
        tabela.appendChild(d);
    }
}
async function criar_tabela(){
    for (var i2=0;i2<ps.length;i2++){
        if(i2==15) break;
        var p=ps[i2];
        var linha=$("<a>",{class:"linha"});
        linha.data("anId",p.id);
        var td=$("<div>",{class:"t"});
        var i=$("<img>",{class:"imagem"});
        var u=$("<div>",{class:"usuario",text:p.nome});
        var t=$("<div>",{class:"titulo",text:p.titulo});
        var pp2=$("<div>",{class:"pp2"});
        var tl=$("<div>",{class:"t_linha"});
        p.imagem!="n" && p.imagem!="" ? i.prop("src","/images/"+p.imagem) : i.prop("src","/static/sem-imagem.jpg");
        t.tl=t.text();
        linha.on("click",()=>{window.location.trocar("/noticia?id="+$(this).data("anId"))});
        // s.textContent=p.subtitulo;
        td.append(i);
        if (mobile){
            pp2.append(u);
            pp2.append(t);
        } else {
            pp2.append(t);
            pp2.append(u);
        }
        td.append(pp2);
        td.append(tl);
        linha.append(td);
        tabela.appendChild(linha[0]);
        redmc.ve(t[0]);
    }
}
function adf(l,p=document.querySelector("#logado")){
        p.textContent="";
        var a=document.createElement("img");
        a.src=l;
        p.appendChild(a);
}
function adt(t,p=document.querySelector("#logado")){
    p.textContent=t;
};
criar_canal();
criar_tabela();
};
function init(){
    $a.post("",{type:"info"},(result)=>{
        if (result.header_erro){
            window.location.trocar("/erro?origin="+window.location.pathname);
        }
        window.posts=result.posts;
        window.canal=result.canal;
        window.n_registros=result.n_registros;
        console.log(result.time);
        criar();
    })
};
init();
!mobile && 
$(".ads-b").css("display","block"), $("#ads-d1 .anunciodiv").append(`
    <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-4004929109745703" data-ad-slot="7693763089" data-ad-format="auto" data-full-width-responsive="true"></ins>
`), 
$("#ads-d2 .anunciodiv").append(`
    <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-4004929109745703" data-ad-slot="7577017868" data-ad-format="auto" data-full-width-responsive="true"></ins>
`);
$("#script").append(`<script src="/templates/pagina_inicial/script.js?v=1"></script>`),
$("#script").append(`<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4004929109745703" crossorigin="anonymous"></script>
`);
window.pages.busca=(url)=>{
    var urlParams = new URLSearchParams(window.location.search);
    urlParams.set('q',url);
    history.replaceState(null, null, '?' + (urlParams.toString()));
    init();
};