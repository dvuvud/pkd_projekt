
/**
 * A User stores information about a given user.
 * username - the users name given by the client
 * publicKey - the users public key,
 * created on registration and stored by the server for encryption
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