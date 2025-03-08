import { User, Username } from '../../types/user';
import { Message, Messages, received_messages, sent_messages } from '../../types/message';
import { insert_sent_message, get_usr_messages, insert_received_message, find_user } from './user';

/**
 * Receives a message from post and inserts said message
 * into the senders and recipients sent and received messages
 * respectively
 * @param { Message } message
 */
export function post_message(message: Message): void {
    insert_sent_message(message.sender, message);
    insert_received_message(message.recipient, message);
}

/**
 * Receives a message from post
 * @param { Username } recipient - the user making the request
 * @param { Username } sender - the user making the request
 * @returns { Array<Message> } - returns an array of the received messages of the given user
 */
export function get_message(recipient: Username, sender: Username): Array<Message> {
    const messages: Array<Message> = received_messages(get_usr_messages(recipient));
    const result: Array<Message> = [];
    messages.forEach(message => {
        if (message.sender === sender && message.loaded === false) {
            message.loaded = true;
            result.push(message);
        }
    })
    return result;
}

// Will be added later and be used to load a users received and sent messages for a given chat
export function load_chat() {

}