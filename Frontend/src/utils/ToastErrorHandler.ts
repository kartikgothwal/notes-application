import axios from "axios";
import { ToasterError } from "./toast";

export default function ToastErrorHandler(error: unknown) {
  if (axios.isAxiosError(error) && error.response) {
    ToasterError(error.response.data.message);
  } else if (error instanceof Error) {
    ToasterError(error.message);
  } else {
    ToasterError("An unknown error occurred");
  }
}
