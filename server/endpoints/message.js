"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post_message = post_message;
exports.get_message = get_message;
var messages = [];
/**
 * Receives a message from post
 * @param { Message }
 * @returns { number } Status code
 */
function post_message(message) {
    messages.push(message);
    console.log(messages);
}
function get_message() {
    return messages;
}
