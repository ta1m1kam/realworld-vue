import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { API_URL } from "@/common/config";

const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        console.log(API_URL);
        Vue.axios.defaults.baseURL = API_URL;
    },

    post(resouce: string, params: any) {
        console.log("hoge")
        return Vue.axios.post(`${resouce}`, params);
    }   
}

export default ApiService;
