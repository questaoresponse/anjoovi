s=document.querySelector("#categorias")
window.setStyle={elemento:"#cadastro_24",color:"gray"};
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
    var titulo=document.querySelector("#titulo").value;
    imagem_data=imagem.files.length>0 ? imagem.files[0] : null;
    titulo!="" && fd.append("titulo",titulo);
    fd.append("imagem",imagem_data ? imagem_data : window.post_edit[0].imagem);
    fd.append("_token",window.token);
    fd.append("type","option");
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
    m.textContent=`24 horas cadastrado com sucesso.`;
    document.body.appendChild(m);
    setTimeout(()=>{
        m.remove();
    },1500);
    if (!window.edit){
        document.querySelector("#titulo").value="";
        imagem.value="";
        imagem_view.src="/static/sem-imagem.jpg";
    }
}
window.esmagar=()=>{
  var e=document.querySelector("#dt");
  e.classList.toggle("fechado");
  e.classList.toggle("aberto");
}
// if (window.edit){
//   document.querySelector("#acessos-l").style.display="block";
//   document.querySelector("#acessos").style.display="flex";
//   document.querySelector("#imagem").required=false;
//   document.querySelector("#msg1").textContent="Editar notícia"
//   document.querySelector("button").textContent="Alterar";
//   document.querySelector("#titulo").value=window.post_edit[0].titulo;
//   document.querySelector("#acessos").textContent=window.post_edit[0].acessos;
//   window.post_edit[0].imagem!="n" ? imagem_view.src="/images/"+window.post_edit[0].imagem : null;
// }