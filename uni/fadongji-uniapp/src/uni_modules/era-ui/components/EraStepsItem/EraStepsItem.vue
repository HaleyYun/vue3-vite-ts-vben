<template>
  <view ref="u-steps-item" :class="[`u-steps-item--${parentData.direction}`]" class="u-steps-item">
    <view
      v-if="index + 1 < childLength"
      :class="[`u-steps-item__line--${parentData.direction}`]"
      :style="[lineStyle]"
      class="u-steps-item__line"
    />
    <view
      :class="[
        `u-steps-item__wrapper--${parentData.direction}`,
        parentData.dot && `u-steps-item__wrapper--${parentData.direction}--dot`,
      ]"
      class="u-steps-item__wrapper"
    >
      <slot name="icon">
        <!-- <view
          class="u-steps-item__wrapper__dot"
          v-if="parentData.dot"
          :style="{
            backgroundColor: statusColor,
          }"
        /> -->
        <voIcon
          v-if="parentData.dot"
          :color="statusColor"
          :size="iconSize"
          class="u-steps-item__wrapper__dot"
          name="dot"
        />
        <view
          v-else-if="parentData.activeIcon || parentData.inactiveIcon"
          class="u-steps-item__wrapper__icon"
        >
          <voIcon
            :color="index <= parentData.current ? parentData.activeColor : parentData.inactiveColor"
            :name="index <= parentData.current ? parentData.activeIcon : parentData.inactiveIcon"
            :size="iconSize"
          />
        </view>
        <view
          v-else
          :style="{
            backgroundColor: statusClass === 'process' ? parentData.activeColor : 'transparent',
            borderColor: statusColor,
          }"
          class="u-steps-item__wrapper__circle"
        >
          <text
            v-if="statusClass === 'process' || statusClass === 'wait'"
            :style="{
              color: index == parentData.current ? '#ffffff' : parentData.inactiveColor,
            }"
            class="u-steps-item__wrapper__circle__text"
            >{{ index + 1 }}</text
          >
          <voIcon
            v-else
            :color="statusClass === 'error' ? 'error' : parentData.activeColor"
            :name="statusClass === 'error' ? 'close' : 'checkmark'"
            size="24"
          />
        </view>
      </slot>
    </view>
    <view
      :class="[`u-steps-item__content--${parentData.direction}`]"
      :style="[contentStyle]"
      class="u-steps-item__content"
    >
      <!-- <u-text
        class="content-title"
        :text="title"
        :type="parentData.current == index ? 'main' : 'content'"
        lineHeight="20px"
        :size="parentData.current == index ? 16 : 16"
      /> -->

      <slot name="title">
        <view class="content-title">{{ title }}</view>
      </slot>
      <slot name="desc">
        <u-text
          :text="desc"
          class="desc-text"
          color="rgba(0, 0, 0, 0.45)"
          lineHeight="18"
          size="12"
          type="tips"
        />
        <!-- <view class="desc-text"></view> -->
      </slot>
    </view>
    <!-- <view
		    class="u-steps-item__line"
		    v-if="showLine && parentData.direction === 'column'"
			:class="[`u-steps-item__line--${parentData.direction}`]"
		    :style="[lineStyle]"
		></view> -->
  </view>
</template>

