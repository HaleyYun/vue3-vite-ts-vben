<template>
  <view class="talk p-t-20">
    <u-transition :show="isBlur" mode="fade-up">
      <view class="transition">
        <view class="vw-full flex flex-column">
          <!--   这个是预留的，对状态时解注释     <view v-if="listening" class="vw-full">-->
          <image class="wave" src="/static/garage/talk/wave2.png" />
          <image class="wave wave1" src="/static/garage/talk/wave2.png" />
          <image class="wave wave2" src="/static/garage/talk/wave2.png" />
        </view>
        <view class="listening color-ff5319 fz-36 m-t-100">请说，我在聆听...</view>
        <!--    这个是预留的，对状态时解注释    <view class="noVoice color-ff5319 fz-36">未检测到语音..</view>-->
        <view class="tip fz-24 color-block-45 text-center p-48">
          <text class="color-block">你可以试试：</text>
          <text>发动机什么时候能发货、我想买货、我想找售后、B15安装、我的货到哪了</text>
        </view>
      </view>
    </u-transition>
    <view class="href up" :class="{ blur: isBlur }">
      <view class="z1" :class="{ blur: isBlur }">
        <VoBatteryBar bg-color="transparent" />
        <SupplierTitle />
        <view class="talk-con">
          <view class="talk-con__search flex flex-vertical-c">
            <VoIcon
              :opacity="0.65"
              color="#000000"
              name="garage-search"
              @click="goTo('/pagesGarage/ShopList/ShopList')"
            />
            <view
              class="flex1 search-input"
              :class="voiceTurnText && voiceTurnText.length ? 'color-block' : 'color-block-25'"
              @click="goTo('/pagesGarage/ShopList/ShopList')"
              >{{ voiceTurnText || '请输入关键字搜索' }}</view
            >
            <VoIcon :opacity="0.65" color="#000000" name="scan-new" @click="vin" />
          </view>
        </view>
      </view>
      <image class="bgImg" src="/static/garage/talk/bg_top.png" />
      <view class="textBar">
        <view class="inner">
          <view class="animate">
            <text class="textItem" v-for="(item, index) in 30" :key="'a' + item + index">
              {{ text2[randomNum(text2)] }}
            </text>
            <text class="textItem" v-for="(item, index) in 30" :key="'b' + item + index">
              {{ text2[randomNum(text2)] }}
            </text>
          </view>
          <view class="animate speed1">
            <text class="textItem" v-for="(item, index) in 30" :key="'c' + item + index">
              {{ text3[randomNum(text3)] }}
            </text>
            <text class="textItem" v-for="(item, index) in 30" :key="'d' + item + index">
              {{ text3[randomNum(text3)] }}
            </text>
          </view>
          <view class="animate speed2">
            <text class="textItem" v-for="(item, index) in 30" :key="'e' + item + index">
              {{ text2[randomNum(text2)] }}
            </text>
            <text class="textItem" v-for="(item, index) in 30" :key="'f' + item + index">
              {{ text2[randomNum(text2)] }}
            </text>
          </view>
          <view class="animate speed3">
            <text class="textItem" v-for="(item, index) in 30" :key="'g' + item + index">
              {{ text3[randomNum(text3)] }}
            </text>
            <text class="textItem" v-for="(item, index) in 30" :key="'h' + item + index">
              {{ text3[randomNum(text3)] }}
            </text>
          </view>
        </view>
      </view>
      <view class="btnBar" @click="vin">
        <image class="btnBar-img" src="/static/garage/talk/vins.png" />
        <view class="btnBar-btn">扫一扫</view>
      </view>
    </view>
    <view class="href down">
      <image class="bgImg" :class="{ blur: isBlur }" src="/static/garage/talk/bg_bottom.png" />
      <view class="textBar" :class="{ blur: isBlur }">
        <view class="inner">
          <view class="animate">
            <text class="textItem" v-for="(item, index) in 30" :key="'i' + item + index">
              {{ text3[randomNum(text3)] }}
            </text>
            <text class="textItem" v-for="(item, index) in 30" :key="'j' + item + index">
              {{ text3[randomNum(text3)] }}
            </text>
          </view>
          <view class="animate speed1">
            <text class="textItem" v-for="(item, index) in 30" :key="'k' + item + index">
              {{ text2[randomNum(text2)] }}
            </text>
            <text class="textItem" v-for="(item, index) in 30" :key="'l' + item + index">
              {{ text2[randomNum(text2)] }}
            </text>
          </view>
          <view class="animate speed2">
            <text class="textItem" v-for="(item, index) in 30" :key="'m' + item + index">
              {{ text3[randomNum(text3)] }}
            </text>
            <text class="textItem" v-for="(item, index) in 30" :key="'n' + item + index">
              {{ text3[randomNum(text3)] }}
            </text>
          </view>
          <view class="animate speed3">
            <text class="textItem" v-for="(item, index) in 30" :key="'o' + item + index">
              {{ text2[randomNum(text2)] }}
            </text>
            <text class="textItem" v-for="(item, index) in 30" :key="'p' + item + index">
              {{ text2[randomNum(text2)] }}
            </text>
          </view>
        </view>
      </view>
      <!-- @longpress="onStartRecoder" @touchend="onEndRecoder"  @click="getLink('和木子聊天')" -->
            <view class="btnBar notBlur" @longpress="onStartRecoder" @touchend="onEndRecoder">
