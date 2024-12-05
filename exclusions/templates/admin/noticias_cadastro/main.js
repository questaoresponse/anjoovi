class init{
constructor(){
  this.variables();
  this.get();
}
variables(){
  this.imagem=document.querySelector("#imagem");;
  this.imagem_view=document.querySelector("#imagem-view");
  this.form=document.querySelector("form");
  this.edit;
  this.post_edit;
}
iniciar(){
var imagem=this.imagem;
var imagem_view=this.imagem_view;
var form=this.form;
// s=document.querySelector("#categorias")
window.setStyle={elemento:"#noticias_cadastro",color:"gray"};
//document.querySelector("#usuario").textContent=window.usuario;
console.log(window.select_options);
//var opt=JSON.parse(window.select_options);
var opt=window.select_options;
//var s2=JSON.parse(opt);
// for (op of opt){
//     var o=document.createElement("option");
//     o.textContent=op.nome;
//     s.appendChild(o);
// }
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
var edit=this.edit;
var post_edit=this.post_edit;
form.addEventListener("submit",async (e)=>{
    e.preventDefault();
    console.log("enviado")
    var fd=new FormData();
    var titulo=document.querySelector("#titulo").value;
    var subtitulo=document.querySelector("#subtitulo").value;
    var texto=document.querySelector("textarea").value;
    imagem_data=imagem.files.length>0 ? imagem.files[0] : null;
    fd.append("tipo","noticias_cadastro");
    fd.append("usuario",window.name_usuario);
    fd.append("categoria",null);
    fd.append("destaque",null);
    fd.append("titulo",titulo);
    subtitulo!="" && fd.append("subtitulo", subtitulo);
    texto!="" && fd.append("texto",texto);
    edit && fd.append("type","update");
    edit && fd.append("id",post_edit[0].id);
    fd.append("imagem",imagem_data ? imagem_data : post_edit[0].imagem);
    imagem_data && fd.append("imagem_edit",true);
    fd.append("_token",window.token);
    $.ajax({
        url: "/admin/noticias_cadastro?type="+(edit ? "edit" : "cadastro"),
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
    m.textContent=`Notícia ${edit ? "alterada" : "cadastrada"} com sucesso.`;
    document.body.appendChild(m);
    setTimeout(()=>{
        m.remove();
    },1500);
    if (edit){
        document.querySelector("#titulo").value="";
        document.querySelector("#subtitulo").value="";
        document.querySelector("textarea").value="";
        imagem.value="";
        imagem_view.src="/static/sem-imagem.jpg";
    }
}
window.esmagar=()=>{
  var e=document.querySelector("#dt");
  e.classList.toggle("fechado");
  e.classList.toggle("aberto");
}
}
get(){
if (window.location.pathname=="/admin/noticias_edit"){
  $a.post("",{type:"info"},(result)=>{
    this.edit=true;
    this.post_edit=result.post_edit;
    document.querySelector("#acessos-l").style.display="block";
    document.querySelector("#acessos").style.display="flex";
    document.querySelector("#imagem").required=false;
    document.querySelector("#msg1").textContent="Editar texto"
    document.querySelector("button").textContent="Alterar";
    document.querySelector("#titulo").value=result.post_edit[0].titulo;
    document.querySelector("#subtitulo").value=result.post_edit[0].subtitulo;
    document.querySelector("#acessos").textContent=result.post_edit[0].acessos;
    result.post_edit[0].imagem!="n" ? this.imagem_view.src="/images/"+result.post_edit[0].imagem : null;
    result.post_edit[0].texto!="n" ? document.querySelector("textarea").textContent=result.post_edit[0].texto : null;
    this.iniciar();
  });
} else {
  this.iniciar();
}
};
};
var initr=new init();