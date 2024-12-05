var tipo=window.location.pathname=="/noticia" ? "noticia" : "musica";
var post_id=Number(new URLSearchParams(window.location.search).get("id"));
function iniciarcm(){
var redmc=new window.redm();
redmc.set(()=>{
    $(".ndivt").each((i,e)=>{
        $(e).text(window.comentarios.filter(comentario=>comentario.id==$(e).data("anId")).text);
        redmc.ve(e);
    });
})
var divcd;
var divc;
function criar(){
    if (document.querySelector("#cmdd")) return;
    divcd=$("<div>",{id:"cmdd"});
    divc=$("<div>",{id:"cmd"});
    var n=$(`<div>`,{id:"cmn",text:window.count+(window.count>1 ? " Comentários" : " Comentário")});
    var f=$("<form>",{id:"cmf"});
    var i=$("<input>",{id:"cmi",placeholder:"Adicione um comentário"});
    var b=$("<div>",{id:"cmb"});
    f.append(i);
    divc.append(f);
    divc.append(b);
    divcd.append(n);
    divcd.append(divc);
    $("#pg").append(divcd);
};
criar();
function criar_comentarios(){
    for (var comment of window.comentarios){
        var src=Object.keys(window.logos).filter(logodi=>logodi.usuario==comment.usuario);
        console.log(src);
        var ndivc=$("<div>",{class:"ndivc"});
        ndivc.data("anId",comment.id);
        var ndivl=$("<div>",{class:"ndivl"});
        var ndivtd=$("<div>",{class:"ndivtd"});
        var ndivn=$("<div>",{class:"ndivn",text:comment.usuario});
        var ndivt=$("<div>",{class:"ndivt",text:comment.texto});
        var adt;
        if (src==""){
            ndivl.text(comment.usuario[0]);
        } else {
            adt=$("<img>",{src:"/images/"+logos[src]});
            ndivl.append(adt);
        };
        ndivtd.append(ndivn);
        ndivtd.append(ndivt);
        ndivc.append(ndivl);
        ndivc.append(ndivtd);
        $("#cmb").append(ndivc);
        redmc.ve(ndivt[0]);
    };
    $("#cmb")[0].scrollHeight > $("#cmb")[0].offsetHeight && $("#cmb").css("overflow-y","scroll");
}
$("#cmf").on("submit",(e)=>{
    e.preventDefault();
    var msgv=$("#cmi").val();
    $a.post("/comentarios",{type:"option",operation:"comentar",tipo:tipo,post_id:post_id,texto:msgv},(result)=>{
        console.log(result);
    })
});
criar_comentarios();
}
// window.location.addEventListener("load",()=>{
    $a.post("/comentarios",{type:"option",operation:"get_comentarios",tipo:tipo,post_id:post_id},(result)=>{
        window.comentarios=result.comentarios;
        window.logos=result.logos;
        window.count=result.count;
        iniciarcm();
    })
// });