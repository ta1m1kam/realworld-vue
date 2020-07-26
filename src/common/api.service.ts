import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { API_URL } from "@/common/config";
import jwtService from './jwt.service';

const ApiService = {
    init(): void {
        Vue.use(VueAxios, axios);
        console.log(API_URL);
        Vue.axios.defaults.baseURL = API_URL;
    },

    setHeader() {
        Vue.axios.defaults.headers.common[
            "Authorization"
        ] = `Token ${jwtService.getToken()}`;
    },

    query(resouce: any, params: any) {
        return Vue.axios.get(resouce, params).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        })
    },

    get(resouce: string, slug = "") {
        return Vue.axios.get(`${resouce}/${slug}`).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    },

    post(resouce: string, params: any) {
        return Vue.axios.post(`${resouce}`, params);
    },

    update(resouce: string, slug: string, params: any) {
        return Vue.axios.put(`${resouce}/${slug}`, params);
    }
}

export default ApiService;

export const ArticlesService = {
    query(type: string, params: any) {
        return ApiService.query("articles" + (type === "feed" ? "/feed" : ""), {
            params: params
        });
    },
    get(slug: string) {
        return ApiService.get("articles", slug);
    },
    create(params: any) {
        return ApiService.post("articles", { article: params });
    },
    update(slug: string, params: any) {
        return ApiService.update("articles", slug, { article: params });
    }
}
