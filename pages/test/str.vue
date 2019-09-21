<template>
    <div>
        <p>{{listAllPosts}}</p>
        <hr>
        <p>{{listAllPosts.length}}</p>
        <p>{{numberTest}}</p>
        <button @click="addNum">Test</button>
        <button @click="showPosts">Test 2</button>
        <p>{{testTwt}}</p>
    </div>
</template>

<script>
import post from '@/components/postcom/PostV2';
import twitter from 'twitter-text';

export default {
    components: {
        post
    },
    computed: {
        testTwt() {
            return twitter.extractHashtags('test #lala #illa @test lala')
        }
    },
    created() {
        this.showPosts()
    },
}
</script>