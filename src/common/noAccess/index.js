import noAccessComponents from './noAccess.vue';

const noAccess = {
  install:function(Vue) {
    Vue.component('noAccess', noAccessComponents)
  }
}

export default noAccess;
