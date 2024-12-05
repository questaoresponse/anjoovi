var e=document.querySelector("#contador");
var n=window.r.data;
definir(n);
var c=setInterval(()=>{
    n-=1;
    definir(n);
},1000);
function definir(n){
    n==0 && location.reload();
    var m=get_min(n);
    var s=get_sec(n);
    e.textContent=`${m}:${s}`;
}
function get_min(num){
    num=num>60 ? Math.floor(num/60) : 0;
    return num<10 ? "0"+num : num;
}
function get_sec(num){
    num=num%60;
    return num<10 ? "0"+num : num;
}