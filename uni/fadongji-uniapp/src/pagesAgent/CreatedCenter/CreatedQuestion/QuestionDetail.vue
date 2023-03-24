<template>
  <view class="create-question">
    <u-sticky class="u-sticky" bgColor="#fff" offsetTop="0">
      <view class="u-sticky__search">
        <u-search
          v-model="searchValue"
          :clearabled="true"
          shape="square"
          placeholder="请输入您想搜索的内容"
          @clear="searchClear"
          @change="searchChange"
          bgColor="#fff"
        />
      </view>
    </u-sticky>
    <view class="create-question__main">
      <view class="main-top">
        <p class="main-top__row">{{ info.title }}</p>
        <p class="main-top__row">
          <span @click="toPage('AllAnswer')">752个回答></span>
          <view class="row-btn" @click="toPage('ToAnswer')">写回答</view>
        </p>
      </view>
      <view class="main-text">
        <view class="flex-line">
          <view class="line-img">
            <image class="img" src="/static/headPhoto/girl.jpg" />
          </view>
          <view class="line-text">
            {{ info.user }}
            <view class="text-right"> 752人点赞了这个回答 </view>
          </view>
        </view>

        <view>
          {{ info.content }}
        </view>
        <view> 最后编辑 2022-3-18 14:50:05 · 著作权归作者所有 </view>
      </view>
      <view class="main-btm">
        <p>评论</p>
        <view class="flex-line" v-for="(item, index) in commentList" :key="index">
          <view class="line-img">
            <image class="img" src="/static/headPhoto/girl.jpg" />
          </view>
          <view class="line-text">
            <p>{{ item.name }}</p>
            <p>{{ item.text }}</p>
          </view>
          <view class="flex-line__row" @click.stop="showTip(item)">
            <u-icon class="inline-block" name="more-dot-fill" />
          </view>
          <view class="flex-line__more" v-show="item.itemtipVisible" @click.stop="report(item)">
            举报
          </view>
          <view class="line-btn">
            <u-icon class="inline-block" name="thumb-up" />
            点赞（{{ item.giveNum }}）
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'VideoPage',
    props: {},
    data() {
      return {
        searchValue: '',
        info: '',
        commentList: [
          {
            id: 1,
            text: '汽配行业的仓库真是不好干，不赚钱又费时',
            name: '海鲜先森',
            time: '2022-01-19 12:28',
            giveNum: 108,
            itemtipVisible: false,
          },
        ],
      }
    },
    created() {},

    methods: {
      searchClear() {
        this.searchValue = ''
      },
      searchChange() {
        console.log(this.searchValue)
      },
      showTip(item) {
        this.commentList.forEach((item1) => {
          if (item1.id === item.id) {
            item1.itemtipVisible = !item.itemtipVisible
          }
        })
      },
      report(item) {
        uni.$u.toast('举报成功')
      },
      toPage(name) {
        this.$linkToEasy(
          '/pagesAgent/CreatedCenter/CreatedQuestion/' +
            name +
            '?data=' +
            JSON.stringify(this.info),
        )
      },
    },
    onLoad(options) {
      if (options.data) {
        let data = JSON.parse(options.data)
        this.info = data
      }
    },
  }
</script>

<style lang="scss" scoped>
  .create-question {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    font-size: 14px;
    .u-sticky {
      top: 0;
      &__search {
        padding: 10px;
        background-color: #eee;
      }
    }
    .inline-block {
      display: inline-block;
    }

    &__main {
      padding-bottom: 90px;

      .main-top {
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
        padding: 10px;

        &__row {
          padding-bottom: 10px;
          .row-btn {
            background: #eee;
            line-height: 25px;
            text-align: center;
            padding: 0 10px;
            border-radius: 15px;
            float: right;
          }
        }
      }

      .main-text {
        padding: 10px;
      }
      .flex-line {
        display: flex;
        position: relative;
        width: 100%;

        &__row {
          padding-left: 10px;
        }

        .line-img {
          .img {
            width: 35px;
            height: 35px;
            border-radius: 50%;
          }
        }
      }

      .main-btm {
        padding: 10px;

        .flex-line {
          padding: 10px;
          align-items: center;

          .line-text {
            padding-left: 5px;
            .text-right {
              color: #999;
            }
          }
          &__more {
            background: #fff;
            text-align: center;
            padding: 10px;
            position: absolute;
            right: 10px;
            bottom: -26px;
            z-index: 99;
          }

          .line-btn {
            display: inline-block;
            position: absolute;
            bottom: 0;
            right: 20px;
            height: 5px;
          }
        }
      }
    }
  }
</style>
