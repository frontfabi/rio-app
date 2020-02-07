import { thunk, action } from 'easy-peasy'
import axios from 'axios'

const configuracoes = {
    baseURL: 'http://localhost:5000'
}

const json = localStorage.getItem('jwtToken')
const idEnteprise = localStorage.getItem('idEnteprise')
const idProfessional = localStorage.getItem('idProfessional')

if (json) {
    configuracoes.headers = {
        'Authorization': json
    }
}

const api = axios.create(configuracoes)

const getModel = {
    getProfessional: thunk(async () => {
        try {
            const request = await api.get('/api/candidate/', idProfessional)
            return request
        }
        catch (err) {
            console.log(err)
            return err.response
        }
    }),
    getEnterprise: thunk(async () => {
        try {
            const request = await api.get('/api/enterprise/', idEnteprise)
            return request
        }
        catch (err) {
            console.log(err)
            return err.response
        }
    }),
}


export default getModel