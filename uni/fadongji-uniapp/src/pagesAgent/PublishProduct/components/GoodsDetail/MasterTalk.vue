<template>
  <view v-if="infoList && infoList.length" class="master">
    <view class="master-box">
      <view class="master-box__title">
        <view class="left"
          >大咖说<text class="left-num">({{ total }})</text></view
        >
        <view class="right" @click="toPage"
          >查看更多<VoIcon :opacity="0.25" :size="16" color="#000000" name="right-arrow"
        /></view>
      </view>
    </view>
    <MasterItem
      v-for="item in infoList"
      :key="item.id"
      :info="item"
      @click.native="toDetail(item)"
    />
  </view>
</template>
<script>
  import MasterItem from '../MasterItem.vue'
  import helpUtil from '@/common/helper'

  export default {
    name: 'MasterTalk',
    components: { MasterItem },
    props: {
      info: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        infoList: [],
        total: 0,
        labelArr: [
          {
            name: '',
            value: '',
            require: true,
          },
        ],
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      toPage() {
        this.$linkToEasy(`/pagesSupplier/GoodsManage/MasterTalkList?goodId=${this.info.id}`)
      },
      toDetail(item) {
        //想法详情
        this.$linkToEasy(
          `/pagesAgent/CreatedCenter/CircleDetail/CircleDetail?id=${item.id}&businessType=${item.businessType}&origin=master`,
        )
      },
      getData() {
        let params = {
          pageNo: 1,
          pageSize: 3,
          businessType: 1,
          goodsId: this.info.id,
          showLevel: 1,
        }
        this.$VoHttp
          .apiCreateQuestionsQuestionList(params)
          .then((res) => {
            if (res.data) {
              let data = res.data.records
              this.total = res.data.total
              data.forEach((item) => {
                helpUtil.regroupFileData(item)
                // item.datetime = this.$vocenApi.VoUtils.timeTransfer(item.createTime)
              })
              this.infoList = data
              console.log('this.infoList', this.infoList)
            }
          })
          .finally(() => {})
      },
    },
  }
</script>
<style lang="scss" scoped>
  .master {
    margin-top: 16rpx;
    background: #fff;
    .fz-16 {
      font-size: 32rpx !important;
    }
    &-box {
      background: #fff;
      &__title {
        display: flex;
        padding: 24rpx 32rpx;
        .left {
          font-size: 32rpx;
          line-height: 1.5;
          color: $v-c0-85;
          font-weight: 500;
          &-num {
            font-weight: 400;
            font-size: 26rpx;
          }
        }
        .right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          font-size: 26rpx;
          line-height: 1.5;
          color: $v-c0-65;
        }
      }
    }
  }
</style>
