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
              <li v-if="tag" class="nav-item">
                <router-link
                  :to="{ name: 'home-tag', params: { tag } }"
                  class="nav-link"
                  active-class="active"
                >
                  <i class="io-pound"></i> {{ tag }}
                </router-link>
              </li>
            </ul>
          </div>
          <router-view />
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <RwvTag v-for="(tag, index) in tags" :name="tag" :key="index" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import RwvTag from "@/components/Tag.vue";
import { FETCH_TAGS } from '@/store/actions.type';

export default Vue.extend({
  name: 'Home',
  components: {
    RwvTag
  },
  mounted() {
    this.$store.dispatch(FETCH_TAGS);
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    tags() {
      return this.$store.getters.tags;
    },
    tag() {
      return this.$route.params.tag;
    }
  }
});
</script>
