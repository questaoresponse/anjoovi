window.common.na.pi=()=>{
    window.common.na.n=true;
    window.common.na.msg2="Deseja remover este registro? O item será enviado à lixeira.";
    window.common.na.src1="/static/edit-icone.png";
    window.common.na.src2="/static/remove-icone.png";
    window.common.na.url2="/admin/noticias_lista?type=remove";
    window.setStyle={elemento:"#noticias_lista",color:"gray"};
    console.log("opa");
    window.common.na.init();
};
// window.location.iniciar=()=>{
// // console.log(num);
// window.setStyle={elemento:"#noticias_lista",color:"gray"};
// var tabela=document.querySelector("#tabela");
// var tabelah=tabela.querySelector("thead");
// var tabelab=tabela.querySelector("tbody");
// function definir_tabela(d){
//     tabelab.textContent="";
//     var posts=d.noticias;
//     var num=d.n_registros;
//     var nd=Number(num)+1;
//     function criar_b(){
//         var nb=num<=10 ? 0 : num/10!=Math.floor(num/10) ? Math.floor(num/10+1) : num/10;
//         var params=new URLSearchParams(window.location.search);
//         var pa=0;
//         if (params.has("pg")){
//             pa=Number(params.get("pg"))-1;
//         }
//         var bv=document.createElement("div");
//         var bi=document.createElement("div");
//         bv.className="btnb";
//         bi.className="btnb";
//         bv.textContent=pa;
//         bi.textContent=pa+2;
//         if (pa==0){
//             bv.style.background="gray";
//             bv.textContent="1";
//         } else {
//             bv.onclick=()=>{window.location.trocar("/admin/noticias_lista?pg="+pa)};
//         }
//         if (pa+2>nb){
//             bi.style.background="gray";
//         } else {
//             bi.onclick=()=>{window.location.trocar("/admin/noticias_lista?pg="+(pa+2))};
//         }
//         var di=document.querySelector("#btndiv");
//         di.appendChild(bv);
//         di.appendChild(bi);
//         //var b-document.createElement("b")
//     }
//     criar_b();
//     posts[0].usuario && tabela.classList.add("a");
//     function create(cs){
//         var c=document.createElement("div");c.className=cs;return c;
//     }
//     var r=create("registros");
//     var p1=document.createElement("p");
//     p1.className="p1";
//     var n=document.createElement("p");
//     n.className="n";
//     var p2=document.createElement("p");
//     p2.className="p2";
//     p1.innerHTML=num>=0 && num<=1 ? "Foi encontrado &nbsp;" : "Foram encontrados &nbsp;";
//     n.textContent=num;
//     p2.innerHTML=num>=0 && num<=1 ? "&nbsp; registro." : "&nbsp; registros.";
//     r.appendChild(p1);
//     r.appendChild(n);
//     r.appendChild(p2);
//     tabela.appendChild(r);
//     //tabela.appendChild(th);
//     var a=posts[0].usuario ? true : false;
//     function criar_c(){
//         var c=document.createElement("tr");
//         var id=document.createElement("td");
//         var titulo=document.createElement("td");
//         var acessos=document.createElement("td");
//         var opcoes=document.createElement("td");
//         titulo.className="titulo";
//         acessos.className="acessosd";
//         opcoes.className="opcoes";
//         id.textContent="N°";
//         titulo.textContent="TITULO";
//         acessos.textContent="ACESSOS";
//         opcoes.textContent="OPÇÕES";
//         c.appendChild(id);
//         c.appendChild(titulo);
//         c.appendChild(acessos);
//         c.appendChild(opcoes);
//         // if (posts[0].usuario){
//         // var cb={id:"ID","titulo":"TÍTULO",categoria:"CATEGORIA",usuario:"USUÁRIO",acessos:"ACESSOS",opcoes:"OPÇÕES"};
//         // } else {
//         //     var cb={id:"ID","titulo":"TÍTULO",acessos:"ACESSOS",opcoes:"OPÇÕES"};
//         // }
//         // var l=create("line row w-100");
//         // for (var c in cb){
//         //     var e=document.createElement("div");
//         //     e.className="coluna "+c+(posts[0].usuario ? " col-2" : " col-4"); 
//         //     c=="id" ? e.className="coluna id col-1" : null;
//         //     c=="acessos" ? e.className=="coluna acessos col-1" : null;
//         //     c=="opcoes" ? e.className="coluna opcoes"+(posts[0].usuario ? " col-3" : " col-3") : null;
//         //     e.textContent=cb[c];
//         //     e.style.paddingLeft="1%";
//         //     e.style.fontWeight="900";
//         //     e.style.borderTop="solid 1px black";
//         //     e.style.justifyContent="normal";
//         //     l.appendChild(e);
//         // }
//         tabelah.appendChild(c);
//     }
//     criar_c();
//     for (post of posts){
//         nd--;
//         // var c=create("line row w-100");
//         var c=document.createElement("tr");
//         var id=document.createElement("td");
//         var titulo=document.createElement("td");
//         var categoria=document.createElement("td");
//         var div_categoria=document.createElement("td");
//         var usuario=document.createElement("td");
//         var acessosd=document.createElement("td");
//         var acessos=document.createElement("div");
//         var opcoes=document.createElement("td");
//         var acessos=document.createElement("td");
//         titulo.className="titulo";
//         // var id=create("coluna id col-1");
//         // var titulo=create("coluna titulo col-2");
//         // var categoria=document.createElement("span");
//         // var div_categoria=create("coluna div-categoria col-2");
//         // var usuario=create("coluna usuario col-2");
//         // var acessos=create("coluna acessos col-2");
//         // var opcoes=create("coluna opcoes col-3");
//         // if (!post.usuario){
//         //     console.log("falso");
//         //     titulo=create("coluna titulo col-4");
//         //     acessos=create("coluna acessos col-4");
//         //     opcoes=create("coluna opcoes col-3");
//         // }
//         var editar;
//         var excluir;
//         if (!post.opcoes){
//         var editar=document.createElement("img");
//         editar.className="edit";
//         editar.src="/static/edit-icone.png";
//         var excluir=document.createElement("img");
//         excluir.className="excluir";
//         excluir.src="/static/remove-icone.png";
//         } else {
//             opcoes.textContent=post.opcoes;
//         }
//         id.textContent=nd;
//         titulo.textContent=post.titulo;
//         titulo.addEventListener("click",((post)=>{ return function(){ window.open("/noticia?id="+post.id)} })(post));
//         window.usuario ? categoria.textContent=post.categoria : null;
//         window.usuario ? usuario.textContent=post.usuario : null;
//         acessos.textContent=post.acessos;
//         div_categoria.appendChild(categoria);
//         // if (!post.opcoes){
//         //     opcoes.appendChild(editar);
//         //     opcoes.appendChild(excluir);
//         // };
//         c.appendChild(id);
//         c.appendChild(titulo);
//         // post.usuario && c.appendChild(div_categoria);
//         // post.usuario && c.appendChild(usuario);
//         acessosd.appendChild(acessos);
//         c.appendChild(acessosd);
//         c.appendChild(opcoes);
//         tabelab.appendChild(c);
//         if (!post.opcoes){
//         editar.addEventListener("click",((post)=>{ return function(){ window.location.trocar("/admin/noticias_edit?id="+post.id)}})(post));
//         excluir.addEventListener("click",((post)=>{
//         return function(){
//             var r=window.confirm("Deseja remover este registro? O item será enviado à lixeira.");
//             if (r){
//                 $.ajax({
//                     url: "/admin/noticias_lista?type=remove",
//                     type:'POST',
//                     data:{_token:window.token,type:"option",id:post.id,tipo:"noticias_lista"},
//                     success: function(data) {
//                         data=JSON.parse(data);
//                         // data.reverse();
//                         console.log(data);
//                         tabela.textContent="";
//                         definir_tabela(data);
//                         data=="" && window.location.trocar("/admin/noticias_lista");
//                     }
//                 });
//             }
//         }
//         })(post));
//         };
//     }
// }
// window.esmagar=()=>{
//     var e=document.querySelector("#dt");
//     e.classList.toggle("fechado");
//     e.classList.toggle("aberto");
// }
// definir_tabela(window);
// };
// $.post("",{type:"info"},(result)=>{
//     console.log(result);
//     result=JSON.parse(result);
//     if (result.header_location){
//         window.location.trocar(result.header_location);
//     }
//     window.noticias=result.noticias;
//     window.n_registros=result.n_registros;
//     window.location.iniciar();
// })