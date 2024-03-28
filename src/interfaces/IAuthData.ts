export interface IAuthRegistration {
  first_name: string
  second_name: string
  login: string
  email: string
  phone: string
  password: string
}

export interface IAuthLogin {
  login: string
  password: string
}
