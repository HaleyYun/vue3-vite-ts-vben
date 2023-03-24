<template>
  <a-select
    v-model:value="state"
    allow-clear
    show-search
    :filter-option="false"
    :options="getOptions"
    @change="handleChange"
    @search="handleFetch"
    ref="selectRef"
    v-bind="attrs"
  >
    <template v-if="loading" #notFoundContent>
      <a-spin size="small" />
    </template>
  </a-select>
</template>
<script lang="ts">
  import { defineComponent, PropType, ref, unref, watchEffect, computed, watch } from 'vue'
  import { isFunction } from '/@/utils/is'
  import { useAttrs } from '/@/hooks/core/useAttrs'
  import { get, omit } from 'lodash-es'
  import { useI18n } from '/@/hooks/web/useI18n'
  import { propTypes } from '/@/utils/propTypes'
  import { useRuleFormItem } from '/@/hooks/component/useFormItem'
  import { _ } from '@vocen/shared'

  type OptionsItem = { label: string; value: string; disabled?: boolean }

  export default defineComponent({
    name: 'ApiSearchSelect',
    inheritAttrs: false,
    props: {
      value: [Array, Object, String, Number],
      numberToString: propTypes.bool,
      api: {
        type: Function as PropType<(arg?: Recordable) => Promise<OptionsItem[]>>,
        default: null,
      },
      // api params
      params: {
        type: Object as PropType<Recordable>,
        default: () => ({}),
      },
      // support xxx.xxx.xx
      resultField: propTypes.string.def(''),
      labelField: propTypes.string.def('label'),
      valueField: propTypes.string.def('value'),
      asyncFetchParamKey: propTypes.string.def('parentCode'),
      immediate: propTypes.bool.def(true),
      alwaysLoad: propTypes.bool.def(false),
    },
    emits: ['options-change', 'change', 'update:value', 'defaultChange'],
    setup(props, { emit }) {
      const selectRef = ref()
      const options = ref<OptionsItem[]>([])
      const loading = ref(false)
      const isFirstLoad = ref(true)
      const attrs = useAttrs()
      const { t } = useI18n()
      const emitData = ref<any>()

      // Embedded in the form, just use the hook binding to perform form verification
      const [state] = useRuleFormItem(props, 'value', 'change', emitData)

      // const state = ref<any>()

      const getOptions = computed(() => {
        const { labelField, valueField, numberToString } = props

        return unref(options).reduce((prev, next: Recordable) => {
          if (next) {
            const value = next[valueField]
            prev.push({
              ...omit(next, [labelField, valueField]),
              label: next[labelField],
              value: numberToString ? `${value}` : value,
            })
          }
          return prev
        }, [] as OptionsItem[])
      })
      const handleFetch = _.debounce(fetch, 300)

      watchEffect(async () => {
        props.immediate && unref(isFirstLoad) && !props.alwaysLoad && (await fetch())
      })

      watch(
        () => props.params,
        async () => {
          !unref(isFirstLoad) && (await fetch())
        },
        { deep: true },
      )

      async function fetch(name = '') {
        isFirstLoad.value = false
        const api: any = props.api
        if (!api || !isFunction(api)) return
        options.value = []

        try {
          loading.value = true

          const res = await api(name)

          if (Array.isArray(res)) {
            options.value = res
            emitChange()
            return
          }
          if (props.resultField) {
            options.value = get(res, props.resultField) || []
          }
          emitChange()
        } catch (error) {
          console.warn(error)
        } finally {
          loading.value = false
        }
      }

      function emitChange() {
        emit('options-change', unref(getOptions))
      }

      function handleChange(_, args) {
        const $attrs: any = unref(attrs)
        if ($attrs?.mode === 'multiple') {
          const v: any = []
          args.forEach((item) => v.push(item[props.valueField]))
          emitData.value = v
        } else {
          emitData.value = _?.value
        }
        emit('change', emitData?.value)
      }

      return { state, attrs, getOptions, loading, t, handleFetch, handleChange, selectRef }
    },
  })
</script>
