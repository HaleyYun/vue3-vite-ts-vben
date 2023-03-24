<template>
  <div class="comment">
    <h1 class="titleComment">Comment 评论</h1>
    <h2>评论组件可用于对事物的讨论，例如页面、博客文章、问题等等。</h2>
  </div>
  <div class="commentList">
    <h1> 评论组件，带有作者、头像、时间和操作。 </h1>
    <Comment>
      <template #actions>
        <span key="comment-basic-like">
          <Tooltip title="Like">
            <template v-if="action === 'liked'">
              <LikeFilled @click="like" />
            </template>
            <template v-else>
              <LikeOutlined @click="like" />
            </template>
          </Tooltip>
          <span style="padding-left: 8px; cursor: auto">
            {{ likes }}
          </span>
        </span>
        <span key="comment-basic-dislike">
          <Tooltip title="Dislike">
            <template v-if="action === 'disliked'">
              <DislikeFilled @click="dislike" />
            </template>
            <template v-else>
              <DislikeOutlined @click="dislike" />
            </template>
          </Tooltip>
          <span style="padding-left: 8px; cursor: auto">
            {{ dislikes }}
          </span>
        </span>
        <span key="comment-basic-reply-to">Reply to</span>
      </template>
      <template #author><a>Han Solo</a></template>
      <template #avatar>
        <a-avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          alt="Han Solo"
        />
      </template>
      <template #content>
        <p> 这是评论内容 </p>
      </template>
      <template #datetime>
        <Tooltip :title="moment().format('YYYY-MM-DD HH:mm:ss')">
          <span>{{ moment().fromNow() }}</span>
        </Tooltip>
      </template>
    </Comment>
    <br />
    <br />
    <h1> 回复框 评论编辑器组件提供了相同样式的封装以支持自定义评论编辑器。 </h1>
    <commentCom />
  </div>
</template>

<script lang="ts">
  import moment from 'dayjs'
  import { LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined } from '@ant-design/icons-vue'
  import commentCom from '/@/components/VobasicCom/comment.vue'
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    components: {
      LikeFilled,
      LikeOutlined,
      DislikeFilled,
      DislikeOutlined,
      commentCom
    },
    setup() {
      const likes = ref<number>(0)
      const dislikes = ref<number>(0)
      const action = ref<string>()

      const like = () => {
        likes.value = 1
        dislikes.value = 0
        action.value = 'liked'
      }

      const dislike = () => {
        likes.value = 0
        dislikes.value = 1
        action.value = 'disliked'
      }

      return {
        likes,
        dislikes,
        action,
        like,
        dislike,
        moment,
      }
    },
  })
</script>

<style scoped>
  .comment {
    width: 80%;
    height: 100px;
    margin: 20px auto;
  }

  .titleComment {
    font-size: 30px;
  }

  .commentList {
    padding: 40px;
    width: 80%;
    height: 500px;
    border: 1px solid #b3b3b3;
    margin: 20px auto;
  }
</style>
