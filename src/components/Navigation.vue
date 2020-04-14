<template>
    <div class="header clearfix">
        <nav>
            <ul class="nav nav-pills pull-right">
                <router-link v-slot="{ href, route, navigate, isActive, isExactActive }" to="/">
                    <li :class="[isActive && 'router-link-active', isExactActive && 'active']">
                        <a :href="href" @click="navigate">Home</a>
                    </li>
                </router-link>
                <router-link v-slot="{ href, route, navigate, isActive, isExactActive }" to="/add-user">
                    <li :class="[isActive && 'router-link-active', isExactActive && 'active']">
                        <a :href="href" @click="navigate">Form</a>
                    </li>
                </router-link>
                <router-link v-slot="{ href, route, navigate, isActive, isExactActive }" to="/forms-list">
                    <li :class="[isActive && 'router-link-active', isExactActive && 'active']">
                        <a :href="href" @click="navigate">Forms List</a>
                    </li>
                </router-link>
            </ul>
        </nav>
        <h3 class="text-muted">
            <img alt="Applogo" src="../assets/add-user-logo.png">
            {{ appName }}
        </h3>
    </div>
</template>

<script>
export default {
    props: {
        appName: {
            type: String,
            required: true
        }
    }
};
</script>

<style scoped>
img {
  border: 0;
  width: 38px;
}
</style>
