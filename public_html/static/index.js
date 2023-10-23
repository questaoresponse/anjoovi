var bt_menu=document.querySelector("#bt-menu");
var c_menu=document.querySelector("#c_menu");
bt_menu.addEventListener("click",()=>{
    var me=document.querySelector("#menu-a");
    c_menu.classList.toggle("aberto");
    c_menu.classList.toggle("fechado");
    me.classList.toggle("menu-aberto");
    me.classList.toggle("menu-fechado");
})
document.addEventListener("click",(e)=>{
    if (document.querySelector("#c_menu").contains(e.target) || e.target.id=="bt-menu") {
    } else {
        console.log(e.target.id);
       if  (document.querySelector("#c_menu").className=="aberto"){
            var me=document.querySelector("#menu-a");
            document.querySelector("#c_menu").classList.remove("aberto");
            document.querySelector("#c_menu").classList.add("fechado");
            me.classList.remove("menu-aberto");
            me.classList.add("menu-fechado");
        };
    }
})