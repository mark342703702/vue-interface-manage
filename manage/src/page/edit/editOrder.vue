<template>
    <div class="orderBackground">
        <el-row>
            <el-col :span="24">
                 <div class="orderTitle">编辑订单</div>
            </el-col>
            <el-col :span="24">
                 <div class="orderListTable">
                    <el-table :data="orderTable" border class="orderTable">
                        <el-table-column type="index" align="center"></el-table-column>
                        <el-table-column prop="productId" label="商品编号" align="center"></el-table-column>
                        <el-table-column prop="colnumber" label="商品数量" sortable align="center"></el-table-column>
                        <el-table-column prop="sale_price" label="单价" sortable align="center"></el-table-column>
                        <el-table-column prop="colTotal" label="金额" sortable align="center"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                            <el-button size="mini" type="primary">查看</el-button>
                            <el-button size="mini" type="danger">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                 </div>
            </el-col>
            <el-col :span="24">
                 <div class="orderKeyboard">
                    <el-form :model="orderForm" ref="orderForm" :inline="true">
                        <el-form-item  prop="product_id" label="商品编号">
                            <el-input v-model="orderForm.product_id" placeholder="商品编号"
                             clearable suffix-icon="el-icon-edit-outline" >
                            </el-input>
                        </el-form-item>
                        <el-form-item  prop="colnumber" label="商品数量">
                            <el-input-number v-model="orderForm.colnumber" :min="1" :max="30">
                            </el-input-number>
                        </el-form-item>
                        <el-form-item prop="sale_price" label="单价">
                            <el-input v-model="orderForm.sale_price" placeholder="单价"
                             clearable suffix-icon="el-icon-edit-outline" >
                            </el-input>
                        </el-form-item>
                         <el-form-item prop="saler" label="销售员">
                            <el-select v-model="orderForm.saler" placeholder="请选择">
                                    <el-option-group v-for="group in salerOptions" :key="group.label" :label="group.label">
                                        <el-option
                                        v-for="item in group.options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-option-group>
                            </el-select>
                        </el-form-item> 
                    </el-form>
                 </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data () {
        return {
            orderForm : {
                product_id : '',
                colnumber : 1,
                sale_price : '',
                saler : ''
            },
            salerOptions : [
                {
                    label: '大店',
                    options: [{value: '5',label: '文'}, {value: '6',label: '梅'}]
                },
                {
                    label: '小店',
                    options: [{value: '10',label: '梁'}, {value: '4',label: '苏'}]
                }
                ],
            orderTable : [{
                productId : '123',
                colnumber : 12,
                sale_price : 1,
                colTotal : 12
            },
            {
                productId : '123',
                colnumber : 11,
                sale_price : 14,
                colTotal : 2
            }
            ]
        }
    }
 
}
</script>

<style lang="scss" scoped type="text/css">
    .orderBackground{
        padding: 20px;
		margin-bottom: 40px;
        background-color: #d3dce6;
        border-radius: 10px;

        .orderKeyboard{
            min-height: 80px;
            margin-top: 20px;
            background: #e5e9f2;
            border-radius: 10px;
            padding: 15px;

            .el-form-item{
                margin-right: 45px;
            }

        }

        .orderListTable{
            margin-top: 20px;
            min-height: 300px;
        }
        
        .orderTitle{
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 20px;
            color: #cf4646;
        }
    }
</style>