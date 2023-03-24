<template>
  <view id="parent" class="investment">
    <view
      class="flex vh-full overflow-hidden flex-column"
      @click=";(showPageBox = false), $refs.tips.close()"
    >
      <VoNav :title="title" is-have-more />
      <!-- <VoAlert
        v-if="investmentForm.isAuditReason"
        :description="investmentForm.isAuditReason"
        icon-position="right"
        title="违规原因"
      /> -->
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
        :scroll-top="scrollTop"
        class="flex1 overflow-hidden"
        scroll-anchoring
        scroll-with-animation
        scroll-y
        @scroll="scrollHandler"
      >
        <view
          v-if="investmentForm.status === 2"
          id="info"
          class="investment-tip flex flex-justify-between flex-vertical-c"
        >
          <view class="flex flex-vertical-c">
            <VoIcon :size="20" name="invest-tip" />
            <view class="p-l-16">批发信息正在审核中，请耐心等待。</view>
          </view>
          <VoIcon :size="16" name="close" />
        </view>
        <view v-if="investmentForm.status !== 2" class="h16" />
        <view id="info" class="cell-list bg-white p-t-44">
          <view class="fz-32 cell-list-title">项目信息</view>
          <view class="bg-white">
            <u-cell-group :border="false">
              <u-cell>
                <view slot="title" class="flex flex-justify-between flex-wrap">
                  <view class="u-slot-title flex">
                    <text class="c-required">*</text>
                    <text class="u-cell-text">项目名称</text>
                  </view>
                  <view>
                    <view class="cell-value p-r-16">{{ investmentForm.name }}</view>
                    <!--                    <view class="flex flex-vertical-c p-r-16">-->
                    <!--                    </view>-->
                  </view>
                </view>
              </u-cell>

              <u-cell>
                <view
                  slot="title"
                  class="flex flex-justify-between flex-wrap"
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
                <view slot="title" class="flex flex-justify-between flex-wrap">
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
                <view slot="title">
                  <view class="flex flex-justify-between flex-vertical-c">
                    <view class="u-slot-title">
                      <view class="u-cell-text flex flex-vertical-c">
                        <view class="cell-icon m-r-10">
                          <text class="c-required">*</text>
                          <text class="u-cell-text">回报率</text>
                        </view>
                        <VoTooltip
                          ref="tips"
                          :arrowStyleSelf="{ left: '58px' }"
                          :conLeft="-18"
                          class="fz-0"
                          placement="bottom"
                        >
                          <view slot="content" class="fz-24 lh150 color-white">
                            已下单尚未支付，及已支付<br />未出库的商品
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
                        运费
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
                <view slot="title" class="flex flex-justify-between flex-vertical-c">
                  <view class="u-slot-title">
                    <text class="c-required">*</text>
                    <text class="u-cell-text">售卖区域</text>
                  </view>
                  <view @click="clickHandler(3)">
                    <view class="cell-placeholder flex flex-vertical-c">
                      <view v-if="investmentForm.investableAreaList.length">查看详情</view>
                      <VoIcon :opacity="0.3" :size="24" color="#000000" name="right-arrow" />
                    </view>
                  </view>
                </view>
              </u-cell>
            </u-cell-group>
          </view>
        </view>
        <!-- 项目进度 -->
        <view id="process" class="cell-list bg-white p-t-30 p-b-30">
          <view class="fz-32 cell-list-title">项目进度</view>
          <ProjectProcess :info="investmentForm" />
        </view>
        <!-- 进货人 -->
        <view id="person" class="cell-list bg-white p-t-30 m-t-16">
          <InvestPerson :info="investmentForm" />
        </view>

        <!-- <view class="bg-white cell-list m-t-10" id="detail">
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
                <view class="label-text">默认为零售商品详情图，可更换</view>
                <view class="cell-upload">
                  <VoFormUpload
                    :limit="11"
                    :source.sync="productDetail"
                    :video-limit="1"
                    preview
                    @change="productDetailImgHandler"
                  />
                </view>
              </view>
            </u-cell>
          </u-cell-group>
        </view> -->
        <view id="detail">
          <!-- 商品详情模块  -->
          <ProductDetail :info="investmentForm" />
        </view>
        <!--  适配车型模块  -->
        <view id="CarModel">
          <CarModel
            v-if="investmentForm.vehicles && investmentForm.vehicles.length"
            :info="investmentForm"
            @carModelLookMore="$linkToEasy('/pagesSupplier/InvestmentInfo/InvestCarModel')"
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
          @productParamsLookMore="$linkToEasy('/pagesSupplier/InvestmentInfo/InvestProductParams')"
        />
        <!--  安装指导模块  -->
        <view id="InstallationGuide" />
        <InstallationGuide
          v-if="investmentForm.guideVideo && investmentForm.guideVideo.length"
          :info="investmentForm"
          class="m-t-16"
        />
        <!--  评论模块  -->
        <view id="InvestEvaluate" />
        <InvestEvaluate v-if="investmentForm.id" :info="investmentForm" />
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
        <view v-show="showBtn" class="fix-btn">
          <image
            class="icon-btn"
            src="/static/icons/shop_details.png"
            @click.stop="showPageBox = !showPageBox"
          />
          <image class="icon-btn" src="/static/icons/to_top.png" @click="toTop()" />
        </view>
      </scroll-view>

      <view
        v-if="
          investmentForm.violationStatus === 3 &&
          (investmentForm.status === 2 || investmentForm.status === 5) &&
          pageType
        "
        class="info-bottom p-b-safe-area border-box bg-white px-32"
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
        v-if="
          +investmentForm.violationStatus === 3 &&
          (+investmentForm.status === 4 || +investmentForm.status === 3)
        "
        class="info-bottom p-b-safe-area border-box bg-white px-32"
      >
        <view class="py-12">
          <u-row gutter="10">
            <u-col
              :span="+investmentForm.status !== 3 && +investmentForm.violationStatus !== 3 ? 4 : 6"
            >
              <EraButton
                :loading="loading"
                shape="circle"
                size="large"
                text="预览"
                theme-type="Default"
                @click="previewProject"
              />
            </u-col>
            <u-col
              v-if="+investmentForm.status !== 3 && +investmentForm.violationStatus !== 3"
              :span="4"
            >
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
            <u-col
              :span="+investmentForm.status !== 3 && +investmentForm.violationStatus !== 3 ? 4 : 6"
            >
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
          (investmentForm.violationStatus === 3 && investmentForm.status === 3) || pageType === 0
        "
        class="info-bottom p-b-safe-area border-box bg-white px-32"
      >
        <view class="py-12">
          <u-row gutter="10">
            <u-col :span="4">
              <EraButton
                :loading="loading"
                shape="circle"
                size="large"
                text="预览"
                theme-type="Default"
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
                @click="soldOut"
              />
            </u-col>
            <u-col v-if="pageType === 0" :span="4">
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
      <!--   违规待整改   -->
      <view
        v-else-if="+investmentForm.violationStatus === 1 && +investmentForm.status === 4"
        class="info-bottom p-b-safe-area border-box bg-white"
      >
        <view v-if="investmentForm.violationReason" class="fixed-violation">
          <VoAlert :description="investmentForm.violationReason" title="违规原因：" />
        </view>
        <view class="p-t-12 p-b-12 p-l-32 p-r-32 flex flex-justify-around">
          <EraButton
            :loading="loading"
            shape="circle"
            size="small"
            text="预览"
            theme-type="Default"
            @click="previewProject"
          />
          <EraButton size="small" text="申请上架" @click="applyHandler" />
        </view>
      </view>
      <!--   违规审核中   -->
      <view
        v-else-if="
          (+investmentForm.violationStatus === 2 && +investmentForm.status === 2) ||
          (+investmentForm.violationStatus === 1 && +investmentForm.status === 3)
        "
        class="info-bottom p-b-safe-area border-box bg-white"
      >
        <view v-if="investmentForm.violationReason" class="fixed-violation">
          <VoAlert :description="investmentForm.violationReason" title="违规原因：" />
        </view>
        <view class="p-t-12 p-b-12 p-l-32 p-r-32">
          <u-row gutter="10">
            <u-col :span="6">
              <EraButton
                :loading="loading"
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

    <!--下架原因弹框-->
    <OutStockReason ref="stockReason" @close="outStockClose" @confirm="outStockConfirm" />
  </view>
