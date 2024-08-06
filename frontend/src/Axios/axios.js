import axios from "axios"
const instance = axios.create({
    baseURL:"http://162.43.26.77/api"
})
export default instance