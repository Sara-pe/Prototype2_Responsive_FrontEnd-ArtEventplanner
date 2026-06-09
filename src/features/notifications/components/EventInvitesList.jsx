import { useEffect, useState } from "react"
import styles from '../Notifications.module.css'
import eventService from '../../../service/event.service'
import { InviteCard } from './InviteCard'

export const EventInvitesList = ({ onNmbInvites }) => {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [data, setData] = useState(null)



    useEffect(() => {

        const fetchData = async () => {

            try {
                const invites = await eventService.getInvites()
                setData(invites);
                setLoading(false);
           

            } catch (err) {
                setError(true)
                setLoading(false)
            }
        }

        fetchData()

    }, [])


    useEffect(() => {

        if (data) { //runs after every render where its dependencies changed -> first render data is still null, avoid the crash

            onNmbInvites(data.invitationsReceived.filter((invitation) => (invitation.status === 'pending')).length)

        }

    }, [data])

    if (error) return (<p>Something went wrong</p>)
    if (loading) return <p>Loading...</p>

    console.log('Event invites:', data)
    const invitationsReceived = data?.invitationsReceived.filter((invitation) => (invitation.status === 'pending'))
  console.log('invitations received:', invitationsReceived)

    return (
         <div className={styles.listCards}>
            {data && invitationsReceived.map((invite, index) => (<InviteCard key={invite._id} invite={invite} index={index}/>))
            }
        </div>
    )
}