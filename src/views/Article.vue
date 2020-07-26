<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
          <h1>{{ article.title }}</h1>
      </div>
    </div>
    <div class="container page">
      <div class="row article-content">
          <div class="col-xs-12">
              <div v-html="parseMarkdown(article.body)"></div>
              <ul class="tag-list">

              </ul>
          </div>
      </div>  
      <hr />
      <div class="article-actions">

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import marked from "marked";
import store from "@/store";
import { FETCH_ARTICLE } from '@/store/actions.type'

export default Vue.extend({
    name: "RwvArticle",
    props: {
        slug: {
            type: String,
            required: true
        }
    },
    beforeRouteEnter(to, from, next) {
        console.log(to.params);
        Promise.all([
            store.dispatch(FETCH_ARTICLE, { articleSlug: to.params.slug }),
        ]).then(() => {
            next();
        })
    },
    computed: {
      article() {
        console.log(this.$store.getters);
        return this.$store.getters.article;
      }
    },
    methods: {
      parseMarkdown(content: string) {
        return marked(content);
      }
    }
})
</script>
