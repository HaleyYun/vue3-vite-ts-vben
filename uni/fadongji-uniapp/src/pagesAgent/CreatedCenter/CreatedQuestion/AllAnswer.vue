<template>
  <view class="all-ans">
    <view class="all-ans__top">
      <view class="top-search">
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
      <view class="top-content">
        <p>{{ info.title }}</p>
        <p class="c-text">{{ info.content }}</p>
      </view>
    </view>

    <view class="all-ans__main">
      <scroll-view scroll-top="0" scroll-y="true" class="ans-list">
        <view class="ans-list__item" v-for="(item, index) in answerList" :key="index">
          <view class="flex-line">
            <view class="flex-line__img">
              <image class="img" src="/static/headPhoto/girl.jpg" />
            </view>
            <view class="flex-line__text">
              {{ item.name }}
            </view>
          </view>
          <view class="item-row">
            {{ item.content }}
            <view class="item-row__text">
              <span>{{ item.giveNum + '赞同  ' + item.commentNum + '评论· 2022-3-21' }}</span>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'QuestionPage',
    props: {},
    data() {
      return {
        searchValue: '',
        info: '',
        answerList: [
          {
            id: 1,
            text: '汽配行业的仓库真是不好干，不赚钱又费时',
            name: '海鲜先森',
            time: '2022-01-19 12:28',
            giveNum: 108,
            commentNum: 201,
            content:
              '库存乱，有没有合适的方法扩大库存？或者哪位老铁有空置的厂房可对外出租的，可以长期合作，有意的都可以回复',
          },
          {
            id: 2,
            text: '汽配行业的仓库真是不好干，不赚钱又费时',
            name: '海鲜先森',
            time: '2022-01-19 12:28',
            giveNum: 108,
            commentNum: 201,
            content:
              '库存乱，有没有合适的方法扩大库存？或者哪位老铁有空置的厂房可对外出租的，可以长期合作，有意的都可以回复',
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
    },
    onLoad(options) {
      let data = JSON.parse(options.data)
      this.info = data
    },
  }
</script>

<style lang="scss" scoped>
  .all-ans {
    width: 750rpx;
    height: 100vh;
    overflow-x: hidden;
    font-size: 14px;
    display: flex;
    flex-direction: column;

    &__top {
      .top-search {
        padding: 10px;
        background-color: #eee;
      }

      .top-content {
        padding: 10px;
        .c-text {
          color: #999;
        }
      }
    }

    &__main {
      flex: 1;

      .ans-list {
        height: 100%;
        &__item {
          margin-bottom: 10px;
          .item-row {
            padding: 0 10px;
            &__text {
              color: #999;
            }
          }
          .flex-line {
            display: flex;
            padding: 10px;
            align-items: center;
            position: relative;

            &__img {
              .img {
                width: 35px;
                height: 35px;
                border-radius: 50%;
              }
            }

            &__text {
              padding-left: 5px;
            }
          }
        }
      }
    }
  }
</style>
