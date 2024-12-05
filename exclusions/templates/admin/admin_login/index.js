function display(e,s){
  e.css("display",s);
}
function mclass(e,s){
  e.attr("class",s);
}
function src(e,s){
  e.attr("src",s);
}
var mobile=document.body.offsetWidth<769 ? true : false;
function add(s,r1,r2){
    function t(n){
      s.append($("<option>",{text:n}));
    }
    for (var i=0;i<r2;i++){
        t(r1-i);
    }
}
var full_year=new Date().getFullYear();
var t1=$("#month");
add(t1,12,12);
var t2=$("#day");
add(t2,30,30);
var t3=$("#year");
add(t3,full_year-18,100-17);
var tipo="cadastro";
var inputs=$("#cadastro")[0].querySelectorAll('input');
function trocar_tipo(){
    tipo=tipo=="cadastro" ? "login" : "cadastro"; 
    var c=$("#cd");
    var l=$("#login");
    var p=tipo=="cadastro" ? true : false;
    display(c,p ? "block" : "none");
    display(l,p ? "none" : "block");
}
var c=$("#cadastro");
var d=$("#data");
var bt=$("#cadastro .c");
var cd=$("#cadastro");
var cc=$("#data");
function ir(){
    display(cd,"none");
    display(cc,"block");
}
function voltar(){
    display(cd,"block");
    display(cc,"none");
}
var btd;
$(".t").each((i,t)=>{ $(t).on("click",trocar_tipo) });
$("#cadastro").on("submit",(e)=>{
    e.preventDefault();ir();
});
$("#login").on("submit",(e)=>{
    e.preventDefault();
    login();
});
$("#data").on("submit",(e)=>{
    e.preventDefault();(valid_form("#cadastro") ? cadastro() : null);
})
$("#cadastro")[0].querySelectorAll("input").forEach(input => {
  $(input).on('input',()=> {
    var m=$(".pass-valid").length>0 || $(".pass-invalid").length>0 ? true : false;
    mclass($("#cadastro .c"),valid_form($("#cadastro")[0],m) ? "c" : "c disabled");
    // checkFormValidity();
  });
});
$("#login")[0].querySelectorAll("input").forEach(input=>{
  $(input).on('input',()=> {
    mclass($("#login .c"),$("#login")[0].checkValidity() ? "c" : "c disabled");
  });
});
function verify_s(){
    var ca=$("#data .c");
    $("select").each((i,s)=>{
      $(s).on("change",()=>{
          mclass(ca,valid_form("#data") ? "c" : "c disabled");
      })
    })
}
verify_s();
function login(){
    var md=$("#login")[0].querySelector(".al");
    var e=$("#email_login");
    var s=$("#senha_login");
    var ev=e.val();
    var sv=s.val();
    $.ajax({
        url: "/admin",
        type:'POST',
        data:{type:"option",tipo:"login",email:ev,senha:sv,_token:window.token},
        // headers: {
        // 'X-CSRF-TOKEN': token // Configure o token CSRF nos cabeçalhos
        //  },
        success: function(data) {
          data=="true" && window.location.get_header_force();
          data=="true" ? window.location.trocar("/admin") : erro(md);
      }
    });
}
function cadastro(){
    var md=$("#data")[0].querySelector(".al");
    var nv=$("#nome").val();
    var uv=$("#usuario").val();
    var ev=$("#email").val();
    var sv=$("#senha").val();
    var mv=$("#month").val();
    var dv=$("#day").val();
    var yv=$("#year").val();
    $.ajax({
        url: "/admin",
        type:'POST',
        // headers: {
        // 'X-CSRF-TOKEN': token // Configure o token CSRF nos cabeçalhos
        //  },
        data:{type:"option",tipo:"cadastro",nome:nv,usuario:uv,email:ev,senha:sv,month:mv,day:dv,year:yv,_token:window.token},
        success: function(data) {
          data=="true" && window.location.get_header_force();
          data=="true" ? window.location.trocar("/admin") : erro(md);
      }
    });
}
function erro(m){
    display(m,"block");
}
function valid_form(form,m=false){
  var q=form.querySelectorAll("input");
  if (m){
    if (form.querySelector("input#senha")){
      var i=$(form.querySelector("input#senha"));
        if (valid_senha(i)){
          !i.hasClass("pass-valid") && i.addClass("pass-valid");
          i.hasClass("pass-invalid") && i.removeClass("pass-invalid");
        } else {
          !i.hasClass("pass-invalid") && i.addClass("pass-invalid");
          i.hasClass("pass-valid") && i.removeClass("pass-valid");
        }
      };
  }
  for(var i of q){
    var type=i.type;
    if(!((type!="password" && i.checkValidity()) || (type=="password" && (form.id=="cadastro" ? valid_senha(i) : i.checkValidity())))) return false;
  };
  return true;
}
function valid_senha(vs){
  vs=$(vs).val();
  return (/[A-Z]/.test(vs) && /[a-z]/.test(vs) && /[^a-zA-Z0-9]/.test(vs) && /\d/.test(vs) && vs.length>=8);
}
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  // var forms = document.querySelectorAll('.needs-validation')
  var fs=$(".btn-valid");
  // Loop over them and prevent submission
  Array.prototype.slice.call(fs)
    .forEach(function (f) {
      var form=$(f.name);
      f.addEventListener('click', function (event) {
        if (!valid_form(form[0],true)) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.addClass('was-validated');
      }, false)
    })
})()
function e(){
$(".mp").each(function (i,d){
  d=$(d);
  d.on("click",()=>{
    d.toggleClass("bi-eye-slash");
    d.toggleClass("bi-eye");
    var df=d.parent().parent()[0].querySelector("input");
    df.type=df.type=="text" ? "password" : "text";
  });
});
}
e();
$("#cb").length>0 && $("#cb").remove();
$("#stylecb").length>0 ? $("#stylecb").text("") : null;
$("#scriptcb").length>0 ? $("#scriptcb").text("") : null;
if (mobile){
$("#cd .i").each((i,e)=>{
  e=$(e);
  //var s=e.getBoundingClientRect.left
  var w=document.body.offsetWidth;
  var fd=$("#fd .w-100");
  const posicaoTop = e.offset().top + window.scrollY;
  fd.offset().top;
  e.on("focus",()=>{
    $("#fd").css("top",(w-posicaoTop-15)/2+"px");
  });
  e.on("blur",()=>{
  $("#fd").css("top",0+"px");
});
});
$("#login .i").each((i,e)=>{
  e=$(e);
  var w=document.body.offsetWidth;
  var fd=$("#fd .w-100");
  const posicaoTop = e.offset().top + window.scrollY;
  fd.offset().top;
  e.on("focus",()=>{
    $("#fd").css("top",(w-posicaoTop-200)/2+"px");
  });
  e.on("blur",()=>{
    $("#fd").css("top",0+"px");
  });
});
  // window.scrollTo({
  //   top: posicaoTop,
  //   behavior: 'smooth' // para uma animação suave, se suportada pelo navegador
  // });
};
 