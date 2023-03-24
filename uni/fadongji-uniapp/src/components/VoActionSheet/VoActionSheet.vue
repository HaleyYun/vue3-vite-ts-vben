<template>
  <u-popup
    :round="round"
    :safeAreaInsetBottom="safeAreaInsetBottom"
    :show="show"
    mode="bottom"
    @close="closeHandler"
  >
    <view class="u-action-sheet">
      <view v-if="title" class="u-action-sheet__header">
        <text class="u-action-sheet__header__title u-line-2">{{ title }}</text>
        <view class="u-action-sheet__header__icon-wrap" @tap.stop="cancel">
          <u-icon bold color="#c8c9cc" name="close" size="17" />
        </view>
      </view>
      <u-line v-if="title" color="rgba(0, 0, 0, 0.08)" />
      <text
        v-if="description"
        :style="[
          {
            marginTop: `${title && description ? 0 : '18px'}`,
          },
        ]"
        class="u-action-sheet__description"
        >{{ description }}</text
      >
      <slot>
        <u-line v-if="description" color="rgba(0, 0, 0, 0.08)" />
        <view class="u-action-sheet__item-wrap">
          <block v-for="(item, index) in actions">
            <!-- #ifdef MP -->
            <button
              :key="index"
              :app-parameter="appParameter"
              :hover-class="!item.disabled && !item.loading ? 'u-action-sheet--hover' : ''"
              :lang="lang"
              :openType="item.openType"
              :send-message-img="sendMessageImg"
              :send-message-path="sendMessagePath"
              :send-message-title="sendMessageTitle"
              :session-from="sessionFrom"
              :show-message-card="showMessageCard"
              class="u-reset-button"
              @contact="onContact"
              @error="onError"
              @getphonenumber="onGetPhoneNumber"
              @getuserinfo="onGetUserInfo"
              @launchapp="onLaunchApp"
              @opensetting="onOpenSetting"
              @tap="selectHandler(index)"
            >
              <!-- #endif -->
              <view
                :hover-class="!item.disabled && !item.loading ? 'u-action-sheet--hover' : ''"
                :hover-stay-time="150"
                class="u-action-sheet__item-wrap__item"
                @tap.stop="selectHandler(index)"
              >
                <block v-if="!item.loading">
                  <text :style="[itemStyle(index)]" class="u-action-sheet__item-wrap__item__name">{{
                    item.name
                  }}</text>
                  <text v-if="item.subname" class="u-action-sheet__item-wrap__item__subname">{{
                    item.subname
                  }}</text>
                </block>
                <u-loading-icon
                  v-else
                  custom-class="van-action-sheet__loading"
                  mode="circle"
                  size="18"
                />
              </view>
              <!-- #ifdef MP -->
            </button>
            <!-- #endif -->
            <u-line v-if="index !== actions.length - 1" color="rgba(0, 0, 0, 0.08)" />
          </block>
        </view>
      </slot>
      <u-gap v-if="cancelText" bgColor="#F7F7F8" height="4" />
      <view hover-class="u-action-sheet--hover">
        <text
          v-if="cancelText"
          :hover-stay-time="150"
          class="u-action-sheet__cancel-text"
          @tap="cancel"
          @touchmove.stop.prevent
          >{{ cancelText }}</text
        >
      </view>
    </view>
  </u-popup>
</template>

