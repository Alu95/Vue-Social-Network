<template>
  <div>
    <Nav />
    <div class="md-layout">
      <div class="md-layout-item md-size-15">
        <md-card class="my-2">
          <md-card-header>
            <div class="md-title">title</div>
          </md-card-header>
          <md-card-content>content</md-card-content>
          <md-card-actions>
            <md-button>action</md-button>
            <md-button>action</md-button>
          </md-card-actions>
        </md-card>
      </div>
      <div class="md-layout-item md-size-70">
        <md-card class="mx-4 my-2">
          <md-card-header>
            <div class="md-title">
              <a to="/">{{username.charAt(0).toUpperCase() + username.slice(1)}}</a>
            </div>
          </md-card-header>
          <md-card-content></md-card-content>
        </md-card>
        <md-card class="mx-4 my-1" v-if="loading">
          <md-card-content>
            <md-progress-bar md-mode="query"></md-progress-bar>
          </md-card-content>
        </md-card>
        <md-card v-for="item in postShow" :key="item.id" class="mx-4 my-2">
          <md-card-content>
            <Post
              :author="item.user_name"
              :date="item.created_at"
              :post_id="item.id_r"
              :postBody="item.message"
            />
            <Likes :post_id="item.id_r" />
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item md-size-15">
        <md-card class="my-2">
          <md-card-header>
            <div class="md-title">title</div>
          </md-card-header>
          <md-card-content>content</md-card-content>
          <md-card-actions>
            <md-button>action</md-button>
            <md-button>action</md-button>
          </md-card-actions>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
import Post from "@/components/postcom/PostV2";
import Likes from "@/components/postcom/Like";

export default {
  data() {
    return {
      username: this.$route.params.name,
      postShow: {},
      loading: false
    };
  },
  components: {
    Nav,
    Post,
    Likes
  },
  created() {
    this.postLists();
  },
  methods: {
    async postLists() {
      this.loading = true;
      await this.$axios
        .get("api/posts", {
          params: {
            usertag: this.username
          }
        })
        .then(res => {
          this.postShow = res.data.postData;
          //console.log(this.postShow);
          this.loading = false;
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>