<template>
  <u-popup
    :closeOnClickOverlay="closeOnClickOverlay"
    :customStyle="{
      borderRadius: '4px',
      overflow: 'hidden',
      marginTop: `-${$u.addUnit(negativeTop)}`,
    }"
    :duration="400"
    :safeAreaInsetBottom="false"
    :show="show"
    :zoom="zoom"
    mode="center"
    @close="closeHandler"
    @click="clickHandler"
  >
    <view
      :style="{
        width: $u.addUnit(width),
      }"
      class="u-modal"
    >
      <text v-if="title" class="u-modal__title">{{ title }}</text>
      <view
        :style="{
          paddingTop: `${title ? 12 : 25}px`,
          ...contentStyle,
        }"
        class="u-modal__content"
      >
        <slot>
          <text class="u-modal__content__text">{{ content }}</text>
        </slot>
      </view>
      <view v-if="$slots.confirmButton" class="u-modal__button-group--confirm-button">
        <slot name="confirmButton"></slot>
      </view>
      <block v-else>
        <u-line color="rgba(0, 0, 0, 0.08)" />
        <view
          :style="{
            flexDirection: buttonReverse ? 'row-reverse' : 'row',
          }"
          class="u-modal__button-group"
        >
          <view
            v-if="showCancelButton"
            :class="[
              showCancelButton &&
                !showConfirmButton &&
                'u-modal__button-group__wrapper--only-cancel',
            ]"
            :hover-stay-time="150"
            class="u-modal__button-group__wrapper u-modal__button-group__wrapper--cancel"
            hover-class="u-modal__button-group__wrapper--hover"
            @click="cancelHandler"
          >
            <text
              :style="{
                color: cancelColor,
              }"
              class="u-modal__button-group__wrapper__text"
              >{{ cancelText }}
            </text>
          </view>
          <u-line v-if="showConfirmButton && showCancelButton" direction="column" />
          <view
            v-if="showConfirmButton"
            :class="[
              !showCancelButton &&
                showConfirmButton &&
                'u-modal__button-group__wrapper--only-confirm',
            ]"
            :hover-stay-time="150"
            class="u-modal__button-group__wrapper u-modal__button-group__wrapper--confirm"
            hover-class="u-modal__button-group__wrapper--hover"
            @tap="confirmHandler"
          >
            <u-loading-icon v-if="loading" />
<!--            fontWeight: confirmWeight,-->
            <text
              v-else
              :style="{
                color: confirmColor
              }"
              class="u-modal__button-group__wrapper__text bold"
              >{{ confirmText }}
            </text>
          </view>
        </view>
        <u-line v-if="showConfirmButton && showOptionButton" color="rgba(0, 0, 0, 0.08)" />
        <view
          v-if="showOptionButton"
          :style="{
            flexDirection: buttonReverse ? 'row-reverse' : 'row',
          }"
          class="u-modal__button-group"
        >
          <view
            v-if="showOptionButton"
            :class="[
              !showConfirmButton &&
                showOptionButton &&
                'u-modal__button-group__wrapper--only-confirm',
            ]"
            :hover-stay-time="150"
            class="u-modal__button-group__wrapper u-modal__button-group__wrapper--confirm"
            hover-class="u-modal__button-group__wrapper--hover"
            @tap="confirmHandler"
          >
            <u-loading-icon v-if="loading" />
            <text
              v-else
              :style="{
                color: optionColor,
              }"
              class="u-modal__button-group__wrapper__text bold"
              >{{ optionText }}
            </text>
          </view>
        </view>
      </block>
    </view>
  </u-popup>
</template>