<script>
  import props from './props.js'

  /**
   * ActionSheet 操作菜单
   * @description 本组件用于从底部弹出一个操作菜单，供用户选择并返回结果。本组件功能类似于uni的uni.showActionSheetAPI，配置更加灵活，所有平台都表现一致。
   * @tutorial https://www.uviewui.com/components/actionSheet.html
   *
   * @property {Boolean}			show				操作菜单是否展示 （默认 false ）
   * @property {String}			title				操作菜单标题
   * @property {String}			description			选项上方的描述信息
   * @property {Array<Object>}	actions				按钮的文字数组，见官方文档示例
   * @property {String}			cancelText			取消按钮的提示文字,不为空时显示按钮
   * @property {Boolean}			closeOnClickAction	点击某个菜单项时是否关闭弹窗 （默认 true ）
   * @property {Boolean}			safeAreaInsetBottom	处理底部安全区 （默认 true ）
   * @property {String}			openType			小程序的打开方式 (contact | launchApp | getUserInfo | openSetting ｜getPhoneNumber ｜error )
   * @property {Boolean}			closeOnClickOverlay	点击遮罩是否允许关闭  (默认 true )
   * @property {Number|String}	round				圆角值，默认无圆角  (默认 0 )
   * @property {String}			lang				指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文
   * @property {String}			sessionFrom			会话来源，openType="contact"时有效
   * @property {String}			sendMessageTitle	会话内消息卡片标题，openType="contact"时有效
   * @property {String}			sendMessagePath		会话内消息卡片点击跳转小程序路径，openType="contact"时有效
   * @property {String}			sendMessageImg		会话内消息卡片图片，openType="contact"时有效
   * @property {Boolean}			showMessageCard		是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，openType="contact"时有效 （默认 false ）
   * @property {String}			appParameter		打开 APP 时，向 APP 传递的参数，openType=launchApp 时有效
   *
   * @event {Function} select			点击ActionSheet列表项时触发
   * @event {Function} close			点击取消按钮时触发
   * @event {Function} getuserinfo	用户点击该按钮时，会返回获取到的用户信息，回调的 detail 数据与 wx.getUserInfo 返回的一致，openType="getUserInfo"时有效
   * @event {Function} contact		客服消息回调，openType="contact"时有效
   * @event {Function} getphonenumber	获取用户手机号回调，openType="getPhoneNumber"时有效
   * @event {Function} error			当使用开放能力时，发生错误的回调，openType="error"时有效
   * @event {Function} launchapp		打开 APP 成功的回调，openType="launchApp"时有效
   * @event {Function} opensetting	在打开授权设置页后回调，openType="openSetting"时有效
   * @example <u-action-sheet :actions="list" :title="title" :show="show"></u-action-sheet>
   */
  export default {
    name: 'UActionSheet',
    // 一些props参数和methods方法，通过mixin混入，因为其他文件也会用到
    props: {
      openType: String,
    },
    mixins: [uni.$u.mixin, props],
    data() {
      return {}
    },
    computed: {
      // 操作项目的样式
      itemStyle() {
        return (index) => {
          let style = {}
          if (this.actions[index].color) style.color = this.actions[index].color
          if (this.actions[index].fontSize) style.fontSize = '16px'
          // 选项被禁用的样式
          if (this.actions[index].disabled) style.color = '#c0c4cc'
          return style
        }
      },
    },
    methods: {
      closeHandler() {
        // 允许点击遮罩关闭时，才发出close事件
        if (this.closeOnClickOverlay) {
          this.$emit('close')
        }
      },
      // 点击取消按钮
      cancel() {
        this.$emit('close')
      },
      selectHandler(index) {
        const item = this.actions[index]
        if (item && !item.disabled && !item.loading) {
          this.$emit('select', item)
          if (this.closeOnClickAction) {
            this.$emit('close')
          }
        }
      },
      onGetUserInfo(event) {
        this.$emit('getuserinfo', event.detail)
      },
      onContact(event) {
        this.$emit('contact', event.detail)
      },
      onGetPhoneNumber(event) {
        this.$emit('getphonenumber', event.detail)
      },
      onError(event) {
        this.$emit('error', event.detail)
      },
      onLaunchApp(event) {
        this.$emit('launchapp', event.detail)
      },
      onOpenSetting(event) {
        this.$emit('opensetting', event.detail)
      },
    },
  }
</script>

<style lang="scss" scoped>
  // #ifndef APP-NVUE
  // 由于uView是基于nvue环境进行开发的，此环境中普通元素默认为flex-direction: column;
  // 所以在非nvue中，需要对元素进行重置为flex-direction: column; 否则可能会表现异常
  view {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    flex-grow: 0;
    flex-basis: auto;
    align-items: stretch;
    align-content: flex-start;
  }
  // #endif
  $u-action-sheet-reset-button-width: 100% !default;
  $u-action-sheet-title-font-size: 10px !default;
  $u-action-sheet-title-padding: 14px 30px 15px !default;
  $u-action-sheet-title-color: $u-main-color !default;
  $u-action-sheet-header-icon-wrap-right: 15px !default;
  $u-action-sheet-header-icon-wrap-top: 15px !default;
  $u-action-sheet-description-font-size: 13px !default;
  $u-action-sheet-description-color: 14px !default;
  $u-action-sheet-description-margin: 18px 15px !default;
  $u-action-sheet-item-wrap-item-padding: 14px !default;
  $u-action-sheet-item-wrap-name-font-size: 14px !default;
  $u-action-sheet-item-wrap-subname-font-size: 13px !default;
  $u-action-sheet-item-wrap-subname-color: #c0c4cc !default;
  $u-action-sheet-item-wrap-subname-margin-top: 10px !default;
  $u-action-sheet-cancel-text-font-size: 16px !default;
  $u-action-sheet-cancel-text-color: $v-c0-85 !default;
  $u-action-sheet-cancel-text-font-size: 16px !default;
  $u-action-sheet-cancel-text-hover-background-color: rgb(242, 243, 245) !default;

  .u-reset-button {
    width: $u-action-sheet-reset-button-width;
  }

  .u-action-sheet {
    text-align: center;
    &__header {
      position: relative;
      padding: $u-action-sheet-title-padding;
      &__title {
        font-size: 20rpx;
        color: $v-c0-45;
        text-align: center;
      }

      &__icon-wrap {
        position: absolute;
        right: $u-action-sheet-header-icon-wrap-right;
        top: $u-action-sheet-header-icon-wrap-top;
      }
    }

    &__description {
      font-size: $u-action-sheet-description-font-size;
      color: $u-tips-color;
      margin: $u-action-sheet-description-margin;
      text-align: center;
    }

    &__item-wrap {
      &__item {
        padding: $u-action-sheet-item-wrap-item-padding;
        @include flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        &__name {
          font-size: $u-action-sheet-item-wrap-name-font-size;
          color: $v-c0-85;
          text-align: center;
        }

        &__subname {
          font-size: $u-action-sheet-item-wrap-subname-font-size;
          color: $u-action-sheet-item-wrap-subname-color;
          margin-top: $u-action-sheet-item-wrap-subname-margin-top;
          text-align: center;
        }
      }
    }

    &__cancel-text {
      font-size: $u-action-sheet-cancel-text-font-size;
      color: $u-action-sheet-cancel-text-color;
      text-align: center;
      padding: $u-action-sheet-cancel-text-font-size;
    }

    &--hover {
      background-color: $u-action-sheet-cancel-text-hover-background-color;
    }
  }
</style>
