<template lang="pug">
  #test
    .navigation
      h1 MagicList
    el-button.time(size="medium", round=true, @click="timeflag=!timeflag;") select time
    el-date-picker(v-if="timeflag" v-model="date", type="date", placeholder="选择日期", :picker-options="pickerOptions1")
    .cards
      el-button(type="primary", plain, @click="inputflag=!inputflag").add 添加日程
      .input(v-if="inputflag")
        CardInput(@transferInfo="addCard")
      MapSearch
        //button add
      .showcards(v-for="(card, index) in cards")
        Card(@deletecard="deleteacard", :cardflag="card.cardflag", :status="card.eventFlag", :index="index", :eventName="card.eventName", :startTime="card.eventStarttime", :lastTime="card.eventPeriod", :location="card.eventLocation")
    .submit
      el-button.submitlst(type="primary", plain, @click="submit") 魔力涌现
      el-button.reload(type="primary", plain, @click="reload") reload

</template>

<script>
  import $ from '../../static/jquery-3.2.1.min.js'
  import '../../static/animate.css'
  import 'vue2-animate/dist/vue2-animate.min.css'
  import MapSearch from "./MapSearch.vue"
  import CardInput from "./CardInput.vue"
  import Card from "./Card.vue"
  import ax from "axios"
  import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";
  import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
  import ElPicker from "../../node_modules/element-ui/packages/date-picker/src/picker.vue";
   /*
  $(document).ready(function(){
    console.log("document is ready");
    $(".greet").css('color', '#000');
  })*/

  export default{

    name: 'Index',
    components: {
      ElPicker,
      MapSearch,
      CardInput,
      Card,
      ElInput,
      ElButton
    },
    data(){
      return {
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
        inputflag: false,
        timeflag: false,
        userid: '',
        date: '',
        cards:[
          /*{
            eventName: '1',
            startTime: 'qwe',
            lastTime: 'eee',
            location: 'www',
            status: 0,
            cardflag: 0
          },
          {
            eventName: '2',
            startTime: 'weqwe',
            lastTime: 'eqwe',
            location: 'qwewq',
            status: 0,
            cardflag: 0
          },
          {
            eventName: '3',
            startTime: 'weqwe',
            lastTime: 'eqwe',
            location: 'qwewq',
            status: 0,
            cardflag: 0
          },
          {
            eventName: '4',
            startTime: 'weqwe',
            lastTime: 'eqwe',
            location: 'qwewq',
            status: 0,
            cardflag: 0
          },*/
        ]
      }
    },
    methods: {
      reload(){
        let that = this;
        let ls = window.localStorage;
        let id = ls.getItem("userid")
        ax.get('http://192.168.43.164:8000/v1/event/query?userId=' + id,)
          .then(function (res) {
            console.log(res);
            that.cards = res.data
          })
          .catch(function (err) {
            console.log(err);
          })
      },
      addCard (cardl){
        //this.cards.push(cardl);
        this.reload()
      },
      deleteacard(index){
        let that = this;
        let ls = window.localStorage;
        let id = ls.getItem("userid")
        console.log(id)

        ax.post('http://192.168.43.164:8000/v1/event/delete', {
          userId: id,
          eventId: this.cards[index].eventId
        })
          .then(function (res) {
            console.log(res);
            that.reload();
          })
          .catch(function (err) {
            console.log(err);
          })

        //this.cards.splice(index, 1);
      },

      submit (){
        console.log("submit");
        console.log(this.date.getTime());
        /*ax.post('url', {
          date: this.date,
          event: this.cards,
        })
        .then(function(res){
          console.log(res);
        })
        .catch(function(err){
          console.log(err);
        })*/

      }

    }

  }
</script>

<style lang="stylus">
  #test
    display flex
    flex-direction column
    margin 20px auto
    min-height 600px
    max-width 800px
    box-shadow 0 20px 50px 3px #666
    align-items center

    .navigation
      display flex
      flex-direction column
      justify-content center
      width 100%
      height 100px

      h1
        font-size 30px
        color #444
        margin-left 15px

      time
        width 10px
        margin 15px

    .cards
      max-width 550px
      display flex
      flex-direction column
      .add
        align-items flex-end
      .showcards
        border-top thin solid rgba(0,0,0,.3)
      .submit
        width 300px
        display flex
        align-items flex-end


    .detail
      display flex
      width 80%
      flex-direction column
      justify-content center
        //border solid thin black
    .submitlist
      height 30px

</style>
