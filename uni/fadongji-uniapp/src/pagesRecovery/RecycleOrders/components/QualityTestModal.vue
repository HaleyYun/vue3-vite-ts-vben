<template>
  <VoModal :show="modalVisible" showCancelButton @cancel="close" @confirm="confirmFn">
    <view class="modal-content color-block">
      <view class="font-weight-500 p-b-36 text-center fz-32">请提交查验结果</view>
      <EraRadioGroup v-model="quality" class="radio-group flex flex-justify-between">
        <EraRadio
          v-for="(item, index) of radioList"
          :key="index"
          :customStyle="{ paddingBottom: '10px', paddingTop: '10px' }"
          :iconSize="14"
          :label="item.name"
          :name="item.value"
        />
      </EraRadioGroup>
      <view v-if="+quality === 0">
        <EraTextarea
          v-model="reason"
          border="none"
          class="area"
          confirmType="done"
          count
          countStyle="background: inherit;right: 28rpx;bottom: 16rpx;color: rgba(0, 0, 0, 0.25);font-size:28rpx"
          height="142"
          maxlength="200"
          placeholder="请输入不通过原因"
          placeholderStyle="font-size: 28rpx;color: rgba(0, 0, 0, 0.25);"
          @input="inputFn"
        />
        <view v-if="reason.length <= 0" class="fz-28 tip">{{ tipText }}</view>
      </view>
    </view>
  </VoModal>
</template>
<script>
  export default {
    data() {
      return {
        quality: 1, // 0：不通过，1：通过，默认0
        type: 1, // 类型，1:回收查验 2:回收验收
        modalVisible: false,
        info: '',
        price: '',
        tipText: '不可为空',
        isLoading: false,
        radioList: [
          {
            name: '查验通过',
            value: 1,
          },
          {
            name: '查验不通过',
            value: 0,
          },
        ],
        reason: '',
        showReason: false,
      }
    },
    methods: {
      show(info) {
        this.quality = 1
        this.isLoading = false
        this.info = info
        this.modalVisible = true
      },
      close() {
        this.modalVisible = false
        this.reason = ''
      },
      confirmFn() {
        if (this.reason.length <= 0 && +this.quality === 0) {
          uni.$u.toast('请填写查验不通过原因')
          return
        }
        let params = {
          quality: this.quality,
          supportId: this.info.id,
          type: 1,
          reason: this.reason,
        }
        if (this.isLoading) return
        this.isLoading = true
        this.$VoHttp
          .apiOrderRecycleQuality(params)
          .then((res) => {
            uni.$u.toast('查验成功')
            setTimeout(() => {
              this.$emit('updateFn')
            }, 1500)
          })
          .catch((err) => {
            this.isLoading = false
            console.log('err', err)
            uni.$u.toast(err.message || '请检查网络')
          })

        this.modalVisible = false
      },
      inputFn(value) {
        //过滤空格
        this.reason = value.replace(/\s+/g, '')
      },
    },
  }
</script>
<style lang="scss" scoped>
  .modal-content {
    box-sizing: border-box;
    flex: 1;
    .input {
      background: #f7f7f8;
      border-radius: 8rpx;
      padding: 0 24rpx;
      box-sizing: border-box;
      height: 96rpx;
    }
    .tip {
      margin-top: 16rpx;
      color: #ee0a24;
    }
    .area {
      background: #f7f7f8;
      border-radius: 4px;
      margin-top: 24rpx;
    }
  }
</style>
