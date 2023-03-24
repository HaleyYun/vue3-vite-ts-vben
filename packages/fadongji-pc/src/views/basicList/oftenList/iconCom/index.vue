<template>
  <div class="icon">
    <h1 class="titleIcon">图标按钮</h1>
    <h2>语义化的矢量图形。使用图标组件</h2>
  </div>
  <div class="iconList">
    <h1>提示建议性图标</h1>
    <QuestionCircleTwoTone :style="{ fontSize: '30px', color: '#08c' }" /> &nbsp;&nbsp;
    <WarningTwoTone :style="{ fontSize: '30px', color: '#08c' }" /> &nbsp;&nbsp;
    <ExclamationCircleTwoTone :style="{ fontSize: '30px', color: '#08c' }" /> &nbsp;&nbsp;
    <CheckCircleTwoTone :style="{ fontSize: '30px', color: '#08c' }" /> &nbsp;&nbsp;
    <InfoCircleTwoTone :style="{ fontSize: '30px', color: '#08c' }" /> &nbsp;&nbsp;
    <br />
    <br />
    <h1> 品牌和标识 </h1>
    <WindowsOutlined :style="{ fontSize: '30px', color: '#08c' }" /> &nbsp;&nbsp;
    <WeiboSquareOutlined :style="{ fontSize: '30px', color: '#08c' }" /> &nbsp;&nbsp;
    <TaobaoCircleOutlined :style="{ fontSize: '30px', color: '#08c' }" /> &nbsp;&nbsp;
    <AlipayCircleOutlined :style="{ fontSize: '30px', color: '#08c' }" /> &nbsp;&nbsp;
    <IeOutlined :style="{ fontSize: '30px', color: '#08c' }" /> &nbsp;&nbsp;
    <br />
    <br />
    <h1>网站通用图标</h1>
    <TeamOutlined :style="{ fontSize: '30px', color: '#08c' }" /> &nbsp;&nbsp;
    <WifiOutlined :style="{ fontSize: '30px', color: '#08c' }" /> &nbsp;&nbsp;
    <SettingOutlined :style="{ fontSize: '30px', color: '#08c' }" /> &nbsp;&nbsp;
    <BugOutlined :style="{ fontSize: '30px', color: '#08c' }" /> &nbsp;&nbsp;
    <AudioOutlined :style="{ fontSize: '30px', color: '#08c' }" /> &nbsp;&nbsp;
  </div></template
>
<script lang="ts">
  import { defineComponent } from 'vue'
  import {
    QuestionCircleTwoTone,
    WarningTwoTone,
    ExclamationCircleTwoTone,
    CheckCircleTwoTone,
    InfoCircleTwoTone,
    WindowsOutlined,
    WeiboSquareOutlined,
    TaobaoCircleOutlined,
    AlipayCircleOutlined,
    IeOutlined,
    TeamOutlined,
    WifiOutlined,
    SettingOutlined,
    BugOutlined,
    AudioOutlined,
  } from '@ant-design/icons-vue'
  export default defineComponent({
    components: {
      QuestionCircleTwoTone,
      WarningTwoTone,
      ExclamationCircleTwoTone,
      CheckCircleTwoTone,
      InfoCircleTwoTone,
      WindowsOutlined,
      WeiboSquareOutlined,
      TaobaoCircleOutlined,
      AlipayCircleOutlined,
      IeOutlined,
      TeamOutlined,
      WifiOutlined,
      SettingOutlined,
      BugOutlined,
      AudioOutlined,
    },
    setup() {
      return {}
    },
  })
</script>

<style scoped>
  .icon {
    width: 80%;
    height: 100px;
    margin: 20px auto;
  }

  .iconList {
    padding: 40px;
    width: 80%;
    height: 400px;
    border: 1px solid #b3b3b3;
    margin: 20px auto;
  }

  .titleIcon {
    font-size: 30px;
  }
</style>
