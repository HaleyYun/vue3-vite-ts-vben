<template>
  <div class="evaluation flex">
    <div class="e-left">
      <div class="e-avatar text-0px pt-13">
        <img class="inline text-0 rounded-full h-24 w-24" width="80" :src="detail?.photoUrl" />
        <div class="text-14px pt-10px text-hex-999">{{ detail?.nickName }}</div>
      </div>
      <div class="e-info">
        <div class="">
          <span class="e-info--label">商品：</span>
          <span class="text-hex-3BB19C flex-row">{{ detail?.goodsName }}</span>
        </div>
        <div class="e-info--item">
          <div class="e-info--label">购买数量：</div>
          <div class="e-info-value">{{ detail?.count }}</div>
        </div>
        <div class="e-info--item">
          <div class="e-info--label">商品评价：</div>
          <div class="e-info-value">
            <a-rate :value="Math.ceil(detail?.starMark / 2)" disabled :count="5" />
          </div>
        </div>
        <div class="e-info--item">
          <div class="e-info--label">店家服务：</div>
          <div class="e-info-value text-0px">
            <a-rate :value="Math.ceil(detail?.hotelService / 2)" disabled :count="5" />
          </div>
        </div>
        <div class="e-info--item">
          <div class="e-info--label">物流时效：</div>
          <div class="e-info-value text-0px">
            <a-rate :value="Math.ceil(detail?.logisticsTimeliness / 2)" disabled :count="5" />
          </div>
        </div>
        <div class="e-info--item">
          <div class="e-info--label">日期：</div>
          <div class="e-info-value">{{ detail?.createTime }}</div>
        </div>
      </div>
    </div>
    <div class="e-right flex-1">
      <div class="e-text p-30px">
        <div v-if="detail?.display" class="flex justify-center"> <a-tag color="success">显示中</a-tag></div>
        <div v-if="!detail?.display" class="flex justify-center"> <a-tag color="#cd201f">隐藏中</a-tag></div>
        <div class="text-2xl flex justify-center p-50px">{{ detail?.goodsName }}</div>
        <div class="e-text">
          {{ detailContent }}
        </div>
      </div>
      <div class="e-image p-20px" v-if="detail?.content">
        <VoPreviewHeadImg :data-source="detailImgs" />
      </div>
      <div class="e-operate pt-5">
        <APopconfirm
          title="该操作会显示评论，确定操作吗？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="handlerDetailRow"
        >
        <a-button type="primary" v-if="!detail?.display">显示</a-button>
        </APopconfirm>
        <APopconfirm
          title="该操作会隐藏评论，确定操作吗？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="handlerDisplayRow"
        >
        <a-button type="primary" v-if="detail?.display">隐藏</a-button>
        </APopconfirm>
        
        <APopconfirm
          title="该操作会删除此条评论，确定操作吗？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="handlerDeleteRow"
        >
        <a-button type="danger" class="ml-30" >删除</a-button>
        </APopconfirm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  import adminHttp from '/@/utils/http/adminHttp'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { router } from '/@/router'
  import VoPreviewHeadImg from '/@/components/VoPreviewHeadImg/VoPreviewHeadImg.vue'
  const loadingCtxkey = 'handlerRow'
  const { createMessage } = useMessage()
  const route = useRoute()
  const detail = ref<any>()
  const detailContent = ref<string>('')
  const detailImgs = ref<any>([]) //详情图片
  //初始化
  const loadTableData = async () => {
    await adminHttp
      .orderEvaluateEvaluateDetail({
        orderId: route.query.orderId,
        sourceId: route.query.sourceId,
        sourceType: route.query.sourceType,
      })
      .then((res) => {
        createMessage.success({ content: `获取成功`, key: loadingCtxkey })
        detail.value = res.data

        if (res.data?.content) {
          detailContent.value = JSON.parse(res.data?.content)?.content
          const serviceImgs = JSON.parse(JSON.parse(res.data?.content)?.pic).map((item) => {
            return item.src
          })
          console.log(serviceImgs, 'serviceImgs')
          detailImgs.value = JSON.parse(res.data.content) ? serviceImgs : []
          console.log(detailImgs.value, 'detailImgs')
        }
      })
      .catch((err) => {
        createMessage.error({ content: `获取失败:${err.message}`, key: loadingCtxkey })
      })
  }
  //显示
  const handlerDetailRow=() => {
    const changeSwitchMap = {
      id: detail.value.id,
      display: 1,
    }
    adminHttp
      .orderEvaluateModify(changeSwitchMap)
      .then(() => {
        loadTableData()
      })
      .catch((error) => {
        console.log('error=', error)
      })
  }
  //隐藏
  const handlerDisplayRow=() => {
    const changeSwitchMap = {
      id: detail.value.id,
      display:0,
    }
    adminHttp.orderEvaluateModify(changeSwitchMap)
      .then(() => {
        loadTableData()
      })
      .catch((error) => {
        console.log('error=', error)
      })
  }
  //删除
  const handlerDeleteRow=() => {
    adminHttp
      .orderEvaluateDelete({ id: detail.value.id })
      .then(() => {
        router.go(-1)
      })
      .catch((err) => {
        createMessage.error({ content: `操作失败:${err.message}`, key: loadingCtxkey })
      })
  }
  loadTableData()
</script>

<style scoped lang="less">
  .evaluation {
    border: 1px solid rgb(228 228 228);
    height: calc(100vh - 100px);
    overflow-y: hidden;

    .commit {
      overflow-y: scroll;

      .commit-title {
        display: flex;
        align-items: center;

        .icon {
          width: 14px;
          height: 14px;
        }
      }
    }

    .e-num {
      display: flex;

      .e-num--item {
        margin-right: 10px;
        color: #999;

        .icon {
          width: 16px;
          height: 16px;
          margin-right: 10px;
        }

        display: flex;
        align-items: center;
      }
    }
  }

  .e-info {
    padding-left: 30px;
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
    width: 400px;
    background-color: rgb(252 252 252);
    border-right: 1px solid rgb(228 228 228);

    .e-avatar {
      text-align: center;
    }
  }

  .e-right {
    padding: 30px 50px;
    min-height: 800px;
    background-color: #fff;

    .e-operate {
      text-align: center;
    }

    .e-text {
      color: #999;
      font-size: 14px;
    }

    .back-position {
      margin-left: 90%;
    }
  }
</style>
