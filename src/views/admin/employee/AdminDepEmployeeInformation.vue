<template>
    <div>
        <el-table
                :data="tableData.filter(data => !search || data.empNumber.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column
                    label="工号"
                    prop="empNumber">
            </el-table-column>
            <el-table-column
                    label="姓名"
                    prop="username">
            </el-table-column>
            <el-table-column label="电话" prop="phone">
            </el-table-column>
            <el-table-column label="地址" prop="address">

            </el-table-column>
<!--            <el-table-column label="部门" prop="departmentName"-->
<!--                             column-key="date"-->
<!--                             :filters=departmentFilter-->
<!--                             :filter-method="filterTag"-->
<!--            >-->
<!--            </el-table-column>-->
            <el-table-column label="职位" prop="positionName"
                             column-key="date"
                             :filters="[{text:'主管',value:'主管'},{text:'组长',value:'组长'},{text:'员工',value:'员工'}]"
                             :filter-method="filterPos"
            >
            </el-table-column>
            <el-table-column label="底薪" prop="salary">
            </el-table-column>
            <el-table-column label="签约日期" prop="signDateStr">
            </el-table-column>
            <el-table-column label="终止日期" prop="overDateStr">
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="输入工号搜索"/>
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                // pageSize: '',
                // total: '',
                tableData: [{
                    id: '',
                    username: '',
                    phone: '',
                    address: '',
                    empNumber: '',
                    password: '',
                    department: '',
                    posite: '',
                    signDateStr: '',
                    overDateStr: '',
                    salary: '',
                    departmentName: '',
                    positionName: ''
                }],
                // departmentFilter:[
                //     {
                //         text: '',
                //         value: ''
                //     }
                // ],
                search: ''
            }
        },
        methods: {
            filterPos(value, row) {
                return row.positionName === value;
            },
            filterTag(value, row) {
                return row.departmentName === value;
            },
            getDepEmployee(dep){
                const emp=this
                axios.get('http://localhost:8181/getEmpByDep/'+dep).then(function (resp) {
                        emp.tableData=resp.data

                })
            },
        },
        created() {
            // this.getDepartment()
            this.getDepEmployee(sessionStorage.getItem('dep'))
        }
    }
</script>

<style scoped>

</style>
