<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="username">
                <el-input v-model="ruleForm.username" :disabled="true" style="width: 60%"></el-input>
            </el-form-item>
            <el-form-item label="工号" prop="empNumber">
                <el-input v-model="ruleForm.empNumber" :disabled="true" style="width: 60%"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
                <el-input v-model="ruleForm.phone" :disabled="true" style="width: 60%"></el-input>
            </el-form-item>
            <el-form-item label="部门" prop="department">
                <el-select  :disabled="true"  v-model="ruleForm.department" placeholder="请选择部门">
                    <el-option  v-for="item in departmentForm" :label="item.name" :value="item.id"></el-option>
                    <!--                <el-option label="区域二" value="beijing"></el-option>-->
                </el-select>
            </el-form-item>
            <el-form-item  label="职位" prop="position">
                <el-select  :disabled="true"  v-model="ruleForm.position" placeholder="请选择职位">
                    <el-option  v-for="item in positionForm" :label="item.name" :value="item.id"></el-option>
                    <!--                <el-option label="区域二" value="beijing"></el-option>-->
                </el-select>
            </el-form-item>
            <el-form-item label="交接人" prop="handover">
                <el-input :disabled="true" v-model="ruleForm.handover"  style="width: 60%"></el-input>
            </el-form-item>
            <el-form-item label="离职时间" required>
                <el-col :span="11">
                    <el-form-item prop="leaveDateStr">
                        <el-date-picker type="date"  placeholder="选择离职日期" v-model="ruleForm.leaveDateStr" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="交接是否完成" prop="delivery">
                <el-switch v-model="ruleForm.delivery"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "AddDimission",
        data() {
            return {
                ruleForm: {
                    id: '',
                    department: '',
                    position:'',
                    delivery: false,
                    username: '',
                    empNumber: '',
                    handover: '',
                    phone: '',
                    leaveDateStr: '',
                    empId: ''
                },
                pickerOption: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;   //禁用以前的日期，今天不禁用
                        // return date.getTime() <= Date.now();    //禁用今天以及以前的日期
                    }
                },
                departmentForm: {
                    id: '',
                    name: ''
                },
                positionForm: {
                    id: '',
                    name: ''
                },
                rules: {
                    handover: [
                        { required: true, message: '请输入交接人名称', trigger: 'blur' },
                        { min: 2,  message: '请输入正确的名称', trigger: 'blur' }
                    ],

                    leaveDateStr: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    information: [
                        { required: true, message: '请填写职位说明', trigger: 'blur' },
                        { min: 4, max:255, message: '请输入正确的最多255', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            setEmp(){
                this.$prompt('请输入交接员工的员工号', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    this.getEmployeeByEmpId(value)
                }).catch(() => {
                    this.$router.push('/employeeInformation')
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
                        _this.ruleForm.handover=resp.data.emp.username
                        // _this.awardForm.empId=resp.data.emp.id
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
            deleteEmp(empId){
                const _this=this
                axios.delete('http://localhost:8181/deleteEmp/'+empId).then(function (resp) {
                        if (resp.data=='success'){
                            _this.$router.push('/dimissionInformation')
                        }else {
                            _this.$message({
                                showClose: true,
                                message: '添加失败',
                                type: 'error'
                            });
                        }

                })
            },
            submitForm(formName) {
                const _this=this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(_this.ruleForm)

                        axios.post('http://localhost:8181/addDimission',_this.ruleForm).then(function (resp) {
                            _this.deleteEmp( _this.ruleForm.empId)
                            // _this.$router.push('/recruitInformation')

                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created() {
            this.getDepartment()
            this.getPosition()
            const _this=this
            _this.ruleForm.username=this.$route.query.username
            _this.ruleForm.department=this.$route.query.department
            _this.ruleForm.position=this.$route.query.posite
            _this.ruleForm.empNumber=this.$route.query.empNumber
            _this.ruleForm.empId=this.$route.query.empId
            _this.ruleForm.phone=this.$route.query.phone
            _this.setEmp()
        }
    }
</script>

<style scoped>

</style>
