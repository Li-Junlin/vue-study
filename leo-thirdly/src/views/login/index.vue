<template>
  <div class="login-container">
    <el-form ref="form" :rules="rules" :model="form" label-width="60px" class="login-form">
      <h2 class="login-title">信息管理系统</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login, getUserInfo } from "@/api/login";

export default {
  data() {
    return {
      form: {
        name: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // 1、调用登录接口
        login(this.form.username, this.form.password).then(repsonse => {
          console.log("login", repsonse.data);
          const loginData = repsonse.data;
          // 2、判断是否登录成功
          if (loginData.flag) {
            // 2.1、登录成功获取用户信息
            getUserInfo(loginData.data.token).then(repsonse => {
              console.log("getUserInfo", repsonse.data);
              const userInfo = repsonse.data;
              // 3、判断获取用户信息是否成功
              if (userInfo.flag) {
                // 3.1、获取用户成功保存token与用户信息后跳转首页
                localStorage.setItem("leo-msm-token", loginData.data.token);
                localStorage.setItem(
                  "leo-msm-userinfo",
                  JSON.stringify(userInfo.data)
                );
                this.$router.push("/");
              } else {
                // 3.2、获取用户信息失败弹出提示
                this.$message({
                  message: "获取用户信息失败，请稍后再试！",
                  type: "warning"
                });
              }
            });
          } else {
            // 2.2、登录失败弹出提示框
            this.$message({
              message: "登录失败，请稍后再试！",
              type: "warning"
            });
          }
        });
      });
    }
  }
};
</script>

<style scoped>
.login-form {
  width: 350px;
  margin: 160px auto;
  background-color: rgb(255, 255, 255, 0.8);
  padding: 30px;
  border-radius: 20px;
}

.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/login_background_image.jpg");
  background-size: cover;
}

.login-title {
  color: #303133;
  text-align: center;
}
</style>>

</style>