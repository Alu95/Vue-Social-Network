<template>
    <div>
        <p class="my-2 text-right" v-if="$auth.loggedIn">
            <b-spinner 
            type="grow" 
            small
            label="Spinning"
            variant='success'
            v-if="loading"
            ></b-spinner>
            <span v-else>{{up_votes}}</span>
            <font-awesome-icon 
            icon="arrow-up" 
            class="mx-2 text-success pointerM"
            @click="vote(post_id,1)"
                />
            <b-spinner 
            type="grow" 
            small
            label="Spinning"
            variant="danger"
            v-if="loading"
            ></b-spinner>
            <span v-else>{{down_votes}}</span>
            <font-awesome-icon 
            icon="arrow-down" 
            class="mx-2 text-danger pointerM"
            @click="vote(post_id,0)"
            />
        </p>
                <p></p>
    </div>
</template>

<script>
export default {
    props: [
        'post_id'
    ],
    data() {
        return{
            up_votes: 0,
            down_votes: 0,
            loading: false
        }
        
    },
    created() {
        if (this.$auth.loggedIn === true) {
            this.numVotes();
        }
    },
    methods: {
        async vote(id,voteValue) {
            await this.$axios.get('api/vote',{
                params: {
                    id: id,
                    value: voteValue
                }
            })
            .then(res => {
                this.numVotes()
                console.log(res);
                })
            .catch(err => {
                console.error(err); 
            })
        },
        async numVotes() {
            this.loading = true;
         await this.$axios.get('api/num_votes', {
                params: { id: this.post_id }
            })
            .then(res =>{
                    this.up_votes = res.data.up_votes;
                    this.down_votes = res.data.down_votes;
                    this.loading = false;
                
            })
            .catch(err => {
                console.log(err);
                this.loading = false;
            })
        }
    }
    
}
</script>

<style scoped>
.pointerM:hover{
    cursor: pointer;
}
</style>