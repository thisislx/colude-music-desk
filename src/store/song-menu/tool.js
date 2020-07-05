export const
    /* 
        拆分创建歌单 和 收藏歌单
        @ params(uid) 用户id
    */
    splitMenu = (arr, uid, isMine = false) => {
        const mine = []
        let i = 0
        for (let len = arr.length; i < len; i++) {
            if (arr[i].userId == uid) mine.push(arr[i])
            else break
        }
        isMine && (mine[0].name = '我喜欢的音乐')
        return {
            mine,
            collect: arr.slice(i)
        }
    }

