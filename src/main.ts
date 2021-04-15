import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/style/index.css'
import ElementPlus from 'element-plus'
import './element-variables.scss'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import mitt from 'mitt'


const app = createApp(App)
app.use(ElementPlus, { locale })
app.config.globalProperties.$bus = mitt()
app.mount('#app')