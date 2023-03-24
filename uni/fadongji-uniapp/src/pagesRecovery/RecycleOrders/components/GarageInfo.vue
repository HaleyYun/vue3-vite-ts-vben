<template>
  <view class="info">
    <view class="fz-32 p-b-24 fz-b">修理厂信息</view>
    <view class="flex flex-justify-between m-t-16 flex-vertical-c">
      <view class="flex flex-vertical-c">
        <image
          :src="info.garageInfo.photoUrl || '/static/default_avatar.png'"
          class="info-img"
          @error="imgErr"
        />
        <view class="m-l-16 fz-28">{{ info.garageInfo.storeName }}</view>
      </view>
      <slot>
        <view
          v-if="
            info.status === 3320 ||
            info.status === 3340 ||
            info.status === 3330 ||
            info.status === 3350
          "
          class="flex flex-vertical-c"
        >
          <VoIcon
            class="m-r-32"
            color="#373A4E"
            name="mobile-new"
            @click.native="$cellPhone(info.garageInfo.userName)"
          />
          <VoIcon class="m-l-16" color="#373A4E" name="smile-m" @click.native="goChat" />
        </view>
      </slot>
    </view>
    <view class="m-t-24 flex flex-vertical-c">
      <VoIcon name="address" />
      <view class="m-l-8 lh42 fz-28 color-block"
        >{{ info.addressDetail.address }}{{ info.addressDetail.addressDetail }}</view
      >
    </view>
  </view>
</template>

<script>
  export default {
    name: 'GarageInfo',
    props: {
      info: {
        type: Object,
        default: () => {
          return {
            status: '',
            addressDetail: {
              address: '',
              addressDetail: '',
            },
            garageInfo: {
              userName: '',
              photoUrl: '',
              storeName: '',
            },
          }
        },
      },
    },
    methods: {
      goChat() {
        console.log(123)
        //createTime  string 非必须 创建时间 format: date-time
        //disturb  integer 非必须 是否开启消息免打扰 0：关闭   1：开启 format: int32
        //id  integer 非必须 对话框id format: int64
        //targetId  integer 非必须 目标人id或者群id format: int64
        //userId  integer 非必须 用户id
        //version  integer 非必须 数据版本
        const info = {
          targetId: this.info.garageInfo.userId,
          type: 0,
          note: this.info.garageInfo.userName,
          platformCode: 'garage',
        }
        this.$storage.set('temp_im_room_info', info)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      // 图片加载失败处理
      imgErr() {
        this.data.photoUrl = '/static/default_avatar.png'
      },
    },
  }
</script>

<style lang="scss" scoped>
  .info {
    padding: 24rpx 32rpx;
    &-img {
      width: 72rpx;
      height: 72rpx;
      border-radius: 50%;
      overflow: hidden;
      display: block;
    }
  }
</style>
