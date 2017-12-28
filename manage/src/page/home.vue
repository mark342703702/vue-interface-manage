<template>
  <div>
      <section class="data_section">
        <header class="section_title">当日数据</header>
        <el-row :gutter="20" style="margin-bottom: 10px;">
            <el-col :span="4"><div class="data_list"><span class="data_num">{{orderCount}}</span>订单数</div></el-col>
            <el-col :span="4"><div class="data_list"><span class="data_num">{{moneyCount}}</span>总金额</div></el-col>
            <el-col :span="4"><div class="data_list"><span class="data_num">{{memberCount}}</span>新增会员</div></el-col>
        </el-row>
      </section>
  </div>
</template>

<script>
export default {
    data (){
        return {
            orderCount : 0,
            moneyCount : 0,
            memberCount : 0
        }
    }
}
</script>

<style lang="scss" scoped type="text/css">
    .data_section{

        padding: 20px;
		margin-bottom: 40px;

        .section_title{
            color: #cf4646;
            text-align: center;
			font-size: 25px;
			margin-bottom: 10px;
        }

        .data_list{
            border-radius: 4px;
            min-height: 36px;
            background: #e5e9f2;
            line-height: 36px;
            text-align: center;

            .data_num{
                font-size: 20px;
                color: #cf4646;
                margin-right: 10px;
            }
        }

    }
</style>