<script>
  import props from './props.js'
  // #ifdef APP-NVUE
  const dom = uni.requireNativePlugin('dom')
  // #endif
  /**
   * StepsItem 步骤条的子组件
   * @description 本组件需要和u-steps配合使用
   * @tutorial https://uviewui.com/components/steps.html
   * @property {String}			title			标题文字
   * @property {String}			current			描述文本
   * @property {String | Number}	iconSize		图标大小  (默认 17 )
   * @property {Boolean}			error			当前步骤是否处于失败状态  (默认 false )
   * @example <u-steps current="0"><u-steps-item title="已出库" desc="10:35" ></u-steps-item></u-steps>
   */
  export default {
    name: 'EraStepsItem',
    components: {},
    mixins: [uni.$u.mpMixin, uni.$u.mixin, props],
    data() {
      return {
        index: 0,
        childLength: 0,
        showLine: false,
        size: {
          height: 0,
          width: 0,
        },
        parentData: {
          direction: 'row',
          current: 0,
          activeColor: '',
          inactiveColor: '',
          activeIcon: '',
          inactiveIcon: '',
          dot: false,
        },
      }
    },
    computed: {
      lineStyle() {
        const style = {}
        if (this.parentData.direction === 'row') {
          style.width = this.size.width + 'px'
          style.left = this.size.width / 2 + 'px'
        } else {
          style.height = this.size.height + 'px'
          // style.top = this.size.height / 2 + 'px'
        }
        style.backgroundColor = this.parent.children?.[this.index + 1]?.error
          ? uni.$u.color.error
          : this.index < this.parentData.current
          ? this.parentData.activeColor
          : this.parentData.inactiveColor
        return style
      },
      statusClass() {
        const { index, error } = this
        const { current } = this.parentData
        if (current == index) {
          return error === true ? 'error' : 'process'
        } else if (error) {
          return 'error'
        } else if (current > index) {
          return 'finish'
        } else {
          return 'wait'
        }
      },
      statusColor() {
        let color = ''
        switch (this.statusClass) {
          case 'finish':
            color = this.parentData.activeColor
            break
          case 'error':
            color = uni.$u.color.error
            break
          case 'process':
            color = this.parentData.dot ? this.parentData.activeColor : 'transparent'
            break
          default:
            color = this.parentData.inactiveColor
            break
        }
        return color
      },
      contentStyle() {
        const style = {}
        if (this.parentData.direction === 'column') {
          style.marginLeft = this.parentData.dot ? '2px' : '6px'
          style.marginTop = this.parentData.dot ? '0px' : '6px'
        } else {
          style.marginTop = this.parentData.dot ? '2px' : '6px'
          style.marginLeft = this.parentData.dot ? '2px' : '6px'
        }

        return style
      },
    },
    watch: {
      parentData(newValue, oldValue) {},
    },
    created() {
      this.init()
    },
    mounted() {
      this.parent && this.parent.updateFromChild()
      uni.$u.sleep().then(() => {
        this.getStepsItemRect()
      })
    },
    methods: {
      init() {
        // 初始化数据
        this.updateParentData()
        if (!this.parent) {
          return uni.$u.error('u-steps-item必须要搭配u-steps组件使用')
        }
        this.index = this.parent.children.indexOf(this)
        this.childLength = this.parent.children.length
      },
      getParentData(parentName = '') {
        // 避免在created中去定义parent变量
        if (!this.parent) this.parent = {}
        // 这里的本质原理是，通过获取父组件实例(也即类似u-radio的父组件u-radio-group的this)
        // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
        // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
        // 此处并不会自动更新子组件的数据，而是依赖父组件u-radio-group去监听data的变化，手动调用更新子组件的方法去重新获取
        this.parent = uni.$u.$parent.call(this, parentName)
        if (this.parent.children) {
          // 如果父组件的children不存在本组件的实例，才将本实例添加到父组件的children中
          this.parent.children.indexOf(this) === -1 && this.parent.children.push(this)
        }
        if (this.parent && this.parentData) {
          // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
          Object.keys(this.parentData).map((key) => {
            this.parentData[key] = this.parent[key]
          })
        }
      },
      updateParentData() {
        // 此方法在mixin中
        this.getParentData('EraSteps')
      },
      // 父组件数据发生变化
      updateFromParent() {
        this.init()
      },
      // 获取组件的尺寸，用于设置横线的位置
      getStepsItemRect() {
        // #ifndef APP-NVUE
        this.$uGetRect('.u-steps-item').then((size) => {
          this.size = size
        })
        // #endif

        // #ifdef APP-NVUE
        dom.getComponentRect(this.$refs['u-steps-item'], (res) => {
          const { size } = res
          this.size = size
        })
        // #endif
      },
    },
  }
</script>

<style lang="scss" scoped>
  // @import '../../assets/css/components.scss';

  .u-steps-item {
    flex: 1;
    @include flex;

    &--row {
      flex-direction: column;
      align-items: center;
      position: relative;
      .u-steps-item__wrapper--row--dot {
        padding: 0 8rpx;
      }
    }

    &--column {
      position: relative;
      flex-direction: row;
      justify-content: flex-start;
      padding-bottom: 5px;
    }

    &__wrapper {
      @include flex;
      justify-content: center;
      align-items: center;
      position: relative;
      background-color: #fff;

      &--column {
        width: 24px;
        height: 32px;

        &--dot {
          height: 24px;
          width: 24px;
        }
      }

      &--row {
        width: 32px;
        height: 24px;

        &--dot {
          width: 48rpx;
          // height: 48rpx;
          background: #fff;
        }
      }
      &_icon {
        height: 48rpx;
        padding: 0 8rpx;
        background: #fff;
      }

      &__circle {
        width: 24px;
        height: 24px;
        /* #ifndef APP-NVUE */
        box-sizing: border-box;
        flex-shrink: 0;
        /* #endif */
        border-radius: 100px;
        border-width: 1px;
        border-color: $u-tips-color;
        border-style: solid;
        @include flex(row);
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s;

        &__text {
          color: $u-tips-color;
          font-size: 11px;
          @include flex(row);
          align-items: center;
          justify-content: center;
          text-align: center;
          line-height: 11px;
        }
      }

      &__dot {
        // width: 10px;
        // height: 10px;
        // border-radius: 100px;
        // background-color: $u-content-color;
      }
    }

    &__content {
      @include flex;
      flex: 1;

      &--row {
        flex-direction: column;
        align-items: center;
      }

      &--column {
        flex-direction: column;
        margin-left: 6px;
        .desc-text {
          padding-left: 32rpx;
        }
        .content-title {
          padding-left: 32rpx;
        }
      }
      .content-title {
        line-height: 1.5;
        font-size: 28rpx;
        color: rgba(0, 0, 0, 0.85);
        margin-bottom: 6rpx;
      }
      .desc-text {
        width: 73px;
        text-align: center;
        // line-height: 1.5;
        // font-size: 28rpx;
        // color: rgba(0, 0, 0, 0.45);
        // padding-top: 16rpx;
        // height: 42rpx;
      }
    }

    &__line {
      position: absolute;
      background: $u-tips-color;

      &--row {
        top: 20rpx;
        height: 4rpx;
      }

      &--column {
        width: 1px;
        left: 10px;
      }
    }
  }
</style>
