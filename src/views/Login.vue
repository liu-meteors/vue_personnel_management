<template>
    <div class="login-container">
        <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="login-form">
            <h2 class="login-title">人事管理系统</h2>
            <el-form-item label="选择身份">
                <el-select v-model="form.identity" placeholder="请选择身份" style="width: 100%;">
                    <el-option  label="管理员" value="admin"></el-option>
                    <el-option label="员工" value="user"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input  type="password" v-model="form.password"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                form: {
                    username: "",
                    password: "",
                    identity: "admin",
                },
                userToken:'',
                rules: {
                    username: [
                        {required: true, message: "用户名不能为空", trigger: 'blur'},
                        {min: 3, message: "用户名大于3位", trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: "密码不能为空", trigger: 'blur'},
                        {min: 3, max: 10, message: "密码3-5位", trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                const me=this
                axios.post('http://localhost:8181/login',this.form).then(function (resp) {
                    if (resp.data.code=="200"){
                        sessionStorage.setItem('identity',resp.data.identity)
                        if (resp.data.identity=='admin'){
                            sessionStorage.setItem('user',resp.data.user)
                            sessionStorage.setItem('isLogin',true)
                            sessionStorage.setItem('dep',resp.data.dep)
                            sessionStorage.setItem("empId",resp.data.id)
                            me.$router.replace('/departmentInformation')

                        }else {
                            sessionStorage.setItem('user',resp.data.user)
                            sessionStorage.setItem('isLogin',true)
                            sessionStorage.setItem("empId",resp.data.emp.id)
                            sessionStorage.setItem("dep",resp.data.dep)
                            sessionStorage.setItem("pos",resp.data.pos)
                            console.log(sessionStorage.getItem("empId"))
                            me.$router.replace('/salaryInformation')
                        }

                    }else{
                        sessionStorage.setItem('isLogin',false)
                        me.$message({
                            showClose: true,
                            message: '登录失败',
                            type: 'error'
                        });
                    }
                        console.log(resp.data.code)
                })
                // if (this.form.username=='admin'&&this.form.password==='admin'){
                //     // alert(this.form.username)
                //     alert(this.form.identity)
                //     if (this.form.identity=='admin'){
                //
                //         this.$router.push('/departmentInformation')
                //     }else {
                //         this.$router.push('/userIndex')
                //     }
                // }else {
                //     this.$alert('账号或密码错误','登录失败',{
                //         confirmButtonText:'确定',
                //         // callback:action=>{
                //         //     this.$message({
                //         //         type: 'info',
                //         //         message: 'action:${action}'
                //         //     });
                //         // }
                //     })
                // }

                // this.$refs[formName].validate(valid => {
                //     // console.log(valid) 验证通过为true，有一个不通过就是false
                //     if (valid) {
                //         // 通过的逻辑
                //     } else {
                //         console.log('验证失败');
                //         return false;
                //     }
                // });
            }
        }
    };
</script>

<style acoped>
    .login-form {
        width: 350px;
        margin: 160px auto; /* 上下间距160px，左右自动居中*/
        /*background-color: rgb(255, 255, 255, 0.8); !* 透明背景色 *!*/
        padding: 30px;
        border-radius: 20px; /* 圆角 */

    }
    /* 背景 */
    .login-container {
        position: absolute;
        width: 100%;
        height: 100%;
        background: url('../assets/login.jpg');
        background-size: cover;
        -webkit-font-smoothing: antialiased;
    }

    /* 标题 */
    .login-title {
        color: #303133;
        text-align: center;
    }
</style> -->
