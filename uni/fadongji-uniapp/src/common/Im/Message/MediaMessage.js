import BaseMessage from '@/common/Im/Message/BaseMessage'

/**
 * 图片类，会额外用到加载进度、以及本地临时路径（加快显示，然后方便显示进度)
 */
export default class MediaMessage extends BaseMessage {
  imgWidthMax = 120 // px
  imgHeightMax = 160
  constructor(type = 'image', content = {}, ext) {
    super(type, content);

    this.styleObj = { width: 0, height: 0, mode: 'widthFix' }
    console.log(content)
    this.content = content
  }

  async getImgInfo() {
    try {
      // 本地图片，所以获取图片信息非常快
      const res = await Promisify('getImageInfo', { src: this.content.filePath }).catch((err) => {
        throw Error(err.errMsg)
      });
      console.log(res)
      const { height, width } = res

      this.styleObj.mode = height > width ? 'heightFix' : 'widthFix' // 横还是竖直

      const widthScale = width / this.imgWidthMax
      const heightScale = height / this.imgHeightMax

      var imgScale = 1

      if (height >= width) {
        if (widthScale > 1) {
          imgScale = widthScale
        }
        // 长边优先，覆盖掉
        if (heightScale > 1) {
          imgScale = heightScale
        }
      } else {
        if (heightScale > 1) {
          imgScale = heightScale
        }
        // 长边优先，覆盖掉
        if (widthScale > 1) {
          imgScale = widthScale
        }
      }

      this.styleObj.width = width / imgScale
      this.styleObj.height = height / imgScale
      console.log(this.styleObj)
    } catch (e) {

    }

    return true
  }

  async getContent() {
    return JSON.stringify(this.content)
  }
}
