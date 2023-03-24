<template>
  <view>
    <view class="detail flex flex-column">
      <!--导航栏 -->
      <VoNav :title="navTitle" is-fixed is-have-more>
        <template #title>
          <view class="flex flex-justify-c flex-vertical-c">
            <!--标题状态前面显示logo-->
            <VoIcon v-if="type === 1110" :size="28" class="p-r-14" name="clock-orange" />
            <VoIcon v-else-if="type === 1120" :size="28" class="p-r-14" name="clock-new" />
            <!--标题状态-->
            <view v-if="type === 1110" class="fz-36 fz-b detail-title">等待付款</view>
            <view v-else class="fz-36 fz-b color-block">{{ orderData.statusName }}</view>
          </view>
        </template>

      </VoNav>
      <!--订单各个状态的提示语操作-->
      <!--待支付-->
      <view v-if="type === 1110" class="detail-statePay">
        <view class="m-t-24 flex flex-justify-c">
          <view class="flex fz-b fz-28">
            <view class="p-r-12">需付款:</view>
            <VoPointPrice
              :leftSize="14"
              :price="orderData.payAmount"
              :rightSize="14"
              color="rgba(0, 0, 0, 0.85)"
            />
          </view>
          <view class="fz-26 m-l-32 flex">
            <view class="color-block">剩余时间: </view>
            <view class="p-l-12">
              <u-count-down :time="downData" @change="onChange">
                <view class="time">
                  <text class="time__item">
                    <text v-if="timeData.hours">{{
                      timeData.hours > 10 ? timeData.hours : '0' + timeData.hours
                    }}</text>
                    <text v-else>00</text>
                    小时</text
                  >
                  <text class="time__item">{{ timeData.minutes || '00' }}分钟</text>
                </view>
              </u-count-down>
            </view>
          </view>
        </view>
        <view class="flex flex-justify-c">
          <view class="detail-statePay__goPay" @click="payClick">去支付</view>
        </view>
      </view>
      <!--待发货-->
      <view v-else-if="type === 1120">
        <view v-if="!orderData.isWarn">
          <view class="m-t-24 m-l-32 m-r-32 p-b-24 fz-26">
            <view>预计{{ orderData.predictReceiptTime || '' }}前应送达</view>
            <view class="m-t-16">平台已提醒商家尽快发货，请耐心等待。</view>
          </view>
        </view>
        <view v-else class="m-t-24 p-b-24 flex flex-justify-c">
          <view class="fz-28">{{ orderData.predictReceiptTime || '' }}前应送达</view>
        </view>
      </view>
      <view v-else-if="type === 1130" class="m-t-24 p-b-24 flex flex-justify-c">
        <view class="fz-28">{{ orderData.nextStageTime || '' }}之前送达</view>
      </view>
      <view v-else-if="type === 1150" class="m-t-24 p-b-24 flex flex-justify-c">
        <view class="fz-28">取消原因：{{ orderData.cancelReason || '' }} </view>
      </view>
      <view class="detail-flex1 flex1 overflow-y">
        <!--   物流进度   -->
        <view
          v-if="type === 1130 || type === 1140"
          class="detail-address m-t-16"
          @click="deliveryClick"
        >
          <view class="detail-address__user fz-32 fz-b">物流进度</view>
          <view class="flex flex-justify-between flex-vertical-c detail-address__profit">
            <view class="fz-26"
              >当前订单有{{ deliverInfo.length }}个包裹，{{ deliverInfo.length }}个已发出
            </view>
            <VoIcon :opacity="0.25" :size="16" name="right-arrow" />
          </view>
        </view>
        <!--   地址信息   -->
        <view class="detail-address m-t-16">
          <view class="detail-address__info flex flex-vertical-c flex-justify-between">
            <view>
              <VoIcon name="address" />
            </view>
            <view class="m-l-8 flex1">
              <view class="fz-28 flex flex-vertical-c m-l-16">
                <text> {{ orderAddress.name }} </text>
                <text> {{ orderAddress.phone }} </text>
                <text v-if="orderAddress.status === 1110" class="fz-24 tag m-l-16"
                  >安装/以旧换新/收货地址</text
                >
              </view>
              <view class="flex flex-justify-between">
                <view class="fz-26 m-t-8">
                  {{ orderAddress.address }}{{ orderAddress.addressDetail }}</view
                >
                <view v-if="orderData.status === 1110" class="flex flex-vertical-c flex-justify-r">
                  <view class="fz-24 m-r-8" @click="editAddressClick()">修改</view>
                  <VoIcon name="edit-line" />
                </view>
              </view>
            </view>
          </view>
        </view>
        <!--   货物信息   -->
        <view class="detail-address m-t-16">
          <view class="flex flex-justify-between flex-vertical-c">
            <view class="detail-address__user flex flex-vertical-c" @click="toShopPage">
              <VoIcon name="smile-s" />
              <view class="m-l-8 fz-32 fz-b"> {{ orderData.shopName }}</view>
            </view>
            <VoIcon v-if="orderData.isValet" class="m-r-32" name="generation" />
          </view>
          <view class="detail-address__user fz-32 fz-b">{{ orderData.warehouseName }} </view>
          <view
            v-for="(item, index) in orderData.goodsDetail"
            :key="index"
            @click="goodDetail(item)"
          >
            <view class="detail-address__list flex" @click="goodDetail(item)">
              <image :src="item.pic[0]" class="list-image" />
              <view class="flex1 m-l-16 flex flex-column flex-justify-between">
                <view class="fz-28 fz-b list-hidden">{{ item.goodsName }}</view>
                <view class="good-bottom flex flex-justify-between">
                  <view class="good-bottom__left flex flex-vertical-c">
                    <view class="tips">{{
                      item.periodDays > 0 ? `${item.periodDays}天账期` : '现金价'
                    }}</view>
                    <view class="price flex flex-vertical-c">
                      <VoPointPrice :price="item.originalPrice.toString()" />
                      <view>元</view>
                    </view>
                  </view>
                  <view class="good-bottom__num">x{{ item.goodsCount }}</view>
                </view>
              </view>
            </view>
            <view v-if="item.addedServices">
              <view
                v-for="(added, index) in item.addedServices"
                :key="index"
                class="detail-address__serve flex flex-vertical-c"
                @click="addedServicesClick(added, item)"
              >
                <view class="serve-word">{{ added.name }}：</view>
                <view class="serve-num">{{ added.price }}元/{{ added.count }}台</view>
                <VoIcon :opacity="0.25" :size="20" class="serve-icon" name="right-arrow" />
              </view>
            </view>
          </view>
          <view
            class="detail-address__info fz-32 flex flex-vertical-c flex-justify-between"
            @click="buyRemarkClick(buyRemark)"
          >
            <view>
              <view>备注：</view>
              <view v-if="buyRemark" class="color-gray"> {{ buyRemark }} </view>
            </view>
            <VoIcon :opacity="0.45" color="#000000" name="right-arrow" />
          </view>
        </view>
        <!--定制服务订单-->
        <view v-if="orderData.status === 1110" class="detail-address m-t-16 m-b-16">
          <view
            class="flex flex-justify-between flex-vertical-c m-l-32 m-r-32"
            @click="codeServiceClick"
          >
            <view class="m-t-24 p-b-24 fz-32 fz-b">定制服务订单</view>
            <VoIcon :opacity="0.45" color="#000000" name="right-arrow" />
          </view>
          <view class="detail-address__line m-l-32" />
          <view class="flex flex-justify-between flex-vertical-c m-l-32 m-r-32">
            <view class="m-t-16 fz-28">服务名称:</view>
            <view class="fz-28 color-block-45">定制服务</view>
          </view>
          <view class="flex flex-justify-between flex-vertical-c p-b-16 m-l-32 m-r-32">
            <view class="m-t-16 fz-28">服务费:</view>
            <view class="fz-28 color-block-45">100元</view>
          </view>
        </view>
        <!--安装服务订单-->
        <view v-if="orderData.status === 1110" class="detail-address m-t-16 m-b-16">
          <view
            class="flex flex-justify-between flex-vertical-c m-l-32 m-r-32"
            @click="installServiceClick"
          >
            <view class="m-t-24 p-b-24 fz-32 fz-b">安装服务订单</view>
            <VoIcon :opacity="0.45" color="#000000" name="right-arrow" />
          </view>
          <view class="detail-address__line m-l-32" />
          <view class="flex flex-justify-between flex-vertical-c m-l-32 m-r-32">
            <view class="m-t-16 fz-28">服务名称:</view>
            <view class="fz-28 color-block-45">B15安装</view>
          </view>
          <view class="flex flex-justify-between flex-vertical-c m-l-32 m-r-32">
            <view class="m-t-16 fz-28">上门时间:</view>
            <view class="fz-28 color-block-45">2022-06-21 09:00-12:00</view>
          </view>
          <view class="flex flex-justify-between flex-vertical-c p-b-16 m-l-32 m-r-32">
            <view class="m-t-16 fz-28">服务费:</view>
            <view class="fz-28 color-block-45">100元</view>
          </view>
        </view>
        <!--以旧换新回收订单-->
        <view v-if="orderData.status === 1110" class="detail-address m-t-16 m-b-16">
          <view
            class="flex flex-justify-between flex-vertical-c m-l-32 m-r-32"
            @click="newServiceClick"
          >
            <view class="m-t-24 p-b-24 fz-32 fz-b">以旧换新回收订单</view>
            <VoIcon :opacity="0.45" color="#000000" name="right-arrow" />
          </view>
          <view class="detail-address__line m-l-32" />
          <view class="flex flex-justify-between flex-vertical-c m-l-32 m-r-32">
            <view class="m-t-16 fz-28">服务名称:</view>
            <view class="fz-28 color-block-45">B15回收</view>
          </view>
          <view class="flex flex-justify-between flex-vertical-c m-l-32 m-r-32">
            <view class="m-t-16 fz-28">上门时间:</view>
            <view class="fz-28 color-block-45">2022-06-21 09:00-12:00</view>
          </view>
          <view class="flex flex-justify-between flex-vertical-c p-b-16 m-l-32 m-r-32">
            <view class="m-t-16 fz-28">回收价格:</view>
            <view class="fz-28 color-block-45">-1000元</view>
          </view>
        </view>
        <!--   订单信息   -->
        <view class="detail-address m-t-16 m-b-16">
          <!--待付款-->
          <view v-if="orderData.status === 1110">
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
              <view
                v-if="orderData.isCash"
                class="flex flex-vertical-c flex-justify-between m-t-16"
              >
                <view>支付方式：</view>
                <!--isCash 1在线支付 2账期支付-->
                <view v-if="orderData.isCash === true" class="flex flex-vertical-c color-gray"
                  >在线支付
                </view>
                <view v-else class="flex flex-vertical-c color-gray">账期支付</view>
              </view>
              <view class="detail-address__line m-t-24" />
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>商品总额：</view>
                <view class="flex flex-vertical-c color-gray">{{ orderData.goodsAmount }}元</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>增值服务费：</view>
                <view class="flex flex-vertical-c color-gray"
                  >{{ orderData.serviceAmount || '0' }}元</view
                >
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>应付款：</view>
                <view class="flex flex-vertical-c color-red">{{ orderData.payAmount }}元</view>
              </view>
            </view>
          </view>
          <!--待发货-->
          <view v-if="orderData.status === 1120">
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
              <view
                v-if="orderData.isCash"
                class="flex flex-vertical-c flex-justify-between m-t-16"
              >
                <view>支付方式：</view>
                <!--isCash 1在线支付 2账期支付-->
                <view v-if="orderData.isCash === true" class="flex flex-vertical-c color-gray"
                  >在线支付
                </view>
                <view v-else class="flex flex-vertical-c color-gray">账期支付</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>商品总额：</view>
                <view class="flex flex-vertical-c color-gray">{{ orderData.goodsAmount }}元</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>增值服务费：</view>
                <view class="flex flex-vertical-c color-gray"
                  >{{ orderData.serviceAmount || '0' }}元</view
                >
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>实付款：</view>
                <view class="flex flex-vertical-c color-red">{{ orderData.payAmount }}元</view>
              </view>
            </view>
          </view>
          <!--已发货-->
          <view v-if="orderData.status === 1130">
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
              <view
                v-if="orderData.isCash"
                class="flex flex-vertical-c flex-justify-between m-t-16"
              >
                <view>支付方式：</view>
                <!--isCash 1在线支付 2账期支付-->
                <view v-if="orderData.isCash === true" class="flex flex-vertical-c color-gray"
                  >在线支付
                </view>
                <view v-else class="flex flex-vertical-c color-gray">账期支付</view>
              </view>
              <view v-if="payTime" class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>支付时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ payTime }}</view>
              </view>
              <view v-if="deliverGoodTime" class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>发货时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ deliverGoodTime }}</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>商品总额：</view>
                <view class="flex flex-vertical-c color-gray">{{ orderData.goodsAmount }}元</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>增值服务费：</view>
                <view class="flex flex-vertical-c color-gray"
                  >{{ orderData.serviceAmount || '0' }}元</view
                >
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>实付款：</view>
                <view class="flex flex-vertical-c color-red">{{ orderData.payAmount }}元</view>
              </view>
            </view>
          </view>
          <!--已完成-->
          <view v-if="orderData.status === 1140">
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
              <view v-if="deliverGoodTime" class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>发货时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ deliverGoodTime }}</view>
              </view>
              <view v-if="finishTime" class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>完成时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ finishTime }}</view>
              </view>
              <view
                v-if="orderData.isCash"
                class="flex flex-vertical-c flex-justify-between m-t-16"
              >
                <view>支付方式：</view>
                <!--isCash 1在线支付 2账期支付-->
                <view v-if="orderData.isCash === true" class="flex flex-vertical-c color-gray"
                  >在线支付
                </view>
                <view v-else class="flex flex-vertical-c color-gray">账期支付</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>商品总额：</view>
                <view class="flex flex-vertical-c color-gray">{{ orderData.goodsAmount }}元</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>增值服务费：</view>
                <view class="flex flex-vertical-c color-gray"
                  >{{ orderData.serviceAmount || '0' }}元</view
                >
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>实付款：</view>
                <view class="flex flex-vertical-c color-red">{{ orderData.payAmount }}元</view>
              </view>
            </view>
          </view>
          <!--已取消-->
          <view v-if="orderData.status === 1150">
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
              <view v-if="orderCancelTime" class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>取消时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ orderCancelTime }}</view>
              </view>
              <view
                v-if="orderData.isCash"
                class="flex flex-vertical-c flex-justify-between m-t-16"
              >
                <view>支付方式：</view>
                <!--isCash 1在线支付 2账期支付-->
                <view v-if="orderData.isCash === true" class="flex flex-vertical-c color-gray"
                  >在线支付
                </view>
                <view v-else class="flex flex-vertical-c color-gray">账期支付</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>商品总额：</view>
                <view class="flex flex-vertical-c color-gray">{{ orderData.goodsAmount }}元</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>增值服务费：</view>
                <view class="flex flex-vertical-c color-gray"
                  >{{ orderData.serviceAmount || '0' }}元</view
                >
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>实付款：</view>
                <view class="flex flex-vertical-c color-red">{{ orderData.payAmount }}元</view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!--   底部固定区域   -->
      <view v-if="type === 1110" class="detail-bottom flex flex-justify-r">
        <view class="p-b-safe-area" />
        <view class="detail-bottom__button" @click="showCancelOrder = true">取消订单</view>
        <view class="detail-bottom__fill" @click="payClick">去支付</view>
      </view>
      <view v-else-if="type === 1120" class="detail-bottom flex flex-justify-r">
        <view class="p-b-safe-area" />
        <view class="detail-bottom__button" @click="bottomRefundClick(false)">申请退换货</view>
        <view v-if="complaint" class="detail-bottom__button" @click="complaintsClick"
          >我要投诉</view
        >
        <view v-if="complaint" class="detail-bottom__fill" @click="reciveGoodGoodClick"
          >提醒发货</view
        >
      </view>
      <view v-else-if="type === 1130" class="detail-bottom flex flex-justify-r">
        <view class="p-b-safe-area" />
        <view class="detail-bottom__button" @click="bottomRefundClick(true)">申请退换货</view>
        <view class="detail-bottom__button" @click="lookDeliverInfoClick">查看物流</view>
        <view class="detail-bottom__fill" @click="comfirmGoodClick">确认收货</view>
      </view>
      <view v-else-if="type === 1140" class="detail-bottom flex flex-justify-r">
        <view class="p-b-safe-area" />
        <view class="detail-bottom__button" @click="bottomRefundClick(true)">申请退换货</view>
        <view class="detail-bottom__button" @click="lookDeliverInfoClick">查看物流</view>
