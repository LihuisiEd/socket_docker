const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado');

  socket.on('message', (data) => {
    console.log('Mensaje recibido:', data);
    io.emit('message', data); // Envía el mensaje a todos los clientes conectados
  });

  socket.on('disconnect', () => {
    console.log('Un cliente se ha desconectado');
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
