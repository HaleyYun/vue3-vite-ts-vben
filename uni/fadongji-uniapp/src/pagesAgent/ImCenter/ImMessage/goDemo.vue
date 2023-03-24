<template>
  <view class="demo">
    <VoActionSheet
      :actions="list"
      :closeOnClickOverlay="true"
      :closeOnClickAction="true"
      :title="title"
      :show="showSheet"
      @close="close"
    />
    <button @click="showSheet = true">弹出菜单</button>
    <VoModal :show="showModal" :title="title" :content="content" @close="close" />
    <button @click="showModal = true">弹出模态框</button>
    <VoBadge style="display: inline" :value="99" />
    <view style="display: inline-block">
      <VoTag text="标签" plain shape="circle" size="mini" />
    </view>
    <view class="flex flex-vertical-c" style="height: 20px">
      <VoLine color="#F7F7F8" />
    </view>
    <view style="height: 20px">
      <VoDivider text="暂无数据" lineColor="rgba(0, 0, 0, 0.08)" />
    </view>
    <VoCellGroup>
      <VoCell
        image="/static/icons/add.png"
        title="停车坐爱枫林晚"
        :badge="true"
        :isLink="true"
        arrow-direction="down"
      />
      <VoCell
        icon="/static/icons/add.png"
        title="霜叶红于二月花"
        :isLink="true"
        value="内容"
        :badgeDot="true"
        arrow-direction="right"
      />
    </VoCellGroup>
    <VoCommentOne :bigV="true" :content="contentOne" :twoLevel="true" :author="true" />
    <VoCommentOne :bigV="true" :content="contentOne" />
    <VoCommentOne :bigV="true" :content="contentOne" />
    <VoCommentOne :bigV="true" :content="contentOne" />
    <u-popup :show="showPro" @close="close" @open="open">
      <VoHairProblem @close="close" />
    </u-popup>
    <button @click="showPro = true">发问题</button>
    <button @click="goAnswerAll">去全部回答</button>
    <button @click="goPriceGuide">去价格指导</button>
    <button @click="goChooseTemplate">去选模板</button>
    <button @click="showGoodsClassify = true">商品分类弹框</button>
    <u-popup :show="showGoodsClassify" mode="right" @close="closeClassify" @open="openClassify">
<!--      <GoodsClassifyPopup @determine="determine" />-->
    </u-popup>
    <button @click="goCommodityModel">去商品型号</button>
    <button @click="goCommodityParameter">去商品参数</button>
    <button @click="goReplenishGoodsList">去上货列表</button>
    <button @click="goReplenishRecord">去补货记录</button>
    <button @click="goBuiltWarehouse">去新建仓库</button>
  </view>
</template>
<script>
  import VoActionSheet from '@/components/VoActionSheet/VoActionSheet'
  import VoModal from '@/components/VoModal/VoModal'
  import VoBadge from '@/components/VoBadge/VoBadge'
  import VoTag from '@/components/VoTag/VoTag'
  import VoLine from '@/components/VoLine/VoLine'
  import VoDivider from '@/components/VoDivider/VoDivider'
  import VoCell from '@/components/VoCell/VoCell'
  import VoCellGroup from '@/components/VoCellGroup/VoCellGroup'
  import VoCommentOne from '@/components/VoCommentOne/VoCommentOne'
  import VoHairProblem from '@/components/VoHairProblem/VoHairProblem'
  // import GoodsClassifyPopup from '../../../pagesProduct/components/GoodsClassifyPopup'
  export default {
    components: {
      VoActionSheet,
      VoModal,
      VoBadge,
      VoTag,
      VoLine,
      VoDivider,
      VoCell,
      VoCellGroup,
      VoCommentOne,
      VoHairProblem,
      // GoodsClassifyPopup,
    },
    data() {
      return {
        showGoodsClassify: false, // 商品分类弹出层
        title: '标题',
        list: [
          {
            name: '选项一',
          },
          {
            name: '选项二',
          },
        ],
        showSheet: false,
        showModal: false,
        content: 'uView的目标是成为uni-app生态最优秀的UI框架',
        contentOne:
          '汽车好物老铁带你一镜到底汽车好物老铁带你一镜到底汽车好物老铁好一镜到底快来体验汽车好物老铁带你',
        showPro: false,
      }
    },
    methods: {
      open() {
        // console.log('open');
      },
      close() {
        this.showSheet = false
        this.showModal = false
        this.showPro = false
      },
      /**
       * 去全部回答
       */
      goAnswerAll() {
        this.$linkToEasy('/pagesAgent/CreatedCenter/AnswerAll/NonAuthorAnswer')
      },
      /**
       * 去价格指导
       */
      goPriceGuide() {
        this.$linkToEasy('/pagesProduct/PriceGuide/PriceGuide')
      },
      /**
       * 去选模板
       */
      goChooseTemplate() {
        this.$linkToEasy('/pagesProduct/ChooseTemplate/ChooseTemplate')
      },
      /**
       * 打开模板类型弹出层
       */
      openClassify() {
        // console.log('open');
      },
      /**
       * 关闭模板类型弹出层
       */
      closeClassify() {
        this.showGoodsClassify = false
        // console.log('close');
      },
      /**
       * 点击模板类型确定按钮
       */
      determine() {
        this.showGoodsClassify = false
      },
      /**
       * 去商品型号
       */
      goCommodityModel() {
        this.$linkToEasy('/pagesProduct/CommodityModel/CommodityModel')
      },
      /**
       * 去商品参数
       */
      goCommodityParameter() {
        this.$linkToEasy('/pagesProduct/CommodityParameter/CommodityParameter')
      },
      /**
       * 去上货列表
       */
      goReplenishGoodsList() {
        this.$linkToEasy('/pagesSupplier/Warehouse/RepairProduct/ReplenishGoodsList')
      },
      /**
       * 去补货记录
       */
      goReplenishRecord() {
        this.$linkToEasy('/pagesSupplier/Warehouse/RepairProduct/ReplenishRecord')
      },
      /**
       * 去新建仓库
       */
      goBuiltWarehouse() {
        this.$linkToEasy('/pagesSupplier/Warehouse/RepairProduct/BuiltWarehouse')
      },
    },
  }
</script>
<style lang="scss" scope>
  .demo {
    width: 750rpx;
    min-height: 100vh;
    overflow-x: hidden;
    box-sizing: border-box;
    background: $v-bg-white;
  }
</style>
