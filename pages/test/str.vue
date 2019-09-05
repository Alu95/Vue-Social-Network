<template>
    <div>
        <p>{{listAllPosts}}</p>
        <hr>
        <p>{{listAllPosts.length}}</p>
        <p>{{numberTest}}</p>
        <button @click="addNum">Test</button>
        <button @click="showPosts">Test 2</button>
        <md-card v-for="post in listAllPosts" :key="post.id_r">
            <md-card-content>
                <post 
                :author="post.user_name" 
                :date="post.created_at" 
                :post_id="post.id_r" 
                :postBody="post.message" />
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
import post from '@/components/postcom/PostV2'

export default {
    components: {
        post
    },
    created() {
        this.showPosts()
    },
}
</script>