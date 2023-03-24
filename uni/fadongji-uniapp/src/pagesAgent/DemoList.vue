<template>
  <view
    class="list"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >
    <VoAddress />
    <view>
      <view @click="change('red')" class="btn">红色</view>
      <view @click="change('blue')" class="btn">蓝色</view>
    </view>
    <!--  蓝色主题按钮  -->
    <EraButton class="m-b-30" circle />
    <EraButton class="m-b-30" circle disabled />
    <EraButton class="m-b-30" circle text="操作">
      <template #default>
        <VoIcon name="crown" />
        <view class="m-l-8">操作</view>
      </template>
    </EraButton>
    <EraButton class="m-b-30" circle disabled text="操作">
      <template #default>
        <VoIcon name="crown" />
        <view class="m-l-8 primary-color">操作</view>
      </template>
    </EraButton>
    <EraButton class="m-b-30" circle size="mini" text="交换" />
    <EraButton class="m-b-30 list-cancel" circle size="mini" text="取消交换" />
    <EraButton class="m-b-30" circle disabled size="mini" />
    <!--  红色主题按钮  -->
    <EraButton class="m-b-30" circle themeType="Danger" />
    <EraButton class="m-b-30" circle themeType="Danger" disabled />
    <EraButton class="m-b-30" circle themeType="Danger">
      <template #default>
        <VoIcon name="crown" />
        <view class="m-l-8">操作</view>
      </template>
    </EraButton>
    <EraButton class="m-b-30" circle themeType="Danger" disabled>
      <template #default>
        <VoIcon name="crown" />
        <view class="m-l-8 danger-color">操作</view>
      </template>
    </EraButton>
    <EraButton class="m-b-30" circle themeType="Danger" size="mini" text="操作" />
    <EraButton class="m-b-30" circle themeType="Danger" disabled size="mini" text="操作" />
    <!--  镂空主题按钮  -->
    <EraButton class="m-b-30" circle themeType="Wire" />
    <EraButton class="m-b-30" circle themeType="Wire" disabled />
    <EraButton class="m-b-30" circle themeType="Wire">
      <template #default>
        <VoIcon name="crown" />
        <view class="m-l-8">操作</view>
      </template>
    </EraButton>
    <EraButton class="m-b-30" circle themeType="Wire" disabled>
      <template #default>
        <VoIcon name="crown" />
        <view class="m-l-8 wire-color">操作</view>
      </template>
    </EraButton>
    <EraButton class="m-b-30" circle themeType="Wire" size="mini" text="操作" />
    <EraButton class="m-b-30" circle themeType="Wire" disabled size="mini" text="操作" />
    <!--  底部一个按钮  -->
    <view class="list-bottom m-b-30 p-b-safe-area">
      <EraButton circle />
    </view>
    <view class="list-bottom m-b-30 p-b-safe-area">
      <EraButton circle disabled />
    </view>
    <!--  底部两个按钮  -->
    <view class="list-bottom m-b-30 flex flex-justify-between p-b-safe-area">
      <EraButton circle size="small" text="操作" themeType="Wire" />
      <EraButton circle size="small" text="操作" />
    </view>
    <view class="list-bottom m-b-30 flex flex-justify-between p-b-safe-area">
      <EraButton circle size="small" disabled text="操作" themeType="Wire" />
      <EraButton circle size="small" disabled text="操作" />
    </view>
    <!--  底部相关协议&一个按钮  -->
    <view class="list-protocol m-b-30 p-b-safe-area">
      <view class="list-protocol__select flex flex-vertical-c">
        <EraCheckboxGroup v-model="checkboxValue1" placement="column" @change="checkboxChange">
          <EraCheckbox />
        </EraCheckboxGroup>
        <view class="select-word"
          >我已阅读并同意
          <text class="select-word__text">《相关协议》</text>
          的所有内容
        </view>
      </view>
      <EraButton circle />
    </view>
    <view class="list-protocol m-b-30 p-b-safe-area">
      <view class="list-protocol__select flex flex-vertical-c">
        <EraCheckboxGroup v-model="checkboxValue1" placement="column" @change="checkboxChange">
          <EraCheckbox />
        </EraCheckboxGroup>
        <view class="select-word"
          >我已阅读并同意
          <text class="select-word__text">《相关协议》</text>
          的所有内容
        </view>
      </view>
      <EraButton circle disabled />
    </view>
    <!--  底部相关协议&两个按钮  -->
    <view class="list-protocol m-b-30 p-b-safe-area">
      <view class="list-protocol__select flex flex-vertical-c">
        <EraCheckboxGroup v-model="checkboxValue1" placement="column" @change="checkboxChange">
          <EraCheckbox />
        </EraCheckboxGroup>
        <view class="select-word"
          >我已阅读并同意
          <text class="select-word__text">《相关协议》</text>
          的所有内容
        </view>
      </view>
      <view class="flex flex-justify-between">
        <EraButton circle size="small" text="操作" themeType="Wire" />
        <EraButton circle size="small" text="操作" />
      </view>
    </view>
    <view class="list-protocol m-b-30 p-b-safe-area">
      <view class="list-protocol__select flex flex-vertical-c">
        <EraCheckboxGroup v-model="checkboxValue1" placement="column" @change="checkboxChange">
          <EraCheckbox />
        </EraCheckboxGroup>
        <view class="select-word"
          >我已阅读并同意
          <text class="select-word__text">《相关协议》</text>
          的所有内容
        </view>
      </view>
      <view class="flex flex-justify-between">
        <EraButton circle size="small" disabled text="操作" themeType="Wire" />
        <EraButton circle size="small" disabled text="操作" />
      </view>
    </view>
    <!--  input输入  -->
    <view class="list-input m-b-30">
      <view class="list-input__title">可自动聚焦的input</view>
      <input
        class="list-input__input"
        focus
        placeholder="自动获得焦点"
        placeholder-style="color:rgba(0, 0, 0, 0.25);font-size: 32rpx;"
      />
    </view>
    <view class="list-input m-b-30">
      <view class="list-input__title">密码输入的input</view>
      <input
        class="list-input__input"
        password
        type="text"
        placeholder="这是一个密码输入框"
        placeholder-style="color:rgba(0, 0, 0, 0.25);font-size: 32rpx;"
      />
    </view>
    <!--  对话框输入  -->
    <view class="list-dialog m-b-30 p-b-safe-area flex flex-vertical-c">
      <VoIcon name="crown" class="list-dialog__icon" />
      <input
        class="list-dialog__input flex1"
        placeholder-style="color:rgba(0, 0, 0, 0.25);font-size: 32rpx;"
      />
      <VoIcon name="crown" class="list-dialog__icon" />
      <VoIcon name="crown" />
    </view>
    <!--  picker选择器  -->
    <u-picker-era
      @cancel="roleShow = false"
      @confirm="confirmRole"
      :show="roleShow"
      :columns="roleArr"
      keyName="roleName"
      :defaultIndex="[1]"
    />
    <view class="list-picker flex" @click="roleShow = true">
      <view class="list-picker__word list-picker__left">当前选择</view>
      <view class="list-picker__word list-picker__right">{{ pickerName }}</view>
    </view>
    <u-picker-era
      @cancel="roleShow = false"
      @confirm="confirmMore"
      :show="moreShow"
      :columns="columns"
      keyName="moreName"
      :defaultIndex="[1, 3]"
    />
    <view class="list-picker flex" @click="moreShow = true">
      <view class="list-picker__word list-picker__left">当前选择</view>
      <view class="list-picker__word list-picker__right">{{ name }}</view>
    </view>
    <!--  cell列表项  -->
    <DemoCell />
    <!--  左滑删除  -->
    <DemoSwipeAction />
    <!--  form框选  -->
    <DemoFormRadio />
    <!--  form框选  -->
    <DemoForm />
    <!--  upload上传  -->
    <view class="title">upload</view>
    <EraUpload
      :fileList="fileList1"
      @afterRead="afterRead"
      @delete="deletePic"
      name="1"
      multiple
      :maxCount="9"
    />
    <!--  日历  -->
    <EraCalendar :insert="true" :range="true" ref="eraRef" class="m-b-30" />
    <!--  徽章列表  -->
    <VoCellGroup :border="false">
      <VoCell
        image="/static/icons/add.png"
        title="停车坐爱枫林晚"
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
    <VoIcon class="icon1" name="customer-service" :size="24" @click="showActionPop()" />
    <!-- 弹出菜单 -->
    <button @click="showAction = true">弹层</button>
    <VoActionSheet
      class="action-sheet"
      v-show="showAction"
      :actions="actions"
      :show="showAction"
      cancelText="取消"
      @select="actionSelect"
      @close="showAction = false"
    />
    <VoActionSheet
      :actions="list"
      :closeOnClickOverlay="true"
      :closeOnClickAction="true"
      :title="title"
      :show="showSheet"
      @close="close"
    />
    <button @click="showSheet = true">弹出菜单</button>
    <!-- 弹出模态框 -->
    <VoModal
      :show="showModalConfirm"
      :title="title"
      :content="content"
      :closeOnClickOverlay="true"
      @confirm="confirm"
    />
    <button @click="showModalConfirm = true">弹出模态框</button>
    <VoModal
      :show="showModalCancel"
      :title="title"
      :content="content"
      :showCancelButton="true"
      :closeOnClickOverlay="true"
      @confirm="confirm"
    />
    <button @click="showModalCancel = true">弹出模态框</button>
    <VoModal
      :show="showModalOption"
      :title="title"
      :content="content"
      :showOptionButton="true"
      :closeOnClickOverlay="true"
      @confirm="confirm"
    />
    <button @click="showModalOption = true">弹出模态框</button>
    <!--  支付弹窗  -->
    <button @click="showModalPay">弹出支付弹窗</button>
    <VoPayPopup ref="payPopupRef" />
    <!--  支付弹窗  -->
    <button @click="showPay = true">弹出支付验证弹窗</button>
    <VoPayValidation :show.sync="showPay" />
    <!-- tooltip长按提示 -->
    <u-tooltip text="长按文本，上方提示" overlay />
    <u-tooltip text="长按文本，下方显示" direction="bottom" />
    <u-tooltip text="显示多个扩展按钮" :buttons="['扩展']" />
    <u-tooltip text="高亮选中文本背景色" :buttons="['扩展']" bgColor="#e3e4e6" />
    <!-- 导航栏 -->
    <VoNav title="标题" />
    <!-- 搜索 -->
    <view>search</view>
    <view class="search-wrap">
      <VoSearch placeholder="请输入搜索" height="34" v-model="keyword" />
    </view>
    <!-- 复选框 -->
    <view>checkbox</view>
    <EraCheckboxGroup v-model="checkboxValue" placement="column" @change="checkboxChange">
      <EraCheckbox
        :customStyle="{ marginBottom: '8px' }"
        v-for="(item, index) in checkboxList"
        :key="index"
        :label="item.name"
        :name="item.name"
        :disabled="item.disabled"
      />
    </EraCheckboxGroup>
    <!-- 单选框 -->
    <view>radio</view>
    <EraRadioGroup v-model="radioValue" placement="column" @change="groupChange">
      <EraRadio
        :customStyle="{ marginBottom: '8px' }"
        v-for="(item, index) in radioList"
        :key="index"
        :label="item.name"
        :name="item.name"
        @change="radioChange"
        :disabled="item.disabled"
        :iconSize="14"
      />
    </EraRadioGroup>
    <!-- 索引列表 -->
    <EraIndexList :index-list="indexList">
      <view v-for="(item, index) in itemArr" :key="index + '1'">
        <EraIndexItem>
          <EraIndexAnchor :text="indexList[index]" />
          <view class="list-cell" v-for="(cell, index2) in item" :key="index2 + '2'">
            <view class="list-cell__content">{{ cell }}</view>
          </view>
        </EraIndexItem>
      </view>
    </EraIndexList>
    <!-- 步骤条 -->
    <view class="title">Steps</view>
    <view class="step-wrap">
      <EraSteps :current="currentStep">
        <EraStepsItem title="已下单">
          <text class="slot-icon" slot="icon">
            <voIcon name="right-fill" :size="24" color="#22284B" />
          </text>
        </EraStepsItem>
        <EraStepsItem title="已出库" />
        <EraStepsItem title="运输中" />
      </EraSteps>
      <EraSteps :current="currentStep" direction="column">
        <EraStepsItem title="已下单" desc="10:30">
          <text class="slot-icon" slot="icon">
            <voIcon name="right-fill" :size="24" color="#22284B" />
          </text>
        </EraStepsItem>
        <EraStepsItem title="已出库" desc="10:35" />
        <EraStepsItem title="运输中" desc="11:40" />
      </EraSteps>
    </view>
    <!-- 滚动通知 -->
    <view class="title">NoticeBar</view>
    <EraNoticeBar title="都会刺激和支持跨境电商在草地上" type="primary" :show-icon="true" />
    <EraNoticeBar title="都会刺激和支持跨境电商在草地上" type="error" :show-icon="true" />
    <EraNoticeBar
      title="都会刺激和支持跨境电商在草地上"
      type="warning"
      :show-icon="true"
      closable
    />
    <EraNoticeBar
      title="现在有等级不支持该服务，敬请期待。请于今晚8:00以后再试。"
      type="success"
      :show-icon="true"
      closable
    />
    <EraNoticeBar title="都会刺激和支持跨境电商在草地上" type="primary" closable />
    <view class="title">tabs</view>
    <!-- 横向tabs -->
    <view class="step-wrap">
      <EraTabs :list="tabsList" @click="tabClick" :current="currentTab" />
    </view>
    <!-- 纵向tabs -->
    <view class="title">Vtabs</view>
    <view>
      <EraVtabs :list="VtabsList" @click="vtabClick" />
    </view>
  </view>
