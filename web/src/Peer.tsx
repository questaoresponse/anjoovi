// import React, { useEffect, useState } from 'react';
// import Peer, { DataConnection } from 'peerjs';

// const PeerComponent = () => {
//   const [peer, setPeer] = useState<Peer | null>(null);
//   const [conn, setConn] = useState<DataConnection | null>(null);
//   const [remotePeerId, setRemotePeerId] = useState('');
//   const [message, setMessage] = useState('');
//   const [receivedMessages, setReceivedMessages] = useState<any[]>([]);

//   useEffect(() => {
//     // Inicializa o Peer com um ID único
//     const newPeer:Peer = new Peer();
//     newPeer.on('open', id => {
//       console.log('Meu ID:', id);
//       setPeer(newPeer);
//     });

//     newPeer.on('connection', (connection:any) => {
//       connection.on('data', (data:any) => {
//         console.log('Recebido:', data);
//         setReceivedMessages(prev => [...prev, data]);
//       });
//       setConn(connection);
//     });

//     return () => {
//       newPeer.destroy();
//     };
//   }, []);

//   const connectToPeer = () => {
//     const newConn = peer!.connect(remotePeerId);

//     newConn.on('open', () => {
//       console.log('Conectado com sucesso ao peer remoto!');
//       setConn(newConn);
//     });

//     newConn.on('data', data => {
//       console.log('Recebido:', data);
//       setReceivedMessages(prev => [...prev, data]);
//     });

//     newConn.on('close', () => {
//       console.log('Conexão fechada pelo peer remoto.');
//     });

//     newConn.on('error', (err:any) => {
//       console.error('Erro na conexão:', err);
//     });
//   };

//   const sendMessage = () => {
//     if (conn && message.trim() !== '') {
//       conn.send(message);
//       setReceivedMessages(prev => [...prev, `Eu: ${message}`]);
//       setMessage('');
//     }
//   };

//   return (
//     <div>
//       <h2>PeerJS Exemplo com React</h2>
//       {peer && <p>Meu ID: {peer.id}</p>}
//       <div>
//         <input
//           type="text"
//           value={remotePeerId}
//           onChange={e => setRemotePeerId(e.target.value)}
//           placeholder="ID do Peer Remoto"
//         />
//         <button onClick={connectToPeer}>Conectar</button>
//       </div>
//       <div>
//         <input
//           type="text"
//           value={message}
//           onChange={e => setMessage(e.target.value)}
//           placeholder="Digite sua mensagem"
//         />
//         <button onClick={sendMessage}>Enviar</button>
//       </div>
//       <div>
//         <h3>Mensagens Recebidas:</h3>
//         <ul>
//           {receivedMessages.map((msg, index) => (
//             <li key={index}>{msg}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default PeerComponent;
