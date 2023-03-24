<template>
  <u-popup
    :show="visible"
    :close-on-click-overlay="false"
    mode="center"
    @close="close"
    @open="open"
  >
    <view class="w640 text-0 b-radius-10 overflow-hidden">
      <view class="update-inner b-radius-10 bg-white overflow-hidden">
        <view
          class="update-header flex flex-column flex-justify-c update-default h250 w-full"
          :style="{
            background: background,
            backgroundSize: '100% 100%',
          }"
        >
          <view class="p-l-50">
            <view class="text-40">{{ title }}</view>
            <view class="text-32 m-t-10">V{{ code }}</view>
          </view>
        </view>
        <view v-if="!loading" class="bg-white">
          <scroll-view scroll-y class="update-text bg-white">
            <view>
              <view v-for="(d, i) in descList" :key="i">{{ d }}</view>
            </view>
          </scroll-view>
          <view class="px-32">
            <view class="p-b-64 p-t-10">
              <u-button color="#FF5319" shape="circle" @click="refreshNow">
                <text class="text-32">立即更新</text>
              </u-button>
            </view>
          </view>
        </view>
        <view v-else class="px-32 bg-white progress-box">
          <view class="py-30 flex flex-vertical-c">
            <view class="progress flex1">
              <view
                class="progress-inner"
                :style="{
                  width: progress + '%',
                }"
              />
            </view>
            <view class="progress-text align-center">{{ progress }}%</view>
          </view>
          <view class="progress-desc">新版本正在努力更新中，请稍等</view>
        </view>
      </view>
      <view v-if="!isUpgrade && !loading" class="flex flex-justify-c m-t-48" @click="close">
        <view class="close-icon" />
      </view>
    </view>
  </u-popup>
</template>

<script>
  // 检查APP版本更新组件
  // 调用组件时，不需要做任何处理，直接调用即可
  // 所有相关逻辑功能均在组件内实现
  import { VoHttp } from '@/common/unifyGlobalReg'
  import { iosEnvVersion, androidEnvVersion } from '@/common/envVersion'

  export default {
    name: 'VoVersionUpdate',
    data() {
      return {
        visible: false,
        code: '0.0.0',
        type: 1,
        title: '版本更新标题',
        description: '描述信息',
        isUpgrade: 0,
        progress: 0,
        loading: false,
        loaded: 1,
        background: `url(https://dcp.fdjcyl.com/GongChuangJi/upgradeImg.png?t=${new Date().getTime()}) no-repeat center center`,
      }
    },
    computed: {
      descList() {
        return this.description.split('/')
      },
    },
    created() {
      // #ifdef APP-PLUS
      this.checkUpdateFn()
      this.loaded = this.$storage.get('onLaunchEd')
      // #endif
    },
    methods: {
      close() {
        this.$storage.set('onLaunchEd', 0)
        this.visible = false
      },
      open() {},
      refreshNow() {
        const code = this.code
        let platform = uni.getSystemInfoSync().platform
        if (platform === 'android' &&this.compareVersionFn(androidEnvVersion,code)) {
          this.loading = true
          const downloadTask = uni.downloadFile({
            //下载地址
            url:
              'https://dcp.fdjcyl.com/GongChuangJi/fadongji.apk' +
              '?t=' +
              Date.parse(String(new Date())),
            success: (data) => {
              if (data.statusCode === 200) {
                plus.runtime.install(
                  data.tempFilePath,
                  {
                    force: false,
                  },
                  function () {
                    plus.runtime.restart()
                    this.visible = false
                  },
                )
              }
            },
            complete: () => {
              uni.hideLoading()
            },
          })

          // 任务进度监听
          downloadTask.onProgressUpdate((res) => {
            this.progress = res.progress
          })
        } else if (platform === 'ios' &&this.compareVersionFn(iosEnvVersion,code)) {
          this.visible = false
          plus.runtime.launchApplication(
            {
              action: `itms-apps://itunes.apple.com/cn/app/id6443510654?mt=8`,
            },
            function (e) {
              console.log('Open system default browser failed: ' + e.message)
            },
          )
        }
      },
      // 拆分比较版本号  字符串比较有问题
      compareVersionFn(version,newVersion){
        console.log("1111111")
        let  versionArr=version.split('.')
        let  newVersionArr=newVersion.split('.')
        let versionVal=[]
        let newVersionVal=[]

        versionArr.map(item=>{
          versionVal.push(Number(item))
        })
        newVersionArr.map(item=>{
          newVersionVal.push(Number(item))
        })


        let  boo=false
        if(versionVal[0]<=newVersionVal[0]&&versionVal[1]<=newVersionVal[1]&&versionVal[2]<newVersionVal[2]){
              boo=true
        }

        console.log(boo,"更新",version,newVersion,versionVal,newVersionVal)
        return boo
      },
      checkUpdateFn() {
        let param = {
          parentCode: '',
          channel: 1,
        }
        let platform = uni.getSystemInfoSync().platform
        if (platform === 'android') {
          param.parentCode = 'androidVersion'
          param.channel = 1
        } else if (platform === 'ios') {
          param.parentCode = 'iosVersion'
          param.channel = 2
        }

        VoHttp.apiVersionCurrent(param, { noLoading: true, noError: true }).then((res) => {
          const code = res.data.versionNum
          this.code = code
          this.isUpgrade = res.data.isUpgrade // 0 不强制 1 强制
          this.title = res.data.title
          this.description = res.data.contentDescription
          if (platform === 'android' && this.compareVersionFn(androidEnvVersion,code)) {
            if (this.loaded) {
              this.visible = true
            }
          } else if (platform === 'ios' && this.compareVersionFn(iosEnvVersion,code)) {
            if (this.loaded) {
              this.visible = true
            }
          }
        })
      },
    },
  }
</script>

<style scoped lang="scss">
  .progress-box {
    .progress-desc {
      @include black-size-color(28, 0.85);
      padding-bottom: 35rpx;
    }
    .progress {
      height: 25rpx;
      background: #f6f7f8;
      border-radius: 39rpx;
      overflow: hidden;
    }
    .progress-inner {
      background-color: #ff6400;
      height: 25rpx;
    }
    .progress-text {
      width: 65rpx;
      line-height: 1;
      margin-left: 15rpx;
      @include black-size-color(28, 0.85);
    }
  }

  ::v-deep .u-popup__content {
    background-color: transparent;
  }

  .close-icon {
    width: 56rpx;
    height: 56rpx;
    background: url('https://dcp.fdjcyl.com/GongChuangJi/2023/1/13/1673593926121lQLPJwkTm3vLwzBUVLBuCGrl1FF78wO8G-YhgKEA_84_84.png')
      no-repeat center center transparent;
    background-size: contain;
  }

  .update-text {
    padding: 32rpx;
    height: 180rpx;
    overflow-y: scroll;
    box-sizing: border-box;
    font-size: 32rpx;
    line-height: 150%;
    @include black-size-color(32, 0.85);
  }

  .update-header {
    color: #ffffff;
    text-shadow: 0px 1px 1px rgba(226, 104, 30, 0.75);
    font-weight: 500;

    &.update-default {
      background-size: 100% 100%;
    }
  }
</style>
