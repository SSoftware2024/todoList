import axios from 'axios';
const API_URL = '<your_domain>';
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