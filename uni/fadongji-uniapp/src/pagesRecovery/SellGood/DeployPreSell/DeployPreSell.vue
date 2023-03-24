<template>
  <view>
    <view class="new color-block fz-28 flex flex-column">
      <VoNav is-fixed is-have-more title="配置预售信息" />
      <view class="padding-box fz-32 font-weight-500 bg-white border-bottom m-t-16">
        <text class="color-red">*</text>预售信息
      </view>
      <view class="flex1 overflow-y">
        <!--      <view class="padding-box fz-32 font-weight-500 m-t-16 bg-white">回收信息</view>-->
        <EraForm
          ref="form"
          :model="formData"
          :rules="rules"
          class="new-form"
          labelPosition="left"
          labelWidth="180"
        >
          <block>
            <block v-for="(item, index) in formData.levelBOS">
              <view :key="item.level + index" class="m-t-16">
                <!-- 原价 -->
                <EraFormItem
                  :label="`${item.level}类商品原价`"
                  class="new-form__item"
                  color="rgba(0, 0, 0, 0.85)"
                  required
                >
                  <view class="flex1 text-right">{{ baseData[index].price || '---' }}</view>
                </EraFormItem>
                <!-- 预售价 -->
                <EraFormItem
                  :label="`${item.level}类预售价格`"
                  class="new-form__item"
                  color="rgba(0, 0, 0, 0.85)"
                  required
                >
                  <u--input
                    v-model.number="item.price"
                    :formatter="formatterMoney"
                    border="none"
                    disabledColor="#ffffff"
                    fontSize="16px"
                    inputAlign="right"
                    placeholder="请输入"
                    placeholderClass="release-form__placeholder"
                  />
                </EraFormItem>
                <!-- 数量 -->
                <EraFormItem
                  :label="`${item.level}类商品数量`"
                  class="new-form__item"
                  color="rgba(0, 0, 0, 0.85)"
                  required
                >
                  <u--input
                    v-model.number="item.count"
                    :formatter="formatterInt"
                    border="none"
                    disabledColor="#ffffff"
                    fontSize="16px"
                    inputAlign="right"
                    placeholder="请输入"
                    placeholderClass="release-form__placeholder"
                  />
                </EraFormItem>
              </view>
            </block>

            <view
              v-if="
                (!formData.levelBOS[0].price || !formData.levelBOS[0].count) &&
                (!formData.levelBOS[1].price || !formData.levelBOS[1].count) &&
                (!formData.levelBOS[2].price || !formData.levelBOS[2].count)
              "
              class="text-right fz-28 bg-white p-r-32 msg p-b-8"
            >
              请至少填写1个成色商品的预售价格和预售数量
            </view>
          </block>
          <!-- 运费 -->
          <EraFormItem
            class="new-form__item m-b-16 m-t-16"
            color="rgba(0, 0, 0, 0.85)"
            label="运费"
            prop="shippingType"
            required
          >
            <view class="flex1 flex flex-vertical-c">
              <EraRadioGroup
                v-model="formData.shippingType"
                class="flex1 flex-justify-r"
                color="#22284B"
              >
                <EraRadio :name="2" label="到付" />
                <EraRadio :name="1" label="包邮" />
              </EraRadioGroup>
            </view>
          </EraFormItem>
          <!-- 预售开始时间 -->
          <EraFormItem
            class="new-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="预售开始时间"
            prop="startTime"
            required
            @click="showStartTime = true"
          >
            <u-input
              v-model="formData.startTime"
              border="none"
              class="item-input"
              color="rgba(0, 0, 0, 0.85)"
              fontSize="16px"
              inputAlign="right"
              placeholder="请选择"
              placeholderClass="apply-form__placeholder color-block-25"
              readonly
              type="text"
            />
            <VoIcon :opacity="0.45" :size="20" color="#000000" name="right-arrow" />
          </EraFormItem>
          <!-- 预售结束时间 -->
          <EraFormItem
            class="new-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="预售结束时间"
            prop="endTime"
            required
            @click="showEndTime = true"
          >
            <u-input
              v-model="formData.endTime"
              border="none"
              class="item-input"
              color="rgba(0, 0, 0, 0.85)"
              fontSize="16px"
              inputAlign="right"
              placeholder="请选择"
              placeholderClass="apply-form__placeholder color-block-25"
              readonly
              type="text"
            />
            <VoIcon :opacity="0.45" :size="20" color="#000000" name="right-arrow" />
          </EraFormItem>
          <!-- 预计发货时间 -->
          <EraFormItem
            class="new-form__item m-b-16"
            color="rgba(0, 0, 0, 0.85)"
            label="预计发货时间"
            prop="deliveryTime"
            required
            @click="showDeliveryTime = true"
          >
            <u-input
              v-model="formData.deliveryTime"
              border="none"
              class="item-input"
              color="rgba(0, 0, 0, 0.85)"
              fontSize="16px"
              inputAlign="right"
              placeholder="请选择"
              placeholderClass="apply-form__placeholder color-block-25"
              readonly
              type="text"
            />
            <VoIcon :opacity="0.45" :size="20" color="#000000" name="right-arrow" />
          </EraFormItem>
          <!-- 审核通过后立即发布 -->
          <EraFormItem
            class="new-form__item m-b-16"
            color="rgba(0, 0, 0, 0.85)"
            label="审核通过后立即发布"
            labelWidth="200"
            prop="set"
          >
            <view class="flex1 flex flex-justify-r">
              <EraSwitch
                v-model="formData.isAvailable"
                :activeValue="1"
                :inactiveValue="0"
                activeColor="#07C160"
                inactiveColor="rgba(0, 0, 0, 0.15)"
                size="26"
              />
            </view>
          </EraFormItem>
        </EraForm>
      </view>
      <view class="new-bottom p-b-safe-area">
        <EraButton circle text="提交" @click="complete" />
        <!-- <EraButton circle text="提交" disabled fontColor="rgba(255, 255, 255, 0.85)" v-else /> -->
        <view class="p-b-safe-area" />
      </view>
      <view class="p-b-safe-area" />
    </view>
    <!-- 发货时间最大值必须小于结束时间或者是发货时间（设置最大值） 新需求 bug号：6679 -->
    <u-datetime-picker
      v-model="value1"
      :maxDate="
        formData.endTime ? value2 : formData.deliveryTime ? formData.deliveryTime : 3740967920000
      "
      :minDate="Number(new Date()) + 3600000 + 24 * 3600000"
      :show="showStartTime"
      closeOnClickOverlay
      mode="datetime"
      title="开始时间"
      @cancel="close"
      :formatter="formatter"
      @confirm="confirmStartTime"
    />
    <!-- 结束时间必须晚于开始时间（设置最小时间） -->
    <u-datetime-picker
      v-model="value2"
      :maxDate="3740967920000"
      :minDate="
        formData.startTime ? value1 + 3600000 * 24 * 3 : Number(new Date()) + 3600000 * 24 * 3
      "
      :show="showEndTime"
      closeOnClickOverlay
      mode="datetime"
      title="结束时间"
      @cancel="close"
      :formatter="formatter"
      @confirm="confirmEndTime"
    />
    <!-- 发货时间必须晚于开始时间（设置最小时间） -->
    <u-datetime-picker
      v-model="value3"
      :formatter="formatter"
      :maxDate="3740967920000"
      :minDate="formData.startTime ? value1 : Number(new Date())"
      :show="showDeliveryTime"
      closeOnClickOverlay
      mode="datetime"
      title="预计发货时间"
      @cancel="close"
      @confirm="confirmDeliveryTime"
    />
  </view>
