<template>
    <div>
        <h2>List of user forms submitted</h2>
        <br>
        <div v-if="userForms.length !=0">
            <formItems
                v-for="(formUser, index) in userForms"
                :key="index"
                :form-user="formUser"
            />
        </div>
        <div v-else>
            <h4>No user's forms found, submit new form now.</h4><br>
            <router-link v-slot="{ href, route, navigate }" to="/add-user">
                <a 
                    :href="href"
                    class="btn  btn-success"
                    role="button"
                    @click="navigate"
                >
                    Add New Form
                    <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                </a>
            </router-link>
            <br><br>
        </div>
    </div>
</template>

<script>
import FormItems  from '@/components/FormItems.vue'
import axios from "axios";

export default {
    name: 'forms-list',
    components: { FormItems  },
    data(){
        return {
            userForms: [],
            apiUrl: process.env.VUE_APP_API_URL
        }
    },
    mounted() {
        this.initList();
    },
    methods: {
        initList: function() {
            this.userApp.blockScreen("Loading Please wait...");
            if(!this.$store.getters.getUserFingerprint) {
                this.userApp.setFingerprintHash(this);
            } 
            setTimeout(() => {
                this.getUserForms(this.$store.getters.getUserFingerprint);
            }, 800);
        },
        getUserForms: function(userHash) {
            axios.get(`${this.apiUrl}/v1/json/user/${userHash}`)
                .then((response) => {
                    var self = this;
                    setTimeout(function() {
                        self.userApp.releaseScreen();
                    }, 500);
                    
                    if(Array.isArray(response.data))
                        response.data = (response.data).reverse();

                    this.userForms = response.data;
                    return response.data
                })
                .catch((err) => {
                    var errMessage = err.message;
                    if(err.response.data) {
                        errMessage = (err.response.data.message) ? 
                            err.response.data.message: errMessage;
                    }
                    this.userApp.releaseScreen();
                    this.userApp.notify('E', errMessage, 'Attention !');
                });
        }
    }
}
</script>
