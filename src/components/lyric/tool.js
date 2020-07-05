import lyric from ".";

export const
    /*
     @params(time) 当前播放的时间 
     @lyric(lyric) 歌词 @type(obj)
     @return number
     */
    comoputeLyricLine = (time, lyric) => {
        const keys = Object.keys(lyric), limit = keys.length - 1
        for (let i = 1; i < limit; i++) {
            if (keys[i] > time) return i - 1
            if (keys[i] < time && keys[i + 1] > time) return i
            i++
        }
        return limit
    }