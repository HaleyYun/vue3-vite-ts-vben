<template>
  <view
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
    class="uploaded p-b-safe-area"
  >
    <view class="create flex-column">
      <VoNav :title="id ? '修改供应商资料' : '创建供应商'" is-fixed is-have-more>

      </VoNav>
      <!--  步骤条模块：start  -->
      <ArticleSteps :current="current" />
      <!--  步骤条模块：end  -->

      <!--  步骤一模块：start  -->
      <view v-if="current === 0" class="flex1 overflow-y">
        <EraForm
          ref="form"
          :model="formData"
          :rules="rules"
          class="create-form"
          labelPosition="left"
          labelWidth="130"
        >
          <EraFormItem
            class="create-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="联系电话"
            prop="mobile"
          >
            <u-input
              v-model.number="formData.mobile"
              :readonly="!!id"
              autoHeight
              border="none"
              class="item-input"
              color="rgba(0, 0, 0, 0.85)"
              fontSize="16px"
              inputAlign="right"
              maxlength="11"
              placeholder="请输入供应商手机号"
              placeholderClass="create-form__placeholder"
              type="number"
              @blur="checkPhone"
            />
          </EraFormItem>
          <!--          <EraFormItem-->
          <!--            class="create-form__item"-->
          <!--            color="rgba(0, 0, 0, 0.85)"-->
          <!--            label="名称"-->
          <!--            prop="nickName"-->
          <!--            required-->
          <!--          >-->
          <!--            <u&#45;&#45;input-->
          <!--              v-model.number="formData.nickName"-->
          <!--              :readonly="id"-->
          <!--              autoHeight-->
          <!--              border="none"-->
          <!--              class="item-input"-->
          <!--              color="rgba(0, 0, 0, 0.85)"-->
          <!--              fontSize="16px"-->
          <!--              inputAlign="right"-->
          <!--              maxlength="11"-->
          <!--              placeholder="请输入用户昵称"-->
          <!--              placeholderClass="create-form__placeholder"-->
          <!--            />-->
          <!--          </EraFormItem>-->
          <EraFormItem
            class="create-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="所在地区"
            prop="areaCode"
            required
            @click="chooseAddress"
          >
            <view v-if="formData.areaStr" class="flex1 create-form__box m-r-8">{{
              formData.areaStr
            }}</view>
            <view v-else class="flex1 create-form__box color-block-25 m-r-16">
              请选择省、市、区/县
            </view>
            <!--     <u-input     -->
            <!--      v-model.trim="formData.areaStr"      -->
            <!--      border="none"      -->
            <!--      class="create-input m-r-16"      -->
            <!--      color="rgba(0, 0, 0, 0.85)"      -->
            <!--      fontSize="16px"      -->
            <!--      inputAlign="right"      -->
            <!--     placeholder="请选择所在地址"       -->
            <!--      placeholderClass="create-form__placeholder"      -->
            <!--     />     -->
<!--            <VoIcon :opacity="0.25" name="right-arrow" />-->
            <VoIcon :size="20" color="#373A4E" name="address" @click.native.stop="detailFn" />
          </EraFormItem>
          <view class="create-form__label"><view class="label-star">*</view>详细地址</view>
          <EraFormItem
            class="create-form__item custom"
            color="rgba(0, 0, 0, 0.85)"
            label=""
            labelWidth="0"
            prop="detail"
          >
            <textarea
              v-model.trim="formData.detail"
              :disabled="!!id"
              auto-height
              class="item-textarea"
              maxlength="100"
              placeholder="小区楼栋/乡村名称"
              placeholder-class="item-placeholder"
            ></textarea>
            <VoIcon
              v-if="formData.detail"
              :opacity="0.45"
              :size="20"
              color="#000000"
              name="close-fill"
              @click="closeDetail"
            />
