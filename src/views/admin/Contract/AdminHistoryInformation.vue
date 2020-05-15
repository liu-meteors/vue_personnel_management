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
            <el-table-column
                    label="上传时间"
                    prop="submitDateStr">
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="downHistory(scope.$index, scope.row)">下载</el-button>
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
                    submitDateStr: '',
                    empNumber: '',
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
            getHistoryByEmpId(id){
                const me=this
                axios.get('http://localhost:8181/getAllHistoryByEmpId/'+id).then(function (resp) {
                    me.tableData=resp.data

                })
            },
            downHistory(index, row) {
                window.open('http://localhost:8181/downloadHistory/'+row.id+'?fileName='+row.username+row.empNumber+row.submitDateStr+'提交的合同.pdf')
            },
            handleDelete(index, row) {
                const _this=this

                axios.delete('http://localhost:8181/deleteHistory/'+row.id).then(function (resp) {
                    if (resp.data=='success'){
                        window.location.reload()
                    }else {
                        _this.$notify.error({
                            title: '错误',
                            message: '删除失败'
                        });
                    }
                })
            }
        },
        created() {
            this.getHistoryByEmpId(this.$route.query.empId)
        }
    }
</script>

<style scoped>

</style>
