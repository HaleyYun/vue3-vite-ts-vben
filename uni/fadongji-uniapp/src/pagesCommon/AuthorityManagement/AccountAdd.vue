<template>
  <view class="authority">
    <VoNav :title="title" is-have-more place-bg-color="#f7f7f8">
      <template #operation>
        <view v-if="edit" class="color-block-65 fz-32 m-r-32" @click="delFn">删除</view>
      </template>
    </VoNav>

    <EraForm
      ref="accountAdd"
      :model="formData"
      :rules="rules"
      class="apply-form"
      labelPosition="left"
      labelWidth="128"
    >
      <view class="apply-form__title"> 选择角色 </view>
      <EraFormItem
        class="apply-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="子账号角色"
        prop="roleId"
        @click="showRole = true"
      >
        <view class="flex flex-vertical-c flex-justify-r flex1">
          <view v-if="roleIndex >= 0" class="flex1 apply-form__box">{{
            roleData[0][roleIndex].name
          }}</view>
          <view v-else class="flex1 apply-form__box color-block-45">请选择子账号角色</view>
          <VoIcon :opacity="0.25" :size="24" name="right-arrow" />
        </view>
      </EraFormItem>
      <view class="h24 line-bg" />
      <view class="apply-form__title"> 子账户信息 </view>
      <EraFormItem
        class="apply-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="子账户姓名"
        prop="realName"
      >
        <u-input
          v-model="formData.realName"
          border="none"
          class="item-input"
          color="rgba(0, 0, 0, 0.85)"
          fontSize="16px"
          maxlength="12"
          inputAlign="right"
          placeholder="请输入子账户姓名"
          placeholderClass="apply-form__placeholder"
          type="text"
        />
      </EraFormItem>
      <EraFormItem
        class="apply-form__item"
        color="rgba(0, 0, 0, 0.85)"
        label="子账户手机"
        prop="userName"
      >
        <u-input
          :disabled="edit"
          v-model="formData.userName"
          border="none"
          class="item-input"
          color="rgba(0, 0, 0, 0.85)"
          fontSize="16px"
          inputAlign="right"
          maxlength="11"
          placeholder="请输入子账户手机"
          placeholderClass="apply-form__placeholder"
          type="number"
        />
      </EraFormItem>
    </EraForm>

    <VoSafetyArea is-fixed>
      <template #group>
        <view class="add-group flex flex-justify-between">
          <EraButton size="lg" @click="sureFn">确定</EraButton>
        </view>
      </template>
    </VoSafetyArea>

    <u-modal
      :closeOnClickOverlay="true"
      :show="delShow"
      :showCancelButton="true"
      cancelColor="rgba(0, 0, 0, 0.65)"
      cancelText="取消"
      confirmColor="#22284B"
      confirmText="确定"
      width="640rpx"
      @cancel="delShow = false"
      @close="delShow = false"
      @confirm="confirmDelFn"
    >
      <view class="modal-content"> 确认要删除该账号吗？ </view>
    </u-modal>

    <u-picker-era
      :columns="roleData"
      :defaultIndex="defaultIndex"
      :show="showRole"
      cancelColor="rgba(0, 0, 0, 0.65)"
      confirmColor="#22284B"
      keyName="name"
      @cancel="showRole = false"
      @confirm="confirmFn"
    />
  </view>
</template>

