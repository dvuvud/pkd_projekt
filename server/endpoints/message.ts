import { User } from '../types/user';
import { Message } from '../types/message';

const messages: Array<Message> = [];

/**
 * Receives a message from post
 * @param {}
 * @returns a status code {number}
 */
export function rec_message(message: Message): void {
    messages.push(message);
    console.log(messages);
}

export function send_message() {
    
}