<script>
  /**
   * Modal 模态框
   * @description 弹出模态框，常用于消息提示、消息确认、在当前页面内完成特定的交互操作。
   * @tutorial https://www.uviewui.com/components/modul.html
   * @property {Boolean}			show				是否显示模态框，请赋值给show （默认 false ）
   * @property {String}			title				标题内容
   * @property {String}			content				模态框内容，如传入slot内容，则此参数无效
   * @property {String}			confirmText			确认按钮的文字 （默认 '确认' ）
   * @property {String}			optionText			确认按钮的文字 （默认 '选项' ）
   * @property {String}			cancelText			取消按钮的文字 （默认 '取消' ）
   * @property {Boolean}			showConfirmButton	是否显示确认按钮 （默认 true ）
   * @property {Boolean}			showOptionButton	是否显示选择项按钮 （默认 false ）
   * @property {Boolean}			showCancelButton	是否显示取消按钮 （默认 false ）
   * @property {String}			confirmColor		确认按钮的颜色 （默认 '#2979ff' ）
   * @property {String}			optionColor		确认按钮的颜色 （默认 '#2979ff' ）
   * @property {String}			cancelColor			取消按钮的颜色 （默认 '#606266' ）
   * @property {Boolean}			buttonReverse		对调确认和取消的位置 （默认 false ）
   * @property {Boolean}			zoom				是否开启缩放模式 （默认 true ）
   * @property {Boolean}			asyncClose			是否异步关闭，只对确定按钮有效，见上方说明 （默认 false ）
   * @property {Boolean}			closeOnClickOverlay	是否允许点击遮罩关闭Modal （默认 false ）
   * @property {String | Number}	negativeTop			往上偏移的值，给一个负的margin-top，往上偏移，避免和键盘重合的情况，单位任意，数值则默认为px单位 （默认 0 ）
   * @property {String | Number}	width				modal宽度，不支持百分比，可以数值，px，rpx单位 （默认 '650rpx' ）
   * @property {String}			confirmButtonShape	确认按钮的样式,如设置，将不会显示取消按钮
   * @event {Function} confirm	点击确认按钮时触发
   * @event {Function} cancel		点击取消按钮时触发
   * @event {Function} close		点击遮罩关闭出发，closeOnClickOverlay为true有效
   * @example <u-loadmore :status="status" icon-type="iconType" load-text="loadText" />
   */
  export default {
    name: 'VoModal',
    mixins: [uni.$u.mpMixin, uni.$u.mixin],
    props: {
      // 是否展示modal
      show: {
        type: Boolean,
        default: false,
      },
      // 标题
      title: {
        type: [String],
        default: '',
      },
      // 弹窗内容
      content: {
        type: String,
        default: '',
      },
      // 确认文案
      confirmText: {
        type: String,
        default: '确认',
      },
      // 选项文案
      optionText: {
        type: String,
        default: '确认',
      },
      // 取消文案
      cancelText: {
        type: String,
        default: '取消',
      },
      // 是否显示确认按钮
      showConfirmButton: {
        type: Boolean,
        default: true,
      },
      // 是否显示选项按钮
      showOptionButton: {
        type: Boolean,
        default: false,
      },
      // 是否显示取消按钮
      showCancelButton: {
        type: Boolean,
        default: false,
      },
      // 确认按钮颜色
      confirmColor: {
        type: String,
        default: 'rgba(0, 0, 0, 0.85)',
      },
      //确认按钮字重
      confirmWeight: {
        type: Number,
        default: 500,
      },
      // 选项按钮颜色
      optionColor: {
        type: String,
        default: 'rgba(0, 0, 0, 0.85)',
      },
      // 取消文字颜色
      cancelColor: {
        type: String,
        default: 'rgba(0, 0, 0, 0.65)',
      },
      // 对调确认和取消的位置
      buttonReverse: {
        type: Boolean,
        default: false,
      },
      // 是否开启缩放效果
      zoom: {
        type: Boolean,
        default: true,
      },
      // 是否异步关闭，只对确定按钮有效
      asyncClose: {
        type: Boolean,
        default: false,
      },
      // 是否允许点击遮罩关闭modal
      closeOnClickOverlay: {
        type: Boolean,
        default: false,
      },
      // 给一个负的margin-top，往上偏移，避免和键盘重合的情况
      negativeTop: {
        type: [String, Number],
        default: 0,
      },
      // modal宽度，不支持百分比，可以数值，px，rpx单位
      width: {
        type: [String, Number],
        default: '650rpx',
      },
      // 确认按钮的样式，circle-圆形，square-方形，如设置，将不会显示取消按钮
      confirmButtonShape: {
        type: String,
        default: '',
      },
      //给内容设置类名
      contentStyle: {
        type: Object,
        default() {
          return {}
        },
      },
    },
    data() {
      return {
        loading: false,
      }
    },
    watch: {
      show(n) {
        // 为了避免第一次打开modal，又使用了异步关闭的loading
        // 第二次打开modal时，loading依然存在的情况
        if (n && this.loading) this.loading = false
      },
    },
    methods: {
      // 点击确定按钮
      confirmHandler() {
        // 如果配置了异步关闭，将按钮值为loading状态
        if (this.asyncClose) {
          this.loading = true
        }
        this.$emit('confirm')
      },
      // 点击取消按钮
      cancelHandler() {
        this.$emit('cancel')
      },
      closeHandler() {
        this.$emit('cancel')
      },
      // 点击遮罩
      // 从原理上来说，modal的遮罩点击，并不是真的点击到了遮罩
      // 因为modal依赖于popup的中部弹窗类型，中部弹窗比较特殊，虽有然遮罩，但是为了让弹窗内容能flex居中
      // 多了一个透明的遮罩，此透明的遮罩会覆盖在灰色的遮罩上，所以实际上是点击不到灰色遮罩的，popup内部在
      // 透明遮罩的子元素做了.stop处理，所以点击内容区，也不会导致误触发
      clickHandler() {
        if (this.closeOnClickOverlay) {
          this.$emit('close')
        }
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
  $u-modal-border-radius: 6px;
  .u-modal {
    width: 650rpx;
    border-radius: $u-modal-border-radius;
    overflow: hidden;

    &__title {
      font-size: 32rpx;
      font-weight: bold;
      color: $v-c0-85;
      text-align: center;
      padding-top: 25px;
    }

    &__content {
      padding: 12px 25px 25px 25px;
      @include flex;
      justify-content: center;

      &__text {
        font-size: 32rpx;
        text-align: center;
        color: $v-c0-85;
        flex: 1;
      }
    }

    &__button-group {
      @include flex;

      &--confirm-button {
        flex-direction: column;
        padding: 0px 25px 15px 25px;
      }

      &__wrapper {
        flex: 1;
        @include flex;
        justify-content: center;
        align-items: center;
        height: 48px;

        &--confirm,
        &--only-cancel {
          border-bottom-right-radius: $u-modal-border-radius;
        }

        &--cancel,
        &--only-confirm {
          border-bottom-left-radius: $u-modal-border-radius;
        }

        &--hover {
          background-color: $u-bg-color;
        }

        &__text {
          color: $color-primary-yellow;
          font-size: 32rpx;
          text-align: center;
        }
      }
    }
  }

  .bold {
    font-weight: bold;
  }
</style>
