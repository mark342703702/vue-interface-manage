import axios from 'axios'

//添加订单
export const addOrderData = ( data = {} ) => {
    return axios.post('/order/addOrder', data)   
}

