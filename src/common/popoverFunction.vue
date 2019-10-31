<template>
  <div>
    <el-popover
      :placement="placement"
      width="88" :visible-arrow="false"
      :trigger="trigger" popper-class="popoverBtnBox">
      <div class="popoverBtn" @click="rename" v-if="editBtn">
        <i :class="['iconfont',icon]"></i>{{first}}
      </div>
      <div class="popoverBtn" @click="dele">
        <i class="iconfont icondelete"></i>删除
      </div>
      <div slot="reference" class="titleName" v-html="title"></div>
    </el-popover>
    <!--无权限弹框-->
    <no-access :noAccessVisible="noAccess" @close="(v)=>{noAccess = v}"></no-access>
  </div>
</template>

<script>
    export default {
        name: "popoverFunction",
        data(){
          return{
            noAccess:false
          }
        },
        // props: ['msg','title','icon','first','placement'],
        props:{
          msg:String,
          title:String,
          icon:String,
          authId:Number,
          first:{
            default: '编辑',
            type: String
          },
          placement:{
            default: 'bottom',
            type: String
          },
          trigger:{
            default: 'click',
            type: String
          },
          editBtn:{
            default: true,
            type: Boolean
          }
        },
        methods:{
          rename(){
            if(this.authId==1){
              this.$emit('rename','rename')
            }else{
              document.querySelector("#app").click();
              this.noAccess = true
            }
          },
          dele(){
            if(this.authId==1){
              this.$confirm('此操作将永久删除该'+this.msg+', 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              }).then(() => {
                this.$emit('dele','dele')
              })
            }else{
              console.log(this.authId)
              document.querySelector("#app").click();
              this.noAccess = true
            }
          },
        }
    }
</script>

<style>
  .popoverBtnBox{
    padding: 0 14px;
    min-width: 80px;
  }

  .popoverBtnBox .popoverBtn{
    width: 72px;
    height: 44px;
    display: flex;
    align-items: center;
    font-size:12px;
    color:rgba(57,63,81,1);
    justify-content: space-between;
    padding: 0 8px;
    cursor: pointer;
  }

  .popoverBtnBox .popoverBtn:first-of-type{
    border-bottom: 1px solid rgba(210,210,210,0.6);
  }

  .popoverBtnBox .popoverBtn:last-of-type{
    border-bottom: none;
  }

  .popoverBtnBox .popoverBtn i{
    color: #32C58F;
    font-size: 16px;
  }

  .popoverBtnBox .popoverBtn:last-of-type i{
    color: #EB5252;
    font-size: 14px;
  }

  .titleName{
    font-size:16px;
    color:rgba(57,63,81,1);
    line-height: 16px;
    cursor: pointer;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
  }

  .titleName .el-icon-more{
    transform: rotate(90deg);
    height: 40px;
    width: 40px;
    line-height: 40px;
    text-align: center;
  }

</style>
