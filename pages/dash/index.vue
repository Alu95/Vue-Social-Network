<template>
    <div>
        <Nav></Nav>
        <h1>DASHBOARD</h1>
        <h3>{{$auth.user.name}}</h3>
        <ul>
            <li v-for="(item,name,index) in $auth.user" 
            :key="index">
            {{name}}: {{item}}
            </li>
        </ul>
        <h2>Powers</h2>
        <p>Admin: {{$auth.hasScope('admin')}}</p>
        <p>User: {{$auth.hasScope('user')}}</p>
        <p>SCOPE ???: {{$auth.hasScope(undefined)}}</p>
        <p>Scope: {{$auth.userscope}}</p>
        <p>Scope: {{$auth.scopeKey}}</p>
        <p>state {{$auth.$state.user.scope}}</p>
        <p>state: </p>
    </div>
</template>

<script>
import Nav from '@/components/Nav'
export default {
    auth: true,
    components: {
        Nav
    }
    
}
</script>