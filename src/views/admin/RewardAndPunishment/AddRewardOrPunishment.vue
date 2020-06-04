<template>
    <div>
        <el-form :model="awardForm" :rules="rules" ref="awardForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="员工名称" prop="username">
                <el-input :disabled="true" v-model="ruleForm.username" style="width: 60%"></el-input>
            </el-form-item>
            <el-form-item label="金额" prop="money">
                <el-input type="number" v-model="awardForm.money"  style="width: 60%"></el-input>
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
            <el-form-item label="类型" prop="awardType">
                <el-radio-group v-model="awardForm.awardType">
                    <el-radio :label="1">奖励</el-radio>
                    <el-radio :label="2">惩罚</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="理由" prop="awardDescribe">
                <el-input type="textarea" v-model="awardForm.awardDescribe"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('awardForm')">立即提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "AddEmployee",
        data() {
            return {
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
                    positionName: '',
                    awardDescribe: ''
                },
                pickerOption: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    },
                },
                departmentForm: {
                    id: '',
                    name: '',
                    recordDateStr: '',
                    awardType: '',
                    typeName: ''
                },
                positionForm: {
                    id: '',
                    name: ''
                },
                awardForm:{
                    empId: '',
                    money: '',
                    awardDescribe: '',
                    recordDateStr: '',
                    awardType: 1,
                    department: '',
                    posite: '',
                    username: ''

                },
                rules: {
                    // salary: [
                    //     { required: true, message: '请输入底薪', trigger: 'blur' },
                    //     { min: 4,  message: '请输入正确的底薪', trigger: 'blur' }
                    // ],

                    signDateStr: [
                        {  required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    overDateStr: [
                        { required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    awardDescribe: [
                        { required: true, message: '请填写理由', trigger: 'blur' }
                    ],
                    awardType: [
                        { required: true, message: '请填写类型', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            setEmp(){
                this.$prompt('请输入员工号', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    this.getEmployeeByEmpId(value)
                }).catch(() => {
                    this.$router.push('/rewardAndPunishmentInformation')
                });
            },
            getEmployeeByEmpId(id){
                const _this=this
                axios.get('http://localhost:8181/getEmpByEmpId/'+id).then(function (resp) {
                    console.log(resp.data.emp)
                    if (resp.data.emp==null){
                        _this.$notify.error({
                            title: '错误',
                            message: '此用户不存在'
                        });
                        _this.setEmp()
                    }else {
                        console.log(resp.data)
                        _this.ruleForm=resp.data.emp
                        _this.awardForm.empId=resp.data.emp.id
                    }


                })
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
                const _this=this

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(_this.awardForm)
                        axios.post('http://localhost:8181/addAward',_this.awardForm).then(function (resp) {
                            // _this.$router.push('/recruitInformation')
                            if (resp.data=='success'){
                                _this.$message({
                                    showClose: true,
                                    message: '添加成功',
                                    type: 'success'
                                });
                                _this.$router.push('/rewardAndPunishmentInformation')
                            }else {
                                _this.$message({
                                    showClose: true,
                                    message: '添加失败',
                                    type: 'error'
                                });
                            }
                        })
                    } else {
                        _this.$message({
                            showClose: true,
                            message: '添加失败',
                            type: 'error'
                        });
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created() {
            const _this=this
            this.getDepartment()
            this.getPosition()

            this.setEmp()
        }
    }
</script>

<style scoped>

</style>
