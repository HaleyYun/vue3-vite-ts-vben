<template>
  <view class="new">
    <VoNav :title="id ? '编辑发货时效' : '新增发货时效'" is-fixed is-have-more />
    <EraForm
      ref="form"
      :model="formData"
      :rules="rules"
      class="new-form m-t-24"
      labelPosition="left"
      labelWidth="140"
    >
      <EraFormItem
        class="new-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="规则名称"
        prop="warehouseName"
      >
        <view class="flex flex1 flex-end flex-vertical-c">
          <!--   文本域-->
          <EraTextarea
            v-model="formData.warehouseName"
            :autoHeight="true"
            border="none"
            class="new-et"
            color="rgba(0, 0, 0, 0.85)"
            fontSize="16px"
            inputAlign="right"
            placeholder="请输入规则名称"
            placeholderClass="apply-form__placeholder color-block-25"
            type="text"
          />
          <VoIcon
            v-if="formData.warehouseName"
            :opacity="0.45"
            :size="20"
            class="m-l-16"
            color="#000"
            name="close-c"
            @click="clearEdit"
          />
        </view>
      </EraFormItem>
      <EraFormItem
        class="new-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="当日订单截止时间"
        prop="faRenName"
        style="padding-top: 2px !important"
      >
        <view class="flex flex1 flex-end flex-vertical-c">
          <view v-if="pickerStart !== ''" class="new-form__time" @click="startShow = true"
            >{{ startColumns[0][pickerStart] }}
          </view>
          <view v-else class="new-form__time color-gray" @click="startShow = true">开始时间</view>
          <view class="new-form__to" />
          <view v-if="pickerEnd !== ''" class="new-form__time" @click="endShow = true"
            >{{ startColumns[0][pickerEnd] }}
          </view>
          <view v-else class="new-form__time color-gray" @click="endShow = true">结束时间</view>
        </view>
      </EraFormItem>
      <EraFormItem class="new-form__item" color="rgba(0, 0, 0, 0.85)" label="预计发货" prop="code">
        <view class="flex flex-vertical-c flex-justify-r w-full" @click="showTime = true">
          <view v-if="pickerTime !== ''" class="flex1 new-form__box m-r-8">
            {{ columnsTime[0][pickerTime] }}
          </view>
          <view v-else class="flex1 new-form__box color-gray m-r-8"> 请选择预计发货时间</view>
          <VoIcon :opacity="0.25" name="right-arrow" />
        </view>
      </EraFormItem>

      <EraFormItem
        class="new-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="预计发货时间段"
        prop="faRenName"
        style="padding-top: 2px !important"
      >
        <view class="flex flex1 flex-end flex-vertical-c">
          <view
            v-if="pickerDeliveryStart !== ''"
            class="new-form__time"
            @click="startDeliveryShow = true"
            >{{ startColumns[0][pickerDeliveryStart] }}
          </view>
          <view v-else class="new-form__time color-gray" @click="startDeliveryShow = true"
            >开始时间
          </view>
          <view class="new-form__to" />
          <view
            v-if="pickerDeliveryEnd !== ''"
            class="new-form__time"
            @click="endDeliveryShow = true"
            >{{ startColumns[0][pickerDeliveryEnd] }}
          </view>
          <view v-else class="new-form__time color-gray" @click="endDeliveryShow = true"
            >结束时间
          </view>
        </view>
      </EraFormItem>
      <EraFormItem class="new-form__item" color="rgba(0, 0, 0, 0.85)" label="收货区域" prop="code">
        <view class="flex flex-vertical-c flex-justify-r w-full" @click="goSelectAddressFn">
          <view v-if="formData.areaCode.length > 0" class="flex1 new-form__box m-r-8"
            >{{ canDel == 1 ? '全国' : '已选择区域' }}
          </view>
          <view v-else class="flex1 new-form__box color-gray m-r-8">请选择收货区域</view>
          <VoIcon :opacity="0.25" name="right-arrow" />
        </view>
      </EraFormItem>
    </EraForm>
    <view v-if="id && !beDefault" class="new-delete" @click="showModalCancel = true">删除</view>
    <view class="new-bottom p-b-safe-area">
      <EraButton
        v-if="
          formData.warehouseName &&
          pickerDeliveryStart !== '' &&
          pickerDeliveryEnd !== '' &&
          pickerStart !== '' &&
          pickerEnd !== '' &&
          pickerTime !== '' &&
          formData.areaCode.length > 0
        "
        circle
        text="完成"
        @click="complete"
      />
      <EraButton v-else circle disabled text="完成" />
      <view class="p-b-safe-area" />
    </view>
    <view class="p-b-safe-area" />
    <!--  选择开始时间picker  -->
    <u-picker-era
      v-model="pickerStart"
      :columns="startColumns"
      :show="startShow"
      cancelColor="rgba(0, 0, 0, 0.45)"
      confirmColor="#22284B"
      keyName="startName"
      title="预计发货时间"
      @cancel="startShow = false"
      @confirm="startConfirm"
    />
    <!--  选择结束时间picker  -->
    <u-picker-era
      v-model="pickerEnd"
      :columns="startColumns"
      :show="endShow"
      cancelColor="rgba(0, 0, 0, 0.45)"
      confirmColor="#22284B"
      keyName="startName"
      title="预计发货时间"
      @cancel="endShow = false"
      @confirm="endConfirm"
    />
    <!--  选择预计发货时间picker  -->
    <u-picker-era
      v-model="pickerTime"
      :columns="columnsTime"
      :show="showTime"
      cancelColor="rgba(0, 0, 0, 0.45)"
      confirmColor="#22284B"
      keyName="timeName"
      title="预计发货时间"
      @cancel="showTime = false"
      @confirm="confirmTime"
    />

    <!--  选择开始时间picker  -->
    <u-picker-era
      v-model="pickerDeliveryStart"
      :columns="startColumns"
      :show="startDeliveryShow"
      cancelColor="rgba(0, 0, 0, 0.45)"
      confirmColor="#22284B"
      keyName="startName"
      title="预计发货时间"
      @cancel="startDeliveryShow = false"
      @confirm="startDeliveryConfirm"
    />
    <!--  选择结束时间picker  -->
    <u-picker-era
      v-model="pickerDeliveryEnd"
      :columns="startColumns"
      :show="endDeliveryShow"
      cancelColor="rgba(0, 0, 0, 0.45)"
      confirmColor="#22284B"
      keyName="startName"
      title="预计发货时间"
      @cancel="endDeliveryShow = false"
      @confirm="endDeliveryConfirm"
    />
    <VoModal
      :closeOnClickOverlay="true"
      :content="content"
      :show="showModalCancel"
      :showCancelButton="true"
      @cancel="cancel"
      @confirm="confirmDelFn"
    />
  </view>
