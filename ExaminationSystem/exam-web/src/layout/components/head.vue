<template>
  <div id="head">
    <div class="title">
      <h2 v-if="this.sf=='学生'">考试系统</h2>
      <h2 v-if="this.sf=='老师'">出题系统</h2>
      <h2 v-if="this.sf=='管理员'">账户管理</h2>
    </div>
    <div class="nav">
        <el-menu :default-active="activeIndex"
        class="el-menu-demo" mode="horizontal" router
        active-text-color="#000" background-color="#B3C0D1"
        @select="handleSelect">
          <el-menu-item index="/">首页</el-menu-item>
          <el-submenu v-if="this.sf=='学生'" index="2">
            <template slot="title">在线考试</template>
            <el-menu-item index="/practice">自主练习</el-menu-item>
            <el-menu-item index="/exam">课程考试</el-menu-item>
          </el-submenu>
          <el-submenu v-if="this.sf=='老师'" index="3">
            <template slot="title">试卷管理</template>
            <el-menu-item index="/makepaper">出试卷</el-menu-item>
            <el-menu-item index="/mangerpaper">未考试卷</el-menu-item>
          </el-submenu>
          <el-menu-item v-if="this.sf=='学生'" index="/achievement">成绩查询</el-menu-item>
          <el-menu-item v-if="this.sf=='老师'" index="/correctpaper">批改试卷</el-menu-item>
          <el-menu-item v-if="this.sf=='管理员'" index="/accountlist">账户列表</el-menu-item>
          <el-menu-item v-if="this.sf=='管理员'" index="/addaccount">添加账户</el-menu-item>
        </el-menu>
    </div>
    <div class="operate">
      <div class="login" >
        <div class= "icon login_icon"></div> <p>欢迎！{{this.name}}</p>
      </div>
      <!-- <div class="login" @click="jumpRegister()">
        <div class= "icon register_icon" ></div> <p>注册</p>
      </div> -->
      <div class="login" @click="exit()">
        <div class= "icon cancel_icon"></div> <p class="p">注销</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import servicePath from "@/config/ApiUrl"
export default {
  name: 'Head',
  data () {
    return {
      activeIndex: '/',
      sf: '',
      name: ''
    }
  },
  created() {
    this.sf = localStorage.getItem('sf');
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
        // console.log(this.$route.params);
        // const number = this.$route.params.number;
        const number = localStorage.getItem("username");
        axios({
          method: 'GET',
          url: servicePath.getUserInfo,
          params: {
            number: number,
            sf: this.sf
          },
          withCredentials: true
        }).then(res => {
          // console.log(res);
          this.name = res.data.data[0].name;
        })
      },
    handleSelect (key, keyPath) {
      // console.log(key, keyPath);
    },
    // jumpInfo() {
    //   this.$router.push({name:'Login'});
    // },
    // jumpRegister() {
    //   this.$router.push({name:'Register'});
    // },
    exit() {
      this.$router.push({name:'Login'});
      localStorage.clear();
    }
  }
}
</script>

<style scoped>
#head {
  min-width: 800px;
  height: 100%;
  display: flex;
}
.title {
  height: 100%;
  line-height: 100%;
  vertical-align: middle;
  width: 30%;
  min-width: 200px;
}
.nav {
  min-width: 300px;
  width: 30%;
  margin-left: 10vw;
  /* margin-right: 20%; */
}
.el-menu {
  background-color:unset;
}
.operate{
  width: 35%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: right;
  /* position: relative; */
  /* left: 20%; */
}
.operate .login {
  display: flex;
  /* width: 90px; */
  height: 25px;
  font-size: 14px;
  margin-left: 20px;
  /* line-height: 20px;
  vertical-align: middle; */
}
.login .icon {
  width: 25px;
  height: 25px;
  background-size: 25px;
}
.login .login_icon {
  background-image: url("../../assets/login_press.png");
}
/* .login .register_icon {
  background-image: url("../../assets/register.png");
} */
.login .cancel_icon {
  background-image: url("../../assets/cancel_press.png");
}
.login p{
  margin: 0;
  height: 25px;
  line-height: 25px;
  vertical-align: middle;
  padding-left: 5px;
  color: black;
}
/* .login:hover .login_icon{
  background-image: url("../../assets/login_press.png");
} */
/* .login:hover .register_icon{
  background-image: url("../../assets/register_press.png");
} */
.login:hover .cancel_icon{
  background-image: url("../../assets/cancel.png");
}
.login:hover .p {
  color: #909399;
}
</style>
