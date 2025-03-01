import axios from "axios";
const HOST = import.meta.env.VITE_BACKEND_URI;

export async function DeleteRequestHandler(endpoint: string, id: string) {
  return await axios.delete(`${HOST}/${endpoint}/${id}`, {
    headers: {
      "auth-token": localStorage.getItem("token") || "",
    },
  });
}
