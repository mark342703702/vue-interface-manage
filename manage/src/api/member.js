import axios from 'axios'

//获取会员数据
export const getAllMemberData = (currentPage = 1, pageSize = 10) => {
    return axios.get('/member/getMember', {
        params : {
            currentPage,
            pageSize
        }
    })
}

//增加会员
export const addMemberData = (data = {}) => {
    return axios.post('/member/addMember', data)
}

//获取会员数量
export const getMemberTotalData = () => {
    return axios.get('/member/getMemberCount')
} 

