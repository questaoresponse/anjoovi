function criar_cis(){
    var inspai=document.querySelector("#ins");
    for (var ci of window.cis){
        var al=document.createElement("a");
        var t=document.createElement("div");
        var l=document.createElement("div");
        var d=document.createElement("div");
        al.className="al col-12 col-md-3 mt-0 mt-md-0";
        t.className='insdiv';
        l.className="insl";
        d.className='insd';
        al.addEventListener("click",((ci)=>{ return function(){window.location.trocar("/@"+ci.usuario)}})(ci));
        if (ci.logo){
            var a=document.createElement("img");
            a.src="/images/"+ci.logo;
            l.appendChild(a);
        } else {
            l.textContent=ci.nome[0];
        }
        d.textContent=ci.nome;
        t.appendChild(l);
        t.appendChild(d);
        al.appendChild(t);
        inspai.appendChild(al);
    }
}
$.post("",{type:"info"},(result)=>{
    result=JSON.parse(result);
    if (result.header_location){
        window.location.trocar(result.header_location);
    }
    window.cis=result.cis;
    criar_cis();
})