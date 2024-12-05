function iniciar(){
    var titulo=document.querySelector("#titulo");
    var audiod=document.querySelector("#audiod");
    var capa=document.querySelector("#capa img");
    var change=document.querySelector("#change");
    var atual_t=document.querySelector("#atual_t");
    var total_t=document.querySelector("#total_t");
    var progress_p=document.querySelector("#progress_p");
    var i1=document.querySelector(".i1");
    var i2=document.querySelector(".i2");
    var duration;
    audiod.addEventListener('loadedmetadata', function() {
        duration = audiod.duration;
        var m=duration/60;
        m=String(Math.floor(m));
        var s=String(Math.floor(duration)-(m*60));
        m<10 ? m="0"+m : null;
        s<10 ? s="0"+s : null;
        total_t.textContent=m+":"+s;
    });
    capa.src="/images/"+window.capa;
    titulo.textContent=window.titulo;
    audiod.src="/musics/"+window.arquivo;
    function obterTempoAtual() {
        var atual = audiod.currentTime;
        //console.log(duration,atual,duration/atual,duration/100,(duration/100)*(atual/(duration/100)));
        progress_p.style.width=((atual/duration)*100)+"%";
        atual=Math.floor(audiod.currentTime);
        //atual=atual.toFixed(0);
        var m=atual/60;
        m=String(Math.floor(m));
        var s=String(atual-(m*60));
        m<10 ? m="0"+m : null;
        s<10 ? s="0"+s : null;
        atual_t.textContent=m+":"+s;
    }

    // Evento que é acionado enquanto o áudio está sendo reproduzido
    audiod.addEventListener('timeupdate', obterTempoAtual);
    var at="pause";
    var change=document.querySelector("#change");
    change.addEventListener("click",changed)
    function changed(){
        at=at=="play" ? "pause" : "play";
        if (at=="play"){
            audiod.play();
        } else {
            audiod.pause();
        }
        i1.classList.toggle("d-block");
        i1.classList.toggle("d-none");
        i2.classList.toggle("d-block");
        i2.classList.toggle("d-none");
    }
    // changed();
}
$a.post("",{type:"info"},(result)=>{
    window.capa=result.capa;
    window.titulo=result.titulo;
    window.arquivo=result.arquivo;
    iniciar();
});