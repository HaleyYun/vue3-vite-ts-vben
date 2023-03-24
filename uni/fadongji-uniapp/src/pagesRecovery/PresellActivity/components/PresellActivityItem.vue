<template>
  <view class="presell_item">
    <view class="presell_item_time fz-28">
      <!--已暂停、待审核、已结束的预售活动，展示：预售活动开始时间-结束时间-->
      <!--状态1：待审核   2：未开始 3：进行中 4：已暂停 5：已结束 6：审核不通过-->
      <block v-if="goodData.status === 2 || goodData.status === 3">
        <view class="flex flex-justify-between">
          <view class="flex">
            <view class="m-r-12">距离预售结束还剩:</view>
            <u-count-down :time="downData" @change="onChange">
              <view class="time">
                <text class="time__item">{{ timeData.days }}天&nbsp;</text>
                <!--时-->
                <text v-if="timeData.hours" class="time__item m-l-12">
                  {{ timeData.hours > 9 ? timeData.hours : '0' + timeData.hours }}:</text
                >
                <text v-else class="time__item m-l-12">00:</text>
                <!--分-->
                <text v-if="timeData.minutes" class="time__item">
                  {{ timeData.minutes > 9 ? timeData.minutes : '0' + timeData.minutes }}:
                </text>
                <text v-else class="time__item m-l-12">00:</text>
                <!--秒-->
                <text class="time__item">
                  {{ timeData.seconds > 9 ? timeData.seconds : '0' + timeData.seconds }}
                </text>
              </view>
            </u-count-down>
          </view>
          <!--          <view class="error-text" v-if="goodData.status !== 4 && goodData.status !== 5">{{-->
          <!--            statusObj[goodData.status]-->
          <!--          }}</view>-->
        </view>
      </block>
      <block v-else>
        <view class="flex flex1">
          <view class="m-r-12">预售时间：</view>
          <view>{{ $vocenApi.VoUtils.timeFormat(goodData.startTime, 'mm月dd日 hh:MM') }}</view>
          <view>-{{ $vocenApi.VoUtils.timeFormat(goodData.endTime, 'mm月dd日 hh:MM') }}</view>
        </view>
      </block>
      <view v-if="goodData.status !== 4 && goodData.status !== 5" class="error-text">{{
        statusObj[goodData.status]
      }}</view>
    </view>
    <view class="presell_item_content">
      <view @click.stop="goDetail()">
        <view class="fz-b m-b-24">{{ goodData.name }}</view>
        <ProductTypes :data="goodData.levelVOS" />
      </view>

      <view class="presell_item_content_service fz-28 m-t-18">
        <text class="fz-28 m-r-11">服务费</text>
        <VoTooltip
          class="fz-0"
          color="rgba(17, 17, 17)"
          :arrowStyleSelf="{ left: 0 }"
          placement="right"
        >
          <view slot="content" class="fz-24">
            <view>每销售出1件商品，平台收</view>
            <view>取{{ goodData.platformPrice || 0 }}元的服务费。</view>
          </view>
          <VoIcon color="#8C8C8C" name="account-question" size="14" />
        </VoTooltip>
        <text class="m-l-19">{{ goodData.platformPrice || 0 }}元</text>
      </view>
      <!--未开始/进行中 显示.暂停预售 修改-->
      <block v-if="goodData.status === 2 || goodData.status === 3">
        <view class="presell_item_content_action m-t-24">
          <view class="flex">
            <view class="m-r-32" @click.stop="tapBtn(1, goodData)">
              <u-button
                customStyle="border-color:rgba(0, 0, 0, 0.25);color:rgba(0, 0, 0, 0.85);padding:5px 16px"
                plain
                shape="circle"
                size="small"
                text="修改"
              />
            </view>
            <view @click.stop="tapBtn(2, goodData)">
              <u-button
                customStyle="border-color:rgba(0, 0, 0, 0.25);color:rgba(0, 0, 0, 0.85);padding:5px 16px"
                plain
                shape="circle"
                size="small"
                text="暂停预售"
              />
            </view>
          </view>
        </view>
      </block>
      <!--已暂停 显示.修改  启动预售-->
      <block v-if="goodData.status === 4">
        <view class="presell_item_content_action m-t-24">
          <view class="flex">
            <view class="m-r-32" @click.stop="tapBtn(1, goodData)">
              <u-button
                customStyle="border-color:rgba(0, 0, 0, 0.25);color:rgba(0, 0, 0, 0.85);padding:5px 16px"
                plain
                shape="circle"
                size="small"
                text="修改"
              />
            </view>
            <view @click.stop="tapBtn(3, goodData)">
              <u-button
                customStyle="border-color:rgba(0, 0, 0, 0.25);color:rgba(0, 0, 0, 0.85);padding:5px 16px"
                plain
                shape="circle"
                size="small"
                text="启动预售"
              />
            </view>
          </view>
        </view>
      </block>
      <!--审核不通过 显示.查看原因  修改-->
      <block v-if="goodData.status === 6">
        <view class="presell_item_content_action m-t-24">
          <view class="flex">
            <view class="m-r-32" @click.stop="tapBtn(4, goodData)">
              <u-button
                customStyle="border-color:rgba(0, 0, 0, 0.25);color:rgba(0, 0, 0, 0.85);padding:5px 16px"
                plain
                shape="circle"
                size="small"
                text="查看原因"
              />
            </view>
            <view @click.stop="tapBtn(1, goodData)">
              <u-button
                customStyle="border-color:rgba(0, 0, 0, 0.25);color:rgba(0, 0, 0, 0.85);padding:5px 16px"
                plain
                shape="circle"
                size="small"
                text="修改"
              />
            </view>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
  import ProductTypes from './ProductTypes.vue'

  export default {
    name: 'PresellActivityItem',
    components: {
      ProductTypes,
    },
    props: {
      goodData: {
        type: Object,
        goodData: {},
      },
      orderId: {
        type: String,
        goodData: '',
      },
      index: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        statusObj: {
          1: '审核中',
          2: '未开始',
          3: '进行中',
          4: '已暂停',
          5: '已结束',
          6: '审核不通过',
        },
        timeData: {},
        downData: 0,
        newData: new Date().getTime(),
      }
    },
    created() {
      let Time = new Date(this.goodData.endTime.replace(/-/g, '/'))
      let timestemp = Time.getTime()
      this.downData = timestemp - this.newData
    },
    methods: {
      setToast(pos) {
        console.log(pos, '88888')
        if (pos !== this.index) {
          this.show = false
        }
      },
      /**
       * 跳转订单详情
       */
      goDetail() {
        if (!this.goodData.id) {
          return
        }
        this.$linkToEasy(
          '/pagesRecovery/PresellActivity/presellActivityAuditFailed?id=' + this.goodData.id,
        )
      },
      tapBtn(val, data) {
        //1.修改 2.暂停预售 3.启动预售 4.查看原因
        if (val === 4) {
          this.$emit('showReason', data.id)
          return
        }
        data.index = val
        this.$emit('bottomFn', data)
      },
      onChange(e) {
        this.timeData = e
      },
      //查看原因
    },
  }
