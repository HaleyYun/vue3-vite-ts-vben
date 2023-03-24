<template>
  <view>
    <!-- 1110.待付款 1120.待发货 1150.已取消 1130.已发货 1140.已完成 -->
    <view class="detail flex flex-column color-block fz-28">
      <VoNav :isBack="false" is-fixed is-have-more @backFn="reback">
        <block slot="title">
          <!-- 根据状态判断title -->
          <view class="flex flex-justify-c flex-vertical-c">
            <!-- {{navTitle}} -->
            <block v-if="orderData.status === 1110">
              <VoIcon :size="24" color="#FF5319" name="Wait-fill" />
              <text class="m-l-8 color-block-yellow">等待付款</text>
            </block>
            <block v-if="orderData.status === 1120">
              <VoIcon :opacity="0.85" :size="24" color="#000000" name="wait" />
              <text class="m-l-8 color-block">商品在出库</text>
            </block>
            <block v-if="orderData.status === 1130">
              <text class="m-l-8 color-block">待收货</text>
            </block>
            <block v-if="orderData.status === 1140">
              <VoIcon :size="28" color="#FF5319" name="select-right" />
              <text class="color-block">已完成</text>
            </block>
            <block v-if="orderData.status === 1150">
              <VoIcon :opacity="0.85" :size="28" color="#000" name="warning" />
              <text class="color-block">已取消</text>
            </block>
            <block v-if="orderData.status === 1160">
              <text class="color-block">已关闭</text>
            </block>
          </view>
        </block>
      </VoNav>
      <view class="detail-flex1 flex1">
        <!--   状态 1110.待付款 1120.待发货 1150.已取消 1130.已发货 1140.已完成 1160.已关闭  -->
        <view v-if="orderData.status === 1110" class="flex flex-column">
          <view class="m-t-24 m-b-16 flex flex-justify-c detail-w">
            <view class="color-block fz-28 lh150">需付款:</view>
            <VoPointPrice :price="orderData.payAmount || 0" color="rgba(0, 0, 0, 0.85)" show-unit />
            <view class="color-block fz-28 lh150 m-l-32">剩余时间:</view>
            <u-count-down :time="downData" @change="onChange">
              <view class="time">
                <text v-if="timeData.hours && timeData.hours > 0" class="time__item">
                  <text>{{ timeData.hours > 10 ? timeData.hours : '0' + timeData.hours }}</text>
                  小时
                </text>
                <text class="time__item">{{ timeData.minutes || '00' }}分钟</text>
              </view>
            </u-count-down>
          </view>
          <view class="flex flex-justify-c">
            <view
              v-if="orderAddress.name"
              class="detail-statePay__goPay m-b-32 fz-24"
              @click="payClick"
            >
              去支付
            </view>
            <view v-else class="detail-bottom__fill">去支付</view>
          </view>
        </view>
        <view v-else-if="orderData.status === 1120">
          <view
            v-if="orderData.isWarn && showAlert"
            class="alert-box flex border-box flex-vertical-c"
          >
            <VoIcon :size="20" class="m-r-16" name="invest-tip" />
            <view class="fz-24 flex1">平台已提醒商家尽快发货,请耐心等待。</view>
            <VoIcon :size="20" color="#373A4E" name="close" @click="showAlert = false" />
          </view>
          <!--          <view class="detail-state flex flex-vertical-c flex-justify-c">-->
          <!--            <view v-show="orderData.predictDeliveryTime" class="fz-26 m-l-16"-->
          <!--              >预计{{ orderData.predictDeliveryTime }}发货,</view-->
          <!--            >-->
          <!--            <view v-show="orderData.predictReceiptTime" class="fz-26 m-l-16"-->
          <!--              >{{ orderData.predictReceiptTime }}送达</view-->
          <!--            >-->
          <!--          </view>-->
        </view>
        <view
          v-else-if="orderData.status === 1130"
          class="detail-state flex flex-vertical-c flex-justify-c"
        >
          <view class="fz-26 m-l-16">{{ orderData.predictReceiptTime }}之前送达</view>
        </view>
        <view
          v-else-if="orderData.status === 1150"
          class="detail-state flex flex-vertical-c flex-justify-c"
        >
          <view class="fz-26 m-l-16">取消原因：{{ orderData.cancelReason || '未知' }}</view>
        </view>
        <view
          v-else-if="orderData.status === 1160"
          class="detail-state flex flex-vertical-c flex-justify-c"
        >
          <view class="fz-26 m-l-16">关闭原因：{{ orderData.cancelReason || '未知' }}</view>
        </view>
        <!--   物流进度   -->
        <view
          v-if="orderData.status === 1130 || orderData.status === 1140"
          class="detail-address box m-t-16"
          @click="lookDeliverInfoClick"
        >
          <view class="fz-32 fz-b lh150 color-block">物流进度</view>
          <view class="h2 bg m-t-16 m-b-16" />
          <view class="flex flex-justify-between flex-vertical-c">
            <view class="fz-26"
              >当前订单有{{ deliverInfo.packageCount || 0 }}个包裹，{{
                deliverInfo.sendCount || 0
              }}个已发出
            </view>
            <VoIcon :opacity="0.25" :size="20" name="right-arrow" />
          </view>
        </view>
        <!-- 已取消 -->
        <view
          v-if="orderData.status === 1160"
          class="detail-address box m-t-16"
          @click="cancelProgress"
        >
          <view class="flex flex-justify-between flex-vertical-c">
            <view>
              <view class="fz-32 fz-b m-b-8">取消/退款进度</view>
              <!--              <view class="fz-24 color-red">如您使用了优惠券，请查看取消进度详情</view>-->
              <view class="fz-24 color-red">请查看取消/退款进度详情</view>
            </view>
            <VoIcon :size="20" color="#373A4E" name="right-arrow" />
          </view>
        </view>
        <!--   地址信息   -->
        <view class="detail-address m-t-16">
          <view v-if="orderAddress.name" class="detail-address__info">
            <view class="flex flex-vertical-c">
              <VoIcon :size="24" name="address" />
              <view
                class="m-l-8 fz-b fz-28 flex1 flex flex-vertical-c"
                @click="callPhone(orderAddress.phone)"
              >
                <text>
                  {{
                    orderAddress.name && orderAddress.name.length > 6
                      ? orderAddress.name.slice(0, 6) + '...'
                      : orderAddress.name
                  }}
                </text>
                <text class="m-l-8"> {{ orderAddress.phone }} </text>
              </view>
              <view v-if="orderData.status === 1110" class="flex flex-vertical-c fz-28 h42">
                <u-line color="rgba(0, 0, 0, 0.15)" direction="col" length="12" />
                <view class="m-l-24 color-blue" @click="editAddressClick"> 修改 </view>
              </view>
            </view>
            <view class="fz-26 m-t-24 overTwoEllipsis lh42 color-block">
              <text>地址：</text>
              <text>{{ orderAddress.address }}{{ orderAddress.addressDetail }} </text>
            </view>
          </view>
          <view
            v-else
            class="add-box bg-white text-center font-weight-500 fz-32"
            @click="addAddressClick"
            >+添加新地址
          </view>
        </view>
        <!--   货物信息   -->
        <view class="detail-address m-t-16">
          <view class="flex flex-justify-between flex-vertical-c">
            <view class="detail-address__user flex flex-vertical-c">
              <!--              <VoIcon name="smile-s" @click.native="toShopPage" />-->
              <!--              <view class="flex" @click="toStoreHomePage">-->
              <!--                <view class="m-l-8 m-r-8 fz-32"> {{ orderData.shopName }}</view>-->
              <!--                <VoIcon :opacity="0.65" color="#000000" name="right-arrow" />-->
              <!--              </view>-->

              <image class="chat" src="/static/garage/home/order_im_icon.png" @click="toShopPage" />
              <view class="flex flex-vertical-c" @click="toStoreHomePage">
                <view class="m-l-8 m-r-8 fz-32 fz-b"> {{ orderData.shopName }}</view>
                <image class="right" src="/static/garage/home/order_right_icon.png" />
              </view>
            </view>
            <VoIcon v-if="orderData.isValet" class="m-r-32" name="generation" />
          </view>
          <view class="desc fz-24 border-bottom">
            <view class="desc-margin">{{ orderData.warehouseName }}</view>
            <!--          注释到货时效  -->
            <!--            <text v-show="orderData.status === 1110 || orderData.status === 1120" class="color-red">-->
            <!--              （预计{{ orderData.predictReceiptTime }}送达）-->
            <!--            </text>-->
          </view>
          <view
            v-for="(item, index) in orderData.goodsDetail"
            :key="index"
            @click="goodDetail(item)"
          >
            <view class="detail-address__list flex" @click="goodDetail(item)">
              <image
                v-if="item.pic[0].indexOf('mp4') != -1 || item.pic[0].indexOf('MP4') != -1"
                :src="item.pic[0] + '&type=3'"
                class="list-image"
              />
              <image v-else :src="item.pic[0] + '&type=1'" class="list-image" />
              <view class="flex1 m-l-16 flex flex-column flex-justify-between">
                <view class="fz-28 fz-b list-hidden">
                  <text v-show="item.categoryType" class="good-tips m-r-8">{{
                    item.categoryType
                  }}</text>
                  <text> {{ item.goodsName }}</text>
                </view>
                <view class="good-bottom flex flex-justify-between">
                  <view class="good-bottom__left flex flex-vertical-c">
                    <view class="tips"
                      >{{ item.periodDays > 0 ? `${item.periodDays}天账期` : '现金价' }}
                    </view>
                    <view class="price flex flex-vertical-c">
                      <VoPointPrice :price="item.originalPrice.toString()" />
                      <view>元</view>
                    </view>
                  </view>
                  <view class="good-bottom__num">x{{ item.goodsCount }}</view>
                </view>
              </view>
            </view>
            <!--            <view v-if="item.addedServices">-->
            <!--              <view-->
            <!--                v-for="(added, index) in item.addedServices"-->
            <!--                :key="index"-->
            <!--                class="detail-address__serve flex flex-vertical-c"-->
            <!--                @click.stop="addedServicesClick(added)"-->
            <!--              >-->
            <!--                <view class="serve-word">{{ added.name }}：</view>-->
            <!--                <view class="serve-num">{{ added.price }}元/{{ added.count }}台</view>-->
            <!--                <VoIcon :opacity="0.25" :size="20" class="serve-icon" name="right-arrow" />-->
            <!--              </view>-->
            <!--            </view>-->
            <!--控制退换货按钮显示-->
            <view
              v-if="
                (orderData.status === 1130 || orderData.status === 1140) && +orderData.payAmount > 0
              "
              class="flex flex-justify-r m-r-32 m-t-44"
            >
              <template v-if="item.goodsCount && item.goodsCount > 1">
                <template v-if="item.refundIdList && item.refundIdList.length > 0">
                  <view v-if="item.refundIdList.length < item.goodsCount" class="flex">
                    <view
                      class="detail-bottom__fill"
                      @click.stop="refundClick(item, '退货退款记录')"
                      >退货退款记录
                    </view>
                    <view v-show="isShowRefure">
                      <view
                        v-if="item.refundIdList.length < item.goodsCount"
                        class="detail-bottom__fill m-l-32"
                        @click.stop="refundClick(item, '退款退货')"
                        >退款退货
                      </view>
                    </view>
                  </view>
                  <view v-else>
                    <view
                      v-if="item.refundIdList.length >= item.goodsCount"
                      class="detail-bottom__fill"
                      @click.stop="refundClick(item, '退货退款记录')"
                      >退货退款记录
                    </view>
                  </view>
                </template>
                <template v-else>
                  <view
                    v-show="isShowRefure"
                    class="detail-bottom__fill"
                    @click.stop="refundClick(item, '退款退货')"
                    >退款退货
                  </view>
                </template>
              </template>
              <template v-else>
                <view v-if="!item.refundStatusName">
                  <view v-show="isShowRefure">
                    <view class="detail-bottom__fill" @click.stop="refundClick(item, '退款退货')"
                      >退款退货
                    </view>
                  </view>
                </view>
                <view
                  v-else
                  class="detail-bottom__fill"
                  @click.stop="refundClick(item, item.refundStatusName)"
                  >{{ item.refundStatusName }}
                </view>
              </template>
            </view>
          </view>
          <!--          <view class="detail-address__account flex flex-justify-between" />-->
          <view
            class="detail-address__info fz-26 flex flex-vertical-c"
            @click="buyRemarkClick(buyRemark)"
          >
            <view>备注：</view>
            <view v-if="buyRemark" class="color-gray"> {{ buyRemark }}</view>
          </view>
        </view>
        <!--定制服务订单-->
        <view
          v-if="codeServices && codeServices.length"
          class="detail-address m-t-16 m-b-16"
          @click.stop="addedServicesClick(codeServices[0])"
        >
          <view class="detail-address__user fz-32 fz-b flex">
            <text class="flex1">定制服务订单</text>
            <VoIcon :opacity="0.65" :size="20" color="#000000" name="right-arrow" />
          </view>
          <view class="detail-address__order fz-26">
            <view class="flex flex-vertical-c flex-justify-between m-b-22">
              <view>服务名称：</view>
              <view class="flex flex-vertical-c color-gray">{{ codeServices[0].name }}</view>
            </view>
            <view class="flex flex-vertical-c flex-justify-between m-b-16">
              <view>服务费：</view>
              <view class="flex flex-vertical-c color-gray">
                {{ codeServices[0].price || '--' }}元
              </view>
            </view>
          </view>
        </view>
        <!--安装服务订单-->
        <view
          v-if="installServices && installServices.length"
          class="detail-address m-t-16 m-b-16"
          @click.stop="addedServicesClick(installServices[0])"
        >
          <view class="detail-address__user fz-32 fz-b flex">
            <text class="flex1">安装服务订单</text>
            <VoIcon :opacity="0.65" :size="20" color="#000000" name="right-arrow" />
          </view>
          <view class="detail-address__order fz-26">
            <view class="flex flex-vertical-c flex-justify-between m-b-22">
              <view>服务名称：</view>
              <view class="flex flex-vertical-c color-gray">{{ installServices[0].name }}</view>
            </view>
            <view class="flex flex-vertical-c flex-justify-between m-b-16">
              <view>上门时间：</view>
              <view class="flex flex-vertical-c color-gray"
                >{{
                  installServices[0].homeStartTime.substr(0, 16) +
                  '-' +
                  installServices[0].homeEndTime.substr(11, 5)
                }}
              </view>
            </view>
            <view class="flex flex-vertical-c flex-justify-between m-b-16">
              <view>服务费：</view>
              <view class="flex flex-vertical-c color-gray">
                {{ installServices[0].price || '--' }}元
              </view>
            </view>
          </view>
        </view>
        <!--以旧换新回收订单-->
        <view
          v-if="recycleServices && recycleServices.length"
          class="detail-address m-t-16 m-b-16"
          @click.stop="addedServicesClick(recycleServices[0])"
        >
          <view class="detail-address__user fz-32 fz-b flex">
            <text class="flex1">以旧换新回收订单</text>
            <VoIcon :opacity="0.65" :size="20" color="#000000" name="right-arrow" />
          </view>
          <view class="detail-address__order fz-26">
            <view class="flex flex-vertical-c flex-justify-between m-b-22">
              <view>服务名称：</view>
              <view class="flex flex-vertical-c color-gray">{{ recycleServices[0].name }}</view>
            </view>
            <view class="flex flex-vertical-c flex-justify-between m-b-16">
              <view>上门时间：</view>
              <view class="flex flex-vertical-c color-gray"
                >{{
                  recycleServices[0].homeStartTime.substr(0, 16) +
                  '-' +
                  recycleServices[0].homeEndTime.substr(11, 5)
                }}
              </view>
            </view>
            <view class="flex flex-vertical-c flex-justify-between m-b-16">
              <view>回收价格：</view>
              <view class="flex flex-vertical-c color-gray">
                {{ recycleServices[0].price || '--' }}元
              </view>
            </view>
          </view>
        </view>
        <!--   订单信息   -->
        <OrderInfo v-if="orderData.id" :orderData="orderData" />
      </view>
      <view class="bg-white">
        <view class="detail-bottom flex flex-vertical-c">
          <view v-show="orderData.status < 1140">
            <VoMoreTooltip
              :arrowStyleSelf="{
                left: '10px',
              }"
              :padding="8"
              color="#ffffff"
              placement="top"
            >
              <view slot="content">
                <view
                  v-for="(role, roleIndex) of moreArr"
                  :key="roleIndex"
                  class="tooltip-box__item"
                  @click="switchRoleFn(orderData, role)"
                  >{{ role.name }}
                </view>
              </view>
              <view class="tooltip-box__moreItem">更多</view>
            </VoMoreTooltip>
          </view>
          <!--   底部固定区域   -->
          <view class="flex1 flex flex-justify-r">
            <block v-if="orderData.status === 1110">
              <view class="detail-bottom__button default" @click="cancelOrderHandler">
                取消订单
              </view>
              <view v-if="orderAddress.name" class="detail-bottom__payFill" @click="payClick">
                去支付
              </view>
              <view v-else class="detail-bottom__payFill disabled">去支付</view>
            </block>
            <block v-else-if="orderData.status === 1120">
              <view v-if="!orderData.goodsDetail[0].refundStatusName">
                <view
                  class="detail-bottom__fill"
                  @click="refundClick(orderData.goodsDetail[0], '退款退货')"
                  >申请退款</view
                >
              </view>
              <view
                v-else
                class="detail-bottom__fill"
                @click="
                  refundClick(orderData.goodsDetail[0], orderData.goodsDetail[0].refundStatusName)
                "
                >{{ orderData.goodsDetail[0].refundStatusName }}</view
              >
              <!--              <view-->
              <!--                v-show="orderData.payAmount > 0"-->
              <!--                class="detail-bottom__button"-->
              <!--                @click="bottomRefundClick(false)"-->
              <!--                >申请退款-->
              <!--              </view>-->
              <view v-if="complaint" class="detail-bottom__fill" @click="reciveGoodGoodClick"
                >提醒发货
              </view>
            </block>
            <block v-else-if="orderData.status === 1130">
              <view class="detail-bottom__button" @click="lookDeliverInfoClick">查看物流</view>
              <view class="detail-bottom__fill" @click="comfirmGoodClick">确认收货</view>
            </block>
            <!-- 已完成 -->
            <block v-else-if="orderData.status === 1140">
              <view class="detail-bottom__button default" @click="lookDeliverInfoClick"
                >查看物流
              </view>
              <view
                v-if="!orderData.isEvaluate"
                class="detail-bottom__fill"
                @click="evaluationClick"
                >评价
              </view>
            </block>
            <block v-else-if="orderData.status === 1150">
              <view
                v-show="showRemarkModal"
                class="detail-bottom__fill detail-bottom__width"
                @click="complaintsClick"
                >我要投诉
              </view>
              <view
                class="detail-bottom__fill detail-bottom__width"
                @click="$cellPhone('400-893-5518')"
                >联系客服
              </view>
            </block>
            <block v-else-if="orderData.status === 1160">
              <view
                v-show="showRemarkModal"
                class="detail-bottom__fill detail-bottom__width"
                @click="complaintsClick"
                >我要投诉
              </view>
              <view
                class="detail-bottom__fill detail-bottom__width"
                @click="$cellPhone('400-893-5518')"
                >联系客服
              </view>
            </block>
          </view>
        </view>
        <VoSafetyArea :is-fixed="false"></VoSafetyArea>
      </view>
    </view>
    <!--   定制服务弹出层   -->
    <u-popup :show="showCode" mode="bottom" @close="close" @open="open">
      <CodeService :added-services="addedServicesData" />
    </u-popup>
    <!--   取消订单弹出层   -->
    <u-popup :show="showCancelOrder" mode="bottom" @close="close" @open="open">
      <CancelOrder @cancelConfirm="cancelConfirm" @cancelOrder="cancelOrder" />
    </u-popup>
    <!-- cashAmount应付现金价格 -->
    <VoPayPopup :show.sync="showPay" :total-price="orderData.cashAmount" @confirm="payHandler" />
    <RefundActionPopup ref="actionPopup" :type-list="refundReasonList" @select="selectType" />
    <!--备注弹框-->
    <VoModal
      :content="content"
      :show="showRemarkModal"
      confir
      confirmText="我知道了"
      @confirm="showRemarkModal = false"
    />
    <VoPayValidation
      :show="payValidationVisible"
      @close="payValidationVisible = false"
      @confirm="payValidationConfirm"
    />
    <!--是否收到货-->
    <VoModal
      :show="showModalCancel"
      :showCancelButton="true"
      cancelColor="#B7B7B7"
      cancelText="未收到"
      confirmColor="rgba(0, 0, 0, 0.85)"
      confirmText="已收到"
      content="您是否收到该订单商品"
      @cancel="showModalCancel = false"
      @confirm="deliveryClick"
    />

    <u-modal :content="content" :show="show" @confirm="show = false" />
    <VoModal
      :content="fastReturnContent"
      :show="fastReturnShow"
      :showCancelButton="true"
      cancelText="我再想想"
      confirmText="确认退款"
      @cancel="fastReturnShow = false"
      @confirm="confirmReturn"
    />

    <VoModal
      :show="showCancel"
      :showCancelButton="true"
      cancelText="我再想想"
      confirmText="取消订单"
      content="该订单同步生成了增值服务订单，如要取消，则将同步取消关联的增值服务订单"
      @cancel="showCancel = false"
      @confirm="confirmCancel"
    />
  </view>
