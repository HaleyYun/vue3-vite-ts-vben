<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="uploaded p-b-safe-area"
  >
    <!--  顶部导航栏模块：start  -->
    <VoNav title="提交认证信息" :is-back="false" @backFn="goHomePage" />
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
            <view class="uploaded-form__word m-l-16 m-r-16">至</view>
            <view
              :class="{ 'color-gray': !endTime }"
              class="uploaded-form__word"
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
        <UploadLogo @success="successStoreUrlFn" />
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
        <!--          required-->
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
        <!--          required-->
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
      <view class="uploaded-success">
        <image class="uploaded-success__icon" src="/static/created/certify/success_tips.png" />
        <view class="uploaded-success__info">认证信息提交成功</view>
        <view class="uploaded-success__open">工作人员将在1个工作日内完成审核</view>
        <view class="uploaded-success__button">
          <block v-if="userInfo.roleCode !== 'agent'">
            <EraButton
              class="m-b-64"
              size="lg-mini"
              text="配置品类信息"
              @click.native="$linkToEasy('/pagesCommon/StoreInfo/CertifiedCategory')"
            />
            <EraButton
              class="m-b-64"
              size="lg-mini"
              text="配置品牌信息"
              @click.native="
                $linkToEasy('/pagesProduct/BrandCertification/BrandCertification?source=2')
              "
            />
          </block>
          <EraButton size="lg-mini" text="进入首页" theme-type="Wire" @click.native="goHomePage" />
        </view>
      </view>
    </view>
    <!--  步骤三模块：end  -->
    <!--  底部固定模块：start  -->
    <view v-if="current === 0" class="uploaded-footer flex p-b-safe-area">
      <u-button
        class="uploaded-footer__button"
        color="#22284b"
        plain
        shape="circle"
        size="large"
        text="暂不认证"
        @click="goHomePage"
      />
      <u-button
        v-if="
          formData.license &&
          startTime &&
          formData.code &&
          formData.faRenName &&
          formData.storeName &&
          formData.storeUrl
        "
        class="uploaded-footer__button"
        color="#FF5319"
        shape="circle"
        size="large"
        text="下一步"
        @click="nextStep"
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
    <view v-else-if="current === 1" class="uploaded-footer flex p-b-safe-area">
      <!-- <u-button
        class="uploaded-footer__button m-y-38"
        color="#22284b"
        plain
        shape="circle"
        size="large"
        text="暂不认证"
        @click="goHomePage"
      /> -->
      <view class="self-button uploaded-footer__button m-y-38" @click="goHomePage">暂不认证</view>

      <u-button
        class="uploaded-footer__button m-y-38 info-btn"
        color="#22284b"
        plain
        shape="circle"
        size="large"
        text="上一步"
        @click="previousStepTwo"
      />
      <u-button
        v-if="
          formData.IDCard &&
          formData.startTime &&
          formData.endTime &&
          formData.name &&
          formData.areaCode &&
          formData.address
        "
        class="uploaded-footer__button m-y-38"
        color="#FF5319"
        shape="circle"
        size="large"
        text="提交认证信息"
        @click="submitInfo"
      />
      <u-button
        v-else
        class="uploaded-footer__button uploaded-footer__color m-y-38"
        color="#F6F7F8"
        shape="circle"
        size="large"
        text="提交认证信息"
      />
    </view>
    <!--  底部固定模块：end  -->

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

    <u-datetime-picker
      :maxDate="3740967920000"
      :minDate="332747120000"
      :show="endShow"
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

    <u-datetime-picker
      :maxDate="3740967920000"
      :minDate="332747120000"
      :show="endFormShow"
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
        showAddress: false, // 是否显示选择地址
        startFormShow: false,
        endFormShow: false,
        current: 0,
        upPhotoList: {
          defaultFirstSrc: '/static/created/certify/not_uploaded.png',
          firstSrc: '',
          firstContent: '拍照上传您的营业执照',
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
          license: '', // 营业执照名称
          term: '', // 营业执照期限
          code: '', // 统一信用代码
          faRenName: '', // 法人姓名
          storeName: '', // 店铺简称
          storeUrl: '', //店铺url
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
        startShow: false, // 开始日期选择器弹框
        startTime: '',
        nowDate: this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd'),
        endShow: false, // 结束日期选择器弹框
        endTime: '',
        locationgTips: {
          message: '定位服务未开启，请在系统设置中开启定位服务',
          cancel: '取消',
          confirm: '去设置',
        },
      }
    },
    methods: {
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
              uni.$u.toast(result.message)
            } else {
              uni.$u.toast(result.message)
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
              uni.$u.toast(result.message)
            } else {
              uni.$u.toast(result.message)
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
              uni.$u.toast(result.message)
            } else {
              uni.$u.toast(result.message)
            }
          })
          .catch((err) => {
            if (!err.errMsg) {
              this.$u.toast(err.message || '网络错误')
            }
          })
      },
      /**
       * 下一步
       */
      nextStep() {
        this.$refs.form1
          .validate()
          .then(() => {
            if (this.startTime > this.endTime) {
              uni.$u.toast('开始日期不能大于结束日期')
              return false
            }
            if (!this.upPhotoList.firstSrc) {
              uni.$u.toast('请上传营业执照')
              return false
            }
            let param = {
              storeName: this.formData.storeName,
              legalName: this.formData.faRenName,
              fullName: this.formData.license,
              businessLicense: this.formData.code,
              businessLicenseUrl: this.upPhotoList.firstSrc,
              businessLicenseStartDate: this.startTime || this.nowDate,
              businessLicenseEndDate: this.endTime || this.nowDate,
              storeUrl: this.formData.storeUrl,
              companyType: 3, // （2：企业会员, 3：个人会员）
            }
            showLoading('提交中')

            this.$VoHttp
              .apiCompanyLegalAuthCompany(param)
              .then((res) => {
                uni.$u.toast('提交成功')
                this.current = 1
                uni.pageScrollTo({
                  scrollTop: 0,
                  duration: 300,
                })
              })
              .catch((e) => {
                uni.$u.toast(e.message)
              })
              .finally(() => {
                hideLoading()
              })

            //重置表单
            // this.$refs.form2.clearValidate()
          })
          .catch((errors) => {})
      },
      /**
       * 提交认证信息
       */
      submitInfo() {
        this.$refs.form2
          .validate()
          .then(() => {
            if (!this.twoPhotosList.firstSrc) {
              uni.$u.toast('请上传身份证正面')
              return false
            }
            if (!this.twoPhotosList.secondSrc) {
              uni.$u.toast('请上传身份证反面')
              return false
            }

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
          .catch((errors) => {})
      },
      /**
       * 步骤二的上一步
       */
      previousStepTwo() {
        //重置表单
        this.$refs.form2.clearValidate()
        this.current = 0
      },
      //配置品类信息
      goCateUrl() {
        this.$linkToEasy('/pages/AuthenticationInformation/BrandModule/BrandSetting')
      },
      /**
       * 返回首页
       */
      goHomePage() {
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
        this.endShow = false
        this.endTime = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd')
      },
      confirmFormStart(e) {
        this.startFormShow = false
        this.formData.startTime = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd')
      },
      confirmFormEnd(e) {
        this.endFormShow = false
        this.formData.endTime = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd')
      },
      /**
       * 初始认证填写信息
       */
      initInfo() {
        this.$VoHttp.apiCompanyLegalInfo().then((res) => {
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
          this.current = res.data.numPage - 1

          if (res.data.checkStatus == 2 && res.data.failureStatus == 2) {
            this.current = 1
          } else if (res.data.checkStatus == 1) {
            this.current = 2
          } else if (res.data.checkStatus != 0) {
            this.current = 1
          }
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
    min-height: 100vh;
    overflow-x: hidden;
    box-sizing: border-box;
    background: $v-bg-white;
    padding-bottom: 132rpx;

    &-logo {
      width: 100%;
      height: 368rpx;
      padding-left: 32rpx;
      position: relative;

      &__name {
        padding: 24rpx 0;
        height: 48rpx;
        line-height: 48rpx;
        font-size: 32rpx;
        color: $v-c0-85;
        position: relative;
        margin-left: 22rpx;
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
        margin-top: 140rpx;
        width: 750rpx;
        padding: 0rpx 32rpx;
        box-sizing: border-box;
      }
    }

    &-footer {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 3;
      height: 132rpx;
      line-height: 132rpx;
      border-top: 2rpx solid rgba(24, 34, 65, 0.08);
      width: 100%;
      background: $v-bg-white;

      &__button {
        width: 324rpx;
        height: 92rpx;
        margin: auto;
        &.m-y-38 {
          margin-right: 19rpx;
          margin-left: 19rpx;
        }
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
  .red-required {
    color: $color-primary-red;
    position: absolute;
    left: -20rpx;
    top: 36rpx;
    line-height: 40rpx;
    font-size: 40rpx;
  }
  .self-button {
    // width: 200rpx;
    height: 80rpx;
    border: 1px solid #d3d4db;
    border-radius: 24px;
    font-size: 32rpx;
    line-height: 80rpx;
    text-align: center;
  }
  .info-btn {
    color: rgba(0, 0, 0, 0.85) !important;
    border-color: rgba(0, 0, 0, 0.25) !important;
  }
  ::v-deep .u-form-item__body__left {
    margin-left: 20rpx;
  }
  ::v-deep .u-form-item__body__left__content__label {
    margin-left: 4rpx;
  }
</style>
