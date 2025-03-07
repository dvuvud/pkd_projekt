
/**
 * A User record storing information about a given user
 * add more comments later (gotta check how to write docs for records)
 */
export type User = {
    username: Username,
    publicKey: string
}

/**
 * A username used to give a name to what is being stored 
 * rather than just using type string
 */
export type Username = string;