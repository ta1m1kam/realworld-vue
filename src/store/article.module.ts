import Vue from "vue";
import {
    ArticlesService,
} from "@/common/api.service";

import {
    FETCH_ARTICLE,
    FETCH_COMMENTS,
    COMMENT_CREATE,
    COMMENT_DESTROY,
    FAVORITE_ADD,
    FAVORITE_REMOVE,
    ARTICLE_PUBLISH,
    ARTICLE_EDIT,
    ARTICLE_EDIT_ADD_TAG,
    ARTICLE_EDIT_REMOVE_TAG,
    ARTICLE_DELETE,
    ARTICLE_RESET_STATE,
} from "./actions.type";
import {
    RESET_STATE,
    SET_ARTICLE,
    SET_COMMENTS,
    TAG_ADD,
    TAG_REMOVE,
    UPDATE_ARTICLE_IN_LIST
} from "./mutations.type";

type ArticleType = {
    author: Record<string, any>;
    title: string;
    description: string;
    body: string;
    tagList: any;
}

type DataType = {
    article: ArticleType;
    comments: any;
};

const initialState = {
    article: {
        author: {},
        title: "",
        description: "",
        body: "",
        tagList: []
    },
    comments: []
};

const state = { ...initialState };


const getters = {
    article(state: DataType) {
        return state.article;
    },
    comments(state: DataType) {
        return state.comments;
    }
}

const actions = { 
    async [FETCH_ARTICLE](context: any, { articleSlug, prevArticle }: any) {
        console.log(articleSlug);
        // avoid extronuous network call if article exists
        if (prevArticle !== undefined) {
          return context.commit(SET_ARTICLE, prevArticle);
        }
        const { data } = await ArticlesService.get(articleSlug);
        context.commit(SET_ARTICLE, data.article);
        return data;
    },
    [ARTICLE_PUBLISH]({ state }: any) {
        return ArticlesService.create(state.article);
    },
    [ARTICLE_EDIT]({ state }: any) {
        return ArticlesService.update(state.article.slug, state.article);
    },
    [ARTICLE_EDIT_ADD_TAG](context: any, tag: string) {
        context.commit(TAG_ADD, tag);
    },
    [ARTICLE_EDIT_REMOVE_TAG](context: any, tag: string) {
        context.commit(TAG_REMOVE, tag);
    },
    [ARTICLE_RESET_STATE]({ commit }: any) {
        commit(RESET_STATE);
    }
}

export const mutations = {
    [SET_ARTICLE](state: DataType, article: ArticleType) {
        state.article = article;
    },
    [SET_COMMENTS](state: DataType, comments: any) {
        state.comments = comments;
    },
    [TAG_ADD](state: DataType, tag: any) {
        state.article.tagList = state.article.tagList.concat([tag]);
    },
    [TAG_REMOVE](state: DataType, tag: any) {
        state.article.tagList = state.article.tagList.filter((t: any) => t !== tag);
    }
    // [RESET_STATE]() {
    //     for (const f in state) {
    //         console.log(f);
    //         Vue.set(state, f, initialState);
    //     }
    // }
}

export default {
    state,
    actions,
    mutations,
    getters
};
