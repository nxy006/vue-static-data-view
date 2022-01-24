import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIcons from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import store from './store'
import App from './App.vue'


const app = createApp(App)
            .use(ElementPlus)
            .use(ElementPlusIcons)
            .use(store)

for(let ElementPlusIcon in ElementPlusIcons) {
    app.component(ElementPlusIcon, ElementPlusIcons[ElementPlusIcon])
}

app.mount('#app');
