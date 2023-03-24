<template>
  <view>
    <view
      :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
      class="uploaded p-b-safe-area"
    >
      <!--  顶部导航栏模块：start  -->
      <VoNav :is-fixed="false" is-have-more title="提交认证信息" :is-back="false" @backFn="goHomePage" />
      <scroll-view
        :scroll-top="scrollTop"
        :scroll-y="true"
        class="flex1 overflow-y"
        scroll-with-animation
        @scroll="scrollFn"
      >
        <!--  顶部导航栏模块：end  -->
        <!--  步骤条模块：start  -->
        <ArticleSteps :current="current" />
        <!--  步骤条模块：end  -->
        <!--  步骤一模块：start  -->
        <view v-if="current === 0">
          <!--  上传照片模块：start  -->
          <UploadPhotos :upPhoto="upPhotoList" @upload="uploadBusiness" />
          <!--  上传照片模块：end  -->
          <!--  温馨提示模块：start  -->
          <WarmPrompt :src="firstSrc" />
          <!--  温馨提示模块：end  -->
          <!--  企业信息模块：start  -->
          <EraForm
            ref="form1"
            :model="formData"
            :rules="rules1"
            class="uploaded-form"
            labelPosition="left"
            labelWidth="128"
          >
            <EraFormItem
              class="uploaded-form__item"
              color="rgba(0, 0, 0, 0.85)"
              label="营业执照名称"
              prop="license"
              required
            >
              <u--input
                v-model="formData.license"
                border="none"
                disabledColor="#ffffff"
                fontSize="16px"
                inputAlign="right"
                maxlength="40"
                placeholder="请输入营业执照名称"
                placeholderClass="uploaded-form__placeholder"
              />
            </EraFormItem>
            <EraFormItem
              class="uploaded-form__item"
              color="rgba(0, 0, 0, 0.85)"
              label="统一信用代码"
              prop="code"
              required
            >
              <u-input
                v-model="formData.code"
                border="none"
                class="item-input"
                color="rgba(0, 0, 0, 0.85)"
                fontSize="16px"
                inputAlign="right"
                placeholder="请输入统一信用代码"
                placeholderClass="uploaded-form__placeholder"
              />
            </EraFormItem>
            <EraFormItem
              class="uploaded-form__item"
              color="rgba(0, 0, 0, 0.85)"
              label="法人姓名"
              prop="faRenName"
              required
            >
              <u-input
                v-model="formData.faRenName"
                border="none"
                class="item-input"
                color="rgba(0, 0, 0, 0.85)"
                fontSize="16px"
                inputAlign="right"
                maxlength="40"
                placeholder="请输入法人姓名"
                placeholderClass="uploaded-form__placeholder"
              />
            </EraFormItem>
            <EraFormItem
              class="uploaded-form__item"
              color="rgba(0, 0, 0, 0.85)"
              label="店铺简称"
              prop="storeName"
              required
            >
              <u--input
                v-model="formData.storeName"
                border="none"
                color="rgba(0, 0, 0, 0.85)"
                fontSize="16px"
                inputAlign="right"
                maxlength="40"
                placeholder="请输入店铺简称"
                placeholderClass="uploaded-form__placeholder"
              />
            </EraFormItem>
            <EraFormItem
              class="uploaded-form__item"
              color="rgba(0, 0, 0, 0.85)"
              label="营业期限"
              prop="term"
              required
            >
              <view class="flex flex1 flex-end">
                <view
                  :class="{ 'color-gray': !startTime }"
                  class="uploaded-form__word"
                  @click="startShow = true"
                  >{{ startTime ? startTime : nowDate }}
                </view>
                <view class="uploaded-form__word m-l-8 m-r-8">至</view>
                <view
                  :class="{ 'color-gray': !endTime }"
                  class="uploaded-form__word m-r-32"
                  @click="endShow = true"
                  >{{ endTime ? endTime : nowDate }}
                </view>
              </view>
            </EraFormItem>
          </EraForm>
          <!--  企业信息模块：end  -->
          <!--  企业LOGO模块：start  -->
          <view class="uploaded-logo">
            <view class="uploaded-logo__name"><text class="red-required"> *</text>企业LOGO</view>
            <UploadLogo :defaultUrl="formData.storeUrl" @success="successStoreUrlFn" />
          </view>
          <!--  企业LOGO模块：end  -->
        </view>
        <!--  步骤一模块：end  -->
        <!--  步骤二模块：start  -->
        <view v-else-if="current === 1">
          <!--  上传照片模块：start  -->
          <UploadPhotos
            :twoPhotos="true"
            :upPhoto="twoPhotosList"
            @upload="uploadCardIs"
            @uploadSecond="uploadCardNo"
          />
          <!--  上传照片模块：end  -->
          <!--  温馨提示模块：start  -->
          <WarmPrompt :src="secondSrc" />
          <!--  温馨提示模块：end  -->
          <!--  企业信息模块：start  -->
          <EraForm
            ref="form2"
            :model="formData"
            :rules="rules2"
            class="uploaded-form"
            labelPosition="left"
            labelWidth="128"
          >
            <EraFormItem
              class="uploaded-form__item"
              color="rgba(0, 0, 0, 0.85)"
              label="身份证号"
              prop="IDCard"
              required
            >
              <u--input
                v-model="formData.IDCard"
                border="none"
                disabledColor="#ffffff"
                fontSize="16px"
                inputAlign="right"
                placeholder="请输入身份证号"
                placeholderClass="uploaded-form__placeholder"
              />
            </EraFormItem>
            <EraFormItem
              class="uploaded-form__item"
              color="rgba(0, 0, 0, 0.85)"
              label="身份证有效期"
              required
            >
              <view class="flex flex1 flex-end">
                <view
                  :class="{ 'color-gray': !formData.startTime }"
                  class="uploaded-form__word"
                  @click="startFormShow = true"
                  >{{ formData.startTime ? formData.startTime : nowDate }}
                </view>
                <view class="uploaded-form__word m-l-16 m-r-16">至</view>
                <view
                  :class="{ 'color-gray': !formData.endTime }"
                  class="uploaded-form__word"
                  @click="endFormShow = true"
                  >{{ formData.endTime ? formData.endTime : nowDate }}
                </view>
              </view>
            </EraFormItem>
            <EraFormItem
              class="uploaded-form__item"
              color="rgba(0, 0, 0, 0.85)"
              label="姓名"
              prop="name"
              required
            >
              <u-input
                v-model="formData.name"
                border="none"
                class="item-input"
                color="rgba(0, 0, 0, 0.85)"
                fontSize="16px"
                inputAlign="right"
                maxlength="40"
                placeholder="请输入您的姓名"
                placeholderClass="uploaded-form__placeholder"
              />
            </EraFormItem>

            <EraFormItem
              class="uploaded-form__item"
              color="rgba(0, 0, 0, 0.85)"
              label="所在地区"
              prop="areaCode"
              required
              @click="showAddress = true"
            >
              <view v-if="formData.areaStr" class="flex1 uploaded-form__box m-r-8">{{
                formData.areaStr
              }}</view>
              <view v-else class="flex1 uploaded-form__box color-block-25 m-r-16"> 省/市/区 </view>
              <!--          <VoIcon :opacity="0.25" name="right-arrow" />-->
              <VoIcon :size="20" color="#373A4E" name="address" @click.native.stop="openLocation" />
            </EraFormItem>
            <view class="uploaded-form__label"><view class="label-star">*</view>详细地址</view>
            <EraFormItem
              class="uploaded-form__item custom"
              color="rgba(0, 0, 0, 0.85)"
              label=""
              labelWidth="0"
              prop="address"
            >
              <textarea
                v-model.trim="formData.address"
                auto-height
                class="item-textarea"
                maxlength="100"
                placeholder="小区楼栋/乡村名称"
                placeholder-class="item-placeholder"
              ></textarea>
              <!--          <VoIcon :size="20" color="#373A4E" name="address" @click="openLocation" />-->
            </EraFormItem>

            <!--        <EraFormItem-->
            <!--          class="uploaded-form__item"-->
            <!--          color="rgba(0, 0, 0, 0.85)"-->
            <!--          label="所在地址"-->
            <!--          prop="areaCode"-->
            <!--          @click="showAddress = true"-->
            <!--        >-->
            <!--          <u-input-->
            <!--            v-model="formData.areaStr"-->
            <!--            border="none"-->
            <!--            class="item-input"-->
            <!--            color="rgba(0, 0, 0, 0.85)"-->
            <!--            fontSize="16px"-->
            <!--            inputAlign="right"-->
            <!--            placeholder="请选择所在地址"-->
            <!--            placeholderClass="uploaded-form__placeholder"-->
            <!--          />-->
            <!--        </EraFormItem>-->

            <!--        <EraFormItem-->
            <!--          class="uploaded-form__item"-->
            <!--          color="rgba(0, 0, 0, 0.85)"-->
            <!--          label="详细地址"-->
            <!--          prop="address"-->
            <!--        >-->
            <!--          <u-input-->
            <!--            v-model="formData.address"-->
            <!--            border="none"-->
            <!--            class="item-input"-->
            <!--            color="rgba(0, 0, 0, 0.85)"-->
            <!--            fontSize="16px"-->
            <!--            inputAlign="right"-->
            <!--            placeholder="请输入详细地址"-->
            <!--            placeholderClass="uploaded-form__placeholder"-->
            <!--          />-->
            <!--        </EraFormItem>-->
          </EraForm>
          <!--  企业信息模块：end  -->
        </view>
        <!--  步骤二模块：end  -->
        <!--  步骤三模块：start  -->
        <view v-else-if="current === 2">
          <EraForm
            ref="form3"
            :model="formData"
            :rules="rules3"
            class="uploaded-form"
            labelPosition="left"
            labelWidth="128"
          >
            <EraFormItem
              class="uploaded-form__item"
              color="rgba(0, 0, 0, 0.85)"
              label="开户银行名称"
              prop="parenBankName"
              required
            >
              <u--input
                v-model="formData.parenBankName"
                border="none"
                disabledColor="#ffffff"
                fontSize="16px"
                inputAlign="right"
                placeholder="请输入开户银行名称"
                placeholderClass="uploaded-form__placeholder"
                @change="changeParenBankFn"
                @focus="showParenBankSelect = true"
              />
            </EraFormItem>
            <scroll-view
              v-if="parenBankList.length > 0 && showParenBankSelect"
              :scroll-y="true"
              class="bank-list"
            >
              <view
                v-for="(item, index) of parenBankList"
                :key="index"
                class="bank-list__item"
                @click=";(formData.parenBankName = item), (showParenBankSelect = false)"
                >{{ item }}</view
              >
            </scroll-view>
            <EraFormItem
              class="uploaded-form__item"
              color="rgba(0, 0, 0, 0.85)"
              label="支行名称"
              prop="bankName"
              required
            >
              <u--input
                v-model="formData.bankName"
                border="none"
                disabledColor="#ffffff"
                fontSize="16px"
                inputAlign="right"
                placeholder="如：中国银行郑州花园路支行"
                placeholderClass="uploaded-form__placeholder"
                @change="changeBankFn"
                @focus="showBankSelect = true"
              />
            </EraFormItem>

            <scroll-view
              v-if="bankList.length > 0 && showBankSelect"
              :scroll-y="true"
              class="bank-list"
            >
              <view
                v-for="(item, index) of bankList"
                :key="index"
                class="bank-list__item"
                @click="selectBankFn(item)"
                >{{ item.bankName }}</view
              >
            </scroll-view>
            <EraFormItem
              class="uploaded-form__item"
              color="rgba(0, 0, 0, 0.85)"
              label="银行账号"
              prop="accountNo"
              required
            >
              <u-input
                v-model="formData.accountNo"
                border="none"
                class="item-input"
                color="rgba(0, 0, 0, 0.85)"
                fontSize="16px"
                inputAlign="right"
                placeholder="请输入银行账号"
                placeholderClass="uploaded-form__placeholder"
                type="number"
              />
            </EraFormItem>
          </EraForm>
        </view>
      </scroll-view>

      <!--  步骤三模块：end  -->
      <!--  底部固定模块：start  -->
      <view v-if="current === 0" class="uploaded-footer flex p-b-safe-area">
        <u-button
          class="uploaded-footer__btn info-btn"
          plain
          shape="circle"
          size="large"
          text="暂不认证"
          @click="goHomePage"
        />
        <!-- <u-button
          v-if="
            formData.license &&
            startTime &&
            formData.code &&
            formData.faRenName &&
            formData.storeName &&
            formData.storeUrl
          "
          class="uploaded-footer__btn"
          color="#FF5319"
          shape="circle"
          size="large"
          text="下一步"
          @click="nextStep"
        /> -->
        <view
          v-if="
            formData.license &&
            startTime &&
            formData.code &&
            formData.faRenName &&
            formData.storeName &&
            formData.storeUrl
          "
          class="self-button uploaded-footer__btn color"
          style="width: 324rpx"
          @click="nextStep"
          >下一步</view
        >
        <u-button
          v-else
          class="uploaded-footer__btn uploaded-footer__color"
          color="#F6F7F8"
          shape="circle"
          size="large"
          text="下一步"
        />
      </view>
      <view v-else-if="current === 1" class="uploaded-footer flex p-b-safe-area">
        <!-- <u-button
          class="uploaded-footer__button info-btn"
          plain
          shape="circle"
          size="large"
          text="暂不认证"
          @click="goHomePage"
        /> -->
        <view class="self-button uploaded-footer__btn info-btn" @click="goHomePage">暂不认证</view>
        <view class="self-button uploaded-footer__btn info-btn" @click="previousStepTwo"
          >上一步</view
        >
        <!-- <u-button
          class="uploaded-footer__button info-btn"
          shape="circle"
          size="large"
          text="上一步"
          @click="current = 0"
        /> -->
        <u-button
          v-if="
            formData.IDCard &&
            formData.startTime &&
            formData.endTime &&
            formData.name &&
            formData.areaCode &&
            formData.address
          "
          class="uploaded-footer__button"
          color="#FF5319"
          shape="circle"
          size="large"
          text="下一步"
          @click.native="submitInfo"
        />
        <u-button
          v-else
          class="uploaded-footer__button uploaded-footer__color"
          color="#F6F7F8"
          shape="circle"
          size="large"
          text="下一步"
        />
      </view>
      <view v-else-if="current === 2" class="uploaded-footer flex p-b-safe-area">
        <!-- <u-button
          class="uploaded-footer__button info-btn"
          plain
          shape="circle"
          size="large"
          text="暂不认证"
          @click="goHomePage"
        /> -->
        <view class="self-button uploaded-footer__btn info-btn" @click="goHomePage">暂不认证</view>
        <u-button
          class="uploaded-footer__button info-btn"
          shape="circle"
          size="large"
          text="上一步"
          @click="previousStepThree"
        />
        <u-button
          v-if="formData.accountNo && formData.bankName && formData.parenBankName"
          class="uploaded-footer__button"
          color="#FF5319"
          shape="circle"
          size="large"
          text="提交"
          @click="submitAuthFn"
        />
        <u-button
          v-else
          class="uploaded-footer__button uploaded-footer__color"
          color="#F6F7F8"
          shape="circle"
          size="large"
          text="提交"
        />
      </view>
      <!--  底部固定模块：end  -->
    </view>
    <u-datetime-picker
      :maxDate="3740967920000"
      :minDate="332747120000"
      :show="startShow"
      :value="startTime ? startTime : nowDate"
      cancelColor="rgba(0, 0, 0, 0.45)"
      confirmColor="#22284B"
      mode="date"
      title="日期选择器"
      @cancel="cancelStart"
      @confirm="confirmStart"
    />

    <u-datetime-picker-era
      :maxDate="3740967920000"
      :minDate="332747120000"
      :show="endShow"
      :show-diy="true"
      :value="endTime ? endTime : nowDate"
      cancelColor="rgba(0, 0, 0, 0.45)"
      confirmColor="#22284B"
      mode="date"
      title="日期选择器"
      @cancel="cancelEnd"
      @confirm="confirmEnd"
    />

    <u-datetime-picker
      :maxDate="3740967920000"
      :minDate="332747120000"
      :show="startFormShow"
      :value="formData.startTime || nowDate"
      cancelColor="rgba(0, 0, 0, 0.45)"
      confirmColor="#22284B"
      mode="date"
      title="日期选择器"
      @cancel="startFormShow = false"
      @confirm="confirmFormStart"
    />

    <u-datetime-picker-era
      :maxDate="3740967920000"
      :minDate="332747120000"
      :show="endFormShow"
      :show-diy="true"
      :value="formData.endTime || nowDate"
      cancelColor="rgba(0, 0, 0, 0.45)"
      confirmColor="#22284B"
      mode="date"
      title="日期选择器"
      @cancel="endFormShow = false"
      @confirm="confirmFormEnd"
    />
    <VoAddress :show.sync="showAddress" @sureFn="sureFn" />
  </view>
