import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const converse = async (message) => {
  try {
    const response = await api.post("/api", message);
    console.log(response);
    return response.data.fulfillmentText;
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
};
