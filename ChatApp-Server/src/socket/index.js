import { setupMessageHandlers } from "./message.js";

export const rootSocketHandlers = (io) => {
    io.on("connection", (socket) => {
        console.log(`User Connected: ${socket.id}`);
        
        setupMessageHandlers(io,socket);

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        })
    })
}