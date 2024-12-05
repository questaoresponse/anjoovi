window.location.iniciar=()=>{
var lo1="";
var lo2="";
var l1="";
var l2="";
if (window.config){
    lo2=window.config.banner ? "/images/"+window.config.banner : "";
    lo1=window.config.logo ? "/images/"+window.config.logo : "";
    var l1=lo1;
    var l2=lo2;
    window.config.banner ? document.querySelector("#banner").src="/images/"+window.config.banner:null;
    window.config.logo ? adf("/images/"+window.config.logo) : adt(window.usuario[0]);
} else {
    adt(window.usuario[0]);
}
function me(elemento,c){
        elemento.style.color= c ? "black" : "gray";
}
function ms(){
    var s1=document.querySelector("#oat1");
    var s2=document.querySelector("#oat2");
    
}
function adf(l){
        var p=document.querySelector("#pl");
        p.textContent="";
        var a=document.createElement("img");
        a.src=l;
        p.appendChild(a);
        l1=l;
        me(document.querySelector("#ap1"),lo1!=l1);
}
function adt(t){
    var p=document.querySelector("#pl");
    p.textContent=t;
    document.querySelector("#i1").value="";
    l1="";
    me(document.querySelector("#ap1"),lo1!=l1);
};
function tc(a,c1,c2){
    a.classList.remove(c1);a.classList.add(c2);
}
window.setStyle={elemento:"#settings",color:"gray"};
// var p=document.querySelector("#pl");
// var logo=p;
// p.textContent=window.usuario[0];
var b1=document.querySelector("#spd1");
var b2=document.querySelector("#spd2");
var p1=document.querySelector("#p1");
var p2=document.querySelector("#p2");
b1.addEventListener("click",()=>{
    tc(b1,"f","a");
    tc(b2,"a","f");
    p1.style.display="block";
    p2.style.display="none";
})
b2.addEventListener("click",()=>{
    tc(b1,"a","f");
    tc(b2,"f","a");
    p1.style.display="none";
    p2.style.display="block";
})
function ae(e){
    var a=event.target.parentNode.parentNode.querySelector(".i");
    a.click();
    //var a=event.target;
    //document.querySelector("#m").style.display="block";
}
// document.querySelector("#m #x").addEventListener("click",()=>{document.querySelector("#m").style.display="none"});
var al=document.querySelectorAll(".oa");
al.forEach(a=>{ a.addEventListener("click",ae)})
var oa1=document.querySelector("#oa1");
var oa2=document.querySelector("#oa2");
var or1=document.querySelector("#or1");
var or2=document.querySelector("#or2");
var fl1=document.querySelector("#p1 .i");
var fl2=document.querySelector("#p2 .i");
or1.addEventListener("click",or);
or2.addEventListener("click",or);
// function asl(l){
//     logo.textContent="n";logo.src=l;
// }
// function rsl(){
//     logo.src="";logo.textContent=window.usuario[0];
// }
function rb(){
    document.querySelector("#i2").value="";
    banner.src='/static/sem-imagem.jpg';
    l2="";
    me(document.querySelector("#ap2"),lo2!=l2);
}
function or(e){
    e.target.id=="or1" ? adt(window.usuario[0]) : rb();
}
fl1.addEventListener("change",()=>{
    const file = fl1.files[0];

    if (file) {
        const leitor = new FileReader();

        leitor.onload = function (e) {
        adf(e.target.result);
        };

        leitor.readAsDataURL(file);
    } else {
        // O usuário não selecionou um arquivo
        adt(window.usuario[0]);
    }
})
function ba(e){
    l2=e;
    if (lo2!=l2){
        document.querySelector("#ap2").style.color="black";
    } else {
        document.querySelector("#ap2").style.color="gray";
    };
}
fl2.addEventListener("change",()=>{
    const file = fl2.files[0];

    if (file) {
        const leitor = new FileReader();

        leitor.onload = function (e) {
        banner.src = e.target.result;
        };
        ba(banner.src);
        leitor.readAsDataURL(file);
    } else {
        // O usuário não selecionou um arquivo
        rb();
    }
})
document.querySelector("#ap1").addEventListener("click",()=>{
    if (document.querySelector("#ap1").style.color=="black"){
        var fd=new FormData();
        fl1.files
        l1!="" && fl1.files.length>0 && fd.append("logo",fl1.files[0]);
        fd.append("_token",window.token);
        fd.append("type","option");
        $.ajax({
            url: "/admin/settings?type=logo",
            type:'POST',
            processData: false, // Não processar dados
            contentType: false, // Não definir o tipo de conteúdo
            data:fd,
            success: function(data) {
                data=="true" && b();
                data=="" && window.location.reload();
        }
        });
    };
    function b(){
        me(document.querySelector("#ap1"),false);
        l1=lo1;
    }
})
document.querySelector("#ap2").addEventListener("click",()=>{
    if (document.querySelector("#ap2").style.color=="black"){
        var fd=new FormData();
        l2!="" && fl2.files.length>0 && fd.append("banner",fl2.files[0]);
        fd.append("_token",window.token);
        fd.append("type","option");
        $.ajax({
            url: "/admin/settings?type=banner",
            type:'POST',
            processData: false, // Não processar dados
            contentType: false, // Não definir o tipo de conteúdo
            data:fd,
            success: function(data) {
                data=="true" && b();
                data=="" && window.location.reload();
        }
        });
    };
    function b(){
        me(document.querySelector("#ap1"),false);
        l1=lo1;
    }
})
// document.querySelector("#spd1").addEventListener("hover",()=>{
//     tc(b1,"f","a");
//     tc(b2,"a","f");
// })
// document.querySelector("#spd1").addEventListener("mouseleave",()=>{
//     tc(b1,"a","f");
//     tc(b2,"f","a");
// })
}
$a.post("",{type:"info"},(result)=>{
    window.usuario=result.usuario;
    window.config=result.config;
    window.location.iniciar();
})