<template>
  <div class="content-list-container">
    <el-row v-for="item in showList" :key="item.id" >
      <el-col :span="24" class="item-container">
        <p class="item-content">{{ item.content }}</p>
        <p class="item-time">{{ format(item.id) }}</p>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ItemList } from './TodoList.vue'
import { format } from '@/utils/helper'

export default defineComponent({
  name: 'list',
  props: {
    showList: {
      type: Array as PropType<ItemList>,
      required: true
    }
  },
  setup () {
    return {
      format
    }
  }
})
</script>

<style scoped>
  .item-container {
    border-radius: 5px;
    border: .3px solid #C0C4CC;
    margin: 10px 0;
    background-color: #F2F6FC ;
    text-align: left;
    padding: 5px 5px 5px 15px;
    cursor: pointer;
  }

  .item-container:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }

  .item-content {
    color:#909399;
  }
  .item-time {
    color:#409EFF;
    font-size: 12px;
  }
</style>