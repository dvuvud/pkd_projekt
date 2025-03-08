import { type User, Username } from './user';
import { type Pair, pair, head, tail } from './list';

/**
 * A message record storing information about the receiver, sender,
 * the message itself, as well as the time it was sent
 * add more comments later (gotta check how to write docs for records)
 */
export type Message = {
    content: string,
    recipient: Username,
    sender: Username,
    timestamp: number,
    loaded: boolean
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
 * @param { number } timestamp - the time set by the server
 * @param { boolean } loaded - is it loaded by user
 * @returns { Array<Message> } of a users received messages
 */
export function message(content: string, recipient: Username, 
                        sender: Username, timestamp: number = 0, 
                        loaded: boolean = false): Message {
    return {
        content,
        recipient,
        sender,
        timestamp,
        loaded
    };
}