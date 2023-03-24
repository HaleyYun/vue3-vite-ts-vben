<template>
  <view class="w-full h-full flex flex-column overflow-hidden">
    <view class="scan">
      <view class="scan-title">
        <view class="flex1 fz-b">请输入发动机识别码</view>

        <view class="scan-title__scan flex flex-vertical-c color-block-yellow fz-28" @click="vin">
          扫码识别
          <VoIcon :opacity="1" :size="20" class="m-l-10" color="#FF5319" name="scan-not-vin" />
        </view>

      </view>
      <view class="scan-input">
        <input v-model="code" class="input" type="text" :disabled="inputDisabled" />
        <view v-if="code" class="btn canSubmit" @click.stop="sure">确定</view>
        <view v-else class="btn">确定</view>
      </view>
    </view>
    <view class="list flex1 overflow-y border-box">
      <view class="fz-b m-b-24">已录入：{{ totalCount }}</view>
      <view v-for="(item, index) in list" :key="index" class="list-item">
        <view :class="{ danger: item.tips }" class="list-item-box" @click="editThis(index)">
          <view>{{ item.value }}</view>
          <VoIcon name="close-c" opacity="0.45" size="16" @click.native.stop="deleteThis(index)" />
        </view>
        <view v-if="item.tips" class="list-item-tips">{{ item.tips }}</view>
      </view>
    </view>
    <VoModal
      :show="show"
      class="position-f"
      closeOnClickOverlay
      confirmColor="#000000"
      confirmText="确定"
      showCancelButton
      title="编辑发动机识别码"
      @cancel="close"
      @close="close"
      @confirm="edit"
    >
      <view class="slot-content w-full">
        <EraForm
          ref="form"
          :model="formData"
          :rules="rules"
          class="modify-form"
          labelPosition="left"
          labelWidth="0"
        >
          <EraFormItem
            class="modify-form__item"
            color="rgba(0, 0, 0, 0.85)"
            label=""
            prop="content"
          >
            <u-input v-model="formData.content" clearable />
          </EraFormItem>
        </EraForm>
      </view>
    </VoModal>
  </view>
