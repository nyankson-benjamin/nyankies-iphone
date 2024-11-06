import Cookies from "cookies-ts";
import { jwtDecode } from "jwt-decode";
import { User } from "../store/AuthStore";
const cookies = new Cookies();
const TOKEN = "AUTH_TOKEN";
export function setToken(
  token: string,
) {
  if (token) {
    const time = Number(Date.now());
    const decodeToken: User = jwtDecode(token);
    const expires =   Number(decodeToken.exp)*1000;
    const expiringTime = Math.floor((expires-time)/1000);
    if (expiringTime > 0) {
      cookies.set(TOKEN, token, { expires: expiringTime});
    }
  }
}
export async function logout() {
  cookies.set(TOKEN, null, { expires: -60 * 60 * 8 });
}
export function getToken() {
  return cookies.get(TOKEN);
}

export function isLoggedIn() {
  return !!getToken();

}
export function getUserid(): string {
  const user: { id: string } = jwtDecode(getToken() as string);
  return user.id;
}



export function decodeToken() {
  const decoded: User = jwtDecode(getToken() as string);
  return decoded;
}
