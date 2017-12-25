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
                    layout="prev, pager, next"
                    :total="50">
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
                 <el-input v-model="selectForm.stock" clearable suffix-icon="el-icon-edit"></el-input>
            </el-form-item>
            <el-form-item label="售价" prop="sale_price">
                 <el-input :disabled="true" v-model="selectForm.sale_price"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="selectCategoryOption">
                        <el-cascader
                            :options="categoryOptions"
                            size="medium"
                            expand-trigger="hover"
                            v-model="selectForm.selectCategoryOption">
                        </el-cascader>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
    </div>
  </div>
</template>

<script>
import {getProductData, getCategoryData} from '@/api/product'
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
            }
        }
    },

   created(){
        this.initData()
    },

    methods : {

            handleDelete(index, row) {
                console.log(index, row);
            },

            async initData(){
                this.getProduct()
                this.getCategory()
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
                    const result = await getProductData()
                    if(result.data.status === 0){
                        this.tableData = result.data.result
                    }else{
                        this.$message({
                            type : 'error',
                            message : result.data.message
                        })
                    }
            },


            seasonToCode (val){
                let season_name = ''
                switch(val){
                    case '春季' :
                    season_name = 'spring'
                    break

                    case '夏季' :
                    season_name = 'summer'
                    break

                    case '秋季' :
                    season_name = 'autumn'
                    break

                    case '冬季' :
                    season_name = 'winter'
                    break

                    default : 
                        season_name = '字段错误'
                }
                return season_name
            },

            handleEdit(index, row){
                this.selectForm.productId = row.productId
                this.selectForm.product_name = row.product_name
                this.selectForm.stock = row.stock
                this.selectForm.sale_price = row.sale_price
                this.selectForm.selectCategoryOption[0] = row.shop.shopId
                this.selectForm.selectCategoryOption[1] = row.year
                this.selectForm.selectCategoryOption[2] = this.seasonToCode(row.season)
                this.selectForm.selectCategoryOption[3] = row.style
                this.dialogVisible = true;
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
