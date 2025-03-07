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
    timestamp: string
}

/**
 * Stores received- and sent messages of a given user
 * The head of the pair stores received messages
 * The tail stores the sent messages
 */
export type Messages = Pair<Array<Message>, Array<Message>>

/**
 * Construct an empty Messages.
 * @returns { Messages } whose head is an empty array and whose tail is and an empty array.
 */
export function empty_messages(): Messages {
    return pair([], []);
}

/**
 * Returns all the received messages of a given user
 * @param { Messages } msgs - the messages of a user
 * @returns { Array<Message> } of a users received messages
 */
export function received_messages(msgs: Messages): Array<Message> {
    return head(msgs);
}

/**
 * Returns all the sent messages of a given user
 * @param { Messages } msgs - the messages of a user
 * @returns { Array<Message> } of a users sent messages
 */
export function sent_messages(msgs: Messages): Array<Message> {
    return tail(msgs);
}

/**
 * Stores a received message into a users Messages
 * @param { Messages } msgs - the messages of a user
 * @param { Message } msg - the message to store
 */
export function store_received_message(msgs: Messages, msg: Message): void {
    received_messages(msgs).push(msg);
}

/**
 * Stores a sent message into a users Messages
 * @param { Messages } msgs - the messages of a user
 * @param { Message } msg - the message to store
 */
export function store_sent_message(msgs: Messages, msg: Message): void {
    sent_messages(msgs).push(msg);
}