<template lang="pug">
  #card-input
    .info
      el-input.event.in(v-model="eventName" placeholder="事件名称")
      el-input.start-time.in(v-model="startTime" placeholder="开始时间")
      el-input.last-time.in(v-model="lastTime" placeholder="持续时间")
      el-input.loc.in(v-model="location" placeholder="地点")
    .btn
      el-button(type="primary", plain, @click="addcard") add

</template>
<script>
import MapSearch from "./MapSearch.vue"
import ax from 'axios';
import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";
import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";

  export default {
    components: {
      MapSearch,
      ElInput,
      ElButton
    },

    data() {
      return {
        eventName: '',
        startTime: '',
        lastTime: '',
        location: ''
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
          status: 0
        }

        /*ax.post('url', {
          event: cardl
        })
          .then(function(res){
            console.log(res);
          })*/

        this.$emit('transferInfo', cardl);
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
