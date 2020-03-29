import { SystemCall, Info } from "@/store/idb/system"
import { Store } from "@/store"

class InfoStore extends Store<Info>{
    async pull(){
        const info = await SystemCall.info.query()
        this.state = Object.assign(this.state, info)
        console.log(this.state)
        //Refresh ui
        SystemCall.info.fetch()
    }

    async update(){
//
    }
    push(){
        //推送到idb
    }
    protected data(): Info {
        return {
            tree:{path:"loading",file:[]},
            manifest:{},
            lastUpdate: ""
        }
    }
}
export const infoStore: InfoStore = new InfoStore()