import { Username } from './user';

/**
 * A message record storing information about the receiver, sender,
 * the message itself, as well as the time it was sent
 * add more comments later (gotta check how to write docs for records)
 */
export type Message = {
    content_recipient: string,
    content_sender: string,
    recipient: Username,
    sender: Username,
    timestamp: string,
    loaded_user1: boolean,
    loaded_user2: boolean
}

/**
 * A chat is a record storing all messages sent between two users
 */
export type Chat = {
    user1: Username,
    user2: Username,
    messages: Array<Message>
}

export function chat(user1: Username, user2: Username, messages: Array<Message>): Chat {
    return {
        user1,
        user2,
        messages
    };
}

/**
 * Constructs a message object
 * @param { string } content - the content of the message
 * @param { Username } recipient - the recipient
 * @param { Username } sender - the sender
 * @param { string } timestamp - the time set by the server
 * @param { boolean } loaded - is it loaded by user
 * @returns { Array<Message> } of a users received messages
 */
export function message(content_recipient: string, content_sender: string, recipient: Username, 
                        sender: Username, timestamp: string = "", 
                        loaded_user1: boolean = false, loaded_user2: boolean = false): Message {
    return {
        content_recipient,
        content_sender,
        recipient,
        sender,
        timestamp,
        loaded_user1,
        loaded_user2
    };
}