<template>
    <el-container>
        <!--顶部-->
        <el-header style="border-bottom: 1px solid gray;background-color: gray">
            <el-row style="margin: 10px 15px">
                <el-col :span="1">
                    <!--收缩条-->
                    <a href="#" @click="changeCollapse" style="font-size: 25px;color:#909399;"><i
                            :class="collpaseIcon"></i></a>
                </el-col>
                <el-col :span="2" style="float: right">
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link userinfo-inner" style="color: aqua"><i class="el-icon-user" style="color: aqua"></i> {{adminName}}</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>

        </el-header>
        <!--中央区域-->
            <el-container >
                <!--左侧导航栏-->
                <el-aside :style="{width:collpaseWidth}" >
                    <!--default-active代表导航栏默认选中哪个index, :collapse决定导航栏是否展开，为boolean类型
                    :router决定导航栏是否开启路由模式，即在菜单item上设置路由是否生效，值为boolean类型-->
                    <el-menu
                            default-active="0"
                            class="el-menu-vertical-demo"
                            :collapse="isCollapse"
                            :router="true"
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#ffd04b"

                    >
                        <!--index设置当前item的下标，:route则是传一个对象进行，指定路由-->

                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-user-solid"></i><span>员工管理</span>
                            </template>
                            <el-menu-item index="/employeeInformation" v-if="dep==1||dep==0" :route="{name:'员工信息'}">员工信息</el-menu-item>
                            <el-menu-item index="/adminDepEmployeeInformation" v-if="dep!=1&&dep!=0" :route="{name:'部门员工信息'}">部门员工信息</el-menu-item>
                            <el-menu-item index="/addEmployee" v-if="dep==1||dep==0" :route="{name:'添加员工'}">添加员工</el-menu-item>
                            <el-menu-item index="/recruitInformation" v-if="dep==1||dep==0" :route="{name:'招聘信息'}">招聘信息</el-menu-item>
                            <el-menu-item index="/addRecruit" v-if="dep==1||dep==0" :route="{name:'发布招聘信息'}">发布招聘</el-menu-item>
                            <el-menu-item index="/adminInterview" v-if="dep==1||dep==0" :route="{name:'面试信息'}">面试信息</el-menu-item>
                            <el-menu-item index="/adminDepInterview" v-if="dep!=1&&dep!=0" :route="{name:'部门面试信息'}">部门面试信息</el-menu-item>
                            <el-menu-item index="/adminAddInterView" v-if="dep==1||dep==0" :route="{name:'新增面试'}">新增面试</el-menu-item>
                            <el-menu-item index="/dimissionInformation" v-if="dep==1||dep==0" :route="{name:'离职信息'}">离职信息</el-menu-item>
                            <el-menu-item index="/depDimissionInformation" v-if="dep!=1&&dep!=0" :route="{name:'部门离职信息'}">部门离职信息</el-menu-item>
                        </el-submenu>
                        <el-submenu index="7" >
                            <template slot="title">
                                <i class="el-icon-user-solid"></i><span>合同管理</span>
                            </template>
                            <el-menu-item index="/contractInformation" v-if="dep==1||dep==0" :route="{name:'合同信息'}">合同模板</el-menu-item>
                            <el-menu-item index="/adminEmpContractHistory" v-if="dep==1||dep==0" :route="{name:'所有员工的合同历史'}">历史合同</el-menu-item>
                            <el-menu-item index="/adminDepEmpContractHistory"  v-if="dep!=1&&dep!=0" :route="{name:'部门员工合同历史'}">历史合同</el-menu-item>
                        </el-submenu>

                        <el-submenu index="2" v-if="dep==0">
                            <template slot="title">
                                <i class="el-icon-user-solid"></i>
                                <span> 部门管理</span>
                            </template>

                            <el-menu-item index="/departmentInformation" :route="{name:'部门信息'}"><i class="fa fa-address-card-o"></i>
                                部门信息
                            </el-menu-item>
                            <el-menu-item index="/addDepartment" :route="{name:'创建部门'}"><i class="fa fa-envelope-o"></i> 创建部门</el-menu-item>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-bank-card"></i>
                                <span> 薪资管理</span>
                            </template>

                            <el-menu-item index="/adminSalaryInformation"  v-if="dep==1||dep==0" :route="{name:'工资信息'}"><i class="fa fa-address-card-o"></i>
                                工资信息
                            </el-menu-item>
                            <el-menu-item index="/adminDepSalaryInformation"  v-if="dep!=1&&dep!=0" :route="{name:'部门工资信息'}"><i class="fa fa-address-card-o"></i>
                                工资信息
                            </el-menu-item>

                            <el-menu-item index="/adminLeaveInformation"  v-if="dep==1||dep==0" :route="{name:'请假信息'}"><i class="fa fa-envelope-o"></i> 考勤信息</el-menu-item>