</template>
<script>
  import ArticleSteps from './components/ArticleSteps'
  import UploadPhotos from './components/UploadPhotos'
  import WarmPrompt from './components/WarmPrompt'
  import UploadLogo from './components/UploadLogo'
  import {
    chooseImageOcrByPromise,
    getLocation,
    hideLoading,
    showLoading,
    toRoleHome,
  } from '@/common/helper'
  import EraButton from '@/uni_modules/era-ui/components/EraButton/EraButton'

  export default {
    name: 'DownloadApp',
    components: { EraButton, ArticleSteps, UploadPhotos, WarmPrompt, UploadLogo },
    data() {
      return {
        scrollVal: '',
        scrollTop: '',
        showAddress: false, // 是否显示选择地址
        bankList: [],
        parenBankList: [],
        showParenBankSelect: false,
        showBankSelect: false,
        startFormShow: false,
        endFormShow: false,
        current: 0,
        upPhotoList: {
          defaultFirstSrc: '/static/created/certify/not_uploaded.png',
          firstSrc: '',
          firstContent: '拍照或上传您的营业执照',
        },
        twoPhotosList: {
          defaultFirstSrc: '/static/created/certify/positive.png',
          firstSrc: '',
          firstContent: '拍照上传您的身份证正面',
          defaultSecondSrc: '/static/created/certify/back.png',
          secondSrc: '',
          secondContent: '拍照上传您的身份证反面',
        },
        firstSrc: {
          correctSrc: '/static/created/certify/tips_icons1.png',
          lackSrc: '/static/created/certify/tips_icons2.png',
          fuzzySrc: '/static/created/certify/tips_icons3.png',
          unevenSrc: '/static/created/certify/tips_icons4.png',
        },
        secondSrc: {
          correctSrc: '/static/created/certify/card_icons1.png',
          lackSrc: '/static/created/certify/card_icons2.png',
          fuzzySrc: '/static/created/certify/card_icons3.png',
          unevenSrc: '/static/created/certify/card_icons4.png',
        },
        formData: {
          bankName: '',
          accountNo: '',
          parenBankName: '',
          unionBank: '',
          license: '', // 营业执照名称
          term: '', // 营业执照期限
          code: '', // 统一信用代码
          faRenName: '', // 法人姓名
          storeName: '', // 店铺简称
          storeUrl: '', // 店铺图片地址url
          IDCard: '', // 身份证号
          startTime: '', // 身份证日期开始
          endTime: '', // 身份证日期结束
          name: '', // 姓名
          areaCode: '', //地址code
          areaStr: '',
          address: '', //s详细地址
        },
        rules1: {
          license: {
            type: 'string',
            required: true,
            message: '请输入营业执照名称',
            trigger: ['blur'],
          },
          code: {
            type: 'string',
            required: true,
            message: '请输入统一信用代码',
            trigger: ['blur'],
          },
          faRenName: {
            type: 'string',
            required: true,
            message: '请输入法人姓名',
            trigger: ['blur'],
          },
          storeName: {
            type: 'string',
            required: true,
            message: '请输入店铺简称',
            trigger: ['blur'],
          },
        },
        rules2: {
          IDCard: [
            {
              type: 'string',
              required: true,
              message: '请输入身份证号',
              trigger: ['blur'],
            },
            {
              pattern: this.$vocenApi.Pattern.id_card,
              message: '身份证号号格式不正确',
              trigger: ['blur'],
            },
          ],
          name: {
            type: 'string',
            required: true,
            message: '请输入您的姓名',
            trigger: ['blur'],
          },
          areaCode: {
            type: 'string',
            required: true,
            message: '请选择所在地区',
            trigger: ['change'],
          },
          address: {
            type: 'string',
            required: true,
            message: '请填写详细地址',
            trigger: ['change', 'blur'],
          },
        },
        rules3: {
          accountNo: [
            {
              type: 'string',
              required: true,
              message: '请输入银行账号',
              trigger: ['blur'],
            },
            // {
            //   len: 16,
            //   message: '银行卡号为16位数字',
            //   trigger: ['blur'],
            // },
          ],
          bankName: {
            type: 'string',
            required: true,
            message: '请输入开户行支行名称',
            trigger: ['blur'],
          },
          parenBankName: {
            type: 'string',
            required: true,
            message: '请输入开户行名称',
            trigger: ['blur'],
          },
        },
        startShow: false, // 开始日期选择器弹框
        startTime: '',
        nowDate: this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd'),
        endShow: false, // 结束日期选择器弹框
        endTime: '',
        bankName: '',
        locationgTips: {
          message: '定位服务未开启，请在系统设置中开启定位服务',
          cancel: '取消',
          confirm: '去设置',
        },
      }
    },
    methods: {
      scrollFn(e) {
        this.scrollVal = e.detail.scrollTop
        console.log(e, 'sssssssssssss')
      },
      /**
       * 选择详细地址
       */
      async openLocation() {
        let LocationInfo = await getLocation(this.locationgTips)
        if (!LocationInfo || !LocationInfo.longitude) return
        const data = await this.$openLocation()
        console.log(data)
        await this.getAddress(data)
      },
      /**
       * 通过经纬度获取省市区
       */
      async getAddress(info) {
        console.log(info)
        showLoading()
        await this.$VoHttp
          .apiSixhotAreaTertiaryInfo({ ...info })
          .then(({ data }) => {
            this.formData.areaCode = data.areaCode
            this.formData.areaStr = `${data.provinceName}${data.cityName}${data.areaName}`
            this.formData.address = info.name
            // this.latitude = info.latitude
            // this.longitude = info.longitude
          })
          .catch((e) => {
            this.$u.toast(e.message || '网络错误')
          })
          .finally(() => {
            hideLoading()
          })
      },
      /**
       * 选择地址
       */
      sureFn(data) {
        this.formData.areaCode = data[2].code
        this.formData.areaStr = data[0].name + data[1].name + data[2].name
      },
      selectBankFn(item) {
        this.formData.bankName = item.bankName
        this.formData.unionBank = item.unionBank
        this.showBankSelect = false
      },
      changeParenBankFn(e) {
        this.formData.parenBankName = e
        let that = this
        uni.$u.debounce(() => {
          that.initBankFn('init')
        }, 500)
      },
      changeBankFn(e) {
        let that = this
        uni.$u.debounce(() => {
          let param = {
            bankName: that.formData.bankName,
            pageNo: 1,
            pageSize: 30,
          }
          that.$VoHttp
            .apiExtraBankFuzzy(param)
            .then((res) => {
              that.bankList = res.data.records
            })
            .catch((e) => {
              uni.$u.toast(e.message || '请求失败')
            })
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
       * 企业logo
       */
      successStoreUrlFn(res) {
        this.formData.storeUrl = res
      },
      /**
       * 上传身份证正面
       */
      uploadCardIs() {
        chooseImageOcrByPromise({ count: 1, formData: { type: 1 }, tip: '识别中' })
          .then((res) => {
            const result = JSON.parse(res.data)
            console.log(res, 'resres', result)

            if (Number(result.code) === 20001) {
              this.formData.name = result.data.name
              this.formData.IDCard = result.data.idNum
              this.twoPhotosList.firstSrc = result.data.url
            } else if (Number(result.code) === 40005) {
              //图片识别失败
              this.twoPhotosList.firstSrc = result.data.url
              uni.$u.toast(result.message || '请求失败')
            } else {
              uni.$u.toast(result.message || '请求失败')
            }
          })
          .catch((err) => {
            if (!err.errMsg) {
              this.$u.toast(err.message || '网络错误')
            }
          })
      },
      /**
       *  上传身份证反面
       */
      uploadCardNo() {
        chooseImageOcrByPromise({ count: 1, formData: { type: 1 }, tip: '识别中' })
          .then((res) => {
            const result = JSON.parse(res.data)

            if (Number(result.code) === 20001) {
              this.formData.validity = result.data.validDate
              this.twoPhotosList.secondSrc = result.data.url

              let validDate = result.data.validDate.split('-')
              this.formData.startTime =
                validDate[0].substr(0, 4) +
                '-' +
                validDate[0].substr(5, 2) +
                '-' +
                validDate[0].substr(8, 2)
              if (validDate[1] === '长期') {
                this.formData.endTime = validDate[1]
              } else {
                this.formData.endTime =
                  validDate[1].substr(0, 4) +
                  '-' +
                  validDate[1].substr(5, 2) +
                  '-' +
                  validDate[1].substr(8, 2)
              }
            } else if (Number(result.code) === 40005) {
              //图片识别失败
              this.twoPhotosList.secondSrc = result.data.url
              uni.$u.toast(result.message || '请求失败')
            } else {
              uni.$u.toast(result.message || '请求失败')
            }
          })
          .catch((err) => {
            if (!err.errMsg) {
              this.$u.toast(err.message || '网络错误')
            }
          })
      },
      /**
       * 上传营业执照
       */
      uploadBusiness() {
        chooseImageOcrByPromise({ count: 1, formData: { type: 2 }, tip: '识别中' })
          .then((res) => {
            const result = JSON.parse(res.data)

            if (Number(result.code) === 20001) {
              this.formData.license = result.data.companyName // 营业执照名称
              this.formData.code = result.data.regNum // 统一信用代码
              this.formData.faRenName = result.data.person
              this.upPhotoList.firstSrc = result.data.url

              if (result.data.period) {
                let period = result.data.period.split('至')
                this.startTime =
                  period[0].substr(0, 4) +
                  '-' +
                  period[0].substr(5, 2) +
                  '-' +
                  period[0].substr(8, 2)
                if (period[1] === '长期') {
                  this.endTime = period[1]
                } else {
                  this.endTime =
                    period[1].substr(0, 4) +
                    '-' +
                    period[1].substr(5, 2) +
                    '-' +
                    period[1].substr(8, 2)
                }
              }
            } else if (Number(result.code) === 40005) {
              //图片识别失败
              this.upPhotoList.firstSrc = result.data.url
              uni.$u.toast(result.message || '请求失败')
            } else {
              uni.$u.toast(result.message || '请求失败')
            }
          })
          .catch((err) => {
            if (!err.errMsg) {
              this.$u.toast(err.message || '网络错误')
            }
          })
      },
      /**
       * 提交账户信息
       */
      submitAuthFn() {
        this.$refs.form3.validate().then(() => {
          let param = {
            accountNo: this.formData.accountNo,
            bankName: this.formData.bankName,
            parenBankName: this.formData.parenBankName,
            unionBank: this.formData.unionBank,
          }
          showLoading('提交中')
          this.$VoHttp
            .apiCompanyLegalAuthAccount(param)
            .then((res) => {
              uni.$u.toast('提交成功')
              setTimeout(() => {
                uni.redirectTo({
                  url: '/pages/AuthenticationInformation/AccountSuccess',
                })
              }, 1500)
            })
            .catch((e) => {
              uni.$u.toast(e.message || '请求失败')
            })
            .finally(() => {
              hideLoading()
            })
        })
      },
      /**
       * 步骤二的上一步
       */
      previousStepTwo() {
        //重置表单
        this.$refs.form2.clearValidate()
        this.current = 0
      },
      /**
       * 步骤三的上一步
       */
      previousStepThree() {
        //重置表单
        this.$refs.form3.clearValidate()
        this.current = 1
      },
      /**
       * 下一步
       */
      nextStep() {
        this.$refs.form1.validate().then(() => {
          if (this.startTime > this.endTime) {
            uni.$u.toast('开始日期不能大于结束日期')
            return false
          }
          if (!this.upPhotoList.firstSrc) {
            uni.$u.toast('请上传营业执照')
            return false
          }
          this.scrollTop = this.scrollVal
          let param = {
            storeName: this.formData.storeName,
            legalName: this.formData.faRenName,
            fullName: this.formData.license,
            businessLicense: this.formData.code,
            businessLicenseUrl: this.upPhotoList.firstSrc,
            businessLicenseStartDate: this.startTime || this.nowDate,
            businessLicenseEndDate: this.endTime || this.nowDate,
            storeUrl: this.formData.storeUrl,
            companyType: 2, // （2：企业会员, 3：个人会员）
          }
          showLoading('提交中')
          this.$VoHttp
            .apiCompanyLegalAuthCompany(param)
            .then((res) => {
              uni.$u.toast('提交成功')
              this.current = 1
              this.scrollTop = 0
            })
            .catch((e) => {
              uni.$u.toast(e.message || '请求失败')
            })
            .finally(() => {
              hideLoading()
            })

          //重置表单
          // this.$refs.form2.clearValidate()
        })
      },
      /**
       * 提交认证信息
       */
      submitInfo() {
        console.log('111111')
        this.$refs.form2
          .validate()
          .then(() => {
            console.log('22222')
            let param = {
              legalName: this.formData.name, // 身份证名字
              legalId: this.formData.IDCard, // 身份证号
              legalIdCardFront: this.twoPhotosList.firstSrc, // 正面
              legalIdCardBack: this.twoPhotosList.secondSrc, //  反面
              legalStartDate: this.formData.startTime, //开始日期
              legalEndDate: this.formData.endTime, //结束日期
              areaCode: this.formData.areaCode, // 省市区
              address: this.formData.address, //详细地址
            }
            if (!this.twoPhotosList.firstSrc) {
              uni.$u.toast('请上传身份证正面')
              return
            }
            if (!this.twoPhotosList.secondSrc) {
              uni.$u.toast('请上传身份证反面')
              return
            }
            console.log('333333333')
            showLoading('提交中')
            this.$VoHttp
              .apiCompanyLegalAuthIdentity(param)
              .then((res) => {
                uni.$u.toast('提交成功')
                this.current = 2
              })
              .catch((e) => {
                uni.$u.toast(e.message)
              })
              .finally(() => {
                hideLoading()
              })
          })
          .catch((errors) => {
            console.log(errors, 'ssss')
            uni.$u.toast('校验失败')
          })
      },
      //配置品类信息
      goCateUrl() {
        this.$linkToEasy('/pages/AuthenticationInformation/BrandModule/BrandSetting')
      },
      /**
       * 返回首页
       */
      goHomePage() {
        console.log('返回首页--------')
        toRoleHome()
      },
      cancelStart() {
        this.startShow = false
      },
      /**
       * confirm  选择开始时间
       * @param e
       */
      confirmStart(e) {
        this.isChooseTime = true
        this.startShow = false
        let date = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd')
        console.log(this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd'), 'sss', date)

        this.startTime = date
      },
      cancelEnd() {
        this.endShow = false
      },
      /**
       * 选择结束时间
       * @param e
       */
      confirmEnd(e) {
        console.log(e, 'eeeeeeeeeeeeee')
        this.endShow = false
        if (+e.value === 1) {
          this.endTime = '无固定期限'
        } else {
          this.endTime = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd')
        }
      },
      confirmFormStart(e) {
        this.startFormShow = false
        this.formData.startTime = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd')
      },
      confirmFormEnd(e) {
        this.endFormShow = false

        if (+e.value === 1) {
          this.formData.endTime = '无固定期限'
        } else {
          this.formData.endTime = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd')
        }
      },
      /**
       * 初始认证填写信息
       */
      initInfo() {
        this.$VoHttp.apiCompanyLegalInfo().then((res) => {
          this.formData.storeUrl = res.data.storeUrl
          this.formData.storeName = res.data.storeName
          this.formData.faRenName = res.data.legalName
          this.formData.license = res.data.fullName
          this.formData.code = res.data.businessLicense
          this.upPhotoList.firstSrc = res.data.businessLicenseUrl
          this.startTime = res.data.businessLicenseStartDate
          this.endTime = res.data.businessLicenseEndDate
          this.formData.name = res.data.legalName
          this.formData.IDCard = res.data.legalId
          this.twoPhotosList.firstSrc = res.data.legalIdCardFront
          this.twoPhotosList.secondSrc = res.data.legalIdCardBack
          this.formData.startTime = res.data.legalStartDate
          this.formData.endTime = res.data.legalEndDate
          this.formData.address = res.data.address
          this.formData.areaCode = res.data.areaCode
          this.formData.areaStr =
            res.data.provinceName + res.data.cityName + res.data.areaName || ''

          this.formData.accountNo = res.data.accountNo
          this.formData.bankName = res.data.bankName
          this.formData.parenBankName = res.data.parenBankName
          this.formData.unionBank = res.data.unionBank

          if (+res.data.failureStatus === 5) {
            return
          }
          this.current = res.data.numPage - 1
        })
      },
    },
    onLoad(options) {
      this.initInfo()
    },
  }
</script>
<style lang="scss" scoped>
  .uploaded {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    box-sizing: border-box;
    background: $v-bg-white;
    display: flex;
    flex-direction: column;
    // padding-bottom: 132rpx;
    .flex1 {
      flex: 1;
    }

    &-logo {
      width: 100%;
      height: 368rpx;
      padding-left: 32rpx;
      border-radius: 8rpx;

      &__name {
        padding: 24rpx 0;
        height: 48rpx;
        line-height: 48rpx;
        font-size: 32rpx;
        color: $v-c0-85;
      }
    }

    &-form {
      margin-top: 56rpx;
      padding: 0 32rpx;
      margin-bottom: 8rpx;

      &__item {
        text-align: right;
        border-bottom: 2rpx solid $v-bg-light;
        .item-input {
          padding: 4rpx;
        }
        &.custom {
          text-align: left;
        }
        .item-textarea {
          width: 622rpx;
        }
        .item-icon {
          width: 40rpx;
          height: 40rpx;
        }
        .item-code {
          margin-left: 24rpx;
        }
      }
      &__label {
        padding-top: 22rpx;
        font-size: 32rpx;
        position: relative;
        margin-left: 22rpx;
        .label-star {
          position: absolute;
          left: -20rpx;
          top: 26rpx;
          color: $color-primary-red;
          font-size: 38rpx;
        }
      }
      &__box {
        font-size: 32rpx;
        color: $v-c0-65;
        line-height: 150%;
      }
      &__placeholder {
        text-align: right;
        color: $v-c0-25 !important;
        font-size: 32rpx !important;
      }
      &__word {
        font-size: 32rpx;
        color: $v-c0-85;
        white-space: nowrap;
      }
      &__code {
        font-size: 32rpx;
        line-height: 1.5;
        color: var(--color-primary);
      }
    }

    &-success {
      text-align: center;
      margin-top: 72rpx;

      &__icon {
        width: 176rpx;
        height: 176rpx;
      }

      &__info {
        margin-top: 32rpx;
        height: 36rpx;
        line-height: 36rpx;
        font-weight: bold;
        font-size: 30rpx;
        color: $v-c0-85;
      }

      &__open {
        margin-top: 24rpx;
        height: 36rpx;
        line-height: 36rpx;
        font-size: 24rpx;
        color: $v-c0-45;
      }

      &__button {
        margin-top: 286rpx;
        width: 750rpx;
        padding: 0rpx 32rpx;
        box-sizing: border-box;
      }
    }

    &-footer {
      // position: fixed;
      // left: 0;
      // bottom: 0;
      // z-index: 99;
      height: 132rpx;
      line-height: 132rpx;
      border-top: 2rpx solid rgba(24, 34, 65, 0.08);
      width: 100%;
      background: $v-bg-white;

      &__btn {
        width: 324rpx;
        height: 92rpx;
        margin: auto;
      }
      &__button {
        width: 200rpx;
        height: 92rpx;
        margin: auto;
      }

      &__color {
        color: $v-c0-25 !important;
      }
    }
  }

  :deep.u-form-item__body__left__content__required {
    top: 0rpx;
  }

  .color-gray {
    color: rgba(0, 0, 0, 0.25);
  }

  .flex-end {
    justify-content: flex-end;
  }
  .bank-list {
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
  .info-btn {
    color: rgba(0, 0, 0, 0.85) !important;
    border-color: rgba(0, 0, 0, 0.25) !important;
  }
  .red-required {
    color: $color-primary-red;
    line-height: 40rpx;
    font-size: 40rpx;
    vertical-align: -6rpx;
    margin-right: 4rpx;
  }
  .self-button {
    width: 200rpx;
    height: 80rpx;
    border: 1px solid #d3d4db;
    border-radius: 24px;
    font-size: 32rpx;
    line-height: 80rpx;
    text-align: center;
    &.color {
      background: #ff5319;
      color: #fff;
    }
  }
  ::v-deep .u-form-item__body__left {
    margin-left: 20rpx;
  }
  ::v-deep .u-form-item__body__left__content__label {
    margin-left: 4rpx;
  }
</style>
