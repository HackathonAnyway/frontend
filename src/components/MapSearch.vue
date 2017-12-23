<template lang="pug">
  #map-search
    #r-result
      input(type="text" id="suggestId" size="20" value="南京航天航空大学" style="width:150px;")
    #searchResultPanel(style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;")

</template>
<script>

  export default {
    data() {
      return {
      }
    },
    created() {


    },
    methods: {
    }
  }

  function G(id) {
    return document.getElementById(id);
  }

  let ac = new BMap.Autocomplete(    //建立一个自动完成的对象
    {"input" : "suggestId"
      //,"location" : map
    });

  ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
    let str = "";
    let _value = e.fromitem.value;
    let value = "";
    if (e.fromitem.index > -1) {
      value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
    }
    str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

    value = "";
    if (e.toitem.index > -1) {
      _value = e.toitem.value;
      value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
    }
    str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
    G("searchResultPanel").innerHTML = str;
  });

  let myValue;
  ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
    let _value = e.item.value;
    myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
    G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
    console.log(myValue);

  });


</script>
<style lang="stylus" scoped>

</style>
