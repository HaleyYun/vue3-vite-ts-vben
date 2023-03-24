<template>
  <view class="container overflow-hidden" id="container" :class="type === 1 ? 'bg-red' : ''">
    <view :class="type === 1 ? '' : 'position-f'" :style="{ opacity: showBtn ? 1 : 0 }">
      <VoNav is-have-more title="我要推广" />
    </view>
    <view v-if="showMask" class="mask">
      <image class="maskImg" src="/static/app/shareBg.png" />
    </view>
    <scroll-view scroll-y class="bgBox relative flex1 overflow-y">
      <image v-if="type === 1" id="bg" src="/static/poste/public.png" />
      <image v-else id="bg" src="/static/poste/engineerShare.png" />
      <VoCodeImage
        :loadMake="loadMake()"
        :size="codeStyle.codeW"
        :usingComponents="true"
        :val="shareLink"
        @result="qrR"
        cid="qrcode2"
        :style="{ left: `${codeStyle.codeL}px`, top: `${codeStyle.codeT}px` }"
        class="code"
        ref="qrcode2"
        unit="px"
        :icon="options.foregroundImageSrc"
        :iconSize="options.foregroundImageWidth"
      />
    </scroll-view>
    <!--    <VoQRCode-->
    <!--      v-if="show && !qrcodeImg"-->
    <!--      id="code"-->
    <!--      class="code"-->
    <!--      ref="qrcode"-->
    <!--      canvas-id="qr6"-->
    <!--      :style="{ left: `${codeStyle.codeL}px`, top: `${codeStyle.codeT}px` }"-->
    <!--      :value="shareLink"-->
    <!--      :size="codeStyle.codeW"-->
    <!--      :start="true"-->
    <!--      :auto="true"-->
    <!--      :options="options"-->
    <!--      @complete="codeToImg"-->
    <!--    />-->
    <!--    <canvas class="canvas" canvas-id="myCanvas" id="myCanvas"></canvas>-->
    <!--    <image-->
    <!--      v-if="qrcodeImg"-->
    <!--      class="code"-->
    <!--      :style="{-->
    <!--        left: `${codeStyle.codeL}px`,-->
    <!--        top: `${codeStyle.codeT}px`,-->
    <!--        width: `${codeStyle.codeW}px`,-->
    <!--        height: `${codeStyle.codeW}px`,-->
    <!--      }"-->
    <!--      :src="qrcodeImg"-->
    <!--    />-->
    <view class="share p-b-safe-area" :style="{ opacity: showBtn ? 1 : 0 }">
      <view class="share-center">
        <view v-for="(item, index) in shareList" :key="index" @click="shareItem(item)">
          <image class="share-center__image" :src="item.src" />
          <view class="share-center__title">{{ item.name }}</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  import VoCodeImage from '@/components/VoCodeImage/VoCodeImage'
  import { downLoadFile, isWeiXin, shareWeixin } from '@/common/helper'
  import { createCanvasFunc } from './canvas'
  import devConf from '@/common/env'
  import img from '@/static/logo-2.png'
  // #ifdef H5
  import html2canvas from './html2canvas'
  // #endif
  export default {
    name: 'SharePoste',
    components: {
      VoCodeImage,
    },
    data() {
      return {
        showMask: false,
        show: false,
        type: 1, // 1通用；2技术工
        params: '',
        router: '',
        shareLink: '',
        qrcodeImg: '',
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
          {
            src: '/static/created/circle/app_savePhoto.png',
            name: '保存图片',
            type: 'savePoster',
          },
        ],
        options: {
          // backgroundColor: 'rgba(0,0,0,0.2)',
          // 背景图
          // backgroundImageSrc: '/static/logo-1.png',
          // backgroundImageWidth: 160 * 0.25, // 图片宽
          // backgroundImageHeight: 160 * 0.25, // 图片高
          // backgroundImageX: 160 / 2 - (160 * 0.25) / 2, // 图片绘制的水平坐标，计算到居中位置
          // backgroundImageY: 160 / 2 - (160 * 0.25) / 2, // 图片绘制的垂直坐标，计算到居中位置
          // 上层图
          foregroundImageSrc: '/static/poste/logo-share.png',
          // foregroundImageSrc: '/static/logo-1.png',
          foregroundImageWidth: 160 * 0.25,
          foregroundImageHeight: 160 * 0.25,
          foregroundImageBorderRadius: 8,
          // backgroundImageAlpha: 0.88, // 透明度
          // foregroundColor: 'rgb(11, 34, 116)',
          // #ifdef H5
          queue: false,
          // #endif
          // #ifdef APP-PLUS
          queue: true,
          // #endif
          // margin: 10,
          // 乱七八糟的属性
          // positionProbeBackgroundColor: 'rgba(105,126,255,0.28)',
          // positionProbeForegroundColor: '#697eff',
          // separatorColor: 'rgba(184,112,253,0.29)',
          // positionAdjustBackgroundColor: 'rgba(255,122,140,0.28)',
          // positionAdjustForegroundColor: '#ff7a8c',
          // timingBbackgroundColor: 'rgba(252,219,135,0.21)',
          // timingForegroundColor: '#fcdb87',
          // darkBlockColor: '#0f47ff',
          // typeNumberBackgroundColor: 'rgba(0,255,83,0.18)',
          // typeNumberForegroundColor: '#00ff53',
        },
        // safeArea: {},
        codeStyle: {},
        shareImg: img,
        showBtn: true,
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.test()
      })
    },
    methods: {
      qrR(res) {
        // console.log(res)
      },
      loadMake(res) {
        return false
        console.log(res)
      },
      getPage(val) {
        // console.log(uni.getSystemInfoSync())
        // const sys = uni.getSystemInfoSync()
        // this.safeArea = sys.safeAreaInsets
        // const screenW = sys.screenWidth
        // const screenH = sys.screenHeight
        let codeL, codeT
        console.log(val);
        // 获取比例
        let scaleW = val.width / 375
        let scaleH = val.height / 588
        const logoW = 24 * scaleW
        const codeW = 154 * scaleW
        if (this.type === 1) {
          codeL = 110 * scaleW
          codeT = 306 * scaleH
          // if (this.$systemInfo.platform === 'ios') {
          //   codeT = val.height * (442 / 667)
          // }
          // // #ifdef H5
          // codeT = val.height * (415 / 667)
          // // #endif
        } else {
          codeL = val.width * (115 / 375)
          codeT = val.height * (345 / 667)
        }
        this.codeStyle = {
          codeW,
          codeL,
          codeT,
        }
        this.options.foregroundImageHeight = this.options.foregroundImageWidth = logoW
        this.show = true
      },
      // 截屏方案（APP）
      test2() {
        let t = this
        this.showBtn = false
        // #ifdef H5
        this.$nextTick(() => {
          let dom = document.querySelector('#container') // 获取dom元素
          html2canvas(dom, {
            width: dom.clientWidth, //dom 原始宽度
            height: dom.clientHeight,
            scrollY: 0, // html2canvas默认绘制视图内的页面，需要把scrollY，scrollX设置为0
            scrollX: 0,
            useCORS: true, //支持跨域，但好像没什么用
          })
            .then((canvas) => {
              // 将生产的canvas转为base64图片
              let base64 = canvas.toDataURL('image/png')
              // 将base64转换为图片保存
              if (window.navigator.msSaveOrOpenBlob) {
                let bstr = atob(base64.split(',')[1])
                let n = bstr.length
                let u8arr = new Uint8Array(n)
                while (n--) {
                  u8arr[n] = bstr.charCodeAt(n)
                }
                let blob = new Blob([u8arr])
                window.navigator.msSaveOrOpenBlob(blob, 'pigeons-download' + '.' + 'png')
              } else {
                // 这里就按照chrome等新版浏览器来处理
                const a = document.createElement('a')
                a.href = base64
                a.setAttribute('download', 'pigeons-download')
                a.click()
              }
            })
            .finally(() => {
              t.showBtn = true
            })
        })
        // #endif
        // #ifdef APP-PLUS
        this.$nextTick(function () {
          var pages = getCurrentPages() //获取当前页面信息
          console.log(pages)
          var page = pages[pages.length - 1]
          var bitmap = null
          var currentWebview = page.$getAppWebview()
          bitmap = new plus.nativeObj.Bitmap('amway_img')
          currentWebview.draw(
            bitmap,
            function () {
              let rand = Math.floor(Math.random() * 10000)
              let saveUrl = '_doc/' + rand + 'a.jpg'
              bitmap.save(
                saveUrl,
                {},
                function (i) {
                  uni.showModal({
                    title: '是否保存图片到手机?',
                    success: (confirm) => {
                      if (confirm.confirm) {
                        uni.saveImageToPhotosAlbum({
                          filePath: i.target,
                          success: function () {
                            console.log('123')
                            bitmap.clear() //销毁Bitmap图片
                            t.showBtn = true
                            uni.showToast({
                              title: '保存图片成功',
                              mask: false,
                              duration: 1500,
                            })
                          },
                          fail: () => {
                            console.log("asd");
                            t.showBtn = true
                          },
                        })
                      } else {
                        console.log("qwe");
                        t.showBtn = true
                        bitmap.clear() //销毁Bitmap图片
                      }
                    },
                    fail: () => {
                      console.log("zxc");
                      t.showBtn = true
                    },
                  })
                },
                function (e) {
                  // t.showToast('保存图片失败')
                  console.log(e);
                  t.showBtn = true
                },
              )
            },
            function (e) {
              console.log(e);
              // t.showToast('截屏绘制图片失败')
              t.showBtn = true
            },
          )
        })
        // #endif
      },
      // 拼图方案
      test() {
        // createCanvasFunc()
        let code, bgImg
        let query = uni.createSelectorQuery().in(this)
        // query
        //   .select('#codeImg')
        //   .boundingClientRect((data) => {
        //     code = data
        //   })
        //   .exec()
        query
          .select('#bg')
          .boundingClientRect((data) => {
            console.log(data)
            bgImg = data
            this.getPage(bgImg)
          })
          .exec()
      },
      // 获取二维码base64
      async codeToImg(res) {
        console.log(res)
        await this.$refs.qrcode.toTempFilePath({
          success: (rec) => {
            console.log(rec)
            this.qrcodeImg = rec.tempFilePath
          },
        })
        console.log(this.qrcodeImg)
      },
      async shareItem(item) {
        // #ifdef H5
        if (!isWeiXin()) {
          this.$u.toast('请在微信中打开！')
          return
        }
        await this.default_init_func({ link: this.shareLink })
        this.showMask = true
        // #endif
        // #ifdef APP-PLUS
        if (item.type !== 'savePoster') {
          shareWeixin({
            scene: item.type,
            path: this.shareLink,
            imageUrl: this.shareImg,
          })
            .then((res) => {
              console.log('res分享', res)
            })
            .catch((err) => {
              console.log('shareWeixinErr', err)
            })
        } else {
          this.test2()
        }
        // #endif
      },
    },
    //监听页面加载，其参数为上个页面传递的数据，参数类型为 Object
    async onLoad(opt) {
      console.log(opt)
      if (opt.params) {
        this.shareLink = devConf.shareBaseUrl + opt.router + '?data=' + opt.params
      }
      if (opt.code) {
        this.shareLink = devConf.shareBaseUrl + opt.router + '?code=' + opt.code
      }
      // this.shareLink = 'http://testm.fdjcyl.com/p/p?p={"p1":"169731256794349568","p2":"171205653136801792","p15":"171205653136801792","p16 ":"171205653136801792","p3":"13212344322","p4":"13212344322","p5":"supplier","p6": "123321","p7":"132123544322","p8":"13212344322","p9":"13212344322"}'
      // if (opt.type) {
      //   // 技术工分享海报
      //   this.type = 2
      // }
      // #ifdef H5
      await this.default_init_func({ link: this.shareLink })
      // #endif
      console.log(uni.getSystemInfo())
    },
  }
</script>
<style scoped lang="scss">
  .bg-red {
    background-color: #D71818;
  }
  .container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    .position-f {
      position: fixed;
      z-index: 10;
    }
    #bg {
      width: 100%;
      height: 1176rpx;
    }
  }
  .code {
    position: absolute;
    z-index: 1;
  }
  .share {
    background-color: #fff;
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
  }
  .bgBox {
    background-color: #D71818;
    //min-height: 1176rpx;
    //height: 100%;
  }
  .mask {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.65);
    z-index: 100000;
    .maskImg {
      float: right;
      width: 560rpx;
      height: 320rpx;
    }
  }
</style>
