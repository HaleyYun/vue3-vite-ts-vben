<template>
  <Dropdown placement="bottomLeft" :overlayClassName="`${prefixCls}-dropdown-overlay`">
    <span :class="[prefixCls, `${prefixCls}--${theme}`]" class="flex">
      <img :class="`${prefixCls}__header`" :src="getUserInfo.avatar" />
      <span :class="`${prefixCls}__info hidden md:block`">
        <span :class="`${prefixCls}__name  `" class="truncate">
          {{ getUserInfo.realName || getUserInfo.userName }}
        </span>
      </span>
    </span>

    <template #overlay>
      <Menu @click="handleMenuClick">
        <MenuDivider v-if="getShowDoc" />
        <MenuItem
          v-if="getUseLockPage"
          key="lock"
          :text="t('layout.header.tooltipLock')"
          icon="ion:lock-closed-outline"
        />
        <MenuItem
          key="logout"
          :text="t('layout.header.dropdownItemLoginOut')"
          icon="ion:power-outline"
        />
        <MenuItem
          key="setup"
          :text="t('layout.header.dropdownItemLoginSetUp')"
          icon="ion:settings-outline"
        />
      </Menu>
    </template>
  </Dropdown>
  <LockAction @register="register" />
  <a-modal
    v-model:visible="setupVisible.visible"
    :title="setupVisible.title"
    :footer="null"
    width="1000px"
  >
    <div class="p-15px">
      <AForm
        ref="formRef"
        :label-col="{ span: 10 }"
        :wrapper-col="{ span: 6 }"
        :model="formState"
        name="basic"
        autocomplete="off"
        @finish="onFinish"
      >
        <AFormItem
          name="account"
          label="用户帐号"
          :rules="[
            {
              required: true,
              message: '请输入用户帐号',
            },
          ]"
        >
          <a-input v-model:value="formState.account" disabled placeholder="请输入用户帐" />
        </AFormItem>
        <AFormItem
          name="realName"
          label="真实姓名"
          :rules="[
            {
              required: true,
              message: '请输入真实姓名',
            },
          ]"
        >
          <a-input v-model:value="formState.realName" disabled placeholder="请输入真实姓名" />
        </AFormItem>
        <AFormItem
          name="oldPassword"
          label="旧密码"
          :hasFeedback="true"
          :validateStatus="verifyStatus"
          :rules="[
            {
              required: true,
              message: '请输入原密码',
            },
          ]"
        >
          <a-input-password
            v-model:value="formState.oldPassword"
            @change="inputOldPassword"
            allow-clear
            placeholder="请输入原密码"
            :maxlength="20"
          />
        </AFormItem>
        <AFormItem
          name="newPassword"
          label="新密码"
          :hasFeedback="true"
          :validateStatus="verifyNewStatus"
          :rules="[
            {
              required: true,
              message: '请输入新密码',
            },
          ]"
        >
          <a-input-password
            v-model:value="formState.newPassword"
            @change="inputNewValue"
            @blur="newPassword"
            placeholder="请输入新密码"
            allow-clear
            :maxlength="20"
          />
        </AFormItem>
        <AFormItem
          name="againNewPassword"
          label="再次确认新密码"
          :hasFeedback="true"
          :validateStatus="verifyAgainStatus"
          :rules="[
            {
              required: true,
              message: '再次输入新密码',
            },
          ]"
        >
          <a-input-password
            @change="inputAgainValue"
            @blur="againPassword"
            allow-clear
            v-model:value="formState.againNewPassword"
            placeholder="再次输入新密码"
            :maxlength="20"
          />
        </AFormItem>
        <a-form-item :wrapper-col="{ offset: 12, span: 16 }">
          <a-button type="primary" html-type="submit">提交</a-button>
        </a-form-item>
      </AForm>
    </div>
  </a-modal>
