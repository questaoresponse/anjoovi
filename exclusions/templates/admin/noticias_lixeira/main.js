window.common.na.pi=()=>{
window.common.na.n=false;
window.common.na.msg1="Deseja restaurar este registro?";
window.common.na.msg2="Deseja remover este registro? Esta ação não pode ser revertida.";
window.common.na.url1="/admin/noticias_lixeira?type=repor";
window.common.na.url2="/admin/noticias_lixeira?type=remove";
window.common.na.src1="/static/voltar-icone.png";
window.common.na.src2="/static/remove-icone.png";
window.setStyle={elemento:"#noticias_lixeira",color:"gray"};
window.common.na.init();
};
// window.location.iniciar=()=>{
// var tabela=document.querySelector("#tabela");
// var tabelah=tabela.querySelector("thead");
// var tabelab=tabela.querySelector("tbody");
// var posts=window.noticias;
// var tabela=document.querySelector("#tabela");
// window.tabela=tabela;
// function criar_head(){
//     var c=document.createElement("tr");
//     var id=document.createElement("td");
//     var titulo=document.createElement("td");
//     var acessos=document.createElement("td");
//     var opcoes=document.createElement("td");
//     id.textContent="ID";
//     titulo.textContent="TITULO";
//     acessos.textContent="ACESSOS";
//     opcoes.textContent="OPÇÕES";
//     id.className="id";
//     titulo.className="titulod";
//     acessos.className="acessosd";
//     opcoes.className="opcoes";
//     c.appendChild(id);
//     c.appendChild(titulo);
//     c.appendChild(acessos);
//     c.appendChild(opcoes);
//     tabelah.appendChild(c);
// }
// criar_head();
// // l.querySelector(".edit").remove();
// // l.querySelector(".excluir").remove();
// // var d=document.createElement("div");
// // d.className="coluna titulo";
// // d.textContent="TÍTULO";
// // l.querySelector(".titulo").parentNode.replaceChild(d,l.querySelector(".titulo"));
// // var o=document.createElement("div");
// // o.textContent="AÇÕES";
// // o.classList.add("coluna");
// // o.classList.add("opcoes");
// // l.appendChild(o);
// function definir_tabela(d){
//     tabelab.textContent="";
//     var posts=d.noticias;
//     var n=d.n_registros;
//     var r=document.querySelector(".registros");
//     r.querySelector(".p1").textContent=n>=0 && n<=1 ? "Foi encontrado " : "Foram encontrados ";
//     r.querySelector(".n").textContent=n;
//     r.querySelector(".p2").textContent=n>=0 && n<=1 ? "registro." : "registros.";
//     var nd=n+1;
//     for (post of posts){
//         nd--;
//         var c=document.createElement("tr");
//         var id=document.createElement("td");
//         var titulod=document.createElement("td");
//         var titulo=document.createElement("div");
//         var acessos=document.createElement("div");
//         var acessosd=document.createElement("td");
//         var opcoes=document.createElement("td");
//         var editard=document.createElement("div");
//         var editarbd=document.createElement("div");
//         var editar=document.createElement("img");
//         var excluir=document.createElement("img");
//         opcoes.className="opcoes";
//         titulo.className="titulo";
//         titulod.className="titulod";
//         editar.className="edit";
//         excluir.className="excluir";
//         acessos.className="acessos";
//         acessosd.className="acessosd";
//         editard.className="editard";
//         editarbd.className="editarbd";
//         editar.src="/static/voltar-icone.png";
//         excluir.src="/static/remove-icone.png";
//         // var c=window.l2.cloneNode(true);
//         // c.className="line";
//         // var id=c.querySelector(".id");
//         // var titulo=c.querySelector(".titulo");
//         // var usuario=c.querySelector(".usuario");
//         // var acessos=c.querySelector(".acessos");
//         // var editar=c.querySelector(".edit");
//         // var excluir=c.querySelector(".excluir");
//         id.textContent=nd;
//         titulo.textContent=post.titulo;
//         titulo.onclick=()=>{
//             window.open("/noticia?id="+post.id);
//         }
//         // usuario.textContent=post.usuario;
//         acessos.textContent=post.acessos;
//         c.appendChild(id);
//         titulod.appendChild(titulo);
//         c.appendChild(titulod);
//         acessosd.appendChild(acessos);
//         c.appendChild(acessosd);
//         editarbd.appendChild(editar);
//         editarbd.appendChild(excluir);
//         editard.appendChild(editarbd)
//         opcoes.appendChild(editard);
//         c.appendChild(opcoes);
//         tabelab.appendChild(c);
//         editar.addEventListener("click",((post)=>{
//         return function(){
//             var r=window.confirm("Deseja restaurar este registro?");
//             if (r){
//             $a.post("/admin/noticias_lixeira?type=repor",{_token:window.token,type:"option",id:post.id,tipo:"noticias_lixeira"},(data)=>{
//                     console.log(data);
//                     definir_tabela(data);
//                     data=="" && window.location.reload();
//             });
//             }
//         }
//         })(post));
//         excluir.addEventListener("click",((post)=>{
//         return function(){
//             var r=window.confirm("Deseja remover este registro? Esta ação não pode ser revertida.");
//             if (r){
//                 $.ajax({
//                     url: "/admin/noticias_lixeira?type=remove",
//                     type:'POST',
//                     data:{_token:window.token,type:"option",id:post.id,tipo:"noticias_lista"},
//                     success: function(data) {
//                         data=JSON.parse(data);
//                         for (e of document.querySelectorAll(".line")){
//                             e.remove();
//                         }
//                         definir_tabela(data);
//                         data=="" && window.location.reload();
//                     }
//                 });
//             }
//         };
//         })(post));
//     }
// }
// definir_tabela(window);
// window.esmagar=()=>{
//     var e=document.querySelector("#dt");
//     e.classList.toggle("fechado");
//     e.classList.toggle("aberto");
// }
// };
// $a.post("",{type:"info"},(result)=>{
//     window.noticias=result.noticias;
//     window.n_registros=result.n_registros;
//    window.location.iniciar();
// })