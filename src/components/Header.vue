<template>
    <nav class="navbar navbar-light">
        <div class="container">
            <router-link class="navbar-brand" :to="{ name: 'home' }">
                RwVue
            </router-link>
            <ul class="nav navbar-nav pull-xs-right">
                <li class="nav-item">
                    <router-link class="nav-link" active-class="active" exact :to="{ name: 'home' }">
                        Home
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
        </div>
    </nav>
</template>

<script>
export default {
    name: "RwvHeader"
}
</script>
