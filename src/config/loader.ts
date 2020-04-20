import mapping from "./suffixMapping"

const load = (fileName: string, payload: string) => {
    const a = fileName.split(".")
    if(a.length < 2){
        //no suffix please open with
        return payload
    }
    
    const processer = mapping(a[a.length-1]).processer
    if(!processer){
        //Open with
        console.log("Open with")
        return payload
    }

    return processer(payload)
}
export default load