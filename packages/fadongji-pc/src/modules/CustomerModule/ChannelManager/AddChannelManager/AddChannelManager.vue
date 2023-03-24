<template>
  <div>
    <div class="box-bg bg-white m-24px p-24px mb-82px">
      <div class="template--title mb-20px">基础信息</div>
      <div class="w-600px mr-auto ml-auto m-0">
        <a-form
          :model="formState"
          name="formRef"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 14 }"
          autocomplete="off"
          ref="formRef"
          :rules="rules"
        >
          <a-form-item label="手机号码" name="userName">
            <a-input
              v-model:value="formState.userName"
              :maxlength="11"
              placeholder="请输入手机号码"
              allow-clear
            />
          </a-form-item>
          <a-form-item label="渠道经理名称" name="contractName">
            <a-input
              v-model:value="formState.contractName"
              :maxlength="10"
              placeholder="请输入"
              allow-clear
            />
          </a-form-item>
          <a-form-item
            label="所属地区"
            name="areaCode"
            :rules="[{ required: true, trigger: 'blur' }]"
          >
            <a-cascader
              v-model:value="formState.areaCode"
              :field-names="fieldNames"
              :options="AreaOptions"
              placeholder="请选择"
            />
          </a-form-item>
        </a-form>
      </div>
    </div>
    <div
      class="fixed bg-white left-250px right-25px bottom-0 flex items-center justify-center p-15px"
    >
      <a-button type="primary w-200px" :loading="addLoading" @click="submit">新增</a-button>
    </div>
  </div>
</template>
<script>
  import { Pattern } from '@vocen/shared'
  import AdminHttp from '/@/utils/http/adminHttp'
  import { AreaDataApi } from '/@/api/model/dictionaryApi'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useRouter } from 'vue-router'

  const { createMessage } = useMessage()

  // 自定义校验营业执照信息
  let checkMobile = async (_rule, value) => {
    if (!value) {
      return Promise.reject('请输入手机号')
    }
    if (!Pattern.isPhone(value)) {
      return Promise.reject('请输入正确的手机号')
    }
    await AdminHttp.COMPANY.CompanyLegalChannelMobile({ mobile: value })

    return Promise.resolve()
  }
  export default {
    name: 'AddChannelManager',
    data() {
      return {
        addLoading: false,
        AreaOptions: [],
        router: useRouter(),
        formState: { userName: '', contractName: '', areaCode: '' },
        fieldNames: { children: 'children', label: 'name', value: 'id' },
        rules: {
          userName: [{ required: true, validator: checkMobile, trigger: 'blur' }],
          contractName: [{ required: true, trigger: 'blur' }],
          areaCode: [{ required: true, trigger: 'blur' }],
        },
      }
    },

    mounted() {
      this.getArea()
    },
    methods: {
      // 提交按钮
      async submit() {
        try {
          const values = await this.$refs.formRef.validateFields()
          console.log('Success:', values)
          this.addCommodity()
        } catch (errorInfo) {
          console.log('Failed:', errorInfo)
        }
      },
      // 新增渠道经理接口
      async addCommodity() {
        try {
          this.addLoading = true
          let params = JSON.parse(JSON.stringify(this.formState))
          params.areaCode = params.areaCode[params.areaCode.length - 1]
          const { code } = await AdminHttp.COMPANY.CompanyLegalChannelAdd(params)
          if (code === '20001') {
            createMessage.success('新增成功')
            this.router.push('/customerModule/ChannelManager/ChannelManagerList')
          }
          this.addLoading = false
        } catch (e) {
          console.log(e)
          this.addLoading = false
        }
      },
      // 获取地区数据 dict
      async getArea() {
        try {
          const data = await AreaDataApi()
          this.AreaOptions = data
        } catch (e) {
          console.log(e)
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  .add-style {
    background: #fff;
  }

  .margin-b-20 {
    margin-bottom: 20px;
  }

  .box-bg {
    height: calc(100vh - 160px);
  }

  .buttons {
    margin-left: 200px;
    margin-top: 50px;
  }
</style>
