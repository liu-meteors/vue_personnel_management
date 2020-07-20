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
            <el-form-item label="时间" required>
                <el-col :span="11">
                    <el-form-item prop="recordDateStr">
                        <el-date-picker :disabled="true" type="date" placeholder="选择签约日期" v-model="awardForm.recordDateStr" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="类型" prop="awardType">
                <el-radio-group v-model="awardForm.awardType">
                    <el-radio :label="1">奖励</el-radio>
                    <el-radio :label="2">惩罚</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式" prop="awardDescribe">
                <el-input type="textarea" v-model="awardForm.awardDescribe"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('awardForm')">确定</el-button>
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
                    money: '',
                    awardDescribe: '',
                    recordDateStr: '',
                    awardType: 3,
                    department: '',
                    posite: '',
                    username: ''

                },
                rules: {
                    money: [
                        { required: true, message: '请输入底薪', trigger: 'blur' },
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
                    awardDescribe: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            getAwardById(id){
                const _this=this
                axios.get('http://localhost:8181/getAwardById/'+id).then(function (resp) {
                       // console.log(resp.data)
                        _this.awardForm=resp.data
                })
            },
            getEmployeeById(id){
                const _this=this
                axios.get('http://localhost:8181/getEmpById/'+id).then(function (resp) {
                    _this.ruleForm=resp.data
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
                        axios.put('http://localhost:8181/updateAward',_this.awardForm).then(function (resp) {
                            // _this.$router.push('/recruitInformation')
                            if (resp.data=='success'){
                                _this.$notify({
                                    title: '成功',
                                    message: '修改成功',
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
            this.getEmployeeById(this.$route.query.empId)
            this.getAwardById(this.$route.query.id)
        }
    }
</script>

<style scoped>

</style>
