import { User, UserID } from '../types/user';
import { Message, Messages, empty_messages, store_sent_message, store_received_message } from '../types/message';
import { HashFunction, ProbingHashtable, ph_empty, ph_insert, ph_lookup } from '../types/hashtables';

const hash_fun: HashFunction<UserID> = (key: UserID) => key;
const usr_messages: ProbingHashtable<UserID, Messages> = ph_empty(100, hash_fun);
const users: Array<User> = [];

export function create_user(userID: UserID, username: string, publicKey: string): void {
    const user: User = { userID, username, publicKey };
    users.push(user);
    ph_insert(usr_messages, userID, empty_messages());
}

export function get_usr_messages(userID: UserID): Messages {
    const result = ph_lookup(usr_messages, userID);
    return result !== undefined ? result : empty_messages();
}

export function insert_received_message(userID: UserID, message: Message): void {
    const users_messages = ph_lookup(usr_messages, userID);
    if (users_messages !== undefined) {
        store_received_message(users_messages, message);
    } else {}
}

export function insert_sent_message(userID: UserID, message: Message): void {
    const users_messages = ph_lookup(usr_messages, userID);
    if (users_messages !== undefined) {
        store_sent_message(users_messages, message);
    } else {}
}