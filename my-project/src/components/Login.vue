<template>
  <div class="login" >
    <mt-header class='esh-header' fixed title="登陆"></mt-header>
    <div class="loginBox">
      <img src="../assets/logo2.png" alt="" class="login-icon">
      <div class="login-form">
        <mt-field label="用户名" placeholder="请输入用户名" v-model="username" class="logininput"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password" class="logininput"></mt-field>
       <mt-button type="primary" class="login-button" @click="go()">登陆</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      username: '',
      password: ''

    }
  },
  methods: {
    go () {
      console.log(this.username)
      console.log(this.password)
      if (this.username !== 'esh') {
        Toast('用户不存在')
        return false
      }
      if (this.password !== '123456') {
        Toast('密码不正确')
        return false
      }
      this.$router.push('/Login/Home')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login{ 
  min-height: 100vh;
  background: url(../assets/bj1.jpg);
  background-size:cover;
  text-align:center;
}
.loginBox{
  position: relative;
  top: 3rem;
  .login-icon{
    margin-top: 2rem;
  }
  .login-form{
    width: 80%;
    margin:0 auto;
    margin-top: 2rem;
    background:#ecf6fb;
    padding: 1rem;
    border-radius:20px;
    border: 2px solid #333;
  }
  .login-button {
    margin-top: 1rem;
    height: 2rem;
  }
}
</style>
