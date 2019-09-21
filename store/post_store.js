import { async } from "q";

export const state = () => ({
  posts: [],
  newPosts: false,
  loadingPosts: false,
  test1: ''
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
  },
  getTest1() {
    return state.test1;
  }
};

export const actions = {
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
  },
  async addPost({commit,state}, text){
    commit('isLoading', true);
    console.log([`tags: ${text.tags}`]);
    
    await this.$axios
      .post("api/send_post", {
        message: text.post,
        tags: text.tags
      })
      .then(res => {
        commit('isLoading', false);
        commit('addPostToList', res.data.post);
        console.log(res);
        
      })
      .catch(err => {
        commit('isLoading', false);
        console.log(err);
        console.log(text);
      });
  }
};

export const mutations = {
  newPostsStatus(state, payload) {
    state.newPosts = payload;
  },
  insertPostList(state, payload) {
    state.posts = payload;
  },
  addPostToList(state,payload) {
    state.posts.unshift(payload);
  },
  isLoading(state, payload) {
    state.loadingPosts = payload;
  },
  setTest1(state, payload){
    state.test1 = payload;
  }
};
