<template>
  <div>
    <navBar> </navBar>
    <div class="md-layout" :class="`md-alignment-top-center`">
      <div class="md-layout-item md-size-25 md-small-hide">
        <md-card class="cardCenter mx-2 my-4 text-center">
          <md-card-content> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.</md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item md-large-size-50 md-small-size-100">
        <md-card class="cardCenter mx-4 my-4">
          <md-card-header>
            <div class="md-title">
              <a to="/">Home</a>
            </div>
            <hr />
          </md-card-header>
          <md-card-content v-if="$auth.loggedIn">
            <div class="md-layout">
              <div
                class="md-layout-item md-large-size-10 md-xlarge-size-7 md-small-size-20 md-xsmall-hide"
              >
                <md-avatar class="md-avatar-icon md-primary">{{$auth.user.name.substring(0, 3)}}</md-avatar>
              </div>
              <div
                class="md-layout-item md-large-size-90 md-xlarge-size-90 md-small-size-80 md-xsmall-100"
              >
                <span v-if="editLabel" class="postLabel">Write something here</span>
                <div
                  class="postText"
                  :contentEditable="true"
                  @click="writePost"
                  @input="onInput"
                >{{postTextStart}}</div>
              </div>
              <div>
                <md-button 
                class="md-primary mx-2 my-4" 
                @click="publishPost2"
                :disabled="disabledBtn"
                >
                  <span class="mx-1">Send</span><md-icon>play_arrow</md-icon>
                </md-button>
                <pre class="mt-2">Character left: {{postTextFull.length}}/240</pre>
              </div>
            </div>
            <p>Preview:</p>
            <span class="post" v-for="(text, index) in parsedPost" :key="`text-${index}`">
              <!-- INIZIO DEL TESTO -->
              <span v-if="text.substring(0,1) === '#'">
                <nuxt-link :to="'../hash/' + text.substring(1, text.length)">{{text}}</nuxt-link>
              </span>
              <span v-else-if="text.substring(0,1) === '@'">
                <nuxt-link :to="'../user/' + text.substring(1, text.length)">{{text}}</nuxt-link>
              </span>
              <span v-else>{{text}}</span>
            </span>
          </md-card-content>
          <md-card-content v-else>
            <p>Login to post something</p>
          </md-card-content>
            
        </md-card>
        <!-- POSTS -->
        <md-card class="mx-4 my-1" v-if="loadingPosts">
          <md-card-content>
            <md-progress-bar md-mode="query"></md-progress-bar>
          </md-card-content>
        </md-card>
        <md-card class="mx-4 my-1" v-for="item in listAllPosts" :key="item.id">
          <md-card-content>
            <Post 
            :author="item.user_name" 
            :date="item.created_at" 
            :post_id="item.id_r" 
            :postBody="item.message" />
            <Likes :post_id="item.id_r"/>
          </md-card-content>
        </md-card>
        <!-- END POSTS -->
      </div>
      <div class="md-layout-item md-size-25 md-small-hide">
        <md-card class="cardCenter mx-2 my-4 text-center">
          <md-card-content>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.</md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>

import twitter from "twitter-text"
import navBar from "@/components/Nav";
import Post from "@/components/postcom/PostV2";
import Likes from '@/components/postcom/Like';

export default {
  auth: false,
  data() {
    return {
      editable: false,
      editLabel: false,
      postTextStart: "Write something here",
      postTextFull: "",
      loading: false,
      postShow: {}
    };
  },
  components: {
    Post,Likes, navBar
  },
  created() {
  this.postLists();
  this.showPosts();
  },
  computed: {
    parsedPost() {
      let text = this.postTextFull;
      let result = [];
      let entities = twitter.extractEntitiesWithIndices(this.postTextFull);
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
    disabledBtn() {
      if (this.postTextFull.length <= 1 || this.postTextFull.length >= 240 ){
        return true
      }
      else{
        false
      }
    }
  },
  methods: {
    onInput(e) {
      let text = e.target.innerText;
      this.postTextFull = text;
      if (text === ''){
        this.editLabel = true;
      }
      else{
        this.editLabel = false;
      }
    },
    test1() {
      console.log(this.postTextParsed);
    },
    async postLists() {
      this.loading = true;
      await this.$axios
        .get("api/posts")
        .then(res => {
          this.postShow = res.data.postData;
          //console.log(this.postShow);
          this.loading = false;
        })
        .catch(err => {
          console.error(err);
        });
    },
    async publishPost() {
      await this.$axios
        .post("api/send_post", {message: this.postTextFull})
        .then(res => {
          this.postLists();
          console.log(res);
        })
        .catch(err => {
          console.error(err);
        });
    },
    async publishPost2() {
      const text = {
        post: this.postTextFull,
        tags: twitter.extractHashtags(this.postTextFull)
      }
      await this.addPost(text);
    },
    writePost() {
      this.postTextStart = '';
      if (this.postTextFull === ''){
        this.editLabel = true
      }
      
    }
  }
};
</script>

<style scoped>
.postLabel {
  color: grey;
  z-index: -5;
  position: absolute;
}
.postLabel,
.postText {
  font-size: 30px;
  overflow-wrap: break-word;
  line-height: 1.3125;
}
.postText {
  width: 100%;
  height: auto;
  display: inline-flex;
  overflow-wrap: break-word;
  line-height: 1.3125;
  overflow-y: hidden;
}
.post {
  overflow-wrap: break-word;
  line-height: 1.5;
}
</style>

