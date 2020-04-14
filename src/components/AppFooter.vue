<template>
    <footer class="footer">
        <p>&copy; {{ currentdate }} User~Database~APP, Inc.</p>
    </footer>
</template>

<script>
export default {
    name: "app-footer",
    data() {
        return {
            currentdate: (new Date().getFullYear()),
        }
    },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
