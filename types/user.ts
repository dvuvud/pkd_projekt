
/**
 * A User record stores information about a given user.
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