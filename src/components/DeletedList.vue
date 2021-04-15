<template>
  <content-list v-if="delItemList.length > 0" :showList="delItemList"></content-list>
  <el-empty v-else description="这里空空如也..."></el-empty>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import ContentList from './ContentList.vue'
import { ItemList } from './TodoList.vue'

export default defineComponent({
  name: 'deletedList',
  components: {
    ContentList
  },
  props: {
    delItemList: {
      type: Array as PropType<ItemList>,
      required: true
    }
  }
})
</script>

<style>

</style>