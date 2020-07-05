import { func } from "prop-types"

export const
    getProperty = (obj, propertys) => {
        if (typeof propertys === 'string') return obj[propertys]
        let current = obj
        for (const item of propertys) {
            current = current[item]
            if (current === undefined) return undefined
        }
        return current
    },
    throttle = (fn, wait) => {
        let old = 0
        return function () {
            const now = Date.now()
            if (now - wait > old) {
                old = now
                fn.apply(this, arguments)
            }
        }
    },
    debounce = (fn, wait = 50) => {
        let tid = null
        return function () {
            if (tid) clearTimeout(tid)
            tid = setTimeout(fn.bind(this, ...arguments), wait)
        }
    },
    convertHugeNum = num => {
        return num < 10000 ? num : `${0 | (num / 10000)}万`
    },
    /*
        @params(heads) @desc(保证index列表在最前)
    */
    randomArr = (arr, heads = [0]) => {
        /* 
            打乱数组
            @params(heads) @type(arr) @value[index, index]  位于打乱后数组前面
        */
        const
            newArr = [...arr],
            headArr = []

        for (const head of heads) {
            headArr.push(newArr[head])
            newArr.splice(head, 1)
        }

        for (let len = arr.length, i = len - 1; i--; i) {
            const random = 0 | len * Math.random();
            [newArr[i], newArr[random]] = [newArr[random], newArr[i]]
        }
        return [...headArr, ...newArr]
    }