</template>

<script>
  import { formatterHandle } from '@/common/helper'

  export default {
    name: 'DeployPreSell',
    // onReady() {
      // 微信小程序需要用此写法
      // this.$refs.datetimePicker.setFormatter(this.formatter)
    // },
    data() {
      return {
        value1: Number(new Date()) + 3600000, // 开始时间选择器的默认值
        value2: Number(new Date()), // 结束时间选择器的默认值
        value3: Number(new Date()), // 预计发货时间选择器的默认值
        showStartTime: false, // 开始时间选择器
        showEndTime: false, // 结束时间选择器
        showDeliveryTime: false, // 预计发货时间选择器
        isLoading: false,
        formData: {
          levelBOS: [
            {
              level: 'A', // 成色
              price: '', // 价格
              id: '', // 主键,修改必传
              count: '', // 数量
            },
            {
              level: 'B', // 成色
              price: '', // 价格
              id: '', // 主键,修改必传
              count: '', // 数量
            },
            {
              level: 'C', // 成色
              price: '', // 价格
              id: '', // 主键,修改必传
              count: '', // 数量
            },
          ],
          shippingType: 2, // 运费
          startTime: '', // 预售开始时间
          endTime: '', // 预售结束时间
          deliveryTime: '', // 预计发货时间
          isAvailable: 1, // 审核通过后立即发布
        },
        formatterInt: (value) => formatterHandle(value, 'int'),
        formatterMoney: (value) => formatterHandle(value, 'money'),
        rules: {
          startTime: {
            type: 'string',
            required: true,
            message: '不可为空',
            trigger: ['blur'],
          },
          endTime: {
            type: 'string',
            required: true,
            message: '不可为空',
            trigger: ['blur'],
          },
          deliveryTime: {
            type: 'string',
            required: true,
            message: '不可为空',
            trigger: ['blur'],
          },
        },
        baseData: [
          { level: 'A', price: '', desc: '成色上等商品' },
          { level: 'B', price: '', desc: '成色中等商品' },
          { level: 'C', price: '', desc: '成色下等商品' },
        ],
      }
    },
    onLoad(options) {
      // console.log(this.value1);
      // console.log(this.value2);
      // this.formData.startTime = this.$vocenApi.VoUtils.timeFormat(
      //   this.value1,
      //   'yyyy-mm-dd hh:MM:ss',
      // )
      // this.formData.endTime = this.$vocenApi.VoUtils.timeFormat(this.value2, 'yyyy-mm-dd hh:MM:ss')
      if (options.data) {
        this.baseData = JSON.parse(options.data)
      }
      if (options.preSaleBO) {
        this.formData = JSON.parse(options.preSaleBO)
      }
    },
    onShow() {},
    methods: {
      formatter(type, value) {
        if (type === 'year') {
          return `${value}年`
        }
        if (type === 'month') {
          return `${value}月`
        }
        if (type === 'day') {
          return `${value}日`
        }
        return value
      },
      /**
       * 关闭选择器时触发
       */
      close() {
        this.showStartTime = false
        this.showEndTime = false
        this.showDeliveryTime = false
      },
      /**
       * 预售开始时间选择器点击确定按钮
       */
      confirmStartTime(e) {
        this.formData.startTime = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd hh:MM:ss')
        this.close()
      },

      /**
       * 预售结束时间选择器点击确定按钮
       */
      confirmEndTime(e) {
        this.formData.endTime = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd hh:MM:ss')
        this.close()
      },
      /**
       * 预售结束时间选择器点击确定按钮
       */
      confirmDeliveryTime(e) {
        this.formData.deliveryTime = this.$vocenApi.VoUtils.timeFormat(
          e.value,
          'yyyy-mm-dd hh:MM:ss',
        )
        this.close()
      },
      complete() {
        this.$refs.form.validate().then((res) => {
          if (
            (!this.formData.levelBOS[0].price || !this.formData.levelBOS[0].count) &&
            (!this.formData.levelBOS[1].price || !this.formData.levelBOS[1].count) &&
            (!this.formData.levelBOS[2].price || !this.formData.levelBOS[2].count)
          ) {
            return
          }
          uni.$emit('settingPreSale', this.formData)
          this.$backFn()
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .new {
    width: 750rpx;
    height: 100vh;
    box-sizing: border-box;
    .padding-box {
      padding: 24rpx 32rpx;
      box-sizing: border-box;
    }
    .msg {
      color: #f56c6c;
    }
    &-form {
      &__item {
        text-align: right;
        border-bottom: 2rpx solid $v-bg-light;
        padding: 0 32rpx 10rpx 32rpx;
        box-sizing: border-box;
        background: #ffffff;
        .item-code {
          margin-left: 24rpx;
        }
        .item-textarea {
          padding: 4rpx;
        }
      }
      &__time {
        width: 168rpx;
        height: 64rpx;
        background: $v-bg-light;
        border-radius: 8rpx;
        font-size: 26rpx;
        line-height: 64rpx;
        text-align: center;
        color: $v-c0-65;
      }
      &__to {
        width: 24rpx;
        height: 2rpx;
        background: $v-text-disabled;
        margin: 0 12rpx;
      }
      &__box {
        font-size: 32rpx;
        color: $v-c0-65;
        line-height: 150%;
      }
      &__word {
        font-size: 32rpx;
        color: $v-c0-85;
      }
      &__code {
        font-size: 32rpx;
        line-height: 1.5;
        color: var(--color-primary);
      }
      &__placeholder {
        text-align: right;
        color: $v-c0-25 !important;
        font-size: 32rpx !important;
      }
    }
    &-delete {
      width: 750rpx;
      height: 96rpx;
      line-height: 96rpx;
      background: #ffffff;
      margin-top: 24rpx;
      text-align: center;
      font-size: 32rpx;
      color: $v-c0-45;
    }
    &-bottom {
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      border-top: 2rpx solid $v-bg-light;
    }
  }
  .color-gray {
    color: rgba(0, 0, 0, 0.25) !important;
  }
  .flex-end {
    justify-content: flex-end;
  }
</style>
