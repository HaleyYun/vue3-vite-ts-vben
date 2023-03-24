<template>
  <view>
    <!--    1310-待付款；1320-待发货；1330-待收货；1340-已完成；1350-已取消；1360-已关闭  -->
    <view class="detail flex flex-column">
      <VoNav :title="navTitle" is-fixed is-have-more>
        <block slot="title">
          <view class="flex flex-justify-c flex-vertical-c">
            <VoIcon v-if="type === 1310" :size="32" class="m-l-7" name="clock-orange" />
            <VoIcon v-else-if="type === 1320" :size="28" class="m-l-7" name="clock-new" />
            <VoIcon v-else-if="type === 1340" :size="28" class="m-l-7" name="success-circle" />
            <VoIcon v-else-if="type === 1350" :size="28" class="m-l-7" name="warning" />
            <view v-if="type === 1310" class="fz-32 fz-b detail-title">{{
              orderData.statusName
            }}</view>
            <view v-else class="fz-32 fz-b color-block">{{ orderData.statusName }}</view>
          </view>
        </block>

      </VoNav>
      <view class="flex1 overflow-y">
        <!--倒计时-->
        <view
          v-if="orderData.status === 1310 && downData > 0"
          class="detail-time flex flex-justify-c flex-vertical-c"
        >
          <view class="detail-title fz-28">剩余时间: </view>
          <view class="p-l-12 detail-title fz-28">
            <u-count-down :time="downData" @change="onChange">
              <view class="time">
                <text class="time__item"
                  >{{ timeData.hours > 10 ? timeData.hours : '0' + timeData.hours }}小时</text
                >
                <text class="time__item">{{ timeData.minutes }}分钟</text>
              </view>
            </u-count-down>
          </view>
        </view>
        <view v-if="orderData.status == 1350" class="content_result_text black85">
          <view>
            <view>取消原因：{{ orderData.cancelReason }}</view>
          </view>
        </view>
        <view v-if="orderData.status == 1360" class="content_result_text black85">
          <view>
            <view>关闭原因：{{ orderData.cancelReason }}</view>
          </view>
        </view>
        <view
          v-else-if="orderData.status === 1320"
          class="detail-time flex flex-justify-c flex-vertical-c"
        >
          <view v-if="orderData.predictDeliveryTime" class="fz-28 color-block"
            >{{ orderData.predictDeliveryTime }}前应发货</view
          >
        </view>
        <view
          v-else-if="orderData.status === 1330"
          class="detail-time flex flex-justify-c flex-vertical-c"
        >
          <view v-if="orderData.nextStageTime" class="fz-28 color-block"
            >{{ orderData.nextStageTime }}自动确认发货</view
          >
        </view>
        <!--待发货已发货的显示发货情况-->
        <!--        <view-->
        <!--          v-if="-->
        <!--            orderData.status === 1330 ||-->
        <!--            (orderData.status === 1320 && orderData.deliveryDetail.packageCount)-->
        <!--          "-->
        <!--          class="detail-address"-->
        <!--          @click="deliveryClick"-->
        <!--        >-->
        <view v-if="orderData.status === 1330" class="detail-address" @click="lookDeliverInfoClick">
          <view class="detail-address__user fz-32 fz-b">发货情况</view>
          <view class="flex flex-justify-between flex-vertical-c detail-address__profit">
            <view class="fz-28 color-block"
              >当前订单已拆分成{{ orderData.deliveryDetail.packageCount }}个包裹，{{
                orderData.deliveryDetail.sendCount
              }}个已发出
            </view>
            <VoIcon :opacity="0.25" :size="16" name="right-arrow" />
          </view>
        </view>
        <view v-if="orderData.status === 1320 || orderData.status === 1330" class="m-t-16" />
        <!--   地址信息   -->
        <view class="detail-address">
          <view class="detail-address__user flex flex-vertical-c" @click="goImUrl(orderData)">
            <VoIcon :size="24" name="smile-m" />
            <view class="fz-32 fz-b m-l-8"> {{ orderData.buyerName }}</view>
            <!--            <VoIcon-->
            <!--              :size="15"-->
            <!--              color="#0D66FF"-->
            <!--              name="mobile-new"-->
            <!--              @click="$cellPhone(orderAddress.phone)"-->
            <!--            />-->
          </view>
          <view class="detail-address__info">
            <view :class="mobile2 ? '' : 'flex-vertical-c'" class="flex flex-justify-between">
              <view :class="mobile2 ? '' : 'flex-vertical-c'" class="flex">
                <VoIcon name="address" />
                <view class="fz-28 fz-b m-l-8">
                  <view class="flex1 flex flex-vertical-c" @click="callPhone(orderAddress.phone)">
                    <text v-if="orderAddress.name">
                      {{
                        orderAddress.name.length > 6
                          ? orderAddress.name.slice(0, 6) + '...'
                          : orderAddress.name
                      }}
                    </text>
                    <text class="m-l-8"> {{ mobile1 ? mobile1 : orderAddress.phone }} </text>
                  </view>
                  <view v-if="mobile2">{{ mobile2 ? mobile2 : '' }}</view>
                </view>
              </view>
              <view class="flex flex-vertical-c fz-28 h42">
                <view
                  v-if="orderData.status === 1310 || orderData.status === 1320"
                  class="m-r-24 color-blue"
                  @click="editAddressClick()"
                >
                  修改
                </view>
                <u-line color="rgba(0, 0, 0, 0.15)" direction="col" length="12"></u-line>
                <view class="color-blue m-l-24" @click="callPhone(orderAddress.phone)">
                  打电话
                </view>
              </view>
            </view>
            <view class="fz-26 m-t-24 overTwoEllipsis lh42 color-block">
              <text>地址：</text>
              <text> {{ orderAddress.address }}{{ orderAddress.addressDetail }} </text>
            </view>
          </view>
          <!--          <view class="detail-address__info flex flex-vertical-c">-->
          <!--            <view>-->
          <!--              <VoIcon name="address" />-->
          <!--            </view>-->
          <!--            <view class="m-l-8 info-place">-->
          <!--              <view class="fz-28 flex flex-vertical-c">-->
          <!--                <text> {{ orderAddress.name }} </text>-->
          <!--                <text> {{ orderAddress.phone }} </text>-->
          <!--              </view>-->
          <!--              <view class="fz-26 m-t-8">-->
          <!--                {{ orderAddress.address }}{{ orderAddress.addressDetail }}</view-->
          <!--              >-->
          <!--            </view>-->
          <!--            <view-->
          <!--              v-if="orderData.status === 1310 || orderData.status === 1320"-->
          <!--              class="flex flex1 flex-vertical-c flex-justify-r"-->
          <!--            >-->
          <!--              <view class="fz-24 m-r-8" @click="editAddressClick()">修改</view>-->
          <!--              <VoIcon name="edit-line" @click="editAddressClick()" />-->
          <!--            </view>-->
          <!--          </view>-->
          <view
            class="detail-address__note note-line flex flex-vertical-c flex-justify-between"
            @click="buyRemarkClick(buyRemark, 1)"
          >
            <view class="flex">
              <view>买家留言：</view>
              <view v-if="buyRemark" class="color-gray flex1 overTwoEllipsis">
                {{ buyRemark }}
              </view>
            </view>
            <VoIcon :opacity="0.25" :size="16" name="right-arrow" />
          </view>
          <view
            class="detail-address__note flex flex-vertical-c flex-justify-between"
            @click="buyRemarkClick(sellerRemark, 2)"
          >
            <view class="flex">
              <view>商家备注：</view>
              <view v-if="sellerRemark" class="color-gray flex1 overTwoEllipsis">{{
                sellerRemark
              }}</view>
            </view>
            <VoIcon :opacity="0.25" :size="16" name="right-arrow" />
          </view>
        </view>
        <!--   货物信息   -->
        <view class="detail-address m-t-16">
          <view class="detail-address__user fz-32 fz-b"
            >{{ orderData.predictDeliveryTime }}前应发货
          </view>
          <view class="m-l-32 m-r-32 m-t-24">
            <block v-for="(item, index) in orderData.goodsDetail">
              <!--              <GoodItem-->
              <!--                v-if="item.goodsCount - item.deliveryCount === 0"-->
              <!--                :isPro="true"-->
              <!--                :key="index"-->
              <!--                :good-data="item"-->
              <!--              />-->
              <GoodItem
                :key="index"
                :good-data="item"
                :is-pre-sale="orderData.isPreSale"
                :isPro="true"
              />
            </block>
          </view>
        </view>
        <!--   订单信息   -->
        <view class="detail-address m-t-16 m-b-16">
          <!--待付款-->
          <view v-if="orderData.status === 1310">
            <view class="detail-address__user fz-32 fz-b">订单信息</view>
            <view class="detail-address__order fz-26">
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>订单编号：</view>
                <view class="flex flex-vertical-c">
                  <view class="color-gray"> {{ orderData.id }}</view>
                  <view class="fz-20 m-l-16 color-blue" @click="copyClick">复制</view>
                </view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>下单时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ createOrderTime }}</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>商品总额：</view>
                <view class="flex flex-vertical-c color-gray">{{ orderData.goodsAmount }}元</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>应付款：</view>
                <view class="flex flex-vertical-c color-red">{{ orderData.payAmount }}元</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>服务费用：</view>
                <view class="flex flex-vertical-c color-gray"
                  >{{ orderData.serviceAmount || '0' }}元</view
                >
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>实收款：</view>
                <view class="flex flex-vertical-c color-gray">{{ orderData.canObtainAmount }}</view>
              </view>
            </view>
          </view>
          <!--待发货-->
          <view v-if="orderData.status === 1320">
            <view class="detail-address__user fz-32 fz-b">订单信息</view>
            <view class="detail-address__order fz-26">
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>订单编号：</view>
                <view class="flex flex-vertical-c">
                  <view class="color-gray"> {{ orderData.id }}</view>
                  <view class="fz-20 m-l-16 color-blue" @click="copyClick">复制</view>
                </view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>下单时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ createOrderTime }}</view>
              </view>
              <view v-if="payTime" class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>支付时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ payTime }}</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>商品总额：</view>
                <view class="flex flex-vertical-c color-gray">{{ orderData.goodsAmount }}元</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>应付款：</view>
                <view class="flex flex-vertical-c color-red">{{ orderData.payAmount }}元</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>服务费：</view>
                <view class="flex flex-vertical-c color-gray"
                  >{{ orderData.serviceAmount || '0' }}元</view
                >
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>实收款：</view>
                <view class="flex flex-vertical-c color-gray">{{ orderData.canObtainAmount }}</view>
              </view>
            </view>
          </view>
          <!--已发货-->
          <view v-if="orderData.status === 1330">
            <view class="detail-address__user fz-32 fz-b">订单信息</view>
            <view class="detail-address__order fz-26">
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>订单编号：</view>
                <view class="flex flex-vertical-c">
                  <view class="color-gray"> {{ orderData.id }}</view>
                  <view class="fz-20 m-l-16 color-blue" @click="copyClick">复制</view>
                </view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>下单时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ createOrderTime }}</view>
              </view>
              <view v-if="payTime" class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>支付时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ payTime }}</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>商品总额：</view>
                <view class="flex flex-vertical-c color-gray">{{ orderData.goodsAmount }}元</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>应付款：</view>
                <view class="flex flex-vertical-c color-red">{{ orderData.payAmount }}元</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>服务费：</view>
                <view class="flex flex-vertical-c color-gray"
                  >{{ orderData.serviceAmount || '0' }}元</view
                >
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>实收款：</view>
                <view class="flex flex-vertical-c color-gray">{{ orderData.canObtainAmount }}</view>
              </view>
            </view>
          </view>
          <!--已完成-->
          <view v-if="orderData.status === 1340">
            <view class="detail-address__user fz-32 fz-b">订单信息</view>
            <view class="detail-address__order fz-26">
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>订单编号：</view>
                <view class="flex flex-vertical-c">
                  <view class="color-gray"> {{ orderData.id }}</view>
                  <view class="fz-20 m-l-16 color-blue" @click="copyClick">复制</view>
                </view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>下单时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ createOrderTime }}</view>
              </view>
              <view v-if="payTime" class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>支付时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ payTime }}</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>商品总额：</view>
                <view class="flex flex-vertical-c color-gray">{{ orderData.goodsAmount }}元</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>应付款：</view>
                <view class="flex flex-vertical-c color-red">{{ orderData.payAmount }}元</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>服务费：</view>
                <view class="flex flex-vertical-c color-gray"
                  >{{ orderData.serviceAmount || '0' }}元</view
                >
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>实收款：</view>
                <view class="flex flex-vertical-c color-gray">{{ orderData.canObtainAmount }}</view>
              </view>
            </view>
          </view>
          <!--已取消-->
          <view v-if="orderData.status === 1350">
            <view class="detail-address__user fz-32 fz-b">订单信息</view>
            <view class="detail-address__order fz-26">
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>订单编号：</view>
                <view class="flex flex-vertical-c">
                  <view class="color-gray"> {{ orderData.id }}</view>
                  <view class="fz-20 m-l-16 color-blue" @click="copyClick">复制</view>
                </view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>下单时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ createOrderTime }}</view>
              </view>
              <view v-if="payTime" class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>支付时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ payTime }}</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>取消时间：</view>
                <view class="flex flex-vertical-c color-gray">{{
                  getTime('取消时间')[0].createTime
                }}</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>商品总额：</view>
                <view class="flex flex-vertical-c color-gray">{{ orderData.goodsAmount }}元</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>应付款：</view>
                <view class="flex flex-vertical-c color-red">{{ orderData.payAmount }}元</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>服务费：</view>
                <view class="flex flex-vertical-c color-gray"
                  >{{ orderData.serviceAmount || '0' }}元</view
                >
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>实收款：</view>
                <view class="flex flex-vertical-c color-gray"
                  >{{ orderData.canObtainAmount }} 元</view
                >
              </view>
            </view>
          </view>
          <!--已关闭-->
          <view v-if="orderData.status === 1360">
            <view class="detail-address__user fz-32 fz-b">订单信息</view>
            <view class="detail-address__order fz-26">
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>订单编号：</view>
                <view class="flex flex-vertical-c">
                  <view class="color-gray"> {{ orderData.id }}</view>
                  <view class="fz-20 m-l-16 color-blue" @click="copyClick">复制</view>
                </view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>下单时间：</view>
                <view class="flex flex-vertical-c color-gray">{{
                  getTime('下单时间')[0].createTime
                }}</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>关闭时间：</view>
                <view class="flex flex-vertical-c color-gray">{{
                  getTime('关闭时间')[0].createTime
                }}</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>商品总额：</view>
                <view class="flex flex-vertical-c color-gray">{{ orderData.goodsAmount }}元</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>应付款：</view>
                <view class="flex flex-vertical-c color-red">{{ orderData.payAmount }}元</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>服务费：</view>
                <view class="flex flex-vertical-c color-gray"
                  >{{ orderData.serviceAmount || '0' }}元</view
                >
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>实收款：</view>
                <view class="flex flex-vertical-c color-gray"
                  >{{ orderData.canObtainAmount }} 元</view
                >
              </view>
            </view>
          </view>
        </view>
      </view>
      <!--   底部固定区域   -->
      <view v-if="orderData.status === 1310" class="detail-bottom flex flex-justify-r">
        <view class="p-b-safe-area" />
        <view class="detail-bottom__normal" @click="remarkClick">备注</view>
        <view class="detail-bottom__button" @click="editAddressClick">修改地址</view>
      </view>
      <view v-else-if="orderData.status === 1320" class="detail-bottom flex flex-justify-r">
        <view class="p-b-safe-area" />
        <view class="detail-bottom__button" @click="deliveryClick">发货</view>
      </view>
      <view v-else-if="orderData.status === 1330" class="detail-bottom flex flex-justify-r">
        <view class="p-b-safe-area" />
        <view class="detail-bottom__button" @click="lookDeliverInfoClick">查看发货信息</view>
      </view>
      <view class="p-b-safe-area" />
    </view>
    <!--备注弹框-->
    <VoModal
      :content="content"
      :show="showRemarkModal"
      :title="title"
      confirmText="我知道了"
      @confirm="showRemarkModal = false"
    />
    <!-- 电话弹框 -->
    <VoActionSheet
      v-show="mobileShowAction"
      :actions="mobileList"
      :show="mobileShowAction"
      cancelText="取消"
      class="action-sheet"
      @close="mobileShowAction = false"
      @select="mobileActionSelect"
    />
  </view>
