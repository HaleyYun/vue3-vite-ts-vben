<template>
  <div class="jc-login">
    <div class="container">
      <div class="wrapper">
        <div class="login-logo enter-x-l">
          <p>
            <img alt="Vo Cen" src="../../../assets/images/img-logo.png" />
            <span>发动集</span>
          </p>
        </div>
        <div class="flex-item login-info">
          <div class="info-box">
            <img
              v-if="false"
              class="enter-x-r"
              alt="发动集"
              src="../../../assets/images/login-bg.png"
            />
            <h1 v-if="false" class="inline-block mt-4 text-3xl">发动集后台管理系统</h1>
            <p v-if="false" class="mt-4 text-2xl"><span>欢迎使用</span></p>
          </div>
        </div>
        <div class="flex-item login-form">
          <div class="form-box enter-x-l">
            <div>
              <div class="flex items-center">
                <img class="w-55px h-40px" src="../../../assets/images/img-logo.png" alt="发动集" />
                <img
                  class="w-108px h-50px ml-8px"
                  src="../../../assets/images/text-logo.png"
                  alt="发动集"
                />
              </div>
              <div class="text-38px text-desc mt-16px mb-35px">发动机运营平台</div>
            </div>
            <AForm
              layout="vertical"
              ref="formRef"
              :model="formData"
              :rules="getFormRules"
              v-show="getShow"
              @keypress.enter="handleLogin"
            >
              <AFormItem name="account" label="账号：" class="">
                <AInput
                  size="large"
                  v-model:value="formData.account"
                  :placeholder="t('请输入用户名')"
                  autocomplete
                />
                <template #prefix>
                  <user-outlined type="user" />
                </template>
              </AFormItem>
              <AFormItem name="password" label="密码：" class="">
                <AInput-password
                  v-model:value="formData.password"
                  size="large"
                  visibilityToggle
                  :placeholder="t('密码')"
                />
              </AFormItem>
              <!-- <AFormItem>
				No logic, you need to deal with it yourself
				<ACheckbox v-model:checked="rememberMe" size="small">
				  {{ t('sys.login.rememberMe') }}
                </ACheckbox>
              </AFormItem> -->
              <AFormItem class="enter-x-l">
                <AButton type="primary" size="large" block @click="handleLogin" :loading="loading">
                  登录发动集
                </AButton>
              </AFormItem>
            </AForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { UserOutlined } from '@ant-design/icons-vue'
  import { encrypt } from '/@/components/VoGlobalRegister/VoGlobalRegister'
  import { reactive, ref, unref, computed } from 'vue'

  import { useI18n } from '/@/hooks/web/useI18n'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useUserStore } from '/@/store/modules/user'
  import {
    LoginStateEnum,
    useLoginState,
    useFormRules,
    useFormValid,
  } from '/@/modules/LoginModule/view/useLogin'
  import { useDesign } from '/@/hooks/web/useDesign'

  const { t } = useI18n()
  const { notification, createErrorModal } = useMessage()
  const { prefixCls } = useDesign('login')
  const userStore = useUserStore()

  const { getLoginState } = useLoginState()
  const { getFormRules } = useFormRules()

  const formRef = ref()
  const loading = ref(false)
  // const rememberMe = ref(false)

  const formData = reactive({
    account: '',
    password: '',
  })
  const { validForm } = useFormValid(formRef)

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)

  async function handleLogin() {
    const data = await validForm()
    const userInfos = {
      clientId: 'engine-op',
      clientSecret: encrypt.encrypt('engine-op-Secret'),
      grantType: 'password',
      terminalSource: 4,
      password: encrypt.encrypt(formData.password),
      userName: formData.account,
      roleCode: 'op',
      licenseId: '133960256299597825',
      mode: 'none',
    }
    if (!data) return
    try {
      loading.value = true
      const userInfo = await userStore.login(userInfos)
      if (userInfo) {
        notification.success({
          message: t('sys.login.loginSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}: ${userInfos.userName}`,
          duration: 3,
        })
      }
    } catch (error) {
      createErrorModal({
        title: t('sys.api.errorTip'),
        content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
        getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
      })
    } finally {
      loading.value = false
    }
  }
</script>
<style lang="less" scoped>
  .text-desc {
    color: #262626;
  }

  @bg-dark: #293146;

  .jc-login {
    overflow: hidden;
    height: 100%;
    padding: 0 16px;
    position: relative;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin-left: -58%;
      background-image: url('../../../../src/assets/images/login-bg.png');
      background-position: 100%;
      background-repeat: no-repeat;
      background-size: 587px 455px;
      content: '';
    }

    .container {
      margin: 0 auto;
      height: 100%;
      box-sizing: border-box;

      .wrapper {
        display: flex;
        height: 100%;

        .login-logo {
          position: absolute;
          top: 8px;
          display: none;

          p {
            color: #fff;

            img {
              width: 30px;
              vertical-align: -7px;
            }

            span {
              font-weight: bold;
              font-size: 16px;
              display: inline-block;
              padding-left: 5px;
            }
          }
        }

        .flex-item {
          width: 50%;
        }

        .login-info {
          position: relative;

          .info-box {
            position: absolute;
            top: 50%;
            color: #fff;
            margin-top: -159px;

            img {
              width: 45%;
              vertical-align: middle;
            }

            h1 {
              margin: 56px 0 20px 0;
              font-weight: normal;
              color: #fff;
            }
          }
        }

        .login-form {
          position: relative;

          .form-box {
            position: absolute;
            top: 50%;
            margin-top: -250px;
            margin-left: 90px;
            width: 460px;
            padding: 80px;
            box-shadow: 0px 8px 40px rgba(0, 0, 0, 0.06);
            border-radius: 8px;

            .login-title {
              margin-bottom: 20px;
            }

            .btn-login {
              width: 100%;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 1199px) {
    .jc-login {
      background-color: @bg-dark;

      &::before {
        background: none;
      }

      .container {
        .wrapper {
          display: block;

          .login-logo {
            display: block;
          }

          .login-info {
            display: none;
          }

          .login-form {
            position: static;

            .form-box {
              left: 50%;
              margin-left: -200px;
              padding-left: 0;
              background: #fff;
              padding: 50px;
              border-radius: 6px;

              .login-title {
                text-align: center;
              }
            }
          }
        }
      }
    }
  }

  @media screen and (min-width: 1200px) {
    .container {
      max-width: 1200px;
    }
  }

  @media screen and (min-width: 1500px) {
    .container {
      max-width: 1500px;
    }
  }

  @media screen and (min-width: 1600px) {
    .container {
      max-width: 1600px;
    }
  }

  .loop1(@n, @i: 1) when (@i =< @n ) {
    .enter-x-l:nth-child(@{i}) {
      opacity: 0;
      z-index: @i;
      animation: enter-x-l-animation 0.4s ease-in-out 0.3s;
      animation-fill-mode: forwards;
      animation-delay: @i * 0.1s;
    }
    .loop1(@n, (@i + 1));
  }

  .loop2(@n, @i: 1) when (@i =< @n ) {
    .enter-x-r:nth-child(@{i}) {
      opacity: 0;
      z-index: @i;
      animation: enter-x-r-animation 0.4s ease-in-out 0.3s;
      animation-fill-mode: forwards;
      animation-delay: @i * 0.1s;
    }
    .loop2(@n, (@i + 1));
  }

  .loop1(5);
  .loop2(3);

  @keyframes enter-x-r-animation {
    from {
      transform: translateX(0);
    }
    to {
      opacity: 1;
      transform: translateX(50px);
    }
  }

  @keyframes enter-x-l-animation {
    from {
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
</style>
