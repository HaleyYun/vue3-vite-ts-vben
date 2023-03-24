<template>
  <u-popup :safeAreaInsetBottom="true" :show="show" mode="bottom" @close="cancle">
    <view class="top flex flex-column">
      <image class="top-image" src="/static/created/circle/app_alert_top.png" />
      <view class="top-info">
        <view class="color-white fz-30 fz-b flex flex-justify-c p-t-40">
          <block v-if="params.roleCode">
            邀请{{ getRoleName(params.roleCode, roleArrGet) }}
          </block>
          <template v-else>邀请码</template>
        </view>
        <u-line
          margin="26rpx 40rpx 0rpx"
          color="#ffffff"
          direction="row"
          :dashed="true"
          length="500rpx"
        />
        <view class="color-white fz-28 flex flex-justify-c p-t-36">
          邀请人：{{ userInfo.storeName }}
        </view>
        <view class="color-white fz-28 flex flex-justify-c p-t-16" v-if="params.shareName">
          被邀请人：{{ params.shareName }}
        </view>
      </view>
      <view class="top-bottom">
        <VoCodeImage
          :loadMake="true"
          :size="180"
          :usingComponents="true"
          :val="codeValue"
          @result="qrR"
          cid="qrcode"
          class="top-bottom__code"
          ref="qrcode"
          unit="px"
        />
<!--        <VoQRCode-->
<!--          class="top-bottom__code"-->
<!--          ref="qrcode"-->
<!--          canvas-id="qrcode"-->
<!--          :value="codeValue"-->
<!--          :size="180"-->
<!--          :auto="true"-->
<!--        />-->
      </view>
    </view>
    <view class="share">
      <view class="share-title">分享至</view>
      <view class="share-top__line" />
      <view class="share-center">
        <view v-for="(item, index) in shareList" :key="index" @click="shareItem(item)">
          <image class="share-center__image" :src="item.src" />
          <view class="share-center__title">{{ item.name }}</view>
        </view>
      </view>
      <view class="share-line" />
      <view class="share-center">
        <view @click="savePhoto">
          <image class="share-center__image" src="/static/created/circle/app_savePhoto.png" />
          <view class="share-center__title">保存图片</view>
        </view>
      </view>
      <view class="share-bottom__line" />
      <slot>
        <view class="share-cancel" @click="cancle">取消</view>
      </slot>
    </view>
  </u-popup>
</template>

