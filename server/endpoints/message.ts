import { User, Username } from '../../types/user';
import { Chat, Message, chat } from '../../types/message';
import { find_user } from './user';

// Stores all chats across all users
const chats: Array<Chat> = [];

/**
 * Receives a message from post and inserts said message
 * into the chat between the users
 * @param { Message } message
 */
export function post_message(message: Message): void {
    let currentChat = find_chat(message.sender, message.recipient);

    if(currentChat === null) {
        currentChat = chat(message.sender, message.recipient, []);
        chats.push(currentChat);
    }
    
    currentChat.messages.push(message);
    console.log(currentChat);
}

/**
 * Receives a message from post
 * @param { Username } user - the user making the request
 * @param { Username } recipient - the user being chatted with
 * @returns { Array<Message> } - returns an array of the received messages of the given user
 */
export function get_message(user1: Username, user2: Username): Array<Message> {
    let currentChat = find_chat(user1, user2);

    if (currentChat === null) {
        currentChat = chat(user1, user2, []);
    } else {}

    const result: Array<Message> = [];

    currentChat.messages.forEach(message => {
        if (message.loaded === false) {
            message.loaded = true;
            result.push(message);
        }
    })

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
        message.loaded = true;
    });
    
    return currentChat.messages;
}

/**
 * Returns the chat between two users
 * @param { Username } user1
 * @param { Username } user2
 * @returns { Chat | null } between the two users
 */
export function find_chat(user1: Username, user2: Username): Chat | null {
    const user1_chats = filter_chats(chats, user1);
    const mutual_chat = filter_chats(user1_chats, user2);
    return mutual_chat[0] === undefined ? null : mutual_chat[0];
}

/**
 * Filters for all the chats one user is included in
 * @param { Username } user - the logged in user
 * @param { Array<Chat> } chats - the chats to filter
 * @returns { Array<Chat> } between the two users
 */
function filter_chats(chats: Array<Chat>, user: Username): Array<Chat> {
    const result: Array<Chat> = [];

    chats.forEach(chat_object => {
        if (chat_object.user1 === user || chat_object.user2 === user) {
            result.push(chat_object);
        } else {}
    });
    
    return result;
}