<template>
  <view class="wrap">
    <view class="wrap-item">
      <EraCellGroup>
        <EraCell title="标题文字" />
        <EraCell title="标题文字" value="说明文字" />
        <EraCell title="说明文字SlideView" :border="false" />
      </EraCellGroup>
    </view>

    <view class="wrap-item">
      <view class="line" />
      <EraCellGroup>
        <EraCell title="标题文字" icon="focus" value="说明文字" />
        <EraCell title="标题文字" icon="focus" value="说明文字" />
      </EraCellGroup>
    </view>

    <view class="wrap-item">
      <view class="line" />
      <EraCellGroup>
        <EraCell
          title="有URL跳转"
          icon="focus"
          value="说明文字"
          isLink
          rightIcon="right-arrow"
          url="/pagesAgent/DemoWang/DemoWang"
        />
      </EraCellGroup>
    </view>

    <view class="wrap-item">
      <view class="item-title">List列表-Header</view>
      <EraCellGroup>
        <EraCell title="标题" />
        <view class="line" />

        <EraCell title="标题" icon="focus" />
        <view class="line" />

        <EraCell title="标题" isLink />
        <view class="line" />

        <EraCell title="标题">
          <text class="cell-value" slot="value">操作</text>
        </EraCell>
        <view class="line" />

        <EraCell title="标题" icon="focus" :arrow="false">
          <view slot="value">
            <VoIcon class="cell-icon" name="delete" />
          </view>
        </EraCell>
        <view class="line" />

        <EraCell title="标题" icon="focus">
          <text class="cell-value" slot="value">操作</text>
        </EraCell>
        <view class="line" />

        <EraCell title="标题" isLink />
        <view class="line" />

        <EraCell title="上" rightIcon="mul-close" isLink />
        <view class="line" />
        <EraCell title="下" rightIcon="mul-open" isLink />
      </EraCellGroup>
    </view>

    <!--List列表-Jump跳转-->
    <view class="wrap-item">
      <view class="item-title">List列表-Jump跳转</view>
      <EraCellGroup>
        <EraCell title="标题" isLink url="/pagesAgent/DemoWang/DemoWang" />
        <view class="line" />
        <EraCell title="标题" isLink url="/pagesAgent/DemoWang/DemoWang">
          <text class="cell-value" slot="value">内容</text>
        </EraCell>
        <view class="line" />
        <EraCell title="标题" isLink url="/pagesAgent/DemoWang/DemoWang" value="内容" />
        <view class="line" />
        <EraCell isLink url="/pagesAgent/DemoWang/DemoWang">
          <view class="flex" slot="title">
            <text>标题</text>
            <VoIcon class="m-l-10" name="focus" />
          </view>
        </EraCell>
        <view class="line" />
        <EraCell isLink url="/pagesAgent/DemoWang/DemoWang">
          <view class="flex" slot="title">
            <text>标题</text>
            <VoIcon class="m-l-10" name="focus" />
          </view>
          <text class="cell-value" slot="value">内容</text>
        </EraCell>
        <view class="line" />
        <EraCell value="内容" isLink url="/pagesAgent/DemoWang/DemoWang">
          <view class="flex" slot="title">
            <text>标题</text>
            <VoIcon class="m-l-10" name="focus" />
          </view>
        </EraCell>
      </EraCellGroup>
    </view>

    <!--List列表-tab选项卡-->
    <view class="wrap-item">
      <view class="item-title">List列表-tab选项卡</view>
      <EraCell title="标题">
        <view class="flex" slot="value">
          <view
            :class="selecteFirst === false ? 'item-view' : 'item-selected'"
            @click="operFirstClick"
            >操作一
          </view>
          <view
            class="m-l-20"
            :class="selecteSecond === false ? 'item-view' : 'item-selected'"
            @click="operSecondClick"
            >操作二</view
          >
        </view>
      </EraCell>
      <view class="line" />
      <EraCell title="标题">
        <view class="flex" slot="value">
          <view
            :class="selecteThird === false ? 'item-view' : 'item-selected'"
            @click="operThirdClick"
            >操作一
          </view>
          <view
            class="m-l-20"
            :class="selecteFour === false ? 'item-view' : 'item-selected'"
            @click="operFourClick"
            >操作二</view
          >
        </view>
      </EraCell>
    </view>

    <!--List列表-筛选类-->
    <view class="wrap-item">
      <view class="item-title">List列表-筛选类</view>

      <view class="flex">
        <view class="flex1">
          <EraScreen text="筛选条件" icon="arrow-bottom-fill" @eraScreenClick="itemClick" />
        </view>
        <view class="flex1" />
        <view class="flex1" />
      </view>
      <view class="line" />

      <view class="flex">
        <view class="flex1">
          <EraScreen text="筛选条件" icon="arrow-bottom-fill" @eraScreenClick="itemClick" />
        </view>
        <view class="flex1">
          <EraScreen text="筛选条件" icon="arrow-bottom-fill" @eraScreenClick="itemClick" />
        </view>
        <view class="flex1" />
      </view>
      <view class="line" />

      <view class="flex">
        <view class="flex1">
          <EraScreen text="筛选条件" icon="arrow-bottom-fill" @eraScreenClick="itemClick" />
        </view>
        <view class="flex1">
          <EraScreen text="筛选条件" icon="arrow-bottom-fill" @eraScreenClick="itemClick" />
        </view>
        <view class="flex1">
          <EraScreen text="筛选条件" icon="arrow-bottom-fill" @eraScreenClick="itemClick" />
        </view>
      </view>
    </view>

    <!--List列表-contents内容类-->
    <view class="wrap-item">
      <view class="item-title">List列表-contents内容类</view>
      <EraCell title="标题" />
      <view class="line" />

      <EraCell title="标题">
        <text class="cell-value" slot="value">内容</text>
      </EraCell>

      <EraCell title="标题" value="内容" />
      <view class="line" />

      <EraCell title="标题">
        <VoIcon name="focus" slot="value" />
      </EraCell>
      <view class="line" />

      <EraCell title="标题">
        <view class="flex" slot="value">
          <text class="cell-value">内容</text>
          <VoIcon class="m-l-10" name="focus" />
        </view>
      </EraCell>
      <view class="line" />

      <EraCell title="标题">
        <view class="flex" slot="value">
          <VoIcon class="m-l-10" name="focus" />
          <text class="content-title m-l-10">内容</text>
        </view>
      </EraCell>
      <view class="line" />

      <EraCell title="标题">
        <view class="flex" slot="value">
          <text class="cell-value m-l-10">内容</text>
          <view class="m-l-10 content-button">操作</view>
        </view>
      </EraCell>
      <view class="line" />

      <EraCell title="标题">
        <view class="flex" slot="value">
          <text class="content-title m-l-10">内容</text>
          <view class="m-l-10 content-button">操作</view>
        </view>
      </EraCell>
      <view class="line" />

      <EraCell>
        <text class="content-title" slot="title">标题</text>
        <text class="cell-value" slot="value">内容</text>
      </EraCell>
      <view class="line" />

      <EraCell>
        <text class="content-title" slot="title">标题</text>
        <text class="content-title" slot="value">内容</text>
      </EraCell>
    </view>

    <!--List列表-Switch类-->
    <view class="wrap-item">
      <view class="item-title">List列表-Switch类</view>
      <EraCell title="标题">
        <view slot="value">
          <EraSwitch
            v-model="switchValue"
            size="26"
            inactiveColor="rgba(24, 34, 65, 0.25)"
            activeColor="#22284B"
            @click="changeSwitch"
          />
        </view>
      </EraCell>
      <view class="line" />

      <EraCell title="标题">
        <view slot="value">
          <EraSwitch
            v-model="switchSelecte"
            size="26"
            inactiveColor="rgba(24, 34, 65, 0.25)"
            activeColor="#22284B"
            @click="changeSelecte"
          />
        </view>
      </EraCell>
      <view class="line" />
    </view>
  </view>
