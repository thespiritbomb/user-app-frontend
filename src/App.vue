<template>
    <div id="app" class="container">
        <Navigation :app-name="title" />
        <transition name="fade" mode="out-in">
            <router-view :key="$route.path" />
        </transition>
        <AppFooter />
    </div>
</template>
<script>
import Navigation from "@/components/Navigation";
import AppFooter from "@/components/AppFooter";

export default {
    components: {
        Navigation,
        AppFooter
    },
    data() { 
        return {
            title: process.env.VUE_APP_TITLE 
        }
    },
    mounted() {
        this.userApp.setFingerprintHash(this);
    }
};
</script>
<style>
/* Space out content a bit */
    body {
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s;
    }
    .fade-enter,
    .fade-leave-to {
      opacity: 0;
    }

    /* Everything but the jumbotron gets side spacing for mobile first views */
    .header,
    .marketing,
    .footer {
        padding-right: 15px;
        padding-left: 15px;
    }
    /* Custom page header */
    .header {
        padding-bottom: 20px;
        border-bottom: 1px solid #e5e5e5;
    }
    /* Make the masthead heading the same height as the navigation */
    .header h3 {
        margin-top: 0;
        margin-bottom: 0;
        line-height: 40px;
    }
    /* Custom page footer */
    .footer {
        padding-top: 19px;
        color: #777;
        border-top: 1px solid #e5e5e5;
    }
    /* Customize container */
    @media (min-width: 768px) {
        .container {
            max-width: 730px;
        }
    }
    .container-narrow > hr {
        margin: 30px 0;
    }
    /* Main marketing message and sign up button */
    .jumbotron {
        text-align: center;
        border-bottom: 1px solid #e5e5e5;
    }
    .jumbotron .btn {
        font-size: 15px;
    }
    .jumbotron {
        padding: 20px;
        font-size: 21px;
    }
    /* Supporting marketing content */
    .marketing {
        margin: 40px 0;
    }
    .marketing p + h4 {
        margin-top: 28px;
    }
    /* Responsive: Portrait tablets and up */
    @media screen and (min-width: 768px) {
        /* Remove the padding we set earlier */
        .header,
        .marketing,
        .footer {
            padding-right: 0;
            padding-left: 0;
        }
        /* Space out the masthead */
        .header {
            margin-bottom: 30px;
        }
        /* Remove the bottom border on the jumbotron for visual effect */
        .jumbotron {
            border-bottom: 0;
        }
    }
</style>
