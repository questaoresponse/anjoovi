var bt_noticia=document.querySelector("#bt-noticias");
var noticia=document.querySelector("#noticias");
bt_noticia.addEventListener("click",()=>{
    noticia.classList.toggle("fechado-noticia");
    noticia.classList.toggle("aberto-noticia");
})
var menu2=document.querySelector("#n2-menu");
noticia.addEventListener("transitionend",()=>{
    noticia.classList.contains("aberto-noticia") ? menu2.className="aberto" : null;
})
noticia.addEventListener("transitionstart",()=>{
    noticia.classList.contains("fechado-noticia") ? menu2.className="fechado" : null;
})
window.usuario ? document.querySelector("#nome_usuario").textContent=window.usuario : null;