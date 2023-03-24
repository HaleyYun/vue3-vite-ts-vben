import { genMessage } from '../helper'
import antdLocale from 'ant-design-vue/es/locale/zh_CN'
import momentLocale from 'dayjs/locale/zh-cn'

const modules = import.meta.globEager('./zh-CN/**/*.ts')
export default {
  message: {
    ...genMessage(modules, 'zh-CN'),
    antdLocale,
  },
  momentLocale,
  momentLocaleName: 'zh-cn',
}
