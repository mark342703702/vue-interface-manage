import axios from 'axios'

//获取分类数据
export const getCategoryData = () => {
    return axios.get('/product/getCategory')
}
