var mobile=document.body.offsetWidth < 769 ? true : false;
var ln=$("#login");
var ls=$("#logado");
var bt_menu=$("#bt-menu");
var me=$("#menu-a");
var c_menu=$("#c_menu");
var pl=$("#pl");
var p=$("#pesquisa");
var fp=$("#fp");
var voltar_btn=$("#voltar");
var logo=$("#logo");
function index(){
    var x="/static/x.png";
    var l="/static/lupa.png";
    fp.on("submit",(e)=>{
        e.preventDefault();
        var i=encodeURIComponent(p.val());
        window.location.pathname=="/busca" ? window.pages.busca(i.replace(/%20/g,"+")) : window.location.trocar("/busca?q="+i.replace(/%20/g,"+"));
    });
    p.on("input",()=>{
        p.val()!="" ? pl.attr("src",x) : pl.attr("src",l);
    })
    pl.on("click",()=>{
        new URL(pl.attr("src")).pathname=="/static/x.png" ? (()=>{ p.val(""); pl.attr("src",l)})() : null;
    })
    function adf(l){
        ls.text("");
        var a=$("<img>",{src:l});
        ls.append(a);
    }
    function adt(t){
        ls.text(t);
    };
    var nnmobile;
    // mobile ? v() : pesquisa.style.display="block";
    v();
    async function v(){
        if (!window.isLogado){
            ln.css("display","flex");
            ls.css("display","none");
        } else{
            window.mlogo.logo ? adf("/images/"+window.mlogo.logo) : adt(window.usuario[0]);
            ln.css("display","none");
            ls.css("display","flex");
            ls.attr("class","logado");
        }
        if (mobile){
            p.css("display","none");
            p.val("");
            pl.css("left","50vw");
            pl.attr("src",l);
        } else {
            voltar_btn.css("display","none");
            bt_menu.css("display","block");
            p.css("display","block");
            pl.css("left","calc(63vw - 30px)");
        }
    }
    pl.on("click",()=>{
        if (!mobile) return;
        p.css("display","block");
        voltar_btn.css("display","flex");
        bt_menu.css("display","none");
        logo.css("display","none");
        pl.css("left","calc(100vw - 60px)");
        !window.isLogado ? ln.css("display","none") : ls.css("display","none");
    })
    voltar_btn.on("click",()=>{
        if (!mobile) return;
        p.css("display","none");
        p.val("");
        voltar_btn.css("display","none");
        bt_menu.css("display","block");
        logo.css("display","block");
        pl.css("left","50vw");
        pl.attr("src",l);
        !window.isLogado ? ln.css("display","flex") :  ls.css("display","flex");
    });
    window.concluido ? window.concluido : null;
    window.addEventListener("resize",()=>{
        var nmobile=document.body.offsetWidth < 769 ? true : false;
        if (nmobile!=mobile){
            mobile=nmobile;
            v();
        }
    });
};
function inicio(){
bt_menu.on("click",()=>{
    c_menu.toggleClass("aberto");
    c_menu.toggleClass("fechado");
    // c_menu.className="aberto";
    me.toggleClass("menu-aberto");
    me.toggleClass("menu-fechado");
    mobile && pl.toggleClass("d-block") && pl.toggleClass("d-none");
})

document.addEventListener("click",(e)=>{
    if (c_menu.lentgh>0 && !c_menu[0].contains(e.target) && !e.target.id=="bt-menu" && !bt_menu[0].contains(e.target)) {
        if  (c_menu.attr("class")=="aberto"){
            c_menu.attr("class","fechado");
            me.removeClass("menu-aberto");
            me.addClass("menu-fechado");
            mobile && pl.toggleClass("d-block") && pl.toggleClass("d-none");
        };
    }
})
c_menu[0].querySelectorAll("a").forEach(e=>{
    $(e).on("click",()=>{
        c_menu.attr("class","fechado");
        me.toggleClass("menu-aberto");
        me.toggleClass("menu-fechado");
        pl.hasClass("d-none") && pl.toggleClass("d-block") && pl.toggleClass("d-none");
        //window.esmagar && document.body.offsetWidth>769 ? window.esmagar() : null;
    });
});
};
async function get(){ 
    return new Promise((resolve,reject)=>{ 
        $a.post("/inicio_header",{type:"info"},(result)=>{
            window.mlogo=result.logo;
            window.isLogado=result.usuario;
            window.usuario=result.usuario;
            resolve();
            index();
            inicio();
        });
     });
};
get();
$("#load").attr("src","/static/x.png");