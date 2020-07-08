const _mvidReg = /^\d\d*$/

export const
    _isMvId = id => _mvidReg.test(id),
    uniformData_ = (() => {
        const
            __keys = [
                ['name', 'title'],
                ['id', 'vid'],
                ['artists', 'creator'],
                ['cover', 'coverUrl'],
                ['playCount', 'playTime']
            ],
            __keysMethod = [
                obj => {
                    if (typeof obj.publishTime === 'number') {
                        const date = new Date(obj.publishTime)
                        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                    }
                },
                obj => {
                    if (!Array.isArray(obj.artists)) { }
                    obj.artists = [obj.artists]
                },
                obj => {
                    const __keys = ['id', 'userId']
                    for (const ar of obj.artists) {
                        for (const key of __keys) if (Reflect.has(ar, key)) {
                            ar[__keys[0]] = ar[key]
                            break
                        }
                    }
                }
            ]
        return obj => {
            for (const keys of __keys) {
                for (const key of keys) if (Reflect.has(obj, key)) {
                    obj[keys[0]] = obj[key]
                    break
                }
            }
            for (const method of __keysMethod) {
                method(obj)
            }
            return obj
        }
    })()