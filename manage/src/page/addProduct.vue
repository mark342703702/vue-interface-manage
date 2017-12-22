<template>
    <div class="form_container">
        <el-row>
            <el-col :span="8" :offset="8" ><div class="addMemberHeader">添加商品</div></el-col>
        </el-row>
        <el-row>
            <el-col :sm="{span : 20, offset : 2}" :md="{span : 16, offset : 4}" :lg="{span : 10, offset : 7}">
                <el-form :model="addProductForm"  :rules="addProductRules" status-icon ref="ProductForm">
                    <el-form-item prop="product_name" label="商品名称">
                        <el-input v-model="addProductForm.product_name" placeholder="商品名称"></el-input>
                    </el-form-item>
                    <el-form-item prop="productId" label="商品编号">
                        <el-input v-model="addProductForm.productId" placeholder="商品编号"></el-input>
                    </el-form-item>
                    <el-form-item prop="buyin_price" label="商品进价">
                        <el-input v-model="addProductForm.buyin_price" placeholder="商品进价"></el-input>
                    </el-form-item>
                    <el-form-item prop="stock" label="商品库存">
                        <el-input-number v-model="addProductForm.stock" :min="1" :max="100"></el-input-number>
                    </el-form-item>
                    <el-form-item label="商品分类" prop="selectCategoryOption">
                        <el-cascader
                            :options="categoryOptions"
                            expand-trigger="hover"
                            v-model="addProductForm.selectCategoryOption">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" class="submit_btn" @click="addProduct('ProductForm')">添加店铺</el-button>
                    </el-form-item> 
                </el-form>
           </el-col>
        </el-row>
    </div>
</template>

<script>
import {getCategoryData} from '@/api/product'
export default { 
    data (){
        return {
            categoryOptions : [],
            asd : 'asd',
            addProductForm : {
                product_name : '',
                productId : '',
                stock : '',
                buyin_price : '',
                selectCategoryOption : []
            },

            addProductRules : {
                product_name : 
                    [
                        { required: true, message: '请输入商品名称', trigger: 'blur' },
                    ],
                productId : 
                    [
                        {required: true, message: '请输入商品编号', trigger: 'blur'}
                    ],
                stock : 
                    [
                        {required: true, message: '请输入商品库存', trigger: 'blur'}
                    ],
                buyin_price : 
                    [
                        {required: true, message: '请输入商品进价', trigger: 'blur'}
                    ],
                selectCategoryOption :
                    [
                        {required: true, message: '请选择商品分类', trigger: 'blur'}
                    ]
            }
        }
    },
    
    created(){
        this.initData()
    },

    methods : {
           async addProduct(formName) {
            this.$refs[formName].validate( async (valid) => {
                if (valid) {
                    let category = this.addProductForm.selectCategoryOption
                    const params = {
                        product_name : this.addProductForm.product_name,
                        productId : this.addProductForm.productId,
                        stock : this.addProductForm.stock,
                        buyin_price : this.addProductForm.buyin_price,
                        shopId : category[0],
                        year : category[1],
                        season : category[2],
                        style : category[3]

                    }

                    console.log(params)

                    // let result = await addShopData(params)
                    
                    // if(result.data.status === 0){
                    //     this.$message({
                    //         type : 'success',
                    //         message : result.data.message
                    //     })
                    //     this.$refs[formName].resetFields()
                    // }else{
                    //     this.$message({
                    //         type : 'error',
                    //         message : result.data.message
                    //     })
                    // }
                    
                } else {
                    this.$notify({
                        type : 'error',
                        message : '请输入完整信息',
                        duration : 1500,
                        showClose : false
                    })
                    return false;
                }
            });
        },

        async initData(){
            try{
               let categoryResult = await getCategoryData()
               categoryResult.data.result.forEach(shop => {
                           var addnew = {
    							value: shop.shopId,
						        label: shop.shop_name,
						        children: []
                            }
                    shop.year_name.forEach((year,yearIndex) => {
                        addnew.children.push({
    							value: year.year_number,
                                label: year.year_number,
                                children : []
                        })

                        year.sub_category.forEach((season, subIndex) => {
                           addnew.children[yearIndex].children.push({
    							value: season.season_code,
                                label: season.season_name,
                                children : []
                           })

                           season.style.forEach( style => {
                               addnew.children[yearIndex].children[subIndex].children.push({
                                    value: style.style_code,
                                    label: style.style_name
                               })
                           })

                        })

                    })
                    this.categoryOptions.push(addnew)
               })

            }catch(err){
                 this.$message({
                    type : 'error',
                    message : '获取数据失败'
                })
            }
        }
    }
}
</script>
<style lang="scss"  type="text/css">

</style>
