<template>
  <scroll-view scroll-top="0" scroll-y="true" class="create-circle-question">
    <view class="tag-wrap">
      <view class="tag-item" v-for="item in tagList" :key="item">
        {{ item }}
      </view>
    </view>
    <view class="info-list">
      <view
        class="info-list-item"
        v-for="item in infoList"
        :key="item.id + item.title"
        @click="toPage(item)"
      >
        <view class="item-title">
          <view class="text-icon">
            {{ item.typeDis }}
          </view>
          {{ item.title }}
        </view>
        <view class="user-row">
          <u-icon class="inline-block" name="account" />
          {{ item.user }}
        </view>
        <view class="c-row">
          <view class="content">
            <span>{{ item.project }}</span>
            {{ item.content }}
          </view>
          <view class="content-right" v-if="item.type === '3'" />
        </view>
        <view class="b-row">
          <view class="item-btn" @click.stop="giveLike(item)">
            <u-icon class="inline-block" name="thumb-up" />
            点赞（{{ item.giveNum }}）
          </view>
          <view class="item-btn" @click.stop="openPopup">
            <u-icon class="inline-block" name="chat" />
            评论（{{ item.commentNum }}）
          </view>
          <view class="item-btn last" @click.stop="showTip(item)">
            <u-icon class="inline-block" name="more-dot-fill" />
          </view>
          <view class="more-tip" v-show="item.itemtipVisible" @click.stop="report(item)">
            举报
          </view>
        </view>
      </view>
    </view>

    <u-popup :show="showPopup" mode="bottom" @close="showPopup = false" @open="showComment">
      <view class="popup-content">
        <view class="popup-content__top">
          <u-icon class="inline-block" name="close" size="20" @click="showPopup = false" />
          <view>全部{{ commentList.length }}条评论</view>
        </view>
        <view class="flex-line" v-for="(item, index) in commentList" :key="index + item.name">
          <view class="top-row">
            <view class="ava-img">
              <image src="/static/headPhoto/girl.jpg" />
            </view>
            <view class="name-text">
              <p>{{ item.name }}</p>
              <p>{{ item.text }}</p>
              <p>{{ item.time }}</p>
            </view>
            <view class="name-icon">
              <u-icon class="inline-block" name="more-dot-fill" />
            </view>
          </view>

          <view class="b-row">
            <view class="item-btn" @click.stop="giveLike(item)">
              <u-icon class="inline-block" name="thumb-up" />
              点赞（{{ item.giveNum }}）
            </view>
            <view class="item-btn" @click="showAnswerPop(item)">
              <u-icon class="inline-block" name="chat" />
              回复
            </view>
          </view>
        </view>
      </view>
    </u-popup>
    <u-popup :show="showAnswerPopup" mode="bottom" closeable @close="answerPopupClose">
      <view class="popup-content">
        <view>评论给{{ currentComment.name }}</view>
        <u--textarea
          v-model="answer"
          placeholder="简单的几句话就能帮助他人,这样的话很有力量"
          class="popup-content__textarea"
        />
        <view class="popup-content__btns" style="padding: 10px 20px; display: flex">
          <u-icon name="plus-circle" />
          <view class="btns-text" style=""> 发布 </view>
        </view>
      </view>
    </u-popup>
  </scroll-view>
</template>

