<template>
  <view>
    <view class="detail flex flex-column">
      <!--导航栏 -->
      <VoNav :isBack="false" :title="navTitle" is-fixed is-have-more @backFn="backClick">
        <view slot="title">
          <view class="flex flex-justify-c flex-vertical-c">
            <!--标题状态前面显示logo-->
            <VoIcon v-if="type === 1210" :size="28" class="p-r-14" name="clock-orange" />
            <VoIcon v-else-if="type === 1220" :size="28" class="p-r-14" name="clock-new" />
            <!--标题状态-->
            <view v-if="type === 1210" class="fz-36 fz-b color-block-yellow">等待付款</view>
            <view v-else class="fz-36 fz-b color-block">{{ orderData.statusName }}</view>
          </view>
        </view>

      </VoNav>

      <view class="detail-flex1 flex1 overflow-y">
        <!--订单各个状态的提示语操作-->
        <!--待支付-->
        <view v-if="type === 1210">
          <view class="fz-26 flex m-t-24 flex-justify-c">
            <view class="color-block">剩余时间: </view>
            <view class="p-l-12">
              <u-count-down :time="downData" @change="onChange">
                <view class="time">
                  <text v-if="timeData.hours && timeData.hours > 0" class="time__item">
                    <text v-if="timeData.hours">{{
                      timeData.hours > 10 ? timeData.hours : '0' + timeData.hours
                    }}</text>
                    小时</text
                  >
                  <text class="time__item">{{ timeData.minutes || '00' }}分钟</text>
                </view>
              </u-count-down>
            </view>
          </view>
        </view>
        <!--待发货-->
        <view v-else-if="type === 1220">
          <view v-if="showDeleverGood">
            <view
              v-if="showTips"
              class="flex color-bg-red flex-vertical-c flex-justify-between"
              @click="showTips = false"
            >
              <view class="flex flex-vertical-c flex1">
                <image class="color-bg-red-img" src="/static/icons/red_tips.png" />
                <view class="fz-24 lh150 m-l-16">该订单已超过承诺发货时间，请尽快安排发货</view>
              </view>
              <VoIcon :opacity="0.45" :size="16" name="close" />
            </view>
            <view class="m-t-48 m-b-48 flex fz-28 lh150 color-block flex flex-justify-c"
              >预计{{ orderData.predictDeliveryTime || '' }}前应发货</view
            >
          </view>
          <view v-else class="m-t-24 p-b-48 flex flex-justify-c">
            <view class="fz-28">{{ orderData.predictDeliveryTime || '' }}前应发货</view>
          </view>
        </view>
        <view v-else-if="type === 1230" class="m-t-24 p-b-48 flex text-center">
          <view class="fz-28 flex1">{{ orderData.nextStageTime || '' }}之前送达</view>
        </view>
        <view v-else-if="type === 1250" class="m-t-24 p-b-48 flex text-center">
          <view class="fz-28 flex1">取消原因：{{ orderData.cancelReason || '' }} </view>
        </view>
        <view v-else-if="type === 1260" class="m-t-24 p-b-48 flex text-center">
          <view class="fz-28 flex1"
            >关闭原因：{{ orderData.cancelReason || '买方手动申请退款' }}
          </view>
        </view>

        <!--   物流进度   -->
        <view v-if="type === 1230" class="detail-address m-t-16" @click="deliveryClick">
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
        <view class="detail-address m-t-16">
          <view class="detail-address__user flex flex-vertical-c" @click="goImUrl">
            <VoIcon name="smile-m" />
            <view class="m-l-8 fz-32 fz-b"> {{ orderData.buyerName }} </view>
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
                  v-if="orderData.status === 1210"
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
          <view
            class="detail-address__note note-line flex flex-vertical-c flex-justify-between"
            @click="buyRemarkClick(buyRemark)"
          >
            <view class="flex">
              <view class="fz-b">买家留言：</view>
              <view v-if="buyRemark" class="color-gray flex1 overTwoEllipsis">
                {{ buyRemark }}
              </view>
            </view>
            <VoIcon :opacity="0.45" color="#000000" name="right-arrow" />
          </view>
          <view
            class="detail-address__note flex flex-vertical-c flex-justify-between"
            @click="shopRemarkClick(sellerRemark)"
          >
            <view class="flex">
              <view class="fz-b">商家备注：</view>
              <view v-if="sellerRemark" class="color-gray flex1 overTwoEllipsis">{{
                sellerRemark
              }}</view>
            </view>
            <VoIcon :opacity="0.45" color="#000000" name="right-arrow" />
          </view>
        </view>
        <!--   货物信息   -->
        <view class="detail-address m-t-16">
          <view class="flex flex-justify-between flex-vertical-c">
            <view v-if="orderData.status === 1210" class="detail-address__user fz-32 fz-b"
              >{{ orderData.warehouseName }}·{{ orderData.predictDeliveryTime }}之前应发货</view
            >
            <view v-else class="detail-address__warehouse fz-32 fz-b">{{
              orderData.warehouseName
            }}</view>
            <VoIcon v-if="orderData.isValet" :size="24" class="m-r-32" name="generation" />
          </view>
          <view class="h2 line-bg m-l-32 m-r-32" />
          <view
            v-for="(item, index) in orderData.goodsDetail"
            :key="index"
            @click="goodDetail(item)"
          >
            <view class="detail-address__list flex">
              <image :src="isVideo(item.pic[0])" class="list-image" />
              <view class="flex1 m-l-16 flex flex-column">
                <view class="fz-28 fz-b overTwoEllipsis">
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

                  <block
                    v-if="orderData.status === 1220 && item.goodsCount - item.deliveryCount > 0"
                  >
                    <view class="flex flex-justify-r flex-vertical-c">
                      <view class="good-bottom__num">x{{ item.goodsCount }}</view>
                      <view class="good-bottom__delivery"
                        >{{ item.goodsCount - item.deliveryCount }}件未发货</view
                      >
                    </view>
                  </block>
                  <block v-else>
                    <view class="good-bottom__num text-right">x{{ item.goodsCount }}</view>
                  </block>
                </view>
              </view>
            </view>
            <view v-if="item.addedServices">
              <view
                v-for="(added, index) in item.addedServices"
                :key="index"
                class="detail-address__serve flex flex-vertical-c"
                @click.stop="addedServicesClick(added, item)"
              >
                <view class="serve-word">{{ added.name }}：</view>
                <view class="serve-num">{{ added.price }}元/{{ added.count }}台</view>
                <VoIcon :opacity="0.25" :size="20" class="serve-icon" name="right-arrow" />
              </view>
            </view>
          </view>
          <view class="detail-address__account flex flex-justify-between" />
        </view>
        <!--   收益信息   -->
        <view class="detail-address m-t-16">
          <view class="detail-address__user fz-32 fz-b">收益信息</view>
          <view class="detail-address__profit flex flex-justify-between flex-vertical-c">
            <view class="color-block fz-26 lh150 color-block">可入账金额：</view>
            <view class="flex fz-26 color-block">
              <view v-if="orderData.canObtainAmount" class="color-red"
                >{{ orderData.canObtainAmount }}元</view
              >
              <view @click="openProfit">
                <view v-if="carryTo === false" class="flex fz-24 flex-vertical-c">
                  <VoIcon :opacity="0.45" :size="20" class="m-l-8" name="arrow-bottom-line" />
                </view>
                <view v-else class="flex fz-24 flex-vertical-c">
                  <VoIcon :opacity="0.45" :size="20" class="m-l-8" name="arrow-top-line" />
                </view>
              </view>
            </view>
          </view>
          <view v-show="carryTo" class="fz-26 m-t-8 m-b-24 color-gray p-l-32"
            >可入账金额 = 订单总金额 - 服务费</view
          >
          <view class="detail-address__profit line flex flex-justify-between flex-vertical-c">
            <view class="color-block fz-26 lh150 color-block">服务费：</view>
            <view class="flex fz-26 lh150 color-block">
              <view v-if="orderData.serviceAmount" class="color-block-65"
                >{{ orderData.serviceAmount }}元</view
              >
              <view class="m-l-" @click="openService">
                <view v-if="service === false" class="flex fz-24 flex-vertical-c">
                  <VoIcon :opacity="0.45" :size="16" class="m-l-8" name="arrow-bottom-line" />
                </view>
                <view v-else class="flex fz-24 flex-vertical-c">
                  <VoIcon :opacity="0.45" :size="16" class="m-l-8" name="arrow-top-line" />
                </view>
              </view>
            </view>
          </view>
          <view v-show="service" class="p-b-8">
            <view class="detail-address__service flex">
              <view class="service-left color-block">角色</view>
              <view class="service-middleOne" />
              <view class="service-right color-block">分润值</view>
            </view>
            <view
              v-for="(item, index) in orderProfitInfoList"
              :key="index"
              class="detail-address__service flex color-gray"
            >
              <view class="service-left">{{ item.keyName }}</view>
              <view class="service-middle" />
              <view class="service-right">{{ item.amount }}元</view>
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
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>运费：</view>
                <view class="flex flex-vertical-c color-gray">{{
                  Number(orderData.shippingType) === 1 ? '包邮' : '到付'
                }}</view>
              </view>
              <view
                v-if="!orderData.isCash && orderData.accountAmount"
                class="flex flex-vertical-c flex-justify-between m-t-16"
              >
                <view>账期应付款：</view>
                <view class="flex flex-vertical-c color-red">{{ orderData.accountAmount }}元</view>
              </view>
              <view
                v-if="!orderData.isCash && orderData.accountAmount"
                class="flex flex-vertical-c flex-justify-between m-t-16"
              >
                <view>预计到期时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ expectedTime }} 到期</view>
              </view>
            </view>
          </view>
          <!--待发货-->
          <view v-if="orderData.status === 1220">
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
                  Number(orderData.shippingType) === 1 ? '包邮' : '到付'
                }}</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>实付款：</view>
                <view class="flex flex-vertical-c color-red">{{ orderData.payAmount }}元</view>
              </view>
              <view
                v-if="!orderData.isCash && orderData.accountAmount"
                class="flex flex-vertical-c flex-justify-between m-t-16"
              >
                <view>预计到期时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ expectedTime }} 到期</view>
              </view>
            </view>
          </view>
          <!--已发货-->
          <view v-if="orderData.status === 1230">
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
                  Number(orderData.shippingType) === 1 ? '包邮' : '到付'
                }}</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>实付款：</view>
                <view class="flex flex-vertical-c color-red">{{ orderData.payAmount }}元</view>
              </view>
              <view
                v-if="!orderData.isCash && orderData.accountAmount"
                class="flex flex-vertical-c flex-justify-between m-t-16"
              >
                <view>预计到期时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ expectedTime }} 到期</view>
              </view>
            </view>
          </view>
          <!--已完成-->
          <view v-if="orderData.status === 1240">
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
                  Number(orderData.shippingType) === 1 ? '包邮' : '到付'
                }}</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>实付款：</view>
                <view class="flex flex-vertical-c color-red">{{ orderData.payAmount }}元</view>
              </view>
              <view
                v-if="!orderData.isCash && orderData.accountAmount"
                class="flex flex-vertical-c flex-justify-between m-t-16"
              >
                <view>预计到期时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ expectedTime }} 到期</view>
              </view>
            </view>
          </view>
          <!--已取消 & 已关闭-->
          <view v-if="orderData.status === 1250 || orderData.status === 1260">
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
              <view v-if="orderData.status === 1250">
                <view
                  v-if="orderCancelTime"
                  class="flex flex-vertical-c flex-justify-between m-t-16"
                >
                  <view>取消时间：</view>
                  <view class="flex flex-vertical-c color-gray">{{ orderCancelTime }} </view>
                </view>
              </view>
              <view v-else>
                <view
                  v-if="orderCloseTime"
                  class="flex flex-vertical-c flex-justify-between m-t-16"
                >
                  <view>关闭时间：</view>
                  <view class="flex flex-vertical-c color-gray">{{ orderCloseTime }} </view>
                </view>
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
                  Number(orderData.shippingType) === 1 ? '包邮' : '到付'
                }}</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>实付款：</view>
                <view class="flex flex-vertical-c color-red">{{ orderData.payAmount }}元</view>
              </view>
              <view
                v-if="!orderData.isCash && orderData.accountAmount"
                class="flex flex-vertical-c flex-justify-between m-t-16"
              >
                <view>预计到期时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ expectedTime }} 到期</view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!--   底部固定区域   -->
      <view v-if="type === 1210">
        <view class="detail-bottom flex flex-justify-r">
          <view class="detail-bottom__button" @click="remarkClick">备注</view>
          <view class="detail-bottom__button" @click="editAddressClick">修改地址</view>
          <!--isValet 是否是代客下单 非代客下单，列表和详情页中不用展示【取消订单】按钮 -->
          <view
            v-if="orderData.isValet"
            class="detail-bottom__button fill"
            @click="showCancelOrder = true"
            >取消订单</view
          >
        </view>
        <VoSafetyArea :is-fixed="false" />
      </view>

      <view v-else-if="type === 1220">
        <view class="detail-bottom flex flex-justify-r">
          <view class="detail-bottom__button" @click="contantClick">联系仓库</view>
          <view
            v-if="orderData.isOwnerHouse"
            class="detail-bottom__button fill"
            @click="goDeliverGoods"
            >发货</view
          >
          <view v-else class="detail-bottom__button fill" @click="getDeliveryGoodsRequest"
            >提醒发货</view
          >
        </view>
        <VoSafetyArea :is-fixed="false" />
      </view>

      <view v-else-if="type === 1230">
        <view class="detail-bottom flex flex-justify-r">
          <view
            class="detail-bottom__button fill detail-bottom__width"
            @click="lookDeliverInfoClick"
            >查看发货信息</view
          >
        </view>
        <VoSafetyArea :is-fixed="false" />
      </view>

      <view v-else-if="type === 1240">
        <view class="detail-bottom flex flex-justify-r">
          <view
            class="detail-bottom__button fill detail-bottom__width"
            @click="lookDeliverInfoClick"
            >查看发货信息</view
          >
        </view>
        <VoSafetyArea :is-fixed="false" />
      </view>
    </view>
    <!--   定制服务弹出层   -->
    <u-popup :show="showCode" mode="bottom" @close="close" @open="open">
      <CodeService :added-services="addedServicesData" @close="closeFn" />
    </u-popup>
    <!--   取消订单弹出层   -->
    <u-popup :show="showCancelOrder" mode="bottom" @close="close" @open="open">
      <CancelOrder @cancelConfirm="cancelConfirm" @closeFn="showCancelOrder = false" />
    </u-popup>
    <!--备注弹框-->
    <VoModal
      :content="content"
      :show="showRemarkModal"
      confir
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
    <VoModal
      :show="deliverGoodsModel"
      confirmColor="#22284B"
      confirmText="我知道了"
      content="平台已提醒商家尽快发货，请耐心等待。"
      @confirm="deliverGoodsModel = false"
    />
  </view>
