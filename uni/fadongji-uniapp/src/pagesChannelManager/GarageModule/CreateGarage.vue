<template>
  <view>
    <view class="garage">
      <VoNav :title="id ? '修改修理厂' : '创建修理厂'" is-fixed is-have-more />
      <view class="flex1 overflow-y p-b-32">
        <EraForm
          ref="form"
          :model="formData"
          :rules="rules"
          class="garage-form"
          labelPosition="left"
          labelWidth="130"
        >
          <EraFormItem
            class="garage-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="联系电话"
            prop="phone"
            required
          >
            <u--input
              v-model.number="formData.phone"
              :readonly="!!id"
              autoHeight
              border="none"
              class="item-input"
              color="rgba(0, 0, 0, 0.85)"
              fontSize="16px"
              inputAlign="right"
              maxlength="11"
              placeholder="请输入联系电话"
              placeholderClass="garage-form__placeholder"
              type="number"
              @blur="checkPhone"
            />
          </EraFormItem>
          <EraFormItem
            class="garage-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="名称"
            prop="nickname"
            required
          >
            <u--input
              v-model.trim="formData.nickname"
              autoHeight
              border="none"
              class="item-input"
              color="rgba(0, 0, 0, 0.85)"
              fontSize="16px"
              inputAlign="right"
              placeholder="请输入负责人名称"
              placeholderClass="garage-form__placeholder"
            />
          </EraFormItem>
          <EraFormItem
            class="garage-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="修理厂名称"
            prop="garageName"
            required
          >
            <u--input
              v-model.trim="formData.garageName"
              autoHeight
              border="none"
              class="item-input"
              color="rgba(0, 0, 0, 0.85)"
              fontSize="16px"
              inputAlign="right"
              placeholder="请输入修理厂名称"
              placeholderClass="garage-form__placeholder"
            />
          </EraFormItem>
          <EraFormItem
            class="garage-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="所在地区"
            prop="areaCode"
            required
          >
            <view
              v-if="formData.areaStr"
              class="flex1 garage-form__box m-r-8"
              @click="chooseAddress"
              >{{ formData.areaStr }}</view
            >
            <view
              v-else
              class="flex1 garage-form__box color-block-25 m-r-16"
              @click="chooseAddress"
            >
              省/市/区
            </view>
            <!--            <VoIcon :opacity="0.25" name="right-arrow" />-->
            <VoIcon :size="20" color="#373A4E" name="address" @click.native.stop="openLocation" />
          </EraFormItem>
          <view class="garage-form__label"><view class="label-star">*</view>详细地址</view>
          <EraFormItem
            class="garage-form__item custom"
            color="rgba(0, 0, 0, 0.85)"
            label=""
            labelWidth="0"
            prop="detail"
          >
            <textarea
              v-model.trim="formData.detail"
              auto-height
              class="item-textarea"
              maxlength="100"
              placeholder="小区楼栋/乡村名称"
              placeholder-class="item-placeholder"
            ></textarea>
            <!--            <VoIcon :size="20" color="#373A4E" name="address" @click="openLocation" />-->
          </EraFormItem>
        </EraForm>
        <EraForm
          ref="form"
          :model="formData"
          :rules="rules"
          class="garage-form"
          labelPosition="left"
          labelWidth="130"
        >
          <EraFormItem
            class="garage-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="主修车系"
            prop="carSystem"
            @click="showCarSeriesBoo = true"
          >
            <view v-if="formData.carSeriesProject" class="flex1 garage-form__box m-r-8">{{
              formateSeriesProject(formData.carSeriesProject)
            }}</view>
            <view v-else class="flex1 garage-form__box color-block-25 m-r-16">请选择</view>
            <VoIcon :opacity="0.25" name="right-arrow" />
          </EraFormItem>
          <EraFormItem
            class="garage-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="服务项目"
            prop="serviceProject"
            @click="serviceShow = true"
          >
            <view v-if="formData.serviceProject" class="flex1 garage-form__box m-r-8">{{
              formateServiceProject(formData.serviceProject)
            }}</view>
            <view v-else class="flex1 garage-form__box color-block-25 m-r-16">
              洗美/换修发动集/保养
            </view>
            <VoIcon :opacity="0.25" name="right-arrow" />
          </EraFormItem>
          <EraFormItem
            class="garage-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="工位数量"
            prop="stationNum"
          >
            <u--input
              v-model.number="formData.stationNum"
              :formatter="formatterInt"
              autoHeight
              border="none"
              class="item-input"
              color="rgba(0, 0, 0, 0.85)"
              fontSize="16px"
              inputAlign="right"
              maxlength="999"
              placeholder="请输入工位数量"
              placeholderClass="garage-form__placeholder"
              type="number"
            />
          </EraFormItem>
          <EraFormItem
            class="garage-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="规模（人）"
            prop="scale"
          >
            <u--input
              v-model.number="formData.scale"
              :formatter="formatterInt"
              autoHeight
              border="none"
              class="item-input"
              color="rgba(0, 0, 0, 0.85)"
              fontSize="16px"
              inputAlign="right"
              maxlength="999"
              placeholder="请输入人员数量"
              placeholderClass="garage-form__placeholder"
              type="number"
            />
          </EraFormItem>

          <view class="garage-upload">
            <view class="garage-upload__name flex flex-justify-between flex-vertical-c">
              <view class="name-left"><text class="c-required">*</text>门店实拍</view>
              <view class="name-right">{{ fileList.length }}/1</view>
            </view>
            <EraFormItem
              class="garage-form__item"
              color="rgba(0, 0, 0, 0.85)"
              label=""
              label-width="0"
            >
              <view class="garage-upload__pictures flex1">
                <VoFormUpload :limit="1" :source.sync="fileList" uploadType="image" />
              </view>
            </EraFormItem>
          </view>
        </EraForm>
      </view>
      <!--   底部固定   -->
      <view class="garage-footer flex p-b-safe-area">
        <u-button
          v-if="
            formData.phone &&
            formData.nickname &&
            formData.garageName &&
            formData.areaStr &&
            formData.detail &&
            fileList.length
          "
          class="garage-footer__button"
          color="#FF5319"
          shape="circle"
          size="large"
          text="确定"
          @click="btnSureFn"
        />
        <u-button
          v-else
          class="garage-footer__button garage-footer__color"
          color="#F6F7F8"
          shape="circle"
          size="large"
          text="确定"
        />
        <VoSafetyArea />
      </view>
    </view>
    <VoAddress :show.sync="showAddress" @sureFn="sureFn" />
    <u-popup :show="showCarSeriesBoo" @open="carSeriesOpen">
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
            @click="cancelChooseCarSeriesHandler"
          />
          <u-button
            :disabled="!carSeriesCurrent.length"
            class="button-sure"
            shape="circle"
            text="确定"
            @click="confirmSeries"
          />
        </view>
      </view>
    </u-popup>
    <u-popup :show="serviceShow" @open="carServiceOpen">
      <view class="pop-head">服务项目</view>
      <view>
        <view class="pop-content">
          <view
            v-for="item in serviceList"
            :key="item.code"
            :class="{ 'pop-content-select': currentService.includes(item.code) }"
            class="pop-content-item"
            @click="selectService(item)"
            >{{ item.name }}</view
          >
        </view>
        <view class="pop-bottom">
          <u-button
            class="button-cancel"
            shape="circle"
            text="取消"
            @click="cancelCurrentServiceHandler"
          />
          <u-button
            :disabled="!currentService.length"
            class="button-sure"
            shape="circle"
            text="确定"
            @click="confirmService"
          />
        </view>
      </view>
    </u-popup>

    <!--  当该用户信息已存在时弹出该弹框  -->
    <VoModal
      :closeOnClickOverlay="true"
      :content="content"
      :show="showModalCancel"
      :showCancelButton="true"
      confirmText="去邀请"
      @cancel="close"
      @confirm="confirm"
    />
    <EraToastIcon :visible.sync="show" />
    <!-- 分享弹框 -->
    <VoShareQrCodeView ref="sharePop" :params="params" />
  </view>
