import { shallowMount, createLocalVue } from '@vue/test-utils'

import {pwdFiles} from "@/utils/fileUtils"

test("pwdTes",() => {
    const manifest = {
        "/folderA/folderB": {lastEditDate: "D", size:0},
        "/folderA/folderC": {lastEditDate: "D", size:0},
        "/folderA/folderB/fileC": {lastEditDate: "D", size:0},
        "/folderB/fileA":{lastEditDate: "D", size:0},
        "/fileE": {lastEditDate: "D", size:0},
    }
    
    const dirobj = {
        path: "/",
        file:[
            {
                path:"folderA",
                file:[{
                    path:"folderB",
                    file:["fileC"]
                },
                {
                    path:"folderC",
                    file:[]
                }]
            },
            {
                path:"folderB",
                file:["fileA"]
            },
            
            "fileE"
        ]
    }
    const manifestRst1 = pwdFiles(manifest,"/")
    const manifestRst2 = pwdFiles(manifest,"/folderA")
    const dirobjRst1 = pwdFiles(dirobj,"/")
    const dirobjRst2 = pwdFiles(dirobj,"/folderA")
    const want1 = ["folderA","folderB","fileE"]
    const want2 = ["folderB","folderC"]
    expect(want1.every(it => manifestRst1.includes(it))).toBe(true)
    expect(want2.every(it => manifestRst2.includes(it))).toBe(true)
    expect(want1.every(it => dirobjRst1.includes(it))).toBe(true)
    expect(want2.every(it => dirobjRst2.includes(it))).toBe(true)
})
