export interface IChat {
  avatar?: string
  created_by: number
  id: number
  last_message?: {
    time: string
    id: number
    content: string
  };
  title?: string
  unread_count: number
}
