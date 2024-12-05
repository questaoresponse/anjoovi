window.location.iniciar=()=>{
window.setStyle={elemento:"#categorias_cadastro",color:"gray"};
var nome=document.querySelector("#nome");
var link=document.querySelector("#link");
var descricao=document.querySelector("#descricao");
var form=document.querySelector("form");
nome.addEventListener("input",()=>{
    var nome2=nome.value.replace(/\s+/g,"-")
    nome2=nome2.toLowerCase();
    nome2=nome2.replace(/[^a-zA-Z0-9\-]/g, '');
    link.value=nome2;
})
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    $.ajax({
        url:"/admin/categorias_cadastro?type="+(window.edit ? "edit" : "cadastro"),
        type:'POST',
        data:{_token:window.token,tipo:window.edit ? "categorias_edit" : "categorias_cadastro",nome:nome.value,descricao:descricao.value,link:link.value},
        success: function(data) {
        data=JSON.parse(data);
        console.log(data);
        data!="true" && criar_tabela(data);
        data=="" && window.location.reload();
        }
    });
})
var tabela=document.querySelector("#tabela");
function criar_tabela(d){
    var ab=tabela.querySelectorAll(".line");
    if (ab.length>0){
        for (a of ab){
            a.remove();
        }
    }
    var registros=tabela.querySelector("#registros");
    var t=d.length>=0 && d.length<=1 ? true : false;
    registros.querySelector("#p1").textContent=t ? "Foi encontrado" : "Foram encontrados";
    registros.querySelector("#n").textContent=d.length;
    registros.querySelector("#p2").textContent=t ? "registro." : "registros.";
    if (d.length>0){
    for (p of d){
        var div_id=document.createElement("div");
        div_id.className="coluna id";
        div_id.textContent=p.id;
        var div_nome=document.createElement("div");
        div_nome.className="coluna nome";
        div_nome.textContent=p.nome;
        var div_acoes=document.createElement("div");
        div_acoes.className="coluna acoes";
        var div_edit=document.createElement("img");
        var div_excluir=document.createElement("img");
        div_edit.className="edit";
        div_edit.src="/static/edit-icone.png";
        div_excluir.className="excluir";
        div_excluir.src="/static/remove-icone.png"
        div_acoes.appendChild(div_edit);
        div_acoes.appendChild(div_excluir);
        var l=document.createElement("div");
        l.className="line";
        l.appendChild(div_id);
        l.appendChild(div_nome);
        l.appendChild(div_acoes);
        tabela.appendChild(l);
        console.log(p.id);
        div_edit.n=p.id;
        div_edit.addEventListener("click",(e)=>{ window.location.trocar("/admin/categorias_edit/?id="+e.target.n)})
        div_excluir.addEventListener("click",()=>{
            var r=window.confirm("Deseja remover este registro? Esta ação não pode ser revertida.");
            if (r){
                var url;
                $.ajax({
                    url:"/admin/categorias_cadastro?type=remove&id="+p.id,
                    type:'POST',
                    data:{"tipo":"remove",_token:window.token},
                    success: function(data) {
                    data=JSON.parse(data);
                    console.log(data);
                    console.log(window.edit && p.id==Number(window.location.href.split("/")[5]));
                    window.edit && p.id==new URLSearchParams(window.location.search).get("id") ? window.location.trocar("/admin/categorias_cadastro/") : criar_tabela(data);
                    data=="" && window.location.reload();
                    }
                });
            }
        })
    }
    }
}
criar_tabela(window.select_options);
window.esmagar=()=>{
    var e=document.querySelector("#dt");
    e.classList.toggle("fechado");
    e.classList.toggle("aberto");
}
if (window.edit){
    nome.value=window.categoria_edit[0].nome;
    descricao.value=window.categoria_edit[0].descricao;
    link.value=window.categoria_edit[0].link;
    document.querySelector("button").textContent="Alterar";
}
};
window.location.iniciar();