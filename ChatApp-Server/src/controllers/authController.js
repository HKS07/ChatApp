import { PrismaClient } from "@prisma/client";
import { generateTokens } from "../utils/jsonWebToken";
import bcrypt from "bcrypt";
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
          type : "oAuth",
        },
      });
    }

    const [accessToken, refreshToken] = generateTokens({
      id: user.id,
      email: user.email,
      name: user.username,
      access: user.access,
    });
    return res
      .status(200)
      .json({ message: "login successfull", accessToken, refreshToken });
  } catch (error) {
    console.log("Getting error while loggin in.", error);
    return res
      .status(400)
      .json({ message: "Getting error while oAuth log in.", error: error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await prisma.profiles.findUnique({
      where: {
        email: email,
      },
    });
    //create new user
    if (!user) {
      res.status(404).json({ message: "user doesn't exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    const [accessToken, refreshToken] = generateTokens({
      id: user.id,
      email: user.email,
      userName: user.username,
      access: user.access,
    });
    return res
      .status(200)
      .json({ message: "login successfull", accessToken, refreshToken });
  } catch (error) {
    console.log("Getting error while login", error);
    return res
      .status(400)
      .json({ message: "Getting error while login", error: error });
  }
};

export const guestLogin = async (req, res) => {
  try {
    var userName = "";
    for(let i = 0; i < 4; ++i) 
      userName += String.fromCharCode(Math.floor(Math.random()*26 + 65));

    const randomNo = Math.floor(Math.random() * 10000) + 1;
    const randomEmail = `${userName}_${randomNo}@gmail.com`;
    //create new user
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 15 * 60 * 1000);
      user = await prisma.profiles.create({
        data: {
          userName,
          email: randomEmail,
          type: "guest",
          expiresAt: expiresAt
        },
      });
    const [accessToken, refreshToken] = generateTokens({id: user.id, user: userName, email: randomEmail});
    return res
      .status(200)
      .json({ message: "login successfull", accessToken, refreshToken });
  } catch (error) {
    console.log("Getting error while guest log in.", error);
    return res
      .status(400)
      .json({ message: "Getting error while guest log in", error: error });
  }
};




export const signUp = async (req,res) => {
  const {email, password, username} = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.profiles.create({
      data: {
        username,
        email,
        password: hashedPassword,
      }
    });

    if(!user)
    {
      return res.status(400).json({success: false, message: "Error during signup"});
    }

    return res.status(201).json({success: true, message:"User signup successfull."})
  } catch (error) {
    console.log("Getting error while sign up.", error);
    return res
      .status(400)
      .json({ message: "Getting error while sign up.", error: error });
  }
}