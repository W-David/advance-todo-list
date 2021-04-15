<template>
  <el-row class="todo-item-container">
    <el-col :span="3" class="center">
      <el-checkbox v-model="selectedRef" @change="onSelectChange"></el-checkbox>
    </el-col>
    <el-col :span="17" class="item-content">
      <span>{{ item.content }}</span>
    </el-col>
    <el-col :span="4" class="center btn-complete-item">
      <el-button type="text" @click="completeItem" icon="el-icon-check"></el-button>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { Item } from '@/components/TodoList.vue'
export default defineComponent({
  name: 'item',
  props: {
    item: {
      type: Object as PropType<Item>,
      required: true
    }
  },
  emits: ['complete-item','select-item'],
  setup (props,context) {
    const selectedRef = ref(false)
    watch(() => props.item.isSelected, (newVal) => {
      selectedRef.value = newVal as boolean
    })
    const onSelectChange = (val: boolean) => {
      context.emit('select-item', props.item.id, val)
    }
    const completeItem = () => {
      context.emit('complete-item', props.item)
    }
    return {
      selectedRef,
      completeItem,
      onSelectChange
    }
  }
})
</script>

<style scoped>
  .todo-item-container {
    border-radius: 5px;
    border: .3px solid #C0C4CC;
    margin: 0 0 10px;
    background-color: #F2F6FC ;
    cursor: pointer;
  }
  .todo-item-container:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
  .item-content {
    display: flex;
    justify-content: left;
    align-items: center
  }
</style>