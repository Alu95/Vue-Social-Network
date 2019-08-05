import Vue from 'vue';
import {mapGetters} from 'vuex';

const Validation = {
    install(vue, options){
        vue.mixin({
            computed: {
                ...mapGetters({
                    backendErrors:'validation/errors'
                })
            },
        })
    }
}
Vue.use(Validation);