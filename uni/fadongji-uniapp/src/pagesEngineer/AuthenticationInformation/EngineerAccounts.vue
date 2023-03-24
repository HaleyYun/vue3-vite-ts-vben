<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="uploaded p-b-safe-area"
  >
    <!--  顶部导航栏模块：start  -->
    <VoNav is-have-more title="提交认证信息" :is-back="false" @backFn="goHomePage" />
    <!--  顶部导航栏模块：end  -->

    <view>
      <view class="wrap-line"></view>

      <!--  企业信息模块：start  -->
      <EraForm
        ref="form2"
        :model="formData"
        :rules="rules2"
        class="uploaded-form"
        labelPosition="left"
        labelWidth="128"
      >
        <view class="p-lr-32">
          <EraFormItem
            class="uploaded-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="主修车系"
            prop="carSeries"
            required
          >
            <view
              class="w-full flex flex-justify-r flex-vertical-c"
              @click="showCarSeriesBoo = true"
            >
              <view v-if="formData.carSeriesProject">{{
                formateSeriesProject(formData.carSeriesProject)
              }}</view>
              <view v-else class="uploaded-form__placeholder">请选择主修车系</view>
              <VoIcon :size="24" class="m-l-6" name="right-arrow" />
            </view>
            <!--          <view-->
            <!--            class="car-series overflow-hidden flex flex-justify-r flex-vertical-c"-->
            <!--            @click="showCartBoo = true"-->
            <!--          >-->
            <!--            <view v-if="formData.carSeriesName.length > 0" class="text-desc overEllipsis">-->
            <!--              <block v-for="(cart, cartIndex) of formData.carSeriesName" :key="cartIndex">-->
            <!--                <text>{{ cart }}</text>-->
            <!--                <text v-if="cartIndex + 1 != formData.carSeriesName.length">,</text>-->
            <!--              </block>-->
            <!--            </view>-->
            <!--            <view v-else class="uploaded-form__placeholder">请选择主修车系</view>-->
            <!--            <VoIcon :size="24" class="m-l-6" name="right-arrow" />-->
            <!--          </view>-->
          </EraFormItem>

          <EraFormItem
            class="uploaded-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="技能专长"
            prop="carSeries"
            required
          >
            <view
              class="car-series overflow-hidden flex flex-justify-r flex-vertical-c"
              @click="showSkillBoo = true"
            >
              <view v-if="formData.skillTypeName.length > 0" class="text-desc overEllipsis">
                <block v-for="(skill, skillIndex) of formData.skillTypeName" :key="skillIndex">
                  <text>{{ skill }}</text>
                  <text v-if="skillIndex + 1 != formData.skillTypeName.length">,</text>
                </block>
              </view>
              <view v-else class="uploaded-form__placeholder">请选择技能专长</view>
              <VoIcon :size="24" class="m-l-6" name="right-arrow" />
            </view>
          </EraFormItem>

          <EraFormItem
            class="uploaded-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="所在地区"
            prop="areaCode"
            required
          >
            <view class="flex flex-justify-r flex-vertical-c w-full">
              <view v-if="formData.areaCode" class="overEllipsis w300" @click="showAddress = true"
                >{{ formData.areaStr || formData.name }}
              </view>
              <view v-else class="uploaded-form__placeholder" @click="showAddress = true"
                >请选择地址
              </view>

              <VoIcon :size="24" class="m-l-6" name="address" @click.native.stop="chooseLocation" />
            </view>
          </EraFormItem>
          <view class="color-block fz-32 m-t-34 flex flex-vertical-c left-18">
            <view class="fz-40 c-e47470">*</view>
            <view>详细地址</view>
          </view>
          <EraFormItem
            class="uploaded-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label=""
            labelWidth="0"
            prop="address"
          >
            <u--input
              v-model="formData.address"
              border="none"
              disabledColor="#ffffff"
              fontSize="16px"
              inputAlign="left"
              placeholder="街道/楼牌号"
              placeholderClass="uploaded-form__placeholder text-left"
            />
          </EraFormItem>

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
        </view>
        <view class="wrap-line"></view>
        <view class="p-lr-32">
          <EraFormItem
            class="uploaded-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="姓名"
            prop="legalName"
          >
            <u-input
              v-model="formData.legalName"
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
            label="身份证号"
            prop="legalId"
          >
            <u--input
              v-model="formData.legalId"
              border="none"
              disabledColor="#ffffff"
              fontSize="16px"
              inputAlign="right"
              placeholder="请输入身份证号"
              placeholderClass="uploaded-form__placeholder"
            />
          </EraFormItem>
          <EraFormItem class="uploaded-form__item" color="rgba(0, 0, 0, 0.85)" label="身份证有效期">
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
        </view>
        <view class="wrap-line"></view>
        <view class="p-lr-32">
          <EraFormItem
            class="uploaded-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="联系电话"
            prop="contractPhone"
          >
            <u--input
              v-model="formData.contractPhone"
              border="none"
              disabled
              disabledColor="#ffffff"
              fontSize="16px"
              inputAlign="right"
              placeholder="请输入联系电话"
              placeholderClass="uploaded-form__placeholder"
            />
          </EraFormItem>
          <EraFormItem
            class="uploaded-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="验证码"
            prop="codeModel"
          >
            <u--input
              v-model="formData.codeModel"
              :maxlength="6"
              border="none"
              class="item-input m-r-6"
              color="rgba(0, 0, 0, 0.85)"
              inputAlign="right"
              placeholder="请输入验证码"
              placeholderClass="uploaded-form__placeholder"
              type="number"
            />
            <u-code
              ref="uCode"
              changeText="xS"
              class="item-code"
              seconds="60"
              @change="codeChange"
              @end="codeBtnDisabled = false"
              @start="codeBtnDisabled = true"
            />
            <view slot="right" class="codeTip" @click="getCodeClick">
              {{ tips }}
            </view>
          </EraFormItem>
          <!--温馨提示-->
          <view class="m-t-32 m-b-6">
            <view class="fz-28 color-red">温馨提示</view>
            <view class="fz-24 color-block-45"
              >尊敬的客户您好，为保障认证信息是您本人真实操作，请验证认证时的手机号</view
            >
          </view>
        </view>
      </EraForm>
      <!--  企业信息模块：end  -->
    </view>
    <view class="uploaded-footer">
      <view class="flex flex-justify-between">
        <EraButton size="small" text="暂不认证" themeType="default" @click="goHomePage" />
        <EraButton
          v-if="
            twoPhotosList.secondSrc &&
            twoPhotosList.firstSrc &&
            formData.legalId &&
            formData.startTime &&
            formData.skillTypeName.length > 0 &&
            formData.endTime &&
            formData.legalName &&
            formData.areaCode &&
            formData.address &&
            formData.codeModel
          "
          size="small"
          text="提交信息"
          @click="faceClick"
        />
        <EraButton v-else class="uploaded-footer__color" disabled size="small" text="提交信息" />
      </view>
      <view class="safearea-box"></view>
    </view>

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
    <SelectCart :show.sync="showCartBoo" @sureFn="cartSureFn" />
    <SelectSkill :show.sync="showSkillBoo" @sureFn="skillSureFn" />

    <u-popup :show="showCarSeriesBoo">
      <view class="pop-head">主修车系</view>
      <view>
        <view class="pop-series">
          <view
            v-for="item in carSeriesList"
            :key="item.code"
            :class="{ 'pop-content-select': carSeriesCurrent.includes(item.value) }"
            class="pop-content-item"
            @click="selectSeries(item)"
            >{{ item.name }}</view
          >
        </view>
        <view class="pop-bottom">
          <u-button
            class="button-cancel"
            shape="circle"
            text="取消"
            @click="showCarSeriesBoo = false"
          />
          <u-button class="button-sure" shape="circle" text="确定" @click="confirmSeries" />
        </view>
      </view>
    </u-popup>
  </view>
