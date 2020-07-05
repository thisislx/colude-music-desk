import { actionsCreator as globalAc } from 'store/global'
import store from 'store'

let dispatch = null,
    single = null
setTimeout(() => {
    dispatch = store.dispatch
})

export default class {
    constructor(ms = 1500) {
        /* ms不同 */
        if (single) return Object.assign(Object.create(single.__proto__), single, ms)
        this.ms = ms
        this.list = []
        this.stop = false
        this.handing = false        /* 正在处理 */
    }

    start() {
        this.stop = false
        if (!this.handing) this.listener()
    }

    stop() {
        this.stop = true
    }

    push(text, ms, icon) {
        const { list, stop, handing } = this
        list.push([text, ms, icon])
        if (!stop && !handing) this.listener()
    }

    pushErr(text, ms) {
        this.push(text, ms, 'err')
    }

    clean() {
        this.list.splice(0)
    }

    listener() {
        const
            { list, ms } = this,
            handle = () => {
                if (!list.length || this.stop) this.handing = false
                else {
                    const
                        cur = list.shift(),
                        _ms = Number.isInteger(cur[1]) ? cur[1] : ms
                    dispatch(globalAc.showToast(cur[0], cur[2], _ms))
                    setTimeout(handle, _ms)
                }
            }
        setTimeout(() => handle(), 4)
        this.handing = true
    }
}