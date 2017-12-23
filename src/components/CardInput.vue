<template lang="pug">
  #card-input
    .info
      el-input.event.in(v-model="eventName" placeholder="事件名称")
      //el-input.start-time.in(v-model="startTime" placeholder="开始时间")
      el-date-picker(v-model="startTime", type="datetime", placeholder="选择开始时间")
      el-time-picker(v-model="lastTime", placeholder="选择持续时间")
      //el-input.last-time.in(v-model="lastTime" placeholder="持续时间")
      el-input.loc.in(v-model="location" placeholder="地点")
    .btn
      el-button(type="primary", plain, @click="addcard") add

</template>
<script>
import MapSearch from "./MapSearch.vue"
import ax from 'axios';
import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";
import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
import ElPicker from "../../node_modules/element-ui/packages/date-picker/src/picker.vue";

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
        var cardl = {
          eventName: this.eventName,
          startTime: this.startTime,
          lastTime: this.lastTime,
          location: this.location,
          status: this.status
        }
        console.log(cardl)
        let that = this;
        ax.post('http://192.168.43.164:8000/v1/event/add', {
          eventName: cardl.eventName,
          location: cardl.location,
          startTime: cardl.startTime.getTime(),//new Date(cardl.startTime).getTime(),
          period: cardl.lastTime.getTime(), //Date(cardl.lastTime).getTime(),
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
    border thin black solid
    .info
      display flex
      flex-direction column
    .btn
      display flex
      justify-content flex-end


</style>
