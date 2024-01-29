// src/utils/axios.js
import axios from 'axios'
import { Toast } from 'zarm'

const MODE = import.meta.env.MODE // 环境变量
// 判断当前代码运行在开发环境还是生产环境

// axios.defaults.baseURL = MODE == 'development' ? '/api' : 'http://api.chennick.wang'
axios.defaults.baseURL = MODE == 'development' ? '/api' : 'http://110.40.173.100:7009'

axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['Authorization'] = `${localStorage.getItem('token') || null}`
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use((config) => {
    return config;
});


axios.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
        Toast.fail('服务端异常！')
        return Promise.reject(res)
    }
    if (res.data.code != 200) {
        if (res.data.msg) Toast.show(res.data.msg)
        if (res.data.code == 401) {
            window.location.href = '/login'
        }
        return Promise.reject(res.data)
    }

    return res.data
})

export default axios