<script>
  export default {
    name: 'AccountAdd',
    data() {
      return {
        id: '', //用户account  id
        edit: false,
        isLoading: false,
        defaultIndex: [0],
        roleIndex: -1, // 选中的下标
        showRole: false,
        title: '新增子账号',
        delShow: false,
        formData: {
          realName: '',
          roleId: '',
          userName: '',
        },
        rules: {
          roleId: {
            required: true,
            message: '请选择子账号角色',
            trigger: ['change', 'blur'],
          },
          realName: {
            required: true,
            message: '请输入子账号姓名',
            trigger: ['change', 'blur'],
          },
          userName: [
            {
              type: 'number',
              required: true,
              message: '请输入子账户手机',
              trigger: ['blur', 'change'],
            },
            {
              pattern: /^1[3456789][0-9]{9}$/g, //this.$vocenApi.Pattern.phone
              // 正则检验前先将值转为字符串
              transform(value) {
                return String(value)
              },
              trigger: ['blur', 'change'],
              message: '手机号格式不正确',
            },
          ],
        },
        roleData: [],
      }
    },
    methods: {
      sureFn() {
        this.$refs.accountAdd.validate().then((res) => {
          let param = {
            loading: '加载中',
            realName: this.formData.realName,
            roleId: this.formData.roleId,
            userName: this.formData.userName,
          }
          if (this.isLoading) return
          this.isLoading = true
          if (this.edit) {
            param.accountId = this.id
            this.$VoHttp
              .apiUserInfo$PUT(param)
              .then((res) => {
                uni.$u.toast('保存成功')
                setTimeout(() => {
                  this.isLoading = false
                  this.$backFn()
                }, 1500)
              })
              .catch((err) => {
                this.isLoading = false
                uni.$u.toast(err.message || '添加失败')
              })
          } else {
            this.$VoHttp
              .apiUserInfo(param)
              .then((res) => {
                uni.$u.toast('新增成功')
                setTimeout(() => {
                  this.isLoading = false
                  this.$backFn()
                }, 1500)
              })
              .catch((err) => {
                this.isLoading = false
                uni.$u.toast(err.message || '添加失败')
              })
          }
        })
      },
      // 确定删除
      confirmDelFn() {
        if (this.isLoading) return
        this.isLoading = true
        this.$VoHttp
          .apiUserInfoAccount$Id({ id: this.id })
          .then((res) => {
            uni.$u.toast('删除成功')
            this.delShow = false
            setTimeout(() => {
              this.isLoading = false
              this.$backFn()
            }, 1500)
          })
          .catch((e) => {
            this.delShow = false
            this.isLoading = false
            uni.$u.toast(e.message)
          })
      },
      confirmFn(e) {
        this.roleIndex = e.indexs[0]
        this.formData.roleId = this.roleData[0][this.roleIndex].id
        this.showRole = false
      },
      delFn() {
        this.delShow = true
      },
      initFn() {
        this.$VoHttp.apiUserInfoAccountRole().then((res) => {
          this.roleData.push(res.data)
          // 如果编辑
          if (this.edit) {
            const result = res.data
            this.roleIndex = result.findIndex(({ id }) => id === this.formData.roleId)
            this.defaultIndex[0] = this.roleIndex
          }
        })
      },
    },
    onLoad(options) {
      if (options.edit) {
        this.edit = true
        this.id = options.id
        this.formData.roleId = options.roleId
        this.formData.realName = options.realName
        this.formData.userName = options.userName
        this.title = '编辑子账号'
      }
      this.initFn()
    },
  }
</script>

<style lang="scss" scoped>
  .authority {
    width: 750rpx;
    min-height: 100vh;
    overflow-x: hidden;
    box-sizing: border-box;
    background-color: #f7f7f8;
    padding-top: 24rpx;

    .add-group {
      padding: 18rpx 32rpx;
      background-color: #ffffff;
    }
    .apply-form {
      background: #ffffff;
      &__title {
        padding: 0rpx 32rpx;
        box-sizing: border-box;
        color: rgba(0, 0, 0, 0.85);
        height: 88rpx;
        line-height: 88rpx;
        font-weight: bold;
        font-size: 32rpx;
      }
      &__text {
        color: rgba(0, 0, 0, 0.45);
        font-size: 24rpx;
        padding: 8rpx 48rpx 16rpx 32rpx;
        line-height: 150%;
        box-sizing: border-box;
        width: 750rpx;
        background-color: #f7f7f8;
      }
      &__box {
        color: rgba(0, 0, 0, 0.85);
        font-size: 16px;
        line-height: 24px;
      }
      &__item {
        padding: 0rpx 32rpx;
        text-align: right;
        border-bottom: 2rpx solid $v-bg-light;
        .item-input {
          background-color: #ffffff !important;
        }
        .item-code {
          margin-left: 24rpx;
        }
      }
    }

    .modal-content {
      padding: 15px 7px;
      color: rgba(0, 0, 0, 0.85);
      font-size: 32rpx;
      line-height: 150%;
    }
  }
</style>
