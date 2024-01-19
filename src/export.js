import Designer from "@/views/design/Designer.vue"
import Render from "@/views/render/Render.vue"
import 'virtual:svg-icons-register'
import editors from "@/components/editors"
import * as components from '@primevue/icons-vue'

const ElementPlusDesigner = {
    install(App) {
        App.component('ElementPlusDesigner', Designer);
        App.component('ElementPlusRender', Render);
        App.use(editors);
        for (const key in components) {
            const componentConfig = components[key];
            App.component(componentConfig.name, componentConfig);
        }
    },
};

export default ElementPlusDesigner;
