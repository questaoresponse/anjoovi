var server="";
var tipo="";
const peer_ids=[];
const clients={};
var st;
var cargo=null;
const enviar=(newPeer,deletePeer)=>{
    Object.entries(clients)[0][1].postMessage({origin:"worker",type:"send",url:server+"/view",data:{type:"infos",tipo:tipo,modify:peer_ids,newPeer,deletePeer}});
};
self.addEventListener('message', event => {
    if (event.data.type=="data"){
        server=event.data.server;
        tipo=event.data.tipo;
    } else if (event.data.type=="newPeer"){
        clients[event.source.id]=event.source;
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
        delete clients[event.source.id];
        peer_ids.splice(peer_ids.findIndex(peer_id=>peer_id==event.data.peer_id),1);
        if (st) clearInterval(st);
        st=setInterval(()=>{
            enviar(undefined,undefined);
        },9000);
        enviar(undefined,[event.data.peer_id]);
    } else if (event.data.type=="deleteAllPeer"){
        Object.keys(clients).forEach(key => delete clients[key]);
        event.source.postMessage({origin:"worker",type:"sendDeletePeer",url:server+"/view",data:{type:"infos",tipo:tipo,modify:undefined,newPeer:undefined,deletePeer:peer_ids}});
        peer_ids.length=0;
        if (st) clearInterval(st);
    } else if (event.data.type=="cargo"){
        if (cargo!=event.data.cargo && (!cargo || (cargo & 4)!=(event.data.cargo & 4))){
            caches.open("premium-cache").then(cache=>{
                cache.keys().then(requests => {
                    requests.forEach(request => {
                        const filename=request.url.split("/").splice(-1)[0];
                        const matches=filename.match(/^(\d+)(_\d+_i)/);
                        var isFilenamePremium=false;
                        if (matches) {
                            matches[1]=Number(matches[1]);
                            isFilenamePremium=(matches[1] & 1)==1;
                        };
                        if ((cargo & 4)==4 && !isFilenamePremium){
                            const premiumFilename=(matches[1] & ~1) + matches[2] + "_premium.webp"
                            cache.delete(premiumFilename);
                        } else if ((cargo & 4)==0 && isFilenamePremium){
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
    var isFile=false;
    var initialFilename=event.request.url.split("/").slice(-1)[0];
    const matches=initialFilename.match(/^(\d+)(_\d+_i).*\.webp\?.*/);
    if (matches){
        const filename=initialFilename.split("?").slice(0,-1).join("?");
        matches[1]=Number(matches[1]);
        isFile=(matches[1] & 1)==1;
        const bFilename=(matches[1] & ~1) + matches[2] + "_premium.webp";
        event.respondWith(caches.open("premium-cache").then(cache=>{
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
                return cache.match(bFilename).then(value=>{
                    if (value){
                        return value;
                    } else {
                        var newURL=event.request.url.split("/");
                        newURL[newURL.length-1]=bFilename;
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