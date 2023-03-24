<template>
  <view>
    <VoNav is-fixed is-have-more title="资格认证" />
    <view
      v-for="(item, index) in qualificationDataList"
      :key="index"
      class="qualification_card m-t-16"
      @click="nextPage(item)"
    >
      <QualificationStatus :data="item">
        <template #button>
          <view class="fz-28 btn_con fz-b">
            <view v-if="+item.finishCount !== 0 && !item.certification" class="red_btn"
              >继续学习</view
            >
            <view v-else-if="+item.finishCount === 0" class="unset_btn">开始学习</view>
          </view>
        </template>
      </QualificationStatus>
    </view>
  </view>
</template>

<script>
  import QualificationStatus from './components/QualificationStatus'

  export default {
    components: {
      QualificationStatus,
    },
    data() {
      return {
        // 32:安装单 33:回收单 31:售后回收单
        qualificationDataList: [],
      }
    },
    onShow() {
      this.getData()
    },
    methods: {
      /**
       * 去回收资格认证页
       * @param item
       */
      nextPage(item) {
        this.$linkToEasy(
          '/pagesEngineer/pagesQualification/RecyclingQualification/CourseList?qualifyType=' +
            item.qualifyType,
        )
      },
      //获取资格认证数据
      getData() {
        this.$VoHttp
          .apiContentLearningTasksInitialize()
          .then((res) => {
            if (res.data) {
              this.qualificationDataList = res.data
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .qualification_card {
    padding: 24rpx 32rpx;
    background-color: #fff;

    .btn_con {
      > :nth-child(1) {
        width: 200rpx;
        height: 64rpx;
        border-radius: 32rpx;
        text-align: center;
        line-height: 64rpx;
      }

      .red_btn {
        background-color: #ff5319;
        color: #fff;
      }

      .unset_btn {
        border: 1rpx solid #ff5319;
        color: #ff5319;
      }
    }
  }
</style>
