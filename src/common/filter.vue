
<script>

  //时间戳转换filter
  let dateChange = value=>{
    var date = new Date();
    date.setTime(value * 1000);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    return y + '-' + m + '-' + d;
  };

  //时间戳获取周几filter
  let weekChange = value=>{
    var week;
    var date = new Date();
    date.setTime(value * 1000);
    if(date.getDay() == 0) week = "星期日"
    if(date.getDay() == 1) week = "星期一"
    if(date.getDay() == 2) week = "星期二"
    if(date.getDay() == 3) week = "星期三"
    if(date.getDay() == 4) week = "星期四"
    if(date.getDay() == 5) week = "星期五"
    if(date.getDay() == 6) week = "星期六"
    return week;
  };

  //星期几的格式
  let weekFormat = value=>{
    var chnNumChar = ["一","二","三","四","五","六","日"];
    return '星期'+chnNumChar[value-1]
  };

  export default {
    dateChange,
    weekChange,
    weekFormat
  }
</script>

