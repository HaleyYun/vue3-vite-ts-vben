<template>
  <view class="agent-fixed">
    <view class="agent-fixed__group">
      <view
        v-for="(item, index) of tabbarList"
        :key="index"
        class="group-item"
        @click="changeTabbarFn(index)"
      >
        <VoIcon
          v-if="item.type"
          :color="tabbarVal === index ? '#FF5319' : ''"
          :name="tabbarVal === index ? item.activeImg : item.unActiveImg"
          :size="40"
        />
        <block v-else>
          <VoIcon
            :color="tabbarVal === index ? '#FF5319' : ''"
            :name="tabbarVal === index ? item.activeImg : item.unActiveImg"
            :size="24"
          />
          <VoBadge v-if="item.name == '即时通' || item.name == '消息'" :value="messageCount" class="badge" max="99" />
          <view :class="{ 'group-item__active': tabbarVal === index }" class="group-item__text">{{
            item.name
          }}</view>
        </block>
      </view>
    </view>
    <view class="safearea-box" />
  </view>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: 'VoTabbar',
    props: {
      /**
       * 默认选中值
       */
      defaultActive: {
        type: Number,
        default: 0,
      },
      /**
       * tabbarList tabbar列表
       */
      tabbarList: {
        type: Array,
        default: [],
      },
    },
    data() {
      return {
        tabbarVal: 0,
      }
    },
    watch: {
      defaultActive: {
        immediate: true, //初始化时让handler调用一下
        deep: true,
        handler(newValue) {
          if (newValue === this.tabbarVal) return
          //初始化选中tabbar
          this.tabbarVal = newValue
        },
      },
      messageCount: {
        immediate: true, //初始化时让handler调用一下
        deep: true,
        handler(newValue) {
          console.log(newValue);
        },
      },
    },
    created() {
      // this.getUnMessage()
      console.log(this.messageCount,'123-----------------');
    },
    computed: {
      ...mapGetters({
        messageCount: 'im/GET_ALLNOMESSAGE',
      }),
    },
    methods: {
      async getUnMessage() {
        // this.messageCount = this.$store.getters['im/GET_ALLNOMESSAGE']
        // console.log(this.messageCount);
        try {
          let { data } = await this.$VoHttp.IM.apiImMessageListSelectMessageList(
            {
              top: false,
              pageNo: 1,
              pageSize: 100,
            },
            { noLoading: true },
          )
          console.log(data);
        } catch (e) {
          console.log(e);
        }
      },
      //更改tabbar选中值
      changeTabbarFn(index) {
        if (this.tabbarVal === index) return
        this.tabbarVal = index
        this.closeInnerAudioContext()
        this.$emit('changeFn', index)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .agent-fixed {
    width: 750rpx;
    background-color: #ffffff;
    position: fixed;
    left: 0rpx;
    bottom: 0rpx;
    z-index: 10;
    &__group {
      border-top: 2rpx solid #f7f7f8;
      width: 750rpx;
      height: 130rpx;
      display: flex;
      .group-item {
        flex: 1;
        height: 140rpx;
        display: flex;
        flex-direction: column;
        font-size: 0rpx;
        align-items: center;
        justify-content: center;
        position: relative;
        .badge {
          position: absolute;
          top: 12rpx;
          right: 38rpx;
          width: auto;
          height: auto;
          font-size: 20rpx;
          min-width: 30rpx;
          min-height: 30rpx;
          border-radius: 30rpx;
        }
        &__img {
          width: 48rpx;
          height: 48rpx;
          margin-bottom: 16rpx;
        }
        &__text {
          font-size: 24rpx;
          color: #373a4e;
          line-height: 150%;
          margin-top: 16rpx;
        }
        &__active {
          color: #ff5c26 !important;
        }
      }
    }
  }
</style>
