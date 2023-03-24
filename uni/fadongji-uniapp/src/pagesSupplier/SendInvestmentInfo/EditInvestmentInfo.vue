<template>
  <view class="investment">
    <VoNav is-have-more title="修改批发信息" />
    <view class="p-b-safe-area">
      <view id="base" class="cell-list bg-white">
        <view class="bg-white">
          <u-cell-group :border="false">
            <u-cell>
              <view
                slot="title"
                class="flex flex-justify-between flex-vertical-c"
                @click="clickHandler(1)"
              >
                <view class="u-slot-title">
                  <text class="c-required">*</text>
                  <text class="u-cell-text">选择商品</text>
                </view>
                <view>
                  <view
                    v-if="!investmentForm.goodsId"
                    class="cell-placeholder flex flex-vertical-c"
                  >
                    <view>请设置</view>
                    <VoIcon :opacity="0.3" :size="24" color="#000000" name="right-arrow" />
                  </view>
                  <view v-else class="flex flex-vertical-c">
                    <view class="cell-value">{{ investmentForm.goodsName }}</view>
                    <VoIcon :opacity="0.3" :size="24" color="#000000" name="right-arrow" />
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
                      v-model="investmentForm.name"
                      :maxlength="50"
                      border="none"
                      class="cell-input-value"
                      input-align="right"
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
                      <VoIcon :opacity="0.6" :size="18" color="#000000" name="question-line" />
                    </VoTooltip>
                  </view>
                </view>
                <view>
                  <view class="cell-placeholder flex flex-vertical-c">
                    <EraCheckboxGroup v-model="payType" color="#FF5319">
                      <EraCheckbox :name="1" disabled label="现金" />
                      <!--                      <VoTooltip-->
                      <!--                        :arrowStyleSelf="{ left: '54rpx' }"-->
                      <!--                        class="fz-0"-->
                      <!--                        placement="bottom"-->
                      <!--                      >-->
                      <!--                        <view slot="content" class="tooltip-box">-->
                      <!--                          下单时，使用现金立即付款的价格-->
                      <!--                        </view>-->
                      <!--                        <VoIcon :size="18" class="m-l-4" color="#373A4E" name="question-line" />-->
                      <!--                      </VoTooltip>-->
                      <EraCheckbox :name="2" activeColor="#FF5319" class="m-l-30" label="账期" />
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
                        :formatter="formatterMoney"
                        border="none"
                        class="cell-input-value"
                        input-align="right"
                        placeholder="请输入"
                        placeholder-class="cell-placeholder"
                        type="digit"
                      >
                        <view slot="suffix">元</view>
                      </u-input>
                    </view>
                  </view>
                </view>
                <view class="cell-profit" v-if="payPrice">进货价：{{ payPrice }}</view>
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
                        :formatter="formatterMonth"
                        border="none"
                        class="cell-input-value"
                        input-align="right"
                        maxlength="8"
                        placeholder="请输入"
                        placeholder-class="cell-placeholder"
                        type="number"
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
                        :formatter="formatterMoney"
                        border="none"
                        class="cell-input-value"
                        input-align="right"
                        placeholder="请输入"
                        placeholder-class="cell-placeholder"
                        type="digit"
                      >
                        <view slot="suffix"> 元</view>
                      </u-input>
                    </view>
                  </view>
                </view>
                <view class="cell-profit" v-if="payAccountPrice">
                  进货价：{{ payAccountPrice }}
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
                      :formatter="formatterMonth"
                      border="none"
                      class="cell-input-value"
                      input-align="right"
                      placeholder="请输入"
                      placeholder-class="cell-placeholder"
                      type="number"
                    />
                  </view>
                </view>
              </view>
            </u-cell>

            <u-cell @click="clickHandler(2)">
              <view slot="title" class="flex flex-justify-between flex-vertical-c">
                <view class="u-slot-title">
                  <text class="c-required">*</text>
                  <text class="u-cell-text">发货仓库</text>
                </view>
                <view>
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

            <u-cell>
              <view slot="title">
                <view class="flex flex-justify-between flex-vertical-c">
                  <view class="u-slot-title">
                    <view class="u-cell-text flex flex-vertical-c">
                      <view class="cell-icon m-r-10">
                        <text class="c-required">*</text>
                        <text class="u-cell-text">回报率</text>
                      </view>
                      <VoTooltip
                        :arrowStyleSelf="{ left: '50rpx' }"
                        class="fz-0"
                        placement="bottom"
                      >
                        <view slot="content" class="tooltip-box p-15">
                          （商品零售价格-批发价格-平台服务费）/批发价格*100%
                        </view>
                        <VoIcon :opacity="0.6" :size="18" color="#000000" name="question-line" />
                      </VoTooltip>
                    </view>
                  </view>
                  <view>
                    <view class="p-r-16">
                      <u-input
                        v-model="investmentForm.rol"
                        :formatter="formatterMoney"
                        border="none"
                        class="cell-input-value"
                        input-align="right"
                        placeholder-class="cell-placeholder"
                        readonly
                      >
                        <view slot="suffix">%</view>
                      </u-input>
                    </view>
                  </view>
                </view>
                <view class="cell-profit">系统根据商品零售价格与批发价格，自动计算</view>
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
                        <text class="u-cell-text">起投量</text>
                      </view>
                    </view>
                  </view>
                  <view>
                    <view class="p-r-16">
                      <u-input
                        v-model="investmentForm.startNumber"
                        :formatter="formatterMonth"
                        border="none"
                        class="cell-input-value"
                        input-align="right"
                        maxlength="8"
                        placeholder="请输入"
                        placeholder-class="cell-placeholder"
                        type="number"
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
                        <text class="u-cell-text">限投量</text>
                      </view>
                    </view>
                  </view>
                  <view>
                    <view class="p-r-16">
                      <u-input
                        v-model="investmentForm.investmentLimit"
                        :formatter="formatterMonth"
                        border="none"
                        class="cell-input-value"
                        input-align="right"
                        maxlength="8"
                        placeholder="请输入"
                        placeholder-class="cell-placeholder"
                        type="number"
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
                    <EraRadioGroup v-model="investmentForm.shippingType" color="#FF5319">
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
                    <view
                      v-if="
                        !investmentForm.investableArea ||
                        (investmentForm.investableArea && !investmentForm.investableArea.length)
                      "
                      >请设置</view
                    >
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
                  <view class="cell-icon">商品详情图</view>
                </view>
              </view>
              <view>
                <view class="cell-placeholder p-r-20 flex flex-vertical-c">
                  <view>{{ productDetail.length }}/11</view>
                </view>
              </view>
            </view>
            <view slot="label">
              <view class="label-text">默认为零售商品详情图，可更换</view>
              <view class="cell-upload">
                <VoFormUpload
                  :limit="11"
                  :source.sync="productDetail"
                  uploadType="image"
                  @change="productDetailImgHandler"
                />
              </view>
            </view>
          </u-cell>
        </u-cell-group>
      </view>
    </view>
    <view class="put-operate-save fixed-bottom p-b-safe-area border-box box-shadow bg-white px-32">
      <view class="py-12 flex">
        <view class="flex1">
          <u-button color="#FF5319" shape="circle" size="large" text="确定" type="primary" />
        </view>
      </view>
    </view>
    <view
      v-if="editType === 1"
      class="put-operate-save fixed-bottom p-b-safe-area border-box box-shadow bg-white px-32"
    >
      <view class="py-12 flex">
        <view class="flex1">
          <u-button
            :loading="loading"
            color="#FF5319"
            shape="circle"
            size="large"
            text="发布"
            type="primary"
            @click="sendHandler"
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
    goodsId: '', // 商品主键
    goodsName: '', // 商品名称-回显使用
    name: '', // 项目名称
    cashPrice: '', // 现金价格
    accountPrice: '', // 账期价格
    accountPeriodDays: '', // 账期天数
    totalInvestment: '', // 总批发量
    warehouseId: '', // 发货仓库
    warehouseName: '', // 发货仓库名称-回显使用
    startNumber: '', // 起批量
    // profitSharing: '', // 商品分润
    investmentLimit: '', // 限批量
    shippingType: 1, // 快递类型 1包邮 2到付
    investableArea: [], // 售卖区域
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
        payType: [1],
        investmentForm: this.$vocenApi._.cloneDeep(DefaultInvestmentForm),
        productDetail: [], // 商品详情
        flag: false,
        editType: 1, // 1 发布   2 填写信息确认（供上货使用）  3 查看信息
        isOrderTransfer: '', // 1 发布   2 填写信息确认（供上货使用）  3 查看信息
        type: null,
        formatterMonth: (value) => formatterHandle(value, 'int'),
        formatterMoney: (value) => formatterHandle(value, 'money'),
        payPrice: 0, //实付款
        payAccountPrice: 0, //实付款账期
        isTransfer: 0, //标记商品转让
        id: '',
      }
    },
    onLoad(options) {
      this.edit = !!options?.id
      this.isTransfer = options.isTransfer || 0
      this.payPrice = options.payPrice || 0
      console.log(this.edit)
      this.type = options?.type
      this.isOrderTransfer = options.isOrderTransfer
      if (this.edit) {
        this.id = options.id
        if (this.isTransfer === '1') {
          this.initInvestmentGoodInfo(options.id)
          return
        }
        // 状态 1：已上架   2：待审核 3：审核未通过 4：已下架
        this.initInvestmentInfo(options.id)
      }
    },
    onShow() {
      const flag = uni?.$SendInvestmentForm // 判断是否存在已编辑的历史
      if (flag) {
        this.investmentForm = uni.$SendInvestmentForm
        this.productDetail = this.investmentForm.productDetail
        console.log(this.productDetail, 'xx')
      } else {
        this.investmentForm = this.$vocenApi._.cloneDeep(DefaultInvestmentForm)
        uni['$SendInvestmentForm'] = this.investmentForm
        this.productDetail = this.investmentForm.productDetail
      }
    },
    watch: {
      payType: {
        deep: true,
        handler(newVal) {
          if (!newVal.includes(2)) {
            // this.investmentForm.accountPrice = ''
            // this.investmentForm.accountPeriodDays = ''
          }
        },
      },
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
    mounted() {
      // 捕获选择的商品
      uni.$on('chooseGoodsHandler', ({ id, name }) => {
        this.investmentForm.goodsId = id
        this.investmentForm.goodsName = name
      })
      uni.$on('chooseWarehouse', (res) => {
        console.log(res)
        this.$storage.set('InvestmentWarehouse', res)
        this.investmentForm.warehouseId = res.warehouseId
        this.investmentForm.warehouseName = res.warehouseName
      })
      uni.$on('addressFn', (res) => {
        this.$storage.set('defaultArea', res)
        this.investmentForm.investableArea = res
      })
    },
    methods: {
      async initInvestmentInfo(id) {
        try {
          const ret = await this.$VoHttp.GOODS.apiGoodsProjectInvestmentDetail({ id })
          if (!ret || !ret.data) return
          this.payAccountPrice = ret.data.accountPrice || 0
          if (this.isOrderTransfer) {
            this.investmentForm.goodsId = ret.data.goodsId
            this.investmentForm.goodsName = ret.data.goodsName
            this.investmentForm.cashPrice = ''
            this.investmentForm.name = ret.data.name
            this.investmentForm.accountPrice = ''
            this.investmentForm.accountPeriodDays = ''
            this.investmentForm.totalInvestment = ''
            this.investmentForm.warehouseId = ''
            this.investmentForm.warehouseName = ''
            this.investmentForm.startNumber = ''
            this.investmentForm.investmentLimit = ''
            this.investmentForm.shippingType = 1
            this.investmentForm.investableArea = []
            this.investmentForm.desc = []
            this.investmentForm.productDetail = []
            this.investmentForm.status = ''
          } else {
            this.investmentForm = ret.data
            this.investmentForm.accountPrice = this.investmentForm.accountPrice
              ? this.investmentForm.accountPrice
              : ''
            this.investmentForm.accountPeriodDays = this.investmentForm.accountPeriodDays
              ? this.investmentForm.accountPeriodDays
              : ''
            this.productDetail = this.investmentForm.detailPic.map((item) => {
              return {
                type: 1,
                name: new Date().getTime(),
                src: item,
              }
            })
            this.investmentForm.investableArea = ret.data.investableAreaList
            if (this.investmentForm.accountPrice) {
              this.payType = [1, 2]
            }
          }
          console.log(this.investmentForm)
        } catch (e) {
          console.warn(e, 'EditInvestmentInfo')
          this.$u.toast(e?.message || e?.data?.message || '服务端错误')
        }
      },
      async initInvestmentGoodInfo(id) {
        this.$VoHttp
          .apiGoodsDetail({ id: id })
          .then((res) => {
            this.payAccountPrice = res.data.accountPrice || 0
            this.investmentForm.goodsId = res.data.id
            this.investmentForm.goodsName = res.data.name
            this.investmentForm.cashPrice = ''
            this.investmentForm.name = res.data.name
            this.investmentForm.accountPrice = ''
            this.investmentForm.accountPeriodDays = ''
            this.investmentForm.totalInvestment = ''
            this.investmentForm.warehouseId = ''
            this.investmentForm.warehouseName = ''
            this.investmentForm.startNumber = ''
            this.investmentForm.investmentLimit = ''
            this.investmentForm.shippingType = 1
            this.investmentForm.investableArea = []
            this.investmentForm.desc = []
            this.investmentForm.productDetail = []
            this.investmentForm.status = ''
          })
          .catch((e) => {
            console.log(e)
            this.$u.toast(e.message || '网络请求失败')
          })
      },
      // 发布
      async sendHandler() {
        const flag = this.checkForm()
        if (flag) {
          try {
            let param = { ...this.investmentForm }
            if (param.accountPrice <= 0) {
              param.accountPrice = ''
            }

            if (this.type) {
              this.loading = true
              const { code } = await this.$VoHttp.GOODS.apiGoodsProjectInvestmentApplyStatus(param)
              this.loading = false
              if (+code === 20001) {
                this.$u.toast('提交成功')
                this.resetForm()
                setTimeout(() => {
                  uni.$emit('refresh')
                  uni.$u.route('/pages/SupplierCenter/SupplierTabbar?tabbarVal=1')
                }, 1000)
              }
            } else {
              if (this.isTransfer) {
                this.loading = true
                const { code } = await this.$VoHttp.GOODS.apiGoodsProjectInvestmentSave(param)
                this.loading = false
                if (+code === 20001) {
                  this.$u.toast('提交成功')
                  this.resetForm()
                  setTimeout(() => {
                    this.$backFn()
                  }, 1000)
                }
              } else {
                this.loading = true
                const { code } = await this.$VoHttp.GOODS.apiGoodsProjectInvestmentUpdate(param)
                this.loading = false
                if (+code === 20001) {
                  this.$u.toast('提交成功')
                  this.resetForm()
                  setTimeout(() => {
                    uni.$emit('refresh')
                    uni.$u.route({
                      url: '/pagesSupplier/SendInvestmentInfo/CheckInvestmentInfo',
                      params: {
                        id: this.id,
                        type: 1,
                      },
                    })
                  }, 1000)
                }
              }
            }
          } catch (e) {
            this.loading = false
            console.warn(e, 'EditInventmentInfo')
            this.$u.toast(e?.message || e?.data?.message || '服务端错误')
          }
        }
      },
      resetForm() {
        this.investmentForm = this.$vocenApi._.cloneDeep(DefaultInvestmentForm)
        delete uni['$SendInvestmentForm']
        this.productDetail = this.investmentForm.productDetail
      },
      checkForm() {
        if (!this.investmentForm.goodsId) {
          this.$u.toast('请选择商品')
          return false
        }

        if (!this.investmentForm.name) {
          this.$u.toast('商品别称不能为空')
          return false
        }

        if (!this.investmentForm.cashPrice || +this.investmentForm.cashPrice <= 0) {
          this.$u.toast('现金价格必填且大于0')
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
          if (this.investmentForm.accountPeriodDays <= 0) {
            this.$u.toast('账期天数必填且大于0')
            return false
          }
          if (!this.investmentForm.accountPrice || +this.investmentForm.accountPrice <= 0) {
            this.$u.toast('账期价格必填且大于0')
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
        } else {
          this.investmentForm.isAccount = false
        }

        if (this.investmentForm.totalInvestment <= 0) {
          this.$u.toast('总批发量必填且大于0')
          return false
        }
        if (!this.$vocenApi.Pattern.isIntNumber(this.investmentForm.totalInvestment)) {
          this.$u.toast('总批发量不能录入小数')
          return false
        }

        if (!this.investmentForm.warehouseId) {
          this.$u.toast('请选择发货仓库')
          return false
        }

        if (this.investmentForm.startNumber <= 0) {
          this.$u.toast('起批量必填且大于0')
          return false
        }
        if (!this.$vocenApi.Pattern.isIntNumber(this.investmentForm.startNumber)) {
          this.$u.toast('起批量不能录入小数')
          return false
        }

        if (this.investmentForm.investmentLimit <= 0) {
          this.$u.toast('限批量必填且大于0')
          return false
        }
        if (!this.$vocenApi.Pattern.isIntNumber(this.investmentForm.startNumber)) {
          this.$u.toast('限批量不能录入小数')
          return false
        }

        if (+this.investmentForm.startNumber > +this.investmentForm.investmentLimit) {
          this.$u.toast('起批量需小于限投量')
          return false
        }

        if (+this.investmentForm.investmentLimit > +this.investmentForm.totalInvestment) {
          this.$u.toast('限投量需小于总批发量')
          return false
        }
        if (!this.investmentForm.shippingType) {
          this.$u.toast('请选择运费')
          return false
        }

        if (!this.investmentForm.investableArea.length) {
          this.$u.toast('请选择售卖区域')
          return false
        }

        if (!this.investmentForm.desc.length) {
          this.$u.toast('请上传商品详情图')
          return false
        }
        return true
      },
      clickHandler(type) {
        if (type === 1) {
          if (this.edit) {
            return
          }
          uni.$u.route('/pagesSupplier/InvestmentInfo/InvestChooseGood')
        }
        if (type === 2) {
          //商品转让允许选择仓库
          if (this.edit && !this.isTransfer) {
            return
          }
          if (!this.investmentForm.goodsId) {
            this.$u.toast('请先选择商品')
            return false
          }
          // isTransfer 商家转让-预留
          uni.$u.route(
            '/pagesSupplier/SendInvestmentInfo/SelectWarehouse?isTransfer=' +
              this.isTransfer +
              '&goodsId=' +
              this.investmentForm.goodsId,
          )
        }
        if (type === 3) {
          this.$storage.set('defaultArea', this.investmentForm.investableArea)
          this.$u.route({
            url: '/pagesSupplier/InvestmentArea/InvestmentArea',
            params: {
              type: 2,
            },
          })
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
    z-index: 99;
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
  .tooltip-box {
    width: 260rpx;
    white-space: normal;
    padding: 24rpx;
    box-sizing: border-box;
  }
  .u-slot-title {
    white-space: nowrap;
  }
</style>
