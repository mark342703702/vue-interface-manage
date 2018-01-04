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
export const getProductData = (currentPage = 1, pageSize = 10) => {
    return axios.get('product/getProduct', {
        params : {
            currentPage,
            pageSize
        }
    })
}

//更新商品数据
export const updateProductData = ( data = {} ) => {
    return axios.post('product/updateProduct', data)
}

//删除商品
export const deleteProductData = ( data = {}) => {
    return axios.post('product/deleteProduct', data)
}

//获取商品总数量
export const getProductTotalData = () => {
    return axios.get('/product/getProductCount')
}

//模糊查询商品数据
export const getProductDataMisty = () => {
    return axios.get('/product/getProductMisty')
}