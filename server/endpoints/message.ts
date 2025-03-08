import { User, Username } from '../../types/user';
import { Chat, Message } from '../../types/message';
import { find_user, get_chat } from './user';

/**
 * Receives a message from post and inserts said message
 * into the chat between the users
 * @param { Message } message
 */
export function post_message(message: Message): void {
    get_chat(message.sender, message.recipient)?.messages.push(message);
}

/**
 * Receives a message from post
 * @param { Username } user - the user making the request
 * @param { Username } recipient - the user being chatted with
 * @returns { Array<Message> } - returns an array of the received messages of the given user
 */
export function get_message(user: Username, recipient: Username): Array<Message> {
    const chat = get_chat(user, recipient);
    const result: Array<Message> = [];
    chat?.messages.forEach(message => {
        if (message.loaded === false) {
            message.loaded = true;
            result.push(message);
        }
    })
    return result;
}

// Will be added later and be used to load a users received and sent messages for a given chat
// User this function to load messages even if they have the 'loaded' field set to true
export function load_chat(user: Username, recipient: Username): Array<Message> {
    const chat = get_chat(user, recipient);
    if (chat === null) {
        
        return [];
    } else {}
    return chat.messages;
}