<template>
  <view id="parent" class="investment flex-column flex">
    <view class="flex vh-full overflow-hidden flex-column">
      <VoNav :title="title" is-have-more />
      <VoAlert
        v-if="investmentForm.violationStatus === 3 && investmentForm.status === 2"
        :showTitle="false"
        description="批发信息正在审核中、请耐心等待"
        icon-position="right"
      />
      <VoAlert
        v-if="investmentForm.isAuditReason"
        :description="investmentForm.isAuditReason"
        icon-position="right"
        title="审核未通过原因："
      />
      <view v-if="old.scrollTop >= 200" class="bg-white vw-full fixed">
        <EraTabs
          :activeStyle="activeStyle"
          :current="current"
          :list="tabList"
          lineColor="#FF5319"
          @change="tabClick"
        />
      </view>
      <scroll-view
        :scroll-into-view="scrollIntoView"
        class="p-b-safe-area flex1 overflow-hidden relative"
        scroll-anchoring
        scroll-with-animation
        scroll-y
        @scroll="scrollHandler"
      >
        <view id="info" class="cell-list bg-white p-t-30 m-t-20">
          <view class="fz-32 cell-list-title">项目信息</view>
          <view class="bg-white">
            <u-cell-group :border="false">
              <u-cell>
                <view slot="title" class="flex flex-justify-between flex-vertical-c">
                  <view class="u-slot-title flex">
                    <text class="c-required">*</text>
                    <text class="u-cell-text">项目名称</text>
                  </view>
                  <view>
                    <view class="p-r-16">
                      <u-input
                        v-model="investmentForm.name"
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
              </u-cell>

              <u-cell>
                <view
                  slot="title"
                  class="flex flex-justify-between flex-vertical-c"
                  @click="clickHandler(1)"
                >
                  <view class="u-slot-title">
                    <text class="c-required">*</text>
                    <text class="u-cell-text">商品名称</text>
                  </view>
                  <view>
                    <view
                      v-if="!investmentForm.goodsId"
                      class="cell-placeholder flex flex-vertical-c"
                    />
                    <view v-else class="flex flex-vertical-c p-r-15">
                      <view class="cell-value">{{ investmentForm.goodsName }}</view>
                    </view>
                  </view>
                </view>
              </u-cell>
              <u-cell v-if="false">
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
                          :maxLength="8"
                          border="none"
                          class="cell-input-value"
                          input-align="right"
                          placeholder=""
                          placeholder-class="cell-placeholder"
                          readonly
                          type="number"
                        >
                          <view slot="suffix">元</view>
                        </u-input>
                      </view>
                    </view>
                  </view>
                </view>
              </u-cell>

              <u-cell v-if="investmentForm.accountPrice">
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
                          placeholder=""
                          placeholder-class="cell-placeholder"
                          readonly
                          type="number"
                        >
                          <view slot="suffix"> 元</view>
                        </u-input>
                      </view>
                    </view>
                  </view>
                  <view v-if="false" class="cell-profit">预计收益2650.06元</view>
                </view>
              </u-cell>
              <u-cell v-if="investmentForm.accountPrice">
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
                          :maxLength="8"
                          border="none"
                          class="cell-input-value"
                          input-align="right"
                          placeholder=""
                          placeholder-class="cell-placeholder"
                          readonly
                          type="number"
                        >
                          <view slot="suffix"> 天</view>
                        </u-input>
                      </view>
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
                      <VoIcon :opacity="0.3" :size="24" color="#000000" name="right-arrow" />
                    </view>
                    <view v-else class="flex flex-vertical-c p-r-15">
                      <view class="cell-value">{{ investmentForm.warehouseName }}</view>
                    </view>
                  </view>
                </view>
              </u-cell>

              <u-cell>
                <view slot="title" class="flex flex-justify-between flex-vertical-c">
                  <view class="u-slot-title flex">
                    <text class="c-required">*</text>
                    <text class="u-cell-text">总批发量</text>
                  </view>
                  <view>
                    <view class="p-r-16">
                      <u-input
                        v-model="investmentForm.totalInvestment"
                        border="none"
                        class="cell-input-value"
                        input-align="right"
                        placeholder=""
                        placeholder-class="cell-placeholder"
                        readonly
                        type="number"
                      />
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
                          placeholder=""
                          placeholder-class="cell-placeholder"
                          readonly
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
                          placeholder=""
                          placeholder-class="cell-placeholder"
                          readonly
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
                        邮费
                      </view>
                    </view>
                  </view>
                  <view>
                    <view class="flex flex-vertical-c p-r-15">
                      <view v-if="investmentForm.shippingType === 1" class="cell-value">包邮</view>
                      <view v-else class="cell-value">到付</view>
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
                        <VoTooltip class="fz-0" placement="bottom">
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

              <u-cell>
                <view slot="title" class="flex flex-justify-between flex-vertical-c">
                  <view class="u-slot-title">
                    <text class="c-required">*</text>
                    <text class="u-cell-text">售卖区域</text>
                  </view>
                  <view @click="clickHandler(3)">
                    <view class="cell-placeholder flex flex-vertical-c">
                      <view
                        v-if="
                          investmentForm.investableAreaList &&
                          investmentForm.investableAreaList.length
                        "
                        >查看详情</view
                      >
                      <VoIcon :opacity="0.3" :size="24" color="#000000" name="right-arrow" />
                    </view>
                  </view>
                </view>
              </u-cell>
            </u-cell-group>
          </view>
        </view>

        <!-- <view class="bg-white cell-list m-t-10">
          <u-cell-group :border="false">
            <u-cell>
              <view slot="title" class="flex flex-justify-between flex-vertical-c">
                <view class="u-slot-title">
                  <view class="u-cell-text flex flex-vertical-c">
                    <text class="c-required">*</text>
                    <view class="cell-icon">项目详情图</view>
                  </view>
                </view>
                <view>
                  <view class="cell-placeholder p-r-20 flex flex-vertical-c">
                    <view>{{ productDetail.length }}/11</view>
                  </view>
                </view>
              </view>
              <view slot="label">
                <view class="label-text"> 建议png.jpg.mp4格式。</view>
                <view class="cell-upload">
                  <VoFormUpload
                    :source.sync="productDetail"
                    :video-limit="1"
                    :limit="11"
                    preview
                    @change="productDetailImgHandler"
                  />
                </view>
              </view>
            </u-cell>
          </u-cell-group>
        </view> -->
        <!-- 项目进度 -->
        <view id="process" class="cell-list bg-white p-t-30 p-b-30 m-t-20">
          <view class="fz-32 cell-list-title">项目进度</view>
          <ProjectProcess :info="investmentForm" />
        </view>
        <!-- 进货人 -->
        <view id="person" class="cell-list bg-white p-t-30 m-t-20">
          <InvestPerson :info="investmentForm" />
        </view>
        <view id="detail">
          <!--  商品详情模块  -->
          <ProductDetail :info="investmentForm" />
        </view>
        <!--  适配车型模块  -->
        <view id="CarModel">
          <CarModel
            v-if="investmentForm.vehicles && investmentForm.vehicles.length"
            :info="investmentForm"
          />
        </view>
        <!--  服务保障模块  -->
        <view id="ServiceSafe" />
        <ServiceSafe
          v-if="investmentForm.serviceConfig && investmentForm.serviceConfig.length"
          :ServiceData="investmentForm.serviceConfig"
        />
        <!--  产品参数模块  -->
        <view id="ProductParams" />
        <ProductParams
          v-if="investmentForm.paramsProperty && investmentForm.paramsProperty.length"
          :info="investmentForm"
        />
        <!--  安装指导模块  -->
        <view id="InstallationGuide" />
        <InstallationGuide
          v-if="investmentForm.guideVideo && investmentForm.guideVideo.length"
          :info="investmentForm"
        />
        <!--  评论模块  -->
        <view id="InvestEvaluate" />
        <InvestEvaluate :info="investmentForm" />
        <!-- 悬浮按钮 -->
        <view v-if="showPageBox" class="page-box">
          <VoIcon
            :opacity="0.45"
            :size="16"
            class="page-box__del"
            color="#000000"
            name="close-c"
            @click="showPageBox = false"
          />
          <view
            v-for="item in pageList"
            :key="item.id"
            class="page-box__item"
            @click="tabClick(item)"
          >
            {{ item.name }}
          </view>
        </view>
        <view class="fix-btn">
          <VoIcon :size="36" class="m-b-40" name="order-sort" @click="showPageBox = !showPageBox" />
          <VoIcon :size="36" name="back-to-top" @click="toTop()" />
        </view>
      </scroll-view>
      <view
        v-if="investmentForm.status === 2"
        class="put-operate-save p-b-safe-area border-box box-shadow bg-white px-32"
      >
        <view class="py-12">
          <u-row gutter="10">
            <u-col :span="12">
              <u-button
                :loading="loading"
                color="#FF5319"
                shape="circle"
                size="large"
                text="预览"
                type="primary"
                @click="previewProject"
              />
            </u-col>
          </u-row>
        </view>
      </view>
      <view
        v-if="investmentForm.violationStatus === 3 && investmentForm.status === 1"
        class="put-operate-save p-b-safe-area border-box box-shadow bg-white px-32"
      >
        <view class="py-12">
          <u-row gutter="10">
            <u-col :span="4">
              <u-button
                :loading="loading"
                color="#FF5319"
                plain
                shape="circle"
                size="large"
                text="预览"
                type="primary"
                @click="previewProject"
              />
            </u-col>
            <u-col :span="4">
              <u-button
                :loading="loading"
                color="#FF5319"
                shape="circle"
                size="large"
                text="下架"
                type="primary"
                @click="saleOff"
              />
            </u-col>
            <u-col :span="4">
              <u-button
                :loading="loading"
                color="#FF5319"
                shape="circle"
                size="large"
                text="修改"
                type="primary"
                @click="updateHandler"
              />
            </u-col>
          </u-row>
        </view>
      </view>

      <view
        v-if="
          investmentForm.violationStatus === 1 &&
          (investmentForm.status === 4 || investmentForm.status === 3)
        "
        class="put-operate-save p-b-safe-area border-box box-shadow bg-white px-32"
      >
        <view class="py-12">
          <u-row gutter="10">
            <u-col :span="6">
              <EraButton
                :loading="loading"
                plain
                shape="circle"
                size="large"
                text="预览"
                theme-type="Default"
                @click="previewProject"
              />
            </u-col>
            <u-col :span="6">
              <u-button
                :disabled="disabled"
                :loading="loading"
                color="#FF5319"
                shape="circle"
                size="large"
                text="申请上架"
                type="primary"
                @click="applyHandler"
              />
            </u-col>
          </u-row>
        </view>
      </view>
    </view>

    <view v-if="investmentForm.violationReason" class="fixed-violation">
      <VoAlert :description="investmentForm.violationReason" :showIcon="false" title="违规原因：" />
    </view>
  </view>
