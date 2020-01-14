<template>
  <div class="header">
    <a href="#/">
      <img class="logo" src="@/assets/logo.png" width="30px" />
      <span class="title">Leo 信息管理系统</span>
    </a>

    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        下拉菜单
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-edit" command="modify-password">修改密码</el-dropdown-item>
        <el-dropdown-item icon="el-icon-s-unfold" command="logout">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { logout } from "@/api/login";

export default {
  methods: {
    handleCommand(command) {
      switch (command) {
        case "modify-password":
          this.$message({
            message: "修改密码！",
            type: "warning"
          });
          break;
        case "logout":
          logout(localStorage.getItem("leo-msm-token")).then(repsonse => {
            const reps = repsonse.data;
            if (reps.flag) {
              localStorage.removeItem("leo-msm-token");
              localStorage.removeItem("leo-msm-userinfo");
              this.$router.push("/login");
            } else {
              this.$message({
                message: reps.message,
                type: "warning"
              });
            }
          });
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style scoped>
.logo {
  vertical-align: middle;
  padding: 0px 10px 0px 40px;
}
.title {
  position: absolute;
  vertical-align: middle;
  font-size: 25px;
  color: white;
  margin-left: 10px;
}
.el-dropdown {
  float: right;
  margin-right: 30px;
}
.el-dropdown-link {
  color: white;
  cursor: pointer;
}
</style>