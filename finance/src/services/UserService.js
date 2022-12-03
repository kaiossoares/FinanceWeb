import axios from "axios"
const API_URL = "http://localhost:5165/api/"
// Cadastro Aluno: role professor
// Cadastro Curso: role professor
// Carômetro: todos

const user = JSON.parse(localStorage.getItem('user'))
const getPublicContent = () => {
    return axios.get(API_URL + "ganho")
}

const getAssinanteBoard = async () => {
    return await axios.get(API_URL + "meta", {
        headers: {
            Authorization:
            'Bearer ' + user.token
        }
    })
}

const UserService = {
    getPublicContent,
    getAssinanteBoard
}

export default UserService