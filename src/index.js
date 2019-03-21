/* eslint-disable no-new */
import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/firestore';
import router from './router';
import App from './App.vue';
import './style.scss';

Vue.config.productionTip = false;

const config = {
  apiKey: 'AIzaSyD96pXzHn34EKXmnwLh2YyiiGLA8i-ODBQ',
  authDomain: 'countdown-timer-vue.firebaseapp.com',
  databaseURL: 'https://countdown-timer-vue.firebaseio.com',
  projectId: 'countdown-timer-vue',
  storageBucket: '',
  messagingSenderId: '541233793029',
};

firebase.initializeApp(config);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});