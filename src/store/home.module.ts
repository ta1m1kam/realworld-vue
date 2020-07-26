import { ArticlesService } from "@/common/api.service";
import { FETCH_ARTICLES } from "./actions.type";
import {
    FETCH_START,
    FETCH_END,
    SET_TAGS,
    UPDATE_ARTICLE_IN_LIST
} from "./mutations.type";

type DataType = {
    tags: Array<any>;
    articles: Array<any>;
    isLoading: boolean;
    articlesCount: number;
};

const state: DataType = {
    tags: [],
    articles: [],
    isLoading: true,
    articlesCount: 0
};

const getters = {
    articlesCount(state: DataType) {
        return state.articlesCount;
    },
    articles(state: DataType) {
        return state.articles;
    },
    isLoading(state: DataType) {
        return state.isLoading;
    },
    tags(state: DataType) {
        return state.tags;
    }
};

const actions = {
    [FETCH_ARTICLES] ({ commit }: any, params: any) {
        commit(FETCH_START);
        return ArticlesService.query(params.type, params.filters)
            .then(({ data }: any) => {
                commit(FETCH_END, data);
            })
            .catch((error: string | undefined) => {
                throw new Error(error);
            });
    }
};

const mutations = {
    [FETCH_START](state: DataType) {
        state.isLoading = true;
    },
    [FETCH_END](state: DataType, { articles, articlesCount }: any) {
        state.articles = articles;
        state.articlesCount = articlesCount;
        state.isLoading = false;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
