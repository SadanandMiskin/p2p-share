import http from 'http';
import WebSocket from 'ws';

const server = http.createServer();
const wss = new WebSocket.Server({ noServer: true });

interface Client{
ws: WebSocket
}
var clients: WebSocket[] = []

wss.on('connection', (ws) => {
   
  console.log('connected');
    clients.push(ws)
  ws.on('message' , (message)=>{
    sendMessage(message)
    
 })

ws.on('close' , (ws)=> {
    console.log('client disconnected')
})


function sendMessage(message: WebSocket.RawData) {
    clients.forEach((client)=>{
        client.send(message.toString())
    })
}
 
  
});


// upgrade the server because the client initially getting connected uses HTTP and 
// u convert http to websocket we use upgrade manually, but in socket.io it is configured internally 
// no need to explicitly include
server.on('upgrade', (req, socket, head) => {    
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit('connection', ws, req);
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});