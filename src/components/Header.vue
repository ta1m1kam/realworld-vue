<template>
    <nav class="navbar navbar-light">
        <div class="container">
            <router-link class="navbar-brand" :to="{ name: 'home' }">
                RwVue
            </router-link>
            <ul v-if="!isAuthenticated" class="nav navbar-nav pull-xs-right">
                <li class="nav-item">
                    <router-link class="nav-link" active-class="active" exact :to="{ name: 'home' }">
                        Home
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" active-class="active" exact :to="{ name: 'about' }">
                        About
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" active-class="active" exact :to="{ name: 'login' }">
                        <i class="ion-compose" /> Sign in
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" active-class="active" exact :to="{ name: 'register' }">
                        <i class="ion-compose" /> Sign up
                    </router-link>
                </li>
            </ul>
            <ul v-else class="nav navbar-nav pull-xs-right">
                <li class="nav-item">
                    <router-link class="nav-link" active-class="active" exact :to="{ name: 'home' }">
                        Home
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" active-class="active" exact :to="{ name: 'about' }">
                        About
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" active-class="active" exact :to="{ name: 'article-edit' }">
                        &nbsp; New Article
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" active-class="active" exact :to="{ name: 'settings' }">
                        <i class="ion-gear-a" />&nbsp; Settings
                    </router-link>
                </li>
                <li class="nav-item" v-if="currentUser.username">
                    <router-link class="nav-link" active-class="active" exact :to="{ name: 'profile' }">
                        {{ currentUser.username }}
                    </router-link>
                </li>
                <li class="nav-item">
                    <button @click="logout" class="nav-link" active-class="active">
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { LOGOUT } from '@/store/actions.type';

export default {
    name: "RwvHeader",
    computed: {
        currentUser() {
          return this.$store.getters.currentUser;
        },
        isAuthenticated() {
          return this.$store.getters.isAuthenticated;
        }
    },
    created() {
       console.log(this.$store.getters.currentUser.username);
    },
    methods: {
        logout() {
            this.$store.dispatch(LOGOUT).then(() => {
                this.$router.push({ name: "home" });
            })
        }
    }
}
</script>
