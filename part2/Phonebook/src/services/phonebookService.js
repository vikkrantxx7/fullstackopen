import axios from 'axios'

const axiosFetch = axios.create({
    baseURL: 'http://localhost:3001/persons/'
})
const getAll = () => {
    return axiosFetch.get().then(({ data }) => data)
}
const post = contact => {
    return axiosFetch.post('', contact).then(({ data }) => data)
}
const put = (id, contact) => {
    return axiosFetch.put(`${id}`, contact).then(({ data }) => data)
}
const del = id => {
    return axiosFetch.delete(`${id}`).then(({ data }) => data)
}

export default {
    getAll,
    post,
    put,
    del
}