"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_user = create_user;
exports.find_user = find_user;
exports.get_usr_messages = get_usr_messages;
exports.insert_received_message = insert_received_message;
exports.insert_sent_message = insert_sent_message;
var message_1 = require("../../types/message");
var hashtables_1 = require("../../types/hashtables");
var hash_fun = function (key) { return key.length; };
// A hash table storing a users messages by their userID
var usr_messages = (0, hashtables_1.ph_empty)(100, hash_fun);
// A hash table storing all users by userID
var users = (0, hashtables_1.ph_empty)(100, hash_fun);
/**
 * Constructs a user
 * @param { User } user - the user to be created
 * @returns { User } the user just created
 */
function create_user(user) {
    (0, hashtables_1.ph_insert)(users, user.username, user);
    (0, hashtables_1.ph_insert)(usr_messages, user.username, (0, message_1.empty_messages)());
    console.log(users);
    return user;
}
/**
 * Returns the user with a given username
 * @param { Username } username - the user to get
 * @returns { User | null } the user object of the user
 * If user is not found null will be returned
 */
function find_user(username) {
    var user = (0, hashtables_1.ph_lookup)(users, username);
    return user === undefined ? null : user;
}
/**
 * Returns the sent- and received messages of a user
 * @param { User } user - the user to get messages from
 * @returns { Messages } of the given user.
 * If user is not found an empty messages object will be returned
 */
function get_usr_messages(user) {
    var result = (0, hashtables_1.ph_lookup)(usr_messages, user);
    return result !== undefined ? result : (0, message_1.empty_messages)();
}
/**
 * Inserts a message into a users received messages
 * @param { Username } username - the user that receives the message
 * @param { Message } message - of the given user
 */
function insert_received_message(username, message) {
    var users_messages = (0, hashtables_1.ph_lookup)(usr_messages, username);
    if (users_messages !== undefined) {
        (0, message_1.store_received_message)(users_messages, message);
    }
    else { }
}
/**
 * Inserts a message into a users sent messages
 * @param { Username } username - the user that sent the message
 * @param { Message } message - of the given user
 */
function insert_sent_message(username, message) {
    var users_messages = (0, hashtables_1.ph_lookup)(usr_messages, username);
    if (users_messages !== undefined) {
        (0, message_1.store_sent_message)(users_messages, message);
    }
    else { }
}
