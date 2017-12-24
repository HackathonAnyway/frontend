<template lang="pug">
  #card-input
    .info
      el-input.event.in(v-model="eventName" placeholder="事件名称")
      //el-input.start-time.in(v-model="startTime" placeholder="开始时间")
      el-date-picker(v-model="startTime", type="datetime", placeholder="选择开始时间")

      el-time-select(v-model="lastTime",   :picker-options="{start: '0:00',step: '00:15',end: '3:00'}", placeholder="选择持续时间")
      //p {{lastTime}}
      //el-input.last-time.in(v-model="lastTime" placeholder="持续时间")
      el-input.loc.in(v-model="location" placeholder="地点")
    .btn
      el-button(type="primary", plain, @click="addcard") 添加

</template>
<script>
import MapSearch from "./MapSearch.vue"
import ax from 'axios';
import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";
import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
import ElPicker from "../../node_modules/element-ui/packages/date-picker/src/picker.vue";
import CollapseTransition from "../../node_modules/element-ui/lib/transitions/collapse-transition"
import 'element-ui/lib/theme-chalk/base.css'

  export default {
    components: {
      MapSearch,
      ElInput,
      ElButton,
      ElPicker
    },

    data() {
      return {
        eventName: '',
        startTime: '',
        lastTime: '',
        location: '',
        status: 0
      }
    },
    created() {

    },
    methods: {
      addcard : function(){
        if(!this.lastTime){
          alert("请填写持续时间");
          return;
        }
        if(!this.eventName){
          alert("请填写事件名称");
          return;
        }
        if(!this.location){
          alert("请填写地点");
          return;
        }
        var cardl = {
          eventName: this.eventName,
          startTime: this.startTime,
          lastTime: this.lastTime,
          location: this.location,
          status: this.status
        }
        console.log(cardl)
        let that = this;
        let ls = window.localStorage;
        let id = ls.getItem("userid")
        ax.post('http://172.20.10.3:8000/v1/event/add', {
          userId: id,
          eventName: cardl.eventName,
          location: cardl.location,
          startTime: !cardl.startTime ? 0 : cardl.startTime.getTime(),//new Date(cardl.startTime).getTime(),
          period: cardl.lastTime, //Date(cardl.lastTime).getTime(),
          flag: cardl.status
        })
          .then(function (res) {
            console.log(res);
            that.$emit('transferInfo', cardl);
          })
          .catch(function (err) {
            console.log(err);
          })
      }
    }
  }


</script>
<style lang="stylus" scoped>
  #card-input
    .info
      display flex
      flex-direction column
    .btn
      display flex
      flex-direction column


</style>
