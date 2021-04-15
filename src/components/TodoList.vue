<template>
  <el-row>
    <el-col :xs="{span: 22, offset: 1}" 
            :md="{span: 12, offset: 6}" 
            :xl="{span: 8, offset: 8}"> 
      <transition name="toggle-page" mode="out-in">
        <edit-list v-if="showRef === 'edit'"
                  :editItemList="editItemListRef"
                  @complete-item="completeItem"
                  @add-item="addItem"
                  @select-item="selectItem"
                  @select-all="selectAll"
                  @remove-all="removeAll">
        </edit-list>
        <completed-list v-else-if="showRef === 'comp'" 
                        :compItemList="isCompItemListRef">
        </completed-list>
        <deleted-list v-else
                      :delItemList="beDelItemListRef">
        </deleted-list>
      </transition>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, getCurrentInstance, onBeforeUnmount } from 'vue'
import CompletedList from './CompletedList.vue'
import DeletedList from './DeletedList.vue'
import EditList from './EditList.vue'

export interface Item {
  id?: string,
  content?: string;
  isSelected?: boolean;
}
export type ItemList = Item[]
type Show = 'edit' | 'comp' | 'del'

export default defineComponent({
  name: 'inputTodo',
  components: {
    EditList,
    CompletedList,
    DeletedList
  },

  setup () {
    const editItemListRef: Ref<ItemList> = ref([])
    const isCompItemListRef: Ref<ItemList> = ref([])
    const beDelItemListRef: Ref<ItemList> = ref([])

    const internalInstance = getCurrentInstance()
    const bus = internalInstance?.appContext.config.globalProperties.$bus
    const showRef: Ref<Show> = ref('edit')

    bus.on('on-edit', () => {
      showRef.value = 'edit'
    })
    bus.on('on-completed', () => {
      showRef.value = 'comp'
    })
    bus.on('on-deleted', () => {
      showRef.value = 'del'
    })

    const completeItem = (it: Item) => {
      editItemListRef.value = editItemListRef.value.filter((item: Item) => item.id !== it.id)
      isCompItemListRef.value.push(it)
    }
    const addItem = (item: Item) => {
      editItemListRef.value.push(item)
    }
    const selectItem = (id: string, isSelected: boolean) => {
      editItemListRef.value = editItemListRef.value.map((item: Item) => item.id === id ? {...item, isSelected} : item)
    }
    const selectAll = (val: boolean) => {
      editItemListRef.value = editItemListRef.value.map((item: Item) => {
        return { ...item, isSelected: val}
      })
    }
    const removeAll = () => {
      const tempList: ItemList = []
      editItemListRef.value.forEach((item: Item) => {
        item.isSelected ? beDelItemListRef.value.push(item) : tempList.push(item)
      })
      editItemListRef.value = tempList
    }
    onBeforeUnmount(() => {
      bus.off('on-edit')
      bus.off('on-completed')
      bus.off('on-deleted')
    })
    return {
      showRef,
      editItemListRef,
      isCompItemListRef,
      beDelItemListRef,
      completeItem,
      addItem,
      selectAll,
      removeAll,
      selectItem
    }
  }
})
</script>

<style>
  .container {
    padding: 5px;
  }
  .toggle-page-enter-active {
    transition: all 0.5s ease-out;
  }
  .toggle-page-leave-active {
    transition: all 0.35s ease-in;
  }
  .toggle-page-enter-from,
  .toggle-page-leave-to {
    transform: scale(1.2);
    opacity: 0;
  }
</style>
