<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="onPublish(article.slug)">
            <fieldset :disabled="inProgress">
              <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" v-model="article.title" placeholder="Article Title" />
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control" v-model="article.description" placeholder="What's this article about?" />
              </fieldset>
              <fieldset class="form-group">
                <textarea rows="10" class="form-control" v-model="article.body" placeholder="Write your article (in markdown)">
                </textarea>
              </fieldset>
              <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="Enter tags" v-model="tagInput" @keypress.enter.prevent="addTag(tagInput)" />
                <div class="tag-list">
                  <span class="tag-default tag-pill"
                    v-for="(tag, index) of article.tagList"
                    :key="tag + index"
                  >
                    <i class="ion-close-round" @click="removeTag(tag)"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
            </fieldset>
            <button class="btn btn-lg pull-xs-right btn-primary" type="submit" :disabled="inProgress">
              Publish Article
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import store from "@/store";

import {
  ARTICLE_PUBLISH,
  ARTICLE_EDIT,
  FETCH_ARTICLE,
  ARTICLE_EDIT_ADD_TAG,
  ARTICLE_EDIT_REMOVE_TAG,
  ARTICLE_RESET_STATE
} from "@/store/actions.type";

export default Vue.extend({
  name: "RwvArticleEdit",
  props: {
    previousArticle: {
      type: Object,
      required: false
    }
  },
  async beforeRouteUpdate(to, from, next) {
    // Reset state if user goes from /editor/:id to /editor
    // The component is not recreated so we use to hook to reset the state.
    await store.dispatch(ARTICLE_RESET_STATE);
    return next();
  },
  async beforeRouteEnter(to, from, next) {
    // SO: https://github.com/vuejs/vue-router/issues/1034
    // If we arrive directly to this url, we need to fetch the article
    await store.dispatch(ARTICLE_RESET_STATE);
    if (to.params.slug !== undefined) {
      await store.dispatch(
        FETCH_ARTICLE,
        {
          articleSlug: to.params.slug,
          prevArticle: to.params.previousArticle
        }
      );
    }
    return next();
  },
  async beforeRouteLeave(to, from, next) {
    await this.$store.dispatch(ARTICLE_RESET_STATE);
    next();
  },
  data() {
    return {
      tagInput: null,
      inProgress: false,
      errors: {}
    }
  },
  computed: {
    article() {
      return this.$store.getters.article;
    }
  },
  methods: {
    onPublish(slug: string) {
      const action = slug ? ARTICLE_EDIT : ARTICLE_PUBLISH;
      this.inProgress = true
      this.$store
        .dispatch(action)
        .then(({ data }) => {
          this.inProgress = false;
          this.$router.push({
            name: "article",
            params: { slug: data.article.slug }
          })
          .catch(({ response }) => {
            this.inProgress = false;
            this.errors = response.data.errors;
          });
        });
    },
    removeTag(tag: string) {
      this.$store.dispatch(ARTICLE_EDIT_REMOVE_TAG, tag);
    },
    addTag(tag: string) {
      this.$store.dispatch(ARTICLE_EDIT_ADD_TAG, tag);
      this.tagInput = null;
    }
  }
});
</script>
