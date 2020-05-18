<template>
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
</template>

<script>
    export default {
        data() {
            return {
                tableData: [{
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
                }],
            };
        },
        methods:{

            getAllSalary(){
                const me=this
                const empId=sessionStorage.getItem("empId")
                axios.get('http://localhost:8181/getAllSalaryByEmpId/'+empId).then(function (resp) {
                    me.tableData=resp.data
                    console.log(resp)
                })
            },
        },
        created() {
            this.getAllSalary()
        }
    }
</script>

<style scoped>

</style>
