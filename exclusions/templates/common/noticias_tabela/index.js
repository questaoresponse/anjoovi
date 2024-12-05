var is=0;
window.common.na.init=()=>{
if (is>0) return;
var redmc=new window.redm();
redmc.set(()=>{
    document.querySelectorAll(".titulo").forEach(e=>{
        redmc.ve(e);
    })
})
is++;
var common=window.common.na;
console.log(common);
window.location.iniciar=()=>{
    var tabela=document.querySelector("#tabela");
    var tabelah=tabela.querySelector("thead");
    var tabelab=tabela.querySelector("tbody");
    var tabela=document.querySelector("#tabela");
    window.tabela=tabela;
    function criar_head(){
        var c=document.createElement("tr");
        var id=document.createElement("div");
        var idd=document.createElement("td");
        var titulo=document.createElement("td");
        var acessos=document.createElement("td");
        var opcoes=document.createElement("td");
        id.textContent="N°";
        titulo.textContent="TITULO";
        acessos.textContent="ACESSOS";
        opcoes.textContent="OPÇÕES";
        idd.className="idd";
        id.className="id";
        titulo.className="titulod";
        acessos.className="acessosd";
        opcoes.className="opcoes";
        idd.appendChild(id);
        c.appendChild(idd);
        c.appendChild(titulo);
        c.appendChild(acessos);
        c.appendChild(opcoes);
        tabelah.appendChild(c);
    }
    criar_head();
    // l.querySelector(".edit").remove();
    // l.querySelector(".excluir").remove();
    // var d=document.createElement("div");
    // d.className="coluna titulo";
    // d.textContent="TÍTULO";
    // l.querySelector(".titulo").parentNode.replaceChild(d,l.querySelector(".titulo"));
    // var o=document.createElement("div");
    // o.textContent="AÇÕES";
    // o.classList.add("coluna");
    // o.classList.add("opcoes");
    // l.appendChild(o);
    function definir_tabela(d){
        
        tabelab.textContent="";
        var posts=d.noticias;
        var n=d.n_registros;
        var nd;
        console.log(n);
        function criar_b(){
            var nb=n<=10 ? 0 : n/10!=Math.floor(n/10) ? Math.floor(n/10+1) : n/10;
            var params=new URLSearchParams(window.location.search);
            var pa=0;
            if (params.has("pg")){
                pa=Number(params.get("pg"))-1;
            }
            nd=(Number(n)+1)-(pa*10);
            var bv=document.createElement("div");
            var bi=document.createElement("div");
            bv.className="btnb";
            bi.className="btnb";
            bv.textContent=pa;
            bi.textContent=pa+2;
            if (pa==0){
                bv.style.background="gray";
                bv.textContent="1";
            } else {
                bv.onclick=()=>{window.location.trocar("/admin/"+(common.m? "musicas_lista" : "noticias_"+(common.n?"lista" : "lixeira")+"?pg="+pa)) };
            }
            if (pa+2>nb){
                bi.style.background="gray";
            } else {
                bi.onclick=()=>{window.location.trocar("/admin/"+(common.m ? "musicas_lista" : "noticias_"+(common.n?"lista" : "lixeira")+"?pg="+(pa+2)))};
            }
            var di=document.querySelector("#btndiv");
            di.appendChild(bv);
            di.appendChild(bi);
            //var b-document.createElement("b")
        }
        criar_b();
        var r=document.querySelector(".registros");
        r.querySelector(".p1").textContent=n>=0 && n<=1 ? "Foi encontrado " : "Foram encontrados ";
        r.querySelector(".n").textContent=n;
        r.querySelector(".p2").textContent=n>=0 && n<=1 ? "registro." : "registros.";
        for (post of posts){
            nd--;
            var c=document.createElement("tr");
            var idd=document.createElement("td");
            var id=document.createElement("div");
            var titulod=document.createElement("td");
            var titulo=document.createElement("div");
            var acessos=document.createElement("div");
            var acessosd=document.createElement("td");
            var opcoes=document.createElement("td");
            var editard=document.createElement("div");
            var editarbd=document.createElement("div");
            var editar=document.createElement("img");
            var excluir=document.createElement("img");
            var public=document.createElement("label");
            var avs=document.createElement("div");
            public.ariaRoleDescription="teste";
            // avs.innerHTML=`
            //     <div id="pb-${nd}" class="avs" role="tooltip" aria-hidden="true">
            //         Clique para ligar/desligar
            //     </div>
            // `;
            avs.className="avs";
            avs.textContent="público";
            // avs.role="tooltip";
            // avs.textContent="teste";
            // avs.ariaHidden=true;
            // public.ariaDescribedby="pb-"+nd;
            public.innerHTML=`
                <input type="checkbox">
                <span class="slider"></span>
            `;
            public.querySelector("input").dataset.anId=post.id;
            public.querySelector("input").addEventListener("change",(e)=>{
                e.target.parentNode.parentNode.querySelector(".avs").textContent=e.target.checked ? "privado" : "público"; 
            });
            idd.className="idd";
            id.className="id";
            public.className="public switch";
            opcoes.className="opcoes";
            titulo.className="titulo";
            titulod.className="titulod";
            editar.className="edit";
            excluir.className="excluir";
            acessos.className="acessos";
            acessosd.className="acessosd";
            editard.className="editard";
            if (!common.n){
                excluir.classList.add("excluirnn");
            }
            if (!common.n){
                editard.classList.add("editardnn");
            }
            editarbd.className="editarbd";
            editar.src=common.src1;
            excluir.src=common.src2;
            // var c=window.l2.cloneNode(true);
            // c.className="line";
            // var id=c.querySelector(".id");
            // var titulo=c.querySelector(".titulo");
            // var usuario=c.querySelector(".usuario");
            // var acessos=c.querySelector(".acessos");
            // var editar=c.querySelector(".edit");
            // var excluir=c.querySelector(".excluir");
            id.textContent=nd;
            titulo.textContent=post.titulo;
            titulo.addEventListener("click",((post)=>{
                return function(){
                    window.open("/"+ (common.p24 ? "stories/"+post.id+"?origin="+window.location.pathname : (common.m ? "musica" : "noticia")+"?id="+post.id));
                }
            })(post));
            // usuario.textContent=post.usuario;
            acessos.textContent=post.acessos;
            idd.appendChild(id);
            c.appendChild(idd);
            titulod.appendChild(titulo);
            c.appendChild(titulod);
            acessosd.appendChild(acessos);
            c.appendChild(acessosd);
            editarbd.appendChild(editar);
            editarbd.appendChild(excluir);
            editard.appendChild(editarbd);
            opcoes.appendChild(editard);
            if (common.n){
                editarbd.appendChild(public);
                editarbd.appendChild(avs);
                if (post.lixeira=="true"){
                    public.querySelector("input").checked=true;
                }
                public.querySelector("input").addEventListener("change",(e)=>{
                    var gid=e.target.dataset.anId;
                    $a.post("/admin/noticias_lista",{type:"option",id:gid,operation:e.target.checked ? "privado":"publico"},(result)=>{
                    });
                });
            }
            c.appendChild(opcoes);
            tabelab.appendChild(c);
            editar.addEventListener("click",((post)=>{
                return function(){
                    if (common.n){
                        window.location.trocar("/admin/noticias_edit?id="+post.id);
                    } else {
                        var r=window.confirm(common.msg1);
                        if (r){
                        $a.post(common.url1,{_token:window.token,type:"option",id:post.id,tipo:"noticias_lixeira"},(data)=>{
                                console.log(data);
                                definir_tabela(data);
                                data=="" && window.location.reload();
                        });
                        }
                    };
                }
            })(post));
            excluir.addEventListener("click",((post)=>{
            return function(){
                var r=window.confirm(common.msg2);
                if (r){
                    $.ajax({
                        url: common.url2,
                        type:'POST',
                        data:{_token:window.token,type:"option",id:post.id,tipo:"noticias_lista"},
                        success: function(data) {
                            data=JSON.parse(data);
                            for (e of document.querySelectorAll(".line")){
                                e.remove();
                            }
                            definir_tabela(data);
                            data=="" && window.location.reload();
                        }
                    });
                }
            };
            })(post));
            redmc.ve(titulo);
        }
    }
    definir_tabela(window);
    window.esmagar=()=>{
        var e=document.querySelector("#dt");
        e.classList.toggle("fechado");
        e.classList.toggle("aberto");
    }
    };
    $a.post("",{type:"info"},(result)=>{
        window.noticias=result.noticias;
        window.n_registros=result.n_registros;
       window.location.iniciar();
    })
};
var stv;
function v(){
    window.common.na.pi ? (()=>{clearTimeout(stv),window.common.na.pi()})() : stv=setTimeout(()=>{v()},200);
}
if (window.location.loadStatus=="complete"){
    v();
} else {
    window.location.addEventListener("load",()=>{
        v();
    })
};