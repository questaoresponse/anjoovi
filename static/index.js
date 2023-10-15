var bt_menu=document.querySelector("#bt-menu");
var c_menu=document.querySelector("#c_menu");
var menu=document.querySelector("#menu");
bt_menu.addEventListener("click",()=>{
    c_menu.classList.toggle("aberto");
    c_menu.classList.toggle("fechado");
})
c_menu.addEventListener("transitionend",()=>{
    c_menu.className=="aberto" ? menu.className="aberto" : null;
})
c_menu.addEventListener("transitionstart",()=>{
    c_menu.className=="fechado" ? menu.className="fechado" : null;
})