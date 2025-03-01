import axios from "axios";
const HOST = import.meta.env.VITE_BACKEND_URI;

export async function PostRequestHandler(
  endpoint: string,
  payload: unknown,
  token?: string
) {
  if (token) {
    return await axios.post(`${HOST}/${endpoint}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "auth-token": token,
      },
    });
  } else {
    return await axios.post(`${HOST}/${endpoint}`, payload);
  }
}
