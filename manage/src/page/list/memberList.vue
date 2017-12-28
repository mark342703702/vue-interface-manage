<template>
  <div class="fillcontain">
    <div class="table_container">
        <el-table :data="tableData" border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="余额">
                        <span>{{ props.row.account }}</span>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <span>{{ props.row.create_time }}</span>
                    </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="member_name" label="会员姓名"></el-table-column>
            <el-table-column prop="points" label="积分"></el-table-column>
            <el-table-column prop="phone" label="电话"></el-table-column>
        </el-table>
    </div>
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
  </div>
  
</template>
<script>
import {getAllMemberData, getMemberTotalData} from '@/api/member'
export default {
    data (){
        return {
            tableData : [],
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
               const result = await getMemberTotalData()
               if(result.data.status === 0){
                   this.ProductDataTotal = result.data.count
               }
               this.getMember()
           }catch(err){
               console.log(err)
           }
           
        },

        async getMember() {
            let currentPage = this.currentPage
            let pageSize = this.pageSize
            try{
                const memberResult = await getAllMemberData(currentPage, pageSize)
                if(memberResult.data.status === 0){
                    this.tableData = memberResult.data.result
                }else{
                    throw new Error('获取数据失败')
                }
                
            }catch(err){
                this.$message({
                    type : 'error',
                    message : '获取数据失败'
                })
            }
        },

        handleSizeChange(val){
            this.pageSize = val
            this.getMember()
        },

        handleCurrentChange(val){
            this.currentPage = val
            this.getMember()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/css">

</style>
