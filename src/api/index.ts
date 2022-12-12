import { getUser } from './getUser';
import { search } from './search';
import { signin } from "./signin";
import { signout } from "./signout";
import { signup } from './signup';

export const api = {
  signin,
  signup,
  signout,
  getUser,
  search
}