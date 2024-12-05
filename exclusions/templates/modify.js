var page;
var header_atual;
var window_isLoaded=false;
function mt(){
    var page=document.querySelector("#page");
    page.style.height="100% !important";
}   
// class Router {
//     constructor() {
//       this.routes = [];
//     }
//     addRoute(pattern, handler) {
//       pattern instanceof Array ? pattern.forEach(route=>this.routes.push({pattern:route,handler:handler})) : this.routes.push({ pattern:pattern, handler:handler });
//     }
//     async route(url) {
//         for (var route of this.routes) {
//           function vf(){
//               if (route.pattern=="/" && url=="/"){
//                   return []
//               } else if (route.pattern=="/" && url!=""){
//                   return false;
//               }
//               if (url==route.pattern) return true;
//               var pts=url.split("/"); 
//               var ptu=route.pattern.split("/");
//               if (ptu.length!=pts.length) return false;
//               var params=[];
//               for (var ip=1;ip<ptu.length;ip++){
//                   var rtu=ptu[ip];
//                   var rts2=pts[ip];
//                   var im=false;
//                   var ima='';
//               const h1 = rtu.includes("{");
//               const h2 = rtu.includes("}");
//               if (h1 && h2){
//               var ui=0;
//               for (var i5=0;i5<rts2.length;i5++){
//                   var rts=rts2;
//                   var i=i5;
//                   var pt=rts[i];
//                       if (!im && i!=0){
//                           ui++;
//                       }
//                       var pt2=rtu[ui];
//                       if (pt2=="{"){
//                           im=true;
//                       }
//                       if (im){
//                           ima+=pt;
//                       } else if (pt!=pt2){
//                           return false;
//                       }
//                       var c=0;
//                       if (rtu.indexOf("}")!==-1 && rtu.indexOf("}")+1==rtu.length){
//                           c=2;
//                       } else if (rtu[(rtu.indexOf("}"))]==rtu[i-(rts.length-rtu.length)-2]){
//                           c=1;
//                       }
//                       if (c==1){
//                           im=false;
//                           ui=rtu.indexOf("}")-1;
//                           params.push(ima);
//                       } else if (c==2 && Number(i5)+1==rts.length){
//                           params.push(ima);
//                       }
//               }
//               } else if (rtu!=rts){
//                 //   return false
//               }
//               }
//               return params.length>0 ? params : false;
//           }
//           var match = vf();
//           if (match) {
//             return "/templates"+await route.handler(match);
//           }
//         }
//       }
// }
// var Route=new Router();
// const observer = new MutationObserver((mutations) => {
//     mutations.forEach((mutation) => {
//       // Verifica se a propriedade 'style' foi alterada
//       if (mutation.attributeName === 'style') {
//         setTimeout(()=>{
//             page.style.height="100% !important";
//             console.log("mudou");
//         },200);
//       }
//     });
// });
// const config = { attributes: true, attributeOldValue: true };
// observer.observe(page, config);
// };
class redm{
constructor() {
    // Vincula o método ao contexto da instância atual
    this.resizeTimeout;
    this.invoke = this.invoke.bind(this);
    window.addEventListener("resize",this.invoke);
    redm.registerInstance(this);
}
static registerInstance(instancia) {
    if (!redm.instancias) {
      redm.instancias = [];
    }
    redm.instancias.push(instancia);
}
static freeInstances(){
     if (redm.instancias){
        redm.instancias.forEach(i=>{
            i.resizeTimeout=null;
            window.removeEventListener("resize",i.invoke);
        });
    };
}
  // Método estático para obter todas as instâncias registradas
set(func){
    this.func=func;
}
ve(div){
    // if (div.scrollHeight<= div.offsetHeight) return;
    var texto_init=div.textContent;
    var texto=texto_init.replace(" ","b");
    const context = document.createElement('canvas').getContext('2d');
    context.font = window.getComputedStyle(div).font;
    var lr = context.measureText(texto).width;
    if (lr<=div.offsetWidth * 2) return;
    let inicio = 0;
    let fim = texto.length - 1;
    let ultimoAjuste = 0;
    var lines=2;
    while (inicio <= fim) {
        const meio = Math.floor((inicio + fim) / 2);
        const textoTeste = texto.slice(0, meio + 1);
        const larguraTexto = context.measureText(textoTeste).width;
        if (larguraTexto <= div.offsetWidth * lines) {
        ultimoAjuste = meio;
        inicio = meio + 1;
        } else {
        fim = meio - 1;
        }
    }
    // if (ultimoAjuste+1!=texto.length){
        const textoAjustado = texto_init.slice(0, ultimoAjuste-3) + '...';
        div.textContent = textoAjustado;
    // };
}
invoke(){
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(this.func,250);
}
}
window.redm=redm;
$a={
    post:(url,dados,func)=>{
        $.post(url,dados,(result)=>{
            result=JSON.parse(result);
            if (result.header_location){
                window.location.trocar(result.header_location);
            } else {
                result.header_erro ? window.location.trocar("/erro?origin="+window.location.pathname) : func(result);
            }
        });
    }
}
function await_load(){
    return new Promise((resolve,reject)=>{
        if (!window_isLoaded){
            window.addEventListener("load",()=>{
                window_isLoaded=true;
                resolve();
            })
        } else {
            resolve();
        }
    })
}
function resetar(){
    window.common={};
    window.common.na={};
    window.google_srt=null;
    window.googletag=null;
    window.google_measure_js_timing=null;
    window.adsbygoogle=null;
    function v(n){
        return $(`[name='${n}']`).length>0;
    }
    function vs(n){
        return $(`[src='${n}']`).length>0;
    }
    function q(n){
        return $(`[name='${n}']`);
    }
    function qs(n){
        return $(`[src='${n}']`);
    }
    v("__tcfapiLocator") && q("__tcfapiLocator")[0].remove();
    v("googlefcInactive") && q("googlefcInactive")[0].remove();
    v("googlefcLoaded") && q("googlefcLoaded")[0].remove();
    v("google_esf") && q("google_esf")[0].remove();
    vs("https://www.google.com/recaptcha/api2/aframe") && qs("https://www.google.com/recaptcha/api2/aframe")[0].remove();
    $(".adsbygoogle").each((i,e)=>{ e.remove()});
}
window.pages={};
window.main={};
window.location.loadStatus="change";
window.location
window.location.init_loaded=false;
window.main.piv=()=>{
    return new Promise(async (resolve,reject)=>{
        await await_load();
        if (!window.pages.pi){
            $a.post("/",{type:"info"},(result)=>{
                console.log(result.time);
                window.pages.pi=result;
                window.location.init_loaded=true;
                changeEventListener("init_load");
                resolve();
            });
        } else {
            resolve();
        }
    });
};
window.main.piv();
var evs={};
window.location.addEventListener=(e,f)=>{
    evs[e] ? evs[e].push(f) : evs[e]=[f];
}
function changeEventListener(e){
    evs[e] ? evs[e].forEach(ev=>ev()) : null;
    delete evs[e];
}
window.addEventListener("load",()=>{
    // i.style.display="none";
    page=document.querySelector("#page");
    page.style.width="100%";
    page.style.height="100% !important";
    page.style.display="block";
    mt();
    resetar();
})
window.onload=()=>{
    window.location.get_header=(url)=>{
        var r=document.createElement("div");
        if (url.slice(0,6)=="/admin"){
            if (!header_atual || header_atual!="admin"){
                header_atual="admin";
                $a.post("/cargo",{type:"get"},(data)=>{
                    if (data.cargo && data.cargo=="admin"){
                        $.get("/templates/admin/admin_inicio/admin.html?v=1",(rs)=>{
                            r.innerHTML=rs; cc();
                        });
                    } else if (!data.cargo){
                    } else if (data.cargo=="normal"){
                        $.get("/templates/admin/admin_inicio/main.html?v=1",(rs)=>{
                            r.innerHTML=rs; cc();
                        });
                    };
                });
            };
        } else{
            if (!header_atual || header_atual!="normal"){
                header_atual="normal";
                $.get("/templates/inicio/main.html?v=1",(rs)=>{
                    r.innerHTML=rs; cc();
                });
            };
        }
        function cc(){
            var cb;
            if (!document.querySelector("#cb")){
                var cb=document.createElement("div");
                cb.id="cb";
                cb.className="d-block";
                document.body.appendChild(cb);
            } else {
                cb=document.querySelector("#cb");
            }
            var stylec;
            if (!document.querySelector("#stylecb")){
                stylec=document.createElement("div");
                stylec.id="stylecb";
                document.body.appendChild(stylec);
            } else {
                stylec=document.querySelector("#stylecb");
            }
            stylec.textContent="";
            r.querySelectorAll("#style link").forEach(e=>{
                var link=document.createElement("link");
                link.rel="stylesheet";
                link.href=e.href;
                stylec.appendChild(link);
            });
            if (r.querySelector("#server")){
                var ds;
                if (document.querySelector("#server")){
                    ds=document.querySelector("#server");
                } else {
                    ds=document.createElement("div");
                    ds.id="server";
                    document.body.appendChild(ds);
                }
                r.querySelectorAll("#server script").forEach(e=>{
                    var d=document.createElement("script");
                    d.innerHTML=e.innerHTML;
                    ds.appendChild(d);
                });
            }
            var scriptc;
            if (!document.querySelector("#scriptcb")){
                scriptc=document.createElement("div");
                scriptc.id="scriptcb";
                document.body.appendChild(scriptc);
            } else {
                scriptc=document.querySelector("#scriptcb");
            }
            scriptc.textContent="";
            r.querySelectorAll("#script script").forEach(e=>{
                var script=document.createElement("script");
                script.src=e.src;
                scriptc.appendChild(script);
            });
            // var cb=document.createElement("div");
            // cb.id="cb";
            cb.innerHTML=r.querySelector("#page #cb").innerHTML;
            //cb.querySelector("#cb").style.position="fixed";
        }
    }
    window.location.get_header_force=()=>{
        header_atual=undefined;
    }
    window.location.pathname.slice(0,8)!="/stories" && window.location.get_header(window.location.pathname);
    window.location.trocar=async (url)=>{
    window.location.addEventListener("load",mt);
    if (url.slice(0,8)!="/stories"){
        window.location.get_header(url);
    } else {
         (()=>{header_atual=undefined;document.querySelector("#cb") ? document.querySelector("#cb").remove() : null})();
    };
    //$.post(url,{type:"get"},function(data) {
        //var u=new URL(window.location.href)
        //var url2=url.includes("?") ? url.split("?")[0] : url;
        // await Route.route(url2)
    $.post(url,{type:"get"},function(data){
        try {
            data=JSON.parse(data);
        } catch (error) {
        }
        if (data.header_location){
            window.location.trocar(data.header_location);
        } else if (data.header_erro){
            window.location.trocar("/erro?origin="+window.location.pathname);
        } else {
            resetar();
            page.style.display="none";
            history.pushState({}, '', url);
            var t = document.createElement('div');
            t.innerHTML=data;
            // var h=document.createElement("head");
            // var s=document.createElement("style");
            // s.innerHTML = t.querySelector("#style").innerHTML;
            // var b=document.createElement("body");
            // h.appendChild(s);
            // t.appendChild(h);
           // b.innerHTML=t.querySelector("#page").innerHTML;
            // document.body.appendChild(t);
            // var p=document.querySelector("#page");
            document.querySelector("#page").innerHTML=t.querySelector("#page").innerHTML;
            var s=document.querySelector("#style");
            s.innerHTML="";
            t.querySelectorAll("#style link").forEach(e=>{
                var link=e.cloneNode(true);
                s.appendChild(link);
                link.onload=()=>{page.style.display="block"};
            })
            //s.innerHTML=t.querySelector("#style").innerHTML;
            if (t.querySelector("#server")){
                var ds;
                if ($("#server").length>0){
                    ds=$("#server");
                } else {
                    ds=$("<div>",{id:"server"});
                    $("body").append(ds);
                }
                ds.text("");
                t.querySelectorAll("#server script").forEach(e=>{
                    ds.append($(e.cloneNode(true)));
                });
            }
            var sc=$("#script");
            sc.html("");
            var le=t.querySelectorAll("#script script").length;
            var li=0;
            t.querySelectorAll("#script script").forEach((e,i)=>{
                var script=$(e.cloneNode(true));
                // script.src=e.src;
                // script.async=e.async;
                // script.rel=e.rel;
                // e.id ? script.id=e.id : null;
                sc.append(script);
                script.ready(()=>{
                    li++;
                    li==le ? window.location.loadStatus="complete" && changeEventListener("load") : null;
                });
                });
            redm.freeInstances();
            // var info=t.querySelector("[name='info']");
            // if (info){
            //     document.title=info.dataset.anTitle;
            // }
            //window.location.iniciar();
            //   window.iniciar();
        };
    });
}
}
window.addEventListener('popstate', function(event) {
    window.location.trocar(window.location.pathname+window.location.search);
});
function vm(){
    window.mobile=window.innerWidth < 769 ? true : false;
}
window.addEventListener("resize",()=>{
    document.body.style.height=window.innerHeight+"px";
    vm();
})
// window.addEventListener("beforeunload",()=>{
//     window.location.href=window.location.pathname+window.location.search;
// });
window.addEventListener("load",()=>{
function ismobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
var tipo_usuario=ismobile() ? "mobile" : "computer";
var envst;
document.addEventListener("visibilitychange",()=>{
    document.hidden ? clearInterval(envst) : envst=setInterval(()=>{env(false)},10000);
    env(document.hidden);
})
function env(vs){
    $.post("/view",{tipo:tipo_usuario,operator:vs ? "delete" : "new"},(result)=>{
        console.log(result);
    });
}
window.addEventListener("beforeunload",()=>{
    env(true);
})
!document.hidden && env(false);
envst=setInterval(()=>{env(false)},10000);
});
// Route.addRoute("/",(params)=>{
//     return "/pagina_inicial/main.html"
// });
// Route.addRoute("/noticia",async (params)=>{
//     return await pAdmin("/noticia/main.html");
// });
// Route.addRoute("/musica",async (params)=>{
//     return await pAdmin("/musica/main.html");
// });
// Route.addRoute("/stories/{id}",async (params)=>{
//     return await pAdmin("/stories/main.html");
// });
// Route.addRoute("/busca",(params)=>{
//     return "/busca/main.html";
// })
// async function isAdmin(){
//     return new Promise((resolve,reject)=>{
//         if (!window.isl){
//             $.post("/isAdmin",{type:"info"},(result)=>{
//                 result=JSON.parse(result);
//                 console.log(result);
//                 window.isl=result=="true" ? "logado" : "nlogado";
//                 resolve(result=="true" ? true : false);
//             });
//         } else {
//             resolve(window.isl=="logado" ? true : false);
//         }
//     });
// }
// async function pAdmin(r){
//     var v=await isAdmin()
//     !v && window.location.pathname!="/admin" && window.location.trocar("/admin");
//     return v ? r : null;
// }
// Route.addRoute(["/@{canal}","/@{canal}/{tipo}"],async (params)=>{
//     return await pAdmin("/canal/main.html");
// });
// Route.addRoute("/admin/noticias_cadastro",async (params)=>{
//     return await pAdmin("/admin/noticias_cadastro/main.html");
// })
// Route.addRoute("/admin/noticias_lista",async (params)=>{
//     return await pAdmin("/admin/noticias_lista/admin.html");
// })
// Route.addRoute("/admin/24_cadastro",async (params)=>{
//     return await pAdmin("/admin/24_cadastro/main.html");
// })
// Route.addRoute("/admin/24_lista",async (params)=>{
//     return await pAdmin("/admin/24_lista/main.html");
// })
// Route.addRoute("/admin/musicas_cadastro",async (params)=>{
//     return await pAdmin("/admin/musicas_cadastro/main.html");
// })
// Route.addRoute("/admin/musicas_lista",async (params)=>{
//     return await pAdmin("/admin/musicas_lista/admin.html");
// })
// Route.addRoute("/admin",async (params)=>{
//     return await pAdmin("/admin/admin_inicio/main.html");
// });
//console.log(Route.route(window.location.pathname));
window.addEventListener("load",()=>{
// page("/@:canal",function(){
//     console.log("oi");
// });
// page(window.location.pathname);
});