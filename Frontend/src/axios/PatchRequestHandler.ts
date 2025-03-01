import axios from "axios";
const HOST = import.meta.env.VITE_BACKEND_URI;

export async function PatchRequestHandler(endpoint: string, payload: unknown) {
  return await axios.patch(`${HOST}/${endpoint}`, {
    payload,
  });
}
