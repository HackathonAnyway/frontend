<template lang="pug">
  #test
    .navigation
      h1(style="font-size:40px;color:rgba(0,112,119,1);font-family:'Arial Black', Gadget, sans-serif;") Magic List
    .container
      .left
        .user
          img.icon(src="static/head.png")
          h2.username {{userid}}
        CollapseTransition
          .test
            el-button.time(type="primary", plain, round=true, @click="timeflag=!timeflag;") 相关信息
            el-button(type="primary", plain, round=true,  @click="inputflag=!inputflag").add 添加日程
            CardInput(v-show="inputflag", @transferInfo="addCard")
            userinfo(@getnow="checknow", v-show="timeflag")
        MapSearch
      .right
        .cards
          h2(style="font-size:30px;color:rgba(0,112,119,1);font-family:'Arial Black', Gadget, sans-serif;").subtitle Cards
          //button add
          .showcards(v-for="(card, index) in cards")
            Card(@deletecard="deleteacard", @modifycard="modifycard", :cardflag="card.cardflag", :status="card.eventFlag", :index="index", :eventName="card.eventName", :startTime="card.eventStarttime", :lastTime="card.eventPeriod", :location="card.eventLocation")
        .submit
          el-button.submitlst(type="primary", plain,  @click="submit") 魔力涌现
          //el-button.reload(type="primary", plain, @click="reload") reload

</template>

<script>
  import $ from '../../static/jquery-3.2.1.min.js'
  import '../../static/animate.css'
  import 'vue2-animate/dist/vue2-animate.min.css'
  import MapSearch from "./MapSearch.vue"
  import CardInput from "./CardInput.vue"
  import userinfo from "./userinfo.vue"
  import Card from "./Card.vue"
  import ax from "axios"
  import ElInput from "../../node_modules/element-ui/packages/input/src/input.vue";
  import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
  import ElPicker from "../../node_modules/element-ui/packages/date-picker/src/picker.vue";
  import CollapseTransition from "../../node_modules/element-ui/lib/transitions/collapse-transition"
  import 'element-ui/lib/theme-chalk/base.css'
  //import pickle from "pickle"
  var jpickle = require('jpickle')

  //var pickle = require('./lib/pickle');

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
      ElButton,
      userinfo,
      CollapseTransition
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
        culoc: '',
        cards:[

        ]
      }
    },
    created() {
      this.reload()
    },
    methods: {
      reload(){
        let that = this;
        let ls = window.localStorage;
        let id = ls.getItem("userid")
        this.userid = id;
        ax.get('http://172.20.10.3:8000/v1/event/query?userId=' + id,)
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

        ax.post('http://172.20.10.3:8000/v1/event/delete', {
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

      modifycard(index, status){
        let that = this;
        let ls = window.localStorage;
        let id = ls.getItem("userid")
        console.log(status)
        ax.post('http://172.20.10.3:8000/v1/event/modify', {
          userId: id,
          eventId: this.cards[index].eventId,
          eventFlag: status
        })
          .then(function (res) {
            console.log(res);
            //that.cards = res.cards;
            that.reload();
          })
          .catch(function (err) {
            console.log(err);
          })

        //this.cards.splice(index, 1);
      },
      checknow(loc){
        this.culoc = loc;
      },


      submit (){
        console.log("submit");
        if(!this.culoc){
          alert("请输入现在位置");
        }
        let ls = window.localStorage;
        let id = ls.getItem("userid")
        console.log(id);
        ax.post('http://172.20.10.3:8000/v1/event/arrange', {
          userId: id,
          //eventId: this.cards[index].eventId,
          //eventFlag: status
        })
        .then(function (res) {
          console.log(res);
          console.log(jpickle.loads(res.data))
          //that.reload();
        })
        .catch(function (err) {
          console.log(err);
        })

        //console.log(this.date.getTime());
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
    background-color rgba(230, 251, 253, .5)
    display flex
    flex-direction column
    margin 20px auto
    min-height 600px
    max-width 800px
    box-shadow 0 20px 50px 3px #666
    align-items center
    //background-image url(../../static/back22.jpg)

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
    .container
      display flex
      flex-direction row
      justify-content space-around
      width 800px
      .left
        margin-right 30px
        background-color rgba(255, 255, 255 .5)
        //box-shadow 5px 5px 15px 3px #627d84
        height 450px
        padding 15px


    .cards
      max-width 550px
      display flex
      flex-direction column
      .add
        align-items flex-end
      .showcards
        border-top thin solid rgba(0,0,0,.3)
    .submit
      display flex
      flex-direction column


    .detail
      display flex
      width 80%
      flex-direction column
      justify-content center
        //border solid thin black
</style>