</template>
<script>
  import VoShareQrCodeView from '@/components/VoShareView/VoShareQrCodeView'
  import { error, formatterHandle, getLocation, hideLoading, showLoading } from '@/common/helper'

  export default {
    name: 'CreateGarage',
    components: { VoShareQrCodeView },
    data() {
      return {
        currentService: [],
        serviceList: [],
        serviceShow: false,
        show: false,
        fileList: [],
        showAddress: false, // 是否显示选择地址
        showCarSeriesBoo: false, // 是否显示车系选择器
        carSeriesCurrent: [],
        carSeriesList: [],
        carAllSelect: 0,
        carServiceSelect: 0,
        showModalCancel: false, // 模态框
        content: '该用户信息已存在，请直接邀请',
        formData: {
          phone: '', // 联系电话
          nickname: '', // 负责人名称
          garageName: '', // 修理厂名称
          areaStr: '', // 所在地区
          detail: '', // 详细地址
          carSeries: '', // 车系
          stationNum: '', // 工位数量
          scale: '', // 规模（人）
        },
        params: {},
        requestParams: {},
        rules: {
          phone: [
            {
              type: 'number',
              required: true,
              message: '请输入联系电话',
              trigger: ['blur'],
            },
            {
              pattern: this.$vocenApi.Pattern.phone, // /^1[3456789][0-9]{9}$/g
              // 正则检验前先将值转为字符串
              transform(value) {
                return String(value)
              },
              message: '手机号格式不正确',
              trigger: ['blur'],
            },
          ],
          nickname: {
            type: 'string',
            required: true,
            message: '请输入负责人名称',
            trigger: ['blur'],
          },
          garageName: {
            type: 'string',
            required: true,
            message: '请输入修理厂名称',
            trigger: ['blur'],
          },
          areaStr: {
            type: 'string',
            required: true,
            message: '请选择所在地区',
            trigger: ['change'],
          },
          detail: {
            type: 'string',
            required: true,
            message: '请输入详细地址',
            trigger: ['blur'],
          },
          // serviceProject: {
          //   type: 'string',
          //   required: true,
          //   message: '请选择服务项目',
          //   trigger: ['blur', 'change'],
          // },
          // carSeriesProject: {
          //   type: 'number',
          //   required: true,
          //   message: '请选择主修车系',
          //   trigger: ['blur'],
          // },
        },
        isShare: false,
        id: null,
        isLoading: false,
        formatterInt: (value) => formatterHandle(value, 'int'),
        locationgTips: {
          message: '定位服务未开启，请在系统设置中开启定位服务',
          cancel: '取消',
          confirm: '去设置',
        },
      }
    },
    mounted() {
      this.getServiceList()
      this.getCarSeriesList()
    },
    onLoad(options) {
      this.id = options.id || null
      if (options.data) {
        let data = JSON.parse(options.data)
        Object.assign(this.requestParams, data)
        this.requestParams.inviterId = this.requestParams.companyId
        Object.assign(this.params, data)
        this.isShare = true
      }
      // this.params = {
      //   inviteUserId: this.userInfo.id,
      //   companyId: this.userInfo.companyId,
      //   phone: this.formData.phone,
      //   roleCode: 'garage ',
      //   userName: this.userInfo.userName,
      // }
    },
    methods: {
      carServiceOpen() {
        if (this.currentService.length === this.serviceList.length - 1) {
          this.currentService.push(this.carServiceSelect)
        }
      },
      carSeriesOpen() {
        if (this.carSeriesCurrent.length === this.carSeriesList.length - 1) {
          this.carSeriesCurrent.push(this.carAllSelect)
        }
      },
      cancelCurrentServiceHandler() {
        this.currentService.length = 0
        this.serviceShow = false
      },
      cancelChooseCarSeriesHandler() {
        this.carSeriesCurrent.length = 0
        this.showCarSeriesBoo = false
      },
      chooseAddress() {
        if (this.id || this.isLoading) return
        this.showAddress = true
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
      formateServiceProject(val) {
        if (!val) {
          return ''
        }
        const arr = val.split(',')
        return arr
          .map((item) => {
            return this.serviceList.find((value) => value.code == item).name
          })
          .join()
      },
      selectService(val) {
        const index = this.currentService.findIndex((item) => item === val.code)
        if (index === -1) {
          console.log(val.code, '1234')
          if (val.code === this.carAllSelect) {
            this.currentService = []
            this.serviceList.forEach((item) => this.currentService.push(item.code))
          } else {
            this.currentService.push(val.code)
            if (this.currentService.length === this.serviceList.length - 1) {
              this.currentService.push(this.carServiceSelect)
            }
          }
        } else {
          if (val.code === this.carAllSelect) {
            this.currentService = []
          } else {
            this.currentService.splice(index, 1)
            const pos = this.currentService.findIndex((item) => item === this.carAllSelect)
            if (pos !== -1) {
              this.currentService.splice(pos, 1)
            }
          }
        }
        console.log(this.currentService, 'currentService')
        this.noCurrentService = this.currentService.length === 0
      },
      selectSeries(val) {
        const index = this.carSeriesCurrent.findIndex((item) => item === val.value)
        if (index === -1) {
          if (val.value === this.carAllSelect) {
            this.carSeriesCurrent = []
            this.carSeriesList.forEach((item) => this.carSeriesCurrent.push(item.value))
          } else {
            this.carSeriesCurrent.push(val.value)
            if (this.carSeriesCurrent.length === this.carSeriesList.length - 1) {
              this.carSeriesCurrent.push(this.carAllSelect)
            }
          }
        } else {
          if (val.value === this.carAllSelect) {
            this.carSeriesCurrent = []
          } else {
            this.carSeriesCurrent.splice(index, 1)
            const pos = this.carSeriesCurrent.findIndex((item) => item === this.carAllSelect)
            if (pos !== -1) {
              this.carSeriesCurrent.splice(pos, 1)
            }
          }
        }
        this.noCarSeriesCurrent = this.carSeriesCurrent.length === 0
      },
      confirmSeries() {
        // if (!this.carSeriesCurrent.length) {
        //   this.$u.toast('请选择主修车系')
        //   return
        // }
        const pos = this.carSeriesCurrent.findIndex((item) => item === this.carAllSelect)
        if (pos !== -1) {
          this.carSeriesCurrent.splice(pos, 1)
        }
        this.formData.carSeriesProject =
          this.carSeriesCurrent && this.carSeriesCurrent.length ? this.carSeriesCurrent.join() : ''
        this.showCarSeriesBoo = false
      },
      confirmService() {
        // if (!this.currentService.length) {
        //   this.$u.toast('请选择服务项目')
        //   return
        // }
        const pos = this.currentService.findIndex((item) => item === this.carServiceSelect)
        if (pos !== -1) {
          this.currentService.splice(pos, 1)
        }
        this.formData.serviceProject =
          this.currentService && this.currentService.length ? this.currentService.join() : ''
        this.serviceShow = false
      },
      /**
       * 手机号验证
       */
      checkPhone() {
        if (this.isLoading) return
        if (this.formData.phone.toString().length < 11) {
          uni.$u.toast('请输入正确的手机号')
          return
        }
        if (!this.$vocenApi.Pattern.isPhone(this.formData.phone)) {
          uni.$u.toast('请输入正确的手机号')
          return
        }
        this.isLoading = !this.isLoading
        showLoading()
        this.$VoHttp
          .apiCompanyInvitationCheckGarage({ mobile: this.formData.phone })
          .then((res) => {
            console.log(res)
          })
          .catch((e) => {
            if (e.code === 'U1101') {
              let params = {}
              // params.type = 2 // 类型： 1、通联绑定；2、关系绑定
              // this.params.userPhone = this.formData.phone
              params.phone = this.formData.phone
              params.inviteeId = e.data.inviteeId
              params.inviterId = e.data.inviterId
              params.inviteUserId = this.userInfo.id
              params.userName = this.userInfo.userName
              this.params = params
              console.log(this.params)
              this.showModalCancel = true
              // this.$refs.sharePop.showShare('/pagesAgent/TokerDistrict/RegisterPage')
            } else {
              error(e.message || '请求失败')
              //   setTimeout(() => {
              //     this.$linkToEasy(`../HomePage/AuthenticationCompleted?state=3&title=邀请失败`)
              //   }, 1500)
            }
          })
          .finally(() => {
            hideLoading()
            this.isLoading = !this.isLoading
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
       * 选择详细地址
       */
      async openLocation() {
        if (this.id || this.isLoading) {
          return
        }
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
            this.formData.detail = info.name
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
       * picker点击确定按钮返回当前单列选择的值
       */
      confirmRole(e) {
        console.log(e, 'eeeeeeeeeeeeeeee')
        this.roleShow = false
        this.formData.carSystem = e.indexs[0]
      },
      /**
       * 模态框点击取消按钮时触发
       */
      close() {
        this.showModalCancel = false
      },
      /**
       * 模态框点击确认按钮时触发
       */
      confirm() {
        this.close()
        // this.$refs.sharePop.showShare(true)
        let router = '/pagesAgent/TokerDistrict/RegisterPage'
        this.$linkToEasy(
          `/pagesCommon/SharePoste/SharePoste?params=${JSON.stringify(
            this.params,
          )}&router=${router}`,
        )
      },
      uploadSuccess() {
        this.videoSrc = ''
      },
      /**
       * @description 确定事件
       */
      async btnSureFn() {
        const asd = await this.$refs.form.validate()
        //this.showModalCancel = true
        if (!this.$vocenApi.Pattern.isPhone(this.formData.phone)) {
          uni.$u.toast('请输入正确的手机号')
          return
        }
        let param = {
          address: this.formData.detail,
          areaCode: this.formData.areaCode,
          serviceProject: this.formData.serviceProject,
          carSeries: this.formData.carSeriesProject,
          contractName: this.formData.nickname,
          contractPhone: this.formData.phone,
          // latitude: this.formData.latitude,
          locationNumber: this.formData.stationNum,
          // longitude: this.formData.longitude,
          scale: this.formData.scale,
          storeName: this.formData.garageName,
          storeUrl: this.fileList[0]?.src || '',
        }
        showLoading('加载中')
        let data
        try {
          data = await this.$VoHttp.apiCompanyInvitationGarage(param)
          console.log(data, 'apiCompanyInvitationGarage')
          if (!data) return
          if (+data.code === 20001) {
            // toast('新增成功')
            this.show = true
            setTimeout(() => {
              // this.$linkToEasy(
              //   `../HomePage/AuthenticationCompleted?state=1&origin=1&title=邀请完成`,
              // )
              // this.$backFn()
              if (this.userInfo.roleCode === 'agent') {
                this.$linkToEasy(`/pagesAgent/TokerDistrict/MyGarage`)
              } else {
                this.$linkToEasy(`/pagesChannelManager/GarageModule/GarageManager`)
              }
            }, 1500)
          }
        } catch (e) {
          if (e.code === 'U1101') {
            let params = {}
            // params.type = 2 // 类型： 1、通联绑定；2、关系绑定
            // this.params.userPhone = this.formData.phone
            params.phone = this.formData.phone
            params.inviteeId = e.data.inviteeId
            params.inviterId = e.data.inviterId
            params.inviteUserId = this.userInfo.id
            params.userName = this.userInfo.userName
            this.params = params
            console.log(this.params)
            this.showModalCancel = true
          } else if (e.code == 'S0100') {
            error(e.message || '请求失败')
          } else {
            error(e.message || '请求失败')
            // setTimeout(() => {
            //   this.$linkToEasy(`../HomePage/AuthenticationCompleted?state=3&title=邀请失败`)
            // }, 1500)
          }
        } finally {
          hideLoading()
        }
      },
      async getServiceList() {
        const res = await this.$VoHttp.apiCompanyInfoServiceProject()
        if (!res || !res.data) return
        this.serviceList = []
        //全选的value值为this.carServiceSelect(0) 若有数据的value也为0请改为其他
        this.serviceList.push({ name: '全部项目', code: this.carServiceSelect })
        this.serviceList.push(...res.data)
        console.log(this.serviceList, 'serviceList')
      },
      async getCarSeriesList() {
        const res = await this.$VoHttp.apiCompanyInfoSerialDic()
        if (!res || !res.data) return
        this.carSeriesList = []
        //全选的value值为this.carAllSelect(0) 若有数据的value也为0请改为其他
        this.carSeriesList.push({ name: '全部车系', value: this.carAllSelect })
        this.carSeriesList.push(...res.data)
      },
      /**
       * 获取基本信息数据
       */
      async getBaseData() {
        showLoading()
        try {
          const data = await this.$VoHttp.apiCompanyInfoManagerGarageInfo({
            inviterId: this.userInfo.companyId,
            companyId: this.id,
          })
          if (!data || !data.data) return
          console.log('GarageInfo')
          console.log(data, 'GarageInfo')
          if (+data.data === 20001) {
            this.formData = {
              detail: data.address,
              areaCode: data.areaCode,
              areaStr: data.areaCodeStr,
              carSeries: Number(data.carSeries) - 1,
              nickname: data.contractName,
              phone: data.contractPhone,
              // latitude: data.latitude,
              stationNum: data.locationNumber,
              // longitude: data.longitude,
              scale: data.scale,
              garageName: data.storeName,
              fileList: [{ type: 1, url: data.storeUrl }],
            }
            this.$forceUpdate()
          } else {
            error(data.message || '请求失败')
          }
        } catch (e) {
          console.log(e)
          error(e.message || '请求失败')
        }
        hideLoading()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .garage {
    width: 750rpx;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    &-form {
      margin-top: 16rpx;
      padding: 0 32rpx 0 48rpx;
      box-sizing: border-box;
      background: #ffffff;
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
        .item-placeholder {
          color: $v-c0-25 !important;
          font-size: 32rpx !important;
        }
      }
      &__word {
        font-size: 32rpx;
        color: $v-c0-85;
      }
      &__label {
        padding-top: 24rpx;
        font-size: 32rpx;
        position: relative;
        .label-star {
          position: absolute;
          left: -16rpx;
          top: 24rpx;
          color: $v-error;
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
    }
    &-upload {
      margin-top: 16rpx;
      background: #fff;
      &__name {
        width: 686rpx;
        height: 48rpx;
        line-height: 48rpx;
        // margin: 0 32rpx 0 0;
        padding-top: 24rpx;
        box-sizing: border-box;
        .name-left {
          font-weight: bold;
          font-size: 32rpx;
          color: $v-c0-85;
        }
        .name-right {
          font-size: 28rpx;
          color: $v-c0-25;
        }
      }
      &__pictures {
        margin-top: 32rpx;
        // padding: 0 16rpx 8rpx 32rpx;
        box-sizing: border-box;
        .pictures-img {
          width: 218rpx;
          height: 218rpx;
          margin: 0 16rpx 16rpx 0;
        }
      }
    }
    &-footer {
      height: 132rpx;
      line-height: 132rpx;
      border-top: 2rpx solid rgba(24, 34, 65, 0.08);
      width: 100%;
      background: $v-bg-white;

      &__button {
        width: 656rpx;
        height: 92rpx;
        margin: auto;
      }

      &__color {
        color: $v-c0-25 !important;
      }
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
</style>
<style scoped>
  ::v-deep .u-popup__content {
    border-top-left-radius: 16rpx;
    border-top-right-radius: 16rpx;
  }
</style>