</template>

<script>
  export default {
    name: 'NewDeliveryTimeliness',
    data() {
      return {
        beDefault: false,
        content: '是否删除发货时效？',
        showModalCancel: false, // 删除模态框
        canDel: 0,
        isLoading: false,
        id: '', // 发货时效id
        warehouseId: '', // 仓库id
        value: false, // 开关选择器
        formData: {
          warehouseName: '', // 规则名称
          areaCode: [], // 到货时效名称
        },
        rules: {
          warehouseName: {
            type: 'string',
            required: true,
            message: '请输入仓库名称',
            trigger: ['blur', 'change'],
          },
        },
        startShow: false, // 开始时间选择器
        startColumns: [
          [
            '0时',
            '1时',
            '2时',
            '3时',
            '4时',
            '5时',
            '6时',
            '7时',
            '8时',
            '9时',
            '10时',
            '11时',
            '12时',
            '13时',
            '14时',
            '15时',
            '16时',
            '17时',
            '18时',
            '19时',
            '20时',
            '21时',
            '22时',
            '23时',
            '24时',
          ],
        ],
        pickerStart: '', // 返回当前选择的值
        endShow: false, // 开始时间选择器
        pickerEnd: '', // 返回的当前选择的值
        showTime: false, // 预计发货时间选择器

        startDeliveryShow: false,
        endDeliveryShow: false,
        pickerDeliveryStart: '',
        pickerDeliveryEnd: '',
        columnsTime: [['当日', '次日', '第三天', '第四天', '第五天', '第六天', '第七天']],
        pickerTime: '', // 返回的当前选择的值
      }
    },
    methods: {
      clearEdit() {
        this.formData.warehouseName = ''
      },
      goSelectAddressFn() {
        console.log(this.canDel)
        if (this.canDel != 1) {
          this.$storage.set('defaultArea', this.formData.areaCode)
          this.$linkToEasy('/pagesProduct/SaleArea/SaleArea?type=2&title=设置收货区域')
        }
      },
      /**
       * picker点击确定按钮返回当前开始时间选择的值
       */
      startDeliveryConfirm(e) {
        if (this.pickerDeliveryEnd && this.pickerDeliveryEnd < e.indexs[0]) {
          uni.$u.toast('开始时间不能小于结束时间')
          return
        }
        this.startDeliveryShow = false

        this.pickerDeliveryStart = e.indexs[0]
      },
      /**
       * picker点击确定按钮返回当前结束时间选择的值
       */
      endDeliveryConfirm(e) {
        if (this.pickerDeliveryStart && this.pickerDeliveryStart > e.indexs[0]) {
          uni.$u.toast('结束时间不能小于开始时间')
          return
        }
        this.endDeliveryShow = false
        this.pickerDeliveryEnd = e.indexs[0]
      },
      /**
       * picker点击确定按钮返回当前开始时间选择的值
       */
      startConfirm(e) {
        if (this.pickerEnd && this.pickerEnd < e.indexs[0]) {
          uni.$u.toast('开始时间不能小于结束时间')
          return
        }
        this.startShow = false

        this.pickerStart = e.indexs[0]
      },
      /**
       * picker点击确定按钮返回当前结束时间选择的值
       */
      endConfirm(e) {
        if (this.pickerStart && this.pickerStart > e.indexs[0]) {
          uni.$u.toast('结束时间不能小于开始时间')
          return
        }
        this.endShow = false
        this.pickerEnd = e.indexs[0]
      },
      /**
       * picker点击确定按钮返回当前发货时间选择的值
       */
      confirmTime(e) {
        this.showTime = false
        this.pickerTime = e.indexs[0]
      },
      complete() {
        if (this.id) {
          let param = {
            id: this.id,
            warehouseId: this.warehouseId,
            name: this.formData.warehouseName,
            orderStartTime: this.pickerStart,
            orderEndTime: this.pickerEnd,
            deliveryStartTime: this.pickerDeliveryStart,
            deliveryEndTime: this.pickerDeliveryEnd,
            estimatedDelivery: this.pickerTime,
            areaCode: JSON.stringify(this.formData.areaCode),
          }
          if (this.isLoading) return
          this.isLoading = true
          this.$VoHttp
            .apiWarehouseDelivery$Put(param)
            .then((res) => {
              uni.$u.toast('保存发货时效成功！')

              setTimeout(() => {
                this.$backFn()
              }, 1500)
            })
            .catch((e) => {
              uni.$u.toast(e.message || '请求失败')
            })
            .finally(() => {
              this.isLoading = false
            })
        } else {
          let param = {
            boList: [
              {
                deliveryStartTime: this.pickerDeliveryStart,
                deliveryEndTime: this.pickerDeliveryEnd,
                warehouseId: this.warehouseId,
                name: this.formData.warehouseName,
                orderStartTime: this.pickerStart,
                orderEndTime: this.pickerEnd,
                estimatedDelivery: this.pickerTime,
                areaCode: JSON.stringify(this.formData.areaCode),
              },
            ],
          }
          if (this.isLoading) return
          this.isLoading = true
          this.$VoHttp
            .apiWarehouseDelivery$Post(param)
            .then((res) => {
              uni.$u.toast('新增发货时效成功！')
              setTimeout(() => {
                this.$backFn()
              }, 1500)
            })
            .catch((e) => {
              uni.$u.toast(e.message || '请求失败')
            })
            .finally(() => {
              this.isLoading = false
            })
        }
      },
      /**
       *  打开
       */
      open() {
        this.showModalCancel = true
      },
      /**
       * 关闭
       */
      close() {
        this.showModalCancel = false
      },
      /**
       * 模态框点击确认按钮时触发删除发货时效
       */
      confirmDelFn() {
        let that = this
        // uni.showModal({
        //   title: '提示',
        //   content: '确定要删除该发货时效吗？',
        //   confirmColor: '#22284B',
        //   success: function (res) {
        //     if (res.confirm) {}
        //   },
        // })
        if (that.isLoading) return
        that.isLoading = true
        that.$VoHttp
          .apiWarehouseDelivery$Delete({ id: that.id })
          .then((res) => {
            uni.$u.toast('删除成功！')
            that.isLoading = false
            setTimeout(() => {
              that.$backFn()
            }, 1500)
          })
          .catch((e) => {
            that.isLoading = false
            uni.$u.toast(e.message || '请求失败')
          })
      },
      /**
       * 模态框点击取消按钮时触发
       */
      cancel() {
        this.close()
      },
      /**
       * 获取某个发货时效
       */
      initFn() {
        this.$VoHttp.apiWarehouseDelivery$Id({ id: this.id }).then((res) => {
          this.formData.warehouseName = res.data.name
          this.pickerStart = res.data.orderStartTime
          this.pickerEnd = res.data.orderEndTime
          this.pickerTime = res.data.estimatedDelivery

          this.pickerDeliveryStart = res.data.deliveryStartTime
          this.pickerDeliveryEnd = res.data.deliveryEndTime
          this.formData.areaCode = res.data.areaCode ? JSON.parse(res.data.areaCode) : []
          this.beDefault = res.data.beDefault
        })
      },
    },
    onLoad(options) {
      if (options.warehouseId) {
        this.warehouseId = options.warehouseId
      }
      if (options.id) {
        this.id = options.id
        this.initFn()
      }
      if (options.canDel) {
        this.canDel = Number(options.canDel)
      }
    },
    onShow() {
      uni.$on('addressFn', (res) => {
        this.formData.areaCode = res
      })
    },
  }
