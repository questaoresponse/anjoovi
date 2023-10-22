var bt_menu=document.querySelector("#bt-menu");
var c_menu=document.querySelector("#c_menu");
bt_menu.addEventListener("click",()=>{
    c_menu.classList.toggle("aberto");
    c_menu.classList.toggle("fechado");
    window.esmagar ? window.esmagar() : null;
})
var bt_noticia=document.querySelector("#bt-noticias");
var noticia=document.querySelector("#noticias");
bt_noticia.addEventListener("click",()=>{
    noticia.classList.toggle("fechado-noticia");
    noticia.classList.toggle("aberto-noticia");
    console.log("v");
    var v=document.querySelector("#bt-noticias .v");
    v.classList.toggle("aberto");
    v.classList.toggle("fechado");
})
window.usuario ? document.querySelector("[name='nome_usuario']").textContent=window.usuario : null;
window.setStyle ? document.querySelector(window.setStyle.elemento).style.background=window.setStyle.color : null;