</template>
<script>
  // import EraScree from "../../uni_modules/era-ui/components/EraRadio/EraRadio.vue"
  export default {
    data() {
      return {
        selecteFirst: true,
        selecteSecond: false,
        selecteFour: true,
        selecteThird: false,
        switchValue: false,
        switchSelecte: true,
      }
    },
    methods: {
      click() {
        console.log('Cell is clicked.')
      },
      operFirstClick() {
        this.selecteFirst = true
        this.selecteSecond = false
      },
      operSecondClick() {
        this.selecteFirst = false
        this.selecteSecond = true
      },
      operThirdClick() {
        this.selecteThird = true
        this.selecteFour = false
      },
      operFourClick() {
        this.selecteThird = false
        this.selecteFour = true
      },
      changeSwitch() {
        this.switchValue = !this.switchValue
      },
      changeSelecte() {
        this.switchSelecte = !this.switchSelecte
      },
      itemClick(e) {
        console.log(e)
        this.$u.toast(e)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .wrap {
    padding-bottom: 20px;

    &-item {
      .line {
        background-color: #e5e5e5;
        width: 100%;
        height: 20rpx;
      }

      .cell-value {
        color: rgba(0, 0, 0, 0.85);
        font-size: 30rpx;
      }

      .cell-icon {
        width: 15px;
        height: 16px;
      }

      .item-title {
        width: 100%;
        height: 80rpx;
        padding-left: 30rpx;
        line-height: 80rpx;
        background-color: #e5e5e5;
        color: #1a1b1c;
        font-size: 16px;
      }
    }
  }

  .item-view {
    border: 1px solid #22284b;
    border-radius: 4px;
    font-size: 24rpx;
    width: 160rpx;
    height: 48rpx;
    line-height: 48rpx;
    text-align: center;
    background-color: #ffffff;
    color: rgba(0, 0, 0, 0.85);
  }

  .item-selected {
    border: 1px solid #22284b;
    border-radius: 4px;
    font-size: 24rpx;
    width: 160rpx;
    height: 48rpx;
    line-height: 48rpx;
    text-align: center;
    background-color: #22284b;
    color: #ffffff;
  }

  .content-title {
    color: rgba(0, 0, 0, 0.25);
    font-size: 30rpx;
  }

  .content-button {
    border-radius: 4px;
    font-size: 24rpx;
    width: 160rpx;
    height: 48rpx;
    line-height: 48rpx;
    text-align: center;
    background-color: #22284b;
    color: #ffffff;
  }
</style>
