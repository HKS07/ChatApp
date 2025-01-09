const BASE_URL = import.meta.env.Base_URL;

export const sendRequest = async (data) => {
    try {
        const response = await fetch(
            `${BASE_URL}/requests/sendRequest`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            }
          );
        if(!response.ok) {
            const errorDetails = await response.json();
            throw new Error(errorDetails.message || "Error while sending request");
        }
        return response.json();
    } catch (error) {
        console.error("Error in sendRequest",error.message);
        throw error;
    }
}

export const updateStatus = async (data) => {
    try {
        const response = await fetch(
            `${BASE_URL}/requests/updateStatus`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            }
          );
        
        if(!response.ok) {
            const errorDetail = await response.json();
            throw new Error(errorDetail || "Error while updating status");
        }
        return response.json();
    } catch (error) {
        console.error("Error in sendRequest",error.message);
        throw error;
    }
}