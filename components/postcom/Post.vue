<template>
    <div>
    <div class="my-2 ">
        <md-avatar class="md-avatar-icon md-primary">{{author.substring(0, 3)}}</md-avatar>
        <span class="font-weight-bold text-left"> {{author}} - {{date}} </span>
        <div class="menu1"> 
            <b-dropdown id="dropdown-1" text="" class="m-md-2" variant="light" v-if="$auth.loggedIn">
            <b-dropdown-item @click="edit = !edit">Edit</b-dropdown-item>
            <b-dropdown-item>Save</b-dropdown-item>
            <b-dropdown-item>Delete</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item>Report</b-dropdown-item>
            <b-dropdown-item>Don't show posts from {{$auth.user.name}}</b-dropdown-item>
    </b-dropdown></div>
     </div>
     <div v-if="edit"> 
         <b-form-textarea
            id="textarea"
            v-model="postText"
            rows="3"
            max-rows="6"
        ></b-form-textarea>
         <div class="mt-3">
            <b-button-group>
            <b-button variant="info" @click="updatePost()">Submit</b-button>
            <b-button variant="light" @click="cancelEdit()">Cancel</b-button>
            </b-button-group>
        </div>
    </div>
    <b-spinner v-else-if="editLoad"></b-spinner>
     <p v-else> 
        <span v-for="(node, n) in nodes" :key="n">
        <nuxt-link v-if="n % 2" :to="'../hash/' + node">#{{node}}</nuxt-link>
        <span  v-else>{{node}}</span >
        </span>
     </p>
    
    </div>
</template>

<script>
export default {
    props: ['author','date','postBody','post_id'],
    data() {
        return {
            postText: ``,
            edit: false,
            editLoad: false,
            postEdit: {
                update: '',
                id: ''
            }
            //
        }
    },
    computed: {
        nodes() {
        return this.postText.split(/#([\w]+)/);
        }
    },
    created() {
        this.postText = this.postBody;
    },
    methods: {
        async updatePost() {
            this.edit = !this.edit;
            this.editLoad = true;
            await this.$axios.post('api/update_post',
            {update: this.postText,
             id: this.post_id
            })
            .then(res => {
                this.editLoad = false;
                console.log(res)
            })
            .catch(err => {
                console.error(err); 
            })
        },
        cancelEdit() {
            this.edit = !this.edit;
            this.postText = this.postBody;
        }
    }
}
</script>

<style scoped>
.menu1{
    position: relative;
    float: right;
    display: inline-flex;
}

</style>