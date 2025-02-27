"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rec_message = rec_message;
exports.send_message = send_message;
var messages = [];
/**
 * Receives a message from post
 * @param {}
 * @returns a status code {number}
 */
function rec_message(message) {
    messages.push(message);
    console.log(messages);
}
function send_message() {
}
