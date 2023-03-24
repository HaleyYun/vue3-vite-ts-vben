<template>
  <view class="edit">
    <VoNav :title="navTitle" is-fixed is-have-more is-shadow>

    </VoNav>
    <view class="edit-form">
      <view class="textarea">
        <u--textarea
          v-if="navTitle === '编辑昵称'"
          v-model="value"
          class="edit-form__input height1"
          confirmType="done"
          height="130rpx"
          maxlength="10"
          placeholder="请输入名称"
          placeholderClass="placeholder"
          @input="inputHandle"
        />
        <u--textarea
          v-else
          v-model="value"
          class="edit-form__input height2"
          confirmType="done"
          height="268rpx"
          maxlength="50"
          placeholder="请输入个性签名"
          placeholderClass="placeholder"
        />
        <view class="count"
          >{{ value.length || 0 }}/{{ navTitle === '编辑昵称' ? '10' : '50' }}</view
        >
      </view>

      <view v-if="value" class="edit-form__btn" @click="toSave">保存</view>
      <view v-else class="edit-form__btn disabled">保存</view>
    </view>
  </view>
</template>
<script>
  export default {
    name: 'EditInfo',
    components: {},
    props: {
      // list: {
      //   type: Array,
      // },
    },
    data() {
      return {
        navTitle: '编辑昵称',
        value: '',
        isLoading: false,
        info: '',
      }
    },
    onLoad(options) {
      // let info = this.$storage.get('personalInfo')
      this.value = ''
      if (options.title) {
        this.navTitle = options.title
        if (this.navTitle === '编辑昵称') {
          // this.value = this.userInfo.nickName || info.nickName
          this.value = options.nickName || ''
        } else {
          this.value = options.synopsis || ''
        }
      }
    },
    methods: {
      inputHandle(val) {
        this.value = val.replace(/\s+/g, '')
        // console.log(val, this.value)
      },
      toSave() {
        let info = this.$storage.get('personalInfo')
        if (this.isLoading) {
          return
        }
        let params = { id: this.userInfo.id }
        if (this.navTitle === '编辑昵称') {
          params['nickName'] = this.value
        } else {
          params['synopsis'] = this.value
        }
        this.isLoading = true
        this.$VoHttp
          .apiCreateQuestionsHomeUpdateUserInfo(params)
          .then((res) => {
            if (res.code === '20001') {
              uni.$u.toast('修改成功')
              if (this.navTitle === '编辑昵称') {
                this.$store.dispatch('user/setUseInfoItem', { nickName: this.value })
                info.nickName = this.value
                this.$storage.set('personalInfo', info)
              } else {
                this.$store.dispatch('user/setUseInfoItem', { synopsis: this.value })
                info.synopsis = this.value
                this.$storage.set('personalInfo', info)
              }
              uni.$emit('refreshUserInfo')
              // this.getUserInfo()
              this.$backFn()
            }
          })
          .catch((err) => {
            console.log('err', err)
            uni.$u.toast('修改失败')
          })
      },
      //获取用户信息
      getUserInfo() {
        this.$VoHttp
          .apiCreateQuestionsHomeGetUserInfo({
            platformCode: this.userInfo.platformCode,
            id: this.userInfo.id,
          })
          .then((res) => {
            this.info = res.data
            // storage.set('userInfo', res.data)

            // if (this.navTitle === '编辑昵称') {
            //   this.value = this.info.nickName || ''
            // } else {
            //   this.value = this.info.synopsis || ''
            // }
          })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .edit {
    height: 100vh;
    background: #fff;
    padding: 40rpx 32rpx;
    box-sizing: border-box;
    &-form {
      .textarea {
        position: relative;
        .count {
          position: absolute;
          right: 32rpx;
          bottom: 20rpx;
          color: $v-c0-25;
          font-size: 28rpx;
          line-height: 1.5;
        }
      }
      &__input {
        background: #f7f7f8 !important;
        border: 0;
        color: $v-c0-85;
        padding: 20rpx 32rpx;
        box-sizing: border-box;
      }
      &__btn {
        background: $color-primary-yellow;
        border-radius: 24px;
        text-align: center;
        font-size: 32rpx;
        line-height: 1.5;
        color: #ffffff;
        padding: 22rpx 0;
        margin-top: 166rpx;
        &.disabled {
          background: #f6f7f8;
          color: $v-c0-25;
        }
      }
    }
    .placeholder {
      font-size: 28rpx;
      line-height: 1.5;
      color: $v-c0-25;
    }
    .u-textarea__count {
      background-color: none;
    }
  }
  .height1 {
    height: 130rpx;
  }
  .height2 {
    height: 268rpx;
  }
</style>
