import ApiService from "@/common/api.service";
import { REGISTER } from "./actions.type";
import { SET_AUTH, SET_ERROR } from "./mutations.type";

const state = {
    errors: null,
    user: {},
    isAuthenticated: false
}

const actions = {
    [REGISTER](context: any, credentials: any) {
        return new Promise((resolve, reject) => {
          ApiService.post("users", { user: credentials })
            .then(({ data }) => {
              context.commit(SET_AUTH, data.user);
              resolve(data);
            })
            .catch(({ response }) => {
              context.commit(SET_ERROR, response.data.errors);
              reject(response);
            });
        });
      },
}

const mutations = {
    [SET_ERROR](state: any, error: any) {
        state.errors = error;
    },
    [SET_AUTH](state: any, user: any) {
        state.isAuthenticated = true;
        state.user = user;
        state.errors = {};
    }
}

export default {
    state,
    actions,
    mutations
}
