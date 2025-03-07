import { type User, UserID } from './user';
import { type Pair, pair, head, tail } from './list';

/**
 * A message record storying information about the receiver, sender,
 * the message itself, as well as the time it was sent
 * @param key the key
 * @returns the hash of the key.
 */
export type Message = {
    id: UserID,
    content: string,
    recipient: User,
    sender: User,
    timestamp: string
}

export type Messages = Pair<Array<Message>, Array<Message>>

export function empty_messages() {
    return pair([], []);
}

export function received_messages(msgs: Messages): Array<Message> {
    return head(msgs);
}

export function sent_messages(msgs: Messages): Array<Message> {
    return tail(msgs);
}

export function store_received_message(msgs: Messages, msg: Message): void {
    received_messages(msgs).push(msg);
}

export function store_sent_message(msgs: Messages, msg: Message): void {
    sent_messages(msgs).push(msg);
}