import {io} from 'socket.io-client';

const BASE_URL = "http://localhost:8080";
let socket = null;

export const createSocketConnection = (email, oAuthSub, contacts) => {
    socket = io(BASE_URL, {
        query: {
            email: email,
            oAuthSub: oAuthSub,
            contacts: contacts,
        }
    });
    console.log(socket);
    
    socket.on('connect', () => {
        console.log("Connect to socket server");
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