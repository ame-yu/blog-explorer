/*
包括更新战略的确定 EndPoint的推算
*/
import { Setting } from './system'
import Vue from "vue"
import axios from "axios"
export interface Strategy {
    readonly endpoint: string;
    
    getResource(url: string, payload?: any): unknown;
}

export class GithubStrategy implements Strategy{
    setting: Setting
    constructor(arg: Setting = Vue.$setting.value){
        this.setting = arg
    }

    get endpoint(): string{
        return `https://api.github.com/repos/${this.setting.repository}/releases/latest`
    }
    /**
    * @param path current path e.g. /mynote/log.md
    * @return Promise<any>
    */
    getResource(path: string): Promise<string>{
        const reqPath = `https://raw.githubusercontent.com/${this.setting.repository}/master${path}`
        return axios.get(reqPath)
    }
}

export class JsDeliverStrategy extends GithubStrategy{
    getResource(path: string): Promise<string>{
        const reqPath = `https://cdn.jsdelivr.net/gh/${this.setting.repository}@master${path}`
        return axios.get(reqPath)
    }
}