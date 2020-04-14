import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/add-user",
        name: "AddUser",
        component: () =>
            import(/* webpackChunkName: "add-user" */ "../views/AddUser.vue")
    },
    {
        path: "/forms-list",
        name: "FormsList",
        component: () =>
            import(/* webpackChunkName: "forms-list" */ "../views/FormsList.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    linkExactActiveClass: "active",
    base: process.env.BASE_URL,
    routes
});

export default router;