<!--            <VoIcon v-else :size="20" color="#373A4E" name="address" @click="detailFn" />-->
            <!--     <image class="item-icon m-l-8" src="/static/created/product/delete.png" />     -->
          </EraFormItem>
        </EraForm>
      </view>
      <!--  步骤一模块：end  -->

      <!--  H5注册：start  -->
      <view v-if="isShare" class="main-checkbox">
        <view class="main-checkbox__input" @click="isAccept = !isAccept">
          <VoIcon v-if="isAccept" :size="24" color="#FF5319" name="success-fill" />
          <VoIcon v-else :size="24" name="address_select" />
        </view>
        <view class="main-checkbox__text">
          我已阅读并同意
          <span
            class="text-a"
            @click="goWebView('/pages/CommonWeb/UserPolicy')"
            >《用户协议》</span
          >
          <span class="text-a" @click="goWebView('/pages/CommonWeb/PrivacyPolicy')">《隐私政策》</span>
          <!--            <span class="text-a">《联通统一认证服务条款》</span>-->
          ；未注册的手机号将自动注册
        </view>
      </view>
      <!--  H5注册：end  -->

      <!--  步骤二模块：start  -->
      <view v-if="current === 1" class="flex1 overflow-y m-t-16">
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
          class="create-form"
          labelPosition="left"
          labelWidth="118"
        >
          <EraFormItem
            key="fullName"
            class="create-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="营业执照名称"
            prop="fullName"
            required
          >
            <u--input
              v-model.trim="formData.fullName"
              border="none"
              disabledColor="#ffffff"
              fontSize="16px"
              inputAlign="right"
              placeholder="请输入营业执照名称"
              placeholderClass="create-form__placeholder"
            />
          </EraFormItem>
          <EraFormItem
            class="create-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="统一信用代码"
            prop="businessLicense"
            required
          >
            <u-input
              v-model.trim="formData.businessLicense"
              border="none"
              class="item-input"
              color="rgba(0, 0, 0, 0.85)"
              fontSize="16px"
              inputAlign="right"
              placeholder="请输入统一信用代码"
              placeholderClass="create-form__placeholder"
            />
          </EraFormItem>
          <EraFormItem
            class="create-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="法人姓名"
            prop="legalName"
            required
          >
            <u-input
              v-model.trim="formData.legalName"
              border="none"
              class="item-input"
              color="rgba(0, 0, 0, 0.85)"
              fontSize="16px"
              inputAlign="right"
              placeholder="请输入法人姓名"
              placeholderClass="create-form__placeholder"
            />
          </EraFormItem>
          <EraFormItem
            class="create-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="店铺简称"
            prop="storeName"
            required
          >
            <u--input
              v-model.trim="formData.storeName"
              border="none"
              color="rgba(0, 0, 0, 0.85)"
              fontSize="16px"
              inputAlign="right"
              placeholder="请输入店铺简称"
              placeholderClass="create-form__placeholder"
            />
          </EraFormItem>
          <EraFormItem
            class="create-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="营业期限"
            required
          >
            <view class="flex flex1 flex-justify-r">
              <view
                :class="{ 'color-gray': !formData.businessLicenseStartDate }"
                class="create-form__word"
                @click="startShow = true"
                >{{
                  formData.businessLicenseStartDate ? formData.businessLicenseStartDate : nowDate
                }}
              </view>
              <view class="create-form__word m-l-16 m-r-16">至</view>
              <view
                :class="{ 'color-gray': !formData.businessLicenseEndDate }"
                class="create-form__word"
                @click="endShow = true"
                >{{ formData.businessLicenseEndDate ? formData.businessLicenseEndDate : nowDate }}
              </view>
            </view>
          </EraFormItem>
        </EraForm>
        <!--  企业信息模块：end  -->
        <!--  企业LOGO模块：start  -->
        <view class="create-logo">
          <view class="create-logo__name"><text class="red-required"> *</text>企业LOGO</view>
          <UploadLogo :default-url="formData.storeUrl" @success="successStoreUrlFn" />
        </view>
        <!--  企业LOGO模块：end  -->
      </view>
      <!--  步骤二模块：end  -->

      <!--  步骤三模块：start  -->
      <view v-else-if="current === 2" class="flex1 overflow-y">
        <view class="view-holder" />
        <!--  上传照片模块：start  -->
        <UploadPhotos
          :twoPhotos="true"
          :upPhoto="twoPhotosList"
          class="m-t-16"
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
          class="create-form"
          labelPosition="left"
          labelWidth="118"
        >
          <EraFormItem
            class="create-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="姓名"
            prop="legalName"
            required
          >
            <u-input
              v-model.trim="formData.legalName"
              border="none"
              class="item-input"
              color="rgba(0, 0, 0, 0.85)"
              fontSize="16px"
              inputAlign="right"
              placeholder="请输入您的姓名"
              placeholderClass="create-form__placeholder"
            />
          </EraFormItem>
          <EraFormItem
            class="create-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="身份证号"
            prop="legalId"
            required
          >
            <u--input
              v-model.trim="formData.legalId"
              border="none"
              disabledColor="#ffffff"
              fontSize="16px"
              inputAlign="right"
              maxlength="18"
              placeholder="请输入身份证号"
              placeholderClass="create-form__placeholder"
            />
          </EraFormItem>
          <EraFormItem
            class="create-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="身份证有效期"
            required
          >
            <view class="flex flex1 flex-justify-r">
              <view
                :class="{ 'color-gray': !formData.legalStartDate }"
                class="create-form__word"
                @click="startFormShow = true"
                >{{ formData.legalStartDate ? formData.legalStartDate : nowDate }}
              </view>
              <view class="create-form__word m-l-8 m-r-8">至</view>
              <view
                :class="{ 'color-gray': !formData.legalEndDate }"
                class="create-form__word"
                @click="endFormShow = true"
                >{{ formData.legalEndDate ? formData.legalEndDate : nowDate }}
              </view>
            </view>
          </EraFormItem>
        </EraForm>
        <EraForm
          ref="form3"
          :model="formData"
          :rules="rules3"
          class="create-form"
          labelPosition="left"
          labelWidth="128"
        >
          <view class="create-set">设置对公账户</view>
          <EraFormItem
            class="create-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="开户银行名称"
            prop="parenBankName"
            required
          >
            <u--input
              v-model.trim="formData.parenBankName"
              border="none"
              disabledColor="#ffffff"
              fontSize="16px"
              inputAlign="right"
              placeholder="请输入开户银行名称"
              placeholderClass="create-form__placeholder"
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
            class="create-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="支行名称"
            prop="bankName"
            required
          >
            <u--input
              v-model.trim="formData.bankName"
              border="none"
              disabledColor="#ffffff"
              fontSize="16px"
              inputAlign="right"
              placeholder="如：中国银行郑州花园路支行"
              placeholderClass="create-form__placeholder"
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
            class="create-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="银行账号"
            prop="accountNo"
            required
          >
            <u-input
              v-model.trim="formData.accountNo"
              border="none"
              class="item-input"
              color="rgba(0, 0, 0, 0.85)"
              fontSize="16px"
              inputAlign="right"
              placeholder="请输入银行账号"
              placeholderClass="create-form__placeholder"
              type="number"
            />
          </EraFormItem>
        </EraForm>
        <!--  企业信息模块：end  -->
      </view>
      <!--  步骤三模块：end  -->

      <!--  步骤一底部固定模块：start  -->
      <view v-if="current === 0" class="create-bottom">
        <block v-if="isShare">
          <EraButton
            v-if="formData.mobile && formData.detail && formData.areaStr && isAccept"
            circle
            text="下一步"
            @click="firstNextStep"
          />
          <EraButton v-else circle disabled text="下一步" />
        </block>
        <block v-else>
          <EraButton
            v-if="formData.mobile && formData.detail && formData.areaStr"
            circle
            text="下一步"
            @click="firstNextStep"
          />
          <EraButton v-else circle disabled text="下一步" />
        </block>
        <VoSafetyArea :is-fixed="false" />
        <!--        <view class="p-b-safe-area" />-->
      </view>
      <!--  步骤一底部固定模块：end  -->

      <!--  步骤二底部固定模块：start  -->
      <view
        v-else-if="current === 1"
        class="create-footer flex flex-justify-between flex-vertical-c p-b-safe-area"
      >
