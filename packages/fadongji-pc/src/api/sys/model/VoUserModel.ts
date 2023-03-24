/**
 * @description: Login interface parameters
 */
export interface VoLoginParams {
  password: string
  userName: string
  clientId: string
  clientSecret: string
  roleCode: string
  licenseId: string | number
}

export interface userData {
  access_token: string
  expires_in: string | number
  id: string
  jti: string
  refresh_token: string
  roleCode: string
  scope: string
  token_type: string
  userName: string
}

export interface VoGetUserInfo {
  code: string | number
  success: Boolean
  message: string
  data: userData[]
  time: string
}
