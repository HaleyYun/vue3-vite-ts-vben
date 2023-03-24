<template>
  <view class="voucher">
    <VoNav is-fixed is-have-more title="提交验收凭证" />

    <view class="m-l-32 m-t-24 m-b-24 fz-28 lh150 color-block-65">验收情况</view>

    <view class="bg-white flex1 w-full m-b-28">
      <view class="flex flex-row flex-vertical-c p-32">
        <view class="fz-b fz-32 lh150 color-block">验收结果:</view>

        <view class="flex flex-row m-l-16" @click="selected1">
          <VoIcon v-if="isSelected1" :size="24" color="#FF5319" name="select-right" />

          <VoIcon v-else :size="24" color="#000" name="address_select" />

          <view class="fz-32 lh150 color-block-65">验收合格</view>
        </view>

        <view v-if="source !== 2" class="flex flex-row flex-vertical-c m-l-36" @click="selected2">
          <VoIcon v-if="isSelected2" :size="24" color="#FF5319" name="select-right" />

          <VoIcon v-else :size="24" color="#000" name="address_select" />

          <view class="fz-32 lh150 color-block-65">验收不合格</view>
        </view>
      </view>

      <view class="voucher-line" />

      <view class="flex flex-row flex-justify-between flex-vertical-c m-l-32 m-t-32 m-r-32">
        <view class="fz-b fz-32 lh150 color-block">上传验收视频:</view>

        <!-- <view class="fz-28 lh150 color-block">{{ uploadVideo.length }}/3</view> -->
      </view>

      <view class="fz-28 lh150 color-block-25 m-t-12 m-l-32">上传旧机正常转动两周的视频</view>

      <view class="flex flex-row p-l-32 p-r-32 border-box">
        <view class="pictures flex1">
          <VoFormUpload
            :limit="1"
            :source.sync="uploadVideo"
            :video-limit="1"
            btnText="上传视频"
            uploadType="video"
            @change="uploadVideoImgHandler"
          />
        </view>
      </view>

      <view class="voucher-line" />

      <!-- 同101  ENG-5475 -->

      <block v-if="source === 2">
        <view class="fz-b fz-32 lh150 color-block m-l-32 m-t-32">上传旧机图片:</view>

        <view class="flex-row flex text-center p-l-32 p-r-32 border-box">
          <view>
            <view class="pictures">
              <VoFormUpload
                :limit="1"
                :source.sync="fileListA"
                :video-limit="0"
                btnText="上传图片"
                iconWidth="235rpx"
                uploadType="image"
              />
            </view>

            <view class="fz-28 lh150 color-block-65 m-t-16">进气端</view>
          </view>

          <view class="m-l-16 m-r-16">
            <view class="pictures">
              <VoFormUpload
                :limit="1"
                :source.sync="fileListB"
                :video-limit="0"
                btnText="上传图片"
                iconWidth="235rpx"
                uploadType="image"
              />
            </view>

            <view class="fz-28 lh150 color-block-65 m-t-16">排气端</view>
          </view>

          <view>
            <view class="pictures">
              <VoFormUpload
                :limit="1"
                :source.sync="fileListC"
                :video-limit="0"
                btnText="上传图片"
                iconWidth="235rpx"
                uploadType="image"
              />
            </view>

            <view class="fz-28 lh150 color-block-65 m-t-16">正时端</view>
          </view>
        </view>

        <view class="flex-row flex m-r-32 m-l-32 text-center">
          <view>
            <view class="pictures">
              <VoFormUpload
                :limit="1"
                :source.sync="fileListD"
                :video-limit="0"
                btnText="上传图片"
                iconWidth="235rpx"
                uploadType="image"
              />
            </view>

            <view class="fz-28 lh150 color-block-65 m-t-16">曲后端</view>
          </view>
        </view>
      </block>
    </view>

    <view class="voucher-bottom p-b-safe-area">
      <view
        v-if="source === 2"
        :class="
          uploadVideo.length > 0 &&
          fileListA.length !== 0 &&
          fileListB.length !== 0 &&
          fileListC.length !== 0 &&
          fileListD.length !== 0
            ? 'voucher-bottom__submit2'
            : 'voucher-bottom__submit1'
        "
        @click="submit"
        >提交</view
      >
      <view
        v-else
        :class="uploadVideo.length > 0 ? 'voucher-bottom__submit2' : 'voucher-bottom__submit1'"
        @click="submit"
      >
        提交
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'SumitVoucher',

    components: {},

    data() {
      return {
        videoSrc: '',

        uploadVideo: [],

        fileListA: [],

        fileListB: [],

        fileListC: [],

        fileListD: [],

        value: '',

        formData: '',

        situation: '',

        rules1: {
          license: {
            type: 'string',

            required: true,

            message: '验收情况',

            trigger: ['blur'],
          },
        },

        isSelected1: true,

        isSelected2: false,

        optionsId: '',

        source: 1,
      }
    },

    onLoad(options) {
      this.optionsId = options.id

      this.source = +options.source
    },

    methods: {
      selected1() {
        this.isSelected1 = true

        this.isSelected2 = false
      },

      selected2() {
        this.isSelected1 = false

        this.isSelected2 = true
      },

      inputHandle(val) {
        this.value = val.replace(/\s+/g, '')

        // console.log(val, this.value)
      },

      /**

     * 任一个radio状态发生变化时触发

     * @param n

     */

      groupChange(n) {
        console.log('groupChange', n)
      },

      /**

     * 某个radio状态发生变化时触发(选中状态)

     * @param n

     */

      radioChange(n) {
        console.log('radioChange', n)

        if (n === '无需物流') {
          this.isLogistics = false
        } else {
          this.isLogistics = true
        }
      },

      // 上传视频

      uploadVideoImgHandler(res) {
        console.log('uploadVideoImgHandler======', res)

        this.uploadVideo = res
      },

      submit() {
        if (this.isLoading) {
          return
        }
        let checkMsg
        if (this.source === 2) {
          if (!this.uploadVideo.length) {
            this.$u.toast('请上传验收视频')
            return
          }
          if (!this.fileListA.length) {
            this.$u.toast('请上传进气端图片')
            return
          }
          if (!this.fileListB.length) {
            this.$u.toast('请上传排气端图片')
            return
          }
          if (!this.fileListC.length) {
            this.$u.toast('请上传正时端图片')
            return
          }
          if (!this.fileListD.length) {
            this.$u.toast('请上传曲后端图片')
            return
          }
          checkMsg = {
            //图片排序： 进气，排气，正时，曲后
            pic: [
              this.fileListA[0].src,
              this.fileListB[0].src,
              this.fileListC[0].src,
              this.fileListD[0].src,
            ],
            video: this.uploadVideo || null,
          }
        } else {
          if (!this.uploadVideo || !this.uploadVideo.length) {
            this.$u.toast('请上传验收视频')
            return
          }
          checkMsg = {
            video: this.uploadVideo || null,
            pic: null,
          }
        }
        let params = {
          quality: this.isSelected1,
          supportId: this.optionsId,
          type: 2, //类型，1:回收查验 2:回收验收
          checkMsg: JSON.stringify(checkMsg), //{"pic":"发动机图片","video":"发动机视频"}
        }
        this.isLoading = true
        this.$VoHttp
          .apiOrderRecycleCheck(params)
          .then((res) => {
            this.$u.toast('提交成功')
            setTimeout(() => {
              // this.$backFn()
              uni.reLaunch({
                url: '/pages/EngineerCenter/EngineerTabbar?tabbarVal=1',
              })
              this.isLoading = false
            }, 1000)
          })
          .catch((err) => {
            this.$u.toast('提交失败')
            this.isLoading = false
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .voucher {
    width: 750rpx;

    height: 100vh;

    background-color: #f6f7f8;

    display: flex;

    flex-direction: column;

    &-textarea {
      background-color: $v-bg-light;
    }

    &-bottom {
      background-color: $v-bg-white;

      &__submit1 {
        background-color: #f6f7f8;

        color: $v-c0-25;

        font-size: 32rpx;

        line-height: 150%;

        vertical-align: center;

        text-align: center;

        padding: 22rpx 0;

        border-radius: 48rpx;

        margin: 20rpx 32rpx;
      }

      &__submit2 {
        background-color: #ff5319;

        color: white;

        font-size: 32rpx;

        line-height: 150%;

        vertical-align: center;

        text-align: center;

        padding: 22rpx 0;

        border-radius: 48rpx;

        margin: 20rpx 32rpx;
      }
    }

    &-line {
      background-color: $v-bg-light;

      width: 100%;

      height: 2rpx;

      margin-top: 32rpx;

      margin-left: 32rpx;

      margin-right: 32rpx;
    }
  }

  .placeholder {
    justify-self: center;

    color: $v-c0-65;

    font-size: 28rpx;

    padding: 24rpx 32rpx;
  }

  .upload {
    display: flex;

    justify-content: center;

    width: 220rpx;

    height: 220rpx;

    margin-top: 24rpx;

    background: #f7f7f8;

    border-radius: 8rpx;

    position: relative;
  }

  .pictures {
    margin-top: 32rpx;

    box-sizing: border-box;

    .pictures-img {
      width: 218rpx;

      height: 218rpx;
    }
  }
</style>
