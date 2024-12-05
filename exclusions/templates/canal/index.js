var type_init="textos";
function gtv(){
    return window.location.pathname.split("/");
}
function vps(p,n1,n2){
    return p+(p>1 ? n1 : n2);
}
var type_view=gtv().lentgh==3 ? gtv()[2] : null;
type_view && (type_view=="textos" || type_view=="musicas") ? type_init=type_view : null;
console.log(type_view);
function criar(){
var dl1=$("#dl1")[0];
var dl2=$("#dl2")[0];
var banner=$("#banner");
var logo1=$(dl1.querySelector(".logo_c"));
var logo2=$(dl2.querySelector(".logo_c"));
var num1=$(dl1.querySelector(".num"));
var num2=$(dl2.querySelector(".num"));
var c_usuario1=$(dl1.querySelector(".c_usuario"));
var c_usuario2=$(dl2.querySelector(".c_usuario"));
var c_nome1=$(dl1.querySelector(".c_nome"));
var c_nome2=$(dl2.querySelector(".c_nome"));
var n_inscritos1=$(dl1.querySelector(".n_inscritos"));
var n_inscritos2=$(dl2.querySelector(".n_inscritos"));
var t1=$(".tipo.t1");
var t2=$(".tipo.t2");
var t1p=$("#tipobd");
var mobile=document.body.offsetWidth<769 ? true : false;
console.log(window.n);
num1.text(vps(window.n," postagens"," postagem"));
num2.text(vps(window.n," postagens"," postagem"));

window.info.logo ? adf("/images/"+window.info.logo) : adt(window.canal.name[0]);
banner.attr("src",(window.info.banner ? "/images/"+window.info.banner : "/static/sem-imagem.jpg"));
c_nome1.text(window.info.nome);
c_nome2.text(window.info.nome);
c_usuario1.text("@"+window.info.usuario);
c_usuario2.text("@"+window.info.usuario);
n_inscritos1.text(vps(window.info.n_inscritos," inscritos"," inscrito"));
n_inscritos2.text(vps(window.info.n_inscritos," inscritos"," inscrito"));
var redmc=new window.redm();
redmc.set(()=>{
    $(".linha").each((i,e)=>{
        var t=$(e.querySelector(".titulo"));
        var buscar=$(e).data("anTipo")=="post" ? window.posts : window.musicas;
        t.text(buscar.filter(post=>post.id==$(this).data("anId"))[0].titulo);
        redmc.ve(t[0]);
    })
});
//banner.src=window.canal.banner && window.canal.banner!="n" ? window.canal.banner : "/static/sem-imagem.jpg";
function criar_tabela(ps,tipo){
var t=$("#tabela");
t.text("");
n=0;
    for (var i=0;i<ps.length;i++){
        // var n2=mobile ? 1 : 4;
        // if (n==n2){
        //     n=0;
        //     dt=document.createElement("div");
        //     dt.className="line";
        //     t.appendChild(dt);
        // }
        n++;
    var p=ps[i];
    var tipo=p.imagem ? "posts" : "musicas";
    // var d=document.createElement("div");
    // d.className="";
    var d=$("<div>",{class:"coluna col-12 col-md-3 mb-4 d-inline-block"});
    var l=$("<a>",{class:"linha a"});
    // l.className="linha a";
    var di=$("<div>",{class:"imagemd"});
    var img=$("<img>",{class:"imagem"});
    img.attr("src",tipo=="posts" ? p.imagem!="n" && p.imagem!="" ? "/images/"+p.imagem : "/static/sem-imagem.jpg" : "/images/" + p.capa);
    var ti=$("<div>",{class:"titulo",text:p.titulo});
    var nome=$("<div>",{class:"nome",text:p.usuario});
    di.append(img);
    l.append(di);
    l.append(nome);
    l.append(ti);
    l.data("anId",p.id);
    l.data("anTipo",tipo);
    di.on("click",function(){window.location.trocar(($(this).parent().data("anTipo")=="posts" ? "/noticia" : "/musica") + "?id="+$(this).parent().data("anId"))});
    ti.on("click",function(){window.location.trocar(($(this).parent().data("anTipo")=="posts" ? "/noticia" : "/musica") + "?id="+$(this).parent().data("anId"))});
    d.append(l);
    t.append(d);
    redmc.ve(ti[0]);
}
};
function adf(l){
        logo1.text("");
        var a=$("<img>",{src:l});
        logo1.append(a);
        logo2.text("");
        a=$("<img>",{src:l});
        logo2.append(a);
}
function adt(t){
    logo1.text(t);
    logo2.text(t);
};
$(".inscrever").each((i,is)=>{
    if (window.inscrito){
        $(is).text("inscrito");
    }
    is.addEventListener("click",()=>{
        if (!window.isLogado){window.location.trocar("/admin");return};
        $.ajax({
            url: "/canal?name="+window.info.usuario,
            type:'POST',
            data:{tipo:"subs"},
            success: function(data) {
                console.log(data);
                ss(data);
        }
        });
    });
});
function ss(n){
    window.inscrito=window.inscrito ? false : true;
    $(".inscrever").each((i,is)=>{
     $(is).text(window.inscrito ? "inscrito" : "inscrever");
    })
    n_inscritos1.text(vps(n," inscritos"," inscrito"));
    n_inscritos2.text(vps(n," inscritos"," inscrito"));
}
t1.on("click",()=>{
    window.history.pushState('',{},"/"+gtv()[1]+"/textos");
    t1p.attr("class","selected1");
    criar_tabela(window.posts,"posts");
});
t2.on("click",()=>{
    window.history.pushState('',{},"/"+gtv()[1]+"/musicas");
    t1p.attr("class","selected2");
    criar_tabela(window.musicas,"musicas");
});
t1p.attr("class",type_init=="textos" ? "selected1" : "selected2");
t1p.css("display","block");
criar_tabela(window[type_init=="textos" ? "posts" : "musicas"],type_init);
};
$a.post("",{type:"info"},(result)=>{
    window.canal={};
    window.canal.name=result.name;
    window.posts=result.posts;
    window.musicas=result.musicas;
    window.n=result.n;
    window.info=result.info;
    window.inscrito=result.inscrito;
    window.isLogado=result.usuario;
    window.usuario=result.usuario;
    criar();
});