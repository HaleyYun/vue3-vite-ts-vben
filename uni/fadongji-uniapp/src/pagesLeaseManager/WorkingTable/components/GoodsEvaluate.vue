<template>
  <view class="evaluate">
    <view class="evaluate-box">
      <view class="evaluate-box__title">
        <view class="left"
          >评价
          <text class="left-num">(850+)</text>
          <text class="left-tip">好评度96%</text>
        </view>
        <view class="right" @click="toPage"
          >查看更多<VoIcon name="right-arrow" color="#000000" :opacity="0.25" :size="16"
        /></view>
      </view>
    </view>
    <view class="evaluate-tag" v-if="info.tagList && tagList.length">
      <!-- <view class="tag"> 全部(3) </view> -->
      <view class="tag" v-for="item in tagList" :key="item">
        {{ item.name }}({{ item.value }})
      </view>
    </view>

    <MasterItem
      pageName="evaluate"
      v-for="(item, index) in evaluateData"
      :key="index"
      :evaluate-data="item"
      v-show="index < 2"
    />
  </view>
</template>
<script>
  import MasterItem from './MasterItem.vue'
  export default {
    name: 'MasterTalk',
    components: { MasterItem },
    props: {
      info: {
        type: Object,
        default: () => {},
      },
      // companyId
      companyId: {
        type: [Number, String],
        default: '',
      },
    },
    data() {
      return {
        tagList: [],
        evaluateData: [],
        evaInfo: '',
      }
    },
    mounted() {
      this.getData()
      // this.getKeyWordRequest()
    },
    methods: {
      //评价关键字接口
      getKeyWordRequest() {
        this.$VoHttp
          .apiGoodsKeywordQueryGetKeyWord({ goodsId: this.info.id })
          .then((res) => {
            this.optionItem = []
            res.data.map((item, index) => {
              this.tagList.push({
                name: item,
                id: index,
              })
            })
          })
          .catch((err) => {
            uni.$u.toast(err.message || '评价失败')
          })
      },
      getData() {
        //获取好评度及评价总数,获取评价标签
        this.$VoHttp
          .apiOrderEvaluateFavorableComment({
            sourceId: this.info.id,
            companyId: this.companyId,
          })
          .then((res) => {
            if (res.data) {
              this.evaInfo = res.data
              let keywordMap = res.data.keywordMap
              for (let key in keywordMap) {
                this.tagList.push({
                  name: key,
                  value: keywordMap[key],
                })
              }
            }
          })
        //获取评价
        this.$VoHttp
          .apiContentEvaluateQueryProductEvaluatePage({
            sourceType: 0,
            sourceId: this.info.id,
          })
          .then((res) => {
            if (res.data) {
              this.evaluateData = res.data.records
              this.evaluateData.forEach((item) => {
                item.mainContent = JSON.parse(item.content)
                item.mainContent.imgArr = JSON.parse(item.mainContent.pic)
              })
              console.log(this.evaluateData)
            }
          })
          .catch((err) => {
            console.log('err', err)
          })
      },
      //全部评价
      toPage() {
        this.$linkToEasy(
          `/pagesSupplier/InvestmentInfo/InvestEvaluate?goodsId=${this.info.id}&companyId=${this.companyId}`,
        )
      },
    },
  }
</script>
<style lang="scss" scoped>
  .evaluate {
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
          font-size: 28rpx;
          line-height: 1.5;
          color: $v-c0-85;
          font-weight: 500;
          &-num {
            font-weight: 400;
            font-size: 24rpx;
          }
          &-tip {
            color: #f45f70;
            font-size: 24rpx;
            margin-left: 16rpx;
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
    &-tag {
      display: flex;
      flex-wrap: wrap;
      padding-left: 32rpx;
      padding-bottom: 20rpx;
      box-sizing: border-box;
      background-color: #fff;
      .tag {
        background: #feecee;
        border: 1px solid #f95865;
        border-radius: 100px;
        font-size: 24rpx;
        line-height: 1.5;
        text-align: center;
        color: #e50012;
        padding: 4rpx 24rpx;
        margin-right: 36rpx;
        margin-bottom: 22rpx;
      }
    }
  }
</style>
