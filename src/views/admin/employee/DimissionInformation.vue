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
            <el-table-column label="交接人" prop="handover">
            </el-table-column>
            <el-table-column label="交接状态" prop="isOverStr">
            </el-table-column>
            <el-table-column label="离职日期" prop="leaveDateStr">
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
                    empNumber: '',
                    handover: '',
                    department: '',
                    posite: '',
                    leaveDateStr: '',
                    isOverStr: '',
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
            getDimissions(){
                const dim=this
                axios.get('http://localhost:8181/getAllDimission').then(function (resp) {
                    console.log(resp.data)
                    dim.tableData=resp.data

                })
            },
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
            edit(index, row) {
                const _this=this
                _this.$router.push({
                    path: '/updateDimission',
                    query:{
                        id: row.id
                    }
                })
                console.log(index, row);
            },
            handleDelete(index, row) {
                axios.delete('http://localhost:8181/deleteDimissionById/'+row.id).then(function (resp) {
                    window.location.reload()

                })
            }
        },
        created() {
            this.getDepartment()
            this.getDimissions()
        }
    }
</script>

<style scoped>

</style>