<!--      <view class="btnBar notBlur" @click="getLink('给我来一台B15')">-->
        <image class="btnBar-img" src="/static/garage/talk/mic.png" />
        <!-- <VoLottie style="width: 270rpx; height: 270rpx" :option="offOnOption" ref="lottie" /> -->

        <view class="btnBar-btn">按住说话</view>
      </view>
    </view>
    <view
      v-if="
        Number(currentUserFullInfo.checkStatus) === -1 ||
        Number(currentUserFullInfo.checkStatus) === 0
      "
      class="suspension flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="suspension__tips">当前为游客模式，体验更多功能，请先进行认证</view>
      <view class="suspension__button" @click="agentApproveFn">立即认证</view>
    </view>
    <view
      v-else-if="Number(currentUserFullInfo.checkStatus) === 4"
      class="suspension flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="suspension__tips">为保障认证信息是本人真实操作，请验证手机号</view>
      <view class="suspension__button" @click="agentApproveFn">去验证</view>
    </view>
    <view
      v-else-if="Number(currentUserFullInfo.checkStatus) === 2"
      class="suspension flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="suspension__tips m-l-16">认证未通过，请重新进行认证。</view>
      <view class="suspension__button" @click="agentApproveFn">立即认证</view>
    </view>
    <view
      v-else-if="Number(currentUserFullInfo.checkStatus) === 1"
      class="suspension flex flex-vertical-c flex-justify-between m-b-safe-area"
    >
      <view class="suspension__tips m-l-16">信息正在认证审核中，请耐心等待...</view>
      <view class="suspension__button bg" @click="agentApproveFn">审核中</view>
    </view>
    <!--  底部悬浮end  -->
    <!--    <VoComplaintAction ref="complaintRef" />-->
    <EraApproveModal :show.sync="showApprove" />
    <VoHelpAction ref="helpRef" />
  </view>