</template>

<script>
  import GoodItem from '../components/GoodItem'

  export default {
    name: 'OrderDetail',
    components: { GoodItem },
    data() {
      return {
        totalPrice: 0,
        navTitle: '订单详情',
        carryTo: false, // 订单可入账
        service: false, // 服务费
        orderId: '',
        orderData: {}, //订单详情数据
        goodNumber: 0, //商品总数量
        //地址信息
        orderAddress: {},
        //买家备注
        buyRemark: '',
        //预计到期时间
        expectedTime: '',
        //取消时间
        orderCancelTime: '',
        //支付时间
        payTime: '',
        //发货时间
        deliverGoodTime: '',
        //完成时间
        finishTime: '',
        //定制服务
        addedServicesData: {},
        //订单分润信息
        orderProfitInfoList: [],
        //物流信息
        deliverInfo: [],
        payOrderInfo: {},
        //顶部倒计时
        timeData: {},
        downData: 0,
        newData: new Date().getTime(),
        //备注弹框内容
        content: '',
        showRemarkModal: false,
        title: '买家留言',
        sellerRemark: '',
        type: '',
        timeList: [],
        mobileShowAction: false, // 电话联系人弹框
        mobileList: [], // 电话列表
        mobile: [], // 电话列表
        mobile1: '', // 电话号码1
        mobile2: '', // 电话号码2
      }
    },
    onShow() {
      this.getOrderDetailRequest()
    },
    onLoad(option) {
      // let orderData = (this.optionsData = JSON.parse(option.data))
      // console.log(orderData)
      // this.type = orderData.status
      //假数据，接入接口可删除
      // this.type = orderData.status
      // this.orderData.id = orderData.id
      // this.orderData.statusName = orderData.statusName
      // this.orderData.status = orderData.status
      // this.orderData.predictReceiptTime = '3月23日12:30'
      // this.orderData.nextStageTime = '3月23日12:30'
      // this.orderData.shopName = '郑州沃森再制造工厂'
      // this.createOrderTime = '2022-03-22 18:01:12'
      // this.payTime = '2022-08-10 11:49:26'
      // this.orderData.goodsAmount = '4500.00'
      // this.orderData.payAmount = '4400.00'
      // this.orderData.serviceAmount = '100.00'
      // this.orderData.amount = '4500.00'
      //
      // this.sellerRemark = '货到付款，联系确认型号发货'
      // this.buyRemark = '着急用，麻烦尽快发货'
      // this.orderData.goodsDetail = orderData.goodsDetail
      //
      // this.orderAddress = {
      //   phone: '13639612345',
      //   name: '哆哆',
      //   address: '河南省郑州市金水区',
      //   addressDetail: '木华广场A座7楼',
      // }
      // this.orderData.orderAddress = this.orderAddress
      // return
      this.orderId = option.data
      // this.getOrderDetailRequest()

      // if (orderData.status === 1330 || orderData.status === 1340) {
      //   this.getDeliverDetailRequest()
      // }

      // if (option.payType === '1') {
      //   this.payClick()
      // }
    },
    methods: {
      onChange(e) {
        this.timeData = e
        console.log(e)
        if (e.minutes <= 0) {
          if (this.iforderData.status === 1310) {
            this.$backFn()
          }
        }
      },
      getTime(val) {
        return this.timeList.filter((item) => {
          return item.timeName == val
        })
      },
      buyRemarkClick(info, type) {
        if (info) {
          if (type === 1) {
            this.title = '买家留言'
          } else if (type === 2) {
            this.title = '商家备注'
          }
          this.content = info
          this.showRemarkModal = true
        }
      },

      /**
       *查看发货信息
       */
      lookDeliverInfoClick() {
        this.$linkToEasy(
          '/pagesRecovery/SellOrder/OrderDetail/DeliveryMessage?data=' +
            this.orderData.id +
            '&type=2',
        )
      },
      deliveryClick() {
        // this.$linkToEasy(
        //   `/pagesRecovery/SellOrder/OrderDetail/DeliveryMessage?data=${this.orderData.id}&type=2`,
        // )
        this.$linkToEasy(
          '/pagesRecovery/SellOrder/DeliverGoods/DeliverGoods?data=' + this.orderData.id,
        )
      },
      /**
       * 跳转备注
       */
      remarkClick() {
        this.$linkToEasy(
          '/pagesRecovery/SellOrder/OrderSearch/OrderRemark?data=' + JSON.stringify(this.orderData),
        )
      },
      /**
       * 修改地址
       */
      editAddressClick() {
        this.$linkToEasy(
          `/pagesRecovery/SellOrder/ReceiveAddress/AddressList?orderId=${this.orderData.id}&type=2&companyId=${this.orderData.orderCompanyId}`,
        )
      },

      // toShopPage() {
      //   this.$linkToEasy(
      //     '/pagesAgent/InvestmentList/ShopDetails?companyId=' + this.orderData.orderCompanyId,
      //   )
      // },
      /**
       * 联系电话
       * @param e
       */
      callPhone(phone) {
        if (!phone) {
          this.$u.toast('未获取到手机号')
          return
        }
        if (phone.indexOf('/') > -1) {
          let mobile = phone.split('/')
          this.mobileList = []
          this.mobileList = mobile.map((item) => {
            return {
              name: item,
            }
          })
          if (this.mobileList.length > 1) {
            this.mobileShowAction = true
            return
          }
          this.$cellPhone(phone)
          return
        }
        this.$cellPhone(phone)
      },
      mobileActionSelect(e) {
        this.$cellPhone(e.name)
      },
      /**
       * 到聊天界面
       * @param info
       */
      goImUrl(info) {
        console.log(info)
        const data = {
          targetId: info.shopId,
          type: 0,
          note: info.shopName,
          platformCode: info.shopPlatformCode,
        }
        this.$storage.set('temp_im_room_info', data)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      //复制订单
      copyClick() {
        uni.setClipboardData({
          data: this.orderData.id,
        })
      },
      //获取订单详情
      getOrderDetailRequest() {
        let param = { id: this.orderId }
        this.$VoHttp
          .apiOrderOld$Id(param)
          .then((res) => {
            console.log(res)
            this.orderDetailProcessData(res.data)
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(res.message || '订单详情获取失败')
          })
      },
      // 格式化数据
      orderDetailProcessData(data) {
        this.orderData = data
        this.timeList = data.timeList
        this.type = data.status
        console.log('订单详情:', this.orderData)
        let Time = new Date(this.orderData.nextStageTime)
        let timestemp = Time.getTime()
        this.downData = timestemp - this.newData
        if (this.downData <= 0) {
          if (this.orderData.status === 1310) {
            this.$backFn()
          }
        }

        //状态
        this.type = this.orderData.status
        this.navTitle = this.orderData.statusName
        //商品数量
        this.orderData.goodsDetail.forEach((item) => {
          this.goodNumber = this.goodNumber + item.goodsCount
        })
        //处理备注
        if (this.orderData.remarkList) {
          this.orderData.remarkList.forEach((item) => {
            //1买家备注,2卖家备注
            if (item.type === 1) {
              this.buyRemark = item.remark
            }
            if (item.type === 2) {
              this.sellerRemark = item.remark
            }
          })
        }
        //订单信息
        // this.orderData.nextStageTime
        this.orderData.timeList.forEach((item) => {
          console.log(item)
          if (item.timeName === '取消时间') {
            this.orderCancelTime = item.createTime
          }
          if (item.timeName === '下单时间') {
            this.createOrderTime = item.createTime
          }
          if (item.timeName === '支付时间') {
            this.payTime = item.createTime
          }
          if (item.timeName === '发货时间') {
            this.deliverGoodTime = item.createTime
          }
          if (item.timeName === '完成时间') {
            this.finishTime = item.createTime
          }
        })
        console.log(this.createOrderTime, 222)
        //地址信息
        // this.orderAddress = JSON.parse(this.orderData.addressDetail)
        this.orderAddress = this.orderData.orderAddress
        if (this.orderAddress.phone.indexOf('/') > -1) {
          this.mobile = this.orderAddress.phone.split('/')
          this.mobile1 = this.mobile[0]
          this.mobile2 = this.mobile[1]
        }
        //订单分润信息
        this.orderProfitInfoList = this.orderData.orderProfitInfoList
        this.$forceUpdate()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .detail {
    width: 750rpx;
    height: 100vh;
    box-sizing: border-box;
    &-title {
      color: $color-clicked-yellow;
    }
    &-time {
      width: 750rpx;
      height: 104rpx;
      background: #f5f5f5;
    }
    &-state {
      width: 750rpx;
      height: 108rpx;
      color: #ffffff;
      background: linear-gradient(
        96.72deg,
        #fa2c19 -1.29%,
        #fa3f19 46.76%,
        #fa5919 82.49%,
        #fa6419 104.67%
      );
    }
    &-stateWait {
      overflow-x: hidden;
      width: 750rpx;
      height: 200rpx;
      color: #ffffff;
      background: linear-gradient(
        96.72deg,
        #fa2c19 -1.29%,
        #fa3f19 46.76%,
        #fa5919 82.49%,
        #fa6419 104.67%
      );
    }
    &-statePay {
      width: 750rpx;
      height: 158rpx;
      color: #ffffff;
      background: linear-gradient(
        96.72deg,
        #fa2c19 -1.29%,
        #fa3f19 46.76%,
        #fa5919 82.49%,
        #fa6419 104.67%
      );
      &__goPay {
        width: 160rpx;
        height: 64rpx;
        line-height: 64rpx;
        background-color: #ffffff;
        color: $color-primary-yellow;
        border-radius: 32rpx;
        text-align: center;
      }
    }
    &-flex1 {
      width: 750rpx;
      overflow-x: hidden;
    }
    &-address {
      background: #ffffff;
      color: $v-c0-85;

      &__user {
        padding: 24rpx 0;
        margin: 0 32rpx;
        border-bottom: 2rpx solid $v-bg-light;
        color: #000;
      }

      &__info {
        padding: 24rpx 0;
        margin: 0 32rpx;
        border-bottom: 2rpx solid $v-bg-light;
        font-size: 28rpx;

        .info-place {
          width: 438rpx;
        }
      }

      &__note {
        font-size: 28rpx;
        padding: 16rpx 0;
        margin: 0 32rpx;
        &.note-line {
          border-bottom: 2rpx solid $v-bg-light;
        }
      }

      &__mobile {
        border-top: 2rpx solid $v-bg-light;
      }

      &__list {
        padding: 16rpx 32rpx;
        height: 160rpx;

        .list-image {
          width: 160rpx;
          height: 160rpx;
        }

        .list-hidden {
          display: -webkit-box;
          overflow: hidden;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .list-days {
          border: 2rpx solid $color-primary-red;
          border-radius: 4rpx;
          height: 28rpx;
          margin-left: 8rpx;

          &__left {
            background: $color-primary-red;
            color: #ffffff;
          }

          &__right {
            background: rgba(229, 0, 18, 0.1);
            color: $color-primary-red;
          }
        }

        .price {
          color: $color-primary-red;
        }
      }

      &__serve {
        margin: 28rpx 32rpx;
        margin-left: auto;
        background: $v-bg-light;
        border-radius: 8rpx;
        font-size: 24rpx;
        width: 510rpx;
        height: 56rpx;
        padding: 0 16rpx;

        .serve-word {
          color: $v-c0-45;
        }

        .serve-num {
          color: $color-primary-red;
        }

        .serve-icon {
          margin-left: auto;
        }
      }

      &__account {
        font-size: 13px;
        line-height: 150%;
        color: $v-c0-45;
        padding: 32rpx 32rpx 0rpx;
      }

      &__profit {
        padding: 28rpx 0;
        margin: 0 32rpx;
      }

      &__service {
        width: 516rpx;
        margin: 0 auto;
        padding-bottom: 16rpx;
        font-size: 24rpx;

        .service-left {
          width: 156rpx;
          text-align: center;
        }

        .service-middle {
          width: 252rpx;
          height: 2rpx;
          margin: 18rpx 18rpx 0;
          border-top: 1px dashed rgba(0, 0, 0, 0.45);
        }

        .service-middleOne {
          width: 252rpx;
          margin: 0 18rpx;
        }

        .service-right {
          width: 72rpx;
          text-align: left;
        }
      }

      &__order {
        padding: 0 32rpx 24rpx;
      }
    }

    &-bottom {
      padding: 40rpx 32rpx;
      background: #ffffff;
      border-top: 2rpx solid $v-bg-light;

      &__button {
        width: 176rpx;
        height: 80rpx;
        line-height: 80rpx;
        border: 2rpx solid $color-primary-yellow;
        border-radius: 100rpx;
        text-align: center;
        font-size: 28rpx;
        color: $color-primary-yellow;
        margin-left: 32rpx;
        box-sizing: border-box;
      }

      &__width {
        width: 200rpx;
      }

      &__normal {
        width: 176rpx;
        height: 80rpx;
        line-height: 80rpx;
        background: #ffffff;
        border-radius: 100rpx;
        border: 2rpx solid $v-c0-25;
        text-align: center;
        font-size: 28rpx;
        color: $v-c0-85;
        margin-left: 32rpx;
      }
    }
  }

  .color-red {
    color: $color-primary-red;
  }

  .color-blue {
    color: $v-tip;
  }

  .line {
    border-top: 2rpx solid $v-bg-light;
  }

  .p-b-safe-area {
    background: #ffffff;
  }

  .black85 {
    color: rgba(0, 0, 0, 0.85);
  }

  .content_result_text {
    text-align: center;
    font-size: 28rpx;
    line-height: 42rpx;
    padding-top: 32rpx;
    padding-bottom: 24rpx;
    font-weight: 500;
  }
</style>
