// public/service-worker.js

// Função para escutar mensagens vindas da thread principal
var server="";
var tipo="";
const peer_ids=[];
const clients=[];
var st;
const enviar=(newPeer,deletePeer)=>{
    // axios.post(server+"/view",{type:"infos",tipo:tipo,modify:peer_ids,new:newPeer,delete:deletePeer},{
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    // })
    clients[0].postMessage({origin:"worker",type:"send",url:server+"/view",data:{type:"infos",tipo:tipo,modify:peer_ids,newPeer,deletePeer}})
};
self.addEventListener('message', message => {
    message.ports[0].onmessage=(event)=>{
        // console.log("recebido",event.data);
        if (event.data.type=="data"){
            server=event.data.server;
            tipo=event.data.tipo;
        } else if (event.data.type=="newPeer"){
            clients.push(message.ports[0]);
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
            clients.splice(clients.findIndex(client=>client==message.ports[0]),1);
            peer_ids.splice(peer_ids.findIndex(peer_id=>peer_id==event.data.peer_id),1);
            if (st) clearInterval(st);
            st=setInterval(()=>{
                enviar(undefined,undefined);
            },9000);
            enviar(undefined,event.data.peer_id);
        } else {
            // console.log("foie");
        }
    }
    // event.source.postMessage({});

    // event.source.postMessage({type:"worker",message:"aian"});
    
    // // Enviar uma mensagem de volta para a thread principal
    // event.source.postMessage({ message: 'Message received by Service Worker' });
});
self.addEventListener('fetch', (event) => {
    console.log("foie");
});
self.addEventListener('install', (event) => {
    // setInterval(()=>{

    // },[]);
    // console.log("install")
// Força a instalação imediata, ignorando qualquer versão anterior
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log("activate");
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