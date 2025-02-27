import { type User } from './user';

export type Message = {
    id: string,
    content: string,
    recipient: User,
    sender: User,
    timestamp: Date
}