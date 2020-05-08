<template>
    <div>
        <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column
                    label="招聘部门"
                    prop="departmentName"
                    column-key="date"
                    :filters=departmentFilter
                    :filter-method="filterTag"
            >
            </el-table-column>
            <el-table-column
                    label="招聘职位"
                    prop="positionName"
                    column-key="date"
                    :filters="[{text:'主管',value:'主管'},{text:'组长',value:'组长'},{text:'员工',value:'员工'}]"
                    :filter-method="filterPos"
            >
            </el-table-column>
            <el-table-column
                    label="工资"
                    prop="salary">
            </el-table-column>
            <el-table-column
                    label="岗位描述"
                    prop="information">
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "RecruitInformation",
        data() {
            return {
                pageSize: '',
                total: '',
                tableData: [{
                    id: '',
                    department: '',
                    position:'',
                    salary: '',
                    information: '',
                    departmentName: '',
                    positionName: '',
                    name: ''
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
            handleEdit(index, row) {
                const _this=this
                _this.$router.push({
                    path: '/updateRecruit',
                    query:{
                        id: row.id
                    }
                })
            },
            handleDelete(index, row) {
                this.$confirm('确定删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete('http://localhost:8181/deleteRecruit/'+row.id).then(function (resp) {
                        window.location.reload()

                        // this.reload()
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                // const _this=this
                // alert(row.id)
                // console.log(index, row);


            },
            getRecruits(){
                const _this=this

                axios.get('http://localhost:8181/getAllRecruit').then(function (resp) {
                    _this.tableData=resp.data
                })
            }
        },
        created() {
            this.getDepartment()
            this.getRecruits()
        }
    }
</script>

<style scoped>

</style>
