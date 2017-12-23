<template lang="pug">
  #card
    .info
      //p.detail {{index}}
      p.event-name.detail(@click="cardflag=!cardflag;") 事件：{{eventName}}
      p.startTime.detail(v-if="cardflag")  开始时间：{{startTime}}
      p.lastTime.detail(v-if="cardflag")  持续时间：{{lastTime}}
      p.location.detail(v-if="cardflag")  地点：{{location}}
    .right(v-if="cardflag")
      .space
      .btn
        button(v-if="status==0", @click="finishcard") 做完啦
        button(v-if="status==1", @click="deletecard") delete

</template>
<script>
  import $ from "../../static/jquery-3.2.1.min"
  import store from '../store/store'
  export default {
    data() {
      return {
        cardflag: false,
        showflag: 0
      }
    },
    props: ['eventName', 'startTime', 'lastTime', 'location', 'index', 'status'],
    created() {
    },
    methods: {
      deletecard(){

        //console.log("delete card" + this.index);
        /*ax.get('url').then(function(res){
          console.log(res);
        })
        .catch(function(err){
          console.log(err);
        })*/
        this.$emit('deletecard', this.index);


      },
      finishcard(){
        //console.log("finish a card");
        this.status = 1;

      }
    }
  }

</script>
<style lang="stylus" scoped>
  #card
    display flex
    flex-direction row
    border solid thin rgba(0, 0, 0, .2)
    min-width 250px
    max-width 350px
    margin 5px 0
    .info
      flex 0 0 70%
      display flex
      flex-direction column
      .detail
        margin 5px 10px
        align-items flex-start

    .right
      flex 0 0 30%
      flex-direction column
      .space
        flex 0 0 70%
      .btn
        display flex
        flex 0 0 30%
</style>
