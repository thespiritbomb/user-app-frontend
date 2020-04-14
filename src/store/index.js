import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userFingerprint: "" // user unique finger print
    },
    
    getters: {
        getUserFingerprint: (state) => {
            return state.userFingerprint
        }
    },
    
    mutations: {
        updateFingerprint(state, userFingerprint) {
            state.userFingerprint = userFingerprint;
        }
    },
    
    actions: {
        setUserFingerprint(context, fingerprintHash) {
            context.commit('updateFingerprint', fingerprintHash);
        }
    }
});
