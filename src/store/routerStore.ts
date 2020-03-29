import { Store } from "@/store"

interface Router{
    path: string;
    history: Array<string>;
}

class RouterStore extends Store<Router>{
    get pwd(){
        return this.state.path
    }
    
    //pwd+name
    push(name: string){
        const {path, history} = this.state
        history.push(path)
        this.state.path = path === "/" ? `/${name}`:`${path}/${name}`
    }

    // cd path
    goto(gotoPath: string){
        const {path, history} = this.state
        history.push(path)
        this.state.path = gotoPath
    }
    goBack(){
        const path = this.state.history.pop()
        this.state.path = path || "/"
        return path || "/"
    }
    protected data(): Router {
        return {
            path:"/",
            history: [],
        }
    }
}
export const routerStore: RouterStore = new RouterStore()