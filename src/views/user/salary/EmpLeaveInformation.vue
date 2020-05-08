<template>
    <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="开始时间">
            <el-date-picker :disabled="true"
                    v-model="ruleForm.startToOver"
                    type="datetimerange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['12:00:00']">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="请假理由" prop="desc">
            <el-input :disabled="true" type="textarea" v-model="ruleForm.leaveDesc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">批准</el-button>
            <el-button type="danger" @click="resetForm('ruleForm')">拒绝</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "LeaveApply",
        data() {
            return {
                ruleForm: {
                    id: '',
                    startToOver: ['2016-10-26','2018-10-26'],
                    leaveDesc: '',
                    depApprove: '',
                    hrApprove: ''
                }
            };
        },
        methods: {
            getLeaveById(LeaveId){
                const me=this
              axios.get('http://localhost:8181/getLeaveById/'+LeaveId).then(function (resp) {
                    me.ruleForm=resp.data
              })
            },
            submitForm(formName) {
                const me=this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const pos=sessionStorage.getItem('pos');
                        const dep=sessionStorage.getItem('dep');
                        if (pos==1){
                            me.ruleForm.depApprove=2
                            if (dep==1){
                                me.ruleForm.hrApprove=2;
                            }
                        }else {
                            if (dep==1){
                                me.ruleForm.hrApprove=2;
                            }
                        }
                       console.log(me.ruleForm)
                        axios.put('http://localhost:8181/updateLeave',me.ruleForm).then(function (resp) {
                                if (resp.data=='success'){
                                    me.$router.push('/empLeaveCheck')
                                }else {
                                    me.$message({
                                        message: '审批失败',
                                        type: 'warning'
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
                const me=this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const pos=sessionStorage.getItem('pos');
                        const dep=sessionStorage.getItem('dep');
                        if (pos==1){
                            me.ruleForm.depApprove=1
                            me.ruleForm.hrApprove=1;
                        }else {
                            if (dep==1){
                                me.ruleForm.depApprove=1
                                me.ruleForm.hrApprove=1;
                            }
                        }
                        console.log(me.ruleForm)
                        axios.put('http://localhost:8181/updateLeave',me.ruleForm).then(function (resp) {
                            if (resp.data=='success'){
                                me.$router.push('/empLeaveCheck')
                            }else {
                                me.$message({
                                    message: '审批失败',
                                    type: 'warning'
                                });
                            }

                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        created() {
            this.getLeaveById(this.$route.query.leaveId)
        }
    }
</script>

<style scoped>

</style>
