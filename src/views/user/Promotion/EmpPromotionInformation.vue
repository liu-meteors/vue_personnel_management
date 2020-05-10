<template>
    <el-table
            :data="tableData.filter(data => !search || data.enpName.toLowerCase().includes(search.toLowerCase()))"
            style="width: 100%">
        <el-table-column
                label="变更日期"
                prop="changeDateStr"
                sortable
        >
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
                prop="tag"
                label="变更"
                width="100"
                :filters="[{ text: '升职', value: '升职' }, { text: '降职', value: '降职' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end">
            <template slot-scope="scope">
                <el-tag
                        v-if="tableData.length!=0"
                        :type="scope.row.transferred === '升职' ? 'success' : 'danger'"
                        disable-transitions>{{scope.row.transferred}}</el-tag>
            </template>
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
                    transferred: ''
                }],
                search: ''
            }
        },
        methods: {
            getPromotion(){
                const _this=this
                axios.get('http://localhost:8181/getAllPromotionByEmpId/'+sessionStorage.getItem('empId')).then(function (resp) {
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
                return row.tag === value;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            }
        },
        created() {
            this.getPromotion()
        }
    }
</script>

<style scoped>

</style>
