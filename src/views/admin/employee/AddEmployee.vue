<template>
<div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="员工名称" prop="username">
            <el-input v-model="ruleForm.username" style="width: 60%"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
            <el-input v-model="ruleForm.phone" style="width: 60%"></el-input>
        </el-form-item>
        <el-form-item label="住址" prop="address">
            <el-input v-model="ruleForm.address" style="width: 60%"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password" style="width: 60%"></el-input>
        </el-form-item>
        <el-form-item label="底薪" prop="salary">
            <el-input v-model="ruleForm.salary" type="number" style="width: 60%"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="department">
            <el-select v-model="ruleForm.department" placeholder="请选择部门">
                <el-option v-for="item in departmentForm" :label="item.name" :value="item.id"></el-option>
<!--                <el-option label="区域二" value="beijing"></el-option>-->
            </el-select>
        </el-form-item>
        <el-form-item label="职位" prop="posite">
            <el-select v-model="ruleForm.posite" placeholder="请选择职位">
                <el-option v-for="item in positionForm" :label="item.name" :value="item.id"></el-option>
<!--                <el-option label="区域二" value="beijing"></el-option>-->
            </el-select>
        </el-form-item>
        <el-form-item label="签约时间" prop="startToOver">
            <el-date-picker

                    v-model="ruleForm.startToOver"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOption"
            >
                <!--                    :default-time="['12:00:00']"-->

            </el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
    export default {
        name: "AddEmployee",
        data() {
            // let patter='^1[3|4|5|7|8][0-9]{9}$';
            var validateMobilePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('手机号不可为空'));
                } else {
                    if (value !== '') {
                        var reg=/^1[3|4|5|7|8][0-9]{9}$/;
                        if(!reg.test(value)){
                            callback(new Error('请输入有效的手机号码'));
                        }
                    }
                    callback();
                }
            };
            // let isPhone=(rule,value,callback)=>{
            //     if (!patter.test(value)){
            //         return callback(new Error('请输入正的手机号'))
            //     }else {
            //         callback()
            //     }
            //
            // }
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
                    startToOver:''
                },
                pickerOption: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    },
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
                    username: [
                        { required: true, message: '请输入员工名称', trigger: 'blur' },
                        { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' },
                        {validator:validateMobilePhone}
                        ],
                    address: [
                        { required: true, message: '请输入地址', trigger: 'blur' },
                        { min: 5,  message: '请输入正确的地址', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入默认密码', trigger: 'blur' },
                        { min: 5,max: 16,  message: '请输入正确的密码', trigger: 'blur' }
                    ],
                    salary: [
                        { required: true, message: '请输入底薪', trigger: 'blur' },
                        { min: 4,  message: '请输入正确的底薪', trigger: 'blur' }
                    ],
                    department: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    posite: [
                        { required: true, message: '请选择活动区域', trigger: 'change' }
                    ],
                    signDateStr: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    overDateStr: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ],
                    startToOver: [
                        { required: true, message: '请输入签约时间', trigger: 'blur' },
                    ],
                }
            };
        },
        methods: {
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
                console.log(_this.ruleForm)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post('http://localhost:8181/addEmployee',_this.ruleForm).then(function (resp) {
                            _this.$message({
                                showClose: true,
                                message: '添加成功',
                                type: 'success'
                            });
                            _this.$router.push('/employeeInformation')
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

        },
        created() {
            this.getDepartment()
            this.getPosition()
        }
    }
</script>

<style scoped>

</style>
