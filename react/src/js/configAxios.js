import axios from 'axios';
const API_URL = 'https://contacerta.solucoessoftware.com/php/api/';
const getAxios = async () => {
    try {
        const instance = axios.create({
            baseURL: API_URL,
        });

        return instance;
    } catch (error) {
        toast.error("Erro na configuração com o servidor")
    }
}

export default getAxios;