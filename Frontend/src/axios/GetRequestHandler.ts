import axios from "axios";
const HOST = import.meta.env.VITE_BACKEND_URI;

export async function GetRequestHandler(endpoint: string) {
  const response = await axios.get(
    `${HOST}/${endpoint}`,
    {
      headers: {
        "auth-token": localStorage.getItem("token") || "",
      },
    }
  );
  return response;
}
