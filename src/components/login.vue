<template lang="pug">
  #login
    img(src="static/down.png")
    .input
      el-input.username(placeholder="username" v-model="username")
      el-input.password(placeholder="password" v-model="password")
    .btn
      el-button.submit(type="primary", @click="commit") login
      el-button.register(type="primary", @click="register") register

</template>
<script>
  import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";
  import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
  import ax from 'axios'
  export default {
    components: {
      ElInput,
      ElButton
    },
    data() {
      return {
        username: '',
        password: ''
      }
    },
    created() {

    },
    methods: {
      commit(){
        var flag = false
        var that = this;
        console.log("ell")
        console.log(this.username +" "+ this.password)

        ax.post('http://172.20.10.3:8000/v1/user/login', {
          userId: this.username,
          userPassword: this.password
        })
          .then(function (res) {
            console.log(res.status);
            if(res.status == 200){
              console.log("set flag")
              var ls = window.localStorage;
              console.log("save" + that.username)
              ls['userid'] = that.username;
              that.$router.push('/main')
              flag = true
            }
            else{
              alert("please input right info or register");
            }
          })
          .catch(function (err) {
            console.log(err);
          })



      },
      register(){
        this.$router.push('/register')
      }
    }
  }

</script>
<style lang="stylus" scoped>
  #login
    display flex
    flex-direction column
    margin 20px auto
    min-height 600px
    max-width 500px
    box-shadow 0 20px 50px 3px #666
    align-items center
    justify-content center
    img
      margin-bottom 60px
      width 80px
      height 80px
    .input
      width 200px
</style>
