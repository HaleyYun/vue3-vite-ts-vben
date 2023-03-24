<template>
  <view>
    <EraForm
      ref="form"
      :model="formData"
      :rules="rules"
      class="val-form m-t-16"
      labelPosition="left"
      labelWidth="130"
    >
      <view v-if="tag != 1" class="val-title">
        <view>发动机{{ nmArr[index] }}</view>
        <VoIcon color="#8C8C8C" name="delete" size="16" @click="deleteCount" />
      </view>
      <EraFormItem
        class="val-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="原发动机型号"
        prop="no"
        required
      >
        <u--input
          v-model.lazy="formData.no"
          border="none"
          disabledColor="#ffffff"
          fontSize="16px"
          inputAlign="right"
          placeholder="（例：大众途观：CGM）"
          placeholderClass="val-form__placeholder"
        />
        <VoIcon class="m-l-8" color="#FF5319" name="scan-not-vin" @click="tapOcr" />
      </EraFormItem>
      <!--  v-if="formData.modelName"  -->
      <!--  prop="modelName"  -->
      <EraFormItem class="val-form__item" color="rgba(0, 0, 0, 0.85)" label="发动机型号" required>
        <u--input
          v-model="formData.modelName"
          border="none"
          fontSize="16px"
          inputAlign="right"
          placeholder="发动机型号"
          placeholderClass="val-form__placeholder"
          readonly
        />
        <!--        <VoIcon :opacity="0.45" :size="20" class="m-l-8" color="#000" name="right-arrow" />-->
      </EraFormItem>

      <EraFormItem
        class="val-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="发动机图片"
        prop="pic"
        required
      />
      <EraFormItem>
        <view class="engine">
          <view class="w452 flex flex-column flex-vertical-c">
            <VoUpload
              :fileList="fileList1"
              :isTencentCloud="false"
              :maxCount="1"
              :previewFullImage="true"
              height="226"
              multiple
              name="1"
              width="226"
              @delete="deletePic($event, 0)"
              @success="uploadSuccess($event, 0)"
            >
              <image
                class="engine-img1"
                mode="widthFix"
                src="/static/common/upload_pictures1.png"
              />
            </VoUpload>
            <view class="engine-name">原发动机型号</view>
          </view>
          <view class="flex flex-wrap">
            <view class="w218 m-t-32 m-r-16 flex flex-column flex-vertical-c">
              <VoUpload
                :fileList="fileList2"
                :isTencentCloud="false"
                :maxCount="1"
                :previewFullImage="true"
                height="109"
                multiple
                name="1"
                width="109"
                @delete="deletePic($event, 1)"
                @success="uploadSuccess($event, 1)"
              >
                <image
                  class="engine-img"
                  mode="widthFix"
                  src="/static/common/upload_pictures.png"
                />
              </VoUpload>
              <view class="engine-name">进气端</view>
            </view>
            <view class="w218 m-t-32 m-r-16 flex flex-column flex-vertical-c">
              <VoUpload
                :fileList="fileList3"
                :isTencentCloud="false"
                :maxCount="1"
                :previewFullImage="true"
                height="109"
                multiple
                name="1"
                width="109"
                @delete="deletePic($event, 2)"
                @success="uploadSuccess($event, 2)"
              >
                <image
                  class="engine-img"
                  mode="widthFix"
                  src="/static/common/upload_pictures.png"
                />
              </VoUpload>
              <view class="engine-name">排气端</view>
            </view>
            <view class="w218 m-t-32 flex flex-column flex-vertical-c">
              <VoUpload
                :fileList="fileList4"
                :isTencentCloud="false"
                :maxCount="1"
                :previewFullImage="true"
                height="109"
                multiple
                name="1"
                width="109"
                @delete="deletePic($event, 3)"
                @success="uploadSuccess($event, 3)"
              >
                <image
                  class="engine-img"
                  mode="widthFix"
                  src="/static/common/upload_pictures.png"
                />
              </VoUpload>
              <view class="engine-name">正时端</view>
            </view>
            <view class="w218 m-t-32 m-r-16 flex flex-column flex-vertical-c">
              <VoUpload
                :fileList="fileList5"
                :isTencentCloud="false"
                :maxCount="1"
                :previewFullImage="true"
                height="109"
                multiple
                name="1"
                width="109"
                @delete="deletePic($event, 4)"
                @success="uploadSuccess($event, 4)"
              >
                <image
                  class="engine-img"
                  mode="widthFix"
                  src="/static/common/upload_pictures.png"
                />
              </VoUpload>
              <view class="engine-name">曲后端</view>
            </view>
          </view>
        </view>
      </EraFormItem>
    </EraForm>

    <view class="val-expect flex flex-vertical-c flex-justify-between">
      <view>预计可卖</view>
      <view>{{ salePrice || '0' }}元</view>
    </view>
    <!-- <ModelPopup :show.sync="showModel" @chooseFn="chooseFn" :modelList="modelList" /> -->
  </view>
