<template>
<div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="部门" prop="department">
            <el-select v-model="ruleForm.department" placeholder="请选择部门">
                <el-option v-for="item in departmentForm" :label="item.name" :value="item.id"></el-option>
<!--                <el-option label="区域二" value="beijing"></el-option>-->
            </el-select>
        </el-form-item>
        <el-form-item label="职位" prop="position">
            <el-select v-model="ruleForm.position" placeholder="请选择职位">
                <el-option v-for="item in positionForm" :label="item.name" :value="item.id"></el-option>
<!--                <el-option label="区域二" value="beijing"></el-option>-->
            </el-select>
        </el-form-item>
        <el-form-item label="底薪" prop="salary">
            <el-input v-model="ruleForm.salary" type="number" style="width: 60%"></el-input>
        </el-form-item>
        <el-form-item label="职位说明" prop="information">
            <el-input type="textarea" v-model="ruleForm.information"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
    export default {
        name: "UpdateRecruit",
        data() {
            return {
                ruleForm: {
                    id: '',
                    department: '',
                    position:'',
                    salary: '',
                    information: '',
                    departmentName: '',
                    positionName: '',
                    name: ''
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
                    salary: [
                        { required: true, message: '请输入底薪', trigger: 'blur' },
                        { min: 4,  message: '请输入正确的底薪', trigger: 'blur' }
                    ],
                    department: [
                        { required: true, message: '请选择部门', trigger: 'change' }
                    ],
                    position: [
                        { required: true, message: '请选择职位', trigger: 'change' }
                    ],
                    information: [
                        { required: true, message: '请填写职位说明', trigger: 'blur' },
                        { min: 4, max:255, message: '请输入正确的最多255', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            getERecruitById(id){
                const _this=this
                axios.get('http://localhost:8181/getRecruitById/'+id).then(function (resp) {
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
                        console.log(_this.ruleForm)
                        _this.$message({
                            showClose: true,
                            message: '添加成功',
                            type: 'success'
                        });
                        axios.put('http://localhost:8181/updateRecruit',_this.ruleForm).then(function (resp) {
                            _this.$router.push('/recruitInformation')
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
            const _this=this
            this.getDepartment()
            this.getPosition()
            this.getERecruitById(this.$route.query.id)
        }
    }
</script>

<style scoped>

</style>
