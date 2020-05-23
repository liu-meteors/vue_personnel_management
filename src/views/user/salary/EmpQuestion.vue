<template>
    <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="15%" class="demo-ruleForm">
        <el-form-item  label="对于他的日常工作满不满意" prop="question2">
            <br>
            <el-radio-group v-model="ruleForm.question2">
                <el-radio :label="4">非常不满意</el-radio>
                <el-radio :label="8">比较不满意</el-radio>
                <el-radio :label="12">一般</el-radio>
                <el-radio :label="16">比较满意</el-radio>
                <el-radio :label="20">非常满意</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="在工作的时候是否有偷奸耍滑" prop="question1">
            <br>
            <el-radio-group  v-model="ruleForm.question1">
                <el-radio :label="4">一直</el-radio>
                <el-radio :label="8">经常有</el-radio>
                <el-radio :label="12">还好</el-radio>
                <el-radio :label="16">偶尔</el-radio>
                <el-radio :label="20">从来没有</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="工作素质能否赶得上现在的工作" prop="question3">
            <br>
            <el-radio-group v-model="ruleForm.question3">
                <el-radio :label="4">非常擦</el-radio>
                <el-radio :label="8">比较差</el-radio>
                <el-radio :label="12">一般</el-radio>
                <el-radio :label="16">比较好</el-radio>
                <el-radio :label="20">非常好</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="对于他的工作态度满不满意" prop="question4">
            <br>
            <el-radio-group v-model="ruleForm.question4">
                <el-radio :label="4">非常不满意</el-radio>
                <el-radio :label="8">比较不满意</el-radio>
                <el-radio :label="12">一般</el-radio>
                <el-radio :label="16">比较满意</el-radio>
                <el-radio :label="20">非常满意</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="对于他的工作进度满不满意" prop="question5">
            <br>
            <el-radio-group v-model="ruleForm.question5">
                <el-radio :label="4">非常不满意</el-radio>
                <el-radio :label="8">比较不满意</el-radio>
                <el-radio :label="12">一般</el-radio>
                <el-radio :label="16">比较满意</el-radio>
                <el-radio :label="20">非常满意</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "EmpQuestion",
        data() {
            return {
                ruleForm: {
                    question1: '',
                    question2: '',
                    question3: '',
                    question4: '',
                    question5: '',
                    grade: '',
                    toGradeEmpId: '',
                    fromGradeEmpId: ''
                },
                rules: {
                    question1: [
                        { required: true, message: '请填写问题', trigger: 'change' }
                    ],
                    question2: [
                        { required: true, message: '请填写问题', trigger: 'change' }
                    ],
                    question3: [
                        { required: true, message: '请填写问题', trigger: 'change' }
                    ],
                    question4: [
                        { required: true, message: '请填写问题', trigger: 'change' }
                    ],
                    question5: [
                        { required: true, message: '请填写问题', trigger: 'change' }
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                const me=this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        me.ruleForm.grade=me.ruleForm.question1+me.ruleForm.question2+me.ruleForm.question3+me.ruleForm.question4+me.ruleForm.question5
                        console.log(me.ruleForm)
                        axios.post("http://localhost:8181/addGrade",me.ruleForm).then(function (resp) {
                            if (resp.data=='success'){
                                me.$router.push('/gradeInformation')
                            }else {
                                alert(1111)
                            }
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
            const me=this
            me.ruleForm.toGradeEmpId=me.$route.query.toId;
            me.ruleForm.fromGradeEmpId=sessionStorage.getItem('empId')
        }
    }
</script>

<style scoped>

</style>
