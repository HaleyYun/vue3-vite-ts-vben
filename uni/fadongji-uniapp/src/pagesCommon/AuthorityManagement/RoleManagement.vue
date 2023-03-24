<template>
  <view>
    <view class="role flex flex-column">
      <VoNav is-have-more place-bg-color="#f7f7f8" title="角色管理" />
      <scroll-view class="flex1 overflow-y p-t-24" :scroll-y="true">
        <view v-for="(role, roleIndex) of listData" :key="roleIndex" class="role-item">
          <view class="flex flex-vertical-c flex-justify-between m-b-32">
            <view class="fz-32 lh150 fz-b">{{ role.name }}{{ '(' + role.number + ')' }}</view>
            <view class="flex flex-vertical-c">
              <view class="role-line w2 h24 m-r-16" />
              <VoIcon :size="20" class="m-r-8" color="#22284B" name="permission-user" />
              <view class="fz-28 lh150 color-block-65" @click="goSetting(role)">权限配置</view>
            </view>
          </view>
          <view v-if="role.remark" class="m-b-32 fz-28 color-block lh150">
            {{ role.remark }}
          </view>
          <view v-else class="m-b-32 fz-28 color-block lh150 h42" />
          <view class="w-full h2 line-bg m-b-32" />
          <view class="flex flex-vertical-c flex-justify-r">
            <view
              :class="role.beAdmin ? 'role-btn__disabled' : 'role-btn__abled'"
              class="role-btn"
              @click="editRoleFn(role, !role.beAdmin)"
              >修改</view
            >
            <view
              :class="role.number > 0 || role.beAdmin ? 'role-btn__disabled' : 'role-btn__abled'"
              class="role-btn m-l-24"
              @click="delRole(role, !(role.number > 0 || role.beAdmin))"
              >删除</view
            >
          </view>
        </view>
      </scroll-view>

      <VoSafetyArea :isFixed="false">
        <block slot="group">
          <view class="add-group">
            <EraButton fontSize="32" size="medium" @click="addRoleFn">新增角色</EraButton>
          </view>
        </block>
      </VoSafetyArea>
    </view>
    <u-modal
      :closeOnClickOverlay="true"
      :show="showDelRole"
      :showCancelButton="true"
      cancelColor="rgba(0, 0, 0, 0.65)"
      cancelText="取消"
      confirmColor="#22284B"
      confirmText="确定"
      width="640rpx"
      @cancel="showDelRole = false"
      @close="showDelRole = false"
      @confirm="delRoleFn"
    >
      <view class="modal-content"> 确认要删除该角色吗？ </view>
    </u-modal>

    <u-modal
      :show="showEditRole"
      :showCancelButton="true"
      cancelColor="rgba(0, 0, 0, 0.65)"
      cancelText="取消"
      confirmColor="#22284B"
      confirmText="确定"
      width="640rpx"
      @cancel="showEditRole = false"
      @confirm="confirmRoleFn"
    >
      <view class="modal-edit">
        <view class="modal-edit__title">{{ isEdit ? '编辑角色' : '新增角色' }}</view>
        <u--form
          ref="form1"
          :labelStyle="{ fontSize: '24rpx', color: 'rgba(0, 0, 0, 0.25)' }"
          :model="editInfo"
          :rules="rules"
          label-width="200"
          labelPosition="top"
        >
          <u-form-item ref="item1" label="角色名称" prop="name" required>
            <u--input
              v-model.trim="editInfo.name"
              :customStyle="{ paddingLeft: '16rpx' }"
              border="none"
              class="modal-edit__input"
              placeholder="请输入角色名称"
              placeholder-class="place"
              placeholderClass="placeholderClass"
              type="text"
            />
          </u-form-item>
          <u-form-item ref="item2" label="角色介绍" prop="remark">
            <u--input
              v-model.trim="editInfo.remark"
              :customStyle="{ paddingLeft: '16rpx' }"
              border="none"
              class="modal-edit__input"
              placeholder="请输入角色介绍"
              placeholder-class="place"
              placeholderClass="placeholderClass"
              type="text"
            />
          </u-form-item>
        </u--form>
        <view class="h10" />
      </view>
    </u-modal>
  </view>
</template>

