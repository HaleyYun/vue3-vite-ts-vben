<template>
  <view>
    <view class="garage">
      <VoNav is-fixed is-have-more title="创建修理厂">

      </VoNav>
      <view class="flex1 overflow-y">
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
              v-model="formData.phone"
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
            />
          </EraFormItem>
          <EraFormItem
            class="garage-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label="负责人名称"
            prop="nickname"
            required
          >
            <u--input
              v-model="formData.nickname"
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
              v-model="formData.garageName"
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
            @click="showAddress = true"
          >
            <view v-if="formData.areaStr" class="flex1 garage-form__box m-r-8">{{
              formData.areaStr
            }}</view>
            <view v-else class="flex1 garage-form__box color-block-25 m-r-16"> 省/市/区 </view>
            <VoIcon :opacity="0.25" name="right-arrow" />
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
              v-model="formData.detail"
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
            <VoIcon v-else :size="20" color="#373A4E" name="address" @click="detailFn"></VoIcon>
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
            required
            @click="roleShow = true"
          >
            <view v-if="formData.carSystem" class="flex1 garage-form__box m-r-8">{{
              formData.carSystem
            }}</view>
            <view v-else class="flex1 garage-form__box color-block-25 m-r-16"> 主修车系 </view>
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
              autoHeight
              border="none"
              class="item-input"
              color="rgba(0, 0, 0, 0.85)"
              fontSize="16px"
              inputAlign="right"
              placeholder="请输入工位数量"
              placeholderClass="garage-form__placeholder"
              type="number"
              maxlength="999"
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
              autoHeight
              border="none"
              class="item-input"
              color="rgba(0, 0, 0, 0.85)"
              fontSize="16px"
              inputAlign="right"
              placeholder="请输入规模（人）"
              placeholderClass="garage-form__placeholder"
              maxlength="999"
              type="number"
            />
          </EraFormItem>
        </EraForm>
        <view class="garage-upload">
          <view class="garage-upload__name flex flex-justify-between flex-vertical-c">
            <view class="name-left">图片上传</view>
            <view class="name-right">{{ fileList1.length }}/9</view>
          </view>
          <view class="garage-upload__pictures">
            <VoUpload
              :fileList="fileList1"
              :maxCount="9"
              :previewFullImage="true"
              height="109"
              multiple
              name="1"
              width="109"
              @success="uploadSuccess"
            >
              <image
                class="pictures-img"
                mode="widthFix"
                src="/static/created/circle/upload_pictures.png"
              />
            </VoUpload>
          </view>
        </view>
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
            formData.carSystem
          "
          class="garage-footer__button"
          color="#FF5319"
          shape="circle"
          size="large"
          text="确定"
          @click="showModalCancel = true"
        />
        <u-button
          v-else
          class="garage-footer__button garage-footer__color"
          color="#F6F7F8"
          shape="circle"
          size="large"
          text="确定"
        />
        <VoSafetyArea></VoSafetyArea>
      </view>
    </view>
    <VoAddress :show.sync="showAddress" @sureFn="sureFn"></VoAddress>
    <u-picker-era
      :columns="roleArr"
      :defaultIndex="[1]"
      :show="roleShow"
      cancelColor="rgba(0, 0, 0, 0.45)"
      confirmColor="#22284B"
      keyName="roleName"
      title="主修车系"
      @cancel="roleShow = false"
      @confirm="confirmRole"
    />
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
    <!-- 分享弹框 -->
    <VoShareQrCodeView ref="sharePop" />
  </view>
</template>

<script>
  import VoShareQrCodeView from '@/components/VoShareView/VoShareQrCodeView'

  export default {
    name: 'NewGarage',
    components: { VoShareQrCodeView },
    data() {
      return {
        fileList1: [],
        showAddress: false, // 是否显示选择地址
        roleShow: false, // 是否显示车系选择器
        roleArr: [['国产车', '韩系车', '德系车', '日系车']],
        showModalCancel: false, // 模态框
        content: '该用户信息已存在，请直接邀请',
        formData: {
          phone: '', // 联系电话
          nickname: '', // 负责人名称
          garageName: '', // 修理厂名称
          areaStr: '', // 所在地区
          detail: '', // 详细地址
          carSystem: '', // 主修车系
          stationNum: '', // 工位数量
          scale: '', // 规模（人）
        },
        rules: {
          phone: [
            {
              type: 'number',
              required: true,
              message: '请输入联系电话',
              trigger: ['blur', 'change'],
            },
            {
              pattern: this.$vocenApi.Pattern.phone, // /^1[3456789][0-9]{9}$/g
              // 正则检验前先将值转为字符串
              transform(value) {
                return String(value)
              },
              message: '手机号格式不正确',
            },
          ],
          nickname: {
            type: 'string',
            required: true,
            message: '请输入负责人名称',
            trigger: ['blur', 'change'],
          },
          garageName: {
            type: 'string',
            required: true,
            message: '请输入修理厂名称',
            trigger: ['blur', 'change'],
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
            trigger: ['blur', 'change'],
          },
          carSystem: {
            type: 'string',
            required: true,
            message: '请选择主修车系',
            trigger: ['blur', 'change'],
          },
        },
      }
    },
    methods: {
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
      detailFn() {
        console.log('asd')
      },
      /**
       * 清空详细地址栏
       */
      closeDetail() {
        this.formData.detail = ''
      },
      /**
       * picker点击确定按钮返回当前单列选择的值
       */
      confirmRole(e) {
        console.warn(e, 111111111111)
        this.roleShow = false
        this.formData.carSystem = e.value[0]
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
        this.$refs.sharePop.showShare(true)
      },
      uploadSuccess() {
        this.videoSrc = ''
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
        margin: 0 32rpx 0 32rpx;
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
        padding: 0 16rpx 8rpx 32rpx;
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
</style>
