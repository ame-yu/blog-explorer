export interface ReleaseInfo {
    tree: dirObj;
    manifest: Manifest;
}

export interface Manifest {
    [path: string]: {
        lastEditDate: string;
        size: number;
    };
}

export type dirObj = {
    path: string;
    file: Array<dirItem>;
}


export type dirItem = string | dirObj