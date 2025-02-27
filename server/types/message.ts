import { type User } from './user';

export type Message = {
    id: string,
    content: string,
    recipient: string,
    sender: string,
    timestamp: string
}