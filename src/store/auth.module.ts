import ApiService from "@/common/api.service";
import JwtService from "@/common/jwt.service";
import { REGISTER, LOGIN, LOGOUT } from "./actions.type";
import { SET_AUTH, SET_ERROR, PURGE_AUTH } from "./mutations.type";

const state = {
    errors: null,
    user: {},
    isAuthenticated: !!JwtService.getToken
}

const getters = {
  currentUser(state: any): { key: string } {
    return state.user;
  },
  isAuthenticated(state: any): boolean {
    return state.isAuthenticated;
  }
}

const actions = {
    [REGISTER](context: any, credentials: any) {
      return new Promise((resolve, reject) => {
        ApiService.post("users", { user: credentials })
          .then(({ data }) => {
            context.commit(SET_AUTH, data.user);
            console.log(data.user);
            resolve(data);
          })
          .catch(({ response }) => {
            context.commit(SET_ERROR, response.data.errors);
            reject(response);
          });
      });
    },
    [LOGIN](context: any, credentials: any) {
      return new Promise(resolve => {
        ApiService.post("users/login", { user: credentials })
          .then(({ data }) => {
            context.commit(SET_AUTH, data.user);
            resolve(data);
          })
          .catch(({ response }) => {
            context.commit(SET_ERROR, response.data.errors);
          })
      })
    },
    [LOGOUT](context: any) {
      context.commit(PURGE_AUTH);
    }
}

const mutations = {
    [SET_ERROR](state: any, error: any) {
        state.errors = error;
    },
    [SET_AUTH](state: any, user: any) {
        state.isAuthenticated = true;
        state.user = user;
        state.errors = {};
        JwtService.saveToken(state.user.token);
    },
    [PURGE_AUTH](state: any) {
      state.isAuthenticated = false;
      state.user = {};
      state.errors = {};
      JwtService.destroyToken();
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
