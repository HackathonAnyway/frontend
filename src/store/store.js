import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

const state = {
  status:0
}

export default new Vuex.Store({
  state
});

const mutations={
  finish(state){
    state.status = 1;
  },
  delete(state){
    state.status = 2;
  }
}
