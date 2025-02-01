const BASE_URL = "http://localhost:8080";

export const sendRequestCall = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/requests/sendRequest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to send request");
    return await response.json();
  } catch (error) {
    console.error("Error in sendRequestCall:", error.message);
    throw error;
  }
};

export const updateStatusCall = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/requests/updateStatus`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update request status");
    return await response.json();
  } catch (error) {
    console.error("Error in updateStatusCall:", error.message);
    throw error;
  }
};

export const addNewContactCall = async (data) => {
  try {
    console.log("addNewContactCall", data);
    
    const response = await fetch(`${BASE_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to add new contact");
    return await response.json();
  } catch (error) {
    console.error("Error in addNewContactCall:", error.message);
    throw error;
  }
};

export const createConversationCall = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/conversation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to add new conversation");
    return await response.json();
  } catch (error) {
    console.error("Error in createConversationCall:", error.message);
    throw error;
  }
};
