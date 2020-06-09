<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="员工信息" name="first">
            <div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="员工名称" prop="username">
                        <el-input :disabled="true" v-model="ruleForm.username" style="width: 60%"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" prop="phone">
                        <el-input :disabled="true" v-model="ruleForm.phone" style="width: 60%"></el-input>
                    </el-form-item>
                    <el-form-item label="住址" prop="address">
                        <el-input :disabled="true" v-model="ruleForm.address" style="width: 60%"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input :disabled="true" v-model="ruleForm.password" type="password" style="width: 60%"></el-input>
                    </el-form-item>
                    <el-form-item label="底薪" prop="salary">
                        <el-input :disabled="true" v-model="ruleForm.salary"  style="width: 60%"></el-input>
                    </el-form-item>
                    <el-form-item label="部门" prop="department">
                        <el-select :disabled="true" v-model="ruleForm.department" placeholder="请选择部门">
                            <el-option v-for="item in departmentForm" :label="item.name" :value="item.id"></el-option>
                            <!--                <el-option label="区域二" value="beijing"></el-option>-->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职位" prop="posite">
                        <el-select :disabled="true" v-model="ruleForm.posite" placeholder="请选择职位">
                            <el-option v-for="item in positionForm" :label="item.name" :value="item.id"></el-option>
                            <!--                <el-option label="区域二" value="beijing"></el-option>-->
                        </el-select>
                    </el-form-item>
                    <el-form-item  label="签约时间" prop="startToOver">
                        <el-date-picker
                                :disabled="true"
                                v-model="ruleForm.startToOver"
                                type="datetimerange"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="pickerOption"
                        >
                            <!--                    :default-time="['12:00:00']"-->

                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-tab-pane>
        <el-tab-pane label="晋升信息" name="second">
            <div>
                <el-table
                        :data="promotion"
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
                                    v-if="promotion.length!=0"
                                    :type="scope.row.transferred === '升职' ? 'success' : 'danger'"
                                    disable-transitions>{{scope.row.transferred}}</el-tag>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-tab-pane>
        <el-tab-pane label="奖惩信息" name="third">
            <div>
                <el-table
                        :data="award"
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
                                    v-if="award.length!=0"
                                    :type="scope.row.typeName === '奖励' ? 'success' : 'danger'"
                                    disable-transitions>{{scope.row.typeName}}</el-tag>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-tab-pane>
        <el-tab-pane label="工资信息" name="fourth">
            <div><el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="payDateStr"
                        label="日期"
                        sortable
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="bonus"
                        label="奖金">
                </el-table-column>
                <el-table-column
                        prop="forfeit"
                        label="罚金">
                </el-table-column>
                <el-table-column
                        prop="money"
                        label="基本工资">
                </el-table-column>
                <el-table-column
                        prop="gradeMoney"
                        label="绩效工资">
                </el-table-column>
                <el-table-column
                        prop="allMoney"
                        label="实发工资">
                </el-table-column>
            </el-table></div>
        </el-tab-pane>
    </el-tabs>

</template>

<script>
    export default {
        name: "AddEmployee",
        data() {
            return {
                activeName: 'first',
                search: '',
                promotion:[{
                    changeDateStr: '',
                    enpName: '',
                    oldPositionName: '',
                    newPositionName: '',
                    transferred: ''
                }],
                award:[
                    {
                        id: '',
                        empId: '',
                        recordDateStr: '',
                        empName: '',
                        typeName: '',
                        money: ''
                    }
                ],
                tableData: [{
                    empNumber: '',
                    name: '',
                    bonus: '',
                    forfeit: '',
                    money: '',
                    gradeMoney: '',
                    allMoney: '',
                    departmentName: '',
                    positionName: '',
                    payDateStr: ''
                }],
                ruleForm: {
                    id: '',
                    username: '',
                    phone: '',
                    address: '',
                    empNumber: '',
                    password: '',
                    department: '',
                    posite: '',
                    signDateStr: '',
                    overDateStr: '',
                    signDate: '',
                    signDate1: '',
                    overDate: '',
                    overDate1: '',
                    salary: '',
                    departmentName: '',
                    positionName: ''
                },
                departmentForm: {
                    id: '',
                    name: ''
                },
                pickerOption: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    },
                },
                positionForm: {
                    id: '',
                    name: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入员工名称', trigger: 'blur' },
                        { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '请输入地址', trigger: 'blur' },
                        { min: 5,  message: '请输入正确的地址', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入默认密码', trigger: 'blur' },
                        { min: 5,max: 16,  message: '请输入正确的密码', trigger: 'blur' }
                    ],
                    department: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    posite: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    signDateStr: [
                        {  required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    overDateStr: [
                        { required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            getYearSalary(){
                const me=this
                const empId=sessionStorage.getItem("empId")
                    axios.get('http://localhost:8181/getSalaryByEmpIdYear/'+empId).then(function (resp) {
                    me.tableData=resp.data
                    console.log(resp)
                })
            },
            getAward(){
                const _this=this
                const empId=sessionStorage.getItem("empId")
                axios.get('http://localhost:8181/getAllAwardByEmpYear/'+empId).then(function (resp) {
                    console.log(resp.data)
                    _this.award=resp.data
                })
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            getPromotion(){
                const _this=this
                axios.get('http://localhost:8181/getPromotionByEmpIdYear/'+sessionStorage.getItem('empId')).then(function (resp) {
                    console.log(resp.data)
                    _this.promotion=resp.data
                })
            },
            getEmployeeById(id){
                const _this=this
                axios.get('http://localhost:8181/getEmpById/'+id).then(function (resp) {
                    _this.ruleForm=resp.data
                })
            },
            handleClick(tab, event) {
                const me=this
                console.log(tab, event);
                switch (tab.name) {
                    case 'first':
                        me.getEmployeeById(sessionStorage.getItem('empId'));
                        break;
                    case 'second':
                        me.getPromotion();
                        break;
                    case  'third':
                        me.getAward();
                        break;
                    case 'fourth':
                        me.getYearSalary()
                        break;

                }
            },
            getDepartment(){
                const dep=this
                axios.get('http://localhost:8181/getAllDepartment').then(function (resp) {
                    dep.departmentForm=resp.data
                })
            },
            getPosition(){
                const pos=this
                axios.get('http://localhost:8181/getAllPosition').then(function (resp) {
                    pos.positionForm=resp.data
                })
            },
            submitForm(formName) {
                this.$router.push('/updateEmpInformation')
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created() {
            this.getDepartment()
            this.getPosition()
            this.getEmployeeById(sessionStorage.getItem('empId'))
        }
    }
</script>

<style scoped>

</style>
