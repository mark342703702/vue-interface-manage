import axios from 'axios'

//增加管理员
export const addAdminData = (data = {}) => {
    return axios.post('/admin/addAdmin', data)
}

//增加职员
export const addGirlData = (data = {}) => {
    return axios.post('/admin/girl/addGirl', data)
}