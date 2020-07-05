import axios from '../../config'

export default class {
    // getUrl(id) {
    //     return axios.get(`/song/url?id=${id}`)
    // }

    /* 
        得到歌曲信息 
        @params(ids) @type(arr)
    */
    getSongs(ids) {
        if (!Array.isArray(ids)) ids = [ids]
        return axios({
            url: '/song/detail',
            method: 'GET',
            params: {
                ids: ids.join(',')
            }
        })
    }

    getLyric(id) {
        return axios.get('/lyric?id=' + id)
    }

    /*
     @params(before) 超过5000条评论时上一页最后一条数据的time
     @params(offset) 偏移量 (offset - 1) * limit
    */
    getComments(id, offset, limit, before) {
        return axios({
            url: '/comment/music',
            method: 'GET',
            params: {
                id,
                before,
                limit,
                offset,
            }
        })
    }

    makeComment(id, content) {
        return axios({
            url: '/comment',
            params: {
                t: 1,
                type: 0,
                id,
                content,
            }
        })
    }

    replyComment(id, content, commentId) {
        return axios({
            url: '/comment',
            params: {
                t: 2,
                type: 0,
                id,
                content,
                commentId
            }
        })
    }

    deleteComment(id, commentId) {
        return axios({
            url: '/comment',
            params: {
                t: 0,
                type: 0,
                id,
                commentId
            }
        })
    }

    likeComment(id, commentId) {
        return axios({
            method: 'GET',
            url: 'comment/like',
            params: {
                id,
                cid: commentId,
                t: 1,
                type: 0,
            }
        })
    }

    cancelLikeComment(id, commentId) {
        axios({
            method: 'GET',
            url: 'comment/like',
            params: {
                id,
                cid: commentId,
                t: 0,
                type: 0,
            }
        })
    }
}