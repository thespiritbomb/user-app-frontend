<template>
    <div class="jumbotron">
        <h2>WELCOME TO USER~DATABASE</h2>
        <p class="lead">
            This app focus on adding user to MongoDB database.
            Whenever the user is added in the database successful then an email will be send to user as per given task.<br>
            So start by adding new user to the database.
        </p>
        <p>
            <router-link v-slot="{ href, route, navigate }" to="/add-user">
                <a 
                    :href="href"
                    class="btn  btn-success"
                    role="button"
                    @click="navigate"
                >
                    Add New User
                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                </a>
            </router-link>
        </p>
    </div>
</template>

<script>
export default {
    name: "homepage"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
