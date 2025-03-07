import { User, UserID } from '../types/user';
import { Message, Messages, received_messages, sent_messages } from '../types/message';
import { insert_sent_message, get_usr_messages, insert_received_message } from './user';

/**
 * Receives a message from post
 * @param { UserID } userID
 * @param { Message } message
 */
export function post_message(message: Message): void {
    insert_sent_message(message.sender.userID, message);
    insert_received_message(message.recipient.userID, message);
    console.log(get_usr_messages(message.sender.userID));
}

export function get_message(user: User): Array<Message> {
    return received_messages(get_usr_messages(user.userID));
}