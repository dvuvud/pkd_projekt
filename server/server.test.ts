import { message } from "./types/message";
import { post_message, get_message, find_chat } from "./endpoints/message";
import { create_user, find_user } from "./endpoints/user";

const random_user = { username: "random_user", publicKey: "random_users_key" };
const random_guy = { username: "random_guy", publicKey: "random_guys_key" };
const random_message = message("random string", "random string", random_user.username, random_guy.username);
post_message(random_message);

test("finding and creating: USERS", () => {
    expect(find_user(create_user(random_user).username)).toBe(random_user);
    expect(find_user(create_user(random_guy).username)).toBe(random_guy);
});

test("finding and creating: CHATS", () => {
    expect(find_chat(random_user.username,
                     random_guy.username)?.messages[0].content_recipient).toBe(random_message.content_recipient);
});

test("posting and getting messages", () => {
    expect(((get_message(random_user.username,
                         random_guy.username, false))[0].content_recipient)).toBe(random_message.content_recipient);
});