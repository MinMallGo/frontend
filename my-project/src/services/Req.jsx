// src/utils/axiosInstance.js
import axios from 'axios';
import {ApiStatus, BaseUri, ReqTimeout} from "./Public.jsx";

// 创建 axios 实例
const axiosInstance = axios.create({
    baseURL: BaseUri, // 你自己的 API 地址
    timeout: ReqTimeout, // 请求超时时间
    headers: {
        'Content-Type': 'application/json',
        'token':'aaxpllwjecrphlutsfkqztdhqjah'
    },
});

// 请求拦截器：可以在请求发出前处理请求，比如添加 token 等
axiosInstance.interceptors.request.use(
    (config) => {
        // 假设你需要添加授权 token
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
          config.headers['Token'] = `${token}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); // 请求错误时返回错误
    }
);

// 响应拦截器：可以在响应返回时进行处理
axiosInstance.interceptors.response.use(
    (response) => {
        if(response.status !== ApiStatus.success.code){
            switch (response.status) {
                case ApiStatus.error.code:
                    console.error(response.message)
                    break
                case ApiStatus.userLogin.code:
                    console.error(response.message)
                    window.location.href = ApiStatus.userLogin.page
                    break
                case ApiStatus.adminLogin.code:
                    console.error(response.message)
                    window.location.href = ApiStatus.adminLogin.page
                    break
            }
        }
        return Promise.resolve(response.data); // 只返回数据部分
    },
    (error) => {
        // 在响应出错时处理错误（例如 401 或 500 错误）
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 处理授权错误，比如跳转到登录页面
                    window.location.href = "/userLogin"
                    console.error('授权错误，未登录');
                    break;
                case 403:
                    // 处理授权错误，比如跳转到登录页面
                    window.location.href = "/adminLogin"
                    console.error('授权错误，未登录');
                    break;
                case 500:
                    // 处理服务器错误
                    console.error('服务器错误，请稍后再试');
                    break;
                default:
                    console.error('请求出错:', error.response);
                    break;
            }
        } else {
            console.error('网络错误或请求超时');
        }
        return Promise.reject(error); // 抛出错误
    }
);

export const postData = async (endpoint, data) => {
    try {
        // 发送 POST 请求
        return axiosInstance.post(endpoint, data); // 请求成功时返回数据
    } catch (error) {
        // 处理错误时抛出异常
        console.error('POST 请求失败:', error);
        throw error; // 将错误抛出以便调用者捕获
    }
};
