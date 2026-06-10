import axios from 'axios';
import { getDefaultStore } from 'jotai'
import { saveAtom } from '../atoms/token.atom'


const userService = {

    getById: async () => {

        const token = getDefaultStore().get(saveAtom)

        //Extract the id from the token
        const payload = JSON.parse(atob(token.split('.')[1]))
        const userId = payload.id

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data

    },

    getAll: async () => {

        const token = getDefaultStore().get(saveAtom)
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data

    },

    sendFriendRequest: async (targetUserId) => {
        const token = getDefaultStore().get(saveAtom)

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/${targetUserId}/friendRequests`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return response.data
    },

    modifyFriendRequest: async (friendRequestId, status) => {
        const token = getDefaultStore().get(saveAtom)

        //Extract the id from the token
        const payload = JSON.parse(atob(token.split('.')[1]))
        const userId = payload.id


        const response = await axios.patch(`${import.meta.env.VITE_API_URL}/api/users/${userId}/friendRequests/${friendRequestId}`, 
            { status }, 
            {headers: { Authorization: `Bearer ${token}` }
        })
        return response.data
    },

    deleteFriend: async (friendId) => {
        const token = getDefaultStore().get(saveAtom)

        const payload = JSON.parse(atob(token.split('.')[1]))
        const userId = payload.id


        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${userId}/friends/${friendId}`, 
            {headers: { Authorization: `Bearer ${token}` }
        })
        return response.data
    }

}


export default userService