<template>
  <view class="edit">
    <VoNav is-fixed is-have-more title="编辑资料">

    </VoNav>
    <view class="edit-form">
      <view class="edit-form__photo" @click="editPhoto">
        <view class="photo-wrap">
          <image :src="formData.photoUrl" class="photo" />
          <image class="icon" src="/static/icons/photo_change.png" />
        </view>
      </view>
      <view class="edit-form__item">
        <view class="item-wrap">
          <view class="label">名称</view>
          <view class="value">{{ formData.name }}</view>
        </view>
      </view>
      <view class="edit-form__item" @click="toEdit('编辑昵称')">
        <view class="item-wrap">
          <view class="label">昵称</view>
          <view class="value">{{ formData.nickName }}</view>
          <VoIcon :opacity="0.25" color="#000000" name="right-arrow" />
        </view>
      </view>
      <view class="edit-form__item" @click="toEdit('编辑个性签名')">
        <view class="item-wrap">
          <view class="label">个性签名</view>
          <view class="value">{{ formData.synopsis }}</view>
          <VoIcon :opacity="0.25" color="#000000" name="right-arrow" />
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  import helpUtil from '@/common/helper'

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
        formData: {
          photoUrl: '',
          name: '',
          nickName: '',
          synopsis: '暂无签名',
        },
      }
    },
    onShow() {
      let info = this.$storage.get('personalInfo')
      console.log(info.synopsis)
      this.formData.photoUrl = info.photoUrl || '/static/default_avatar.png'
      this.formData.name = info.storeName || info.fullName
      this.formData.synopsis = info.synopsis || ''
      this.formData.nickName = info.nickName || ''
    },
    methods: {
      toEdit(title) {
        if (title === '编辑昵称') {
          this.$linkToEasy(
            '/pagesAgent/PersonalHomepage/EditInfoInput?title=' +
              title +
              '&nickName=' +
              this.formData.nickName,
          )
        } else {
          this.$linkToEasy(
            '/pagesAgent/PersonalHomepage/EditInfoInput?title=' +
              title +
              '&synopsis=' +
              this.formData.synopsis,
          )
        }
      },
      //更换头像
      editPhoto() {
        helpUtil
          .chooseImageByPromise({ tip: '上传中', isTencentCloud: false })
          .then((res) => {
            this.formData.photoUrl = res[0].fileNameUrl
            console.log('this.formData.photoUrl', this.formData.photoUrl)
            this.$VoHttp
              .apiCreateQuestionsHomeUpdateUserInfo({
                id: this.userInfo.id,
                photoUrl: res[0].fileNameUrl,
              })
              .then((res2) => {
                if (res2.code === '20001') {
                  uni.$u.toast('上传头像成功')
                  this.$store.dispatch('user/setUseInfoItem', { storeUrl: this.formData.photoUrl })
                  this.$store.dispatch('user/getFullUserInfo')
                  uni.$emit('takephoto')
                }
              })
              .catch((err) => {
                console.log('err', err)
                uni.$u.toast('上传头像失败')
              })
          })
          .catch((err) => {
            console.log('err', err)
          })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .edit {
    height: 100vh;
    background: #fff;
    &-form {
      &__photo {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 54rpx;
        padding-bottom: 72rpx;
        .photo-wrap {
          height: 138rpx;
          position: relative;
          .icon {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 40rpx;
            height: 40rpx;
          }
        }
        .photo {
          width: 138rpx;
          height: 138rpx;
          border-radius: 50%;
        }
      }
      &__item {
        padding-left: 32rpx;
        .item-wrap {
          padding: 24rpx 32rpx 24rpx 0;
          border-bottom: 1px solid #f7f7f8;
          display: flex;
          font-size: 32rpx;
          line-height: 1.5;
          .label {
            color: $v-c0-85;
          }
          .value {
            flex: 1;
            text-align: right;
            color: $v-c0-65;
            word-break: break-all;
            padding-left: 16rpx;
          }
        }
      }
    }
  }
</style>
