<template>
  <el-row class="input-content-container">
    <el-input v-model="inputRef" 
              class="input-content" 
              size="large" 
              @keyup.enter="addItem"
              placeholder="input a task...">
      <template #append>
        <el-button icon="el-icon-plus" @click="addItem"></el-button>
      </template>
    </el-input>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Item } from '@/components/TodoList.vue'

export default defineComponent({
  name: 'inputContent',
  emits: ['add-item'],
  setup (props, context) {
    const inputRef = ref('')
    const addItem = () => {
      if (inputRef.value.trim() === '') {
        return
      }
      const curItem: Item = {
        id: String(Date.now()),
        content: inputRef.value,
        isSelected: false
      }
      context.emit('add-item', curItem)
    }
    return {
      inputRef,
      addItem
    }
  }
})
</script>

<style scoped>
</style>