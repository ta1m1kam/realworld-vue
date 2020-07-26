<template>
    <router-link :to="{ name: 'home-tag', params: { tag: name }}" :class="className" v-text="name"></router-link>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: "RwvTag",
    props: {
        name: {
            type: String,
            required: true
        },
        className: {
            type: String,
            default: "tag-pill tag-default"
        }
    }
})
</script>
