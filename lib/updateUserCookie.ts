import Cookies from "js-cookie";
import authService from "@/services/authService";

export default async function updateUserCookie() {
  // remove user cookies
  Cookies.remove("user");

  // get token from cookies
  const token = Cookies.get("token");

  if (!token) {
    return;
  }

  // get user from database
  const user = await authService.getUser(token);

  // set user to cookies
  Cookies.set("user", JSON.stringify(user));
}
