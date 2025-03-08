import { 
    User, Username 
} from '../../types/user';
import { 
    Message, Chat, chat 
} from '../../types/message';
import { 
    HashFunction, ProbingHashtable, ph_delete,
    ph_empty, ph_insert, ph_lookup 
} from '../../types/hashtables';

const hash_fun: HashFunction<Username> = (key: string) => key.length;
// Stores all chats across all users
const chats: Array<Chat> = [];
// A hash table storing all users by userID
const users: ProbingHashtable<Username, User> = ph_empty(100, hash_fun);

/**
 * Constructs a user
 * @param { User } user - the user to be created
 * @returns { User } the user just created
 */
export function create_user(user: User): User {
    ph_insert(users, user.username, user);
    ph_insert(user_chats_table, user.username, []);
    return user;
}

/**
 * Returns the user with a given username
 * @param { Username } username - the user to get
 * @returns { User | null } the user object of the user
 * If user is not found null will be returned
 */
export function find_user(username: Username): User | null {
    const user = ph_lookup(users, username);
    return user === undefined ? null : user;
}

/**
 * Returns the chat between two users
 * @param { Username } user1
 * @param { Username } user2
 * @returns { Chat | null } between the two users
 */
export function get_chat(user1: Username, user2: Username): Chat | null {
    chats.forEach(chat_object => {
        if (chat_object.user1 === user1) {
            return chat_object;
        } else {}
    });
    return null;
}

/**
 * Filters for all the chats one user is included in
 * @param { Username } user - the logged in user
 * @returns { Array<Chat> } between the two users
 */
export function filter_chats(user: Username): Array<Chat> {
    const result = [];
    chats.forEach(chat_object => {
        if (chat_object.user1 === user || chat_object.user2 === user) {
            result.push(chat_object);
        } else {}
    });
    return result;
}