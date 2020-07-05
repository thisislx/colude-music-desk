/* 处理落单api */
import axios from '../../config'

export default class {
    /* @params(type) 0:pc 1:android 2:iphone 3:ipad */
    getBanners(type = 0) {
        return axios.get(`/banner?type=${type}`)
    }

}