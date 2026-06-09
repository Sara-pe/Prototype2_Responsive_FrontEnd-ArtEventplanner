import axios from 'axios';

const authService = {
    register: async (userData) => {
        try {
            const response = await axios.post("http://localhost:3000/api/auth/register", userData);
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
            const response = await axios.post("http://localhost:3000/api/auth/login", { email, password })
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