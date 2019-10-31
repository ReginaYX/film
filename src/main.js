// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../theme/index.css';
import ElementUI from 'element-ui';
import Vue from 'vue'
import App from './App'
import "./fonts/iconfont/iconfont.css";
import router from './router'
import axios from 'axios';
import "babel-polyfill";
import Qs from 'qs'
import $ from 'jquery'
import VueAreaLinkage from 'vue-area-linkage';//省市区三级联动选择器
import '../static/pagewalkthrough/jquery.pagewalkthrough.js'//新手引导
import VueIntro from 'vue-introjs';//新手引导
import 'intro.js/introjs.css';
import noAccess from './common/noAccess/';
import VueWorker from 'vue-worker';
import filter from './common/filter';
import VXETable from 'vxe-table';
import 'vxe-table/lib/index.css';
import MetaInfo from 'vue-meta-info'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)
Vue.use(MetaInfo)
Vue.use(VXETable);
Vue.use(noAccess);
Vue.prototype.$axios = axios;
Vue.use(VueWorker);
axios.defaults.baseURL = '/api'
// import Vuex from 'vuex';
// Vue.use(Vuex);
// import store from './vuex/vuex';
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueAreaLinkage);
Vue.use(VueIntro, {
    waitTimeout: 400
});
// Vue.use(VueResource)
// 全局导入过滤器
Object.keys(filter).forEach(key => Vue.filter(key, filter[key]));


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  render: h => h(App),
  template: '<App/>',
  components: { App },
    mounted () {
        document.dispatchEvent(new Event('render-event'))
    }

})
router.beforeEach((to, from, next) => {
    // window.document.title = to.meta.title;
    // next()
    document.title = to.meta.title || '【非幕制片】剧组制片云管理平台、一键生成统筹表通告单'
    document.querySelector('meta[name="keywords"]').setAttribute('content', to.meta.keywords || '')
    document.querySelector('meta[name="description"]').setAttribute('content', to.meta.description || '非幕制片统筹系统是根据制片管理经验设计的一款剧组云管理平台，上传电影/电视剧/网剧/网大剧本一键生成统筹表、分场景表、人物戏量统计表、通告单。智能科学的管理剧组，提高剧组拍摄效率。设计灵感来源于movie magic scheduling budgeting。帮助制片人、导演、制片主任合理安排拍摄计划，节省预算，完成电影、电视剧拍摄任务。')
    next()
})





