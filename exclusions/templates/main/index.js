//import { memory, sum} from "/templates/wasm/release2.js";
window.addEventListener("load",()=>{
window.location.trocar(window.location.pathname+window.location.search,{url:window.location.pathname});
// var s=document.createElement("script");
    // s.src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4004929109745703";
    // s.async=true;
    // s.crossOrigin="anonymous";
    // document.head.appendChild(s);
    // console.log(sum());
})
window.isReady=()=>{
    function sum2() {
        var array=[];
        var ii=0;
        while(ii<10000000){
            ii++;
            array.push(ii);
        }
        let result=0;
        for (let i=0; i < array.length; i++) {
          result += array[i];
        }
        return result;
    }      
    console.time("WebAssembly");
    console.timeEnd("WebAssembly");
    console.time("javascript");
    sum2();
    console.timeEnd("javascript");
}
document.body.style.height=window.innerHeight+"px";
// setTimeout(()=>{
//     console.log(sum());
// },2000)