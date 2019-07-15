import Vue from 'vue';

Vue.directive('$model', {
  bind: function(el, binding, vnode) {
    el.oninput = () => (vnode.context[binding.expression] = el.value);
  }
});
