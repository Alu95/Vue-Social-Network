<template>
<div>
  <Nav></Nav>
  <div class="container">
    <div class="row">
      <div class="col">
        <!-- POSTS -->
        <Posts />
        <!-- FINE POSTS -->
      </div>
    </div>
  </div>
</div>
  
</template>

<script>
import Nav from '@/components/Nav'
import Posts from '@/components/Posts'

export default {
  auth: false,
  components: {
    Nav,
    Posts
  },
  methods: {
    }
}
</script>

