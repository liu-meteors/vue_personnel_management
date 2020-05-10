<template>
    <el-table
            :data="tableData.filter(data => !search || data.empName.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
        <el-table-column
                label="申请日期"
                prop="recordDateStr"
                sortable
        >
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
                        v-if="tableData.length!=0"
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
                        placeholder="输入名字搜索"/>
            </template>
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
            </template>
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
                    money: ''
                }],
                search: ''
            }
        },
        methods: {
            getAward(){
                const _this=this
                const empId=sessionStorage.getItem("empId")
                axios.get('http://localhost:8181/getAllAwardByEmpId/'+empId).then(function (resp) {
                  console.log(resp.data)
                  _this.tableData=resp.data
              })
            },
            handleEdit(index, row) {
                console.log(index, row);
                this.$router.push({
                    path: '/empOneRewardAndPunishmentInformation',
                    query:{
                        empId: row.empId,
                        id: row.id
                    }
                })
            },
            handleDelete(index, row) {
                console.log(index, row);
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
            this.getAward()
        }
    }
</script>
