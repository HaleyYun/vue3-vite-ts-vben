<template>
  <view>
    <view
      :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
      class="submit flex flex-column"
    >
      <VoNav :is-fixed="false" is-have-more title="提交订单" />
      <view v-if="productInfo" class="flex1 overflow-y">
        <view v-if="addressInfo" class="submit-address flex flex-vertical-c" @click="toasting">
          <!--        <view-->
          <!--          v-if="addressInfo"-->
          <!--          class="submit-address flex flex-vertical-c"-->
          <!--          @click="-->
          <!--            $linkToEasy(-->
          <!--              '/pagesSupplier/Setting/AddressHome?type=1&&companyId=' +-->
          <!--                productInfo.shopInfo.buyerId,-->
          <!--            )-->
          <!--          "-->
          <!--        >-->
          <VoIcon class="m-r-8 m-b-36" name="address" />
          <view class="flex1">
            <view class="fz-28 color-block-65 lh42">
              <text class="m-r-8">{{ addressInfo.name }}</text>
              <text>{{ addressInfo.mobile }}</text>
              <text v-if="productInfo.goodsInfo.isInstall" class="m-l-8 address-tips"
                >安装/收货地址</text
              >
            </view>
            <view class="fz-b fz-28 m-t-8 lh42">
              {{ addressInfo.provinceName }}-{{ addressInfo.cityName }}-{{
                addressInfo.areaName
              }}-{{ addressInfo.address }}
            </view>
          </view>
          <VoIcon :opacity="0.45" class="m-l-32" name="right-arrow" />
        </view>
        <!--        <view-->
        <!--          v-else-->
        <!--          class="submit-address flex flex-vertical-c flex-justify-between"-->
        <!--          @click="-->
        <!--            $linkToEasy(-->
        <!--              '/pagesSupplier/Setting/AddressHome?type=1&&companyId=' +-->
        <!--                productInfo.shopInfo.buyerId,-->
        <!--            )-->
        <!--          "-->
        <!--        >-->
        <view
          v-else
          class="submit-address flex flex-vertical-c flex-justify-between"
          @click="toasting"
        >
          <VoIcon class="m-r-8" name="address" />
          <view class="flex flex-vertical-c">
            <view class="fz-30 color-gray">请选择修理厂收货地址</view>
            <VoIcon :opacity="0.45" class="m-l-32" name="right-arrow" />
          </view>
        </view>
        <view class="submit-info">
          <view class="submit-info__title fz-28 fz-b lh42 flex flex-vertical-c">
            {{ productInfo.shopInfo.shopName }}
          </view>
          <view class="submit-info__list">
            <view class="flex flex-vertical-t">
              <view class="fz-b fz-26 m-r-16 color-block">
                {{ productInfo.goodsInfo.deliveryAreaName || '' }}发货
              </view>
              <view class="fz-24 color-block-45">
                预计
                <text class="color-red">
                  {{ formateTime(productInfo.goodsInfo.arrivalTime) || '' }}
                </text>
                送达
              </view>
            </view>
            <view class="flex m-t-16">
              <image
                v-if="
                  productInfo.goodsInfo.pic.indexOf('mp4') != -1 ||
                  productInfo.goodsInfo.pic.indexOf('MP4') != -1
                "
                :src="productInfo.goodsInfo.pic + '&type=3'"
                class="list-img"
              />
              <image v-else :src="productInfo.goodsInfo.pic" class="list-img" />
              <view class="flex1">
                <view class="fz-b fz-32 lh48 color-block">
                  <text v-show="productInfo.goodsInfo.categoryType" class="good-tips m-r-8">{{
                    productInfo.goodsInfo.categoryType
                  }}</text>
                  <text>{{ productInfo.goodsInfo.name || '商品名称' }}</text>
                </view>
                <view class="flex flex-justify-between flex-vertical-c m-t-16">
                  <!--   金额   -->
                  <view class="flex flex-vertical-c">
                    <view class="list-cash m-r-8">
                      <block v-if="productInfo.goodsInfo.isCash">
                        <text>现金价</text>
                      </block>
                      <block v-else>
                        <text>账期{{ productInfo.goodsInfo.periodDays }}天</text>
                      </block>
                    </view>
                    <view class="color-red lh42">
                      <VoPointPrice :price="productInfo.goodsInfo.originalPrice" show-unit />
                    </view>
                  </view>
                  <!--     商品在该地区暂不支持购买     -->
                  <!--     <view class="color-red fz-28 lh42">商品在该地区暂不支持购买</view>     -->
                  <view class="lh40 color-block-45 fz-26">X1</view>
                </view>
              </view>
            </view>
          </view>
          <!--安装服务-->
          <view v-if="productInfo.goodsInfo.isInstall" class="submit-installService">
            <view class="code-choose flex flex-vertical-c flex-justify-between">
              <view class="flex flex-vertical-c">
                <!--未选中-->
                <VoIcon v-if="!installFlag" name="address_select" @click="installChange(true)" />
                <!--选中-->
                <VoIcon v-else color="#FF5319" name="select-right" @click="installChange(false)" />
                <view class="flex flex-vertical-c">
                  <view class="m-l-4 fz-28 p-r-12">
                    {{
                      productInfo.goodsInfo.modelName
                        ? productInfo.goodsInfo.modelName + '安装'
                        : '安装服务'
                    }}
                  </view>
                  <VoIcon
                    :opacity="0.45"
                    :size="16"
                    color="#000"
                    name="question-line"
                    @click="questionClick()"
                  />
                </view>
              </view>
              <view class="color-red fz-24 flex flex-vertical-c">
                <VoPointPrice :price="productInfo.goodsInfo.installationFee" />
                <view>元</view>
              </view>
            </view>
            <EraForm
              ref="form"
              class="submit-installService__form"
              labelPosition="left"
              labelWidth="110"
            >
              <EraFormItem
                class="m-l-48"
                color="rgba(0, 0, 0, 0.85)"
                label="上门时间"
                required
                @click="chooseTime('upTimeInstall')"
              >
                <u--input
                  v-model="upTimeInstall"
                  border="none"
                  color="rgba(0, 0, 0, 0.65)"
                  disabled
                  disabledColor="#ffffff"
                  fontSize="16px"
                  inputAlign="right"
                  placeholder="请选择时间"
                />
                <u-icon slot="right" class="flex flex-vertical-c" name="arrow-right" />
              </EraFormItem>
            </EraForm>
          </view>
          <!--定制服务-->
          <!--定制服务-->
          <view v-if="productInfo.goodsInfo.isCoding" class="submit-installService">
            <view class="code-choose flex flex-vertical-c flex-justify-between">
              <view class="flex flex-vertical-c">
                <!--   未选中    -->
                <VoIcon
                  v-if="!serviceFlag"
                  name="address_select"
                  @click="serviceFlag = !serviceFlag"
                />
                <VoIcon
                  v-else
                  color="#FF5319"
                  name="select-right"
                  @click="serviceFlag = !serviceFlag"
                />
                <view class="m-l-4 fz-28">定制服务</view>
              </view>
              <view class="color-red fz-24 flex flex-vertical-c">
                <VoPointPrice :price="productInfo.goodsInfo.codingPrice || 0" />
                <view>元</view>
              </view>
            </view>
            <view v-if="productInfo.goodsInfo.isCoding">
              <view v-if="serviceFlag" class="submit-info__upload">
                <EraForm
                  ref="form"
                  class="submit-installService__form"
                  labelPosition="left"
                  labelWidth="600"
                >
                  <EraFormItem
                    class="m-l-24 fz-28"
                    color="rgba(0, 0, 0, 0.85)"
                    label="上传发动机相关照片，以下两组二选一即可"
                    required
                  />
                </EraForm>
                <block v-if="!uploadImgDevice.length && !uploadImgCar.length">
                  <view class="fz-24 color-block-25 lh36 m-b-16">选项一：发动机号照片</view>
                  <view>
                    <VoFormUpload :limit="1" :source.sync="uploadImg" btnText="上传图片" />
                  </view>
                </block>
                <block v-if="!uploadImg.length">
                  <view class="fz-24 m-t-28 color-block-25 m-b-16 lh36"
                    >选项二：发动机铭牌、行驶证照片</view
                  >
                  <view class="flex">
                    <VoFormUpload
                      :limit="2"
                      :source.sync="uploadImgDevice"
                      btnText="上传图片"
                      class="m-r-48"
                      iconWidth="250rpx"
                    />
                    <!-- <VoFormUpload
                      :limit="1"
                      :source.sync="uploadImgCar"
                      btnText="上传图片"
                      class="m-l-48"
                      iconWidth="250rpx"
                      uploadStyle="display:block"
                    /> -->
                  </view>
                </block>
              </view>
            </view>
          </view>
          <!-- <view v-if="!productInfo.goodsInfo.isCoding" class="submit-info__code">
            <view class="code-choose flex flex-vertical-c flex-justify-between">
              <view class="flex flex-vertical-c">
                <VoIcon
                  v-if="!serviceFlag"
                  name="address_select"
                  @click="serviceFlag = !serviceFlag"
                />
                <VoIcon
                  v-else
                  name="select-right"
                  color="#FF5319"
                  @click="serviceFlag = !serviceFlag"
                />
                <view class="m-l-4 fz-28">定制服务</view>
              </view>
              <view class="color-red fz-24 flex flex-vertical-c">
                <VoPointPrice :price="productInfo.goodsInfo.codingPrice" />
                <view>元</view>
              </view>
            </view>
          </view>
          <view v-if="serviceFlag" class="submit-info__upload">
            <view class="upload-name flex flex-justify-between flex-vertical-c">
              <view class="upload-name__left">定制服务需要上传图片</view>
              <view class="upload-name__right">{{ uploadImg.length }}/2</view>
            </view>
            <view class="fz-24 color-block-25 m-t-8 m-b-16 lh36">上传发动机名牌、行驶证照片</view>
            <view>
              <VoFormUpload :limit="2" :source.sync="uploadImg" />
            </view>
          </view> -->
          <!--以旧换新服务-->
          <view v-if="productInfo.goodsInfo.isNew" class="submit-installService">
            <view class="code-choose flex flex-vertical-c flex-justify-between">
              <view class="flex flex-vertical-c">
                <!--   未选中    -->
                <VoIcon v-if="!newFlag" name="address_select" @click="rebackChange(true)" />
                <VoIcon v-else color="#FF5319" name="select-right" @click="rebackChange(false)" />
                <view class="m-l-4 fz-28">回收服务</view>
              </view>
              <view class="color-red fz-24 flex flex-vertical-c">
                <VoPointPrice :price="productInfo.goodsInfo.tradeInFee || 0" />
                <view>元</view>
              </view>
            </view>
            <EraForm
              ref="form"
              class="submit-installService__form"
              labelPosition="left"
              labelWidth="120"
            >
              <EraFormItem
                class="m-l-24"
                color="rgba(0, 0, 0, 0.85)"
                label="上门时间"
                required
                @click="doorTime"
              >
                <u-input
                  v-model="upTimeReback"
                  border="none"
                  disabled
                  disabledColor="#ffffff"
                  fontSize="16px"
                  inputAlign="right"
                  placeholder="请选择时间"
                />
                <u-icon slot="right" class="flex flex-vertical-c" name="arrow-right" />
              </EraFormItem>
            </EraForm>
            <view class="flex flex-vertical-c flex-justify-between p-b-8 fz-24 color-block lh36">
              <view>以旧换新需要上传旧机发动机识别号</view>
              <view>0/1</view>
            </view>
            <view class="fz-24 color-block-25 p-b-16"
              >回收条件：缸体缸盖无破损、曲轴正常转动两周</view
            >
            <view>
              <VoFormUpload :limit="1" :source.sync="newServiceuploadImg" btnText="上传图片" />
            </view>
            <EraForm
              ref="form"
              class="submit-installService__form"
              labelPosition="left"
              labelWidth="128"
            >
              <EraFormItem class="m-l-20" color="rgba(0, 0, 0, 0.85)" label="发动机识别号" required>
                <!-- disabled -->
                <u-input
                  v-model="blockNo"
                  border="none"
                  disabledColor="#ffffff"
                  fontSize="14px"
                  inputAlign="right"
                  placeholder=""
                />
              </EraFormItem>
            </EraForm>
          </view>
        </view>
        <!--备注-->
        <view class="submit-remarks fz-28" @click="goRemarks()">
          <view class="color-block m-r-69">备注</view>
          <view class="flex1 overEllipsis text-right color-block-65">{{ remark }}</view>
          <VoIcon :opacity="0.45" color="#000" name="arrow-right" size="20" />
        </view>
        <view class="submit-money">
          <view class="submit-money__line">
            <view class="flex flex-vertical-c flex-justify-between">
              <view class="lh42 fz-28 color-block">商品总额</view>
              <view class="m-r-64 lh48 fz-32">
                <VoPointPrice :price="productInfo.goodsInfo.originalPrice" show-unit />
              </view>
            </view>
            <view
              v-if="serviceFlag || installFlag"
              class="flex flex-vertical-c flex-justify-between"
            >
              <view class="lh42 fz-28 color-block">商品增值服务费</view>
              <view class="m-r-64 lh48 fz-32 flex flex-vertical-c">
                <VoPointPrice
                  :price="decimalSubFn(totalPrice, productInfo.goodsInfo.originalPrice)"
                  show-unit
                />
                <VoIcon
                  :size="20"
                  class="m-l-8"
                  color="#9A9A9A"
                  name="account-question"
                  @click.native="showAddService = true"
                />
              </view>
            </view>
          </view>
          <view class="submit-money__total">
            合计：

            <VoPointPrice :price="totalPrice" show-unit />
          </view>
        </view>
      </view>
      <view class="submit-bottom flex flex-justify-r">
        <view class="m-r-24 flex flex-column flex-vertical-t">
          <view class="fz-28 lh48">
            合计：
            <VoPointPrice :price="totalPrice" display="inline-block" show-unit />
          </view>
          <view v-if="serviceFlag || installFlag" class="fz-24 lh36 color-block-65">
            含服务费
            <VoPointPrice
              :price="decimalSubFn(totalPrice, productInfo.goodsInfo.originalPrice)"
              class="m-l-2"
              display="inline-block"
              show-unit
            />
          </view>
        </view>
        <view class="submit-bottom__button" @click="submitOrderHandler">推送订单</view>
      </view>
      <VoSafetyArea :isFixed="false" />
    </view>
    <!--安装服务弹框-->
    <u-popup :round="10" :show="installServiceModal" mode="bottom">
      <view class="install-model">
        <view class="text-right m-t-22 p-r-30">
          <VoIcon name="close" @click="installServiceModal = false" />
        </view>
        <view class="m-t-22 flex flex-justify-c fz-32 fz-b">安装需要具备的条件</view>
        <view class="m-l-40 p-r-40 m-t-32 fz-32 color-block">
          <view class="flex flex-justify-between">
            <view>1、</view>
            <view class="flex1">上门时需要更换发动机的车辆到厂，全新发动机已到厂。</view>
          </view>
          <view class="flex flex-justify-between m-t-32">
            <view>2、</view>
            <view class="flex1">安装工位举升机待使用状态。</view>
          </view>
          <view class="flex flex-justify-between m-t-32">
            <view>3、</view>
            <view class="flex1"
              >所需安装工具（套筒套装；扭力扳手；风动扳手；动力总成移动小车等）、辅助材料（机油、防冻液；管箍；密封胶等）已准备就绪。</view
            >
          </view>
        </view>
        <block v-if="showInstallBtn">
          <view class="m-t-78">
            <view class="m-l-32 flex flex-vertical-c">
              <!--未选中-->
              <VoIcon
                v-if="!installModal"
                name="address_select"
                @click="installModal = !installModal"
              />
              <!--选中-->
              <VoIcon
                v-else
                color="#FF5319"
                name="select-right"
                @click="installModal = !installModal"
              />
              <view class="m-l-18 fz-28 color-block-45"
                >我已阅读并同意
                <text class="color37" @click="goWebView">《安装服务协议》</text>
              </view>
            </view>
          </view>
          <view class="flex m-t-30 flex-justify-c p-b-22">
            <EraCheckboxGroup
              v-model="selectNoticeCheck"
              placement="column"
              @change="selectNoticeChange"
            >
              <EraCheckbox :name="1" activeColor="#FF5319" iconSize="14" />
            </EraCheckboxGroup>

            <view class="color-block-45 fz-24">以后不再提醒</view>
          </view>
          <EraButton
            :disabled="!installModal"
            size="btn-modal"
            text="我知道了，开始申请安装支持"
            @click="confirm"
          />
        </block>
      </view>
    </u-popup>
    <!--增值服务费弹框-->
    <u-popup :show="priceServiceModal" mode="bottom">
      <view class="price">
        <view class="flex flex-justify-c m-t-22">
          <view>增值服务费明细</view>
          <view class="price-close">
            <VoIcon name="close" @click="priceServiceModal = false" />
          </view>
        </view>
        <view class="price-line" />
        <view class="m-l-32 p-r-32">
          <view class="flex flex-justify-between m-t-24 fz-28 color-block">
            <view>定制服务</view>
            <view class="color-block-45">100元</view>
          </view>
          <view class="flex flex-justify-between m-t-24 fz-28 color-block">
            <view>安装服务</view>
            <view class="color-block-45">100元</view>
          </view>
          <view class="flex flex-justify-between m-t-24 fz-28 color-block">
            <view>以旧换新服务</view>
            <view class="color-block-45">-1000元</view>
          </view>
          <view class="flex flex-justify-between m-t-24 fz-28 color-block">
            <view>合计</view>
            <view class="color-red">-800元</view>
          </view>
        </view>
        <view class="price-line" />
        <view class="p-b-safe-area p-t-18 m-b-36">
          <EraButton text="知道了" @click="priceServiceModal = false" />
        </view>
      </view>
    </u-popup>
    <!--错误弹框-->
    <VoModal
      :show="errorModal"
      confirmText="我知道了"
      content="您提交的旧机型号为B12，与所购买的新机型号不同，无法进行回收。"
      title="回收型号不符"
      @confirm="errorModal = false"
    />
    <VoModal
      :show="isShowNeedInstall"
      :showCancelButton="true"
      cancelText="我再想想"
      confirmText="提交订单"
      content="您选择的商品未选择定制服务,请确认是否继续提交订单"
      @cancel="isShowNeedInstall = false"
      @confirm="
        isConfirmSubmit = true
        isShowNeedInstall = false
        submitOrderHandler()
      "
    />
    <VoTimePicker
      :default-time.sync="upTimeReback"
      :show="timePickerShow"
      @close="timePickerShow = false"
      @confirm="timePickerConfirm"
    />
    <!--   增值服务弹出层   -->
    <u-popup :show="showAddService" mode="bottom" @close="showAddService = false">
      <AddServicePrice
        :add-services="addServiceData"
        :add-servie-amount="addServieAmount.toString()"
        @close="showAddService = false"
      />
    </u-popup>
  </view>
