document.querySelector("form").addEventListener("submit",(e)=>{
e.preventDefault();
var valor=document.querySelector("input").value;
$.ajax({
    url: "/templates/post/config_cadastro.php",
    type:'POST',
    data:{tipo:"config_cadastro",opcao:valor},
    success: function(data) {
        console.log(data);
    }
});
})