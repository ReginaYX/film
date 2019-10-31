import Vue from 'vue';
import {post,get} from './index'
Vue.prototype.$post=post;
Vue.prototype.$get=get;

//获取用户信息
const loginURL = '/user/info';
export const userApi = ()=> {
  return Vue.prototype.$get(loginURL,{"user_id":JSON.parse(localStorage.user_id)})
};