</template>

<script>
  import DemoCell from './DemoWang/DemoCell'
  import DemoSwipeAction from './DemoWang/DemoSwipeAction'
  import DemoFormRadio from './DemoWang/DemoFormRadio'
  import DemoForm from './DemoWang/DemoForm'
  import VoPayPopup from '@/components/VoPayPopup/VoPayPopup'

  export default {
    name: 'Inquiry',
    components: { DemoCell, DemoSwipeAction, DemoFormRadio, DemoForm, VoPayPopup},
    data() {
      return {
        showPay: false,
        checkboxValue1: [''],
        roleArr: [['中国', '美国', '日本']],
        roleShow: false, // 选择器默认收起
        pickerName: '中国', // 返回的当前选择的值
        columns: [
          ['中国', '美国'],
          ['深圳', '厦门', '上海', '拉萨'],
        ],
        moreShow: false, // 多列选择器默认收起
        moreName: '',
        name: '',
        fileList1: [],
        showAction: false, // 弹出菜单
        title: '标题', // 弹出菜单标题
        actions: [
          {
            type: 'im',
            name: '在线客服',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
          {
            type: 'phone',
            name: '400-893-5518',
            color: 'rgba(0, 0, 0, 0.85)',
            fontSize: '14',
          },
        ],
        showSheet: false, // 弹出菜单
        list: [
          {
            name: '选项一',
          },
          {
            name: '选项二',
          },
        ],
        showModalConfirm: false, // 弹出模态框(一个按钮)
        showModalCancel: false, // 弹出模态框(左右两个按钮)
        showModalOption: false, // 弹出模态框(上下两个按钮)
        content: 'uView的目标是成为uni-app生态最优秀的UI框架', // 模态框内容
        indexList: ['A', 'B', 'C'],
        itemArr: [
          ['列表A1', '列表A2', '列表A3'],
          ['列表B1', '列表B2', '列表B3'],
          ['列表C1', '列表C2', '列表C3'],
        ],
        keyword: '', // 搜索双向绑定
        checkboxValue: ['苹果'],
        // u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
        radioValue: '苹果',
        // 基本案列数据
        checkboxList: [
          {
            name: '苹果',
            disabled: false,
          },
          {
            name: '香蕉',
            disabled: true,
          },
          {
            name: '橙子',
            disabled: false,
          },
        ],
        // 基本案列数据
        radioList: [
          {
            name: '苹果',
            disabled: false,
          },
          {
            name: '香蕉',
            disabled: true,
          },
          {
            name: '橙子',
            disabled: false,
          },
          {
            name: '榴莲',
            disabled: false,
          },
        ],
        currentStep: 1, // 步骤条默认
        tabsList: [
          {
            name: '关注111111',
          },
          {
            name: '推荐',
          },
          {
            name: '电影',
          },
          {
            name: '科技',
          },
        ],
        currentTab: 0, // 横向tabs默认
        VtabsList: [
          {
            name: '关注',
          },
          {
            name: '推荐',
          },
          {
            name: '电影',
          },
          {
            name: '科技',
          },
        ],
      }
    },
    created() {},
    methods: {
      showModalPay() {
        console.log(this.$refs.payPopupRef)
        this.$refs.payPopupRef.showFn()
      },
      change(val) {
        this.$store.dispatch('theme/toggleAppTheme', val)
      },
      /**
       * 任一个checkbox状态发生变化时触发，回调为一个对象
       * @param n
       */
      checkboxChange(n) {
        console.log('change', n)
      },
      /**
       * picker点击确定按钮返回当前单列选择的值
       */
      confirmRole(e) {
        console.warn(e, 111111111111)
        this.roleShow = false
        this.pickerName = e.value[0]
      },
      /**
       * picker点击确定按钮返回当前多列选择的值
       */
      confirmMore(e) {
        console.log('confirm', e)
        this.moreShow = false
        // this.moreName = e.value[(0, 1)]
        let name = e.value.join(',')
        this.name = name.replaceAll(',', '-')
        console.log(name, 222222222222)
      },
      // 删除图片
      deletePic(event) {
        this[`fileList${event.name}`].splice(event.index, 1)
      },
      // 新增图片
      async afterRead(event) {
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        let lists = [].concat(event.file)
        let fileListLen = this[`fileList${event.name}`].length
        lists.map((item) => {
          this[`fileList${event.name}`].push({
            ...item,
            status: 'uploading',
            message: '上传中',
          })
        })
        for (let i = 0; i < lists.length; i++) {
          const result = await this.uploadFilePromise(lists[i].url)
          let item = this[`fileList${event.name}`][fileListLen]
          this[`fileList${event.name}`].splice(
            fileListLen,
            1,
            Object.assign(item, {
              status: 'success',
              message: '',
              url: result,
            }),
          )
          fileListLen++
        }
      },
      /**
       *  打开
       */
      open() {
        this.showAction = true
        this.showSheet = true
        this.showModalConfirm = true
        this.showModalCancel = true
        this.showModalOption = true
      },
      /**
       * 关闭
       */
      close() {
        this.showAction = false
        this.showSheet = false
        this.showModalConfirm = false
        this.showModalCancel = false
        this.showModalOption = false
      },
      /**
       * 模态框点击确认按钮时触发
       */
      confirm() {
        this.close()
      },
      /**
       * 任一个radio状态发生变化时触发
       * @param n
       */
      groupChange(n) {
        console.log('groupChange', this.radiovalue1)
      },
      /**
       * 某个radio状态发生变化时触发(选中状态)
       * @param n
       */
      radioChange(n) {
        console.log('radioChange', n)
      },
      /**
       * @description 点击ActionSheet列表项时触发
       */
      actionSelect(e) {
        if (e.type === 'phone') {
          this.$cellPhone(e.name)
        }
        this.$emit('select', e)
      },
      /**
       * tabs
       * @param item
       */
      tabClick(item) {
        console.log('item', item)
      },
      vtabClick(item) {
        console.log('item', item)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .list {
    width: 750rpx;
    overflow-x: hidden;
    min-height: 100vh;
    box-sizing: border-box;
    padding: 88rpx 0;
    background: #e5e5e5;

    .btn {
      width: 750rpx;
      height: 80rpx;
      margin-top: 80rpx;
      background-color: #ff0000;
      color: #ffffff;
    }

    &-cancel {
      height: 56rpx !important;
    }

    &-bottom {
      width: 100%;
      background: #ffffff;
      padding: 20rpx 32rpx;
      box-sizing: border-box;
    }

    &-protocol {
      width: 100%;
      background: #ffffff;
      padding: 0rpx 32rpx 20rpx 32rpx;
      box-sizing: border-box;

      &__select {
        height: 68rpx;
        margin-bottom: 20rpx;
        margin-left: 14rpx;

        .select-word {
          margin-left: 10rpx;
          width: 606rpx;
          height: 36rpx;
          line-height: 36rpx;
          color: $v-c0-45;
          font-size: 24rpx;
          overflow: hidden;

          &__text {
            color: $color-primary-yellow;
          }
        }
      }
    }

    &-input {
      padding: 0 40rpx;

      &__title {
        font-size: 24rpx;
        height: 36rpx;
        line-height: 36rpx;
        color: $v-c0-25;
        margin-left: 16rpx;
      }

      &__input {
        padding: 20rpx 16rpx;
        flex-direction: row;
        flex-wrap: nowrap;
        background-color: #ffffff;
      }
    }

    &-dialog {
      padding: 20rpx 32rpx;
      background-color: #ffffff;

      &__icon {
        margin-right: 32rpx;
      }

      &__input {
        padding: 14rpx 16rpx;
        background: $v-bg-light;
        border-radius: 16rpx;
        margin-right: 26rpx;
      }
    }

    &-picker {
      padding: 20rpx 16rpx;
      margin: 0 40rpx 30rpx;
      background: #ffffff;
      box-sizing: border-box;

      &__word {
        font-size: 32rpx;
        color: $v-c0-85;
        height: 48rpx;
        line-height: 48rpx;
      }

      &__left {
        width: 132rpx;
        margin-right: 16rpx;
      }

      &__right {
        flex: 1;
        overflow: hidden;
      }
    }

    &-cell {
      background: #ffffff;
      padding: 28rpx 0 0 16rpx;
      display: flex;
      align-items: center;

      &__content {
        flex: 1;
        border-bottom: 1px solid #f7f7f8;
        font-size: 28rpx;
        line-height: 1.5;
        color: rgba(0, 0, 0, 0.85);
        padding-bottom: 28rpx;
      }
    }
  }

  .primary-color {
    color: $v-c0-25;
  }

  .danger-color {
    color: rgba(229, 0, 18, 0.2);
  }

  .wire-color {
    color: $color-text-disabled-yellow;
  }

  .search-wrap {
    padding: 12rpx 32rpx;
    box-sizing: border-box;
    background: #fff;
  }

  .step-wrap {
    background: #fff;
    padding: 14px 0;
  }

  .title {
    padding: 15px;
  }
</style>
