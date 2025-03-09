"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chat = chat;
exports.message = message;
function chat(user1, user2, messages) {
    return {
        user1: user1,
        user2: user2,
        messages: messages
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
function message(content_recipient, content_sender, recipient, sender, timestamp, loaded) {
    if (timestamp === void 0) { timestamp = 0; }
    if (loaded === void 0) { loaded = false; }
    return {
        content_recipient: content_recipient,
        content_sender: content_sender,
        recipient: recipient,
        sender: sender,
        timestamp: timestamp,
        loaded: loaded
    };
}
