import axios from '../../config'

export default {
    // 用户详细信息
    getDetail(uid) {
        return axios({
            url: '/user/detail',
            method: 'GET',
            params: {
                uid
            }
        })
    },

    // 签到
    signIn() {
        return Promise.all(
            [...Array(2)].map((item, index) => axios({
                url: '/daily_signin',
                method: 'GET',
                params: {
                    type: index
                }
            }))
        )
    },

    toggleFollowUser(uid, followed) {
        return axios({
            url: '/follow',
            method: 'GET',
            params: {
                id: uid,
                t: followed ? 0 : 1
            }
        })
    }
}

