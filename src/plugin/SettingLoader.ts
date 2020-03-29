import _Vue from 'vue';
import { Setting } from '@/store/idb/system';
import { ref, Ref } from '@vue/composition-api';
declare module 'vue/types/vue' {
    interface VueConstructor {
        $setting: Ref<Setting>;
    }
}
const SettingLoader = {
    // It takes the global Vue object as well as user-defined options.
    async install(Vue: typeof _Vue, options: any) {
        const setting = ref({
            repository: ""
        })
        Vue.$setting = setting
        Vue.$setting.value = await (await fetch("/setting.json")).json()
    }
};

export default SettingLoader;