<template>
  <view class="search flex flex-column">
    <!--  搜索  -->
    <VoBatteryBar />
    <view class="search-search flex flex-vertical-c">
      <VoIcon
        :opacity="0.45"
        :size="24"
        class="m-r-24"
        color="#000"
        name="left-arrow"
        @click="$backFn"
      />
      <VoSearch
        v-model.trim="keyword"
        placeholder="请输入搜索"
        height="34"
        :actionStyle="{ color: '#FF5319' }"
        @custom="goResult"
        @search="goResult"
      >
        <block slot="leftIcon">
         <view     @click="vin">
           <VoIcon
               class="m-r-20"
               color="#FF5319"
               name="scan"
           />
         </view>
        </block>
        <block slot="suffix">
          <view class="flex flex-vertical-c" @click="upspringFn">
            <VoIcon
              :opacity="0.65"
              class="mx-14"
              color="#000"
              name="voice-line"
            />
          </view>
        </block>
      </VoSearch>
    </view>
    <view class="search-con flex1">
      <!--      <view class="search-con__appoint">-->
      <!--        <view class="appoint-title">搜索指定内容</view>-->
      <!--        <view class="flex flex-vertical-c flex-wrap">-->
      <!--          <view-->
      <!--            class="appoint-box"-->
      <!--            v-for="(item, index) of appointList"-->
      <!--            :key="index"-->
      <!--            @click="goSearchResult(item)"-->
      <!--          >-->
      <!--            {{ item }}-->
      <!--          </view>-->
      <!--        </view>-->
      <!--      </view>-->
      <view class="search-con__appoint">
        <view class="appoint-title flex flex-justify-between flex-vertical-c">
          <view class="fz-b fz-32 lh150 color-block">搜索历史</view>
          <view class="flex flex-vertical-c" @click="showDeleteHistory = true">
            <view class="fz-28 color-block-45 m-r-4">清除</view>
            <VoIcon :opacity="0.45" :size="16" name="delete" />
          </view>
        </view>
        <view class="flex flex-vertical-c flex-wrap">
          <view
            v-for="(info, index) of historyList"
            :key="index"
            class="appoint-box"
            @click="goSearchResult(info)"
          >
            {{ info }}
          </view>
        </view>
      </view>
    </view>
    <view v-show="recording" class="position-f">
      <RecordingPanel ref="recordingPanel" @confirm="confirmFn" @close="recording = false" />
      <view class="safearea-box" />
    </view>
    <u-modal
      v-if="showDeleteHistory"
      closeOnClickOverlay
      show
      showCancelButton
      width="640rpx"
      @cancel="showDeleteHistory = false"
      @close="showDeleteHistory = false"
      @confirm="emptyFn"
    >
      <view class="phone-modal">确定要删除历史搜索记录吗？</view>
    </u-modal>
  </view>
</template>

