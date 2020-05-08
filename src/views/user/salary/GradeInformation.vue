<template>
    <el-table
            :data="tableData.filter(data => !search || data.empNumber.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
        <el-table-column
                label="申请日期"
                prop="empNumber"
                sortable
        >
        </el-table-column>
        <el-table-column
                label="工号"
                prop="empNumber">
        </el-table-column>
        <el-table-column
                label="名称"
                prop="username">
        </el-table-column>
        <el-table-column
                label="审批状态"
                prop="isGrade"
                width="180"
                column-key="date"
                :filters="[{text: '已评分', value: '已评分'}, {text: '未评分', value: '未评分'}]"
                :filter-method="filterHandler">
            <template slot-scope="scope">
                <el-tag
                        :type="scope.row.isGrade === '已评分' ? 'primary' : 'success'"
                        disable-transitions>{{scope.row.isGrade}}</el-tag>
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
                    empNumber: '',
                    username: '',
                    isGrade: ''
                }],
                search: ''
            }
        },
        methods: {
            getLeave(){
                const me=this
                axios.get('http://localhost:8181/getGradeEmp/'+sessionStorage.getItem("empId")).then(function (resp) {
                    console.log(resp.data)
                    me.tableData=resp.data
                })
            },
            handleEdit(index, row) {


                const nowDate=new Date();
                let date={
                    year: nowDate.getFullYear(),
                    month: nowDate.getMonth()+1,
                    date:nowDate.getDate(),
                }
                alert(date.year+'-'+date.month+'-'+date.date)
                if (date.date<29){
                    this.$notify({
                        title: '警告',
                        message: '现在不是打分时间段',
                        type: 'warning'
                    });
                    return

                }
                if (row.isGrade=='已评分'){
                    this.$notify.error({
                        title: '错误',
                        message: '已评分，不能重复评分'
                    });
                    return
                }
                console.log(index, row);
                this.$router.push({
                    path:'/empQuestion',
                    query:{
                        toId: row.id
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
            getNowDate(){
               const nowDate=new Date();
                let date={
                    year: nowDate.getFullYear(),
                    month: nowDate.getMonth()+1,
                    date:nowDate.getDate(),
                }
                alert(date.year+'-'+date.month+'-'+date.date)
            }
        },
        created() {
            this.getLeave()
        }
    }
</script>
