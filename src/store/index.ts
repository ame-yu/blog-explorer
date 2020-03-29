import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
Vue.use(VueCompositionApi)
import { reactive } from '@vue/composition-api';

export abstract class Store<T> {
    protected state: T;

    constructor() {
        const data = this.data();
        this.setup(data);
        this.state = reactive(data) as T;
    }

    protected abstract data(): T
    /*eslint ignore:true */
    protected setup(data: T): void {}

    public getState(): T {
        //TOOD replace with readonly when vue next come out
        return reactive(this.state) as T
    }
}
