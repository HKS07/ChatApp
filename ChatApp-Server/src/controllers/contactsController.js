import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllContacts = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await prisma.profiles.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) return res.status(404).json({ message: "no user exists" });
    res
      .status(200)
      .json({ contacts: user.contacts.length === 0 ? [] : user.contacts });
  } catch (error) {
    console.log("error fectching users all contacts", error);
    res.status(400).send("Bad request");
  }
};

export const getContact = (req, res) => {};



export const addContact = async (req, res) => {
  const { userAEmailId, userBEmailId } = req.body;
  
  try {
    const userA = await prisma.profiles.findUnique({where: {email: userAEmailId}});
    const userB = await prisma.profiles.findUnique({where: {email: userBEmailId}});

    if(!userA || !userB)
    {
      return res.status(404).json({message:"user doesn't exists"});
    }
    await prisma.profiles.update({
      where: {
        email: userA.email,
      },
      data: {
        contacts: {
          push: userB.id,
        },
      },
    });
    await prisma.profiles.update({
      where: {
        email: userB.email,
      },
      data: {
        contacts: {
          push: userA.id,
        },
      },
    });
    return res.status(200).send("contact added successfully.");
  } catch (error) {
    console.log("error occured during adding contact to usser: ", error);

    return res
      .status(500)
      .send("An error occured during adding new contact to user");
  }
};

export const deleteContact = async (req, res) => {
  const { userId, contactId } = req.body;
  try {
    const user = await prisma.profiles.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      res.status(404).json({ message: "User doenst exist" });
      return;
    }

    const updatedContacts = user.contacts.filter((curId) => curId != contactId);

    await prisma.profiles.update({
      where: {
        id: userId, 
      },
      data: {
        contacts: {
          set: updatedContacts,
        },
      },
    });

    res.status(200).json({ message: "successfully deleted user contact" });
  } catch (error) {
    console.log("error deleting the user", error);
    res
      .status(500)
      .json({ message: "not able to delete the contact from user." });
  }
};

export const updateContact = (req, res) => {};
