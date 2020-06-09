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
                            width="100"
                            column-key="date"
                            :filters=departmentFilter
                            :filter-method="filterDep"
                    >
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
                            width="180"
                            column-key="date"
                            :filters=departmentFilter
                            :filter-method="filterDep"
                    >
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
        <el-tab-pane label="年效益信息" name="third">
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
                    <el-table-column
                            prop="departmentName"
                            label="部门"
                            width="180"
                            column-key="date"
                            :filters=departmentFilter
                            :filter-method="filterDep"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="money"
                            label="效益(单位：万元)"
                    >
                    </el-table-column>
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
                departmentFilter:[
                    {
                        text: '',
                        value: ''
                    }
                ],
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
            getDepartment(){
                const dep=this
                axios.get('http://localhost:8181/getAllDepartment').then(function (resp) {
                    dep.departmentFilter=resp.data
                    console.log(dep.departmentFilter)
                })
            },
            getYearBenefit(){
                const _this=this
                axios.get('http://localhost:8181/getAllBenefitByYear').then(function (resp) {
                    console.log(resp.data)
                    _this.tableData=resp.data
                })
            },
            getAllBenefit(){
                axios.get('http://localhost:8181/getAllBenefit').then(function (resp) {
                    console.log(resp.data)
                    _this.tableData=resp.data
                })
            },
            getAllYearBenefit(dep){
                const _this=this
                axios.get('http://localhost:8181/getAllYearBenefit').then(function (resp) {
                    console.log(resp.data)
                    _this.yearBenefit=resp.data
                })
            },
            handleClick(tab, event) {
                if (tab.name=='first'){
                    this.getYearBenefit()
                }else if (tab.name=='second') {
                    this.getAllBenefit()
                }else{
                    this.getAllYearBenefit()
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
            filterDep(value, row) {
                return row.departmentName === value;
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
                    // this.$message({
                    //     type: 'success',
                    //     message: '你的邮箱是: ' + value
                    me.benefit.money=value
                    me.benefit.department=sessionStorage.getItem('dep')
                    me.$message({
                        message: me.benefit.money,
                        type: 'success'
                    });
                    axios.post('http://localhost:8181/addBenefit',me.benefit).then(function (resp) {
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
            this.getDepartment()
            this.getYearBenefit()
        }
    }
</script>

<style scoped>

</style>
