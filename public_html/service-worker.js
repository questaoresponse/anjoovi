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
    // message.ports[0].onmessage=(event)=>{
        // console.log("recebido",event.data);
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
    // }
    // event.source.postMessage({});

    // event.source.postMessage({type:"worker",message:"aian"});
    
    // // Enviar uma mensagem de volta para a thread principal
    // event.source.postMessage({ message: 'Message received by Service Worker' });
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
    // setInterval(()=>{

    // },[]);
    // console.log("install")
// Força a instalação imediata, ignorando qualquer versão anterior
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
    // console.log("activate");
    // Limpeza opcional de caches antigos ou outras tarefas de ativação
    // event.waitUntil(
    //     caches.keys().then((cacheNames) => {
    //         return Promise.all(
    //             cacheNames.map((cacheName) => {
    //             // if (/* condição para excluir cache antigo */) {
    //                 return caches.delete(cacheName);
    //             // }
    //             })
    //         );
    //     })
    // );
});
  
// Exemplo de cache simples para arquivos
// self.addEventListener('fetch', event => {
//     event.respondWith(
//         caches.match(event.request).then(response => {
//         return response || fetch(event.request);
//         })
//     );
// });

// const isLocalhost = Boolean(
// window.location.hostname === 'localhost' ||
//     window.location.hostname === '[::1]' ||
//     window.location.hostname.match(
//     /^127(?:\.\d+){3}$/
//     )
// );



// function registerValidSW(swUrl, config) {
//     console.log("ai");
// navigator.serviceWorker
//     .register(swUrl)
//     .then(registration => {
//         console.log("aian");
//     registration.onupdatefound = () => {
//         const installingWorker = registration.installing;
//         if (installingWorker == null) {
//         return;
//         }
//         installingWorker.onstatechange = () => {
//         if (installingWorker.state === 'installed') {
//             if (navigator.serviceWorker.controller) {
//             console.log(
//                 'New content is available and will be used when all tabs for this page are closed.'
//             );
//             if (config && config.onUpdate) {
//                 config.onUpdate(registration);
//             }
//             } else {
//             console.log('Content is cached for offline use.');
//             if (config && config.onSuccess) {
//                 config.onSuccess(registration);
//             }
//             }
//         }
//         };
//     };
//     })
//     .catch(error => {
//     console.error('Error during service worker registration:', error);
//     });
// }

// function checkValidServiceWorker(swUrl, config) {
// fetch(swUrl, {
//     headers: { 'Service-Worker': 'script' },
// })
//     .then(response => {
//     if (
//         response.status === 404 ||
//         response.headers.get('content-type').indexOf('javascript') === -1
//     ) {
//         navigator.serviceWorker.ready.then(registration => {
//         registration.unregister().then(() => {
//             window.location.reload();
//         });
//         });
//     } else {
//         registerValidSW(swUrl, config);
//     }
//     })
//     .catch(() => {
//     console.log(
//         'No internet connection found. App is running in offline mode.'
//     );
//     });
// }

// export function unregister() {
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.ready
//     .then(registration => {
//         registration.unregister();
//     })
//     .catch(error => {
//         console.error(error.message);
//     });
// }
// }