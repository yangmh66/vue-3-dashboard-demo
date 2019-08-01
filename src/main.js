// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//官方&第三方套件
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';

import VueI18n from 'vue-i18n';

import VeeValidate from 'vee-validate';
import zhTWValidate from 'vee-validate/dist/locale/zh_TW';

//自訂套件
import App from './App';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

VeeValidate.Validator.localize('zh_TW', zhTWValidate);
Vue.use(VeeValidate);

// Vue.use(VueI18n);

Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);

axios.defaults.withCredentials = true;

// const i18n = new VueI18n({
//   locale: 'zhTW'
// });

// Vue.use(VeeValidate, {
//   i18n,
//   dictionary: {
//     zhTW
//   }
// });

/* eslint-disable no-new */
// new Vue({
//   // i18n,
//   el: '#app',
//   router,
//   components: {
//     App
//   },
//   template: '<App/>',
// });

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {

  console.log('In beforeEach...');
  console.log('to', to, 'from', from, 'next', next);
  //
  if (to.meta.requiresAuth) {
    console.log('這裡需要驗證!!');
    // console.log('from', from, 'to', to, 'next', next);

    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        console.log('驗證成功!!');
        // console.log('next', next);
        console.log('from', from, 'to', to, 'next', next);
        next();
      } else {
        console.log('驗證失敗!!');
        next({
          path: '/login',
        });
      }
    });
  } else {
    console.log('else of ---> if (to.meta.requiresAuth) ...');
    console.log('from', from, 'to', to, 'next', next);
    next();
  }

});