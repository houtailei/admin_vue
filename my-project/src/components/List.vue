<template>
<div class="Home">
  <mt-header class='esh-header' fixed title="新闻列表">
    <router-link to="/Login/Home" slot="left">
      <mt-button icon="back"></mt-button>
    </router-link>
    <mt-button slot="right"></mt-button>
  </mt-header>
  <div id="home-box">
    <div class="filter">
      <mt-button @click.native="auditStatus_handleClick">{{ auditStatus.text }}<img src="../assets/bottom.png" height="10" width="20" slot="icon">
      </mt-button>
      <mt-button @click.native="reading_handleClick">{{ reading.text }}<img src="../assets/bottom.png" height="10" width="20" slot="icon">
      </mt-button>
    </div>
    <mt-popup class='esh-popup-button' v-model="auditStatus_popupVisible" position="bottom">
      <div class="picker-toolbar">
        <span class="mint-datetime-action mint-datetime-cancel" @click="auditStatus_cancleaddress">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="auditStatus_selectaddress">确定</span>
      </div>
      <mt-picker value-key="text" :slots="auditStatus_slots" :visibleItemCount=3 @change="auditStatus_onValuesChange"></mt-picker>
    </mt-popup>
    <mt-popup class='esh-popup-button' v-model="reading_popupVisible" position="bottom">
      <div class="picker-toolbar">
        <span class="mint-datetime-action mint-datetime-cancel" @click="reading_cancleaddress">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="reading_selectaddress">确定</span>
      </div>
      <mt-picker value-key="text" :slots="reading_slots" :visibleItemCount=3 @change="reading_onValuesChange"></mt-picker>
    </mt-popup>
    <img :src="nodataimg" alt="" style="width:100%;" v-if="nodata">
    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="200" infinite-scroll-immediate-check="false">
      <router-link :to="{path: '/Login/Home/List/Detail', query:{id: item.id}}" v-for="item in list['articleCategoryId_'+articleCategoryId].list" tag='li' :key="item.id" class="shop_li" keep-alive>
        <section>
          <img :src="item.image" :onerror="logo" class="shop_img">
        </section>
        <hgroup class="list_right">
          <h4 :class="item.top? 'premium': ''" class="" class="list_title ellipsis">{{item.title}}</h4>
          <div class="item_box">
            <div class="item_articleCategory"><span style="color:#3190e8;border:1px solid #3190e8;">{{item.categoryName}}</span></div>
            <div class="item_browseTimes">阅读量：<b>{{item.browseTimes}}</b></div>
          </div>
          <div class="item_box">
            <div class="item_reviewStatusName">
              <span style="color:#7cd43a;border:1px solid #7cd43a;" v-if="item.reviewStatus === '2'">{{item.reviewStatusName}}</span>
              <span style="color:red;border:1px solid red;" v-else-if="item.reviewStatus === '3'">{{item.reviewStatusName}}</span>
              <span v-else style="color:#ff6600;border:1px solid #ff6600;">{{item.reviewStatusName}}</span>
            </div>
            <div class="item_createTime">{{item.updateTime}}</div>
          </div>
        </hgroup>
      </router-link>
    </ul>
  </div>

