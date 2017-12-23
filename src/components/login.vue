<template lang="pug">
  #login
    img(src="static/down.png")
    el-input.username(placeholder="username")
    el-input.password(placeholder="password")
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
        /*ax.post('url', {
          username: this.username,
          password: this.password
        })
          .then(function(res){
            console.log(res);
          })*/
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
</style>
