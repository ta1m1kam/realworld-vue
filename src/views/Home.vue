<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">RwVue</h1>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link :to="{ name: 'home' }" class="nav-link" exact active-class="active">
                  Global Feed
                </router-link>
              </li>
              <li v-if="isAuthenticated" class="nav-item">
                <router-link :to="{ name: 'home-my-feed' }" class="nav-link" active-class="active">
                  Your Feed
                </router-link>
              </li>
            </ul>
          </div>
          <router-view />
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  }
});
</script>
