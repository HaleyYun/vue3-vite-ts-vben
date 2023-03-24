<template>
  <view class="note">
    <VoNav is-fixed is-have-more title="修改备注">
      <block slot="operation">
        <view class="note-complete no-disable m-r-16" @click="complete">完成</view>
<!--        <view class="note-complete disable m-r-16" v-else>完成</view>-->
      </block>
    </VoNav>
    <EraForm
      class="note-form m-t-16"
      labelWidth="128"
      labelPosition="left"
      :model="formData"
      ref="form1"
    >
      <EraFormItem
        class="note-form__item"
        label="备注"
        prop="faRenName"
        color="rgba(0, 0, 0, 0.85)"
      >
        <u-input
          class="item-input"
          placeholder="请输入"
          placeholderClass="note-form__placeholder"
          v-model="formData.userRemarks"
          border="none"
          inputAlign="right"
          fontSize="16px"
          color="rgba(0, 0, 0, 0.85)"
        />
      </EraFormItem>
    </EraForm>
<!--    <view class="note-bg">-->
<!--      <view class="note-bg__list flex flex-vertical-c flex-justify-between">-->
<!--        <view>备注</view>-->
<!--        <u-input  border="none" />-->
<!--      </view>-->
<!--    </view>-->
  </view>
</template>

<script>
  export default {
    name: 'ModifyRemarks',
    data() {
      return {
        formData: {
          userRemarks: '', // 修改备注
          targetUserId:'',
          targetName:'',
        },

      }
    },
    onLoad(options){
       console.log(options)
       this.formData = options;

    },
    computed:{
      getUserRemarks(){
        if(this.formData.userRemarks &&this.formData.userRemarks.trim() != ''){
           return true;
        }else {
          return false
        }

      }
    },
    methods: {

      async complete() {
        try {
          const {code } = await this.$VoHttp.IM.apiImMyAttentionUpdateNickName(this.formData);
          if(code == '20001'){
            uni.$u.toast('修改成功！');
            // uni.$emit('updateNickName',{nickName})
            this.$store.dispatch('im/updateTargetInfo',{targetNickName:this.formData.userRemarks})
            this.$backFn()
          }
        }catch (e) {
           console.log(e)
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .note {
    width: 750rpx;
    height: 100vh;
    &-complete {
      width: 120rpx;
      height: 64rpx;
      line-height: 64rpx;
      text-align: center;
      font-size: 24rpx;
      border-radius: 100rpx;
      &.no-disable {
        color: #ffffff;
        background: $color-primary-yellow;
      }
      &.disable {
        background: $color-disabled-yellow;
        color: $v-c0-25;
      }
    }
    &-form {
      padding: 0 32rpx;
      background: #ffffff;
      &__item {
        text-align: right;
        border-bottom: 2rpx solid $v-bg-light;
      }
      &__placeholder {
        text-align: right;
        color: $v-c0-25 !important;
        font-size: 32rpx;
      }
    }
  }
</style>
