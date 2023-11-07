import axios from "axios";
const axiosRequest = async (method, url, data = {}, headers = {}, params = {}) => {
    try {
        const response = await axios({
            method,
            url,
            data,
            headers,
            params
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }   
};

export default { axiosRequest }
