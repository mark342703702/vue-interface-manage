import axios from 'axios'

//添加店铺
export const addShopData = (data = {}) => {
    return axios.post('/shop/addShop', data)
}

//获取店铺数据
export const getShopData = (conditions = {}, fields = {}, options = {}) => {
    return axios.get('/shop/getShop', {
        params : {
            conditions,
            fields,
            options
        }
    })
}
