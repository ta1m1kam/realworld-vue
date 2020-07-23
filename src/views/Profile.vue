<template>
  <div class="profile container">
    <h1>This is an {{ currentUser.username }} page</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "profile",
    computed: {
        currentUser() {
            return this.$store.getters.currentUser;
        }
    }
});
</script>
