<template>
  <view>
    <view class="put-product">
      <view class="fixed bg-white">
        <VoNav
          :is-fixed="false"
          :isShowOverlay="false"
          :left-width="240"
          :right-width="240"
          is-have-more
          title="上货"
          @backFn="resetPutForm"
        >
          <!--        <view slot="title">上货</view>-->
          <view slot="operation" class="m-r-10">
            <view class="put-operate p-r-10">
              <view class="price-guide" @click="goToPriceGuide">价格指导</view>
            </view>
          </view>
        </VoNav>
        <view v-if="old.scrollTop >= 200" class="tab-fixed vw-full">
          <!--        <u-tabs-->
          <!--          :activeStyle="activeStyle"-->
          <!--          :current="current"-->
          <!--          :list="tabList"-->
          <!--          lineColor="#FF5319"-->
          <!--          @click="tabClick"-->
          <!--        />-->
          <EraTabs
            :current="current"
            :list="tabList"
            activeStyle="font-size: 32rpx;font-weight: 500;color: #FF5319"
            class="tabs"
            inactiveStyle="font-size: 32rpx;color: rgba(0, 0, 0, 0.25);"
            itemStyle="flex:1;padding:20rpx;"
            lineColor="#FF5319"
            @change="tabClick"
          />
        </view>
      </view>
      <view class="flex1 overflow-hidden">
        <scroll-view
          :scroll-into-view="scrollIntoView"
          :scroll-top="scrollTop"
          class="scroll-box"
          scroll-anchoring
          scroll-with-animation
          scroll-y
          style="height: 100%"
          @scroll="scrollHandler"
        >
          <!--	兼容上滑效果：start	  -->
          <view class="bg-white">
            <!--            <u-tabs-->
            <!--              :activeStyle="activeStyle"-->
            <!--              :current="current"-->
            <!--              :list="tabList"-->
            <!--              lineColor="#FF5319"-->
            <!--              @click="tabClick"-->
            <!--            />-->
            <EraTabs
              :current="current"
              :list="tabList"
              activeStyle="font-size: 32rpx;font-weight: 500;color: #FF5319"
              class="tabs"
              inactiveStyle="font-size: 32rpx;color: rgba(0, 0, 0, 0.25);"
              itemStyle="flex:1;padding:20rpx;"
              lineColor="#FF5319"
              @change="tabClick"
            />
          </view>
          <!--	兼容上滑效果：start	  -->
          <!-- 基础信息：start -->
          <view id="base">
            <view class="title p-t-20">
              <view
                class="title-content flex border-box w-full bg-white flex-justify-between flex-vertical-c"
              >
                <view class="fz-32 fz-b">基础信息</view>
                <view class="flex flex-justify-between flex-vertical-c" @click="goToview">
                  <VoIcon :size="20" color="#0D66FF" name="edit" />
                  <view class="fz-28 ml-8 template-text">使用模板快速发布</view>
                </view>
              </view>
            </view>
            <view class="bg-white cell-list">
              <u-cell-group :border="false">
                <u-cell>
                  <view
                    slot="title"
                    class="flex flex-justify-between flex-vertical-c"
                    @click="clickHandler(1)"
                  >
                    <view class="u-slot-title">
                      <text class="c-required">*</text>
                      <text class="u-cell-text">商品分类</text>
                    </view>
                    <view>
                      <view
                        v-if="!productForm.categoryId"
                        class="cell-placeholder flex flex-vertical-c"
                      >
                        <view>请选择</view>
                        <VoIcon :opacity="0.3" :size="24" color="#000000" name="right-arrow" />
                      </view>
                      <view v-else class="flex flex-vertical-c">
                        <view class="cell-value"> {{ productForm.categoryName }}</view>
                        <VoIcon :opacity="0.3" :size="24" color="#000000" name="right-arrow" />
                      </view>
                    </view>
                  </view>
                </u-cell>
                <u-cell>
                  <view
                    slot="title"
                    class="flex flex-justify-between flex-vertical-c"
                    @click="clickHandler(2)"
                  >
                    <view class="u-slot-title">
                      <text class="c-required">*</text>
                      <text class="u-cell-text">商品品牌</text>
                    </view>
                    <view>
                      <view
                        v-if="!productForm.brandId"
                        class="cell-placeholder flex flex-vertical-c"
                      >
                        <view>请选择</view>
                        <VoIcon :opacity="0.3" :size="24" color="#000000" name="right-arrow" />
                      </view>
                      <view v-else class="flex flex-vertical-c">
                        <view class="cell-value">{{ productForm.brandName }}</view>
                        <VoIcon :opacity="0.3" :size="24" color="#000000" name="right-arrow" />
                      </view>
                    </view>
                  </view>
                </u-cell>
                <u-cell>
                  <view
                    slot="title"
                    class="flex flex-justify-between flex-vertical-c"
                    @click="clickHandler(3)"
                  >
                    <view class="u-slot-title">
                      <text class="c-required">*</text>
                      <text class="u-cell-text">商品型号</text>
                    </view>
                    <view>
                      <view
                        v-if="!productForm.skuProperty.length"
                        class="cell-placeholder flex flex-vertical-c"
                      >
                        <view class="cell-content">请选择</view>
                        <VoIcon :opacity="0.3" :size="24" color="#000000" name="right-arrow" />
                      </view>
                      <view v-else class="flex flex-vertical-c">
                        <view class="cell-value">{{ productForm.skuPropertyName }}</view>
                        <VoIcon :opacity="0.3" :size="24" color="#000000" name="right-arrow" />
                      </view>
                    </view>
                  </view>
                </u-cell>
                <u-cell>
                  <view slot="title" class="flex flex-justify-between flex-vertical-c">
                    <view class="u-slot-title flex flex1">
                      <text class="c-required">*</text>
                      <text class="u-cell-text">商品名称</text>
                    </view>
                    <textarea
                      v-model.trim="productForm.name"
                      auto-height
                      border="none"
                      class="cell-textarea-value"
                      disabled
                      maxlength="50"
                      placeholder="请输入"
                      placeholder-class="cell-placeholder"
                    ></textarea>
                  </view>
                </u-cell>

                <u-cell v-if="showGoodsType" @click="clickHandler(4)">
                  <view slot="title" class="flex flex-justify-between flex-vertical-c">
                    <view class="u-slot-title">
                      <text class="c-required">*</text>
                      <text class="u-cell-text">商品类型</text>
                    </view>
                    <view>
                      <view
                        v-if="!productForm.categoryType"
                        class="cell-placeholder flex flex-vertical-c"
                      >
                        <view>请选择</view>
                        <VoIcon :opacity="0.3" :size="24" color="#000000" name="right-arrow" />
                      </view>
                      <view v-else class="flex flex-vertical-c">
                        <view class="cell-value">{{ productForm.categoryType }}</view>
                        <VoIcon :opacity="0.3" :size="24" color="#000000" name="right-arrow" />
                      </view>
                    </view>
                  </view>
                </u-cell>
                <u-cell v-if="userInfo.isSelf">
                  <view slot="title" class="flex flex-justify-between flex-vertical-c">
                    <view class="u-slot-title flex flex1 w-full">
                      <text class="c-required">*</text>
                      <text class="u-cell-text">商品品号</text>
                    </view>
                    <view>
                      <view class="p-r-16">
                        <u-input
                          v-model.trim="productForm.articleNumber"
                          :maxlength="20"
                          border="none"
                          class="cell-input-value p-r-20"
                          input-align="right"
                          placeholder="请输入"
                          placeholder-class="cell-placeholder"
                        />
                      </view>
                    </view>
                  </view>
                </u-cell>
              </u-cell-group>
            </view>
          </view>
          <!-- 基础信息：end -->

          <!--  商品介绍：start  -->
          <view id="productInfo">
            <view class="title p-t-20">
              <view
                class="title-content flex border-box w-full bg-white flex-justify-between flex-vertical-c"
              >
                <view class="fz-32 fz-b">商品介绍</view>
              </view>
            </view>
            <view class="bg-white cell-list">
              <u-cell-group :border="false">
                <u-cell @click="clickHandler(5)">
                  <view slot="title" class="flex flex-justify-between flex-vertical-c">
                    <view class="u-slot-title">
                      <text class="u-cell-text">商品参数</text>
                    </view>
                    <view>
                      <view class="cell-placeholder flex flex-vertical-c">
                        <view v-if="!productForm.paramsProperty.length">请选择</view>
                        <VoIcon :opacity="0.3" :size="24" color="#000000" name="right-arrow" />
                      </view>
                    </view>
                  </view>
                </u-cell>
                <u-cell @click="clickHandler(6)">
                  <view slot="title" class="flex flex-justify-between flex-vertical-c">
                    <view class="u-slot-title">
                      <text class="c-required">*</text>
                      <text class="u-cell-text">适配车型</text>
                    </view>
                    <view>
                      <view class="cell-placeholder flex flex-vertical-c">
                        <view v-if="productForm.vehicles && productForm.vehicles.length <= 0"
                          >请选择
                        </view>
                        <VoIcon :opacity="0.3" :size="24" color="#000000" name="right-arrow" />
                      </view>
                    </view>
                  </view>
                </u-cell>
              </u-cell-group>
            </view>
            <view class="bg-white cell-list m-t-20">
              <u-cell-group :border="false">
                <u-cell>
                  <view slot="title" class="flex flex-justify-between flex-vertical-c">
                    <view class="u-slot-title">
                      <view class="u-cell-text flex flex-vertical-c">
                        <view class="cell-icon">
                          <text class="c-required">*</text>
                          <text class="u-cell-text">商品主图</text>
                        </view>
                      </view>
                    </view>
                    <view>
                      <view class="cell-placeholder p-r-20 flex flex-vertical-c">
                        <view>{{ mainImg.length }}/10</view>
                      </view>
                    </view>
                  </view>
                  <view slot="label">
                    <view class="label-text"> 建议800*800px，JPG/JPEG/mp4格式，第1张是首图。</view>
                    <view class="cell-upload">
                      <VoFormUpload
                        :limit="10"
                        :source.sync="mainImg"
                        :video-limit="10"
                        btnText="上传图片"
                        replace
                        @action="isShow"
                        @change="mainImgHandler"
                      />
                    </view>
                  </view>
                </u-cell>
                <u-cell>
                  <view slot="title" class="flex flex-justify-between flex-vertical-c">
                    <view class="u-slot-title">
                      <view class="u-cell-text flex flex-vertical-c">
                        <view class="cell-icon">详情图</view>
                      </view>
                    </view>
                    <view>
                      <view v-if="true" class="cell-placeholder p-r-20 flex flex-vertical-c">
                        <view>{{ productDetail.length }}/10</view>
                      </view>
                    </view>
                  </view>
                  <view slot="label">
                    <view class="label-text"> 建议宽度790px，JPG/JPEG/mp4格式</view>
                    <view class="cell-upload">
                      <VoFormUpload
                        :limit="10"
                        :source.sync="productDetail"
                        :video-limit="10"
                        btnText="上传图片"
                        replace
                        @action="isShow"
                        @change="productDetailImgHandler"
                      />
                    </view>
                  </view>
                </u-cell>
                <u-cell>
                  <view slot="title" class="flex flex-justify-between flex-vertical-c">
                    <view class="u-slot-title">
                      <view class="u-cell-text flex flex-vertical-c">
                        <view class="cell-icon">安装指导</view>
                      </view>
                    </view>
                    <view>
                      <view class="cell-placeholder p-r-20 flex flex-vertical-c">
                        <view>{{ installationInstructionsImg.length }}/6</view>
                      </view>
                    </view>
                  </view>
                  <view slot="label">
                    <view class="label-text"> 建议宽度790px，png.jpg.mp4格式</view>
                    <view class="cell-upload">
                      <VoFormUpload
                        :limit="6"
                        :source.sync="installationInstructionsImg"
                        :video-limit="1"
                        btnText="上传图片"
                        @action="isShow"
                        @change="installHandler"
                      />
                    </view>
                  </view>
                </u-cell>
              </u-cell-group>
            </view>
          </view>
          <!--  商品介绍：end  -->

          <!--  销售信息：start  -->
          <view id="saleInfo" class="m-t-20 bg-white">
            <view class="title bg-white">
              <view
                class="title-content flex border-box w-full bg-white flex-justify-between flex-vertical-c"
              >
                <view class="fz-32 fz-b">零售-修理厂</view>
              </view>
            </view>
            <view class="px-32">
              <view class="h2 line-bg" />
            </view>
            <view class="bg-white cell-list">
              <u-cell-group :border="false">
                <u-cell>
                  <view slot="title" class="flex flex-justify-between flex-vertical-c">
                    <view class="u-slot-title">
                      <view class="u-cell-text flex flex-vertical-c">
                        <view class="cell-icon">
                          <text class="c-required">*</text>
                          修理厂支付形式
                        </view>
                      </view>
                    </view>
                    <view>
                      <view class="cell-placeholder flex flex-vertical-c">
                        <EraCheckboxGroup v-model="payType" color="#FF5319">
                          <EraCheckbox :name="1" activeColor="#FF5319" disabled label="现金" />
                          <VoTooltip
                            :arrowStyleSelf="{ left: '128rpx' }"
                            class="fz-0 m-l-8"
                            placement="bottom"
                          >
                            <view slot="content" class="tooltip-box">
                              下单立即支付商品金额时，买家需支付的价格
                            </view>
                            <VoIcon
                              :opacity="0.45"
                              :size="18"
                              color="#000000"
                              name="question-line"
                            />
                          </VoTooltip>
                          <EraCheckbox
                            :name="2"
                            activeColor="#FF5319"
                            class="m-l-44"
                            label="账期"
                          />
                        </EraCheckboxGroup>
                      </view>
                    </view>
                  </view>
                </u-cell>
                <u-cell>
                  <view slot="title">
                    <view class="flex flex-justify-between flex-vertical-c">
                      <view class="u-slot-title flex1">
                        <view class="u-cell-text flex flex-vertical-c">
                          <view class="cell-icon">
                            <text class="c-required">*</text>
                            <text class="u-cell-text">修理厂现金价格</text>
                          </view>
                        </view>
                      </view>
                      <view v-if="productForm.templateId" class="flex1">
                        <view class="p-r-16">
                          <u-input
                            v-model="productForm.cashPrice"
                            :formatter="formatterMoney"
                            :placeholder="`介于${productForm.priceFloor}~${productForm.priceCap}`"
                            border="none"
                            class="cell-input-value"
                            input-align="right"
                            maxlength="8"
                            placeholder="请输入"
                            placeholder-class="cell-placeholder"
                            type="digit"
                          >
                            <view slot="suffix"> 元</view>
                          </u-input>
                        </view>
                      </view>
                      <view v-else class="flex1">
                        <view class="p-r-16">
                          <u-input
                            v-model="productForm.cashPrice"
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
                    <view v-if="productForm.templateId && cashProfit" class="cell-profit">
                      预计收益{{ cashProfit }}元
                    </view>
                  </view>
                </u-cell>
                <u-cell v-if="payType.includes(2)">
                  <view slot="title">
                    <view class="flex flex-justify-between flex-vertical-c">
                      <view class="u-slot-title flex1">
                        <view class="u-cell-text flex flex-vertical-c">
                          <view class="cell-icon">
                            <text class="c-required">*</text>
                            <text class="u-cell-text">修理厂账期价格</text>
                          </view>
                        </view>
                      </view>
                      <view class="flex1">
                        <view class="p-r-16">
                          <u-input
                            v-model="productForm.accountPrice"
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
                    <view v-if="productForm.templateId && stageProfit" class="cell-profit">
                      预计收益{{ stageProfit }}元
                    </view>
                  </view>
                </u-cell>
                <u-cell v-if="payType.includes(2)">
                  <view slot="title">
                    <view class="flex flex-justify-between flex-vertical-c">
                      <view class="u-slot-title flex1">
                        <view class="u-cell-text flex flex-vertical-c">
                          <view class="cell-icon">
                            <text class="c-required">*</text>
                            <text class="u-cell-text">修理厂账期天数</text>
                          </view>
                        </view>
                      </view>
                      <view class="flex1">
                        <view class="p-r-16">
                          <u-input
                            v-model="productForm.accountPeriodDays"
                            :formatter="formatterMonth"
                            border="none"
                            class="cell-input-value"
                            input-align="right"
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
                <u-cell @click="clickHandler(7)">
                  <view slot="title" class="flex flex-justify-between flex-vertical-c">
                    <view class="u-slot-title">
                      <text class="c-required">*</text>
                      <text class="u-cell-text">销售区域</text>
                    </view>
                    <view>
                      <view v-if="true" class="cell-placeholder flex flex-vertical-c">
                        <view v-if="!productForm.salesArea.length">请选择</view>
                        <VoIcon :opacity="0.3" :size="24" color="#000000" name="right-arrow" />
                      </view>
                      <view v-else class="cell-value">请选择</view>
                    </view>
                  </view>
                </u-cell>
                <u-cell>
                  <view slot="title">
                    <view class="flex flex-justify-between flex-vertical-c">
                      <view class="u-slot-title w-full">
                        <view class="u-cell-text flex flex-vertical-c">
                          <view class="cell-icon">
                            <text class="c-required">*</text>
                            <text class="u-cell-text">起购数量</text>
                          </view>
                        </view>
                      </view>
                      <view>
                        <view class="p-r-16">
                          <u-input
                            v-model="productForm.minOrderNumber"
                            :formatter="formatterMonth"
                            :maxlength="8"
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
                        <EraRadioGroup v-model="productForm.shippingType" color="#22284B">
                          <EraRadio :disabled="true" :name="2" label="到付" />
                          <EraRadio :name="1" label="包邮" />
                        </EraRadioGroup>
                      </view>
                    </view>
                  </view>
                </u-cell>
              </u-cell-group>
            </view>
          </view>
          <view class="p-t-10">
            <view class="bg-white cell-list">
              <u-cell-group :border="false">
                <u-cell>
                  <view slot="title" class="flex flex-justify-between flex-vertical-c">
                    <view class="u-slot-title">
                      <view class="u-cell-text flex flex-vertical-c">
                        <view>
                          <text class="c-required">*</text>
                          售后服务托管
                        </view>
                      </view>
                    </view>
                    <view>
                      <EraSwitch
                        v-model="productForm.serviceHosting"
                        :active-value="true"
                        :disabled="true"
                        active-color="#00B359"
                        inactiveColor="rgba(0, 0, 0, 0.15)"
                      />
                    </view>
                  </view>
                </u-cell>
                <u-cell>
                  <view slot="title">
                    <view class="flex flex-justify-between flex-vertical-c">
                      <view class="u-slot-title w-full">
                        <view class="u-cell-text flex flex-vertical-c">
                          <view class="cell-icon">
                            <text class="c-required">*</text>
                            <text class="u-cell-text">质保时间</text>
                          </view>
                        </view>
                      </view>
                      <view>
                        <view class="p-r-16">
                          <u-input
                            v-model="productForm.warrantyDays"
                            :formatter="formatterMonth"
                            :maxlength="8"
                            border="none"
                            class="cell-input-value"
                            input-align="right"
                            placeholder="请输入"
                            placeholder-class="cell-placeholder"
                            type="number"
                          >
                            <view slot="suffix"> 月</view>
                          </u-input>
                        </view>
                      </view>
                    </view>
                  </view>
                </u-cell>
              </u-cell-group>
            </view>
          </view>
          <!--  投资信息： start  -->
          <view id="investmentInfo">
            <view class="title p-t-20">
              <view
                class="title-content flex border-box w-full bg-white flex-justify-between flex-vertical-c"
              >
                <view class="fz-32 fz-b">批发-服务商</view>
              </view>
            </view>
            <view class="bg-white cell-list">
              <u-cell-group :border="false">
                <u-cell>
                  <view slot="title" class="flex flex-justify-between flex-vertical-c">
                    <view class="u-slot-title">
                      <view class="u-cell-text flex flex-vertical-c">
                        <view>
                          <text class="c-required">*</text>
                          是否批发
                        </view>
                      </view>
                    </view>
                    <view>
                      <EraSwitch
                        v-model="productForm.projectInvestmentSaveBOFlag"
                        :active-value="true"
                        active-color="#00B359"
                        inactiveColor="rgba(0, 0, 0, 0.15)"
                      />
                    </view>
                  </view>
                </u-cell>
                <u-cell v-if="productForm.projectInvestmentSaveBOFlag" @click="clickHandler(8)">
                  <view slot="title" class="u-slot-title">
                    <text class="c-required">*</text>
                    <text class="u-cell-text">设置批发信息</text>
                  </view>
                  <view slot="value">
                    <view class="cell-placeholder flex flex-vertical-c">
                      <view v-if="!productForm.projectInvestmentSaveBO">请选择</view>
                      <VoIcon :opacity="0.3" :size="24" color="#000000" name="right-arrow" />
                    </view>
                  </view>
                </u-cell>
              </u-cell-group>
            </view>
          </view>
          <!--  投资信息： end  -->

          <!--  仅自营供应商功能 铺货信息： start  临时使用-后期会删除 -->
          <view v-if="userInfo.isSelf" class="p-t-20">
            <view class="bg-white cell-list">
              <u-cell-group :border="false">
                <u-cell>
                  <view slot="title" class="flex flex-justify-between flex-vertical-c">
                    <view class="u-slot-title">
                      <view class="u-cell-text flex flex-vertical-c">
                        <view>
                          <text class="c-required">*</text>
                          是否寄售到服务商
                        </view>
                      </view>
                    </view>
                    <view>
                      <EraSwitch
                        v-model="productForm.isDistribution"
                        :active-value="true"
                        active-color="#00B359"
                        inactiveColor="rgba(0, 0, 0, 0.15)"
                      />
                    </view>
                  </view>
                </u-cell>
                <u-cell v-if="productForm.isDistribution">
                  <view slot="title">
                    <view class="flex flex-justify-between flex-vertical-c">
                      <view class="u-slot-title w-full">
                        <view class="u-cell-text flex flex-vertical-c">
                          <view class="cell-icon">
                            <text class="c-required">*</text>
                            <text class="u-cell-text">设置寄售价格</text>
                          </view>
                        </view>
                      </view>
                      <view>
                        <view class="p-r-16">
                          <u-input
                            v-model="productForm.distributionPrice"
                            :formatter="formatterMoney"
                            :maxlength="8"
                            border="none"
                            class="cell-input-value"
                            input-align="right"
                            placeholder="请输入"
                            placeholder-class="cell-placeholder"
                          >
                            <view slot="suffix"> 元</view>
                          </u-input>
                        </view>
                      </view>
                    </view>
                  </view>
                </u-cell>
              </u-cell-group>
            </view>
          </view>
          <!--  铺货信息： end  -->

          <view class="p-t-10">
            <view class="bg-white cell-list">
              <u-cell-group :border="false">
                <u-cell v-if="false">
                  <view slot="title" class="flex flex-justify-between flex-vertical-c">
                    <view class="u-slot-title">
                      <view class="u-cell-text flex flex-vertical-c">
                        <view> 是否保存为模板</view>
                      </view>
                    </view>
                    <view>
                      <EraSwitch
                        v-model="flag"
                        :active-value="true"
                        active-color="#4E536F"
                        inactiveColor="rgba(0, 0, 0, 0.15)"
                      />
                    </view>
                  </view>
                </u-cell>
              </u-cell-group>
            </view>
          </view>
          <view class="p-t-10 p-b-10">
            <view class="bg-white cell-list">
              <u-cell-group :border="false">
                <u-cell>
                  <view slot="title" class="flex flex-justify-between flex-vertical-c">
                    <view class="u-slot-title">
                      <view class="u-cell-text flex flex-vertical-c">
                        <view>审核通过后立即上架</view>
                      </view>
                    </view>
                    <view>
                      <EraSwitch
                        v-model="productForm.isAvailable"
                        :active-value="true"
                        active-color="#00B359"
                        inactiveColor="rgba(0, 0, 0, 0.15)"
                      />
                    </view>
                  </view>
                </u-cell>
              </u-cell-group>
            </view>
          </view>

          <!--  销售信息：end  -->
        </scroll-view>
      </view>
      <view v-if="!action" class="put-product__bottom border-box box-shadow">
        <EraButton :fontSize="32" text="提交审核" @click="submitHandler" />
        <VoSafetyArea :is-fixed="false" />
      </view>
    </view>

    <!--  认证分类提醒：start	-->
    <u-modal
      :show="showProductFlag"
      close-on-click-overlay
      content="您尚未认证可经营的商品分类，认证后才可以上货。"
      show-cancel-button
      @cancel="showProductFlag = false"
      @confirm="confirmAuthHandler"
    />
    <!--  认证分类提醒：end	-->

    <!--  商品分类选择：start	-->
    <GoodsClassifyPopup
      :category-id="productForm.categoryId"
      :certificationCategorys="certificationCategorys"
      :show.sync="showGoodsClassify"
      @confirm="confirmCategory"
    />
    <!--  商品分类选择：end	-->

    <!--  商品类型选择：start	-->
    <GoodsTypePopup
      :category-id="productForm.categoryId"
      :category-type="productForm.categoryType"
      :goods-type-list="goodsTypeList"
      :show.sync="showGoodsTypePop"
      :value="productForm.categoryType"
      origin="putProduct"
      @confirm="confirmGoodType"
    />
    <!--  商品类型选择：end	-->

    <!--  修改分类后提示清空信息：start	-->
    <view class="warning">
      <u-modal
        :show="showProductType"
        close-on-click-overlay
        content="修改类型后，所填商品信息将会被清空。确认要修改吗？"
        show-cancel-button
        @cancel="closeHandler"
        @confirm="confirmUpdateProductTypeHandler"
      />

      <u-modal
        :show="showCategoryAuth"
        close-on-click-overlay
        confirm-text="去认证"
        content="您尚未认证可经营的商品分类，认证后才可以上货。"
        show-cancel-button
        @cancel="showCategoryAuth = false"
        @confirm="confirmCategoryAuth"
      />
    </view>

    <!--  修改分类后提示清空信息：end	-->
  </view>
