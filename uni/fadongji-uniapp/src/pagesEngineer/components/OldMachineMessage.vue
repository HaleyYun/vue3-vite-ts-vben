<template>
  <view class="p-24">
    <view>
      <view class="fz-32 fz-b p-b-24 title">鉴定信息</view>
    </view>
    <view class="old_machine fz-28">
      <view class="old_machine-guide m-t-24">
        <text>上门指导：</text>
        <text
          ><text>{{ data.homeMsg }}</text></text
        >
      </view>

      <view v-if="data.unit" class="old_machine-problem m-t-24">
        <text
          >故障部位：<text>{{ data.unit }}</text></text
        >
      </view>
      <!-- <view v-if="data.voice" class="old_machine-problem m-t-24 flex">
        <text>故障描述：</text><NewAudioVoice :info="JSON.parse(data.voice)" />
      </view> -->
      <view class="old_machine-problem m-t-24">
        <text
          >故障描述：<text>{{ data.desc }}</text></text
        >
      </view>
      <view class="m-t-24">
        <text>故障图片：</text>
        <view class="old_machine-image m-t-16">
          <VoFormUpload
            :source="fileList"
            class="vo_form_upload"
            preview
            uploadStyle="{width:218rpx;height:218rpx}"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'OldMachineMessage',
    props: {
      data: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    computed: {
      fileList() {
        if (this.data.pic) {
          let pic = JSON.parse(this.data.pic)
          return pic.map((item) => {
            // return { type: item.type == 'video' ? 2 : 1, src: item.pic }

            return {
              type: item.indexOf('.mp4') == -1 && item.indexOf('.MP4') == -1 ? 1 : 2,
              src: item,
            }
          })
        } else {
          return []
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .title {
    border-bottom: 1rpx solid $v-bg-light;
  }

  .old_machine {
    &-guide {
      display: flex;

      > :nth-child(1) {
        flex-shrink: 0;
      }
    }
  }
</style>