<script>
  export default {
    name: 'QuestionPage',
    props: {},
    data() {
      return {
        tagList: ['火花塞', '机油', '离合器', '发动机', '大灯总成'],
        infoList: [
          {
            id: 1,
            type: '1',
            typeDis: '问题',
            title: '这个问题不好回答，库存有点多，哪位大佬给指导下！！',
            user: '河南最好的汽配商',
            content:
              '库存乱，有没有合适的方法扩大库存？或者哪位老铁有空置的厂房可对外出租的，可以长期合作，有意的都可以回复，有钱大家一起赚~',
            project: '共创项目：三离合变速器',
            file: '',
            giveNum: 100,
            commentNum: 101,
            giveList: [],
            commentList: [],
            itemtipVisible: false,
          },
          {
            id: 2,
            type: '2',
            typeDis: '想法',
            title: '这个问题不好回答，库存有点多，哪位大佬给指导下！！',
            user: '河南最好的汽配商',
            content:
              '库存乱，有没有合适的方法扩大库存？或者哪位老铁有空置的厂房可对外出租的，可以长期合作，有意的都可以回复，有钱大家一起赚~',
            project: '共创项目：三离合变速器',
            file: '',
            giveNum: 100,
            commentNum: 101,
            giveList: [],
            commentList: [],
            itemtipVisible: false,
          },
          {
            id: 3,
            type: '3',
            typeDis: '视频',
            title: '这个问题不好回答，库存有点多，哪位大佬给指导下！！',
            user: '河南最好的汽配商',
            content:
              '库存乱，有没有合适的方法扩大库存？或者哪位老铁有空置的厂房可对外出租的，可以长期合作，有意的都可以回复，有钱大家一起赚~',
            project: '共创项目：三离合变速器',
            file: '',
            giveNum: 100,
            commentNum: 101,
            giveList: [],
            commentList: [],
            itemtipVisible: false,
          },
        ],
        showPopup: false,
        commentList: [
          {
            id: 1,
            text: '汽配行业的仓库真是不好干，不赚钱又费时',
            name: '海鲜先森',
            time: '2022-01-19 12:28',
            giveNum: 108,
            commentNum: 100,
            itemtipVisible: false,
          },
          {
            id: 2,
            text: '汽配行业的仓库真是不好干，不赚钱又费时',
            name: '海鲜先森',
            time: '2022-01-19 12:28',
            giveNum: 108,
            commentNum: 100,
            itemtipVisible: false,
          },
          {
            id: 3,
            text: '汽配行业的仓库真是不好干，不赚钱又费时',
            name: '海鲜先森',
            time: '2022-01-19 12:28',
            giveNum: 108,
            commentNum: 100,
            itemtipVisible: false,
          },
        ],
        showAnswerPopup: false,
        answer: '',
        currentComment: '',
      }
    },
    created() {},

    methods: {
      toPage(item) {
        this.$linkToEasy('/pages/agent/home/creat/questionDetail?data=' + JSON.stringify(item))
      },
      openPopup() {
        this.showPopup = true
      },
      showComment() {},
      giveLike(item) {
        uni.$u.toast('点赞成功')
      },
      showAnswerPop(currentComment) {
        this.showAnswerPopup = true
        this.currentComment = currentComment
      },
      answerPopupClose() {
        this.showAnswerPopup = false
      },
      showTip(item) {
        this.infoList.forEach((item1) => {
          if (item1.id === item.id) {
            item1.itemtipVisible = !item.itemtipVisible
          }
        })
      },
      report(item) {
        uni.$u.toast('举报成功')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .create-circle-question {
    height: 100%;

    .info-list {
      .info-list-item {
        padding: 10px;
        margin: 5px;
        background-color: #eee;
        position: relative;

        .inline-block {
          display: inline-block;
        }
        .text-icon {
          text-align: center;
          padding: 5px;
          background: #999;
          display: inline-block;
        }

        .c-row {
          display: flex;

          .content {
            flex: 1;
          }

          .content-right {
            width: 80px;
            height: 80px;
            background-color: #999;
          }
        }

        .more-tip {
          background: #fff;
          text-align: center;
          padding: 10px;
          position: absolute;
          right: 10px;
          bottom: -26px;
          z-index: 99;
        }
      }
    }

    .tag-wrap {
      padding: 5px;
      border-bottom: 1px solid #eee;

      .tag-item {
        display: inline-block;
        font-size: 10px;
        background-color: #eee;
        padding: 5px;
        text-align: center;
        margin: 5px;
        border-radius: 10px;

        .item-title {
          font-weight: bold;
        }
      }
    }

    .item-btn {
      display: inline-block;
      &.last {
        float: right;
      }
    }

    .flex-line {
      .top-row {
        display: flex;
        padding: 10px;
        align-items: center;
        position: relative;
      }

      .ava-img {
        image {
          width: 35px;
          height: 35px;
          border-radius: 50%;
        }
      }

      .name-text {
        padding-left: 5px;
      }
      .name-icon {
        padding-left: 10px;
      }

      .b-row {
        display: flex;
        justify-content: flex-end;
        padding-right: 15px;
      }
    }

    .popup-content {
      &__top {
        padding: 10px;
        display: flex;
      }
      &__textarea {
        border: 0;
        min-height: 40px;
      }
      &__btns {
        .btns-text {
          text-align: right;
          flex: 1;
        }
      }
    }
  }
</style>
