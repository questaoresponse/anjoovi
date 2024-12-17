onmessage=async (e)=>{
    const a=await WebAssembly.compile(e.data);
    postMessage(a);
    // postMessage("ai");
}