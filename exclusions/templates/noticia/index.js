function get_date_s(d){
    const data = new Date(d); // Data e hora atuais
    data.setHours(data.getHours()-3);
    const dia = data.getDate();
    const mes = data.getMonth() + 1; // Os meses em JavaScript são base 0 (janeiro é 0, fevereiro é 1, etc.)
    const ano = data.getFullYear();
    const hora = data.getHours();
    var minuto=data.getMinutes();
    minuto=minuto<10 ? "0"+minuto  : minuto;
    return `${dia}/${mes}/${ano} às ${hora}h${minuto}`;
}
function criar(){
var post=window.post[0];
var dj=JSON.parse(post.d);
var d=dj["o"];
var data=get_date_s(d);
$("#titulo").text(post.titulo);
post.subtitulo!="n" && $("#subtitulo").text(post.subtitulo);
if ("a" in dj){
    var df=$("#data_a");
    df.text(" Atualizada às "+get_date_s(dj["a"]));
}
$("#data").text(data);
$("#usuario-t").text(post.usuario);
$("#usuario-t").on("click",()=>{window.location.trocar("/@"+post.usuario)});
var texto=$("#texto");
post.texto!="n" && post.texto!="" && texto.text(post.texto) && texto.css("margin-bottom","2%");
var imagem=$("img");
post.imagem!="n" && post.imagem!="" && (()=>{imagem.css("display","block");imagem.attr("src","/images/"+imagem)})();
};
$a.post("",{type:"info"},(result)=>{
    window.post=result.post;
    window.isLogado=result.usuario;
    window.usuario=result.usuario;
    criar();
});