import axios from '../../config'

export default {
    // 是否登录
    isLogin() {
        return axios.get('/login/status')
    },
    // 手机号码登录
    cellphoneLogin(phone, password) {
        return axios({
            url: '/login/cellphone',
            method: 'POST',
            data: {
                phone,
                password
            },
            withCredentials: true
        })
    },
    // 网易邮箱登录
    emailLogin(email, password) {
        return axios({
            url: '/login',
            method: 'POST',
            data: {
                email,
                password
            },
            withCredentials: true
        })
    },
    // 发送验证码
    sendCaptcha(phone) {
        return axios({
            url: '/captcha/sent',
            method: 'POST',
            data: {
                phone
            }
        })
    },
    // 验证码登录
    captchaVerify(phone, captcha) {
        return axios({
            url: '/captcha/verify',
            method: 'POST',
            data: {
                phone,
                captcha
            }
        })
    },
    // 登出
    logout() {
        return axios.get('/logout')
    }
}