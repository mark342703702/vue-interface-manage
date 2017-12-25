import axios from 'axios'

//获取分类数据
export const getCategoryData = () => {
    return axios.get('/product/getCategory')
}

//添加商品数据
export const addProductData = ( data = {}) => {
    return axios.post('/product/addProduct', data)
}

//获取商品数据
export const getProductData = () => {
    return axios.get('product/getProduct')
}
