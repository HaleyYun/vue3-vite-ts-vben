<template>
  <a-list
    v-if="comments.length"
    :data-source="comments"
    :header="`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`"
    item-layout="horizontal"
  >
    <template #renderItem="{ item }">
      <ListItem>
        <Comment
          :author="item.author"
          :avatar="item.avatar"
          :content="item.content"
          :datetime="item.datetime"
        />
      </ListItem>
    </template>
  </a-list>
  <Comment>
    <template #avatar>
      <Avatar
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
      />
    </template>
    <template #content>
      <FormItem>
        <a-textarea :rows="4" v-model:value="value" :maxlength="100" />
      </FormItem>
      <FormItem>
        <Button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
          Add Comment
        </Button>
      </FormItem>
    </template>
  </Comment>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { Comment, List, Form, Button, Avatar } from 'ant-design-vue'
  import moment from 'dayjs'

  type Comment = Record<string, string>

  export default defineComponent({
    components: {
      Comment,
      ListItem: List.Item,
      FormItem: Form.Item,
      Button,
      Avatar,
    },
    setup() {
      const comments = ref<Comment[]>([])
      const submitting = ref<boolean>(false)
      const value = ref<string>('')
      const handleSubmit = () => {
        if (!value.value) {
          return
        }

        submitting.value = true

        setTimeout(() => {
          submitting.value = false
          comments.value = [
            {
              author: 'Han Solo',
              avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              content: value.value,
              datetime: moment().fromNow(),
            },
            ...comments.value,
          ]
          value.value = ''
        }, 1000)
      }

      return {
        comments,
        submitting,
        value,
        handleSubmit,
      }
    },
  })
</script>
