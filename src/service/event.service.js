import axios from 'axios';
import { getDefaultStore } from 'jotai'
import { saveAtom } from '../atoms/token.atom'


const eventService = {

    getAll: async () => {
        const token = getDefaultStore().get(saveAtom)

        //Extract the id from the token
        const payload = JSON.parse(atob(token.split('.')[1]))
        const userId = payload.id

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    },

    getById: async (eventId) => {
        const token = getDefaultStore().get(saveAtom)

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events/${eventId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data

    },


    getInvites: async () => {
        const token = getDefaultStore().get(saveAtom)
        const payload = JSON.parse(atob(token.split('.')[1]))
        const userId = payload.id

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/events/user/${userId}/invitations`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    },

    create: async (eventData) => {

        const token = getDefaultStore().get(saveAtom)

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/events`, eventData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data

    },

    sendInvitations: async (eventId, userIds) => {
        const token = getDefaultStore().get(saveAtom)
        const payload = JSON.parse(atob(token.split('.')[1]))
        const myId = payload.id

        const responses = userIds.map(userId =>
            axios.post(
                `${import.meta.env.VITE_API_URL}/api/events/${eventId}/invitations`,
                { to: userId, from: myId },
                { headers: { Authorization: `Bearer ${token}` } }
            )
        )
        return Promise.all(responses)
    },

    updateInvitation: async (inviteId, eventId, status) => {
        const token = getDefaultStore().get(saveAtom)

        const response = await axios.patch(`${import.meta.env.VITE_API_URL}/api/events/${eventId}/invitations/${inviteId}`,
            { status },
            { headers: { Authorization: `Bearer ${token}` } }

        )

    },

    
    deleteEvent: async (eventId) => {
        const token = getDefaultStore().get(saveAtom)

        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/events/${eventId}`,
            { headers: { Authorization: `Bearer ${token}` } }

        )

    }

}

export default eventService