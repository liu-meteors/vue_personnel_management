<template>
    <div class="login-container">
        <el-form ref="form" :rules="rules"  :model="form" label-width="80px" class="login-form">
            <h2 class="login-title" style="font-size:35px;text-align:right">人 事 管 理 系 统</h2>
            <el-form-item >
                <el-select v-model="form.identity"  style="width: 100%;">
                    <el-option  label="管理员" value="admin"></el-option>
                    <el-option label="员工" value="user"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="username" placeholder="请输入用户名">
                <el-input v-model="form.username"  placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password"  >
                <el-input  type="password" v-model="form.password" show-password placeholder="请输入密码"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('form')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import AESUntils from "../assets/js/AESUntils";
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
                    ],
                    password: [
                        {required: true, message: "密码不能为空", trigger: 'blur'},
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
                            if (resp.data.dep==1||resp.data.dep==0){
                                me.$router.replace('/employeeInformation')
                            }else {
                                me.$router.replace('/adminDepEmployeeInformation')
                            }


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
                        me.$notify.error({
                            title: '错误',
                            message: '登录失败'
                        });
                    }
                        console.log(resp.data.code)
                })
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
