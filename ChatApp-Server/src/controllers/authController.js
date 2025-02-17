import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const loginOAuth = async (req, res) => {
  const { oAuthSub, username, profileUrl, email } = req.body;
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
          email,
        },
      });
    }
    
    res.status(200).json({ user: user });
  } catch (error) {
    console.log("Getting error while loggin in.", error);
    res.status(400).json({message: "Getting error while log in.", error: error });
  }
};

export const login = async (req, res) => {
  const {type, email, password, oAuthSub, userName, profileUrl} = req.body;
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
          userName,
          profileUrl,
          email,
        },
      });
    }
  } catch (error) {
    console.log("Getting error while global loggin in",error);
    res.status(400).json({message:"Getting error while global log in", error: error})
  }
}

export const guestLogin = async (req, res) => {
  const {type, email, password, oAuthSub, userName, profileUrl} = req.body;
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
          userName,
          profileUrl,
          email,
        },
      });
    }
  } catch (error) {
    console.log("Getting error while global loggin in",error);
    res.status(400).json({message:"Getting error while global log in", error: error})
  }
}

export const globalSignUp = async (req,res) => {
  const {} = req.body;
  try {
    
  } catch (error) {
    console.log("Getting error while global signup",error);
    res.status(400).json({message:"Getting error while global signup", error: error})
  }
}
