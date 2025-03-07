import { User, UserID } from '../types/user';
import { Message, Messages, received_messages, sent_messages } from '../types/message';
import { insert_sent_message, get_usr_messages, insert_received_message } from './user';

/**
 * Receives a message from post and inserts said message
 * into the senders and recipients sent and received messages
 * respectively
 * @param { Message } message
 */
export function post_message(message: Message): void {
    insert_sent_message(message.sender, message);
    insert_received_message(message.recipient, message);
    console.log(get_usr_messages(message.sender));
}

/**
 * Receives a message from post
 * @param { User } user - the user making the request
 * @returns { Array<Message> } - returns an array of the received messages of the given user
 */
export function get_message(user: User): Array<Message> {
    return received_messages(get_usr_messages(user));
}

// Will be added later and be used to load a users received and sent messages for a given chat
export function load_chat() {

}