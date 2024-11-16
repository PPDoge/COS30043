const { createApp } = Vue;

createApp({
    data() {
        return {
            units: [],
            error: null
        };
    },
    mounted() {
        fetch('units.json')
            .then(response => response.json())
            .then(data => {
                this.units = data;
            })
            .catch(error => {
                this.error = 'Error fetching data: ' + error.message;
            });
    }
}).mount('#app');