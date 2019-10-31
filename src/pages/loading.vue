<template>

</template>

<script>
    import axios from "axios"
    export default {
        name: "loading",
        mounted(){
            if(this.$route.query.operation=='weixin_login'){
                let form = new FormData()
                form.append('code',this.$route.query.code);
                form.append('state',this.$route.query.state);
                axios.post('/home/weixin_login',form
                ).then((response)=> {
                    if(response.data.ret == 0){
                        localStorage.setItem('user_id',JSON.stringify(response.data.data.user_id));
                        localStorage.setItem('createAt', new Date().getTime());
                        localStorage.setItem('method','wchat');
                        localStorage.setItem('enter','1');
                        if(response.data.data.whether_weixin_bind == 'weixin' && response.data.data.phone){
                            this.$router.push('/control/list')
                        }else{
                            this.$router.push('/complete')
                        }
                    }else {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            confirmButtonClass: 'aloneConfirmButton'
                        });
                    }
                })
            }
            if(this.$route.query.operation=='email_bind'){
                let form = new FormData()
                form.append('token',this.$route.query.token);
                form.append('signature',this.$route.query.signature);
                axios.post('/account/bind_email',form
                ).then((response)=> {
                    if(response.data.ret == 0){
                        if(localStorage.getItem("method")== 'email'){
                            this.$router.push('/')
                            localStorage.removeItem('user_id')
                        }else{
                            this.$router.push('/mine/security')
                        }

                    }else {
                        this.$alert(response.data.msg, '提示', {
                            confirmButtonText: '确定',
                            confirmButtonClass: 'aloneConfirmButton'
                        });
                    }

                })
            }
            if(this.$route.query.operation=='weixin_bind'){
                let form = new FormData()
                form.append('code',this.$route.query.code);
                form.append('state',this.$route.query.state);
                form.append('user_id',JSON.parse(localStorage.user_id));
                axios.post('/account/bind_weixin',form
                ).then((response)=> {
                    if(response.data.ret == 0){
                        this.$router.push('/mine/pwd')
                    }else {
                        this.$router.push('/');
                        this.$message(response.data.msg);
                    }
                })
            }
        }
    }
</script>

