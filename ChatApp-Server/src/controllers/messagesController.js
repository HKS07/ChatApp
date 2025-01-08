import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getMessagesByConversationId = async (req, res) => {
  const { conversationId } = req.body;
  if (!conversationId) {
    return res.status(400).json({ error: "Invalid or missing input data" });
  }
  try {
    const messages = await prisma.messages.findMany({
      where: {
        conversationId: conversationId,
      },
    });
    // console.log(messages);

    return res
      .status(200)
      .json({ message: "messages fetched successfully", messages: messages });
  } catch (error) {
    console.log("Error while getAll messsages", error);
    return res.status(400).json({
      message: "messages fetching unsuccessfull",
      error: error.message,
    });
  }
};

export const sendMessage = async (req, res) => {
  const { conversationId, senderId, content } = req.body;
  if (!conversationId || !senderId || !content) {
    console.log(conversationId, senderId, content);
    
    return res.status(400).json({ error: "Invalid or missing input data" });
  }
  try {
    const newMessage = await prisma.messages.create({
      data: {
        conversationId: conversationId,
        senderId: senderId,
        content: content,
      },
    });
    // console.log(newMessage);

    await prisma.conversations.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessage: content,
      },
    });

    return res
      .status(201)
      .json({ message: "new message create successfully", newMessage: newMessage });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error during message creation", error: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  const { messageId } = req.body;
  if (!messageId)
    return res.status(400).json({ error: "Invalid or missing input data" });
  try {
    await prisma.messages.delete({
      where: {
        id: messageId,
      },
    });

    return res.status(200).json({ message: "message deleted successfully." });
  } catch (error) {
    return res.status(500).json({
      message: "message deletion unsuccessfull.",
      error: error.message,
    });
  }
};

export const updateMessage = async (req, res) => {
  const { messageId, content } = req.body;
  if (!messageId || !content)
    return res.status(400).json({ message: "Invalid or missing input data" });
  try {
    const updatedMsg = await prisma.messages.update({
      where: {
        id: messageId,
      },
      data: {
        content: content,
      },
    });

    return res
      .status(200)
      .json({
        message: "message updated successfully",
        updatedMsg: updatedMsg,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "message updation was unsuccessfull" });
  }
};
