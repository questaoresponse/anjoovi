// const form=$("form");
// const mensagem=$("#mensagem");
// form.style.display="n"
// mensagem.style.display="block";
window.form=document.querySelector("form");
window.img=document.querySelector("img");
window.p2=(window.screen.width/100)*12.5;
window.p=(window.screen.width/100)*25.6;
window.img.style.width=`${window.p2}px`
window.innerWidth>700 ? window.form.style.width=`${window.p}px` : window.form.style.width="90%";
document.querySelector("a").style.fontSize="13px"
window.addEventListener("load",()=>{
    window.img.style.left=`${window.innerWidth/2-window.img.offsetWidth/2}px`;
    window.form.style.left=`${window.innerWidth/2-window.form.offsetWidth/2}px`
})
console.log(window.innerWidth/2-window.img.offsetWidth/2);
window.addEventListener("resize",()=>{
    
    window.innerWidth>700 ? window.form.style.width=`${window.p}px` : window.form.style.width="90%";
    window.img.style.left=`${window.innerWidth/2-window.img.offsetWidth/2}px`
    window.form.style.left=`${window.innerWidth/2-window.form.offsetWidth/2}px`
    console.log(window.form.style.width)
})
window.img.style.display="block";
window.form.style.display="block";