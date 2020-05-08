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
            <el-table-column label="部门" prop="departmentName"
                             column-key="date"
                             :filters=departmentFilter
                             :filter-method="filterTag"
            >
            </el-table-column>
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
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="edit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
<!--        <el-pagination-->
<!--                background-->
<!--                layout="prev, pager, next"-->
<!--                :page-size="5"-->
<!--                :total="1000"-->
<!--                @current-change="page">-->
<!--        </el-pagination>-->
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
                departmentFilter:[
                    {
                        text: '',
                        value: ''
                    }
                ],
                search: ''
            }
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
            filterPos(value, row) {
                return row.positionName === value;
            },
            filterTag(value, row) {
                return row.departmentName === value;
            },
            getEmployee(){
                const emp=this
                axios.get('http://localhost:8181/getEmp').then(function (resp) {
                        emp.tableData=resp.data

                })
            },
            edit(index, row) {
                const _this=this
                _this.$router.push({
                    path: '/updateEmployee',
                    query:{
                        id: row.id
                    }
                })
                console.log(index, row);
            },
            handleDelete(index, row) {
                const _this=this
                _this.$router.push({
                    path: '/addDimission',
                    query:{
                        username: row.username,
                        empNumber: row.empNumber,
                        department: row.department,
                        posite: row.posite,
                        empId: row.id,
                        phone: row.phone
                    }
                })
                // axios.delete('http://localhost:8181/deleteEmp/'+row.id).then(function (resp) {
                //     if (resp.data=='success'){
                //         // _this.$message({
                //         //     showClose: true,
                //         //     message: '删除成功',
                //         //     type: 'success'
                //         // });
                //         window.location.reload()
                //     }else {
                //         _this.$message({
                //             showClose: true,
                //             message: '删除失败',
                //             type: 'error'
                //         });
                //     }
                // })
            }
        },
        created() {
            this.getDepartment()
            this.getEmployee()
        }
    }
</script>

<style scoped>

</style>
