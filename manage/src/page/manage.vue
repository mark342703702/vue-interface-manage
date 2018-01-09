<template>
  <div class="manage_page fillcontain">
		<el-container>
			<el-aside id="nav" width="285px">
				<el-menu :default-active="defaultActive" background-color="#324057" text-color="#fff" unique-opened router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>数据管理</template>
						<el-menu-item index="productList">商品列表</el-menu-item>
						<el-menu-item index="memberList">会员列表</el-menu-item>
						<el-menu-item index="foodList">食品列表</el-menu-item>
						<el-menu-item index="orderList">订单列表</el-menu-item>
						<el-menu-item index="adminList">管理员列表</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-plus"></i>添加数据</template>
						<el-menu-item index="addMember">添加会员</el-menu-item>
						<el-menu-item index="addProduct">添加商品</el-menu-item>
						<el-menu-item index="addAdmin">添加管理员</el-menu-item>
						<el-menu-item index="addGirl">添加职员</el-menu-item>
						<el-menu-item index="addShop">添加店铺</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title"><i class="el-icon-star-on"></i>图表</template>
						<el-menu-item index="visitor">用户分布</el-menu-item>
					</el-submenu>
					<el-submenu index="5">
						<template slot="title"><i class="el-icon-edit"></i>编辑</template>
						<el-menu-item index="editOrder">编辑订单</el-menu-item>
					</el-submenu>
					<el-submenu index="6">
						<template slot="title"><i class="el-icon-setting"></i>设置</template>
						<el-menu-item index="adminSet">管理员设置</el-menu-item>
					</el-submenu>
					<el-submenu index="7">
						<template slot="title"><i class="el-icon-warning"></i>说明</template>
						<el-menu-item index="explain">说明</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-main id="content">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-main>
		</el-container>
  </div>
</template>

<script>
export default {
    data (){
        return {
            defaultActive : 'manage'
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped type="text/css">
	#nav{
		position: fixed;
		height: 100%;
		.el-menu{
			height: 100%;
		}
	}

	#content{
		margin-left: 285px;
		height: 100%;
	}
</style>