<script>
  import RecordingPanel from '@/businessComponents/CreatedCenter/RecordingPanel.vue'
  import { chooseImageOcrByPromise, uploadMp3 } from '@/common/helper'
  import permission from "@/common/permission";

  export default {
    name: 'SearchPage',
    components: { RecordingPanel },
    data() {
      return {
        showDeleteHistory: false,
        recording: false,
        keyword: '', // 搜索双向绑定
        // appointList: ['联系人', '联天记录'],
        historyList: [
          // '汽配技术大咖',
          // '王老板',
          // '汽配技术大咖',
          // '汽配技术大咖',
          // '汽配技术大咖',
          // '汽配技术大咖',
        ],
        loading: false,
      }
    },
    onLoad() {
      if (this.$storage.get('investment_list_histery')) {
        this.historyList = JSON.parse(this.$storage.get('investment_list_histery'))
      }
    },
    methods: {
      // 扫一扫
      vin() {
        chooseImageOcrByPromise({
          count: 1,
          sizeType: ['original'],
          tip: '正在识别',
          apiUrl: '/v1/api/business/vehicle/brand/ocr',
        })
          .then((res) => {
            console.log(res)
            const data = JSON.parse(res.data)
            if (+data.code === 20001) {
              if (data.data && data.data.length) {
                this.keyword = data.data
                this.goResult()
              }
            } else {
              this.$u.toast(data.message || '网络错误')
            }
          })
          .catch((err) => {
            if (!err.errMsg) {
              this.$u.toast(err.message || '网络错误')
            }
          })
      },
      confirmFn(path, duration) {
        console.log('duration', duration)
        if (this.loading) return
        if (Math.trunc(duration) < 1) {
          uni.$u.toast('录入语音时长过短~~')
          return
        }
        this.loading = true

        uploadMp3({ url: path, name: 'audio.mp3', isPath: true, tip: '上传中' })
          .then((res) => {
            console.log('语音path', res.fileNameUrl)
            this.RecordAudioText(res.fileNameUrl)
          })
          .catch((err) => {
            this.$u.toast(err.message || '网络错误')
          })
          .finally(() => {
            this.loading = false
            this.recording = false
          })
      },
      async RecordAudioText(mp3) {
        console.log('语音转文字')
        uni.showLoading({
          title: '识别中...',
        })
        try {
          const { data } = await this.$VoHttp.IM.apiMessageRecordAudioToTextFromUrl(
            {
              filePath: mp3,
            },
            { noLoading: true },
          )
          console.log(data, '识别数据')
          this.keyword = data.join('')
          this.goResult()
        } catch (e) {
          uni.hideLoading()
          console.log('语音转文字失败', e)
          uni.$u.toast(e.message || '暂未匹配到相关数据~~')
        }
      },
      // 弹起录音
      async upspringFn() {
        let a
        if (uni.getSystemInfoSync().platform == 'ios') {
          // console.log(permissionStatus)
          console.log(a)
          var avaudiosession = plus.ios.import('AVAudioSession')
          var avaudio = avaudiosession.sharedInstance()
          await avaudio.requestRecordPermission((res) => {
            console.log('回调完成', res)
            const status = avaudio.recordPermission()
            if (+status !== 1684369017 && +status !== 1970168948) {
              if (!this.recording && this.$refs.recordingPanel) {
                this.$refs.recordingPanel.reset()
              }
              this.recording = !this.recording
            }
          })
          a = await permission.judgeIosPermission('record')
          if (!a) {
            return
          } else {
            if (!this.recording && this.$refs.recordingPanel) {
              this.$refs.recordingPanel.reset()
            }
            this.recording = !this.recording
          }
        } else {
          a = await permission.requestAndroidPermission('android.permission.RECORD_AUDIO')
          console.log(a)
          if (!a) {
            return
          } else if (a === -1) {
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
          } else {
            if (!this.recording && this.$refs.recordingPanel) {
              this.$refs.recordingPanel.reset()
            }
            this.recording = !this.recording
          }
        }
      },
      goResult() {
        console.log(this.keyword)
        if (this.keyword) {
          if (this.historyList.indexOf(this.keyword) === -1) {
            this.historyList.unshift(this.keyword)
          }
          this.$storage.set('investment_list_histery', JSON.stringify(this.historyList))
          this.$linkToEasy(`/pagesAgent/InvestmentList/InvestmentList?keyword=${this.keyword}`)
        }
      },
      /**
       * 去搜索结果页
       */
      goSearchResult(info) {
        this.$linkToEasy(`/pagesAgent/InvestmentList/InvestmentList?keyword=${info}`)
      },
      /**
       * 清空历史搜索
       */
      emptyFn() {
        this.historyList = []
        this.$storage.set('investment_list_histery', JSON.stringify(this.historyList))
        this.showDeleteHistory = false
      },
    },
  }
</script>

<style lang="scss" scoped>
  .search {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    &-search {
      padding: 12rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
    }
    &-con {
      width: 750rpx;
      overflow-y: scroll;
      background: #ffffff;
      margin-top: 16rpx;
      &__appoint {
        padding: 32rpx;
        .appoint-title {
          height: 42rpx;
          line-height: 42rpx;
          font-size: 28rpx;
          color: $v-c0-85;
          font-weight: bold;
          margin-bottom: 40rpx;
        }
        .appoint-box {
          padding: 0 24rpx;
          height: 64rpx;
          line-height: 64rpx;
          text-align: center;
          background: rgba(0, 0, 0, 0.08);
          border-radius: 32rpx;
          font-size: 28rpx;
          margin-right: 24rpx;
          margin-bottom: 40rpx;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
    .position-f {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 10;
    }
  }
  .phone-modal {
    font-size: 28rpx;
    color: rgba(0, 0, 0, 0.85);
  }
</style>
