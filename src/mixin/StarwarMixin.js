export default {
    methods: {
        peopleApi(url) {
            return axios.get(url)
        },
        homeworldApi(url) {
            return axios.get(url)
        },
        filmApi(url) {
            return axios.get(url)
        },
        speciesApi(url) {
            return axios.get(url)
        },
        vehicleApi(url) {
            return axios.get(url)
        },
        starships(url) {
            return axios.get(url)
        }
    }
}