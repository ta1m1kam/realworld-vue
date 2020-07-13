<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Sign up</h1>
                    <p class="text-xs-center">
                        <router-link :to="{ name: 'login'}">
                            Have an account?
                        </router-link>
                    </p>
                    <ul v-if="errors" class="error-messages">
                        <li v-for="(v, k) in errors" :key="k">
                            {{ k }} {{ v | error }}
                        </li>
                    </ul>
                    <form @submit.prevent="onSubmit">
                        <fieldset class="form-group">
                          <input
                            class="form-control form-control-lg"
                            type="text"
                            v-model="username"
                            placeholder="Username"
                          />
                        </fieldset>
                        <fieldset class="form-group">
                          <input
                            class="form-control form-control-lg"
                            type="text"
                            v-model="email"
                            placeholder="Email"
                          />
                        </fieldset>
                        <fieldset class="form-group">
                          <input
                            class="form-control form-control-lg"
                            type="password"
                            v-model="password"
                            placeholder="Password"
                          />
                        </fieldset>
                        <button class="btn btn-lg btn-primary pull-xs-right">
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { REGISTER } from "@/store/actions.type";

type DataType = {
  username: string;
  email: string;
  password: string;
}

export default Vue.extend ({
  name: "RwvRegister",
  data(): DataType {
    return {
      username: "",
      email: "",
      password: ""
    }
  },
  computed: {
    errors() {
      return this.$store.state.auth.errors;
    }
  },
  methods: {
    onSubmit(): void {
      this.$store
        .dispatch(REGISTER, {
          email: this.email,
          password: this.password,
          username: this.username
        })
        .then(() => this.$router.push({ name: "home" }));
    }
  }
})
</script>
