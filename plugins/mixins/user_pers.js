import Vue from 'vue';
import {
  mapGetters
} from 'vuex';

const Validation = {
  install(vue, options) {
    vue.mixin({
      computed: {
        ...mapGetters({
          user_p: 'auth_pers/user',
          authenticated_p: 'auth_pers/authenticated',
        })
      },
    })
  }
}
Vue.use(Validation);