const
    _lyrciReg = /\[\d{2}:\d{2}(?:[\.\:]\d*)?\][^\[]+/g,
    minToTime_ = min => {
        const [m, s] = min.split(':')
        return m * 1000 * 60 + s * 1000
    }

export const
    processLyric = str => {
        if (!str) return ''
        const
            arr = str.match(_lyrciReg),
            res = {}
        if (!arr) return '没有歌词'
        for (const item of arr) {
            const [time, text] = item.split(']')
            res[minToTime_(time.slice(1)) - 200] = text
        }
        return res
    },
    mergeLyric = (origin, translation) => {
        if (!origin) return '等待上传'
        if (!translation) return origin
        const res = {}
        for (const [key, val] of Object.entries(translation)) {
            if (!origin[key] || !origin[key].trim()) continue
            const newVal = (origin[key] || '') + (val ? `\n${val}` : '')
            res[+key] = newVal
        }
        return res
    }
