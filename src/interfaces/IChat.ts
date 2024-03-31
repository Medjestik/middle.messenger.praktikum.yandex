import { IUser } from './IUser.ts';

export interface IChat {
  id?: number
  title?: string
  avatar?: string
  unread_count: number
  created_by?: number
  last_message?: {
    user?: IUser
    time?: string
    id?: number
    content?: string
  };
}