</template>
<script>
  import SupplierTitle from '@/pages/GarageCenter/components/WorkbenchComponents/SupplierTitle'
  import {
    uploadMp3,
    chooseImageOcrByPromise,
    goOnlineCustomerFn,
    showLoading,
    hideLoading,
    linkToEasy,
    vocenCameraFn,
  } from '@/common/helper'
  const garageRecorderManager = uni.getRecorderManager()
  import permission, { gotoAppPermissionSetting } from '@/common/permission'
  import store from '@/store'
  export default {
    name: 'TabbarSearch',
    components: {
      SupplierTitle,
    },
    data() {
      return {
        isBlur: false, // 是否底层蒙层展示
        // 0是默认  1录制中  2录制完毕
        recordTime: 0,
        text2: [
          '我买的东西到哪了？', // 蓝
          '查看我的待发货', // 蓝
          '去买东西', // 蓝
          '去看商品', // 蓝
          '需要退货退款', // 蓝
          '售后情况', // 蓝
          '需要售后', // 蓝
          '看回收', // 蓝
          '发起回收', // 蓝
          '安装情况', // 蓝
          '申请安装', // 蓝
          '需要帮助', // 蓝
          '需要技术支持', // 蓝
          '安装情况',
          '发起售后',
          '申请售后',
          '去回收订单',
          '查看我的回收订单',
          '去发起回收',
          '去回收',
          '去安装订单',
          '安装订单',
          '安装单',
        ],
        text3: [
          '去待收货',
          '我的待收货',
          '收货',
          '去待发货',
          '我有没有没发货的产品',
          '发货',
          '商品列表',
          '去购买',
          '商品',
          '去退货退款',
          '发起退货退款',
          '去售后列表',
          '售后进度',
          '去发起售后',
          '去发起安装申请',
          '需要安装',
          '安装',
          '去帮助中心',
          '帮助中心',
          '去技术指导',
          '需要支持',
          '技术支持',
        ],
        finish: 0,
        reDate: '00:00',
        sec: 0,
        min: 0,
        voicePath: '',
        playProgress: 100,
        playTimer: null,
        timer: null,
        playStatus: false,
        maximum: 10000,
        duration: 20,

        voiceTurnText: '',
        videoVoicePath: '',
        videoVoiceData: {},
        offOnOption: {
          path: require('./video-Tags.json'),
          autoplay: true,
          loop: true,
        },
        currentUserFullInfo: {},
        showApprove: false,
        scanCount: 0,
        // 是否可录音（页面是否加载完成监听）
        canRecorde: false,
        scanData: null,
        dockingPeopleData: {},
      }
    },
    computed: {
      // 录制时间计算
      calcProgress() {
        return ((this.sec + this.min * 60) / this.maximum) * 100
      },
    },
    // created() {
    //   this.initPage()
    // },
    methods: {
      goTo(url) {
        this.voiceTurnText = ''
        this.$linkToEasy(url+'?state=1')
      },
      // 监听
      async onMonitorEvents() {
        console.log('==============================================')
        let a
        uni.hideLoading()
        if (uni.getSystemInfoSync().platform == 'ios') {
          // console.log(permissionStatus)
          console.log(a)
          var avaudiosession = plus.ios.import('AVAudioSession')
          var avaudio = avaudiosession.sharedInstance()
          await avaudio.requestRecordPermission((res) => {
            console.log('回调完成', res)
            const status = avaudio.recordPermission()
            if (+status !== 1684369017 && +status !== 1970168948 && !this.canRecorde) {
              this.canRecorde = true
              console.log('binded', new Date().getTime())
              console.log(this.canRecorde)
              // 录制开始
              garageRecorderManager.onStart(() => {
                this.finish = 1
                // uni.showLoading({
                //   title: '录制中...',
                // })
                this.startDate()
                console.log('开始录制')
                // this.$emit('start')
              })
              // 录制结束
              garageRecorderManager.onStop(({ tempFilePath }) => {
                this.finish = 2
                this.voicePath = tempFilePath
                // this.downloadFile(tempFilePath)
                clearInterval(this.timer)
                uni.hideLoading()
                this.closeBlur()
                console.log('录制结束', this.voicePath, this.sec)
                this.uploadVoice()
                // this.$emit('end')
              })
            }
          })
          a = await permission.judgeIosPermission('record')
          if (!a) {
            return
          }
        } else {
          a = await permission.requestAndroidPermission('android.permission.RECORD_AUDIO')
          console.log(a)
          if (!a) {
            return
          }
          // 永久拒绝
          if (a === -1) {
            uni.showModal({
              title: '提示',
              content: '请去设置打开麦克风权限',
              success: function (res) {
                if (res.confirm) {
                  permission.gotoAppPermissionSetting()
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              },
            })
            return
          }
        }
        this.canRecorde = true
        console.log('binded', new Date().getTime())
        console.log(this.canRecorde)
        // 录制开始
        garageRecorderManager.onStart(() => {
          this.finish = 1
          // uni.showLoading({
          //   title: '录制中...',
          // })
          this.startDate()
          console.log('开始录制')
          // this.$emit('start')
        })
        // 录制结束
        garageRecorderManager.onStop(({ tempFilePath }) => {
          this.finish = 2
          this.voicePath = tempFilePath
          // this.downloadFile(tempFilePath)
          clearInterval(this.timer)
          uni.hideLoading()
          this.closeBlur()
          console.log('录制结束', this.voicePath, this.sec)
          this.uploadVoice()
          // this.$emit('end')
        })
      },
      closeBlur() {
        this.isBlur = false
        this.finish = 0
      },
      async initPage() {
        this.canRecorde = false
        this.closeBlur()
        console.log('this.isBlur', this.isBlur)
        console.log('mounted', new Date().getTime())
        uni.showLoading({ title: '页面加载中' })
        // await this.onMonitorEvents()
        // console.log(this.userInfo)
        this.currentUserFullInfo = Object.assign({}, this.userInfo)
        if (this.userInfo.checkStatus === 3) {
          // 监听
          await this.onMonitorEvents()
          this.getDockingPeopleRequest()
        }
      },
      //获取对接人信息
      getDockingPeopleRequest() {
        this.$VoHttp
          .apiCompanyInvitationAgentByGarage({}, { noLoading: true })
          .then((res) => {
            if (res.code === '20001') {
              this.dockingPeopleData = res.data
            } else {
              console.log('获取对接人信息失败', res.message)
            }
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请检查网络')
          })
          .finally(() => {
            uni.hideLoading()
          })
      },
      // 扫一扫
      async vin() {
        if (!this.$checkIsApproveFn()) {
          this.showApprove = true
          return
        }
        this.voiceTurnText = ''
        let res = null

        // #ifdef APP-PLUS
        res = await vocenCameraFn('/v1/api/business/vehicle/scan/vinoreno')
        // #endif
        // #ifndef APP-PLUS
        res = await chooseImageOcrByPromise({
          count: 1,
          sizeType: ['compressed'],
          tip: '正在识别',
          apiUrl: '/v1/api/business/vehicle/scan/vinoreno',
        })
        res.type = 'scan'
        // #endif

        if (res && res.data) {
          let data = JSON.parse(res.data)
          this.scanData = data
          this.voiceTurnText = data.data.code
          if (+data.data.scanResultType === 1) {
            // 商品
            if (data.data && data.data.imageInfoVO && data.data.imageInfoVO.filePath) {
              this.$storage.set('imageInfoVO', data.data.imageInfoVO)
            }
            this.$linkToEasy(
              `/pagesGarage/GlobalSearch/QueryResult?code=${data.data.code}&type=${
                res.type
              }&imageInfoVO=${
                data.data && data.data.imageInfoVO && data.data.imageInfoVO.filePath
                  ? data.data.imageInfoVO.filePath
                  : ''
              }`,
            )
          } else if (+data.data.scanResultType === 2) {
            // 售后
            this.$linkToEasy(`/pagesGarage/GlobalSearch/AfterSalesService?code=${data.data.code}`)
          } else {
            this.$linkToEasy(
              '/pagesGarage/GlobalSearch/UpdateVin?imageInfoVO=' +
                (data.data && data.data.imageInfoVO && data.data.imageInfoVO.filePath
                  ? data.data.imageInfoVO.filePath
                  : '') +
                '&type=2',
            )
          }
        }
      },
      // 错误逻辑判断及捕获
      errCatch() {
        this.$u.toast('未识别成功，正在跳转人工客服')
        console.log(this.scanData)
        setTimeout(() => {
          if (!this.scanData) {
            goOnlineCustomerFn()
            return
          }
          if (this.dockingPeopleData && this.dockingPeopleData.userId) {
            // 服务商数据
            let info = {
              targetId: this.dockingPeopleData.userId,
              type: 0,
              note: this.dockingPeopleData.storeName,
              platformCode: this.dockingPeopleData.platformCode,
              picData: this.scanData.data.imageInfoVO,
            }
            this.$storage.set('temp_im_room_info', info)
            this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
          } else {
            goOnlineCustomerFn()
          }
        }, 1000)
      },
      // async vin() {
      //   if (!this.$checkIsApproveFn()) {
      //     this.showApprove = true
      //     return
      //   }
      //   try {
      //     const res = await chooseImageOcrByPromise({
      //       count: 1,
      //       sizeType: ['original'],
      //       tip: '正在识别',
      //       apiUrl: '/v1/api/business/vehicle/brand/cylinderOcr',
      //     })
      //     if (res && res.data) {
      //       let data = JSON.parse(res.data)
      //       this.voiceTurnText = data.data
      //       // this.getLink(this.voiceTurnText)
      //       // 走另一个接口，判断是否有订单
      //       let rec = await this.$VoHttp.apiBusinessVehicleBrandOcrGoods({
      //         code: data.data,
      //       })
      //       if (rec && rec.data) {
      //         if (+rec.data.scanType === 1) {
      //           // 商品
      //           this.$linkToEasy(`/pagesGarage/GlobalSearch/QueryResult?code=${data.data}`)
      //         } else if (+rec.data.scanType === 2) {
      //           // 售后
      //           this.$linkToEasy(`/pagesGarage/GlobalSearch/AfterSalesService?code=${data.data}`)
      //         } else {
      //           this.scanCount++
      //           if (this.scanCount === 1) {
      //             this.$u.toast('未识别成功，请重新扫描')
      //           } else if (this.scanCount === 2) {
      //             this.$u.toast('未识别成功，正在跳转人工客服')
      //             setTimeout(() => {
      //               goOnlineCustomerFn()
      //             }, 1000)
      //           }
      //         }
      //       } else {
      //         this.scanCount++
      //         if (this.scanCount === 1) {
      //           this.$u.toast('未识别成功，请重新扫描')
      //         } else if (this.scanCount === 2) {
      //           this.$u.toast('未识别成功，正在跳转人工客服')
      //           setTimeout(() => {
      //             goOnlineCustomerFn()
      //           }, 1000)
      //         }
      //       }
      //       // console.log(rec);
      //
      //     } else {
      //       console.log(this.scanCount)
      //       this.scanCount++
      //       if (this.scanCount === 1) {
      //         this.$u.toast('未识别成功，请重新扫描')
      //       } else if (this.scanCount === 2) {
      //         this.$u.toast('未识别成功，正在跳转人工客服')
      //         setTimeout(() => {
      //           goOnlineCustomerFn()
      //         }, 1000)
      //       }
      //     }
      //   } catch (err) {
      //     if (err.message) {
      //       this.scanCount++
      //       if (this.scanCount === 1) {
      //         this.$u.toast('未识别成功，请重新扫描')
      //       } else if (this.scanCount === 2) {
      //         this.$u.toast('未识别成功，正在跳转人工客服')
      //         setTimeout(() => {
      //           goOnlineCustomerFn()
      //         }, 1000)
      //       }
      //     } else {
      //       this.$u.toast('当前网络不可用，请检查您的网络设置。')
      //     }
      //   }
      //   hideLoading()
      // },
      // 随机数生成
      randomNum(list) {
        // 20 + Math.random() * (30-20)
        return parseInt(Math.random() * (list.length - 1), 10)
      },
      // test() {
      //   this.isBlur = !this.isBlur
      // },
      // 录制结束
      onEndRecoder() {
        console.log('录制结束end')
        if (!this.$checkIsApproveFn()) {
          uni.hideLoading()
          this.closeBlur()
          this.showApprove = true
          return
        }
        garageRecorderManager.stop()
      },
      // 开始录制
      async onStartRecoder() {
        this.voiceTurnText = ''
        this.closeBlur()
        if (!this.$checkIsApproveFn()) {
          uni.hideLoading()
          this.closeBlur()
          this.showApprove = true
          return
        }
        console.log('开始录制', this.isBlur)
        if (this.isBlur) return
        console.log(this.canRecorde)
        if (!this.canRecorde) {
          await this.onMonitorEvents()
          return
        }
        this.isBlur = true
        this.finish = 1
        garageRecorderManager.start({
          duration: this.maximum * 1000,
        })
      },

      downloadFile(url) {
        console.log(url)
        uni.saveFile({
          tempFilePath: url,
          success: (red) => {
            console.log(1, red.savedFilePath)
            uni.showToast({
              icon: 'none',
              mask: true,
              title: '文件已保存：' + red.savedFilePath, //保存路径
              duration: 3000,
            })
            setTimeout(() => {
              //打开文档查看
              uni.openDocument({
                filePath: red.savedFilePath,
                success: function (res) {
                  console.log('打开文档成功')
                },
              })
            }, 3000)
          },
          fail: (err) => {
            console.log(err)
          },
        })
      },
      // 录音计时
      startDate() {
        console.log(this.isBlur)
        clearInterval(this.timer)
        this.sec = 0
        this.min = 0
        this.timer = setInterval(() => {
          this.sec += this.duration / 1000
          if (this.sec >= 60) {
            this.min++
            this.sec = 0
          }
          this.resetDate()
        }, this.duration)
      },
      // 播放时间
      resetDate() {
        let _s = this.sec < 10 ? '0' + parseInt(this.sec) : parseInt(this.sec)
        let _m = this.min < 10 ? '0' + this.min : this.min
        this.reDate = _m + ':' + _s
        this.recordTime = parseInt(this.min) * 60 + parseInt(this.sec)
        // console.log(this.recordTime, parseInt(this.min) * 60, parseInt(this.sec))
      },
      //上传语音
      async uploadVoice() {
        if (Math.trunc(this.sec) < 1) {
          uni.$u.toast('录入语音时长过短~~')
          uni.hideLoading()
          this.closeBlur()
          return
        }
        try {
          let res = await uploadMp3({
            url: this.voicePath,
            name: 'audio.mp3',
            isPath: true,
            tip: '努力搜索中...',
            mask: true,
            // 优化为一个接口的逻辑注释
            api: '/v1/api/message/record/audioToText',
          })
          console.log(res)
          // console.log('语音res.fileNameUrl', res.fileNameUrl)
          // this.videoVoicePath = res.fileNameUrl
          // this.videoVoiceData = res
          // uni.hideLoading()
          // console.log('语音path', this.videoVoicePath)
          // this.RecordAudioText()
          // 优化为一个接口的逻辑注释
          if (!res || !res.data) {
            uni.hideLoading()
            this.closeBlur()
            this.$u.toast('网络连接失败')
            return
          }
          const { code, data } = res
          if (+code === 20001) {
            this.voiceTurnText = data.join('')
            await this.getLink(this.voiceTurnText)
          } else {
            uni.hideLoading()
            this.closeBlur()
            this.$u.toast('网络连接失败')
            // uni.$u.toast('暂未匹配到相关功能~~')
          }
        } catch (err) {
          uni.hideLoading()
          this.closeBlur()
          console.log('err语音', err)
          this.$u.toast(err.message || '网络连接失败')
        }
      },
      // 语音转文字 apiMessageRecordAudioText
      async RecordAudioText() {
        console.log('语音转文字')
        // uni.showLoading({
        //   title: '识别中...',
        //   mask: true,
        // })
        try {
          // if (this.turnLoading) {
          // 	return
          // }
          // this.turnLoading = true
          const res = await this.$VoHttp.IM.apiMessageRecordAudioToTextFromUrl(
            {
              filePath: this.videoVoicePath,
            },
            { noLoading: true },
          )
          uni.hideLoading()
          if (!res || !res.data) {
            this.closeBlur()
            return
          }
          const { code, data } = res
          console.log(code)
          console.log(data, '识别数据')
          // this.turnLoading = false
          if (+code === 20001) {
            // console.log('语音转文字log', data.join(''))
            // let voiceTurnText = data.join('')
            // let i = 0
            // let timer = setInterval(() => {
            //   this.voiceTurnText = voiceTurnText.substring(0, i)
            //   i++
            //   console.log(this.voiceTurnText)
            //   if (this.voiceTurnText.length == voiceTurnText.length) {
            //     clearInterval(timer)
            //   }
            // }, 60)
            this.voiceTurnText = data.join('')
            this.getLink(this.voiceTurnText)
          } else {
            this.closeBlur()
            uni.$u.toast('暂未匹配到相关功能~~')
          }
        } catch (e) {
          this.closeBlur()
          console.log('语音转文字失败', e)
          // uni.$u.toast('暂未匹配到相关功能~~')
          uni.$u.toast(e.message || '网络连接失败')
        }
      },
      // 文字识别，获取跳转路径
      async getLink(name) {
        console.log('文字识别，获取跳转路径', name)
        // uni.showLoading({
        //   title: '识别中...',
        //   mask: true,
        // })
        try {
          // const res = await this.$VoHttp.apiContentFunctionRouteRoute(
          //   { name },
          //   { noLoading: true },
          // )
          const res = await this.$VoHttp.apiAclSearchEntrance(
            { word: name },
            { noLoading: true, noPrefix: true },
          )
          console.log(res)

          uni.hideLoading()
          this.closeBlur()
          if (!res || !res.data) return
          // return
          const { data } = res
          // this.$toast('识别成功，正在跳转...', 'success', '/static/icons/success_icon.png')
          let url = ''
          if (data.routePath) {
            url = data.routePath
            if (url !== 'im_platform_telephone') {
              this.$u.toast('识别成功，正在跳转...')
            }
            if (url === '/pagesGarage/InstallOrder/InstallSupport') {
              let info = this.$storage.get('noInstallNotice')
              if (info && info.userId === this.userInfo.id && info.noInstallNotice) {
                this.$linkToEasy('/pagesGarage/InstallOrder/InstallOrderList?origin=home')
              } else {
                this.$linkToEasy(url + '?origin=voice')
              }
            } else if (url === 'im_platform_customer_service') {
              //平台客服
              await goOnlineCustomerFn()
            } else if (url === 'im_after_sales_customer_service') {
              //售后客服
              await goOnlineCustomerFn(2)
            } else if (url === 'im_complaint_customer_service') {
              //投诉客服
              await goOnlineCustomerFn(3)
            } else if (url === 'im_platform_telephone') {
              // 打开客服弹窗
              this.$refs.helpRef.open()
            } else if (url === '/pagesSupplier/ImMessage/PersonalChat' || url === 'im_agent') {
              // 跳转聊天页面 上传文件获取路径
              if (this.videoVoiceData) {
                let result = await uploadMp3({
                  url: this.voicePath,
                  name: 'audio.mp3',
                  isPath: true,
                  tip: '识别中...',
                  mask: true,
                })
                this.videoVoicePath = result.fileNameUrl
                this.videoVoiceData = result
              }
              const info = {
                targetId: res.data.records.userId,
                type: 0,
                note: '',
                platformCode: res.data.records.platformCode,
                videoVoiceData: this.videoVoiceData,
              }
              this.$storage.set('temp_im_room_info', info)
              // setTimeout(() => {
              //   this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
              // }, 1000)
              this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
            } else {
              this.$storage.set('voiceRecords', res.data)
              // if (url === '/pagesGarage/ShopList/ShopList') {
                // this.$storage.set('voiceRecords', res.data)
              // }
              // setTimeout(() => {
              //   if (url.indexOf('?') !== -1) {
              //     this.$linkToEasy(url + '&origin=voice')
              //   } else {
              //     this.$linkToEasy(url + '?origin=voice')
              //   }
              // }, 1000)
              if (url.indexOf('?') !== -1) {
                this.$linkToEasy(url + '&origin=voice')
              } else {
                this.$linkToEasy(url + '?origin=voice')
              }
            }
          } else {
            this.closeBlur()
            uni.hideLoading()
            let info
            console.log(data, '我是语音识别·数据')
            if (data.agentUserId) {
              // 服务商数据
              info = {
                targetId: data.agentUserId, // 聊天对象用户id
                type: 0,
                note: data.agentName, // 聊天对象用户名称
                platformCode: 'agent', // 聊天对象用户角色
                videoVoiceData: this.videoVoiceData, // 要传进来整个语音数据需要时长
              }
              this.$storage.set('temp_im_room_info', info)
              url = '/pagesSupplier/ImMessage/PersonalChat'
              // setTimeout(() => {
              //   this.$linkToEasy(url)
              // }, 1500)
              this.$linkToEasy(url)
            } else if (data.managerUserId) {
              // 渠道经理数据
              info = {
                targetId: data.managerUserId, // 聊天对象用户id
                type: 0,
                note: data.managerName, // 聊天对象用户名称
                platformCode: 'channelManager', // 聊天对象用户角色
                videoVoiceData: this.videoVoiceData,
              }
              url = '/pagesSupplier/ImMessage/PersonalChat'
              // setTimeout(() => {
              //   this.$linkToEasy(url)
              // }, 1500)
              this.$linkToEasy(url)
            } else {
              this.$u.toast(data.message || '未识别出内容~~')
              // this.$u.toast('未识别成功，正在跳转人工客服')
              // 跳转客服
              // setTimeout(() => {
              //   goOnlineCustomerFn()
              // }, 1500)
            }
          }
        } catch (e) {
          this.closeBlur()
          uni.hideLoading()
          console.log(e)
          uni.$u.toast(e.message || '网络错误')
        }
      },
      /**
       * @description 服务商认证跳转
       */
      agentApproveFn() {
        // 0：资料未提交，1:审核中 ，2：审核拒绝 ，3：认证成功，4：绑定手机号
        if (+this.userInfo.checkStatus === 0) {
          //修理厂只有个人类型
          linkToEasy('/pages/AuthenticationInformation/GarageAccounts')
          return
        } else if (+this.userInfo.checkStatus === 4) {
          linkToEasy('/pagesCommon/AuthorityManagement/BindTonlyPhone')
          return
        } else if (this.userInfo.checkStatus === -1) {
          this.showApprove = true
          return
        }
        if (this.userInfo.roleCode == 'garage') {
          linkToEasy('/pagesGarage/StoreInfo/ApproveInfo')
          return
        }
      },
    },
    //监听页面隐藏
    onHide() {
      clearInterval(this.timer)
      this.timer = null
    },
    //监听页面卸载
    onUnload() {
      clearInterval(this.timer)
      this.timer = null
    },
  }
</script>
<style lang="scss" scoped>
  .transition {
    position: fixed;
    width: 100vw;
    height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    z-index: 10;
    top: 0;
    left: 0;
  }
  .color-ff5319 {
    color: #ff5319;
  }
  .wave {
    width: 3000rpx;
    height: 18rpx;
    animation: wave 2s linear infinite;
  }
  .wave1 {
    opacity: 0.4;
    animation: wave1 3s linear infinite;
  }
  .wave2 {
    opacity: 0.2;
    animation: wave2 5s linear infinite;
  }
  @keyframes wave {
    0% {
      left: 0;
    }
    50% {
      left: -50%;
    }
    100% {
      left: -100%;
    }
  }
  @keyframes wave1 {
    0% {
      left: -100%;
    }
    50% {
      left: -50%;
    }
    100% {
      left: 0;
    }
  }
  @keyframes wave2 {
    0% {
      left: -50%;
    }
    50% {
      left: -100%;
    }
    100% {
      left: 0;
    }
  }
  .blur {
    filter: blur(20px);
  }
  .notBlur {
    filter: blur(0);
    z-index: 20;
  }
  .animate {
    font-size: 24rpx;
    color: #ffa98c;
    display: flex;
    flex-wrap: nowrap;
    width: fit-content;
    animation: 40s wordsLoop linear infinite normal;
    &.speed1 {
      animation: 38s wordsLoop linear infinite normal;
    }
    &.speed2 {
      animation: 41s wordsLoop linear infinite normal;
    }
    &.speed3 {
      animation: 43s wordsLoop linear infinite normal;
    }
    .textItem {
      white-space: nowrap;
      padding: 4rpx 16rpx;
      border-radius: 100rpx;
      margin-right: 16rpx;
      background-color: rgba(255, 255, 255, 0.65);
    }
    .textItem:nth-last-of-type(1) {
      margin-right: 0;
    }
  }
  @keyframes wordsLoop {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  .talk {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow-x: hidden;
    .z1 {
      z-index: 1;
      position: relative;
    }
    &-con {
      padding: 40rpx 32rpx;
      box-sizing: border-box;

      &__search {
        background: #fff;
        padding: 20rpx 16rpx;
        height: 48rpx;
        box-shadow: 0rpx 8rpx 22rpx rgba(248, 228, 218, 0.45);
        border-radius: 8 rpx;

        .search-input {
          font-size: 28rpx;
          margin-left: 16rpx;
        }
      }
    }
    .href {
      position: fixed;
      width: 100vw;
      height: 50vh;
      left: 0;
      overflow: visible;
      .btnBar {
        position: absolute;
        left: 240rpx;
        text-align: center;
        z-index: 1;
        margin-top: -15rpx;
        #voiceCanvas,
        #vinCanvas {
          width: 270rpx;
          height: 270rpx;
        }
        &-img {
          width: 270rpx;
          height: 270rpx;
        }
        &-btn {
          padding: 20rpx 40rpx;
          font-weight: 500;
          font-size: 40rpx;
          color: rgba(0, 0, 0, 0.85);
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0 8rpx 30rpx rgba(255, 148, 72, 0.15);
          border-radius: 200rpx;
          margin-top: -20rpx;
        }
      }
      .textBar {
        position: absolute;
        left: 0;
        padding: 0 40rpx;
        box-sizing: border-box;
        width: 100%;
        overflow: hidden;
        opacity: 0.45;
        .inner {
          height: 304rpx;
          overflow: hidden;
          box-sizing: border-box;
          display: flex;
          justify-content: space-around;
          flex-direction: column;
          box-shadow: 0 0 120rpx #ffffff inset;
        }
      }
      &.up {
        top: 0;
        .textBar {
          bottom: 50rpx;
        }
      }
      &.down {
        bottom: 0;
        .btnBar {
          top: 132rpx;
        }
        .textBar {
          top: 150rpx;
        }
      }
      .bgImg {
        position: absolute;
        width: 100vw;
        height: 50vh;
        left: 0;
        top: 0;
        z-index: 0;
      }
    }
    .suspension {
      z-index: 99;
      position: fixed;
      bottom: 172rpx;
      left: 32rpx;
      width: 686rpx;
      height: 88rpx;
      background: rgba(0, 0, 0, 0.65);
      border-radius: 62rpx;
      padding: 0 16rpx;
      box-sizing: border-box;
      &__tips {
        font-size: 24rpx;
        color: #ffffff;
      }
      &__button {
        color: #fff;
        background: #ff5319;
        border-radius: 30rpx;
        font-size: 24rpx;
        width: 130rpx;
        height: 56rpx;
        line-height: 56rpx;
        text-align: center;
        &.bg {
          background: #ff9b05;
        }
      }
    }
  }
</style>
