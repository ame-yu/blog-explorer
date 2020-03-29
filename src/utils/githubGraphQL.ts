 /**
 *  Do not use this file init API
 *  use release and idb replace
 */
 type dirObj = {
   path: string;
   file: Array<dirItem>;
 }
 type dirItem = string | dirObj
 type grepArg = RegExp | ((arg: dirItem) => boolean)
 /**
  * grep file or folder
  * @param src The value to recursively clone.
  * @param decide Regex for all string or define your own filter function
  * @return Returns the dirObj after filter
  */
 function grep(src: dirObj, decide: grepArg): dirObj {
   const file: Array<dirItem> = [];
   src.file.forEach((it: dirItem) => {
     if(typeof decide === 'function'){//Custom define
       if(typeof it === "object" && (it as dirObj).file){
         file.push(grep(it, decide));
       }else{
         if(decide(it)) file.push(it)
       }
     }else{
       if (typeof it === 'string') {
         if (decide.test(it)) file.push(it);
       } else {
         file.push(grep(it, decide));
       }
     }
   });
   return {
     ...src,
     file
   };
 }
 function grepFolder(src: dirObj): dirObj{
   const filterFuc = (it: dirItem) => (
     typeof it === "object" && (it as dirObj).path !== undefined
   )
   return grep(src,filterFuc)
 }
 
 /**
 * get the manifest of the resource
 * @param src:dirObj
 * @return Array<string>
 */
 function toFilePathArray(src: dirObj): Array<string> {
   const array: Array<string> = [];
   const parentPath = src.path.replace("master:","/")
   src.file.forEach((it: dirItem) => {
       if(typeof it === "object"){
         array.push(...toFilePathArray(it))
       }else{
         const delimiter = parentPath === "/"?"":"/"
         array.push(`${parentPath}${delimiter}${it}`)
       }
   });
   return array
 }

function toFolderPathArray(src: dirObj): Array<string>{
  const array: Array<string> = [];
  array.push(src.path.replace("master:","/"))
  src.file.forEach((it: dirItem) => {
      if(typeof it === "object"){
        array.push(...toFolderPathArray(it))
      }
  });
  return array
}

function shortName(path: string){
  return path.split("/").slice(-1)[0]
}


export { grep, grepFolder, dirObj, shortName, toFilePathArray,toFolderPathArray };
