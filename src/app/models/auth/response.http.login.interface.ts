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
