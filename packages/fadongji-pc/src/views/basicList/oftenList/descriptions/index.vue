<template>
  <div class="descriptions">
    <h1 class="titleDes">Descriptions 描述列表</h1>
    <h2>常见于详情页的信息展示。</h2>
  </div>
  <div class="desList">
    <h1> 带边框和背景颜色列表。 </h1>
    <Descriptions title="User Info" bordered>
      <DescriptionsItem label="产品">云数据库</DescriptionsItem>
      <DescriptionsItem label="计费模式">预付</DescriptionsItem>
      <DescriptionsItem label="自动续费">YES</DescriptionsItem>
      <DescriptionsItem label="订购时间">2018-04-24 18:00:00</DescriptionsItem>
      <DescriptionsItem label="预付" :span="2">2019-04-24 18:00:00</DescriptionsItem>
      <DescriptionsItem label="状态" :span="3">
        <a-badge status="processing" text="Running" />
      </DescriptionsItem>
      <DescriptionsItem label="协议金额">$80.00</DescriptionsItem>
      <DescriptionsItem label="折扣">$20.00</DescriptionsItem>
      <DescriptionsItem label="正式收据">$60.00</DescriptionsItem>
      <DescriptionsItem label="配置信息">
        数据磁盘类型:MongoDB
        <br />
        数据库版本:3.4
        <br />
        包:dds.mongo.mid
        <br />
        存储空间:10GB
        <br />
        复制系数:3
        <br />
        地域:华东1
        <br />
      </DescriptionsItem>
    </Descriptions>
    <br />
    <br />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    components: {  },
    setup() {
      return {}
    },
  })
</script>

<style scoped>
  .descriptions {
    width: 80%;
    height: 100px;
    margin: 20px auto;
  }

  .titleDes {
    font-size: 30px;
  }

  .desList {
    padding: 40px;
    width: 80%;
    height: 500px;
    border: 1px solid #b3b3b3;
    margin: 20px auto;
  }
</style>