</template>
<script lang="ts">
  // components
  import { Dropdown, Menu } from 'ant-design-vue'

  import { defineComponent, computed, reactive, ref, onBeforeMount } from 'vue'

  import { DOC_URL } from '/@/settings/siteSetting'
  import adminHttp from '/@/utils/http/adminHttp'
  import { VOCEN_USERINFO } from '/@/enums/VoCacheEnum'
  import { storage } from '/@/components/VoGlobalRegister/VoGlobalRegister'
  import { useUserStore } from '/@/store/modules/user'
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting'
  import { useI18n } from '/@/hooks/web/useI18n'
  import { useDesign } from '/@/hooks/web/useDesign'
  import { useModal } from '/@/components/Modal'

  import headerImg from '/@/assets/images/header.png'
  import { propTypes } from '/@/utils/propTypes'
  import { openWindow } from '/@/utils'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent'
  import {onMountedOrActivated} from "/@/hooks/core/onMountedOrActivated";

  type MenuEvent = 'logout' | 'doc' | 'lock' | 'setup'

  export default defineComponent({
    name: 'UserDropdown',
    components: {
      Dropdown,
      Menu,
      MenuItem: createAsyncComponent(() => import('./DropMenuItem.vue')),
      MenuDivider: Menu.Divider,
      LockAction: createAsyncComponent(() => import('../lock/LockModal.vue')),
    },
    props: {
      theme: propTypes.oneOf(['dark', 'light']),
    },
    setup() {
      const { createMessage } = useMessage()
      const { prefixCls } = useDesign('header-user-dropdown')
      const { t } = useI18n()
      const { getShowDoc, getUseLockPage } = useHeaderSetting()
      const userStore = useUserStore()
      const verifyStatus = ref('')
      const verifyNewStatus = ref('')
      const verifyAgainStatus = ref('')
      const getUserInfo = computed(() => {
        const { realName = '', avatar, desc, userName } = userStore.getUserInfo || {}
        return { realName, avatar: avatar || headerImg, desc, userName }
      })
      const setupVisible = reactive({
        title: '修改密码',
        visible: false,
        id: '',
      })
      interface FormState {
        account: any
        realName: any
        oldPassword: any
        newPassword: any
        againNewPassword: any
      }
      const formRef = ref<FormInstance | undefined>()
      const formState = reactive<FormState>({
        account: '',
        realName: '',
        oldPassword: '',
        newPassword: '',
        againNewPassword: '',
      })

      const [register, { openModal }] = useModal()

      function handleLock() {
        openModal(true)
      }

      function setupLock() {
        setupVisible.visible = true
      }

      //  login out
      function handleLoginOut() {
        userStore.confirmLoginOut()
      }

      // open doc
      function openDoc() {
        openWindow(DOC_URL)
      }

      function handleMenuClick(e: { key: MenuEvent }) {
        switch (e.key) {
          case 'logout':
            handleLoginOut()
            break
          case 'doc':
            openDoc()
            break
          case 'lock':
            handleLock()
            break
          case 'setup':
            setupLock()
            break
        }
      }
	  onMountedOrActivated(() => {
        // 初始化数据
        initDetail()
      })
      const initDetail = async () => {
        try {
          const loginInfo = storage.get(VOCEN_USERINFO)
            ? JSON.parse(storage.get(VOCEN_USERINFO))
            : null
          if (!loginInfo) return null
          const { data } = await adminHttp.USER.userInfoOpDetail({
            userId: loginInfo.id,
          })
          const userInfo = data
          formState.account = userInfo.userName
          formState.realName = userInfo.realName
        } catch (e) {
          console.log(e)
        }
      }
      //提交
      const onFinish = (values: any) => {
        formRef.value
          .validate()
          .then(() => {
            console.log('Success:', values)
            try {
              const loginInfo = storage.get(VOCEN_USERINFO)
                ? JSON.parse(storage.get(VOCEN_USERINFO))
                : null
              if (!loginInfo) return null
              adminHttp.USER.userInfoOpUpdatePassword({
                userId: loginInfo.id,
                oldPassword: formState.oldPassword,
                password: formState.newPassword,
                againPassword: formState.againNewPassword,
              })
                .then((res) => {
                  if (res.code === '20001') {
                    createMessage.success('密码变更成功，请重新登录')
                    userStore.logout()
                  }
                })
                .catch((err) => {
                  console.log(err, 'err')
                })
                .finally((e) => {
                  console.log(e, 'e')
                })
            } catch (e) {
              console.log(e)
            }
          })
          .catch((e) => {
            console.log(e, '校验不通过')
          })
      }

      const reg = new RegExp(
        /^[a-zA-Z0-9]{6,20}$/,
      )
      const regChinese = /[\u4e00-\u9fa5]/g
      const characters= /[^\x00-\xff]/g
     const special = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")

      //原密码
      const inputOldPassword = () => {
        if (formState.oldPassword.replace(/\s/, '') === '') {
          createMessage.error('请输入原密码')
          formState.oldPassword = ''
          verifyStatus.value = 'warning'
        }
      }
      // const oldPassword = () => {
      //   if (formState.oldPassword.length < 6) {
      //     createMessage.error('密码长度要求6至20字，请重新输入')
      //     verifyStatus.value = 'error'
      //   } else {
      //     if (!reg.test(formState.oldPassword)) {
      //       createMessage.error('密码需包含6-20字符，包括数字，大小写字母以及符号')
      //       verifyStatus.value = 'error'
      //     }else{
      //       verifyStatus.value = 'success'
      //     }
      //   }
      // }
      //新密码
      const inputNewValue = () => {
        if (formState.newPassword.replace(/\s/, '') === '') {
          createMessage.error('请输入新密码')
          formState.newPassword = ''
          verifyNewStatus.value = 'warning'
        }
        if(regChinese.test(formState.newPassword)){
          formState.newPassword=formState.newPassword.replace(regChinese,'')
        }
        if(characters.test(formState.newPassword)){
          formState.newPassword=formState.newPassword.replace(characters,'')
        }
         if (special.test(formState.newPassword)) {
            createMessage.error('密码不能含有特殊字符')
            verifyNewStatus.value = 'warning'
          }
        
      }
      const newPassword = () => {
        if (formState.newPassword.length < 6) {
          createMessage.error('密码长度要求6至20字，请重新输入')
          verifyNewStatus.value = 'error'
        } else {
          if (!reg.test(formState.newPassword)) {
            createMessage.error('密码需包含6-20字符，包括数字，大小写字母')
            verifyNewStatus.value = 'error'
          }else {
            verifyNewStatus.value = 'success'
          }
        }
      }
      //再次确认新密码
      const inputAgainValue = () => {
        if (formState.againNewPassword.replace(/\s/, '') === '') {
          createMessage.error('请输入新密码')
          formState.againNewPassword = ''
          verifyNewStatus.value = 'warning'
        }
        if(regChinese.test(formState.againNewPassword)){
          formState.againNewPassword=formState.againNewPassword.replace(regChinese,'')
        }
        if(characters.test(formState.againNewPassword)){
          formState.againNewPassword=formState.againNewPassword.replace(characters,'')
        }
        if (special.test(formState.againNewPassword)) {
            createMessage.error('密码不能含有特殊字符')
            verifyNewStatus.value = 'warning'
          }
      }
      const againPassword = () => {
        if (formState.againNewPassword.length < 6) {
          createMessage.error('密码长度要求6至20字，请重新输入')
          verifyNewStatus.value = 'error'
        } else {
          if (!reg.test(formState.againNewPassword)) {
            createMessage.error('密码需包含6-20字符，包括数字，大小写字母')
            verifyAgainStatus.value = 'error'
          } else {
            verifyAgainStatus.value = 'success'
          }
        }
      }

      return {
        // oldPassword,
        characters,
        regChinese,
        inputNewValue,
        newPassword,
        inputAgainValue,
        againPassword,
        prefixCls,
        t,
        getUserInfo,
        handleMenuClick,
        getShowDoc,
        register,
        getUseLockPage,
        setupLock,
        setupVisible,
        formState,
        formRef,
        initDetail,
        onFinish,
        inputOldPassword,
        reg,
        verifyStatus,
        verifyAgainStatus,
        verifyNewStatus,
      }
    },
  })
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-header-user-dropdown';

  .@{prefix-cls} {
    height: @header-height;
    padding: 0 0 0 10px;
    padding-right: 10px;
    overflow: hidden;
    font-size: 12px;
    cursor: pointer;
    align-items: center;

    img {
      width: 24px;
      height: 24px;
      margin-right: 12px;
    }

    &__header {
      border-radius: 50%;
    }

    &__name {
      font-size: 14px;
    }

    &--dark {
      &:hover {
        background-color: @header-dark-bg-hover-color;
      }
    }

    &--light {
      &:hover {
        background-color: @header-light-bg-hover-color;
      }

      .@{prefix-cls}__name {
        color: #fff;
      }

      .@{prefix-cls}__desc {
        color: @header-light-desc-color;
      }
    }

    &-dropdown-overlay {
      .ant-dropdown-menu-item {
        min-width: 160px;
      }
    }
  }
</style>
