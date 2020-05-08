<template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="本月工资" name="first"><div><el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="empNumber"
                    label="工号"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="bonus"
                    label="奖金">
            </el-table-column>
            <el-table-column
                    prop="forfeit"
                    label="罚金">
            </el-table-column>
            <el-table-column
                    prop="money"
                    label="基本工资">
            </el-table-column>
            <el-table-column
                    prop="gradeMoney"
                    label="绩效工资">
            </el-table-column>
            <el-table-column
                    prop="allMoney"
                    label="实发工资">
            </el-table-column>
        </el-table></div></el-tab-pane>
        <el-tab-pane label="全部信息" name="second">
            <div><el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="empNumber"
                        label="工号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="bonus"
                        label="奖金">
                </el-table-column>
                <el-table-column
                        prop="forfeit"
                        label="罚金">
                </el-table-column>
                <el-table-column
                        prop="money"
                        label="基本工资">
                </el-table-column>
                <el-table-column
                        prop="gradeMoney"
                        label="绩效工资">
                </el-table-column>
                <el-table-column
                        prop="allMoney"
                        label="实发工资">
                </el-table-column>
            </el-table></div>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "SalaryInformation",
        data() {
            return {
                activeName: 'first',
            tableData:[
                {
                    empNumber: '',
                    name: '',
                    bonus: '',
                    forfeit: '',
                    money: '',
                    gradeMoney: '',
                    allMoney: '',
                }
            ]
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            getMonthSalary(){
                const me=this
                axios.get('http://localhost:8181/getAllSalaryNow').then(function (resp) {
                    me.tableData=resp.data

                })
            },
        },
        created() {
            const me=this
            me.getMonthSalary();
        }
    }
</script>

<style scoped>

</style>
