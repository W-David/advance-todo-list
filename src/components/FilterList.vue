<template>
  <div class="filter-list-container">
    <el-row type="flex" justify="space-between">
      <el-col :span="3" class="center">
        <el-checkbox v-model="selectedRef" @change="onSelectAll"></el-checkbox>
      </el-col> 
      <el-col :span="4" class="center">
        <el-button type="text" icon="el-icon-delete" @click="removeSelected"></el-button>
      </el-col>
    </el-row>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'filterList',
  props: {
    beSelectedAll: {
      type: Boolean,
      required: true
    }
  },
  emits: ['select-all','remove-selected'],
  setup (props, context) {
    const selectedRef = ref(false)
    watch(() => props.beSelectedAll, (newVal) => {
      selectedRef.value = newVal 
    })
    const onSelectAll = (val: boolean) => {
      context.emit('select-all',val)
    }
    const removeSelected = () => {
      context.emit('remove-selected')
    }
    return {
      selectedRef,
      removeSelected,
      onSelectAll
    }
  }

})
</script>

<style scoped>
</style>