/* 关于歌曲 */

/* 
    计算出字符串的歌手名
    @params(artists) @type(string, arr)
    @return(string)
*/
export const
    computeArtist = artists => {
        if (Array.isArray(artists))
            return artists.reduce((prev, cur) => prev + cur.name, '')
        return artists.name
    },
    computeClockMin = num => {
        if (!(num | 0)) return `00:00`
        let s = num / 1000 | 0
        if (s < 60) return `00:${s.toString().padStart(2, '0')}`
        const m = (0 | (s / 60)).toString().padStart(2, '0')
        s = (s % 60).toString().padStart(2, '0')
        return `${m}:${s}`
    },
    computeClockYear = (ms, sign = '-') => {
        const d = new Date(ms)
        return `${d.getFullYear()}${sign}${d.getMonth() + 1}${sign}${d.getDate()}`
    },
    /* 
        拆分请求过长的id
    */
    splitSongsId = ids => {
        const base = 50, limit = ids.length
        if (limit <= base) return ids.map(item => item.id ? item.id : item)
        let res = []
        for (let i = 0; ;) {
            const
                start = i * base,
                end = base * (i + 1),
                idList = ids.slice(start, end > limit ? limit : end)
                    .map(item => item.id ? item.id : item)
            res.push(idList)
            if (limit > end) i++
            else return res
        }
    },
    addSourceProerty = (songs, property) => {
        if (Array.isArray(songs))
            songs.forEach(item => {
                item.source = property
            })
        return songs
    },
    unifySongsProperty = songs => {
        if (Array.isArray(songs)) {
            for (const song of songs) {
                processSongProperty_(song)
            }
        }
        return songs
    },
    createBarrage = (list, duration) => {
        const
            len = list.length,
            gap = duration / len,
            res = {}
        for (let i = 0; i < len; i++) {
            res[gap * i] = list[i]
        }
        return res
    }


const
    /* 统一歌单的标准属性， 每日推荐歌曲与歌单详情冲突 */
    processSongProperty_ = song => {
        const
            ar = ['ar', 'artists'],     /* 歌手 */
            al = ['al', 'album'],       /* 专辑 */
            dt = ['dt', 'duration']     /* 歌曲时长 */
        let arTem = null, alTem = null, dtTem = 0
        for (let i = 0, len = ar.length; i < len; i++) {
            arTem = arTem || (Reflect.has(song, ar[i]) ? song[ar[i]] : arTem)
            alTem = alTem || (Reflect.has(song, al[i]) ? song[al[i]] : alTem)
            dtTem = dtTem || (Reflect.has(song, dt[i]) ? song[dt[i]] : dtTem)
        }
        song[ar[0]] = arTem || []
        song[al[0]] = alTem || {}
        song[dt[0]] = dtTem
        return song
    }