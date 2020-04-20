import setting from "@/config/setting"
import { ReleaseInfo } from "../type"
import { openDB, DBSchema } from 'idb';
import {Strategy, GithubStrategy} from "./strategy"
/*
* Mainly two module
* system.setting
* system.info
*/
const { versionNunber } = setting
const dbName = "system"
export type SystemModule = "setting" | "info"

abstract class SystemOp {
    abstract tableName: SystemModule
    static strategy?: Strategy
    constructor(){
        SystemOp.strategy = new GithubStrategy()
    }
    get db() {
        const tableName = this.tableName
        return openDB(dbName, versionNunber, {
            upgrade(db) {
                if (!db.objectStoreNames.contains(tableName)) {
                    db.createObjectStore(tableName, { autoIncrement: true });
                }
            },
        })
    }
    async put(data: unknown) {
        const db = await this.db
        db.put(this.tableName, data, versionNunber)
        return
    }
    async query(key?: string) {
        const db = await this.db
        let res = await db.get(this.tableName, versionNunber)
        if(key){
            if (!res || !res[key]) res = await this.fetch()
            return res[key]
        }
        return res || await this.fetch()
    }
    abstract async fetch(): Promise<unknown>
}

class SettingOp extends SystemOp {
    tableName = "setting" as SystemModule
    async fetch() {
        const db = await this.db
        const custom = await (await fetch("/setting.json")).json()
        const origin = (await db.get(this.tableName, versionNunber)) || {}
        const rst = Object.assign(origin, custom)
        this.put(rst);
        return rst
    }
}


class InfoOp extends SystemOp {
    tableName = "info" as SystemModule
    async fetch() {
        if(!SystemOp.strategy) console.error("检查json配置")
        const db = await this.db
        const origin = (await db.get(this.tableName, versionNunber)) || {}
        const latest = await (await fetch(SystemOp.strategy!.endpoint)).json()
        const info = {
            ...JSON.parse(latest.body),
            lastUpdate: latest.published_at
        }
        //有新Release就更新
        console.log(info)
        if(!origin.lastUpdate || new Date(latest.published_at) > new Date(origin.lastUpdate)){
            this.put(info);
        }
        return info
    }
}

type Version = number
export interface SystemDB extends DBSchema {
    //Key for current version
    setting: {
        key: Version;
        value: Setting;
    };
    info: {
        key: Version;
        value: {
            key: string;
            value: Info;
        };
    };
}

export interface Setting {
    repository: string;
}

export interface Info extends ReleaseInfo {
    lastUpdate: string;
}





class System{
    get setting(){
        return new SettingOp()
    }
    get info(){
        return new InfoOp()
    }
}
const SystemCall = new System()

export { SystemCall }