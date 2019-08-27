<template>
  <div>
    <Nav></Nav>
    <div class="md-layout" :class="`md-alignment-top-center`">
        <div class="md-layout-item md-size-20 md-small-hide">
            <md-card class="cardCenter mx-2 my-4 text-center">
                <md-card-content>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
                </md-card-content>
            </md-card>
        </div>
        <div class="md-layout-item md-large-size-60 md-small-size-100">
            <md-card class="cardCenter mx-4 my-4 text-center">
                <md-card-header>
                    <div class="md-title"><a to="/">#{{id.charAt(0).toUpperCase() + id.slice(1)}}</a></div>
                </md-card-header>

                <md-card-content>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
                </md-card-content>
            
            </md-card>
        </div>
        <div class="md-layout-item md-size-20 md-small-hide">
            <md-card class="cardCenter mx-2 my-4 text-center">
                <md-card-content>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.
                </md-card-content>
            </md-card>
        </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav';

export default {
  computed: {
      id() {
          return this.$route.params.id;
      },
    },
    components: {
        Nav
    }
}
</script>


<style scoped>
</style>
