const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllContacts = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await prisma.profiles.findUnique({
      where: {
        id: userId,
      },
    });
    
    res.status(200).json({ contacts: user.contacts });
  } catch (error) {
    console.log("error fectching users all contacts", error);
    res.status(400).send("Bad request");
  }
};

exports.getContact = (req, res) => {};

exports.addContact = async (req, res) => {
  const { contactId, userId } = req.body;
  try {
    await prisma.profiles.update({
      where: {
        id: userId,
      },
      data: {
        contacts: {
          push: contactId,
        },
      },
    });
    res.status(200).send("contact added successfully.");
  } catch (error) {
    console.log("error occured during adding contact to usser: ", error);

    res.status(500).send("An error occured during adding new contact to user");
  }
};

exports.deleteContact = async (req, res) => {
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
    console.log(updatedContacts);

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

exports.updateContact = (req, res) => {};