</template>

<script>
  import EraRadioGroup from '@/uni_modules/era-ui/components/EraRadioGroup/EraRadioGroup'
  import EraRadio from '@/uni_modules/era-ui/components/EraRadio/EraRadio'
  import EraCheckboxGroup from '@/uni_modules/era-ui/components/EraCheckboxGroup/EraCheckboxGroup'
  import EraCheckbox from '@/uni_modules/era-ui/components/EraCheckbox/EraCheckbox'
  import VoTooltip from '@/components/VoTooltip/VoTooltip'
  import GoodsClassifyPopup from '../components/GoodsClassifyPopup'
  import GoodsTypePopup from '../components/GoodsTypePopup'
  import VoFormUpload from '@/components/VoFormUpload/VoFormUpload'
  import { decimalSubFn, formatterHandle, hideLoading, showLoading } from '@/common/helper'
  import { mapGetters } from 'vuex'

  const putProductForm = {
    isDistribution: true, // 是否铺货
    distributionPrice: '', // 铺货价格
    accountPeriodDays: '', // 账期天数
    accountPrice: '', // 账期价格
    categoryType: '', // 商品类型
    brandId: '', // 品牌id
    brandName: '', // 附加参数-回显使用  品牌名称
    cashPrice: '', // 现金价格
    categoryId: '', // 商品分类-类别id
    categoryName: '', // 附加参数-回显使用 类别名称
    desc: [], // 详情图
    guideVideo: [], // 安装指导
    isAvailable: false, // 是否立即上架  true：是  false：否
    minOrderNumber: '', // 起订量
    name: '', // 名称
    paramsProperty: [], // 参数属性[{"key": "129269127327121408", "value": "10"}, {"key": "129272268596576256", "value": "黑"}]
    pic: [], // 名称
    profitSharing: [], // 分润信息 ，选择模板后有  [     {       "key": "213141213",       "name": "管理员",       "type": 1,       "value": "B12"     }   ]
    role: 1, // 角色  1：供应商  2：服务商
    salesArea: [], // 销售区域  [     100000,     10000,     1000   ]
    serviceConfig: [], // 服务配置   [     {       "key": "全国联保",       "value": "2年"     }   ]
    serviceHosting: true, // 服务托管  true：是  false：否
    shippingType: 1, // 快递类型 1包邮 2到付
    skuProperty: [], // 规格属性（型号）[{"key": "129272498322800640", "value": "天空蓝"}, {"key": "129272643038871552", "value": "128"}, {"key": "129276967697645568", "value": "110"}]
    skuPropertyName: '', // 商品型号-回显使用
    templateId: '', // 模板id
    vehicles: [], // 车型  []  carModels 车型ID  hierarchy 层级
    warrantyDays: '', // 质保时长
    projectInvestmentSaveBOFlag: true,
    projectInvestmentSaveBO: null, // 投资项目配置信息
    productDetail: [], // 商品详情-回显使用
    installationInstructionsImg: [], // 安装指导-回显使用
    mainImg: [], // 商品主图-回显使用
  }

  export default {
    name: 'PutProduct',
    components: {
      EraCheckbox,
      EraCheckboxGroup,
      EraRadio,
      EraRadioGroup,
      VoTooltip,
      GoodsClassifyPopup,
      GoodsTypePopup,
      VoFormUpload,
    },
    data() {
      return {
        certificationCategorys: [],
        isInit: true, //是否清空表单
        showCategoryAuth: false,
        cashProfit: 0, // 使用模板时 现金预计受益
        stageProfit: 0, // 使用模板时 账期预计受益
        // 展示商品类型抽屉
        showGoodsTypePop: false,
        // 展示商品类型条目
        showGoodsType: true,
        // 商品类型列表
        goodsTypeList: [],
        productForm: this.$vocenApi._.cloneDeep(putProductForm),
        // 商品主图
        mainImg: [],
        // 安装指导
        installationInstructionsImg: [],
        // 商品详情
        productDetail: [],
        showProductType: false,
        // 商品分类
        showGoodsClassify: false,
        buttonStyle: {
          width: '120rpx',
        },
        old: {
          scrollTop: 0,
        },
        scrollTop: 0,
        showDirect: false,
        current: 0,
        scrollIntoView: '',
        payType: [1],
        flag: true,
        activeStyle: {
          color: '#FF5319',
          flex: 1,
          fontWeight: 'bold',
        },
        showProductFlag: false,
        tabList: [
          {
            name: '基础消息',
            id: 'base',
          },
          {
            name: '商品介绍',
            id: 'productInfo',
          },
          {
            name: '销售信息',
            id: 'saleInfo',
          },
          {
            name: '批发信息',
            id: 'investmentInfo',
          },
        ],
        templateId: '', // 所有使用的模板id
        loading: false,
        action: false,
        formatterMonth: (value) => formatterHandle(value, 'int', 8),
        formatterMoney: (value) => formatterHandle(value, 'money', 8),
      }
    },
    computed: {
      // 辅助函数
      ...mapGetters({
        userInfo: 'user/userInfoGetter',
      }),
    },
    watch: {
      payType: {
        deep: true,
        handler() {
          this.productForm.accountPeriodDays = ''
          this.productForm.accountPrice = ''
          this.stageProfit = 0
        },
      },
      // 商品详情图
      productDetail: {
        deep: true,
        handler(newVal) {
          const imgs = newVal.map((item) => item.src)
          this.productForm.desc = imgs
          this.productForm.productDetail = newVal
        },
      },
      // 安装指导内容变化监控
      installationInstructionsImg: {
        deep: true,
        handler(newVal) {
          const imgs = newVal.map((item) => item.src)
          this.productForm.guideVideo = imgs
          this.productForm.installationInstructionsImg = newVal
        },
      },
      // 商品主图变化
      mainImg: {
        deep: true,
        handler(newVal) {
          const imgs = newVal.map((item) => item.src)
          this.productForm.pic = imgs
          this.productForm.mainImg = newVal
        },
      },
      'productForm.skuPropertyName'(val) {
        this.productForm.name = this.productForm.brandName + val
        console.log('productForm.name', val, this.productForm.name)
      },
      'productForm.brandName'(val) {
        this.productForm.name = val + this.productForm.skuPropertyName
        console.log('productForm.name22', val, this.productForm.name)
      },
      productForm: {
        deep: true,
        handler(newForm) {
          this.isInit = false
          // 临时存储到全局上-方便其他路基跳入使用
          if (newForm.templateId) {
            // 监控价格-输出预计受益
            const { profitSharing } = newForm
            const type1 = profitSharing.filter((item) => item.type === 1).map((item) => +item.value)
            const type2 = profitSharing
              .filter((item) => item.type === 2)
              .map((item) => +item.value)
              .sort((a, b) => b - a)

            const type1Total = type1.length
              ? type1.reduce(function (prev, curr) {
                  return prev + curr
                })
              : 0
            const type2Total = type2.length ? type2[0] : 0
            const total = type1Total + type2Total
            this.cashProfit = newForm.cashPrice > total ? decimalSubFn(newForm.cashPrice, total) : 0
            this.stageProfit =
              newForm.accountPrice > total ? decimalSubFn(newForm.accountPrice, total) : 0
          }
          uni['$VoPutProductForm'] = newForm
          console.log(newForm, '我是变化后的')
        },
      },
    },
    onLoad(options) {
      console.log(this.userInfo, 'ss')
      if (this.$storage.get('carModelList')) {
        this.$storage.remove('carModelList')
      }
      if (options.hasOwnProperty('tid')) {
        // 如果是使用模板-则先清空已填写的表单，后进行使用模板的参数
        this.initTemplateDetail(options.tid)
      }
      uni.$off('addCarModel')
      uni.$on('addCarModel', (res) => {
        if (res && this.$storage.get('carModelList')) {
          this.productForm.vehicles = this.$storage.get('carModelList').vehicles
        }
      })
    },
    onShow() {
      const flag = uni?.$VoPutProductForm // 判断是否存在已编辑的历史
      console.log(flag)
      if (flag && !this.isInit) {
        if (flag.isChangeModel) {
          this.productForm.vehicles = []
          this.$VoHttp
            .apiBusinessVehicleQueryBindVehicle({ modelId: flag.modelId }, { noLoading: true })
            .then((res) => {
              console.log(res)
              if (res.data && res.data.length) {
                res.data[0].isShow = true
                res.data.forEach((item) => {
                  item.isParent = true
                  this.fomatterCarModelStatus(item.list)
                })
              }
              console.log(res.data)
              let obj = {
                list: res.data,
                vehicles: Array.from(new Set(this.productForm.vehicles)),
              }
              this.$storage.set('carModelList', obj)
            })
          flag.isChangeModel = false
        }
        this.productForm = uni.$VoPutProductForm
        this.mainImg = this.productForm.mainImg
        this.installationInstructionsImg = this.productForm.installationInstructionsImg
        this.productDetail = this.productForm.productDetail
        if (this.productForm.categoryId) {
          this.initCategoryType()
        }
      } else {
        this.productForm = this.$vocenApi._.cloneDeep(putProductForm)
        uni['$VoPutProductForm'] = this.productForm
      }
    },
    methods: {
      // 格式化适配车型数据
      fomatterCarModelStatus(data) {
        data.forEach((item) => {
          if (item.list && item.list.length) {
            this.fomatterCarModelStatus(item.list)
          } else {
            this.productForm.vehicles.push(...item.levelIds)
          }
        })
      },
      /**
       * 是否需要展示提交按钮，解决图层问题
       * @param show
       */
      isShow(show) {
        this.action = show
      },
      async initCategoryType() {
        showLoading()
        await this.$VoHttp.GOODS.apiGoodsTypeQueryList({
          categoryId: this.productForm.categoryId,
        })
          .then((ret) => {
            this.goodsTypeList = ret.data
          })
          .catch((err) => {
            this.$u.toast(err.message || '网络错误')
          })
          .finally(() => {
            hideLoading()
          })
      },
      confirmCategoryAuth() {
        this.showCategoryAuth = false
        this.$linkToEasy('/pagesCommon/StoreInfo/CertifiedCategory')
      },
      // 提交表单信息
      async submitHandler() {
        console.log(this.productForm, '提交的表单')
        const flag = this.checkRequireFormValue()
        if (flag) {
          showLoading()
          try {
            this.loading = true
            let param = { ...this.productForm }
            if (!this.productForm.projectInvestmentSaveBOFlag) {
              delete param.projectInvestmentSaveBO
            }
            if (param.name.length > 50) {
              param.name = param.name.slice(0, 50)
            }
            let carModelList = this.$storage.get('carModelList')
            if (carModelList && carModelList.vehicles) {
              this.productForm.vehicles = Array.from(new Set(carModelList.vehicles))
            }
            const { code } = await this.$VoHttp.apiGoodsDistributionSave({
              ...param,
              // vehicles:
              //   this.productForm.vehicles &&
              //   this.productForm.vehicles.map((item) => {
              //     return {
              //       ...item,
              //       carModels: [item.carModels],
              //     }
              //   }),
            })
            this.loading = false
            if (+code === 20001) {
              this.resetPutForm()
              this.$u.toast('提交成功')
              setTimeout(() => {
                uni.redirectTo({
                  url: '/pagesProduct/PutSuccess/PutSuccess',
                })
              }, 1000)
            }
            // 处理提交成功的逻辑
          } catch ({ message }) {
            this.loading = false
            this.$u.toast(message || '服务器错误')
          }
          hideLoading()
        }
      },
      resetPutForm() {
        delete uni['$VoPutProductForm']
        delete uni['$SendInvestmentForm']
        this.$storage.remove('carModelList')
        this.productForm = this.$vocenApi._.cloneDeep(putProductForm)
      },
      // 校验表单信息
      checkRequireFormValue() {
        if (!this.productForm.brandId) {
          this.$u.toast('商品品牌不能为空')
          return false
        }
        if (!this.productForm.categoryId) {
          this.$u.toast('商品分类不能为空')
          return false
        }
        if (!this.productForm.skuProperty.length) {
          this.$u.toast('商品型号不能为空')
          return false
        }
        if (!this.productForm.name) {
          this.$u.toast('商品名称不能为空')
          return false
        }
        if (this.userInfo.isSelf && !this.productForm.articleNumber) {
          this.$u.toast('商品品号不能为空')
          return false
        }

        if (!this.productForm.categoryType && this.showGoodsType) {
          this.$u.toast('商品类型不能为空')
          return false
        }
        if (!this.productForm.pic.length) {
          this.$u.toast('商品主图不能为空')
          return false
        }
        if (!this.productForm.cashPrice) {
          this.$u.toast('修理厂现金价格不能为空')
          return false
        }
        if (!this.$vocenApi.Pattern.isMoney(this.productForm.cashPrice)) {
          this.$u.toast('现金金额格式不正确，只能输入两位小数的正数')
          return false
        }
        if (Number(this.productForm.cashPrice) > 10000000) {
          this.$u.toast('现金金额格式不正确，金额最大值不能超过1千万')
          return false
        }
        // 判断使用模板的时候，价格区间以服务端返回为准
        if (this.productForm.templateId) {
          if (
            Number(this.productForm.cashPrice) > this.productForm.priceCap ||
            Number(this.productForm.cashPrice) < this.productForm.priceFloor
          ) {
            this.$u.toast(
              `现金价格介于${this.productForm.priceFloor}~${this.productForm.priceCap}之间`,
            )
            return false
          }
        }
        if (this.payType.includes(2)) {
          if (!this.productForm.accountPrice) {
            this.$u.toast('修理厂账期价格不能为空')
            return false
          }
          if (!this.productForm.accountPeriodDays) {
            this.$u.toast('账期天数不能为空')
            return false
          }
          if (!this.$vocenApi.Pattern.isIntNumber(this.productForm.accountPeriodDays)) {
            this.$u.toast('账期天数不能录入小数')
            return false
          }
          if (Number(this.productForm.accountPrice) > 10000000) {
            this.$u.toast('账期金额格式不正确，金额最大值不能超过1千万')
            return false
          }
          if (!this.$vocenApi.Pattern.isMoney(this.productForm.accountPrice)) {
            this.$u.toast('账期金额格式不正确，只能输入两位小数的正数')
            return false
          }
        }
        if (!this.productForm.salesArea.length) {
          this.$u.toast('销售区域不能为空')
          return false
        }

        if (!this.productForm.minOrderNumber) {
          this.$u.toast('起购数量不能为空')
          return false
        }

        if (!this.$vocenApi.Pattern.isIntNumber(this.productForm.minOrderNumber)) {
          this.$u.toast('起购数量不能录入小数')
          return false
        }

        if (!this.productForm.warrantyDays) {
          this.$u.toast('质保时间不能为空')
          return false
        }

        if (!this.$vocenApi.Pattern.isIntNumber(this.productForm.warrantyDays)) {
          this.$u.toast('质保时间不能录入小数')
          return false
        }

        if (
          this.productForm.projectInvestmentSaveBOFlag &&
          !this.productForm.projectInvestmentSaveBO
        ) {
          this.$u.toast('批发信息不能为空')
          return false
        }
        if (
          this.userInfo.isSelf &&
          this.productForm.isDistribution &&
          !this.productForm.distributionPrice
        ) {
          this.$u.toast('寄售价格不能为空且大于0')
          return false
        }
        return true
      },
      // 商品类型确认
      confirmGoodType(res) {
        console.log(res, 'ss')
        this.productForm.categoryType = res
      },
      // 商品型号确认 并 重置已填写数据
      async confirmCategory(res) {
        if (this.productForm.categoryId === res.id) return
        // 判断分类下是否有商品类型
        const ret = await this.$VoHttp.GOODS.apiGoodsTypeQueryList({
          categoryId: res.id,
        })
        this.goodsTypeList = ret.data
        this.showGoodsType = ret.data.length !== 0
        // 重置所有表单信息
        delete uni['$VoPutProductForm']
        this.productForm = this.$vocenApi._.cloneDeep(putProductForm)
        this.productForm.categoryId = res.id
        this.productForm.categoryName = res.name
        this.mainImg = []
        this.installationInstructionsImg = []
        this.productDetail = []
        this.payType = [1]
        this.cashProfit = 0
        this.stageProfit = 0
        this.templateId = ''
      },
      async initTemplateDetail(id) {
        const { code, data } = await this.$VoHttp.GOODS.apiGoodsTemplateDetail({
          id,
        })
        if (+code === 20001) {
          delete uni['$VoPutProductForm']
          this.productForm = this.$vocenApi._.cloneDeep(Object.assign(putProductForm, data))
          this.productForm.templateId = id

          // // 商品型号回显
          // this.productForm.skuPropertyName = this.productForm.skuProperty
          //   .map((item) => item.value)
          //   .join('')
          this.productForm.skuPropertyName = this.productForm.skuProperty[0].value
          this.productForm.modelId = this.productForm.skuProperty[0].key
          this.productForm.skuProperty.map((item) => {
            if (!item.name) {
              item.id = 'model'
            }
          })
          // 拿到模板信息，进行渲染
          this.productDetail = this.productForm.desc.map((item) => {
            return {
              type: this.checkIsMp4(item) ? 2 : 1,
              name: new Date().getTime(),
              src: item,
              poster: this.$transformShotUrl(item),
            }
          })
          this.mainImg = this.productForm.pic.map((item) => {
            return {
              type: this.checkIsMp4(item) ? 2 : 1,
              name: new Date().getTime(),
              src: item,
              poster: this.$transformShotUrl(item),
            }
          })
          const installInfoImg = this.productForm.serviceConfiguration.filter(
            (item) => item.key === '安装指导',
          )
          if (installInfoImg) {
            const srcs = JSON.parse(installInfoImg[0].value)
            this.installationInstructionsImg = srcs.map((item) => {
              return {
                type: this.checkIsMp4(item) ? 2 : 1,
                name: new Date().getTime(),
                src: item,
                poster: this.$transformShotUrl(item),
              }
            })
          }
          this.initCategoryType()
        }
      },
      checkIsMp4(url) {
        return !this.$vocenApi.Pattern.isImgUrl(url)
      },
      // 商品详情图回调确认
      productDetailImgHandler(res) {
        console.log(res, 'woshi')
        this.productDetail = res
      },
      // 安装指导上传回调确认
      installHandler(res) {
        this.installationInstructionsImg = res
      },
      // 上传主图回调确认
      mainImgHandler(res) {
        this.mainImg = res
        console.log(res, 'bins')
      },
      // 确认修改商品类型
      confirmUpdateProductTypeHandler() {
        // 重置表单并打开选择
        this.showProductType = false
        this.showGoodsClassify = true
      },
      // 关闭操作
      closeHandler() {
        this.showProductType = false
      },
      // 跳转模板页面
      goToview() {
        let values = Object.values(this.productForm)
        let defaultValues = Object.values(putProductForm)
        if (JSON.stringify(values) == JSON.stringify(defaultValues)) {
          this.$storage.set('isEdit', false)
        } else {
          this.$storage.set('isEdit', true)
        }
        uni.$u.route({
          url: '/pagesProduct/ChooseTemplate/ChooseTemplate',
        })
      },
      // 跳转价格指导页面
      goToPriceGuide() {
        console.log(this.productForm.name, 'xx')
        uni.$u.route({
          url: '/pagesProduct/PriceGuide/PriceGuide',
          params: {
            name: this.productForm.name,
          },
        })
      },
      backTop() {
        // 解决view层不同步的问题
        this.scrollTop = this.old.scrollTop
        this.$nextTick(function () {
          this.scrollTop = 0
        })
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

        if (detail.scrollTop >= 957) {
          this.current = 2
        }
      },
      // 快捷跳转
      tabClick(name) {
        this.scrollIntoView = ''
        this.scrollIntoView = name.id
      },
      // 确认认证
      confirmAuthHandler() {
        console.log('auto-认证跳转')
      },
      // 条目点击事件
      async clickHandler(type) {
        if (type === 1) {
          if (this.productForm.categoryId) {
            // 商品分类
            this.showProductType = true
            // 判断用户是否已有认证品牌 如果有则可以进行下一步
          } else {
            const { data } = await this.$VoHttp.apiGoodsCategoryApplyCertificationList()
            const { certificationCategorys } = data

            this.certificationCategorys = certificationCategorys || []
            console.log(data)
            if (certificationCategorys.length) {
              this.showGoodsClassify = true
            } else {
              // 无分类，去认证
              this.showCategoryAuth = true
            }
          }
        }

        if (type === 2) {
          // 跳转商品品牌
          uni.$u.route('/pagesProduct/Brand/Brand')
        }

        // 商品型号
        if (type === 3) {
          if (!this.productForm.categoryId) {
            return this.$u.toast('请先选择商品分类')
          }
          // 依赖商品分类
          uni.$u.route({
            url: '/pagesProduct/CommodityModel/CommodityModel',
            params: {
              id: this.productForm.categoryId,
            },
          })
        }

        if (type === 4) {
          if (!this.productForm.categoryId) {
            return this.$u.toast('请先选择商品分类')
          }
          // 商品类型修改 依赖商品类型
          this.showGoodsTypePop = true
        }

        if (type === 5) {
          if (!this.productForm.categoryId) {
            return this.$u.toast('请先选择商品分类')
          }
          // 商品参数的选择
          this.$u.route({
            url: '/pagesProduct/CommodityParameter/CommodityParameter',
            params: {
              id: this.productForm.categoryId,
            },
          })
        }

        if (type === 6) {
          // 跳转选择适配车型模块
          if (
            !this.productForm.categoryId &&
            (!this.productForm.skuProperty || !this.productForm.skuProperty.length)
          ) {
            this.$u.toast('请先选择商品分类、商品型号')
            return
          } else {
            if (!this.productForm.categoryId) {
              this.$u.toast('请先选择商品分类')
              return
            } else if (!this.productForm.skuProperty || !this.productForm.skuProperty.length) {
              this.$u.toast('请先选择商品型号')
              return
            }
          }
          // this.$u.route('/pagesProduct/ApplicationCar/ApplicationCar')
          this.$linkToEasy(
            `/pagesProduct/ApplicableModel/ApplicableModel?id=${this.productForm.modelId}`,
          )
        }
        if (type === 7) {
          this.$storage.set('defaultArea', this.productForm.salesArea)
          console.log(this.productForm.salesArea, 'saleArea')
          this.$linkToEasy('/pagesProduct/SaleArea/SaleArea?title=销售区域')
        }

        // 跳转发布投资信息填写表单页面
        if (type === 8) {
          // if (!this.productForm.name || !this.productForm.categoryType) {
          //   this.$u.toast('请完善商品信息后操作')
          //   return false
          // }
          // mainImg
          console.log(this.productForm)
          let data = {
            name: this.productForm.name || '',
            goodsName: this.productForm.name || '',
            goodsId: this.productForm.brandId || '',
            // cashPrice: this.productForm.cashPrice || '',
            // accountPrice: this.productForm.accountPrice || '',
            // accountPeriodDays: this.productForm.accountPeriodDays || '',
            // startNumber: this.productForm.minOrderNumber || '',
            shippingType: this.productForm.shippingType || '',
            productDetail: this.productDetail || [],
          }
          // uni['$SendInvestmentForm'] = {}
          this.$storage.set('wholesaleData', data)
          this.$u.route({
            url: '/pagesSupplier/InvestmentInfo/InvestmentInfo',
            // params: {
            //   data: JSON.stringify(data),
            // },
          })
        }
      },
    },
  }
