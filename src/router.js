import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import Timer from './views/Timer.vue';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Countdown Timer by ŁT',
      },
    },
    {
      path: '/:timerId',
      component: Timer,
      meta: {
        title: 'Custom Timer From DB',
      },
      props: true,
    },
    // {
    //   path: '*',
    //   component: Error404,
    //   meta: {
    //     title: 'ERROR 404',
    //   },
    // },
  ],
});

router.afterEach((to) => {
  document.title = to.meta.title;
});

export default router;
