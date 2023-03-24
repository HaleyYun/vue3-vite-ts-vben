## Encrypt类

### Encrypt 介绍

Encrypt 是非对称加密和解密的工具类

### Encrypt 使用方式

```
import { Encrypt } from '@vocen/shared';

// 公钥和私钥可根据实际业务需求进行配置
const encrypt = new Encrypt({
  publicKey: '公钥' // 用公钥进行加密
  privateKey: '私钥' // 用私钥进行解密
})

// 加密  === 必须进行配置 公钥

const ret1 = encrypt.encrypt('需要加密的字符串')


// 解密  === 必须进行配置 私钥

const ret2 = encrypt.decrypt('需要解密的字符串')
```
