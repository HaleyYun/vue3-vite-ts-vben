<template>
  <view class="p-32 old_machine-con">
    <view>
      <view class="fz-32 fz-b p-b-24 title">{{ title }}</view>
    </view>
    <view v-if="info.engineNo" class="fz-28 m-t-16 black85">
      发动机识别号：<text>{{ info.engineNo }}</text>
    </view>
    <view class="old_machine fz-28">
      <view class="m-t-24">
        <view class="old_machine-image">
          <template v-for="(item, index) in images">
            <template v-if="item.url">
              <view v-if="!index" :key="index">
                <view>
                  <u-upload
                    :key="index"
                    :deletable="false"
                    :fileList="[{ url: item.url }]"
                    :maxCount="1"
                    disabled
                    height="230"
                    name="6"
                    width="230"
                  />
                </view>
                <view class="fz-28 m-t-16">{{ item.name }}</view>
              </view>
              <view v-else :key="index">
                <view>
                  <u-upload
                    :key="index"
                    :deletable="false"
                    :fileList="[{ url: item.url }]"
                    :maxCount="1"
                    disabled
                    height="109"
                    name="6"
                    width="109"
                  />
                </view>
                <view class="fz-28 m-t-16">{{ item.name }}</view>
              </view>
            </template>
          </template>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'OldMachineMessageImage',
    props: {
      title: {
        type: String,
        default: '鉴定结果',
      },
      info: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    data() {
      return {
        images: [
          {
            type: 'img',
            name: '发动机识别号',
            url: '',
          },
          {
            type: 'img',
            name: '出气口',
            url: '',
          },
          {
            type: 'video',
            name: '进气口',
            url: '',
          },
          {
            type: 'img',
            name: '出气口',
            url: '',
          },
          {
            type: 'video',
            name: '进气口',
            url: '',
          },
        ],
      }
    },
    mounted() {
      if (this.info.engineDetail) {
        let data = this.info.engineDetail
        this.images.forEach((item, index) => {
          item.url = data.pic[index] || ''
        })
      } else if (this.info.pic && JSON.parse(this.info.pic).length) {
        let pic = JSON.parse(this.info.pic)
        pic.forEach((item, index) => {
          this.images[index].url = item
        })
      } else if (this.info.pic && Object.keys(JSON.parse(this.info.pic)).length) {
        let pic = JSON.parse(this.info.pic)
        this.images.forEach((item, index) => {
          item.url = pic['pic' + [index]] || ''
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .title {
    border-bottom: 1rpx solid $v-bg-light;
  }

  .old_machine-con {
    //margin-bottom: 180rpx;
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
  .black85 {
    color: rgba(0, 0, 0, 0.85);
  }
</style>
