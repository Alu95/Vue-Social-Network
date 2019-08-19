<template>
    <div>
        <b-card 
        bg-variant="light" 
        class="my-2"
        v-if="!$auth.loggedIn"
        > 
           <p>Sign Up or Log in to create your own posts</p> 
        </b-card>
            
        <b-card bg-variant="light" class="my-4 text-center" v-else>
            <h2>Post Something!</h2>
            <b-form-textarea
            id="textarea"
            v-model="postText.message"
            placeholder="Post something..."
            rows="3"
            max-rows="6"
            ></b-form-textarea>
            <b-button 
            variant="info"
            class="my-4"
            :disabled="disableArea"
            @click="publishPost"
            >Publish Post</b-button>
            <pre class="mt-3 mb-0">Character left: {{postLength}}/240</pre>
        </b-card>

        <div v-if="loading">
        <b-card 
        bg-variant="light" 
        class="my-2"
        >
            <div class="d-flex justify-content-center mb-3">
                <b-spinner label="Loading..."></b-spinner>
            </div>
        </b-card>
        </div>
        <b-card 
        bg-variant="light" 
        class="my-2"
        v-for="(item,name,index) in postShow"
        :key="index"
        > 
            <Post 
            :author="item.user_name"
            :date="item.created_at"
            :post_id="item.id_r"
            :postBody="item.message" 
            />
            <Likes :post_id="item.id_r"/>
        </b-card>
        
    </div>
</template>

<script>
import Post from '@/components/postcom/Post'
import Likes from '@/components/postcom/Like'

export default {
    data() {
        return {
            postShow: {}, 
            loading: false,
            postText: {
              message: ''
          }
        }
    },
    components: {
        Post,
        Likes
    },
    created() {
        this.postLists();
    },
    computed: {
        postLength() {
            return this.postText.message.length;
        },
        disableArea() {
            if (this.postLength >= 240){
                return true;
            }
            else{
                return false;
            }
        }
    },
    methods: {
        async postLists() {
            this.loading = true;
            await this.$axios.get('api/posts')
            .then(res => {
                this.postShow = res.data.postData;
                this.loading = false;
                console.log(res.data.postData)
            })
            .catch(err => {
                console.error(err); 
            })
        },
        async publishPost() {
           await this.$axios.post('api/send_post',this.postText)
           .then(res => {
               this.postLists();
               console.log(res)
           })
           .catch(err => {
               console.error(err); 
           })      
        },
    }
    
}
</script>