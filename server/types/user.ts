
/**
 * A User record storing information about a given user
 * add more comments later (gotta check how to write docs for records)
 */
export type User = {
    userID: UserID,
    username: string,
    publicKey: string
}

/**
 * A UserID used to give a name to what is being stored 
 * rather than just using type
 */
export type UserID = number;