export const setupMessageHandlers = (io, socket) => {
  socket.on("sendMessage", (data) => {
    const { to, from, content } = data;
    io.to(to).emit("newMessage", { from, content });
  });

  socket.on("fetchMessages", (conversationId) => {
    const messages = []; 
    socket.emit("messagesFetched", messages);
  });
};
