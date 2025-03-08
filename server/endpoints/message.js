"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post_message = post_message;
exports.get_message = get_message;
exports.load_chat = load_chat;
var message_1 = require("../../types/message");
var user_1 = require("./user");
/**
 * Receives a message from post and inserts said message
 * into the senders and recipients sent and received messages
 * respectively
 * @param { Message } message
 */
function post_message(message) {
    (0, user_1.insert_sent_message)(message.sender, message);
    (0, user_1.insert_received_message)(message.recipient, message);
}
/**
 * Receives a message from post
 * @param { Username } recipient - the user making the request
 * @param { Username } sender - the user making the request
 * @returns { Array<Message> } - returns an array of the received messages of the given user
 */
function get_message(recipient, sender) {
    var messages = (0, message_1.received_messages)((0, user_1.get_usr_messages)(recipient));
    var result = [];
    messages.forEach(function (message) {
        if (message.sender === sender && message.loaded === false) {
            message.loaded = true;
            result.push(message);
        }
    });
    return result;
}
// Will be added later and be used to load a users received and sent messages for a given chat
// User this function to load messages even if they have the 'loaded' field set to true
function load_chat() {
}
