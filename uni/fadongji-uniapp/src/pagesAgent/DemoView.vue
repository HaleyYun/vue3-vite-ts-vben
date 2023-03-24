<template>
  <view
    class="wrap"
    :class="{ 'theme-blue': appTheme === 'blue', 'theme-red': appTheme === 'red' }"
  >
    <view>
      <view @click="change('red')" class="btn">红色</view>
      <view @click="change('blue')" class="btn">蓝色</view>
    </view>

    <VoIcon />
    <EraButton class="m-t-10" @click.native="changeFn" />
    <EraButton theme-type="Danger" class="m-t-10" />
    <EraButton theme-type="Wire" class="m-t-10" />
    <EraButton theme-type="Wire" :disabled="true" class="m-t-10" />
    <EraCellGroup theme-type="Wire" :disabled="true" class="m-t-10" />

    <view>checkbox</view>
    <EraCheckboxGroup v-model="checkboxValue1" placement="column" @change="checkboxChange">
      <EraCheckbox
        :customStyle="{ marginBottom: '8px' }"
        v-for="(item, index) in checkboxList1"
        :key="index"
        :label="item.name"
        :name="item.name"
        :disabled="item.disabled"
      />
    </EraCheckboxGroup>
    <view>radio</view>
    <EraRadioGroup v-model="radiovalue1" placement="column" @change="groupChange">
      <EraRadio
        :customStyle="{ marginBottom: '8px' }"
        v-for="(item, index) in radiolist1"
        :key="index"
        :label="item.name"
        :name="item.name"
        @change="radioChange"
        :disabled="item.disabled"
        :iconSize="14"
      />
    </EraRadioGroup>
    <view>search</view>
    <view class="search-wrap">
      <VoSearch placeholder="请输入搜索" height="34" v-model="keyword" />
    </view>
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
    <view class="step-wrap">
      <EraTabs :list="list1" @click="tabClick" :current="currentTab" />
    </view>
    <view class="title">Vtabs</view>
    <view>
      <EraVtabs :list="list2" @click="vtabClick" />
    </view>
    <view class="title">EraIndexList</view>
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
    <view class="title">upload</view>
    <EraUpload
      :fileList="fileList1"
      @afterRead="afterRead"
      @delete="deletePic"
      name="1"
      multiple
      :maxCount="9"
    />

    <u-picker-era :show="show" :columns="columns" />

    <!--    <VoChart ref="chart"></VoChart>-->
    <EraCalendar :insert="true" :range="true" ref="eraRef" />

    <!--    <VoChart ref="chart"></VoChart>-->
  </view>
</template>

<script>
  // import F2 from '@/assets/f2-all.min'
  export default {
    name: 'Inquiry',
    components: {},
    data() {
      return {
        show: false,
        columns: [['中国', '美国', '日本']],
        currentTab: 0,
        baseData: [
          { genre: '成犬粮', sold: 275 },
          { genre: '化毛膏', sold: 115 },
          { genre: '益生菌', sold: 120 },
          { genre: '氨糖', sold: 350 },
          { genre: '其它', sold: 150 },
        ],
        checkboxValue1: ['苹果'],
        // 基本案列数据
        checkboxList1: [
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
        radiolist1: [
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
        // u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
        radiovalue1: '苹果',
        keyword: '',
        currentStep: 1,
        list1: [
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
          {
            name: '科技222',
          },
          {
            name: '科技333',
          },
          {
            name: '科技442',
          },
          {
            name: '科技552888888888',
          },
        ],
        list2: [
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
        indexList: ['A', 'B', 'C'],
        itemArr: [
          ['列表A1', '列表A2', '列表A3'],
          ['列表B1', '列表B2', '列表B3'],
          ['列表C1', '列表C2', '列表C3'],
        ],
        fileList1: [],
      }
    },
    created() {},
    mounted() {
      // this.$refs.chart.init((config) => {
      //   const chart = new F2.Chart(config)
      //   chart.source(this.baseData)
      //   chart.interval().position('genre*sold').color('genre')
      //   chart.render()
      //   // 需要把 chart 返回
      //   return chart
      // })
    },
    methods: {
      changeFn() {
        // this.show=true
        this.$refs.eraRef.open()
        console.log(this.show, '5555')
      },
      change(val) {
        this.$store.dispatch('theme/toggleAppTheme', val)
      },
      checkboxChange(n) {
        console.log('change', n)
      },
      groupChange(n) {
        console.log('groupChange', this.radiovalue1)
      },
      radioChange(n) {
        console.log('radioChange', n)
      },
      tabClick(item) {
        console.log('item', item)
      },
      vtabClick(item) {
        console.log('item', item)
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
      uploadFilePromise(url) {
        return new Promise((resolve, reject) => {
          let a = uni.uploadFile({
            url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
            filePath: url,
            name: 'file',
            formData: {
              user: 'test',
            },
            success: (res) => {
              setTimeout(() => {
                resolve(res.data.data)
              }, 1000)
            },
          })
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .wrap {
    background-color: var(--color-primary);
    background-color: #eaeaea;
    min-height: 100vh;
    .btn {
      width: 750rpx;
      height: 80rpx;
      margin-top: 80rpx;
      background-color: #ff0000;
      color: #ffffff;
    }
  }
  .title {
    padding: 15px;
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
  .slot-icon {
    // background: #fff;
    // &-row {
    //   padding: 0 8rpx;
    // }
    // &-column {
    //   padding: 8rpx 0;
    // }
  }
  .list-cell {
    background: #ffffff;
    padding: 28rpx 0 0 16rpx;
    display: flex;
    align-items: center;
    &__content {
      flex: 1;
      border-bottom: 1px solid#F7F7F8;
      font-size: 28rpx;
      line-height: 1.5;
      color: rgba(0, 0, 0, 0.85);
      padding-bottom: 28rpx;
    }
  }
</style>
