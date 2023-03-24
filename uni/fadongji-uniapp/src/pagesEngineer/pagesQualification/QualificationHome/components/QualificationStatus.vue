<template>
  <view>
    <view class="status_title p-b-48">
      <view>
        <text class="fz-32 fz-b lh150"
          >{{ data.certification ? '已' : '' }}{{ textObj[data.qualifyType] }}
        </text>
        <view v-if="data.certification" class="status_title-icon m-l-16">
          <VoIcon color="#00B259" name="approve-have" size="12" />
          <text class="fz-20">已认证</text>
        </view>
      </view>
      <view>
        <slot name="button"></slot>
      </view>
    </view>
    <CustomProgressBar :data="data" />
  </view>
</template>

<script>
  import EraButton from '@/uni_modules/era-ui/components/EraButton/EraButton'
  import CustomProgressBar from '../../components/CustomProgressBar/CustomProgressBar'

  export default {
    name: 'QualificationStatus',
    components: {
      EraButton,
      CustomProgressBar,
    },
    props: {
      data: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    data() {
      return {
        textObj: {
          32: '认证成为安装师傅',
          33: '认证成为回收师傅',
          31: '认证成为售后师傅',
        },
      }
    },
  }
</script>

<style lang="scss" scoped>
  .status_title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > :nth-child(1) {
      display: flex;
      align-items: center;

      .status_title-icon {
        padding: 4rpx 10rpx 2rpx 6rpx;
        display: flex;
        border-radius: 18rpx;
        justify-content: center;
        align-items: center;
        background-color: #ecfaf3;

        text {
          color: #00b259;
        }
      }
    }
  }
</style>
