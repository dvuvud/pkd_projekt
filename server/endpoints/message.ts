import { Username } from '../../types/user';
import { Chat, Message, chat } from '../../types/message';
import { HashFunction, ProbingHashtable, ph_empty, ph_insert, ph_lookup } from '../../types/hashtables';
import { simpleHash } from './user';

// Stores all chats across all users
const chats: Array<Chat> = [];

const hash_fun: HashFunction<string> = (key: string) => simpleHash(key);
// A hash table storing all users by userID
const user_chats: ProbingHashtable<string, Chat> = ph_empty(1000, hash_fun);


/**
 * Receives a message from post and inserts said message
 * into the chat between the users
 * @param { Message } message
 */
export function post_message(message: Message): void {
    let currentChat = find_chat(message.sender, message.recipient);
    const currentDate = new Date();
    message.timestamp = currentDate.getHours().toString() + ":" +
                        currentDate.getMinutes().toString() + ":" +
                        currentDate.getSeconds().toString();
    if(currentChat === null) {
        currentChat = chat(message.sender, message.recipient, []);
        ph_insert(user_chats, message.sender + message.recipient, currentChat);
    }
    
    currentChat.messages.push(message);
    console.log(currentChat);
}

/**
 * Receives a message from post
 * @param { Username } user1 - the user making the request
 * @param { Username } user2 - the user being chatted with
 * @returns { Array<Message> } - returns an array of the received messages of the given user
 */
export function get_message(user1: Username, user2: Username): Array<Message> {
    let currentChat = find_chat(user1, user2);

    if (currentChat === null) {
        currentChat = chat(user1, user2, []);
    } else {}

    const result: Array<Message> = [];

    currentChat.messages.forEach(message => {
        if (message.recipient === user1 && message.loaded_user1 === false) {
            message.loaded_user1 = true;
            result.push(message);
        } else if (message.recipient === user2 && message.loaded_user2 === false){
            message.loaded_user2 = true;
            result.push(message);
        }
    });

    return result;
}

// Will be added later and be used to load a users received and sent messages for a given chat
// User this function to load messages even if they have the 'loaded' field set to true
export function load_chat(user1: Username, user2: Username): Array<Message> {
    let currentChat = find_chat(user1, user2);

    if (currentChat === null) {
        currentChat = chat(user1, user2, []);
    } else {}

    currentChat.messages.forEach(message => {
        if (message.recipient === user1) {
            message.loaded_user1 = true;
        } else {
            message.loaded_user2 = true;
        }
    });

    return currentChat.messages;
}

/**
 * Returns the chat between two users
 * @param { Username } user1
 * @param { Username } user2
 * @returns { Chat | null } the chat between the two users
 */
export function find_chat(user1: Username, user2: Username): Chat | null {
    const currentChat = ph_lookup(user_chats, user1 + user2);
    return currentChat === undefined ? null : currentChat;
}