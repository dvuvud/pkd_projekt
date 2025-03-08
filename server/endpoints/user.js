"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_user = create_user;
exports.find_user = find_user;
var hashtables_1 = require("../../types/hashtables");
var hash_fun = function (key) { return key.length; };
// A hash table storing all users by userID
var users = (0, hashtables_1.ph_empty)(100, hash_fun);
/**
 * Constructs a user
 * @param { User } user - the user to be created
 * @returns { User } the user just created
 */
function create_user(user) {
    (0, hashtables_1.ph_insert)(users, user.username, user);
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
