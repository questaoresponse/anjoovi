console.log(window.usuarios_lista);
setTimeout(()=>{
    console.log(window.usuarios_lista,"t");
},1000)
window.location.iniciar=()=>{
window.usuarios_lista.reverse();
window.setStyle={elemento:"#usuarios",color:"gray"};
console.log(window.usuarios_lista);
var t=document.querySelector("#tabela");
for (us of window.usuarios_lista){
    var l=document.createElement("div");
    var nome=document.createElement("div");
    var nome_u=document.createElement("div");
    var ev=document.createElement("div");
    var i=document.createElement("i");
    i.className="bi-trash w-50 h-50";
    nome.className="col-4 border d-flex align-items-center justify-content-center";
    nome_u.className="col-4 border d-flex align-items-center justify-content-center";
    ev.className="col-4 border d-flex align-items-center justify-content-center";
    nome.textContent=us.nome;
    nome_u.textContent=us.usuario;
    l.className="row border line";
    l.appendChild(nome);
    l.appendChild(nome_u);
    ev.appendChild(i);
    l.appendChild(ev);
    t.appendChild(l);
    i.addEventListener("click",()=>{
        document.querySelector("#ediv").style.display="block";
    })
    // l.addEventListener("click",()=>{
    //         $.get("http://www.teste.com/admin/settings", function(data) {
    //         var t = document.createElement('div');
    //         t.innerHTML=data;
    //         var h=document.createElement("head");
    //         var s=document.createElement("style");
    //         s.innerHTML = t.querySelector("style").innerHTML;
    //         var b=document.createElement("body");
    //         h.appendChild(s);
    //         t.appendChild(h);
    //         b.innerHTML=t.querySelector("#page").innerHTML;
    //         document.body.appendChild(t);
    //         $("head").html(h.innerHTML);
    //         $("body").html(b.innerHTML);
    //         window.iniciar();
    //         //   window.iniciar();
    //         });
    // });
};
// var t=document.querySelector("#ecdivt");
// t.innerHTML=t.innerHTML+`"${window.usuario}"`;
};
$a.post("",{type:"info"},(result)=>{
    window.usuarios_lista=result.usuarios;
    window.location.iniciar();
});