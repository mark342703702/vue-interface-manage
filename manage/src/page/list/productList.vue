<template>
  <div class="fillcontain">
    <div class="table_container">
        <el-table :data="tableData" border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="所属店铺">
                        <span>{{ props.row.shop.shop_name}}</span>
                    </el-form-item>
                    <el-form-item label="所属年份">
                        <span>{{ props.row.year }}</span>
                    </el-form-item>
                    <el-form-item label="所属季节">
                        <span>{{ props.row.season }}</span>
                    </el-form-item>
                    <el-form-item label="所属类型">
                        <span>{{ props.row.style }}</span>
                    </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="product_name" label="商品名称" ></el-table-column>
            <el-table-column prop="productId" label="商品编号" ></el-table-column>
            <el-table-column prop="stock" label="商品库存" sortable></el-table-column>
            <el-table-column prop="sale_price" label="售价" sortable></el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <div class="Pagination">
                 <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    background
                    layout="prev, pager, next, jumper, total, sizes"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pageSize"
                    :total="ProductDataTotal">
                </el-pagination>
        </div>
        <el-dialog
        title="修改商品信息"
        :visible.sync="dialogVisible"
        width="40%">
        <el-form :model="selectForm" label-width="80px" >
            <el-form-item label="商品编号" prop="productId">
                 <el-input v-model="selectForm.productId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="商品名称" prop="product_name">
                 <el-input v-model="selectForm.product_name" clearable  suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="商品库存" prop="stock">
                 <el-input-number v-model="selectForm.stock" :min="1" :max="100" clearable></el-input-number>
            </el-form-item>
            <el-form-item label="售价" prop="sale_price">
                 <el-input :disabled="true" v-model="selectForm.sale_price"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="selectCategoryOption">
                        <el-cascader
                            :options="categoryOptions"
                            size="medium"
                            v-model="selectForm.selectCategoryOption">
                        </el-cascader>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateProduct">确 定</el-button>
        </span>
        </el-dialog>
    </div>
  </div>
</template>

<script>
import {getProductData, getCategoryData, updateProductData, deleteProductData, getProductTotalData} from '@/api/product'
import {seasonToCode} from '@/utils/index'
export default {
    data (){
        return {
            dialogVisible : false,
            tableData : [],
            categoryOptions : [],
            selectForm : {
                productId : '',
                product_name : '',
                stock : '',
                sale_price : '',
                selectCategoryOption : []
            },
            deleteForm : {
                productId : ''
            },
            currentPage : 1,
            ProductDataTotal : 0,
            pageSize : 10
        }
    },

   created(){
        this.initData()
    },

    methods : {
            async initData(){
                try{
                     const result = await getProductTotalData()
                     if(result.data.status === 0){
                        this.ProductDataTotal = result.data.count
                     }
                    this.getProduct()
                    this.getCategory()
                }catch(err){
                    console.log(err)
                }
                
            },

            async getCategory() {
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

            },

            async getProduct(){
                    let currentPage = this.currentPage
                    let pageSize = this.pageSize
                    const result = await getProductData(currentPage, pageSize)
                    if(result.data.status === 0){
                        this.tableData = result.data.result
                    }else{
                        this.$message({
                            type : 'error',
                            message : result.data.message
                        })
                    }
            },

            //打开更新商品信息框
            handleEdit(index, row){
                this.selectForm.productId = row.productId
                this.selectForm.product_name = row.product_name
                this.selectForm.stock = row.stock
                this.selectForm.sale_price = row.sale_price
                this.selectForm.selectCategoryOption = [row.shop.shopId, row.year, seasonToCode(row.season), row.style]
                this.dialogVisible = true;
            },

            //删除商品
            async handleDelete(index, row) {
                this.deleteForm.productId = row.productId
                let params = {
                    productId : this.deleteForm.productId
                }
                let result = await deleteProductData(params)
                if(result.data.status === 0){
                        this.$message({
                            type : 'success',
                            message : result.data.message
                        })
                }else{
                        this.$message({
                            type : 'error',
                            message : result.data.message
                        })
                }
            },
            
            //更新商品信息
            async updateProduct(){
                let params = {
                    productId : this.selectForm.productId,
                    product_name : this.selectForm.product_name,
                    stock : this.selectForm.stock,
                    category : this.selectForm.selectCategoryOption
                }
                let result = await updateProductData(params)
                if(result.data.status === 0){
                        this.$message({
                            type : 'success',
                            message : result.data.message
                        })
                }else{
                        this.$message({
                            type : 'error',
                            message : result.data.message
                        })
                }
                this.dialogVisible = false;
            },

            handleSizeChange(val){
                this.pageSize = val
                this.getProduct()
            },

            handleCurrentChange(val){
                this.currentPage = val
                this.getProduct()
            }
    }
}
</script>


<style lang="scss" type="text/css">
    .table_container{
        padding: 20px;

        .el-table{
            width: 100%;
        }

        .demo-table-expand {
            font-size: 0;
        }

        .demo-table-expand .el-form-item {
            margin-right: 0;
            margin-bottom: 0;
            width: 50%;
        }

        .demo-table-expand label{
            width: 90px;
            color: #cf4646;
            font-weight: bold;
        }

        .Pagination{
            display: flex;
            justify-content: flex-start;
            margin-top: 8px;
        }
    }
</style>
