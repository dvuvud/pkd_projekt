import { Username } from './user.js';

/**
 * A message record storing information about the receiver, sender,
 * the message itself, as well as the time it was sent
 */
export type Message = {
    content_recipient: string,
    content_sender: string,
    content_decrypted: string | undefined,
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

/**
 * Constructs a chat object
 * @param { Username } user1
 * @param { Username } user2
 * @param { Array<Message> } messages - an array of messages
 * @returns { Array<Message> } of a users received messages
 */
export function chat(user1: Username, user2: Username, messages: Array<Message>): Chat {
    return {
        user1,
        user2,
        messages
    };
}

/**
 * Constructs a message object
 * @param { string } content_recipient - the content of the message
 * @param { string } content_sender - the content of the message
 * @param { Username } recipient - the recipient
 * @param { Username } sender - the sender
 * @param { string } timestamp - the time set by the server
 * @param { boolean } loaded_user1 - is it loaded by user1
 * @param { boolean } loaded_user2 - is it loaded by user2
 * @param { undefined | string } content_decrypted - decrypted message
 * @returns { Array<Message> } of a users received messages
 */
export function message(content_recipient: string, content_sender: string,
                        recipient: Username, sender: Username, timestamp: string = "", 
                        loaded_user1: boolean = false, loaded_user2: 
                        boolean = false, content_decrypted: undefined = undefined): Message {
    return {
        content_recipient,
        content_sender,
        content_decrypted,
        recipient,
        sender,
        timestamp,
        loaded_user1,
        loaded_user2
    };
}