</div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex';
import {
  Indicator
} from 'mint-ui';
import {
  Toast
} from 'mint-ui'
export default {
  name: 'list',
  data() {
    return {
      //封面图
      logo: 'this.src="' + require('../assets/noimg.png') + '"',
      nodataimg: require('../assets/nodata.png'),
      login: false,
      params: {
        sort: "updateTime,desc",
        pageIndex: 1,
        category: "1",
        pageSize: 15,
        reviewStatus: ""
      },
      auditStatus_slots: [{
        flex: 1,
        values: [{
          text: '未审核',
          value: 1
        }, {
          text: '审核通过',
          value: 2
        }, {
          text: '不通过',
          value: 3
        }],
        className: 'slot1',
        textAlign: 'center'
      }],
      auditStatus_popupVisible: false,
      auditStatus: {
        text: "审核状态",
        value: 1
      },
      reading_slots: [{
        flex: 1,
        values: [{
          text: '阅读量-不排序',
          value: 1
        }, {
          text: '阅读量-倒序',
          value: 2
        }, {
          text: '阅读量-正序',
          value: 3
        }],
        className: 'slot1',
        textAlign: 'center'
      }],
      reading_popupVisible: false,
      reading: {
        text: "阅读量",
        value: 1
      }
    }
  },
  created() {
    // this.params.articleCategoryId=this.$route.query.articleCategoryId;
    this.$store.commit("UPDATECATEGORYID", this.$route.query.articleCategoryId)
    if (this.list['articleCategoryId_' + this.articleCategoryId].list == "") {
      console.log("无数据");
      this.getList();
    } else {
      console.log("有数据,不重新加载");
      let sort = this.list['articleCategoryId_' + this.articleCategoryId].params.sort;
      if (sort == "browseTimes,desc") {
        this.reading = this.reading_slots[0].values[1]
      } else if (sort == "browseTimes,asc") {
        console.log("111")
        this.reading = this.reading_slots[0].values[2]
      } else {
        console.log("1121")
        this.reading = {
          text: "阅读量",
          value: 1
        }
      }
      let reviewStatus = this.list['articleCategoryId_' + this.articleCategoryId].params.reviewStatus;
      if (reviewStatus == "2") {
        this.auditStatus = this.auditStatus_slots[0].values[1]
      } else if (reviewStatus == "3") {
        this.auditStatus = this.auditStatus_slots[0].values[2]
      } else if (reviewStatus == "1") {
        this.auditStatus = this.auditStatus_slots[0].values[0]
      } else {
        this.auditStatus = {
          text: "审核状态",
          value: 0
        };
      }
    }
  },
  computed: mapState(["baseURL", "list", "articleCategoryId", "nodata","login"]),
  methods: {
    ...mapActions(["getList", "getMoreList"]),
    auditStatus_onValuesChange(picker, values) {
      this.auditStatus.value = picker.getValues()[0].value;
      console.log(this.$route)
    },
    auditStatus_handleClick() {
      this.auditStatus_popupVisible = true;
    },
    auditStatus_selectaddress() {
      this.auditStatus.text = this.auditStatus_slots[0].values[this.auditStatus.value - 1].text;
      this.auditStatus_popupVisible = false;
      // this.params.reviewStatus=this.auditStatus.value
      let aud = this.auditStatus.value
      this.$store.commit("UPDATEPARAMS_REVIEWSTATUS", this.auditStatus.value)
      this.getList();
    },
    auditStatus_cancleaddress() {
      this.auditStatus_popupVisible = false;
    },
    reading_onValuesChange(picker, values) {
      this.reading.value = picker.getValues()[0].value;
    },
    reading_handleClick() {
      this.reading_popupVisible = true;
    },
    reading_selectaddress() {
      this.reading.text = this.reading_slots[0].values[this.reading.value - 1].text;
      this.reading_popupVisible = false;
      if (this.reading.value == "2") {
        this.$store.commit("UPDATEPARAMS_SORT", "browseTimes,desc")
      } else if (this.reading.value == "3") {
        this.$store.commit("UPDATEPARAMS_SORT", "browseTimes,asc")
      } else {
        this.$store.commit("UPDATEPARAMS_SORT", "updateTime,desc")
      }
      this.getList();
    },
    reading_cancleaddress() {
      this.reading_popupVisible = false;
    },
    // 滚动加载
    loadMore() {
        this.getMoreList();
    }
  },
  mounted() {
    let scr = this.list['articleCategoryId_' + this.articleCategoryId].hig
    window.scrollTo(0, scr);
  },
  beforeRouteLeave(to, from, next) {
    //离开前记录高度传给vuex
    this.$store.commit("UPDATEHig", document.body.scrollTop)
    next(vm => {
      // 通过 `vm` 访问组件实例
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../sass/mixins.scss';
#home-box {
    position: relative;
    top: 40px;
}
.home-top {
    height: 250px;
    width: 100%;
    background: url("../assets/bj3.jpg") center;
    background-size: cover;
    position: relative;
}
.home-top-item {
    height: 100px;
    line-height: 100px;
    font-size: 2rem;
    font-weight: bold;
    width: 100px;
    position: absolute;
    top: 50%;
    margin-top: -70px;
}
.home-top-item b {
    position: absolute;
    line-height: 2rem;
    text-align: center;
    height: 2rem;
    width: 2rem;
    border-radius: 50%;
    top: 0;
    right: 0;
    font-size: 1.5rem;
    background-color: rgba(255,255,255,0.8);
}
.home-news {
    left: 1rem;
    background: url("../assets/lv.gif") center;
    background-size: cover;
    color: #7cd43a;
}

.home-examine {
    right: 1rem;
    background: url("../assets/red.gif") center;
    background-size: cover;
    color: #ff6600;
}

.home-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.homt-item {
    text-align: center;
    width: 33%;
    margin: 10px 0;
    height: 80px;
    img {
        width: 80%;
        height: 60px;
    }
    div {
        text-align: center;
    }
}

.filter {
    display: flex;
    button {
        @include flexScale(1);
    }
}
.shop_li {
    display: flex;
    border-bottom: 1px solid #ddd;
    padding: 10px;
    img {
        margin-right: 10px;
        @include wh(80px,80px);
    }
    .list_right {
        @include flexScale(1);
        @include fj(space-around);
        flex-direction: column;
        width: 1px;
    }
}

.list_right .list_title {
    width: 100%;
    color: #333;
    padding-top: 0.01rem;
    font: 14px "PingFangSC-Regular";
    font-weight: 700;
    margin: 0;
    text-align: left;

}
.list_right .premium::before {
    content: '\7f6e\9876';
    display: inline-block;
    font-size: 14px;
    line-height: 14px;
    color: red;
    background-color: #ddd;
    padding: 0 0.1rem;
    border-radius: 0.1rem;
    margin-right: 0.2rem;
}
.ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.item_box {
    font: 14px "PingFangSC-Regular";
    display: flex;
    flex-wrap: wrap;
    @include fj(space-around);
    div {
        @include flexScale(1);
    }
    .item_browseTimes,
    .item_createTime {
        @include flexScale(2);
    }
    span {
        padding: 0 2px;
    }

}
</style>
