<template>
  <view class="page_view flex flex-column">
    <!-- 1回收中，2待寄回，3.待收货 4.已完成,5.已取消 ,6.已关闭 -->
    <VoNav :title="navTitle" is-fixed is-have-more>
      <block slot="title">
        <view v-if="type === 1" class="flex flex-justify-c flex-vertical-c">
          <VoIcon :size="28" name="wait" />
          <view class="fz-32 fz-b detail-title m-l-8">回收中</view>
        </view>
        <view v-else-if="type === 2" class="flex flex-justify-c flex-vertical-c">
          <VoIcon :size="28" name="wait" />
          <view class="fz-32 fz-b color-block m-l-8">待寄回</view>
        </view>
        <view v-else-if="type === 3" class="flex flex-justify-c flex-vertical-c">
          <VoIcon :size="28" name="wait" />
          <view class="fz-32 fz-b color-block m-l-8">待收货</view>
        </view>
        <view v-else-if="type === 4" class="flex flex-justify-c flex-vertical-c">
          <VoIcon :size="28" name="success-circle" />
          <view class="fz-32 fz-b color-block m-l-8">已完成</view>
        </view>
        <view v-else-if="type === 5" class="flex flex-justify-c flex-vertical-c">
          <VoIcon :size="28" name="warning" />
          <view class="fz-32 fz-b color-block m-l-8">已取消</view>
        </view>
        <view v-else-if="type === 6" class="flex flex-justify-c flex-vertical-c">
          <VoIcon :size="28" name="warning" />
          <view class="fz-32 fz-b color-block m-l-8">已关闭</view>
        </view>
      </block>

    </VoNav>
    <view class="flex1 overflow-y">
      <view
        v-if="type === 5"
        class="bg text-center p-t-24 p-b-48 p-l-32 p-r-32 fz-28 lh150 color-block"
        >取消原因:{{ deatilInfo.cancelReason }}</view
      >
      <view
        v-if="type === 6"
        class="bg text-center p-t-24 p-b-48 p-l-32 p-r-32 fz-28 lh150 color-block"
        >关闭原因:{{ deatilInfo.cancelReason }}</view
      >

      <!--   地址信息start   -->
      <view v-if="type === 1" class="m-t-20 bg-white">
        <view class="repair_shop-con">
          <view class="fz-32 p-b-24 fz-b repaire_shop-title">修理厂信息</view>
          <view class="repair_shop-name">
            <text class="fz-28 fz-b">{{ repairShopData.name }}</text>
            <view v-if="type === 1" class="repair_shop-name-btn">
              <VoIcon :size="11" color="#155BD4" name="plane" />
              <view class="fz-24 p-l-10 repair_shop-name-btn-text">导航</view>
            </view>
          </view>
          <view class="repair_shop-address">
            {{ repairShopData.address }}
          </view>
        </view>
        <view v-if="type === 1" class="send_message">
          <view class="flex flex-row flex-justify-c flex1">
            <VoIcon name="phone-supplier" size="20" />
            <view class="fz-24 m-l-14 send_message-text">拨打电话</view>
          </view>
          <view class="send_message-line1" />
          <view class="flex flex-row flex-justify-c flex1">
            <VoIcon name="smile-s" size="20" />
            <view class="fz-24 m-l-14 send_message-text">发消息</view>
          </view>
        </view>
      </view>
      <view
        v-if="type === 5 || type === 6"
        class="m-t-20 bg-white"
      >
        <view class="repair_shop-con">
          <view class="fz-32 p-b-24 fz-b repaire_shop-title">修理厂信息</view>
          <view class="repair_shop-name">
            <text class="fz-28 fz-b">{{ repairShopData.name }}</text>
          </view>
          <view class="repair_shop-address">
            {{ repairShopData.address + repairShopData.addressDetail }}
          </view>
        </view>
      </view>
      <!--   地址信息end   -->
      <!--   寄回信息start   -->
      <view
        v-if="(type === 3 || type === 4) && deatilInfo.orderDeliveryVO"
        class="m-t-20 bg-white p-l-32 p-t-24 p-r-32 p-b-24"
      >
        <!-- class="flex flex-row flex-justify-between" -->
        <view>
          <view class="fz-b fz-32 color-block lh150">寄回信息</view>
          <!-- <view class="fz-32 lh150 look-logistics" @click="lookLogisticsInfo">查看物流信息 ></view> -->
        </view>

        <view class="line-view" />
        <view v-if="logisticsDetail.trackNum" class="flex flex-row m-t-24">
          <view class="fz-28 fz-b color-block lh150">物流单号:</view>
          <view class="fz-28 fz-b color-block lh150 m-l-8">{{ logisticsDetail.trackNum }}</view>
          <view
            class="fz-28 lh150 recall-copy m-l-24"
            @click="copyHandler(logisticsDetail.trackNum)"
            >复制</view
          >
        </view>
        <view v-if="logisticsDetail.logCompany" class="flex flex-row m-t-16">
          <view class="fz-28 color-block lh150">物流公司:</view>
          <view class="fz-28 color-block lh150 m-l-8">{{ logisticsDetail.logCompany }}</view>
        </view>
        <view v-if="logisticsDetail.logPhone" class="flex flex-row m-t-16">
          <view class="fz-28 color-block lh150">物流查询电话:</view>
          <view class="fz-28 color-block lh150 m-l-8">{{ logisticsDetail.logPhone }}</view>
        </view>
        <view class="flex flex-row m-t-16">
          <view class="fz-28 color-block lh150">发货方式:</view>
          <view class="fz-28 color-block lh150 m-l-8">{{
            deatilInfo.orderDeliveryVO.deliveryType
          }}</view>
        </view>
        <view
          v-if="deatilInfo.orderDeliveryVO && deatilInfo.orderDeliveryVO.createTime"
          class="flex flex-row m-t-16"
        >
          <view class="fz-28 color-block lh150">发货时间:</view>
          <view class="fz-28 color-block lh150 m-l-8">{{
            deatilInfo.orderDeliveryVO.createTime
          }}</view>
        </view>
        <view v-if="logisticsDetail.sendCerti" class="fz-28 color-block lh150 m-t-16"
          >发货凭证:</view
        >
        <view v-if="logisticsDetail.sendCerti" class="voucher-img m-t-16">
          <image
            :src="logisticsDetail.sendCerti"
            class="voucher-img__picture"
            @click="previewFn(logisticsDetail.sendCerti)"
          />
          <!--          <VoIcon :size="60" class="voucher-img__icon" color="#fff" name="play" />-->
        </view>
      </view>
      <!--   寄回信息end   -->
      <!--   验收情况start   -->
      <view
        v-if="deatilInfo.supportQualityVO && Object.keys(deatilInfo.supportQualityVO).length"
        class="m-t-20 bg-white p-l-32 p-t-24 p-r-32 p-b-24"
      >
        <view class="fz-b fz-32 color-block lh150">验收情况</view>
        <view class="line-view" />
        <view class="flex flex-row m-t-24">
          <view class="fz-28 color-block lh150">验收结果:</view>
          <view class="fz-28 color-block lh150 m-l-8">
            {{ deatilInfo.supportQualityVO.quality ? '合格' : '不合格' }}
          </view>
        </view>
        <view class="fz-28 color-block lh150 m-t-16">验收视频:</view>
        <view class="flex">
          <view
            v-for="(item, index) in videoList"
            :key="index"
            :class="{ isCenter: (index - 1) % 3 == 0 }"
            class="voucher-img m-t-16"
            @click="choseVideo(item)"
          >
            <image :src="item.poster" class="voucher-img__picture" />
            <image class="voucher-img__icon" src="/static/icons/play.png" />
          </view>
        </view>
        <view class="fz-28 color-block lh150 m-t-16" v-if="checkImgs && checkImgs.length"
          >验收图片:</view
        >
        <view class="flex flex-wrap" v-if="checkImgs && checkImgs.length">
          <view
            v-for="(item, index) in checkImgs"
            :key="index"
            :class="{ isCenter: (index - 1) % 3 == 0 }"
            class="voucher-img m-t-16"
            @click="choseImg(0, [item])"
          >
            <image :src="item" class="voucher-img__picture" />
          </view>
        </view>
      </view>
      <!--   验收情况end   -->
      <!--   服务评价start   -->
      <view
        v-if="(type === 2 || type === 3 || type === 4) && deatilInfo.orderServiceEvaluateVO"
        class="m-t-20 bg-white p-l-32 p-t-24 p-r-32 p-b-24"
      >
        <view class="fz-b fz-32 lh150 color-block">服务评价</view>
        <view class="line-view" />
        <view class="flex flex-row m-t-24">
          <view class="fz-28 lh150 color-block flex-shark-0 text-nowrap">星级:</view>
          <u-rate
            :value="deatilInfo.orderServiceEvaluateVO.starMark / 2"
            activeIcon="/static/created/evaluate/score_activate.png"
            class="m-l-4"
            gutter="12"
            inactiveIcon="/static/created/evaluate/score_not_active.png"
            readonly
          />
        </view>
        <view class="flex flex-row m-t-16">
          <view class="fz-28 lh150 color-block flex-shark-0 text-nowrap">评价内容:</view>
          <view class="fz-28 lh150 color-block m-l-4 flex1">{{ deatilInfo.orderServiceEvaluateVO.content.content }}</view>
        </view>
        <view class="fz-28 color-block lh150 m-t-16 flex-shark-0 text-nowrap">图片:</view>
        <view class="flex flex-wrap m-t-8">
          <view v-for="(item, index) in deatilInfo.orderServiceEvaluateVO.content.fileList" :key="`a${index}`" class="voucher-img m-t-16" :class="{ isCenter: (index - 1) % 3 == 0 }">
            <image v-if="item.type === 1" :src="item.src + '&type=1'" class="voucher-img__picture" @click="choseImg(0, [item.src])" />
            <view v-else-if="item.type === 2" @click="choseVideo(item)">
              <image :src="item.poster" class="voucher-img__picture" />
              <VoIcon :size="60" class="voucher-img__icon" color="#fff" name="play"/>
            </view>
          </view>
        </view>
      </view>
      <!--   服务评价end   -->
      <!--   服务信息start  -->
      <view class="m-t-20 bg-white">
        <view class="p-24">
          <view class="service-title p-b-24 fz-32 fz-b"> 服务信息 </view>
          <view class="service_msg">
            <view class="service_msg-product p-b-24 p-t-24">
              <view class="fz-24 color-white">{{ supportTypeObj[deatilInfo.supportType] }}</view>
              <view class="fz-28 fz-b p-l-16">{{ deatilInfo.supportName }}</view>
            </view>
            <view class="service_msg-price fz-28 m-b-16">
              <text>服务金额：</text>
              <text>
                <text class="fz-b">{{ deatilInfo.supportAmount }}</text>
                元
              </text>
            </view>
            <view class="service_msg-time fz-28 m-b-16">
              <text>上门时间：</text>
              <text>{{ deatilInfo.time }}</text>
            </view>
          </view>
        </view>
      </view>
      <!--   服务信息end  -->
      <!--   地址信息start   -->
      <view
        v-if="type === 2 || type === 3 || type === 4"
        class="m-t-20 bg-white"
      >
        <view class="repair_shop-con">
          <view class="fz-32 p-b-24 fz-b repaire_shop-title">修理厂信息</view>
          <view class="repair_shop-name">
            <text class="fz-28 fz-b">{{ repairShopData.name }}</text>
            <view v-if="type === 1" class="repair_shop-name-btn">
              <VoIcon :size="11" color="#155BD4" name="plane" />
              <view class="fz-24 p-l-10 repair_shop-name-btn-text">导航</view>
            </view>
          </view>
          <view class="repair_shop-address">
            {{ repairShopData.address + repairShopData.addressDetail }}
          </view>
        </view>
        <view v-if="type === 1" class="send_message">
          <view class="flex flex-row flex-justify-c flex1">
            <VoIcon name="phone-supplier" size="20" />
            <view class="fz-24 m-l-14 send_message-text">拨打电话</view>
          </view>
          <view class="send_message-line1" />
          <view class="flex flex-row flex-justify-c flex1">
            <VoIcon name="smile-s" size="20" />
            <view class="fz-24 m-l-14 send_message-text">发消息</view>
          </view>
        </view>
      </view>
      <!--   地址信息end   -->
      <view class="m-t-20 bg-white">
        <view class="p-32">
          <view>
            <view class="fz-32 fz-b p-b-24 title">
              {{ type === 1 ? '鉴定结果' : '商品信息' }}
            </view>
          </view>
          <view class="old_machine fz-28">
            <view class="m-t-24">
              <view v-if="engineMsg.pic" class="old_machine-image">
                <block v-for="(item, index) in images">
                  <block v-if="engineMsg.pic[index]">
                    <view
                      v-if="!index"
                      :key="index"
                      @click="choseImg(index, [engineMsg.pic[index]])"
                    >
                      <view>
                        <u--image
                          :key="index"
                          :src="engineMsg.pic[index]"
                          height="460rpx"
                          width="460rpx"
                        />
                      </view>
                      <view class="fz-28 m-t-16">{{ item.name }}</view>
                    </view>
                    <view
                      v-else-if="index != 0 && deatilInfo.supportSource == 1"
                      :key="index"
                      @click="choseImg(index, [engineMsg.pic[index]])"
                    >
                      <view>
                        <u--image
                          :key="index"
                          :src="engineMsg.pic[index]"
                          height="218rpx"
                          width="218rpx"
                        />
                      </view>
                      <view class="fz-28 m-t-16">{{ item.name }}</view>
                    </view>
                  </block>
                </block>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view v-if="deatilInfo.timeObj" class="m-t-20 bg-white p-t-24 p-b-24 p-l-32 p-r-32 m-b-60">
        <view class="fz-b fz-32 color-block lh150">订单信息</view>
        <view class="line-view" />
        <view class="flex flex-row flex-justify-between flex-vertical-c m-t-24">
          <view class="fz-28 color-block lh150">订单编号:</view>
          <view class="flex flex-row flex-vertical-c">
            <view class="fz-28 lh150 color-block-45">{{ deatilInfo.id }}</view>
            <view class="fz-28 lh150 recall-copy m-l-24" @click="copyHandler(deatilInfo.id)"
              >复制</view
            >
          </view>
        </view>
        <view
          v-if="deatilInfo.timeObj['下单时间']"
          class="flex flex-row flex-justify-between flex-vertical-c m-t-16"
        >
          <view class="fz-28 color-block lh150">下单时间:</view>
          <view class="fz-28 lh150 color-block-45">{{
            deatilInfo.timeObj['下单时间'].createTime
          }}</view>
        </view>
        <view
          v-if="deatilInfo.timeObj['接单时间']"
          class="flex flex-row flex-justify-between flex-vertical-c m-t-16"
        >
          <view class="fz-28 color-block lh150">接单时间:</view>
          <view class="fz-28 lh150 color-block-45">{{
            deatilInfo.timeObj['接单时间'].createTime
          }}</view>
        </view>
        <view v-if="type === 1" class="flex flex-row flex-justify-between flex-vertical-c m-t-16">
          <view class="fz-28 color-block lh150">到店时间:</view>
          <view class="fz-28 lh150 color-block-45">{{ deatilInfo.homeStartTime }}</view>
        </view>
        <view
          v-if="deatilInfo.timeObj['回收时间']"
          class="flex flex-row flex-justify-between flex-vertical-c m-t-16"
        >
          <view class="fz-28 color-block lh150">验收完成时间:</view>
          <view class="fz-28 lh150 color-block-45">{{
            deatilInfo.timeObj['回收时间'].createTime
          }}</view>
        </view>
        <view
          v-if="(type === 3 || type === 4) && deatilInfo.timeObj['发货时间']"
          class="flex flex-row flex-justify-between flex-vertical-c m-t-16"
        >
          <view class="fz-28 color-block lh150">发货时间:</view>
          <view class="fz-28 lh150 color-block-45">{{
            deatilInfo.timeObj['发货时间'].createTime
          }}</view>
        </view>
        <view
          v-if="type === 4 && deatilInfo.timeObj['收货时间']"
          class="flex flex-row flex-justify-between flex-vertical-c m-t-16"
        >
          <view class="fz-28 color-block lh150">收货时间:</view>
          <view class="fz-28 lh150 color-block-45">
            {{ deatilInfo.timeObj['收货时间'].createTime }}
          </view>
        </view>
        <view
          v-if="type === 5 && deatilInfo.timeObj['取消时间']"
          class="flex flex-row flex-justify-between flex-vertical-c m-t-16"
        >
          <view class="fz-28 color-block lh150">取消时间:</view>
          <view class="fz-28 lh150 color-block-45">{{
            deatilInfo.timeObj['取消时间'].createTime
          }}</view>
        </view>
        <view
          v-if="type === 6 && deatilInfo.timeObj['关闭时间']"
          class="flex flex-row flex-justify-between flex-vertical-c m-t-16"
        >
          <view class="fz-28 color-block lh150">关闭时间:</view>
          <view class="fz-28 lh150 color-block-45">
            {{ deatilInfo.timeObj['关闭时间'].createTime }}</view
          >
        </view>
      </view>
    </view>
    <view
      v-if="type === 1 || type === 2 || type === 3 || type === 4"
      class="setting-bottom p-b-safe-area flex flex-justify-r"
    >
      <view class="flex flex-row flex-justify-r"
        ><view v-if="type === 1" class="setting-bottom__sell m-b-24 m-t-24 m-r-32"
          >联系平台售后</view
        >
        <view v-if="type === 1" class="setting-bottom__voucher m-b-24 m-t-24 m-r-32"
          >提交安装凭证</view
        ></view
      >
      <!--      <view-->
      <!--        v-if="type === 2"-->
      <!--        class="setting-bottom__voucher m-b-24 m-t-24 m-r-32"-->
      <!--        @click="upLoadLogisticsInfo"-->
      <!--      >-->
      <!--        上传物流信息-->
      <!--      </view>-->
      <view
        v-if="type === 2"
        class="setting-bottom__voucher m-b-24 m-t-24 m-r-32"
        @click="toIpLoadLogistics"
      >
        上传物流信息
      </view>
      <!-- <view
        v-if="type === 3 || type === 4"
        class="setting-bottom__voucher m-b-24 m-t-24 m-r-32"
        @click="
          $linkToEasy(`/pagesRecovery/SellOrder/ReceiveAddress/LogisticsInfo?id=${optionsId}`)
        "
      >
        查看物流信息
      </view> -->
    </view>
    <OrderGrabbingModel :dialog="modelDialog" @close="handleCloseModel" />
