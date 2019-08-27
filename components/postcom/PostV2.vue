<template>
    <div>
        <div class="md-layout">
            <div class="md-layout-item md-large-size-10 md-xlarge-size-7 md-small-size-20">
            <md-avatar class="md-avatar-icon md-primary">{{author.substring(0, 3)}}</md-avatar>
            </div>
            <div class="md-layout-item md-large-size-90 md-xlarge-size-90 md-small-size-80 md-xsmall-100">
                <span class="text-left">
                    <span class="font-weight-bold">
                        {{author}}
                        </span>  
                        - {{date | moment("MMMM Do YYYY - HH:mm")}} 
                    </span>
                <!-- INIZIO DEL TESTO -->
                <div>
                <span class="post" v-for="(text, index) in parsedPost" :key="`text-${index}`">
                    <span v-if="text.substring(0,1) === '#'">
                        <nuxt-link :to="'../hash/' + text.substring(1, text.length)">{{text}}</nuxt-link>
                    </span>
                    <span v-else-if="text.substring(0,1) === '@'">
                        <nuxt-link :to="'../user/' + text.substring(1, text.length)">{{text}}</nuxt-link>
                    </span>
                    <span v-else>{{text}}</span>
                </span>
                </div>
                
                <!-- FINE DEL TESTO -->
            </div>
        </div>
    </div>
</template>

<script>
var twitter = require("twitter-text");

export default {
    data() {
        return {

        }
    },
    props: ['author','date','postBody','post_id'],
    computed: {
        parsedPost() {
            let text = this.postBody;
            let result = [];
            let entities = twitter.extractEntitiesWithIndices(this.postBody);
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
    }
    },
    
    
}
</script>