import axios from 'axios';

const authService = {
    register: async (userData) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, userData);
            return response.data;

        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";
            const status = error.response?.status;

            const err = new Error(message);
            err.status = status;
            throw err;
        }
    },

    login: async ({ email, password }) => {

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { email, password })
            return response.data

        } catch (error) {

            const message = error.response?.data?.message || "Something went wrong";
            const status = error.response?.status;

            const err = new Error(message);
            err.status = status;
            throw err;
        }
    }
}

export default authService;