</template>

<script>
  import VoAlert from '@/components/VoAlert/VoAlert'
  import EraButton from '../../uni_modules/era-ui/components/EraButton/EraButton'
  import InvestPerson from './components/InvestPerson'
  import ProjectProcess from './components/ProjectProcess'
  import CarModel from '@/pagesSupplier/InvestmentInfo/components/CarModel'
  import ServiceSafe from '@/pagesSupplier/InvestmentInfo/components/ServiceSafe'
  import ProductParams from '@/pagesSupplier/InvestmentInfo/components/ProductParams'
  import InstallationGuide from '@/pagesSupplier/InvestmentInfo/components/InstallationGuide'
  import InvestEvaluate from '@/pagesSupplier/InvestmentInfo/components/InvestEvaluate'
  import ProductDetail from '@/pagesSupplier/InvestmentInfo/components/ProductDetail'
  import OutStockReason from '@/pages/SupplierCenter/components/GoodComponents/OutStockReason'

  const statusTtile = {
    1: '进行中',
    2: '审核中',
    3: '审核未通过',
    4: '已下架',
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
    productDetail: [], // 批发详情-回显使用
    status: '', // 状态 1：已上架   2：待审核 3：审核未通过 4：已下架
    scrollTop: 0, // 滚动条位置，距顶为0
    oldScrollTop: 0,
  }

  export default {
    name: 'InvestmentInfo',
    components: {
      EraButton,
      VoAlert,
      InvestPerson,
      ProjectProcess,
      CarModel,
      ServiceSafe,
      ProductParams,
      InstallationGuide,
      InvestEvaluate,
      ProductDetail,
      OutStockReason,
    },
    data() {
      return {
        optionsId: '',
        isShowTips: false,
        pageType: 0, //tab状态值 0进行中1待审核2已下架3.违规4已完成
        scrollIntoView: '',
        disabled: false,
        title: '审核中',
        loading: false,
        payType: [],
        investmentForm: this.$vocenApi._.cloneDeep(DefaultInvestmentForm),
        productDetail: [], // 商品详情
        flag: false,
        editType: 1, // 1 发布   2 填写信息确认（供上货使用）  3 查看信息
        showPageBox: false,
        pageList: [
          {
            name: '图文介绍',
            id: 'detail',
          },
          {
            name: '适配车型',
            id: 'CarModel',
          },
          {
            name: '服务保障',
            id: 'ServiceSafe',
          },
          {
            name: '产品属性',
            id: 'ProductParams',
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
        operateLoading: false,
        old: {
          scrollTop: 0,
        },
        scrollTop: 0,
        current: 0,
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
        processScroll: 0,
        personScroll: 0,
        detailScroll: 0,
        showBtn: false, // 回到顶部按钮
      }
    },
    onLoad(options) {
      this.optionsId = options.id
      this.edit = !!options?.id
      this.pageType = options.type ? Number(options.type) : 0
    },
    onShow() {
      if (this.edit) {
        // 状态 1：已上架   2：待审核 3：审核未通过 4：已下架
        this.initInvestmentInfo(this.optionsId)
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
        //视图会发生重新渲染
        this.scrollTop = this.oldScrollTop
        //当视图渲染结束 重新设置为0
        this.$nextTick(() => {
          this.scrollTop = 0
        })
      },
      // 快捷跳转
      tabClick(name) {
        this.scrollIntoView = ''
        this.scrollIntoView = name.id
      },
      //获取结点高度
      toAnchor() {
        uni
          .createSelectorQuery()
          .select('#process')
          .boundingClientRect((data) => {
            this.processScroll = data.top - 50
          })
          .exec()
        uni
          .createSelectorQuery()
          .select('#person')
          .boundingClientRect((data) => {
            this.personScroll = data.top - 50
          })
          .exec()
        uni
          .createSelectorQuery()
          .select('#detail')
          .boundingClientRect((data) => {
            this.detailScroll = data.top - 50
          })
          .exec()
      },
      // 滑动处理
      scrollHandler({ detail }) {
        //关闭tips
        this.$refs.tips.close()
        console.log('closeTips')
        this.old.scrollTop = detail.scrollTop
        // console.log(detail.scrollTop)
        console.log(detail.scrollTop, 11111111)
        if (detail.scrollTop < this.processScroll) {
          this.current = 0
        } else if (detail.scrollTop >= this.processScroll && detail.scrollTop < this.personScroll) {
          this.current = 1
        } else if (detail.scrollTop >= this.personScroll && detail.scrollTop < this.detailScroll) {
          this.current = 2
        } else if (detail.scrollTop >= this.detailScroll) {
          this.current = 3
        }
        if (detail.scrollTop > 350) {
          this.showBtn = true
        } else {
          this.showBtn = false
        }
        //记录scroll 位置
        this.oldScrollTop = detail.scrollTop
      },
      //下架
      soldOut() {
        this.$refs.stockReason.show()
      },
      //下架弹框关闭
      outStockClose() {
        this.operateLoading = false
      },
      //下架确认
      outStockConfirm() {
        if (this.operateLoading) {
          return
        }
        this.operateLoading = true
        this.$VoHttp.GOODS.apiGoodsProjectInvestmentUpdateStatus({
          id: [this.investmentForm.id],
          status: 4, // 1上架  4下架
        })
          .then((res) => {
            if (+res.code === 20001) {
              this.$u.toast('操作成功')
              setTimeout(() => {
                uni.$emit('refresh')

                this.$backFn()
                this.operateLoading = false
              }, 1000)
            }
          })
          .catch((e) => {
            this.operateLoading = false
            console.log(e)
            this.$u.toast(e?.message || '服务错误')
          })
      },
      async initInvestmentInfo(id) {
        // apiGoodsProjectInvestmentDetail
        const ret = await this.$VoHttp.GOODS.apiGoodsProjectInvestmentSellerPreview({ id })
        console.log(ret)
        this.investmentForm = ret.data
        this.productDetail = this.investmentForm.detailPic.map((item) => {
          return {
            type: 1,
            name: new Date().getTime(),
            src: item,
          }
        })
        //视频回显
        if (this.investmentForm.guideVideo && this.investmentForm.guideVideo.length > 0) {
          this.investmentForm.guideVideo.map((item) => {
            let dict = {
              type: 2,
              name: new Date().getTime(),
              poster: item,
            }
            this.productDetail.push(dict)
          })
        }

        console.log('请求数据', this.productDetail)
        this.title = statusTtile[this.investmentForm.status]

        // 待整改 hack
        if (+this.investmentForm.status === 4 && +this.investmentForm.violationStatus === 1) {
          this.title = '待整改'
        }

        if (
          this.investmentForm.violationStatus === 1 &&
          (this.investmentForm.status === 4 || this.investmentForm.status === 3)
        ) {
          // 调用是否能使用
          this.$VoHttp.GOODS.apiGoodsProjectInvestmentWhetherApplyListing({
            id: this.investmentForm.id,
          }).then((res) => {
            this.disabled = !res.data
          })
        }
        this.$nextTick((res) => {
          this.toAnchor()
        })
      },

      // 申请上架
      applyHandler() {
        if (this.operateLoading) {
          return
        }
        this.operateLoading = true
        this.$VoHttp.GOODS.apiGoodsProjectInvestmentUpdateStatus({
          id: [this.investmentForm.id],
          status: 1, // 1上架  4下架
        })
          .then((res) => {
            this.$u.toast('操作成功')
            setTimeout(() => {
              uni.$emit('refresh')

              this.$backFn()
              this.operateLoading = false
            }, 1000)
          })
          .catch((e) => {
            this.operateLoading = false
            this.$u.toast(e?.message || '服务错误')
          })
      },
      previewProject() {
        // 预览
        this.$u.route({
          url: '/pagesSupplier/InvestmentInfo/InvestmentDetail',
          params: {
            id: this.investmentForm.id,
          },
        })
      },
      // 申请上架
      applyListing() {
        this.$VoHttp.GOODS.apiGoodsProjectInvestmentWhetherApplyListing({
          id: this.investmentForm.id,
        })
          .then((res) => {
            if (res.data) {
              // 可以进行编辑上架
              this.$u.route({
                url: '/pagesSupplier/SendInvestmentInfo/EditInvestmentInfo',
                params: {
                  id: data.id,
                  type: 1,
                },
              })
            }
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请检查网络')
          })
        return
      },
      updateHandler() {
        this.$u.route({
          url: '/pagesSupplier/SendInvestmentInfo/EditInvestmentInfo',
          params: {
            id: this.investmentForm.id,
          },
        })
      },
      // 发布批发信息
      async sendHandler() {
        // 项目预览
        this.$u.route({
          url: '/pagesSupplier/InvestmentInfo/InvestmentDetail',
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
          this.$u.toast('请上传商品详情图')
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
    bottom: 0;
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
      flex: 1 !important;
      text-align: center;
    }
    &-tip {
      padding: 0rpx 32rpx;
      height: 80rpx;
      line-height: 80rpx;
      color: $v-error;
      font-size: 24rpx;
      background-color: $v-error-btn-disabled;
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
      max-width: 360rpx;
      text-align: right;
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
    width: 96rpx;
    //height: 96rpx;
    position: fixed;
    z-index: 10;
    bottom: 240rpx;
    right: 32rpx;
  }
  .icon-btn {
    width: 96rpx;
    height: 96rpx;
  }
  .info-bottom {
    border-top: 2rpx solid $v-bg-light;
  }
</style>