<!--        <EraButton size="small" text="上一步" themeType="default" @click="lastStep"></EraButton>-->
        <view class="self-button" @click="lastStep">上一步</view>
        <EraButton
          v-if="
            formData.fullName &&
            formData.businessLicenseStartDate &&
            formData.businessLicense &&
            formData.legalName &&
            formData.storeUrl &&
            formData.storeName
          "
          size="small"
          text="下一步"
          @click="nextStep"
        />
        <EraButton v-else size="small" text="下一步" disabled></EraButton>
      </view>
      <!--  步骤二底部固定模块：end  -->

      <!--  步骤三底部固定模块：start  -->
      <view
        v-else-if="current === 2"
        class="create-footer flex flex-justify-between flex-vertical-c p-b-safe-area"
      >
<!--        <EraButton size="small" text="上一步" themeType="default" @click="lastStep"></EraButton>-->
        <view class="self-button" @click="lastStep">上一步</view>
        <EraButton
          v-if="
            formData.legalId &&
            formData.legalStartDate &&
            formData.businessLicenseEndDate &&
            formData.accountNo &&
            formData.bankName &&
            formData.parenBankName
          "
          size="small"
          text="提交信息"
          @click="submitInfo"
        />
        <EraButton v-else disabled size="small" text="提交信息" />
      </view>
      <!--  步骤三底部固定模块：end  -->
    </view>
    <u-datetime-picker
      :maxDate="3740967920000"
      :minDate="332747120000"
      :show="startShow"
      :value="formData.businessLicenseStartDate ? formData.businessLicenseStartDate : nowDate"
      cancelColor="rgba(0, 0, 0, 0.45)"
      confirmColor="#22284B"
      mode="date"
      closeOnClickOverlay
      title="日期选择器"
      @cancel="cancelStart"
      @confirm="confirmStart"
    />

    <u-datetime-picker-era
      :maxDate="3740967920000"
      :minDate="332747120000"
      :show="endShow"
      :show-diy="true"
      :value="formData.businessLicenseEndDate ? formData.businessLicenseEndDate : nowDate"
      cancelColor="rgba(0, 0, 0, 0.45)"
      confirmColor="#22284B"
      mode="date"
      title="日期选择器"
      @cancel="endShow = false"
      @confirm="confirmEnd"
    />

    <u-datetime-picker
      :maxDate="3740967920000"
      :minDate="332747120000"
      :show="startFormShow"
      :value="formData.legalStartDate || nowDate"
      cancelColor="rgba(0, 0, 0, 0.45)"
      confirmColor="#22284B"
      mode="date"
      closeOnClickOverlay
      title="日期选择器"
      @cancel="startFormShow = false"
      @confirm="confirmFormStart"
    />

    <u-datetime-picker-era
      :maxDate="3740967920000"
      :minDate="332747120000"
      :show="endFormShow"
      :show-diy="true"
      :value="formData.legalEndDate || nowDate"
      cancelColor="rgba(0, 0, 0, 0.45)"
      confirmColor="#22284B"
      mode="date"
      title="日期选择器"
      @cancel="endFormShow = false"
      @confirm="confirmFormEnd"
    />
    <VoAddress :show.sync="showAddress" @sureFn="sureFn" />
    <EraToastIcon :visible.sync="show" />
    <VoShareQrCodeView ref="sharePop" :params="shareParams" />
  </view>
