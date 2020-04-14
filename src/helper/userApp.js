import { Loading, Notification } from 'element-ui';
import Fingerprint2 from "fingerprintjs2";

export let _fullScreenLoader = false
export const blockScreen = (message) => {
    if(_fullScreenLoader !== false)
        _fullScreenLoader.text = message
    else {
        _fullScreenLoader = Loading.service({
            lock: true,
            text: message || '',
            fullscreen: true,
            customClass: 'leed-processing'
        })
    }
}

export const releaseScreen = () => {
    if(_fullScreenLoader !== false) {
        _fullScreenLoader.close()
        _fullScreenLoader = false
    }
}

export const notify = (type, message, title, isHtml = false, duration = 15000) => {
    let types = {
        S: 'success',
        I: 'info',
        W: 'warning',
        E: 'error'
    }
    
    Notification({
        title: title || '',
        message: message,
        type: types[type] || types.E,
        position: 'top-right',
        duration: duration,
        showClose: true,
        dangerouslyUseHTMLString: isHtml
    })
}

export const setFingerprintHash = (vm) => {
    Fingerprint2.get(function(components) {
        var fingerprint = Fingerprint2.x64hash128(components.map(function(pair) { return pair.value; }).join(),31);
        vm.$store.dispatch('setUserFingerprint', fingerprint);
    });
}

const userApp = {
    blockScreen,
    releaseScreen,
    notify ,
    setFingerprintHash
}

export default {
    install(Vue) {
        Vue.prototype.userApp = Vue.userApp = userApp
    }
}
