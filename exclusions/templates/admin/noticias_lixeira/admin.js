window.location.iniciar=()=>{
var posts=window.noticias;
window.setStyle={elemento:"#noticias_lixeira",color:"gray"};
var tabela=document.querySelector("#tabela");
var l=document.querySelector(".linha");
var l2=l.cloneNode(true);
window.l=l;
window.l2=l2;
window.tabela=tabela;
l.querySelector(".edit").remove();
l.querySelector(".excluir").remove();
var d=document.createElement("div");
d.className="coluna titulo";
d.textContent="TÍTULO";
l.querySelector(".titulo").parentNode.replaceChild(d,l.querySelector(".titulo"));
var o=document.createElement("div");
o.textContent="AÇÕES";
o.classList.add("coluna");
o.classList.add("opcoes");
l.appendChild(o);
function definir_tabela(posts,l){
    var r=tabela.querySelector(".registros");
    r.querySelector(".p1").textContent=posts.length>=0 && posts.length<=1 ? "Foi encontrado " : "Foram encontrados ";
    r.querySelector(".n").textContent=posts.length;
    r.querySelector(".p2").textContent=posts.length>=0 && posts.length<=1 ? "registro." : "registros.";
    for (post of posts){
        var c=window.l2.cloneNode(true);
        c.className="line";
        var id=c.querySelector(".id");
        var titulo=c.querySelector(".titulo");
        var categoria=c.querySelector(".div-categoria span");
        var usuario=c.querySelector(".usuario");
        var acessos=c.querySelector(".acessos");
        var editar=c.querySelector(".edit");
        var excluir=c.querySelector(".excluir");
        id.textContent=post.id;
        titulo.textContent=post.titulo;
        titulo.onclick=()=>{
            window.open("/noticia?id="+post.id);
        }
        categoria.textContent=post.categoria;
        usuario.textContent=post.usuario;
        acessos.textContent=post.acessos;
        tabela.appendChild(c);
        editar.addEventListener("click",((post)=>{
        return function(){
            var r=window.confirm("Deseja restaurar este registro?");
            if (r){
            $.ajax({
                url: "/admin/noticias_lixeira?type=repor",
                type:'POST',
                data:{_token:window.token,type:"option",id:post.id,tipo:"noticias_lixeira"},
                success: function(data) {
                    data=JSON.parse(data);
                    for (e of document.querySelectorAll(".line")){
                        e.remove();
                    }
                    definir_tabela(data,l);
                    data=="" && window.location.reload();
                }
            });
            }
        };
        })(post))
        excluir.addEventListener("click",((post)=>{
        return function(){
        var r=window.confirm("Deseja remover este registro? Esta ação não pode ser revertida.");
        if (r){
            $.ajax({
                url: "/admin/noticias_lixeira?type=remove",
                type:'POST',
                data:{_token:window.token,type:"option",id:post.id,tipo:"noticias_lista"},
                success: function(data) {
                    data=JSON.parse(data);
                    data.reverse();
                    for (e of document.querySelectorAll(".line")){
                        e.remove();
                    }
                    definir_tabela(data,l);
                    data=="" && window.location.reload();
                }
            })
        }
        }    
        })(post));
    }
}
definir_tabela(posts,l);
window.esmagar=()=>{
    var e=document.querySelector("#dt");
    e.classList.toggle("fechado");
    e.classList.toggle("aberto");
}
};
$a.post("",{type:"info"},(result)=>{
    window.noticias=result.noticias;
    window.n_registros=result.n_registros;
    window.location.iniciar();
})