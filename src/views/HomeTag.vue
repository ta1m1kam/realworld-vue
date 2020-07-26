<template>
    <div class="home-tag">
        <RwvArticleList :tag="tag" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import RwvArticleList from "@/components/ArticleList.vue";

export default Vue.extend({
    name: "RwvHomeTag",
    components: {
        RwvArticleList
    },
    computed: {
        tag() {
            return this.$route.params.tag;
        }
    }
})
</script>
