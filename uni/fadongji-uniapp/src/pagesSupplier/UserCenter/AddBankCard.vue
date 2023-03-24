<template>
  <view :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }" class="add">
    <VoNav is-fixed is-have-more title="新增银行卡" />
    <!--    <view class="add-tabs">-->
    <!--      <EraTabs-->
    <!--        :current="currentTab"-->
    <!--        :list="tabsList"-->
    <!--        :scrollable="false"-->
    <!--        activeStyle="font-weight: bold;color: #FF5319"-->
    <!--        @change="changeTabs"-->
    <!--      />-->
    <!--    </view>-->
    <view class="flex flex-justify-r m-24">
      <view class="flex flex-justify-c">
        <VoIcon
          :opacity="0.85"
          :size="16"
          color="#000"
          name="question-line"
          @click="showCareFul = true"
        />
        <view class="fz-24 color-block-85 lh150 m-l-8">注意事项</view>
      </view>
    </view>
    <swiper :autoplay="false" :current="currentTab" class="flex1" @change="changeSwiper">
      <!--      <swiper-item>-->
      <!--        <scroll-view :scroll-y="true" class="add-scroll flex1">-->
      <!--          <EraForm-->
      <!--            ref="form"-->
      <!--            :model="formData"-->
      <!--            :rules="rules"-->
      <!--            class="add-form"-->
      <!--            labelPosition="left"-->
      <!--            labelWidth="130"-->
      <!--          >-->
      <!--            <EraFormItem-->
      <!--              class="add-form__item"-->
      <!--              color="rgba(0, 0, 0, 0.85)"-->
      <!--              label="账户名"-->
      <!--              prop="accountName"-->
      <!--            >-->
      <!--              <u&#45;&#45;input-->
      <!--                v-model="formData.accountName"-->
      <!--                autoHeight-->
      <!--                border="none"-->
      <!--                class="item-input"-->
      <!--                color="rgba(0, 0, 0, 0.85)"-->
      <!--                fontSize="16px"-->
      <!--                inputAlign="right"-->
      <!--                placeholder="请输入"-->
      <!--                placeholderClass="add-form__placeholder"-->
      <!--                type="text"-->
      <!--              />-->
      <!--            </EraFormItem>-->
      <!--            <EraFormItem-->
      <!--              class="add-form__item"-->
      <!--              color="rgba(0, 0, 0, 0.85)"-->
      <!--              label="收款账号"-->
      <!--              prop="accountNumber"-->
      <!--            >-->
      <!--              <u&#45;&#45;input-->
      <!--                v-model="formData.accountNumber"-->
      <!--                autoHeight-->
      <!--                border="none"-->
      <!--                class="item-input m-r-10"-->
      <!--                color="rgba(0, 0, 0, 0.85)"-->
      <!--                fontSize="16px"-->
      <!--                inputAlign="right"-->
      <!--                placeholder="请输入收款账号"-->
      <!--                placeholderClass="add-form__placeholder"-->
      <!--                type="number"-->
      <!--              />-->
      <!--              <VoIcon :opacity="0.65" color="#000" name="photograph" size="20"></VoIcon>-->
      <!--            </EraFormItem>-->
      <!--            <EraFormItem-->
      <!--              class="add-form__item"-->
      <!--              color="rgba(0, 0, 0, 0.85)"-->
      <!--              label="开户行"-->
      <!--              prop="accountNumber"-->
      <!--            >-->
      <!--              <view class="add-form__placeholder flex1">请选择开户行</view>-->
      <!--              <VoIcon class="m-l-8" name="arrow-right" size="20" />-->
      <!--            </EraFormItem>-->
      <!--            <EraFormItem-->
      <!--              class="add-form__item"-->
      <!--              color="rgba(0, 0, 0, 0.85)"-->
      <!--              label="开户支行"-->
      <!--              prop="accountNumber"-->
      <!--            >-->
      <!--              <view class="add-form__placeholder flex1">请选择开户支行</view>-->
      <!--              <VoIcon class="m-l-8" name="arrow-right" size="20" />-->
      <!--            </EraFormItem>-->
      <!--          </EraForm>-->
      <!--          <EraForm-->
      <!--            ref="form"-->
      <!--            :model="formData"-->
      <!--            :rules="rules"-->
      <!--            class="add-form m-t-16"-->
      <!--            labelPosition="left"-->
      <!--            labelWidth="130"-->
      <!--          >-->
      <!--            <EraFormItem-->
      <!--              class="add-form__item"-->
      <!--              color="rgba(0, 0, 0, 0.85)"-->
      <!--              label="预留手机号"-->
      <!--              prop="phone"-->
      <!--            >-->
      <!--              <u&#45;&#45;input-->
      <!--                v-model="formData.phone"-->
      <!--                autoHeight-->
      <!--                border="none"-->
      <!--                class="item-input"-->
      <!--                color="rgba(0, 0, 0, 0.85)"-->
      <!--                fontSize="16px"-->
      <!--                inputAlign="right"-->
      <!--                placeholder="请输入银行预留手机号"-->
      <!--                placeholderClass="add-form__placeholder"-->
      <!--                type="number"-->
      <!--              />-->
      <!--            </EraFormItem>-->
      <!--            <EraFormItem-->
      <!--              class="add-form__item"-->
      <!--              color="rgba(0, 0, 0, 0.85)"-->
      <!--              label="验证码"-->
      <!--              prop="code"-->
      <!--            >-->
      <!--              <u&#45;&#45;input-->
      <!--                v-model="formData.code"-->
      <!--                autoHeight-->
      <!--                border="none"-->
      <!--                class="item-input"-->
      <!--                color="rgba(0, 0, 0, 0.85)"-->
      <!--                fontSize="16px"-->
      <!--                inputAlign="right"-->
      <!--                placeholder="请输入验证码"-->
      <!--                placeholderClass="add-form__placeholder"-->
      <!--                type="number"-->
      <!--              />-->
      <!--              <u-code-->
      <!--                ref="uCode"-->
      <!--                change-text="xS"-->
      <!--                class="item-code"-->
      <!--                seconds="60"-->
      <!--                @change="codeChange"-->
      <!--                @end="codeBtnDisabled = false"-->
      <!--                @start="codeBtnDisabled = true"-->
      <!--              />-->
      <!--              <template #right>-->
      <!--                <view class="item-tips" @click="getCode">-->
      <!--                  {{ tips }}-->
      <!--                </view>-->
      <!--              </template>-->
      <!--            </EraFormItem>-->
      <!--          </EraForm>-->
      <!--        </scroll-view>-->
      <!--      </swiper-item>-->
      <swiper-item>
        <scroll-view :scroll-y="true" class="add-scroll flex1">
          <EraForm
            ref="form"
            :model="formData"
            :rules="rules"
            class="add-form"
            labelPosition="left"
            labelWidth="130"
          >
            <EraFormItem
              class="add-form__item"
              color="rgba(0, 0, 0, 0.85)"
              label="账户名"
              prop="accountName"
            >
              <u--input
                v-model="formData.accountName"
                autoHeight
                border="none"
                class="item-input"
                color="rgba(0, 0, 0, 0.85)"
                fontSize="16px"
                inputAlign="right"
                placeholder="请输入"
                placeholderClass="add-form__placeholder"
                type="text"
              />
            </EraFormItem>
            <EraFormItem
              class="add-form__item"
              color="rgba(0, 0, 0, 0.85)"
              label="收款账号"
              prop="accountNumber"
            >
              <u--input
                v-model="formData.accountNumber"
                autoHeight
                border="none"
                class="item-input m-r-10"
                color="rgba(0, 0, 0, 0.85)"
                fontSize="16px"
                inputAlign="right"
                placeholder="请输入收款账号"
                placeholderClass="add-form__placeholder"
                type="number"
              />
              <VoIcon
                v-if="false"
                class="m-l-8"
                color="#FF5319"
                name="scan-not-vin"
                @click="tapOcr"
              />
              <VoIcon :opacity="0.65" color="#000" name="photograph" @click="chooseCardImgFn" />
            </EraFormItem>
            <EraFormItem
              class="add-form__item"
              color="rgba(0, 0, 0, 0.85)"
              label="开户行"
              prop="parenBankName"
            >
              <u--input
                v-model="formData.parenBankName"
                border="none"
                disabledColor="#ffffff"
                fontSize="16px"
                inputAlign="right"
                placeholder="请选择开户行"
                placeholderClass="add-form__placeholder"
                @change="changeParenBankFn"
                @focus="showParenBankSelect = true"
              />
              <VoIcon :opacity="0.25" class="m-l-8" color="#000000" name="arrow-right" size="20" />
            </EraFormItem>
            <scroll-view
              v-if="parenBankList.length > 0 && showParenBankSelect"
              :scroll-y="true"
              class="add-list"
            >
              <view
                v-for="(item, index) of parenBankList"
                :key="index"
                class="add-list__item"
                @click=";(formData.parenBankName = item), (showParenBankSelect = false)"
                >{{ item }}
              </view>
            </scroll-view>
          </EraForm>
          <EraForm
            ref="form"
            :model="formData"
            :rules="rules"
            class="add-form m-t-16"
            labelPosition="left"
            labelWidth="130"
          >
            <EraFormItem
              class="add-form__item"
              color="rgba(0, 0, 0, 0.85)"
              label="预留手机号"
              prop="phone"
            >
              <u--input
                v-model="formData.phone"
                :maxlength="11"
                autoHeight
                border="none"
                class="item-input"
                color="rgba(0, 0, 0, 0.85)"
                fontSize="16px"
                inputAlign="right"
                placeholder="请输入银行预留手机号"
                placeholderClass="add-form__placeholder"
                type="number"
              />
            </EraFormItem>
            <EraFormItem
              class="add-form__item"
              color="rgba(0, 0, 0, 0.85)"
              label="验证码"
              prop="code"
            >
              <u--input
                v-model="formData.code"
                autoHeight
                border="none"
                class="item-input"
                color="rgba(0, 0, 0, 0.85)"
                fontSize="16px"
                inputAlign="right"
                placeholder="请输入验证码"
                placeholderClass="add-form__placeholder"
                type="number"
              />
              <u-code
                ref="uCode"
                change-text="xS"
                class="item-code"
                seconds="60"
                @change="codeChange"
                @end="codeBtnDisabled = false"
                @start="codeBtnDisabled = true"
              />
              <view slot="right">
                <view class="item-tips" @click="getCode">
                  {{ tips }}
                </view>
              </view>
            </EraFormItem>
          </EraForm>
        </scroll-view>
      </swiper-item>
    </swiper>
    <VoModal
      v-show="showCareFul"
      :show="showCareFul"
      :showCancelButton="false"
      confirmText="我知道了"
      @confirm="showCareFul = false"
    >
      <view class="slot-content">
        <view> 1.企业用户绑卡必须为企业公户或企业法人储蓄卡账户</view>
        <view> 2.个人用户绑卡必须为本人名下储蓄卡账户</view>
        <view> 3.请确保该账户处于正常可收款状态，以免造成提现失败</view>
      </view>
    </VoModal>
    <view class="add-bottom">
      <EraButton
        :disabled="
          !formData.accountName ||
          !formData.accountNumber ||
          !formData.parenBankName ||
          !formData.phone ||
          !formData.code
        "
        :fontSize="32"
        circle
        size="medium"
        text="确认绑定"
        @click="determineBinding"
      />
      <view class="p-b-safe-area" />
    </view>
  </view>
