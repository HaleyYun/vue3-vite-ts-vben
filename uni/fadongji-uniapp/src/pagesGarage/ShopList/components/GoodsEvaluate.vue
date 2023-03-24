<template>
  <view class="evaluate">
    <view class="evaluate-box">
      <view class="evaluate-box__title">
        <view class="left"
          >评价
          <text v-if="evaInfo && evaInfo.evaluateNumber" class="left-num">
            ({{ evaInfo.evaluateNumber }})
          </text>
          <text v-if="evaInfo && evaInfo.favorableComment" class="left-tip">
            好评度{{ evaInfo.favorableComment }}
          </text>
        </view>
        <view class="right" @click="toPage"
          >查看更多<VoIcon :opacity="0.25" :size="16" color="#000000" name="right-arrow"
        /></view>
      </view>
    </view>
    <view v-if="tagList && tagList.length" class="evaluate-tag">
      <!-- <view class="tag"> 全部(3) </view> -->
      <block v-for="(item, index) in tagList">
        <view v-show="index < 3 || openCode" :key="index" class="tag">
          {{ item.name }}<block v-if="item.value">({{ item.value }})</block>
        </view>
      </block>
    </view>
    <view v-if="evaluateData && evaluateData.length">
      <EvaluateItem
        v-for="(item, index) in evaluateData"
        v-show="index < 3"
        :key="index"
        :evaluate-data="item"
        pageName="evaluate"
      />
    </view>
  </view>
</template>
<script>
  // import MasterItem from '@/pagesSupplier/GoodsManage/components/MasterItem.vue'
  import EvaluateItem from './EvaluateItem.vue'

  export default {
    name: 'MasterTalk',
    components: { EvaluateItem },
    props: {
      info: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        labelArr: [
          {
            name: '',
            value: '',
            require: true,
          },
        ],
        tagList: [],
        evaluateData: [],
        evaInfo: '',
        openCode: false,
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
          .apiOrderEvaluateFavorableComment(
            {
              sourceId: this.info.id,
            },
            { noLoading: true },
          )
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
          .apiContentEvaluateQueryProductEvaluatePage(
            {
              sourceType: 0,
              sourceId: this.info.id,
            },
            { noLoading: true },
          )
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
        // this.$linkToEasy('/pagesSupplier/GoodsManage/GoodsEvaluateList?goodsId=')
        this.$linkToEasy('/pagesSupplier/InvestmentInfo/InvestEvaluate?goodsId=' + this.info.id)
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
      box-sizing: border-box;
      background-color: #fff;
      .tag {
        background: #ffece5;
        border: 2rpx solid #ff5319;
        border-radius: 100rpx;
        font-size: 24rpx;
        line-height: 1.5;
        text-align: center;
        color: #ff5319;
        padding: 4rpx 16rpx;
        margin-right: 36rpx;
        margin-bottom: 22rpx;
      }
    }
  }
</style>
