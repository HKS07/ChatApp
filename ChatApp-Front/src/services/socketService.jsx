import {io} from 'socket.io-client';

const BASE_URL = "http://localhost:8080";
let socket = null;

export const initializeSocket  = (email, oAuthSub, contacts,id) => {
    socket = io(BASE_URL, {
        query: {
            email: email,
            oAuthSub: oAuthSub,
            contacts: contacts,
            dbId: id
        }
    });
    
    
    socket.on('connect', () => {
        console.log("Connect to socket server");
        console.log('socket id:', socket.id);
    });

    socket.on('disconnect', () => {
        console.log("Disconnected from socket server.");
    });

    return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
    if(socket) {
        socket.disconnect();
        socket = null;
    }
};