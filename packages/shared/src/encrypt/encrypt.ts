import JSEncrypt from '@era/jsencrypt'
import { hasOwn } from '../utils/objects'

interface encryptConfig {
  publicKey?: string
  privateKey?: string
}

export default class Encrypt {
  protected readonly $publicKey?: string
  protected readonly $privateKey?: string
  protected $encrypt: any

  constructor(config: encryptConfig) {
    this.$publicKey = hasOwn(config, 'publicKey') ? config.publicKey : ''
    this.$privateKey = hasOwn(config, 'privateKey') ? config.privateKey : ''
    this.instanceEncrypt()
  }

  // 实例化 jsencrypt
  protected instanceEncrypt() {
    this.$encrypt = new JSEncrypt()
    if (this.$publicKey) {
      this.$encrypt.setPublicKey(this.$publicKey)
    }
    if (this.$privateKey) {
      this.$encrypt.setPrivateKey(this.$privateKey)
    }
  }

  // 加密方法
  public encrypt(val: any) {
    if (!this.$publicKey) {
      console.warn('before you use encrypt ,encrypt need a public key')
      return ''
    }
    return this.$encrypt.encrypt(val)
  }

  // 解密
  public decrypt(val) {
    if (!this.$publicKey) {
      console.warn('before you use decrypt , decrypt need a private key')
      return ''
    }
    return this.$encrypt.decrypt(val)
  }
}
