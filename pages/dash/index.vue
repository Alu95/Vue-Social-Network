<template>
    <div>
        <Nav></Nav>
        <h1 class="my-4 text-center">{{$auth.user.name}}'s Dashboard</h1>
        <b-row >
            <b-col>
                <b-card bg-variant="light" class="my-4">
                <h2>User Data</h2>
                <ul>
                <li v-for="(item,name,index) in $auth.user" 
                :key="index">
                {{name}}: {{item}}
                </li>
            </ul></b-card></b-col>
            <b-col cols="8">
                <!-- POSTS -->
                <Posts />
                <!-- FINE POSTS -->            
            </b-col>
            <b-col>
                <b-card bg-variant="light" class="my-4">
                <h2>Powers</h2>
                <p>Admin: {{$auth.hasScope('admin')}}</p>
                <p>User: {{$auth.hasScope('user')}}</p>
                <p>SCOPE ???: {{$auth.hasScope(undefined)}}</p>
                <p>Scope: {{$auth.scope}}</p>
                <p>Scope ç_ç: {{$auth.user.scope}}</p>
                <p>Scope: {{$auth.scopeKey}}</p>
                <p>state {{$auth.$state.user.scope}}</p>
                <p>state: </p></b-card></b-col>
        </b-row>
    </div>
</template>

<script>
import Nav from '@/components/Nav'
import Posts from '@/components/Posts'

export default {
    auth: true,
    components: {
        Nav,
        Posts
    },
    data() {
        return {
          
        }
    },
    computed: {
        
    }
    
}
</script>


