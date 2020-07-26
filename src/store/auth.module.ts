import ApiService from "@/common/api.service";
import JwtService from "@/common/jwt.service";
import { REGISTER, LOGIN, LOGOUT, CHECK_AUTH } from "./actions.type";
import { SET_AUTH, SET_ERROR, PURGE_AUTH } from "./mutations.type";

type DataType = {
  errors: any;
  user: Record<string, any>;
  isAuthenticated: boolean;
}

const state: DataType = {
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
    },
    [CHECK_AUTH](context: any) {
      if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.get("user")
          .then(({ data }) => {
            context.commit(SET_AUTH, data.user);
          })
          .catch(({ response }) => {
            context.commit(SET_ERROR, response.data.errors);
          });
      } else {
        context.commit(PURGE_AUTH);
      }
    }
}

const mutations = {
    [SET_ERROR](state: DataType, error: any) {
        state.errors = error;
    },
    [SET_AUTH](state: DataType, user: any) {
        state.isAuthenticated = true;
        state.user = user;
        state.errors = {};
        JwtService.saveToken(state.user.token);
    },
    [PURGE_AUTH](state: DataType) {
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
};
