import { Manifest, dirObj } from "@/store/type"
import mapping from "@/config/suffixMapping"
/**
* @param source one of info Manifest or DirObj
* @return Array of path e.g.["/fileA","/folderA"]
*/

function suffix(fileName: string){return fileName.includes(".")?fileName.split(".").slice(-1)[0]:"文件"}

function pwdFiles(source: Manifest | dirObj, path: string): Array<string> {
  if (source.path) {
    let dir = source as dirObj
    const out = () => dir.file.map((it: any) => (
      typeof it === 'string' ? it : it.path
    ))

    if (path === "/") return out()

    const cd = (path: string): dirObj => {
      if (path === "") return dir
      const next = path.split("/")[1]

      dir = dir.file.find(it => typeof it === "object" ? it.path === next : false) as dirObj
      const cutPath = path.slice(1 + next.length)
      return cd(cutPath)
    }
    cd(path)
    return out()
  } else {
    const manifest = source as Manifest
    const fileList = Object.keys(manifest);
    const select = path === "/" ? 0 : 1
    const files = fileList
      .filter(it => it.startsWith(path))
      .map(it => it.replace(path, ""))
      .map(it => it.split("/")[select]);

    return Array.from(new Set(files))
  }
}


interface FileObj {
  fileName: string;
  fileType: string;
}
function pwdManifest(source: Manifest, path: string): Array<FileObj> {
  //Mapping
  const p = path === "/" ? "" : path
  const pf = pwdFiles(source, path)
  return pf.map((it: string) => {
    if (source[`${p}/${it}`]) {
      return {
        ...source[`${p}/${it}`],
        fileName: it,
        fileType: mapping(suffix(it)).type
      }
    } else {
      return {
        fileName: it,
        fileType: "文件夹"
      }
    }
  })
}

export { pwdFiles, pwdManifest }