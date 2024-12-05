function display(e,s){
    e.css("display",s);
}
function mclass(e,s){
    e.attr("class",s);
}
function src(e,s){
    e.attr("src",s);
}
if (typeof stories=="undefined"){
class stories{
constructor(){
    this.ps=window.posts;
    this.el=[];
    this.n=0;
    this.st;
    this.ds;
    this.t;
    this.isp;
    this.npe=true;
    this.sd=$("#status_div");
    this.vsearch();
    this.st=setInterval(()=>{
        this.trocar();
    },5000);
    this.criar_stories();
    this.documents();
}
vsearch(){
    var search=new URLSearchParams(window.location.search);
    !search.has("origin") ? search.set("origin","/") : null;
    history.pushState({},'',window.location.pathname+"?"+decodeURIComponent(search.toString()));
}
criar_stories(){
    var o;
    this.ps.filter((v,i)=>{
        v.id==window.id ? o=i : null;
    });
    for (var pi=0;pi<this.ps.length;pi++){
        var p=this.ps[pi];
        var da=$("<div>",{class:"status_a"});
        var a1=$("<div>",{class:"a1"});
        var a2=$("<div>",{class:"a2"});
         if (pi<o){
            mclass(a2,"a2 end_animation");
            this.n=o;
         }
        da.css("width",(95/this.ps.length)+"%");
        da.css("margin-left","0.1%");
        da.append(a1);
        da.append(a2);
        this.sd.append(da);
        this.el.push({a:a2,i:p.imagem,id:p.id});
    }
    this.trocar();
}
trocar(){
        if (this.ps.length!=this.n){
            if (this.isp){
                this.isp=false;
                this.isps=true;
                display(this.x1,"flex");
                display(this.x2,"none");
            }
            this.ds=new Date();
            this.n>0 ? mclass(this.el[this.n-1].a,"a2 end_animation") : null;
            console.log("Oi");
            mclass(this.el[this.n].a,"a2 animation");
            s_img.src="/images/"+this.el[this.n].i;
            history.pushState({},'','/stories/'+this.el[this.n].id+window.location.search);
            this.enviar(this.el[this.n].id);
            this.npe=false;
            this.n++;
            this.el.length>this.n ? $("#cg").src("/images/"+this.el[this.n].i) : null;
            if (this.isps){
                clearInterval(this.st);
                this.isps=false;
                this.st=setInterval(()=>{
                    this.trocar();
                },5000);
            }
            this.t=0;
        } else {
            clearInterval(this.st);
            //this.sd.textContent="";
            //s.style.display="none";
            window.location.trocar(this.go());
        }
}
go(){
    var cs=new URLSearchParams(window.location.search);
    return cs.has("origin") ? cs.get("origin") : null;
}
pause(){
    if (this.isp) return;
    this.x1.css("display")=="flex" || this.x1.css("display")=="" ? display(this.x1,"none") : display(this.x2,"flex");
    this.isp=true;
    clearInterval(this.st);
    var de=new Date();
    this.t+=de-this.ds;
    this.el[this.n-1].a.css("animationPlayState","paused");
}
dispause(){
    if (!this.isp) return;
    (this.x2.css("display")=="flex" || this.x2.css("display")=="") && display(this.x1,"flex") && display(this.x2,"none");
    this.isp=false;
    this.isps=true;
    this.el[this.n-1].a.css("animationPlayState","running");
    // var data=new Date();
    // ds.setMilliseconds(ds.getMilliseconds() + data.getMilliseconds());
    var t5=5000-this.t;
    // var data=new Date();
    this.st=setInterval(()=>{
        this.trocar();
    },t5);
    this.ds=new Date();
}
ir(){
    mclass(this.el[this.n-1].a,"a2 end_animation");
    this.el[this.n-1].a.css("animationPlayState","running");
    // n++;
    clearInterval(this.st);
    this.trocar();
}
voltar(){
    if (this.n>2){
        mclass(this.el[this.n-1].a,"a2 init_animation");
        this.el[this.n-1].a.css("animationPlayState","running");
        mclass(this.el[this.n-2].a,"a2 init_animation");
        this.el[this.n-2].a.css("animationPlayState","running");
        this.n-=2;
        this.trocar();
        clearInterval(this.st);
        this.st=setInterval(()=>{
            this.trocar();
        },5000);
    } else if (this.n<=2 && this.n>1){
        mclass(this.el[1].a,"a2 init_animation");
        this.el[1].a.css("animationPlayState","running");
        mclass(this.el[0].a,"a2 init_animation");
        this.el[0].a.css("animationPlayState","running");
        this.n=0;
        this.trocar();
        clearInterval(this.st);
        this.st=setInterval(()=>{
            this.trocar();
        },5000);
    }
}
async enviar(id){
    if (this.npe) return;
    $a.post("/stories/"+id,{type:"option"},(data)=>{
        console.log(data);
    });
}
documents(){
    this.x1=$("#x1");
    this.x2=$("#x2");
    $("#ld").on("click",()=>this.ir());
    $("#ls").on("click",()=>this.voltar());
    this.x1.on("click",()=>this.pause());
    this.x2.on("click",()=>this.dispause());
    var si=$("#imgd");
    si.on("touchstart",()=>this.pause());
    si.on("touchend",()=>this.dispause());
    $("#x").on("click",()=>this.sair());
}
sair(){
    clearInterval(this.st);
    window.location.trocar(this.go());
}
}
$a.post("",{type:"info"},(result)=>{
    window.id=result.id;
    window.posts=result.posts;
    var storiesclass=new stories();
})
};