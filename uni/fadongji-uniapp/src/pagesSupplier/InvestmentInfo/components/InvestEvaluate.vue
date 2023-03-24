<template>
  <view class="evaluate" v-if="evaluateData && evaluateData.length">
    <view class="flex flex-justify-between flex-vertical-c">
      <view class="flex flex-vertical-c">
        <view class="evaluate-title">评价</view>
        <view class="evaluate-number" v-if="evaInfo && evaInfo.evaluateNumber">
          ({{ evaInfo.evaluateNumber }})
        </view>
        <view class="evaluate-degreePraise" v-if="evaInfo && evaInfo.favorableComment">
          好评度{{ evaInfo.favorableComment }}
        </view>
      </view>

      <view class="flex" @click="lookMoreClick">
        <view class="evaluate-more">查看更多</view>
        <VoIcon name="right-arrow" :size="16" color="#BFBFBF" />
      </view>
    </view>
    <EvaluateTags :tags="tagList" />
    <EvaluateItem
      v-for="(item, index) in evaluateData"
      :key="index"
      :evaluate-data="item"
      v-show="index < 2"
    />
  </view>
</template>

<script>
  import EvaluateTags from './EvaluateTags'
  import EvaluateItem from './EvaluateItem'

  export default {
    name: 'InvestEvaluate',
    components: {
      EvaluateTags,
      EvaluateItem,
    },
    props: {
      info: {
        type: Object,
        default() {
          return {}
        },
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
    },
    methods: {
      lookMoreClick() {
        // this.$emit('evaluateLookMore')
        let id = this.info.goodsId
        this.$linkToEasy('/pagesSupplier/InvestmentInfo/InvestEvaluate?goodsId=' + id)
      },
      getData() {
        console.log('this.info.goodsId', this.info.goodsId)
        //获取好评度及评价总数,获取评价标签
        this.$VoHttp
          .apiOrderEvaluateFavorableComment({
            sourceId: this.info.goodsId,
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
            sourceId: this.info.goodsId,
          })
          .then((res) => {
            if (res.data) {
              this.evaluateData = res.data.records
              this.evaluateData.forEach((item) => {
                if (item.content) {
                  item.mainContent = JSON.parse(item.content)
                  item.mainContent.imgArr = item.mainContent.pic
                    ? JSON.parse(item.mainContent.pic)
                    : []
                }
              })
            }
            console.log(this.evaluateData)
          })
          .catch((err) => {
            console.log('err', err)
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .evaluate {
    width: 750rpx;
    padding: 40rpx 32rpx 28rpx;
    background-color: #ffffff;
    box-sizing: border-box;
    margin-top: 16rpx;
    &-title {
      color: $v-c0-85;
      font-size: 28rpx;
      font-weight: bold;
    }

    &-number {
      color: $v-c0-85;
      font-size: 28rpx;
    }

    &-degreePraise {
      margin-left: 16rpx;
      color: $color-primary-red;
      font-size: 24rpx;
    }

    &-more {
      color: $v-c0-65;
      font-size: 26rpx;
      padding-right: 4rpx;
    }
  }
</style>