</template>
<script>
  import { chooseImageOcrByPromise } from '@/common/helper'

  export default {
    name: 'ScanList',
    props: {
      // 识别码列表
      list: {
        type: Array,
        default: () => [],
      },
      totalCount: {
        type: [Number, String],
        default: '',
      },
      typeIndex: {
        type: Number,
        default: 1,
      },
      //是否禁用输入框
      inputDisabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        // 手动输入的识别码
        code: '',
        // 编辑弹窗
        show: false,
        // 编辑内容
        formData: {
          content: '',
        },
        // 表单验证
        rules: {
          content: {
            type: 'string',
            required: true,
            message: '识别码不可为空',
            trigger: ['blur'],
          },
        },
        isLoading: false,
        // 当前点击修改对象
        cur: null,
      }
    },
    methods: {
      // 确定
      async sure() {
        //过滤空格
        let valueNew = this.code.replace(/\s+/g, '')
        if (!valueNew) {
          this.$u.toast('识别码不能为空')
          return
        }
        // let arr = this.list.map((item) => item.value)
        // if (arr.indexOf(this.code) > -1) {
        //   uni.$u.toast('录入失败,与已有发动机识别码重复')
        //   this.code = ''
        //   return
        // }

        // // 判断是否已入库
        // let bool = await this.checkExistence(this.list)
        // // 如果已入库
        // if (bool && this.typeIndex === 1) return
        // // 未入库
        // if (!bool && this.typeIndex === 2) {
        //   this.$u.toast('该识别码未入库')
        //   this.code = ''
        //   return
        // }
        this.list.unshift({ value: this.code, tips: '' })
        this.code = ''
        uni.$u.toast('录入成功')
        this.$emit('update:list', this.list)
      },
      /**
       * 检验商品识别码是否存在
       */
      async checkExistence(list) {
        console.log(list)
        try {
          const { data } = await this.$VoHttp.WAREHOUSE.apiWarehouseOperFacilitatorSelfRefillCheck({
            goodsVin: this.code,
          })
          // 此处的data，为.then写法中的res.data
          if (this.typeIndex === 1) {
            // 已入库
            if (data) {
              this.$u.toast('该识别码已入库')
              // 如果页面列表有内容
              // if (list.length) {
              //   list.forEach((item) => {
              //     if (item.value === this.code) {
              //       item.tips = '该识别码已入库到「江陵动力B12」,请清除。'
              //     }
              //   })
              // } else {
              //   let warehuse = '库的名字'
              //   this.list.push({
              //     value: this.code,
              //     tips: `该识别码已入库到「${warehuse}」,请清除。`,
              //   })
              //   this.$u.toast('该识别码已入库')
              // }
            }
            return data
          }
          return data
        } catch (e) {
          this.$u.toast(e.message || '网络请求失败')
        }
      },
      // 删除或编辑
      deleteThis(index) {
        this.list.splice(index, 1)
        this.$emit('update:list', this.list)
      },
      editThis(index) {
        this.formData.content = this.list[index].value
        this.show = true
        this.cur = index
      },
      // 确认修改
      edit() {
        this.$refs.form.validate().then((res) => {
          console.log(res)
          this.list[this.cur].value = this.formData.content
          this.list[this.cur].tips = null
          this.$emit('update:list', this.list)
          this.close()
        })
      },
      // 关闭弹窗
      close() {
        this.show = false
        this.formData.content = ''
      },
      // 扫一扫
      vin() {
        chooseImageOcrByPromise({
          count: 1,
          // sourceType: ['camera'],
          sizeType: ['compressed'],
          tip: '正在识别',
          apiUrl: '/v1/api/business/vehicle/brand/ocr',
          formData:{
            type:'1'
          },
        })
          .then((res) => {
            console.log(res)
            const data = JSON.parse(res.data)
            if (+data.code === 20001) {
              if (data.data && data.data.length) {
                this.code = data.data
                // this.goResult()
              }
            } else {
              this.$u.toast(data.message || '网络错误')
            }
          })
          .catch((err) => {
            if (!err.errMsg) {
              this.$u.toast(err.message || '网络错误')
            }
          })
      },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    //生命周期 - 创建之前
    beforeCreate() {},
    //生命周期 - 挂载之前
    beforeMount() {},
    //生命周期 - 更新之前
    beforeUpdate() {},
    //生命周期 - 更新之后
    updated() {},
    //生命周期 - 销毁之前
    beforeDestroy() {},
    //生命周期 - 销毁完成
    destroyed() {},
    //如果页面有keep-alive缓存功能，这个函数会触发
    activated() {},
  }
</script>
<style lang="scss" scoped>
  .scan {
    box-sizing: border-box;
    padding: 24rpx 32rpx;
    background-color: #fff;
    margin: 16rpx 0;
    &-title {
      display: flex;
      align-items: baseline;
      font-size: 32rpx;
      color: rgba(0, 0, 0, 0.85);
      &__scan {
        border: 2rpx solid $v-btn-disabled;
        border-radius: 64rpx;
        height: 58rpx;
        padding: 0 24rpx;
        box-sizing: border-box;
      }
    }
    &-input {
      display: flex;
      align-items: center;
      margin-top: 24rpx;
      .input {
        width: 480rpx;
        height: 96rpx;
        box-sizing: border-box;
        padding: 24rpx;
        color: rgba(0, 0, 0, 0.85);
        background: #f6f7f8;
        border-radius: 16rpx;
        margin-right: 30rpx;
      }
      .btn {
        width: 176rpx;
        height: 80rpx;
        text-align: center;
        line-height: 80rpx;
        color: rgba(0, 0, 0, 0.25);
        background: #f6f7f8;
        border-radius: 64rpx;
        &.canSubmit {
          background: #ff5319;
          color: #ffffff;
        }
      }
    }
    &-tips {
      height: 42rpx;
      font-size: 28rpx;
      color: #f20014;
    }
  }
  .list {
    padding: 16rpx 36rpx;
    background-color: #fff;
    font-size: 32rpx;
    color: rgba(0, 0, 0, 0.85);
    &-item {
      margin-bottom: 16rpx;
      &-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16rpx 24rpx;
        border: 2rpx solid rgba(0, 0, 0, 0.08);
        border-radius: 16rpx;
        margin-bottom: 16rpx;
        &.danger {
          border-color: #f20014;
          color: #f20014;
        }
      }
      &-tips {
        font-size: 24rpx;
        color: rgba(0, 0, 0, 0.45);
      }
    }
  }
  .position-f {
    position: fixed;
    z-index: 10;
  }
</style>
