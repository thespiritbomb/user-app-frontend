<template>
    <div>
        <h2 class="text-center">
            Fill up the form to add new user
        </h2>
        <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)">
                <div class="form-group">
                    <label for="name">Name: *</label>
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Full Name"
                        rules="required|alpha_spaces|max:100"
                    >
                        <input
                            id="name"
                            v-model="name"
                            type="text"
                            class="form-control"
                            placeholder="Enter user full name"
                        >
                        <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
                <div class="form-group">
                    <label for="dob">Date of Birth: *</label>
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Date of Birth"
                        rules="required|dob18plus"
                    >
                        <datepicker
                            id="dob"
                            v-model="dob"
                            input-class="form-control inputDate"
                            name="dob"
                            format="dd-MM-yyyy"
                            placeholder="Enter Date of Birth"
                        ></datepicker>
                        <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
                <div class="form-group">
                    <label for="email">Email: *</label>
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="E-mail"
                        rules="required|email|max:75"
                    >
                        <input
                            id="email"
                            v-model="email"
                            type="email"
                            class="form-control"
                            placeholder="Enter email"
                        >
                        <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
                <div class="form-group">
                    <label for="contact">Phone Number: *</label>
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="Phone Number"
                        rules="required|digits:10|numeric"
                    >
                        <input
                            id="contact"
                            v-model="contact"
                            type="text"
                            class="form-control"
                            placeholder="Enter phone number"
                        >
                        <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
                <input id="userHashId" v-model="userHash" type="hidden">
                <div class="form-group">
                    <vue-recaptcha
                        :sitekey="recaptchaSiteKey"
                        :load-recaptcha-script="true"
                        @verify="onRecaptchaVerify"
                        @expired="onRecaptchaExpired"
                        @error="onRecaptchaError"
                    ></vue-recaptcha>
                    <ValidationProvider
                        v-slot="{ errors }"
                        name="recaptcha"
                        rules="required|recaptchaExpireCheck|recaptchaErrorCheck"
                    >
                        <input
                            id="verifyResponse"
                            v-model="recaptchaResponse"
                            type="hidden"
                        >
                        <span class="error">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
                <button type="submit" class="btn btn-md btn-success">
                    Submit Form
                </button>
            </form>
        </ValidationObserver>
        <br>
    </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { extend } from "vee-validate";
import Fingerprint2 from "fingerprintjs2";
import VueRecaptcha from "vue-recaptcha";
import axios from "axios";
import qs from "querystring";

extend("dob18plus", {
    validate: (value) => {
        let birthDate = new Date(value);
        let today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age < 18 ? false : true;
    },
    message: "The Date of Birth should be greater than 18",
});

extend("recaptchaExpireCheck", {
    validate: (value) => {
        return value == "expired" ? false : true;
    },
    message: "Recaptcha has expired, please verify it again.",
});

extend("recaptchaErrorCheck", {
    validate: (value) => {
        return value == "error" ? false : true;
    },
    message: "Recaptcha verification failed. please try it again.",
});

export default {
    components: {
        Datepicker,
        VueRecaptcha,
    },

    data: function () {
        return {
            name: "",
            dob: "",
            email: "",
            contact: "",
            userHash: "",
            submitDate: "",
            x64signature: "",
            recaptchaResponse: "",
            recaptchaSiteKey: process.env.VUE_APP_SITE_KEY,
            apiUrl: process.env.VUE_APP_API_URL,
        };
    },

    mounted() {
        this.setUserHash();
    },

    methods: {
        setUserHash: function () {
            if (!this.$store.getters.getUserFingerprint) {
                this.userApp.setFingerprintHash(this);
            }
        },

        formatTheDate: function (date) {
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();

            if (day < 10) {
                day = "0" + day;
            }
            if (month < 10) {
                month = "0" + month;
            }

            return day + "-" + month + "-" + year;
        },

        onSubmit: function () {
            this.dob = this.formatTheDate(this.dob);
            this.submitDate = new Date().toLocaleString();
            this.userHash = this.$store.getters.getUserFingerprint;
            this.x64signature = Fingerprint2.x64hash128(
                this.userHash + "user-db-app"
            );

            if (process.env.NODE_ENV == "development") {
                console.log(this.x64signature);
                console.log(this.$store.state.userFingerprint);
            }

            this.userApp.blockScreen("Proccessing details. Please wait...");
            const config = {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            };
            const requestBody = {
                name: this.name,
                dob: this.dob,
                email: this.email,
                contact: this.contact,
                userHash: this.userHash,
                submitDate: this.submitDate,
                x64signature: this.x64signature,
                recaptchaResponse: this.recaptchaResponse,
            };
            axios
                .post(
                    `${this.apiUrl}/v1/json/user/create`,
                    qs.stringify(requestBody),
                    config
                )
                .then((response) => {
                    this.userApp.releaseScreen();
                    this.userApp.blockScreen(
                        "User Form submitted successfully. Redirecting Please wait..."
                    );
                    var self = this;
                    setTimeout(function () {
                        self.$router.push({ name: "FormsList" });
                        self.userApp.releaseScreen();
                    }, 1500);
                    return response.data;
                })
                .catch((err) => {
                    var errMessage = err.message;
                    if (err.response.data) {
                        errMessage = err.response.data.message
                            ? err.response.data.message
                            : errMessage;
                    }
                    this.userApp.releaseScreen();
                    this.userApp.notify("E", errMessage, "Submit Failed");
                });
        },
        onRecaptchaVerify: function (response) {
            this.recaptchaResponse = response;
        },
        onRecaptchaExpired: function () {
            this.recaptchaResponse = "expired";
        },
        onRecaptchaError: function () {
            this.recaptchaResponse = "error";
        },
    },
};
</script>

<style>
.error {
    display: block;
    color: red;
    padding-top: 4px;
}
.inputDate {
    background-color: white !important;
}
</style>
