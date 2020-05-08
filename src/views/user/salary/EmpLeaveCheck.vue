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
                :filters="[{text: '已批准', value: '已批准'}, {text: '未审批', value: '未审批'}, {text: '已拒绝', value: '已拒绝'},{text: '审批中', value: '审批中'},{text: '已超时', value: '已超时'}]"
                :filter-method="filterHandler">
            <template slot-scope="scope">
                <el-tag
                        :type="setTag(scope.row.isCheck)"
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
                        v-if="tableData.length!=0"
                        :disabled="setDisable(scope.row)"
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
              axios.get('http://localhost:8181/getAllLeave').then(function (resp) {
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
            },
            setTag(tag){
                if (tag=='已批准'){
                    return 'success'
                }else if (tag=='未审批'){
                    return 'info'
                }else if (tag=='已超时'){
                    return 'warning'
                }else if (tag=='已拒绝'){
                    return 'danger'
                }else {
                    return 'primary'
                }
            },
            setDisable(row){
                 if (row.isCheck=='未审批'){
                    if (sessionStorage.getItem("dep")==1){
                        if (sessionStorage.getItem('pos')==1){
                            return false
                        }else {
                            return true
                        }
                    }else {
                        return false
                    }
                }else if ("审批中"){
                    if (sessionStorage.getItem("dep")==1){
                        return false
                    }else {
                        return true
                    }
                }else {
                     return true
                 }
            }
        },
        created() {
            this.getLeave()
        }
    }
</script>
