<template>
    <div>
        <b-navbar toggleable="lg" type="light" variant="light">
            <b-navbar-brand to="/"
            ><img src="/icon.png" class="logoPic">
            
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item to="/dash/" v-if="$auth.loggedIn">Dashboard</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right v-if="$auth.loggedIn">
                <!-- Using 'button-content' slot -->
                <template slot="button-content">User</template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#" @click="logOut">Sign Out</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-navbar-nav right v-else>
                    <b-nav-item class="active" to="/auth/signup">Sign Up</b-nav-item>
                    <b-nav-item class="active" to="/auth/login">Sign In</b-nav-item>
                </b-navbar-nav>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    methods: {
        async logOut() {
            await this.$auth.logout();
        }
    }
}
</script>

<style scoped>
.logoPic{
    height: 3vh;
    position: relative;
    left: 50%;
    transform: translate(-50%);
}
</style>
