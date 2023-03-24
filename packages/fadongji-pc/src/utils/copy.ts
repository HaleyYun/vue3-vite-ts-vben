import Clipboard from 'clipboard'
import { message } from 'ant-design-vue'

export default function handleCopy(text, event) {
  const clipboard: any = new Clipboard(event.target, {
    text: () => text,
  })
  clipboard.on('success', () => {
    message.success('复制成功')
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    message.error('复制失败')
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
