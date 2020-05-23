<template>
    <el-table
            :data="tableData.filter(data => !search || data.empNumber.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
        <el-table-column
                label="变更日期"
                prop="changeDateStr"
                sortable
        >
        </el-table-column>
        <el-table-column
                label="工号"
                prop="empNumber">
        </el-table-column>
        <el-table-column
                label="姓名"
                prop="enpName">
        </el-table-column>

        <el-table-column
                label="变更前"
                prop="oldPositionName">
        </el-table-column>
        <el-table-column
                label="变更后"
                prop="newPositionName">
        </el-table-column>
        <el-table-column
                prop="transferred"
                label="变更"
                width="100"
                column-key="date"
                :filters="[{ text: '升职', value: '升职' }, { text: '降职', value: '降职' }]"
                :filter-method="filterTag"
                >
            <template slot-scope="scope">
                <el-tag
                        :type="scope.row.transferred === '升职' ? 'success' : 'danger'"
                        disable-transitions>{{scope.row.transferred}}</el-tag>
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
<!--                        type="danger"-->
<!--                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
<!--            </template>-->
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        name: "AdminPromotionInformation",
        data() {
            return {
                tableData: [{
                    changeDateStr: '',
                    enpName: '',
                    oldPositionName: '',
                    newPositionName: '',
                    transferred: '',
                    empNumber: ''
                }],
                search: ''
            }
        },
        methods: {
            getPromotion(dep){
                const _this=this
                axios.get('http://localhost:8181/getProByDep/'+dep).then(function (resp) {
                  console.log(resp.data)
                  _this.tableData=resp.data
              })
            },
            resetDateFilter() {
                this.$refs.filterTable.clearFilter('date');
            },
            clearFilter() {
                this.$refs.filterTable.clearFilter();
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.transferred === value;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
        },
        created() {
            this.getPromotion(sessionStorage.getItem('dep'))
        }
    }
</script>

<style scoped>

</style>
