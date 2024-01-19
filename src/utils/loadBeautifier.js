import loadScript from './loadScript'
import pluginsConfig from './pluginsConfig'

let beautifierObj

export default function loadBeautifier(cb) {
    const {beautifierUrl} = pluginsConfig
    if (beautifierObj) {
        cb(beautifierObj)
        return
    }


    loadScript(beautifierUrl, () => {
        beautifierObj = beautifier
        cb(beautifierObj)
    })
}
