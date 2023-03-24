<template>
  <div class="evaluation flex">
    <div class="e-left">
      <div class="e-avatar text-0px pt-13">
        <img
            class="inline text-0"
            width="80"
            src="https://dacai-static-1304549078.cos.ap-shanghai.myqcloud.com/upload/2022-05-07/b7ec95acd3015914598ead0a35eeef63.png"
        />
        <div class="text-14px text-hex-999">Windir</div>
      </div>
      <div class="e-info">
        <div class="e-info--item">
          <div class="e-info--label">商品：</div>
          <div class="e-info-value text-hex-3BB19C">麻衣</div>
        </div>
        <div class="e-info--item">
          <div class="e-info--label">供应商：</div>
          <div class="e-info-value">上海左班汽车零部件</div>
        </div>
        <div class="e-info--item">
          <div class="e-info--label">购买数量：</div>
          <div class="e-info-value">10</div>
        </div>
        <div class="e-info--item">
          <div class="e-info--label">评价：</div>
          <div class="e-info-value text-0px">
            <VoHeart :level="4" :size="20"/>
          </div>
        </div>
        <div class="e-info--item">
          <div class="e-info--label">日期：</div>
          <div class="e-info-value">2021-06-15 14:35:51</div>
        </div>
        <div class="e-info--item">
          <div class="e-info--label">IP地址：</div>
          <div class="e-info-value">192.168.1.92</div>
        </div>
      </div>
    </div>
    <div class="e-right flex-1">
      <a-button type="primary" class="back-position" @click="goBeforePage">
        <template #icon>
          <LeftOutlined/>
        </template>
        返回
      </a-button>
      <div class="e-num">
        <div class="e-num--item">
          <img
              class="icon"
              src="https://dacai-static-1304549078.cos.ap-shanghai.myqcloud.com/upload/2022-05-07/95f5ead2aadb0ded482e66eacd34c5ca.png"
          />
          <div> 收藏 1000</div>
        </div>
        <div class="e-num--item">
          <img
              class="icon"
              src="https://dacai-static-1304549078.cos.ap-shanghai.myqcloud.com/upload/2022-05-07/b12fb35ae6103522799ba4fb4ffec7bc.png"
          />
          <div> 阅读 1000</div>
        </div>
      </div>
      <a-divider/>
      <div class="e-text">
        <p>
          全合成的机油品质比较好，因为全合成的清净性优越，使用过程中也能让发动机缸体更加清洁，这种机油使用起来会让发动机冷启动更加顺畅，更加节省燃油，更换周期也更加长，润滑效果也相当于润滑油1.5倍或者更长。
        </p>
        <p>
          全合成的机油品质比较好，因为全合成的清净性优越，使用过程中也能让发动机缸体更加清洁，这种机油使用起来会让发动机冷启动更加顺畅，更加节省燃油，更换周期也更加长，润滑效果也相当于润滑油1.5倍或者更长。
        </p>
      </div>
      <div class="e-image">图片和视频预览组件</div>
      <div class="e-operate pt-5">
        <a-button type="primary">隐藏</a-button>
        <a-button class="ml-30" type="danger">删除</a-button>
      </div>
      <div class="commit">
        <div class="commit-title">
          <img
              class="icon"
              src="https://dacai-static-1304549078.cos.ap-shanghai.myqcloud.com/upload/2022-05-07/02f1453430528f3404f351713873dd77.png"
          />
          <div class="text-hex-999 ml-2">全部评论： 100</div>
        </div>
        <a-divider/>
        <div class="commit-item text-hex-999">
          <div class="flex">
            <div class="text-center w-120px">
              <img
                  class="inline text-0"
                  width="80"
                  src="https://dacai-static-1304549078.cos.ap-shanghai.myqcloud.com/upload/2022-05-07/b7ec95acd3015914598ead0a35eeef63.png"
              />
            </div>
            <div class="commit-content">
              <div class="commit-text">哈哈哈哈</div>
              <div class="commit-replay pt-2">回复 xxx: 这是很不错</div>
              <div class="commit-time flex pt-2">
                <div class="commit-time--text">2017-06-15 14:35:51</div>
                <div class="commit-operate">
                  <a-space class="ml-5" :size="20">
                    <span class="text-hex-1ABC9C">隐藏</span>
                    <span class="text-hex-1ABC9C">取消</span>
                  </a-space>
                </div>
              </div>
            </div>
          </div>
          <a-divider/>
        </div>
        <div class="commit-item text-hex-999">
          <div class="flex">
            <div class="text-center w-120px">
              <img
                  class="inline text-0"
                  width="80"
                  src="https://dacai-static-1304549078.cos.ap-shanghai.myqcloud.com/upload/2022-05-07/b7ec95acd3015914598ead0a35eeef63.png"
              />
            </div>
            <div class="commit-content">
              <div class="commit-text">哈哈哈哈</div>
              <div class="commit-replay pt-2">回复 xxx: 这是很不错</div>
              <div class="commit-time flex pt-2">
                <div class="commit-time--text">2017-06-15 14:35:51</div>
                <div class="commit-operate">
                  <a-space class="ml-5" :size="20">
                    <span class="text-hex-1ABC9C">隐藏</span>
                    <span class="text-hex-1ABC9C">取消</span>
                  </a-space>
                </div>
              </div>
            </div>
          </div>
          <a-divider/>
        </div>
        <div class="commit-item text-hex-999">
          <div class="flex">
            <div class="text-center w-120px">
              <img
                  class="inline text-0"
                  width="80"
                  src="https://dacai-static-1304549078.cos.ap-shanghai.myqcloud.com/upload/2022-05-07/b7ec95acd3015914598ead0a35eeef63.png"
              />
            </div>
            <div class="commit-content">
              <div class="commit-text">哈哈哈哈</div>
              <div class="commit-replay pt-2">回复 xxx: 这是很不错</div>
              <div class="commit-time flex pt-2">
                <div class="commit-time--text">2017-06-15 14:35:51</div>
                <div class="commit-operate">
                  <a-space class="ml-5" :size="20">
                    <span class="text-hex-1ABC9C">隐藏</span>
                    <span class="text-hex-1ABC9C">取消</span>
                  </a-space>
                </div>
              </div>
            </div>
          </div>
          <a-divider/>
        </div>
        <div class="commit-item text-hex-999">
          <div class="flex">
            <div class="text-center w-120px">
              <img
                  class="inline text-0"
                  width="80"
                  src="https://dacai-static-1304549078.cos.ap-shanghai.myqcloud.com/upload/2022-05-07/b7ec95acd3015914598ead0a35eeef63.png"
              />
            </div>
            <div class="commit-content">
              <div class="commit-text">哈哈哈哈</div>
              <div class="commit-replay pt-2">回复 xxx: 这是很不错</div>
              <div class="commit-time flex pt-2">
                <div class="commit-time--text">2017-06-15 14:35:51</div>
                <div class="commit-operate">
                  <a-space class="ml-5" :size="20">
                    <span class="text-hex-1ABC9C">隐藏</span>
                    <span class="text-hex-1ABC9C">取消</span>
                  </a-space>
                </div>
              </div>
            </div>
          </div>
          <a-divider/>
        </div>
        <VoPagination
            :total="pagination.total"
            :current="pagination.current"
            :page-size="pagination.pageSize"
            @pagination="paginationChange"
            align="right"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive} from 'vue'
