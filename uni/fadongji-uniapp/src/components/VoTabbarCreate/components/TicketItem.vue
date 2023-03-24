<template>
  <view class="ticket-item" @click="click">
    <view class="ticket-item__main">
      <view class="main-left">
        <view class="num"> ￥{{ dataObj.account }} </view>
        <view class="con1">
          {{ dataObj.con1 }}
        </view>
      </view>
      <view class="main-right">
        <view class="con2">
          <view class="con2-item">{{ dataObj.con2 }}</view>
        </view>
        <view class="con3">
          {{ dataObj.con3 }}
        </view>
        <view class="date">
          {{ dataObj.date }}
        </view>
        <view class="con4">
          <view>{{ dataObj.con4 }}</view>
          <view class="btns">
            <slot name="btns"></slot>
          </view>
        </view>
        <slot name="line"></slot>
      </view>
    </view>

    <slot></slot>
  </view>
</template>

<script>
  export default {
    components: {},
    props: {
      dataObj: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    data() {
      return {}
    },
    methods: {
      click() {
        this.$emit('click')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .ticket-item {
    border: 1px solid rgba(215, 215, 215, 1);
    background: #fff;
    font-size: 12px;
    margin: 10px;
    padding: 10px;
    box-sizing: border-box;
    &__main {
      display: flex;
    }

    .main-left {
      width: 90px;
      height: 90px;
      background-color: #eee;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .main-right {
      flex: 1;
      padding: 0 10px;
      .con3,
      .con4 {
        padding: 5px 0;
      }

      .con4 {
        display: flex;

        .btns {
          flex: 1;
        }
      }
      .con2-item {
        padding: 5px;
        text-align: center;
        background-color: #eee;
        border-radius: 5px;
      }
    }
  }
</style>