</template>

<script>
  import ArticleSteps from './components/ArticleSteps'
  import UploadPhotos from './components/UploadPhotos'
  import WarmPrompt from './components/WarmPrompt'
  import UploadLogo from './components/UploadLogo'
  import { chooseImageOcrByPromise, error, getLocation, hideLoading, showLoading, toast } from "@/common/helper";
  import devConf from "@/common/env";

  export default {
    name: 'CreateSupplier',
    components: { ArticleSteps, UploadPhotos, WarmPrompt, UploadLogo },
    data() {
      return {
        id: null, // 供应商资料id
        show: false,
        shareParams: {},
        current: 0,
        startFormShow: false,
        endFormShow: false,
        startShow: false, // 开始日期选择器弹框
        nowDate: this.$vocenApi.VoUtils.timeFormat(new Date(), 'yyyy-mm-dd'),
        endShow: false, // 结束日期选择器弹框
        showAddress: false, // 是否显示选择地址
        upPhotoList: {
          defaultFirstSrc: '/static/created/certify/not_uploaded.png',
          firstSrc: '',
          firstContent: '拍照上传您的营业执照',
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
        twoPhotosList: {
          defaultFirstSrc: '/static/created/certify/positive.png',
          firstSrc: '',
          firstContent: '拍照上传您的身份证正面',
          defaultSecondSrc: '/static/created/certify/back.png',
          secondSrc: '',
          secondContent: '拍照上传您的身份证反面',
        },
        parenBankList: [],
        bankList: [],
        showParenBankSelect: false,
        showBankSelect: false,
        formData: {
          mobile: '', // 供应商手机号
          areaStr: '', // 所在地区
          // nickName: '', // 昵称
          areaCode: '', // 地区code
          detail: '', // 详细地址
          fullName: '', // 营业执照名称
          businessLicenseStartDate: '', // 营业执照开始时间
          businessLicenseEndDate: '', // 营业执照结束时间
          legalStartDate: '', // 身份证有效期开始时间
          legalEndDate: '', // 身份证有效期结束时间
          businessLicense: '', // 统一信用代码
          legalName: '', // 法人姓名
          storeName: '', // 店铺简称
          storeUrl: '', //店铺url
          legalId: '', // 身份证号
          accountNo: '', // 银行账号
          bankName: '', // 开户行支行名称
          parenBankName: '', // 开户行名称
          businessLicenseUrl: '', // 营业执照证图片地址
          legalIdCardBack: '', // 法人身份证反面
          legalIdCardFront: '', // 法人身份证正面
          companyType: 2,
        },
        rules: {
          mobile: [
            {
              type: 'number',
              required: true,
              message: '请输入供应商手机号',
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
          areaCode: {
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
          // nickName: {
          //   type: 'string',
          //   required: true,
          //   message: '请输入用户昵称',
          //   trigger: ['blur'],
          // },
        },
        rules1: {
          fullName: {
            type: 'string',
            required: true,
            message: '请输入营业执照名称',
            trigger: ['blur'],
          },
          businessLicense: {
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
          legalName: {
            type: 'string',
            required: true,
            message: '请输入您的姓名',
            trigger: ['blur'],
          },
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
        },
        rules3: {
          accountNo: {
            type: 'string',
            required: true,
            message: '请输入银行账号',
            trigger: ['blur'],
          },
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
        // latitude: '', // 经度
        // longitude: '', // 纬度
        requestParams: {}, // H5注册参数
        isAccept: false, // 是否同意协议
        isLoading: false,
        isShare: false,
        locationgTips: {
          message: '定位服务未开启，请在系统设置中开启定位服务',
          cancel: '取消',
          confirm: '去设置',
        },
      }
    },
    methods: {
      chooseAddress() {
        if (this.id || this.isLoading) return
        this.showAddress = true
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
      async detailFn() {
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
       * 清空详细地址栏
       */
      closeDetail() {
        this.formData.detail = ''
      },
      /**
       * 上传营业执照
       */
      uploadBusiness() {
        chooseImageOcrByPromise({ count: 1, formData: { type: 2 }, tip: '识别中' }).then((res) => {
          const result = JSON.parse(res.data)
          if (+result.code === 20001) {
            this.formData.businessLicense = result.data.regNum // 统一社会信用代码（三合一之前为注册号）
            this.formData.fullName = result.data.companyName // 营业执照名称
            // this.formData.code = result.data.regNum // 统一信用代码
            this.formData.legalName = result.data.person // 法人名称
            this.formData.businessLicenseUrl = result.data.url // 图片地址
            this.upPhotoList.firstSrc = result.data.url

            if (result.data.period) {
              let period = result.data.period.split('至')
              console.log(period, '88888888888888')
              this.formData.businessLicenseStartDate =
                period[0].substr(0, 4) +
                '-' +
                period[0].substr(5, 2) +
                '-' +
                period[0].substr(8, 2).replace('日', '')
              if (period[1] === '长期') {
                this.formData.businessLicenseEndDate = period[1]
              } else {
                this.formData.businessLicenseEndDate =
                  period[1].substr(0, 4) +
                  '-' +
                  period[1].substr(5, 2) +
                  '-' +
                  period[1].substr(8, 2).replace('日', '')
              }
            }
          } else if (Number(result.code) === 40005) {
            //图片识别失败
            // this.upPhotoList.firstSrc = result.data.url
            uni.$u.toast(result.message)
          } else {
            uni.$u.toast(result.message)
          }
        }).catch((err) => {
          if (!err.errMsg) {
            this.$u.toast(err.message || '网络错误')
          }
        })
      },
      cancelStart() {
        this.startShow = false
      },
      /**
       * confirm  选择开始时间
       * @param e
       */
      confirmStart(e) {
        let date = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd')
        if (this.formData.businessLicenseEndDate && date > this.formData.businessLicenseEndDate) {
          this.$u.toast('开始时间不能大于结束时间')
        } else {
          this.startShow = false
          console.log(this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd'), 'sss', date)
          this.formData.businessLicenseStartDate = date
        }
      },
      cancelEnd() {
        this.endShow = false
      },
      /**
       * 选择结束时间
       * @param e
       */
      confirmEnd(e) {
        if (+e.value === 1) {
          this.endShow = false
          this.formData.businessLicenseEndDate = '无固定期限'
        } else {
          let date = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd')
          if (
            this.formData.businessLicenseStartDate &&
            date < this.formData.businessLicenseStartDate
          ) {
            this.$u.toast('结束时间不能小于开始时间')
          } else {
            this.endShow = false
            this.formData.businessLicenseEndDate = date
          }
        }
      },
      confirmFormStart(e) {
        let date = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd')
        if (this.formData.legalEndDate && date > this.formData.legalEndDate) {
          this.$u.toast('结束时间不能小于开始时间')
        } else {
          this.startFormShow = false
          this.formData.legalStartDate = date
        }
      },
      confirmFormEnd(e) {
        if (+e.value === 1) {
          this.endFormShow = false
          this.formData.legalEndDate = '无固定期限'
        } else {
          let date = this.$vocenApi.VoUtils.timeFormat(e.value, 'yyyy-mm-dd')
          if (this.formData.legalStartDate && date < this.formData.legalStartDate) {
            this.$u.toast('结束时间不能小于开始时间')
          } else {
            this.endFormShow = false
            this.formData.legalEndDate = date
          }
        }
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
        chooseImageOcrByPromise({ count: 1, formData: { type: 1 }, tip: '识别中' }).then((res) => {
          const result = JSON.parse(res.data)
          console.log(res, 'resres', result)

          if (+result.code === 20001) {
            this.formData.legalName = result.data.name // 法人身份证姓名
            this.formData.legalId = result.data.idNum // 法人身份证号
            this.formData.legalIdCardFront = result.data.url // 身份证正面图
            this.twoPhotosList.firstSrc = result.data.url
          } else if (Number(result.code) === 40005) {
            //图片识别失败
            // this.twoPhotosList.firstSrc = result.data.url
            uni.$u.toast(result.message)
          } else {
            uni.$u.toast(result.message)
          }
        }).catch((err) => {
          if (!err.errMsg) {
            this.$u.toast(err.message || '网络错误')
          }
        })
      },
      /**
       *  上传身份证反面
       */
      uploadCardNo() {
        chooseImageOcrByPromise({ count: 1, formData: { type: 1 }, tip: '识别中' }).then((res) => {
          const result = JSON.parse(res.data)

          if (+result.code === 20001) {
            this.formData.validity = result.data.validDate
            this.formData.legalIdCardBack = result.data.url
            this.twoPhotosList.secondSrc = result.data.url

            let validDate = result.data.validDate.split('-')
            console.log(validDate, '99999999')
            this.formData.legalStartDate =
              validDate[0].substr(0, 4) +
              '-' +
              validDate[0].substr(5, 2) +
              '-' +
              validDate[0].substr(8, 2)
            if (validDate[1] === '长期') {
              this.formData.legalEndDate = validDate[1]
            } else {
              this.formData.legalEndDate =
                validDate[1].substr(0, 4) +
                '-' +
                validDate[1].substr(5, 2) +
                '-' +
                validDate[1].substr(8, 2)
            }
          } else if (Number(result.code) === 40005) {
            //图片识别失败
            // this.twoPhotosList.secondSrc = result.data.url
            uni.$u.toast(result.message)
          } else {
            uni.$u.toast(result.message)
          }
        }).catch((err) => {
          if (!err.errMsg) {
            this.$u.toast(err.message || '网络错误')
          }
        })
      },
      /**
       * 开户行银行名称
       * @param e
       */
      changeParenBankFn(e) {
        this.formData.parenBankName = e
        let that = this
        uni.$u.debounce(() => {
          that.initBankFn('init')
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
       * 开户行支行名称
       * @param e
       */
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
      selectBankFn(item) {
        this.formData.bankName = item.bankName
        this.formData.unionBank = item.unionBank
        this.showBankSelect = false
      },
      /**
       * 上一步
       */
      lastStep() {
        this.current = this.current - 1
      },
      /**
       * 下一步
       */
      nextStep() {
        if (this.formData.businessLicenseStartDate > this.formData.businessLicenseEndDate) {
          uni.$u.toast('开始日期不能大于结束日期')
          return false
        } else {
          this.current = this.current + 1
          uni.pageScrollTo({
            scrollTop: 0,
            duration: 300,
          })
        }
      },
      /**
       * 手机号验证
       */
      async checkPhone() {
        if (this.isLoading) return
        if (this.formData.mobile.toString().length < 11) {
          uni.$u.toast('请输入正确的手机号')
          return
        }
        if (!this.$vocenApi.Pattern.isPhone(this.formData.mobile)) {
          uni.$u.toast('请输入正确的手机号')
          return
        }
        this.isLoading = !this.isLoading
        console.log(this.shareParams)
        showLoading()
        let data
        let param = { mobile: this.formData.mobile }
        try {
          if (this.isShare) {
            param.inviterId = this.shareParams.companyId
            data = await this.$VoHttp.apiCompanyInvitationH5CheckSupplier(param)
          } else {
            data = await this.$VoHttp.apiCompanyInvitationCheckSupplier(param)
          }
          if (!data || !data.data) {
            this.isLoading = !this.isLoading
            return
          }
          console.log(data)
        } catch (e) {
          if (e.code === 'U1101') {
            this.shareParams.type = 2 // 类型： 1、通联绑定；2、关系绑定
            this.shareParams.userPhone = this.formData.mobile
            this.shareParams.inviteeId = e.data.inviteeId
            this.shareParams.inviterId = e.data.inviterId
            this.shareParams.inviteUserId = e.data.userId
            this.shareParams.state = 0
            if (this.isShare) {
              // 如果是h5，直接跳转建立绑定关系
              setTimeout(() => {
                this.$linkToEasy(
                  `./AuthenticationCompleted?data=${JSON.stringify(this.shareParams)}`,
                )
              }, 1500)
            } else {
              // 如果是app，弹窗
              this.$refs.sharePop.showShare('/pagesLeaseManager/HomePage/AuthenticationCompleted')
            }
          }
        }
        this.isLoading = !this.isLoading
        hideLoading()
      },
      /**
       * 首次点击下一步
       * @returns {Promise<void>}
       */
      async firstNextStep() {
        let params = {}
        if (this.isLoading) {
          return
        }
        // 修改直接跳过下一步
        if (this.id) {
          this.current = this.current + 1
          return
        }
        this.isLoading = true
        showLoading()
        if (this.isAccept) {
          params = Object.assign(params, this.requestParams)
        }
        params.mobile = this.formData.mobile
        // if (params.longitude) {
        //   params.longitude = this.longitude
        //   params.latitude = this.latitude
        // }
        params.areaCode = this.formData.areaCode
        params.address = this.formData.areaStr + this.formData.detail
        let data
        try {
          if (this.isAccept) {
            data = await this.$VoHttp.apiCompanyInvitationH5Supplier$POST(params)
          } else {
            data = await this.$VoHttp.apiCompanyInvitationSupplier$POST(params)
          }
          if (!data || !data.data) return
          this.formData.inviteeId = data.data.inviteeId
          this.current = this.current + 1
          uni.pageScrollTo({
            scrollTop: 0,
            duration: 300,
          })
        } catch (e) {
          console.log(e)
          // 已存在，要绑定
          if (e.code === 'U1101') {
            this.shareParams.type = 2 // 类型： 1、通联绑定；2、关系绑定
            this.shareParams.state = 0
            this.shareParams.userPhone = this.formData.mobile
            this.shareParams.inviteeId = e.data.inviteeId
            this.shareParams.inviterId = e.data.inviterId
            this.shareParams.inviteUserId = e.data.userId
            if (this.isShare) {
              // 如果是h5，直接跳转建立绑定关系
              setTimeout(() => {
                this.$linkToEasy(
                  `./AuthenticationCompleted?data=${JSON.stringify(this.shareParams)}`,
                )
              }, 1500)
            } else {
              // 如果是app，弹窗
              this.$refs.sharePop.showShare('/pagesLeaseManager/HomePage/AuthenticationCompleted')
            }
          } else {
            this.$u.toast(e.message || '网络请求失败')
            setTimeout(() => {
              this.$backFn()
            }, 1500)
          }
        }
        this.isLoading = false
        hideLoading()
      },
      /**
       * 点击提交信息
       */
      async submitInfo() {
        if (this.isLoading) {
          return
        }
        this.isLoading = true
        console.log(this.formData)
        showLoading()
        let params = {}
        if (this.isAccept) {
          params = Object.assign(params, this.requestParams)
        }
        params = Object.assign(params, this.formData)
        if (this.id) {
          params.companyId = this.id
        } else {
          params.companyId = this.formData.inviteeId
        }

        let data
        try {
          if (this.isAccept) {
            data = await this.$VoHttp.apiCompanyInvitationH5Supplier$PUT(params)
          } else {
            data = await this.$VoHttp.apiCompanyInvitationSupplier$PUT(params)
          }
          if (!data || !data.data) return
          if (+data.code === 20001) {
            // if (this.id) {
            //   toast('修改成功')
            // } else {
            //   toast('新增成功')
            // }
            this.show = true
            setTimeout(() => {
              this.$linkToEasy(`/pagesLeaseManager/WorkingTable/SupplierManager`)
              // this.$backFn()
            }, 1500)

          } else {
            error(data.message || '请求失败')
          }
        } catch (e) {
          console.log(e)
          this.$u.toast(e.message || '网络请求失败')
          // setTimeout(() => {
          //   this.$linkToEasy(`./AuthenticationCompleted?state=3`)
          // }, 1500)
        }
        hideLoading()
        this.isLoading = false
      },
      /**
       * 获取供应商资料
       */
      async initFn() {
        showLoading()
        try {
          const data = await this.$VoHttp.apiCompanyInfoManagerInfo({
            inviterId: this.userInfo.companyId,
            companyId: this.id,
          })
          if (!data || !data.data) return
          if (+data.code === 20001) {
            console.log(data)
            this.formData = Object.assign(this.formData, data.data)
            this.formData.areaStr = data.data.areaCodeStr
            this.formData.detail = data.data.address.split(data.data.areaCodeStr).pop()
            this.formData.companyType = 2
            this.formData.mobile = data.data.userName
            console.log(this.formData);
            this.formData.bankName = null
            this.formData.accountNo = null
            this.formData.parenBankName = null
            this.$forceUpdate()
          } else {
            error(data.message || '请求失败')
          }
        } catch (e) {
          console.log(e)
          this.$u.toast(e.message || '网络请求失败')
        }
        hideLoading()
      },
      // 跳转webView页面
      goWebView(url) {
        // #ifdef H5
        this.$linkToEasy(url + '?show=1')
        // #endif
        // #ifndef H5
        this.$linkToWebView(devConf.shareBaseUrl + url)
        // #endif
      },
    },
    onLoad(options) {
      console.log(options)
      // 是否为编辑
      if (options.id) {
        this.id = options.id || null
        this.initFn()
      }
      // 接收H5注册参数
      if (options.data) {
        let data = JSON.parse(options.data)
        Object.assign(this.requestParams, data)
        this.requestParams.inviterId = this.requestParams.companyId
        Object.assign(this.shareParams, data)
        this.isShare = true
        console.log(this.isShare)
      } else {
        this.requestParams = this.shareParams = {
          inviteUserId: this.userInfo.id,
          companyId: this.userInfo.companyId,
          phone: this.userInfo.userName,
          roleCode: 'supplier',
        }
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
  }
  .create {
    display: flex;
    flex-direction: column;
    height: 100vh;
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
    .red-required {
      color: #f56c6c;
      line-height: 40rpx;
      font-size: 40rpx;
      vertical-align: -6rpx;
      margin-left: -20rpx;
    }
    &-logo {
      width: 100%;
      padding: 0 50rpx 32rpx;
      box-sizing: border-box;
      background: #fff;
      &__name {
        padding: 24rpx 0;
        height: 48rpx;
        line-height: 48rpx;
        font-size: 32rpx;
        color: $v-c0-85;
      }
    }
    &-bottom {
      width: 100%;
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      border-top: 2rpx solid $v-bg-light;
    }
    &-footer {
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      border-top: 2rpx solid rgba(24, 34, 65, 0.08);
      width: 100%;
      background: $v-bg-white;
      .self-button {
        width: 325rpx;
        height: 80rpx;
        border: 1px solid #D3D4DB;
        border-radius: 24px;
        font-size: 28rpx;
        line-height: 80rpx;
        text-align: center;
      }
      &__button {
        width: 324rpx;
        height: 80rpx;
        margin: auto;
      }

      &__color {
        color: $v-c0-25 !important;
      }
    }
    &-set {
      background: #fff;
      //margin-top: 16rpx;
      padding: 24rpx 0;
      box-sizing: border-box;
      line-height: 48rpx;
      font-weight: bold;
      font-size: 32rpx;
      color: $v-c0-85;
    }
    .main-checkbox {
      display: flex;
      padding: 0 50rpx;
      &__input {
        .input-img {
          width: 48rpx;
          height: 48rpx;
          border-radius: 50%;
        }
      }
      &__text {
        font-weight: 400;
        font-size: 24rpx;
        line-height: 1.5;
        color: $v-c0-45;
        .text-a {
          color: var(--color-primary);
        }
      }
    }
  }
</style>
