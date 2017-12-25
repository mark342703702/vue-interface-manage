import axios from 'axios'

//获取会员数据
export const getAllMemberData = () => {
    return axios.get('/member/findMember')
}

//增加会员
export const addMemberData = (data = {}) => {
    return axios.post('/member/addMember', data)
}

