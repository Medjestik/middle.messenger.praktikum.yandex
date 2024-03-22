export interface IChatCreateNew {
  title: string
}

export interface IChatRemove {
  chatId: number
}

export interface IChatAddUsers {
  users: number[]
  chatId: number
}

export interface IChatRemoveUsers {
  users: number[]
  chatId: number
}
