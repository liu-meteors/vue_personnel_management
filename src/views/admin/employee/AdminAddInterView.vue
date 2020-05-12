<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="面试人名称" prop="name">
                <el-input v-model="ruleForm.name" style="width: 60%"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
                <el-input v-model="ruleForm.phone" style="width: 60%"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="mail">
                <el-input v-model="ruleForm.mail" style="width: 60%"></el-input>
            </el-form-item>
            <el-form-item label="面试地点" prop="address">
                <el-input v-model="ruleForm.address" style="width: 60%"></el-input>
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
            <el-form-item label="面试时间" prop="viewDateStr">

                <el-date-picker
                        v-model="ruleForm.viewDateStr"
                        type="datetime"
                        :picker-options="pickerOption"
                        placeholder="选择面试时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="简历文件" prop="fileList">
                <el-upload
                        class="upload-demo"
                        ref="upload"
                        action="http://localhost:8181/import"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="ruleForm.fileList"
                        :limit="1"
                        :on-success="handleAvatarSuccess"
                        accept=".pdf, .PDF"
                        :beforeUpload="beforeAvatarUpload"
                        :on-change="(file, fileList) => {handleChangeFile(file, fileList, name)}"
                        :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传pdf文件，且不超过100MB</div>
                </el-upload>
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
        name: "AdminAddInterview",
        data() {
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
            var validateMobileMail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('邮箱不可为空'));
                } else {
                    if (value !== '') {
                        var reg=/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
                        if(!reg.test(value)){
                            callback(new Error('请输入有效的邮箱'));
                        }
                    }
                    callback();
                }
            };
            return {

                ruleForm: {
                    id: '',
                    name: '',
                    phone: '',
                    address: '',
                    viewDateStr: '',
                    mail: '',
                    department: '',
                    posite: '',
                    fileAddress: '',
                    fileUrl: '',
                    departmentName: '',
                    positionName: '',
                    fileList: [],
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
                    name: [
                        { required: true, message: '请输入员工名称', trigger: 'blur' },
                        { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' },
                        {validator:validateMobilePhone}
                    ],
                    mail: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        {validator:validateMobileMail}
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
                        { required: true, message: '请选择部门', trigger: 'change' }
                    ],
                    posite: [
                        { required: true, message: '请选择职位', trigger: 'change' }
                    ],
                    viewDateStr: [
                        { type: 'date', required: true, message: '请选择面试日期', trigger: 'change' }
                    ],
                    fileList: [
                        { required: true, message: '请加入简历文件', trigger: 'change' }
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
            handleChangeFile(file, fileList, name) {
               // alert(fileList)
                console.log(fileList)
                const me=this
                me.ruleForm.fileList=fileList
            },
            submitForm(formName) {
                const _this=this

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.$refs.upload.submit();

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            beforeAvatarUpload(file){
              if (file.size/1024/1024>100){
                  this.$message.error('文件不能大于100MB');
                  return false
              }
            },
            handleAvatarSuccess(response, file, fileList) {
                console.log(response.fileUrl)
                const _this=this
                _this.ruleForm.fileAddress=response.fileAddress
                _this.ruleForm.fileUrl=response.fileUrl
                axios.post('http://localhost:8181/addInterview',_this.ruleForm).then(function (resp) {
                    if (resp.data=='success'){

                        _this.$message({
                            showClose: true,
                            message: '添加成功',
                            type: 'success'
                        });
                        _this.$router.push("/adminInterview")
                    }else {
                        _this.$message({
                            showClose: true,
                            message: '添加失败',
                            type: 'error'
                        });

                    }
                                    // _this.$router.push('/employeeInformation')
                                })
            }

        },
        created() {
            this.getDepartment()
            this.getPosition()
        }
    }
</script>

<style scoped>

</style>