</template>

<script>
  import { chooseImageOcrByPromise } from '@/common/helper'

  export default {
    name: 'AddBankCard',
    data() {
      return {
        showCareFul: false, //是否展示注意事项
        currentTab: 0, // 横向tabs默认
        tabsList: [
          // {
          //   name: '对公账户',
          // },
          {
            name: '法人银行卡',
          },
        ],
        formData: {
          accountName: '', // 账户名
          accountNumber: '', // 收款账号
          parenBankName: '', // 开户行
          phone: '', // 手机号
          code: '', // 验证码
        },
        rules: {
          accountName: {
            required: true,
            message: '请输入账户名',
            trigger: ['blur', 'change'],
          },
          accountNumber: {
            required: true,
            message: '请输入收款账号',
            trigger: ['blur', 'change'],
          },
          parenBankName: {
            required: true,
            message: '请选择开户行',
            trigger: ['blur', 'change'],
          },
          phone: [
            {
              required: true,
              message: '请输入银行预留手机号',
              trigger: ['blur', 'change'],
            },
            {
              pattern: this.$vocenApi.Pattern.phone, // /^1[3456789][0-9]{9}$/g
              // 正则检验前先将值转为字符串
              transform(value) {
                return String(value)
              },
              message: '手机号格式不正确',
            },
          ],
          code: {
            type: 'number',
            required: true,
            message: '请输入验证码',
            trigger: ['blur', 'change'],
          },
        },
        tips: '获取验证码',
        codeBtnDisabled: false,
        bankList: [],
        parenBankList: [],
        showParenBankSelect: false,
        serialNumber: '',
      }
    },
    methods: {
      /**
       * @description ocr识别
       */
      chooseCardImgFn() {
        chooseImageOcrByPromise({ tip: '加载中', count: 1, apiUrl: '/v1/api/file/bank/ocr' })
          .then((res) => {
            const resultData = JSON.parse(res.data)

            if (+resultData.code === 20001) {
              uni.$u.toast('识别成功')
              this.formData.accountNumber = resultData.data.cardNo
              this.formData.parenBankName = resultData.data.bankInfo
            } else {
              uni.$u.toast(resultData.message||'识别失败')
            }
          })
          .catch((err) => {
              this.$u.toast(err.message || '识别识别')
          })
      },
      changeTabs(e) {
        // console.log(e.index, 1111111111111)
        this.currentTab = e.index
      },
      changeSwiper(e) {
        this.currentTab = e.detail.current
      },
      /**
       * 验证码Change
       * @param String text
       */
      codeChange(text) {
        this.tips = text
      },
      /**
       * 获取验证码
       */
      getCode() {
        if (!this.codeBtnDisabled) {
          if (this.$refs.uCode.canGetCode) {
            // 模拟向后端请求验证码
            uni.showLoading({
              title: '正在获取验证码',
              mask: true,
            })
            let param = {
              name: this.formData.accountName,
              cardNo: this.formData.accountNumber,
              parenBankName: this.formData.parenBankName,
              phone: this.formData.phone,
            }
            // if (this.uuid) {
            //   param.uuid = this.uuid
            // }
            this.$VoHttp.USER.apiExtraBankApplyBankcard(param)
              .then((res) => {
                // this.uuid = res.data
                console.log(res)
                uni.$u.toast('发送成功')
                this.$refs.uCode.start()
                this.serialNumber = res.data
              })
              .catch((e) => {
                uni.$u.toast(e.message || '请求失败')
              })
              .finally(() => {
                uni.hideLoading()
              })
            // setTimeout(() => {
            //   uni.hideLoading()
            //   // 这里此提示会被this.start()方法中的提示覆盖
            //   uni.$u.toast('验证码已发送')
            //   // 通知验证码组件内部开始倒计时
            //   this.$refs.uCode.start()
            // }, 2000)
          } else {
            uni.$u.toast('倒计时结束后再发送')
          }
        }
      },
      /**
       * 选择开户行
       * @param e
       */
      changeParenBankFn(e) {
        this.formData.parenBankName = e
        let that = this
        uni.$u.debounce(() => {
          that.initBankFn('init')
        }, 500)
      },
      initBankFn() {
        let param = {
          bankName: this.formData.parenBankName,
          pageNo: 1,
          pageSize: 30,
        }
        this.$VoHttp
          .apiExtraBankInfoFuzzy(param)
          .then((res) => {
            this.parenBankList = res.data.records
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请求失败')
          })
      },
      /**
       * 确定绑定
       */
      determineBinding() {
        // TODO 绑卡字段存疑
        let param = {
          tranceNum: this.serialNumber,
          verificationCode: this.formData.code,
        }
        this.$VoHttp.USER.apiExtraBankBindBankcard(param)
          .then((res) => {
            console.log(res)
            uni.$u.toast('绑定成功！')
            setTimeout(() => {
              this.$backFn()
            }, 1500)
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请求失败')
          })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .add {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    &-tabs {
      width: 100%;
      background: #ffffff;
      height: 96rpx;
      box-sizing: border-box;
      padding-top: 8rpx;
    }

    &-scroll {
      height: 100%;
    }

    &-attention {
      height: 36rpx;
      line-height: 36rpx;
      font-size: 24rpx;
      color: $v-c0-45;
      padding: 24rpx 32rpx;
    }

    &-form {
      padding: 0 32rpx 0 32rpx;
      background: #ffffff;

      &__item {
        text-align: right;
        border-bottom: 2rpx solid $v-bg-light;

        .item-input {
          padding: 4rpx;
        }

        .item-code {
          margin-left: 24rpx;
        }

        .item-tips {
          font-size: 32rpx;
          color: var(--color-primary);
        }
      }

      &__placeholder {
        text-align: right;
        color: $v-c0-25 !important;
        font-size: 32rpx !important;
      }

      &__text {
        text-align: right;
        color: $v-c0-85 !important;
        font-size: 32rpx !important;
      }
    }

    &-bottom {
      width: 100%;
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
    }

    &-list {
      width: 100%;
      height: 360rpx;
      padding: 24rpx 0rpx;
      box-sizing: border-box;

      &__item {
        font-size: 32rpx;
        line-height: 150%;
        color: rgba(0, 0, 0, 0.85);
        margin-bottom: 24rpx;
      }
    }
  }

  .slot-content {
    font-size: 32rpx;
    line-height: 150%;
    color: rgba(0, 0, 0, 0.85);
  }
</style>