</script>

<style lang="scss" scoped>
  .presell_item {
    background-color: #fff;
    padding: 0 32rpx;
    margin-top: 16rpx;

    &_time {
      display: flex;
      justify-content: space-between;
      border-bottom: 1rpx solid #f7f7f8;
      padding: 28rpx 0 16rpx 0;

      > :nth-child(1) {
        color: rgba(0, 0, 0, 0.85);
      }

      > :nth-child(2) {
        color: #ee0a24;
      }
    }

    &_content {
      padding: 24rpx 0;

      > :nth-child(1) {
        color: rgba(0, 0, 0, 0.85);
      }

      //   > :nth-child(2) {
      //     display: flex;
      //     align-items: center;
      //     color: #e50012;

      //     .product_price {
      //       text-align: center;

      //       > :nth-child(1) {
      //         line-height: 48rpx;
      //       }

      //       > :nth-child(2) {
      //         width: 100rpx;
      //         border: 1rpx solid #e50012;
      //         background-color: #fdf2f3;
      //         border-radius: 4rpx;
      //         margin: 10rpx auto;
      //       }
      //     }

      //     > :nth-child(2) {
      //       margin: 0 52rpx 0 92rpx;
      //     }
      //   }

      &_service {
        display: flex;
        align-items: center;
        color: rgba(0, 0, 0, 0.45);
      }

      &_action {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  .error-text {
    color: #f20014;
    font-size: 28rpx;
  }
</style>
