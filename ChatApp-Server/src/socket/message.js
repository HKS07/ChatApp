import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();


export const setupMessageHandlers = (io, socket) => {
  socket.on("sendMessage", async (data) => {
    try {
      const { conversationId, senderId, content, recSocketId } = data;
    
      const newMessage = await prisma. messages.create({
        data: {
          conversationId: conversationId,
          senderId: senderId,
          content: content,
        }
      });
      
      await prisma.conversations.update({
        where: {
          id: conversationId,
        },
        data: {
          lastMessage: content,
        },
      });

      socket.emit("sendMessageAck",{success: true, message: "Message sent successfully", newMessage: newMessage});
      socket.to(recSocketId).emit("receiveMessage", {success: true, message: "Message sent successfully", newMessage: newMessage});

    } catch (error) {
      
    }
  });

  // socket.on("fetchMessages", (conversationId) => {
  //   const messages = []; 
  //   socket.emit("messagesFetched", messages);
  // });
};
