var bt_menu=document.querySelector("#bt-menu");
var c_menu=document.querySelector("#c_menu");
bt_menu.addEventListener("click",()=>{
    c_menu.classList.toggle("aberto");
    c_menu.classList.toggle("fechado");
    //window.esmagar && document.body.offsetWidth>769 ? window.esmagar() : null;
})
var bt_noticia=document.querySelector("#bt-noticias");
var noticia=document.querySelector("#noticias");
bt_noticia.addEventListener("click",()=>{
    noticia.classList.toggle("fechado-noticia");
    noticia.classList.toggle("aberto-noticia");
    var v=document.querySelector("#bt-noticias .v");
    v.classList.toggle("aberto");
    v.classList.toggle("fechado");
})
$a.post("/admin_header",{type:"info"},(result)=>{
    document.querySelector("[name='nome_usuario']").textContent=result.usuario;
});
window.setStyle ? (()=>{document.querySelector(window.setStyle.elemento).style.background=window.setStyle.color})() : null;
// window.setStyle={
//     get elemento(){
//         return _elemento;
//     },
//     set elemento(v){
//         _elemento=v;
//         console.log("elemento",v);
//     },
//     get color(){
//         return _color;
//     },
//     set color(v){
//         _color=v;
//         document.querySelector(window.setStyle.elemento).style.background=v;
//     }
// }
Object.defineProperty(window, 'setStyle', {
    get: function () {
      return this._minhaPropriedade; // getter
    },
    set: function (valor) {
      this._minhaPropriedade = valor;
      for (var e of c_menu.querySelectorAll(".i-menu")){e.style.background="white"};
      for (var e of c_menu.querySelectorAll(".i-menu2")){e.style.background="white"};
      document.querySelector(valor.elemento).style.background=valor.color;
    }
});
// window.location.header_iniciar();
c_menu.querySelectorAll("a").forEach(e=>{
    e.addEventListener("click",(ev)=>{
        for (var e of c_menu.querySelectorAll(".i-menu")){e.style.background="white"};
        for (var e of c_menu.querySelectorAll(".i-menu2")){e.style.background="white"};
        ev.target.parentNode.style.background="gray";
        c_menu.classList.toggle("aberto");
        c_menu.classList.toggle("fechado");
        //window.esmagar && document.body.offsetWidth>769 ? window.esmagar() : null;
    });
});