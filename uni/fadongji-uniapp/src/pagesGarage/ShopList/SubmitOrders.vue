<template>
  <view>
    <view
      :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
      class="submit flex flex-column"
    >
      <VoNav :is-fixed="false" is-have-more title="提交订单" />
      <view v-if="productInfo" class="flex1 overflow-y">
        <view
          v-if="addressInfo"
          class="submit-address flex flex-vertical-c"
          @click="toSelectAddress()"
        >
          <view class="flex1">
            <view class="fz-28 color-block-65 lh42 m-l-56 flex">
              <text class="m-r-8 fz-b fz-28">{{ addressInfo.name }}</text>
              <text>{{ addressInfo.mobile }}</text>
              <view v-if="serviceFlag && installFlag && newFlag" class="address-tips lh42 m-l-8"
                >安装/回收/收货地址
              </view>
              <view v-else-if="installFlag && newFlag" class="address-tips lh42 m-l-8"
                >安装/回收/收货地址
              </view>
              <view v-else-if="installFlag" class="address-tips lh42 m-l-8">安装/收货地址</view>
              <view v-else-if="newFlag" class="address-tips lh42 m-l-8">回收/收货地址</view>
            </view>

            <view class=" fz-28 m-t-8 lh42 flex">
              <VoIcon class="m-r-8 m-b-36" name="address" />
              <view class="flex1 overTwoEllipsis"
                >{{ addressInfo.provinceName }}-{{ addressInfo.cityName }}-{{
                  addressInfo.areaName
                }}-{{ addressInfo.address }}
              </view>
            </view>
          </view>
          <VoIcon :opacity="0.45" class="m-l-32" name="right-arrow" />
        </view>
        <view
          v-else
          class="submit-address flex flex-vertical-c flex-justify-between"
          @click="$linkToEasy('/pagesSupplier/Setting/AddressHome?type=1')"
        >
          <VoIcon class="m-r-8" name="address" />
          <view class="flex flex-vertical-c">
            <view class="fz-30 color-gray">请选择修理厂收货地址</view>
            <VoIcon :opacity="0.45" class="m-l-32" name="right-arrow" />
          </view>
        </view>
        <view class="submit-info">
          <view class="submit-info__title fz-28 fz-b lh42 flex flex-vertical-c"
            >{{ productInfo.shopInfo.shopName }}
          </view>
          <view class="submit-info__list">
            <view class="flex flex-vertical-t">
              <view
                v-if="productInfo.goodsInfo.deliveryAreaName"
                class="fz-b fz-26 m-r-16 color-block"
              >
                {{ productInfo.goodsInfo.deliveryAreaName }}发货
              </view>
              <!--        注释发货时效      -->
              <!--              <view v-if="productInfo.goodsInfo.arrivalTime" class="fz-24 color-block-45"-->
              <!--                >预计-->
              <!--                <text class="color-red">{{ formateTime(productInfo.goodsInfo.arrivalTime) }}</text>-->
              <!--                送达-->
              <!--              </view>-->
            </view>
            <view class="flex m-t-16" @click="goodDetail(productInfo.goodsInfo)">
              <image
                v-if="
                  productInfo.goodsInfo.pic.indexOf('mp4') != -1 ||
                  productInfo.goodsInfo.pic.indexOf('MP4') != -1
                "
                :src="`${productInfo.goodsInfo.pic}&type=3`"
                class="list-img"
              />
              <image v-else :src="productInfo.goodsInfo.pic + '&type=1'" class="list-img" />
              <view class="flex1">
                <view class="fz-b fz-32 lh48 color-block">
                  <text v-show="productInfo.goodsInfo.categoryType" class="good-tips m-r-8"
                    >{{ productInfo.goodsInfo.categoryType }}
                  </text>
                  <text> {{ productInfo.goodsInfo.name || '商品名称' }}</text>
                </view>
                <view class="flex flex-justify-between flex-vertical-c m-t-16">
                  <!--   金额   -->
                  <view class="flex flex-vertical-c">
                    <view class="list-cash m-r-8">现金价</view>
                    <view class="color-red lh42">
                      <VoPointPrice
                        :price="productInfo.goodsInfo.originalPrice"
                        :show-unit="true"
                        display="inline-block"
                      />
                      <!-- <text class="fz-b fz-28">{{ productInfo.goodsInfo.originalPrice }}</text>
                      <text v-if="false" class="fz-24">.00元</text> -->
                    </view>
                  </view>
                  <!--     商品在该地区暂不支持购买     -->
                  <!--     <view class="color-red fz-28 lh42">商品在该地区暂不支持购买</view>     -->
                  <view class="lh40 color-block-45 fz-26">X1</view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <!--增值服务-->
        <view
          v-if="serviceFlag || installFlag || newFlag"
          class="fz-b fz-32 m-t-16 submit-serviceTitle"
          >增值服务
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
                <view class="m-l-4 fz-28 p-r-12"
                  >{{ productInfo.goodsInfo.modelName ? productInfo.goodsInfo.modelName : '' }}安装
                </view>
                <VoIcon :size="16" color="#373A4E" name="question-line" @click="questionClick()" />
              </view>
            </view>
            <view class="color-red fz-24 flex flex-vertical-c">
              <VoPointPrice :price="productInfo.goodsInfo.installationFee || 0.0" />
              <view>元</view>
            </view>
          </view>
          <EraForm
            ref="form1"
            class="submit-installService__form"
            labelPosition="left"
            labelWidth="120"
          >
            <EraFormItem
              color="rgba(0, 0, 0, 0.85)"
              label="上门时间"
              required
              @click="chooseTime('upTimeInstall')"
            >
              <u--input
                v-model="upTimeInstall"
                border="none"
                disabled
                disabledColor="#ffffff"
                fontSize="16px"
                inputAlign="right"
                placeholder="请选择时间"
              />
              <u-icon slot="right" class="flex flex-vertical-c m-l-8" name="arrow-right" />
            </EraFormItem>
          </EraForm>
        </view>
        <!--定制服务-->
        <view v-if="productInfo.goodsInfo.isCoding" class="submit-installService m-t-16">
          <view class="code-choose flex flex-vertical-c flex-justify-between">
            <view class="flex flex-vertical-c">
              <!--   未选中    -->
              <VoIcon v-if="!serviceFlag" name="address_select" @click="customChange(true)" />
              <VoIcon v-else color="#FF5319" name="select-right" @click="customChange(false)" />
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
                ref="form2"
                class="submit-installService__form"
                labelPosition="left"
                labelWidth="600"
              >
                <EraFormItem
                  class="fz-28"
                  color="rgba(0, 0, 0, 0.85)"
                  label="上传发动机相关照片，以下两组二选一即可"
                  required
                />
              </EraForm>
              <block v-if="!uploadImgDevice.length && !uploadImgCar.length">
                <view class="fz-24 color-block-65 lh36 m-b-16">选项一：发动机号照片</view>
                <view>
                  <VoFormUpload :limit="1" :source.sync="uploadImg" btnText="上传图片" />
                </view>
              </block>
              <block v-if="!uploadImg.length">
                <view class="fz-24 m-t-28 color-block-65 m-b-16 lh36"
                  >选项二：发动机铭牌、行驶证照片
                </view>
                <view class="flex">
                  <VoFormUpload
                    :limit="1"
                    :source.sync="uploadImgDevice"
                    btnText="上传图片"
                    iconWidth="250rpx"
                    uploadStyle="display:block"
                  />
                  <VoFormUpload
                    :limit="1"
                    :source.sync="uploadImgCar"
                    btnText="上传图片"
                    class="m-l-48"
                    iconWidth="250rpx"
                    uploadStyle="display:block"
                  />
                  <!--              <VoFormUpload :limit="1" :source.sync="uploadImg" style="display: inline-block" />-->
                </view>
              </block>
            </view>
          </view>
        </view>
        <!--以旧换新服务-->
        <view
          v-if="productInfo.goodsInfo.isNew && productInfo.goodsInfo.tradeInFee > 0"
          class="submit-installService"
        >
          <view class="code-choose flex flex-vertical-c flex-justify-between">
            <view class="flex flex-vertical-c">
              <!--   未选中    -->
              <VoIcon v-if="!newFlag" name="address_select" @click="rebackChange(true)" />
              <VoIcon v-else color="#FF5319" name="select-right" @click="rebackChange(false)" />
              <view class="m-l-4 fz-28">
                {{ productInfo.goodsInfo.modelName ? productInfo.goodsInfo.modelName : '' }}回收
              </view>
            </view>
            <view class="color-red fz-24 flex flex-vertical-c">
              <VoPointPrice :price="-productInfo.goodsInfo.tradeInFee || 0" />
              <view>元</view>
            </view>
          </view>
          <EraForm
            ref="form3"
            class="submit-installService__form"
            labelPosition="left"
            labelWidth="120"
          >
            <EraFormItem color="rgba(0, 0, 0, 0.85)" label="上门时间" required @click="doorTime">
              <u-input
                v-model="upTimeReback"
                border="none"
                disabled
                disabledColor="#ffffff"
                fontSize="16px"
                inputAlign="right"
                placeholder="请选择时间"
              />
              <u-icon slot="right" class="flex flex-vertical-c m-l-8" name="arrow-right" />
            </EraFormItem>
          </EraForm>

          <EraForm
            ref="form4"
            class="submit-installService__form"
            labelPosition="left"
            labelWidth="128"
          >
            <EraFormItem color="rgba(0, 0, 0, 0.85)" label="以旧换新需要上传原发动机型号" labelWidth="260" required>
              <view class="text-align">{{ newServiceuploadImg.length > 0 ? '1/1' : '0/1' }}</view>
            </EraFormItem>
            <view class="fz-24 color-block-65 p-b-16"
              >回收条件：缸体缸盖无破损、曲轴正常转动两周
            </view>
            <EraFormItem>
              <view class="uploadImage">
                <VoFormUpload :limit="1" :source.sync="newServiceuploadImg" btnText="上传图片" />
              </view>
            </EraFormItem>
            <EraFormItem color="rgba(0, 0, 0, 0.85)" label="确认原发动机型号：" labelWidth="180">
              <!-- disabled @blur="inputBlur"-->
              <u-input
                v-model="blockNo"
                border="none"
                disabledColor="#ffffff"
                fontSize="14px"
                inputAlign="right"
                placeholder="例：大众途观：CGM"
              />
            </EraFormItem>
          </EraForm>
        </view>
        <!--备注-->
        <view class="fz-32 m-t-16 p-r-32" style="background: #fff">
          <EraForm
            ref="form5"
            class="submit-installService__form"
            labelPosition="left"
            labelWidth="128"
          >
            <EraFormItem class="m-l-48" color="rgba(0, 0, 0, 0.65)" label="备注">
              <u-input
                v-model="remark"
                border="none"
                color="rgba(0, 0, 0, 0.65)"
                fontSize="14px"
                inputAlign="right"
                placeholder="选填，请先和厂家协商一致"
              />
            </EraFormItem>
          </EraForm>
        </view>
        <view class="submit-money">
          <view class="submit-money__line">
            <view class="flex flex-vertical-c flex-justify-between">
              <view class="lh42 fz-28 color-block">商品总额</view>
              <view class="m-r-32 lh48 fz-32">
                <!-- <text class="fz-b">{{ productInfo.goodsInfo.originalPrice }}</text>
                <text v-if="false" class="fz-26">.00元</text> -->
                <VoPointPrice
                  :price="productInfo.goodsInfo.originalPrice"
                  :show-unit="true"
                  display="inline-block"
                />
              </view>
            </view>
            <view
              v-if="serviceFlag || installFlag || newFlag"
              class="flex flex-vertical-c flex-justify-between"
            >
              <view class="lh42 fz-28 color-block">商品增值服务费</view>
              <view class="flex flex-vertical-c">
                <VoIcon
                  :size="16"
                  color="#373A4E"
                  name="question-line"
                  @click="priceServiceModal = true"
                />
                <view class="m-l-12 m-r-32 lh48 fz-32">
                  <VoPointPrice
                    :price="decimalSubFn(totalPrice, productInfo.goodsInfo.originalPrice)"
                    :show-unit="true"
                    display="inline-block"
                  />
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="submit-bottom flex flex-justify-r p-b-safe-area flex-vertical-c">
        <view class="m-r-24 flex flex-column flex-vertical-t">
          <view class="fz-32 lh48">
            合计：
            <VoPointPrice
              :left-size="16"
              :price="totalPrice"
              :right-size="14"
              :show-unit="true"
              display="inline-block"
            />
          </view>
          <view v-if="serviceFlag || installFlag || newFlag" class="fz-24 lh54 color-block-65">
            含服务费
            <VoPointPrice
              :left-size="12"
              :price="decimalSubFn(totalPrice, productInfo.goodsInfo.originalPrice)"
              :right-size="12"
              :show-unit="true"
              display="inline-block"
            />
            <!-- <text class="fz-b color-red">{{ productInfo.goodsInfo.codingPrice }}</text>
            <text v-if="false" class="fz-36 color-red">.00元</text> -->
          </view>
        </view>
        <view class="submit-bottom__button" @click="goConfirmOrder">提交订单</view>
      </view>
      <VoPayPopup
        :show.sync="showPay"
        :total-price="totalPrice"
        @close="payClose"
        @confirm="payHandler"
      />
    </view>
    <!--安装服务弹框-->
    <u-popup :show="installServiceModal" mode="bottom" round="8">
      <view class="install">
        <view class="text-right m-t-16 p-r-30">
          <VoIcon name="close" @click="installServiceModal = false" />
        </view>
        <view class="m-t-16 flex flex-justify-c lh150 fz-32 fz-b color-block"
          >安装需要具备的条件
        </view>
        <view class="m-l-40 p-r-40 m-t-32 fz-32 color-block">
          <view class="flex flex-justify-between m-t-32">
            <view>1、</view>
            <view class="flex1 m-l-16">上门时需要更换发动机的车辆到厂，全新发动机已到厂。</view>
          </view>
          <view class="flex flex-justify-between m-t-32">
            <view>2、</view>
            <view class="flex1 m-l-16">安装工位举升机待使用状态。</view>
          </view>
          <view class="flex flex-justify-between m-t-32">
            <view>3、</view>
            <view class="flex1 m-l-16"
              >所需安装工具（套筒套装；扭力扳手；风动扳手；动力总成移动小车等）、辅助材料（机油、防冻液；管箍；密封胶等）已准备就绪。
            </view>
          </view>
        </view>
        <block v-if="showInstallBtn">
          <view class="m-t-78 m-b-66">
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
                <text class="color-block" @click="goWebView">《安装服务协议》</text>
              </view>
            </view>
          </view>
          <view class="flex m-t-30 flex-justify-c p-b-16">
            <EraCheckboxGroup v-model="selectNoticeCheck" placement="column">
              <EraCheckbox :name="1" activeColor="#FF5319" iconSize="14" />
            </EraCheckboxGroup>

            <view class="color-block-45 fz-24">以后不再提醒</view>
          </view>
          <EraButton
            :disabled="!installModal"
            fontSize="32rpx"
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
          <view v-show="serviceFlag" class="flex flex-justify-between m-t-24 fz-28 color-block">
            <view>定制服务</view>
            <view class="color-block-45">{{ productInfo.goodsInfo.codingPrice || 0 }}元</view>
          </view>
          <view v-show="installFlag" class="flex flex-justify-between m-t-24 fz-28 color-block">
            <view>安装服务</view>
            <view class="color-block-45">{{ productInfo.goodsInfo.installationFee || 0 }}元</view>
          </view>
          <view v-show="newFlag" class="flex flex-justify-between m-t-24 fz-28 color-block">
            <view>以旧换新服务</view>
            <view class="color-block-45">{{ -productInfo.goodsInfo.tradeInFee || 0 }}元</view>
          </view>
          <view class="flex flex-justify-between m-t-24 fz-28 color-block">
            <view>合计</view>
            <view class="color-red"
              >{{ decimalSubFn(totalPrice, productInfo.goodsInfo.originalPrice) }}元
            </view>
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
    <VoTimePicker
      :default-time.sync="serviceDefaultDate"
      :show="timePickerShow"
      @close="timePickerShow = false"
      @confirm="timePickerConfirm"
    />
    <VoTimePicker
      :default-time.sync="upTimeInstallDefault"
      :show="upTimeInstallShow"
      @close="upTimeInstallShow = false"
      @confirm="timePickerConfirm"
    />
    <!--下单确认弹框-->
    <VoModal
      :closeOnClickOverlay="true"
      :show="confirmModal"
      :showCancelButton="true"
      cancelText="我在想想"
      confirmText="提交订单"
      content="您选购的商品未选择定制服务，请确认是否继续提交订单？"
      @cancel="confirmModal = false"
      @confirm="confirmClick"
    />
  </view>
