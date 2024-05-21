const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

// WebSocket connection handling
io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Endpoint for admin to post updates
app.post('/api/update', (req, res) => {
    const update = req.body;
    update.timestamp = new Date().toISOString(); // Add a timestamp to the update

    console.log('Broadcasting update:', update); // Log the update

    // Broadcast update to all connected clients
    io.emit('new-update', update);

    res.status(200).send({ message: 'Update broadcasted' });
});

// Serve the admin HTML file
app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/public/admin.html');
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