<!--        <view class="detail-bottom__fill detail-bottom__width" @click="againClick">再来一单</view>-->
        <view v-if="!orderData.isEvaluate" class="detail-bottom__fill" @click="evaluationClick"
          >评价</view
        >
      </view>
<!--      <view v-else-if="type === 1150" class="detail-bottom flex flex-justify-r">-->
<!--        <view class="p-b-safe-area" />-->
<!--        <view class="detail-bottom__fill detail-bottom__width" @click="againClick">再来一单</view>-->
<!--      </view>-->
      <view class="p-b-safe-area" />
    </view>
    <!--   定制服务弹出层   -->
    <u-popup :show="showCode" mode="bottom" @close="close" @open="open">
      <CodeService :added-services="addedServicesData" />
    </u-popup>
    <!--   取消订单弹出层   -->
    <u-popup :show="showCancelOrder" mode="bottom" @close="close" @open="open">
      <CancelOrder @cancelConfirm="cancelConfirm" @closeFn="showCancelOrder = false" />
    </u-popup>

    <VoPayPopup :show.sync="showPay" :total-price="orderData.payAmount" @confirm="payHandler" />
    <RefundActionPopup ref="actionPopup" :type-list="refundReasonList" @select="selectType" />
    <!--备注弹框-->
    <VoModal
      :content="content"
      :show="showRemarkModal"
      confir
      confirmText="我知道了"
      @confirm="showRemarkModal = false"
    />
  </view>