</template>

<script>
  import {
    appSource,
    goWechat,
    hideLoading,
    showLoading,
    uploadOcr,
    fetchNextTimeDistance,
  } from '@/common/helper'
  import devConf from '@/common/env'
  // #ifdef APP-PLUS
  const vocenPay = uni.requireNativePlugin('vocen-pay')
  // #endif
  export default {
    name: 'SubmitOrders',
    components: {},
    data() {
      return {
        isPayVal:false,// 是否生成了订单
        serviceDefaultDate: '', // 默认初始化时间
        refreshFlag: true,
        showPay: false,
        timePickerShow: false,
        timeKey: '',
        upTimeInstallShow: false, //安装上门时间
        upTimeInstallDefault: '', //安装上门时间
        upTimeInstall: '', //安装上门时间
        upTimeReback: '', //回收上门时间
        remark: '', //备注
        blockNo: '', //发动机识别号
        uploadImg: [],
        uploadImgDevice: [],
        uploadImgCar: [],
        newServiceuploadImg: [],
        fileList1: [],
        productInfo: null,
        serviceFlag: false,
        installFlag: false,
        newFlag: false,
        installServiceModal: false,
        priceServiceModal: false,
        selectNoticeCheck: [],
        installModal: false,
        errorModal: false,
        addedServices: [],

        addressInfo: null,
        submitForm: {
          // activityDetail: {},
          buyerInfo: {
            addressId: '',
            buyerId: '',
            buyerName: '',
          },
          isValet: false,
          source: appSource(),
          goodsInfoList: [],
        },
        goodsGoodsShopInfoVO: null,
        totalPrice: 0,
        payOrderInfo: this.$storage.get('OrderPayInfo'),
        loading: false,
        addPrice: 0, //增值服务费
        nowDate: this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd hh:MM:ss'),
        showInstallBtn: false,
        confirmModal: false,
        childrenIdList: [],
      }
    },
    watch: {
      addedServices: {
        deep: true,
        handler(newVal, oldVal) {
          console.log('addedServices', newVal)
          console.log('addedServices', oldVal)
        },
      },
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
              price: this.productInfo.goodsInfo.codingPrice,
              count: 1,
              picList: picList,
              homeStartTime: this.upTimeInstall ? this.upTimeInstall.split('-')[0] + ':00' : '',
              homeEndTime: this.upTimeInstall ? this.upTimeInstall.split('-')[1] + ':00' : '',
            })
            this.totalPrice = this.decimalAddFn(
              this.totalPrice,
              this.productInfo.goodsInfo.codingPrice,
            )
          }
        } else {
          this.uploadImg = []
          this.uploadImgDevice = []
          this.uploadImgCar = []
          this.addedServices = this.addedServices.filter((item) => item.name != '定制服务')
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
        handler(newVal, oldVal) {
          console.log(oldVal)
          console.log(newVal)
          this.addedServices.forEach((item) => {
            if (item.name === '定制服务') {
              if (newVal && newVal.length) {
                item.picList = newVal.map((item) => item.src)
              } else {
                item.picList = []
              }
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
          if (newVal && newVal[0]) {
            uploadOcr({
              url: newVal[0].src,
              fromData: {},
              isPath: true,
              tip: '',
              apiUrl: '/v1/api/business/vehicle/brand/cylinderOcr',
            }).then(async (res) => {
              let data = JSON.parse(res.data)
              if (data.success) {
                this.blockNo = data.data
                //去除校验
                // const result = await this.$VoHttp.apiGoodsModeQueryByCylinderNo({
                //   cylinderNo: data.data,
                // })
                // if (!result.data.isRecycleEnable) {
                //   this.$u.toast('回收型号不符')
                //   // this.rebackChange(false)
                //   this.blockNo = ''
                // }
              } else {
                this.$u.toast('图片识别失败')
              }
            })
          }
          this.addedServices.forEach((item) => {
            if (item.name === '回收服务' && newVal && newVal.length) {
              item.picList = newVal.map((item) => item.src)
              console.log('11111', item.picList[0])
              //   this.vin(item.picList[0])
            }
          })
        },
      },
    },
    mounted() {
      uni.$on('ChooseAddress', (res) => {
        if (res) {
          this.refreshFlag = false
        }
        this.addressInfo = res
        this.submitForm.buyerInfo.addressId = res.id
      })
      console.log(this.userInfo.companyId)
      this.submitForm.buyerInfo.buyerId = this.userInfo.companyId
      console.log(this.submitForm.buyerInfo)
    },
    // @es-
    // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
    destroyed() {
      // this.$storage.remove('OrderPayInfo')
    },
    onHide() {
      //OrderPayInfo需要在付款结果页失败时用到，这里不可以移除
      // this.$storage.remove('OrderPayInfo')
    },
    onShow() {
      //   const timer = setTimeout(() => {
      //     clearTimeout(timer)

      if (this.refreshFlag) {
        this.initDefaultAddress()
      }
      this.refreshFlag = true
      //   }, 300)
    },
    onLoad() {
      this.productInfo = this.$storage.get('ProductInfo')
      console.log('this.productInfo', this.productInfo)
      this.serviceFlag = this.productInfo.goodsInfo.isCoding
      this.installFlag = this.productInfo.goodsInfo.isInstall
      this.newFlag =
        this.productInfo.goodsInfo.isNew && this.productInfo.goodsInfo.tradeInFee > 0 ? true : false
      if (!this.productInfo) {
        return this.$u.toast('暂无商品信息')
      }
      this.totalPrice = this.productInfo.goodsInfo.originalPrice
      if (this.productInfo.goodsInfo.isCoding) {
        // this.addedServices[0].name = '定制服务'
        // this.addedServices[0].price =
        //   this.addedServices[0].price || this.productInfo.goodsInfo.codingPrice
        // this.addedServices[0].count = 1
        // this.addedServices[0].picList = this.addedServices[0].picList || []
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
      if (this.productInfo.goodsInfo.isNew && this.productInfo.goodsInfo.tradeInFee > 0) {
        this.addedServices.push({
          supportType: 33,
          name: '回收服务',
          price: -this.productInfo.goodsInfo.tradeInFee || 0,
          count: 1,
          picList: [],
        })
        this.newFlag = true
        this.totalPrice = this.decimalSubFn(
          this.totalPrice,
          this.productInfo.goodsInfo.tradeInFee || 0,
        )
        // 默认下个时间节点
        const defaultTime = fetchNextTimeDistance(true)
        this.serviceDefaultDate = defaultTime.dateTime
        this.timeKey = 'upTimeReback'
        this.timePickerConfirm(defaultTime)
        console.log(this.upTimeReback, 'ssssssssssss')
      }
      console.log('totalPrice', this.totalPrice, this.addedServices)
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
      async inputBlur() {
        this.loading = true
        const result = await this.$VoHttp.apiGoodsModeQueryByCylinderNo({
          cylinderNo: this.blockNo,
        })
        if (!result.data.isRecycleEnable) {
          this.$u.toast('回收型号不符')
          this.blockNo = ''
          // this.rebackChange(false)
        }
        this.loading = false
      },
      toSelectAddress() {
        this.refreshFlag = true
        this.$linkToEasy('/pagesSupplier/Setting/AddressHome?type=1')
      },
      //   vin(urlStr) {
      //     uploadOcr({
      //       url: urlStr,
      //       isPath: true,
      //       formData: {},
      //       tip: '加载中',
      //       apiUrl: '/v1/api/business/vehicle/brand/ocr',
      //     }).then((res) => {
      //       const data = JSON.parse(res.data)
      //       if (+data.code === 20001) {
      //         if (data.data && data.data.length) {
      //           this.blockNo = res.data
      //         }
      //       } else {
      //         this.$u.toast(data.message || '网络错误')
      //       }
      //     })
      //   },
      //安装服务须知
      questionClick() {
        this.showInstallBtn = false
        this.installServiceModal = true
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
      doorTime() {
        //与所购买的新机型号不同
        // this.errorModal = true
        this.chooseTime('upTimeReback')
      },
      //上门时间段选择
      chooseTime(key) {
        this.timeKey = key
        if (key === 'upTimeInstall') {
          //获取是否提醒
          let info = this.$storage.get('noInstallNotice')
          if (!info) {
            this.showInstallBtn = true
            this.installServiceModal = true
          } else {
            this.upTimeInstallShow = true
          }
        } else {
          this.timePickerShow = true
        }
      },
      //上门时间段选择
      timePickerConfirm(data) {
        console.log(data)
        let homeEndTime = data.date + ' ' + data.time.split('-')[1] + ':00'
        if (homeEndTime <= this.nowDate) {
          this.$u.toast('上门时间不能小于当前时间~~')
          return
        }

        this[this.timeKey] = data.dateTime
        this.timePickerShow = false
        this.upTimeInstallShow = false
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
      goodDetail(item) {
        this.$linkToEasy(
          `/pagesGarage/ShopList/GoodsDetail?id=${item.goodsId}&wid=${item.warehouseId}`,
        )
      },
      //安装须知确认
      confirm() {
        if (this.selectNoticeCheck) {
          this.$storage.set('noInstallNotice', 1)
        }
        this.installServiceModal = false
        this.timePickerShow = true
      },
      async payHandler(info) {
        let that = this
        const req = {
          payChannel: 0,
          payKey: '', // 微信支付需要
          payType: info.payTypeCode, // 支付方式(1：微信，11：支付宝，51：银联)
          remark: '',
          source: appSource(),
          userId: this.userInfo.companyId,
          ...this.payOrderInfo,
        }
        if (info.payTypeCode === 1) {
          req.access_token = this.userInfo.access_token
          console.log(JSON.stringify(req), '55555')
          goWechat(`/pages/pay/pay?req=${JSON.stringify(req)}`)
          this.showPay = false
          plus.globalEvent.addEventListener('newintent', (e) => {
            var args = plus.runtime.arguments
            console.log(`args`, args)
            if (args) {
              that.$VoHttp
                .payPayResult({ orderId: that.payOrderInfo.orderId })
                .then((res) => {
                  console.log('支付结果', res)
                  plus.globalEvent.removeEventListener('newintent')
                  console.log('支付结果', res)
                  this.childrenIdList = that.payOrderInfo.childrenIdList
                  uni.redirectTo({
                    url:
                      '/pagesCommon/PayResult/PayResult?type=garage&status=' +
                      res.data.status +
                        '&orderId='+that.payOrderInfo.orderId+
                      '&price=' +
                      this.totalPrice +
                      '&childrenIdList=' +
                      JSON.stringify(this.childrenIdList),
                  })
                })
                .catch((e) => {
                  console.log(e, 'eeeeeeeeeeeeee')
                })
            }
          })
          return
        }
        showLoading('加载中')
        const { payInfo } = await this.$VoHttp
          .appPay({
            req,
          })
          .then((res) => res.data)
          .catch((e) => {
            uni.$u.toast(e.message || '支付参数错误')
          })
        hideLoading()
        this.showPay = false
        vocenPay.voPayModuleView(
          {
            url: payInfo,
            // url: 'https://qr.alipay.com/bax08931vw9wth5je97x5559',
          },
          (res) => {
            if (res.data.businessCode == 'F00001') {
              //拉取支付宝失败
              uni.$u.toast(res.des || '拉起支付宝失败')
            }
          },
        )
        vocenPay.voPayModuleListeningCallback((res) => {
          if (res.data.businessCode == 'S10001') {
            that.$VoHttp
              .payPayResult({ orderId: that.payOrderInfo.orderId })
              .then((res) => {
                vocenPay.voPayRemoveListening()
                this.childrenIdList = that.payOrderInfo.childrenIdList
                uni.redirectTo({
                  url:
                    '/pagesCommon/PayResult/PayResult?type=garage&status=' +
                    res.data.status +
                    '&price=' +
                    this.totalPrice +
                    '&childrenIdList=' +
                    JSON.stringify(this.childrenIdList),
                })
              })
              .catch((e) => {
                console.log(e, 'eeeeeeeeeeeeee')
              })
          }
        })
      },
      // 放弃付款
      payClose() {
        uni.redirectTo({
          url: '/pagesGarage/InstallOrder/InstallOrderList?tabIndex=1',
        })
      },
      goConfirmOrder() {
        if (this.productInfo.goodsInfo.originCoding && !this.serviceFlag) {
          this.confirmModal = true
        } else {
          this.submitOrderHandler()
        }
      },
      //确认下单弹框
      confirmClick() {
        this.confirmModal = false
        this.submitOrderHandler()
      },
      // 提交订单操作
      async submitOrderHandler() {
        if(this.isPayVal){
          this.showPay=true
          return
        }

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
        console.log('222222', this.newServiceuploadImg.length)
        if (
          this.newFlag &&
          this.productInfo.goodsInfo.isNew &&
          this.productInfo.goodsInfo.tradeInFee > 0 &&
          !this.upTimeReback
        ) {
          this.$u.toast('上门时间不能为空')
          return
        }
        if (
          this.newFlag &&
          this.productInfo.goodsInfo.tradeInFee > 0 &&
          !this.newServiceuploadImg.length
        ) {
          return this.$u.toast('请完善回收服务信息')
        }
        if (
          this.serviceFlag ||
          (this.newFlag && this.productInfo.goodsInfo.tradeInFee > 0) ||
          this.installFlag
        ) {
          this.productInfo.goodsInfo.addedServices = this.addedServices
        } else {
          this.productInfo.goodsInfo.addedServices = []
        }
        if (this.totalPrice < 0) {
          return this.$u.toast('回收价格配置有误！')
        }
        this.productInfo.goodsInfo.remark = this.remark
        this.submitForm.goodsInfoList = [this.productInfo.goodsInfo]
        console.log('this.submitForm', this.submitForm)
        try {
          if (this.loading) return
          this.loading = true
          const { data, code } = await this.$VoHttp.apiOrderPlaceGarage({ req: this.submitForm })

          this.isPayVal=true

          this.loading = false
          if (+code === 20001) {
            // 支付成功
            this.payOrderInfo = {
              orderId: data.id,
              ...data,
            }
            this.$storage.set('OrderPayInfo', this.payOrderInfo)
            // 正常逻辑是掉起支付方式，
            // 然后选择支付方式后，进行下单支付走原生拉起支付
            this.showPay = true
          }
        } catch (e) {
          this.loading = false
          console.warn(e, 'SubmitOrders')
          this.$u.toast(e?.message || e?.data?.message || e?.error || '服务端错误')
          if (e.code === 'O0010') {
            setTimeout(() => {
              uni.redirectTo({
                url: `/pagesGarage/ShopList/GoodsDetail?id=${this.productInfo.goodsInfo.goodsId}&wid=${this.productInfo.goodsInfo.warehouseId}`,
              })
            }, 1500)
          }
        }
      },
      // 初始化默认地址获取
      async initDefaultAddress() {
        try {
          if (this.addressInfo && Object.keys(this.addressInfo).length) {
            console.log(this.addressInfo)
            const res = await this.$VoHttp.apiReceiverAddressList()
            const addressList = res.data
            const isSome = addressList.some((item) => {
              return item.id == this.addressInfo.id
            })
            if (isSome) {
              return
            }
          }
          const { data } = await this.$VoHttp.USER.apiReceiverAddressDefault()
          this.addressInfo = data

          if (this.addressInfo) {
            this.submitForm.buyerInfo.addressId = data.id
            this.submitForm.buyerInfo.buyerId = this.userInfo.companyId
          }
        } catch (e) {
          console.warn(e, 'TargetFile=>>SubmitOrders')
          this.$u.toast(e?.message || e?.data?.message || e?.error || '服务端错误')
        }
      },
      uploadSuccess() {
        this.videoSrc = ''
      },
      //定制服务选择
      customChange(val) {
        this.serviceFlag = val
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
        console.log(this.newFlag)
        console.log(val)
        if (this.newFlag == val) {
          // this.newServiceuploadImg = []
          // this.blockNo = ''
          // this.upTimeReback = ''
          this.addedServices = this.addedServices.filter((item) => item.name != '回收服务')
          return
        }
        this.newFlag = val
        if (val) {
          this.addedServices.push({
            supportType: 33,
            name: '回收服务',
            price: -this.productInfo.goodsInfo.tradeInFee || 0,
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
          // this.newServiceuploadImg = []
          // this.blockNo = ''
          // this.upTimeReback = ''
          this.addedServices = this.addedServices.filter((item) => item.name != '回收服务')
          //总价加上以旧换新费
          this.totalPrice = this.decimalAddFn(
            this.totalPrice,
            this.productInfo.goodsInfo.tradeInFee,
          )
        }
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

    &-info {
      background: #fff;
      margin-top: 16rpx;
      padding-left: 32rpx;
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

    &-serviceTitle {
      height: 96rpx;
      background-color: #ffffff;
      line-height: 96rpx;
      padding-left: 32rpx;
    }

    &-installService {
      background-color: #ffffff;
      padding-left: 32rpx;
      padding-right: 32rpx;

      &__form {
        font-size: 28rpx;
      }
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

      &__button {
        height: 48rpx;
        line-height: 48rpx;
        text-align: center;
        padding: 20rpx 24rpx;
        font-size: 32rpx;
        color: #fff;
        background: #ff5319;
        border-radius: 48rpx;
      }
    }
  }

  .install {
    background: #fff;
    width: 100%;
    border-radius: 20rpx !important;
    padding-bottom: 62rpx;
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

  .address-tips {
    color: #f20014;
    background-color: #ffe6e8;
    border-radius: 20rpx;
    padding: 0 16rpx;
    font-size: 24rpx;
  }

  .uploadImage {
    width: 100%;
  }

  .text-align {
    flex: 1;
    text-align: right;
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
  .m-tf-16{
    margin-top: -16rpx;
  }
</style>
