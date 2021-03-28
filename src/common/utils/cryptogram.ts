import * as crypto from 'crypto'

const salt = '!@#$%^&*()_+'
/**
 * Make salt
 */
function makeSalt(): string {
  // return crypto.randomBytes(3).toString('base64')
  return salt
}

/**
 * Encrypt password
 * @param password 密码
 * @param salt 密码盐
 */
export function encryptPassword(password: string): string {
  if (!password) {
    return ''
  }
  const tempSalt = Buffer.from(makeSalt(), 'base64')
  return (
    // 10000 代表迭代次数 16代表长度
    crypto.pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64')
  )
}


export function decryptPassword(password: string): string {
  if (!password) {
    return ''
  }
  const tempSalt = Buffer.from(makeSalt(), 'base64')
  return (
    // 10000 代表迭代次数 16代表长度
    crypto.pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64')
  )
}
