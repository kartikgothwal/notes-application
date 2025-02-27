import toast from "react-hot-toast";

export function ToasterSuccess(message: string) {
  toast.success(message);
}
export function ToasterError(message: string) {
  toast.error(message);
}
