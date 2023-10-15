var s=document.querySelector("#categorias")
document.querySelector("#usuario").textContent=window.usuario;
console.log(window.select_options);
//var opt=JSON.parse(window.select_options);
var opt=window.select_options;
var s2=JSON.parse(opt[0].selects)
console.log(s2);
console.log("ai")
for (op of s2){
    var o=document.createElement("option");
    o.textContent=op;
    s.appendChild(o);
}
var imagem=document.querySelector("#imagem");
var imagem_view=document.querySelector("#imagem-view");
var form=document.querySelector("form");
var imagem_data;
imagem.addEventListener('change', ()=>{
    const file = imagem.files[0];
  
    if (file) {
      const leitor = new FileReader();
  
      leitor.onload = function (e) {
        imagem_view.src = e.target.result;
      };
  
      leitor.readAsDataURL(file);
    } else {
      // O usuário não selecionou um arquivo
      imagem_view.src = ''; // Limpa a imagem
    }
  });
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    var fd=new FormData();
    var categoria=document.querySelector("#categorias").value;
    var destaque=document.querySelector("#destaques").value;
    var titulo=document.querySelector("#titulo").value;
    var subtitulo=document.querySelector("#subtitulo").value;
    imagem_data=imagem.files.length>0 ? imagem.files[0] : null;
    fd.append("tipo","noticias_cadastro");
    fd.append("usuario",window.usuario);
    fd.append("categoria",categoria);
    fd.append("destaque",destaque);
    fd.append("titulo",titulo);
    fd.append("subtitulo",subtitulo);
    imagem_data && fd.append("imagem",imagem_data);
    $.ajax({
        url: "/post/config_cadastro.php",
        type:'POST',
        processData: false, // Não processar dados
        contentType: false, // Não definir o tipo de conteúdo
        data:fd,
        success: function(data) {
            data=="true" && sucesso();
        //   data!="true" && erro(data);
      }
    });
})
function sucesso(){
    var m=document.createElement("div");
    m.id="m";
    m.textContent="Notícia cadastrada com sucesso.";
    document.body.appendChild(m);
    setTimeout(()=>{
        m.remove();
    },1500);
}