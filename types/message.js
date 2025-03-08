"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.empty_messages = empty_messages;
exports.message = message;
exports.received_messages = received_messages;
exports.sent_messages = sent_messages;
exports.store_received_message = store_received_message;
exports.store_sent_message = store_sent_message;
var list_1 = require("./list");
/**
 * Construct an empty Messages.
 * @returns { Messages } whose head is an empty array and whose tail is and an empty array.
 */
function empty_messages() {
    return (0, list_1.pair)([], []);
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
function message(content, recipient, sender, timestamp, loaded) {
    if (timestamp === void 0) { timestamp = 0; }
    if (loaded === void 0) { loaded = false; }
    return {
        content: content,
        recipient: recipient,
        sender: sender,
        timestamp: timestamp,
        loaded: loaded
    };
}
/**
 * Returns all the received messages of a given user
 * @param { Messages } msgs - the messages of a user
 * @returns { Array<Message> } of a users received messages
 */
function received_messages(msgs) {
    return (0, list_1.head)(msgs);
}
/**
 * Returns all the sent messages of a given user
 * @param { Messages } msgs - the messages of a user
 * @returns { Array<Message> } of a users sent messages
 */
function sent_messages(msgs) {
    return (0, list_1.tail)(msgs);
}
/**
 * Stores a received message into a users Messages
 * @param { Messages } msgs - the messages of a user
 * @param { Message } msg - the message to store
 */
function store_received_message(msgs, msg) {
    received_messages(msgs).push(msg);
}
/**
 * Stores a sent message into a users Messages
 * @param { Messages } msgs - the messages of a user
 * @param { Message } msg - the message to store
 */
function store_sent_message(msgs, msg) {
    sent_messages(msgs).push(msg);
}
