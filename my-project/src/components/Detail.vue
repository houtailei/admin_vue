<template>
  <div class="Home" >
    <mt-header class='esh-header' fixed title="文章详情">
      <span slot="left" @click="$router.go(-1)">
          <i class="mintui mintui-back"></i>
        </span>
      <mt-button slot="right"></mt-button>
    </mt-header>
    <div id="home-box">
      <div class="article">
        <div class="title">
          {{article.title}}
        </div>
        <div class="author">
            {{article.createTime}}&nbsp;&nbsp;阅读量：{{article.browseTimes}}
        </div>
        <div class="content" v-html="article.content">
        </div>
      </div>
      <div class="fiexBottom">
        <div class="switch-box">
          <mt-switch v-model="reviewStatus.type" @change="reviewStatus_Change">{{reviewStatus.text}}</mt-switch>
          <mt-switch v-model="top.type" @change="top_Change">{{top.text}}</mt-switch>
          <mt-button type="primary" @click.native="savaClick">保存</mt-button>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
import {mapState,mapActions} from 'vuex';
export default {
  name: 'detail',
  data () {
    return {
      reviewStatus:{text:"未审核",type:false},
      top:{text:"未置顶",type:false},
      article:{}
  }
},
created() {
      this.fetchData();
},
  computed:mapState(["baseURL","list","articleCategoryId","nodata"]),
  methods: {
    ...mapActions(["postData"]),
    fetchData() {
      let params=this.$route.query.id
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      let thisvue=this
      this.$http.get(thisvue.baseURL+'/SysArticle/Update/'+params)
      .then(function (response) {
           console.log("调用成共");
           let data=response.data.data
           thisvue.article=data;
           if(data.top){
            thisvue.top={text:"置顶",type:true};
           }else{
            thisvue.top={text:"未置顶",type:false};
           }
           if(data.reviewStatus=="2"){
            thisvue.reviewStatus={text:"已审核",type:true};
           }else if(data.reviewStatus=="1"){
            thisvue.reviewStatus={text:"未审核",type:false};
           }else{
            thisvue.reviewStatus={text:"审核不通过",type:false};
           }
           Indicator.close();

      })
      .catch(function (response) {
        console.log("调用失败");
        console.log(response.data);
        Indicator.close();
      });
    },
    reviewStatus_Change(){
      if(this.reviewStatus.type){
          this.reviewStatus.text="审核通过";
          this.article.reviewStatusName="审核通过";
          this.article.reviewStatus="2"
      }else{
          this.reviewStatus.text="审核不通过";
          this.article.reviewStatusName="审核不通过";
          this.article.reviewStatus="3"
      }
    },
    top_Change(){
      if(this.top.type){
          this.top.text="置顶";
          this.article.top=true;
      }else{
          this.top.text="未置顶";
           this.article.top=false;
      }
    },
    savaClick(){
      let thisvue=this
      var params = new URLSearchParams();
      params.append('id', this.article.id);
      params.append('type', this.article.type);
      params.append('title', this.article.title);
      params.append('articleCategoryId', this.article.articleCategoryId);
      params.append('image', this.article.image);
      params.append('description', this.article.description);
      params.append('content', this.article.content);
      params.append('updateUserId', this.article.updateUserId);
      params.append('top', this.article.top);
      if(this.article.reviewStatus!="1"){
        params.append('reviewStatus', this.article.reviewStatus);
        params.append('reviewUserId', this.article.reviewUserId);
      }
      if(this.$store.dispatch('postData',params)){
        this.$store.commit("UPDATENOLISTDATA",this.article)
         this.$router.go(-1)
      }

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

.article {
  .title {
    height: auto;
    line-height: 20px;
    font-size: 30px;
    margin: 10px 0;
    text-align: center;
    color: #333;
    font-weight: bold;
    padding: 0 20px;
    font-size: 20px;
  }
  .author{
    text-align:center;
  }
  .content{
    border-top:1px solid #ddd;
    padding:10px;
    margin-top:10px;
    padding-bottom:62px;
    font-size:12px !important;
  }
}

.fiexBottom{
  border-top:1px solid #26a2ff;
  position: fixed;
  bottom:0;
  left:0;
  background:#fff;
  width:100%;
  padding: 10px;
  .switch-box{
    @include fj();
    .mint-switch{
      justify-content:center;
      @include flexScale(1);

    }

  }
}
</style>
