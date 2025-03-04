import { User } from '../types/user';
import { Message } from '../types/message';

const messages: Array<Message> = [];

/**
 * Receives a message from post
 * @param { Message } 
 * @returns { number } Status code 
 */
export function post_message(message: Message): void {
    messages.push(message);
    console.log(messages);
}

export function get_message(): Array<Message> {
    return messages;
}