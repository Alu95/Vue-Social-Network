import Vue from 'vue';
import {
  mapGetters,
  mapActions,
} from 'vuex';

const GetPosts = {
  install(vue, options) {
    vue.mixin({
      computed: {
        ...mapGetters({
          listAllPosts: 'post_store/allPosts',
          numberTest: 'post_store/returnNewPosts',
          loadingPosts: 'post_store/isLoadingPost',
          readTest1: 'post_store/getTest1',
        }),
      },
      methods: {
        ...mapActions({
          addNum: 'post_store/test',
          showPosts: 'post_store/retrievePosts',
          addPost: 'post_store/addPost'
        }),
        parsePosts(text) {
          let result = [];
          let entities = twitter.extractEntitiesWithIndices(text);
          var beginIndex = 0;

          for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            result.push(text.substring(beginIndex, entity.indices[0]));

            if (entity.url) {
              result.push(`§${entity.url}`);
            } else if (entity.hashtag) {
              result.push(`#${entity.hashtag}`);
            } else if (entity.screenName) {
              result.push(`@${entity.screenName}`);
            } else if (entity.cashtag) {
              result.push(`$${entity.cashtag}`);
            }

            beginIndex = entity.indices[1];
          }

          result.push(text.substring(beginIndex, text.length));
          return result;
        },
      },
    })
  }
};

Vue.use(GetPosts);