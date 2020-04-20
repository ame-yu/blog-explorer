import marked from "marked"

interface Mapping {
    [suffix: string]: {
        type: string;
        processer: (s: string) => unknown;
    };
}

const htmlLoader = (str: string) => `<iframe sandbox="allow-scripts"  frameborder="0" src="data:text/html;charset=utf-8,${escape(str)}"></iframe>`

const mapping: Mapping= {
    "md": {
        type: "MarkDown",
        processer: marked
    },
    "html": {
        type: "HTML",
        processer: htmlLoader
    },
    "file": {
        type: "文件",
        processer: (s: string) => ""
    }
}

const proxy = (suffix: string) => mapping[suffix] || mapping["file"]
export default  proxy

