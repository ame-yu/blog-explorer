import setting from "@/config/setting"
import { openDB, DBSchema } from 'idb';
import {Strategy, GithubStrategy} from "./strategy"
import Vue from "vue"
import { Setting } from './system';
import { AxiosResponse } from 'axios';
const { versionNunber } = setting

export interface Posts {
    title: string;
    content: string;
    lastEdit: number;
}

export interface Shelf extends DBSchema {
    //Key for full repository name e.g. ame-yu/blog
    //keyis path
    [repository: string]: {
        key: string;
        value: Posts;
    };
}

class ShelfOp {
    setting: Setting = Vue.$setting.value
    repository: string
    strategy?: Strategy
    constructor(repository?: string){
        this.repository = repository || this.setting.repository
        this.strategy = GithubStrategy()
    }

    getDB(){
        //Default open my repository
        const repository = this.repository
        return openDB("shelf", versionNunber, {
            upgrade(db) {
                if (!db.objectStoreNames.contains(repository)) {
                    db.createObjectStore(repository, { autoIncrement: true });
                }
            },
        })
    }
    
    async query(path: string): Promise<string>{
        const db = await this.getDB()
        const res = await db.get(this.repository, path)
        return res? res.content : await this.fetch(path)
    }

    async update(path: string, content: string){
        const db = await this.getDB()
        const res = await db.get(this.repository, path)
        const data = {
            ...res,
            content
        }
        db.put(this.repository, data, path)
    }

    async fetch(path: string): Promise<string>{
        if(this.strategy){
            const { data } = await this.strategy.getResource(path) as AxiosResponse
            this.update(path, data);
            return data
        }
        return "Please check net work"
    }

    async clearRepository(){
        const db = await this.getDB()
        db.deleteObjectStore(this.repository)
    }
}

export default {
    open: () => new ShelfOp()
}