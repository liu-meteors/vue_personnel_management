<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="开始时间"  prop="startToOver">
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
        <el-form-item label="请假理由" prop="leaveDesc">
            <el-input type="textarea" v-model="ruleForm.leaveDesc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">确定请假</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "LeaveApply",
        data() {
            return {
                ruleForm: {
                    empId: sessionStorage.getItem('empId'),
                    startToOver: '',
                    leaveDesc: ''
                },
                pickerOption: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    },
                },
                rules: {
                    startToOver: [
                        { required: true, message: '请输入请假时间', trigger: 'blur' },
                    ],
                    leaveDesc: [
                        { required: true, message: '请填写请假理由', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                const me=this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert(555)
                        axios.post('http://localhost:8181/leaveApply',me.ruleForm).then(function (resp) {
                            if (resp.data=='success'){
                                me.$router.push('/empUserLeaveCheck')
                            }else {
                                me.$message({
                                    showClose: true,
                                    message: '错了哦，这是一条错误消息',
                                    type: 'error'
                                });
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
            this.empId=sessionStorage.getItem('empId');
        }
    }
</script>

<style scoped>

</style>
