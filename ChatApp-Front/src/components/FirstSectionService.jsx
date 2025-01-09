const BASE_URL = import.meta.env.BASE_URL;

export const fetchUserData = async (data) => {
  const response = await fetch(`${BASE_URL}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to fetch user data");
  return response.json();
};

export const fetchRequestData = async (data) => {
  const response = await fetch(`${BASE_URL}/requests/getRequests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Failed to fetch requests data");
  return response.json();
};

export const fetchContactsData = async (data) => {
  const response = await fetch(
    `${BASE_URL}/contact/${data}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if(!response.ok) throw new Error("Failed to fetch contacts data");
};

export const fetchConversationData = async (data) => {
    const response = await fetch(
        `${BASE_URL}/conversation/getAll`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
    if(!response.ok) throw new Error("Failed to fetch conversation data");
    return response.json();
}
