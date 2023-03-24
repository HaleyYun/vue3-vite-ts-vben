<template>
  <view class="bg-white">
    <block v-if="show">
      <VoBatteryBar bg-color="transparent" />
      <VoNav title="开票须知"  />
    </block>
    <view class="container">
      <view class="title">一、发票开具规则</view>
      <view class="content">
        1） 订单支付完成后，电子发票在24小时内自动开具(如在月初1-6号则48小时内开具)；增值税专用发票(纸质)如资质审核通过，将由店铺商户在订单完成后7个工作日内为您寄出，邮寄信息详见收票人信息；
      </view>
      <view class="content">
        2） 订单需先确认商品收货，待订单完成后为您开具发票；
      </view>

      <view class="content">
        3） 发票开具金额为您实际支付金额，不包括优惠券、积分等支付金额；
      </view>
      <view class="content">
        4） 第三方订单的商品发票由三方商家自行开具，您可点击申请开票并查看开票进度，如有疑问请联系平台咨询。
      </view>
      <view class="title">二、发票补开换开及修改规则</view>
      <view class="content">
        1）订单完成前可修改发票信息，请您务必确认修改内容；发票开具成功后，1年内可支持一次发票换开；
      </view>
      <view class="content">
        2）更换增值税专用发票，需将原票寄回固定地址请见收票人信息；
      </view>
      <view class="title">三、发票信息相关问题</view>
      <view class="content">
        1）发票开具非明细内容是否享受保修？
        <view>
          您好，发票内容非明细，可能会影响您的保修，9具体可以与品牌厂商确认，为保障您的权益，京东可以特殊为您提供保修服务。
        </view>
      </view>
      <view class="content">
        2）增值税普通发票（电子）具有法律效力的相关规定有哪些？
        <view>
          您好，2015年12月11日《会计档案管理办法》中华人民共和国财政部国家档案局令第79号，2015年11月26日，《关于推行通过增值税电子发票系统开具的增值税电子普通发票有关问题的公告》，2015年7月9日，《关于开展增值税发票系统升级版电子发票试运行工作有关问题的通知》等相关文件通知，都是具有法律效力的相关规定。
        </view>
      </view>
      <view class="content">
        3）电子发票可以用于商品维修吗？
        <view>
          您好，可以用于商品维修。根据北京市国家税务局、北京市地方税务局、北京市商务委员会、北京市工商行政管理局《关于电子发票应用试点若干事项的公告》（2013年第8号）和《关于扩大电子发票应用试点范围若干事项的公告》（2013年第18号文）；上海市国家税务局、上海市商务委员会、上海市发展和改革委员会、上海市财政局上海市工商行政管理局《关于上海市电子发票应用试点的公告》（2013年第6号文）；成都事国家税务局、成都市商务局、成都市发展和改革委员会、成都市财政局、成都市工商行政管理局《关于成都市电子发票应用试点若干事项的公告》（2014年第1号文）；广州市国家税务局、广州市发展和改革委员会、广州市经济贸易委员会、广州市财政局、广州市对外贸易经济合作局、广州市人民政府国有资产监督管理委员会、广州市工商行政管理局、广州市地方税务局《关于广州市电子发票应用试点的公告》（2014年第5号文），电子发票与纸质发票具有相同法律效力，可作为售后、维权凭据。用户可直接向维修站点和厂家提供电子发票进行维修。
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    name: 'InvoicingNotice',
    data() {
      return {
        show: false,
      }
    },
    //如果页面有keep-alive缓存功能，这个函数会触发
    activated() {},
    methods: {},
    //生命周期 - 页面加载（可以访问当前this实例）
    onLoad(opt) {
      this.show = opt?.show || false
    },
    //生命周期 - 监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
    onShow() {},
    //生命周期 - 监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发
    onReady() {},
    //生命周期 - 监听页面隐藏
    onHide() {},
    //生命周期 - 监听页面卸载
    onUnload() {},
    //生命周期 - 监听窗口尺寸变化
    onResize() {},
    //生命周期 - 监听用户下拉动作，一般用于下拉刷新
    onPullDownRefresh() {},
    //生命周期 - 页面滚动到底部的事件
    onReachBottom() {},
  }
</script>
<style scoped lang="scss">
.container {
  padding: 32rpx;
  color: rgba(0, 0, 0, 0.85);
  font-size: 28rpx;
  .red {
    color: #ff5319;
  }
  > view {
    margin-bottom: 32rpx;
    line-height: 150%;
  }
  .title {
    font-size: 32rpx;
    margin-top: 8rpx;
    margin-bottom: 24rpx;
    font-weight: bold;
  }
  .title1 {
    margin-top: -8rpx;
    margin-bottom: 16rpx;
    font-weight: bold;
  }
}
</style>
