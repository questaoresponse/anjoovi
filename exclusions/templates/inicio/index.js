var p=$("#pesquisa");
var pl=document.querySelector("#pl");
var fp=document.querySelector("#fp");
var voltar=$("#voltar");
var logo=document.querySelector("#logo");
var pl=document.querySelector("#pl");
var mobile=document.body.offsetWidth < 769 ? true : false;
var x="/static/x.png";
var l="/static/lupa.png"
// document.querySelector("#")
fp.addEventListener("submit",(e)=>{
    e.preventDefault();
    var i=encodeURIComponent(p.val());
    // var b=encodeURIComponent(JSON.stringify([]));
    // var f={};
    // f.cf=document.querySelector("#cf");
    // f.cf=f.cf.classList.includes("selected");
    // f.pf=document.querySelector("#pf");
    // f.pf=f.pf.classList.includes("selected");
    // window.location.trocar("/busca/?q="+i.replace(/%20/g,"+")+`&c=${f.cf}&p=${f.pf}`);
    window.location.trocar("/busca/?q="+i.replace(/%20/g,"+"));
});
p.addEventListener("input",()=>{
    if (p.value!=""){
        pl.querySelector("img").src=x;
    } else {
        pl.querySelector("img").src=l;
    }
})
pl.addEventListener("click",()=>{
    var url=new URL(pl.querySelector("img").src);
    console.log(url.pathname);
    url.pathname=="/static/x.png" ? (()=>{ p.value=""; pl.querySelector("img").src=l})() : null;
})
function adf(l){
        var p=document.querySelector("#logado");
        p.textContent="";
        var a=document.createElement("img");
        a.src=l;
        p.appendChild(a);
}
function adt(t){
    var p=document.querySelector("#logado");
    p.textContent=t;
};
pesquisa=document.querySelector("#pesquisa");
var nnmobile;
// mobile ? v() : pesquisa.style.display="block";
v();
function v(){
    console.log(window.mlogo);
    if (!window.isLogado){
        document.querySelector("#login").style.display="flex";
        document.querySelector("#logado").style.display="none";
    } else{
        window.mlogo.logo ? adf("/images/"+window.mlogo.logo) : adt(window.usuario[0]);
        document.querySelector("#login").style.display="none";
        document.querySelector("#logado").style.display="flex";
        document.querySelector("#logado").className="logado";
    }
    if (mobile){
        pesquisa.style.display="none";
    } else {
        voltar.css("display","none");
        bt_menu.style.display="block";
        pesquisa.style.display="block";
        pl.style.left="calc(32rem - 30px)";
    }
}
pl.addEventListener("click",()=>{
    if (!mobile) return;
    pesquisa.style.display="block";
    voltar.css("display","flex");
    bt_menu.style.display="none";
    logo.style.display="none";
    pl.style.left="calc(100vw - 45px)";
    if (!window.isLogado){
        document.querySelector("#login").style.display="none";
    } else {
        document.querySelector("#logado").style.display="none";
    }
})
voltar.on("click",()=>{
    if (!mobile) return;
    pesquisa.style.display="none";
    pesquisa.value="";
    voltar.css("display","none");
    logo.style.display="block";
    pl.style.left="55vw";
    pl.querySelector("img").src=l;
    if (!window.isLogado){
        document.querySelector("#login").style.display="flex";
    } else {
        document.querySelector("#logado").style.display="flex";
    }
});
window.concluido ? window.concluido() : null;
window.addEventListener("resize",()=>{
    var nmobile=document.body.offsetWidth < 769 ? true : false;
    if (nmobile!=mobile){
        // if (mobile){
        //     v();
        // }
        mobile=nmobile;
        v();
    }
});
$("#load").attr("src","/static/x.png");
// var filter=document.querySelector("#filter");
// var fd=document.querySelector("#filter_menu")
// filter.addEventListener("click",()=>{
//     fd.classList.toggle("aberto");
//     fd.classList.toggle("fechado");
// })
// var filters = document.querySelectorAll(".fs");
// filters.forEach(f=>{
//     f.addEventListener("click",()=>{
//         f.classList.toggle("selected");
//         f.classList.toggle("no-selected");
//     });
// });