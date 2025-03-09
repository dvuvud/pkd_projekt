import { 
    User, Username 
} from '../../types/user';
import { 
    Message, Chat, chat 
} from '../../types/message';
import { 
    HashFunction, ProbingHashtable, ph_delete,
    ph_empty, ph_insert, ph_lookup 
} from '../../types/hashtables';
import { filter } from '../../types/list';

function simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash += str.charCodeAt(i);
    }
    return hash % 64; // Modulo 64 is the range
}

const hash_fun: HashFunction<Username> = (key: string) => simpleHash(key);
// A hash table storing all users by userID
const users: ProbingHashtable<Username, User> = ph_empty(100, hash_fun);

/**
 * Constructs a user
 * @param { User } user - the user to be created
 * @returns { User } the user just created
 */
export function create_user(user: User): User {
    ph_insert(users, user.username, user);
    console.log(users);

    return user;
}

/**
 * Returns the user with a given username
 * @param { Username } username - the user to get
 * @returns { User | null } the user object of the user
 * If user is not found null will be returned
 */
export function find_user(username: Username): User | null {
    const user = ph_lookup(users, username);
    return user === undefined ? null : user;
}