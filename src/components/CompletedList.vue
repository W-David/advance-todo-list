<template>
  <div class="completed-list-container">
    <content-list v-if="compItemList.length > 0" :showList="compItemList"></content-list>
    <el-empty v-else description="快去完成任务吧..."></el-empty>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import ContentList from './ContentList.vue'
import { ItemList } from './TodoList.vue'

export default defineComponent({
  name: 'completedList',
  components: {
    ContentList
  },
  props: {
    compItemList: {
      type: Array as PropType<ItemList>,
      required: true
    }
  }
})
</script>

<style>

</style>