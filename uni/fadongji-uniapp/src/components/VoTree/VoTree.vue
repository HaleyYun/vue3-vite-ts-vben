<template>
  <view class="node-ul-parent">
    <block v-for="(item, index) in dataList">
      <block v-if="(item.list && item.list.length) || item.brand">
        <view class="node-li" v-if="item.name" :key="index">
          <view class="node-li-title" :class="{ parent: item.isParent }">
            <view class="title-box">
              <view class="node-name" @click="changeState(item, dataList)">
                <block v-if="item.list && item.list.length > 0 && !item.disableHide">
                  <view class="icon" v-if="!item.isShow">
                    <VoIcon
                      :name="item.isParent ? 'plus-solid' : 'plus-hollow'"
                      :opacity="0.25"
                      size="24"
                    />
                  </view>
                  <view class="icon" v-else>
                    <VoIcon
                      :name="item.isParent ? 'minus-solid' : 'minus-hollow'"
                      :opacity="0.25"
                      size="24"
                    />
                  </view>
                </block>
                <view class="icon" v-else/>
                <view class="name">{{ item.name }}</view>
              </view>
              <block v-if="canSelect">
                <view
                  v-if="!item.isParent"
                  class="button"
                  :style="{ width: btnWidth + 'rpx' }"
                  :class="{ isSelected: item.isSelected }"
                  @click="btnClick(item)"
                >
                  <block v-if="item.id || item.brandId || item.levelid">
                    {{ item.isSelected ? cancenBtnText : btnText }}
                  </block>
                  <block v-else>
                    {{ item.isSelected ? cancenBtnText : '添加全系' }}
                  </block>
                </view>
              </block>
              <view v-else class="button" :style="{ width: btnWidth + 'rpx' }" @click="btnClick(item)">
                {{ btnText }}
              </view>
            </view>
            <view class="line" />
          </view>
          <view v-if="item.list && item.list.length > 0" class="node-ul" v-show="item.isShow">
            <VoTree
              :dataList="item.list"
              :btn-text="btnText"
              :cancen-btn-text="cancenBtnText"
              :can-select="canSelect"
              :btn-width="btnWidth"
              @openHandel="openHandel"
              @btnFn="btnClick"
            />
          </view>
        </view>
      </block>
    </block>
  </view>
</template>

<script>
  export default {
    name: 'VoTree',
    componentName: 'VoTree',
    props: {
      // 数据列表
      dataList: {
        type: Array,
        default: () => [],
      },
      // 默认按钮文字
      btnText: {
        type: String,
        default: '移除',
      },
      // 取消按钮样式（与下方字段联动）
      cancenBtnText: {
        type: String,
        default: '取消添加',
      },
      // 是否可选择
      canSelect: {
        type: Boolean,
        default: false,
      },
      btnWidth: {
        type: [Number, String],
        default: 104,
      },
    },
    methods: {
      btnClick(e) {
        // console.log(e);
        this.$emit('btnFn', e)
      },
      openHandel(data) {
        console.log(data);
        data.parent.forEach((item) => {
          this.$set(item, 'isShow', false)
        })
        this.$set(data.target, 'isShow', true)
      },
      changeState(e, datas) {
        if (e.disableHide) return
        let isShow = !e.isShow
        if (!isShow) {
          this.$set(e, 'isShow', isShow)
        } else {
          if (e.isParent) {
            this.dataList.forEach((item) => {
              this.$set(item, 'isShow', false)
            })
            this.$set(e, 'isShow', true)
          } else if (datas.length < 2) {
            this.$set(e, 'isShow', isShow)
          } else if (e.list && e.list.length > 0) {
            let obj = {
              parent: datas,
              target: e,
            }
            this.$emit('openHandel', obj)
          }
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .node-ul-parent {
    margin: 0;
  }
  .node-ul {
    margin: 0;
    padding: 0 0 0 46rpx;
  }
  .node-li-title {
    padding: 24rpx 32rpx;
    position: relative;
    font-size: 28rpx;
    color: rgba(0, 0, 0, 0.85);
    &.parent {
      font-size: 32rpx;
    }
  }
  .line {
    height: 2rpx;
    width: 718rpx;
    position: absolute;
    background: #f7f7f8;
    right: 0;
    bottom: 0;
  }
  .node-li {
    margin-top: 16rpx;
    background-color: #ffffff;
  }
  .node-ul .node-li,
  .node-ul-parent .node-li {
    list-style: none;
    position: relative;
  }
  .title-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .icon {
    text-align: center;
    line-height: 28rpx;
    font-size: 30rpx;
    border-radius: 4rpx;
    border: 3rpx solid transparent;
    font-weight: 700;
    margin-right: 4rpx;
  }
  .node-name {
    display: flex;
    align-items: center;
    font-weight: 500;
  }
  .name {
    flex: 1;
  }
  .button {
    flex-shrink: 0;
    align-self: start;
    width: 104rpx;
    height: 48rpx;
    text-align: center;
    line-height: 48rpx;
    color: #ff5319;
    font-size: 24rpx;
    border: 2rpx solid #ff5319;
    border-radius: 30rpx;
    &.isSelected {
      border-color: rgba(0, 0, 0, 0.25);
      color: rgba(0, 0, 0, 0.65);
    }
  }
</style>
