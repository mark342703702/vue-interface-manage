<template>
    <div class="orderBackground">
        <el-row>
            <el-col :span="24">
                <el-dialog
                    title="商品详情"
                    :visible.sync="dialogProduct"
                    width="60%">
                    <el-table :data="checkProductData" border>
                        <el-table-column prop="productId" label="商品编号" align="center"></el-table-column>
                        <el-table-column prop="product_name" label="商品名称" align="center"></el-table-column>
                        <el-table-column prop="sale_price" label="价格" align="center"></el-table-column>
                        <el-table-column prop="stock" label="库存" align="center"></el-table-column>
                        <el-table-column prop="shop.shop_name" label="所属店铺" align="center"></el-table-column>
                    </el-table>
                </el-dialog>
            </el-col>
            <el-col :span="24">
                 <div class="orderTitle">编辑订单</div>
            </el-col>
            <el-col :span="24">
                 <div class="orderListTable">
                    <el-table :data="orderTable" border class="orderTable" :row-style="isReturnProduct">
                        <el-table-column type="index" align="center"></el-table-column>
                        <el-table-column prop="productId" label="商品编号" align="center"></el-table-column>
                        <el-table-column prop="sale_price" label="单价" sortable align="center"></el-table-column>
                        <el-table-column prop="colnumber" label="商品数量" sortable align="center"></el-table-column>
                        <el-table-column prop="colTotal" label="金额" sortable align="center"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="checkProductMessage(scope.$index, scope.row)">查看</el-button>
                            <el-button size="mini" type="danger" @click="confirmDeleteProduct(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                 </div>
            </el-col>
            <el-col :span="24">
                 <div class="orderKeyboard">
                    <el-form :model="orderForm" ref="orderForm" label-width="80px" :rules="editOrderRules">
                        <el-row>
                            <el-col :span="24">
                                <el-form-item prop="productId" label="商品编号">
                                    <el-autocomplete
                                       v-model="orderForm.productId" 
                                       :fetch-suggestions="querySearchAsync"
                                       placeholder="请输入商品编号"
                                       @select="productSelect"
                                       autofocus
                                       style="width: 100%;"
                                       :trigger-on-focus="false"
                                    ></el-autocomplete>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item prop="sale_price" label="单价">
                                    <el-input v-model="orderForm.sale_price" placeholder="单价"
                                    clearable suffix-icon="el-icon-edit-outline" >
                                    </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item  prop="isReturn" label="售退货">
                                    <el-radio v-model="orderForm.isReturn" label="sold">出售</el-radio>
                                    <el-radio v-model="orderForm.isReturn" label="back">退货</el-radio>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item  prop="colnumber" label="商品数量">
                                    <el-input-number v-model="orderForm.colnumber" :min="1" :max="30">
                                    </el-input-number>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item prop="nowDate" label="日期">
                                    <el-date-picker
                                    v-model="nowDate"
                                    type="date"
                                    align="left"
                                    :picker-options="pickerOptions"
                                    :editable="false"
                                    placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="18">
                                <el-form-item>
                                    <el-button type="primary" class="addOrderTableBtn" @click="checkOrderFormData('orderForm')">添加</el-button>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item prop="saler" label="销售员">
                                    <el-select v-model="saler" placeholder="请选择">
                                        <el-option
                                        v-for="item in salerOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        <span style="float: left">{{ item.label }}</span>
                                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                 </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getGirlData }  from '@/api/admin' 
