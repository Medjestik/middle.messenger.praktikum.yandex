export interface IProfileUserData {
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
}

export interface IProfileUserPassword {
  oldPassword: string
  newPassword: string
}

export interface IProfileSearchUsers {
  login: string
}
