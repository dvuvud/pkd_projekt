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
 * @param { string } timestamp - the time set by the server
 * @param { boolean } loaded - is it loaded by user
 * @returns { Array<Message> } of a users received messages
 */
function message(content_recipient, content_sender, recipient, sender, timestamp, loaded_user1, loaded_user2) {
    if (timestamp === void 0) { timestamp = ""; }
    if (loaded_user1 === void 0) { loaded_user1 = false; }
    if (loaded_user2 === void 0) { loaded_user2 = false; }
    return {
        content_recipient: content_recipient,
        content_sender: content_sender,
        recipient: recipient,
        sender: sender,
        timestamp: timestamp,
        loaded_user1: loaded_user1,
        loaded_user2: loaded_user2
    };
}
