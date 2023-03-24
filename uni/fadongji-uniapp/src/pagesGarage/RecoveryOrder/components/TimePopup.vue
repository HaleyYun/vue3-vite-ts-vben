<template>
  <view class="container">
    <u-popup :show="show" mode="bottom" @close="closeHandler">
      <view class="container-top flex flex-vertical-c">
        <view class="color-block-45" @click="closeHandler">取消</view>
        <view class="flex1 text-center fz-b">选择时间</view>
        <view class="color-block-main" @click="determine">确定</view>
      </view>
      <view class="container-main">
        <template v-if="menus.length">
          <view class="container-menu">
            <view
              v-for="(menu, idx) in menus"
              :key="idx"
              :class="{ active: idx === currentActiveMenuIdx }"
              class="container-menu-item"
              @click="changeMenuActive(menu, idx)"
            >
              <span>{{ menu.name }}</span>
              <view class="underline" />
            </view>
          </view>
          <view class="container-list bg-white">
            <template v-if="questionList.length">
              <template v-for="(question, idx) in questionList">
                <view
                  :key="idx"
                  :class="{ active: idx === currentActiveItemIdx }"
                  class="container-list-item"
                  @click="choseTime(idx)"
                >
                  {{ question.name }}
                </view>
              </template>
            </template>
            <template v-else>
              <VoNoData no-data-tips="暂无该模块内容" />
            </template>
          </view>
        </template>
        <template v-else>
          <VoNoData no-data-tips="暂无该模块内容" />
        </template>
      </view>
    </u-popup>
  </view>
</template>

<script>
  export default {
    name: 'TimePopup',
    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        menus: [],
        currentActiveMenuIdx: 0,
        questionList: [],
        currentActiveItemIdx: 0,
      }
    },
    methods: {
      // 关闭操作
      closeHandler() {
        this.$emit('update:show', false)
      },
      /**
       * 点击确定
       */
      determine() {
        this.closeHandler()
      },
      /**
       * 一级菜单被选中
       * @param menu
       * @param idx
       */
      changeMenuActive(menu, idx) {
        this.currentActiveMenuIdx = Number(idx)
        this.getDetailList(menu.id)
      },
      /**
       * 选定时间
       * @param idx
       */
      choseTime(idx) {
        this.currentActiveItemIdx = Number(idx)
      },
    },
    created() {
      this.menus = [
        {
          id: '157874475730337792',
          name: '来来来',
          sort: 12,
        },
        {
          id: '149473002193551360',
          name: '营销',
          sort: 2,
        },
        {
          id: '149510821989449728',
          name: '供应商帮助中心',
          sort: 4,
        },
        {
          id: '149535958709174272',
          name: '供应商售卖物料支持',
          sort: 6,
        },
        {
          id: '149544322121990144',
          name: '安装的指导',
          sort: 7,
        },
        {
          id: '149544734002642944',
          name: '问题类型',
          sort: 8,
        },
        {
          id: '157804182949199872',
          name: '12312',
          sort: 11,
        },
      ]
      this.questionList = [
        {
          id: '1',
          name: '13:00-15:00',
        },
        {
          id: '2',
          name: '15:00-17:00',
        },
      ]
    },
  }
</script>

<style lang="scss" scoped>
  .container {
    &-top {
      padding: 20rpx 32rpx;
      font-size: 32rpx;
    }
    &-main {
      flex: 1;
      display: flex;
      overflow-y: hidden;
      //position: relative;
    }
    &-menu {
      background: #f6f7f8;
      overflow-y: scroll;
      &-item {
        position: relative;
        width: 268rpx;
        height: 100rpx;
        line-height: 100rpx;
        font-size: 28rpx;
        padding-left: 24rpx;
        box-sizing: border-box;
        color: rgba(0, 0, 0, 0.45);
        overflow-x: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .underline {
          visibility: hidden;
          position: absolute;
          width: 8rpx;
          left: 0rpx;
          top: 0rpx;
          bottom: 0rpx;
          background: #ff5319;
          border-radius: 0rpx 22rpx 22rpx 0rpx;
          content: ' ';
        }
        &.active {
          color: #ff5319;
          background: #fff;
          .underline {
            visibility: visible;
          }
        }
      }
    }
    &-list {
      flex: 1;
      overflow-y: scroll;
      &-item {
        margin-left: 32rpx;
        line-height: 96rpx;
        height: 96rpx;
        padding: 0 32rpx 0 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: rgba(0, 0, 0, 0.85);
        font-size: 32rpx;
        border-bottom: 2rpx solid #f7f7f8;
        &.active {
          color: #ff5319;
        }
      }
    }
  }
</style>
