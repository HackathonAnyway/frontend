<template lang="pug">
#register
  img(src="static/down.png")
  .input
    el-input.username(placeholder="username" v-model="username")
    el-input.password(placeholder="password" v-model="password")
  el-button.submit(type="primary", @click="commit") register

</template>
<script>

  import ax from 'axios'
  import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";
  import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";

  export default {
    components: {
      ElButton,
      ElInput},
    data() {
      return {
        username: '',
        password: ''
      }
    },
    created() {

    },
    methods: {
      commit() {
        let that = this;
        console.log("post")
        console.log(this.username +" "+ this.password)
        ax.post('http://172.20.10.3:8000/v1/user/register', {
          userId: this.username,
          userPassword: this.password
        })
          .then(function (res) {
            that.$router.push('/main');
            var ls = window.localStorage;
            //console.log("save" + that.username)
            ls['userid'] = that.username;
            console.log(res);
          })
          .catch(function (err) {
            console.log(err);
          })
        /*if (res.status) {
          this.$router.push('/main')
        }*/
      }
    }
  }

</script>
<style lang="stylus" scoped>
  #register
    display flex
    flex-direction column
    margin 20px auto
    min-height 600px
    max-width 500px
    align-self center
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
