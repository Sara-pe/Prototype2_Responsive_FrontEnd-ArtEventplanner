import styles from '../Notifications.module.css'
import userService from '../../../service/user.service'
import { RequestCard } from './RequestCard'
import { Spinner } from '../../events/components/Spinner'
import { useState, useEffect } from 'react'

export const FriendRequestsList = ({ onNmbRequests }) => {


    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [data, setData] = useState(null)

    useEffect(() => {

        const fetchData = async () => {

            try {

                const userData = await userService.getById()
                setData(userData);
                setLoading(false)

            } catch (err) {
                setLoading(false)
                setError(true)
                setData(null)
            }
        }

        fetchData();

    }, [])

    useEffect(() => {

        if (data) {
            onNmbRequests(data.friendRequests.filter((request) => request.status === 'pending').length)
        }
    }, [data])

    if (loading) return (
        <div className={styles.loading}>
            <Spinner label="Loading friend requests" />
        </div>
    )
    if (error) return <p>Something went wrong</p>

    const friendRequests = data.friendRequests.filter((request) => (request.status === 'pending'));
    console.log('friend requests:', friendRequests)
    return (
        <div className={styles.listCards}>
            {friendRequests.map((request, index) => (
                <RequestCard index={index} request={request} />
            ))
            }</div>
    )
}
