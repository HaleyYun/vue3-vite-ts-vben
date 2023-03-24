<template>
  <view v-if="imageSrc.length" class="old_machine-con">
    <!--  右上角定位图片  -->
    <image
      v-if="info.status !== 3320 && info.status !== 3380"
      class="old-pass"
      src="/static/icons/sys2.png"
    />
    <image v-if="info.status === 3380" class="old-pass" src="/static/icons/sys3.png" />
    <view>
      <view class="fz-32 fz-b p-b-24 title">商品信息</view>
    </view>
    <view class="old_machine fz-28">
      <view class="m-t-24">
        <view v-if="imageSrc.length" class="old_machine-image">
          <block v-for="(item, index) in list">
            <view v-if="!index" :key="index">
              <view @click="choseImg(index)">
                <u--image
                  :src="$transferCosUrl(imageSrc[index], 1)"
                  height="460rpx"
                  width="460rpx"
                />
              </view>
              <view class="fz-28 m-t-16">{{ item }}</view>
            </view>
            <block v-else>
              <view v-if="imageSrc.length > 1" :key="index">
                <view @click="choseImg(index)">
                  <u--image
                    :src="$transferCosUrl(imageSrc[index], 1)"
                    height="218rpx"
                    width="218rpx"
                  />
                </view>
                <view class="fz-28 m-t-16">{{ item }}</view>
              </view>
            </block>
            <!--            <view class="fz-28 m-t-16">{{ item }}</view>-->
          </block>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'OldMachineMessage',
    props: {
      info: {
        type: Object,
        default: () => {},
      },
    },

    data() {
      return {
        imageSrc: [],
        list: ['发动机识别号', '进气端', '排气端', '正时端', '曲后端'],
      }
    },
    watch: {
      info: {
        immediate: true,
        deep: true,
        handler(val) {
          let pic = this.info.engineMsg.pic
          this.imageSrc = Object.values(pic)
          console.log(this.imageSrc)
        },
      },
    },
    methods: {
      /**
       * 预览图片
       */
      choseImg(index) {
        uni.previewImage({
          current: index,
          urls: this.imageSrc,
          indicator: 'none',
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .title {
    //border-bottom: 1rpx solid $v-bg-light;
  }

  .old_machine-con {
    position: relative;
    padding: 24rpx 32rpx;
    .old-pass {
      position: absolute;
      top: 0;
      right: 0;
      width: 176rpx;
      height: 176rpx;
    }
  }

  .old_machine {
    &-image {
      display: flex;
      flex-wrap: wrap;

      > :nth-child(n) {
        width: 218rpx;
        height: 300rpx;

        > :nth-child(1) {
          width: 218rpx;
          height: 218rpx;
          overflow: hidden;
          border-radius: 8rpx;
        }

        > :nth-child(2) {
          text-align: center;
          color: rgba(0, 0, 0, 0.45);
        }
      }

      > :nth-child(1) {
        width: 460rpx;
        height: 520rpx;
        margin-right: 50rpx;

        > :nth-child(1) {
          width: 460rpx;
          height: 460rpx;
          overflow: hidden;
          border-radius: 8rpx;
        }
      }

      > :nth-child(3n) {
        margin: 0 16rpx;
      }
    }
  }
</style>