</script>
<style lang="scss"></style>
<style lang="scss" scoped>
  .tab-fixed {
    z-index: 99;
    width: 100vw;
    background-color: #fff;
    height: 88rpx;
    left: 0;
    right: 0;
  }

  .tooltip-box {
    width: 120px;
    white-space: normal;
    line-height: 1.5;
  }

  .back-top {
    width: 72rpx;
    height: 72rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 24rpx;
    bottom: 210rpx;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 0 15rpx #eee;
    z-index: 88;
  }

  .scroll-box {
    flex: 1;
  }

  .cell-icon {
    margin-right: 10rpx;
  }

  .put-operate-save {
    z-index: 1;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .cell-list {
    .u-cell-text {
      @include black-size-color(32, 0.85);
    }

    padding-left: 32rpx;

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

  .put-product {
    display: flex;
    flex-direction: column;
    background-color: #f6f7f8;
    overflow: hidden;
    height: 100vh;

    ::v-deep .u-tabs__wrapper__nav__item {
      flex: 1 !important;
      text-align: center;
    }

    &__bottom {
      background: #fff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
    }
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
    padding-right: 30rpx;
  }

  .cell-textarea-value {
    text-align: right;
    padding-right: 16rpx;
    width: 450rpx !important;
  }

  .u-slot-title {
    white-space: nowrap;
  }

  .cell-placeholder {
    font-size: 32rpx;
  }

  .title-content {
    padding: 24rpx 32rpx;

    .template-text {
      color: #0d66ff;
    }
  }

  .put-operate {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .more-icon {
      margin-left: 28rpx;
    }
  }

  .price-guide {
    padding: 10rpx 24rpx;
    box-sizing: border-box;
    border: 2rpx solid $color-primary-yellow;
    background-color: #ffffff;
    border-radius: 32rpx;
    font-size: 24rpx;
    color: $color-primary-yellow;
    line-height: 1.5;
  }

  ::v-deep {
    .u-popup__content {
      border-radius: 0 !important;
    }
  }
</style>
