import axios from 'axios'

const
    baseURL = '/api',
    // 创建axios实例
    axiosInstance = axios.create({
        //自动前缀
        baseURL
    });

//interceptors 在请求或响应被 then 或 catch 处理前拦截它们。
axiosInstance.interceptors.response.use(
    res => res.data,
    err => {
        console.log(err, 'axiousInstance(): 网络错误')
        return Promise.reject(err)
    }
)

export default axiosInstance 