</template>

<script>
  import VoFormUpload from '@/components/VoFormUpload/VoFormUpload'
  import AddServicePrice from '../../pagesAgent/Order/components/AddServicePrice'
  import devConf from '@/common/env'
  import {
    getImUserId,
  } from '@/common/helper'

  export default {
    name: 'SubmitOrders',
    components: { VoFormUpload, AddServicePrice },
    data() {
      return {
        imType:'',
        showPay: false,
        timePickerShow: false,
        timeKey: '',
        upTimeInstall: '', //安装上门时间
        upTimeReback: '', //回收上门时间
        remark: '', //备注
        blockNo: '', //发动机识别号
        showAddService: false, // 增值服务弹出层
        addServiceData: [], //增值服务信息
        addServieAmount: '',
        uploadImg: [],
        uploadImgDevice: [],
        uploadImgCar: [],
        newServiceuploadImg: [],
        fileList1: [],
        productInfo: null,
        serviceFlag: false,
        installFlag: false,
        newFlag: false,
        errorModal: false,
        addedServices: [],
        installServiceModal: false,
        priceServiceModal: false,
        installModal: false,
        selectNoticeCheck: [],

        addressInfo: null,
        submitForm: {
          // activityDetail: {},
          buyerInfo: {
            addressId: '',
            buyerId: '',
            buyerName: '',
          },
          isValet: false, // 是否代客下单
          source: 1,
          goodsInfoList: [],
        },
        goodsGoodsShopInfoVO: null,
        totalPrice: 0,
        payOrderInfo: this.$storage.get('OrderPayInfo'),
        loading: false,
        canGo: false, // 是否可跳转修理厂地址页面
        showInstallBtn: false,
        queryType: '',
        isShowNeedInstall: false,
        isConfirmSubmit: false, //如果没有选择安装服务 是否需要安装
      }
    },
    watch: {
      serviceFlag(flag) {
        if (flag) {
          let arr = this.addedServices.filter((item) => item.name === '定制服务')
          //避免和onShow事件同时触发
          if (!arr.length) {
            let picList = []
            if (this.uploadImg.length) {
              picList = this.uploadImg
            } else if (this.uploadImgDevice.length && this.uploadImgCar.length) {
              picList = this.uploadImgDevice.concat(this.uploadImgCar)
            }
            this.addedServices.push({
              supportType: 34,
              name: '定制服务',
              price: this.addedServices[0].price || this.productInfo.goodsInfo.codingPrice,
              count: 1,
              picList: picList,
              homeStartTime: this.upTimeInstal ? this.upTimeInstall.split('-')[0] + ':00' : '',
              homeEndTime: this.upTimeInstal ? this.upTimeInstall.split('-')[1] + ':00' : '',
            })
            this.totalPrice = this.decimalAddFn(
              this.productInfo.goodsInfo.originalPrice,
              this.productInfo.goodsInfo.codingPrice,
            )
          }
        } else {
          this.uploadImg = []
          this.uploadImgDevice = []
          this.uploadImgCar = []
          this.upTimeInstall = ''
          this.addedServices = this.addedServices.filter((item) => item.name != '定制服务')
          // this.productInfo.goodsInfo.addedServices = []
          this.totalPrice = this.decimalSubFn(
            this.totalPrice,
            this.productInfo.goodsInfo.codingPrice,
          )
        }
      },
      blockNo(val) {
        this.addedServices.forEach((item) => {
          if (item.name === '回收服务') {
            item.no = val || ''
          }
        })
      },
      uploadImg: {
        deep: true,
        handler(newVal) {
          this.addedServices.forEach((item) => {
            if (item.name === '定制服务' && newVal && newVal.length) {
              item.picList = newVal.map((item) => item.src)
            }
          })
        },
      },
      uploadImgDevice: {
        deep: true,
        handler(newVal) {
          this.addedServices.forEach((item) => {
            if (item.name === '定制服务' && newVal && newVal.length) {
              item.picList[0] = newVal[0].src
            }
          })
        },
      },
      uploadImgCar: {
        deep: true,
        handler(newVal) {
          this.addedServices.forEach((item) => {
            if (item.name === '定制服务' && newVal && newVal.length) {
              item.picList[1] = newVal[0].src
            }
          })
        },
      },
      newServiceuploadImg: {
        deep: true,
        handler(newVal) {
          this.addedServices.forEach((item) => {
            if (item.name === '回收服务' && newVal && newVal.length) {
              item.picList = newVal.map((item) => item.src)
            }
          })
        },
      },
    },
    mounted() {
      // this.$storage.set('OrderPayInfo', {
      //   id: '144546239038488576',
      //   cashAmount: 0.01,
      //   accountAmount: 0,
      //   orderId: '144546239038488576',
      // })
      uni.$on('ChooseAddress', (res) => {
        this.addressInfo = res
        this.submitForm.buyerInfo.addressId = res.id
      })
    },
    // @es-
    // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
    // destroyed() {
    //   this.$storage.remove('OrderPayInfoAgent')
    // },
    // onHide() {
    //   this.$storage.remove('OrderPayInfoAgent')
    // },
    onLoad(options) {
      this.imType=options.imType
      this.$storage.remove('OrderPayInfo')
      uni.$on('remark', (res) => {
        this.remark = res
      })
      this.submitForm.isValet = !!options.isValet
      this.queryType = options.queryType
      this.productInfo = this.$storage.get('OrderPayInfoAgent')
      console.log(this.productInfo, 'this')
      if (!this.productInfo) {
        return this.$u.toast('暂无商品信息')
      }
      this.totalPrice = this.productInfo.goodsInfo.originalPrice
      if (this.productInfo.goodsInfo.isCoding) {
        this.addedServices.push({
          supportType: 34,
          name: '定制服务',
          price: this.productInfo.goodsInfo.codingPrice || 0,
          count: 1,
          picList: [],
        })
        this.serviceFlag = true
        this.totalPrice = this.decimalAddFn(
          this.totalPrice,
          this.productInfo.goodsInfo.codingPrice || 0,
        )
      }
      //安装和回收费用
      if (this.productInfo.goodsInfo.isInstall) {
        this.addedServices.push({
          supportType: 32,
          name: '安装服务',
          price: this.productInfo.goodsInfo.installationFee || 0,
          count: 1,
          picList: [],
        })
        this.installFlag = true
        this.totalPrice = this.decimalAddFn(
          this.totalPrice,
          this.productInfo.goodsInfo.installationFee || 0,
        )
      }
      if (this.productInfo.goodsInfo.isNew) {
        this.addedServices.push({
          supportType: 33,
          name: '回收服务',
          price: this.productInfo.goodsInfo.tradeInFee || 0,
          count: 1,
          picList: [],
        })
        this.newFlag = true
        this.totalPrice = this.decimalAddFn(
          this.totalPrice,
          this.productInfo.goodsInfo.tradeInFee || 0,
        )
      }
      console.log('totalPrice', this.totalPrice, this.addedServices)
      this.submitForm.buyerInfo.buyerId = this.productInfo.shopInfo.buyerId
      this.initDefaultAddress()
      this.setAddServiceData()
    },
    methods: {
      goWebView() {
        // #ifdef H5
        this.$linkToEasy('/pages/CommonWeb/InstallPolicy?show=1')
        // #endif
        // #ifndef H5
        this.$linkToWebView(devConf.shareBaseUrl + '/pages/CommonWeb/InstallPolicy')
        // #endif
      },
      formateTime(day) {
        let val = day * 24
        if (val <= 12) {
          return '12小时内'
        } else if (val <= 24) {
          return '24小时内'
        } else if (val <= 36) {
          return '36小时内'
        } else if (val <= 48) {
          return '48小时内'
        } else {
          return this.$vocenApi.dayjs().add(parseInt(day), 'day').format('MM月DD日')
        }
      },
      //设置增值服务费
      setAddServiceData() {
        this.addServiceData = []

        if (this.productInfo.goodsInfo.isCoding) {
          this.addServiceData.push({
            name: '定制服务',
            price: this.productInfo.goodsInfo.codingPrice,
          })
        }
        if (this.productInfo.goodsInfo.isInstall) {
          this.addServiceData.push({
            name: '安装服务',
            price: this.productInfo.goodsInfo.installationFee,
          })
        }
        this.addServieAmount = this.decimalSubFn(
          this.totalPrice,
          this.productInfo.goodsInfo.originalPrice,
        )
      },
      //安装提醒选择
      selectNoticeChange(val) {
        if (val && val.length) {
          this.$storage.set('isInstallNotice', { isInstallNotice: 0 })
        } else {
          this.$storage.set('isInstallNotice', { isInstallNotice: 1 })
        }
      },
      //安装服务须知
      questionClick() {
        this.showInstallBtn = false
        this.installServiceModal = true
      },
      toasting() {
        if (this.canGo) {
          this.$linkToEasy(
            '/pagesSupplier/Setting/AddressHome?type=1&companyId=' +
              this.productInfo.shopInfo.buyerId,
          )
        } else {
          this.$u.toast('当前修理厂未维护收货地址')
        }
      },
      doorTime() {
        //与所购买的新机型号不同
        // this.errorModal = true
        this.chooseTime('upTimeReback')
      },
      //上门时间段选择
      chooseTime(key) {
        this.timeKey = key
        if (key === 'upTimeInstall') {
          let obj = this.$storage.get('isInstallNotice')
          console.log('isInstallNotice', obj)
          let isInstallNotice = obj && !obj.isInstallNotice ? false : true
          if (isInstallNotice) {
            this.showInstallBtn = true
            this.installServiceModal = true
          } else {
            this.timePickerShow = true
          }
        } else {
          this.timePickerShow = true
        }
      },
      //上门时间段选择
      timePickerConfirm(data) {
        this[this.timeKey] = data.dateTime
        this.timePickerShow = false
        if (this.timeKey === 'upTimeInstall') {
          this.addedServices.forEach((item) => {
            if (item.name === '安装服务') {
              item.homeStartTime = data.date + ' ' + data.time.split('-')[0] + ':00'
              item.homeEndTime = data.date + ' ' + data.time.split('-')[1] + ':00'
            }
          })
        } else {
          this.addedServices.forEach((item) => {
            if (item.name === '回收服务') {
              item.homeStartTime = data.date + ' ' + data.time.split('-')[0] + ':00'
              item.homeEndTime = data.date + ' ' + data.time.split('-')[1] + ':00'
            }
          })
        }
      },
      //安装须知确认
      confirm() {
        this.installServiceModal = false
        this.timePickerShow = true
      },
      async payHandler() {
        const req = {
          accountAmount: '',
          cashAmount: '',
          orderId: '',
          payChannel: 0,
          payKey: '', // 微信支付需要
          payType: 11, // 支付方式(1：微信，11：支付宝，51：银联)
          remark: '',
          source: 1,
          userId: this.userInfo.companyId,
          ...this.payOrderInfo,
        }
        try {
          const { data, code } = await this.$VoHttp.appPay({
            sign: '123123123',
            req,
          })
          if (+code === 20001) {
            const { payInfo } = data
            // window.location.href = payInfo
            console.log('支付短连接', payInfo)
          }
        } catch (e) {
          console.warn(e, 'SubmitOrders')
          this.$u.toast(e?.message || e?.data?.message || e?.error || '服务端错误')
        }
      },
      // 提交订单操作
      async submitOrderHandler() {
        //去掉打码服务提醒
        // if (!this.isConfirmSubmit && !this.serviceFlag) {
        //   this.isShowNeedInstall = true
        //   return
        // }
        // if (!this.productInfo.goodsInfo.isCoding && !this.isConfirmSubmit) {
        //   this.isShowNeedInstall = true
        //   return
        // }
        if (!this.addressInfo) {
          return this.$u.toast('请添加收货地址')
        }
        if (
          this.serviceFlag &&
          !this.uploadImg.length &&
          !this.uploadImgDevice.length &&
          !this.uploadImgCar.length
        ) {
          return this.$u.toast('请完善定制服务信息')
        }
        if (this.installFlag && !this.upTimeInstall) {
          return this.$u.toast('请完善安装服务信息')
        }
        if (this.newFlag && !this.newServiceuploadImg.length && !this.blockNo) {
          return this.$u.toast('请完善回收服务信息')
        }
        if (this.serviceFlag || this.newFlag || this.installFlag) {
          this.productInfo.goodsInfo.addedServices = this.addedServices
        } else {
          this.productInfo.goodsInfo.addedServices = []
        }
        this.productInfo.goodsInfo.remark = this.remark
        this.submitForm.goodsInfoList = [this.productInfo.goodsInfo]
        console.log('this.submitForm', this.submitForm)
        console.log('this.productInfo', this.productInfo)
        try {
          if (this.loading) return
          this.loading = true
          const { code } = await this.$VoHttp.apiOrderPlaceGarage({ req: this.submitForm })
          if (+code === 20001) {
            this.$u.toast('下单成功')


            if(this.imType==1){
              uni.redirectTo({
                url:'/pagesAgent/PutSuccess/PutSuccess?queryType=' + this.queryType
              })
            }else{
              getImUserId({ companyId: this.submitForm.buyerInfo.buyerId })
                  .then((res) => {
                    console.log('res', res)
                    if (res.data) {
                      const info = {
                        targetId: res.data.userId,
                        type: 0,
                        note: res.data.storeName,
                        platformCode: res.data.platformCode, // 1供应商  2服务商
                      }
                      this.$storage.set('temp_im_room_info', info)
                      uni.redirectTo({
                        url:'/pagesSupplier/ImMessage/PersonalChat'
                      })
                    } else {
                      this.$u.toast('用户信息错误')
                    }
                  })
                  .catch((err) => {
                    this.$u.toast('用户信息错误')
                    console.log(err)
                  })
            }




          }
        } catch (e) {
          this.loading = false
          console.warn(e, 'SubmitOrders')
          this.$u.toast(e?.message || e?.data?.message || e?.error || '服务端错误')
        }
      },
      // 初始化默认地址获取
      async initDefaultAddress() {
        try {
          const { data } = await this.$VoHttp.USER.apiReceiverAddressHelpDefault({
            companyId: this.submitForm.buyerInfo.buyerId,
          })
          this.addressInfo = data
          if (this.addressInfo) {
            this.submitForm.buyerInfo.addressId = data.id
          }
          this.getAddressList()
        } catch (e) {
          console.warn(e, 'TargetFile=>>SubmitOrders')
          this.$u.toast(e?.message || e?.data?.message || e?.error || '服务端错误')
        }
      },
      //获取地址列表
      getAddressList() {
        let param = {}
        if (this.productInfo.shopInfo.buyerId) {
          param.companyId = this.productInfo.shopInfo.buyerId
        }
        this.$VoHttp.apiReceiverAddressList(param).then((res) => {
          console.log(res)
          if (res.data.length > 0) {
            this.canGo = true
          }
        })
      },
      uploadSuccess() {
        this.videoSrc = ''
      },
      //安装服务选择
      installChange(val) {
        this.installFlag = val
        if (val) {
          this.addedServices.push({
            supportType: 32,
            name: '安装服务',
            price: this.productInfo.goodsInfo.installationFee || 0,
            count: 1,
            homeStartTime: this.upTimeInstall || '',
          })
          //总价加上安装服务费
          this.totalPrice = this.decimalAddFn(
            this.totalPrice,
            this.productInfo.goodsInfo.installationFee,
          )
        } else {
          this.addedServices = this.addedServices.filter((item) => item.name != '安装服务')
          //总价减去安装服务费
          this.totalPrice = this.decimalSubFn(
            this.totalPrice,
            this.productInfo.goodsInfo.installationFee,
          )
        }
      },
      //回收服务选择
      rebackChange(val) {
        this.newFlag = val
        if (val) {
          this.addedServices.push({
            supportType: 33,
            name: '回收服务',
            price: this.productInfo.goodsInfo.tradeInFee || 0,
            count: 1,
            picList: this.newServiceuploadImg || [],
            homeStartTime: this.upTimeReback || '',
          })
          //总价减去以旧换新费
          this.totalPrice = this.decimalSubFn(
            this.totalPrice,
            this.productInfo.goodsInfo.tradeInFee,
          )
        } else {
          this.newServiceuploadImg = []
          this.upTimeReback = ''
          this.addedServices = this.addedServices.filter((item) => item.name != '回收服务')
          //总价加上以旧换新费
          this.totalPrice = this.decimalAddFn(
            this.totalPrice,
            this.productInfo.goodsInfo.tradeInFee,
          )
        }
      },
      // 去备注页
      goRemarks() {
        this.$linkToEasy('/pagesAgent/SubmitOrder/RemarksPage')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .submit {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;

    &-address {
      background: #fff;
      padding: 24rpx 32rpx 24rpx 24rpx;
      box-sizing: border-box;
      margin-top: 16rpx;
    }
    &-installService {
      background-color: #ffffff;
      // padding-left: 32rpx;
      // padding-right: 32rpx;
      // box-sizing: border-box;
      &__form {
        font-size: 28rpx;
        .form-remarks {
          color: $v-c0-65;
        }
      }
    }

    &-info {
      background: #fff;
      margin-top: 16rpx;
      padding: 0 32rpx;
      box-sizing: border-box;

      &__title {
        padding: 24rpx 0;
        box-sizing: border-box;
        border-bottom: 2rpx solid $v-bg-light;
      }

      &__list {
        padding: 24rpx 32rpx 24rpx 0;
        box-sizing: border-box;

        .list-img {
          width: 160rpx;
          height: 160rpx;
          border-radius: 8rpx;
          margin-right: 16rpx;
        }

        .list-cash {
          font-size: 24rpx;
          color: #ec404d;
          line-height: 28rpx;
          padding: 2rpx 4rpx;
          box-sizing: border-box;
          background: #fdf2f3;
          border: 2rpx solid #ec404d;
          border-radius: 4rpx;
        }
      }

      &__code {
        padding: 16rpx 0 24rpx;

        .code-choose {
          height: 64rpx;
        }
      }

      &__upload {
        padding-bottom: 24rpx;

        .upload-name {
          width: 686rpx;
          height: 42rpx;
          line-height: 42rpx;

          &__left {
            font-size: 28rpx;
            color: $v-c0-85;
          }

          &__right {
            font-size: 28rpx;
            color: $v-c0-85;
          }
        }

        .upload-pictures {
          width: 218rpx;
          height: 218rpx;
        }
      }
    }
    &-remarks {
      margin-top: 16rpx;
      background: #fff;
      padding: 28rpx 32rpx;
      display: flex;
      align-items: center;
    }

    &-money {
      padding-left: 32rpx;
      box-sizing: border-box;
      margin: 16rpx 0 24rpx;
      background: #fff;

      &__line {
        padding: 24rpx 0;
        box-sizing: border-box;
        border-bottom: 2rpx solid $v-bg-light;
      }

      &__total {
        text-align: right;
        padding: 14rpx 34rpx;
        line-height: 48rpx;
        font-size: 28rpx;
        color: $v-c0-85;
      }
    }

    &-bottom {
      padding: 24rpx 32rpx;
      background: #fff;
      border-top: 2rpx solid $v-bg-light;

      &__button {
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        padding: 0 24rpx;
        box-sizing: border-box;
        font-size: 32rpx;
        color: #fff;
        background: #ff5319;
        border-radius: 48rpx;
      }
    }
    .install {
      background: #fff;
      width: 640rpx;
      height: 892rpx;
      border-radius: 20rpx !important;
    }
    .price {
      background: #fff;
      width: 750rpx;
      position: relative;
      &-close {
        position: absolute;
        top: 22rpx;
        right: 30rpx;
      }
      &-line {
        background-color: $v-bg-light;
        height: 2rpx;
        width: 750rpx;
        margin-top: 22rpx;
      }
    }
  }
  .install-model {
    padding-bottom: 32rpx;
    box-sizing: border-box;
  }
  .color37 {
    color: #373a4e;
  }
  .address-tips {
    font-size: 24rpx;
    color: #f20014;
    padding: 0 16rpx;
    background-color: #ffe5e8;
    border-radius: 20rpx;
  }
  .good-tips {
    height: 36rpx;
    line-height: 36rpx;
    font-size: 24rpx;
    color: $color-primary-yellow;
    padding: 0 12rpx;
    background: $v-tags-btn-disabled;
    border-radius: 24rpx;
  }
</style>