</template>

<script>
  import VoFormUpload from '@/components/VoFormUpload/VoFormUpload'
  import VoAlert from '@/components/VoAlert/VoAlert'
  import InvestPerson from './components/InvestPerson'
  import ProjectProcess from './components/ProjectProcess'
  import ProductDetail from '@/pagesAgent/InvestmentList/components/ProductDetail'
  import CarModel from '@/pagesAgent/InvestmentList/components/CarModel'
  import ServiceSafe from '@/pagesAgent/InvestmentList/components/ServiceSafe'
  import ProductParams from '@/pagesAgent/InvestmentList/components/ProductParams'
  import InstallationGuide from '@/pagesAgent/InvestmentList/components/InstallationGuide'
  import InvestEvaluate from '@/pagesAgent/InvestmentList/components/InvestEvaluate'
  import EraButton from '../../uni_modules/era-ui/components/EraButton/EraButton'

  const statusTtile = {
    1: '进行中',
    2: '待审核',
    3: '已下架',
    4: '违规',
    5: '已完成',
  }

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
    shippingType: '', // 快递类型 1包邮 2到付
    investableAreaList: [], // 售卖区域
    desc: [], // 商品详情图['url','url']
    productDetail: [], // 投资详情-回显使用
    status: '', // 状态 1：已上架   2：待审核 3：审核未通过 4：已下架
    orderList: [], // 进货人
    paramsProperty: [], // 产品参数
    serviceConfig: [], // 服务保障
    guideVideo: [], // 安装指导
  }

  export default {
    name: 'InvestmentInfo',
    components: {
      EraButton,
      VoFormUpload,
      VoAlert,
      InvestPerson,
      ProductDetail,
      CarModel,
      ServiceSafe,
      ProductParams,
      InstallationGuide,
      InvestEvaluate,
      ProjectProcess,
    },
    data() {
      return {
        disabled: false,
        title: '进行中',
        loading: false,
        payType: [],
        investmentForm: this.$vocenApi._.cloneDeep(DefaultInvestmentForm),
        productDetail: [], // 商品详情
        flag: false,
        editType: 1, // 1 发布   2 填写信息确认（供上货使用）  3 查看信息
        old: {
          scrollTop: 0,
        },
        scrollTop: 0,
        current: 0,
        scrollIntoView: '',
        activeStyle: {
          color: '#FF5319',
          fontWeight: 'bold',
        },
        tabList: [
          {
            name: '项目信息',
            id: 'info',
          },
          {
            name: '项目进度',
            id: 'process',
          },
          {
            name: '进货人',
            id: 'person',
          },
          {
            name: '商品详情',
            id: 'detail',
          },
        ],
        pageList: [
          {
            name: '适配车型',
            id: 'CarModel',
          },
          {
            name: '服务保障',
            id: 'ServiceSafe',
          },
          {
            name: '安装指导',
            id: 'InstallationGuide',
          },
          {
            name: '商品评价',
            id: 'InvestEvaluate',
          },
        ],
        showPageBox: false,
        productData: {},
        operateLoading: false,
      }
    },
    onLoad(options) {
      this.title = options.title
      this.edit = !!options?.id
      console.log(this.edit)
      if (this.edit) {
        // 状态 1：已上架   2：待审核 3：审核未通过 4：已下架
        this.initInvestmentInfo(options.id)
      }
    },
    onShow() {},
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
          // uni['$SendInvestmentForm'] = newForm
        },
      },
    },
    mounted() {
      // 捕获选择的商品
      uni.$on('chooseGoodsHandler', ({ id, name }) => {
        this.investmentForm.goodsId = id
        this.investmentForm.goodsName = name
      })
    },
    methods: {
      //回到顶部
      toTop() {
        this.current = 0
        this.scrollIntoView = 'info'
      },
      // 快捷跳转
      tabClick(name) {
        this.scrollIntoView = ''
        this.scrollIntoView = name.id
      },
      // 滑动处理
      scrollHandler({ detail }) {
        this.old.scrollTop = detail.scrollTop
        // console.log(detail.scrollTop)
        if (detail.scrollTop >= 286) {
          this.current = 1
        } else {
          this.current = 0
        }

        if (detail.scrollTop >= 764) {
          this.current = 2
        }
      },
      async initInvestmentInfo(id) {
        const ret = await this.$VoHttp.GOODS.apiGoodsProjectInvestmentSellerPreview({ id })
        let resData = ret.data
        console.log(resData)
        this.productData = resData
        // let form = DefaultInvestmentForm
        // form.id = resData.id
        // for (let i in resData) {
        //   for (let j in form) {
        //     if (i === j && resData[i]) {
        //       form[j] = resData[i]
        //     }
        //   }
        // }
        if (resData.status === 2) {
          this.title = '审核中'
        }
        if (resData.status === 3) {
          this.title = '审核未通过 '
        }
        if (resData.violationStatus === 1 && resData.status === 4) {
          this.title = '待整改'
        }
        this.investmentForm = resData

        // this.productDetail = this.investmentForm.detailPic.map((item) => {
        //   return {
        //     type: 1,
        //     name: new Date().getTime(),
        //     src: item,
        //   }
        // })
        // this.title = statusTtile[this.investmentForm.status]

        // if (
        //   this.investmentForm.violationStatus === 1 &&
        //   (this.investmentForm.status === 4 || this.investmentForm.status === 3)
        // ) {
        //   // 调用是否能使用
        //   this.$VoHttp.GOODS.apiGoodsProjectInvestmentWhetherApplyListing({
        //     id: this.investmentForm.id,
        //   }).then((res) => {
        //     this.disabled = !res.data
        //   })
        // }
      },

      // 申请上架
      applyHandler() {
        this.$u.route({
          url: '/pagesSupplier/SendInvestmentInfo/EditInvestmentInfo',
          params: {
            id: this.investmentForm.id,
          },
        })
      },
      //下架
      saleOff() {
        if (!this.operateLoading) {
          this.operateLoading = true
          this.$VoHttp.GOODS.apiGoodsProjectInvestmentUpdateStatus({
            id: [this.investmentForm.id],
            status: 4, // 1上架  4下架
          })
            .then((res) => {
              this.operateLoading = false
              if (+res.code === 20001) {
                this.$u.toast('操作成功')
                this.$backFn()
              }
            })
            .catch((e) => {
              this.operateLoading = false
              console.log(e)
              this.$u.toast(e?.message || '服务错误')
            })
        }
      },
      previewProject() {
        // 项目预览
        this.$u.route({
          url: '/pagesSupplier/InvestmentInfo/InvestmentDetail',
          params: {
            id: this.investmentForm.id,
          },
        })
      },
      updateHandler() {
        this.$u.route({
          url: '/pagesSupplier/SendInvestmentInfo/EditInvestmentInfo',
          params: {
            id: this.investmentForm.id,
          },
        })
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
        if (!this.investmentForm.cashPrice) {
          this.$u.toast('现金价格不能为空')
          return false
        }
        if (this.payType.includes(2)) {
          if (!this.investmentForm.accountPrice) {
            this.$u.toast('账期价格不能为空')
            return false
          }
        }
        if (!this.investmentForm.totalInvestment) {
          this.$u.toast('总批发量不能为空')
          return false
        }
        if (!this.investmentForm.warehouseId) {
          this.$u.toast('请选择发货仓库')
          return false
        }
        if (!this.investmentForm.startNumber) {
          this.$u.toast('起批量不能为空')
          return false
        }
        if (!this.investmentForm.investmentLimit) {
          this.$u.toast('限批量不能为空')
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
          return
          uni.$u.route('pagesSupplier/InvestmentInfo/InvestChooseGood')
        }
        if (type === 2) {
          return
          uni.$u.route('pagesSupplier/Warehouse/WarehouseList/SelectWarehouse')
        }
        if (type === 3) {
          this.$storage.set('defaultArea', this.investmentForm.investableAreaList)
          this.$u.route({
            url: 'pagesSupplier/InvestmentArea/InvestmentArea',
            params: {
              preview: 1,
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
  .fixed-violation {
    position: fixed;
    bottom: 116rpx;
    left: 0;
    right: 0;
    z-index: 10;
  }

  .fixed-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }

  .investment {
    ::v-deep .u-tabs__wrapper__nav__item {
      // flex: 1 !important;
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
    width: 750rpx;
    box-sizing: border-box;

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

  .cell-list-title {
    @include black-size-color(32, 0.85);
    font-weight: bold;
  }
  .page-box {
    padding: 0 24rpx;
    box-sizing: border-box;
    position: fixed;
    z-index: 11;
    bottom: 360rpx;
    right: 32rpx;
    background: #fff;
    box-shadow: 0px 2px 8px rgba(34, 40, 75, 0.15);
    border-radius: 8rpx;
    &__item {
      color: rgba(0, 0, 0, 0.65);
      font-size: 28rpx;
      line-height: 1.5;
      text-align: center;
      padding: 16rpx;
      border-bottom: 1px solid #f6f7f8;
    }
    &__del {
      position: absolute;
      top: -16rpx;
      right: -16rpx;
    }
  }
  .fix-btn {
    width: 72rpx;
    // height: 72rpx;
    position: fixed;
    z-index: 10;
    bottom: 240rpx;
    right: 32rpx;
  }
</style>
