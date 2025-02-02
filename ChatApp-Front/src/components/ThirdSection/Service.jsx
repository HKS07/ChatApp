const BASE_URL = "http://localhost:8080";

export const messageSentCall = async (conversationId, senderId, content) => {
  try {
    const response = await fetch(`${BASE_URL}/message/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conversationId: conversationId,
        senderId: senderId,
        content: content,
      }),
    });
    if (!response.ok) throw new Error("Failed to send maessage");
    return await response.json();
  } catch (error) {
    console.log("Error during sending message", error);
    throw error;
  }
};
