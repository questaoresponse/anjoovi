
var form=document.querySelector("form");
var titulo=document.querySelector("#titulo");
var capa=document.querySelector("#capa");
var arquivo=document.querySelector("#arquivo");
var btn=document.querySelector("#button");
var downd=document.querySelector("#downd");
var downp=document.querySelector("#downp");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    var capa_file=capa.files[0];
    var arquivo_file=arquivo.files[0];
    var fd=new FormData();
    fd.append("type","option");
    fd.append("capa",capa_file);
    fd.append("arquivo",arquivo_file);
    fd.append("titulo",titulo.value);
    downd.style.display="block";
    $.ajax({
        url: "/admin/musicas_cadastro",
        type:'POST',
        processData: false, // Não processar dados
        contentType: false, // Não definir o tipo de conteúdo
        data:fd,
        xhr: function() {
          var xhr = new window.XMLHttpRequest();

          // Evento de progresso
          xhr.upload.addEventListener('progress', function(event) {
              if (event.lengthComputable) {
                  var percentual = (event.loaded / event.total) * 100;
                  downp.textContent='Progresso: ' + percentual.toFixed(2) + '%';
              }
          }, false);

          return xhr;
        },
        success: function(data) {
        console.log(data);
        downd.style.display="none";
        //   data!="true" && erro(data);
      }
    });
})