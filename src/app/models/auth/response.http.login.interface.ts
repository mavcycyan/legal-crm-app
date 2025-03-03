import {UserInterface} from "./user.interface";

export interface ResponseHttpLogin {
  user: {
    'id': number,
    'name': string,
    'email': string,
    'email_verified_at': string|null,
    'role_id': number,
    'created_at': string,
    'updated_at': string
  },
  token: string
}

export interface ResponseHttpPasswordReset {
  success: boolean,
  message: string,
  data?: []
}
