<template>
    <div class="form_container">
        <el-row>
            <el-col :span="8" :offset="8" ><div class="Header">系统设置</div></el-col>
        </el-row>
        <el-row>
            <el-col :sm="{span : 20, offset : 2}" :md="{span : 16, offset : 4}" :lg="{span : 10, offset : 7}">
                <el-form>
                    <el-form-item label="当前店铺" label-width="80px">
                        <el-select v-model="shop" value-key="shopId">
                            <el-option
                            v-for="item in ShopOptions"
                            :key="item.shopId"
                            :label="item.shop_name"
                            :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
           </el-col>
        </el-row>
    </div>
</template>

<script>
import { getShopData } from '@/api/shop'
import { mapState, mapMutations } from 'Vuex'

export default {

    data(){
        return {

            //店铺数据
            ShopOptions : [],

            //设置当前店铺
            shop : ''
        }
    },  

    created(){
        this.initData()
        this.shop = this.current_shop
    },

    computed : {
        ...mapState(['current_shop'])
    },

    methods : {

      async initData(){
        try{
                let fields = {shopId : 1, shop_name : 1, _id : 0}
                let shopResult = await getShopData({},fields)
                if(shopResult.data.status === 0){
                    this.ShopOptions = shopResult.data.result
                }else{
                    throw new Error('获取店铺数据失败')
                }

            }catch(err){
                this.$message({
                    type : 'error',
                    message : '获取店铺数据失败'
                })
            }

        }

    }

}

</script>

<style lang="scss" type="text/css">
    @import '../style/common';

</style>
