<template>
  <el-container class="app-container">
    <el-header class="header">
      <i class="el-icon-tickets favicon"></i>
      <span>LightList</span>
      <dropdown></dropdown>
    </el-header>
    <el-main class="main">
      <todo-list></todo-list>
    </el-main>
    <el-footer class="footer center" height="40px">
      <a href="https://github.com/W-David" target="_blank">关于我</a>
    </el-footer>
  </el-container>
</template>

<script>
import Dropdown from './components/Dropdown.vue'
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    TodoList,
    Dropdown
  }
}
</script>

<style scoped>

.app-container {
  width: 100%;
  height: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #409EFF;
  color: white;
  font-size: 20px;
}
.favicon {
  cursor: pointer;
}

.main {
  background-color: white;
}

.footer {
  margin-top: auto;
  background-color: #909399;
}
.footer a {
  text-decoration: none;
  font-size: 14px;
  color: white;
}

</style>
