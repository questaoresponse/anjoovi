window.location.iniciar=()=>{
s=document.querySelector("#categorias")
window.setStyle={elemento:"#noticias_lista",color:"gray"};
document.querySelector("#usuario").textContent=window.usuario;
console.log(window.select_options);
//var opt=JSON.parse(window.select_options);
var opt=window.select_options;
//var s2=JSON.parse(opt);
for (op of opt){
    var o=document.createElement("option");
    o.textContent=op.nome;
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
async function get_message(){
  return new Promise((resolve,reject)=>{
    window.addEventListener("message",(e)=>{
      resolve(e.data);
    })
  })
}
form.addEventListener("submit",async (e)=>{
    e.preventDefault();
    console.log("enviado")
    var fd=new FormData();
    var categoria=document.querySelector("#categorias").value;
    var destaque=document.querySelector("#destaques").value;
    var titulo=document.querySelector("#titulo").value;
    var subtitulo=document.querySelector("#subtitulo").value;
    var texto=document.querySelector("textarea").value;
    imagem_data=imagem.files.length>0 ? imagem.files[0] : null;
    fd.append("tipo","noticias_cadastro");
    fd.append("usuario",window.name_usuario);
    fd.append("categoria",categoria);
    fd.append("destaque",destaque);
    fd.append("titulo",titulo);
    subtitulo!="" && fd.append("subtitulo", subtitulo);
    texto!="" && fd.append("texto",texto);
    window.edit && fd.append("type","update");
    window.edit && fd.append("id",window.post_edit[0].id);
    fd.append("imagem",imagem_data ? imagem_data : window.post_edit[0].imagem);
    fd.append("_token",window.token);
    $.ajax({
        url: "/admin/24_cadastro",
        type:'POST',
        processData: false, // Não processar dados
        contentType: false, // Não definir o tipo de conteúdo
        data:fd,
        success: function(data) {
        console.log(data);
        data=="true" && sucesso();
        data=="" && window.location.reload();
        //   data!="true" && erro(data);
      }
    });
})
function sucesso(){
    var m=document.createElement("div");
    m.id="m";
    m.textContent=`Notícia ${window.edit ? "alterada" : "cadastrada"} com sucesso.`;
    document.body.appendChild(m);
    setTimeout(()=>{
        m.remove();
    },1500);
    document.querySelector("#categorias").value="";
    document.querySelector("#destaques").value="";
    document.querySelector("#titulo").value="";
    document.querySelector("#subtitulo").value="";
    document.querySelector("textarea").value="";
    document.querySelector("#destaques").querySelector("option").selected=true;
    imagem.value="";
    imagem_view.src="/static/sem-imagem.jpg";
}
window.esmagar=()=>{
  var e=document.querySelector("#dt");
  e.classList.toggle("fechado");
  e.classList.toggle("aberto");
};
if (window.location.pathname=="/admin/noticias_edit"){
  $a.post("",{type:"info"},(result)=>{
    window.edit=true;
    document.querySelector("#imagem").required=false;
    document.querySelector("#msg1").textContent="Editar texto";
    document.querySelector("button").textContent="Alterar";
    document.querySelector("#categorias").value=result.post_edit[0].categoria;
    document.querySelector("#destaques").value=result.post_edit[0].destaque;
    document.querySelector("#titulo").value=result.post_edit[0].titulo;
    document.querySelector("#subtitulo").value=result.post_edit[0].subtitulo;
    document.querySelector("#acessos").textContent=result.post_edit[0].acessos;
    result.post_edit[0].imagem!="n" ? imagem_view.src="/images/"+result.post_edit[0].imagem : null;
    result.post_edit[0].texto!="n" ? document.querySelector("textarea").textContent=result.post_edit[0].texto : null;
  });
}
};
// $.post("",{type:"get"},(result)=>{
//   result=JSON.parse(result);
//   window.post_edit=result.noticias;
// })
window.location.iniciar()