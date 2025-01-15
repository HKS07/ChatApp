const BASE_URL = "http://localhost:8080";

export const fetchUserData = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to fetch user data");
    return await response.json();
  } catch (error) {
    console.error("Error in fetchUserData:", error.message);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

export const fetchRequestData = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/requests/getRequests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to fetch requests data");
    return await response.json();
  } catch (error) {
    console.error("Error in fetchRequestData:", error.message);
    throw error;
  }
};

export const fetchContactsData = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/contact/${data}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to fetch contacts data");
    return await response.json(); // Ensure response JSON is returned
  } catch (error) {
    console.error("Error in fetchContactsData:", error.message);
    throw error;
  }
};

export const fetchConversationData = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/conversation/getAll`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to fetch conversation data");
    return await response.json();
  } catch (error) {
    console.error("Error in fetchConversationData:", error.message);
    throw error;
  }
};