import { getProductDataMisty } from '@/api/product'
export default {
    data () {
        return {

            //当前输入商品信息
            orderForm : {
                productId : '',
                colnumber : 1,
                sale_price : '',
                isReturn : 'sold',
                detail : {}
            },

            //校验规则
            editOrderRules : {
                productId : [

                    { required: true, message: '请输入商品编号', trigger: 'blur' }

                ],
                sale_price : [

                    { required: true, message: '请输入商品价格', trigger: 'blur'}

                ]
            },

            //经手人
            saler : '5',

            //当前时间
            nowDate :new Date(),

            //是否显示详细商品信息
            dialogProduct : false,

            //当前查看商品详情信息
            checkProductData : [],

            //select选择器职员信息数据
            salerOptions : [],

            //订单列表数据
            orderTable : [],

            //设置时间选择器快捷键
            pickerOptions : {

                disabledDate(time) {
                    return time.getTime() > Date.now();
                },

                shortcuts : [
                    {
                        text : '今天',
                        onClick(picker) {
                             picker.$emit('pick', new Date());
                        }
                    },
                    {
                        text : '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }
                ]
            }

        }
    },

    created(){
        this.initData()
    },

    methods : {

        //查看商品详细信息
        checkProductMessage(index, row){
            this.dialogProduct = true
            this.checkProductData = []
            this.checkProductData.push(row.detail)
        },

        //模糊查询
        async querySearchAsync(queryString, cb){
            if(queryString){
                try{
                    const productResult = await getProductDataMisty(queryString)
                    if(productResult.data.status === 0){
                        let productArray = productResult.data.result
                        if(productArray instanceof Array){
                            productArray.map(item => {
                                item.value = item.productId
                                return item
                            })
                            cb(productArray)
                        }else{
                            throw new Error(productResult.data.message)
                        }
                    }else{
                        throw new Error(productResult.data.message)
                    }
                }catch(err){
                    console.log('获取商品数据失败', err)
                }
            }
        },

        //模糊查找后选择商品
        productSelect(product){
            this.orderForm.detail = product
            this.orderForm.productId = product.productId
            this.orderForm.sale_price = product.sale_price
        },

        //初始化数据
        async initData(){

            try{
                let girlResult = await getGirlData()
                if(girlResult.data.status === 0){
                    for(let item of girlResult.data.result){
                        var addNew = {}
                        addNew.value = item.girlId
                        addNew.label = item.girl_name
                        this.salerOptions.push(addNew)
                    }
                }else{
                    throw new Error(girlResult.data.message)
                }
            }catch(err){
                console.log('获取职员数据失败', err)
            }
            
            
        },



        confirmDeleteProduct (index, row){
              this.$confirm('此操作将从订单列表删除该商品信息,是否继续', '提示', {
                    confirmButtonText : '确定',
                    cancelButtonText : '取消',
                    type : 'warning'
                }).then( () => {

                    this.orderTable.splice(index,1)
                    this.$notify({
                            type : 'success',
                            message : '删除成功'
                    })

                }).catch( () => {
                     this.$notify({
                     type: 'info',
                     message: '已取消删除'
                  });          
                })
        },

        isReturnProduct ({row, rowIndex}){
            if(row.isReturn === 'back'){
                return { color : '#cf4646', fontWeight : 'bold'}
            }else if(row.isReturn === 'sold'){
                return { color : '#409EFA', fontWeight : 'bold'}
            }
        },

        //添加相同商品,重新计算该商品数量,商品总价
        reCalcNum(rowProductId, rowColNumber, rowIsReturn){
            for(let itemProduct of this.orderTable){
                if(itemProduct.productId === rowProductId && itemProduct.isReturn === rowIsReturn){
                    itemProduct.colnumber += rowColNumber

                    if(rowIsReturn === 'back'){
                        itemProduct.colTotal = -itemProduct.colnumber * itemProduct.sale_price
                    }else{
                        itemProduct.colTotal = itemProduct.colnumber * itemProduct.sale_price
                    }

                    return true
                }
            }
            return false
        },

        //检查输入商品信息是否完整并提交
        checkOrderFormData(formName){
            this.$refs[formName].validate( valid => {
                if(valid){
                    this.addDataToOrderTable()
                    this.$notify({
                        title : '成功',
                        message : '商品添加到订单列表成功',
                        type : 'success'
                    })
                    this.$refs[formName].resetFields()
                    this.orderForm.detail = {}
                }else{
                    this.$notify({
                        title : '错误',
                        message : '商品添加到订单列表失败',
                        type : 'error'
                    })
                }
            })
        },

        //添加商品到订单列表中
        addDataToOrderTable(){

            let params = {
                productId : this.orderForm.productId,
                colnumber : this.orderForm.colnumber,
                sale_price : this.orderForm.sale_price,
                isReturn : this.orderForm.isReturn,
                colTotal : this.orderForm.colnumber * this.orderForm.sale_price,
                detail : this.orderForm.detail
            }

            //检查是否为退货,若是,则设置总价为负值
            if(params.isReturn == 'back'){
                params.colTotal = -params.colTotal
            }

            let reCalcMark = this.reCalcNum(params.productId, params.colnumber, params.isReturn)
            if(!reCalcMark){
                this.orderTable.push(params)
            }
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

            .addOrderTableBtn{
                width: 100%;
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