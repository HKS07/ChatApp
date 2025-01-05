import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createConversation = async (req,res) => {
    const {primaryUserEmail,secondryUserEmail} = req.body;
    try {
        const [primaryUser,secondaryUser] = await prisma.profiles.findMany({
            where: {
                email: {
                    in: [primaryUserEmail,secondryUserEmail]
                }
            }
        });

        if(!primaryUser || !secondaryUser) return res.status(404).json({message: "Either or both the users doens't exists."});
        
        //create a conversation
        const newConversation = await prisma.conversations.create({
            data: {
                participants: [primaryUser.id, secondaryUser.id],
                lastMessage: "",
            }
        });
        
        //Add this conversation id to users profile
        await prisma.profiles.updateMany({
            where: {
                id: {
                    in: [primaryUser.id,secondaryUser.id]
                }
            },
            data: {
                conversationId:{
                    push: newConversation.id
                }
            }
        })
        
        

        return res.status(200).json({message: "new conversation created successfully", conversation: newConversation});
        
    } catch (error) {
        console.log("Error while createConversation", error);
        return res.status(500).json({message: "Error while createConversation", error: error});
    }
}

export const getConversationById = async (req,res) => {
    const {userId} = req.body;
    try {
        const user = await prisma.profiles.findUnique({
            where: {
                id: userId
            }
        });

        if(!user) return res.status(404).json({message: "user doens't exists"});

        const conversations = await prisma.conversations.findMany({
            where: {
                id : {
                    in: user.conversationId
                }
            }
        })

        return res.status(200).json({message: "conversation fetched successfully", conversations: conversations});
    } catch (error) {
        console.log("Error while getConversationById",error);
        return res.status(500).json({message: "Error while getConversationById", error: error});
    }
}