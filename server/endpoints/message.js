"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post_message = post_message;
exports.get_message = get_message;
exports.load_chat = load_chat;
exports.find_chat = find_chat;
var message_1 = require("../../types/message");
var hashtables_1 = require("../../types/hashtables");
var user_1 = require("./user");
// Stores all chats across all users
var chats = [];
var hash_fun = function (key) { return (0, user_1.simpleHash)(key); };
// A hash table storing all users by userID
var user_chats = (0, hashtables_1.ph_empty)(1000, hash_fun);
/**
 * Receives a message from post and inserts said message
 * into the chat between the users
 * @param { Message } message
 */
function post_message(message) {
    var currentChat = find_chat(message.sender, message.recipient);
    var currentDate = new Date();
    message.timestamp = currentDate.getHours().toString() + ":" +
        currentDate.getMinutes().toString() + ":" +
        currentDate.getSeconds().toString();
    if (currentChat === null) {
        currentChat = (0, message_1.chat)(message.sender, message.recipient, []);
        (0, hashtables_1.ph_insert)(user_chats, message.sender + message.recipient, currentChat);
    }
    currentChat.messages.push(message);
    console.log(currentChat);
}
/**
 * Receives a message from post
 * @param { Username } user1 - the user making the request
 * @param { Username } user2 - the user being chatted with
 * @returns { Array<Message> } - returns an array of the received messages of the given user
 */
function get_message(user1, user2) {
    var currentChat = find_chat(user1, user2);
    if (currentChat === null) {
        currentChat = (0, message_1.chat)(user1, user2, []);
    }
    else { }
    var result = [];
    currentChat.messages.forEach(function (message) {
        if (message.recipient === user1 && message.loaded_user1 === false) {
            message.loaded_user1 = true;
            result.push(message);
        }
        else if (message.recipient === user2 && message.loaded_user2 === false) {
            message.loaded_user2 = true;
            result.push(message);
        }
    });
    return result;
}
// Will be added later and be used to load a users received and sent messages for a given chat
// User this function to load messages even if they have the 'loaded' field set to true
function load_chat(user1, user2) {
    var currentChat = find_chat(user1, user2);
    if (currentChat === null) {
        currentChat = (0, message_1.chat)(user1, user2, []);
    }
    else { }
    currentChat.messages.forEach(function (message) {
        if (message.recipient === user1) {
            message.loaded_user1 = true;
        }
        else {
            message.loaded_user2 = true;
        }
    });
    return currentChat.messages;
}
/**
 * Returns the chat between two users
 * @param { Username } user1
 * @param { Username } user2
 * @returns { Chat | null } the chat between the two users
 */
function find_chat(user1, user2) {
    var currentChat = (0, hashtables_1.ph_lookup)(user_chats, user1 + user2);
    return currentChat === undefined ? null : currentChat;
}
