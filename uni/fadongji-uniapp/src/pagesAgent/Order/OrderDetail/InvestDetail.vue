<template>
  <view>
    <view class="detail flex flex-column">
      <!--导航栏 -->
      <VoNav :title="navTitle" is-fixed is-have-more @backFn="backClick">
        <block slot="title">
          <view class="flex flex-justify-c flex-vertical-c">
            <!--标题状态前面显示logo-->
            <VoIcon v-if="type === 1210" :size="28" class="p-r-14" name="clock-orange" />
            <VoIcon v-else-if="type === 1220" :size="28" class="p-r-14" name="clock-new" />
            <!--标题状态-->
            <view v-if="type === 1210" class="fz-36 fz-b color-block-yellow">等待付款</view>
            <view v-else class="fz-36 fz-b color-block">{{ orderData.statusName }}</view>
          </view>
        </block>
      </VoNav>

      <view class="detail-flex1 flex1 overflow-y">
        <!--订单各个状态的提示语操作-->
        <!--待支付-->
        <view v-if="type === 1210" class="detail-statePay">
          <view class="m-t-24 flex flex-justify-c">
            <view class="flex fz-28">
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
                    <text v-if="timeData.hours && timeData.hours > 0" class="time__item">
                      <text>{{ timeData.hours > 10 ? timeData.hours : '0' + timeData.hours }}</text>
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
        <view v-else-if="type === 1220">
          <view v-if="!orderData.isWarn">
            <view class="m-t-24 m-l-32 m-r-32 p-b-24 fz-26">
              <view class="flex flex-justify-c"
                >预计{{ orderData.predictReceiptTime || '' }}前应送达</view
              >
              <view class="m-t-16 text-center">平台已提醒商家尽快发货，请耐心等待。</view>
            </view>
          </view>
          <view v-else class="m-t-24 p-b-24 flex flex-justify-c">
            <view class="fz-28">{{ orderData.predictReceiptTime || '' }}前应送达</view>
          </view>
        </view>
        <view v-else-if="type === 1230" class="m-t-24 p-b-24 flex flex-justify-c">
          <view class="fz-28">{{ orderData.nextStageTime || '' }}之前送达</view>
        </view>
        <view v-else-if="type === 1250" class="m-t-24 p-b-24 flex flex-justify-c">
          <view class="fz-28">取消原因：{{ orderData.cancelReason || '' }} </view>
        </view>

        <!--   物流进度   -->
        <view
          v-if="
            type === 1230 ||
            (type === 1220 && deliverInfo.sendCount) ||
            (type === 1260 && deliverInfo.sendCount)
          "
          class="detail-address m-t-16"
          @click="deliveryClick"
        >
          <view class="detail-address__user fz-32 fz-b">物流进度</view>
          <view class="flex flex-justify-between flex-vertical-c detail-address__profit">
            <view class="fz-26"
              >当前订单有{{ deliverInfo.packageCount }}个包裹，{{
                deliverInfo.sendCount ? deliverInfo.sendCount : 0
              }}个已发出</view
            >
            <VoIcon :opacity="0.25" :size="16" name="right-arrow" />
          </view>
        </view>
        <!--   地址信息   -->
        <view
          v-if="
            orderAddress.name ||
            orderAddress.phone ||
            orderAddress.address ||
            orderAddress.addressDetail
          "
          class="detail-address m-t-16"
        >
          <view v-if="orderData.investType === 2" class="m-l-32 p-t-24 p-b-24 fz-b fz-32">{{
            orderData.receiveWarehouseName
          }}</view>
          <view v-if="orderData.investType === 2" class="detail-address__line" />
          <view class="detail-address__info">
            <view class="flex flex-vertical-c">
              <VoIcon name="address" />
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
                <!--                <VoIcon-->
                <!--                  v-show="orderAddress.phone"-->
                <!--                  :size="20"-->
                <!--                  color="#155bd4"-->
                <!--                  name="phone-supplier"-->
                <!--                />-->
              </view>
              <view
                v-if="orderData.status === 1210 && orderData.investType === 1"
                class="flex flex-vertical-c fz-28 h42"
              >
                <u-line color="rgba(0, 0, 0, 0.15)" direction="col" length="12" />
                <view class="m-l-24 color-blue" @click="editAddressClick"> 修改 </view>
              </view>
            </view>
            <view class="m-l-8">
              <view class="fz-26 m-t-24 overTwoEllipsis lh42 color-block">
                <text>地址：</text>
                <text>{{ orderAddress.address }}{{ orderAddress.addressDetail }} </text>
              </view>
            </view>
          </view>
        </view>
        <!--   无地址信息   -->
        <view
          v-else-if="orderAddress.status === 1210"
          class="detail-address color-block fz-b fz-32 flex flex-justify-c flex-vertical-c m-t-16 lh88"
          @click="addAddressClick"
        >
          <view>+</view>
          <view>添加新地址</view>
        </view>
        <!--   货物信息   -->
        <view v-for="good in goodsList" :key="good.shopName" class="detail-address m-t-16">
          <!--店铺名称-->
          <view class="detail-address__user flex flex-vertical-c">
            <VoIcon name="smile-m" @click.native="goChatPage(good)" />
            <view class="m-l-8 fz-32 fz-b" @click="toStoreHomePage">
              {{ good.shopName || orderData.shopName }}
            </view>
          </view>
          <view
            v-for="ware in good.wareList"
            v-show="ware.goodsList && ware.goodsList.length"
            :key="ware.warehouseName"
          >
            <view v-if="orderData.status === 1220" class="detail-address__user fz-32 fz-b"
              >{{ ware.warehouseName }}·{{ orderData.predictDeliveryTime }}之前应发货</view
            >
            <!--待付款显示送达时间-->
            <view v-else-if="orderData.status === 1210" class="detail-address__user fz-32 fz-b"
              >{{ ware.warehouseName }}·{{ orderData.predictReceiptTime }}之前应送达</view
            >
            <!--已完成不显示发货时间-->
            <view v-else class="detail-address__user fz-32 fz-b">{{ ware.warehouseName }}</view>
            <view v-for="(item, index) in ware.goodsList" :key="index">
              <view class="detail-address__list flex m-b-24" @click="goodDetail(item)">
                <image :src="$transferCosUrl(item.pic[0])" class="list-image" />
                <view class="flex1 m-l-16 flex flex-column flex-justify-between">
                  <view class="fz-28 fz-b list-hidden">
                    <text v-show="item.categoryType" class="good-tips m-r-8">{{
                      item.categoryType
                    }}</text>
                    <text> {{ item.goodsName }}</text>
                  </view>
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
                    <view class="flex flex-justify-r flex-vertical-c">
                      <view class="good-bottom__num">x{{ item.goodsCount }}</view>
                      <block v-if="orderData.status === 1220">
                        <block v-if="item.goodsCount - item.deliveryCount > 0">
                          <view class="good-bottom__delivery"
                            >{{ item.goodsCount - item.deliveryCount }}件未发货</view
                          >
                        </block>
                        <block v-else>
                          <view class="color-block-45 fz-28 m-t-8 m-l-16">全部发货</view>
                        </block>
                      </block>
                    </view>
                  </view>
                </view>
              </view>
              <!--控制退换货按钮显示-->
              <view
                v-if="
                  orderData.status === 1230 ||
                  orderData.status === 1240 ||
                  orderData.status === 1260
                "
                class="flex flex-justify-r m-r-32 m-t-44"
              >
                <template v-if="item.goodsCount && item.goodsCount > 1">
                  <!-- 已退款 -->
                  <template v-if="item.refundedCount && item.refundedCount > 0">
                    <view v-if="item.refundIdList.length < item.goodsCount" class="flex">
                      <view class="detail-bottom__height" @click="refundClick(item, '退货退款记录')"
                        >退货退款记录</view
                      >
                      <view
                        v-if="item.refundedCount < item.goodsCount"
                        class="detail-bottom__height m-l-32"
                        @click="refundClick(item, '退款退货')"
                        >退款退货</view
                      >
                    </view>
                    <view v-else>
                      <view
                        v-if="item.refundedCount >= item.goodsCount"
                        class="detail-bottom__height"
                        @click="refundClick(item, '退货退款记录')"
                        >退货退款记录</view
                      >
                    </view>
                  </template>
                  <!-- 退款中 -->
                  <template v-else-if="item.refundApplyCount && item.refundApplyCount > 0">
                    <view v-if="item.refundApplyCount < item.goodsCount" class="flex">
                      <view class="detail-bottom__height" @click="refundClick(item, '退货退款记录')"
                        >退货退款记录</view
                      >
                      <view
                        v-if="item.refundedCount < item.goodsCount"
                        class="detail-bottom__height m-l-32"
                        @click="refundClick(item, '退款退货')"
                        >退款退货</view
                      >
                    </view>
                    <view v-else>
                      <view class="detail-bottom__height" @click="refundClick(item, '退货退款记录')"
                        >退货退款记录</view
                      >
                    </view>
                  </template>
                  <template v-else>
                    <view
                      v-show="item.refundApplyCount === 0 && item.refundedCount === 0"
                      class="detail-bottom__height"
                      @click="refundClick(item, '退款退货')"
                      >退款退货</view
                    >
                  </template>
                </template>
                <template v-else>
                  <view v-if="!item.refundStatusName">
                    <view class="detail-bottom__height" @click="refundClick(item, '退款退货')"
                      >退款退货</view
                    >
                  </view>
                  <view
                    v-else
                    class="detail-bottom__height"
                    @click="refundClick(item, item.refundStatusName)"
                    >{{ item.refundStatusName }}</view
                  >
                </template>
              </view>
              <view v-if="item.addedServices">
                <view
                  v-for="(added, index) in item.addedServices"
                  :key="index"
                  class="detail-address__serve flex flex-vertical-c"
                  @click="addedServicesClick(added, item)"
                >
                  <view class="serve-word">{{ added.name || '' }}：</view>
                  <view class="serve-num">{{ added.price }}元/{{ added.count }}台</view>
                  <VoIcon :opacity="0.25" :size="20" class="serve-icon" name="right-arrow" />
                </view>
              </view>
              <view class="m-l-32 m-r-32 p-b-16 flex flex-justify-between">
                <view class="color-block fz-28 p-r-16">备注:</view>
                <view class="flex1 fz-28 color-block-45 detail-address__remark">{{
                  item.remark
                }}</view>
              </view>
            </view>
          </view>
        </view>
        <!--   订单信息   -->
        <view class="detail-address m-t-16 m-b-16">
          <!--待付款-->
          <view v-if="orderData.status === 1210">
            <view class="detail-address__user fz-32 fz-b">订单信息</view>
            <view class="detail-address__order fz-26">
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>订单编号：</view>
                <view class="flex flex-vertical-c">
                  <view class="color-gray"> {{ orderData.id }} </view>
                  <view class="fz-20 m-l-16 color-blue" @click="copyClick">复制</view>
                </view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>下单时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ createOrderTime }} </view>
              </view>
              <view
                v-if="orderData.isCash"
                class="flex flex-vertical-c flex-justify-between m-t-16"
              >
                <view>支付方式：</view>
                <!--isCash 1在线支付 2账期支付-->
                <view v-if="orderData.isCash === true" class="flex flex-vertical-c color-gray"
                  >在线支付</view
                >
                <view v-else class="flex flex-vertical-c color-gray">账期支付</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>商品总额：</view>
                <view class="flex flex-vertical-c color-gray">{{ orderData.goodsAmount }}元</view>
              </view>
              <view
                v-show="!orderData.isCash"
                class="flex flex-vertical-c flex-justify-between m-t-16"
              >
                <view>账期金额：</view>
                <view class="flex flex-vertical-c color-gray">{{ orderData.accountAmount }}元</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>本次应付款：</view>
                <view class="flex flex-vertical-c color-red">{{ orderData.payAmount }}元</view>
              </view>
            </view>
          </view>
          <!--待发货-->
          <view v-else-if="orderData.status === 1220">
            <view class="detail-address__user fz-32 fz-b">订单信息</view>
            <view class="detail-address__order fz-26">
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>订单编号：</view>
                <view class="flex flex-vertical-c">
                  <view class="color-gray"> {{ orderData.id }} </view>
                  <view class="fz-20 m-l-16 color-blue" @click="copyClick">复制</view>
                </view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>下单时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ createOrderTime }} </view>
              </view>
              <view
                v-if="orderData.isCash"
                class="flex flex-vertical-c flex-justify-between m-t-16"
              >
                <view>支付方式：</view>
                <!--isCash 1在线支付 2账期支付-->
                <view v-if="orderData.isCash === true" class="flex flex-vertical-c color-gray"
                  >在线支付</view
                >
                <view v-else class="flex flex-vertical-c color-gray">账期支付</view>
              </view>
              <view v-if="payTime" class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>支付时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ payTime }} </view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>商品总额：</view>
                <view class="flex flex-vertical-c color-gray">{{ orderData.goodsAmount }}元</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>运费：</view>
                <view class="flex flex-vertical-c color-gray">{{
                  +orderData.shippingType === 1 ? '包邮' : '到付'
                }}</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>实付款：</view>
                <view class="flex flex-vertical-c color-red">{{ orderData.payAmount }}元</view>
              </view>
            </view>
          </view>
          <!--已发货-->
          <view v-else-if="orderData.status === 1230">
            <view class="detail-address__user fz-32 fz-b">订单信息</view>
            <view class="detail-address__order fz-26">
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>订单编号：</view>
                <view class="flex flex-vertical-c">
                  <view class="color-gray"> {{ orderData.id }} </view>
                  <view class="fz-20 m-l-16 color-blue" @click="copyClick">复制</view>
                </view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>下单时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ createOrderTime }} </view>
              </view>
              <view
                v-if="orderData.isCash"
                class="flex flex-vertical-c flex-justify-between m-t-16"
              >
                <view>支付方式：</view>
                <!--isCash 1在线支付 2账期支付-->
                <view v-if="orderData.isCash === true" class="flex flex-vertical-c color-gray"
                  >在线支付</view
                >
                <view v-else class="flex flex-vertical-c color-gray">账期支付</view>
              </view>
              <view v-if="payTime" class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>支付时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ payTime }} </view>
              </view>
              <view v-if="deliverGoodTime" class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>发货时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ deliverGoodTime }} </view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>商品总额：</view>
                <view class="flex flex-vertical-c color-gray">{{ orderData.goodsAmount }}元</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>运费：</view>
                <view class="flex flex-vertical-c color-gray">{{
                  +orderData.shippingType === 1 ? '包邮' : '到付'
                }}</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>实付款：</view>
                <view class="flex flex-vertical-c color-red">{{ orderData.payAmount }}元</view>
              </view>
            </view>
          </view>
          <!--已完成-->
          <view v-else-if="orderData.status === 1240">
            <view class="detail-address__user fz-32 fz-b">订单信息</view>
            <view class="detail-address__order fz-26">
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>订单编号：</view>
                <view class="flex flex-vertical-c">
                  <view class="color-gray"> {{ orderData.id }} </view>
                  <view class="fz-20 m-l-16 color-blue" @click="copyClick">复制</view>
                </view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>下单时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ createOrderTime }} </view>
              </view>
              <view v-if="payTime" class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>支付时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ payTime }} </view>
              </view>
              <view v-if="deliverGoodTime" class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>发货时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ deliverGoodTime }} </view>
              </view>
              <view v-if="finishTime" class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>完成时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ finishTime }} </view>
              </view>
              <view
                v-if="orderData.isCash"
                class="flex flex-vertical-c flex-justify-between m-t-16"
              >
                <view>支付方式：</view>
                <!--isCash 1在线支付 2账期支付-->
                <view v-if="orderData.isCash === true" class="flex flex-vertical-c color-gray"
                  >在线支付</view
                >
                <view v-else class="flex flex-vertical-c color-gray">账期支付</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>商品总额：</view>
                <view class="flex flex-vertical-c color-gray">{{ orderData.goodsAmount }}元</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>运费：</view>
                <view class="flex flex-vertical-c color-gray">{{
                  +orderData.shippingType === 1 ? '包邮' : '到付'
                }}</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>实付款：</view>
                <view class="flex flex-vertical-c color-red">{{ orderData.payAmount }}元</view>
              </view>
            </view>
          </view>
          <!--已取消 && 已关闭-->
          <view v-else>
            <view class="detail-address__user fz-32 fz-b">订单信息</view>
            <view class="detail-address__order fz-26">
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>订单编号：</view>
                <view class="flex flex-vertical-c">
                  <view class="color-gray"> {{ orderData.id }} </view>
                  <view class="fz-20 m-l-16 color-blue" @click="copyClick">复制</view>
                </view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>下单时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ createOrderTime }} </view>
              </view>
              <view v-if="orderCancelTime" class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>取消时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ orderCancelTime }} </view>
              </view>
              <view
                v-if="orderData.isCash"
                class="flex flex-vertical-c flex-justify-between m-t-16"
              >
                <view>支付方式：</view>
                <!--isCash 1在线支付 2账期支付-->
                <view v-if="orderData.isCash === true" class="flex flex-vertical-c color-gray"
                  >在线支付</view
                >
                <view v-else class="flex flex-vertical-c color-gray">账期支付</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>商品总额：</view>
                <view class="flex flex-vertical-c color-gray">{{ orderData.goodsAmount }}元</view>
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
      <view v-if="type === 1210" class="detail-bottom flex flex-justify-r">
        <view class="detail-bottom__button" @click="showCancelOrder = true">取消订单</view>
        <view class="detail-bottom__fill" @click="payClick">去支付</view>
      </view>
      <view v-else-if="type === 1220">
        <view
          v-if="orderData.deliveryDetail.sendCount === 0 || complaint"
          class="detail-bottom flex flex-justify-r"
        >
          <view
            v-if="orderData.deliveryDetail.sendCount === 0"
            class="detail-bottom__button"
            @click="bottomRefundClick(false)"
            >申请退款</view
          >
          <view v-if="complaint" class="detail-bottom__button" @click="complaintsClick"
            >我要投诉</view
          >
          <view v-if="complaint" class="detail-bottom__fill" @click="remindDelivery">
            提醒发货
          </view>
        </view>
      </view>
      <view v-else-if="type === 1230" class="detail-bottom flex flex-justify-r">
        <view class="detail-bottom__button" @click="lookDeliverInfoClick">查看物流</view>
        <view class="detail-bottom__fill" @click="comfirmGoodClick">确认收货</view>
      </view>
      <view v-else-if="type === 1240" class="detail-bottom flex flex-justify-r">
        <view v-show="orderData.investType === 2">
          <view class="detail-bottom__fill" @click="goodTransferClick">商品转让</view>
        </view>
        <view class="detail-bottom__fill" @click="lookDeliverInfoClick">查看物流</view>
        <!--        <view class="detail-bottom__fill detail-bottom__width" @click="againClick">再来一单</view>-->
      </view>
      <!--      <view v-else-if="type === 1250" class="detail-bottom flex flex-justify-r">-->
      <!--        <view class="detail-bottom__fill detail-bottom__width" @click="againClick">再来一单</view>-->
      <!--      </view>-->
      <view class="p-b-safe-area" />
    </view>
    <!--   定制服务弹出层   -->
    <u-popup :show="showCode" mode="bottom" @close="close" @open="open">
      <CodeService :added-services="addedServicesData" @close="closeFn" />
    </u-popup>
    <!--   取消订单弹出层   -->
    <u-popup :show="showCancelOrder" mode="bottom" @close="close" @open="open">
      <CancelOrder @cancelConfirm="cancelConfirm" @closeFn="showCancelOrder = false" />
    </u-popup>

    <VoPayPopup :show.sync="showPay" :total-price="orderData.cashAmount" @confirm="goPayFn" />
    <!--备注弹框-->
    <VoModal
      :content="content"
      :show="showRemarkModal"
      confir
      confirmText="我知道了"
      @confirm="showRemarkModal = false"
    />
    <VoModal
      :show="deliverGoodsModel"
      confirmColor="#22284B"
      confirmText="我知道了"
      content="平台已提醒商家尽快发货，请耐心等待。"
      @confirm="deliverGoodsModel = false"
    />
    <!--确认收货弹框-->
    <VoModal
      :show="confirmDeliverGoods"
      :showCancelButton="true"
      cancelText="未收到"
      confirmText="已收货"
      content="您是否收到该订单商品？"
      @cancel="confirmDeliverGoods = false"
      @confirm="confirmDeliverClick"
    />
    <!--急速退款-->
    <RefundActionPopup ref="actionPopup" :type-list="refundReasonList" @select="selectType" />
    <VoPayValidation
      :show="payValidationVisible"
      @close="payValidationVisible = false"
      @confirm="payValidationConfirm"
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
    <RefundReasonPopup ref="reasonPopup" :radio-list="refundReasonList" @select="selectType" />
  </view>
