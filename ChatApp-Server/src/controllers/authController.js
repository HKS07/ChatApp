import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const login = async (req, res) => {
  const { oAuthSub, username, profileUrl } = req.body;
  try {
    
    let user = await prisma.profiles.findUnique({
      where: {
        oAuthSub: oAuthSub,
      },
    });
    //create new user
    if (!user) {
      user = await prisma.profiles.create({
        data: {
          oAuthSub,
          username,
          profileUrl,
        },
      });
    }
    
    res.status(200).json({ user: user });
  } catch (error) {
    console.log("Getting error while loggin in.", error);
    res.status(400).json({message: "Getting error while log in.", error: error });
  }
};
