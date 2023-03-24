<template>
  <view>
    <view class="detail flex flex-column">
      <!--导航栏 -->
      <VoNav :isBack="false" is-fixed is-have-more @backFn="reback">
        <block slot="title">
          <view class="flex flex-justify-c flex-vertical-c">
            <!--标题状态前面显示logo-->
            <VoIcon v-if="type === 1110" :size="28" class="p-r-14" name="clock-orange" />
            <VoIcon v-else-if="type === 1120" :size="28" class="p-r-14" name="clock-new" />
            <VoIcon v-else-if="type === 1150" :size="28" class="p-r-14" name="warning" />
            <!--标题状态-->
            <view v-if="type === 1110" class="fz-36 fz-b color-block-yellow">等待付款</view>
            <view v-else class="fz-36 fz-b color-block">{{ orderData.statusName }}</view>
          </view>
        </block>

      </VoNav>

      <view class="detail-flex1 flex1 overflow-y">
        <!--订单各个状态的提示语操作-->
        <!--待支付,服务商的销售订单，不用显示剩余支付时间-->
        <view v-if="type === 1110 && userInfo.platformCode != 'agent'">
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
        <view v-else-if="type === 1120">
          <view v-if="orderData.isWarn">
            <view class="m-t-24 m-l-32 m-r-32 fz-26">
              <view>预计{{ orderData.predictDeliveryTime || '' }}前应发货</view>
              <view class="m-t-16">平台已提醒发货仓库进行发货。</view>
            </view>
          </view>
          <view v-else class="m-t-24 flex flex-justify-c">
            <view class="fz-28">{{ orderData.predictDeliveryTime || '' }}前应发货</view>
          </view>
        </view>
        <view v-else-if="type === 1130" class="m-t-24 p-b-24 flex flex-justify-c">
          <view class="fz-28">{{ orderData.nextStageTime || '' }}之前送达</view>
        </view>
        <view v-else-if="type === 1150" class="m-t-24 p-b-24 flex flex-justify-c">
          <view class="fz-28">取消原因：{{ orderData.cancelReason || '' }} </view>
        </view>

        <!--   物流进度   -->
        <view
          v-if="type === 1130 || (type === 1120 && deliverInfo.sendCount)"
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
        <view class="detail-address m-t-16">
          <view class="detail-address__user flex flex-vertical-c" @click="goImUrl">
            <VoIcon name="smile-m" />
            <view class="flex1 m-l-8 fz-32 fz-b"> {{ orderData.buyerName }} </view>
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
                  v-if="orderData.status === 1110"
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
            <view class="fz-28 m-t-24 overTwoEllipsis lh42 color-block">
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
            <view v-if="type === 1110" class="detail-address__user fz-32 fz-b"
              >{{ orderData.warehouseName }}·{{ orderData.predictDeliveryTime }}之前应发货</view
            >
            <view v-else class="detail-address__user fz-32 fz-b">{{
              orderData.warehouseName
            }}</view>
            <VoIcon v-if="orderData.isValet" :size="24" class="m-r-32" name="generation" />
          </view>
          <view
            v-for="(item, index) in orderData.goodsDetail"
            :key="index"
            @click="goodDetail(item)"
          >
            <view class="detail-address__list flex">
              <image :src="$transferCosUrl(item.pic[0])" class="list-image" />
              <view class="flex1 m-l-16 flex flex-column">
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
                    <block v-if="orderData.status === 1120">
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
            <!-- <view v-if="item.addedServices">
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
            </view> -->
            <view v-show="item.addedServices.length" class="service">
              <view
                v-for="(added, index) in item.addedServices"
                :key="index"
                class="flex p-b-24"
                @click.stop="addedServicesClick(added, item)"
              >
                <view class="fz-24 color-block-45">{{ added.name }}：</view>
                <view class="flex1 flex flex-justify-r flex-vertical-c">
                  <view class="service-red">{{ added.price }}元/{{ added.count }}台</view>
                  <view class="service-icon">
                    <VoIcon
                      v-if="added.supportType === 34"
                      :opacity="0.25"
                      :size="16"
                      name="right-arrow"
                    />
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view class="detail-address__account flex flex-justify-between" />
        </view>
        <!--   收益信息   -->
        <view v-show="!source" class="detail-address m-t-16 m-b-16">
          <view class="detail-address__user fz-32 fz-b">收益信息</view>
          <view class="detail-address__profit flex flex-justify-between flex-vertical-c">
            <view class="color-block fz-26">订单可入账：</view>
            <view @click="openProfit">
              <view class="flex fz-24 flex-vertical-c">
                <view v-if="orderData.canObtainAmount" class="color-red"
                  >{{ orderData.canObtainAmount || 0 }}元</view
                >
                <VoIcon
                  v-if="!arryTo"
                  :opacity="0.45"
                  :size="16"
                  class="m-l-4"
                  name="arrow-bottom-line"
                />
                <VoIcon v-else :opacity="0.45" :size="16" class="m-l-4" name="arrow-top-line" />
              </view>
              <!-- <view v-else class="flex fz-24 flex-vertical-c">
                <view v-if="orderData.payAmount" class="color-red"
                  >{{ orderData.payAmount || 0 }}元</view
                >
                <VoIcon :opacity="0.45" :size="16" class="m-l-4" name="arrow-top-line" />
              </view> -->
            </view>
          </view>
          <view v-show="carryTo" class="fz-26 m-t-8 m-b-24 color-gray p-l-32"
            >订单可入账 = 订单总金额 - 服务费</view
          >
          <view class="detail-address__profit line flex flex-justify-between flex-vertical-c">
            <view class="color-block fz-26">服务费：</view>
            <view @click="openService">
              <view v-if="service === false" class="flex fz-24 flex-vertical-c">
                <view v-if="orderData.serviceAmount" class="color-gray"
                  >{{ orderData.serviceAmount || 0 }}元</view
                >
                <VoIcon :opacity="0.45" :size="16" class="m-l-4" name="arrow-bottom-line" />
              </view>
              <view v-else class="flex fz-24 flex-vertical-c">
                <view v-if="orderData.serviceAmount" class="color-gray"
                  >{{ orderData.serviceAmount || 0 }}元</view
                >
                <VoIcon :opacity="0.45" :size="16" class="m-l-4" name="arrow-top-line" />
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
          <view v-if="orderData.status === 1110">
            <view class="detail-address__user fz-32 fz-b">订单信息</view>
            <view class="detail-address__order fz-28">
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
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>支付方式：</view>
                <!--isCash 1在线支付 2账期支付-->
                <view v-if="orderData.isCash" class="flex flex-vertical-c color-gray"
                  >在线支付</view
                >
                <view v-else class="flex flex-vertical-c color-gray">账期支付</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>商品总额：</view>
                <view class="flex flex-vertical-c color-gray">{{ orderData.goodsAmount }}元</view>
              </view>
              <view
                v-show="+addServieAmount > 0"
                class="flex flex-vertical-c flex-justify-between m-t-16"
              >
                <view>增值服务费：</view>
                <view class="flex flex-vertical-c color-gray">
                  <view class="flex flex-vertical-c">{{ addServieAmount }}元</view>
                  <VoIcon
                    :size="20"
                    class="m-l-8"
                    color="#9A9A9A"
                    name="account-question"
                    @click.native="showAddService = true"
                  />
                </view>
              </view>
              <view
                v-if="!orderData.isCash && orderData.accountAmount"
                class="flex flex-vertical-c flex-justify-between m-t-16"
              >
                <view>账期应付款：</view>
                <view class="flex flex-vertical-c color-red">{{ orderData.accountAmount }}元</view>
              </view>
              <view
                v-if="!orderData.isCash && !orderData.isValet"
                class="flex flex-vertical-c flex-justify-between m-t-16"
              >
                <view>预计到期时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ expectedTime }} 到期</view>
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
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>支付方式：</view>
                <!--isCash 1在线支付 2账期支付-->
                <view v-if="orderData.isCash" class="flex flex-vertical-c color-gray"
                  >在线支付</view
                >
                <view v-else class="flex flex-vertical-c color-gray">账期支付</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>商品总额：</view>
                <view class="flex flex-vertical-c color-gray">{{ orderData.goodsAmount }}元</view>
              </view>
              <view
                v-show="+addServieAmount > 0"
                class="flex flex-vertical-c flex-justify-between m-t-16"
              >
                <view>增值服务费：</view>
                <view class="flex flex-vertical-c color-gray">
                  <view class="flex flex-vertical-c">{{ addServieAmount }}元</view>
                  <VoIcon
                    :size="20"
                    class="m-l-8"
                    color="#9A9A9A"
                    name="account-question"
                    @click.native="showAddService = true"
                  />
                </view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>实付款：</view>
                <view class="flex flex-vertical-c color-red">{{ orderData.payAmount }}元</view>
              </view>
              <view
                v-if="!orderData.isCash && !orderData.isValet"
                class="flex flex-vertical-c flex-justify-between m-t-16"
              >
                <view>预计到期时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ expectedTime }} 到期</view>
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
                  <view class="color-gray"> {{ orderData.id }} </view>
                  <view class="fz-20 m-l-16 color-blue" @click="copyClick">复制</view>
                </view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>下单时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ createOrderTime }} </view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
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
              <view
                v-show="+addServieAmount > 0"
                class="flex flex-vertical-c flex-justify-between m-t-16"
              >
                <view>增值服务费：</view>
                <view class="flex flex-vertical-c color-gray">
                  <view class="flex flex-vertical-c">{{ addServieAmount }}元</view>
                  <VoIcon
                    :size="20"
                    class="m-l-8"
                    color="#9A9A9A"
                    name="account-question"
                    @click.native="showAddService = true"
                  />
                </view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>实付款：</view>
                <view class="flex flex-vertical-c color-red">{{ orderData.payAmount }}元</view>
              </view>
              <view
                v-if="!orderData.isCash && !orderData.isValet"
                class="flex flex-vertical-c flex-justify-between m-t-16"
              >
                <view>预计到期时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ expectedTime }} 到期</view>
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
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>支付方式：</view>
                <!--isCash 1在线支付 2账期支付-->
                <view v-if="orderData.isCash" class="flex flex-vertical-c color-gray"
                  >在线支付</view
                >
                <view v-else class="flex flex-vertical-c color-gray">账期支付</view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>商品总额：</view>
                <view class="flex flex-vertical-c color-gray">{{ orderData.goodsAmount }}元</view>
              </view>
              <view
                v-show="+addServieAmount > 0"
                class="flex flex-vertical-c flex-justify-between m-t-16"
              >
                <view>增值服务费：</view>
                <view class="flex flex-vertical-c color-gray">
                  <view class="flex flex-vertical-c">{{ addServieAmount }}元</view>
                  <VoIcon
                    :size="20"
                    class="m-l-8"
                    color="#9A9A9A"
                    name="account-question"
                    @click.native="showAddService = true"
                  />
                </view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>实付款：</view>
                <view class="flex flex-vertical-c color-red">{{ orderData.payAmount }}元</view>
              </view>
              <view
                v-if="!orderData.isCash && !orderData.isValet"
                class="flex flex-vertical-c flex-justify-between m-t-16"
              >
                <view>预计到期时间：</view>
                <view class="flex flex-vertical-c color-gray">{{ expectedTime }} 到期</view>
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
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
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
                v-show="+addServieAmount > 0"
                class="flex flex-vertical-c flex-justify-between m-t-16"
              >
                <view>增值服务费：</view>
                <view class="flex flex-vertical-c color-gray">
                  <view class="flex flex-vertical-c">{{ addServieAmount }}元</view>
                  <VoIcon
                    :size="20"
                    class="m-l-8"
                    color="#9A9A9A"
                    name="account-question"
                    @click.native="showAddService = true"
                  />
                </view>
              </view>
              <view class="flex flex-vertical-c flex-justify-between m-t-16">
                <view>实付款：</view>
                <view class="flex flex-vertical-c color-red">{{ orderData.payAmount }}元</view>
              </view>
              <view
                v-if="!orderData.isCash && !orderData.isValet"
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
      <view v-if="type === 1110" class="detail-bottom flex flex-justify-r">
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
      <view v-else-if="type === 1120" class="detail-bottom flex flex-justify-r">
        <view class="detail-bottom__button" @click="contantClick">联系仓库</view>
        <view
          v-if="Number(orderData.warehouseType) === 0"
          class="detail-bottom__button fill"
          @click="getDeliveryGoodsRequest"
          >提醒发货</view
        >
        <!--        <view v-else class="detail-bottom__button fill">发货</view>-->
        <block v-else>
          <view
            v-if="orderData.isConsignmentSale && !orderData.isConsignmentShipment"
            class="detail-bottom__button detail-bottom__grey"
            @click.stop="bottomBtnGrey"
          >
            发货
          </view>
          <view v-else class="detail-bottom__button fill" @click="goDeliverGoods"> 发货 </view>
        </block>
      </view>
      <view v-else-if="type === 1130" class="detail-bottom flex flex-justify-r">
        <view class="p-b-safe-area" />
        <!--        <view-->
        <!--          class="detail-bottom__button detail-bottom__width"-->
        <!--          @click="againClick"-->
        <!--          v-if="origin != 'statement'"-->
        <!--          >再来一单</view-->
        <!--        >-->
        <view class="detail-bottom__button fill detail-bottom__width" @click="lookDeliverInfoClick"
          >查看发货信息</view
        >
      </view>
      <view v-else-if="type === 1140" class="detail-bottom flex flex-justify-r">
        <!--        <view-->
        <!--          class="detail-bottom__button detail-bottom__width"-->
        <!--          @click="againClick"-->
        <!--          v-if="origin != 'statement'"-->
        <!--          >再来一单</view-->
        <!--        >-->
        <view class="detail-bottom__button fill detail-bottom__width" @click="lookDeliverInfoClick"
          >查看发货信息</view
        >
      </view>
      <!--      <view v-else-if="type === 1150" class="detail-bottom flex flex-justify-r">-->
      <!--        <view-->
      <!--          class="detail-bottom__button fill detail-bottom__width"-->
      <!--          @click="againClick"-->
      <!--          v-if="origin != 'statement'"-->
      <!--          >再来一单</view-->
      <!--        >-->
      <!--      </view>-->
      <view class="p-b-safe-area" />
    </view>
    <!--   增值服务弹出层   -->
    <u-popup :show="showAddService" mode="bottom" @close="showAddService = false" @open="open">
      <AddServicePrice
        :add-services="addServiceData"
        :add-servie-amount="addServieAmount.toString()"
        @close="showAddService = false"
      />
    </u-popup>
    <!--   定制服务弹出层   -->
    <u-popup :show="showCode" mode="bottom" @close="close" @open="open">
      <CodeService :added-services="addedServicesData" @close="showCode = false" />
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
  import AddServicePrice from '../components/AddServicePrice'
  import { getImUserId } from '@/common/helper'

  export default {
    name: 'OrderDetail',
    components: { CodeService, CancelOrder, AddServicePrice },
    data() {
      return {
        deliverGoodsModel: false,
        type: 0, // 1110.待付款 1120.待发货 1150.已取消 1130.已发货 1140.已完成
        navTitle: '订单详情',
        carryTo: false, // 订单可入账
        service: false, // 服务费
        showCode: false, // 定制服务弹出层
        showCancelOrder: false, // 取消订单弹出层
        showAddService: false, // 增值服务弹出层
        addServiceData: [], //增值服务信息
        addServieAmount: '',
        mobileShowAction: false, // 电话联系人弹框
        mobileList: [], // 电话列表
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
        //订单详情来源 空 销售订单 1.推广订单
        source: '',
        arryTo: false,
        origin: '', //statement结算单
        mobile: [], // 电话列表
        mobile1: '', // 电话号码1
        mobile2: '', // 电话号码2
      }
    },
    onLoad(option) {
      this.orderId = option.id
      this.origin = option.origin || ''
    },
    async onShow() {
      await this.getOrderDetailRequest()
    },
    methods: {
      reback() {
        this.$backFn()
        uni.$emit('updateOrderList')
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
      /**
       * 去店铺聊天
       */
      goImUrl() {
        console.log('this.orderData.buyerId', this.orderData.buyerId)
        //根据店铺id获取userId
        getImUserId({ companyId: this.orderData.buyerId })
          .then((res) => {
            console.log('res', res)
            if (res.data) {
              const info = {
                targetId: res.data.userId,
                type: 0,
                note: this.orderData.buyerName,
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
        if (data.supportType === 34) {
          this.showCode = true
          this.addedServicesData = data
          this.addedServicesData.goodsCount = item.goodsCount
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
      getDeliveryGoodsRequest() {
        let param = {
          orderId: this.orderData.id,
        }
        this.$VoHttp
          .apiOrderSellWarn({ req: param })
          .then((res) => {
            if (res.code === '20001') {
              this.deliverGoodsModel = true
            } else {
              uni.$u.toast(res.message || '提醒发货失败')
            }
          })
          .catch((err) => {
            uni.$u.toast(err.message || '提醒发货失败')
          })
      },
      // 寄售订单未发货：【发货】按钮置灰，服务商点击时显示toast提示：由于该订单关联的寄售订单尚未发货，本订单也无法发货
      bottomBtnGrey() {
        this.$u.toast('由于该订单关联的寄售订单尚未发货，本订单也无法发货')
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
              '2',
          )
          return
        }
        this.$linkToEasy(
          '/pagesAgent/Order/DeliverGoods/DeliverGoods?data=' +
            JSON.stringify(this.orderData) +
            '&type=' +
            '2',
        )
      },
      /**
       *查看发货信息
       */
      lookDeliverInfoClick() {
        this.$linkToEasy(
          '/pagesAgent/Order/OrderDetail/DeliveryMessage?data=' + JSON.stringify(this.orderData),
        )
      },
      /**
       * 跳转发货信息页面
       */
      deliveryClick() {
        this.$linkToEasy(
          '/pagesAgent/Order/OrderDetail/DeliveryMessage?data=' + JSON.stringify(this.orderData),
        )
      },
      /**
       * 跳转备注
       */
      remarkClick() {
        this.$linkToEasy(
          '/pagesAgent/Order/OrderSearch/OrderRemark?data=' + JSON.stringify(this.orderData),
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
          `/pagesCommon/AddressList/AddressList?orderId=${this.orderData.id}&type=2&roleType=2&addressId=${this.orderData.orderAddress.id}`,
        )
      },
      /**
       * 联系仓库
       */
      contantClick() {
        this.callPhone(this.orderData.warehousePhone)
        return
        //createTime	string 非必须 创建时间 format: date-time
        //disturb	integer 非必须 是否开启消息免打扰 0：关闭   1：开启 format: int32
        //id	integer 非必须 对话框id format: int64
        //targetId	integer 非必须 目标人id或者群id format: int64
        //userId	integer 非必须 用户id
        //version	integer 非必须 数据版本
        const info = {
          targetId: this.orderData.warehouseUserId,
          type: 0,
          platformCode: this.orderData.warehouseShopCode, // 1供应商  2服务商
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
       * 跳转商品详情页
       */
      goodDetail(item) {
        console.log(item)
        this.$linkToEasy(
          `/pagesAgent/GoodsList/GoodsDetail?id=${item.goodsId}&wid=${this.orderData.warehouseId}&companyId=${this.orderData.buyerId}`,
        )
      },
      /**
       * 再来一单
       */
      againClick() {
        this.againOrder()
      },
      againOrder() {
        if (this.orderData.isValet) {
          // 存储商品信息，并带到提交订单页面
          // 组装需要的数据
          let url = ''
          if (this.orderData.goodsDetail[0].pic && this.orderData.goodsDetail[0].pic.length) {
            url = this.orderData.goodsDetail[0].pic[0]
          }
          const orderProductInfo = {
            shopInfo: {
              shopName: this.orderData.shopName,
              buyerId: this.orderData.buyerId,
            },
            goodsInfo: {
              addedServices: [],
              goodsCount: this.orderData.goodsDetail[0].goodsCount,
              goodsId: this.orderData.goodsDetail[0].goodsId,
              isCash: true,
              originalPrice: this.orderData.cashAmount,
              shippingType: this.orderData.shippingType || 2, // 1 包邮 2 到付
              codingPrice: this.orderData.goodsDetail[0].codingPrice,
              isCoding: this.orderData.isCoding,
              shopId: this.orderData.shopId,
              skuProperty: JSON.stringify(this.orderData.skuProperty || {}),
              warehouseId: this.orderData.warehouseId,
              warehouseName: this.orderData.warehouseName,
              arrivalTime: this.orderData.arrivalTime,
              pic: url,
              name: this.orderData.goodsDetail[0].goodsName,
            },
          }
          this.$storage.set('OrderPayInfoAgent', orderProductInfo)
          this.$linkToEasy('/pagesAgent/SubmitOrder/SubmitOrder')
          return
        }

        let cartDetailstList = []
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
            isValet: this.orderData.isValet,
            cartWarehouseList: [
              {
                warehouseName: this.orderData.warehouseName,
                warehouseId: this.orderData.warehouseId,
                cartDetailstList: cartDetailstList,
              },
            ],
          },
        ]
        console.log(data)
        this.$storage.set('investGoodsData', data)
        this.$linkToEasy(
          '/pagesAgent/InvestmentList/SubmitOrders?queryType=' + 1 + '&sourceType=' + 2,
        )
      },
      //复制订单
      copyClick() {
        uni.setClipboardData({
          data: this.orderData.id,
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
      //获取订单详情
      getOrderDetailRequest() {
        let param = { id: this.orderId }
        this.$VoHttp
          .apiOrderSell$Id(param)
          .then((res) => {
            if (res.code === '20001') {
              this.orderData = res.data
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
        let Time = new Date(this.orderData.nextStageTime.replace(/-/g, '/'))
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
        if (this.orderAddress.phone.indexOf('/') > -1) {
          this.mobile = this.orderAddress.phone.split('/')
          this.mobile1 = this.mobile[0]
          this.mobile2 = this.mobile[1]
        }
        //订单分润信息
        this.orderProfitInfoList = this.orderData.orderProfitInfoList
        //处理增值服务
        this.addServiceData = this.orderData.goodsDetail[0].addedServices
        this.addServieAmount = 0
        this.addServiceData.forEach((item) => {
          this.addServieAmount = this.decimalAddFn(Number(this.addServieAmount), Number(item.price))
        })
        //物流信息
        this.deliverInfo = this.orderData.deliveryDetail
        if (!this.orderData.isCash) {
          this.getExpectedTime()
        }
      },
      //取消订单请求
      getCancelOrderRequest(param) {
        this.$VoHttp
          .apiOrderSellCancel({ req: param })
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
      &__info {
        font-size: 28rpx;
        padding: 24rpx 0;
        margin: 0 32rpx;
        border-bottom: 2rpx solid $v-bg-light;
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
      &__list {
        padding: 16rpx 32rpx;
        height: 160rpx;
        .list-image {
          width: 160rpx;
          height: 160rpx;
          border-radius: 8rpx;
          overflow: hidden;
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
      padding: 24rpx 32rpx 12rpx;
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
      &__grey {
        background: #ffffff;
        border: 2rpx solid #f6f7f8;
        color: rgba(0, 0, 0, 0.25);
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
      margin-left: 16rpx;
      color: $color-primary-red;
      font-size: 28rpx;
    }
  }
  .service {
    background: #f7f7f8;
    border-radius: 4px;
    padding: 24rpx 16rpx 0 24rpx;
    box-sizing: border-box;
    margin: 24rpx 32rpx;
    &-red {
      color: #e50012;
      font-size: 24rpx;
    }
    &-icon {
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
