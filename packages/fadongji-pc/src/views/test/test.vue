<template>
  <div id="testContainer" class="align-center p-5">
    <a-divider>分页组件展示</a-divider>
    <div class="com-item">
      <VoPagination
        :total="pagination.total"
        :current="pagination.current"
        :page-size="pagination.pageSize"
        @pagination="paginationChange"
      />
      <a-button @click="paginationTest">更改页码</a-button>
    </div>
    <a-divider>心型评级组件展示</a-divider>
    <div class="com-item">
      <VoHeart :level="5" :size="15" />
    </div>
    <a-divider>素材库展示</a-divider>
    <div class="com-item">
      <div class="flex-1 pl-10 pr-10">
        <a-button type="primary" id="open" @click="mVisible = true">
          打开素材库
          <VoMaterialLibrary
            :value="[
              'https://dacai-static-1304549078.cos.ap-shanghai.myqcloud.com/upload/2022-05-11/e9b638ad623db2e90fc9792d88145760.jpeg',
            ]"
            @change="selectImage"
            container="#testContainer"
            target="#open"
            v-model:visible="mVisible"
          />
        </a-button>
      </div>
    </div>
    <a-divider>商品头图编辑展示</a-divider>
    <div class="com-item">
      <div class="flex-1 pl-10 pr-10">
        <VoGoodsHeaderImage container="#testContainer" :images="images" @change="imgChange" />
      </div>
    </div>
    <a-divider>规格属性组件展示</a-divider>
    <div class="com-item">
      <div class="flex-1">
        <EraSpecs />
      </div>
    </div>
    <a-divider>评论组件详情展示</a-divider>
    <div class="com-item">
      <div class="flex-1 pl-10 pr-10">
        <VoEvaluationDetails />
      </div>
    </div>
    <a-divider>图标组件展示</a-divider>
    <div class="com-item">
      <div class="flex-1 pl-10 pr-10">
        <a-space>
          <VoIcon name="search" :size="30" color="#ff6400" />
          <VoIcon name="sell-goods-fill" :size="40" color="#ff6400" />
          <VoIcon name="purchase-fill" :size="50" color="#1ABC9C" />
          <VoIcon name="edit" :size="30" color="#000000" />
          <VoIcon name="right-fill" :size="20" color="#dddddd" />
          <VoIcon name="person" :size="10" color="#eeeeee" />
        </a-space>
      </div>
    </div>
    <a-divider>分润组件展示</a-divider>
    <div>
      <a-button @click="openPg">打开分润组件</a-button>
    </div>

    <a-divider>商品头图预览展示</a-divider>
    <div class="com-item">
      <div class="flex-1 pl-10 pr-10">
        <VoGoodsHeaderImage :preview="true" />
      </div>
    </div>

    <VoBenefit title="B15荣光黑色OCV阀分润信息" v-model:visible="benefitVisible" />
    <EraTable />
  </div>
</template>

<script setup>
  import { onMounted, reactive, ref, unref } from 'vue'
  import VoPagination from '/@/components/VoPagination/VoPagination.vue'
  import VoHeart from '/@/components/VoHeart/VoHeart.vue'
  import EraSpecs from '/@/components/EraSpecs/EraSpecs.vue'
  import VoEvaluationDetails from '/@/components/VoEvaluationDetails/VoEvaluationDetails.vue'
  import VoIcon from '/@/components/VoIcon/VoIcon.vue'
  import VoBenefit from '/@/components/VoBenefit/VoBenefit.vue'
  import VoGoodsHeaderImage from '/@/components/VoGoodsHeaderImage/VoGoodsHeaderImage.vue'
  import VoMaterialLibrary from '/@/components/VoMaterialLibrary/VoMaterialLibrary.vue'
  import EraTable from '../../components/EraSlotTable/EraSlotTable.vue'

  const open = ref(null)
  const benefitVisible = ref(false)
  const photoGallery = ref(null)
  const pagination = reactive({
    total: 158,
    current: 1,
    pageSize: 20,
  })
  const images = ref([
    {
      id: 1,
      name: 'test',
      src: '',
      type: 1,
    },
    {
      id: 2,
      name: 'test',
      src: '',
      type: 1,
    },
    {
      id: 3,
      name: 'test',
      src: '',
      type: 1,
    },
  ])

  const imgChange = (imgs) => {
    // console.log(imgs)
  }

  const mVisible = ref(false)

  const handleOk = () => {
    benefitVisible.value = false
  }

  onMounted(() => {})
  const selectImage = (val) => {}
  const openPg = () => {
    benefitVisible.value = true
  }

  const paginationChange = ({ current, pageSize }) => {
    pagination.current = current
    pagination.pageSize = pageSize
  }

  const paginationTest = () => {
    pagination.total = 1000
  }
</script>

<style scoped lang="less">
  #testContainer {
    position: relative;
  }

  .com-item {
    display: flex;
    justify-content: center;
    padding: 30px 0;
    background-color: #fff;
  }
</style>
