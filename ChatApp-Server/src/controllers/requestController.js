import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const sendRequest = async (req, res) => {
  try {
    const { senderEmail, receiverEmail } = req.body;

    const senderRequest = await prisma.request.findFirst({
      where: {
        senderEmail: senderEmail,
        receiverEmail: receiverEmail,
      },
    });

    const receiverRequest = await prisma.request.findFirst({
      where: {
        senderEmail: receiverEmail,
        receiverEmail: senderEmail,
      },
    });

    if (senderRequest) {
      return res
        .status(409)
        .json({ message: "Request already sent from current sender" });
    }
    if (receiverRequest) {
      return res
        .status(409)
        .json({ message: "Request already sent from current receiver" });
    }
    const receiverProfile = await prisma.profiles.findUnique({
      where: {
        email: receiverEmail,
      },
    });

    if (!receiverEmail)
      return res.status(404).json({ message: "No such user exists." });

    const senderProfile = await prisma.profiles.findUnique({
      where: {
        email: senderEmail,
      },
    });

    const newRequest = await prisma.request.create({
      data: {
        senderEmail: senderEmail,
        receiverEmail: receiverEmail,
      },
    });

    //Add request id to both sender and receiver
    //sender profile
    await prisma.profiles.update({
      where: {
        id: senderProfile.id,
      },
      data: {
        requests: {
          push: newRequest.id,
        },
      },
    });
    //receiver profile
    await prisma.profiles.update({
      where: {
        id: receiverProfile.id,
      },
      data: {
        requests: {
          push: newRequest.id,
        },
      },
    });

    return res.status(201);
  } catch (error) {
    console.log("Error while sending request: ", error);
    return res
      .status(400)
      .json({ message: "couldn't send request for adding user", error: error });
  }
};

export const getAllRequests = async (req, res) => {
  const { userId } = req.body;
  try {
    const profile = await prisma.profiles.findUnique({
      where: {
        id: userId,
      },
      select: {
        requests: true,
      },
    });

    if (!profile) {
      return res.status(404).json({ message: "user doesn't exists" });
    }

    const { requests } = profile;

    if (!requests || requests.length == 0)
      return res.status(404).json({ message: "no request exist" });

    const matchingRequests = await prisma.request.findMany({
      where: {
        id: {
          in: requests,
        },
      },
    });

    return res
      .status(200)
      .json({ message: "succefully send requests", request: matchingRequests });
  } catch (error) {
    console.log("Error while sending request: ", error);
    return res
      .status(400)
      .json({ message: "couldn't send request for adding user", error: error });
  }
};

export const updateStatus = async (req, res) => {
  const { status, reqId } = req.body;
  try {
    const request = await prisma.request.findUnique({
      where: {
        id: reqId,
      },
    });

    if (!request) {
      return res.status(404).json({ message: "no such request exists" });
    }

    await prisma.request.update({
      where: {
        id: reqId,
      },
      data: {
        status: status,
      },
    });

    return res
      .status(200)
      .json({ message: "request status updated successfully" });
  } catch (error) {
    console.log("error during updating status", updateStatus);
    return res.status(400).json({ error: error });
  }
};
