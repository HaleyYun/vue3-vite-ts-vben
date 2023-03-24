<template>
  <view class="details">
    <!--     订单状态 3310：待付款，3320：待质检，3330：待接单，3331：待指派，3340：待上门，3350：回收中，3351：待发货，3352：待收货，3360：已完成，3370：已取消，3380：已关闭； -->
    <VoNav is-fixed is-have-more>
      <view slot="title">
        <view class="flex flex-justify-c flex-vertical-c">
          <VoIcon v-if="orderStatus === 3320" :size="28" color="#FF5319" name="clock" />
          <VoIcon v-if="orderStatus === 3370" :size="28" color="#262626" name="warning" />
          <view v-if="orderStatus === 3310" class="fz-32 fz-b detail-title m-l-8">待付款</view>
          <view
            v-else-if="orderStatus === 3360 || orderStatus === 3351 || orderStatus === 3352"
            class="fz-32 fz-b detail-title m-l-8"
            >已完成</view
          >
          <view v-else-if="orderStatus === 3330" class="fz-32 fz-b detail-title m-l-8">待接单</view>
          <view v-else-if="orderStatus === 3320" class="fz-32 fz-b detail-title m-l-8">待查验</view>
          <view v-else class="fz-32 fz-b detail-title m-l-8">
            {{ orderDetail.statusEvent || '' }}
          </view>
        </view>
      </view>
    </VoNav>
    <view class="flex1 overflow-y">
      <view
        v-if="[3310, 3320, 3330, 3331, 3370, 3380].includes(orderStatus)"
        class="details-reason"
        >{{ switchReason() }}</view
      >
      <view
        v-if="
          (orderStatus === 3350 ||
            orderStatus === 3351 ||
            orderStatus === 3352 ||
            orderStatus === 3360) &&
          orderDetail.technicianInfo
        "
        class="m-t-16 bg-white flex flex-row flex-vertical-c flex-justify-between p-t-24 p-b-24 p-l-32 p-r-32"
      >
        <view class="flex flex-row flex-vertical-c">
          <image
            :src="orderDetail.technicianInfo.photoUrl"
            class="details-head"
            mode="aspectFill"
          />
          <view class="m-l-16">
            <view class="flex flex-row">
              <view class="fz-b fz-28 lh150 color-block">集师傅:</view>
              <view class="fz-b fz-28 lh150 color-block m-l-8">{{
                orderDetail.technicianInfo.realName
              }}</view>
            </view>
            <view class="flex flex-row m-t-4">
              <view class="fz-24 lh150 color-block-45">好评率:</view>
              <view class="fz-24 lh150 color-block-45 m-l-8">{{
                orderDetail.technicianInfo.favorableComment
              }}</view>
            </view>
          </view>
        </view>
        <view
          v-if="orderStatus == 3340 || orderStatus == 3350"
          class="flex flex-row flex-vertical-c"
        >
          <view class="flex flex-row flex-justify-c">
            <VoIcon
              :size="24"
              name="phone-supplier"
              @click="$cellPhone(orderDetail.technicianInfo.userName)"
            />
            <VoIcon :size="24" class="m-l-32" name="smile-m" @click.native.stop="toChat()" />
          </view>
        </view>
      </view>
      <view class="details-recycle bg-white m-t-16">
        <view class="flex flex-row flex-justify-between flex-vertical-c">
          <view class="fz-b fz-32 lh150 color-block flex1">回收商品</view>
          <view
            v-if="
              !(
                orderStatus === 3360 ||
                orderStatus === 3351 ||
                orderStatus === 3352 ||
                orderStatus === 3370 ||
                orderStatus === 3380
              )
            "
            class="flex flex-vertical-c fz-28 h42"
            @click="editOrder"
          >
            <u-line color="rgba(0, 0, 0, 0.15)" direction="col" length="12"></u-line>
            <view class="m-l-24 color-blue"> 修改 </view>
          </view>
        </view>
        <view class="fz-b fz-28 lh150 color-block m-t-24">{{ orderDetail.supportName }}</view>
        <view class="flex flex-row flex-justify-between m-t-16">
          <view class="fz-28 lh150 color-block w150">服务金额：</view>
          <view class="details-red fz-b text-right flex1">{{ orderDetail.supportAmount }}元</view>
        </view>
        <view class="flex flex-row flex-justify-between m-t-16">
          <view class="fz-28 lh150 color-block w150">上门时间：</view>
          <view class="text-right flex1 fz-28 lh150 color-block-45">{{
            orderDetail.homeStartTime.substr(0, 16) + '-' + orderDetail.homeEndTime.substr(11, 5)
          }}</view>
        </view>
        <view class="flex flex-row flex-justify-between m-t-16">
          <view class="fz-28 lh150 color-block w150">安装地址：</view>
          <view class="text-right flex1 fz-28 lh150 color-block-45">{{
            addressDetail.address + '-' + addressDetail.addressDetail
          }}</view>
        </view>
      </view>
      <!--   验收情况   -->
      <view v-if="supportQualityVO" class="m-t-16 bg-white">
        <view class="p-32">
          <view class="fz-32 fz-b lh150 color-block title">验收情况</view>
          <view class="flex flex-row m-t-48">
            <view class="fz-32 lh150 color-block">验收结果:</view>
            <view
              v-if="supportQualityVO.quality"
              class="old_machine-green fz-32 lh150 color-block m-l-16"
              >合格</view
            >
            <view v-else class="old_machine-red fz-32 lh150 color-block m-l-16">不合格</view>
          </view>
          <view
            v-if="
              supportQualityVO &&
              supportQualityVO.checkMsg &&
              supportQualityVO.checkMsg.video &&
              supportQualityVO.checkMsg.video.length
            "
          >
            <view class="relative m-t-20" @click="playTheVideo">
              <image
                :src="supportQualityVO.checkMsg.video[0].poster"
                class="recovery-git__img"
                mode="aspectFill"
              />
              <image class="detail-video__paly" src="/static/common/play.png" />
            </view>
            <view class="text-center fz-28 lh150 color-block-45 m-t-24">验收视频</view>
            <view class="flex_images m-t-40">
              <view
                v-for="(item, index) in supportQualityVO.checkMsg.pic"
                :key="index"
                class="text-center"
                @click="previewImageFn(item)"
              >
                <image :src="item" class="recovery-img" mode="aspectFill" />
              </view>
            </view>
            <!-- <view class="text-center fz-28 lh150 color-block-45 m-t-16">验收图片</view> -->
          </view>
        </view>
      </view>
      <!--  个人信息    -->
      <view
        v-if="orderStatus === 3380 && orderDetail.technicianInfo"
        class="m-t-16 bg-white flex flex-row flex-vertical-c flex-justify-between p-t-24 p-b-24 p-l-32 p-r-32"
      >
        <view class="flex flex-row flex-vertical-c">
          <image
            :src="orderDetail.technicianInfo.photoUrl"
            class="details-head"
            mode="aspectFill"
          />
          <view class="m-l-16">
            <view class="flex flex-row">
              <view class="fz-b fz-28 lh150 color-block">集师傅:</view>
              <view class="fz-b fz-28 lh150 color-block m-l-8">{{
                orderDetail.technicianInfo.realName
              }}</view>
            </view>
            <view class="flex flex-row m-t-4">
              <view class="fz-24 lh150 color-block-45">好评率:</view>
              <view v-if="orderDetail.technicianInfo" class="fz-24 lh150 color-block-45 m-l-8">{{
                orderDetail.technicianInfo.favorableComment
              }}</view>
            </view>
          </view>
        </view>
        <view class="flex flex-row flex-vertical-c">
          <view class="flex flex-row flex-justify-c">
            <VoIcon
              :size="24"
              name="phone-supplier"
              @click="$cellPhone(orderDetail.technicianInfo.userName)"
            />
            <VoIcon :size="24" class="m-l-32" name="smile-m" @click.native.stop="toChat()" />
          </view>
        </view>
      </view>
      <!--   旧机信息   -->
      <!--   旧机信息   -->
      <!-- <view
        v-if="engineMsg && orderDetail.supportSource == 1 && engineMsg.pic.length > 1"
        class="m-t-16 bg-white"
      >
        <view class="p-32">
          <view class="old_machine fz-28 m-t-12">
            <view class="old_machine-image">
              <template v-for="(item, index) in engineMsg.pic">
                <view v-if="index !== 0" :key="index" @click="choseImg(0, [item])">
                  <view>
                    <image
                      :key="index"
                      :src="item"
                      height="218rpx"
                      mode="aspectFill"
                      width="218rpx"
                    />
                  </view>
                  <view class="fz-28 m-t-16">{{ switchName(index) }}</view>
                </view>
              </template>
            </view>
          </view>
        </view>
      </view> -->
      <!--   服务评价start   -->
      <view
        v-if="orderDetail.orderServiceEvaluateVO"
        class="m-t-20 bg-white p-l-32 p-t-24 p-r-32 p-b-24"
      >
        <view class="fz-b fz-32 lh150 color-block">服务评价</view>
        <view class="line-view" />
        <view class="flex flex-row m-t-24">
          <view class="fz-28 lh150 color-block">星级:</view>
          <u-rate
            :count="5"
            :size="23"
            :value="orderServiceEvaluateVO.starMark / 2"
            activeIcon="/static/created/evaluate/score_activate.png"
            class="m-l-18"
            disabled
            gutter="18"
            inactiveIcon="/static/created/evaluate/score_not_active.png"
            readonly
          />
        </view>
        <view class="flex flex-row m-t-16">
          <view class="fz-28 lh150 color-block">内容:</view>
          <view class="fz-28 lh150 color-block-65 m-l-18 flex1">{{
            orderServiceEvaluateVO.content.content
          }}</view>
        </view>
        <!-- <view class="flex-row flex m-t-48">
          <view
            v-if="
              orderServiceEvaluateVO.content.fileList[0] &&
              orderServiceEvaluateVO.content.fileList[0].url
            "
            class="voucher-img"
            @click="choseImg(0, [orderServiceEvaluateVO.content.fileList[0].url])"
          >
            <image
              :src="orderServiceEvaluateVO.content.fileList[0].url"
              class="voucher-img__picture"
            />
          </view>
        </view> -->
        <view
          v-if="
            orderServiceEvaluateVO.content.fileList &&
            orderServiceEvaluateVO.content.fileList.length
          "
          class="serve-img"
        >
          <view
            v-for="(info, index) in orderServiceEvaluateVO.content.fileList"
            :key="index"
            class="serve-img__outside"
          >
            <image
              :src="info.src"
              class="outside-size"
              mode="aspectFill"
              @click="previewImageFn(info.src)"
              @error="imgErr"
            />
          </view>
        </view>
      </view>
      <!--   服务评价end   -->
      <!--   旧机信息   -->
      <view v-if="engineMsg" class="m-t-16 bg-white">
        <view class="p-32">
          <view class="fz-32 fz-b lh150 color-block title">商品信息</view>
          <view class="flex flex-row flex-justify-between m-t-48">
            <view class="fz-32 lh150 color-block">缸体号</view>
            <view class="fz-32 lh150 color-block">{{ engineMsg.no }}</view>
          </view>
          <view class="place-holder m-t-24" />
          <view class="old_machine fz-28">
            <view class="m-t-24">
              <view class="old_machine-image">
                <template v-for="(item, index) in engineMsg.pic">
                  <view v-if="index === 0" :key="index" @click="choseImg(0, [item])">
                    <view>
                      <image
                        :key="index"
                        :src="item + '&type=1'"
                        height="460rpx"
                        mode="aspectFill"
                        width="460rpx"
                      />
                    </view>
                    <view class="fz-28 m-t-16">{{ switchName(index) }}</view>
                  </view>
                  <view
                    v-else-if="index != 0 && orderDetail.supportSource == 1"
                    :key="index"
                    @click="choseImg(0, [item])"
                  >
                    <view>
                      <image :key="index" :src="item" class="image-218" mode="aspectFit" />
                    </view>
                    <view class="fz-28 m-t-16">{{ switchName(index) }}</view>
                  </view>
                </template>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!--   购机信息   -->
      <view
        v-if="orderDetail.relationOrderId && orderDetail.relationOrderId != 0"
        class="m-t-16 bg-white p-t-24 p-b-24 p-l-32 p-r-32"
      >
        <view class="flex flex-row flex-justify-between flex-vertical-c">
          <view class="fz-32 fz-b lh150 color-block">购机订单</view>
          <VoIcon
            :opacity="0.45"
            :size="16"
            color="#000"
            name="right-arrow"
            @click="goOrderDetail"
          />
        </view>
        <view class="flex flex-row flex-vertical-c m-t-24 p-16">
          <view
            v-if="orderDetail.goodsDetail.length"
            class="flex flex-vertical-c flex-justify-between"
          >
            <block v-if="orderDetail.goodsDetail[0].pic.length">
              <image
                v-if="
                  orderDetail.goodsDetail[0].pic[0].indexOf('mp4') > -1 ||
                  orderDetail.goodsDetail[0].pic[0].indexOf('MP4') > -1
                "
                :src="orderDetail.goodsDetail[0].pic[0] + '&type=3'"
                class="order-img"
              />
              <image v-else :src="orderDetail.goodsDetail[0].pic[0]" class="order-img" />
            </block>

            <view>
              <view class="fz-28 lh150 color-block fz-b m-l-16">
                <text v-show="orderDetail.goodsDetail[0].categoryType" class="good-tips m-r-8">{{
                  orderDetail.goodsDetail[0].categoryType
                }}</text>
                {{ orderDetail.goodsDetail[0].goodsName }}</view
              >
              <view class="fz-28 lh150 color-block-45 m-l-16 m-t-6"
                >发动机识别码:{{ orderDetail.engineNo ? orderDetail.engineNo : '暂无' }}</view
              >
            </view>
          </view>
        </view>
        <!-- <view class="flex flex-row flex-vertical-c m-t-24">
          <view class="fz-28 lh150 color-block">缸体号:</view>
          <view class="fz-28 lh150 color-block m-l-8">{{ orderDetail.engineNo }}</view>
        </view> -->
      </view>
      <!--   订单信息   -->
      <view class="m-t-16 bg-white p-t-24 p-b-24 p-l-32 p-r-32">
        <view class="fz-b fz-32 color-block lh150">订单信息</view>
        <view class="line-view" />
        <view class="flex flex-row flex-justify-between flex-vertical-c m-t-24">
          <view class="fz-28 color-block lh150 w150">订单编号：</view>
          <view class="flex flex-row flex-vertical-c">
            <view class="fz-28 lh150 color-block-45">{{ orderDetail.id }}</view>
            <view class="fz-28 lh150 recall-copy m-l-8" @click="copyHandler(orderDetail.id)"
              >复制</view
            >
          </view>
        </view>
        <view
          v-if="orderDetail.placeOrderTime"
          class="flex flex-row flex-justify-between flex-vertical-c m-t-16"
        >
          <view class="fz-28 color-block lh150 w150">下单时间：</view>
          <view class="fz-28 lh150 color-block-45">{{ orderDetail.placeOrderTime }}</view>
        </view>
        <view
          v-if="orderDetail.taskOrderTime"
          class="flex flex-row flex-justify-between flex-vertical-c m-t-16"
        >
          <view class="fz-28 color-block lh150 w150">接单时间：</view>
          <view class="fz-28 lh150 color-block-45"> {{ orderDetail.taskOrderTime }} </view>
        </view>
        <view
          v-if="orderDetail.reachStoreTime"
          class="flex flex-row flex-justify-between flex-vertical-c m-t-16"
        >
          <view class="fz-28 color-block lh150 w150">到店时间：</view>
          <view class="fz-28 lh150 color-block-45"> {{ orderDetail.reachStoreTime }} </view>
        </view>
        <view
          v-if="orderDetail.recycleCompletedTime"
          class="flex flex-row flex-justify-between flex-vertical-c m-t-16"
        >
          <view class="fz-28 color-block lh150 w200">回收完成时间：</view>
          <view class="fz-28 lh150 color-block-45"> {{ orderDetail.recycleCompletedTime }} </view>
        </view>
        <view
          v-if="orderDetail.cancelTime"
          class="flex flex-row flex-justify-between flex-vertical-c m-t-16"
        >
          <view class="fz-28 color-block lh150 w150">取消时间：</view>
          <view class="fz-28 lh150 color-block-45"> {{ orderDetail.cancelTime }} </view>
        </view>
        <view
          v-if="orderDetail.closeTime"
          class="flex flex-row flex-justify-between flex-vertical-c m-t-16"
        >
          <view class="fz-28 color-block lh150 w150">关闭时间：</view>
          <view class="fz-28 lh150 color-block-45"> {{ orderDetail.closeTime }} </view>
        </view>
      </view>
      <view class="m-t-24" />
    </view>
    <view class="details-bottom flex flex-justify-r bg-white">
      <view class="flex flex-row flex-justify-r">
        <view
          v-if="orderDetail.status === 3340 || orderDetail.status === 3331"
          class="details-bottom__sell m-b-40 m-t-40 m-r-32"
          @click="goImUrl()"
          >联系客服</view
        >
        <view
          v-if="orderDetail.status <= 3331"
          class="details-bottom__sell m-b-40 m-t-40 m-r-32"
          @click="cancelOrder"
          >取消订单</view
        >
        <view
          v-if="
            orderDetail.status === 3310 ||
            orderDetail.status === 3330 ||
            orderDetail.status === 3331
          "
          class="details-bottom__voucher m-b-40 m-t-40 m-r-32"
          @click="modifyOrder"
          >修改订单</view
        >
        <view
          v-if="orderDetail.isWaiting"
          class="details-bottom__sell m-b-40 m-t-40 m-r-32"
          @click="toContinue"
          >继续等待</view
        >
        <view
          v-if="orderDetail.isWaiting"
          class="details-bottom__voucher m-b-40 m-t-40 m-r-32"
          @click="showAssignMechanic"
          >不等待</view
        >
        <view
          v-if="orderDetail.status === 3350"
          class="details-bottom__voucher m-b-40 m-t-40 m-r-32"
          @click="goImUrl()"
          >联系客服</view
        >
        <!-- 3351：待发货，3352：待收货，3360：已完成 -->
        <view
          v-if="
            (orderStatus === 3360 || orderStatus === 3351 || orderStatus === 3352) &&
            !orderDetail.orderServiceEvaluateVO
          "
          class="details-bottom__voucher m-b-40 m-t-40 m-r-32"
          @click="toEvaluate"
          >评价</view
        >
      </view>
    </view>
    <VoSafetyArea v-if="orderStatus !== 3370" :is-fixed="false" />
    <EraPreviewVideo
      v-if="
        supportQualityVO &&
        supportQualityVO.checkMsg &&
        supportQualityVO.checkMsg.video &&
        supportQualityVO.checkMsg.video.length
      "
      ref="EraPreviewVideo"
      :poster="supportQualityVO.checkMsg.video[0].poster"
      :videoSrc="supportQualityVO.checkMsg.video[0].src"
    />
    <!--  取消订单  -->
    <VoModal
      v-if="isCancle"
      :show="true"
      cancelText="我再想想"
      confirmText="取消订单"
      showCancelButton
      @cancel="isCancle = false"
      @confirm="sureCancleOrder"
    >
      <view class="slot-content"> {{ isBindContent }}</view>
    </VoModal>

    <VoModal v-if="isNoCancel" :show="true" confirmText="我知道了" @confirm="isNoCancel = false">
      <view class="slot-content"> {{ isNoCancelContent }}</view>
    </VoModal>

    <!-- 不等待 我知道了弹窗 -->
    <VoModal v-if="isNoWait" :show="true" confirmText="我知道了" @confirm="isNoWaitConfirm">
      <view class="slot-content"> 平台将尽快指派其他集师傅继续为您提供回收服务</view>
    </VoModal>
    <!--  指派新技工  -->
    <VoModal
      v-if="isAssign"
      :show="true"
      cancelText="取消订单"
      confirmText="需要指派"
      showCancelButton
      @cancel="assignNotMechanic"
      @confirm="assignMechanic"
    >
      <view class="slot-content"> 是否需要指派其他集师傅继续回收服务？</view>
    </VoModal>
    <!--  是否到达  -->
    <VoModal
      v-if="isArrival"
      :show="true"
      cancelText="否"
      confirmText="是"
      showCancelButton
      @cancel="hasArrved(0)"
      @confirm="hasArrved(1)"
    >
      <view class="slot-content"> {{ isArrivalContent }}</view>
    </VoModal>
  </view>