import VoHeart from '/@/components/VoHeart/VoHeart.vue'
import VoPagination from '/@/components/VoPagination/VoPagination.vue'
import {LeftOutlined} from '@ant-design/icons-vue'

export default defineComponent({
  name: 'VoEvaluationDetails',
  emits: ['goBeforePage'],
  components: {VoHeart, VoPagination, LeftOutlined},
  setup(_, {emit}) {
    const pagination = reactive({
      total: 158,
      current: 1,
      pageSize: 20,
    })
    const paginationChange = (page, pageSize) => {
      console.log(page, pageSize)
    }
    // 返回首页
    const goBeforePage = () => {
      emit('goBeforePage')
    }
    return {
      paginationChange,
      goBeforePage,
      pagination,
    }
  },
  //   const pagination = reactive({
  //   total: 158,
  //   current: 1,
  //   pageSize: 20,
  // })
  // const paginationChange = (page, pageSize) => {
  //   console.log(page, pageSize)
  // }
  // const goBeforePage = () => {}
  //   }
})
</script>

<style scoped lang="less">
.evaluation {
  border: 1px solid rgb(228 228 228);
  height: calc(100vh - 100px);
  overflow-y: hidden;

  .commit {
    overflow-y: scroll;

    .commit-title {
      display: flex;
      align-items: center;

      .icon {
        width: 14px;
        height: 14px;
      }
    }
  }

  .e-num {
    display: flex;

    .e-num--item {
      margin-right: 10px;
      color: #999;

      .icon {
        width: 16px;
        height: 16px;
        margin-right: 10px;
      }

      display: flex;
      align-items: center;
    }
  }
}

.e-info {
  padding-left: 60px;
  padding-top: 40px;

  .e-info--item {
    margin-bottom: 5px;
    font-size: 14px;
    display: flex;
    color: #666;
    align-items: center;
  }
}

.e-left {
  width: 300px;
  background-color: rgb(252 252 252);
  border-right: 1px solid rgb(228 228 228);

  .e-avatar {
    text-align: center;
  }
}

.e-right {
  padding: 30px 50px;
  min-height: 800px;
  background-color: #fff;

  .e-operate {
    text-align: center;
  }

  .e-text {
    color: #999;
    font-size: 14px;
  }

  .back-position {
    margin-left: 90%;
  }
}
</style>
