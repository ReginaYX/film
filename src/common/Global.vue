<script>
  import axios from "axios"

  //环境地址
  const pathInfo = 'https://service.test.filmptn.com';

  //上传接口
  function upLoad(file){
    const formData = new FormData();
    formData.append('files',file.file);
    formData.append('user_id',JSON.parse(localStorage.user_id))
    return  axios({
      method: 'post',
      url: '/file/upload',
      data:formData
    }).then(res => res.data)
  }

  /*验证手机号*/
  const isPhone= (rule, value, callback) => {
    if(value != null && value != "") {
      if(/^([0-9]{3,4}-)?[0-9]{7,8}$/.test(value)||/^0?1[3|4|5|8][0-9]\d{8}$/.test(value) == false) {
        callback(new Error('您输入的号码不正确'))
      } else {
        callback()
      }
    }
    else{
      callback();
    }
  };

  /*车牌号验证*/
  const isCarNum= (rule, value, callback) => {
    if(value != null && value != "") {
      if(/(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/.test(value) == false) {
        callback(new Error('您输入的车牌号不正确'))
      } else {
        callback()
      }
    }
    else{
      callback();
    }
  };

    export default {
      pathInfo,
      upLoad,
      isCarNum,
      isPhone
    }
</script>
