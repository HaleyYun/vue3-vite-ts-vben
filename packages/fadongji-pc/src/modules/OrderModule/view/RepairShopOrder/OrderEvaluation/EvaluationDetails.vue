<template>
  <div class="evaluation flex p-24px">
    <div class="e-right flex-1">
      <div class="template--title mb-16px">评价详情</div>
      <div class="ml-24px">
        <div class="pb-24px detailSupportName">{{ detail.supportName }}</div>
        <div class="e-text pb-4px">
          {{ detailContent }}
        </div>
      </div>
      <div class="e-image p-20px" v-if="detail.content">
        <template v-if="detail.sourceType === 3">
          <VoPreviewHeadImg :data-source="detailImgs" />
        </template>
        <template v-else>
          <VoPreviewHeadImg :data-source="recoveryImgs" />
        </template>
      </div>
    </div>
    <div class="e-left">
      <div class="e-avatar text-0px pt-13">
        <img class="inline text-0 rounded-full h-24 w-24" width="80" :src="detail.photoUrl" />
        <div class="text-14px pt-10px text-hex-999">{{ detail.userName }}</div>
        <div class="text-14px pt-10px text-gray-900">{{ detail.buyerName }}</div>
      </div>
      <div class="e-info">
        <div class="e-info--item">
          <div class="e-info--label">服务名称：</div>
          <div class="e-info-value text-hex-3BB19C">{{ detail.supportName }}</div>
        </div>
        <div class="e-info--item">
          <div class="e-info--label">服务评价：</div>
          <div class="e-info-value">
            <a-rate :value="Math.ceil(detail.starMark / 2)" disabled :count="5" />
          </div>
        </div>
        <div class="e-info--item">
          <div class="e-info--label">日期：</div>
          <div class="e-info-value">{{ detail.createTime }}</div>
        </div>
        <!-- 暂时没有 -->
        <!-- <div class="e-info--item">
		  <div class="e-info--label">IP地址：</div>
		  <div class="e-info-value">192.168.1.92</div>
		</div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onBeforeMount } from 'vue'
  import { useRoute } from 'vue-router'
  import adminHttp from '/@/utils/http/adminHttp'
  import VoPreviewHeadImg from '/@/components/VoPreviewHeadImg/VoPreviewHeadImg.vue'
  import { onMountedOrActivated } from '/@/hooks/core/onMountedOrActivated'

  const loadingCtxkey = 'handlerRow'
  const detail = ref<any>({}) //详情对象
  const detailImgs = ref<any>([]) //详情图片
  const recoveryImgs = ref<any>([]) //详情图片
  const route = useRoute()
  const detailContent = ref<string>('')
  //初始化/
  const loadTableData = async () => {
    const res = await adminHttp.ORDER.orderEvaluateServiceDetail({
      sourceId: route.query?.id,
    })
    detail.value = res.data
    //安装的评价
    if (detail.value.sourceType === 3) {
      //内容图片展示
      if (res.data.content) {
        detailContent.value = JSON.parse(res.data?.content)?.content
        const serviceImgs = JSON.parse(JSON.parse(res.data?.content)?.pic).map((item) => {
          return item.src
        })

        detailImgs.value = JSON.parse(res.data.content)?.pic ? serviceImgs : []
      }
    } else {
      if (res.data.content) {
        detailContent.value = JSON.parse(res.data?.content)?.content
        const recoveryDetailImgs = JSON.parse(res.data?.content)?.fileList.map((item) => {
          return item.src
        })
        recoveryImgs.value = JSON.parse(res.data.content)?.fileList ? recoveryDetailImgs : []
      }
    }
  }
  //初始化
  onMountedOrActivated(() => {
    loadTableData()
  })
</script>

<style scoped lang="less">
  .evaluation {
    border: 1px solid rgb(228 228 228);
    height: calc(100vh - 100px);
    overflow-y: hidden;
  }

  .e-info {
    padding-left: 60px;
    padding-top: 40px;

    .e-info--item {
      margin-bottom: 5px;
      font-size: 14px;
      display: flex;
      color: #666;
      align-items: center;
    }
  }

  .e-left {
    width: 370px;
    min-height: 800px;
    background-color: rgb(252 252 252);
    border-right: 1px solid rgb(228 228 228);

    .e-avatar {
      text-align: center;
    }
  }

  .e-right {
    padding: 24px;
    min-height: 800px;
    background-color: #fff;

    .e-operate {
      text-align: center;
    }
    .detailSupportName {
      font-family: 'Microsoft YaHei';
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 22px;
      /* identical to box height, or 157% */

      /* Black/Black 85% */

      color: #262626;
    }

    .e-text {
      font-family: 'Microsoft YaHei';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: #262626;
    }

    .back-position {
      margin-left: 90%;
    }
  }
</style>
