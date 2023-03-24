<template>
  <view class="uploaded">
    <VoNav :is-fixed="false" is-have-more title="发布预售信息" />
    <view>
      <view class="line-bg h16" />
      <u-form
        ref="form"
        :model="formData"
        :rules="rules"
        class="uploaded-form"
        labelPosition="left"
        labelWidth="150"
      >
        <u-form-item
          class="uploaded-form__item m-b-16"
          label="选择商品"
          prop="value1"
          required
          @click="nextPage"
        >
          <view class="form_item_view">{{ formData.value1 }}</view>
          <view slot="right">
            <u-icon name="arrow-right" />
          </view>
        </u-form-item>
        <u-form-item class="uploaded-form__item" label="预售信息" required />
        <block v-if="aShow">
          <u-form-item
            class="uploaded-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="A类原价"
            prop="value2"
          >
            <u-input
              v-model="formData.value2"
              border="none"
              disabled
              disabledColor="#ffffff"
              fontSize="16px"
              inputAlign="right"
              placeholder="请输入"
              placeholderClass="uploaded-form__placeholder"
            />
          </u-form-item>
          <u-form-item
            class="uploaded-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="A类价格"
            prop="value3"
          >
            <u-input
              v-model="formData.value3"
              :maxlength="6"
              border="none"
              class="item-input m-r-6"
              color="rgba(0, 0, 0, 0.85)"
              inputAlign="right"
              placeholder="请输入"
              placeholderClass="placeholder"
              type="digit"
            />
          </u-form-item>
          <u-form-item
            class="uploaded-form__item m-b-16"
            color="rgba(0, 0, 0, 0.85)"
            label="A类数量"
            prop="value4"
          >
            <u-input
              v-model="formData.value4"
              border="none"
              disabledColor="#ffffff"
              fontSize="16px"
              inputAlign="right"
              placeholder="请输入"
              placeholderClass="uploaded-form__placeholder"
            />
          </u-form-item>
        </block>
        <block v-if="bShow">
          <u-form-item
            class="uploaded-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="B类原价"
            prop="value5"
          >
            <u-input
              v-model="formData.value5"
              border="none"
              disabled
              disabledColor="#ffffff"
              fontSize="16px"
              inputAlign="right"
              placeholder="请输入"
              placeholderClass="uploaded-form__placeholder"
            />
          </u-form-item>
          <u-form-item
            class="uploaded-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="B类价格"
            prop="value6"
          >
            <u-input
              v-model="formData.value6"
              border="none"
              disabledColor="#ffffff"
              fontSize="16px"
              inputAlign="right"
              placeholder="请输入"
              placeholderClass="uploaded-form__placeholder"
              type="digit"
            />
          </u-form-item>
          <u-form-item
            class="uploaded-form__item m-b-16"
            color="rgba(0, 0, 0, 0.85)"
            label="B类数量"
            prop="value7"
          >
            <u-input
              v-model="formData.value7"
              border="none"
              disabledColor="#ffffff"
              fontSize="16px"
              inputAlign="right"
              placeholder="请输入"
              placeholderClass="uploaded-form__placeholder"
              type="number"
            />
          </u-form-item>
        </block>
        <block v-if="cShow">
          <u-form-item
            class="uploaded-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="C类原价"
            prop="value8"
          >
            <u-input
              v-model="formData.value8"
              border="none"
              disabled
              disabledColor="#ffffff"
              fontSize="16px"
              inputAlign="right"
              placeholder="请输入"
              placeholderClass="uploaded-form__placeholder"
            />
          </u-form-item>
          <u-form-item
            class="uploaded-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="C类价格"
            prop="value9"
          >
            <u-input
              v-model="formData.value9"
              border="none"
              disabledColor="#ffffff"
              fontSize="16px"
              inputAlign="right"
              placeholder="请输入"
              placeholderClass="uploaded-form__placeholder"
              type="digit"
            />
          </u-form-item>
          <u-form-item
            class="uploaded-form__item2"
            color="rgba(0, 0, 0, 0.85)"
            label="C类数量"
            prop="value10"
          >
            <u-input
              v-model="formData.value10"
              border="none"
              disabledColor="#ffffff"
              fontSize="16px"
              inputAlign="right"
              placeholder="请输入"
              placeholderClass="uploaded-form__placeholder"
              type="number"
            />
          </u-form-item>
        </block>
        <view class="warn m-b-16">请至少填写1个成色商品的预售价格和预售数量</view>
        <u-form-item
          class="uploaded-form__item"
          color="rgba(0, 0, 0, 0.85)"
          label="运费"
          prop="value11"
          required
        >
          <view slot="right">
            <EraRadioGroup v-model="formData.value11" placement="row">
              <EraRadio
                v-for="(item, index) in radiolist1"
                :key="index"
                :class="{ 'm-l-60': index == 1 }"
                :label="item.name"
                :name="item.name"
                labelColor="#000"
              />
            </EraRadioGroup>
          </view>
        </u-form-item>
        <u-form-item
          class="uploaded-form__item m-b-16"
          label="预售时间"
          labelWidth="80"
          prop="value12"
          required
        >
          <view slot="right" class="flex time_con">
            <view class="align-right" @click="selectTime('startTime')">
              <text v-if="startTime" class="color-block-65 flex1"> {{ formateTime(startTime) }}</text>
              <text v-else class="gray"> 开始时间</text>
            </view>
            <view class="m-l-20 m-r-20">至</view>
            <view class="align-left" @click="selectTime('endTime')">
              <text v-if="endTime" class="color-block-65 flex1"> {{ formateTime(endTime) }}</text>
              <text v-else class="gray"> 结束时间</text>
            </view>
          </view>
        </u-form-item>
        <u-form-item
          class="uploaded-form__item m-b-16"
          label="预计发货时间"
          prop="value13"
          @click="show3 = true"
        >
          <view slot="right" class="flex flex-vertical-c">
            <view class="align-left">
              <text v-if="formData.value13" class="color-block-65"> {{ formateTime1(formData.value13) }}</text>
              <text v-else class="gray"> 请选择</text>
            </view>
            <u-icon name="arrow-right" />
          </view>
        </u-form-item>
        <u-form-item class="uploaded-form__item m-b-16" label="审核通过后立即发布" prop="value14">
          <view slot="right">
            <u-switch v-model="formData.value14" activeColor="#07C160" />
          </view>
        </u-form-item>
      </u-form>
      <VoAddress />
      <u-picker />
      <u-datetime-picker
        v-model="defaultDate"
        :minDate="show1MinDate"
        :maxDate="show1MaxDate"
        :show="show1"
        mode="datetime"
        @cancel="show1 = false"
        @confirm="confirm1"
      />

      <u-datetime-picker
        v-model="formData.value13"
        :minDate="+new Date(new Date().getTime() + 24*60*60*1000)"
        :show="show3"
        closeOnClickOverlay
        confirmColor="rgba(0,0,0,0.85)"
        mode="date"
        placeholder="请选择"
        title="预计发货时间"
        @cancel="show3 = false"
        @click="show3 = true"
        @close="show3 = false"
        @confirm="confirm2"
      />
      <!--      <u-calendar :show="show3" mode="single" @cancel="show3 = false" @confirm="confirm2" />-->
    </view>
    <view class="uploaded-footer flex p-b-safe-area">
      <u-button
        class="uploaded-footer__button"
        color="#FF5319"
        shape="circle"
        text="提交审核"
        @click="formSubmit"
      />
    </view>
  </view>
