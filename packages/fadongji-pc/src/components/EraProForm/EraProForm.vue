<template>
  <div class="era-form">
    <div class="default-era-form-container" v-if="mode === 'drawer'">
      <slot name="title"></slot>
      <slot>
        <EraProFormContainer
          ref="container"
          :layout="layout"
          :formRefName="formRefName"
          :columns="columns"
        />
      </slot>
      <slot name="footer">
        <EraProFormFooter
          :cancelButtonText="cancelButtonText"
          :confirmButtonText="confirmButtonText"
          @footerSubmit="handlerSubmit"
        />
      </slot>
    </div>

    <div class="era-form-container filter" v-if="mode === 'filter'">
      <slot name="title"
        ><h1 v-if="title">{{ title }}</h1></slot
      >
      <slot>
        <EraProFormContainer
          ref="container"
          :cancelButtonText="cancelButtonText"
          :confirmButtonText="confirmButtonText"
          :layout="layout"
          :formRefName="formRefName"
          :columns="columns"
        >
          <slot name="formItem"></slot>
          <template #action>
            <slot name="footer">
              <a-form-item :labelCol="{ span: 8, offset: 0 }" :wrapperCol="{ span: 8, offset: 0 }">
                <EraProFormFooter
                  ext-class="filter"
                  :cancelButtonText="cancelButtonText"
                  :confirmButtonText="confirmButtonText"
                  @footerSubmit="handlerSubmit"
                  @footerRest=""
                />
              </a-form-item>
            </slot>
          </template>
        </EraProFormContainer>
      </slot>
    </div>

    <div class="era-form-container era-form-container__default" v-if="mode === 'page'">
      <slot name="title"
        ><h1 v-if="title">{{ title }}</h1></slot
      >
      <slot>
        <EraProFormContainer
          ref="container"
          :layout="layout"
          :formRefName="formRefName"
          :columns="columns"
        />
        <slot name="footer">
          <EraProFormFooter
            :cancelButtonText="cancelButtonText"
            :confirmButtonText="confirmButtonText"
            @footerSubmit="handlerSubmit"
          />
        </slot>
      </slot>
    </div>

    <template v-if="mode === 'modal'">
      <div>
        <slot name="modalButton"
          ><AButton type="primary" @click="showModal">{{ modalButtonText }}</AButton></slot
        >
      </div>
      <AModal v-model:visible="modalVisible" :title="title" :width="modalWidth">
        <slot name="header"></slot>
        <slot name="formContainer" :columns="columns" :layout="layout" :formRefName="formRefName">
          <div class="era-form-container era-form-container__modal">
            <EraProFormContainer
              ref="container"
              :layout="layout"
              :formRefName="formRefName"
              :columns="columns"
            >
              <template #formItem="{ record }">
                <slot name="bodyCell" :record="record"></slot>
              </template>
            </EraProFormContainer>
          </div>
        </slot>
        <template #footer>
          <slot name="footer">
            <EraProFormFooter
              :cancelButtonText="cancelButtonText"
              :confirmButtonText="confirmButtonText"
              @footerSubmit="handlerSubmit"
              @footerRest="handlerRest"
            />
          </slot>
        </template>
      </AModal>
    </template>
  </div>
</template>

<script>
  import { defineComponent, ref } from 'vue'
  import dayjs from 'dayjs'
  import EraProFormContainer from '/@/components/EraProForm/components/EraProFormContainer/EraProFormContainer.vue'
  import EraProFormFooter from '/@/components/EraProForm/components/EraProFormFooter/EraProFormFooter.vue'
  export default defineComponent({
    components: {
      EraProFormFooter,
      EraProFormContainer,
    },
    props: {
      columns: {
        type: Array,
        default: () => [],
      },
      modalWidth: {
        type: String,
        default: '520px',
      },
      title: {
        type: String,
        default: '',
      },
      mode: {
        type: String,
        default: 'page',
      },
      formRefName: {
        type: String,
        default: `eraForm${dayjs().unix()}`,
      },
      layout: {
        type: String,
        default: 'horizontal',
      },
      modalButtonText: {
        type: String,
        default: '打开modal',
      },
      cancelButtonText: {
        type: String,
        default: '取消',
      },
      confirmButtonText: {
        type: String,
        default: '发布',
      },
    },
    emits: ['submit', 'rest'],
    data() {
      return {
        modalVisible: false,
        btnLoading: false,
      }
    },
    methods: {
      showModal() {
        this.modalVisible = true
      },
      hiddenModal() {
        this.modalVisible = false
      },

      handlerRest() {
        this.modalVisible = false
        this.$emit('rest', {})
      },
      handlerSubmit() {
        if (this.$refs.container) {
          const formRef = this.$refs.container.getFormInstacne()
          formRef.validate().then((formData) => {
            this.$emit('submit', { values: formData, formRef })
          })
        } else {
          this.$emit('submit', {})
        }
      },
    },
  })
</script>

<style lang="less" scoped>
  .era-form {
    &-container {
      &__modal {
        padding: 15px;
      }
    }
  }
</style>