</template>

<script>
  import CodeService from '../components/CodeService'
  import CancelOrder from '../components/CancelOrder'
  import RefundActionPopup from '@/pagesGarage/Order/ReturnExchange/components/RefundActionPopup.vue'
  import { appSource, hideLoading, showLoading, goWechat } from '@/common/helper'
  // #ifdef APP-PLUS
  const vocenPay = uni.requireNativePlugin('vocen-pay')
  // #endif
  export default {
    name: 'OrderDetail',
    components: { CodeService, CancelOrder, RefundActionPopup },
    data() {
      return {
        totalPrice: 0,
        showPay: false,
        type: 0, // 1110.待付款 1120.待发货 1150.已取消 1130.已发货 1140.已完成
        navTitle: '订单详情',
        carryTo: false, // 订单可入账
        service: false, // 服务费
        showCode: false, // 定制服务弹出层
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
        //下单时间
        createOrderTime: '',
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
      }
    },
    onLoad(option) {
      let orderData = (this.optionsData = JSON.parse(option.data))

      this.orderId = orderData.id
      if (orderData.status === 1130 || orderData.status === 1140) {
        this.getDeliverDetailRequest()
      }

      if (option.payType === '1') {
        this.payClick()
      }
    },
    onShow() {
      this.getOrderDetailRequest()
      //判断我要投诉按钮显示与否
      this.complaint = compareTime(this.orderData.nextStageTime)
    },
    methods: {
      onChange(e) {
        this.timeData = e
      },
      buyRemarkClick(info) {
        if (info) {
          this.content = info
          this.showRemarkModal = true
        }
      },
      /**
       * 定制服务
       */
      codeServiceClick() {
        this.$linkToEasy('/pagesGarage/Order/OrderDetail/CodeServiceDetail')
      },
      /**
       * 安装服务
       */
      installServiceClick() {
        this.$linkToEasy('/pagesGarage/Order/OrderDetail/InstallServiceDetail')
      },
      /**
       * 以旧换新服务
       */
      newServiceClick() {
        this.$linkToEasy('/pagesGarage/Order/OrderDetail/OldAndNewService')
      },
      async payHandler(info) {
        let that = this
        const req = {
          payChannel: 0,
          payKey: info.payKey, // 微信支付需要
          payType: info.payTypeCode, // 支付方式(1：微信，11：支付宝，51：银联)
          remark: '',
          source: appSource(),
          userId: this.orderData.buyerId,
          cashAmount: this.orderData.payAmount,
          orderId: this.orderId,
          accountAmount: this.orderData.accountAmount || 0,
        }
        if (info.payTypeCode === 1) {
          req.access_token = this.userInfo.access_token
          console.log(JSON.stringify(req), '55555')
          goWechat(`/pages/pay/pay?req=${JSON.stringify(req)}`)
          this.showPay = false
          plus.globalEvent.addEventListener('newintent', e => {
            var args = plus.runtime.arguments;
            console.log(`args`, args);
            if (args) {
              that.$VoHttp
                .payPayResult({ orderId: that.payOrderInfo.orderId })
                .then((res) => {
                  plus.globalEvent.removeEventListener('newintent');
                  that.onLoad(that.optionsData)
                })
                .catch((e) => {
                  console.log(e, 'eeeeeeeeeeeeee')
                })
            }
          })
          return
        }
        showLoading('加载中')
        const { payInfo } = await this.$VoHttp
          .appPay({
            req,
          })
          .then((res) => res.data)
          .catch((e) => {
            uni.$u.toast(e.message || '支付参数错误')
          })
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
            that.$VoHttp
              .payPayResult({ orderId: that.payOrderInfo.orderId })
              .then((res) => {
                vocenPay.voPayRemoveListening()
                that.onLoad(that.optionsData)
              })
              .catch((e) => {
                console.log(e, 'eeeeeeeeeeeeee')
              })
          }
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
      addedServicesClick(data, item) {
        this.showCode = true
        this.addedServicesData = data
        this.addedServicesData.goodsCount = item.goodsCount
      },
      /**
       * 关闭弹出层
       */
      close() {
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
       *查看发货信息
       */
      lookDeliverInfoClick() {
        this.$linkToEasy('/pagesSupplier/Order/OrderDetail/DeliveryMessage?id=' + this.orderData.id)
      },
      /**
       * 跳转发货信息页面
       */
      deliveryClick() {
        this.$linkToEasy('/pagesGarage/Order/OrderDetail/DeliveryMessage?id=' + this.orderData.id)
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
          '/pagesGarage/MyEvaluation/SendEvaluation?data=' +
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
        //createTime	string 非必须 创建时间 format: date-time
        //disturb	integer 非必须 是否开启消息免打扰 0：关闭   1：开启 format: int32
        //id	integer 非必须 对话框id format: int64
        //targetId	integer 非必须 目标人id或者群id format: int64
        //userId	integer 非必须 用户id
        //version	integer 非必须 数据版本
        const info = {
          targetId: this.orderData.shopId,
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
      },
      /**
       * 去支付
       */
      payClick() {
        // 获取订单
        // this.$u.toast('去支付')
        this.showPay = true
      },
      /**
       * 申请退款
       */
      refundClick(data) {
        let goodData = {
          orderId: this.orderData.id,
          shopId: this.orderData.shopId,
          shopPlatformCode: this.orderData.shopPlatformCode,
          source: this.orderData.source,
          whetherReceiptGoods: this.orderData.status === 1140 ? true : false,
          ...data,
        }
        //待发货直接走急速退款
        if (this.orderData.status === 1120) {
          this.refunData = goodData
          this.refundReasonRequest()
          return
        }
        this.$linkToEasy(
          '/pagesGarage/Order/ReturnExchange/InitiateRefund?data=' + JSON.stringify(goodData),
        )
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
        if (this.orderData.status === 1120) {
          this.refunData = goodData
          this.refundReasonRequest()
          return
        }

        this.$linkToEasy(
          '/pagesGarage/Order/ReturnExchange/InitiateRefund?data=' + JSON.stringify(goodData),
        )
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
        // 存储商品信息，并带到提交订单页面
        // 组装需要的数据
        const orderProductInfo = {
          shopInfo: {
            shopName: this.orderData.shopName,
          },
          goodsInfo: {
            addedServices: [],
            goodsCount: 1,
            goodsId: this.orderData.goodsDetail[0].goodsId,
            isCash: true,
            originalPrice: this.orderData.goodsDetail[0].originalPrice,
            periodDays: 0,
            projectId: '',
            shippingType: this.orderData.shippingType || 2, // 1 包邮 2 到付
            codingPrice: this.orderData.codingPrice,
            isCoding: this.orderData.isCoding,
            shopId: this.orderData.shopId,
            skuProperty: JSON.stringify(this.orderData.skuProperty || {}),
            warehouseId: this.orderData.warehouseId,
            warehouseName: this.orderData.warehouseName,
            arrivalTime: this.orderData.arrivalTime,
            pic: this.orderData.goodsDetail[0].pic,
            name: this.orderData.goodsDetail[0].goodsName,
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
      // 选择退款原因类型
      selectType(item) {
        this.$refs.actionPopup.close()
        this.reasonString = item.name

        this.getRefundCalculateAmount()
      },
      //获取发货详情
      getDeliverDetailRequest() {
        let param = { id: this.orderId }
        this.$VoHttp
          .apiOrderSellSend$Id(param)
          .then((res) => {
            if (res.code === '20001') {
              this.deliverDetailProcessData(res.data)
            } else {
              uni.$u.toast(res.message || '物流信息获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('物流信息获取失败')
          })
      },
      //处理发货信息
      deliverDetailProcessData(data) {
        this.deliverInfo = data
      },
      //获取订单详情
      getOrderDetailRequest() {
        let param = { id: this.orderId }
        this.$VoHttp
          .apiOrderSell$Id(param)
          .then((res) => {
            if (res.code === '20001') {
              this.orderDetailProcessData(res.data)
            } else {
              uni.$u.toast(res.message || '订单详情获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('订单详情获取失败')
          })
      },

      orderDetailProcessData(data) {
        this.orderData = data
        console.log('订单详情:', this.orderData)
        let Time = new Date(this.orderData.nextStageTime)
        let timestemp = Time.getTime()
        this.downData = timestemp - this.newData

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
        this.orderData.timeList.forEach((item) => {
          //下单时间
          if (item.timeName === '下单时间') {
            this.createOrderTime = item.createTime
          }
          if (item.timeName === '取消时间') {
            this.orderCancelTime = item.createTime
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
        //地址信息
        this.orderAddress = this.orderData.orderAddress
        //订单分润信息
        this.orderProfitInfoList = this.orderData.orderProfitInfoList
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
        this.$VoHttp
          .apiOrderInvestReceipt({ req: param })
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
        uni.showLoading({
          title: '加载中',
          mask: true,
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
    width: 750rpx;
    height: 100vh;
    box-sizing: border-box;
    &-title {
      color: #ff5319;
    }
    &-statePay {
      width: 750rpx;
      height: 162rpx;
      color: $v-c0-85;

      &__goPay {
        width: 276rpx;
        height: 64rpx;
        line-height: 64rpx;
        font-size: 24rpx;
        margin-top: 16rpx;
        background-color: #ff5319;
        color: #ffffff;
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
      &__line {
        background-color: $v-bg-light;
        height: 2rpx;
      }
      &__info {
        padding: 16rpx 0;
        margin: 0 32rpx;
        border-bottom: 2rpx solid $v-bg-light;
        .tag {
          height: 36rpx;
          background-color: #ffe6e8;
          color: #fa3243;
          padding: 0rpx 16rpx;
          border-radius: 20rpx;
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
      padding: 40rpx 32rpx;
      background: #ffffff;
      border-top: 2rpx solid $v-bg-light;

      &__button {
        width: 160rpx;
        height: 64rpx;
        line-height: 60rpx;
        border: 2rpx solid $v-c0-25;
        border-radius: 30rpx;
        text-align: center;
        font-size: 24rpx;
        color: $v-c0-85;
        margin-left: 32rpx;
        box-sizing: border-box;
      }

      &__width {
        width: 200rpx;
      }

      &__fill {
        width: 160rpx;
        height: 64rpx;
        line-height: 64rpx;
        border: 2rpx solid $color-primary-yellow;
        background: #ffffff;
        border-radius: 32rpx;
        text-align: center;
        font-size: 24rpx;
        color: $color-primary-yellow;
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
</style>
