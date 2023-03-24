import BaseMessage from '@/common/Im/Message/BaseMessage'


export default class ProductMessage extends BaseMessage {
  constructor(type = 'prod', content = {}, leixing, proPrice, activeId, ext) {
    console.log(content, ext)
    super(type, content)

    const { isTip = 0 } = ext
    this.isTip = isTip // 如果为1则不需要发送，代表仅仅是显示产品信息

    // 如果不是消息提示，那么就要格式化了
    if (!isTip) {
      let _content = {
        prod_name: content.prod_name,
        categoryType: content.categoryType,
        price: content.price,
        img: content.img,
        id:content.id,
        periodDays:content.periodDays,
        url: `/pagesGarage/ShopList/GoodsDetail?id=${content.id}`,
      }
      // 商品类型 0：普通商品  1：投资项目 2:回收再销售
      if (content.goodsType == 0) {
        // warehouseId 仓库id
        _content.url = `/pagesGarage/ShopList/GoodsDetail?id=${content.id}&wid=${content.warehouseId}`
      } else if (content.goodsType == 1) {
        _content.url = `/pagesAgent/InvestmentList/ProjectDetails?id=${content.id}&queryType=L`
      } else if (content.goodsType == 2) {
        _content.price = proPrice
        _content.url = `/pages/detail/spikeDetail?flashsale_id=${content.id}`
      }
      // 走到这里就代表已经发送了
      this.content = _content
    }
  }

  async getContent() {
    // {"prod_name":"商品一","img":"图片路径","price":"100","url":"商品卡片点击跳转的URL"}
    // 走到这里就代表已经发送了
    return JSON.stringify(this.content)
  }
}
