<template lang="pug">
  #card
    .info.el-collapse-transition
      //p.detail {{index}}
      p.event-name.detail(@click="cardflag=!cardflag;") 事件：{{eventName}}
      p.startTime.detail(v-if="cardflag")  开始时间：{{startTime}}
      p.lastTime.detail(v-if="cardflag")  持续时间：{{lastTime}}
      p.location.detail(v-if="cardflag")  地点：{{location}}
    .right(v-if="cardflag")
      .space
      .btn
        el-button(size='small' v-if="status==0", @click="finishcard") 做完啦
        el-button(size='small' type='danger' v-if="status==1", @click="deletecard") 删除

</template>
<script>
  import $ from "../../static/jquery-3.2.1.min"
  import store from '../store/store'
  import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
  import CollapseTransition from "../../node_modules/element-ui/lib/transitions/collapse-transition"
  import 'element-ui/lib/theme-chalk/base.css'
export default {
    components:{
      ElButton
    },
    data() {
      return {
        showflag: 0
      }
    },
    props: ['eventName', 'startTime', 'lastTime', 'location', 'index', 'status', 'cardflag'],
    created() {
    },
    methods: {
      deletecard(){

        //console.log("delete card" + this.index);
        this.$emit('deletecard', this.index);


      },
      finishcard(){
        //console.log("finish a card");
        this.status = 1;
        this.$emit('modifycard', this.index, this.status);


      }
    }
  }

</script>
<style lang="stylus" scoped>
  #card
    display flex
    flex-direction row
    border solid thin rgba(0, 0, 0, .2)
    min-width 350px
    max-width 550px
    margin 5px 0
    background-color: #E0F3CA
    box-shadow 5px 5px 30px 3px #627d84
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
  .done
    font-size 15px
</style>
