import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import router from "./routes/api.js";

dotenv.config();

const corsOptions = { origin: '*' };

const app = express(cors(corsOptions));

// For parsing application/json
app.use(express.json());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// static files from public
app.use(express.static('public'));

connectDB();

const io = new Server(process.env.SOCKET_PORT || 3002, { cors: { origin: '*' } });

io.of('room').on("connection", (socket) => {
    console.log('connected');

    socket.on('join:room' , ({ room, user }) => {

        console.table({
            'room-id': room,
            'used-id': user.id,
            'user-name': user.name,
        });

        socket.join(room);

        socket.to(room).emit('user-connected', user);

        socket.on('host:mute-user', (id) => {
            socket.to(room).emit('host:muted-user', id);
        });

        socket.on('user-toggle-audio', (id) => {
            socket.to(room).emit('user-toggle-audio', id);
        });
  
        socket.on('user-toggle-video', (id) => {
            socket.to(room).emit('user-toggle-video', id);
        });

        socket.on('user:share-screen', (username) => {
            socket.to(room).emit('user:shared-screen', username);
        });
  
        socket.on('user:stop-share-screen', () => {
            socket.to(room).emit('user:stopped-screen-share', user.name);
        });

        socket.on('chat:post', (message) => {
            socket.to(room).emit('chat:get', message);
        });

        socket.on('disconnect', (id) => {
            socket.leave(room);

            socket.to(room).emit('user:left', id);
        });
    });
});

app.use(router);

app.listen(process.env.PORT || 3001);

export default app;
