<template>
    <el-table
            :data="tableData.filter(data => !search || data.empNumber.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
        <el-table-column
                label="申请日期"
                prop="recordDateStr"
                sortable
        >
        </el-table-column>
        <el-table-column
                label="工号"
                prop="empNumber">
        </el-table-column>
        <el-table-column
                label="名称"
                prop="empName">
        </el-table-column>
        <el-table-column
                label="金额"
                prop="money">
        </el-table-column>
        <el-table-column
                label="审批状态"
                prop="typeName"
                width="180"
                column-key="date"
                :filters="[{text: '奖励', value: '奖励'}, {text: '惩罚', value: '惩罚'}]"
                :filter-method="filterHandler">
            <template slot-scope="scope">
                <el-tag
                        :type="scope.row.typeName === '奖励' ? 'success' : 'error'"
                        disable-transitions>{{scope.row.typeName}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column
                align="right">
            <template slot="header" slot-scope="scope">
                <el-input
                        v-model="search"
                        size="mini"
                        placeholder="输入工号搜索"/>
            </template>
<!--            <template slot-scope="scope">-->
<!--                <el-button-->
<!--                        size="mini"-->
<!--                        @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>-->
<!--                <el-button-->
<!--                        size="mini"-->
<!--                        type="danger"-->
<!--                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
<!--            </template>-->
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [{
                    id: '',
                    empId: '',
                    recordDateStr: '',
                    empName: '',
                    typeName: '',
                    money: '',
                    empNumber: ''
                }],
                search: ''
            }
        },
        methods: {
            getAward(dep){
                const _this=this
                axios.get('http://localhost:8181/getAllDepAward/'+dep).then(function (resp) {
                    console.log(resp.data)
                    _this.tableData=resp.data
                })
            },
            handleEdit(index, row) {
                console.log(index, row);
                this.$router.push({
                    path: '/oneRewardAndPunishmentInformation',
                    query:{
                        empId: row.empId,
                        id: row.id
                    }
                })
            },
            handleDelete(index, row) {

                console.log(index, row);
                this.$confirm('确定删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete('http://localhost:8181/deleteAwardById/'+row.id).then(function (resp) {
                        window.location.reload()
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            filterTag(value, row) {
                return row.typeName === value;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            }
        },
        created() {
            this.getAward(sessionStorage.getItem('dep'))
        }
    }
</script>
