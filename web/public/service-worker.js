var server="";
var tipo="";
const peer_ids=[];
var st;
var cargo=null;
const enviar=(newPeer,deletePeer)=>{
    self.clients.matchAll().then(clients => {
        clients[0].postMessage({origin:"worker",type:"send",url:server+"/view",data:{type:"infos",tipo:tipo,modify:peer_ids,newPeer,deletePeer}});
    });
};
self.addEventListener('message', event => {
    if (event.data.type=="data"){
        server=event.data.server;
        tipo=event.data.tipo;
    } else if (event.data.type=="newPeer"){
        // event.source.postMessage({ai:"chegou"}   );
        if (st) clearInterval(st);
        st=setInterval(()=>{
            enviar(undefined,undefined);
        },9000);
        enviar(event.data.peer_id,undefined);
        peer_ids.push(event.data.peer_id);
        // for (const client of clients){
        //     client.postMessage({origin:"worker",message:"aian"});
        // };
    } else if (event.data.type=="deletePeer"){
        peer_ids.splice(peer_ids.findIndex(peer_id=>peer_id==event.data.peer_id),1);
        if (st) clearInterval(st);
        st=setInterval(()=>{
            enviar(undefined,undefined);
        },9000);
        enviar(undefined,[event.data.peer_id]);
    } else if (event.data.type=="deleteAllPeer"){
        event.source.postMessage({origin:"worker",type:"sendDeletePeer",url:server+"/view",data:{type:"infos",tipo:tipo,modify:undefined,newPeer:undefined,deletePeer:peer_ids}});
        peer_ids.length=0; 
    } else if (event.data.type=="cargo"){
        if (cargo!=event.data.cargo){
            caches.open("premium-cache").then(cache=>{
                cache.keys().then(requests => {
                    requests.forEach(request => {
                        const filename=request.url.split("/").splice(-1)[0];
                        if ((cargo & 4)==4 && !filename.startsWith("p_")){
                            cache.delete(filename.slice(2));
                        } else if ((cargo & 4)==0 && filename.startsWith("p_")){
                            cache.delete(filename);
                        }
                    });
                });
            })
        }
        cargo=event.data.cargo;
    }
});
self.addEventListener('fetch', (event) => {
    if (event.request.url.split("/").slice(-1)[0].startsWith("p_")){
        event.respondWith(caches.open("premium-cache").then(cache=>{
            const filename=event.request.url.split("/").slice(-1)[0];
            if ((cargo & 4)==4){
                return cache.match(filename).then(value=>{
                    if (value){
                        return value;
                    } else {
                        return fetch(event.request.url,{
                            method:"GET",
                            headers: {
                                'Cache-Control': 'no-cache, no-store, must-revalidate',
                                'Pragma': 'no-cache',
                                'Expires': '0',
                          },
                        }).then(async response=>{
                            const r=new Response(await response.blob(), {
                                status: 200,
                                headers: {
                                  'Content-Type': 'image/webp', // Define o tipo como WebP
                                },
                            });
                            cache.put(filename,r.clone());
                            return r;
                        });
                    }
                });
            } else {
                const bFilename=filename.slice(2);
                return cache.match(bFilename).then(value=>{
                    if (value){
                        return value;
                    } else {
                        var newURL=event.request.url.split("/");
                        newURL[newURL.length-1]=newURL[newURL.length-1].slice(2);
                        newURL=newURL.join("/");
                        return fetch(newURL,{
                            method:"GET",
                            headers: {
                                'Cache-Control': 'no-cache, no-store, must-revalidate',
                                'Pragma': 'no-cache',
                                'Expires': '0',
                          },
                        }).then(async response=>{
                            const r=new Response(await response.blob(), {
                                status: 200,
                                headers: {
                                  'Content-Type': 'image/webp', // Define o tipo como WebP
                                },
                            });
                            cache.put(bFilename,r.clone());
                            return r;
                        });
                    }
                });
            }
        }));
        // event.respondWith(caches.open("aian"));
    }
});
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});