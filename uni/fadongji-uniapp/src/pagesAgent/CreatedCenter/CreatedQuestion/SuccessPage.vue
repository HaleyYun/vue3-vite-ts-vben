<template>
  <view class="success-page">
    <u-sticky bgColor="#fff" offsetTop="0">
      <view class="top-search">
        <u-search
          v-model="searchValue"
          :clearabled="true"
          shape="square"
          placeholder="请输入您想搜索的内容"
          @clear="searchClear"
          @change="searchChange"
          bgColor="#fff"
        />
      </view>
    </u-sticky>
    <view class="success-page__tag">
      <view class="tag-item" v-for="(item, index) in tagList" :key="item">
        {{ item }}
      </view>
    </view>
    <view class="success-page__main">
      <view class="main-content">
        <p> 这个问题不好回答，库存有点多，哪位大佬给指导下！！ </p>
        <p>neirongdjfidfdhfuidhdx内容</p>
      </view>
      <view class="mian-icon">
        <u-icon name="checkmark-circle" size="40" />
      </view>
      <view> 发布成功 </view>
      <view @click="toPage"> 返回社群 </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        searchValue: '',
        info: '',
        tagList: ['找货攻略'],
      }
    },
    methods: {
      searchClear() {
        this.searchValue = ''
      },
      searchChange() {
        console.log(this.searchValue)
      },
      toPage() {
        this.$linkToEasy('/pages/agent/home?tabbarVal=2')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .success-page {
    font-size: 14px;
    .u-sticky {
      top: 0;
    }

    &__main {
      padding-top: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      line-height: 30px;
      .main-content {
        line-height: 1.5;
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
        margin-bottom: 20px;
      }
    }

    &__tag {
      padding: 5px;

      .tag-item {
        display: inline-block;
        font-size: 10px;
        background-color: #eee;
        padding: 5px;
        text-align: center;
        margin: 5px;
        border-radius: 10px;

        .item-title {
          font-weight: bold;
        }
      }
    }
  }
</style>
