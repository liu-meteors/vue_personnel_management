<template>
    <div>
        <el-table
                :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column
                    label="部门编号"
                    prop="id">
            </el-table-column>
            <el-table-column
                    label="部门名称"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="人数"
                    prop="aaa">
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button
                            :disabled="scope.row.id==1"
                            size="mini"

                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            :disabled="scope.row.id==1"
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
<!--        <el-pagination-->
<!--                background-->
<!--                layout="prev, pager, next"-->
<!--                :page-size="pageSize"-->
<!--                :total="total"-->
<!--                @current-change="page">-->
<!--        </el-pagination>-->
    </div>

</template>

<script>
    export default {
        inject: ['reload'],
        data() {
            return {
                pageSize: '',
                total: '',
                tableData: [{
                    id: '',
                    name: '',
                    aaa:''
                }],
                search: ''
            }
        },
        methods: {
            page(currentPage){
                const _this=this
                axios.get('http://localhost:8181/getCount').then(function (resp) {

                    _this.total=resp.data

                })
                axios.get('http://localhost:8181/getAll/10/'+currentPage).then(function (resp) {
                    console.log(resp)
                    _this.tableData=resp.data
                    _this.pageSize=10
                })
            },
            handleEdit(index, row) {

                console.log(index, row);
                this.$prompt('请输入部门名称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                }).then(({ value }) => {
                    axios.post('http://localhost:8181/updateDepartment/'+row.id+'/'+value).then(function (resp) {
                        window.location.reload()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消修改'
                    });
                });
            },
            handleDelete(index, row) {
                if (row.aaa!=0){
                    this.$notify.error({
                        title: '错误',
                        message: '部门中还有员工，不能解散'
                    });
                    return
                }
                this.$confirm('确定解散部门？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete('http://localhost:8181/deleteDepartment/'+row.id).then(function (resp) {
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
            getDepartmentDate(){
                const _this=this
                axios.get('http://localhost:8181/getCount').then(function (resp) {

                    _this.total=resp.data
                })
                axios.get('http://localhost:8181/getAll/10/1').then(function (resp) {
                    console.log(resp)
                    _this.tableData=resp.data
                    _this.pageSize=10
                })
            }
        },
        created() {
            this.getDepartmentDate()
        }
    }
</script>

<style scoped>

</style>
