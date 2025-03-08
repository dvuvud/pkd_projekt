"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post_message = post_message;
exports.get_message = get_message;
exports.load_chat = load_chat;
exports.find_chat = find_chat;
var message_1 = require("../../types/message");
// Stores all chats across all users
var chats = [];
/**
 * Receives a message from post and inserts said message
 * into the chat between the users
 * @param { Message } message
 */
function post_message(message) {
    var currentChat = find_chat(message.sender, message.recipient);
    if (currentChat === null) {
        currentChat = (0, message_1.chat)(message.sender, message.recipient, []);
        chats.push(currentChat);
    }
    currentChat.messages.push(message);
    console.log(currentChat);
}
/**
 * Receives a message from post
 * @param { Username } user - the user making the request
 * @param { Username } recipient - the user being chatted with
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
        if (message.loaded === false) {
            message.loaded = true;
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
    return currentChat.messages;
}
/**
 * Returns the chat between two users
 * @param { Username } user1
 * @param { Username } user2
 * @returns { Chat | null } between the two users
 */
function find_chat(user1, user2) {
    var user1_chats = filter_chats(chats, user1);
    var mutual_chat = filter_chats(user1_chats, user2);
    return mutual_chat[0] === undefined ? null : mutual_chat[0];
}
/**
 * Filters for all the chats one user is included in
 * @param { Username } user - the logged in user
 * @param { Array<Chat> } chats - the chats to filter
 * @returns { Array<Chat> } between the two users
 */
function filter_chats(chats, user) {
    var result = [];
    chats.forEach(function (chat_object) {
        if (chat_object.user1 === user || chat_object.user2 === user) {
            result.push(chat_object);
        }
        else { }
    });
    return result;
}
