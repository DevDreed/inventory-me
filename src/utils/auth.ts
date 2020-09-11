import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

export function isAuthenticated() {
  const token = Cookies.get("token");
  try {
    if (token) {
      const { exp } = jwt_decode(token);
      if (Date.now() >= exp * 1000) {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
  return true;
}
