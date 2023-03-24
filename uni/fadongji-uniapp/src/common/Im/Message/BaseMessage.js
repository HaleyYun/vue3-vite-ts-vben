// 消息类,就先不用继承了吧
/**
 * @type text image video prod
 *
 */
export default class BaseMessage {
  constructor(type, content = '', ext) {
    if (!type) throw Error('type必须指定')
    this.content = content
    this.type = type
    this.ext = ext
  }

  async getContent() {
    let rt = null
    switch (this.type) {
      case 'text':
        rt = this.content
        break
      case 'image':
        rt = this.content
        break
      case 'video':
        rt = this.content
        break
      case 'prod':
        rt = JSON.stringify(this.content)
        break
      case 'confirmOrder':
        rt = JSON.stringify(this.content)
        break
      case 'substituteOrder':
        rt = JSON.stringify(this.content)
        break

    }
    return rt
  }
}
