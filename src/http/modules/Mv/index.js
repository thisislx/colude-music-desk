import axios from '../../config'

/* mv 指的是歌曲的mv   video指的是其它视频 */

export default class {
    getMvData(mvid) {
        return axios({
            url: '/mv/detail',
            method: 'GET',
            params: {
                mvid,
            }
        })
    }
    getVideoData(id) {
        return axios({
            url: '/video/detail',
            method: 'GET',
            params: {
                id,
            }
        })
    }

    /* 歌曲的mv */
    getMvUrl(mvid) {
        return axios({
            url: '/mv/url',
            method: 'GET',
            params: {
                id: mvid,
            }
        })
    }
    /* 其它视频 */
    getVideoUrl(mvid) {
        return axios({
            url: '/video/url',
            method: 'GET',
            params: {
                id: mvid,
            }
        })
    }

    getRelateMv(mvid) {
        return axios({
            url: '/simi/mv',
            method: 'GET',
            params: {
                mvid: mvid
            }
        })
    }

    getMvComment(mvid, offset, limit, before) {
        return axios({
            url: '/comment/mv',
            method: 'GET',
            params: {
                id: mvid,
                offset,
                limit,
                before,
            }
        })
    }
    getVideoComment(mvid, offset, limit, before) {
        return axios({
            url: '/comment/video',
            method: 'GET',
            params: {
                id: mvid,
                offset,
                limit,
                before,
            }
        })
    }
}