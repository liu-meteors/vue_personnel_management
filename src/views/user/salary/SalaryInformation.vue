<template>
    <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="本月工资信息" name="1">
            <div><el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="payDate"
                        label="日期"
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
<!--            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>-->
        </el-collapse-item>
        <el-collapse-item title="本月考勤情况" name="2">
            <div>    <el-table
                    :data="monthLeave"
                    style="width: 100%">
                <el-table-column
                        label="申请日期"
                        prop="applyDateStr"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        label="开始时间"
                        prop="startDateStr">
                </el-table-column>
                <el-table-column
                        label="结束时间"
                        prop="overDateStr">
                </el-table-column>
                <el-table-column
                        label="审批状态"
                        prop="isCheck"
                        width="180"
                        column-key="date"
                        :filters="[{text: '已批准', value: '已批准'}, {text: '未审批', value: '未审批'}, {text: '已拒绝', value: '已拒绝'}]"
                        :filter-method="filterHandler">
                    <template slot-scope="scope">
                        <el-tag
                                :type="setTag(scope.row.isCheck)"
                                disable-transitions>{{scope.row.isCheck}}</el-tag>
                    </template>
                </el-table-column>
            </el-table></div>
        </el-collapse-item>
        <el-collapse-item title="本月奖惩信息" name="3">
            <div><el-table
                    :data="RewardAndPunishment"
                    style="width: 100%">
                <el-table-column
                        prop="recordDateStr"
                        label="日期"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="empName"
                        label="姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="typeName"
                        label="情况"
                        :filters="[{ text: '奖励', value: '奖励' }, { text: '惩罚', value: '惩罚' }]"
                        :filter-method="filterTag"
                        filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.typeName === '奖励' ? 'success' : 'danger'"
                                disable-transitions>{{scope.row.typeName}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="money"
                        label="金额">
                </el-table-column>
            </el-table></div>
        </el-collapse-item>
    </el-collapse>
</template>

<script>
    export default {
        name: "SalaryInformation",
        data() {
            return {
                activeName: '1',
                tableData: [{
                    payDate: '',
                    name: '',
                    bonus: '',
                    forfeit: '',
                    money: '',
                    gradeMoney: '',
                    allMoney: '',
                }],
                monthLeave: [
                    {
                        id:'',
                        applyDateStr: '',
                        startDateStr: '',
                        overDateStr:'',
                        isCheck: ''
                    }
                ],
                RewardAndPunishment:[
                    {
                        id: '',
                        empId: '',
                        recordDateStr: '2016-5-2',
                        empName: '5555',
                        typeName: '奖励',
                        money: '1000'
                    }
                ]
            };
        },
        methods:{

            filterTag(value, row) {
                return row.typeName === value;
            },
            getMouthAward(){
                const _this=this
                const empId=sessionStorage.getItem("empId")
                axios.get('http://localhost:8181/getAwardByEmpIdMonth/'+empId).then(function (resp) {
                    console.log(resp.data)
                    _this.RewardAndPunishment=resp.data
                })
            },
            getMonthSalary(){
                const me=this
                const empId=sessionStorage.getItem("empId")
                axios.get('http://localhost:8181/getSalaryByEmpNow/'+empId).then(function (resp) {
                    me.tableData=resp.data

                })
            },
            getMonthLeave(){
                const me=this
                const empId=sessionStorage.getItem("empId")
                axios.get('http://localhost:8181/getAllLeaveByEmpNow/'+empId).then(function (resp) {
                    me.monthLeave=resp.data

                })
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            setTag(tag){
                if (tag=='已批准'){
                    return 'success'
                }else if (tag=='未审批'){
                    return 'primary'
                }else {
                    return 'warning'
                }
            }
        },
        created() {
            this.getMouthAward()
            this.getMonthSalary()
            this.getMonthLeave()
        }
    }
</script>

<style scoped>

</style>
