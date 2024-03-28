import { IUser } from '../../../../interfaces/IUser';

export interface IPopupUserList {
  users: IUser[]
  isActive?: boolean
  onClick?: (user: IUser) => void;
  attr?: { [key: string]: string }
}
export interface IPopupUserItem {
  attr?: { [key: string]: string }
  id?: number
  avatar?: string
  firstName?: string
  secondName?: string
  login?: string
  displayName?: string
  events: {
    click: (event: Event) => void;
  },
}