</template>
<script>
  import UploadPhotos from './components/UploadPhotos'
  import WarmPrompt from './components/WarmPrompt'
  import {
    chooseImageOcrByPromise,
    getLocation,
    hideLoading,
    showLoading,
    toRoleHome,
  } from '@/common/helper'
  import SelectCart from './components/SelectCart'
  import SelectSkill from './components/SelectSkill'
  // #ifdef APP-PLUS
  const vocenFaceID = uni.requireNativePlugin('vocen-faceIdentification')
  // #endif
  export default {
    name: 'DownloadApp',
    components: { SelectSkill, SelectCart, UploadPhotos, WarmPrompt },
    data() {
      return {
        codeBtnDisabled: false,
        showCartBoo: false,
        showSkillBoo: false,
        showAddress: false, // 是否显示选择地址
        showBankSelect: false,
        startFormShow: false,
        endFormShow: false,
        showCarSeriesBoo: false,
        carSeriesCurrent: [],
        carSeriesList: [],
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
          contractPhone: '', // 手机号
          legalId: '', // 身份证号
          legalName: '', // 法人姓名
          startTime: '', // 身份证日期开始
          endTime: '', // 身份证日期结束
          areaCode: '', //地址code
          areaStr: '', // 地址回显
          name: '', // 所在地区
          address: '', // 详细地址
          // longitude: '',
          // latitude: '',
          carSeries: [],
          carSeriesName: [],
          skillTypeName: [],
          skillType: [],
          codeModel: '',
        },
        rules2: {
          legalId: [
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
          legalName: [
            {
              type: 'string',
              required: true,
              message: '请输入您的姓名',
              trigger: ['blur'],
            },
            {
              pattern: this.$vocenApi.Pattern.chinese,
              // 正则检验前先将值转为字符串
              transform(value) {
                return String(value)
              },
              message: '只能输入汉字',
              trigger: ['blur'],
            },
            {
              max: 5,
              message: '不能超过5个字',
            },
          ],
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
          codeModel: {
            type: 'string',
            required: true,
            message: '请输入验证码',
            trigger: ['blur', 'change'],
          },
        },
        nowDate: this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd'),
        tips: '获取验证码',
        locationgTips: {
          message: '定位服务未开启，请在系统设置中开启定位服务',
          cancel: '取消',
          confirm: '去设置',
        },
      }
    },
    methods: {
      /**
       * 获取验证码
       */
      getCodeClick() {
        // this.$u.toast('获取验证码')
        if (this.$refs.uCode.canGetCode) {
          // 模拟向后端请求验证码
          uni.showLoading({
            title: '正在获取验证码',
          })
          let param = {
            mobile: this.formData.contractPhone,
          }
          this.$VoHttp
            .apiCompanyInfoSms(param)
            .then((res) => {
              uni.$u.toast('发送成功')
              this.$refs.uCode.start()
            })
            .catch((e) => {
              uni.$u.toast(e.message || '请求失败')
            })
            .finally(() => {
              uni.hideLoading()
            })
        } else {
          uni.$u.toast('倒计时结束后再发送')
        }
      },
      codeChange(text) {
        this.tips = text
      },
      /**
       * @description 人脸识别sdk
       */
      faceClick() {
        console.log('参数', this.formData)
        let that = this
        this.$refs.form2.validate().then(() => {
          if (this.formData.carSeriesProject.length <= 0) {
            uni.$u.toast('请选择主修车系')
            return
          }
          if (this.formData.skillType.length <= 0) {
            uni.$u.toast('请选择技能专长')
            return
          }

          if (!this.twoPhotosList.firstSrc) {
            uni.$u.toast('请上传身份证正面')
            return false
          }
          if (!this.twoPhotosList.secondSrc) {
            uni.$u.toast('请上传身份证反面')
            return false
          }
          // #ifdef H5
          let param = {
            name: this.formData.legalName, // 身份证名字
            idNo: this.formData.legalId, // 身份证号
          }
          const storageTencent = {
            formData: this.formData,
            twoPhotosList: this.twoPhotosList,
          }

          this.$storage.set('storageTencent', storageTencent)
          showLoading('加载中')
          this.$VoHttp
            .apiTencentSignH5Sign(param)
            .then((res) => {
              const result = res.data

              const href = location.href
              let url = encodeURI(href)
              let optimalDomain =
                'https://' +
                result.optimalDomain +
                `/api/web/login?webankAppId=${result.appId}&version=${result.version}&nonce=${result.nonce}&orderNo=${result.orderNo}&faceId=${result.faceId}&url=${url}&from=browser&userId=${result.userId}&sign=${result.nonceSign}&redirectType=1`

              location.href = optimalDomain
              // window.open(optimalDomain)
              // console.log(optimalDomain,"optimalDomainoptimalDomain");
            })
            .catch((err) => {
              this.$u.toast(err.message)
            })
          // #endif
          // #ifdef APP-PLUS
          this.$VoHttp
            .apiTencentSignSign()
            .then((res) => {
              const result = res.data

              vocenFaceID.voStartFaceIdentification(
                {
                  faceIdSign: result.sign,
                  userId: result.userId,
                  name: that.formData.legalName,
                  idCard: that.formData.legalId,
                  sign: result.nonceSign,
                  nonce: result.nonce,
                },
                (res) => {
                  console.log(res, 'sssssssss')
                  if (res.data.isSuccess) {
                    that.submitInfo()
                  } else if (res.data.businessCode == 'F00003') {
                    uni.$u.toast('姓名或身份证号格式不正确')
                  } else {
                    uni.$u.toast(res.data.des || '人脸验证失败')
                  }
                },
              )
            })
            .catch((err) => {
              this.$u.toast(err.message)
            })
          // #endif
        })
      },
      /**
       * @description 选择技能
       */
      skillSureFn(data) {
        this.showSkillBoo = false
        this.formData.skillTypeName = [].concat(data.name)
        this.formData.skillType = [].concat(data.value)
      },
      /**
       * @description 选择车系
       */
      cartSureFn(data) {
        this.showCartBoo = false
        this.formData.carSeriesName = [].concat(data.name)
        this.formData.carSeries = [].concat(data.value)
      },
      /**
       * 选择地图
       */
      async chooseLocation() {
        let LocationInfo = await getLocation(this.locationgTips)
        if (!LocationInfo || !LocationInfo.longitude) return
        const data = await this.$openLocation()
        await this.getAddress(data)
      },
      /**
       * 通过经纬度获取省市区
       */
      async getAddress(info) {
        await this.$VoHttp
          .apiSixhotAreaTertiaryInfo({ ...info })
          .then(({ data }) => {
            // this.formData.longitude = info.longitude
            // this.formData.latitude = info.latitude
            this.formData.areaStr = `${data.provinceName}${data.cityName}${data.areaName}`
            // this.formData.name = res.name
            this.formData.address = info.name
            this.formData.areaCode = data.areaCode
          })
          .catch((e) => {
            this.$u.toast(e.message || '网络错误')
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
       * 上传身份证正面
       */
      uploadCardIs() {
        chooseImageOcrByPromise({ count: 1, formData: { type: 1 }, tip: '识别中' })
          .then((res) => {
            const result = JSON.parse(res.data)
            console.log(res, 'resres', result)

            if (Number(result.code) === 20001) {
              this.formData.legalName = result.data.name
              this.formData.legalId = result.data.idNum
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
       * 提交认证信息
       */
      submitInfo() {
        if (this.formData.carSeriesProject.length <= 0) {
          uni.$u.toast('请选择主修车系')
          return
        }
        if (this.formData.skillType.length <= 0) {
          uni.$u.toast('请选择技能专长')
          return
        }
        if (!this.twoPhotosList.firstSrc) {
          uni.$u.toast('请上传身份证正面')
          return false
        }
        if (!this.twoPhotosList.secondSrc) {
          uni.$u.toast('请上传身份证反面')
          return false
        }
        let param = {
          legalName: this.formData.legalName, // 身份证名字
          legalId: this.formData.legalId, // 身份证号
          legalIdCardFront: this.twoPhotosList.firstSrc, // 正面
          legalIdCardBack: this.twoPhotosList.secondSrc, //  反面
          legalStartDate: this.formData.startTime, //开始日期
          legalEndDate: this.formData.endTime, //结束日期
          areaCode: this.formData.areaCode, // 省市区
          address: this.formData.address, //详细地址
          carSeries: this.formData.carSeriesProject,
          skillType: this.formData.skillType.join(),
          verificationCode: this.formData.codeModel,
          contractPhone: this.formData.contractPhone,
        }
        showLoading('提交中')
        this.$VoHttp
          .apiCompanyLegalAuthSkill(param)
          .then((res) => {
            console.log(param)
            console.log(res, '认证回执')
            uni.$u.toast('提交成功')
            setTimeout(() => {
              toRoleHome()
            }, 1500)
          })
          .catch((e) => {
            console.log(e, 'eeee')
            uni.$u.toast(e.message)
          })
          .finally(() => {
            hideLoading()
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
        toRoleHome()
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
      formateSeriesProject(val) {
        if (!val) {
          return ''
        }
        const arr = val.split(',')
        return arr
          .map((item) => {
            return this.carSeriesList.find((value) => value.value == item).name
          })
          .join()
      },
      selectSeries(val) {
        const index = this.carSeriesCurrent.findIndex((item) => item == val.value)
        if (index == -1) {
          this.carSeriesCurrent.push(val.value)
        } else {
          this.carSeriesCurrent.splice(index, 1)
        }
      },
      confirmSeries() {
        if (!this.carSeriesCurrent.length) {
          this.$u.toast('请选择主修车系')
          return
        }
        this.formData.carSeriesProject = this.carSeriesCurrent.join()
        this.showCarSeriesBoo = false
      },
      async getCarSeriesList() {
        const res = await this.$VoHttp.apiCompanyInfoSerialDic()
        this.carSeriesList = res.data
      },
    },
    async onLoad(options) {
      this.formData.contractPhone = this.userInfo.userName
      await this.getCarSeriesList()
      if (+options.code === 0) {
        // 如果人脸识别结束进来的
        const storageTencent = this.$storage.get('storageTencent')

        this.twoPhotosList = storageTencent.twoPhotosList
        this.formData = storageTencent.formData
        this.submitInfo()
      } else {
        //已经认证的修理厂 认证集师傅 带出来认证信息 特殊处理
        this.$VoHttp.apiCompanyLegalSkillGarage().then((res) => {
          const result = res.data

          this.formData.address = result.address

          if(result.areaCode){
            this.formData.areaStr = result.provinceName + result.cityName + result.areaName
            this.formData.areaCode = result.areaCode
          }

          if(result.carSeries){
            this.formData.carSeriesProject = result.carSeries
            result.carSeries.split(',').map((item) => {
              this.carSeriesCurrent.push(Number(item))
            })
          }


          this.$forceUpdate()
        })
      }
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

    &-form {
      padding: 0 0rpx 132rpx;
      margin-bottom: 8rpx;

      &__item {
        text-align: right;
        border-bottom: 2rpx solid $v-bg-light;

        .item-code {
          margin-left: 24rpx;
        }
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

      &__placeholder {
        text-align: right;
        color: $v-c0-25 !important;
      }
    }

    &-footer {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 3;
      border-top: 2rpx solid rgba(24, 34, 65, 0.08);
      width: 100%;
      background: $v-bg-white;
      padding: 20rpx 32rpx;
      box-sizing: border-box;

      &__button {
        width: 324rpx;
        height: 92rpx;
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
  .c-e47470 {
    color: #e47470;
  }
  .left-18 {
    margin-left: -18rpx;
  }
  .text-left {
    text-align: left !important;
  }
  .text-desc {
    color: rgba(0, 0, 0, 0.65);
    font-size: 32rpx;
  }
  .car-series {
    width: 400rpx;
    margin-left: auto;
  }
  .pop-series {
    padding: 0 32rpx 286rpx 32rpx;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 64rpx 64rpx 64rpx;
    grid-row-gap: 44rpx;
    grid-column-gap: 34rpx;
    &-item {
      box-sizing: border-box;
      width: 200rpx;
      height: 64rpx;
      text-align: center;
      line-height: 64rpx;
      font-size: 24rpx;
      border-radius: 64rpx;
      border: 2rpx solid #f6f7f8;
      background: #f6f7f8;
      color: rgba(0, 0, 0, 0.85);
      margin-top: 42rpx;
      margin-right: 44rpx;
    }
    &-select {
      background: #ffece5;
      border: 2rpx solid #ff6633;
      color: #ff6633;
    }
  }
  .pop-bottom {
    display: flex;
    justify-content: space-between;
    padding: 24rpx 32rpx 80rpx 32rpx;
    .button-cancel,
    .button-sure {
      width: 325rpx;
      height: 80rpx;
    }
    .button-sure {
      background: #ff5319;
      color: #fff;
    }
  }
  .pop-head {
    box-sizing: border-box;
    margin: 0 32rpx;
    padding: 24rpx 0;
    font-size: 32rpx;
    font-weight: bold;
    border-bottom: 2rpx solid #f7f7f8;
  }
  .pop-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 32rpx 286rpx 32rpx;
    border-bottom: 2rpx solid #f7f7f8;
    &-item {
      box-sizing: border-box;
      width: 200rpx;
      height: 64rpx;
      text-align: center;
      line-height: 64rpx;
      font-size: 24rpx;
      border-radius: 64rpx;
      border: 2rpx solid #f6f7f8;
      background: #f6f7f8;
      color: rgba(0, 0, 0, 0.85);
      margin-top: 42rpx;
    }
    &-select {
      background: #ffece5;
      border: 2rpx solid #ff6633;
      color: #ff6633;
    }
  }
  .codeTip {
    color: $color-primary-yellow;
  }
  .p-lr-32 {
    padding: 0rpx 32rpx;
    box-sizing: border-box;
  }
  .wrap-line {
    width: 750rpx;
    height: 16rpx;
    background: #f7f7f8;
  }
</style>
