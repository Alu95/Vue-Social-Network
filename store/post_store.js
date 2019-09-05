export const state = () => ({
  posts: [],
  newPosts: false,
  loadingPosts: false
});

export const getters = {
  allPosts(state) {
    return state.posts;
  },
  returnNewPosts(state) {
    return state.newPosts;
  },
  isLoadingPost(state) {
    return state.loadingPosts;
  }
};

export const actions = {
  test({
    commit
  }) {
    commit('increment', 10);
  },
  async retrievePosts({
    commit,state
  }) {
    commit('isLoading', true);
    await this.$axios.get('api/posts')
      .then(res => {
        let posts = res.data.postData;
        if (state.posts.length < posts.length)
        {
            commit('newPostsStatus', true);
            commit('insertPostList', posts);
            commit('isLoading', false);
        }
        else {
            commit('newPostsStatus', false);
            commit('isLoading', false);
        }
        
      })
      .catch(err => {
        commit('insertPostList', err);
        commit('isLoading', false);
      })
  }
};

export const mutations = {
  newPostsStatus(state, payload) {
    state.newPosts = payload;
  },
  insertPostList(state, payload) {
    state.posts = payload;
  },
  isLoading(state, payload) {
    state.loadingPosts = payload;
  }
};
