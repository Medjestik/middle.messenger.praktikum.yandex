export interface IMessage {
  content: string
  id: number
  uniqId: number
  time: string
  type: string
  user_id: number
  isMyMessage: boolean
  chat_id: number
}
