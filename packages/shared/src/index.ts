// 通用工具类
import * as VoUtils from './utils/utils'

// 通用正则
import * as Pattern from './pattern/patterns'

// 引入校验类
import Validator from './validator/Validator'

// 抛出lodash通用工具类好方法
import _ from './lodash'

// 引入js精度计算库
import Decimal from './decimal'

// 引入vocen的http请求封装 包换pc端和 uni 端
import { AdminHttp, AppHttp } from './ajax'

// 引入非对称加密类
import Encrypt from './encrypt/encrypt'

import dayjs from 'dayjs'

import isBetween from 'dayjs/plugin/isBetween'

const restObj = { isBetween }

export { VoUtils, _, Pattern, Decimal, Validator, AdminHttp, AppHttp, Encrypt, dayjs, restObj }
