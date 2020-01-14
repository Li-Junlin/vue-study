import request from "@/utils/request";

export function login(username, password) {
    return request({
        url: "/study/login",
        method: "post",
        data: {
            username,
            password
        }
    })
};

export function getUserInfo(token) {
    return request({
        url: `/study/user/info/${token}`,
        method: 'get'
    })
};

// 访问登出接口
export function logout(token) {
    return request({
        url: "/study/logout",
        method: "post",
        data: {
            token
        }
    })
};