</template>

<script>
  import { goOnlineCustomerFn } from '@/common/helper'

  export default {
    name: 'RecoveryOrderDetails',
    data() {
      return {
        orderDetail: {
          homeStartTime: '',
          homeEndTime: '',
          statusEvent: '',
          goodsDetail: [{ pic: [] }],
        },
        isCancle: false,
        isNoCancel: false,
        isArrival: false,
        isAssign: false,
        isNoWait: false,
        id: '',
        isBindContent: '该回收订单为随新机购买生成的订单，如要取消，则将同步取消关联的购买订单',
        isNoCancelContent:
          '该回收订单为随新机购买生成的订单，当前关联的购买订单已经发货，无法取消订单',
        isArrivalContent: '',
        modelList: [],

        //0待查验 1待接单 2待指派 3待上门 4回收中 5已完成 6已取消 7已关闭
        images: [
          {
            type: 'img',
            name: '缸体号',
            url: 'https://cdn.uviewui.com/uview/album/1.jpg',
          },
          {
            type: 'img',
            name: '出气口',
            url: 'https://cdn.uviewui.com/uview/album/1.jpg',
          },
          {
            type: 'video',
            name: '进气口',
            url: 'https://cdn.uviewui.com/uview/album/1.jpg',
          },
          {
            type: 'img',
            name: '正时端',
            url: 'https://cdn.uviewui.com/uview/album/1.jpg',
          },
          {
            type: 'video',
            name: '曲后端',
            url: 'https://cdn.uviewui.com/uview/album/1.jpg',
          },
        ],
      }
    },
    computed: {
      orderStatus() {
        return this.orderDetail.status
      },
      engineMsg() {
        let dict = {}
        if (this.orderDetail && this.orderDetail.engineMsg) {
          let imgs = []
          let data = JSON.parse(this.orderDetail.engineMsg)
          if (data.pic instanceof Array) {
            imgs = imgs.concat(data.pic)
          } else {
            imgs.push(data.pic.pic1 ? data.pic.pic1 : '')
            imgs.push(data.pic.pic2 ? data.pic.pic2 : '')
            imgs.push(data.pic.pic3 ? data.pic.pic3 : '')
            imgs.push(data.pic.pic4 ? data.pic.pic4 : '')
            imgs.push(data.pic.pic5 ? data.pic.pic5 : '')
          }
          dict.pic = imgs
          dict.no = data.no
          return dict
        }
        return ''
      },
      addressDetail() {
        if (this.orderDetail && this.orderDetail.addressDetail) {
          return JSON.parse(this.orderDetail.addressDetail)
        }
        return {}
      },
      technicianInfo() {
        if (this.orderDetail && this.orderDetail.technicianInfo) {
          return JSON.parse(this.orderDetail.technicianInfo)
        }
        return {}
      },
      orderServiceEvaluateVO() {
        if (this.orderDetail && this.orderDetail.orderServiceEvaluateVO) {
          return {
            ...this.orderDetail.orderServiceEvaluateVO,
            content: JSON.parse(this.orderDetail.orderServiceEvaluateVO.content),
          }
        }
        return ''
      },
      orderEvaluateVO() {
        if (
          this.orderDetail &&
          this.orderDetail.orderEvaluateVO &&
          this.orderDetail.orderEvaluateVO.content
        ) {
          return {
            ...this.orderDetail.orderEvaluateVO,
            content: JSON.parse(this.orderDetail.orderEvaluateVO.content),
          }
        }
        return {}
      },
      supportQualityVO() {
        if (
          this.orderDetail &&
          this.orderDetail.supportQualityVO &&
          this.orderDetail.supportQualityVO.checkMsg
        ) {
          return {
            ...this.orderDetail.supportQualityVO,
            checkMsg: JSON.parse(this.orderDetail.supportQualityVO.checkMsg),
          }
        }
        return ''
      },
    },
    onShow() {
      this.reqDetail()
    },
    methods: {
      /**
       * 预览图片
       */
      previewImageFn(src) {
        uni.previewImage({
          urls: [src],
          current: 0,
        })
      },
      playTheVideo() {
        this.$refs.EraPreviewVideo.show(this.supportQualityVO.checkMsg.video[0].src)
      },
      goOrderDetail() {
        this.$linkToEasy(
          '/pagesGarage/InstallOrder/OrderDetail/OrderDetail?id=' +
            this.orderDetail.relationOrderId,
        )
      },
      switchReason() {
        switch (this.orderDetail.status) {
          case 3310:
            return '该订单尚未支付，请对关联的购机订单一起支付处理'
          case 3320:
            return '您的订单已经提交，请等待处理审核'
          case 3330:
            return '等待集师傅接单中'
          case 3331:
            return '平台将会尽快为您指派集师傅'
          case 3370:
            return '取消原因：' + (this.orderDetail.cancelReason || '--')
          case 3380:
            return '关闭原因：' + (this.orderDetail.cancelReason || '--')
          default:
            return
        }
      },
      /**
       * 到聊天界面
       * @param info
       */
      goImUrl(info) {
        goOnlineCustomerFn(2)
      },
      toChat() {
        const data = {
          targetId: this.orderDetail.technicianInfo.id,
          type: 0,
          note: this.orderDetail.technicianInfo.realName,
          platformCode: 'skilledWorker',
        }
        this.$storage.set('temp_im_room_info', data)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      async goodsModelList() {
        try {
          let res = await this.$VoHttp.apiGoodsModelRecycleList()
          if (res.success) {
            this.modelList = res.data
          }
        } catch (err) {
          this.$u.toast(err.message)
        }
      },
      /**
       * 预览图片
       */
      choseImg(index, img) {
        uni.previewImage({
          current: index,
          urls: img,
        })
      },
      // 复制
      copyHandler(code) {
        // 复制操作
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const _this = this
        uni.setClipboardData({
          data: code,
          success: function () {
            _this.$u.toast('复制成功')
          },
        })
      },
      /**
       * 修改订单
       */
      modifyOrder() {
        //todo
        this.$linkToEasy('/pagesGarage/RecoveryOrder/RecoveryOrderModify?id=' + this.id)
      },
      async cancelOrder() {
        try {
          const isBind = await this.$VoHttp.apiOrderRecycleCheckCancel({
            id: this.orderDetail.id,
            cancelReason: '不合适',
          })
          if (isBind.data.code == 1) {
            this.$linkToEasy('/pagesGarage/RecoveryOrder/CancelOrder?id=' + this.id)
          } else if (isBind.data.code == 2) {
            this.isCancle = true
            this.isBindContent = isBind.data.message
          } else if (isBind.data.code == 3) {
            this.isNoCancel = true
            this.isNoCancelContent = isBind.data.message
          }
        } catch (err) {
          uni.$u.toast(err.message)
        }
      },
      sureCancleOrder() {
        this.isCancle = false
        this.$linkToEasy('/pagesGarage/RecoveryOrder/CancelOrder?id=' + this.id)
      },
      /**
       * 继续等待
       */
      async toContinue() {
        const res = await this.$VoHttp.apiOrderRecycleContinueWait({
          id: this.id,
        })
        if (res.success) {
          this.reqDetail()
        } else {
          uni.$u.toast(res.message)
        }
      },
      //   不等待
      showAssignMechanic() {
        if (this.orderDetail.supportSource == 2) {
          this.isNoWait = true
        } else {
          this.isAssign = true
        }
      },
      //   销售订单不等待
      async isNoWaitConfirm() {
        const res = await this.$VoHttp.apiOrderRecycleWaitingAssign({
          id: this.id,
        })
        if (res.success) {
          this.reqDetail()
        }
      },
      //  单独发起不需要指派
      async assignNotMechanic() {
        const res = await this.$VoHttp.apiOrderRecycleNotNeed({
          id: this.id,
        })
        if (res.success) {
          this.reqDetail()
          this.isAssign = false
        } else {
          uni.$u.toast(res.message)
        }
      },
      /**
       * 单独发起需要指派新技工
       */
      async assignMechanic() {
        const res = await this.$VoHttp.apiOrderRecycleNeedAssign({
          id: this.id,
        })
        if (res.success) {
          this.reqDetail()
          this.isAssign = false
        } else {
          uni.$u.toast(res.message)
        }
      },
      async hasArrved(val) {
        const res = await this.$VoHttp.apiOrderNoninductiveEvaluateSave({
          sourceId: this.id,
          content: this.isArrivalContent,
          sourceType: this.orderDetail.supportSource,
          status: val,
          remark: '...',
        })
        if (res.success) {
          this.isArrival = false
          this.$linkToEasy('/pagesGarage/RecoveryOrder/SendEvaluation?id=' + this.id)
        }
      },
      /**
       * 评价
       */
      async toEvaluate() {
        const res = await this.$VoHttp.apiOrderNoninductiveEvaluateQuestion({
          id: this.id,
        })
        if (res.success) {
          this.isArrivalContent = res.data
          this.isArrival = true
        }
      },
      switchName(val) {
        switch (val) {
          case 0:
            return '缸体号'
          case 1:
            return '进气端'
          case 2:
            return '排气端'
          case 3:
            return '正时端'
          case 4:
            return '曲后端'
          default:
            return
        }
      },

      editOrder() {
        this.$linkToEasy('/pagesGarage/RecoveryOrder/RecoveryOrderModify?id=' + this.id)
      },
      async reqDetail() {
        const res = await this.$VoHttp.apiOrderRecycleDetail({
          id: this.id,
        })
        if ((res.code = 20001)) {
          this.orderDetail = res.data
        }
      },
    },
    onLoad(options) {
      //orderStatus 0待查验 1待接单 2待指派 3待上门 4回收中 5已完成 6已关闭 7已取消
      //id
      const { id } = options
      //   this.orderStatus = Number(orderStatus)
      this.id = id
    },
  }
</script>

<style lang="scss" scoped>
  .details {
    width: 750rpx;
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    &-recycle {
      width: 100%;
      padding: 24rpx 32rpx;
      box-sizing: border-box;
    }
    &-head {
      width: 64rpx;
      height: 64rpx;
      border-radius: 50%;
    }
    &-title {
      border-bottom: 1rpx solid $v-bg-light;
    }
    &-reason {
      background-color: $v-bg-light;
      text-align: center;
      padding: 24rpx 32rpx 40rpx 32rpx;
      font-size: 28rpx;
      line-height: 150%;
      color: #f20014;
    }
    &-red {
      font-size: 28rpx;
      line-height: 150%;
      color: #ee0a24;
    }
    &-bottom {
      width: 100%;
      background-color: #ffffff;
      border-top: 2rpx solid $v-bg-light;
      &__sell {
        box-sizing: border-box;
        padding: 14rpx 32rpx;
        border: 2rpx solid rgba(0, 0, 0, 0.25);
        border-radius: 40rpx;
        color: $v-c0-85;
        font-size: 24rpx;
        line-height: 150%;
      }
      &__voucher {
        padding: 14rpx 32rpx;
        box-sizing: border-box;
        border: 2rpx solid #ff5319;
        border-radius: 40rpx;
        color: #ff5319;
        font-size: 24rpx;
        line-height: 150%;
      }
    }
  }
  .old_machine {
    &-green {
      color: #07c160;
    }
    &-red {
      color: #f20014;
    }
    &-image {
      display: flex;
      flex-wrap: wrap;

      > :nth-child(n) {
        width: 218rpx;
        height: 300rpx;

        > :nth-child(1) {
          width: 218rpx;
          height: 218rpx;
          overflow: hidden;
          border-radius: 8rpx;
        }

        > :nth-child(2) {
          text-align: center;
          color: rgba(0, 0, 0, 0.45);
        }
      }

      > :nth-child(1) {
        width: 460rpx;
        height: 520rpx;
        margin-right: 50rpx;

        > :nth-child(1) {
          width: 460rpx;
          height: 460rpx;
          overflow: hidden;
          border-radius: 8rpx;
        }
      }

      > :nth-child(3n) {
        margin: 0 16rpx;
      }
    }
  }
  .voucher-img {
    position: relative;
    width: 218rpx;
    height: 218rpx;
    border-radius: 8rpx;
    &__picture {
      width: 218rpx;
      height: 218rpx;
      border-radius: 8rpx;
      background-color: $v-bg-light;
    }
    &__icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .place-holder {
    background-color: #f7f7f8;
    height: 2rpx;
  }
  .recall-copy {
    color: #0d66ff;
  }
  .recovery-img {
    width: 218rpx;
    height: 218rpx;
    border-radius: 8rpx;
  }
  .recovery-git__img {
    width: 100%;
    height: 360rpx;
    border-radius: 8rpx;
  }
  .detail-video__paly {
    width: 120rpx;
    height: 120rpx;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
  }
  .video {
    width: 100%;
  }
  .flex_images {
    display: flex;
    flex-wrap: wrap;
    > :nth-child(3n-1) {
      margin: 0 16rpx;
    }
    > :nth-child(n) {
      margin-bottom: 20rpx;
    }
  }
  .order-img {
    width: 160rpx;
    height: 160rpx;
    border-radius: 8rpx;
  }
  .serve-img {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    &__outside {
      position: relative;
      width: 218rpx;
      height: 218rpx;
      .outside-size {
        width: 218rpx;
        height: 218rpx;
        border-radius: 8rpx;
        overflow: hidden;
        display: block;
      }
      .outside-play {
        position: absolute;
        top: 48rpx;
        left: 48rpx;
        z-index: 99;
        width: 120rpx;
        height: 120rpx;
        display: block;
      }
      margin: 16rpx 16rpx 0 0;
      &:nth-child(3n + 3) {
        margin-right: 0;
      }
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
  .image-218 {
    width: 218rpx;
    height: 218rpx;
    display: block;
  }
  .slot-content {
    font-size: 32rpx;
    line-height: 1.5;
    color: $v-c0-85;
  }
</style>
