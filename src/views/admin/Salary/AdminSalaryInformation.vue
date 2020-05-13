<template>
    <el-tabs v-model="activeName"  @tab-click="handleClick">
        <el-tab-pane label="上月工资" name="first">
            <div><el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="empNumber"
                    label="工号"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="departmentName"
                    label="部门"
                    :filters=departmentFilter
                    :filter-method="filterTag"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="positionName"
                    label="职位"
                    :filters="[{text:'主管',value:'主管'},{text:'组长',value:'组长'},{text:'员工',value:'员工'}]"
                    :filter-method="filterPos"
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
                        prop="payDateStr"
                        label="日期"
                        sortable
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="empNumber"
                        label="工号"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="departmentName"
                        label="部门"
                        :filters=departmentFilter
                        :filter-method="filterTag"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="positionName"
                        label="职位"
                        :filters="[{text:'主管',value:'主管'},{text:'组长',value:'组长'},{text:'员工',value:'员工'}]"
                        :filter-method="filterPos"
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
                    departmentName: '',
                    positionName: '',
                    payDateStr: ''
                }
            ],
                departmentFilter:[
                    {
                        text: '',
                        value: ''
                    }
                ],
            };
        },
        methods: {
            getDepartment(){
                const dep=this
                axios.get('http://localhost:8181/getAllDepartment').then(function (resp) {
                    dep.departmentForm=resp.data
                    dep.departmentFilter=resp.data
                    console.log(dep.departmentFilter)
                })
            },
            handleClick(tab, event) {
                const me=this
                if (tab.name=='first'){
                    me.getMonthSalary()
                }else {
                    me.getAllSalary()
                }
            },
            filterPos(value, row) {
                return row.positionName === value;
            },
            filterTag(value, row) {
                return row.departmentName === value;
            },
            getMonthSalary(){
                const me=this
                axios.get('http://localhost:8181/getAllSalaryNow').then(function (resp) {
                    console.log(resp)
                    me.tableData=resp.data
                })
            },
            getAllSalary(){
                const me=this
                axios.get('http://localhost:8181/getAllSalary').then(function (resp) {
                    console.log(resp)
                    me.tableData=resp.data
                })
            },
        },
        created() {
            const me=this
            me.getDepartment();
            me.getMonthSalary();
        }
    }
</script>

<style scoped>

</style>
