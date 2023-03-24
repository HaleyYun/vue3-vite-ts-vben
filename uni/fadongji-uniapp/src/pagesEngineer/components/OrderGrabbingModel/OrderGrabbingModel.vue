<template>
  <view>
    <u-popup :closeOnClickOverlay="false" :show="newDialog" mode="center" @close="close">
      <view class="model">
        <view class="content">
          <scroll-view>
            <view class="model_box p-24">
              <block v-for="(item, key) in dataList">
                <OrderGrabbingItem :key="key" :itemData="item" />
              </block>
            </view>
            <u-divider
              lineColor="rgba(0,0,0,0.08)"
              text="该买家还有更多服务单"
              textColor="#FF4A0D"
            />
          </scroll-view>

          <view class="action fz-28 p-24">
            <view class="action_btn1 action_btn" plain>只抢回收单</view>
            <view class="action_btn2 action_btn">都抢了</view>
          </view>
        </view>

        <view class="model_close" @click="close">
          <VoIcon color="#fff" name="close" size="20" />
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
  import OrderGrabbingItem from './OrderGrabbingItem.vue'

  export default {
    name: 'OrderGrabbingModel',
    components: {
      OrderGrabbingItem,
    },
    props: {
      dataList: {
        type: Array,
        default() {
          return [
            {
              type: 'recovery',
              typeDesc: '回收',
              title:
                '郑州市-金水区-龙子湖街道正商木华广场A座郑州市-金水区-龙子湖街道正商木华广场A座',
              price: '120',
              name: '新明汽配',
              distance: '12.6',
              address: '郑州市-金水区-龙子湖街道正商木华广场A座',
              workTime: '08:30-12:00 08:30-12:00',
            },
            {
              type: 'exect',
              typeDesc: '安装',
              title: 'B15',
              price: '120',
              name: '新明汽配',
              distance: '12.6',
              address: '郑州市-金水区-龙子湖街道正商木华广场A座',
              workTime: '08:30-12:00 08:30-12:00',
            },
            {
              type: 'postsale',
              typeDesc: '售后',
              title: 'B15',
              price: '120',
              name: '新明汽配',
              distance: '12.6',
              address: '郑州市-金水区-龙子湖街道正商木华广场A座',
              workTime: '08:30-12:00 08:30-12:00',
            },
          ]
        },
      },
      dialog: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      newDialog: {
        get() {
          return this.dialog
        },
        set(val) {
          this.$emit('close', val)
        },
      },
    },
    methods: {
      close() {
        this.newDialog = false
      },
    },
  }
</script>

<style lang="scss" scoped>
  .model {
    width: 640rpx;
    height: 1128rpx;
    position: relative;
    padding-bottom: 140rpx;
    box-sizing: border-box;
    border-radius: 8rpx;
  }
  .content {
    height: 1128rpx;
    display: flex;
    flex-direction: column;
    :nth-child(1) {
      flex: 1;
      overflow: auto;
    }
  }
  .model_box {
    overflow: auto;
  }

  .action {
    // position: absolute;
    // bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1rpx solid $v-bg-light;
    background-color: #fff;
    box-sizing: border-box;

    &_btn {
      width: 284rpx;
      height: 80rpx;
      border-radius: 48rpx;
      text-align: center;
      line-height: 80rpx;
    }

    &_btn1 {
      color: #ff5319;
      border: 1rpx solid #ff5319;
    }

    &_btn2 {
      background-color: #ff5319;
      color: #fff;
    }
  }

  .model_close {
    width: 56rpx;
    height: 56rpx;
    position: absolute;
    left: 50%;
    bottom: -7%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 1px solid #fff;
  }
</style>
