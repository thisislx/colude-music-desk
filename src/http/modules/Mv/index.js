import axios from '../../config'

export default class {
    getData(mvid) {
        return axios({
            url: '/mv/detail',
            method: 'GET',
            params: {
                mvid,
            }
        })
    }

    getUrl(mvid) {
        return axios({
            url: '/mv/url',
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

    getComment(mvid, offset, limit, before) {
        return axios({
            url: '/comment/mv',
            method: 'GET',
            params:{ 
                id: mvid,
                offset,
                limit,
                before,
            }
        })
    }
}