</template>

<script>
  import EraRadioGroup from '../../uni_modules/era-ui/components/EraRadioGroup/EraRadioGroup'

  export default {
    components: { EraRadioGroup },
    data() {
      return {
        status: '', // 6审核不通过
        show1: false,
        show2: false,
        show3: false,
        time: '',
        goodId: '',
        defaultDate: this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd hh:MM:00'),
        show1MinDate: this.$vocenApi.dayjs().valueOf(),
        show1MaxDate: 3740967920000,
        radiolist1: [
          {
            name: '到付',
            disabled: false,
          },
          {
            name: '包邮',
            disabled: false,
          },
        ],
        formData: {
          value12: '',
          value11: '到付',
          value14: false,
        },
        rules: {
          value1: [
            {
              required: true,
              message: '请选择商品',
              trigger: ['change'],
            },
          ],
          value2: [
            {
              required: true,
              message: '不可为空',
              type: 'number',
              // blur和change事件触发检验
              trigger: ['blur', 'change'],
            },
            {
              validator: (rule, value, callback) => {
                return this.$vocenApi.Pattern.isMoney(value)
              },
              trigger: ['blur'],
              message: '请输入整数或小数',
            },
          ],
          value3: [
            // {
            //   required: true,
            //   message: '不可为空',
            //   type: 'number',
            //   // blur和change事件触发检验
            //   trigger: ['blur', 'change'],
            // },
            // {
            //   validator: (rule, value, callback) => {
            //     return this.$vocenApi.Pattern.isMoney(value)
            //   },
            //   trigger: ['blur'],
            //   message: '请输入整数或小数',
            // },
          ],
          value4: [
            // {
            //   required: true,
            //   message: '不可为空',
            //   type: 'number',
            //   // blur和change事件触发检验
            //   trigger: ['blur', 'change'],
            // },
            // {
            //   validator: (rule, value, callback) => {
            //     return value > 0
            //   },
            //   trigger: ['blur'],
            //   message: '预售数量必须大于0',
            // },
            // {
            //   validator: (rule, value, callback) => {
            //     return this.$vocenApi.Pattern.isIntNumber(value)
            //   },
            //   trigger: ['blur'],
            //   message: '预售数量必须是整数',
            // },
          ],
          value5: [
            {
              required: true,
              message: '不可为空',
              type: 'number',
              // blur和change事件触发检验
              trigger: ['blur', 'change'],
            },
            {
              validator: (rule, value, callback) => {
                return this.$vocenApi.Pattern.isMoney(value)
              },
              trigger: ['blur'],
              message: '请输入整数或小数',
            },
          ],
          value6: [
            // {
            //   required: true,
            //   message: '不可为空',
            //   type: 'number',
            //   // blur和change事件触发检验
            //   trigger: ['blur', 'change'],
            // },
            // {
            //   validator: (rule, value, callback) => {
            //     return this.$vocenApi.Pattern.isMoney(value)
            //   },
            //   trigger: ['blur'],
            //   message: '请输入整数或小数',
            // },
          ],
          value7: [
            // {
            //   required: true,
            //   message: '不可为空',
            //   type: 'number',
            //   // blur和change事件触发检验
            //   trigger: ['blur', 'change'],
            // },
            // {
            //   validator: (rule, value, callback) => {
            //     return value > 0
            //   },
            //   trigger: ['blur'],
            //   message: '预售数量必须大于0',
            // },
            // {
            //   validator: (rule, value, callback) => {
            //     return this.$vocenApi.Pattern.isIntNumber(value)
            //   },
            //   trigger: ['blur'],
            //   message: '预售数量必须是整数',
            // },
          ],
          value8: [
            {
              required: true,
              message: '不可为空',
              type: 'number',
              // blur和change事件触发检验
              trigger: ['blur', 'change'],
            },
            {
              validator: (rule, value, callback) => {
                return this.$vocenApi.Pattern.isMoney(value)
              },
              trigger: ['blur'],
              message: '请输入整数或小数',
            },
          ],
          value9: [
            // {
            //   required: true,
            //   type: 'number',
            //   message: '不可为空',
            //   // blur和change事件触发检验
            //   trigger: ['blur', 'change'],
            // },
            // {
            //   validator: (rule, value, callback) => {
            //     return this.$vocenApi.Pattern.isMoney(value)
            //   },
            //   trigger: ['blur'],
            //   message: '请输入整数或小数',
            // },
          ],
          value10: [
            // {
            //   required: true,
            //   message: '不可为空',
            //   type: 'number',
            //   // blur和change事件触发检验
            //   trigger: ['blur', 'change'],
            // },
            // {
            //   validator: (rule, value, callback) => {
            //     return value > 0
            //   },
            //   trigger: ['blur'],
            //   message: '预售数量必须大于0',
            // },
            // {
            //   validator: (rule, value, callback) => {
            //     return this.$vocenApi.Pattern.isIntNumber(value)
            //   },
            //   trigger: ['blur'],
            //   message: '预售数量必须是整数',
            // },
          ],
          value11: [
            {
              required: true,
              message: '请选择',
              // blur和change事件触发检验
              trigger: ['blur', 'change'],
            },
          ],
          value12: [
            {
              required: true,
              validator: (rule, value, callback) => {
                if (!this.startTime) callback(new Error('开始时间不能为空'))
                if (!this.endTime) callback(new Error('结束时间不能为空'))
                if (this.$vocenApi.dayjs(this.endTime).isBefore(this.startTime)) {
                  callback(new Error('结束时间不能早于开始时间'))
                }
                callback()
              },
              trigger: ['blur', 'change'],
            },
          ],
          value13: [
            // {
            //   required: true,
            //   message: '请选择',
            //   type: 'string',
            //   // blur和change事件触发检验
            //   trigger: ['blur', 'change'],
            // },
          ],
        },
        startTime: '',
        endTime: '',
        deliveryTime: '',
        //来源 1.发布 2.修改 3.选择商品
        sourceType: '',
        //预售商品主键id
        sellId: '',
        //A类商品
        aClassInfo: {},
        aShow: false,
        //B类商品
        bClassInfo: {},
        bShow: false,
        //C类商品
        cClassInfo: {},
        cShow: false,
        currentSelectTime: '', //'startTime' 'endTime'
      }
    },
    methods: {
      formateTime(val) {
        return this.$vocenApi.VoUtils.timeFormat(val, 'yyyy年mm月dd日 hh:MM')
      },
      formateTime1(val) {
        return this.$vocenApi.VoUtils.timeFormat(val, 'yyyy年mm月dd日')
      },
      selectTime(val) {
        this.currentSelectTime = val
        if (val == 'startTime') {
          this.defaultDate = this.$vocenApi.dayjs().add(1, 'day').format('YYYY-MM-DD HH:mm:00')
          this.show1MinDate = this.$vocenApi.dayjs().valueOf()
          if (this.endTime) {
            this.show1MaxDate = this.$vocenApi.dayjs(this.endTime).valueOf()
          }
        } else {
          if (this.startTime) {
            this.defaultDate = this.$vocenApi
              .dayjs(this.startTime)
              .add(3, 'day')
              .format('YYYY-MM-DD HH:mm:00')
            this.show1MinDate = this.$vocenApi.dayjs(this.startTime).valueOf()
            this.show1MaxDate = 3740967920000
          }
        }
        this.show1 = true
      },
      confirm1(e) {
        if (this.currentSelectTime == 'startTime') {
          this.startTime = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd hh:MM:00')
        } else if (this.currentSelectTime == 'endTime') {
          this.endTime = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd hh:MM:00')
        }
        this.formData.value12 = e.value
        this.show1 = false
      },
      confirm2(e) {
        this.formData.value13 = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd')
        console.log(this.formData.value13, '预计发货时间')
        this.deliveryTime = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd hh:MM:ss')
        this.show3 = false
      },
      nextPage() {
        this.$linkToEasy('/pagesRecovery/PresellActivity/presellActivitySelectGoods')
      },
      async formSubmit() {
        try {
          const res = await this.$refs.form.validate()
          if (
            (this.formData.value3 && this.formData.value4) ||
            (this.formData.value6 && this.formData.value7) ||
            (this.formData.value9 && this.formData.value10)
          ) {
            let levelBOS = []
            if (this.aShow) {
              if (this.formData.value3 && this.formData.value4) {
                levelBOS.push({
                  level: 'A',
                  price: this.formData.value3,
                  count: this.formData.value4,
                })
              }
            }
            if (this.bShow) {
              if (this.formData.value6 && this.formData.value7) {
                levelBOS.push({
                  level: 'B',
                  price: this.formData.value6,
                  count: this.formData.value7,
                })
              }
            }
            if (this.cShow) {
              if (this.formData.value9 && this.formData.value10) {
                levelBOS.push({
                  level: 'C',
                  price: this.formData.value9,
                  count: this.formData.value10,
                })
              }
            }
            this.formData.value11 = '1'
            let param = {
              resaleId: this.goodId,
              shippingType: this.formData.value11 === '包邮' ? 1 : 2,
              startTime: this.startTime,
              endTime: this.endTime,
              deliveryTime: this.deliveryTime,
              isAvailable: this.formData.value14 === false ? 0 : 1,
              levelBOS: levelBOS,
            }
            if (+this.status === 6) {
              param.status = 1
            }

            if (this.sourceType === 2) {
              param.id = this.sellId
              this.saleEdit(param)
              return
            }
            this.saleSave(param)
          } else {
            uni.$u.toast('请至少填写1个成色预售信息')
            return
          }
        } catch (err) {
          console.log(err)
        }
      },
      //添加预售活动
      saleSave(param) {
        console.log('1111111', param)
        this.$VoHttp
          .apiGoodsRecyclePreSaleSave(param)
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('预售活动添加成功')
              setTimeout(() => {
                this.$linkToEasy('/pagesRecovery/PresellActivity/PresellActivityList')
              }, 1500)
            } else {
              uni.$u.toast(res.message || '预售活动添加失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '预售活动添加失败')
          })
      },
      //修改预售活动
      saleEdit(param) {
        this.$VoHttp
          .apiGoodsRecyclePreSaleUpdate(param)
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('预售活动修改成功')
              setTimeout(() => {
                this.$linkToEasy('/pagesRecovery/PresellActivity/PresellActivityList')
              }, 1500)
            } else {
              uni.$u.toast(res.message || '预售活动修改失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '预售活动修改失败')
          })
      },
      //获取订单详情
      getOrderDetailRequest(id) {
        this.$VoHttp
          .apiGoodsRecyclePreSaleQueryInfo({ id: id })
          .then((res) => {
            if (res.code === '20001') {
              this.processDetail(res.data)
            } else {
              uni.$u.toast(res.message || '订单详情获取失败')
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast(err.message || '订单详情获取失败')
          })
      },
      processDetail(data) {
        console.log('订单详情', data)
        this.status = data.status
        this.sellId = data.id
        this.goodId = data.resaleId
        this.formData.value1 = data.name
        //运费
        if (data.shippingType === 2) {
          this.formData.value11 = '包邮'
        } else {
          this.formData.value11 = '到付'
        }
        //预售时间 结束时间
        this.startTime = data.startTime
        this.endTime = data.endTime
        this.formData.value12 =
          this.$vocenApi.VoUtils.timeFormat(this.startTime, 'yyyy-mm-dd') +
          '至' +
          this.$vocenApi.VoUtils.timeFormat(this.endTime, 'yyyy-mm-dd')
        //发货时间
        this.formData.value13 = this.$vocenApi.VoUtils.timeFormat(data.deliveryTime, 'yyyy-mm-dd')
        this.deliveryTime = this.$vocenApi.VoUtils.timeFormat(
          data.deliveryTime,
          'yyyy-mm-dd hh:MM:ss',
        )
        //预售信息
        data.levelInfoDTOS.forEach((item) => {
          if (item.level === 'A') {
            this.aShow = true
            this.formData.value2 = item.originalSalePrice
            this.formData.value3 = item.price
            this.formData.value4 = item.count
          }
          if (item.level === 'B') {
            this.bShow = true
            this.formData.value5 = item.originalSalePrice
            this.formData.value6 = item.price
            this.formData.value7 = item.count
          }
          if (item.level === 'C') {
            this.cShow = true
            this.formData.value8 = item.originalSalePrice
            this.formData.value9 = item.price
            this.formData.value10 = item.count
          }
        })
        //审核通过过是否立即发布
        if (data.isAvailable === 0) {
          this.formData.value14 = false
        } else {
          this.formData.value14 = true
        }
        this.$forceUpdate()
      },
    },
    onLoad(val) {
      this.formData.value1 = val.name
      this.sourceType = Number(val.sourceType)
      if (this.sourceType === 2) {
        this.getOrderDetailRequest(val.id)
      }
      if (this.sourceType === 3) {
        this.goodId = val.id
        let levelInfoDTOS = JSON.parse(val.levelVOS)
        levelInfoDTOS.forEach((item) => {
          if (item.level === 'A') {
            this.aShow = true
            this.formData.value2 = item.price
            this.formData.value3 = item.price
            this.formData.value4 = item.availableNumber
          }
          if (item.level === 'B') {
            this.bShow = true
            this.formData.value5 = item.price
            this.formData.value6 = item.price
            this.formData.value7 = item.availableNumber
          }
          if (item.level === 'C') {
            this.cShow = true
            this.formData.value8 = item.price
            this.formData.value9 = item.price
            this.formData.value10 = item.availableNumber
          }
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .uploaded {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    // overflow: hidden;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    > :nth-child(2) {
      flex-grow: 1;
      overflow: auto;
    }
    &-form {
      &__item {
        padding: 0rpx 32rpx;
        text-align: right;
        border-bottom: 2rpx solid $v-bg-light;
        background: $v-bg-white;
      }
      &__item2 {
        padding: 0rpx 32rpx;
        text-align: right;
        background: $v-bg-white;
      }
      .form_item_view {
        width: 100%;
        text-align: right;
      }
      &__placeholder {
        text-align: right;
        color: $v-c0-25 !important;
      }
      .text {
        color: rgba(0, 0, 0, 0.45);
      }
    }
    .warn {
      color: #ee0a24;
      font-size: 28rpx;
      text-align: right;
      padding: 2rpx 32rpx 8rpx 32rpx;
      background-color: #fff;
    }
    &-footer {
      //   position: fixed;
      //   left: 0;
      //   bottom: 0;
      //   z-index: 3;
      height: 132rpx;
      line-height: 132rpx;
      border-top: 2rpx solid rgba(24, 34, 65, 0.08);
      width: 100%;
      background: $v-bg-white;

      &__button {
        width: 656rpx;
        height: 80rpx;
        margin: auto;
      }
    }
  }
  .time_con {
    flex-grow: 1;
    justify-content: flex-end;
    > :nth-child(1) {
      flex-grow: 1;
      flex-shrink: 0;
    }
    > :nth-child(3) {
      flex-grow: 1;
      flex-shrink: 0;
    }
  }
  .align-right {
    text-align: right;
  }
  .align-left {
    text-align: left;
  }
  .gray {
    color: #bfbfbf;
  }
</style>
