<template>
  <div class="Home" >
    <mt-header class='esh-header' fixed title="首页"></mt-header>
    <div id="home-box">
      <div class="home-top">
        <div class="home-top-item home-news">2000 <b>新</b></div>
        <div class="home-top-item home-examine">1011 <b>待</b></div>
      </div>
      <div class="home-list" >
        <router-link :to="{path: '/Login/Home/List', query:{articleCategoryId: todo.id}}" v-for="todo in todos" tag='div' :key="todo.id" class="homt-item">
           <div class="icon" ></div>
           <div>{{ todo.text }}</div>
        </router-link>
      </div>
    </div>
  
  </div>
</template>

<script>
import logo from '../assets/logo3.png'
import { Toast } from 'mint-ui'
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      username: '',
      password: '',
      todos: [
      { text: '新闻资讯', id:1 },
      { text: '工程情况', id:15 },
      { text: '最新活动', id:19 },
      { text: '招标信息', id:38 },
      { text: '行业大事', id:39 },
      { text: '软文产品', id:40 },
      { text: '国家大事', id:41 },
      { text: '行业干货', id:42 },
      { text: '热点资讯', id:43 },
      { text: '搞笑美女', id:44 },
      { text: '工程信息', id:45 },
      { text: '求职招聘', id:46 },
      { text: '配件信息', id:48 },
      { text: '故障资讯', id:49 },
      { text: '美女热图', id:50 }
      ]

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
      Toast('登陆成功')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../sass/mixins.scss';
#home-box{
    position: relative;
    top: 40px;
    text-align:center;
}
.home-top{
  height:250px;
  width: 100%;
  background: url(../assets/bj3.jpg) center;
  background-size:cover;
  position: relative;
}
.home-top-item{
  height:100px;
  line-height: 100px;
  font-size: 2rem;
  font-weight: bold;
  width: 100px;
  position: absolute;
  top:50%;
  margin-top: -70px;
}
.home-top-item b{
    position: absolute;
  line-height: 2rem;
  text-align: center;
  height: 2rem;
  width: 2rem;
  border-radius:50%;
  top:0;
  right:0;
  font-size: 1.5rem;
  background-color:rgba(255,255,255,0.8);
}
.home-news{
  left:1rem;
  background: url(../assets/lv.gif) center;
  background-size:cover;
  color:#7cd43a;
}

.home-examine{
  right: 1rem;
  background: url(../assets/red.gif) center;
  background-size:cover;
  color:#ff6600;
}

.home-list{
  display:flex;
  flex-wrap:wrap;
  justify-content:space-around;
  background:#fff;
}

.homt-item{
  width:33%;
  margin:10px 0;
  height: 80px;
}
.homt-item .icon{
  height:60px;
  background: url(../assets/icon2.png) center;
  background-repeat:no-repeat;
}
$postionlist : (
    1:0px,
    2:-70px,
    3:-140px,
    4:-210px,
    5:-280px,
    6:-350px,
    7:-420px,
    8:-490px,
    9:-560px,
    10:-630px,
    11:-700px,
    12:-770px,
    13:-840px,
    14:-910px,
    15:-980px);
@each $i, $postion in $postionlist {
    .home-list .homt-item:nth-child(#{$i}) .icon {
       background-position-y: $postion;
    }
}
</style>
