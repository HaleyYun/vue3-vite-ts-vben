<template>
  <view class="basic">
    <view class="basic-outlets">
      <view class="basic-outlets__title">门店实拍</view>
      <image
        v-if="information.storeUrl"
        :src="transferCosUrlFn(information.storeUrl, 1)"
        class="basic-outlets__img"
        @click="previewImg"
      />
      <VoFormUpload
        v-else-if="information.checkStatus === 1 && information.isBindMobile"
        :limit="1"
        :source.sync="uploadImg"
        btnText="上传门头照片"
        class="m-t-32"
      />
    </view>
    <view class="basic-list lh48 fz-32 color-block">
      <!--      <view class="basic-list__item">-->
      <!--        <view>门店手机号</view>-->
      <!--        <view>{{ encryptPhone(information.contractPhone) }}</view>-->
      <!--      </view>-->
      <view class="basic-list__item">
        <view><text class="c-required">*</text><text>门店联系人</text></view>
        <view class="flex1 text-right m-l-20">{{ information.contractName }}</view>
      </view>
      <view class="basic-list__item">
        <view><text class="c-required">*</text><text>注册手机号</text></view>
        <view>{{ encryptPhone(information.userName) }}</view>
      </view>
      <view class="basic-list__item">
        <view><text class="c-required">*</text><text>汽修厂名称</text></view>
        <view class="flex1 text-right m-l-20">{{ information.storeName }}</view>
      </view>
      <view class="basic-list__item">
        <view><text class="c-required">*</text><text>所在地区</text></view>
        <view class="flex1 text-right m-l-20">{{ information.areaCodeStr }}</view>
      </view>
      <view class="basic-list__item">
        <view><text class="c-required">*</text><text>详细地址</text></view>
        <view class="flex1 text-right m-l-20">{{ information.address }}</view>
      </view>
      <!--      <view class="basic-list__item">-->
      <!--        <view><text class="c-required">*</text><text>主修车系</text></view>-->
      <!--        &lt;!&ndash;        <view>{{ carSeriesList[information.carSeries] }}</view>&ndash;&gt;-->
      <!--        <view>{{ information.carSeriesStr }}</view>-->
      <!--      </view>-->
      <!--      <view class="basic-list__item">-->
      <!--        <view>工位数量</view>-->
      <!--        <view>{{ information.locationNumber }}</view>-->
      <!--      </view>-->
      <!--      <view class="basic-list__item">-->
      <!--        <view>规模(人)</view>-->
      <!--        <view>{{ information.scale }}</view>-->
      <!--      </view>-->
    </view>
  </view>
</template>

<script>
  import { transferCosUrl } from '@/common/helper'

  export default {
    name: 'BasicInformation',
    props: {
      information: {
        type: Object,
        default: function () {
          return {}
        },
      },
    },
    data() {
      return {
        // 主修车系
        carSeriesList: ['', '国产车', '韩系车', '德系车', '日系车', '美系车'],
        uploadImg: [],
      }
    },
    watch: {
      uploadImg: {
        deep: true,
        handler(newVal) {
          if (newVal.length) {
            this.$emit('uploadImg', newVal[0])
          } else {
            this.$emit('uploadImg', '')
          }
        },
      },
    },
    created() {},
    methods: {
      getImgFn(){
        console.log(this.uploadImg)
        return  this.uploadImg.length>0?this.uploadImg[0].src:''
      },
      // 加密电话
      encryptPhone(phone) {
        return phone ? this.$vocenApi.VoUtils.encryptPhone(phone) : ''
      },
      transferCosUrlFn: transferCosUrl,
      // 预览图片
      previewImg() {
        // information.storePhotos
        uni.previewImage({
          current: 0, // 当前点击缩略图的下标
          urls: [this.information.storeUrl],
          indicator: 'number', // 指示器/步长器  可取值："default" - 底部圆点指示器； "number" - 顶部数字指示器； "none" - 不显示指示器。
          loop: true, //轮播
          success: (res) => {
            console.log('调用成功', res)
          },
          fail: (err) => {
            console.log('调用失败', err)
          },
          complete: (ret) => {
            console.log('调用完成，管你成功失败', ret)
          },
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .basic {
    width: 750rpx;
    height: 100%;
    &-outlets {
      padding: 24rpx 32rpx;
      background: #fff;
      &__title {
        line-height: 48rpx;
        font-weight: bold;
        font-size: 32rpx;
        color: $v-c0-85;
      }
      &__img {
        width: 218rpx;
        height: 218rpx;
        display: block;
        border-radius: 8rpx;
        overflow: hidden;
        margin-top: 32rpx;
      }
    }
    &-list {
      background: #fff;
      padding-bottom: 240rpx;
      &__item {
        padding: 24rpx 32rpx 24rpx 0;
        box-sizing: border-box;
        margin-left: 32rpx;
        border-top: 2rpx solid $v-bg-light;
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
