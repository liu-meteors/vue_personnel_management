<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="今年效益" name="first">
            <div>
                <el-table
                        ref="filterTable"
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            prop="fillInDateStr"
                            label="日期"
                            sortable
                            width="180"
                            column-key="date"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="quarterStr"
                            label="季度"
                            width="180"
                            :filters="[{ text: '第一季度', value: '第一季度' }, { text: '第二季度', value: '第二季度' },{ text: '第三季度', value: '第三季度' },{ text: '第四季度', value: '第四季度' }]"
                            :filter-method="filterTag"
                            filter-placement="bottom-end">
<!--                        <template slot-scope="scope">-->
<!--                            <el-tag-->
<!--                                    :type="scope.row.tag === '家' ? 'primary' : 'success'"-->
<!--                                    disable-transitions>{{scope.row.tag}}</el-tag>-->
<!--                        </template>-->
                    </el-table-column>
                    <el-table-column
                            prop="departmentName"
                            label="部门"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="money"
                            label="效益(单位：万元)"
                            >
                    </el-table-column>
                    <el-table-column label="编辑">
                        <template slot-scope="scope">
                            <el-button
                                    :disabled=isFill(scope.row.isFillIn)
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)"
                            >编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-tab-pane>
        <el-tab-pane label="所有信息" name="second">
            <div>
                <el-table
                        ref="filterTable"
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            prop="benYear"
                            label="年份"
                            sortable
                            width="180"
                            column-key="date"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="quarterStr"
                            label="季度"
                            width="180"
                            :filters="[{ text: '第一季度', value: '第一季度' }, { text: '第二季度', value: '第二季度' },{ text: '第三季度', value: '第三季度' },{ text: '第四季度', value: '第四季度' }]"
                            :filter-method="filterTag"
                            filter-placement="bottom-end">
                        <!--                        <template slot-scope="scope">-->
                        <!--                            <el-tag-->
                        <!--                                    :type="scope.row.tag === '家' ? 'primary' : 'success'"-->
                        <!--                                    disable-transitions>{{scope.row.tag}}</el-tag>-->
                        <!--                        </template>-->
                    </el-table-column>
                    <el-table-column
                            prop="departmentName"
                            label="部门"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="money"
                            label="效益(单位：万元)"
                    >
                    </el-table-column>
<!--                    <el-table-column label="编辑">-->
<!--                        <template slot-scope="scope">-->
<!--                            <el-button-->
<!--                                    size="mini"-->
<!--                                    @click="handleEdit(scope.$index, scope.row)"-->
<!--                                    :disabled="scope.row.isFillIn==1"-->
<!--                            >编辑</el-button>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
                </el-table>
            </div>
        </el-tab-pane>
        <el-tab-pane label="年效益" name="third">
            <div>
                <el-table
                        ref="filterTable"
                        :data="yearBenefit"
                        style="width: 100%">
                    <el-table-column
                            prop="benYear"
                            label="年份"
                            sortable
                            width="180"
                            column-key="date"
                    >
                    </el-table-column>
<!--                    <el-table-column-->
<!--                            prop="departmentName"-->
<!--                            label="部门"-->
<!--                            width="180">-->
<!--                    </el-table-column>-->
                    <el-table-column
                            prop="money"
                            label="效益(单位：万元)"
                    >
                    </el-table-column>
<!--                    <el-table-column label="编辑">-->
<!--                        <template slot-scope="scope">-->
<!--                            <el-button-->
<!--                                    size="mini"-->
<!--                                    @click="handleEdit(scope.$index, scope.row)"-->
<!--                                    :disabled="scope.row.isFillIn==1"-->
<!--                            >编辑</el-button>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
                </el-table>
            </div>
        </el-tab-pane>
    </el-tabs>

</template>

<script>
    export default {
        name: "BenefitInformation",
        data() {
            return {
                activeName: 'first',
                tableData: [{
                    id: '',
                    fillInDateStr: '',
                    quarterStr: '',
                    departmentName: '',
                    money: '',
                    isFillIn: '',
                    benYear: ''
                }],
                yearBenefit:[{
                    id: '',
                    yearDate: '',
                    departmentName: ''
                }],
                benefit:{
                    money: '',
                    department: '',

                }
            };
        },
        methods: {
            isFill(isFillIn){
              if (isFillIn==1){
                  return true
              }else {
                  return false
              }
            },
            getYearBenefit(dep){
                const _this=this
                axios.get('http://localhost:8181/getAllBenefitByDepYear/'+dep).then(function (resp) {
                    console.log(resp.data)
                    _this.tableData=resp.data
                })
            },
            getAllBenefit(dep){
                const _this=this
                axios.get('http://localhost:8181/getAllBenefitByDep/'+dep).then(function (resp) {
                    console.log(resp.data)
                    _this.tableData=resp.data
                })
            },
            getAllYearBenefit(dep){
                const _this=this
                axios.get('http://localhost:8181/getDepYearBenefit/'+dep).then(function (resp) {
                    console.log(resp.data)
                    _this.yearBenefit=resp.data
                })
            },
            handleClick(tab, event) {
                switch (tab.name) {
                    case 'first':
                        this.getYearBenefit(  sessionStorage.getItem("dep"))
                        break;
                    case 'second':
                        this.getAllBenefit(  sessionStorage.getItem("dep"))
                        break;
                    case 'third':
                        this.getAllYearBenefit(sessionStorage.getItem("dep"))
                        break;
                }
                console.log(tab, event);
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
                return row.quarterStr === value;
            },
            handleEdit(index, row) {
                console.log(index, row);
                const me=this
                me.$prompt('请输入效益(单位：万元)', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^[1-9][0-9]*([.][0-9]+)?$/,
                    inputErrorMessage: '请输入整数或小数'
                }).then(({ value }) => {
                    me.benefit.money=value
                    me.benefit.department=sessionStorage.getItem('dep')
                    me.benefit.id=row.id
                    axios.put('http://localhost:8181/updateBenefit',me.benefit).then(function (resp) {
                        // });
                        if (resp.data=='success'){
                            window.location.reload()
                        }

                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            }
        },
        created() {
            this.getYearBenefit(  sessionStorage.getItem("dep"))
        }
    }
</script>

<style scoped>

</style>