</script>

<style lang="scss" scoped>
  .new {
    width: 750rpx;
    min-height: 100vh;
    box-sizing: border-box;

    &-form {
      padding: 0 32rpx;
      background: #ffffff;

      &__item {
        text-align: right;
        border-bottom: 2rpx solid $v-bg-light;

        .item-code {
          margin-left: 24rpx;
        }

        .item-textarea {
          padding: 4rpx;
        }
      }

      &__time {
        width: 168rpx;
        height: 64rpx;
        background: $v-bg-light;
        border-radius: 8rpx;
        font-size: 26rpx;
        line-height: 64rpx;
        text-align: center;
        color: $v-c0-65;
      }

      &__to {
        width: 24rpx;
        height: 2rpx;
        background: $v-text-disabled;
        margin: 0 12rpx;
      }

      &__box {
        font-size: 32rpx;
        color: $v-c0-65;
        line-height: 150%;
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
        font-size: 32rpx !important;
      }
    }

    &-delete {
      width: 750rpx;
      height: 96rpx;
      line-height: 96rpx;
      background: #ffffff;
      margin-top: 24rpx;
      text-align: center;
      font-size: 32rpx;
      color: $v-c0-45;
    }

    &-bottom {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
      border-top: 2rpx solid $v-bg-light;
    }
  }

  .color-gray {
    color: rgba(0, 0, 0, 0.25) !important;
  }

  .flex-end {
    justify-content: flex-end;
  }

  .new-et {
    padding: 0rpx !important;
  }
</style>
