import request from "@/utils/request";

export default {
    getMemberList() {
        return request({
            url: "/study/member/list",
            method: "get"
        })
    },

    // 通过条件查询会员信息
    searchMember(page, size, searchMap) {
        return request({
            url: `/study/member/search/${page}/${size}`,
            method: "post",
            data: searchMap
        })
    },

    // 添加会员
    addMember(pojo) {
        return request({
            url: '/study/member/add',
            method: "post",
            data: pojo
        })
    },

    // 根据会员Id获取会员信息
    getMemberById(id) {
        return request({
            url: `/study/member/${id}`,
            method: "get"
        })
    },

    // 根据会员Id修改会员信息
    updateMemberById(pojo) {
        return request({
            url: `/study/member/${pojo.id}`,
            method: "put",
            data: pojo
        })
    }
}