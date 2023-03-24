<template>
  <!--  <view class="wrap" :style="{ overflow: bottom === 0 ? 'hidden' : 'auto' }">-->
  <view v-if="showMap" :style="{ overflow: 'hidden' }" class="wrap">
    <VoNav is-fixed is-have-more>
      <view slot="title">
        <view class="flex flex-vertical-c flex-justify-c">
          <VoIcon v-if="!hideIcon" :size="28" name="clock-new" />
          <view class="m-l-8">{{ title }}</view>
        </view>
      </view>
    </VoNav>
    <view v-if="showNoEngineerTip" class="noEngineerTip" @click="showNoEngineerTip = false">
      <image class="warringPng" src="/static/common/map/warring.png" />
      <text class="flex1">当前无法获取到集师傅所在位置</text>
      <image class="closePng" src="/static/common/map/close.png" />
    </view>
    <map
      :latitude="options.latitude"
      :longitude="options.longitude"
      :markers="options.marker"
      class="wrap-map"
      @markertap="clickMarker"
    >
    </map>
    <view
      id="drag_card"
      :class="isAnimate ? 'transition' : ''"
      :style="'bottom:' + bottom + 'px;'"
      class="card"
      @touchend="cardMoveEndFn"
      @touchstart="cardMoveStartFn"
      @touchmove.stop.prevent="cardMoveFn"
    >
      <view class="card-content">
        <block v-if="origin === 4 || origin === 5 || origin === 6">
          <view class="flex flex-vertical-c flex-justify-between">
            <view class="flex flex1 flex-vertical-c">
              <image
                :src="cardInfo.photoUrl || '/static/default_avatar.png'"
                class="photo m-r-16"
              />
              <view>
                <view class="color-block fz-b fz-28">集师傅：{{ cardInfo.storeName }}</view>
                <view class="color-block-45 fz-24">好评率：{{ cardInfo.favorableComment }}</view>
              </view>
            </view>
          </view>
          <view
            v-if="info.orderStatus === 3240 && info.homeEndTime <= nowDate"
            class="fz-28 color-block-65 m-t-24 overTwoEllipsis"
            style="color: #f20014"
          >
            集师傅未按约定时间到店，可联系师傅继续等待或免费取消订单
          </view>
          <view class="fun-btn-bar m-t-24 flex text-center fz-24 color-block-65">
            <view
              class="fun-btn-bar-item border-r flex1 flex flex-vertical-c flex-justify-c"
              @click="callPhone"
            >
              <VoIcon :size="20" class="m-r-4" color="#595959" name="mobile-new" />
              <text class="fz-28 lh150 color-block-65">拨打电话</text>
            </view>
            <block v-if="+info.supportType === 31">
              <view
                v-if="info.buyerId > 0"
                class="fun-btn-bar-item flex1 flex flex-vertical-c flex-justify-c"
                @click="goImUrl"
              >
                <VoIcon :size="20" class="m-r-4" color="#595959" name="smile-m" />
                <text class="fz-28 lh150 color-block-65">发消息</text>
              </view>
            </block>
            <block v-else>
              <view
                class="fun-btn-bar-item flex1 flex flex-vertical-c flex-justify-c"
                @click="goImUrl"
              >
                <VoIcon :size="20" class="m-r-4" color="#595959" name="smile-m" />
                <text class="fz-28 lh150 color-block-65">发消息</text>
              </view>
            </block>
          </view>
        </block>
        <block v-else-if="origin === 7">
          <view class="flex flex-vertical-c flex-justify-between">
            <view class="flex flex-vertical-c">
              <image
                :src="cardInfo.photoUrl || '/static/default_avatar.png'"
                class="photo m-r-16"
              />
              <view>
                <view class="color-block fz-b fz-28">集师傅：{{ cardInfo.storeName }}</view>
                <view class="color-block-45 fz-24">好评率{{ cardInfo.favorableComment }}</view>
              </view>
            </view>
            <view>
              <VoIcon :size="18" color="#373A4E" name="mobile-new" @click="callPhone" />
              <VoIcon :size="18" class="m-l-42" color="#373A4E" name="smile-m" @click="goImUrl" />
            </view>
          </view>
        </block>
        <block v-else>
          <view class="card-title flex flex-vertical-c flex-justify-between m-b-16">
            <view class="fz-32 fz-b">{{ cardInfo.storeName }}</view>
            <view class="icon-map flex flex-vertical-c fz-24" @click="openGPSApp">
              <VoIcon :size="10" class="m-r-6 m-t-2" color="#0D66FF" name="plane" />
              <text>导航</text>
            </view>
          </view>
          <view class="fz-24 color-block-65 overTwoEllipsis">{{ cardInfo.address }}</view>
          <view class="fun-btn-bar m-t-24 flex text-center fz-24 color-block-65">
            <view
              class="fun-btn-bar-item border-r flex1 flex flex-vertical-c flex-justify-c"
              @click="callPhone"
            >
              <VoIcon :size="20" class="m-r-4" color="#595959" name="mobile-new" />
              <text class="fz-28 lh150 color-block-65">拨打电话</text>
            </view>
            <block v-if="+info.supportType === 31">
              <view
                v-if="info.buyerId > 0"
                class="fun-btn-bar-item flex1 flex flex-vertical-c flex-justify-c"
                @click="goImUrl"
              >
                <VoIcon :size="20" class="m-r-4" color="#595959" name="smile-m" />
                <text class="fz-28 lh150 color-block-65">发消息</text>
              </view>
            </block>
            <block v-else>
              <view
                class="fun-btn-bar-item flex1 flex flex-vertical-c flex-justify-c"
                @click="goImUrl"
              >
                <VoIcon :size="20" class="m-r-4" color="#595959" name="smile-m" />
                <text class="fz-28 lh150 color-block-65">发消息</text>
              </view>
            </block>
          </view>
        </block>
      </view>
    </view>

    <view
      id="drag_content"
      :class="isAnimate ? 'transition' : ''"
      :style="{
        top: dragContentParam.top + 'px',
        opacity: bottom / 150,
      }"
      class="drag-content"
    >
      <!--    <view-->
      <!--      id="drag_content"-->
      <!--      :class="isAnimate ? 'transition' : ''"-->
      <!--      :style="{-->
      <!--        bottom: bottom - fixedTitleParams.titleH + 'px',-->
      <!--        opacity: bottom / 150,-->
      <!--      }"-->
      <!--      class="drag-content"-->
      <!--    >-->
      <view :style="{ height: dragContentParam.height + 'px' }" class="drag-content-box">
        <!-- 服务项目 -->
        <view v-if="contentInfo.serviceInfo.type" class="drag-content-item">
          <view class="fz-b color-block fz-32 m-b-24">服务项目</view>
          <view class="flex flex-vertical-c">
            <block v-if="origin <= 3">
              <text v-if="contentInfo.serviceInfo.type === 1" class="word-sign m-r-18 fz-24">
                安装
              </text>
              <text
                v-else-if="contentInfo.serviceInfo.type === 2"
                class="word-sign green m-r-18 fz-24"
              >
                回收
              </text>
              <text
                v-else-if="contentInfo.serviceInfo.type === 3"
                class="word-sign yellow m-r-18 fz-24"
              >
                售后
              </text>
            </block>
            <text class="fz-28 fz-b color-block">
              {{ contentInfo.serviceInfo.name }}
            </text>
          </view>
          <view class="cell">
            <text>服务金额：</text>
            <view class="cell-box">
              <text style="color: #f20014">{{ contentInfo.serviceInfo.price }}元</text>
            </view>
          </view>
          <view v-if="contentInfo.serviceInfo.time" class="cell">
            <text>上门时间：</text>
            <view class="cell-box">
              <text>{{ contentInfo.serviceInfo.time }}</text>
              <text class="m-l-16 color-block-yellow" @click="editTime">修改</text>
            </view>
          </view>
          <view v-if="contentInfo.serviceInfo.tips" class="cell">
            <text>上门指导：</text>
            <view class="cell-box">
              <text>{{ contentInfo.serviceInfo.tips }}</text>
            </view>
          </view>
          <view v-if="contentInfo.serviceInfo.address" class="cell">
            <text>{{ info.supportType === 33 ? '回收地址' : '安装地址：' }}</text>
            <view class="cell-box flex1">
              <text class="text-right">{{ contentInfo.serviceInfo.address }}</text>
            </view>
          </view>
        </view>

        <!-- 旧机信息 -->
        <view v-if="contentInfo.oldInfo && contentInfo.oldInfo.length" class="drag-content-item">
          <view class="fz-b color-block fz-32 m-b-24">旧机信息</view>
          <view class="flex fz-b color-block fz-28 flex-vertical-c flex-justify-between">
            <text>发动机识别号：</text>
            <view class="cell-box">
              <text class="text-right">{{
                contentInfo.engineId ? contentInfo.engineId : '暂无'
              }}</text>
            </view>
          </view>
          <view
            v-if="contentInfo.oldInfo[0]"
            class="big-img image-box"
            @click="choseImg(contentInfo.oldInfo[0])"
          >
            <image :src="contentInfo.oldInfo[0]" class="img-item" />
            <text>发动机识别号</text>
          </view>
          <view class="image-box">
            <view
              v-if="contentInfo.oldInfo[1]"
              class="image-box-item"
              @click="choseImg(contentInfo.oldInfo[1])"
            >
              <image :src="contentInfo.oldInfo[1]" class="img-item" />
              <text>进气端</text>
            </view>
            <view
              v-if="contentInfo.oldInfo[2]"
              class="image-box-item"
              @click="choseImg(contentInfo.oldInfo[2])"
            >
              <image :src="contentInfo.oldInfo[2]" class="img-item" />
              <text>排气端</text>
            </view>
            <view
              v-if="contentInfo.oldInfo[3]"
              class="image-box-item"
              @click="choseImg(contentInfo.oldInfo[3])"
            >
              <image :src="contentInfo.oldInfo[3]" class="img-item" />
              <text>正时端</text>
            </view>
            <view
              v-if="contentInfo.oldInfo[4]"
              class="image-box-item"
              @click="choseImg(contentInfo.oldInfo[4])"
            >
              <image :src="contentInfo.oldInfo[4]" class="img-item" />
              <text>曲后端</text>
            </view>
          </view>
        </view>

        <!-- 故障信息 -->
        <view
          v-if="contentInfo.brokenInfo && contentInfo.brokenInfo.picList.length"
          class="drag-content-item"
        >
          <view class="fz-b color-block fz-32 m-b-24">故障信息</view>
          <view v-if="contentInfo.brokenInfo.descVioce.audio" class="fz-14 color-block">
            <view>故障描述：</view>
            <VoAudioVoice :info="contentInfo.brokenInfo.descVioce" />
          </view>
          <view v-else class="fz-14 color-block">
            <view>故障描述：</view>
            <view>{{ contentInfo.brokenInfo.desc }}</view>
          </view>
          <view>
            <view class="fz-14 color-block">故障图片：</view>
            <view class="image-box">
              <view
                v-for="(item, index) in contentInfo.brokenInfo.picList"
                :key="index + '1'"
                class="image-box-item m-t-16"
                @click="choseImg(item)"
              >
                <image :src="item" class="img-item" />
              </view>
              <view
                v-for="(item, index) in contentInfo.brokenInfo.videoList"
                :key="index + '2'"
                class="image-box-item m-t-16 video-box"
                @click="choseVideo(item)"
              >
                <image class="play" src="/static/common/play.png" />
                <image :src="item.poster" class="img-item" />
              </view>
            </view>
          </view>
        </view>

        <!-- 购机订单 -->
        <view v-if="contentInfo.buyInfo && info.supportSource === 2" class="drag-content-item">
          <view
            class="fz-b color-block fz-32 m-b-24 flex flex-justify-between"
            @click.stop="
              goToUrl(
                `/pagesGarage/InstallOrder/OrderDetail/OrderDetail?id=${info.relationOrderId}`,
              )
            "
          >
            <text>购机订单</text>
            <VoIcon :opacity="0.45" :size="16" color="#000000" name="right-arrow" />
          </view>
          <view class="flex flex-vertical-c">
            <image
              :src="contentInfo.buyInfo.pic"
              class="b-radius-8 m-r-16"
              style="width: 160rpx; height: 160rpx"
            />
            <view class="flex1">
              <view class="color-block overTwoEllipsis fz-32 fz-b">
                <text v-show="contentInfo.buyInfo.categoryType" class="good-tips m-r-8">{{
                  contentInfo.buyInfo.categoryType
                }}</text
                >{{ contentInfo.buyInfo.goodsName }}
              </view>
              <view class="color-block-45 fz-28">
                发动机识别码：{{ contentInfo.buyInfo.code ? contentInfo.buyInfo.code : '暂无' }}
              </view>
            </view>
          </view>
        </view>
        <!-- 订单信息 -->
        <view v-if="contentInfo.orderInfo.orderNo" class="drag-content-item">
          <view class="fz-32 fz-b color-block lh150">订单信息</view>
          <view class="cell">
            <text>订单编号：</text>
            <view class="cell-box">
              <text>{{ contentInfo.orderInfo.orderNo }}</text>
              <text
                class="m-l-16"
                style="color: #0d66ff"
                @click="copyThis(contentInfo.orderInfo.orderNo)"
              >
                复制
              </text>
            </view>
          </view>
          <view class="cell">
            <text>下单时间：</text>
            <view class="cell-box">
              <text>{{ contentInfo.orderInfo.createTime }}</text>
            </view>
          </view>
          <view class="cell">
            <text>接单时间：</text>
            <view class="cell-box">
              <text>{{ contentInfo.orderInfo.uodateTime }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view id="footer" class="footer">
      <block v-if="origin === 1">
        <view class="footer-btn-bar">
          <view class="footer-btn m-r-32" @click="refuseOrder(1, 32)">取消接单</view>
          <view
            v-if="!info.supportQuality"
            class="footer-btn fz-28 m-r-32 act"
            @click="goToUrl(`/pagesEngineer/InstallOrder/SubmitInstall?id=${info.id}`)"
            >提交安装凭证
          </view>
          <view class="footer-btn fz-28 act" @click="orderBegin">开始安装</view>
        </view>
      </block>
      <block v-else-if="origin === 2">
        <view class="footer-btn-bar">
          <view class="footer-btn m-r-32" @click="refuseOrder(1, 33)">取消接单</view>
          <view
            v-if="!info.supportQualityVO"
            class="footer-btn fz-28 act"
            @click="
              goToUrl(
                `/pagesEngineer/RecallOrder/SubmitVoucher?id=${info.id}&source=${info.supportSource}`,
              )
            "
            >提交验收凭证
          </view>
        </view>
      </block>
      <block v-else-if="origin === 3">
        <view class="footer-btn-bar">
          <view class="footer-btn m-r-32" @click="refuseOrder(1, 31)">取消接单</view>
          <view
            class="footer-btn fz-28 act"
            @click="goToUrl(`/pagesEngineer/AfterSalesOrder/SubmitAcceptanceCertificate?id=${id}`)"
            >提交上门结果</view
          >
        </view>
      </block>
      <block v-else-if="origin === 4">
        <block v-if="info.homeEndTime < nowDate">
          <view v-if="info.isWaiting" class="footer-btn-bar">
            <view class="footer-btn m-r-32" @click="garageCancelOrder">取消订单</view>
            <view class="footer-btn" @click="toConcat">联系客服</view>
          </view>
          <view v-else class="footer-btn-bar">
            <view class="footer-btn m-r-32" @click="complateWait">继续等待</view>
            <view class="footer-btn" @click="showModal = true">不等待</view>
          </view>
        </block>
        <view v-else class="footer-btn-bar">
          <view class="footer-btn m-r-32" @click="garageCancelOrder">取消订单</view>
          <view class="footer-btn" @click="toConcat">联系客服</view>
        </view>
      </block>
      <block v-else-if="origin === 5">
        <block v-if="info.homeEndTime < nowDate">
          <view v-if="info.isWaiting" class="footer-btn-bar">
            <view class="footer-btn m-r-32" @click="toConcat">联系客服</view>
            <view class="footer-btn fz-28 act" @click="garageCancelOrder">取消订单</view>
          </view>
          <view v-else class="footer-btn-bar">
            <view class="footer-btn m-r-32" @click="toContinue">继续等待</view>
            <view class="footer-btn" @click="showModal = true">不等待</view>
          </view>
        </block>
        <view v-else class="footer-btn-bar">
          <view class="footer-btn m-r-32" @click="toConcat">联系客服</view>
          <view class="footer-btn fz-28 act" @click="garageCancelOrder">取消订单</view>
        </view>
      </block>
      <view class="safearea-box" />
    </view>
    <EraPreviewVideo ref="EraPreviewVideo" :poster="poster" :videoSrc="videoSrc" />
    <u-modal
      v-if="showModal"
      :content="'是否需要指派其他集师傅继续安装服务？'"
      :show="showModal"
      cancelText
      confirmText
      @cancel="waitCancel"
      @confirm="confirmWait"
    />
    <u-modal
      :show="showModalCancel"
      :showCancelButton="true"
      cancelText="我再想想"
      confirmText="取消订单"
      content="该安装订单为随新机购买生成的订单，如要取消，则将同步取消关联的购买订单"
      @cancel="showModalCancel = false"
      @confirm="cancelOrder"
    />
    <u-modal
      :show="showModalTip"
      :showCancelButton="false"
      confirmText="我知道了"
      content="该安装订单为随新机购买生成的订单，当前关联的购买订单已经发货，无法取消订单"
      @confirm="showModalTip = false"
    />
  </view>
</template>

<script>
  import util from '@/common/MapCoordinate'
  import {goOnlineCustomerFn, hideLoading, openGpsAppFn, showLoading} from '@/common/helper'
  import permission from '@/common/permission'

  export default {
    name: 'MapDrag',
    components: {},

    data() {
      return {
        showNoEngineerTip: false,
        showMap: false,
        // 不等待弹窗
        showModal: false,
        showModalCancel: false,
        showModalTip: false,
        nowDate: this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd hh:MM:ss'),
        cancelData: '',
        title: '',
        hideIcon: false, // 是否隐藏title的icon
        origin: 1, // 来源 安装订单；回收订单；售后订单；修理厂端安装订单；修理厂端回收订单；修理厂活动轨迹 旧机买家活动轨迹
        id: 1,
        optionsId: '',
        sys: {}, //系统参数
        bottom: 0, // 定位参数
        dragCardParams: {
          // 可拖拽卡片区域参数
          offsetHeight: 0,
          height: 0,
        },
        dragContentParam: {
          // 拖拽展示内容参数
          top: 0,
          start: 0,
          height: 0,
          offsetHeight: 0,
        },
        fixedTitleParams: {
          // 底部按钮区域参数
          titleH: 45,
        },
        repairMarker: {
          state: 1,
          id: 0,
          latitude: null, //纬度  23.13065
          longitude: null, //经度  113.3274
          iconPath: '/static/common/map/marker-blue.png', //显示的图标
          rotate: 0, // 旋转度数
          width: 20, //宽
          height: 20, //高
          alpha: 1, //透明度
          callout: {
            //自定义标记点上方的气泡窗口 点击有效
            content: '', //文本
            color: '#FF5319', //文字颜色
            fontSize: 14, //文本大小
            borderRadius: 15, //边框圆角
            borderWidth: '10',
            // bgColor: '', //背景颜色
            display: 'ALWAYS', //常显
          },
        },
        skillMarker: {
          id: 1234597,
          latitude: null, //纬度
          longitude: null, //经度
          iconPath: '/static/common/map/marker-orange.png', //显示的图标
          rotate: 0, // 旋转度数
          width: 20, //宽
          height: 20, //高
          // title:'我在这里',//标注点名
          alpha: 1, //透明度
          //    label:{//为标记点旁边增加标签   //因背景颜色H5不支持
          // color:'red',//文本颜色
          //    },
          callout: {
            //自定义标记点上方的气泡窗口 点击有效
            content: '', //文本
            // color: '#ffffff', //文字颜色
            fontSize: 14, //文本大小
            borderRadius: 15, //边框圆角
            borderWidth: '10',
            bgColor: '#ffffff', //背景颜色
            display: 'ALWAYS', //常显
          },
        },
        // 地图参数
        options: {
          // 地图属性参数
          latitude: 39.908692, //纬度
          longitude: 116.397477, //经度
          scale: 5, //缩放级别
          // 标记点属性
          marker: [],
        },
        start: 0, // 拖拽起始位置
        isAnimate: false, // 是否动画
        footerH: 0, // 底部按钮区高度
        videoSrc: '', // 视频链接
        poster: '', // 视频海报
        // 拖拽卡片数据
        cardInfo: {
          storeName: '',
          phone: '', // 汽修厂电话,
          imData: {
            // 聊天室数据
            shopUserId: '',
            type: 0,
            note: '',
            platformCode: '',
          },
          address: '',
        },
        // 拖拽显示内容数据
        contentInfo: {
          engineId: '', // 发动机识别号
          // 服务项目
          serviceInfo: {
            type: 1, //服务类型 暗转、回收、售后
            price: null, // 服务金额
            time: '', // 上门时间
            tips: '', // 上门指导
            name: '', // 服务名称
            address: '',
          },
          // 故障信息
          brokenInfo: {
            desc: '', // 故障描述
            descVioce: {
              // 语音信息
              duration: 0,
              audio: [
                // 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
              ],
            },
            // 故障图片
            picList: [
              // '/static/demo/IMG_3839.JPG',
              // '/static/demo/IMG_3839.JPG',
              // '/static/demo/IMG_3839.JPG',
            ],
            // 故障视频
            videoList: [
              {
                type: '',
                src: '', // https://www.runoob.com/try/demo_source/movie.mp4
                poster: '',
              },
            ],
          },
          // 旧机信息
          oldInfo: [
            // '/static/demo/IMG_3839.JPG',
            // '/static/demo/IMG_3839.JPG',
            // '/static/demo/IMG_3839.JPG',
            // '/static/demo/IMG_3839.JPG',
            // '/static/demo/IMG_3839.JPG',
          ],
          // 订单信息
          orderInfo: {
            orderNo: '', // 订单编号
            createTime: '', // 下单时间
            uodateTime: '', // 接单时间
          },
          // 购机订单
          buyInfo: {
            // // 店铺id
            shopId: '',
            pic: '',
            goodsName: '',
            // 发动机识别码
            code: '',
            categoryType: '',
          },
        },
        location: {
          addressDetail: '',
          latitude: '',
          longitude: '',
        },
        info: {},
        timer: {},
      }
    },
    // mounted() {
    //   // uni.getLocation({
    //   //   type: 'gcj02',
    //   //   isHighAccuracy: true, //高精度
    //   //   geocode: true, //将位置解析成地址
    //   //   success: function (res) {
    //   //     // _this.options.latitude = res.latitude
    //   //     // _this.options.longitude = res.longitude
    //   //     console.log(res)
    //   //   },
    //   //   fail: function (res) {
    //   //     reject(res)
    //   //   },
    //   // })
    //   const query = uni.createSelectorQuery().in(this)
    //   query
    //     .select('#drag_card')
    //     .boundingClientRect((data) => {
    //       this.dragCardParams.height = data.height
    //       this.dragCardParams.offsetHeight = data.height / 2
    //     })
    //     .exec()
    //   // query // 固定
    //   //   .select('#drag_content')
    //   //   .boundingClientRect((data) => {
    //   //     this.fixedTitleParams.titleH = data.height
    //   //   })
    //   //   .exec()
    //   query
    //     .select('#footer')
    //     .boundingClientRect((data) => {
    //       // 安卓和ios差量
    //       this.footerH = data.height + this.sys.safeAreaInsets.top
    //       this.bottom = data.height + this.sys.safeAreaInsets.top
    //       let height =
    //         this.sys.windowHeight -
    //         this.dragCardParams.height -
    //         data.height -
    //         data.height -
    //         this.sys.safeAreaInsets.bottom -
    //         this.sys.safeAreaInsets.top -
    //         12
    //       if (this.sys.osName === 'ios') {
    //         height = height - 12 + data.height / 2
    //       }
    //       this.dragContentParam.height = height
    //       this.dragContentParam.top = this.sys.windowHeight
    //       console.log(this.dragContentParam.top)
    //     })
    //     .exec()
    //   // query
    //   //   .select('#borderBox')
    //   //   .boundingClientRect((data) => {
    //   //     this.borderH = data.height
    //   //   })
    //   //   .exec()
    // },
    methods: {
      goToUrl(url) {
        this.$linkToEasy(url)
      },
      async toContinue() {
        try {
          const res = await this.$VoHttp.apiOrderRecycleContinueWait({
            id: this.info.id,
          })
          if (!res || !res.data) return
          uni.$u.toast(res.message)
        } catch (err) {
          uni.$u.toast(err.message)
        }
      },
      // 构造回收数据
      computedRecycleData(val) {
        const data = val.data
        return {
          engineId: JSON.parse(data.engineMsg).no, // 发动机识别号
          // 服务项目
          serviceInfo: {
            type: 1, //服务类型 暗转、回收、售后
            price: data?.supportAmount, // 服务金额
            time: data.reachStoreTime, // 上门时间
            tips: null, // 上门指导
            name: data.supportName, // 服务名称
            address:
              JSON.parse(data.addressDetail).address +
              '-' +
              JSON.parse(data.addressDetail).addressDetail,
          },
          // 旧机信息
          oldInfo: Object.values(JSON.parse(data.engineMsg).pic),
          // 订单信息
          orderInfo: {
            orderNo: data.id, // 订单编号
            createTime: data?.placeOrderTime, // 下单时间
            uodateTime: data?.taskOrderTime, // 接单时间
          },
          // 购机订单
          buyInfo: {
            // 店铺id
            shopId: data.relationOrderId, //关联订单id  '0'未关联
            pic: data.goodsDetail?.[0].pic?.[0].indexOf('.jpg')
              ? data.goodsDetail?.[0].pic?.[0]
              : data.goodsDetail?.[0].pic?.[1],
            goodsName: data.goodsDetail?.[0].goodsName,
            // 发动机识别码
            code: data.engineNo,
            categoryType: data.goodsDetail?.[0].categoryType,
          },
        }
      },
      //构造回收集师傅信息
      computedCardInfoData(val) {
        const data = val.data
        // const res = await this.$VoHttp.apiOrderRecycleRepairMapLocation({ id: data.id })
        return {
          storeName: data.technicianInfo.realName, //集师傅姓名
          phone: data.technicianInfo.userName, // 集师傅电话
          favorableComment: data.technicianInfo.favorableComment,
          imData: {
            // 聊天室数据
            shopUserId: data.technicianInfo.id,
            type: 0,
            note: data.technicianInfo.realName,
            platformCode: 'skilledWorker',
          },
          // address: res.data?.masterAddress,
        }
      },
      //构造修理厂安装订单集师傅信息
      computedCardInfoInstall(val) {
        const data = val.data
        // const res = await this.$VoHttp.apiOrderRecycleRepairMapLocation({ id: data.id })
        return {
          storeName: data.orderEvaluateVO?.masterName, //集师傅姓名
          phone: data.orderEvaluateVO?.phone, // 集师傅电话
          favorableComment: data.orderEvaluateVO?.favorableComment, //好评率
          photoUrl: data.orderEvaluateVO?.photoUrl,
          imData: {
            // 聊天室数据
            shopUserId: data.orderEvaluateVO?.masterId,
            type: 0,
            note: data.orderEvaluateVO?.masterName,
            platformCode: 'skilledWorker',
          },
          // address: res.data?.masterAddress,
        }
      },
      // 构造修理厂安装订单数据
      computedInstallData(val) {
        const data = val.data
        data.timeList.forEach((item) => {
          if (item.timeName === '下单时间') {
            data.createOrderTime = item.createTime
          }
          if (item.timeName === '接单时间') {
            data.acceptTime = item.createTime
          }
        })
        console.log(data)
        const engineMsg = JSON.parse(data.engineMsg)
        return {
          engineId: JSON.parse(data.engineMsg).no, // 发动机识别号
          // 服务项目
          serviceInfo: {
            type: 1, //服务类型 暗转、回收、售后
            price: data?.supportAmount, // 服务金额
            time: data.reachStoreTime, // 上门时间
            tips: null, // 上门指导
            name: data.supportName, // 服务名称
            address:
              JSON.parse(data.addressDetail).address +
              '-' +
              JSON.parse(data.addressDetail).addressDetail,
          },
          // 旧机信息
          // oldInfo: Object.values(JSON.parse(data.engineMsg).pic),
          oldInfo: engineMsg.pic ? Object.values(engineMsg.pic) : {},
          // 订单信息
          orderInfo: {
            orderNo: data.id, // 订单编号
            createTime: data?.createOrderTime, // 下单时间
            uodateTime: data?.acceptTime, // 接单时间
          },
          // 购机订单
          buyInfo: {
            // 店铺id
            shopId: data.relationOrderId, //关联订单id  '0'未关联
            pic: data.goodsDetail?.[0].pic?.[0],
            goodsName: data.goodsDetail?.[0].goodsName,
            categoryType: data.goodsDetail?.[0].categoryType,
          },
        }
      },
      // 构造技术工售后服务单数据
      computedAfterSaleData(val) {
        const data = val.data
        data.timeList.forEach((item) => {
          if (item.timeName === '下单时间' || item.timeName === '创建时间') {
            data.createOrderTime = item.createTime
          }
          if (item.timeName === '接单时间') {
            data.acceptTime = item.createTime
          }
        })
        if (data.homeStartTime && data.homeEndTime) {
          data.time =
            this.$vocenApi.VoUtils.timeFormat(data.homeStartTime, 'yyyy-mm-dd hh:MM') +
            '-' +
            this.$vocenApi.VoUtils.timeFormat(data.homeEndTime, 'hh:MM')
        }
        if (data.faultDetail && data.faultDetail.pic) {
          data.failImg = data.faultDetail.pic.filter((item) => item.type === 'image')
          let failVideo = data.faultDetail.pic.filter((item) => item.type === 'video')
          if (failVideo.length) {
            data.failVideoList = failVideo.map((item) => {
              return {
                type: 'video',
                src: item.pic,
                poster: '/static/demo/IMG_3839.JPG',
              }
            })
          } else {
            data.failVideoList = []
          }
        }
        return {
          // engineId: JSON.parse(data.engineMsg).no, // 发动机识别号
          // 服务项目
          serviceInfo: {
            type: 3, //服务类型 暗转、回收、售后
            price: data.supportAmount, // 服务金额
            time: data.time, // 上门时间
            tips: data.homeMsg, // 上门指导
            name: data.supportName, // 服务名称
          },
          //故障信息
          brokenInfo: {
            desc: data.faultDetail?.desc, // 故障描述
            // 语音信息
            descVioce: data.faultDetail.voice
              ? {
                  duration: '',
                  audio: [data.faultDetail.voice],
                }
              : '',
            // 故障图片
            picList: data.failImg.map((item) => item.pic),
            // 故障视频
            videoList: data.failVideoList || [],
          },
          // 订单信息
          orderInfo: {
            orderNo: data.id, // 订单编号
            createTime: data?.createOrderTime, // 下单时间
            uodateTime: data?.acceptTime, // 接单时间
          },
        }
      },
      // 构造技术工售后服务单集师傅信息
      computedCardInfoAfterSale(val) {
        const data = val.data
        return {
          storeName: data.orderAddress?.name, //修理厂姓名
          phone: data.orderAddress?.phone, // 修理厂电话
          imData: {
            // 聊天室数据
            shopUserId: data.buyerUserId,
            type: 0,
            shopName: '',
            platformCode: 'garage',
          },
          address: data.orderAddress?.address + data.orderAddress?.addressDetail,
        }
      },
      // 构造技术工安装服务单数据
      computedInstallSeviceData(val) {
        const data = val.data
        data.timeList.forEach((item) => {
          if (item.timeName === '下单时间' || item.timeName === '创建时间') {
            data.createOrderTime = item.createTime
          }
          if (item.timeName === '接单时间') {
            data.acceptTime = item.createTime
          }
        })
        if (data.homeStartTime && data.homeEndTime) {
          data.time =
            this.$vocenApi.VoUtils.timeFormat(data.homeStartTime, 'yyyy-mm-dd hh:MM') +
            '-' +
            this.$vocenApi.VoUtils.timeFormat(data.homeEndTime, 'hh:MM')
        }
        return {
          // engineId: JSON.parse(data.engineMsg).no, // 发动机识别号
          // 服务项目
          serviceInfo: {
            type: 1, //服务类型 暗转、回收、售后
            price: data.supportAmount, // 服务金额
            time: data.time, // 上门时间
            name: data.supportName, // 服务名称
          },
          // 订单信息
          orderInfo: {
            orderNo: data.id, // 订单编号
            createTime: data?.createOrderTime, // 下单时间
            uodateTime: data?.acceptTime, // 接单时间
          },
        }
      },
      // 构造技术工安装服务单集师傅信息
      computedInstallSevice(val) {
        const data = val.data
        let info = data.addressDetail ? JSON.parse(data.addressDetail) : ''
        return {
          storeName: data.garageInfo?.storeName, //修理厂姓名
          phone: data.garageInfo?.userName, // 修理厂电话
          imData: {
            // 聊天室数据
            shopUserId: data.garageInfo?.userId,
            type: 0,
            note: data.garageInfo?.storeName,
            platformCode: 'garage',
          },
          address: info.address + info.addressDetail,
        }
      },
      // 构造技术工回收服务单数据
      computedRecycleSeviceData(val) {
        const data = val.data
        data.timeList.forEach((item) => {
          if (item.timeName === '下单时间' || item.timeName === '创建时间') {
            data.createOrderTime = item.createTime
          }
          if (item.timeName === '接单时间') {
            data.acceptTime = item.createTime
          }
        })
        if (data.homeStartTime && data.homeEndTime) {
          data.time =
            this.$vocenApi.VoUtils.timeFormat(data.homeStartTime, 'yyyy-mm-dd hh:MM') +
            '-' +
            this.$vocenApi.VoUtils.timeFormat(data.homeEndTime, 'hh:MM')
        }
        const engineMsg = JSON.parse(data.engineMsg)
        return {
          // engineId: JSON.parse(data.engineMsg).no, // 发动机识别号
          // 服务项目
          serviceInfo: {
            type: 2, //服务类型 暗转、回收、售后
            price: data.supportAmount, // 服务金额
            time: data.time, // 上门时间
            name: data.supportName, // 服务名称
          },
          // 旧机信息
          // oldInfo: Object.values(JSON.parse(data.engineMsg).pic),
          oldInfo: engineMsg.pic ? Object.values(engineMsg.pic) : {},
          // 订单信息
          orderInfo: {
            orderNo: data.id, // 订单编号
            createTime: data?.createOrderTime, // 下单时间
            uodateTime: data?.acceptTime, // 接单时间
          },
        }
      },
      // 构造技术工回收服务单集师傅信息
      computedRecycleSevice(val) {
        const data = val.data
        let info = data.addressDetail ? JSON.parse(data.addressDetail) : ''
        return {
          storeName: data.garageInfo?.storeName, //修理厂姓名
          phone: data.garageInfo?.userName, // 修理厂电话
          imData: {
            // 聊天室数据
            shopUserId: data.garageInfo?.userId,
            type: 0,
            note: data.garageInfo?.storeName,
            platformCode: 'garage',
          },
          address: info.address + info.addressDetail,
        }
      },
      // 获取用户当前定位
      getUserLocation() {
        uni.getLocation({
          type: 'wgs84',
          success: async (res) => {
            console.log(res, '成功了')
            const { latitude, longitude } = res
            const result = util.transformFromWGSToGCJ(latitude, longitude)
            console.log(result, 1111111)
            this.location.longitude = +result.longitude.toFixed(6)
            this.location.latitude = +result.latitude.toFixed(6)
            showLoading('页面加载中')
            await this.getMarker() // 获取标点
            await this.getDetail() // 获取卡片详情
          },
          fail: (ret) => {
            uni.showModal({
              title: '提示',
              content: '需要您开启定位授权，获取您的位置信息！',
              cancelText: '暂不开启',
              confirmText: '去开启',
              success: ({ confirm, cancel }) => {
                if (confirm) {
                  // android平台
                  if (uni.getSystemInfoSync().platform == 'android') {
                    var Intent = plus.android.importClass('android.content.Intent')
                    var Settings = plus.android.importClass('android.provider.Settings')
                    var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS)
                    var main = plus.android.runtimeMainActivity()
                    main.startActivity(intent) // 打开系统设置GPS服务页面
                  }
                  // ios平台
                  if (uni.getSystemInfoSync().platform == 'ios') {
                    var UIApplication = plus.ios.import('UIApplication')
                    var application2 = UIApplication.sharedApplication()
                    var NSURL2 = plus.ios.import('NSURL')
                    var setting2 = NSURL2.URLWithString('App-Prefs:root=Privacy&path=LOCATION')
                    application2.openURL(setting2)
                    plus.ios.deleteObject(setting2)
                    plus.ios.deleteObject(NSURL2)
                    plus.ios.deleteObject(application2)
                  }
                }
                // 用户取消前往开启定位服务
                if (cancel) {
                  // do sth...
                  uni.navigateBack()
                }
              },
            })
          },
        })
      },
      // 获取地图标点
      async getMarker() {
        this.showMap = false
        let params = {
          // '165523808495730688'
          id: this.id,
        }
        let data
        try {
          if (this.origin <= 3) {
            params.latitude = this.location.latitude
            params.longitude = this.location.longitude
            params.addressDetail = ''
            data = await this.$VoHttp.apiOrderRecycleTechnologyMapLocation(params, {
              noLoading: true,
            })
          } else {
            data = await this.$VoHttp.apiOrderRecycleRepairMapLocation(params, { noLoading: true })
          }
          console.log(data)
          if (+data.code === 20001) {
            this.options.marker = []
            await setTimeout(() => {}, 200)
            const addressInfo = JSON.parse(data.data.addressDetail)
            // await
            this.options.marker[0] = Object.assign({}, this.repairMarker)
            this.options.marker[0].latitude = addressInfo.latitude
            this.options.marker[0].longitude = addressInfo.longitude
            if (this.origin > 5) {
              this.options.marker[0].callout.content = '目的地'
            } else {
              this.options.marker[0].callout.content = '修理厂位置'
            }
            // 如果有集师傅信息，地图中心点以二者中心点为准
            if (data.data.longitude) {
              // let longitude = (Number(data.data.longitude) + Number(addressInfo.longitude)) / 2
              // let latitude = (Number(data.data.latitude) + Number(addressInfo.latitude)) / 2
              let longitude = +data.data.longitude
              let latitude = +data.data.latitude
              this.options.longitude = longitude.toFixed(6)
              this.options.latitude = latitude.toFixed(6)
              this.options.marker[1] = Object.assign({}, this.skillMarker)
              this.options.marker[1].latitude = data.data.latitude
              this.options.marker[1].longitude = data.data.longitude
              this.options.marker[1].callout.content = `集师傅`
              if (data.data.distance) {
                let distance = data.data.distance
                if (data.data.distance > 1000) {
                  distance = (distance / 1000).toFixed(2) + '公里'
                } else {
                  distance = distance + '米'
                }
                this.options.marker[1].callout.content = `${distance}`
              }
            } else {
              this.showNoEngineerTip = true
              if (addressInfo.longitude) {
                this.options.longitude = addressInfo.longitude
                this.options.latitude = addressInfo.latitude
              }
            }
          } else {
            hideLoading()
            uni.$u.toast(data.message)
            setTimeout(() => {
              this.$backFn()
            }, 1500)
          }
        } catch (e) {
          console.log(e.message)
          hideLoading()
          if (e.message) {
            if (e.message.indexOf('latitude') !== -1) {
              uni.$u.toast('未获取到集师傅的位置信息')
            }
          } else {
            uni.$u.toast('网络连接错误')
          }

          // setTimeout(() => {
          //   this.$backFn()
          // }, 1500)
        }
      },
      // 获取详情 渲染 7为无详情且上个页面有可渲染的内容，无需接口数据渲染
      async getDetail() {
        if (this.origin <= 3) {
          this.cardInfo.imData.platformCode = 'garage'
        } else if (this.origin > 3 && this.origin < 7) {
          this.cardInfo.imData.platformCode = 'skilledWorker'
        } else {
          this.cardInfo.imData.platformCode = 'recycling'
        }
        let data
        try {
          switch (this.origin) {
            // 来源 安装订单；回收订单；售后订单；修理厂端安装订单；修理厂端回收订单；修理厂位置轨迹；回收公司活动轨迹
            case 1:
              data = await this.$VoHttp.apiOrderTechnicianInstallDetail$Id(
                { id: this.id },
                { noLoading: true },
              )
              if (+data.code === 20001) {
                this.contentInfo = this.computedInstallSeviceData(data)
                this.cardInfo = this.computedInstallSevice(data)
                this.info = data.data
              } else {
                hideLoading()
                uni.$u.toast(data.message)
                setTimeout(() => {
                  this.$backFn()
                }, 1500)
              }
              break
            case 2:
              data = await this.$VoHttp.apiOrderRecycleOrderDetail$Id(
                { id: this.id },
                { noLoading: true },
              )
              if (+data.code === 20001) {
                this.contentInfo = this.computedRecycleSeviceData(data)
                this.cardInfo = this.computedRecycleSevice(data)
                this.info = data.data
              } else {
                hideLoading()
                uni.$u.toast(data.message)
                setTimeout(() => {
                  this.$backFn()
                }, 1500)
              }
              break
            case 3:
              data = await this.$VoHttp.apiOrderSupportAfterSaleDetail$Id(
                { id: this.id },
                { noLoading: true },
              )
              if (+data.code === 20001) {
                this.contentInfo = this.computedAfterSaleData(data)
                this.cardInfo = this.computedCardInfoAfterSale(data)
                console.log('this.cardInfo', this.cardInfo)
                this.info = data.data
              } else {
                hideLoading()
                uni.$u.toast(data.message)
                setTimeout(() => {
                  this.$backFn()
                }, 1500)
              }
              break
            case 4:
              data = await this.$VoHttp.apiOrderInstallDetail$Id(
                { id: this.id },
                { noLoading: true },
              )
              if (+data.code === 20001) {
                this.contentInfo = this.computedInstallData(data)
                this.cardInfo = this.computedCardInfoInstall(data)
                this.info = data.data
              } else {
                hideLoading()
                uni.$u.toast(data.message)
                setTimeout(() => {
                  this.$backFn()
                }, 1500)
              }
              break
            case 5:
              // TODO
              /**   3340待上门 3341待上门-继续等待
                    继续等待接口：apiOrderRecycleContinueWait
                    不等待逻辑可查看 原型地址 http://axure.gongchuangji.com/xiulichang-APP/#id=oqxbpi&p=%E5%BE%85%E4%B8%8A%E9%97%A8-%E6%9C%AA%E6%8C%89%E6%97%B6%E4%B8%8A%E9%97%A8&g=1

                    销售订单不等待接口 ：apiOrderRecycleWaitingAssign({ id: this.id })
                    单独发起不等待-不需要指派接口:apiOrderRecycleNotNeed({ id: this.id })
                    单独发起不等待-需要指派接口:apiOrderRecycleNeedAssign({ id: this.id })
  	          */

              data = await this.$VoHttp.apiOrderRecycleDetail({ id: this.id }, { noLoading: true })
              if (+data.code === 20001) {
                this.contentInfo = this.computedRecycleData(data)
                this.cardInfo = this.computedCardInfoData(data)
                this.info = data.data
              } else {
                hideLoading()
                uni.$u.toast(data.message)
                setTimeout(() => {
                  this.$backFn()
                }, 1500)
              }
              break
            case 6:
              // 修理厂回收订单活动轨迹
              data = await this.$VoHttp.apiOrderRecycleOrderDetail$Id(
                { id: this.id },
                { noLoading: true },
              )
              this.contentInfo = data
              this.cardInfo = data
              this.info = data.data
              break
            case 7:
              let info = this.$store.getters['mapDrag/mapData'] || null
              this.cardInfo.storeName = info.orderEvaluateVO.masterName
              this.cardInfo.photoUrl = info.orderEvaluateVO.photoUrl
              this.cardInfo.phone = info.orderEvaluateVO.phone
              this.cardInfo.favorableComment = info.orderEvaluateVO.favorableComment
              this.cardInfo.imData = {
                shopUserId: info.orderEvaluateVO.masterId,
                type: 0,
                note: info.orderEvaluateVO.masterName,
                platformCode: 'skilledWorker',
              }
              break
          }
        } catch (e) {
          console.log(e)
          hideLoading()
          uni.$u.toast(e.message || '网络连接错误')
          setTimeout(() => {
            this.$backFn()
          }, 1500)
          return
        }
        hideLoading()
        this.showMap = true
        this.$forceUpdate()
        setTimeout(() => {
          this.$nextTick(() => {
            this.initDragPage()
          })
        }, 100)
      },
      /**
       * 不等待
       * @param type 类型，1指派2不指派
       */
      //不需要指派
      async waitCancel() {
        let data
        let param = { id: this.id }
        try {
          if (this.origin === 4) {
            data = await this.$VoHttp.apiOrderInstallUnwanted(param)
          } else {
            data = await this.$VoHttp.apiOrderRecycleNotNeed(param)
          }
          if (+data.code === 20001) {
            this.$u.toast('服务订单已关闭，订单将全额退款')
          } else {
            this.$u.toast(data.message)
          }
          this.showModalWait = false
          // setTimeout(() => {
          // this.$backFn()
          // }, 1500)
        } catch (e) {
          console.log(e)
          uni.$u.toast(e.message || '网络连接错误')
          this.showModalWait = false
          // setTimeout(() => {
          // this.$backFn()
          // }, 1500)
        }
      },
      //     销售订单不等待接口 ：apiOrderRecycleWaitingAssign({ id: this.id })
      // 单独发起不等待-不需要指派接口:apiOrderRecycleNotNeed({ id: this.id })
      // 单独发起不等待-需要指派接口:apiOrderRecycleNeedAssign({ id: this.id })
      //需要指派
      async confirmWait() {
        //点击后关闭弹窗，显示toast提示信息：已提交申请，等待平台派单。将该订单状态变更为【待指派】
        let data
        let param = { id: this.id }
        try {
          if (this.origin === 4) {
            data = await this.$VoHttp.apiOrderInstallNeedAssign(param)
          } else {
            data = await this.$VoHttp.apiOrderRecycleNeedAssign(param)
          }
          if (+data.code === 20001) {
            // this.$u.toast('已提交申请，等待平台派单')
            this.$linkToEasy(
              `/pagesEngineer/OrderList/EditOrder?id=${this.id}&supportType=${this.info.supportType}`,
            )
          } else {
            this.$u.toast(data.message)
          }
          this.showModalWait = false
          // setTimeout(() => {
          // this.$backFn()
          // }, 1500)
        } catch (e) {
          console.log(e)
          uni.$u.toast(e.message || '网络连接错误')
          this.showModalWait = false
          // setTimeout(() => {
          // this.$backFn()
          // }, 1500)
        }
      },

      // 继续等待
      complateWait() {
        //继续等待,点击后该订单依然为【待安装】状态，显示的可操作按钮为【取消订单】、【联系客服】
        this.$VoHttp
          .apiOrderInstallContinueWait({ id: this.info.id })
          .then(() => {
            this.$u.toast('操作成功')
          })
          .catch((err) => {
            this.$u.toast(err.message || '操作失败')
          })
      },
      // garage取消订单
      garageCancelOrder() {
        //待收货、已完成：此时不可以取消订单，页面上进行弹窗提示
        if (
          (this.info.sellOrderStatus === 1130 || this.info.sellOrderStatus === 1140) &&
          this.info.supportSource === 2
        ) {
          this.showModalTip = true
          return
        }
        // 用户点击【取消订单】后先判断订单来源
        // 订单来源为【来源-销售订单】待付款、待发货：此时可以取消订单，页面上进行弹窗提示
        if (this.info.supportSource === 2) {
          this.showModalCancel = true
        } else {
          this.$linkToEasy(`/pagesEngineer/OrderList/CancelOrder?id=${this.id}&type=2`)
        }
        //待安装,获取退款数据
        if (this.info.orderStatus === 3240) {
          this.getCancelData()
        }
      },
      //获取时间差
      getHour(s1, s2) {
        var reDate = /\d{4}-\d{1,2}-\d{1,2} /
        s1 = new Date((reDate.test(s1) ? s1 : '2018-1-1 ' + s1).replace(/-/g, '/'))
        s2 = new Date((reDate.test(s2) ? s2 : '2018-1-1 ' + s2).replace(/-/g, '/'))
        var ms = s2.getTime() - s1.getTime()
        if (ms < 0) return 0
        return Math.floor(ms / 1000 / 60 / 60) //小时
      },
      //获取退款数据
      getCancelData() {
        this.$VoHttp
          .apiOrderInstallCancel({ orderId: this.operationData.id })
          .then((res) => {
            console.log('res', res)
            this.cancelData = res.data
            let preDate = new Date(
              new Date(this.cancelData.homeStartTime).getTime() - 24 * 60 * 60 * 1000,
            )
            let preDateValue = this.$vocenApi.VoUtils.timeFormat(preDate, 'yyyy-mm-dd hh:MM:ss')
            console.log('preDateValue', preDateValue)
            let hourNum = this.getHour(this.nowDate, this.cancelData.homeStartTime)
            if (hourNum >= 24) {
              this.tipMsg = `${preDateValue}之前可免费取消`
            } else if (hourNum < 24) {
              this.tipMsg = `距离上门时间不足${hourNum}小时，现在取消将扣除违约金${this.cancelData.penaltyAmount}元补偿集师傅`
            }
            console.log('tipMsg', this.tipMsg)
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '网络连接错误')
          })
      },
      // 取消订单
      cancelOrder() {
        this.showModalCancel = false
        this.refuseOrder(2)
      },
      // 开始安装
      async orderBegin() {
        //默认为不可点击状态。获取当前集师傅和修理厂的位置，若二者距离小于50米，该按钮为可点击状态
        // const res = await this.$VoHttp.apiOrderRecycleTechnologyMapLocation({
        //   ...this.location,
        //   id: this.info.id,
        //   addressDetail: this.info.addressDetail,
        // })
        // if (res.data.distance && res.data.distance > 50) {
        //   this.$u.toast('您当前距离修理厂超过50米，无法开始安装')
        //   return
        // }
        this.$VoHttp
          .apiOrderTechnicianInstallStart$Id({ id: this.optionsId })
          .then((res) => {
            this.$u.toast('开始安装工作，安装过程中如有问题您可联系平台售后协助解决')
            uni.redirectTo({
              url: '/pagesEngineer/InstallOrder/InInstallation?id=' + this.optionsId,
            })
          })
          .catch((err) => {
            this.$u.toast(err.message || '开始失败')
          })
      },
      /**
       * 取消订单
       * @param type 1 技术工 2 修理厂
       * @param supportType 服务单类型,31:售后单 32:安装单 33:回收单
       */
      refuseOrder(type, supportType) {
        this.$linkToEasy(
          `/pagesEngineer/OrderList/CancelOrder?id=${this.id}&type=${type}&supportType=${supportType}`,
        )
      },
      // 修改上门时间
      editTime() {
        this.$linkToEasy(
          `/pagesEngineer/OrderList/EditOrder?id=${this.id}&supportType=${this.info.supportType}`,
        )
      },
      /**
       * 复制
       */
      copyThis(data) {
        uni.setClipboardData({
          data: data,
        })
      },
      // 打开第三方导航
      openGPSApp() {
        if (!this.info.garageInfo.latitude) {
          uni.$u.toast('无修理厂位置信息')
          return
        }


        openGpsAppFn(this.info.garageInfo.latitude,this.info.garageInfo.longitude,this.cardInfo.storeName)

      },
      // 跳转聊天页面
      goImUrl() {
        console.log(this.cardInfo)
        console.log(this.info)
        const info = {
          targetId: this.cardInfo.imData.shopUserId,
          type: 0,
          note: this.cardInfo.imData.shopName || '',
          platformCode: this.cardInfo.imData.platformCode,
        }
        this.$storage.set('temp_im_room_info', info)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      //联系客服
      toConcat() {
        goOnlineCustomerFn()
      },
      /**
       * 拨打电话
       */
      callPhone() {
        const phone = this.cardInfo.phone
        this.$cellPhone(String(phone))
      },
      /**
       * 预览图片
       */
      choseImg(src) {
        uni.previewImage({
          current: 0,
          urls: [src],
          indicator: 'none',
        })
      },
      /**
       * 预览视频
       */
      choseVideo(data) {
        this.videoSrc = data.src
        this.poster = data.poster
        this.$refs.EraPreviewVideo.show(data.src)
      },
      clickMarker(e) {
        console.log(e, 'eeeeeeeeeeeeeeeeeee')
      },
      // 记录卡片触摸Y轴位置
      cardMoveStartFn() {
        if (this.origin >= 6) {
          return
        }
        this.isAnimate = false
        this.start = this.bottom
      },
      /**
       * 卡片触摸时事件
       * @param e 事件对象
       * @returns {boolean}
       */
      cardMoveFn(e) {
        if (this.origin >= 6) {
          return
        }
        // 单指触摸
        if (e.touches.length !== 1) {
          return false
        }
        const clientY =
          this.sys.windowHeight -
          e.touches[0].clientY -
          this.dragCardParams.offsetHeight -
          this.sys.safeAreaInsets.bottom
        const edgeBottom = this.sys.windowHeight - this.dragCardParams.height - this.footerH
        // const edgeBottom = // 固定
        //   this.sys.windowHeight -
        //   this.dragCardParams.height -
        //   this.fixedTitleParams.titleH +
        //   this.footerH
        // 上下触及边界
        // console.log(clientY, this.footerH);
        if (clientY < this.footerH) {
          this.bottom = this.footerH
        } else if (clientY > edgeBottom) {
          this.bottom = edgeBottom
        } else {
          this.bottom = clientY
        }
        this.dragContentParam.top = this.sys.windowHeight - this.bottom
      },
      // 卡片触摸结束判断
      cardMoveEndFn() {
        if (this.origin >= 6) {
          return
        }
        const edgeBottom = this.sys.windowHeight - this.dragCardParams.height - this.footerH
        // const edgeBottom = // 固定
        //   this.sys.windowHeight -
        //   this.dragCardParams.height -
        //   this.fixedTitleParams.titleH +
        //   this.footerH
        if (this.start === this.footerH) {
          if (this.bottom - this.start > 100) {
            this.bottom = edgeBottom
          } else {
            this.bottom = this.footerH
          }
        } else {
          if (this.bottom - this.start < -100) {
            this.bottom = this.footerH
          } else {
            this.bottom = edgeBottom
          }
        }
        this.dragContentParam.top = this.sys.windowHeight - this.bottom
        this.isAnimate = true
      },
      // 渲染并格式化drag内容
      initDragPage() {
        // uni.getLocation({
        //   type: 'gcj02',
        //   isHighAccuracy: true, //高精度
        //   geocode: true, //将位置解析成地址
        //   success: function (res) {
        //     // _this.options.latitude = res.latitude
        //     // _this.options.longitude = res.longitude
        //     console.log(res)
        //   },
        //   fail: function (res) {
        //     reject(res)
        //   },
        // })
        const query = uni.createSelectorQuery().in(this)
        query
          .select('#drag_card')
          .boundingClientRect((data) => {
            this.dragCardParams.height = data.height
            this.dragCardParams.offsetHeight = data.height / 2
          })
          .exec()
        // query // 固定
        //   .select('#drag_content')
        //   .boundingClientRect((data) => {
        //     this.fixedTitleParams.titleH = data.height
        //   })
        //   .exec()
        query
          .select('#footer')
          .boundingClientRect((data) => {
            // 安卓和ios差量
            this.footerH = data.height + this.sys.safeAreaInsets.top
            this.bottom = data.height + this.sys.safeAreaInsets.top
            let height =
              this.sys.windowHeight -
              this.dragCardParams.height -
              data.height -
              data.height -
              this.sys.safeAreaInsets.bottom -
              this.sys.safeAreaInsets.top -
              12
            if (this.sys.osName === 'ios') {
              height = height - 12 + data.height / 2
            }
            this.dragContentParam.height = height
            this.dragContentParam.top = this.sys.windowHeight
            console.log(this.dragContentParam.top)
          })
          .exec()
        // query
        //   .select('#borderBox')
        //   .boundingClientRect((data) => {
        //     this.borderH = data.height
        //   })
        //   .exec()
      },
    },
    onShow() {
      // this.getDetail()
    },
    async onLoad(options) {
      console.log(this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd hh:MM:ss'))
      uni.$on('updateTime', (res) => {
        this.getDetail()
      })
      const sys = uni.getSystemInfoSync()
      this.sys = sys
      this.title = options.title
      this.id = options.id
      this.hideIcon = !!options.hideIcon
      //来源 1安装订单；2回收订单；3售后订单；4修理厂端安装订单；5修理厂端回收订单；6修理厂位置轨迹；7回收公司活动轨迹
      this.origin = +options.origin
      this.optionsId = options.id
      if (this.origin <= 3) {
        // 技术工，需要获取位置并上传
        this.getUserLocation()
        this.timer = setInterval(() => {
          this.getUserLocation()
        }, 31000)
      } else {
        // 获取标点
        showLoading('页面加载中')
        await this.getMarker()
        await this.getDetail()
      }
    },
    //监听页面隐藏
    onHide() {
      clearInterval(this.timer)
      this.timer = null
      // uni.$emit('noAddCurrent', true)
    },
    //监听页面卸载
    onUnload() {
      clearInterval(this.timer)
      this.timer = null
      // uni.$emit('noAddCurrent', true)
    },
  }
</script>
<style lang="scss" scoped>
  .wrap {
    //padding-top: 100rpx;
    width: 750rpx;
    height: 100vh;
    position: relative;

    &-map {
      width: 100vw;
      height: 100vh;
    }
  }

  .noEngineerTip {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff5e6;
    color: #ff9b05;
    font-size: 24rpx;
    padding: 20rpx 24rpx;

    .warringPng {
      width: 40rpx;
      height: 40rpx;
      margin-right: 16rpx;
    }

    .closePng {
      width: 32rpx;
      height: 32rpx;
      margin-right: 4rpx;
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

  .card {
    position: fixed;
    z-index: 99;
    width: 100%;
    padding: 16rpx;
    box-sizing: border-box;

    &-content {
      background: #fff;
      padding: 24rpx;
      box-shadow: 4rpx 8rpx 32rpx rgba(170, 182, 200, 0.25);
      border-radius: 16rpx;

      .photo {
        width: 68rpx;
        height: 68rpx;
        border-radius: 50%;
        overflow: hidden;
      }
    }

    .icon-map {
      padding: 0rpx 16rpx;
      color: #0d66ff;
      border: 2rpx solid #0d66ff;
      border-radius: 20rpx;
    }

    .fun-btn-bar {
      border-top: 2rpx solid #f7f7f8;
      padding: 28rpx;
      padding-bottom: 0;

      .border-r {
        border-right: 2rpx solid #f7f7f8;
      }
    }
  }

  .drag-content {
    position: absolute;
    width: 100%;
    left: 0;
    padding: 16rpx;
    box-sizing: border-box;
    padding-top: 0;

    &-box {
      background: #fff;
      padding: 0 24rpx;
      box-shadow: 4rpx 8rpx 32rpx rgba(170, 182, 200, 0.25);
      border-radius: 16rpx;
      //max-height: 560rpx; //固定
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
        width: 216rpx;
        height: 216rpx;
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

  .transition {
    transition: all 0.5s ease;
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
    color: rgba(0, 0, 0, 0.85);
    font-size: 28rpx;
    background: #fff;
    box-sizing: border-box;
    z-index: 10;

    &-btn-bar {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 24rpx 32rpx;
    }

    &-btn {
      border: 1px solid rgba(0, 0, 0, 0.25);
      border-radius: 126rpx;
      padding: 22rpx 32rpx;

      &.act {
        color: #ff5319;
        border-color: #ff5319;
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
</style>
