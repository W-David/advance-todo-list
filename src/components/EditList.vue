<template>
  <div class="edit-list-container">
    <input-content @add-item="addItem"></input-content>
    <transition name="list-empty" mode="out-in">
      <filter-list v-if="editItemList.length > 0"
                    :beSelectedAll="beSelectedAll"
                    @select-all="selectAll" 
                    @remove-selected="removeSelected">
        <transition-group name="list-item">
          <todo-item v-for="item in editItemList" 
                      :key="item.id"
                      :item="item"
                      @complete-item="completeItem"
                      @select-item="selectItem">
          </todo-item>
        </transition-group>
      </filter-list>
      <el-empty v-else description="暂无待办事项"></el-empty>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { ItemList,Item } from './TodoList.vue'
import InputContent from './InputContent.vue'
import FilterList from './FilterList.vue'
import TodoItem from './TodoItem.vue'

export default defineComponent({
 name: 'editList',
 components: {
   InputContent,
   FilterList,
   TodoItem
 },
 props: {
   editItemList: {
     type: Array as PropType<ItemList>,
     required: true
   }
 },
 emits: ['add-item','select-all','remove-all','complete-item','select-item'],
 setup (props, context) {
    const beSelectedAll = computed(() => props.editItemList.every((item: Item) => item.isSelected))
    const completeItem = (item: Item) => {
      context.emit('complete-item', item)
    }
    const addItem = (item: Item) => {
      context.emit('add-item', item)
    }
    const selectItem = (id: string,isSelected: boolean) => {
      context.emit('select-item', id, isSelected)
    }
    const removeSelected = () => {
      context.emit('remove-all')
    }
    const selectAll = (isSelected: boolean) => {
      context.emit('select-all', isSelected)
    }
    return {
      completeItem,
      addItem,
      selectItem,
      removeSelected,
      selectAll,
      beSelectedAll
    }
 }
})
</script>

<style scoped>
  .list-empty-enter-active {
    transition: all 0.5 ease-out;
  }
  .list-empty-leave-active {
    transition: all 0.2s ease-in;
  }

  .list-empty-enter-from,
  .list-empty-leave-to {
    opacity: 0;
    transform: scale(1.2)
  }

  .list-item-enter-active {
    transition: all 0.5s ease-out;
  }
  .list-item-leave-active {
    position: absolute;
    transition: all 0.15s ease-in;
  }
  .list-item-move {
    transition: transform 0.5s ease;
  }
  .list-item-enter-from {
    opacity: 0;
    transform: translateY(-30%);
  }
  .list-item-leave-to {
    opacity: 0;
    transform: scale(0.8)
  }
</style>