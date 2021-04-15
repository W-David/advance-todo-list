<template>
  <el-dropdown>
    <i class="el-icon-more btn-more"></i>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="onEdit">Edit</el-dropdown-item>
        <el-dropdown-item @click="onCompleted">Complete</el-dropdown-item>
        <el-dropdown-item @click="onDeleted">Delete</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
export default defineComponent({
  name: 'dropDown',
  setup () {
    const internalInstance = getCurrentInstance()
    const bus = internalInstance?.appContext.config.globalProperties.$bus
    const onEdit = () => {
      bus.emit('on-edit')
    }
    const onCompleted = () => {
      bus.emit('on-completed')
    }
    const onDeleted = () => {
      bus.emit('on-deleted')
    }
    return {
      onEdit,
      onCompleted,
      onDeleted
    }
  }
})
</script>

<style scoped>
  .btn-more {
    cursor: pointer;
  }
</style>