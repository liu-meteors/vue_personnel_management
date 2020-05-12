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
                            <el-dropdown-item divided @click.native="getInformation">查看信息</el-dropdown-item>
                            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
<!--                    <el-dropdown>-->
<!--                        <i class="el-icon-setting" style="margin-right: 15px"></i>-->
<!--                        <el-dropdown-menu slot="dropdown">-->
<!--                            <el-dropdown-item><span  @click="getInformation">查看信息</span></el-dropdown-item>-->
<!--                            <el-dropdown-item><el-button-->
<!--                                    size="mini"-->
<!--                                    @click="logout">查看详情</el-button></el-dropdown-item>-->
<!--                        </el-dropdown-menu>-->
<!--                        <span>{{adminName}}</span>-->
<!--                    </el-dropdown>-->
                </el-col>
            </el-row>

        </el-header>
        <!--中央区域-->
        <el-container>
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
                    <el-menu-item :hidden="true" index="0" :route="{name:'登录'}">
                        <i class="el-icon-house"></i>
                        <span slot="title"> 首页</span>
                    </el-menu-item>
                    <el-menu-item index="/salaryInformation" :route="{name:'empSalaryInformation'}"><i class="el-icon-bank-card"></i>
                        工资信息
                    </el-menu-item>
                    <el-menu-item index="/empRecruitInformation" :route="{name:'员工招聘信息'}"><i class="el-icon-bank-card"></i>
                        招聘信息
                    </el-menu-item>
                    <el-menu-item index="/empInterview" :route="{name:'员工面试信息'}"><i class="el-icon-bank-card"></i>
                        面试信息
                    </el-menu-item>
                    <el-menu-item index="/empAddInterView" :route="{name:'添加面试信息'}"><i class="el-icon-bank-card"></i>
                        新增面试
                    </el-menu-item>
                    <el-menu-item index="/empRewardAndPunishmentInformation" :route="{name:'empRewardAndPunishmentInformation'}"><i class="el-icon-bank-card"></i>
                        奖惩信息
                    </el-menu-item>
                    <el-menu-item index="/empLeaveApply" :route="{name:'empLeaveApply'}"><i class="el-icon-bank-card"></i>
                        请假申请
                    </el-menu-item>
                    <el-menu-item v-if="dep==1||pos==1" index="/empLeaveCheck" :route="{name:'empLeaveCheck'}"><i class="el-icon-bank-card"></i>
                        请假审批
                    </el-menu-item>
                    <el-menu-item  index="/empAllLeave" :route="{name:'请假审批进程'}"><i class="el-icon-bank-card"></i>
                        查看请假
                    </el-menu-item>
                    <el-menu-item index="/gradeInformation" :route="{name:'gradeInformation'}"><i class="el-icon-bank-card"></i>
                        绩效打分
                    </el-menu-item>
                    <el-menu-item index="/empPromotionInformation" :route="{name:'empPromotionInformation'}"><i class="el-icon-bank-card"></i>
                        晋升信息
                    </el-menu-item>
                    <el-menu-item index="/empBenefitInformation" :route="{name:'效益信息'}"><i class="el-icon-bank-card"></i>
                        效益信息
                    </el-menu-item>



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
                pos:'',
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
                return this.isCollapse ? '48px' : '200px';
            }
        },
        methods: {
            logout(){
                const _this=this
                console.log(sessionStorage.getItem('isLogin'));
                sessionStorage.clear();
                _this.$router.push("/login")
                console.log(sessionStorage.getItem('isLogin'));

            },
            getInformation(){
                this.$router.push("/empInformation")
            },
            changeCollapse: function () { // 更改左侧导航栏展示状态
                this.isCollapse = !this.isCollapse;
            }
        },
        created() {
            this.dep=sessionStorage.getItem('dep');
            this.pos=sessionStorage.getItem('pos');
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