</template>

<script>
  import CodeService from '../components/CodeService'
  import CancelOrder from '../components/CancelOrder'
  import { getImUserId } from '@/common/helper'

  export default {
    name: 'OrderDetail',
    components: { CodeService, CancelOrder },
    data() {
      return {
        deliverGoodsModel: false,
        showTips: true,
        type: 0, // 1110.待付款 1120.待发货 1150.已取消 1130.已发货 1140.已完成
        navTitle: '订单详情',
        carryTo: false, // 订单可入账
        service: false, // 服务费
        showCode: false, // 定制服务弹出层
        mobileShowAction: false, // 电话联系人弹框
        mobileList: [], // 电话列表
        showCancelOrder: false, // 取消订单弹出层
        showDeleverGood: false, // 是否显示发货超时提醒
        orderId: '',
        orderData: {}, //订单详情数据
        goodNumber: 0, //商品总数量
        //地址信息
        orderAddress: {},
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
        //关闭时间
        orderCloseTime: '',
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
        //顶部倒计时
        timeData: {},
        downData: 0,
        newData: new Date().getTime(),
        //备注弹框内容
        content: '',
        showRemarkModal: false,
        mobile: [], // 电话列表
        mobile1: '', // 电话号码1
        mobile2: '', // 电话号码2
      }
    },
    async onLoad(options) {
      this.orderId = options.id
      await this.getOrderDetailRequest()

      if (this.orderData.status === 1230 || this.orderData.status === 1240) {
        this.getDeliverDetailRequest()
      }
    },
    onShow() {
      this.getOrderDetailRequest()
    },
    methods: {
      //提醒发货请求请求
      getDeliveryGoodsRequest() {
        let param = {
          orderId: this.orderData.id,
        }
        console.log(param)
        this.$VoHttp
          .apiOrderInvestWarn({ req: param })
          .then((res) => {
            if (res.code === '20001') {
              this.deliverGoodsModel = true
            } else {
              uni.$u.toast(res.message || '提醒发货失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '提醒发货失败')
          })
      },
      //计算账期到期时间
      getExpectedTime() {
        let createOrderTime = this.createOrderTime
        // 24小时毫秒数
        let dayStamp = 24 * 60 * 60 * 1000
        let nextDate = new Date(
          new Date(createOrderTime).getTime() + Number(this.orderData.periodDays) * dayStamp,
        )
        let date = this.$vocenApi.VoUtils.timeFormat(nextDate.getTime(), 'yyyy年mm月dd日')
        this.expectedTime = date
      },
      backClick() {
        if (this.isDeliverGood) {
          uni.setStorageSync('deliveryUpdateList', 'invest')
        } else {
          uni.setStorageSync('deliveryUpdateList', 'investUpdateList')
        }
        this.$backFn()
      },
      isVideo(url) {
        if (this.$vocenApi.Pattern.isVideoUrl(url.toLocaleLowerCase())) {
          return url + '&type=3'
        } else {
          return url + '&type=1'
        }
      },
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
       * 聊天
       */
      goImUrl() {
        //createTime	string 非必须 创建时间 format: date-time
        //disturb	integer 非必须 是否开启消息免打扰 0：关闭   1：开启 format: int32
        //id	integer 非必须 对话框id format: int64
        //targetId	integer 非必须 目标人id或者群id format: int64
        //userId	integer 非必须 用户id
        //version	integer 非必须 数据版本
        getImUserId({ companyId: this.orderData.buyerId })
          .then((res) => {
            console.log('res', res)
            if (res) {
              const info = {
                targetId: res.data.userId,
                type: 0,
                note: this.orderData.buyerName,
                platformCode: res.data.platformCode, // 1供应商  2服务商
                isProject: true,
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
      contantClick() {
        if (!this.orderData.warehousePhone) {
          this.$u.toast('未获取到手机号')
          return
        }
        this.callPhone(this.orderData.warehousePhone)
      },
      /**
       * 去发货页面
       */
      goDeliverGoods() {
        //获取订单详情
        let param = { id: this.orderData.id }
        this.$VoHttp
          .apiOrderInvest$Id(param)
          .then((res) => {
            if (res.code === '20001') {
              //储存发货商品信息
              this.$storage.set('sendGoodsDetail', res.data)
              if (res.data.goodsDetail.length > 1) {
                this.$linkToEasy('/pagesSupplier/Order/DeliverGoods/DeliverMoreGoodsvue?type=1')
                return
              }
              this.$linkToEasy('/pagesSupplier/Order/DeliverGoods/DeliverGoods?type=1')
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
       *查看发货信息
       */
      lookDeliverInfoClick() {
        this.$linkToEasy(
          '/pagesSupplier/Order/OrderDetail/DeliveryMessage?id=' +
            this.orderData.id +
            '&type=' +
            '1',
        )
      },
      /**
       * 跳转发货信息页面
       */
      deliveryClick() {
        this.$linkToEasy(
          '/pagesSupplier/Order/OrderDetail/DeliveryMessage?id=' +
            this.orderData.id +
            '&type=' +
            '1',
        )
      },
      /**
       * 跳转备注
       */
      remarkClick() {
        this.$linkToEasy(
          '/pagesSupplier/Order/OrderList/OrderRemark?data=' +
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
          `/pagesCommon/AddressList/AddressList?orderId=${this.orderData.id}&type=1&roleType=3&addressId=${this.orderData.orderAddress.id}&companyId=${this.orderData.buyerId}`,
        )
      },
      /**
       * 跳转商品详情页
       */
      goodDetail(item) {
        if (item.projectId) {
          this.$u.route({
            url: '/pagesSupplier/SendInvestmentInfo/CheckInvestmentInfo',
            params: {
              id: item.projectId,
            },
          })
          return
        }
        this.$linkToEasy(
          `/pagesSupplier/GoodsManage/GoodsDetail?id=${item.goodsId}&wid=${this.orderData.warehouseId}`,
        )
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
        this.$storage.set('investGoodsData', data)
        this.$linkToEasy('/pagesAgent/InvestmentList/SubmitOrders?queryType=' + 1)
      },
      //复制订单
      copyClick() {
        uni.setClipboardData({
          data: this.orderData.id,
        })
      },
      // 跳转到客服聊天界面
      toIm() {
        const info = {
          targetId: this.orderData.buyerId,
          type: 0,
          note: this.orderData.buyerName,
          platformCode: 'supplier', // 1供应商  2服务商
        }
        this.$storage.set('temp_im_room_info', info)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      //获取发货详情
      getDeliverDetailRequest() {
        let param = { id: this.orderId }
        this.$VoHttp
          .apiOrderInvestSend$Id(param)
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
          .apiOrderInvest$Id(param)
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
        //时间倒计时
        let Time = new Date(this.orderData.nextStageTime)
        let timestemp = Time.getTime()
        this.downData = timestemp - this.newData

        //是否显示发货提醒文案
        if (this.newData > new Date(this.orderData.nextStageTime).getTime()) {
          this.showDeleverGood = true
        }

        console.log('订单详情:', this.orderData)
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
            if (item.timeName === '关闭时间') {
              this.orderCloseTime = item.createTime
            }
          })
        }
        //地址信息
        this.orderAddress = this.orderData.orderAddress
        if (this.orderAddress.phone.indexOf('/') > -1) {
          this.mobile = this.orderAddress.phone.split('/')
          this.mobile1 = this.mobile[0]
          this.mobile2 = this.mobile[1]
        }
        //订单分润信息
        this.orderProfitInfoList = this.orderData.orderProfitInfoList
        //物流信息
        this.deliverInfo = this.orderData.deliveryDetail
        if (!this.orderData.isCash) {
          this.getExpectedTime()
        }
      },
      //取消订单请求
      getCancelOrderRequest(param) {
        this.$VoHttp
          .apiOrderInvestCancel({ req: param })
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast(res.message || '订单取消成功')
            } else {
              uni.$u.toast(res.message || '订单取消失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('订单取消失败')
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
      &__warehouse {
        padding: 24rpx 0;
        margin: 0 32rpx;
        color: #000;
      }
      &__info {
        padding: 24rpx 0;
        margin: 0 32rpx;
        border-bottom: 2rpx solid $v-bg-light;
        font-size: 28rpx;
      }
      &__note {
        font-size: 28rpx;
        padding: 16rpx 0;
        margin: 0 32rpx;
        &.note-line {
          border-bottom: 2rpx solid $v-bg-light;
        }
      }
      &__list {
        padding: 16rpx 32rpx;
        height: 160rpx;
        .list-image {
          width: 128rpx;
          height: 128rpx;
          border-radius: 8rpx;
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
        width: 172rpx;
        height: 80rpx;
        line-height: 80rpx;
        border: 2rpx solid $v-c0-25;
        border-radius: 40rpx;
        text-align: center;
        font-size: 28rpx;
        color: $v-c0-85;
        margin-left: 32rpx;
        box-sizing: border-box;
      }
      .fill {
        color: $color-primary-yellow;
        border: 2rpx solid $color-primary-yellow;
      }
      &__width {
        width: 200rpx;
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
      margin-left: 12rpx;
      color: $color-primary-red;
      font-size: 28rpx;
    }
  }
  .color-bg-red {
    background-color: #ffe6e8;
    padding: 20rpx 24rpx;
    color: #f20014;
    &-text {
      color: $v-c0-85;
    }
    &-img {
      width: 40rpx;
      height: 40rpx;
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
