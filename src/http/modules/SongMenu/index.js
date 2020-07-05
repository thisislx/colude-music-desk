import axios from '../../config'

export default class {
    // 获取用户的歌单（收藏 或者 创建）
    getUserMenu(uid) {
        return axios({
            url: '/user/playlist',
            method: 'GET',
            params: { uid },
        })
    }

    /* parame1 歌单id */
    getMenuDetail(id) {
        return axios({
            url: '/playlist/detail',
            method: 'GET',
            params: { id }
        })
    }

    // 推荐歌单 需要登录
    getRecommendMenu() {
        return axios.get('/recommend/resource')
    }

    // 每日推荐 需要登录
    getRecommendSongs() {
        return axios.get('/recommend/songs')
    }


    /* 标签获取
        @params(params)
             @value{
                    cat: @default(全部) getTag()获取标签
                    limit  取出数量
                    before   上一页歌单最后的一条的updateTime || lasttime
             }
    */
    getClassMenu(params) {
        return axios({
            url: '/top/playlist/highquality',
            params,
        })
    }

    // 得到标签
    getTag() {
        return axios({
            url: '/playlist/catlist',
            method: 'GET'
        })
    }
}