<template>
  <a-form-item
    class="widget-view"
    v-if="element"
    :ref="(val) => (formItemRef = val)"
    :class="{ active: selectWidget?.key === element.key }"
    :label="element.label"
    :rules="element.options.rules"
  >
    <template v-if="element.type === 'input'">
      <a-input
        :size="config?.size"
        :value="element.options.defaultValue"
        :style="{ width: element.options.width }"
        :placeholder="element.options.placeholder"
        :maxlength="element.options.maxlength"
        :prefix="element.options.prefix"
        :suffix="element.options.suffix"
        :addonBefore="element.options.addonBefore"
        :addonAfter="element.options.addonAfter"
        :allowClear="element.options.allowClear"
        :disabled="element.options.disabled"
      />
    </template>

    <template v-if="element.type === 'password'">
      <a-input-password
        :size="config?.size"
        :value="element.options.defaultValue"
        :style="{ width: element.options.width }"
        :placeholder="element.options.placeholder"
        :maxlength="element.options.maxlength"
        :prefix="element.options.prefix"
        :suffix="element.options.suffix"
        :addonBefore="element.options.addonBefore"
        :addonAfter="element.options.addonAfter"
        :allowClear="element.options.allowClear"
        :disabled="element.options.disabled"
        :visibilityToggle="element.options.visibilityToggle"
      />
    </template>

    <template v-if="element.type === 'textarea'">
      <a-textarea
        style="resize: none"
        :size="config?.size"
        :rows="element.options.rows"
        :value="element.options.defaultValue"
        :style="{ width: element.options.width }"
        :placeholder="element.options.placeholder"
        :maxlength="element.options.maxlength"
        :showCount="element.options.showCount"
        :autoSize="element.options.autoSize"
        :allowClear="element.options.allowClear"
        :disabled="element.options.disabled"
      />
    </template>

    <template v-if="element.type === 'number'">
      <a-input-number
        :value="element.options.defaultValue"
        :style="{ width: element.options.width }"
        :min="element.options.min"
        :max="element.options.max"
        :step="element.options.step"
        :disabled="element.options.disabled"
      />
    </template>

    <template v-if="element.type === 'radio'">
      <a-radio-group
        :value="element.options.defaultValue"
        :style="{ width: element.options.width }"
        :disabled="element.options.disabled"
      >
        <a-radio
          v-for="item of element.options.options"
          :key="item.value"
          :value="item.value"
          :style="{ disabled: element.options.inline ? 'inline-blokc' : 'block' }"
          >{{ element.options.showLabel ? item.label : item.value }}</a-radio
        >
      </a-radio-group>
    </template>

    <template v-if="element.type === 'checkbox'">
      <a-checkbox-group
        :value="element.options.defaultValue"
        :style="{ width: element.options.width }"
        :disabled="element.options.disabled"
      >
        <a-checkbox
          v-for="item of element.options.options"
          :key="item.value"
          :value="item.value"
          :style="{ disabled: element.options.inline ? 'inline-blokc' : 'block' }"
          >{{ element.options.showLabel ? item.label : item.value }}</a-checkbox
        >
      </a-checkbox-group>
    </template>

    <template v-if="element.type === 'time'">
      <a-time-picker
        :value="element.options.defaultValue"
        :placeholder="element.options.placeholder"
        :inputReadOnly="element.options.readonly"
        :disabled="element.options.disabled"
        :style="{ width: element.options.width }"
      />
    </template>

    <template v-if="element.type === 'date'">
      <a-date-picker
        :value="element.options.defaultValue"
        :placeholder="element.options.placeholder"
        :inputReadOnly="element.options.readonly"
        :disabled="element.options.disabled"
        :style="{ width: element.options.width }"
      />
    </template>

    <template v-if="element.type === 'rate'">
      <a-rate
        :value="element.options.defaultValue"
        :count="element.options.max"
        :disabled="element.options.disabled"
        :allowHalf="element.options.allowHalf"
      />
    </template>

    <template v-if="element.type === 'select'">
      <a-select
        :value="element.options.defaultValue"
        :disabled="element.options.disabled"
        :allowClear="element.options.clearable"
        :placeholder="element.options.placeholder"
        :style="{ width: element.options.width }"
      >
        <a-select-option
          v-for="item of element.options.options"
          :key="item.value"
          :value="item.value"
        >
          {{ element.options.showLabel ? item.label : item.value }}
        </a-select-option>
      </a-select>
    </template>

    <template v-if="element.type === 'switch'">
      <a-switch
        :checked="element.options.defaultValue"
        :disabled="element.options.disabled"
        @change="switchStatus('switch', element)"
      />
    </template>

    <template v-if="element.type === 'slider'">
      <a-slider
        :value="element.options.defaultValue"
        :min="element.options.min"
        :max="element.options.max"
        :step="element.options.step"
        :range="element.options.range"
        :disabled="element.options.disabled"
        :style="{ width: element.options.width }"
      />
    </template>

    <template v-if="element.type == 'text'">
      <span>{{ element.options.defaultValue }}</span>
    </template>

    <div
      class="widget-view-action"
      style="right: 0; bottom: -32px; background-color: white"
      v-if="selectWidget?.key === element.key"
    >
      <img
        width="16"
        height="16"
        style="float: left; margin-right: 5px"
        src="../icons/svg/copy.svg"
        @click.stop="$emit('copy')"
      />
      <img
        width="16"
        height="16"
        style="float: left"
        src="../icons/svg/delete.svg"
        @click.stop="$emit('delete')"
      />
    </div>

    <div
      class="widget-view-drag"
      v-if="selectWidget?.key === element.key"
      :style="{ left: `${-width}px`, top: `${-height}px` }"
      style="width: 30px"
    >
      <img
        style="margin-top: 5px; margin-left: 5px"
        width="20"
        height="20px"
        src="../icons/svg/move.svg"
      />
    </div>
  </a-form-item>
</template>

<script lang="ts">
  import { defineComponent, nextTick, reactive, toRefs, watch } from 'vue'
  import SvgIcon from '../../src/components/SvgIcon.vue'

  export default defineComponent({
    name: 'AntdWidgetFormItem',
    components: {
      SvgIcon,
    },
    props: {
      config: {
        type: Object,
      },
      element: {
        type: Object,
      },
      selectWidget: {
        type: Object,
      },
    },
    emits: ['copy', 'delete', 'update:changeData'],
    setup(props, context) {
      const state = reactive({
        formItemRef: null,
        width: 0,
        height: 0,
      })
      const handleCalcPosition = () => {
        nextTick(() => {
          const antFormItemLabelDom =
            state.formItemRef?.$el.getElementsByClassName('ant-form-item-label')[0]

          state.width = antFormItemLabelDom.clientWidth ?? 0
          state.height = antFormItemLabelDom.clientHeight - 26 ?? 0
        })
      }
      const switchStatus = (tag: any, element: any) => {
        const maps = {
          tag: tag,
          element: element,
        }
        context.emit('update:changeData', maps)
      }
      onresize = () => handleCalcPosition()

      watch(
        () => state.formItemRef,
        () => handleCalcPosition(),
      )

      watch(
        () => props.config?.labelCol.span,
        () => handleCalcPosition(),
      )
      return {
        ...toRefs(state),
        switchStatus,
      }
    },
  })
</script>
