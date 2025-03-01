
export function getTokenVerify(): boolean {
  try {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
