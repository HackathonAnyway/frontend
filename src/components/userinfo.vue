<template lang="pug">
  #userinfo
    el-input(v-model="currentLocation" placeholder="当前位置")
    el-date-picker(v-model="now", type="date", placeholder="选择日期", :picker-options="pickerOptions1")
    el-button(type="primary", plain) Confirm
</template>
<script>
  import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";
  import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
  import ElPicker from "../../node_modules/element-ui/packages/date-picker/src/picker.vue";

  export default {
    components:{
      ElInput,
      ElButton,
      ElPicker,
    },
    data() {
      return {
        currentLocation: '',
        now: '',
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      }
    },
    created() {

    },
    methods: {

    }
  }

</script>
<style lang="stylus" scoped>
  #userinfo
    display flex
    flex-direction column
</style>
