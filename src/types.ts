export interface IUser {
  id: number
  name: string
  email: string
}

export interface IMessage {
  id: number
  creatorId: number
  text: string
  createDate: Date
}

export interface IChat {
  id?: number
  creatorId?: number
  lastMessage?: string
  members: IUser[]
  isGroup: boolean
  messages: IMessage[]
}