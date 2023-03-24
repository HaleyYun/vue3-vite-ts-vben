<template>
  <VoModal
    :confirmText="type == '0' ? '创建销售商品' : goodsStatus == 1 ? '查看销售商品' : '确定'"
    :show="modalVisible"
    showCancelButton
    @cancel="close"
    @confirm="confirmFn"
  >
    <view class="modal-content color-block fz-28">
      <view class="font-weight-500 p-b-36 text-center fz-32">确认收货</view>
      <!-- 无关联的销售商品 -->
      <view v-if="type == '0'">
        当前回收商品尚无关联的销售商品，无法确认收货。请确认是否前往创建销售商品？
      </view>
      <!-- 已创建销售商品 -->
      <view v-else-if="type == '1' && goodsStatus !== 1">
        <view class="p-l-20">旧机分类：</view>
        <EraRadioGroup v-model="radioValue" class="radio-group" @change="groupChange">
          <EraRadio
            v-for="(item, index) in radioList"
            :key="index"
            :customStyle="{ paddingBottom: '10px', paddingTop: '10px' }"
            :iconSize="14"
            :label="item.name"
            :name="item.value"
          />
        </EraRadioGroup>
      </view>
      <view v-else>
        当前回收商品关联的销售商品正在审核中，无法确认收货。请在销售商品审核通过后再确认收货。
      </view>
    </view>
  </VoModal>
</template>
<script>
  export default {
    props: {
      type: {
        type: Number,
        default: 1,
      },
      goodsStatus: {
        type: Number,
        default: 0,
      },
      radioList: {
        type: Array,
        default() {
          return [
            {
              name: 'A类',
              value: 'A',
            },
            {
              name: 'B类',
              value: 'B',
            },
            {
              name: 'C类',
              value: 'C',
            },
          ]
        },
      },
    },
    data() {
      return {
        modalVisible: false,
        info: '',
        price: '',
        tipText: '不可为空',
        isLoading: false,

        radioValue: 'A', // '0'：A类，'1'：B类，'2'：C类，默认A类
        reason: '',
        showReason: false,
        modelId: '',
      }
    },
    methods: {
      show(info) {
        this.info = info
        this.isLoading = false
        this.modalVisible = true
        this.modelId = info.engineMsg.modelId
      },
      close() {
        this.modalVisible = false
        this.reason = ''
        this.radioValue = '0'
      },
      confirmFn() {
        if (this.type == 1) {
          if (this.goodsStatus !== 1) {
            let params = {
              id: this.info.id,
              level: this.radioValue,
              modelId: this.modelId,
            }
            if (this.isLoading) return
            this.isLoading = true
            this.$VoHttp
              .apiOrderRecycleReceiptGoods(params)
              .then((res) => {
                uni.$u.toast('订单完成')
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
          } else {
            this.modalVisible = false
            this.$linkToEasy('/pagesRecovery/SellGood/GoodList/GoodList')
          }
        } else {
          this.modalVisible = false
          this.$linkToEasy('/pagesRecovery/SellGood/ReleaseSellGood/ReleaseSellGood')
        }
      },
      groupChange(n) {
        // console.log('groupChange', n)
        if (this.radioValue === '0') {
          this.showReason = true
        } else {
          this.showReason = false
        }
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
