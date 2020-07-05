import axios from '../../config'

export default class{
    getHot() {
        return axios.get('/search/hot/detail')
    }

    getSuggest(keyword) {
        return axios.get(`/search/suggest?keywords=${keyword}`)
    }

    /*
        @params(type) 类型
     */
    getSearch(keywords, type = 1, offset = 0, limit = 50) {
        return axios({
            method: 'GET',
            url: '/search',
            params: {
                keywords,
                offset,
                type,
                limit
            }
        })
    }
}