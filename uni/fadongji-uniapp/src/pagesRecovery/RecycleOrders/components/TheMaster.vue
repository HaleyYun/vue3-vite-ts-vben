<template>
  <view>
    <!--  样式一  -->
    <view
      v-if="info.status === 3340 || info.status === 3341"
      class="master flex flex-justify-between flex-vertical-b"
    >
      <view class="flex flex-vertical-c flex1">
        <image
          :src="info.technicianInfo.photoUrl || '/static/default_avatar.png'"
          class="master-img"
        ></image>
        <view class="m-l-16">
          <view class="fz-28 fz-b m-r-24">集师傅：{{ info.technicianInfo.realName }}</view>
          <view class="lh36 fz-24 color-block-45"
            >好评率：{{ info.technicianInfo.favorableComment }}</view
          >
        </view>
        <view>
          <VoIcon
            class="m-r-32"
            color="#595959"
            name="mobile-new"
            @click.native="$cellPhone(info.technicianInfo.userName)"
          ></VoIcon>
          <VoIcon color="#595959" name="smile-m" @click="goChat"></VoIcon>
        </view>
      </view>
<!--      <view class="master-button" @click.native="goToMap">位置轨迹</view>-->
    </view>
    <!--  样式二  -->
    <view v-else class="master flex flex-justify-between flex-vertical-c">
      <view class="flex flex-vertical-c">
        <image
          :src="info.technicianInfo.photoUrl || '/static/default_avatar.png'"
          class="master-img"
        ></image>
        <view class="m-l-16">
          <view class="fz-28 fz-b m-r-24">集师傅：{{ info.technicianInfo.realName }}</view>
          <view class="lh36 fz-24 color-block-45"
            >好评率：{{ info.technicianInfo.favorableComment }}</view
          >
        </view>
      </view>
      <view class="flex flex-vertical-c">
        <VoIcon
          class="m-r-32"
          color="#595959"
          name="mobile-new"
          @click.native="$cellPhone(info.technicianInfo.userName)"
        ></VoIcon>
        <VoIcon color="#595959" name="smile-m" @click.native="goChat"></VoIcon>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'TheMaster',
    props: {
      info: {
        type: Object,
        default: () => {},
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
          targetId: this.info.technicianInfo.userId,
          type: 0,
          note: this.info.technicianInfo.userName,
          platformCode: 'garage',
        }
        this.$storage.set('temp_im_room_info', info)
        this.$linkToEasy('/pagesSupplier/ImMessage/PersonalChat')
      },
      // 跳转地图
      goToMap() {
        let url
        // #ifdef H5
        url = `/pagesCommon/MapDrag/MapDrag?title=活动轨迹&origin=7&hideIcon=1&id=${this.info.id}`
        // #endif
        // #ifdef APP-PLUS
        url = `/pagesCommon/MapDrag/MapDragApp?title=活动轨迹&origin=7&hideIcon=1&id=${this.info.id}`
        // #endif
        this.$store.dispatch('mapDrag/setMapData', this.info)
        this.$linkToEasy(url)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .master {
    padding: 24rpx 32rpx;
    &-img {
      width: 64rpx;
      height: 64rpx;
      border-radius: 50%;
      overflow: hidden;
      display: block;
    }
    &-button {
      width: 160rpx;
      height: 56rpx;
      line-height: 56rpx;
      text-align: center;
      box-sizing: border-box;
      background: #ff5319;
      border-radius: 64rpx;
      font-size: 24rpx;
      color: #fff;
    }
  }
</style>
