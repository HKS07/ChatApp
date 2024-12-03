import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getProfile = async (req, res) => {
  const {oAuthSub} = req.params;
  try {
    const user = await prisma.profiles.findUnique({
      where: {
        oAuthSub: oAuthSub
      }
    })

    if(!user)
    {
      res.status(404).json({message: "user doesn't exist"});
    }
    res.status(200).json({message: "successfully fetched user", user: user});
  } catch (error) {
    console.log('Error during fetching profile: ',error);
    res.send(400).json({message: "Error during fetching profile", error: error})
    
  }
};

export const createProfile = async (req, res) => {
  const { username, status } = req.body;
  try {
    if (!username && !status)
      res.status(400).send("username or status not sent");

    const newUser = await prisma.profiles.create({
      data: {
        username,
        status,
      },
    });
    res.status(201).send("Successfully created new profile.");
  } catch (error) {
    console.log("error from addProfile: ", error);
    res
      .status(400)
      .json({ error: "An error occured during adding the new profile." });
  }
};

export const updateProfile = (req, res) => {};
