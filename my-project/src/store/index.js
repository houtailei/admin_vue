import Vue from 'vue'
import Vuex from 'vuex';
import axios from 'axios'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: { //放置state的值
    //是否正在进行数据加载
    login: true,
    //是否正在刷新
    istop:true,
    nodata: false,
    articleCategoryId: "1",
    baseURL: "http://60.205.140.180",
    list: {
      articleCategoryId_1: {
        hig: 0,
        list: "",
        params: {
          articleCategoryId: 1,
          sort: "updateTime,desc",
          pageIndex: 1,
          category: "1",
          pageSize: 15,
          reviewStatus: ""
        }
      },
      articleCategoryId_15: {
        hig: 0,
        list: "",
        params: {
          articleCategoryId: 15,
          sort: "updateTime,desc",
          pageIndex: 1,
          category: "1",
          pageSize: 15,
          reviewStatus: ""
        }
      },
      articleCategoryId_19: {
        hig: 0,
        list: "",
        params: {
          articleCategoryId: 19,
          sort: "updateTime,desc",
          pageIndex: 1,
          category: "1",
          pageSize: 15,
          reviewStatus: ""
        }
      },
      articleCategoryId_38: {
        hig: 0,
        list: "",
        params: {
          articleCategoryId: 38,
          sort: "updateTime,desc",
          pageIndex: 1,
          category: "1",
          pageSize: 15,
          reviewStatus: ""
        }
      },
      articleCategoryId_39: {
        hig: 0,
        list: "",
        params: {
          articleCategoryId: 39,
          sort: "updateTime,desc",
          pageIndex: 1,
          category: "1",
          pageSize: 15,
          reviewStatus: ""
        }
      },
      articleCategoryId_40: {
        hig: 0,
        list: "",
        params: {
          articleCategoryId: 40,
          sort: "updateTime,desc",
          pageIndex: 1,
          category: "1",
          pageSize: 15,
          reviewStatus: ""
        }
      },
      articleCategoryId_41: {
        hig: 0,
        list: "",
        params: {
          articleCategoryId: 41,
          sort: "updateTime,desc",
          pageIndex: 1,
          category: "1",
          pageSize: 15,
          reviewStatus: ""
        }
      },
      articleCategoryId_42: {
        hig: 0,
        list: "",
        params: {
          articleCategoryId: 42,
          sort: "updateTime,desc",
          pageIndex: 1,
          category: "1",
          pageSize: 15,
          reviewStatus: ""
        }
      },
      articleCategoryId_43: {
        hig: 0,
        list: "",
        params: {
          articleCategoryId: 43,
          sort: "updateTime,desc",
          pageIndex: 1,
          category: "1",
          pageSize: 15,
          reviewStatus: ""
        }
      },
      articleCategoryId_44: {
        hig: 0,
        list: "",
        params: {
          articleCategoryId: 44,
          sort: "updateTime,desc",
          pageIndex: 1,
          category: "1",
          pageSize: 15,
          reviewStatus: ""
        }
      },
      articleCategoryId_45: {
        hig: 0,
        list: "",
        params: {
          articleCategoryId: 45,
          sort: "updateTime,desc",
          pageIndex: 1,
          category: "1",
          pageSize: 15,
          reviewStatus: ""
        }
      },
      articleCategoryId_46: {
        hig: 0,
        list: "",
        params: {
          articleCategoryId: 46,
          sort: "updateTime,desc",
          pageIndex: 1,
          category: "1",
          pageSize: 15,
          reviewStatus: ""
        }
      },
      articleCategoryId_47: {
        hig: 0,
        list: "",
        params: {
          articleCategoryId: 47,
          sort: "updateTime,desc",
          pageIndex: 1,
          category: "1",
          pageSize: 15,
          reviewStatus: ""
        }
      },
      articleCategoryId_48: {
        hig: 0,
        list: "",
        params: {
          articleCategoryId: 48,
          sort: "updateTime,desc",
          pageIndex: 1,
          category: "1",
          pageSize: 15,
          reviewStatus: ""
        }
      },
      articleCategoryId_49: {
        hig: 0,
        list: "",
        params: {
          articleCategoryId: 49,
          sort: "updateTime,desc",
          pageIndex: 1,
          category: "1",
          pageSize: 15,
          reviewStatus: ""
        }
      },
      articleCategoryId_50: {
        hig: 0,
        list: "",
        params: {
          articleCategoryId: 50,
          sort: "updateTime,desc",
          pageIndex: 1,
          category: "1",
          pageSize: 15,
          reviewStatus: ""
        }
      }
    },
  },
  getters: { //放置getters方法
  },
  mutations: { //放置mutations方法
    INCREMENTVALUE(state, data) {
      console.log("这里是mutations" + data);
      let item = "articleCategoryId_" + state.articleCategoryId;
      console.log(state.list[item])
      state.list[item].list = data;
    },
    MOREVALUE(state, data) {
      console.log("下拉：" + data);
      let item = "articleCategoryId_" + state.articleCategoryId;
      for (var i = 0; i < data.length; ++i) {
        state.list[item].list.push(data[i]);
      }
    },
    UPDATECATEGORYID(state, data) {
      console.log("变化" + data)
      state.articleCategoryId = data;
    },
    UPDATEHig(state, data) {
      console.log("高度调用了" + data)
      let item = "articleCategoryId_" + state.articleCategoryId;
      state.list[item].hig = data;
    },
    UPDATEPARAMS_REVIEWSTATUS(state, data) {
      let item = "articleCategoryId_" + state.articleCategoryId;
      state.list[item].params.reviewStatus = data;
    },
    UPDATEPARAMS_SORT(state, data) {
      let item = "articleCategoryId_" + state.articleCategoryId;
      state.list[item].params.sort = data;
    },
    UPDATELogin(state, data) {
      state.login = data;
    },
    UPDATETOP(state,data){
      state.istop=data;
    },
    UPDATENODATA(state, data) {
      state.nodata = data;
    },
    UPDATENOLISTDATA(state, data) {

      console.log("当前ID为："+data.id)
      let thisid = data.id
      let thistop = data.top
      let thisreviewStatus = data.reviewStatus
      let thisreviewStatusName = data.reviewStatusName
      let item = "articleCategoryId_" + state.articleCategoryId;
      let num;
      let ary = state.list[item].list;
      console.log(thistop + thisreviewStatus + thisreviewStatusName)
      for (var i = 0; i<ary.length - 1; i++) {
        if (ary[i].id == thisid) {
          num = i;
        }
      }
      console.log("号为" + num)
      console.log("当前置顶为"+thistop)
      state.list[item].list[num].top=thistop
      state.list[item].list[num].reviewStatus=thisreviewStatus
      state.list[item].list[num].reviewStatusName=thisreviewStatusName
    }

  },
  // 异步的数据操作
  actions: {

    postData({
      commit
    }, params) {

      axios.post(store.state.baseURL + '/SysArticle/Update', params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(function(response) {
          if (response.data.success) {
            console.log("成功")
            commit("UPDATELogin", true)
          }
        })
        .catch(function(response) {
          return false;
        });


    },
    getList({
      commit
    }) {
      if (store.state.login) {
        commit("UPDATELogin", false)
        commit("UPDATETOP", true)
        let item = "articleCategoryId_" + store.state.articleCategoryId;
        store.state.list[item].params.pageIndex = 1;
        axios.get(store.state.baseURL + '/SysArticle/Index', {
            params: store.state.list[item].params
          })
          .then(function(response) {
            //分页加一
            store.state.list[item].params.pageIndex = store.state.list[item].params.pageIndex + 1;
            let data = response.data.data
            if (data.length > 0) {
              commit("UPDATENODATA", false)
            } else {
              commit("UPDATENODATA", true)
            }
            commit("INCREMENTVALUE", data)
            commit("UPDATELogin", true)
            commit("UPDATETOP", false)

          })
          .catch(function(response) {
            console.log("调用失败");
            return false;

          });
      }
    },
    getMoreList({
      commit
    }) {
      if (store.state.login) {
        commit("UPDATELogin", false)
        console.log("调用getMoreList");
        let item = "articleCategoryId_" + store.state.articleCategoryId;
        axios.get(store.state.baseURL + '/SysArticle/Index', {
            params: store.state.list[item].params
          })
          .then(function(response) {
            store.state.list[item].params.pageIndex = store.state.list[item].params.pageIndex + 1;
            console.log("调用成共");
            let data = response.data.data;
            commit("MOREVALUE", data)
            commit("UPDATELogin", true)
            return "success"
          })
          .catch(function(response) {
            console.log("调用失败");
          });
      }
    }
  }
});
export default store;
