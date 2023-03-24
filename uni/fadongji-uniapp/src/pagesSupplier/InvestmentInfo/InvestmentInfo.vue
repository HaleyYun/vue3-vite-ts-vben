<template>
  <view class="investment">
    <VoNav is-have-more title="设置批发信息" />
    <VoAlert v-if="false" icon-position="right" />

    <view class="p-b-safe-area">
      <view id="base" class="cell-list bg-white">
        <view class="bg-white">
          <u-cell-group :border="false">
            <u-cell>
              <view slot="title" class="flex flex-justify-between flex-vertical-c">
                <view class="u-slot-title flex">
                  <text class="c-required">*</text>
                  <text class="u-cell-text">商品名称</text>
                </view>
                <view>
                  <view class="p-r-16">
                    <u-input
                      v-model="investmentForm.goodsName"
                      border="none"
                      class="cell-input-value"
                      input-align="right"
                      placeholder="请输入"
                      placeholder-class="cell-placeholder"
                      readonly
                    />
                  </view>
                </view>
              </view>
            </u-cell>
            <u-cell>
              <view slot="title" class="flex flex-justify-between flex-vertical-c">
                <view class="u-slot-title flex">
                  <text class="c-required">*</text>
                  <text class="u-cell-text">商品别称</text>
                </view>
                <view>
                  <view class="p-r-16">
                    <u-input
                      v-model.trim="investmentForm.name"
                      border="none"
                      class="cell-input-value"
                      input-align="right"
                      maxlength="50"
                      placeholder="请输入"
                      placeholder-class="cell-placeholder"
                    />
                  </view>
                </view>
              </view>
            </u-cell>
            <u-cell>
              <view slot="title" class="flex flex-justify-between flex-vertical-c">
                <view class="u-slot-title overflow-hidden">
                  <view class="u-cell-text flex flex-vertical-c">
                    <view class="cell-icon m-r-10">
                      <text class="c-required">*</text>
                      批发支付形式
                    </view>
                    <VoTooltip class="fz-0" placement="bottom">
                      <view slot="content" class="tooltip-box">
                        下单立即支付商品金额时，买家需支付的价格
                      </view>
                      <!--                      <VoIcon :opacity="0.6" :size="18" color="#000000" name="question-line" />-->
                    </VoTooltip>
                  </view>
                </view>
                <view>
                  <view class="cell-placeholder flex flex-vertical-c">
                    <EraCheckboxGroup v-model="payType" color="#22284B">
                      <EraCheckbox :name="1" disabled label="现金" />
                      <EraCheckbox :name="2" class="m-l-30" label="账期" />
                    </EraCheckboxGroup>
                  </view>
                </view>
              </view>
            </u-cell>
            <u-cell>
              <view slot="title">
                <view class="flex flex-justify-between flex-vertical-c">
                  <view class="u-slot-title">
                    <view class="u-cell-text flex flex-vertical-c">
                      <view class="cell-icon">
                        <text class="c-required">*</text>
                        <text class="u-cell-text">现金价格</text>
                      </view>
                    </view>
                  </view>
                  <view>
                    <view class="p-r-16">
                      <u-input
                        v-model="investmentForm.cashPrice"
                        border="none"
                        class="cell-input-value"
                        input-align="right"
                        placeholder="请输入"
                        placeholder-class="cell-placeholder"
                        type="digit"
                        :formatter="formatterMoney"
                      >
                        <view slot="suffix">元</view>
                      </u-input>
                    </view>
                  </view>
                </view>
              </view>
            </u-cell>
            <u-cell v-if="payType.includes(2)">
              <view slot="title">
                <view class="flex flex-justify-between flex-vertical-c">
                  <view class="u-slot-title">
                    <view class="u-cell-text flex flex-vertical-c">
                      <view class="cell-icon">
                        <text class="c-required">*</text>
                        <text class="u-cell-text">账期天数</text>
                      </view>
                    </view>
                  </view>
                  <view>
                    <view class="p-r-16">
                      <u-input
                        v-model="investmentForm.accountPeriodDays"
                        border="none"
                        class="cell-input-value"
                        input-align="right"
                        placeholder="请输入"
                        placeholder-class="cell-placeholder"
                        type="number"
                        :formatter="formatterMonth"
                      >
                        <view slot="suffix"> 天</view>
                      </u-input>
                    </view>
                  </view>
                </view>
              </view>
            </u-cell>
            <u-cell v-if="payType.includes(2)">
              <view slot="title">
                <view class="flex flex-justify-between flex-vertical-c">
                  <view class="u-slot-title">
                    <view class="u-cell-text flex flex-vertical-c">
                      <view class="cell-icon">
                        <text class="c-required">*</text>
                        <text class="u-cell-text">账期价格</text>
                      </view>
                    </view>
                  </view>
                  <view>
                    <view class="p-r-16">
                      <u-input
                        v-model="investmentForm.accountPrice"
                        border="none"
                        class="cell-input-value"
                        input-align="right"
                        placeholder="请输入"
                        placeholder-class="cell-placeholder"
                        type="digit"
                        :formatter="formatterMoney"
                      >
                        <view slot="suffix"> 元</view>
                      </u-input>
                    </view>
                  </view>
                </view>
                <view v-if="false" class="cell-profit">预计收益2650.06元</view>
              </view>
            </u-cell>

            <u-cell>
              <view slot="title" class="flex flex-justify-between flex-vertical-c">
                <view class="u-slot-title flex">
                  <text class="c-required">*</text>
                  <text class="u-cell-text">总批发数量</text>
                </view>
                <view>
                  <view class="p-r-16">
                    <u-input
                      v-model="investmentForm.totalInvestment"
                      :maxlength="8"
                      border="none"
                      class="cell-input-value"
                      input-align="right"
                      placeholder="请输入"
                      placeholder-class="cell-placeholder"
                      type="number"
                      :formatter="formatterMonth"
                    />
                  </view>
                </view>
              </view>
            </u-cell>

            <u-cell>
              <view slot="title" class="flex flex-justify-between flex-vertical-c">
                <view class="u-slot-title">
                  <text class="c-required">*</text>
                  <text class="u-cell-text">发货仓库</text>
                </view>
                <view @click="clickHandler(2)">
                  <view
                    v-if="!investmentForm.warehouseId"
                    class="cell-placeholder flex flex-vertical-c"
                  >
                    <view>请设置</view>
                    <VoIcon :opacity="0.3" :size="24" color="#000000" name="right-arrow" />
                  </view>
                  <view v-else class="flex flex-vertical-c">
                    <view class="cell-value">{{ investmentForm.warehouseName }}</view>
                    <VoIcon :opacity="0.3" :size="24" color="#000000" name="right-arrow" />
                  </view>
                </view>
              </view>
            </u-cell>

            <u-cell v-if="false">
              <view slot="title">
                <view class="flex flex-justify-between flex-vertical-c">
                  <view class="u-slot-title">
                    <view class="u-cell-text flex flex-vertical-c">
                      <view class="cell-icon m-r-10">
                        <text class="c-required">*</text>
                        <text class="u-cell-text">投资回报率</text>
                      </view>
                      <VoTooltip class="fz-0" placement="bottom">
                        <view slot="content" class="tooltip-box">
                          （商品现金价格-投资现金价格-商品的平台服务费）/投资现金价格*100%
                        </view>
                        <VoIcon :opacity="0.6" :size="18" color="#000000" name="question-line" />
                      </VoTooltip>
                    </view>
                  </view>
                  <view>
                    <view class="p-r-16">
                      <u-input
                        border="none"
                        class="cell-input-value"
                        input-align="right"
                        placeholder="请输入"
                        placeholder-class="cell-placeholder"
                        readonly
                        :formatter="formatterMoney"
                      />
                    </view>
                  </view>
                </view>
                <view class="cell-profit">系统根据商品现金价格与投资价格，自动计算</view>
              </view>
            </u-cell>
          </u-cell-group>
        </view>
      </view>

      <view class="m-t-10 cell-list bg-white">
        <view class="bg-white">
          <u-cell-group :border="false">
            <u-cell>
              <view slot="title">
                <view class="flex flex-justify-between flex-vertical-c">
                  <view class="u-slot-title">
                    <view class="u-cell-text flex flex-vertical-c">
                      <view class="cell-icon">
                        <text class="c-required">*</text>
                        <text class="u-cell-text">起批量</text>
                      </view>
                    </view>
                  </view>
                  <view>
                    <view class="p-r-16">
                      <u-input
                        v-model="investmentForm.startNumber"
                        :maxlength="8"
                        border="none"
                        class="cell-input-value"
                        input-align="right"
                        placeholder="请输入"
                        placeholder-class="cell-placeholder"
                        type="number"
                        :formatter="formatterMonth"
                      />
                    </view>
                  </view>
                </view>
              </view>
            </u-cell>

            <u-cell>
              <view slot="title">
                <view class="flex flex-justify-between flex-vertical-c">
                  <view class="u-slot-title">
                    <view class="u-cell-text flex flex-vertical-c">
                      <view class="cell-icon">
                        <text class="c-required">*</text>
                        <text class="u-cell-text">限批量</text>
                      </view>
                    </view>
                  </view>
                  <view>
                    <view class="p-r-16">
                      <u-input
                        v-model="investmentForm.investmentLimit"
                        :maxlength="8"
                        border="none"
                        class="cell-input-value"
                        input-align="right"
                        placeholder="请输入"
                        placeholder-class="cell-placeholder"
                        type="number"
                        :formatter="formatterMonth"
                      />
                    </view>
                  </view>
                </view>
              </view>
            </u-cell>

            <u-cell>
              <view slot="title" class="flex flex-justify-between flex-vertical-c">
                <view class="u-slot-title">
                  <view class="u-cell-text flex flex-vertical-c">
                    <view>
                      <text class="c-required">*</text>
                      运费
                    </view>
                  </view>
                </view>
                <view>
                  <view class="cell-placeholder flex flex-vertical-c">
                    <EraRadioGroup v-model="investmentForm.shippingType" color="#22284B">
                      <EraRadio :name="1" label="包邮" />
                      <EraRadio :name="2" label="到付" />
                    </EraRadioGroup>
                  </view>
                </view>
              </view>
            </u-cell>

            <u-cell @click="clickHandler(3)">
              <view slot="title" class="flex flex-justify-between flex-vertical-c">
                <view class="u-slot-title">
                  <text class="c-required">*</text>
                  <text class="u-cell-text">售卖区域</text>
                </view>
                <view>
                  <view class="cell-placeholder flex flex-vertical-c">
                    <view v-if="!investmentForm.investableArea.length">请设置</view>
                    <VoIcon :opacity="0.3" :size="24" color="#000000" name="right-arrow" />
                  </view>
                </view>
              </view>
            </u-cell>
          </u-cell-group>
        </view>
      </view>

      <view class="bg-white cell-list m-t-10">
        <u-cell-group :border="false">
          <u-cell>
            <view slot="title" class="flex flex-justify-between flex-vertical-c">
              <view class="u-slot-title">
                <view class="u-cell-text flex flex-vertical-c">
                  <text class="c-required">*</text>
                  <view class="cell-icon">商品详情</view>
                </view>
              </view>
              <view>
                <view class="cell-placeholder p-r-20 flex flex-vertical-c">
                  <view>{{ productDetail.length }}/11</view>
                </view>
              </view>
            </view>
            <view slot="label">
              <view class="label-text">默认为商品详情图片，可更换</view>
              <view class="cell-upload">
                <VoFormUpload
                  :limit="11"
                  :source.sync="productDetail"
                  :video-limit="1"
                  @change="productDetailImgHandler"
                />
              </view>
            </view>
          </u-cell>
        </u-cell-group>
      </view>
    </view>

    <view
      v-if="editType === 1"
      class="put-operate-save fixed-bottom p-b-safe-area border-box bg-white px-32"
    >
      <view class="py-12 flex">
        <view class="flex1">
          <u-button
            v-if="
              investmentForm.goodsName &&
              investmentForm.name &&
              payType &&
              investmentForm.cashPrice &&
              investmentForm.totalInvestment &&
              investmentForm.startNumber &&
              investmentForm.investmentLimit &&
              investmentForm.shippingType &&
              investmentForm.investableArea &&
              productDetail.length > 0
            "
            :loading="loading"
            color="#FF5319"
            shape="circle"
            size="large"
            text="保存"
            type="primary"
            @click="sendHandler"
          />
          <u-button
            v-else
            class="investment-footer__button investment-footer__color"
            color="#F6F7F8"
            shape="circle"
            size="large"
            text="保存"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import VoFormUpload from '@/components/VoFormUpload/VoFormUpload'
  import VoAlert from '@/components/VoAlert/VoAlert'
  import { formatterHandle } from '@/common/helper'

  const DefaultInvestmentForm = {
    goodsName: '', // 商品名称-回显使用
    name: '', // 项目名称
    cashPrice: '', // 现金价格
    accountPrice: '', // 账期价格
    accountPeriodDays: '', // 账期天数
    totalInvestment: '', // 总投资量
    warehouseId: '', // 发货仓库
    warehouseName: '', // 发货仓库名称-回显使用
    startNumber: '', // 起投量
    // profitSharing: '', // 商品分润
    investmentLimit: '', // 限投量
    shippingType: 1, // 快递类型 1包邮 2到付
    investableArea: [], // 可投资区域
    desc: [], // 商品详情图['url','url']
    productDetail: [], // 投资详情-回显使用
    status: '', // 状态 1：已上架   2：待审核 3：审核未通过 4：已下架
  }

  export default {
    name: 'InvestmentInfo',
    components: { VoFormUpload, VoAlert },
    data() {
      return {
        loading: false,
        payType: [],
        investmentForm: this.$vocenApi._.cloneDeep(DefaultInvestmentForm),
        productDetail: [], // 投资详情图
        flag: false,
        editType: 1, // 1 发布   2 填写信息确认（供上货使用）  3 查看信息
        name: '',
        parames: {},
        formatterMonth: (value) => formatterHandle(value, 'int'),
        formatterMoney: (value) => formatterHandle(value, 'money', 8),
      }
    },
    onShow() {
      // const flag = uni?.$SendInvestmentForm // 判断是否存在已编辑的历史
      // if (flag) {
      //   this.investmentForm = { ...uni.$SendInvestmentForm, ...this.parames }
      //   this.productDetail = this.investmentForm.productDetail
      // } else {
      //   let defaultForm = this.$vocenApi._.cloneDeep(DefaultInvestmentForm)
      //   this.investmentForm = Object.assign(defaultForm, this.parames)
      //   uni['$SendInvestmentForm'] = this.investmentForm
      //   this.productDetail = this.investmentForm.productDetail
      // }
    },
    onLoad(options) {
      this.parames = this.$storage.get('wholesaleData') || {}
      this.investmentForm = this.$vocenApi._.cloneDeep(DefaultInvestmentForm)
      uni.$on('chooseWarehouse', (res) => {
        console.log(res)
        this.$storage.set('InvestmentWarehouse', res)
        this.investmentForm.warehouseId = res.warehouseId
        this.investmentForm.warehouseName = res.warehouseName
      })

      uni.$on('addressFn', (res) => {
        this.investmentForm.investableArea = res
      })

      const flag = uni?.$SendInvestmentForm // 判断是否存在已编辑的历史
      if (flag) {
        this.investmentForm = { ...uni.$SendInvestmentForm, ...this.parames }
        this.productDetail = this.investmentForm.productDetail
      } else {
        let defaultForm = this.$vocenApi._.cloneDeep(DefaultInvestmentForm)
        this.investmentForm = Object.assign(defaultForm, this.parames)
        uni['$SendInvestmentForm'] = this.investmentForm
        this.productDetail = this.investmentForm.productDetail
      }
    },
    watch: {
      // 商品详情图
      productDetail: {
        deep: true,
        handler(newVal) {
          const imgs = newVal.map((item) => item.src)
          this.investmentForm.desc = imgs
          this.investmentForm.productDetail = newVal
        },
      },
      investmentForm: {
        deep: true,
        handler(newForm) {
          uni['$SendInvestmentForm'] = newForm
        },
      },
    },
    methods: {
      // 发布投资项目
      async sendHandler() {
        const flag = this.checkForm()
        if (flag) {
          try {
            console.log(uni['$VoPutProductForm'])
            uni['$VoPutProductForm'].projectInvestmentSaveBO = this.investmentForm
            console.log(uni['$VoPutProductForm'])
            this.$backFn()
          } catch (e) {
            this.loading = false
            console.log(e)
          }
        }
      },
      resetForm() {
        this.investmentForm = this.$vocenApi._.cloneDeep(DefaultInvestmentForm)
        delete uni['$SendInvestmentForm']
        this.productDetail = this.investmentForm.productDetail
      },
      checkForm() {
        if (!this.investmentForm.name) {
          this.$u.toast('商品别称不能为空')
          return false
        }

        if (!this.investmentForm.cashPrice) {
          this.$u.toast('现金价格不能为空')
          return false
        }
        if (Number(this.investmentForm.cashPrice) > 10000000) {
          this.$u.toast('现金金额格式不正确，金额最大值不能超过1千万')
          return false
        }
        if (!this.$vocenApi.Pattern.isMoney(this.investmentForm.cashPrice)) {
          this.$u.toast('现金金额格式不正确，只能输入两位小数的正数')
          return false
        }

        if (this.payType.includes(2)) {
          if (!this.investmentForm.accountPrice) {
            this.$u.toast('账期价格不能为空')
            return false
          }
          if (!this.investmentForm.accountPeriodDays) {
            this.$u.toast('账期天数不能为空')
            return false
          }
          if (!this.$vocenApi.Pattern.isIntNumber(this.investmentForm.accountPeriodDays)) {
            this.$u.toast('账期天数不能录入小数')
            return false
          }
          if (Number(this.investmentForm.accountPrice) > 10000000) {
            this.$u.toast('账期金额格式不正确，金额最大值不能超过1千万')
            return false
          }
          if (!this.$vocenApi.Pattern.isMoney(this.investmentForm.accountPrice)) {
            this.$u.toast('账期金额格式不正确，只能输入两位小数的正数')
            return false
          }
        }

        if (!this.investmentForm.totalInvestment) {
          this.$u.toast('总投资量不能为空')
          return false
        }
        if (!this.$vocenApi.Pattern.isIntNumber(this.investmentForm.totalInvestment)) {
          this.$u.toast('总投资量不能录入小数')
          return false
        }

        if (+this.investmentForm.totalInvestment > 10000000) {
          this.$u.toast('总投资量不能大于10000000')
          return false
        }

        if (!this.investmentForm.warehouseId) {
          this.$u.toast('请选择发货仓库')
          return false
        }

        if (!this.investmentForm.startNumber) {
          this.$u.toast('起投量不能为空')
          return false
        }
        if (!this.$vocenApi.Pattern.isIntNumber(this.investmentForm.startNumber)) {
          this.$u.toast('起投量不能录入小数')
          return false
        }

        if (+this.investmentForm.startNumber > 10000000) {
          this.$u.toast('起投量不能大于10000000')
          return false
        }

        if (!this.investmentForm.investmentLimit) {
          this.$u.toast('限投量不能为空')
          return false
        }
        if (!this.$vocenApi.Pattern.isIntNumber(this.investmentForm.investmentLimit)) {
          this.$u.toast('限投量不能录入小数')
          return false
        }

        if (+this.investmentForm.investmentLimit > 10000000) {
          this.$u.toast('起投量不能大于10000000')
          return false
        }

        if (+this.investmentForm.startNumber > +this.investmentForm.investmentLimit) {
          this.$u.toast('起投量需小于限投量')
          return false
        }
        if (+this.investmentForm.investmentLimit > +this.investmentForm.totalInvestment) {
          this.$u.toast('限投量需小于总投资量')
          return false
        }
        if (!this.investmentForm.shippingType) {
          this.$u.toast('请选择运费')
          return false
        }
        if (!this.investmentForm.investableArea.length) {
          this.$u.toast('请选择投资区域')
          return false
        }
        if (!this.investmentForm.desc.length) {
          this.$u.toast('请上传项目详情图')
          return false
        }
        return true
      },
      clickHandler(type) {
        if (type === 1) {
          uni.$u.route('/pagesSupplier/InvestmentInfo/InvestChooseGood')
        }
        if (type === 2) {
          if (!this.investmentForm.goodsId) {
            this.$u.toast('请先选择商品')
            return false
          }
          uni.$u.route(
            '/pagesSupplier/SendInvestmentInfo/SelectWarehouse?goodsId=' +
            this.investmentForm.goodsId,
          )
          this.$storage.remove('warehouse-add')
        }
        if (type === 3) {
          this.$storage.set('defaultArea', this.investmentForm.investableArea)
          this.$linkToEasy('/pagesSupplier/InvestmentArea/InvestmentArea?type=2&title=售卖区域')
        }
      },
      productDetailImgHandler(res) {
        console.log(res)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .fixed-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }

  .investment {
    padding-bottom: 150rpx;

    ::v-deep .u-tabs__wrapper__nav__item {
      flex: 1 !important;
      text-align: center;
    }

    .cell-placeholder {
      color: rgba(0, 0, 0, 0.25);
      font-size: 32rpx;
      line-height: 1;
    }

    .cell-profit {
      color: #ee0a24;
      font-size: 28rpx;
      text-align: right;
      margin-top: 24rpx;
    }

    .cell-content,
    .cell-value {
      max-width: 340rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .cell-input-value {
      color: rgba(0, 0, 0, 0.65);
      font-size: 32rpx;
    }

    .cell-placeholder {
      font-size: 32rpx;
    }

    .title-content {
      padding: 24rpx 32rpx;
    }

    &-footer {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 10;
      height: 132rpx;
      line-height: 132rpx;
      width: 100%;
      background: $v-bg-white;

      &__button {
        height: 92rpx;
        margin: auto;
      }

      &__color {
        color: $v-c0-25 !important;
      }
    }
  }

  .cell-list {
    padding-left: 32rpx;

    .u-cell-text {
      @include black-size-color(32, 0.85);
    }

    ::v-deep .u-cell__body {
      padding-left: 0 !important;
      padding-right: 16rpx;
    }

    ::v-deep .u-input__content__subfix-icon {
      line-height: 1;
    }

    ::v-deep .u-line {
      border-color: #f7f7f8 !important;
      background-color: #fff;
    }

    .cell-upload {
      margin-top: 20rpx;
    }

    .label-text {
      padding-top: 12rpx;
      font-size: 28rpx;
      color: rgba(0, 0, 0, 0.25);
    }
  }
</style>
