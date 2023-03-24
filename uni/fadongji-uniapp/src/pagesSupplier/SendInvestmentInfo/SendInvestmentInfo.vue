<template>
  <view class="investment">
    <VoNav is-have-more title="设置批发信息" />
    <VoAlert v-if="false" icon-position="right" />
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
                <view class="u-slot-title flex w150">
                  <text class="c-required">*</text>
                  <text class="u-cell-text">商品别称</text>
                </view>
                <view class="cell-textarea">
                  <!--                    <u-input-->
                  <!--                      v-model="investmentForm.name"-->
                  <!--                      :maxlength="20"-->
                  <!--                      border="none"-->
                  <!--                      class="cell-input-value"-->
                  <!--                      input-align="right"-->
                  <!--                      placeholder="请输入"-->
                  <!--                      placeholder-class="cell-placeholder"-->
                  <!--                    />-->
                  <textarea
                    v-model="investmentForm.name"
                    auto-height
                    class="cell-textarea__value"
                    maxlength="50"
                    placeholder="请输入"
                    placeholder-class="cell-placeholder"
                  ></textarea>
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
                        下单时，使用现金立即付款的价格
                      </view>
                      <!--                      <VoIcon :size="18" color="#373A4E" name="question-line" />-->
                    </VoTooltip>
                  </view>
                </view>
                <view>
                  <view class="cell-placeholder p-r-16 flex flex-vertical-c">
                    <EraCheckboxGroup v-model="payType" color="#22284B">
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
                      <EraCheckbox :name="2" activeColor="#FF5319" class="m-l-96" label="账期" />
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
                        maxlength="8"
                        placeholder="请输入"
                        placeholder-class="cell-placeholder"
                        type="digit"
                        :formatter="formatterMoney"
                        @input="inputHandle($event, 'cashPrice')"
                      >
                        <view slot="suffix">元</view>
                      </u-input>
                    </view>
                  </view>
                </view>
                <view class="cell-profit" v-if="originPrice">进货价：{{ originPrice }}</view>
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
                        maxlength="8"
                        placeholder="请输入"
                        placeholder-class="cell-placeholder"
                        type="number"
                        @input="inputHandle($event, 'accountPeriodDays')"
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
                        maxlength="8"
                        placeholder="请输入"
                        placeholder-class="cell-placeholder"
                        type="digit"
                        :formatter="formatterMoney"
                        @input="inputHandle($event, 'accountPrice')"
                      >
                        <view slot="suffix"> 元</view>
                      </u-input>
                    </view>
                  </view>
                </view>
                <view class="cell-profit" v-if="originAccountPrice">
                  进货价：{{ originAccountPrice }}
                </view>
                <view v-if="false" class="cell-profit">预计收益2650.06元</view>
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
              <view slot="title" class="flex flex-justify-between flex-vertical-c">
                <view class="u-slot-title flex">
                  <text class="c-required">*</text>
                  <text class="u-cell-text">总批发数量</text>
                </view>
                <view>
                  <view class="p-r-16">
                    <u-input
                      v-model="investmentForm.totalInvestment"
                      border="none"
                      class="cell-input-value"
                      input-align="right"
                      maxlength="8"
                      placeholder="请输入"
                      placeholder-class="cell-placeholder"
                      type="number"
                      @input="inputHandle($event, 'totalInvestment')"
                    />
                  </view>
                </view>
              </view>
            </u-cell>

            <u-cell v-if="true">
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
                        <view slot="content" class="tooltip-box">
                          （商品零售价格-批发价格-商品的平台服务费）/批发价格*100%
                        </view>
                        <VoIcon :opacity="0.6" :size="18" color="#000000" name="question-line" />
                      </VoTooltip>
                    </view>
                  </view>
                  <view>
                    <view class="p-r-16">
                      <u-input
                        v-model="rol"
                        border="none"
                        class="cell-input-value"
                        input-align="right"
                        placeholder=""
                        placeholder-class="cell-placeholder"
                        readonly
                      />
                    </view>
                  </view>
                </view>
                <view class="cell-profit">系统根据商品现金价格与批发价格，自动计算</view>
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
                        border="none"
                        class="cell-input-value"
                        input-align="right"
                        maxlength="8"
                        placeholder="请输入"
                        placeholder-class="cell-placeholder"
                        type="number"
                        @input="inputHandle($event, 'startNumber')"
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
                        border="none"
                        class="cell-input-value"
                        input-align="right"
                        maxlength="8"
                        placeholder="请输入"
                        placeholder-class="cell-placeholder"
                        type="number"
                        @input="inputHandle($event, 'investmentLimit')"
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
                      <EraRadio
                        :iconSize="24"
                        :name="1"
                        activeColor="#FF5319"
                        inactiveIcon="half-check"
                        label="包邮"
                      />
                      <EraRadio
                        :name="2"
                        activeColor="#FF5319"
                        class="m-l-86"
                        inactiveIcon="half-check"
                        label="到付"
                      />
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
                    <!-- <view v-if="!investmentForm.investableArea.length">请设置</view> -->
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
                  <view>
                    {{ productDetail && productDetail.length ? productDetail.length : 0 }}/11
                  </view>
                </view>
              </view>
            </view>
            <view slot="label">
              <view class="label-text">默认为零售商品详情图，可更换</view>
              <view class="cell-upload">
                <VoFormUpload
                  :limit="11"
                  :source.sync="productDetail"
                  :video-limit="1"
                  btnText="上传图片/视频"
                  @change="productDetailImgHandler"
                />
              </view>
            </view>
          </u-cell>
        </u-cell-group>
      </view>
    </view>
    <view v-if="editType === 1" class="fixed-bottom">
      <EraButton
        v-if="
          investmentForm.goodsName &&
          investmentForm.name &&
          investmentForm.cashPrice &&
          investmentForm.warehouseName &&
          investmentForm.totalInvestment &&
          investmentForm.startNumber &&
          investmentForm.investmentLimit &&
          investmentForm.shippingType
        "
        text="发布"
        @click="sendHandler"
      />
      <EraButton v-else disabled text="发布" />
      <VoSafetyArea :is-fixed="false" />
    </view>
    <view v-if="editType === 2" class="fixed-bottom p-b-safe-area">
      <EraButton text="确定" />
      <VoSafetyArea :is-fixed="false" />
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
    productDetail: [], // 商品详情-回显使用
    status: '', // 状态 1：已上架   2：待审核 3：审核未通过 4：已下架\
  }

  export default {
    name: 'InvestmentInfo',
    components: { VoFormUpload, VoAlert },
    data() {
      return {
        loading: false,
        payType: [],
        investmentForm: this.$vocenApi._.cloneDeep(DefaultInvestmentForm),
        productDetail: [], // 商品详情
        flag: false,
        editType: 1, // 1 发布   2 填写信息确认（供上货使用）  3 查看信息
        formatterMonth: (value) => formatterHandle(value, 'int'),
        formatterMoney: (value) => formatterHandle(value, 'money', 8),
        goodCashPrice: '',
        rol: '', //投资回报率
        platFee: 0, //平台服务费
        originPrice: 0, //进货价
        originAccountPrice: 0, //账期价格
      }
    },
    onShow() {
      const flag = uni?.$SendInvestmentFormAdd // 判断是否存在已编辑的历史
      console.log('flag', flag)
      if (flag) {
        this.investmentForm = uni.$SendInvestmentFormAdd
        this.productDetail = this.investmentForm.productDetail
        console.log(this.productDetail, 'xx')
      } else {
        this.investmentForm = this.$vocenApi._.cloneDeep(DefaultInvestmentForm)
        uni['$SendInvestmentFormAdd'] = this.investmentForm
        this.productDetail = this.investmentForm.productDetail
      }
    },
    onUnload() {
      uni.$SendInvestmentFormAdd = ''
    },
    watch: {
      // 商品详情图
      productDetail: {
        deep: true,
        handler(newVal) {
          if (newVal && newVal.length) {
            const imgs = newVal.map((item) => item.src)
            this.investmentForm.desc = imgs
            this.investmentForm.productDetail = newVal
          }
        },
      },
      investmentForm: {
        deep: true,
        handler(newForm) {
          uni['$SendInvestmentFormAdd'] = newForm
        },
      },
    },
    onLoad() {
      // 捕获选择的商品
      uni.$on('chooseGoodsHandler', ({ id, name, salesArea, desc, cashPrice, accountPrice }) => {
        // 根据商品获取商品服务费

        console.log('捕获选择的商品', id, name, accountPrice)
        this.originAccountPrice = accountPrice || 0
        this.$VoHttp.GOODS.apiGoodsGetGoodsServeFee({ id }).then(({ data }) => {
          console.log(data)
          const feeObj = data.find((item) => item.roleId === 'platform')
          this.platFee = feeObj ? feeObj.serveFee : 0
          this.resetForm()
          this.goodCashPrice = cashPrice
          this.investmentForm.goodsId = id
          this.investmentForm.goodsName = name
          this.investmentForm.name = name
          this.investmentForm.investableArea = JSON.parse(salesArea)
          this.getOriginPrice(id)

          console.log(desc, 'sssssss')
          this.investmentForm.productDetail = []
          this.investmentForm.desc = []
          const productDetail = []
          desc.map((item) => {
            if (item.indexOf('.mp4') == -1 || item.indexOf('.MP4') == -1) {
              productDetail.push({
                type: 1,
                src: item,
              })
            } else {
              productDetail.push({
                type: 2,
                src: item,
              })
            }
          })

          this.investmentForm.productDetail = productDetail
          uni['$SendInvestmentFormAdd'] = this.investmentForm
        })
      })
      uni.$on('chooseWarehouse', (res) => {
        console.log(res)
        this.$storage.set('InvestmentWarehouse', res)
        this.investmentForm.warehouseId = res.warehouseId
        this.investmentForm.warehouseName = res.warehouseName
        uni['$SendInvestmentFormAdd'] = this.investmentForm
      })
      uni.$on('addressFn', (res) => {
        this.$storage.set('defaultArea', res)
        this.investmentForm.investableArea = res
        uni['$SendInvestmentFormAdd'] = this.investmentForm
      })
    },
    methods: {
      getOriginPrice(goodsId) {
        //获取进货价
        this.$VoHttp.apiOrderInvestQueryFinallyPrice({ goodsId: goodsId }).then((res) => {
          this.originPrice = res.data || 0
          console.log('res===', res.data)
        })
      },
      // formatterHandle(value, type) {
      //   const numberTypeList = ['int', 'money']
      //   if (value) {
      //     if (numberTypeList.indexOf(type) != -1) {
      //       // 格式化，只保留输入框中的纯数字
      //       let val = value.replace(/[^\d^\.]+/g, '')
      //       if (type === 'money') {
      //         if (parseInt(val) >= 10000000) {
      //           return val
      //         }
      //         // 保留两位小数
      //         if (val.indexOf('.') > -1 && val.split('.')[1].length > 2) {
      //           val = Number(val).toFixed(2)
      //           return val
      //         }
      //         return val
      //       }
      //       if (type === 'int') {
      //         val = val.replace(/\b(0+)/gi, '')
      //         return parseInt(val)
      //       }
      //     }
      //   }
      // },
      // intInput(value) {
      //   this.investmentForm.totalInvestment = value.replace(/\D/g, '')
      // },
      inputHandle($event, key) {
        let value = $event
        //价格判断
        if (value) {
          console.log(this.goodCashPrice, this.platFee)
          if (key === 'cashPrice' || key === 'accountPrice') {
            //只能输入正数,保留两位
            this.investmentForm[key] = value.replace(/[^\d^\.]+/g, '')
            if (value.indexOf('.') > -1 && value.split('.')[1].length > 2) {
              console.log('value', value)
              this.investmentForm[key] = Number(value).toFixed(2)
            }
            if (key === 'cashPrice' && this.goodCashPrice && this.platFee) {
              //计算投资回报率，投资回报率=（商品现金价格-投资现金价格-商品的平台服务费）/投资现金价格
              console.log(this.goodCashPrice, value, this.platFee, '===========')
              const reverse = this.goodCashPrice - value - this.platFee
              console.log(reverse, 'XX')
              let rol =
                reverse > 0
                  ? (((this.goodCashPrice - value - this.platFee) / value) * 100).toFixed(2)
                  : 0
              this.rol = rol && rol != NaN && rol != Infinity ? rol + '%' : 0
            }
          }
          //正整数判断
          if (
            key === 'accountPeriodDays' ||
            key === 'totalInvestment' ||
            key === 'startNumber' ||
            key === 'investmentLimit'
          ) {
            if (value.length === 1) {
              //第一个数字不为0
              this.investmentForm[key] = value.replace(/[^1-9]/g, '')
            } else {
              //只能输入正整数
              this.investmentForm[key] = value.replace(/\D/g, '')
            }
          }
        } else {
          this.rol = ''
        }
      },
      // 发布批发信息
      async sendHandler() {
        const flag = this.checkForm()
        if (flag) {
          this.loading = true

          const { code } = await this.$VoHttp.GOODS.apiGoodsProjectInvestmentSave(
            this.investmentForm,
          )
            .then((res) => {
              this.$u.toast('发布成功')
              this.resetForm()
              setTimeout(() => {
                if (this.userInfo.platformCode === 'agent') {
                  this.$backFn()
                } else {
                  uni.$u.route('/pages/SupplierCenter/SupplierTabbar?tabbarVal=1')
                }
              }, 1000)
              this.loading = false
            })
            .catch((e) => {
              uni.$u.toast(e.message || '发布失败')
            })
        }
      },
      resetForm() {
        this.investmentForm = this.$vocenApi._.cloneDeep(DefaultInvestmentForm)
        delete uni['$SendInvestmentFormAdd']
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

        if (!this.investmentForm.cashPrice || +this.investmentForm.cashPrice === 0) {
          this.$u.toast('请输入现金价格')
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
          if (!this.investmentForm.accountPrice || +this.investmentForm.accountPrice === 0) {
            this.$u.toast('账期金额不能为空')
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

        if (this.investmentForm.totalInvestment <= 0) {
          this.$u.toast('总批发量必填且大于0')
          return false
        }

        if (!this.$vocenApi.Pattern.isIntNumber(this.investmentForm.totalInvestment)) {
          this.$u.toast('总批发量必需是整数')
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
          this.$u.toast('起批量必需是整数')
          return false
        }
        if (this.investmentForm.investmentLimit <= 0) {
          this.$u.toast('限批量必填且大于0')
          return false
        }
        if (!this.$vocenApi.Pattern.isIntNumber(this.investmentForm.investmentLimit)) {
          this.$u.toast('限批量必需是整数')
          return false
        }
        if (+this.investmentForm.startNumber > +this.investmentForm.investmentLimit) {
          this.$u.toast('起批量需小于限批量')
          return false
        }
        if (+this.investmentForm.investmentLimit > +this.investmentForm.totalInvestment) {
          this.$u.toast('限批量需小于总批发量')
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
    background-color: #ffffff;
    padding: 20rpx 32rpx;
    border-top: 2rpx solid $v-bg-light;
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

    .cell-textarea {
      text-align: right;

      &__value {
        width: 520rpx;
        color: rgba(0, 0, 0, 0.65);
        font-size: 32rpx;
      }
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

    .tooltip-box {
      width: 260rpx;
      white-space: normal;
      padding: 24rpx;
      box-sizing: border-box;
    }
  }

  .u-slot-title {
    white-space: nowrap;
  }
</style>
