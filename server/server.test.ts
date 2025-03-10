import { message } from "../types/message";
import { post_message, get_message, find_chat } from "./endpoints/message";
import { create_user } from "./endpoints/user";

const random_user = { username: "random_user", publicKey: "random_users_key" };
const random_guy = { username: "random_guy", publicKey: "random_guys_key" };
const random_message = message("random string", "random string", random_user.username, random_guy.username);

