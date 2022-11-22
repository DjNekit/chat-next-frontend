import { getUser } from './getUser';
import { login } from "./login";
import { logout } from "./logout";
import { signup } from './signup';

export const api = {
  login,
  signup,
  logout,
  getUser
}