import BaseMessage from '@/common/Im/Message/BaseMessage'
import store from '@/store'


export default class OrderMessage extends BaseMessage {
    constructor(type = 'order', content = {}, leixing, proPrice, activeId, ext) {
        console.log(content, ext)
        super(type, content)
        const { isTip = 0 } = ext
        this.isTip = isTip; // 如果为1则不需要发送，代表仅仅是显示产品信息

        // 如果不是消息提示，那么就要格式化了
        if (!isTip) {
            let _content = {
                prod_name: content.prod_name,
                categoryType: content.categoryType,
                price: content.price,
                img: content.img,
                id:content.id,
                createTime:content.createTime,
                goodsCount:content.goodsCount,
                type:content.type,
                status:content.status,
                orderType:content.orderType,
                periodDays:content.periodDays,
                url:  '/pagesGarage/InstallOrder/OrderDetail/OrderDetail?id=' + content.id,
            };

            // todo 跳转订单详情
            //orderType "订单类型 0：销售订单  1：投资订单"
            // businessCode 聊天关系 0：普通聊天  1：我是买家  2：我是卖家
            // 如果他是卖家发送的是对方用户订单的
            // 如果是买家发送的是自己的订单
            /**
               userInfo.platformCode
              investmentManager  招商经理
              channelManager  渠道经理
              supplier  供应商
              agent  服务商
              garage  汽修厂
              op  运营平台
             **/
          if(_content.orderType == 0){
             if(leixing == 'supplier'){
                 _content.url = `/pagesSupplier/Order/OrderDetail/OrderDetail?id=${content.id}`
             }else if(leixing == 'agent') {
               _content.url = `/pagesAgent/Order/OrderDetail/OrderDetail?id=${content.id}`
             }else if(leixing == 'garage'){
               _content.url = `/pagesGarage/InstallOrder/OrderDetail/OrderDetail?id=${content.id}`
             }

          }else if(_content.orderType == 1) {
            if(leixing == 'supplier'){
              _content.url = `/pagesSupplier/Order/OrderDetail/InvestDetail?id=${content.id}`
            }else if(leixing == 'agent') {
              _content.url = `/pagesAgent/MyInvest/CheckInvestmentInfo?id=${content.id}`
            }
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
