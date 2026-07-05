import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
})

api.interceptors.response.use(
  (res) => {
    const data = res.data
    if (data && typeof data.code !== 'undefined' && data.code !== 0) {
      return Promise.reject(data)
    }
    return data?.data ?? data
  },
  (err) => Promise.reject(err)
)

export const submitAnswers = (data) => api.post('/assessment/submit', data)
export const getReport = (id) => api.get(`/assessment/report?id=${id}`)

export default api