<!--    <u-overlay :opacity="1" :show="showVideo" @click="showVideo = false">-->
<!--      <view class="videoWarp" @tap.stop>-->
<!--        <video id="video" ref="video" :poster="poster" :src="videoSrc" class="video"></video>-->
<!--      </view>-->
<!--    </u-overlay>-->
    <EraPreviewVideo ref="previewVideo" :videoSrc="videoSrc" :poster="poster" autoplay />
  </view>
</template>

<script>
  import ServiceMessage from '../components/ServiceMessage.vue'
  import OrderGrabbingModel from '../components/OrderGrabbingModel/OrderGrabbingModel.vue'

  export default {
    name: 'RecallOrderDetails',
    components: {
      ServiceMessage,
      OrderGrabbingModel,
    },
    data() {
      return {
        type: 1, //1回收中 2待寄回 3已发送 4已完成 5已取消 6已关闭
        optionsId: '',
        videoSrc: '', // 视频链接
        showVideo: false, // 是否展示视频
        poster: '/static/demo/IMG_3839.JPG', // 视频海报
        voucherImgs1: 'https://cdn.uviewui.com/uview/album/1.jpg',
        voucherImgs2: 'https://cdn.uviewui.com/uview/album/1.jpg',
        voucherImgs3: 'https://cdn.uviewui.com/uview/album/1.jpg',

        deliverImg: 'https://cdn.uviewui.com/uview/album/1.jpg',
        navTitle: '回收中',
        closeReason: '安装未完成，平台已指派其他集师傅处理',

        placeOrderTime: '2022-06-12  08:30:22',
        receivingOrderTime: '2022-06-12  08:30:22',
        toStoreTime: '2022-06-12  08:30:22',
        acceptanceTime: '2022-06-12  08:30:22',
        deliverTime: '2022-06-12  08:30:22',
        receivingTime: '2022-06-12  08:30:22',
        cancelTime: '2022-06-12  08:30:22',
        closeTime: '2022-06-12  08:30:22',
        voucher: '合格',
        logisticsNum: 'D232123333213',
        logisticsPhone: '12345678901',
        logisticsStatus: '物流配送',
        logisticsTime: '2022-06-13 12:25:20',
        modelDialog: false,
        guideDesc: '需检查上传发动机正时端/水泵照片',
        problemDesc: '发动机漏水，打不着火了',
        images: [
          {
            type: 'img',
            name: '发动机识别号',
            url: '',
            value: 'pic1',
          },
          {
            type: 'img',
            name: '进气端',
            url: '',
            value: 'pic2',
          },
          {
            type: 'video',
            name: '排气端',
            url: '',
            value: 'pic3',
          },
          {
            type: 'img',
            name: '正时端',
            url: '',
            value: 'pic4',
          },
          {
            type: 'video',
            name: '曲后端',
            url: '',
            value: 'pic5',
          },
        ],
        circleVideoAndText: {
          tagList: ['#离合器', '#汽修大咖', '#发动机'],
          photoList: [],
          userIcon: '/static/circle/circle_user_icon.png',
          vipIcon: '',
          isVip: false,
          name: '李思思',
          time: '2022年05月10日11:09:17',
          favourNum: '222',
          isAttention: true,
          endEditTime: '2022年05月10日17:11:35',
          poster: 'https://cdn.uviewui.com/uview/album/2.jpg',
          videoUrl: '/static/video/video1.mp4',
          titleTag: '[共创项目：三离合变速器]',
          content:
            '库存乱，有没有合适的方法扩大库存？或者哪位老铁有空置的厂房可对外出租的，可以长期合作，有意的都可以回复，有钱大家一起赚~库存乱，有没有合适的方法扩大库存？',
        },
        deatilInfo: '',
        supportTypeObj: { 31: '售后', 32: '安装', 33: '回收' },
        repairShopData: {
          name: '',
          address: '',
          addressDetail: '',
        },
        engineMsg: '', //旧机信息
        acceptanceImg: '', //视频封面
        // 验收视频
        videoList: [],
        checkImgs: [],
        logisticsDetail: '', //物流信息
      }
    },
    methods: {
      previewFn(url) {
        uni.previewImage({
          urls: [url],
          current: 0,
        })
      },
      getDetail() {
        // 获取订单详情
        this.$VoHttp
          .apiOrderRecycleOrderDetail$Id({ id: this.optionsId })
          .then((res) => {
            if (res.data) {
              let data = res.data

              //组装时间段
              if (data.homeStartTime && data.homeEndTime) {
                data.time =
                  this.$vocenApi.VoUtils.timeFormat(data.homeStartTime, 'yyyy-mm-dd hh:MM') +
                  '-' +
                  this.$vocenApi.VoUtils.timeFormat(data.homeEndTime, 'hh:MM')
              }
              //组装各种时间
              data.timeObj = {}
              data.timeList.map((item) => {
                data.timeObj[item.timeName] = item
              })
              console.log(data.timeObj)

              this.deatilInfo = data
              let info = JSON.parse(data.addressDetail)
              this.repairShopData = {
                name: data.garageInfo.storeName,
                address: info.address,
                addressDetail: info.addressDetail,
                latitude: data.garageInfo.latitude, //纬度
                longitude: data.garageInfo.longitude, //经度
              }
              // 旧机信息
              if (data.engineMsg) {
                let engineMsg = JSON.parse(data.engineMsg)
                this.engineMsg = engineMsg
                console.log('旧机信息', this.engineMsg)
              }
              // 服务评价
              if (data.orderServiceEvaluateVO && data.orderServiceEvaluateVO.content) {
                this.deatilInfo.orderServiceEvaluateVO.content = JSON.parse(data.orderServiceEvaluateVO.content)
                console.log('服务评价', this.deatilInfo.orderServiceEvaluateVO)
              }

              //验收视频
              if (data.supportQualityVO) {
                let mediaData = JSON.parse(data.supportQualityVO.checkMsg)
                this.videoList = mediaData.video
                this.checkImgs = mediaData.pic
              }
              //寄回信息
              if (data.orderDeliveryVO && data.orderDeliveryVO.logisticsDetail) {
                this.logisticsDetail = JSON.parse(data.orderDeliveryVO.logisticsDetail)
                console.log('寄回信息', this.logisticsDetail)
              }
            }
          })
          .catch((err) => {
            this.$u.toast(err.message || '获取信息失败')
          })
      },
      /**
       * 跳转上传物流页面
       */
      toIpLoadLogistics() {
        this.$linkToEasy(`/pagesEngineer/LogisticsInfo/UpLoadLogistics?id=${this.optionsId}`)
      },
      /**
       * 预览图片
       */
      choseImg(index, img) {
        console.log('img:' + img)
        uni.previewImage({
          current: index,
          urls: img,
        })
      },
      /**
       * 预览视频
       */
      choseVideo(data) {
        console.log('choseVideo', data)
        this.videoSrc = data.src
        this.poster = data.poster
        // this.showVideo = true
        this.$refs.previewVideo.show(data.src)
      },
      upLoadLogisticsInfo() {
        this.$linkToEasy('/pagesEngineer/RecallOrder/SubmitVoucher')
      },
      lookLogisticsInfo() {
        console.log('lookLogisticsInfo')
      },
      handleGetOrder() {
        this.modelDialog = true
      },
      handleCloseModel(val) {
        this.modelDialog = val
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
    },
    onLoad(option) {
      console.log(option)
      const { type, id } = option
      this.type = Number(type)
      this.optionsId = id
      this.getDetail()
    },
  }
</script>

<style lang="scss" scoped>
  .page_view {
    width: 750rpx;
    height: 100vh;

    .setting-bottom {
      width: 100%;
      background-color: #ffffff;
      &__sell {
        box-sizing: border-box;
        padding: 22rpx 32rpx;
        border: 2rpx solid rgba(0, 0, 0, 0.25);
        border-radius: 40rpx;
        color: $v-c0-85;
        font-size: 24rpx;
        line-height: 150%;
      }
      &__voucher {
        box-sizing: border-box;
        padding: 22rpx 32rpx;
        border: 2rpx solid #ff5319;
        border-radius: 40rpx;
        color: #ff5319;
        font-size: 24rpx;
        line-height: 150%;
      }
      &__quit {
        margin: 20rpx 47rpx;
        height: 92rpx;
        line-height: 92rpx;
        text-align: center;
        background-color: $color-primary-yellow;
        color: #ffffff;
        font-size: 32rpx;
        border-radius: 48rpx;
      }
    }
  }

  .repair_shop-con {
    padding: 24rpx;
    border-bottom: 1rpx solid $v-bg-light;

    .repaire_shop-title {
      border-bottom: 1rpx solid $v-bg-light;
    }

    .repair_shop-name {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24rpx 0;

      .repair_shop-name-btn {
        display: flex;
        width: 144rpx;
        height: 56rpx;
        box-sizing: border-box;
        border-radius: 200rpx;
        justify-content: center;
        align-items: center;
        border: 1rpx solid #155bd4;

        &-text {
          color: #155bd4;
        }
      }
    }

    .repair_shop-address {
      font-size: 28rpx;
    }
  }

  .send_message {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 26rpx 0;
    &-line1 {
      height: 36rpx;
      width: 2rpx;
      background-color: #f7f7f8;
    }
    &-line2 {
      height: 2rpx;
      background-color: #f7f7f8;
    }
    &-text {
      color: rgba(0, 0, 0, 0.65);
    }
  }
  .service-title {
    border-bottom: 1rpx solid $v-bg-light;
  }

  .service_msg {
    &-product {
      display: flex;

      > :nth-child(1) {
        width: 80rpx;
        height: 36rpx;
        text-align: center;
        line-height: 36rpx;
        border-radius: 8rpx;
        box-sizing: border-box;
        background-color: rgba(0, 178, 89, 1);
        margin-bottom: 24rpx;
      }
    }

    &-price {
      > :nth-child(1) {
        color: rgba(0, 0, 0, 0.85);
      }

      > :nth-child(2) {
        color: rgba(238, 10, 36, 1);
      }
    }

    &-guide {
      display: flex;

      > :nth-child(1) {
        flex-shrink: 0;
      }
    }
  }
  .line-view {
    width: 100%;
    height: 2rpx;
    background-color: #f7f7f8;
    margin-top: 24rpx;
  }
  .recall-copy {
    color: #0d66ff;
  }
  .title {
    border-bottom: 1rpx solid $v-bg-light;
  }

  .old_machine-con {
    margin-bottom: 180rpx;
  }

  .old_machine {
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
        margin-bottom: 24rpx;

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
    // width: 218rpx;
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
      width: 120rpx;
      height: 120rpx;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .look-logistics {
    color: #ff5319;
  }
  .drag-content {
    position: absolute;
    width: 100%;
    left: 0;
    padding: 16rpx;
    box-sizing: border-box;
    &-box {
      background: #fff;
      padding: 0 24rpx;
      box-shadow: 4rpx 8rpx 32rpx rgba(170, 182, 200, 0.25);
      border-radius: 16rpx;
      max-height: 560rpx;
      overflow-y: scroll;
    }
    &-item {
      padding: 24rpx 0;
      border-bottom: 2rpx solid #f7f7f8;
    }
    .word-sign {
      font-size: 24rpx;
      padding: 4rpx 16rpx;
      border-radius: 8rpx;
      background: linear-gradient(96.72deg, #f20014 -13.61%, #fa6419 104.67%);
      color: #fff;
      &.green {
        background: linear-gradient(96.72deg, #00b259 -13.61%, #29d446 104.67%);
      }
      &.yellow {
        background: linear-gradient(96.72deg, #ff9b05 -13.61%, #ffbe0d 104.67%);
      }
    }
    .cell {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 28rpx;
      font-weight: 500;
      margin-top: 20rpx;
      &-box {
        display: flex;
        align-items: center;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.45);
      }
    }
    .image-box {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      font-size: 28rpx;
      color: rgba(0, 0, 0, 0.45);
      text-align: center;
      &-item {
        margin-top: 24rpx;
      }
      .img-item {
        left: 0;
        top: 0;
        width: 216rpx;
        height: 216rpx;
      }
      .m-t-16 {
        margin-top: 16rpx;
      }
      .video-box {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        .img-item {
          position: absolute;
          left: 0;
          top: 0;
        }
        .play {
          width: 120rpx;
          height: 120rpx;
          z-index: 1;
        }
      }
    }
    .big-img {
      display: block;
      width: 440rpx;
      .img-item {
        width: 440rpx;
        height: 440rpx;
      }
    }
  }
  .videoWarp {
    position: absolute;
    left: 0;
    top: 450rpx;
    width: 100vw;
    .video {
      width: 100vw;
    }
  }
  .isCenter {
    margin: 16rpx 16rpx 0 16rpx;
  }
</style>
