<template>
    <div class="homepage">
        <Homepage />
        <div class="row marketing">
            <div class="col-lg-6">
                <h4>Frontend</h4>
                <p>This frontend is built with Vue.js JavaScript Framework</p>

                <h4>Hosted on Heroku</h4>
                <p>This app is hosted on Heroku Free Server</p>

                <h4>Eslint</h4>
                <p>This app built on VS Code Editor with ESLint Linter and Vuter</p>
            </div>

            <div class="col-lg-6">
                <h4>Backend</h4>
                <p>Application Backend is built with NodeJs and Express Framework</p>

                <h4>NodeJS</h4>
                <p>This App API is also hosted on Heroku Free Server</p>

                <h4>MongoDB</h4>
                <p>The user database is saved in MongoDB and it is hosted on mLab free server</p>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Homepage from "@/components/Homepage.vue";

export default {
    name: "home",
    components: {
        Homepage
    }
};
</script>