</template>

<script>
  import { chooseImageOcrByPromise } from '@/common/helper'
  //   import ModelPopup from './ModelPopup'

  export default {
    name: 'EngineComponent',
    components: {
      //   ModelPopup,
    },
    props: {
      tag: {
        type: String,
        default: '1',
      },
      index: Number,
    },
    data() {
      return {
        // showModel: false,
        formData: {
          no: '', // 缸体号
          modelName: null, // 发动机型号
          pic: '',
          modelId: null,
          enable: false,
        },
        salePrice: '',
        isRecycleEnable: false,
        nmArr: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
        // modelList: [],
        rules: {
          no: [
            {
              required: false,
              message: '请输入缸体号',
              trigger: ['blur', 'change'],
            },
            {
              asyncValidator: async (rule, value, callback) => {
                if (value) {
                  const res = await this.$VoHttp.apiGoodsModeQueryByCylinderNo(
                    {
                      cylinderNo: value,
                    },
                    { noLoading: true },
                  )
                  this.isRecycleEnable = res.data.isRecycleEnable
                  this.formData.enable = res.data.isRecycleEnable
                  if (!res.data.isRecycleEnable) {
                    this.formData.modelName = ''
                    this.formData.modelId = ''
                    callback(new Error('此发动机不支持回收'))
                  } else {
                    this.formData.enable = true
                    this.salePrice = res.data.salePrice
                    this.formData.modelName = res.data.model
                    this.formData.modelId = res.data.id
                    callback()
                  }
                }
              },
              trigger: ['blur'],
            },
          ],
          modelName: {
            required: true,
            message: '不能为空',
            trigger: ['change'],
          },
          pic: [
            {
              asyncValidator: (rule, value, callback) => {
                if (value) {
                  let arr = JSON.parse(value)
                  if (!arr[0]) {
                    callback(new Error('请上传原发动机型号图片'))
                  } else if (!arr[1]) {
                    callback(new Error('请上传进气端图片'))
                  } else if (!arr[2]) {
                    callback(new Error('请上传排气端图片'))
                  } else if (!arr[3]) {
                    callback(new Error('请上传正时端图片'))
                  } else if (!arr[4]) {
                    callback(new Error('请上传曲后端图片'))
                  } else {
                    callback()
                  }
                } else {
                  callback(new Error('请上传图片'))
                }
              },
              trigger: ['change'],
            },
            {
              required: true,
              message: '请上传图片',
              trigger: ['change'],
            },
          ],
        },
        fileList1: [],
        fileList2: [],
        fileList3: [],
        fileList4: [],
        fileList5: [],
      }
    },
    computed: {},
    watch: {
      formData: {
        deep: true,
        handler() {
          this.$emit('refresh')
        },
      },
    },

    methods: {
      setDefaultForm(val) {},
      resetForm() {
        this.formData.no = ''
        this.formData.modelName = null
        this.formData.pic = ''
        this.formData.modelId = null
        this.fileList1 = []
        this.fileList2 = []
        this.fileList3 = []
        this.fileList4 = []
        this.fileList5 = []
        this.salePrice = ''
      },
      deleteCount() {
        this.$emit('deleteCount', this.tag)
      },
      deletePic(e, val) {
        console.log(e, val)
        let arr = JSON.parse(this.formData.pic)
        arr[val] = null
        this.formData.pic = JSON.stringify(arr)
      },
      validate() {
        if (this.$refs.form.validate()) {
          return this.formData.enable
        }
        return this.$refs.form.validate()
      },
      uploadSuccess(e, index) {
        if (e && e.length) {
          if (this.formData.pic) {
            let arr = JSON.parse(this.formData.pic)
            arr[index] = e[0].url
            this.formData.pic = JSON.stringify(arr)
          } else {
            const arr = []
            arr[index] = e[0].url
            this.formData.pic = JSON.stringify(arr)
          }
        }
      },
      async tapOcr() {
        try {
          const res = await chooseImageOcrByPromise({
            apiUrl: '/v1/api/business/vehicle/brand/cylinderOcr',
          })
          const data = JSON.parse(res.data)
          if (data.success) {
            this.formData.no = data.data
            this.$refs.form.validateField('no')
          } else {
            uni.$u.toast(data.message)
          }
        } catch (err) {
          if (!err.errMsg) {
            this.$u.toast(err.message || '网络错误')
          }
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .val {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;

    &-record {
      width: 120rpx;
      height: 56rpx;
      line-height: 56rpx;
      text-align: center;
      margin-right: 24rpx;
      color: #ff5319;
      font-size: 24rpx;
      border: 2rpx solid #ff5319;
      border-radius: 100rpx;
      box-sizing: border-box;
    }

    &-explain {
      margin-top: 16rpx;
      background: #fff;
      padding: 24rpx 32rpx;
    }

    &-title {
      display: flex;
      justify-content: space-between;
      padding-top: 24rpx;
      font-size: 32rpx;
      font-weight: bold;
      align-items: center;
    }

    &-form {
      padding: 0 32rpx;
      background: #ffffff;

      &__item {
        text-align: right;
        border-bottom: 2rpx solid $v-bg-light;

        .item-input {
          padding: 4rpx;
        }

        .item-code {
          margin-left: 24rpx;
        }
      }

      &__code {
        font-size: 32rpx;
        line-height: 1.5;
        color: var(--color-primary);
      }

      &__placeholder {
        text-align: right;
        color: $v-c0-25 !important;
        font-size: 32rpx !important;
      }

      &__text {
        text-align: right;
        color: $v-c0-85 !important;
        font-size: 32rpx !important;
      }
    }

    &-expect {
      background: #fff;
      padding: 24rpx 32rpx;
      font-size: 32rpx;
      color: $v-c0-85;

      &__gray {
        color: #f20014;
        font-size: 32rpx;
        line-height: 1.5;
      }
    }

    &-add {
      padding: 24rpx 32rpx;
      font-size: 32rpx;
      color: $v-c0-45;
    }

    &-choose {
      padding: 24rpx 32rpx;
      background: #fff;
      font-size: 32rpx;
    }

    &-bottom {
      padding: 24rpx 32rpx;
      background: #fff;

      &__disabled {
        width: 100%;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        background: #f6f7f8;
        border-radius: 48rpx;
        color: $v-c0-25;
        font-size: 32rpx;
      }
    }
  }

  .engine {
    &-name {
      font-size: 28rpx;
      color: $v-c0-45;
      margin-top: 16rpx;
    }

    &-img1 {
      width: 452rpx;
      height: 452rpx;
      display: block;
    }

    &-img {
      width: 218rpx;
      height: 218rpx;
      display: block;
    }
  }
</style>
