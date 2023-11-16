import axios from 'axios'

const apiLocal = axios.create({
    baseURL: 'https://node-deploy-senac-l69k.onrender.com'
})

export default apiLocal