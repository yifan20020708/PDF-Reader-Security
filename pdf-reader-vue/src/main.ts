import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)
var path = window.sessionStorage.getItem('pdf_path');
// window.alert(path);
app.provide('message', path); // 通过 provide 方法提供参数

app.use(ElementPlus)
app.mount('#app')