</template>

<script>
  import CodeService from '../components/CodeService'
  import CancelOrder from '../components/CancelOrder'
  import RefundActionPopup from '../components/RefundActionPopup.vue'
  import {
    appSource,
    compareTime,
    getImUserId,
    goWechat,
    hideLoading,
    showLoading,
  } from '@/common/helper'
  import RefundReasonPopup from '../components/RefundReasonPopup.vue'

  // #ifdef APP-PLUS
  const vocenPay = uni.requireNativePlugin('vocen-pay')
  // #endif

  export default {
    name: 'OrderDetail',
    components: { RefundReasonPopup, CodeService, CancelOrder, RefundActionPopup },
    data() {
      return {
        smsCode: '',
        payValidationVisible: false,
        type: 0, // 1110.待付款 1120.待发货 1150.已取消 1130.已发货 1140.已完成
        navTitle: '订单详情',
        carryTo: false, // 订单可入账
        service: false, // 服务费
        showCode: false, // 定制服务弹出层
        showCancelOrder: false, // 取消订单弹出层
        deliverGoodsModel: false, //提醒发货弹框
        confirmDeliverGoods: false, //确认收货弹框
        deliverGoodsShow: false, //判断是否确认收货
        mobileShowAction: false, // 电话联系人弹框
        mobileList: [], // 电话列表
        orderId: '',
        orderData: {}, //订单详情数据
        goodNumber: 0, //商品总数量
        //地址信息
        orderAddress: '',
        //买家备注
        buyRemark: '',
        //卖家备注
        sellerRemark: '',
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
        deliverInfo: {},
        showPay: false,
        //我要投诉按钮显示与否 默认不显示
        complaint: false,
        //备注弹框内容
        content: '',
        showRemarkModal: false,
        //退款
        refundReasonList: [],
        refundReason: '',
        //顶部倒计时
        timeData: {},
        downData: 0,
        newData: new Date().getTime(),

        goodsList: [],
      }
    },
    onLoad(option) {
      this.orderId = option.data
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
      backClick() {
        if (this.deliverGoodsShow) {
          uni.$emit('updateOrderList')
        }
      },
      /**
       * 联系电话
       * @param e
       */
      callPhone(phone) {
        if (phone.indexOf('/') > -1) {
          let mobile = phone.split('/')
          this.mobileList = []
          mobile.forEach((item) => {
            if (uni.$u.test.mobile(item)) {
              let param = {
                name: item,
              }
              this.mobileList.push(param)
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
      onChange(e) {
        this.timeData = e
      },
      //备注弹框
      shopRemarkClick(info) {
        if (info) {
          this.content = info
          this.showRemarkModal = true
        }
      },
      buyRemarkClick(info) {
        if (info) {
          this.content = info
          this.showRemarkModal = true
        }
      },
      confirmDeliverClick() {
        this.confirmDeliverGoods = false
        let param = {
          orderId: this.orderData.id,
        }
        this.confirmGoodsRequest(param)
      },
      /**
       * 去聊天详情页
       */
      goChatPage(goodData) {
        console.log(goodData)
        //根据店铺id获取userId
        getImUserId({ companyId: goodData.shopId })
          .then((res) => {
            console.log('res', res)
            if (res.data) {
              const info = {
                targetId: res.data.userId,
                type: 0,
                note: goodData.shopName,
                platformCode: res.data.platformCode,
              }
              this.$storage.set('temp_im_room_info', info)
              this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
            } else {
              this.$u.toast('用户信息错误')
            }
          })
          .catch((err) => {
            this.$u.toast('用户信息错误')
            console.log(err)
          })
      },
      /**
       * 跳转店铺主页
       */
      toStoreHomePage() {
        this.$linkToEasy(
          '/pagesAgent/InvestmentList/InvestmentShop?shopId=' + this.orderData.shopId,
        )
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
       * 去发货页面
       */
      goDeliverGoods() {
        if (this.orderData.goodsDetail.length > 1) {
          this.$linkToEasy(
            '/pagesAgent/Order/DeliverGoods/DeliverMoreGoodsvue?data=' +
              JSON.stringify(this.orderData) +
              '&type=' +
              '1',
          )
          return
        }
        this.$linkToEasy(
          '/pagesAgent/Order/DeliverGoods/DeliverGoods?data=' +
            JSON.stringify(this.orderData) +
            '&type=' +
            '1',
        )
      },
      /**
       *查看发货信息
       */
      lookDeliverInfoClick() {
        this.$linkToEasy(
          '/pagesAgent/Order/OrderDetail/DeliveryMessage?data=' +
            JSON.stringify(this.orderData) +
            '&type=' +
            '1',
        )
      },
      /**
       * 商品转让
       */
      goodTransferClick() {
        //获取订单详情
        let param = { goodsId: this.orderData.goodsDetail[0].goodsId }
        this.$VoHttp
          .apiGoodsAgentGoods(param)
          .then((res) => {
            if (res.code === '20001') {
              this.$u.route({
                url: '/pagesSupplier/SendInvestmentInfo/EditInvestmentInfo',
                params: {
                  id: res.data,
                  isOrderTransfer: '1',
                  payPrice: this.orderData.payAmount,
                  isTransfer: '1', //标记商品转让
                },
              })
            } else {
              uni.$u.toast(res.message || '订单获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('订单获取失败')
            uni.$u.toast('订单获取失败')
          })
      },
      /**
       * 跳转发货信息页面
       */
      deliveryClick() {
        this.$linkToEasy(
          '/pagesAgent/Order/OrderDetail/DeliveryMessage?data=' +
            JSON.stringify(this.orderData) +
            '&type=' +
            '1',
        )
      },
      /**
       * 跳转备注
       */
      remarkClick() {
        this.$linkToEasy(
          '/pagesAgent/Order/OrderList/OrderRemark?data=' +
            JSON.stringify(this.orderData) +
            '&type=' +
            '1',
        )
      },
      /**
       * 修改地址
       */
      editAddressClick() {
        if (this.orderData.orderAddress.isEdited) {
          this.$u.toast('您已经修改过一次地址了')
          return
        }
        this.$linkToEasy(
          `/pagesCommon/AddressList/AddressList?orderId=${this.orderData.id}&type=1&roleType=2&addressId=${this.orderData.orderAddress.id}`,
        )
      },
      /**
       * 添加地址
       */
      addAddressClick() {
        this.$linkToEasy(`/pagesSupplier/Setting/AddAddress`)
      },
      /**
       * 去支付
       */
      payClick() {
        // console.log('orderData', this.orderData)
        //如果账期天数有值就是账期支付
        if (this.orderData.goodsDetail && this.orderData.goodsDetail.length) {
          let boolArr = []
          this.orderData.goodsDetail.forEach((item) => {
            if (Number(item.periodDays)) {
              boolArr.push(0)
            } else {
              boolArr.push(1)
            }
          })
          console.log('boolArr', boolArr)
          if (this.type === 1210) {
            if (boolArr.length) {
              //包含现金支付
              if (boolArr.indexOf(1) > -1) {
                this.showPay = true
              } else {
                //只有账期支付
                this.payValidationVisible = true
              }
            }
          }
        }
      },
      /**
       * 申请退款
       */
      refundClick(data, name) {
        console.log(data, name)
        if (name === '退款退货') {
          let goodData = {
            ...data,
            orderId: this.orderData.id,
            shopId: this.orderData.shopId,
            shopPlatformCode: this.orderData.shopPlatformCode,
            whetherReceiptGoods: this.orderData.status === 1240 ? true : false,
            source: this.orderData.source,
            investType: this.orderData.investType,
          }
          console.log(data.goodsCount, data.refundApplyCount, data.refundedCount)
          goodData.goodsCount = data.goodsCount - data.refundApplyCount - data.refundedCount
          this.$linkToEasy(
            '/pagesAgent/Order/ReturnExchange/InitiateRefund?data=' + JSON.stringify(goodData),
          )
          return
        }
        if (name === '退货退款记录') {
          this.$linkToEasy('/pagesAgent/Order/ReturnExchange/ReturnExchange?currentTab=' + 2)
          return
        }
        let refundData = {}
        let refundId = ''
        if (data.refundIdList && data.refundIdList.length > 0) {
          refundData = data.refundIdList[0]
        }
        refundId = refundData.id ? refundData.id : ''
        if (!refundId) {
          this.$linkToEasy('/pagesAgent/Order/ReturnExchange/ReturnExchange?currentTab=' + 2)
          return
        }
        if (refundData.isRefundOnly) {
          // 仅退款详情页面
          this.$linkToEasy('/pagesAgent/Order/ReturnExchange/RefundDetails?id=' + refundId)
          return
        }
        // 退货/退款详情页面
        this.$linkToEasy(
          '/pagesAgent/Order/ReturnExchange/ReturnRefundDetails?id=' + refundId + '&type=' + 0,
        )
      },
      //退订单内所有商品
      bottomRefundClick(recive) {
        this.refundReasonRequest()
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
       * 跳转商品详情页
       */
      goodDetail(item) {
        console.log(item)
        let investType = 'L'
        if (item.investType === 2) {
          investType = 'A'
        }
        this.$linkToEasy(
          '/pagesAgent/InvestmentList/ProjectDetails?id=' +
            item.projectId +
            '&queryType=' +
            investType,
        )
        // this.$linkToEasy(
        //   `/pagesAgent/GoodsList/GoodsDetail?id=${item.goodsId}&wid=${
        //     this.orderData.warehouseId
        //   }&companyId=${this.orderData.companyId || this.userInfo.companyId}`,
        // )
      },
      /**
       * 确认收货
       */
      comfirmGoodClick() {
        this.confirmDeliverGoods = true
      },
      /**
       * 提醒发货
       */
      remindDelivery() {
        this.getDeliveryGoodsRequest(this.orderData)
      },
      // 选择退货原因
      selectType(item) {
        this.$refs.reasonPopup.close()
        this.refundReason = item.reason
        this.applyForRefundRequest()
      },
      /**
       * 再来一单
       */
      againClick() {
        this.againOrder()
      },
      againOrder() {
        let cartDetailstList = []
        console.log(this.orderData)
        this.orderData.goodsDetail.forEach((item) => {
          let param = {
            isCash: this.orderData.isCash,
            investmentId: item.projectId,
            pricture: item.pic,
            investmentNum: item.goodsCount,
            accountPeriodDays: this.orderData.periodDays,
            accountPrice: this.orderData.accountAmount,
            arrivalTime: this.orderData.predictDeliveryTime, // 仓库发货时间
            goodsId: item.goodsId,
            goodsName: item.goodsName,
            id: item.id,
            cashPrice: item.payPrice,
            investedAmount: this.orderData.payAmount,
            shippingType: this.orderData.shippingType,
            shopId: this.orderData.shopId,
            warehouseName: this.orderData.warehouseName,
            warehouseId: this.orderData.warehouseId,
          }
          cartDetailstList.push(param)
        })

        let data = [
          {
            shopId: this.orderData.shopId,
            shopName: this.orderData.shopName,
            cartWarehouseList: [
              {
                warehouseName: this.orderData.warehouseName,
                warehouseId: this.orderData.warehouseId,
                cartDetailstList: cartDetailstList,
              },
            ],
          },
        ]
        if (this.orderData.investType === 1) {
          this.$storage.set('investGoodsData', data)
          this.$linkToEasy('/pagesAgent/InvestmentList/SubmitOrders?queryType=' + 1)
          return
        }
        this.getDetail()
      },
      // 获取投资项目详情
      getDetail() {
        this.$VoHttp.GOODS.apiGoodsProjectInvestmentBuyerPreview({
          id: this.orderData.goodsDetail[0].projectId,
          companyId: this.userInfo.companyId,
        }).then((res) => {
          if (res.data) {
            this.$storage.set('projectData', res.data)
            this.$linkToEasy('/pagesAgent/InvestmentList/SubmitOrdersCountry')
          }
        })
      },
      //复制订单
      copyClick() {
        uni.setClipboardData({
          data: this.orderData.id,
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
                this.$refs.reasonPopup.show()
              })
            } else {
            }
          })
          .catch((err) => {
            uni.hideLoading()
            console.log('err', err)
          })
      },
      //发起退款申请请求
      applyForRefundRequest() {
        let params = {
          orderId: this.orderData.id,
          source: appSource(),
          shopId: this.orderData.shopId,
          shopPlatformCode: this.orderData.shopPlatformCode,
          whetherReceiptGoods: false,
          reason: this.refundReason,
        }
        params.isRefundOnly = true
        let goodsInfos = []
        this.orderData.goodsDetail.forEach((item) => {
          let param = {
            goodsId: item.projectId ? item.projectId : item.goodsId,
            goodsCount: item.goodsCount,
            amount: this.decimalMulFn(item.payPrice, item.goodsCount),
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
      async goPayFn(info) {
        let that = this
        const req = {
          accountAmount: this.orderData.accountAmount === null ? 0 : this.orderData.accountAmount,
          cashAmount: this.orderData.cashAmount,
          licenseId: this.orderData.licenseId,
          orderId: this.orderId,
          payChannel: 0,
          fee: 0,
          payKey: '', // 微信支付需要
          payType: info.payTypeCode, // 支付方式(1：微信，11：支付宝，51：银联)
          remark: '',
          source: appSource(),
          userId: this.userInfo.companyId,
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
              that.$VoHttp
                .payPayResult({ orderId: that.orderId })
                .then((res) => {
                  plus.globalEvent.removeEventListener('newintent')
                  console.log('支付结果', res)
                  if (res && res.data && +res.data.status === 1) {
                    console.log('未支付')
                    return
                  }
                  uni.redirectTo({
                    url:
                      '/pagesCommon/PayResult/PayResult?type=agent&status=' +
                      res.data.status +
                      '&price=' +
                      that.orderData.payAmount,
                  })
                })
                .catch((e) => {
                  console.log(e, 'eeeeeeeeeeeeee')
                })
            }
          })
          return
        }
        let param = { req: req }
        console.log(param)
        showLoading('加载中')
        const { payInfo } = await that.$VoHttp
          .appPay(param)
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
              .payPayResult({ orderId: that.orderId })
              .then((res) => {
                vocenPay.voPayRemoveListening()
                uni.redirectTo({
                  url:
                    '/pagesCommon/PayResult/PayResult?type=agent&status=' +
                    res.data.status +
                    '&price=' +
                    that.orderData.payAmount,
                })
              })
              .catch((e) => {
                console.log(e, 'eeeeeeeeeeeeee')
              })
          }
        })
      },
      //数组去重
      delWeight(arr) {
        let newArr = arr.filter(function (item, index) {
          return arr.indexOf(item) === index // 因为indexOf 只能查找到第一个
        })
        return newArr
      },
      //获取订单详情
      getOrderDetailRequest() {
        let param = { id: this.orderId }
        this.$VoHttp
          .apiOrderInvest$Id(param)
          .then((res) => {
            if (res.code === '20001') {
              let data = res.data
              //处理数据，拆分订单
              let arr = []
              let shopArr = data.goodsDetail.map((item) => {
                return { shopName: item.shopName, shopId: item.shopId }
              })
              //去除shopId重复数据
              let obj = {}
              let result = shopArr.reduce((item, next) => {
                obj[next.shopId] ? '' : (obj[next.shopId] = true && item.push(next))
                return item
              }, [])

              let wareArr = this.delWeight(data.goodsDetail.map((item) => item.warehouseName))
              console.log('wareArr', wareArr, result)
              arr = result.map((item) => {
                return {
                  shopName: item.shopName,
                  shopId: item.shopId,
                  wareList: [],
                }
              })
              arr.forEach((shop) => {
                wareArr.forEach((item) => {
                  shop.wareList.push({
                    warehouseName: item,
                    goodsList: [],
                  })
                })
              })

              data.goodsDetail.forEach((item) => {
                arr.forEach((item2) => {
                  if (item.shopName === item2.shopName) {
                    item2.wareList.forEach((item3) => {
                      if (item.warehouseName === item3.warehouseName) {
                        item3.goodsList.push(item)
                      }
                    })
                  }
                })
              })
              this.goodsList = arr
              console.log('rrrrrrrrrrrrrrrrr', arr)
              this.orderDetailProcessData(data)
            } else {
              uni.$u.toast(res.message || '订单详情获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '订单详情获取失败')
          })
      },

      orderDetailProcessData(data) {
        this.orderData = data
        console.log('订单详情:', this.orderData)
        let Time = new Date(this.orderData.nextStageTime.replace(/-/g, '/'))
        let timestemp = Time.getTime()
        this.downData = timestemp - this.newData
        //状态
        this.type = this.orderData.status
        this.navTitle = this.orderData.statusName
        //商品数量
        if (this.orderData.goodsDetail) {
          this.orderData.goodsDetail.forEach((item) => {
            this.goodNumber = this.goodNumber + item.goodsCount
          })
        }
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
        if (this.orderData.timeList) {
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
        }
        //地址信息
        this.orderAddress = this.orderData.orderAddress
        //订单分润信息
        this.orderProfitInfoList = this.orderData.orderProfitInfoList
        //物流信息
        this.deliverInfo = this.orderData.deliveryDetail

        //判断我要投诉按钮显示与否
        this.complaint = compareTime(this.orderData.nextStageTime)
      },
      //取消订单请求
      getCancelOrderRequest(param) {
        this.$VoHttp
          .apiOrderInvestCancel({ req: param })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('取消成功')
              this.getOrderDetailRequest()
            } else {
              uni.$u.toast(res.message || '订单取消失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '订单取消失败')
          })
      },
      //确认收货请求请求
      confirmGoodsRequest(param) {
        this.$VoHttp
          .apiOrderInvestReceipt({ req: param })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('确认收货成功')
              this.deliverGoodsShow = true
              this.getOrderDetailRequest()
            } else {
              uni.$u.toast(res.message || '收货失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '收货失败')
          })
      },
      //提醒发货请求请求
      getDeliveryGoodsRequest(data) {
        let param = {
          orderId: data.id,
        }
        this.$VoHttp
          .apiOrderInvestWarn({ req: param })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast(res.message || '提醒发货成功')
              this.deliverGoodsModel = true
              this.getOrderDetailRequest()
            } else {
              uni.$u.toast(res.message || '提醒发货失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '提醒发货失败')
          })
      },
      //账期支付验证通过
      payValidationConfirm(code) {
        this.smsCode = code
        const req = {
          orderId: this.orderId,
          payChannel: 0,
          payType: '61', // 支付方式(1：微信，11：支付宝，51：银联)
          remark: '',
          source: appSource(),
          userId: this.userInfo.companyId,
          smsCode: code,
          id: this.orderId,
          accountAmount: this.orderData.accountAmount,
          cashAmount: this.orderData.cashAmount,
        }
        showLoading('加载中')
        this.$VoHttp
          .appPay({
            req,
          })
          .then((res) => {
            console.log(res.data)
            hideLoading()
            this.payValidationVisible = false
            this.$u.toast('支付成功')
            uni.redirectTo({
              url:
                '/pagesCommon/PayResult/PayResult?type=agent&status=4' +
                '&price=' +
                this.orderData.goodsAmount,
            })
          })
          .catch((e) => {
            uni.$u.toast(e.message || '支付参数错误')
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
    overflow-x: hidden;
    &-state {
      overflow-x: hidden;
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
    &-flex1 {
      width: 750rpx;
      overflow-x: hidden;
    }
    &-address {
      background: #ffffff;
      color: $v-c0-85;
      &__line {
        width: 750rpx;
        height: 2rpx;
        background-color: $v-bg-light;
      }
      &__user {
        padding: 24rpx 0;
        margin: 0 32rpx;
        border-bottom: 2rpx solid $v-bg-light;
        color: #000;
        box-sizing: border-box;
      }
      &__info {
        padding: 24rpx 0;
        box-sizing: border-box;
        margin: 0 32rpx;
        border-bottom: 2rpx solid $v-bg-light;
        .info-place {
          width: 438rpx;
        }
      }
      &__note {
        padding: 16rpx 0;
        box-sizing: border-box;
        margin: 0 32rpx;
      }
      &__list {
        padding: 16rpx 32rpx;
        box-sizing: border-box;
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
        box-sizing: border-box;
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
        box-sizing: border-box;
      }
      &__remark {
        word-break: break-all;
      }
      &__profit {
        padding: 28rpx 0;
        box-sizing: border-box;
        margin: 0 32rpx;
      }
      &__service {
        width: 516rpx;
        margin: 0 auto;
        padding-bottom: 16rpx;
        box-sizing: border-box;
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
        box-sizing: border-box;
      }
    }
    &-bottom {
      padding: 24rpx 32rpx 16rpx;
      box-sizing: border-box;
      background: #ffffff;
      border-top: 2rpx solid $v-bg-light;
      &__button {
        width: 160rpx;
        height: 80rpx;
        line-height: 80rpx;
        border: 2rpx solid $v-c0-25;
        border-radius: 40rpx;
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
        height: 80rpx;
        line-height: 80rpx;
        //padding: 10rpx 32rpx;
        background: #ffffff;
        border-radius: 40rpx;
        text-align: center;
        font-size: 24rpx;
        color: $color-primary-yellow;
        border: 2rpx solid $color-primary-yellow;
        margin-left: 32rpx;
      }
      &__height {
        padding: 10rpx 32rpx;
        background: #ffffff;
        border-radius: 40rpx;
        text-align: center;
        font-size: 24rpx;
        color: $color-primary-yellow;
        border: 2rpx solid $color-primary-yellow;
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
    &__delivery {
      margin-top: 8rpx;
      height: 42rpx;
      line-height: 42rpx;
      margin-left: 16rpx;
      color: $color-primary-red;
      font-size: 28rpx;
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
