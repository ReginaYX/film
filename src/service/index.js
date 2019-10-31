import axios from 'axios';
import router from 'vue-router'

/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
      .then(response => {
        if(response.data.ret == 0){
          //返回成功处理  这里传的啥 后续调用的时候 res就是啥
          resolve(response.data.data);//我们后台所有数据都是放在返回的data里所以这里统一处理了
        }else{
          //错误处理
          this.$message(response.data.msg);
        }
      })
      .catch(err => {
        reject(err);
        let message = '请求失败！请检查网络';
        //错误返回
        if(err.response)message=err.response.data.message;
        this.$message(message);
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.post(url,data)
      .then(response => {
        if(response.data.ret == 0){
          resolve(response.data.data);
        }else{
          this.$message(response.data.msg);
        }
      },err => {
        reject(err);
        let message = '请求失败！请检查网络';
        if(err.response)message=err.response.data.message;
        this.$message(message);
      })
  })
}