<script>
  export default {
    name: 'RoleManagement',
    data() {
      return {
        editInfo: {
          name: '',
          remark: '',
        },
        rules: {
          name: [
            {
              required: true,
              message: '请填写角色',
              trigger: ['blur', 'change'],
            },
            {
              validator: (rule, value, callback) => {
                if (value.length > 5) {
                  return false
                } else {
                  return true
                }
              },
              message: '不能超过5个字',
              trigger: ['change', 'blur'],
            },
          ],
          remark: [
            {
              validator: (rule, value, callback) => {
                if (value.length > 30) {
                  return false
                } else {
                  return true
                }
              },
              message: '不能超过30个字',
              trigger: ['change', 'blur'],
            },
          ],
        },
        delInfo: {},
        isLoading: false,
        isEdit: false,
        listData: [],
        // 删除弹窗
        showDelRole: false,
        // 编辑弹窗
        showEditRole: false,
      }
    },
    methods: {
      /**
       * 新增角色和编辑  确定按钮
       */
      confirmRoleFn() {
        if (this.isLoading) return
        this.$refs.form1.validate().then((res) => {
          this.isLoading = true

          if (this.isEdit) {
            this.$VoHttp
              .apiRole$Put(this.editInfo)
              .then((res) => {
                uni.$u.toast('保存成功')
                this.initFn()
                this.showEditRole = false
                this.isLoading = false
              })
              .catch((e) => {
                this.isLoading = false
                this.showEditRole = false
                uni.$u.toast(e.message)
              })
          } else {
            this.$VoHttp
              .apiRole(this.editInfo)
              .then((res) => {
                uni.$u.toast('新增成功')
                this.initFn()
                this.showEditRole = false
                this.isLoading = false
              })
              .catch((e) => {
                this.isLoading = false
                this.showEditRole = false
                uni.$u.toast(e.message)
              })
          }
        })
      },
      /**
       * 新增角色
       */
      addRoleFn() {
        this.editInfo = {
          name: '',
          remark: '',
        }
        this.isEdit = false
        this.showEditRole = true
      },
      /**
       * 权限配置
       */
      goSetting(role) {
        if (role.beAdmin) {
          uni.$u.toast('默认角色权限不可更改')
          return
        }
        this.$linkToEasy(
          '/pagesCommon/AuthorityManagement/AuthoritySetting?roleId=' +
            role.id +
            '&name=' +
            role.name,
        )
      },
      /**
       * 编辑角色
       */
      editRoleFn(role, enble) {
        if (enble) {
          this.editInfo = { ...role }
          this.isEdit = true
          this.showEditRole = true
        }
      },
      delRoleFn() {
        if (this.isLoading) return
        this.isLoading = true
        this.$VoHttp
          .apiRole$Delete({ id: this.delInfo.id })
          .then((res) => {
            uni.$u.toast('删除成功')
            this.initFn()
            this.showDelRole = false
            this.isLoading = false
          })
          .catch((e) => {
            this.isLoading = false
            this.showDelRole = false
            uni.$u.toast(e.message)
          })
      },
      /**
       * 删除角色
       */
      delRole(role, enble) {
        if (enble) {
          this.delInfo = role
          this.showDelRole = true
        }
      },
      /**
       * 初始化数据
       */
      initFn() {
        this.$VoHttp
          .apiUserInfoAccountRole()
          .then((res) => {
            this.listData = res.data
          })
          .catch((e) => {
            uni.$u.toast(e.message || '请求失败')
          })
      },
    },
    onShow() {
      this.initFn()
    },
  }
</script>

<style lang="scss" scoped>
  .role {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    box-sizing: border-box;
    background-color: #f7f7f8;
    // padding-top: 24rpx;
    // padding-bottom: 128rpx;

    &-line {
      background-color: $v-text-disabled;
    }
    &-item {
      width: 750rpx;
      padding: 32rpx;
      box-sizing: border-box;
      background-color: #ffffff;
      // margin-bottom: 16rpx;
      border-bottom: 16rpx solid #f7f7f8;
    }
    &-form {
      width: 100%;
    }
  }
  .role-btn {
    width: 148rpx;
    height: 56rpx;
    line-height: 56rpx;
    text-align: center;
    font-size: 28rpx;
    border-radius: 30rpx;
    &__disabled {
      border: 2rpx solid #f6f7f8;
      color: $v-c0-25;
    }
    &__abled {
      border: 2rpx solid rgba(0, 0, 0, 0.25);
      color: $v-c0-85;
    }
  }
  .placeholderClass {
    padding-left: 20rpx;
  }
  .modal-edit {
    box-sizing: border-box;
    width: 100%;

    &__title {
      width: 100%;
      color: rgba(0, 0, 0, 0.85);
      font-size: 32rpx;
      font-weight: bold;
      line-height: 150%;
      text-align: center;
      margin-bottom: 32rpx;
    }
    &__input {
      width: 100%;
      height: 88rpx;
      background-color: #f7f7f8;
      box-sizing: border-box;
      font-size: 32rpx;
      color: rgba(0, 0, 0, 0.85);
    }
    .place {
      color: rgba(0, 0, 0, 0.25);
      font-size: 32rpx;
    }
  }

  .modal-content {
    padding: 15px 7px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 32rpx;
    line-height: 150%;
  }

  .add-group {
    width: 750rpx;
    padding: 18rpx 32rpx;
    box-sizing: border-box;
    background-color: #ffffff;
  }
</style>