<!--                            <el-menu-item index="2-2"><i class="fa fa-envelope-o"></i> 工资登记</el-menu-item>-->
                        </el-submenu>
                        <el-submenu index="4">
                            <template slot="title">
                                <i class="el-icon-bank-card"></i>
                                <span> 奖惩管理</span>
                            </template>

                            <el-menu-item index="/rewardAndPunishmentInformation" :route="{name:'奖惩信息'}"><i class="fa fa-address-card-o"></i>
                                奖励信息
                            </el-menu-item>
                            <el-menu-item index="/addRewardOrPunishment" :route="{name:'添加奖惩信息'}"><i class="fa fa-envelope-o"></i> 惩罚登记</el-menu-item>
                        </el-submenu>
                        <el-submenu index="5" v-if="dep==0">
                            <template slot="title">
                                <i class="el-icon-bank-card"></i>
                                <span> 效益管理</span>
                            </template>

                            <el-menu-item index="/adminBenefitInformation" :route="{name:'管理效益'}"><i class="fa fa-address-card-o"></i>
                                效益信息
                            </el-menu-item>
                        </el-submenu>
                        <el-submenu index="6" v-if="dep==1||dep==0">
                            <template slot="title">
                                <i class="el-icon-bank-card"></i>
                                <span> 晋升管理</span>
                            </template>

                            <el-menu-item index="/adminPromotionInformation" :route="{name:'adminPromotionInformation'}"><i class="fa fa-address-card-o"></i>
                                晋升信息
                            </el-menu-item>
                        </el-submenu>


                    </el-menu>

                </el-aside>
                <!--主内容显示区域-->
                <el-main>
                    <!--路由渲染-->
                    <router-view></router-view>
                </el-main>
            </el-container>
        <!--底部-->

    </el-container>
</template>

<script>
    // 这一大段JS就是为了做收缩/展开导航栏而用的！
    export default {
        name: "Main",
        data: function () {
            return {
                dep:'',
                adminName: sessionStorage.getItem('user'),
                isCollapse: false, // 决定左侧导航栏是否展开
            }
        },
        computed: {
            collpaseIcon: function () { // 左侧导航栏是否展开状态的图标
                // 如果是展开状态就图标向右，否则图标向左
                return this.isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold';
            },
            collpaseWidth: function () { // 左侧导航栏是否展开状态的宽度
                // 如果是展开状态就导航栏宽度为65px，否则200px
                return this.isCollapse ? '65px' : '200px';
            }
        },
        methods: {
            logout(){
                const _this=this
                console.log(sessionStorage.getItem('isLogin'));
                sessionStorage.clear();
                _this.$router.push("/")
                console.log(sessionStorage.getItem('isLogin'));
            },
            changeCollapse: function () { // 更改左侧导航栏展示状态
                this.isCollapse = !this.isCollapse;
            }
        },
        created() {
            this.dep=sessionStorage.getItem('dep')
        }
    }
</script>

<style >
    /*整体显示区域布局样式*/
    .el-container {
        height: 100%;
    }

    .el-header, .el-main {
        padding: 0;

    }


    /*左边导航栏具体样式*/
    .el-menu-vertical-demo.el-menu {
        padding-left: 0px;
        text-align: left;
        height: 100%;
        padding: 0;
    }

    el-container > .el-menu-vertical-demo.el-menu {
        padding: 0;
    }

    .el-submenu .el-menu-item, .el-menu-item {
        /*background-color: #303133;*/
        min-width: 50px;
    }

    .el-menu-item {
        padding: 0;
    }
</style>
