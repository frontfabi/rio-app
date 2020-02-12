import { thunk, action } from 'easy-peasy'
import axios from 'axios'

const enterpriseModel = {
  registerJob: thunk(async (actions, payload) => {
    try {
      await axios.post('/api/job', payload)
      return {
        status: 200,
        msg: 'Sua vaga foi postada!'
      }
    }
    catch (err) {
      console.log(err)
      const error = err.response.data && err.response.data.job
      actions.setError(error)
    }
  }),
  getAllEnterprises: thunk(async (actions, payload) => {
    try {
      return await axios.get('/api/enterprise/all')
    }
    catch (err) {
      console.log(err)
      const error = err.response.data && err.response.data.enterprises
      actions.setError(error)
    }
  }),
  enterprises: [],
  setEnterprises: action((state, payload) => ({
    enterprises: [...payload]
  })),
  error: {},
  setError: action((state, payload) => ({
    error: payload
  }))
}

export default enterpriseModel