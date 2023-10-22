document.querySelector("form").addEventListener("submit",(e)=>{
    e.preventDefault();
    var email=document.querySelector("#email").value;
    var password=document.querySelector("#senha").value;
    $.ajax({
        url: "/admin_login/admin_post.php",
        type:'POST',
        data:{email:email,password:password},
        success: function(data) {
            console.log(data);
          data!="true" ? erro(data) : location.reload();
      }
    });
});
window.r && window.r.type!="null" && erro(JSON.stringify(window.r));
function erro(data){
    console.log(data);
    document.querySelector("form").style.height="49%";
    document.querySelector("#email").style.marginTop="1vh";
    document.querySelector("#senha").style.marginTop="1vh";
    document.querySelector("#message").style.display="block";
    var data=JSON.parse(data);
    if (data.type=="message"){
    document.querySelector("p").textContent=data.data>1 ? "Restam "+data.data+" tentativas" : "Resta 1 tentativa";
    }else if (data.type=="time"){
        location.reload();
    }
}