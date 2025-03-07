import { User, Username } from '../../types/user';
import { Message, Messages, empty_messages, store_sent_message, store_received_message } from '../../types/message';
import { HashFunction, ProbingHashtable, ph_empty, ph_insert, ph_lookup } from '../../types/hashtables';

const hash_fun: HashFunction<Username> = (key: string) => key.length;
// A hash table storing a users messages by their userID
const usr_messages: ProbingHashtable<Username, Messages> = ph_empty(100, hash_fun);
// A hash table storing all users by userID
const users: ProbingHashtable<Username, User> = ph_empty(100, hash_fun);

let number_of_users: number = 0;

/**
 * Constructs a user
 * @param { User } user - the user to be created
 * @returns { User } the user just created
 */
export function create_user(user: User): User {
    ph_insert(users, user.username, user);
    ph_insert(usr_messages, user.username, empty_messages());
    number_of_users = number_of_users + 1;
    return user;
}

export function find_user(username: Username): User | null {
    const user = ph_lookup(users, username);
    
    return user === undefined ? null : user;
}

export function get_number_of_users(): number {
    return number_of_users;
}

/**
 * Returns the sent- and received messages of a user
 * @param { User } user - the user to get messages from
 * @returns { Messages } of the given user.
 * If user is not found an empty messages object will be returned
 */
export function get_usr_messages(user: Username): Messages {
    const result = ph_lookup(usr_messages, user);
    return result !== undefined ? result : empty_messages();
}

/**
 * Inserts a message into a users received messages
 * @param { Username } username - the user that receives the message
 * @returns { Messages } of the given user
 */
export function insert_received_message(username: Username, message: Message): void {
    const users_messages = ph_lookup(usr_messages, username);
    if (users_messages !== undefined) {
        store_received_message(users_messages, message);
    } else {}
}

/**
 * Inserts a message into a users sent messages
 * @param { Username } username - the user that sent the message
 * @returns { Messages } of the given user
 */
export function insert_sent_message(username: Username, message: Message): void {
    const users_messages = ph_lookup(usr_messages, username);
    if (users_messages !== undefined) {
        store_sent_message(users_messages, message);
    } else {}
}