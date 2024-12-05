var t=document.createElement("div");
if (window.cargo=="admin"){
    $.get("/templates/admin/admin_inicio/admin.html", function(data) {
        t.innerHTML=data;
        cc();
    });
} else{
    $.get("/templates/admin/admin_inicio/main.html", function(data) {
        t.innerHTML=data;
        cc();
    });
}
var n=0;
function cc(){
n++;
if (n>1) return;
var c=document.createElement("div");
c.id="cb";
c.innerHTML=t.querySelector("#cabecario #cb").innerHTML;
c.className="d-block";
var s=document.createElement("link");
s.type="text/css";
s.rel="stylesheet";
s.href=t.querySelector("#style link").href;
document.querySelector("#style").appendChild(s);
var sc=document.createElement("script");
sc.src=t.querySelector("#script script").src;
// c.appendChild(sc);
document.querySelector("#page").appendChild(c);
document.querySelector("#script").appendChild(sc);
console.log(c.querySelector("#script"));
sc.onload=()=>{
    console.log("carregou");
    window.location.header_iniciar();
};
document.querySelectorAll("a").forEach(a=>{
a.addEventListener("click",(e)=>{
    e.preventDefault();
    console.log(a.href);
    window.location.trocar(a.href);
});
});
};