</template>

<script>
  import CodeService from '../components/CodeService'
  import CancelOrder from '../components/CancelOrder'
  import OrderInfo from '../components/OrderInfo'
  import RefundActionPopup from '@/pagesGarage/Order/ReturnExchange/components/RefundActionPopup.vue'
  import {appSource, compareTime, error, getStoreImUserIdFn, goWechat, hideLoading, showLoading} from '@/common/helper'
  // #ifdef APP-PLUS
  const vocenPay = uni.requireNativePlugin('vocen-pay')
  // #endif
  export default {
    name: 'OrderDetail',
    components: { CodeService, CancelOrder, RefundActionPopup, OrderInfo },
    data() {
      return {
        showCancel: false,
        show: false,
        payValidationVisible: false,
        showAlert: true,
        totalPrice: 0,
        showPay: false,
        navTitle: '订单详情',
        carryTo: false, // 订单可入账
        service: false, // 服务费
        showCode: false, // 定制服务弹出层
        showModalCancel: false, // 是否收到货
        showCancelOrder: false, // 取消订单弹出层
        orderId: '',
        orderData: {}, //订单详情数据
        goodNumber: 0, //商品总数量
        //地址信息
        orderAddress: {},
        //买家备注
        buyRemark: '',
        //预计到期时间
        expectedTime: '',

        //定制服务
        addedServicesData: {},
        //订单分润信息
        orderProfitInfoList: [],
        //物流信息
        deliverInfo: [],
        payOrderInfo: {},
        optionsData: {},
        //仅退款原因
        refundReasonList: [],
        //退款原因
        reasonString: '',
        //退款封装数据 仅用于急速退款场景
        refunData: {},
        //顶部倒计时
        timeData: {},
        downData: 0,
        newData: new Date().getTime(),
        //备注弹框内容
        content: '',
        showRemarkModal: false,
        //我要投诉按钮显示与否 默认不显示
        complaint: false,
        installServices: [],
        codeServices: [],
        recycleServices: [],
        //是否显示 修理厂确认收货+7天内可以申请退货退款
        isShowRefure: false,
        smsCode: '', //验证码
        moreArr: [], //更多
        fastReturnShow: false,
        fastReturnContent: '',
      }
    },
    async onLoad(option) {
      this.orderId = option.id
      // await this.getOrderDetailRequest()
    },
    async onShow() {
      await this.getOrderDetailRequest()
    },
    methods: {
      //确认取消
      confirmCancel() {
        this.showCancel = false
        this.showCancelOrder = true
      },
      cancelOrderHandler() {
        console.log(this.orderData)
        let arr = this.orderData.supportList.map((item) => item.id)
        if (arr && arr.length && arr[0]) {
          this.showCancel = true
        } else {
          this.showCancelOrder = true
        }
        // this.showCancelOrder = true
      },
      reback() {
        this.$backFn()
        uni.$emit('updateOrderList')
      },
      //取消进度
      cancelProgress() {
        this.$linkToEasy(
          '/pagesGarage/InstallOrder/CancelProgress?orderData=' + JSON.stringify(this.orderData),
        )
      },
      onChange(e) {
        this.timeData = e
      },
      buyRemarkClick(info) {
        if (info) {
          this.content = info
          this.showRemarkModal = true
        }
      },
      //账期支付验证通过
      payValidationConfirm(code) {
        this.smsCode = code
        let that = this
        const req = {
          payChannel: 0,
          remark: '',
          payType: '61',
          source: appSource(),
          userId: this.orderData.buyerId,
          cashAmount: 0,
          orderId: this.orderData.parentId,
          accountAmount: this.orderData.accountAmount,
          smsCode: code,
        }
        showLoading('加载中')
        this.$VoHttp
          .appPay({
            req,
          })
          .then((res) => {
            this.payValidationVisible = false
            console.log('res.data', res.data)
            this.$u.toast('付款成功')
            setTimeout(() => {
              this.getOrderDetailRequest()
            }, 1000)
            hideLoading()
          })
          .catch((e) => {
            uni.$u.toast(e.message || '支付参数错误')
            hideLoading()
          })
      },
      async payHandler(info) {
        let that = this
        const req = {
          payChannel: 0,
          payKey: info.payKey || '', // 微信支付需要
          payType: info.payTypeCode, // 支付方式(1：微信，11：支付宝，51：银联)
          remark: '',
          source: appSource(),
          userId: this.orderData.buyerId,
          cashAmount: this.orderData.cashAmount,
          orderId: this.orderData.parentId,
          accountAmount: this.orderData.accountAmount || 0,
        }

        if (info.payTypeCode === 1) {
          req.access_token = this.userInfo.access_token
          console.log(JSON.stringify(req), '55555')
          goWechat(`/pages/pay/pay?req=${JSON.stringify(req)}`)
          this.showPay = false
          plus.globalEvent.addEventListener('newintent', (e) => {
            var args = plus.runtime.arguments
            console.log(`args`, args)
            if (args) {
              this.getLookPayResult()
            }
          })
          return
        }
        showLoading('加载中')
        const data = await this.$VoHttp
          .appPay({
            req,
          })
          .then((res) => res.data)
          .catch((e) => {
            uni.$u.toast(e.message || '支付参数错误')
          })
        const payInfo = data.payInfo
        hideLoading()
        this.showPay = false
        vocenPay.voPayModuleView(
          {
            url: payInfo,
            // url: 'https://qr.alipay.com/bax08931vw9wth5je97x5559',
          },
          (res) => {
            if (res.data.businessCode == 'F00001') {
              //拉取支付宝失败
              uni.$u.toast(res.des || '拉起支付宝失败')
            }
          },
        )
        vocenPay.voPayModuleListeningCallback((res) => {
          if (res.data.businessCode == 'S10001') {
            that.getLookPayResult()
          }
        })
      },
      //支付结果页
      getLookPayResult() {
        this.$VoHttp
          .payPayResult({ orderId: this.orderData.parentId })
          .then((res) => {
            console.log('支付结果', res)
            if (res && res.data && +res.data.status === 1) {
              console.log('未支付')
              return
            }
            uni.redirectTo({
              url:
                '/pagesCommon/PayResult/PayResult?type=garage&status=' +
                res.data.status +
                '&price=' +
                this.orderData.payAmount,
            })
          })
          .catch((e) => {
            console.log(e, 'eeeeeeeeeeeeee')
          })
      },
      /**
       * 展开、收起订单可入账
       */
      openProfit() {
        this.carryTo = !this.carryTo
      },
      /**
       * 展开、收起服务费
       */
      openService() {
        this.service = !this.service
      },
      /**
       * 打开弹出层
       */
      open() {
        // console.log('open');
      },
      //定制服务
      addedServicesClick(data) {
        this.addedServicesData = data
        this.addedServicesData.goodsCount = data.count
        //打码服务
        if (data.supportType === 34) {
          this.$linkToEasy(
            '/pagesGarage/InstallOrder/OrderDetail/CustomServiceDetail?id=' + this.orderData.id,
          )
          return
        }
        let installId = ''
        let recycleId = ''
        if (this.orderData.supportList && this.orderData.supportList.length) {
          this.orderData.supportList.forEach((item) => {
            if (item.type === 32) {
              installId = item.id
            }
            if (item.type === 33) {
              recycleId = item.id
            }
          })
        }
        //安装服务
        if (data.supportType === 32 && installId) {
          this.$linkToEasy('/pagesGarage/InstallOrderUser/OrderDetail?id=' + installId)
          return
        }
        //回收服务
        if (data.supportType === 33 && recycleId) {
          this.$linkToEasy('/pagesGarage/RecoveryOrder/RecoveryOrderDetails?id=' + recycleId)
          return
        }
      },
      /**
       * 关闭弹出层
       */
      close() {
        this.showCode = false
        this.showCancelOrder = false
      },
      /**
       * 关闭取消订单弹窗
       */
      cancelOrder() {
        this.showCode = false
        this.showCancelOrder = false
      },
      /**
       * 点击确定按钮关闭弹出层
       */
      cancelConfirm(data) {
        this.showCode = false
        this.showCancelOrder = false

        let param = {
          orderId: this.orderData.id,
          cancelReason: data.reason,
          remark: '',
        }
        this.getCancelOrderRequest(param)
      },
      /**
       * 更多
       */
      switchRoleFn(data, role) {
        if (role.id === '-1') {
          this.$cellPhone('400-893-5518')
          return
        }
        //投诉
        if (role.id === '11') {
          this.complaintsClick()
          return
        }
      },
      /**
       * 添加新地址
       */
      addAddressClick() {
        let data = {}
        this.$linkToEasy(
          '/pagesSupplier/Setting/AddAddress?data=' + JSON.stringify(data) + '&type=1',
        )
      },
      /**
       *查看发货信息
       */
      lookDeliverInfoClick() {
        this.$linkToEasy(
          '/pagesGarage/InstallOrder/OrderDetail/DeliveryMessage?id=' + this.orderData.id,
        )
      },
      /**
       * 跳转备注
       */
      remarkClick() {
        this.$linkToEasy(
          '/pagesGarage/Order/OrderSearch/OrderRemark?data=' + JSON.stringify(this.orderData),
        )
      },
      /**
       * 修改地址
       */
      editAddressClick() {
        this.$linkToEasy(
          `/pagesCommon/AddressList/AddressList?orderId=${this.orderData.id}&type=2&roleType=1&addressId=${this.orderData.orderAddress.id}`,
        )
      },
      evaluationClick() {
        this.$linkToEasy(
          '/pagesGarage/InstallOrder/SendEvaluation?data=' +
            JSON.stringify(this.orderData) +
            '&sourceType=' +
            '0' +
            '&evaluateType=' +
            0,
        )
      },
      /**
       * 联系仓库
       */
      toShopPage() {
        getStoreImUserIdFn({
          companyId:this.orderData.shopId
        }).then(res=>{
          const info = {
            targetId: res,
            type: 0,
            note: this.orderData.shopName,
            platformCode: this.orderData.shopPlatformCode, // 1供应商  2服务商
            isProject: true,
            goods: {
              name: this.orderData.goodsDetail[0].goodsName,
              pic: this.orderData.goodsDetail[0].pic[0],
              id: this.orderData.goodsDetail[0].goodsId,
              cashPrice: this.orderData.cashAmount,
              accountPrice: this.orderData.accountAmount,
              accountPeriodDays: this.orderData.periodDays,
            },
          }
          this.$storage.set('temp_im_room_info', info)
          this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
        }).catch(e=>{

          error(e.message||"未找到店铺客服")
        })

      },
      /**
       * 跳转店铺主页
       */
      toStoreHomePage() {
        this.$linkToEasy('/pagesGarage/ShopList/ShopGoodsList?shopId=' + this.orderData.shopId)
      },
      /**
       * 去支付
       */
      payClick() {
        // 获取订单
        // this.$u.toast('去支付')
        if (!this.orderData.cashAmount) {
          this.payValidationVisible = true
        } else {
          this.showPay = true
        }
      },
      /**
       * 申请退款
       */
      async refundClick(data, name) {
        if (name === '退款退货') {
          // 掉接口返回状态判断
          if (this.orderData.status === 1120) {
            this.bottomRefundClick(false)
            return
          } else {
            let goodData = {
              ...data,
              orderId: this.orderData.id,
              shopId: this.orderData.shopId,
              shopPlatformCode: this.orderData.shopPlatformCode,
              whetherReceiptGoods: true,
              source: this.orderData.source,
              investType: this.orderData.investType,
            }
            console.log(data.goodsCount, data.refundApplyCount, data.refundedCount)
            goodData.goodsCount = data.goodsCount - data.refundApplyCount - data.refundedCount
            this.$linkToEasy(
              '/pagesGarage/Order/ReturnExchange/InitiateRefund?data=' + JSON.stringify(goodData),
            )
            return
          }
        }
        if (name === '退货退款记录') {
          this.$linkToEasy('/pagesGarage/Order/ReturnExchange/ReturnExchange')
          return
        }
        let refundData = {}
        let refundId = ''
        if (data.refundIdList && data.refundIdList.length > 0) {
          refundData = data.refundIdList[0]
        }
        refundId = refundData.id
        if (!refundId) {
          this.$linkToEasy('/pagesGarage/Order/ReturnExchange/ReturnExchange')
          return
        }

        if (refundData.isRefundOnly) {
          // 仅退款详情页面
          this.$linkToEasy('/pagesGarage/Order/ReturnExchange/RefundDetails?id=' + refundId)
          return
        }
        // 退货/退款详情页面
        this.$linkToEasy('/pagesGarage/Order/ReturnExchange/ReturnRefundDetails?id=' + refundId)
      },
      bottomRefundClick(revive) {
        let goodData = {
          orderId: this.orderData.id,
          shopId: this.orderData.shopId,
          shopPlatformCode: this.orderData.shopPlatformCode,
          source: this.orderData.source,
          whetherReceiptGoods: revive,
          ...this.orderData.goodsDetail[0],
        }
        //待发货直接走急速退款
        this.refunData = goodData
        // 此接口比较特殊，校验极速退款
        this.$VoHttp
          .apiRefundCheckFastRefund({
            id: this.orderData.id,
          })
          .catch((err) => {
            console.log(err)
            if (err.code === 'R5000' || err.code === '09008') {
              this.show = true
              this.content = err.message
              return
            }
            this.fastReturnShow = true
            this.fastReturnContent = err.message
          })
          .then((res) => {
            if (res) {
              this.confirmReturn()
            }
          })
      },
      /**
       * 投诉
       */
      complaintsClick() {
        this.$linkToEasy(
          '/pagesCommon/ComplaintPage/ComplaintForm?data=' + JSON.stringify(this.orderData),
        )
      },
      /**
       * 提醒发货
       */
      reciveGoodGoodClick() {
        this.getDeliveryGoodsRequest(this.orderData)
      },
      /**
       * 确认收货
       */
      comfirmGoodClick() {
        this.showModalCancel = true
      },
      deliveryClick() {
        let param = {
          orderId: this.orderData.id,
        }
        this.confirmGoodsRequest(param)
      },
      /**
       * 跳转商品详情页
       */
      goodDetail(item) {
        this.$linkToEasy(
          `/pagesGarage/ShopList/GoodsDetail?id=${item.goodsId}&wid=${this.orderData.warehouseId}`,
        )
      },
      /**
       * 再来一单
       */
      againClick() {
        this.againOrder()
      },
      againOrder() {
        //增值服务
        let codingPrice = ''
        let isCoding = false
        let isInstall = false
        let installationFee = ''
        let isNew = false
        let tradeInFee = ''

        //supportType 31.售后 32.安装 33.回收 34.打码
        let addedServices = this.orderData.goodsDetail[0].addedServices || []
        if (addedServices.length > 0) {
          addedServices.forEach((item) => {
            if (item.supportType === 34) {
              isCoding = true
              codingPrice = item.price
            }
            if (item.supportType === 33) {
              isNew = true
              tradeInFee = item.price
            }

            if (item.supportType === 32) {
              isInstall = true
              installationFee = item.price
            }
          })
        }
        // 存储商品信息，并带到提交订单页面
        // 组装需要的数据
        const orderProductInfo = {
          shopInfo: {
            shopName: this.orderData.shopName,
          },
          goodsInfo: {
            addedServices: this.orderData.goodsDetail[0].addedServices || [],
            goodsCount: 1,
            goodsId: this.orderData.goodsDetail[0].goodsId,
            isCash: true,
            originalPrice: this.orderData.goodsDetail[0].originalPrice,
            periodDays: 0,
            projectId: '',
            shippingType: this.orderData.shippingType || 2, // 1 包邮 2 到付

            //增值服务
            codingPrice: codingPrice,
            isCoding: isCoding,
            isInstall: isInstall,
            installationFee: isInstall, //安装费用
            isNew: isNew,
            tradeInFee: tradeInFee, //回收费用

            shopId: this.orderData.shopId,
            skuProperty: JSON.stringify(this.orderData.skuProperty || {}),
            warehouseId: this.orderData.warehouseId,
            warehouseName: this.orderData.warehouseName,
            arrivalTime: this.orderData.arrivalTime,
            pic: this.orderData.goodsDetail[0].pic,
            name: this.orderData.goodsDetail[0].goodsName,
            modelName: this.orderData.goodsDetail[0].modelName,
          },
        }
        this.$storage.set('ProductInfo', orderProductInfo)
        this.$linkToEasy(`/pagesGarage/ShopList/SubmitOrders`)
      },

      //复制订单
      copyClick() {
        uni.setClipboardData({
          data: this.orderData.id,
        })
      },
      //极速退款确认事件
      confirmReturn() {
        this.fastReturnShow = false
        this.refundReasonRequest()
      },
      // 选择退款原因类型
      selectType(item) {
        this.$refs.actionPopup.close()
        this.reasonString = item.name

        this.getRefundCalculateAmount()
      },
      //获取订单详情
      getOrderDetailRequest() {
        let param = { id: this.orderId }
        this.$VoHttp
          .apiOrderSell$Id(param)
          .then((res) => {
            this.orderData = res.data
            // if (+this.orderData.status === 1110) {
            //   this.payClick()
            // }
            if (this.orderData.goodsDetail && this.orderData.goodsDetail.length) {
              let addedServices = this.orderData.goodsDetail[0].addedServices
              if (addedServices && addedServices.length) {
                this.installServices = addedServices.filter((item) => item.supportType === 32)
                this.codeServices = addedServices.filter((item) => item.supportType === 34)
                this.recycleServices = addedServices.filter((item) => item.supportType === 33)
              }
            }
            //判断是否已申请安装服务
            if (this.orderData.supportList && this.orderData.supportList.length) {
              let id = this.orderData.supportList.filter((ele) => ele.type === 32)[0].id
              this.orderData.isHasInstall = id ? true : false
            } else {
              this.orderData.isHasInstall = false
            }
            this.orderDetailProcessData(this.orderData)
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('订单详情获取失败')
          })
      },

      orderDetailProcessData() {
        // 判断我要投诉按钮显示与否
        this.complaint = compareTime(this.orderData.nextStageTime)
        this.moreArr = []
        if (this.complaint) {
          this.moreArr.push({ name: '我要投诉', id: '11' })
        }
        this.moreArr.push({ name: '联系客服', id: '-1' })

        let Time = new Date(this.orderData.nextStageTime.replace(/-/g, '/'))
        let timestemp = Time.getTime()
        this.downData = timestemp - this.newData

        let finishTime = ''
        this.orderData.timeList.forEach((item) => {
          //完成时间
          if (item.timeName === '完成时间') {
            finishTime = item.createTime
          }
        })
        //处理申请退货退款按钮是否显示
        if (finishTime) {
          //修理厂确认收货+7天内可以申请退货退款
          let time = new Date(finishTime).getTime() + 7 * 24 * 60 * 60 * 1000
          if (time < this.newData) {
            this.isShowRefure = false
          } else {
            this.isShowRefure = true
          }
        } else {
          this.isShowRefure = true
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
        //地址信息
        this.orderAddress = this.orderData.orderAddress
        //订单分润信息
        this.orderProfitInfoList = this.orderData.orderProfitInfoList
        //物流信息
        this.deliverInfo = this.orderData.deliveryDetail
      },
      //取消订单请求
      getCancelOrderRequest(param) {
        this.$VoHttp
          .apiOrderSellCancel({ req: param })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast(res.message || '订单取消成功')
              this.getOrderDetailRequest()
            } else {
              uni.$u.toast(res.message || '订单取消失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('订单取消失败')
          })
      },
      //确认收货请求请求
      confirmGoodsRequest(param) {
        this.showModalCancel = false
        this.$VoHttp
          .apiOrderSellReceive({ req: param })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('确认收货成功')
              this.getOrderDetailRequest()
            } else {
              uni.$u.toast(res.message || '收货失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('收货失败')
          })
      },
      //提醒发货请求请求
      getDeliveryGoodsRequest(data) {
        let param = {
          orderId: data.id,
        }
        console.log(param)
        this.$VoHttp
          .apiOrderInvestWarn({ req: param })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast(res.message || '提醒发货成功')
              setTimeout((callback) => {
                this.getOrderDetailRequest()
              }, 1500)
            } else {
              uni.$u.toast(res.message || '提醒发货失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '提醒发货失败')
          })
      },
      //仅退款原因
      refundReasonRequest() {
        let params = {
          type: 1,
        }
        this.$VoHttp
          .apiOrderRefundCauseQueryList(params)
          .then((res) => {
            if (res.code === '20001') {
              console.log(res)
              let array = res.data
              this.refundReasonList = []
              array.forEach((item) => {
                let param = {
                  name: item,
                }
                this.refundReasonList.push(param)
                this.$refs.actionPopup.show()
              })
            } else {
            }
          })
          .catch((err) => {
            uni.hideLoading()
            console.log('err', err)
          })
      },
      //计算可退金额请求
      getRefundCalculateAmount() {
        let params = {
          orderId: this.orderData.id,
          goodsId: this.refunData.goodsId,
          goodsCount: this.refunData.goodsCount,
          projectId: 0,
        }
        this.$VoHttp
          .apiRefundCalculateAmount(params)
          .then((res) => {
            if (res.code === '20001') {
              this.applyForRefundRequest(res.data)
            } else {
              uni.$u.toast(res.message || '退款金额获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '退款金额获取失败')
          })
      },
      //发起退款申请请求
      applyForRefundRequest(price) {
        let params = {
          orderId: this.refunData.orderId,
          goodsId: this.refunData.goodsId,
          goodsCount: this.refunData.goodsCount,
          amount: price,
          source: this.refunData.source,
          shopId: this.refunData.shopId,
          whetherReceiptGoods: this.refunData.whetherReceiptGoods,
          shopPlatformCode: this.refunData.shopPlatformCode,
          reason: this.reasonString,
          isRefundOnly: true,
        }

        let goodsInfos = []
        this.orderData.goodsDetail.forEach((item) => {
          let param = {
            goodsId: item.projectId ? item.projectId : item.goodsId,
            goodsCount: item.goodsCount,
            amount: item.payPrice * item.goodsCount,
          }
          goodsInfos.push(param)
        })
        params.goodsInfos = goodsInfos
        uni.showLoading({
          title: '加载中',
        })
        this.$VoHttp
          .apiRefundCreateFefundApply(params)
          .then((res) => {
            uni.hideLoading()
            if (res.code === '20001') {
              uni.$u.toast('发起退货申请成功')
              setTimeout(() => {
                this.getOrderDetailRequest()
              }, 1500)
            } else {
              uni.$u.toast(res.message || '发起退货失败')
            }
          })
          .catch((err) => {
            uni.hideLoading()
            console.log('err', err)
            uni.$u.toast(err.message || '发起退货失败')
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .detail {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;

    .padding-box {
      padding: 28rpx 32rpx;
      box-sizing: border-box;
    }

    &-state {
      width: 750rpx;
      height: 108rpx;
      // color: #ffffff;
      color: rgba(0, 0, 0, 0.85);
      background: #f6f7f8;
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
        width: 272rpx;
        height: 64rpx;
        line-height: 64rpx;
        background-color: $color-primary-yellow;
        color: #fff;
        border-radius: 320rpx;
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

      &__edit {
        width: 48rpx;
        height: 48rpx;
      }

      &.box {
        padding: 24rpx 32rpx;
        box-sizing: border-box;
      }

      &__user {
        padding: 24rpx 0;
        margin: 0 32rpx;
        // border-bottom: 2rpx solid $v-bg-light;
        color: #000;

        .chat {
          width: 48rpx;
          height: 48rpx;
        }

        .right {
          width: 32rpx;
          height: 32rpx;
        }
      }

      .desc {
        margin: 0 32rpx;
        padding-bottom: 24rpx;
        box-sizing: border-box;
        &-margin {
          margin-left: 56rpx;
        }
      }

      &__info {
        padding: 16rpx 0;
        margin: 0 32rpx;
        border-bottom: 2rpx solid $v-bg-light;

        .info-place {
          width: 438rpx;
        }
      }

      &__note {
        padding: 16rpx 0;
        margin: 0 32rpx;
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
      padding: 24rpx 32rpx 16rpx;
      background: #ffffff;
      border-top: 2rpx solid $v-bg-light;

      &__button {
        width: 160rpx;
        height: 80rpx;
        line-height: 80rpx;
        border: 2rpx solid $color-primary-yellow;
        border-radius: 40rpx;
        text-align: center;
        font-size: 24rpx;
        color: $color-primary-yellow;
        margin-left: 32rpx;
        box-sizing: border-box;

        &.default {
          border: 1px solid rgba(0, 0, 0, 0.25);
          background: #ffffff;
          color: rgba(0, 0, 0, 0.85);
        }
      }

      &__width {
        width: 200rpx;
      }

      &__fill {
        width: 160rpx;
        height: 80rpx;
        line-height: 80rpx;
        background: #fff;
        border: 2rpx solid $color-primary-yellow;
        border-radius: 40rpx;
        text-align: center;
        font-size: 24rpx;
        color: $color-primary-yellow;
        margin-left: 32rpx;

        &.disabled {
          background: #f6f7f8;
          color: rgba(0, 0, 0, 0.25);
        }

        &.yellow-disabled {
          background: #ff7a4d;
          color: rgba(255, 255, 255, 0.85);
        }
      }

      &__payFill {
        width: 160rpx;
        height: 80rpx;
        line-height: 80rpx;
        background: $color-primary-yellow;
        border: 2rpx solid $color-primary-yellow;
        border-radius: 40rpx;
        text-align: center;
        font-size: 24rpx;
        color: #fff;
        margin-left: 32rpx;

        &.disabled {
          background: #f6f7f8;
          color: rgba(0, 0, 0, 0.25);
        }

        &.yellow-disabled {
          background: #ff7a4d;
          color: rgba(255, 255, 255, 0.85);
        }
      }
    }

    &-w {
      width: 750rpx;
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

  .add-box {
    padding: 20rpx 0;
    box-sizing: border-box;
  }

  .p-b-safe-area {
    background: #ffffff;
  }

  .good-bottom {
    &__left {
      margin-top: 16rpx;
      height: 42rpx;

      .tips {
        padding: 0 4rpx;
        height: 28rpx;
        line-height: 28rpx;
        text-align: center;
        background: #fdf2f3;
        border: 2rpx solid #ec404d;
        border-radius: 4rpx;
        font-size: 24rpx;
        color: #ec404d;
      }

      .price {
        font-size: 28rpx;
        color: $color-primary-red;
        margin-left: 8rpx;
      }
    }

    &__num {
      margin-top: 8rpx;
      height: 42rpx;
      line-height: 42rpx;
      font-weight: bold;
      font-size: 28rpx;
      color: $v-c0-45;
    }
  }

  .alert-box {
    padding: 24rpx 32rpx;
    color: #ee0a24;
    background: #feecee;
  }

  .tooltip-box {
    width: 240rpx;
    font-size: 28rpx;
    color: #ffffff;

    &__item {
      height: 87rpx;
      line-height: 87rpx;
      width: 240rpx;
      text-align: center;
      font-size: 28rpx;
      border-bottom: 2rpx solid rgba(0, 0, 0, 0.08);
      color: $v-c0-65;

      &:last-child {
        border-bottom: 0rpx;
      }
    }

    &__moreItem {
      height: 40rpx;
      line-height: 40rpx;
      text-align: center;
      color: $v-c0-45;
    }
  }
  .good-tips {
    height: 36rpx;
    line-height: 36rpx;
    font-size: 24rpx;
    color: $color-primary-yellow;
    padding: 0 12rpx;
    background: $v-tags-btn-disabled;
    border-radius: 24rpx;
  }
</style>
