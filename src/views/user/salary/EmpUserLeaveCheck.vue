<template>
    <el-table
            :data="tableData.filter(data => !search || data.enpName.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
        <el-table-column
                label="申请日期"
                prop="applyDateStr"
                sortable
        >
        </el-table-column>
        <el-table-column
                label="名称"
                prop="enpName">
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
                        :type="scope.row.isCheck === '已批准' ? 'primary' : 'success'"
                        disable-transitions>{{scope.row.isCheck}}</el-tag>
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
                    id:'',
                    applyDateStr: '',
                    enpName: '',
                    isCheck: ''
                }],
                search: ''
            }
        },
        methods: {
            getLeave(){
                const me=this
              axios.get('http://localhost:8181/getAllLeaveByEmp/'+sessionStorage.getItem('empId')).then(function (resp) {
                  console.log(resp.data)
                  me.tableData=resp.data
              })
            },
            handleEdit(index, row) {
                console.log(index, row);
                this.$router.push({
                    path:'/empLeaveInformation',
                    query:{
                        leaveId: row.id
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
            this.getLeave()
        }
    }
</script>