<script>
  import devConf from '@/common/env'
  import VoQRCode from '@/components/VoQRCode/VoQRCode/VoQRCode'
  import VoCodeImage from "@/components/VoCodeImage/VoCodeImage";
  import { shareWeixin } from '@/common/helper'
  import img from '@/static/logo-2.png'
  import { mapGetters } from 'vuex'
  export default {
    name: 'VoShareQrCodeView',
    components: { VoQRCode, VoCodeImage },
    computed: {
      // 辅助函数
      ...mapGetters({
        roleArrGet: 'role/roleArrGetter',
      }),
    },
    props: {
      //是否点对点邀请
      isPoint: {
        type: Boolean,
        default: false,
      },
      params: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        show: false,
        shareList: [
          {
            src: '/static/created/circle/share_friend.png',
            name: '微信好友',
            type: 'WXSceneSession',
          },
          {
            src: '/static/created/circle/share_circle.png',
            name: '朋友圈',
            type: 'WXSceneTimeline',
          },
          // {
          //   src: '/static/created/circle/app_friend.png',
          //   name: '分享给好友',
          //   type: 'appFriend',
          // },
        ],
        codeValue: '',
        shareImg: img, // 分享图片 --微信使用
        router: '', // 分享路径
        imgUrl: '',
      }
    },
    created() {
      //二维码内容
      // console.log(this.userInfo)
      // accountId  companyId  id
      // this.codeValue = JSON.stringify({
      //   name: this.userInfo.storeName,
      //   phone: this.userInfo.userName,
      // })
    },
    methods: {
      qrR(res) {
        console.log(res)
        this.imgUrl = res
      },
      loadMake(res) {
        return true
        console.log(res)
      },
      shareItem(item) {
        // if (item.type === 'shareFirend') {
        //   this.$u.toast(item.name + '分享')
        //   return
        // }
        // if (item.type === 'shareCircle') {
        //   this.$u.toast(item.name + '分享')
        //   return
        // }
        // if (item.type === 'appFriend') {
        //   this.$u.toast(item.name + '分享')
        //   return
        // }
        let link = devConf.shareBaseUrl + this.router + '?data='
        // let link = 'http://10.0.7.143:8080' + url + '?data='
        let uri = JSON.stringify(this.params)
        shareWeixin({
          scene: item.type,
          path: link + uri,
          imageUrl: this.shareImg,
        })
          .then((res) => {
            console.log('res分享', res)
          })
          .catch((err) => {
            console.log('shareWeixinErr', err)
          })
      },
      savePhoto() {

        // this.$refs.qrcode.save({
        //   complete: (res) => {
        //     console.log(res)
        //   },
        //   success: () => {
        //     this.$u.toast('图片保存成功')
        //   },
        // })
        console.log(this.imgUrl);
        // #ifndef H5
        uni.saveImageToPhotosAlbum({
          filePath: this.imgUrl,
          success: (res1) => {
            this.$u.toast('图片保存成功')
          },
          fail: (err1) => {
            console.log(err1);
          },
          // complete: () => {
          //   callback.complete()
          // },
        })
        // #endif

        // #ifdef H5
        /* 可以在电脑浏览器下载，移动端iOS不行，安卓微信浏览器不行，安卓外部浏览器可以 */
        this.isH5Save = true
        this.tempFilePath = this.imgUrl
        const aEle = document.createElement('a')
        aEle.download = 'uQRCode' // 设置下载的文件名，默认是'下载'
        aEle.href = this.imgUrl
        document.body.appendChild(aEle)
        aEle.click()
        aEle.remove() // 下载之后把创建的元素删除
        // callback.success({
        //   errMsg: 'ok',
        // })
        // callback.complete()
        // #endif
      },
      showShare(url, params) {
        console.log(this.params)
        this.router = url
        let link = devConf.shareBaseUrl + url
        // let link = 'http://10.0.7.143:8080' + url + '?data='
        let uri = ''
        if (params) {
          uri = '?data=' + JSON.stringify(params)
        } else if (this.params) {
          uri = '?data=' + JSON.stringify(this.params)
        }
        this.codeValue = encodeURI(link + uri)
        console.log(this.codeValue)
        this.show = true
        this.$forceUpdate()
        this.$nextTick(() => {
          // this.$refs.qrcode.remake({
          //   complete: (res)=> {
          //     console.log(res)
          //   }
          // })
        })
      },
      cancle() {
        this.show = false
        this.$emit('cancle')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .top {
    position: fixed;
    width: 580rpx;
    height: 780rpx;
    top: 15%;
    left: 50%;
    transform: translate(-50%, -15%);

    &-image {
      width: 580rpx;
      height: 298rpx;
    }
    &-info {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
    &-bottom {
      background-color: #ffffff;
      width: 580rpx;
      height: 482rpx;
      &__code {
        text-align: center;
        margin: 60rpx auto;
        //margin-left: 110rpx;
        // width: 360rpx;
        // height: 360rpx;
        // background-color: #00aff4;
      }
    }
  }
  .share {
    &-title {
      font-size: 28rpx;
      font-weight: bold;
      height: 74rpx;
      line-height: 74rpx;
      width: 750rpx;
      text-align: center;
      color: rgba(0, 0, 0, 0.85);
    }
    &-top__line {
      width: 750rpx;
      height: 1px;
      background: #f7f7f8;
    }
    &-center {
      margin: 20rpx 48rpx;
      display: grid;
      grid-row-gap: 40rpx;
      grid-column-gap: 40rpx;
      grid-template-columns: 1fr 1fr 1fr 1fr;

      &__image {
        width: 120rpx;
        height: 120rpx;
      }
      &__title {
        margin-top: 8rpx;
        font-size: 24rpx;
        line-height: 34rpx;
        text-align: center;
        color: rgba(0, 0, 0, 0.85);
      }
    }
    &-line {
      margin: 0rpx 32rpx;
      height: 2rpx;
      background: $v-bg-light;
    }
    &-bottom__line {
      width: 750rpx;
      height: 16rpx;
      background: #f7f7f8;
    }
    &-cancel {
      width: 100%;
      height: 96rpx;
      line-height: 96rpx;
      text-align: center;
      font-size: 28rpx;
      color: rgba(0, 0, 0, 0.85);
    }
  }
</style>
